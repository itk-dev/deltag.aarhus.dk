<?php

namespace Drupal\hoeringsportal_dialogue_report\Drush\Commands;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\hoeringsportal_dialogue_report\Renderer\Renderer;
use Drush\Attributes as CLI;
use Drush\Commands\DrushCommands;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Drush commands for the dialogue report.
 */
final class Commands extends DrushCommands {

  public function __construct(
    readonly private Renderer $renderer,
    readonly private EntityTypeManagerInterface $entityTypeManager,
  ) {
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get(Renderer::class),
      $container->get('entity_type.manager'),
    );
  }

  /**
   * Render a dialogue report from a node id.
   */
  #[CLI\Command(name: 'hoeringsportal_dialogue_report:render')]
  #[CLI\Argument(name: 'nid', description: 'Dialogue node id')]
  #[CLI\Option(name: 'format', description: 'Output format', suggestedValues: ['html', 'pdf'])]
  #[CLI\Usage(name: 'drush hoeringsportal_dialogue_report:render 87 --format=pdf > report.pdf', description: 'Render dialogue 87 report as PDF')]
  public function render($nid, $options = ['format' => 'pdf']) {
    $node = $this->entityTypeManager->getStorage('node')->load($nid);
    if (NULL === $node) {
      throw new \RuntimeException(sprintf('Cannot load node %s', $nid));
    }

    echo 'html' === $options['format']
      ? $this->renderer->renderHtml($node)
      : $this->renderer->renderPdf($node);
  }

}
