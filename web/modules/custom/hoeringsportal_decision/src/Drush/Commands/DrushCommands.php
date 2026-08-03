<?php

namespace Drupal\hoeringsportal_decision\Drush\Commands;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\State\StateInterface;
use Drupal\hoeringsportal_decision\Helper\DecisionHelper;
use Drush\Attributes as CLI;
use Drush\Commands\DrushCommands as BaseDrushCommands;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Custom drush commands for hoeringsportal_decision.
 */
final class DrushCommands extends BaseDrushCommands {

  /**
   * Constructor.
   */
  public function __construct(
    private readonly DecisionHelper $helper,
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
      $container->get(DecisionHelper::class),
      $container->get('datetime.time'),
      $container->get('state')
    );
  }

  /**
   * Updates state on decisions.
   *
   * @command hoeringsportal:decision:state-update
   * @usage hoeringsportal:decision:state-update
   *   Update state for all decisions.
   */
  #[CLI\Command(name: 'hoeringsportal:decision:state-update')]
  public function updateDecisionState() {
    $decisions = $this->helper->loadDecisions();

    foreach ($decisions as $decision) {
      if (empty($decision->get('field_reply_deadline_passed')->value) && $this->helper->deadlinePassed($decision)) {
        $this->helper->setDeadlinePassed($decision);
        $this->writeln(json_encode([$decision->id(), 'state']));
      }
    }

    $this->setLastRunAt(__METHOD__);
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
