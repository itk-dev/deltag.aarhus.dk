<?php

namespace Drupal\hoeringsportal_dialogue_report\Map;

use DantSu\OpenStreetMapStaticAPI\LatLng;
use DantSu\OpenStreetMapStaticAPI\Line;
use DantSu\OpenStreetMapStaticAPI\Markers;
use DantSu\OpenStreetMapStaticAPI\OpenStreetMap;
use DantSu\OpenStreetMapStaticAPI\Polygon;
use Drupal\Core\DestructableInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\File\FileExists;
use Drupal\Core\File\FileSystemInterface;
use Drupal\Core\Site\Settings;
use Drupal\node\NodeInterface;
use GuzzleHttp\ClientInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

/**
 * Renders a dialogue proposal's location as a static map image.
 *
 * Images are stored as private://dialogue-proposal-map/{nid}-{hash}.png, where
 * the hash is computed from the location, so an image never shows an old
 * location.
 */
final class MapImageGenerator implements DestructableInterface {

  public const PROPOSAL_BUNDLE = 'dialogue_proposal';
  public const LOCATION_FIELD = 'field_location';
  public const WIDTH = 300;
  public const HEIGHT = 150;

  private const DIRECTORY = 'private://dialogue-proposal-map';
  private const MARKER = 'assets/images/map-marker.png';
  // Matches the maps on the site, cf. the theme's show-map.js.
  private const MAX_ZOOM = 15;
  private const COLOR = '008486';
  // 10% opaque, as on the site. The image library's alpha byte is
  // transparency (00 is opaque), unlike CSS.
  private const FILL_COLOR = self::COLOR . 'E6';
  // Room for the marker, which sits above its point.
  private const PADDING = 40;
  // The library cannot fit a map to a zero-sized area, e.g. a single point.
  private const MIN_SPAN_DEGREES = 0.0005;

  private const DEFAULT_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  private const DEFAULT_ATTRIBUTION = '© OpenStreetMap contributors';
  private const DEFAULT_USER_AGENT = 'Deltag Aarhus static map (https://deltag.aarhus.dk)';

  /**
   * Ids of proposals whose image is generated when the request ends.
   *
   * @var array<int, int>
   */
  private array $scheduled = [];

  public function __construct(
    private readonly ClientInterface $httpClient,
    private readonly FileSystemInterface $fileSystem,
    private readonly EntityTypeManagerInterface $entityTypeManager,
    private readonly ModuleHandlerInterface $moduleHandler,
    private readonly Settings $settings,
    #[Autowire(service: 'logger.channel.hoeringsportal_dialogue_report')]
    private readonly LoggerInterface $logger,
  ) {
  }

  /**
   * Whether a URI is one of our map images.
   */
  public function isMapImageUri(string $uri): bool {
    return str_starts_with($uri, self::DIRECTORY . '/');
  }

  /**
   * Get the URI of a proposal's map image, if it exists.
   */
  public function getUri(NodeInterface $proposal): ?string {
    $geoJson = $this->getGeoJson($proposal);
    if (NULL === $geoJson) {
      return NULL;
    }

    $uri = $this->buildUri((int) $proposal->id(), $geoJson);

    return file_exists($uri) ? $uri : NULL;
  }

  /**
   * Generate the map image when the current request ends.
   *
   * Fetching map tiles is slow, so this keeps it out of the response time of
   * whoever saves the proposal.
   */
  public function scheduleGeneration(NodeInterface $proposal): void {
    $this->scheduled[(int) $proposal->id()] = (int) $proposal->id();
  }

  /**
   * Generate a proposal's map image, unless it is up to date.
   *
   * Deletes the proposal's other map images, e.g. for an old location.
   *
   * @param \Drupal\node\NodeInterface $proposal
   *   A dialogue proposal.
   * @param bool $force
   *   Regenerate the image even if it exists.
   *
   * @return string|null
   *   The image URI, or NULL if the proposal has no location.
   */
  public function generate(NodeInterface $proposal, bool $force = FALSE): ?string {
    $nid = (int) $proposal->id();
    $geoJson = $this->getGeoJson($proposal);
    $geometry = NULL === $geoJson ? NULL : $this->parseGeoJson($geoJson);
    if (NULL === $geometry) {
      $this->delete($nid);
      return NULL;
    }

    $uri = $this->buildUri($nid, $geoJson);
    if ($force || !file_exists($uri)) {
      $directory = self::DIRECTORY;
      $this->fileSystem->prepareDirectory($directory, FileSystemInterface::CREATE_DIRECTORY | FileSystemInterface::MODIFY_PERMISSIONS);
      $this->fileSystem->saveData($this->render($geometry), $uri, FileExists::Replace);
    }
    $this->delete($nid, $uri);

    return $uri;
  }

