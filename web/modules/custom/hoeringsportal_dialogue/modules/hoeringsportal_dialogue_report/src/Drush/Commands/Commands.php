<?php

namespace Drupal\hoeringsportal_dialogue_report\Drush\Commands;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\File\FileExists;
use Drupal\Core\File\FileSystemInterface;
use Drupal\hoeringsportal_dialogue_report\Renderer\Renderer;
use Drupal\node\NodeInterface;
use Drush\Attributes as CLI;
use Drush\Commands\DrushCommands;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Drush commands for the dialogue report.
 */
final class Commands extends DrushCommands {

  // Private, like the report itself, which only admins can open.
  private const DESTINATION_DIRECTORY = 'private://dialogue-report';

  public function __construct(
    readonly private Renderer $renderer,
    readonly private EntityTypeManagerInterface $entityTypeManager,
    readonly private FileSystemInterface $fileSystem,
  ) {
    parent::__construct();
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get(Renderer::class),
      $container->get('entity_type.manager'),
      $container->get('file_system'),
    );
  }

  /**
   * Render a dialogue report as a PDF file.
   */
  #[CLI\Command(name: 'hoeringsportal_dialogue_report:render')]
  #[CLI\Argument(name: 'nid', description: 'Dialogue node id')]
  #[CLI\Usage(name: 'drush hoeringsportal_dialogue_report:render 87', description: 'Render the report for dialogue 87 as a PDF file')]
  public function render(string $nid): void {
    $node = $this->entityTypeManager->getStorage('node')->load($nid);
    if (!$node instanceof NodeInterface || 'dialogue' !== $node->bundle()) {
      throw new \RuntimeException(sprintf('Node %s is not a dialogue', $nid));
    }

    $directory = self::DESTINATION_DIRECTORY;
    $this->fileSystem->prepareDirectory($directory, FileSystemInterface::CREATE_DIRECTORY | FileSystemInterface::MODIFY_PERMISSIONS);
    $uri = $this->fileSystem->saveData(
      $this->renderer->renderPdf($node),
      sprintf('%s/dialogue-%d-report.pdf', $directory, $node->id()),
      FileExists::Replace,
    );

    $this->io()->success(sprintf('Report saved to %s', $this->fileSystem->realpath($uri) ?: $uri));
  }

}
