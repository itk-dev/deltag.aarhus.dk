<?php

namespace Drupal\hoeringsportal_dialogue_report\Map;

use DantSu\OpenStreetMapStaticAPI\LatLng;
use DantSu\OpenStreetMapStaticAPI\Markers;
use DantSu\OpenStreetMapStaticAPI\OpenStreetMap;
use Drupal\Core\DestructableInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Extension\ExtensionPathResolver;
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
 * Only a single point is supported: the proposal form only offers the point
 * widget, which stores a GeoJSON Feature with a Point geometry. Any other
 * location gets no image.
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
  // The pin used on the site's maps.
  private const MARKER_THEME = 'hoeringsportal';
  private const MARKER = 'assets/images/maps/map-pin.png';
  // Matches the maps on the site, cf. the theme's show-map.js.
  private const ZOOM = 15;

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
    private readonly ExtensionPathResolver $extensionPathResolver,
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
    $point = NULL === $geoJson ? NULL : $this->parsePoint($geoJson);
    if (NULL === $point) {
      $this->delete($nid);
      return NULL;
    }

    $uri = $this->buildUri($nid, $geoJson);
    if ($force || !file_exists($uri)) {
      $directory = self::DIRECTORY;
      $this->fileSystem->prepareDirectory($directory, FileSystemInterface::CREATE_DIRECTORY | FileSystemInterface::MODIFY_PERMISSIONS);
      $this->fileSystem->saveData($this->render($point), $uri, FileExists::Replace);
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
   * Get the point from a GeoJSON Feature with a Point geometry (EPSG:4326).
   *
   * @return \DantSu\OpenStreetMapStaticAPI\LatLng|null
   *   The point, or NULL if the GeoJSON is not a single point.
   */
  private function parsePoint(string $geoJson): ?LatLng {
    $feature = json_decode($geoJson, TRUE);
    $lng = $feature['geometry']['coordinates'][0] ?? NULL;
    $lat = $feature['geometry']['coordinates'][1] ?? NULL;
    if ('Point' !== ($feature['geometry']['type'] ?? NULL) || !is_numeric($lng) || !is_numeric($lat)) {
      return NULL;
    }

    return new LatLng((float) $lat, (float) $lng);
  }

  /**
   * Render a map centred on a point, with a pin on it.
   *
   * @return string
   *   The PNG image data.
   */
  private function render(LatLng $point): string {
    $markers = (new Markers($this->getMarkerPath()))
      ->setAnchor(Markers::ANCHOR_CENTER, Markers::ANCHOR_BOTTOM)
      ->addMarker($point);

    return OpenStreetMap::createFromLatLngZoom($point, self::ZOOM, self::WIDTH, self::HEIGHT, $this->createTileLayer())
      ->addMarkers($markers)
      ->getImage()
      ->getDataPNG();
  }

  /**
   * Create the tile layer from settings.
   */
  private function createTileLayer(): HttpTileLayer {
    $config = $this->settings->get('hoeringsportal_dialogue_report.static_map') ?? [];

    return new HttpTileLayer(
      $this->httpClient,
      $config['user_agent'] ?? self::DEFAULT_USER_AGENT,
      $config['tile_url'] ?? self::DEFAULT_TILE_URL,
      $config['attribution'] ?? self::DEFAULT_ATTRIBUTION,
      $config['subdomains'] ?? 'abc',
    );
  }

  /**
   * Get the marker image's absolute path.
   */
  private function getMarkerPath(): string {
    return DRUPAL_ROOT . '/' . $this->extensionPathResolver->getPath('theme', self::MARKER_THEME) . '/' . self::MARKER;
  }

}
