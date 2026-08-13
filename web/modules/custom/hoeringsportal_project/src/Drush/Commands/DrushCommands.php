<?php

namespace Drupal\hoeringsportal_project\Drush\Commands;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\hoeringsportal_project\Helper\Helper;
use Drush\Attributes as CLI;
use Drush\Commands\AutowireTrait;
use Drush\Commands\DrushCommands as BaseDrushCommands;

/**
 * Custom drush commands for hoeringsportal_project.
 */
final class DrushCommands extends BaseDrushCommands {
  use AutowireTrait;

  /**
   * Constructor.
   */
  public function __construct(
    private readonly Helper $helper,
    protected EntityTypeManagerInterface $entityTypeManagerInterface,
  ) {
    parent::__construct();
  }

  /**
   * Get timeline content.
   *
   * @command hoeringsportal:project:test-timeline-content
   * @usage hoeringsportal:project:test-timeline-content
   *   Update state for all courses.
   */
  #[CLI\Command(name: 'hoeringsportal:project:test-timeline-content')]
  #[CLI\Argument(name: 'nid', description: 'Project node id')]
  public function testTimelineContent($nid): void {
    $project = $this->entityTypeManagerInterface->getStorage('node')->load($nid);
    $output['nodes'] = $this->helper->getTimelineNodes($project);
    $output['notes'] = $this->helper->getTimelineNotes($project);
    $this->output->writeln(' -- Nodes: --');
    foreach ($output['nodes'] as $node) {
      $this->output->writeln($node->getTitle() .'(' . $node->id() . ')');
    }
    $this->output->writeln(' -- Notes: --');
    foreach ($output['notes'] as $note) {
      $this->output->writeln($note->field_title->value);
    }
  }

}
