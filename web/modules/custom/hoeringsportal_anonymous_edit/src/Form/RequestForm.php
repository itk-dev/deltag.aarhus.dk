<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_anonymous_edit\Form;

use Drupal\Core\DependencyInjection\AutowireTrait;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\hoeringsportal_anonymous_edit\Helper\Helper;

/**
 * Provides a hoeringsportal_anonymous_edit form.
 */
final class RequestForm extends FormBase {
  use AutowireTrait;

  public function __construct(
    private readonly Helper $helper,
  ) {}

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'hoeringsportal_anonymous_edit_recover';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state): array {

    $form['email'] = [
      '#type' => 'email',
      '#title' => $this->t('Your email address', options: ['context' => 'hoeringsportal_anonymous_edit']),
      '#required' => TRUE,
    ];

    $form['actions'] = [
      '#type' => 'actions',
      'submit' => [
        '#type' => 'submit',
        '#value' => $this->t('Find content', options: ['context' => 'hoeringsportal_anonymous_edit']),
      ],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $email = $form_state->getValue('email');

    try {
      $this->helper->sendRecoverUrl($email);

      $this->messenger()->addMessage($this->t('Email send to @email', ['@email' => $email]));
      // @todo Redirect to where?
      $form_state->setRedirect('<front>');
    }
    catch (\Exception) {
      $this->messenger()->addError($this->t('Error sending email @email', ['@email' => $email]));
    }
  }

}