  /**
   * Delete a proposal's map images.
   *
   * @param int $nid
   *   The proposal node id.
   * @param string|null $keepUri
   *   An image to keep.
   */
  public function delete(int $nid, ?string $keepUri = NULL): void {
    if (!is_dir(self::DIRECTORY)) {
      return;
    }

    $files = $this->fileSystem->scanDirectory(self::DIRECTORY, '/^' . $nid . '-[0-9a-f]+\.png$/', ['recurse' => FALSE]);
    foreach (array_keys($files) as $uri) {
      if ($uri !== $keepUri) {
        $this->fileSystem->delete($uri);
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public function destruct(): void {
    if ([] === $this->scheduled) {
      return;
    }
    $proposals = $this->entityTypeManager->getStorage('node')->loadMultiple($this->scheduled);
    $this->scheduled = [];
    foreach ($proposals as $proposal) {
      try {
        $this->generate($proposal);
      }
      catch (\Throwable $exception) {
        $this->logger->error('Cannot generate map image for proposal @nid: @message', [
          '@nid' => $proposal->id(),
          '@message' => $exception->getMessage(),
          'exception' => $exception,
        ]);
      }
    }
  }

  /**
   * Get a proposal's location as a GeoJSON string.
   */
  private function getGeoJson(NodeInterface $proposal): ?string {
    if (!$proposal->hasField(self::LOCATION_FIELD)) {
      return NULL;
    }

    $data = $proposal->get(self::LOCATION_FIELD)->data;
    // A location without geometry is stored as the string "null".
    if (!is_string($data) || '' === trim($data) || 'null' === trim($data)) {
      return NULL;
    }

    return $data;
  }

  /**
   * Build an image URI that changes when the location or image size does.
   */
  private function buildUri(int $nid, string $geoJson): string {
    $hash = substr(hash('sha256', $geoJson . '|' . self::WIDTH . 'x' . self::HEIGHT), 0, 16);

    return sprintf('%s/%d-%s.png', self::DIRECTORY, $nid, $hash);
  }

  /**
   * Parse GeoJSON (EPSG:4326) into points, lines and polygons.
   *
   * @return array{points: \DantSu\OpenStreetMapStaticAPI\LatLng[], lines: \DantSu\OpenStreetMapStaticAPI\LatLng[][], polygons: \DantSu\OpenStreetMapStaticAPI\LatLng[][]}|null
   *   The geometry, or NULL if there is none.
   */
  private function parseGeoJson(string $geoJson): ?array {
    $object = json_decode($geoJson, TRUE);
    if (!is_array($object)) {
      return NULL;
    }

    $geometry = ['points' => [], 'lines' => [], 'polygons' => []];
    $this->collectGeometry($object, $geometry);
    $geometry['lines'] = array_values(array_filter($geometry['lines']));
    $geometry['polygons'] = array_values(array_filter($geometry['polygons']));

    return [] === $geometry['points'] && [] === $geometry['lines'] && [] === $geometry['polygons'] ? NULL : $geometry;
  }

  /**
   * Add a GeoJSON object's geometry to $geometry.
   */
  private function collectGeometry(array $object, array &$geometry): void {
    $coordinates = $object['coordinates'] ?? NULL;
    switch ($object['type'] ?? NULL) {
      case 'FeatureCollection':
        foreach ($object['features'] ?? [] as $feature) {
          if (is_array($feature)) {
            $this->collectGeometry($feature, $geometry);
          }
        }
        break;

      case 'Feature':
        if (is_array($object['geometry'] ?? NULL)) {
          $this->collectGeometry($object['geometry'], $geometry);
        }
        break;

      case 'GeometryCollection':
        foreach ($object['geometries'] ?? [] as $child) {
          if (is_array($child)) {
            $this->collectGeometry($child, $geometry);
          }
        }
        break;

      case 'Point':
        $geometry['points'] = [...$geometry['points'], ...$this->toLatLngs([$coordinates])];
        break;

      case 'MultiPoint':
        $geometry['points'] = [...$geometry['points'], ...$this->toLatLngs($coordinates)];
        break;

      case 'LineString':
        $geometry['lines'][] = $this->toLatLngs($coordinates);
        break;

      case 'MultiLineString':
        foreach ((array) $coordinates as $line) {
          $geometry['lines'][] = $this->toLatLngs($line);
        }
        break;

      // Only outer rings are drawn; holes are ignored.
      case 'Polygon':
        $geometry['polygons'][] = $this->toLatLngs($coordinates[0] ?? []);
        break;

      case 'MultiPolygon':
        foreach ((array) $coordinates as $polygon) {
          $geometry['polygons'][] = $this->toLatLngs($polygon[0] ?? []);
        }
        break;
    }
  }

  /**
   * Convert GeoJSON positions ([lng, lat]) to LatLngs, skipping invalid ones.
   *
   * @return \DantSu\OpenStreetMapStaticAPI\LatLng[]
   *   The positions.
   */
  private function toLatLngs(mixed $positions): array {
    $latLngs = [];
    foreach ((array) $positions as $position) {
      if (is_array($position) && is_numeric($position[0] ?? NULL) && is_numeric($position[1] ?? NULL)) {
        $latLngs[] = new LatLng((float) $position[1], (float) $position[0]);
      }
    }

    return $latLngs;
  }

  /**
   * Render geometry on a map.
   *
   * @return string
   *   The PNG image data.
   */
  private function render(array $geometry): string {
    $all = array_merge($geometry['points'], ...$geometry['lines'], ...$geometry['polygons']);
    $lats = array_map(static fn(LatLng $latLng) => $latLng->getLat(), $all);
    $lngs = array_map(static fn(LatLng $latLng) => $latLng->getLng(), $all);
    [$south, $north] = $this->ensureSpan(min($lats), max($lats));
    [$west, $east] = $this->ensureSpan(min($lngs), max($lngs));

    $map = OpenStreetMap::createFromBoundingBox(
      new LatLng($north, $west),
      new LatLng($south, $east),
      self::PADDING,
      self::WIDTH,
      self::HEIGHT,
      $this->createTileLayer(),
    );

    foreach ($geometry['polygons'] as $points) {
      $polygon = new Polygon(self::COLOR, 3, self::FILL_COLOR);
      foreach ($points as $point) {
        $polygon->addPoint($point);
      }
      $map->addDraw($polygon);
    }

    foreach ($geometry['lines'] as $points) {
      $line = new Line(self::COLOR, 3);
      foreach ($points as $point) {
        $line->addPoint($point);
      }
      $map->addDraw($line);
    }

    if ([] !== $geometry['points']) {
      $markers = (new Markers($this->getModulePath() . '/' . self::MARKER))
        ->setAnchor(Markers::ANCHOR_CENTER, Markers::ANCHOR_BOTTOM);
      foreach ($geometry['points'] as $point) {
        $markers->addMarker($point);
      }
      $map->addMarkers($markers);
    }

    return $map->getImage()->getDataPNG();
  }

  /**
   * Widen a coordinate range that is too small to fit a map to.
   *
   * @return float[]
   *   The (possibly widened) min and max.
   */
  private function ensureSpan(float $min, float $max): array {
    if ($max - $min >= self::MIN_SPAN_DEGREES) {
      return [$min, $max];
    }
    $center = ($min + $max) / 2;

    return [$center - self::MIN_SPAN_DEGREES / 2, $center + self::MIN_SPAN_DEGREES / 2];
  }

  /**
   * Create the tile layer from settings.
   */
  private function createTileLayer(): HttpTileLayer {
    $config = $this->settings->get('hoeringsportal_dialogue_report.static_map') ?? [];

    return (new HttpTileLayer(
      $this->httpClient,
      $config['user_agent'] ?? self::DEFAULT_USER_AGENT,
      $config['tile_url'] ?? self::DEFAULT_TILE_URL,
      $config['attribution'] ?? self::DEFAULT_ATTRIBUTION,
      $config['subdomains'] ?? 'abc',
    ))->setMaxZoom(self::MAX_ZOOM);
  }

  /**
   * Get this module's absolute path.
   */
  private function getModulePath(): string {
    return DRUPAL_ROOT . '/' . $this->moduleHandler->getModule('hoeringsportal_dialogue_report')->getPath();
  }

}
