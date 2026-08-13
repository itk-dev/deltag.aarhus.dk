<?php

namespace Drupal\hoeringsportal_project\Hook;

use Drupal\Core\Cache\Cache;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\DependencyInjection\AutowireTrait;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Logger\LoggerChannelInterface;
use Drupal\Core\Routing\UrlGeneratorInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\hoeringsportal_project\Helper\Helper;
use Drupal\node\NodeInterface;

/**
 * Hooks for project-related operations.
 */
class ProjectHooks {
  use StringTranslationTrait;
  use AutowireTrait;

  public const string STATUS_COMPLETED = 'completed';
  // Used for items whose start time and end time are on the same day and said
  // day is today.
  public const string STATUS_CURRENT = 'current';
  // Used for items where "now" is between the item's start and end times.
  public const string STATUS_IN_PROGRESS = 'in_progress';
  public const string STATUS_NOTE = 'note';
  public const string STATUS_UPCOMING = 'upcoming';

  /**
   * The logger channel.
   *
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   */
  protected LoggerChannelInterface $logger;

  public function __construct(
    protected EntityTypeManagerInterface $entityTypeManagerInterface,
    protected UrlGeneratorInterface $urlGenerator,
    LoggerChannelFactoryInterface $loggerFactory,
    protected Helper $helper,
  ) {
    $this->logger = $loggerFactory->get('hoeringsportal_project');
  }

  /**
   * Implements hook_preprocess_node().
   *
   * @param array $variables
   *   The template variables array.
   */
  #[Hook('preprocess_node')]
  public function preprocessNode(array &$variables): void {
    if ('full' === $variables['view_mode'] && 'project_main_page' === $variables['node']->bundle()) {
      if (!$variables['node']->field_show_timeline->value) {
        return;
      }

      $variables['timeline_items'] = [];
      $now = new DrupalDateTime();

      $nodes = $this->helper->getTimelineNodes($variables['node']);

      foreach ($nodes as $node) {
        $item = $this->helper->addNodeAsTimelineItem($node, $now);
        if (!empty($item)) {
          $variables['timeline_items'][] = $item;
        }
      }

      $notes = $this->helper->getTimelineNotes($variables['node']);

      foreach ($notes as $note) {
        $item = $this->helper->addNoteAsTimelineItem($note, $now);
        if (!empty($item)) {
          $variables['timeline_items'][] = $item;
        }
      }

      $variables['timeline_items'][] = $this->helper->addNowAsTimelineItem($now);
      usort($variables['timeline_items'], static fn(array $a, array $b): int => $a['date'] <=> $b['date']);

      $variables['legend_items'] = [
        ['status' => self::STATUS_COMPLETED, 'label' => $this->t('Finished')],
        ['status' => self::STATUS_CURRENT, 'label' => $this->t('In progress')],
        ['status' => self::STATUS_IN_PROGRESS, 'label' => $this->t('In progress')],
        ['status' => self::STATUS_NOTE, 'label' => $this->t('Note')],
        ['status' => self::STATUS_UPCOMING, 'label' => $this->t('Upcoming')],
      ];
    }
  }

  /**
   * Implements hook_FORMID_form_alter().
   *
   * @param array $form
   *   The form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state object.
   */
  #[Hook('form_node_project_main_page_form_alter')]
  #[Hook('form_node_project_main_page_edit_form_alter')]
  public function projectFormAlter(array &$form, FormStateInterface $form_state): void {
    $timelineSelector = ':input[name="field_show_timeline[value]"]';

    $form['field_timeline']['#states'] = [
      'visible' => [
        $timelineSelector => ['checked' => TRUE],
      ],
    ];
  }

  /**
   * Implements hook_preprocess_node().
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The entity being saved.
   */
  #[Hook('entity_presave')]
  public function entityPresave(EntityInterface $entity): void {
    if ($entity instanceof NodeInterface) {
      // When changing references, we must clear cache for nodes that was
      // previously referenced as well as new referenced nodes.
      try {
        if ($entity->hasField('field_project_reference')) {
          $newTargetId = (int) ($entity->get('field_project_reference')->target_id ?? 0);

          $originalEntity = $entity->original ?? NULL;
          $originalTargetId = 0;
          if ($originalEntity?->hasField('field_project_reference')) {
            $originalTargetId = (int) ($originalEntity->get('field_project_reference')->target_id ?? 0);
          }

          // Only act if the reference actually changed.
          if ($originalTargetId === $newTargetId) {
            return;
          }

          $idsToReset = [];
          if ($originalTargetId > 0) {
            $idsToReset[] = $originalTargetId;
          }
          if ($newTargetId > 0) {
            $idsToReset[] = $newTargetId;
          }

          if ($idsToReset === []) {
            return;
          }

          // Clear cache for project nodes when we change an entity pointing to
          // it.
          $idsToReset = array_values(array_unique($idsToReset));
          $nodes = $this->entityTypeManagerInterface->getStorage('node')->loadMultiple($idsToReset);
          foreach ($nodes as $node) {
            Cache::invalidateTags($node->getCacheTags());
          }
        }
      }
      catch (\Exception $e) {
        $this->logger->error('Error in node presave hook: @message', ['@message' => $e->getMessage()]);
      }
    }
  }

}
