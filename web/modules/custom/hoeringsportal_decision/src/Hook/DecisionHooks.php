<?php

namespace Drupal\hoeringsportal_decision\Hook;

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\node\Entity\Node;

/**
 * Hooks for decision-related operations.
 */
class DecisionHooks {

  const string DEFAULT_DEADLINE = '+8 weeks';
  const string DEFAULT_DB_SAVE_DATETIME_FORMAT = 'Y-m-d\TH:i:s';

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

  #[Hook('entity_presave')]
  public function entityUpsert(EntityInterface $entity): void {
    if ($entity instanceof Node && $entity->bundle() === 'decision') {
      $now =  new DrupalDateTime();
      $publishDateObj = $entity->get('publish_on')->value ? DrupalDateTime::createFromTimestamp($entity->get('publish_on')->value) : $now;

      $deadline = $publishDateObj->modify(self::DEFAULT_DEADLINE);

      if ($entity->isNew()) {
        // On node insert.
        if (empty($entity->get('field_reply_deadline')->getValue())){
          $entity->set('field_reply_deadline', $deadline->format(self::DEFAULT_DB_SAVE_DATETIME_FORMAT));
        }
      }
      else {
        // On node update.
        if (((int)$entity->get('publish_on')->value !== (int)$entity->getOriginal()->get('publish_on')->value) && empty($entity->get('field_reply_deadline')->getValue())) {
          $entity->set('field_reply_deadline', $deadline->format(self::DEFAULT_DB_SAVE_DATETIME_FORMAT));
        }
      }

      if ($entity->get('field_reply_deadline')->getValue() < $now) {
        $entity->set('field_reply_deadline_exceeded', TRUE);
      }
    }
  }
}
