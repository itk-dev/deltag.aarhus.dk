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

      if (!AllowedDomains::isSafeUrl($src)) {
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
      $elements[$delta]['#cache']['tags'] = array_merge(
        $elements[$delta]['#cache']['tags'] ?? [],
        $cache_tags,
      );
    }

    return $elements;
  }

}
