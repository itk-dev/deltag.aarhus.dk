<?php

namespace Drupal\hoeringsportal_decision\Hook;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\hoeringsportal_decision\Helper\DecisionHelper;
use Drupal\node\NodeInterface;

/**
 * Hook implementations for the decision (afgørelse) content type.
 */
readonly class DecisionHooks {

  public function __construct(
    private DecisionHelper $decisionHelper,
  ) {
  }

  /**
   * Compute the deadline status and apply scheduled publishing on save.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The entity being saved.
   */
  #[Hook('entity_presave')]
  public function decisionPresave(EntityInterface $entity): void {
    if (!$entity instanceof NodeInterface || !$this->decisionHelper->isDecision($entity)) {
      return;
    }

    $this->updateFristStatus($entity);
    $this->applyScheduledPublishing($entity);
  }

  /**
   * Keep deadline status and scheduled publishing current over time.
   *
   * The presave hook only fires when a node is edited, so a decision sitting
   * untouched would never flip from "aktiv" to "udloebet" nor become visible
   * when its publish date is reached. Cron reconciles both on every run.
   */
  #[Hook('cron')]
  public function cron(): void {
    foreach ($this->decisionHelper->loadDecisions() as $decision) {
      $changed = $this->updateFristStatus($decision);
      $changed = $this->applyScheduledPublishing($decision) || $changed;

      if ($changed) {
        $decision->save();
      }
    }
  }

  /**
   * Update the stored deadline status from the deadline date.
   *
   * @param \Drupal\node\NodeInterface $decision
   *   The decision node.
   *
   * @return bool
   *   TRUE if the status changed.
   */
  private function updateFristStatus(NodeInterface $decision): bool {
    $newStatus = $this->decisionHelper->computeFristStatus($decision);
    if (NULL === $newStatus || $this->decisionHelper->getFristStatus($decision) === $newStatus) {
      return FALSE;
    }

    $decision->set(DecisionHelper::FIELD_FRIST_STATUS, $newStatus);

    return TRUE;
  }

  /**
   * Publish a decision once its publish date is reached.
   *
   * A future publish date keeps the decision unpublished; reaching it publishes
   * the decision. Decisions without a publish date are left untouched.
   *
   * @param \Drupal\node\NodeInterface $decision
   *   The decision node.
   *
   * @return bool
   *   TRUE if the published state changed.
   */
  private function applyScheduledPublishing(NodeInterface $decision): bool {
    if (NULL === $this->decisionHelper->getPublishDate($decision)) {
      return FALSE;
    }

    if ($this->decisionHelper->isPublishDateReached($decision)) {
      if (!$decision->isPublished()) {
        $decision->setPublished();

        return TRUE;
      }

      return FALSE;
    }

    if ($decision->isPublished()) {
      $decision->setUnpublished();

      return TRUE;
    }

    return FALSE;
  }

}
