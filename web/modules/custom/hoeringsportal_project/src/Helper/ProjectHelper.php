<?php

namespace Drupal\hoeringsportal_project\Helper;

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Logger\LoggerChannelInterface;
use Drupal\Core\Routing\UrlGeneratorInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\file\Entity\File;
use Drupal\image\Entity\ImageStyle;
use Drupal\node\NodeInterface;
use Drupal\paragraphs\ParagraphInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Hook\Attribute\Hook;

/**
 * Helper class for project-related operations.
 */
class ProjectHelper {
  use StringTranslationTrait;

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
  ) {
    $this->logger = $loggerFactory->get('hoeringsportal_project');
  }

  /**
   * Implements hook_preprocess_node().
   *
   * @param array $variables
   *   The template variables array.
   */
  #[Hook('preprocess')]
  public function projectPreprocess(array &$variables): void {
    if ('full' === $variables['view_mode'] && 'project_main_page' === $variables['node']->bundle()) {
      if (!$variables['node']->field_show_timeline->value) {
        return;
      }

      $variables['timeline_items'] = [];
      $now = new \DateTimeImmutable();

      $nodes = $this->getTimelineNodes($variables);

      foreach ($nodes as $node) {
        $item = $this->addNodeAsTimelineItem($node, $now);
        if (!empty($item)) {
          $variables['timeline_items'][] = $item;
        }
      }

      $notes = $this->getTimelineNotes($variables);

      foreach ($notes as $note) {
        $item = $this->addNoteAsTimelineItem($note, $now);
        if (!empty($item)) {
          $variables['timeline_items'][] = $item;
        }
      }

      $variables['timeline_items'][] = $this->addNowAsTimelineItem($now);
      usort($variables['timeline_items'], static fn(array $a, array $b): int => $a['date'] <=> $b['date']);

      $variables['legend_items'] = [
        ['status' => 'completed', 'label' => $this->t('Finished')],
        ['status' => 'current', 'label' => $this->t('In progress')],
        ['status' => 'upcoming', 'label' => $this->t('Upcoming')],
        ['status' => 'note', 'label' => $this->t('Note')],
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
  public function nodePresave(EntityInterface $entity): void {
    try {
      if (!$entity->hasField('field_project_reference')) {
        return;
      }

      $newTargetId = (int) ($entity->get('field_project_reference')->target_id ?? 0);

      $originalEntity = $entity->original ?? NULL;
      $oldTargetId = 0;
      if ($originalEntity?->hasField('field_project_reference')) {
        $oldTargetId = (int) ($originalEntity->get('field_project_reference')->target_id ?? 0);
      }

      // Only act if the reference actually changed.
      if ($oldTargetId === $newTargetId) {
        return;
      }

      $idsToReset = [];
      if ($oldTargetId > 0) {
        $idsToReset[] = $oldTargetId;
      }
      if ($newTargetId > 0) {
        $idsToReset[] = $newTargetId;
      }

      if ($idsToReset === []) {
        return;
      }

      $idsToReset = array_values(array_unique($idsToReset));
      $this->entityTypeManagerInterface->getStorage('node')->resetCache($idsToReset);
    }
    catch (\Exception $e) {
      $this->logger->error('Error in node presave hook: @message', ['@message' => $e->getMessage()]);
    }
  }

  /**
   * Get timeline nodes.
   *
   * @param array $variables
   *   The template variables array.
   *
   * @return array|null
   *   Array of node entities or NULL.
   */
  private function getTimelineNodes(array $variables) : ?array {
    try {
      $nodeStorage = $this->entityTypeManagerInterface->getStorage('node');

      $referenceQuery = $nodeStorage->getQuery();
      $dateFieldQuery = $referenceQuery->orConditionGroup()
        ->exists('field_decision_date')
        ->exists('field_start_date')
        ->exists('field_last_meeting_time')
        ->condition('type', 'dialogue', '=');

      $referenceQuery->accessCheck();
      $referenceQuery->exists('field_project_reference');
      $referenceQuery->condition('field_project_reference', $variables['node']->id());
      $referenceQuery->condition('field_hide_in_timeline', FALSE);
      $referenceQuery->condition($dateFieldQuery);
      $references = $referenceQuery->execute();

      return $nodeStorage->loadMultiple($references);
    }
    catch (\Exception $e) {
      $this->logger->error('Error getting timeline nodes: @message', ['@message' => $e->getMessage()]);
      return [];
    }
  }

  /**
   * Get timeline notes.
   *
   * @param array $variables
   *   The template variables array.
   *
   * @return array|null
   *   Array of paragraph entities or NULL.
   */
  private function getTimelineNotes(array $variables) : ?array {
    try {
      $paragraphStorage = $this->entityTypeManagerInterface->getStorage('paragraph');
      $noteQuery = $paragraphStorage->getQuery();
      $noteQuery->accessCheck();
      $noteQuery->condition('parent_id', $variables['node']->id());
      $noteQuery->condition('type', 'timeline_note');
      $noteIds = $noteQuery->execute();

      return $paragraphStorage->loadMultiple($noteIds);
    }
    catch (\Exception $e) {
      $this->logger->error('Error getting timeline notes: @message', ['@message' => $e->getMessage()]);
      return [];
    }
  }

  /**
   * Add node as timeline item.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node entity to add.
   * @param \DateTimeImmutable $now
   *   The current date and time.
   *
   * @return array
   *   The timeline item array.
   */
  private function addNodeAsTimelineItem(NodeInterface $node, \DateTimeImmutable $now): array {
    try {
      $date = $this->determineDate($node);
      if (!$date) {
        return [];
      }
      $image = $this->determineImage($node)?->getFileUri();

      return [
        'id' => $node->id(),
        'date' => $date->format('Y-m-d'),
        'month' => $date->format('F Y'),
        'title' => $node->getTitle(),
        'subtitle' => $node->type->entity->label(),
        'description' => $node->field_teaser->value,
        'status' => $this->determineStatus($node, $date->format('Y-m-d'), $now->format('Y-m-d')),
        'image' => $image ? ImageStyle::load('responsive_medium_default')->buildUrl($image) : NULL,
        'link' => $this->urlGenerator->generateFromRoute('entity.node.canonical', ['node' => $node->id()]),
        'linkText' => $this->t('View @type', ['@type' => $node->type->entity->label()]),
        'accentColor' => ($node->bundle() == 'course' || $node->bundle() == 'public_meeting') ? 'pink' : NULL,
      ];
    }
    catch (\Exception $e) {
      $this->logger->error('Error adding node as timeline item: @message', ['@message' => $e->getMessage()]);
      return [];
    }
  }

  /**
   * Add note as timeline item.
   *
   * @param \Drupal\paragraphs\ParagraphInterface $paragraph
   *   The paragraph entity to add.
   * @param \DateTimeImmutable $now
   *   The current date and time.
   *
   * @return array
   *   The timeline item array.
   */
  private function addNoteAsTimelineItem(ParagraphInterface $paragraph, \DateTimeImmutable $now): array {
    try {
      $date = $paragraph->field_date->date;
      if (!$date) {
        return [];
      }
      $image = $paragraph?->field_paragraph_image?->entity?->field_itk_media_image_upload?->entity?->getFileUri();

      return [
        'id' => 'note-' . $paragraph->id(),
        'date' => $date->format('Y-m-d'),
        'month' => $date->format('F Y'),
        'title' => $paragraph->field_title->value,
        'subtitle' => $paragraph->field_subtitle->value,
        'description' => $paragraph->field_note->value,
        'status' => $this->determineStatus($paragraph, $date->format('Y-m-d'), $now->format('Y-m-d')),
        'image' => $image ? ImageStyle::load('responsive_medium_default')->buildUrl($image) : NULL,
        'link' => $paragraph?->field_external_link?->uri ?? '',
        'linkText' => $this->t('View more'),
      ];
    }
    catch (\Exception $e) {
      $this->logger->error('Error adding note as timeline item: @message', ['@message' => $e->getMessage()]);
      return [];
    }
  }

  /**
   * Add "today" timeline item.
   *
   * @param \DateTimeImmutable $now
   *   The current date and time.
   *
   * @return array
   *   The timeline item array.
   */
  private function addNowAsTimelineItem(\DateTimeImmutable $now): array {
    return [
      'id' => 'today',
      'date' => $now->format('Y-m-d'),
      'month' => $now->format('d-m-Y'),
      'title' => $this->t('Project status'),
      'subtitle' => NULL,
      'description' => NULL,
      'status' => 'current',
      'image' => NULL,
      'link' => NULL,
      'linkText' => NULL,
      'is_today_marker' => TRUE,
    ];
  }

  /**
   * Determine date for timeline item.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node entity to extract the date from.
   *
   * @return \Drupal\Core\Datetime\DrupalDateTime|null
   *   The determined date or NULL if no date could be determined.
   */
  private function determineDate(NodeInterface $node): ?DrupalDateTime {
    try {
      return match (TRUE) {
        $node->hasField('field_decision_date') => new DrupalDateTime($node->field_decision_date->value),
        $node->hasField('field_start_date') => new DrupalDateTime($node->field_start_date->value),
        $node->hasField('field_last_meeting_time') => new DrupalDateTime($node->field_last_meeting_time->value),
        'dialogue' === $node->getType() => new DrupalDateTime(strtotime($node->getCreatedTime())),
        default => NULL,
      };
    }
    catch (\Exception $e) {
      $this->logger->error('Error determining date for node @nid: @message', [
        '@nid' => $node->id()
        , '@message' => $e->getMessage(),
      ]);
      return NULL;
    }
  }

  /**
   * Determine image for timeline item.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node entity to extract the image from.
   *
   * @return \Drupal\file\Entity\File|null
   *   The file entity or NULL if no image found.
   */
  private function determineImage(NodeInterface $node): ?File {
    try {
      return match (TRUE) {
        $node->hasField('field_media_image') => $node->field_media_image->entity->field_itk_media_image_upload->entity,
        $node->hasField('field_media_image_single') => $node->field_media_image_single->entity->field_itk_media_image_upload->entity,
        $node->hasField('field_top_images') => $node->field_top_images->entity->field_itk_media_image_upload->entity,
        default => NULL,
      };
    }
    catch (\Exception $e) {
      $this->logger->error('Error determining image for node @nid: @message', [
        '@nid' => $node->id(),
        '@message' => $e->getMessage(),
      ]);
      return NULL;
    }
  }

  /**
   * Determine status of timeline item.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The entity to determine status for.
   * @param string $date
   *   The item date in Y-m-d format.
   * @param string $now
   *   The current date in Y-m-d format.
   *
   * @return string
   *   The status string (upcoming, completed, or note).
   */
  private function determineStatus(EntityInterface $entity, string $date, string $now): string {
    return match (TRUE) {
      $date > $now => 'upcoming',
      $entity->getEntityTypeId() === 'node' => 'completed',
      $entity->getEntityTypeId() === 'paragraph' => 'note',
      default => '',
    };
  }

}
