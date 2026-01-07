<?php

namespace Drupal\hoeringsportal_activity\Drush\Commands;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\State\StateInterface;
use Drupal\hoeringsportal_activity\Helper\ActivityHelper;
use Drush\Attributes as CLI;
use Drush\Commands\DrushCommands as BaseDrushCommands;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Custom drush commands for hoeringsportal_activity.
 */
final class DrushCommands extends BaseDrushCommands {

  /**
   * Constructor.
   */
  public function __construct(
    private readonly ActivityHelper $helper,
    private readonly TimeInterface $time,
    private readonly StateInterface $state,
  ) {
    parent::__construct();
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get(ActivityHelper::class),
      $container->get('datetime.time'),
      $container->get('state')
    );
  }

  /**
   * Updates state on courses.
   *
   * @command hoeringsportal:course:state-update
   * @usage hoeringsportal:course:state-update
   *   Update state for all courses.
   */
  #[CLI\Command(name: 'hoeringsportal:course:state-update')]
  public function updateCourseState() {
    $courses = $this->helper->loadCourses();
    foreach ($courses as $course) {
      $newState = $this->helper->computeState($course);
      if ($this->helper->getState($course) !== $newState) {
        $this->helper->setState($course, $newState)->save();
        $this->writeln(json_encode([$course->id(), $newState]));
      }
    }

    $this->setLastRunAt(__METHOD__);
  }

  /**
   * Showa course states.
   *
   * @command hoeringsportal:course:state-show
   * @usage hoeringsportal:course:state-show
   *   Show state for all courses.
   */
  #[CLI\Command(name: 'hoeringsportal:course:state-show')]
  public function showCourseState() {
    $meetings = $this->helper->loadCourses();

    foreach ($meetings as $meeting) {
      $this->writeln(sprintf('%4d: %s', $meeting->id(), $this->helper->getState($meeting)));
    }
  }

  /**
   * Set time of last run.
   */
  private function setLastRunAt(string $method) {
    $this->state->set($this->getLastRunKey($method), $this->time->getRequestTime());
  }

  /**
   * Get last run key.
   */
  private function getLastRunKey(string $method): string {
    return $method . '_last_run_at';
  }

}
