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

  const string STATE_ACTIVE = 'active';

  const string STATE_FINISHED = 'finished';

  public function __construct(
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ) {
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
   * Compute decision state.
   *
   * @param \Drupal\node\NodeInterface $decision
   *   The decision node.
   *
   * @return string|null
   *   The computed decision state or NULL if the decision is not valid.
   */
  public function computeState(NodeInterface $decision): ?string {
    if (!$this->isDecision($decision)) {
      return NULL;
    }

    $now =  new DrupalDateTime('now', 'UTC');
    $endTime = $this->getDeadline($decision);

    if (empty($endTime) || $now >= $endTime) {
      return self::STATE_FINISHED;
    }

    return self::STATE_ACTIVE;
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

  /**
   * Get decision state.
   *
   * @param \Drupal\node\NodeInterface $decision
   *   The decision node.
   *
   * @return string|null
   *   The decision state or NULL if the decision is not valid.
   */
  public function getState(NodeInterface $decision) {
    if (!$this->isDecision($decision)) {
      return NULL;
    }

    return $decision->field_content_state->value;
  }

  /**
   * Set decision state.
   *
   * @param \Drupal\node\NodeInterface $decision
   *   The decision node.
   * @param string $state
   *   The state.
   */
  public function setState(NodeInterface $decision, string $state) {
    $decision->field_content_state->value = $state;

    return $decision;
  }

}
