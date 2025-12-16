<?php

namespace Drupal\hoeringsportal_activity\Helper;

use AllowDynamicProperties;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\node\Entity\Node;
use Drupal\node\NodeInterface;

#[AllowDynamicProperties]
class ActivityHelper {

  const string NODE_TYPE_COURSE = 'course';

  const STATE_UPCOMING = 'upcoming';

  const STATE_ACTIVE = 'active';

  const STATE_FINISHED = 'finished';

  public function __construct(
    private readonly EntityTypeManagerInterface $entityTypeManager,
    RouteMatchInterface $routeMatch,
  ) {
  }

  public function coursePresave(EntityInterface $entity) {
    if ($entity instanceof NodeInterface) {
      $newState = $this->computeState($entity);
      if ($this->getState($entity) !== $newState) {
        $entity->set('field_content_state', $newState);
      }
    }
  }

  public function courseFormAlter(&$form, $form_state) {
    // Handle js changes to form in custom javascript, it's too complex for form states.
    $form['#attached']['library'][] = 'hoeringsportal_activity/course_form_alter';

    // Dawa functionality to address field.
    $form['field_address']['widget'][0]['value']['#attributes']['class'][] = 'js-dawa-element';
  }

  /**
   * Load public_meetings.
   */
  public function loadCourses(array $conditions = []) {
    $query = $this->entityTypeManager->getStorage('node')->getQuery();
    $query->accessCheck();
    $query->condition('type', 'course');
    $nids = $query->execute();

    return Node::loadMultiple($nids);
  }

  public function computeState(NodeInterface $course) {
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
   */
  private function getDateTime($time = 'now', $timezone = 'UTC'): DrupalDateTime
  {
    return new DrupalDateTime($time, $timezone);
  }

  /**
   * Check if node is a course.
   */
  public function isCourse(NodeInterface $node): bool
  {
    return self::NODE_TYPE_COURSE === $node->bundle();
  }

  /**
   * Get start time for a course.
   *
   * @return \Drupal\Core\Datetime\DrupalDateTime|null
   *   The end time.
   */
  public function getStartTime(NodeInterface $course): ?DrupalDateTime
  {
    if (!$this->isCourse($course)) {
      return NULL;
    }

    return $course->field_first_meeting_time->date;
  }

  /**
   * Get end time for a course.
   *
   * @return \Drupal\Core\Datetime\DrupalDateTime|null
   *   The end time.
   */
  public function getEndTime(NodeInterface $course): ?DrupalDateTime
  {
    if (!$this->isCourse($course)) {
      return NULL;
    }

    return $course->field_last_meeting_time->date;
  }

  /**
   * Get current course state.
   */
  public function getState(NodeInterface $course) {
    if (!$this->isCourse($course)) {
      return NULL;
    }

    return $course->field_content_state->value;
  }

  /**
   * Set course state.
   */
  public function setState(NodeInterface $course, $state) {
    $course->field_content_state->value = $state;

    return $course;
  }
}
