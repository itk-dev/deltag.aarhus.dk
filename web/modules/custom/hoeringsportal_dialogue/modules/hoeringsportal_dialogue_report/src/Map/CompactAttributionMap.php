<?php

namespace Drupal\hoeringsportal_dialogue_report\Map;

use DantSu\OpenStreetMapStaticAPI\OpenStreetMap;
use DantSu\PHPImageEditor\Image;

/**
 * A static map with a smaller attribution than the library's.
 *
 * The library draws the attribution at a fixed size, which takes up much of a
 * small image.
 */
final class CompactAttributionMap extends OpenStreetMap {

  private const FONT_SIZE = 7;
  private const MARGIN = 2;

  /**
   * {@inheritdoc}
   *
   * Same as the parent, but with a smaller font and margin.
   */
  protected function drawAttribution(Image $image): Image {
    $text = implode(' - ', array_map(static fn($layer) => $layer->getAttributionText(), $this->layers));
    $font = dirname((new \ReflectionClass(OpenStreetMap::class))->getFileName()) . '/resources/font.ttf';
    $write = static fn(Image $target): array => $target->writeTextAndGetBoundingBox(
      $text, $font, self::FONT_SIZE, '0078A8', self::MARGIN, self::MARGIN, Image::ALIGN_LEFT, Image::ALIGN_TOP,
    );

    $box = $write(Image::newCanvas(1, 1));
    $attribution = Image::newCanvas($box['bottom-right']['x'] + self::MARGIN, $box['bottom-right']['y'] + self::MARGIN);
    $attribution->drawRectangle(0, 0, $attribution->getWidth(), $attribution->getHeight(), 'FFFFFF33');
    $write($attribution);

    return $image->pasteOn($attribution, Image::ALIGN_RIGHT, Image::ALIGN_BOTTOM);
  }

}
