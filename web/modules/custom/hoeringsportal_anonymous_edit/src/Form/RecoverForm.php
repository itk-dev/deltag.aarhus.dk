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
final class RecoverForm extends FormBase {
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
      '#title' => $this->t('Confirm your email address', options: ['context' => 'hoeringsportal_anonymous_edit']),
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
  public function validateForm(array &$form, FormStateInterface $form_state): void {
    $email = $form_state->getValue('email');
    $token = $this->getRouteMatch()->getParameter('token');
    if (!$this->helper->isValidTokenEmail($email, $token)) {
      $form_state->setErrorByName('email', $this->t('Invalid email address'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $email = $form_state->getValue('email');
    $token = $this->getRouteMatch()->getParameter('token');
    try {
      $this->helper->setTokenByEmail($email, $token);
      $this->messenger()->addMessage('Your edit token has been recovered');
    }
    catch (\Exception) {
      $this->messenger()->addError('Error recovering your edit token');
    }
    $form_state->setRedirect('hoeringsportal_anonymous_edit.content');
  }

}
