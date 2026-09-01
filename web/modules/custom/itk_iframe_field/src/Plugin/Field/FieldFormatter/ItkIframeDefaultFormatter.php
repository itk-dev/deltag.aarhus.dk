<?php

namespace Drupal\itk_iframe_field\Plugin\Field\FieldFormatter;

use Drupal\Core\Cache\CacheableDependencyInterface;
use Drupal\Core\Field\Attribute\FieldFormatter;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Render\BubbleableMetadata;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\Core\Url;
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
      $allowed = AllowedDomains::isAllowed($src, $patterns);
      $elements[$delta]['#theme'] = 'itk_iframe_field';
      $elements[$delta]['#allowed'] = $allowed;
      $elements[$delta]['#cache']['tags'] = array_merge(
        $elements[$delta]['#cache']['tags'] ?? [],
        $cache_tags,
      );

      // Only an embedded iframe has anything to show fullscreen; the link
      // fallback already points at the URL itself.
      if ($allowed) {
        $this->addFullscreenLink($elements[$delta], $items, $delta);
      }
    }

    return $elements;
  }

  /**
   * Adds the fullscreen dialog link to a rendered item.
   *
   * @param array $element
   *   The render array of a single field item.
   * @param \Drupal\Core\Field\FieldItemListInterface $items
   *   The field items being rendered.
   * @param int $delta
   *   The delta of the item.
   */
  protected function addFullscreenLink(array &$element, FieldItemListInterface $items, int $delta): void {
    $entity = $items->getEntity();
    // An unsaved entity - a preview, say - has nothing to link to.
    if (NULL === $entity->id()) {
      return;
    }

    $url = Url::fromRoute('itk_iframe_field.fullscreen', [
      'entity_type_id' => $entity->getEntityTypeId(),
      'entity_id' => $entity->id(),
      'field_name' => $this->fieldDefinition->getName(),
      'delta' => $delta,
    ])->toString(TRUE);

    $element['#fullscreen_url'] = $url->getGeneratedUrl();
    $element['#attached']['library'][] = 'core/drupal.dialog.ajax';

    BubbleableMetadata::createFromRenderArray($element)
      ->merge($url)
      ->applyTo($element);
  }

}
