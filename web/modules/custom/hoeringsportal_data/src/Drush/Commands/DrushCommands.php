<?php

namespace Drupal\hoeringsportal_data\Drush\Commands;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\datetime\Plugin\Field\FieldType\DateTimeItemInterface;
use Drupal\hoeringsportal_data\Helper\HearingHelper;
use Drupal\hoeringsportal_deskpro\Service\HearingHelper as DeskproHearingHelper;
use Drush\Attributes as CLI;
use Drush\Commands\DrushCommands as BaseDrushCommands;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Custom drush commands for hoeringsportal_data.
 */
final class DrushCommands extends BaseDrushCommands {

  /**
   * Constructor.
   */
  public function __construct(
    private readonly HearingHelper $helper,
    private readonly DeskproHearingHelper $deskproHelper,
    private readonly TimeInterface $time,
    private readonly StateInterface $state,
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ) {
    parent::__construct();
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('hoeringsportal_data.hearing_helper'),
      $container->get('hoeringsportal_deskpro.helper'),
      $container->get('datetime.time'),
      $container->get('state'),
      $container->get('entity_type.manager')
    );
  }

  /**
   * Updates state on hearings.
   *
   * @command hoeringsportal:data:hearing-state-update
   * @usage hoeringsportal:data:hearing-state-update
   *   Update state for all hearings.
   */
  #[CLI\Command(name: 'hoeringsportal:data:hearing-state-update')]
  public function updateHearingState() {
    $hearings = $this->helper->loadHearings();

    foreach ($hearings as $hearing) {
      $newState = $this->helper->computeState($hearing);
      if ($this->helper->getState($hearing) !== $newState) {
        $this->helper->setState($hearing, $newState)->save();
        $this->writeln(json_encode([$hearing->id(), $newState]));
      }
    }
  }

  /**
   * Show hearings states.
   *
   * @command hoeringsportal:data:hearing-state-show
   * @usage hoeringsportal:data:hearing-state-show
   *   SHow state for all hearings.
   */
  #[CLI\Command(name: 'hoeringsportal:data:hearing-state-show')]
  public function showHearingState() {
    $hearings = $this->helper->loadHearings();

    foreach ($hearings as $hearing) {
      $this->writeln(sprintf('%4d: %s', $hearing->id(), $this->helper->getState($hearing)));
    }
  }

  /**
   * A drush command for deleting replies from hearings.
   */
  #[CLI\Command(name: 'hoeringsportal:data:delete-replies')]
  #[CLI\Option(name: 'ids', description: 'Comma separated list of ids')]
  public function processDeleteHearingReplies(
    array $options = [
      'ids' => NULL,
      'last-run-at' => NULL,
    ],
  ): void {
    if (!empty($options['ids'])) {
      $hearingIds = preg_split('/\s*,\s*/', $options['ids'] ?? '', PREG_SPLIT_NO_EMPTY);
    }
    else {
      $lastRunAt = $options['last-run-at'] ? new DrupalDateTime($options['last-run-at']) : $this->getLastRunAt(__METHOD__);
      $requestTime = $this->getRequestTime();

      if ($this->io()->isVerbose()) {
        $this->io()->info(sprintf('Finding hearings with delete replies date between %s and %s', $lastRunAt->format('Y-m-d'), $requestTime->format('Y-m-d')));
      }

      $hearingIds = $options['ids'] ?? $this->helper->findHearingWhoseRepliesMustBeDeleted($lastRunAt, $requestTime);
    }

    if (empty($hearingIds)) {
      $this->io()->info('No hearings found');
      return;
    }

    if ($options['yes'] || $this->confirm(sprintf('Delete replies on hearings %s', implode(', ', $hearingIds)))) {
      $hearings = $this->helper->loadHearings([['nid', $hearingIds, 'IN']]);
      foreach ($hearings as $hearing) {
        $hearingRepliesDeletedOn = $this->deskproHelper->getHearingRepliesDeletedOn($hearing);
        if (NULL !== $hearingRepliesDeletedOn) {
          $this->deskproHelper->deleteHearingReplies([$hearing->id()]);
          Cache::invalidateTags($hearing->getCacheTags());

          $this->io()->success(sprintf('Replies deleted from hearing %s',
            $hearing->id()));
        }
        else {
          $this->io()->warning(sprintf('Replies on hearing %s must not yet be deleted', $hearing->id()));
        }
      }

      $this->setLastRunAt(__METHOD__);
    }
  }

  /**
   * Updates reply deadline exceeded on decisions.
   */
  #[CLI\Command(name: 'hoeringsportal:data:decision-deadline-update')]
  public function updateDecisionReplyDeadlineExceeded(): void {
    $now = new DrupalDateTime('now', 'UTC');
    $query = $this->entityTypeManager->getStorage('node')->getQuery()
      ->accessCheck(FALSE)
      ->condition('type', 'decision')
      ->condition('status', 1)
      ->condition('field_reply_deadline', $now->format(DateTimeItemInterface::DATETIME_STORAGE_FORMAT), '<');
    $notExceeded = $query->orConditionGroup()
      ->condition('field_reply_deadline_exceeded', 0)
      ->notExists('field_reply_deadline_exceeded');
    $nids = $query->condition($notExceeded)->execute();

    if (empty($nids)) {
      $this->io()->info('No decisions with exceeded deadlines found.');
      return;
    }

    $nodes = $this->entityTypeManager->getStorage('node')->loadMultiple($nids);
    foreach ($nodes as $node) {
      $node->set('field_reply_deadline_exceeded', TRUE);
      $node->save();
      $this->writeln(sprintf('Updated decision %d: deadline exceeded', $node->id()));
    }
  }

  /**
   * Get request time.
   */
  private function getRequestTime(): DrupalDateTime {
    return DrupalDateTime::createFromTimestamp($this->time->getRequestTime());
  }

  /**
   * Get time of last run.
   */
  private function getLastRunAt(string $method): DrupalDateTime {
    $time = $this->state->get($this->getLastRunKey($method));

    return DrupalDateTime::createFromTimestamp($time ?? 0);
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
