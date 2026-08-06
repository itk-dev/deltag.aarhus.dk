<?php

namespace Drupal\hoeringsportal_decision\Hook;

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\datetime\Plugin\Field\FieldType\DateTimeItemInterface;
use Drupal\hoeringsportal_decision\Helper\DecisionHelper;
use Drupal\node\Entity\Node;

/**
 * Hooks for decision-related operations.
 */
class DecisionHooks {

  const string DEFAULT_DEADLINE = '+8 weeks';

  /**
   * Implements hook_FORMID_form_alter().
   *
   * Set the publishing date to the current date by default.
   *
   * @param array $form
   *   The form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state object.
   */
  #[Hook('form_node_decision_form_alter')]
  public function decisionFormAlter(array &$form, FormStateInterface $form_state): void {
    $form['publish_on']['widget'][0]['value']['#default_value'] = new DrupalDateTime();
  }

  /**
   * Implements hook_entity_presave().
   *
   * Set reply deadline and reply deadline exceeded in some situations.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The entity being saved.
   */
  #[Hook('entity_presave')]
  public function entityPresave(EntityInterface $entity): void {
    if ($entity instanceof Node && $entity->bundle() === 'decision') {
      $now = new DrupalDateTime();
      $publishDateObj = DrupalDateTime::createFromTimestamp($entity->get('publish_on')->value ? $entity->get('publish_on')->value : $now->getTimestamp());

      $deadline = $publishDateObj->modify(self::DEFAULT_DEADLINE);

      if ($entity->isNew()) {
        // On node insert.
        if (empty($entity->get('field_reply_deadline')->getValue())) {
          $entity->set('field_reply_deadline', $deadline->format(DateTimeItemInterface::DATETIME_STORAGE_FORMAT));
        }
      }
      else {
        // On node update.
        if (((int) $entity->get('publish_on')->value !== (int) $entity->getOriginal()->get('publish_on')->value) && empty($entity->get('field_reply_deadline')->getValue())) {
          $entity->set('field_reply_deadline', $deadline->format(DateTimeItemInterface::DATETIME_STORAGE_FORMAT));
        }
      }

      if ($entity->get('field_reply_deadline')->date < $now) {
          $entity->set('field_content_state', DecisionHelper::STATE_FINISHED);
      }
    }
  }

}
