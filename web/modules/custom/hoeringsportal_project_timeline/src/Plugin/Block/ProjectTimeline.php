<?php

namespace Drupal\hoeringsportal_project_timeline\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\itk_pretix\Plugin\Field\FieldType\PretixDate;
use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\taxonomy\Entity\Term;

/**
 * Provides timeline content.
 *
 * @Block(
 *   id = "project_timeline",
 *   admin_label = @Translation("Project timeline"),
 * )
 */
class ProjectTimeline extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $current_node = \Drupal::routeMatch()->getParameter('node');
    if (!$current_node) {
      return [];
    }

    if ($current_node->bundle() != 'project') {
      if (!empty($current_node->field_project_reference->target_id)) {
        $node = Node::load($current_node->field_project_reference->target_id);
      }
      else {
        return [];
      }
    }
    else {
      $node = $current_node;
    }

    $timeline_items = $this->collectTimelineItems($node);

    // Sort items by date.
    usort($timeline_items, function ($a, $b) {
      return strtotime($a['date']) <=> strtotime($b['date']);
    });

    // Assign unique IDs.
    foreach ($timeline_items as $index => &$item) {
      $item['id'] = 'timeline-item-' . $index;
    }

    $legend_items = $this->getLegendItems();

    return [
      '#theme' => 'hoeringsportal_project_timeline',
      '#items' => $timeline_items,
      '#legend_items' => $legend_items,
      '#default_view' => 'vertical',
      '#attached' => [
        'library' => [
          'hoeringsportal_project_timeline/project_timeline',
        ],
      ],
    ];
  }

  /**
   * Collects all timeline items from various sources.
   *
   * @param \Drupal\node\Entity\Node $node
   *   The project node.
   *
   * @return array
   *   Array of timeline items.
   */
  protected function collectTimelineItems(Node $node): array {
    $items = [];
    $now = new DrupalDateTime('now');
    $now_timestamp = $now->getTimestamp();
    $nid = $node->id();

    // Add project start date.
    if (isset($node->field_project_start->date)) {
      $date = $node->field_project_start->date;
      $items[] = $this->createTimelineItem(
        $date,
        $this->t('Project Start'),
        NULL,
        NULL,
        $date->getTimestamp() < $now_timestamp ? 'completed' : 'upcoming',
        NULL,
        NULL
      );
    }

    // Add project end date.
    if (isset($node->field_project_finish->date)) {
      $date = $node->field_project_finish->date;
      $items[] = $this->createTimelineItem(
        $date,
        $this->t('Expected Finish'),
        NULL,
        NULL,
        $date->getTimestamp() < $now_timestamp ? 'completed' : 'upcoming',
        NULL,
        NULL
      );
    }

    // Add hearings.
    $hearings = $this->loadRelatedNodes($nid, 'hearing');
    foreach ($hearings as $hearing) {
      if (isset($hearing->field_reply_deadline->date)) {
        $date = $hearing->field_reply_deadline->date;
        $items[] = $this->createTimelineItem(
          $date,
          $hearing->title->value,
          $this->t('Hearing'),
          $hearing->field_teaser->value ?? NULL,
          $this->determineStatus($date->getTimestamp(), $now_timestamp),
          '/node/' . $hearing->nid->value,
          $this->t('Go to hearing')
        );
      }
    }

    // Add public meetings.
    $meetings = $this->loadRelatedNodes($nid, 'public_meeting');
    foreach ($meetings as $meeting_node) {
      $pretix_dates = iterator_to_array($meeting_node->get('field_pretix_dates'));
      usort($pretix_dates, static function (PretixDate $a, PretixDate $b) {
        return $a->time_from <=> $b->time_from;
      });
      $last_meeting = end($pretix_dates);
      if ($last_meeting) {
        $items[] = $this->createTimelineItem(
          $last_meeting->time_from,
          $meeting_node->title->value,
          $this->t('Public meeting'),
          NULL,
          $this->determineStatus($last_meeting->time_from->getTimestamp(), $now_timestamp),
          '/node/' . $meeting_node->nid->value,
          $this->t('Go to public meeting')
        );
      }
    }

    // Add paragraph field values.
    foreach ($node->field_timeline_items->getValue() as $paragraph_item) {
      $paragraph = Paragraph::load($paragraph_item['target_id']);
      if (!$paragraph || !isset($paragraph->field_timeline_date->date)) {
        continue;
      }

      $date = $paragraph->field_timeline_date->date;
      $label = $node->getTitle();
      $accentColor = NULL;

      if (isset($paragraph->field_timeline_taxonomy_type->target_id)) {
        $term = Term::load($paragraph->field_timeline_taxonomy_type->target_id);
        if ($term !== NULL) {
          $label = $term->getName();
          $accentColor = $this->mapColorToAccent($term->field_timeline_item_color->color ?? NULL);
        }
      }

      $items[] = $this->createTimelineItem(
        $date,
        $paragraph->field_timeline_title->value,
        $label,
        $paragraph->field_timeline_description->value ?? NULL,
        $this->determineStatus($date->getTimestamp(), $now_timestamp),
        $paragraph->field_timeline_link->uri ?? NULL,
        $this->t('Read more'),
        $accentColor
      );
    }

    return $items;
  }

  /**
   * Creates a timeline item array.
   *
   * @param \Drupal\Core\Datetime\DrupalDateTime|\DateTimeInterface $date
   *   The date object.
   * @param string $title
   *   The item title.
   * @param string|null $subtitle
   *   Optional subtitle.
   * @param string|null $description
   *   Optional description.
   * @param string $status
   *   The status (completed, current, upcoming, note).
   * @param string|null $link
   *   Optional link URL.
   * @param string|null $linkText
   *   Optional link text.
   * @param string|null $accentColor
   *   Optional accent color (pink, blue).
   *
   * @return array
   *   The timeline item array.
   */
  protected function createTimelineItem(
    $date,
    string $title,
    ?string $subtitle,
    ?string $description,
    string $status,
    ?string $link,
    ?string $linkText,
    ?string $accentColor = NULL,
  ): array {
    $formatter = \Drupal::service('date.formatter');
    $month = $formatter->format($date->getTimestamp(), 'custom', 'F Y');

    return [
      'id' => '',
      'date' => $date->format('Y-m-d'),
      'month' => $month,
      'title' => $title,
      'subtitle' => $subtitle,
      'description' => $description,
      'status' => $status,
      'image' => NULL,
      'link' => $link,
      'linkText' => $linkText,
      'accentColor' => $accentColor,
    ];
  }

  /**
   * Determines the status based on timestamp comparison.
   *
   * @param int $item_timestamp
   *   The item timestamp.
   * @param int $now_timestamp
   *   The current timestamp.
   *
   * @return string
   *   The status string.
   */
  protected function determineStatus(int $item_timestamp, int $now_timestamp): string {
    // Consider items within 7 days as "current".
    $week_in_seconds = 7 * 24 * 60 * 60;
    if ($item_timestamp < $now_timestamp - $week_in_seconds) {
      return 'completed';
    }
    elseif ($item_timestamp <= $now_timestamp + $week_in_seconds) {
      return 'current';
    }
    return 'upcoming';
  }

  /**
   * Maps a hex color to an accent color name.
   *
   * @param string|null $hex_color
   *   The hex color value.
   *
   * @return string|null
   *   The accent color name or NULL.
   */
  protected function mapColorToAccent(?string $hex_color): ?string {
    if (!$hex_color) {
      return NULL;
    }

    $color_map = [
      '#ee0043' => 'pink',
      '#fab2c6' => 'pink',
      '#3661d8' => 'blue',
      '#c2cff3' => 'blue',
    ];

    $hex_lower = strtolower($hex_color);
    return $color_map[$hex_lower] ?? NULL;
  }

  /**
   * Loads related nodes by project reference.
   *
   * @param int $project_nid
   *   The project node ID.
   * @param string $bundle
   *   The node bundle type.
   *
   * @return \Drupal\node\Entity\Node[]
   *   Array of loaded nodes.
   */
  protected function loadRelatedNodes(int $project_nid, string $bundle): array {
    $query = \Drupal::entityQuery('node');
    $query->accessCheck();
    $query->condition('field_project_reference', $project_nid);
    $query->condition('type', $bundle);
    $entity_ids = $query->execute();

    if (empty($entity_ids)) {
      return [];
    }

    return Node::loadMultiple($entity_ids);
  }

  /**
   * Returns legend items.
   *
   * @return array
   *   Array of legend items.
   */
  protected function getLegendItems(): array {
    return [
      [
        'status' => 'completed',
        'label' => $this->t('Completed'),
      ],
      [
        'status' => 'current',
        'label' => $this->t('Current'),
      ],
      [
        'status' => 'upcoming',
        'label' => $this->t('Upcoming'),
      ],
    ];
  }

}
