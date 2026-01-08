<?php

namespace Drupal\hoeringsportal_activity\Helper;

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\node\Entity\Node;
use Drupal\node\NodeInterface;

/**
 * Provides utility methods for handling activity-related operations.
 */
#[\AllowDynamicProperties]
class ActivityHelper {

  const string NODE_TYPE_COURSE = 'course';

  const string STATE_UPCOMING = 'upcoming';

  const string STATE_ACTIVE = 'active';

  const string STATE_FINISHED = 'finished';

  public function __construct(
    private readonly EntityTypeManagerInterface $entityTypeManager,
    RouteMatchInterface $routeMatch,
  ) {
  }

  /**
   * Set content state on course save.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The entity.
   */
  public function coursePresave(EntityInterface $entity): void {
    if ($entity instanceof NodeInterface) {
      $newState = $this->computeState($entity);
      if ($this->getState($entity) !== $newState) {
        $entity->set('field_content_state', $newState);
      }
    }
  }

  /**
   * Alter course form.
   *
   * @param array $form
   *   The form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   */
  public function activityFormAlter(&$form, $form_state): void {
    // Handle js changes to form in custom javascript, it's too complex for
    // form states.
    if ('course' === $form_state->getFormObject()->getEntity()->bundle()) {
      $form['#attached']['library'][] = 'hoeringsportal_activity/course_form_alter';
    }

    // Dawa functionality to address field.
    $form['field_address']['widget'][0]['value']['#attributes']['class'][] = 'js-dawa-element';
  }

  /**
   * Load public_meetings.
   */
  public function loadCourses(array $conditions = []): array {
    $query = $this->entityTypeManager->getStorage('node')->getQuery();
    $query->accessCheck();
    $query->condition('type', self::NODE_TYPE_COURSE);
    $nids = $query->execute();

    return Node::loadMultiple($nids);
  }

  /**
   * Compute course state.
   *
   * @param \Drupal\node\NodeInterface $course
   *   The course node.
   *
   * @return string|null
   *   The computed course state or NULL if the course is not valid.
   */
  public function computeState(NodeInterface $course): ?string {
    if (!$this->isCourse($course)) {
      return NULL;
    }

    $now = $this->getDateTime();
    $startTime = $this->getStartTime($course);
    $endTime = $this->getEndTime($course);
    if (empty($startTime) || $startTime >= $now) {
      return self::STATE_UPCOMING;
    }

    if (empty($endTime) || $now >= $endTime) {
      return self::STATE_FINISHED;
    }

    return self::STATE_ACTIVE;
  }

  /**
   * Get a date time object.
   *
   * @param string $time
   *   The time string.
   * @param string $timezone
   *   The timezone.
   *
   * @return \Drupal\Core\Datetime\DrupalDateTime
   *   The date time object.
   */
  private function getDateTime($time = 'now', $timezone = 'UTC'): DrupalDateTime {
    return new DrupalDateTime($time, $timezone);
  }

  /**
   * Check if node is a course.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node.
   *
   * @return bool
   *   TRUE if the node is a course, FALSE otherwise.
   */
  public function isCourse(NodeInterface $node): bool {
    return self::NODE_TYPE_COURSE === $node->bundle();
  }

  /**
   * Get start time for a course.
   *
   * @param \Drupal\node\NodeInterface $course
   *   The course node.
   *
   * @return \Drupal\Core\Datetime\DrupalDateTime|null
   *   The start time or NULL if the course is not valid.
   */
  public function getStartTime(NodeInterface $course): ?DrupalDateTime {
    if (!$this->isCourse($course)) {
      return NULL;
    }

    return $course->field_first_meeting_time->date;
  }

  /**
   * Get end time for a course.
   *
   * @param \Drupal\node\NodeInterface $course
   *   The course node.
   *
   * @return \Drupal\Core\Datetime\DrupalDateTime|null
   *   The end time or NULL if the course is not valid.
   */
  public function getEndTime(NodeInterface $course): ?DrupalDateTime {
    if (!$this->isCourse($course)) {
      return NULL;
    }

    return $course->field_last_meeting_time->date;
  }

  /**
   * Get course state.
   *
   * @param \Drupal\node\NodeInterface $course
   *   The course node.
   *
   * @return string|null
   *   The course state or NULL if the course is not valid.
   */
  public function getState(NodeInterface $course) {
    if (!$this->isCourse($course)) {
      return NULL;
    }

    return $course->field_content_state->value;
  }

  /**
   * Set course state.
   *
   * @param \Drupal\node\NodeInterface $course
   *   The course node.
   * @param string $state
   *   The state.
   */
  public function setState(NodeInterface $course, string $state) {
    $course->field_content_state->value = $state;

    return $course;
  }

}
