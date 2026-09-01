<?php

namespace Drupal\itk_iframe_field\Hook;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\itk_iframe_field\AllowedDomains;

/**
 * Hooks for the iframe field type limited to accepted domains.
 */
class ItkIframeHooks {

  use StringTranslationTrait;

  /**
   * Implements hook_theme().
   */
  #[Hook('theme')]
  public function theme(): array {
    return [
      'itk_iframe_field' => [
        'variables' => [
          // Defaults to FALSE so that a caller which forgets to set it gets
          // the link fallback rather than an unchecked iframe.
          'allowed' => FALSE,
          'src' => '',
          'attributes' => [],
          'text' => '',
          'style' => '',
          'headerlevel' => 3,
          'fullscreen_url' => NULL,
        ],
        'template' => 'itk-iframe-field',
      ],
    ];
  }

  /**
   * Implements hook_field_widget_info_alter().
   *
   * The widgets shipped by the iframe module only declare support for the
   * "iframe" field type. Our field type extends that one and stores the same
   * columns, so reuse the widgets rather than subclassing each of them - the
   * domain list is a display-time concern and needs no widget of its own.
   *
   * @param array $info
   *   The widget plugin definitions, keyed by plugin id.
   */
  #[Hook('field_widget_info_alter')]
  public function fieldWidgetInfoAlter(array &$info): void {
    $widgets = [
      'iframe_url',
      'iframe_urlheight',
      'iframe_urlwidthheight',
    ];

    foreach ($widgets as $widget) {
      if (isset($info[$widget]['field_types']) && !in_array('itk_iframe', $info[$widget]['field_types'], TRUE)) {
        $info[$widget]['field_types'][] = 'itk_iframe';
      }
    }
  }

  /**
   * Implements hook_field_widget_single_element_form_alter().
   *
   * Tells the editor which domains this field embeds, so it is clear up front
   * why a given URL will come out as a link rather than as an iframe.
   *
   * @param array $element
   *   The widget form element for a single field item.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   * @param array $context
   *   An associative array holding the field items, delta and widget.
   */
  #[Hook('field_widget_single_element_form_alter')]
  public function fieldWidgetSingleElementFormAlter(array &$element, FormStateInterface $form_state, array $context): void {
    $items = $context['items'] ?? NULL;
    if (!$items instanceof FieldItemListInterface || !isset($element['url'])) {
      return;
    }

    $field_definition = $items->getFieldDefinition();
    if ('itk_iframe' !== $field_definition->getType()) {
      return;
    }

    // The template sizes the iframe with inline CSS, so an editor-supplied
    // width has no effect. Hide the input rather than removing it, so that
    // saving an existing item does not rewrite its stored width.
    if (isset($element['width'])) {
      $element['width']['#access'] = FALSE;
    }

    $domains = AllowedDomains::parse((string) ($field_definition->getSetting('allowed_domains') ?? ''));
    $hint = [] === $domains
      ? $this->t('No domains are accepted for this field yet, so every URL is rendered as a link instead of an iframe.')
      : $this->t('Embedded as an iframe only for: @domains. Any other URL is rendered as a link.', [
        '@domains' => implode(', ', $domains),
      ]);

    // The iframe widgets set no description on the URL element, but keep any
    // that a future version adds rather than clobbering it.
    $existing = $element['url']['#description'] ?? NULL;
    if (NULL === $existing) {
      $element['url']['#description'] = $hint;

      return;
    }

    $element['url']['#description'] = [
      'original' => is_array($existing) ? $existing : ['#markup' => $existing],
      'itk_iframe_field' => [
        '#type' => 'html_tag',
        '#tag' => 'div',
        '#value' => $hint,
      ],
    ];
  }

}
