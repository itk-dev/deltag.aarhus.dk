<?php

namespace Drupal\hoeringsportal_project\Helper;

use DateMalformedStringException;
use DateTime;
use DateTimeImmutable;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\UrlGeneratorInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\file\Entity\File;
use Drupal\image\Entity\ImageStyle;
use Drupal\node\NodeInterface;

class ProjectHelper {
  use StringTranslationTrait;

  public function __construct(
    protected EntityTypeManagerInterface $entityTypeManagerInterface,
    protected UrlGeneratorInterface $urlGenerator,
  ) {}

  /**
   * Implements hook_preprocess_node().
   */
  #[Hook('preprocess')]
  public function projectPreprocess(&$variables): void {
    if ('full' === $variables['view_mode'] && 'project_main_page' === $variables['node']->bundle()) {
      $variables['timeline_items'] = [];
      $now = new DateTimeImmutable();

      $nodes = $this->getTimelineNodes($variables);

      foreach ($nodes as $node) {
        $variables['timeline_items'][] = $this->addNodeAsTimelineItem($node, $now);
      }

      $notes = $this->getTimelineNotes($variables);

      foreach ($notes as $note) {
        $variables['timeline_items'][] = $this->addNoteAsTimelineItem($note, $now);
      }

      $variables['timeline_items'][] = $this->addNowAsTimelineItem($now);
      usort($variables['timeline_items'], static fn(array $a, array $b): int => $a['date'] <=> $b['date']);
    }
  }

  /**
   * Implements hook_preprocess_node().
   */
  #[Hook('entity_presave')]
  public function nodePresave(EntityInterface $entity): void {
    if (!$entity->hasField('field_project_reference')) {
      return;
    }

    $newTargetId = (int) ($entity->get('field_project_reference')->target_id ?? 0);

    $originalEntity = $entity->original ?? null;
    $oldTargetId = 0;
    if ($originalEntity->hasField('field_project_reference')) {
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

  private function getTimelineNodes($variables) : ?array {
    $nodeStorage = $this->entityTypeManagerInterface->getStorage('node');

    $referenceQuery = $nodeStorage->getQuery();
    $dateFieldQuery = $referenceQuery->orConditionGroup()
      ->exists('field_decision_date')
      ->exists('field_start_date')
      ->exists('field_first_meeting_time')
      ->condition('type', 'dialogue', '=');

    $referenceQuery->accessCheck();
    $referenceQuery->exists('field_project_reference');
    $referenceQuery->condition('field_project_reference', $variables['node']->id());
    $referenceQuery->condition('field_hide_in_timeline', FALSE);
    $referenceQuery->condition($dateFieldQuery);
    $references = $referenceQuery->execute();

    return $nodeStorage->loadMultiple($references);
  }

  private function getTimelineNotes($variables) : ?array {
    $paragraphStorage = $this->entityTypeManagerInterface->getStorage('paragraph');
    $noteQuery = $paragraphStorage->getQuery();
    $noteQuery->accessCheck();
    $noteQuery->condition('parent_id', $variables['node']->id());
    $noteQuery->condition('type', 'timeline_note');
    $noteIds = $noteQuery->execute();

    return $paragraphStorage->loadMultiple($noteIds);
  }

  private function addNodeAsTimelineItem(mixed $node, $now): array {
    $date = $this->determineDate($node);
    $image = $this->determineImage($node)?->getFileUri();

    return [
      'id' => $node->id(),
      'date' => $date->format('Y-m-d'), // change
      'month' => $date->format('F Y'), // change
      'title' => $node->getTitle(),
      'subtitle' => $node->type->entity->label(),
      'description' => $node->field_teaser->value,
      'status' => $this->determineStatus($node, $date, $now),
      'image' => ImageStyle::load('responsive_medium_default')->buildUrl($image),
      'link' => $this->urlGenerator->generateFromRoute('entity.node.canonical', ['node' => $node->id()]),
      'linkText' => $this->t('View @type', ['@type' => $node->type->entity->label()]),
      'accentColor' => $this->determineColor($node->bundle()),
    ];
  }

  private function addNoteAsTimelineItem(mixed $paragraph, $now): array {
    $date = $paragraph->field_date->date;

    return [
      'id' => '',
      'date' => $date->format('Y-m-d'), // change
      'month' => $date->format('F Y'), // change
      'title' => $paragraph->field_title->value,
      'subtitle' => $paragraph->field_subtitle->value,
      'description' => $paragraph->field_note->value,
      'status' => $this->determineStatus($paragraph, $date->getPhpDateTime(), $now),
      'image' => '',
      'link' => '',
      'linkText' => $this->t('View more'),
      'accentColor' => $this->determineColor('note'),
    ];
  }

  private function addNowAsTimelineItem($now): array {
    return [
      'id' => 'today',
      'date' => $now->format('Y-m-d'), // change
      'month' => $now->format('d-m-Y'), // change
      'title' => $this->t('Projektstatus'),
      'subtitle' => NULL,
      'description' => NULL,
      'status' => 'current',
      'image' => NULL,
      'link' => NULL,
      'linkText' => NULL,
      'accentColor' => NULL,
    ];
  }

  private function determineDate(NodeInterface $node): ?DateTimeImmutable {
    try {
      switch (TRUE) {
        case $node->hasField('field_decision_date'):
          return new \DateTimeImmutable($node->field_decision_date->value);
        case $node->hasField('field_start_date'):
          return new \DateTimeImmutable($node->field_start_date->value);
        case $node->hasField('field_first_meeting_time'):
          return new \DateTimeImmutable($node->field_first_meeting_time->value);
        case 'dialogue' === $node->getType();
          return new \DateTimeImmutable(strtotime($node->getCreatedTime()));
        default:
          return NULL;
      }
    }
    catch (DateMalformedStringException $exception) {
      return NULL;
    }

  }
  private function determineImage(NodeInterface $node): ?File {
    switch (TRUE) {
      case $node->hasField('field_media_image'):
        return $node->field_media_image->entity->field_itk_media_image_upload->entity;
      case $node->hasField('field_media_image_single'):
        return $node->field_media_image_single->entity->field_itk_media_image_upload->entity;
      case $node->hasField('field_top_images'):
        return $node->field_top_images->entity->field_itk_media_image_upload->entity;
      default:
        return NULL;
    }
  }

  private function determineColor(string $bundle): string {
    switch ($bundle) {
      case 'public_meeting':
      case 'course':
        return '#e91e63';
      case 'dialogue':
      case 'hearing':
      case 'decision':
        return '#008486';
      case 'note':
        return '#3661d8';
    }
  }

  private function determineStatus(EntityInterface $entity, DateTimeImmutable|DateTime|null $date, DateTimeImmutable $now): string {
      switch (TRUE) {
      case $date > $now:
        return 'upcoming';
      case $entity->getEntityTypeId() === 'node':
        return 'completed';
      case $entity->getEntityTypeId() === 'paragraph':
        return 'note';
    }
  }

}
