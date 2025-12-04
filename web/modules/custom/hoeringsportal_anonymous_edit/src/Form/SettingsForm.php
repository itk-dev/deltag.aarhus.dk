<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_anonymous_edit\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Logger\RfcLogLevel;

/**
 * Configure hoeringsportal_anonymous_edit settings for this site.
 */
final class SettingsForm extends ConfigFormBase {
  public const CONFIG_NAME = 'hoeringsportal_anonymous_edit.settings';

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'hoeringsportal_anonymous_edit_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames(): array {
    return [self::CONFIG_NAME];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state): array {
    $config = $this->config('hoeringsportal_anonymous_edit.settings');
    $defaults = $config->get('node');

    $form['node'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Node'),
      '#tree' => TRUE,

      'allow_update' => [
        '#type' => 'checkbox',
        '#title' => $this->t('Allow update'),
        '#default_value' => $defaults['allow_update'] ?? FALSE,
      ],

      'allow_delete' => [
        '#type' => 'checkbox',
        '#title' => $this->t('Allow delete'),
        '#default_value' => $defaults['allow_delete'] ?? FALSE,
      ],
    ];

    $defaults = $config->get('comment');

    $form['comment'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Comment'),
      '#tree' => TRUE,

      'allow_update' => [
        '#type' => 'checkbox',
        '#title' => $this->t('Allow update'),
        '#default_value' => $defaults['allow_update'] ?? FALSE,
      ],

      'allow_delete' => [
        '#type' => 'checkbox',
        '#title' => $this->t('Allow delete'),
        '#default_value' => $defaults['allow_delete'] ?? FALSE,
      ],
    ];

    $defaults = $config->get('general');

    $form['general'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('General'),
      '#tree' => TRUE,

      'owner_name_format' => [
        '#type' => 'textfield',
        '#title' => $this->t('Owner name format'),
        '#default_value' => $defaults['owner_name_format'] ?? 'Bruger %1$d',
      ],

      'log_level' => [
        '#type' => 'select',
        '#options' => RfcLogLevel::getLevels(),
        '#title' => $this->t('Log level'),
        '#default_value' => $defaults['log_level'] ?? RfcLogLevel::ERROR,
      ],
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $this->config('hoeringsportal_anonymous_edit.settings')
      ->set('node', $form_state->getValue('node'))
      ->set('comment', $form_state->getValue('comment'))
      ->set('general', $form_state->getValue('general'))
      ->save();
    parent::submitForm($form, $form_state);
  }

}
