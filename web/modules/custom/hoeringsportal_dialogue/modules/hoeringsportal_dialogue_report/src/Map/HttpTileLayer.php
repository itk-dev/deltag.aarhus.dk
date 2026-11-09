<?php

namespace Drupal\hoeringsportal_dialogue_report\Map;

use DantSu\OpenStreetMapStaticAPI\TileLayer;
use DantSu\PHPImageEditor\Image;
use GuzzleHttp\ClientInterface;

/**
 * A tile layer that fetches tiles with Drupal's HTTP client.
 *
 * The parent fetches tiles with its own cURL call, which always sends a
 * browser User-Agent (tile servers such as OpenStreetMap's require one that
 * identifies the application) and reads $_SERVER keys that are missing under
 * Drush.
 */
final class HttpTileLayer extends TileLayer {

  public function __construct(
    private readonly ClientInterface $httpClient,
    private readonly string $userAgent,
    string $url,
    string $attributionText,
    string $subdomains = 'abc',
  ) {
    parent::__construct($url, $attributionText, $subdomains);
  }

  /**
   * {@inheritdoc}
   *
   * @throws \GuzzleHttp\Exception\GuzzleException
   *   If the tile cannot be fetched.
   * @throws \RuntimeException
   *   If the response is not an image.
   */
  public function getTile(float $x, float $y, int $z, int $tileSize): Image {
    $url = $this->getTileUrl((int) $x, (int) $y, $z);
    $response = $this->httpClient->request('GET', $url, [
      'headers' => ['User-Agent' => $this->userAgent],
      'timeout' => 10,
    ]);

    $tile = Image::fromData((string) $response->getBody());
    if (!$tile->isImageDefined()) {
      throw new \RuntimeException(sprintf('Tile %s is not an image', $url));
    }

    return $tile;
  }

}
