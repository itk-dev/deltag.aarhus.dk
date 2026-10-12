<?php

namespace Drupal\itk_iframe_field\Plugin\Field\FieldFormatter;

use Drupal\Core\Cache\CacheableDependencyInterface;
use Drupal\Core\Field\Attribute\FieldFormatter;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\iframe\Plugin\Field\FieldFormatter\IframeDefaultFormatter;
use Drupal\itk_iframe_field\AllowedDomains;

/**
 * Renders an iframe only when its URL is served by an accepted domain.
 *
 * The check runs on the "src" the parent formatter resolved, not on the stored
 * value, so it also covers URLs produced by token replacement.
 */
#[FieldFormatter(
  id: 'itk_iframe_default',
  label: new TranslatableMarkup('Title, over iframe (accepted domains only)'),
  field_types: [
    'itk_iframe',
  ],
)]
class ItkIframeDefaultFormatter extends IframeDefaultFormatter {

  public const PLUGIN_ID = 'itk_iframe_default';

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode): array {
    $elements = parent::viewElements($items, $langcode);
    $patterns = AllowedDomains::parse((string) ($this->getFieldSetting('allowed_domains') ?? ''));
    $cache_tags = $this->fieldDefinition instanceof CacheableDependencyInterface
      ? $this->fieldDefinition->getCacheTags()
      : [];

    foreach ($elements as $delta => $element) {
      $src = (string) ($element['#src'] ?? '');

      if (!AllowedDomains::isLinkableUrl($src)) {
        // No host to match and nothing that can safely become an href either.
        // Render nothing, but keep the field's cacheability so that the output
        // is rebuilt once the accepted domains change.
        $elements[$delta] = ['#cache' => ['tags' => $cache_tags]];
        $this->getLogger('itk_iframe_field')->warning('Refused to render %url in field @field: only absolute http(s) URLs can be embedded or linked.', [
          '%url' => '' === $src ? '<empty>' : $src,
          '@field' => $this->fieldDefinition->getName(),
        ]);
        continue;
      }

      // A URL off the accepted list still renders, as a link rather than an
      // iframe. The template branches on "allowed".
      $elements[$delta]['#theme'] = 'itk_iframe_field';
      $elements[$delta]['#allowed'] = AllowedDomains::isAllowed($src, $patterns);

      // Size the iframe in the parent's id-scoped CSS: always full width,
      // with the item's width and height used only as an aspect ratio.
      // "height: auto" overrides the height attribute the parent always sets,
      // which would otherwise stop the aspect ratio from applying.
      $item = $items[$delta];
      $elements[$delta]['#style'] = ($elements[$delta]['#style'] ?? '') . sprintf(
        ' #%s { width: 100%%; height: auto; aspect-ratio: %s; }',
        (string) $elements[$delta]['#attributes']['id'],
        self::aspectRatio($item->width ?? NULL, $item->height ?? NULL),
      );
      $elements[$delta]['#cache']['tags'] = array_merge(
        $elements[$delta]['#cache']['tags'] ?? [],
        $cache_tags,
      );
    }

    return $elements;
  }

  /**
   * Get a CSS aspect ratio from an item's width and height.
   *
   * The iframe module stores free text such as "100%", "800" or "800px". Only
   * when both are plain (pixel) numbers do they describe a ratio.
   *
   * @return string
   *   A CSS aspect-ratio value, "16 / 9" by default.
   */
  private static function aspectRatio(mixed $width, mixed $height): string {
    $pixels = '/^\s*([1-9]\d*)\s*(px)?\s*$/i';
    if (1 === preg_match($pixels, (string) $width, $w) && 1 === preg_match($pixels, (string) $height, $h)) {
      return $w[1] . ' / ' . $h[1];
    }

    return '16 / 9';
  }

}
