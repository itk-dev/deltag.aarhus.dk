<?php

namespace Drupal\hoeringsportal_decision\Helper;

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\node\NodeInterface;

/**
 * Provides utility methods for handling activity-related operations.
 */
#[\AllowDynamicProperties]
class DecisionHelper {

  const string NODE_TYPE_DECISION = 'decision';

  public function __construct(
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ){
  }

  /**
   * Load decisions.
   *
   * @return array
   *   An array of decision nodes.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function loadDecisions(): array {
    $storage = $this->entityTypeManager->getStorage('node');
    $query = $storage->getQuery();
    $query->accessCheck();
    $query->condition('type', self::NODE_TYPE_DECISION);
    $nids = $query->execute();

    return $storage->loadMultiple($nids);
  }

  /**
   * Compute decision deadline exceeded.
   *
   * @param \Drupal\node\NodeInterface $decision
   *   The decision node.
   *
   * @return bool|null Whether the deadline is exceeded.
   *   Whether the deadline is exceeded.
   */
  public function deadlineExceeded(NodeInterface $decision): ?bool {
    if (!$this->isDecision($decision)) {
      return NULL;
    }

    $now = new DrupalDateTime('now', 'UTC');
    $deadline = $this->getDeadline($decision);

    return $deadline && $now > $deadline;
  }

  /**
   * Set deadline passed to true.
   *
   * @param \Drupal\node\NodeInterface $decision
   *   The decision node.
   *
   * @return void
   */
  public function setDeadlinePassed(NodeInterface $decision): void {
    try {
      $decision->set('field_reply_deadline_exceeded', TRUE);
      $decision->save();
    }
    catch (\Exception) {

    }

  }

  /**
   * Check if deadline exceeded is set.
   *
   * @param \Drupal\node\NodeInterface $decision
   *   The decision node.
   *
   * @return bool
   */
  public function exceededIsSet(NodeInterface $decision): bool {
    return $decision->get('field_reply_deadline_exceeded')->value ?? FALSE;
  }

  /**
   * Check if node is a decision.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node.
   *
   * @return bool
   *   TRUE if the node is a decision, FALSE otherwise.
   */
  public function isDecision(NodeInterface $node): bool {
    return self::NODE_TYPE_DECISION === $node->bundle();
  }

  /**
   * Get deadline for decision.
   *
   * @param \Drupal\node\NodeInterface $decision
   *   The decision node.
   *
   * @return \Drupal\Core\Datetime\DrupalDateTime|null
   *   The deadline if decision is valid and has one.
   */
  public function getDeadline(NodeInterface $decision): ?DrupalDateTime {
    if (!$this->isDecision($decision)) {
      return NULL;
    }

    return $decision->field_reply_deadline->date;
  }

}
