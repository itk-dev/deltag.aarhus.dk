<?php

namespace Drupal\itk_iframe_field\Plugin\Field\FieldType;

use Drupal\Core\Field\Attribute\FieldType;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\iframe\Plugin\Field\FieldType\IframeItem;
use Drupal\itk_iframe_field\AllowedDomains;

/**
 * Iframe field type restricted to a list of accepted domains.
 *
 * Adds one field setting to the iframe field type: the list of domains that
 * may be rendered as an iframe. The list is enforced when the field is
 * rendered, see
 * \Drupal\itk_iframe_field\Plugin\Field\FieldFormatter\ItkIframeDefaultFormatter.
 */
#[FieldType(
  id: 'itk_iframe',
  label: new TranslatableMarkup('Iframe (accepted domains)'),
  description: new TranslatableMarkup('An iframe field that only renders an iframe when its URL is served by one of the domains accepted for this field.'),
  category: new TranslatableMarkup('ITK'),
  default_widget: 'iframe_urlwidthheight',
  default_formatter: 'itk_iframe_default',
)]
class ItkIframeItem extends IframeItem {

  /**
   * {@inheritdoc}
   */
  public static function defaultFieldSettings(): array {
    return [
      'allowed_domains' => '',
    ] + parent::defaultFieldSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function fieldSettingsForm(array $form, FormStateInterface $form_state): array {
    $element = parent::fieldSettingsForm($form, $form_state);

    $element['allowed_domains'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Accepted domains'),
      '#default_value' => $this->getSetting('allowed_domains') ?? '',
      '#rows' => 6,
      '#weight' => -10,
      '#description' => $this->t('One domain per line. Only https URLs served by one of these domains are rendered as an iframe; any other URL is rendered as a link. As long as the list is empty, no iframe is rendered.') . '<br />'
      . $this->t('Enter host names such as <em>example.com</em>. A domain matches that host only, so list subdomains such as <em>www.example.com</em> separately. Lines starting with <em>#</em> are treated as comments.'),
      '#element_validate' => [[static::class, 'validateAllowedDomains']],
    ];

    return $element;
  }

  /**
   * Form element validation handler for the "accepted domains" setting.
   *
   * @param array $element
   *   The form element to validate.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   */
  public static function validateAllowedDomains(array $element, FormStateInterface $form_state): void {
    $value = (string) ($element['#value'] ?? '');

    $invalid = [];
    foreach (preg_split('/\R/', $value) ?: [] as $line) {
      $line = trim($line);
      if ('' === $line || str_starts_with($line, '#')) {
        continue;
      }
      if (!AllowedDomains::isValidDomain($line)) {
        $invalid[] = $line;
      }
    }

    if ([] !== $invalid) {
      $form_state->setError($element, new TranslatableMarkup('These lines are not valid domains: @domains', [
        '@domains' => implode(', ', $invalid),
      ]));
    }
  }

  /**
   * Returns the domains accepted for this field.
   *
   * @return string[]
   *   Lowercased domains.
   */
  public function getAllowedDomains(): array {
    return AllowedDomains::parse((string) ($this->getSetting('allowed_domains') ?? ''));
  }

}
