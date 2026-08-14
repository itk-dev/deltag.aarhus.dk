<?php

namespace Drupal\hoeringsportal_project\Helper;

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\DependencyInjection\AutowireTrait;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Logger\LoggerChannelInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\file\Entity\File;
use Drupal\hoeringsportal_dialogue\Helper\DialogueHelper;
use Drupal\image\Entity\ImageStyle;
use Drupal\node\Entity\Node;
use Drupal\node\NodeInterface;
use Drupal\paragraphs\ParagraphInterface;
use Drupal\Core\Routing\UrlGeneratorInterface;

/**
 * Helper for project-related operations.
 */
class Helper {

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
  ) {
    $this->logger = $loggerFactory->get('hoeringsportal_project');
  }

  /**
   * Get timeline nodes.
   *
   * @param \Drupal\node\Entity\Node|null $node
   *   A node entity.
   *
   * @return array|null
   *   Array of node entities or NULL.
   */
  public function getTimelineNodes(?Node $node) : ?array {
    try {
      $nodeStorage = $this->entityTypeManagerInterface->getStorage('node');

      $referenceQuery = $nodeStorage->getQuery();
      $dateFieldQuery = $referenceQuery->orConditionGroup()
        ->exists('field_decision_date')
        ->exists('field_start_date')
        ->exists('field_last_meeting_time')
        ->condition('type', DialogueHelper::DIALOGUE_TYPE, '=');

      $referenceQuery->accessCheck();
      $referenceQuery->exists('field_project_reference');
      $referenceQuery->condition('field_project_reference', $node->id());
      $referenceQuery->condition('status', 1);
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
   * @param \Drupal\node\Entity\Node|null $node
   *   A node entity.
   *
   * @return array|null
   *   Array of paragraph entities or NULL.
   */
  public function getTimelineNotes(?Node $node) : ?array {
    if ($node->hasField('field_timeline')) {
      /** @var \Drupal\Core\Field\EntityReferenceFieldItemListInterface $list */
      $list = $node->get('field_timeline');

      return $list->referencedEntities();
    }

    return NULL;
  }

  /**
   * Add a node as a timeline item.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node entity to add.
   * @param \Drupal\Core\Datetime\DrupalDateTime $now
   *   The current date and time.
   *
   * @return array
   *   The timeline item array.
   */
  public function addNodeAsTimelineItem(NodeInterface $node, DrupalDateTime $now): array {
    try {
      [$startTime, $endTime] = $this->determineTimes($node);
      if (!$startTime) {
        return [];
      }
      $image = $this->determineImage($node)?->getFileUri();

      return [
        'id' => $node->id(),
        'date' => $startTime->format('Y-m-d'),
        'month' => $startTime->format('F Y'),
        'title' => $node->getTitle(),
        'subtitle' => $node->type->entity->label(),
        'description' => $node->field_teaser->value,
        'status' => $this->determineStatus($node, $startTime, $endTime, $now),
        'image' => $image ? ImageStyle::load('responsive_medium_default')->buildUrl($image) : NULL,
        'link' => $this->urlGenerator->generateFromRoute('entity.node.canonical', ['node' => $node->id()]),
        'linkText' => $this->t('View <span>@type</span>', ['@type' => $node->type->entity->label()]),
        'accentColor' => $this->determineAccentColor($node->bundle()),
      ];
    }
    catch (\Exception $e) {
      $this->logger->error('Error adding node as timeline item: @message', ['@message' => $e->getMessage()]);
      return [];
    }
  }

  /**
   * Add a note as a timeline item.
   *
   * @param \Drupal\paragraphs\ParagraphInterface $paragraph
   *   The paragraph entity to add.
   * @param \Drupal\Core\Datetime\DrupalDateTime $now
   *   The current date and time.
   *
   * @return array
   *   The timeline item array.
   */
  public function addNoteAsTimelineItem(ParagraphInterface $paragraph, DrupalDateTime $now): array {
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
        'status' => $this->determineStatus($paragraph, $date, $date, $now),
        'image' => $image ? ImageStyle::load('responsive_medium_default')->buildUrl($image) : NULL,
        'link' => $paragraph?->field_external_link?->uri ?? '',
        'linkText' => $this->t('View more'),
        'accentColor' => 'blue',
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
   * @param \Drupal\Core\Datetime\DrupalDateTime $now
   *   The current date and time.
   *
   * @return array
   *   The timeline item array.
   */
  public function addNowAsTimelineItem(DrupalDateTime $now): array {
    return [
      'id' => 'today',
      'date' => $now->format('Y-m-d'),
      'month' => $now->format('d-m-Y'),
      'title' => $this->t('Project status'),
      'subtitle' => NULL,
      'description' => NULL,
      'status' => self::STATUS_CURRENT,
      'image' => NULL,
      'link' => NULL,
      'linkText' => NULL,
      'is_today_marker' => TRUE,
    ];
  }

  /**
   * Determine start and end times for a timeline item.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node entity to extract the date from.
   *
   * @return array{
   *   0: \Drupal\Core\Datetime\DrupalDateTime|null,
   *   1: \Drupal\Core\Datetime\DrupalDateTime|null,
   *   }
   *   The determined start and end times if any.
   */
  private function determineTimes(NodeInterface $node): array {
    try {
      switch ($node->getType()) {
        case 'course':
        case 'event':
          return [
            DrupalDateTime::createFromFormat('Y-m-d\TH:i:s', $node->get('field_first_meeting_time')->value),
            DrupalDateTime::createFromFormat('Y-m-d\TH:i:s', $node->get('field_last_meeting_time')->value),
          ];

        case 'public_meeting':
          return [
            DrupalDateTime::createFromFormat('Y-m-d\TH:i:s', $node->get('field_last_meeting_time')->value),
            DrupalDateTime::createFromFormat('Y-m-d\TH:i:s', $node->get('field_last_meeting_time')->value),
          ];

        case 'decision':
          return [
            DrupalDateTime::createFromFormat('Y-m-d', $node->get('field_decision_date')->value),
            DrupalDateTime::createFromFormat('Y-m-d', $node->get('field_decision_date')->value),
          ];

        case 'dialogue':
          return [
            DrupalDateTime::createFromTimestamp($node->getCreatedTime()),
            DrupalDateTime::createFromTimestamp($node->getCreatedTime()),
          ];

        case 'hearing':
          return [
            DrupalDateTime::createFromFormat('Y-m-d\TH:i:s', $node->get('field_start_date')->value),
            DrupalDateTime::createFromFormat('Y-m-d\TH:i:s', $node->get('field_reply_deadline')->value),
          ];

        default:
          throw new \RuntimeException(sprintf('Unhandled node type: %s',
            $node->getType()));
      }
    }
    catch (\Exception $e) {
      $this->logger->error('Error determining date for node @nid: @message', [
        '@nid' => $node->id(),
        '@message' => $e->getMessage(),
      ]);
      return [NULL, NULL];
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
   * @param \Drupal\Core\Datetime\DrupalDateTime $startTime
   *   The start time.
   * @param \Drupal\Core\Datetime\DrupalDateTime $endTime
   *   The end time.
   * @param \Drupal\Core\Datetime\DrupalDateTime $now
   *   The current date.
   *
   * @return string
   *   The status (one ot the STATUS_… constants).
   */
  private function determineStatus(EntityInterface $entity, DrupalDateTime $startTime, DrupalDateTime $endTime, DrupalDateTime $now): string {
    $startDay = $startTime->format('Y-m-d');
    $endDay = $endTime->format('Y-m-d');
    $today = $now->format('Y-m-d');

    return match (TRUE) {
      $startDay === $endDay && $endDay === $today => self::STATUS_CURRENT,
      $startTime <= $now && $now <= $endTime => self::STATUS_IN_PROGRESS,
      $startTime > $now => self::STATUS_UPCOMING,
      $entity->getEntityTypeId() === 'node' => self::STATUS_COMPLETED,
      $entity->getEntityTypeId() === 'paragraph' => self::STATUS_NOTE,
      default => '',
    };
  }

  /**
   * Determine accent color based on content type.
   *
   * @param string $bundle
   *   The entity bundle/type.
   *
   * @return string|null
   *   The accent color (green, pink, blue) or NULL.
   */
  private function determineAccentColor(string $bundle): ?string {
    return match ($bundle) {
      'hearing', 'decision', 'dialogue' => 'green',
      'course', 'public_meeting' => 'pink',
      default => NULL,
    };
  }

}
