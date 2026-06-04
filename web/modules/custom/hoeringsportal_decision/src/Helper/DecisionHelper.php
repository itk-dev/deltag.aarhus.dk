<?php

namespace Drupal\hoeringsportal_decision\Helper;

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\node\NodeInterface;

/**
 * Utility methods for the decision (afgørelse) content type.
 *
 * Handles the deadline ("frist") driven status field and the publish date
 * ("publiceringsdato") that schedules when a decision becomes visible.
 */
class DecisionHelper {

  const string NODE_TYPE_DECISION = 'decision';

  const string FRIST_STATUS_ACTIVE = 'aktiv';

  const string FRIST_STATUS_EXPIRED = 'udloebet';

  const string FIELD_DEADLINE = 'field_deadline';

  const string FIELD_PUBLISH_DATE = 'field_publish_date';

  const string FIELD_FRIST_STATUS = 'field_friststatus';

  public function __construct(
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ) {
  }

  /**
   * Check if a node is a decision.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node.
   *
   * @return bool
   *   TRUE if the node is a decision.
   */
  public function isDecision(NodeInterface $node): bool {
    return self::NODE_TYPE_DECISION === $node->bundle();
  }

  /**
   * Get the deadline ("frist") date of a decision.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The decision node.
   *
   * @return \Drupal\Core\Datetime\DrupalDateTime|null
   *   The deadline, or NULL if not set or not a decision.
   */
  public function getDeadline(NodeInterface $node): ?DrupalDateTime {
    if (!$this->isDecision($node) || $node->get(self::FIELD_DEADLINE)->isEmpty()) {
      return NULL;
    }

    return $node->get(self::FIELD_DEADLINE)->date;
  }

  /**
   * Get the deadline as a Unix timestamp (for use in templates).
   *
   * @param \Drupal\node\NodeInterface $node
   *   The decision node.
   *
   * @return int|null
   *   The deadline timestamp, or NULL if not set.
   */
  public function getDeadlineDate(NodeInterface $node): ?int {
    return $this->getDeadline($node)?->getTimestamp();
  }

  /**
   * Get the publish date ("publiceringsdato") of a decision.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The decision node.
   *
   * @return \Drupal\Core\Datetime\DrupalDateTime|null
   *   The publish date, or NULL if not set or not a decision.
   */
  public function getPublishDate(NodeInterface $node): ?DrupalDateTime {
    if (!$this->isDecision($node) || $node->get(self::FIELD_PUBLISH_DATE)->isEmpty()) {
      return NULL;
    }

    return $node->get(self::FIELD_PUBLISH_DATE)->date;
  }

  /**
   * Check if the deadline has passed.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The decision node.
   *
   * @return bool
   *   TRUE if the deadline is set and is in the past.
   */
  public function isDeadlinePassed(NodeInterface $node): bool {
    $deadline = $this->getDeadline($node);

    return NULL !== $deadline && $deadline < $this->getDateTime();
  }

  /**
   * Compute the deadline status ("friststatus") for a decision.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The decision node.
   *
   * @return string|null
   *   FRIST_STATUS_ACTIVE before the deadline, FRIST_STATUS_EXPIRED after, or
   *   NULL if the node is not a decision or has no deadline.
   */
  public function computeFristStatus(NodeInterface $node): ?string {
    if (!$this->isDecision($node) || NULL === $this->getDeadline($node)) {
      return NULL;
    }

    return $this->isDeadlinePassed($node)
      ? self::FRIST_STATUS_EXPIRED
      : self::FRIST_STATUS_ACTIVE;
  }

  /**
   * Get the currently stored deadline status.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The decision node.
   *
   * @return string|null
   *   The stored status value, or NULL.
   */
  public function getFristStatus(NodeInterface $node): ?string {
    if (!$this->isDecision($node) || $node->get(self::FIELD_FRIST_STATUS)->isEmpty()) {
      return NULL;
    }

    return $node->get(self::FIELD_FRIST_STATUS)->value;
  }

  /**
   * Check whether a decision is due to be published.
   *
   * A decision with a publish date in the future should stay unpublished; once
   * the publish date is reached it may be published.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The decision node.
   *
   * @return bool
   *   TRUE if the publish date is set and has been reached.
   */
  public function isPublishDateReached(NodeInterface $node): bool {
    $publishDate = $this->getPublishDate($node);

    return NULL !== $publishDate && $publishDate <= $this->getDateTime();
  }

  /**
   * Load all decision nodes.
   *
   * @return \Drupal\node\NodeInterface[]
   *   The decision nodes.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function loadDecisions(): array {
    $storage = $this->entityTypeManager->getStorage('node');
    $query = $storage->getQuery();
    $query->accessCheck(FALSE);
    $query->condition('type', self::NODE_TYPE_DECISION);
    $nids = $query->execute();

    return $storage->loadMultiple($nids);
  }

  /**
   * Get a date time object for "now".
   *
   * @return \Drupal\Core\Datetime\DrupalDateTime
   *   The current date time.
   */
  public function getDateTime(): DrupalDateTime {
    return new DrupalDateTime('now', 'UTC');
  }

}
