<?php

namespace Drupal\hoeringsportal_dialogue_report\Drush\Commands;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\File\FileExists;
use Drupal\Core\File\FileSystemInterface;
use Drupal\Core\Session\AccountSwitcherInterface;
use Drupal\hoeringsportal_dialogue_report\Map\MapImageGenerator;
use Drupal\hoeringsportal_dialogue_report\Renderer\Renderer;
use Drupal\node\NodeInterface;
use Drupal\user\UserInterface;
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
    readonly private AccountSwitcherInterface $accountSwitcher,
    readonly private MapImageGenerator $mapImageGenerator,
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
      $container->get('account_switcher'),
      $container->get(MapImageGenerator::class),
    );
  }

  /**
   * Generate map images for dialogue proposals with a location.
   *
   * Images are generated when a proposal is saved; this is for proposals
   * saved before that, or whose image could not be generated then.
   */
  #[CLI\Command(name: 'hoeringsportal_dialogue_report:generate-map-images')]
  #[CLI\Option(name: 'force', description: 'Regenerate images that already exist')]
  #[CLI\Usage(name: 'drush hoeringsportal_dialogue_report:generate-map-images', description: 'Generate missing map images')]
  public function generateMapImages(array $options = ['force' => FALSE]): void {
    $storage = $this->entityTypeManager->getStorage('node');
    $ids = $storage->getQuery()
      ->accessCheck(FALSE)
      ->condition('type', MapImageGenerator::PROPOSAL_BUNDLE)
      ->sort('nid')
      ->execute();

    $generated = 0;
    $failed = 0;
    foreach (array_chunk($ids, 50) as $chunk) {
      foreach ($storage->loadMultiple($chunk) as $proposal) {
        try {
          if (NULL !== $this->mapImageGenerator->generate($proposal, (bool) $options['force'])) {
            ++$generated;
          }
        }
        catch (\Throwable $exception) {
          ++$failed;
          $this->logger()->error(sprintf('Proposal %d: %s', $proposal->id(), $exception->getMessage()));
        }
      }
      $storage->resetCache($chunk);
    }

    $message = sprintf('%d proposals checked, %d with a map image, %d failed', count($ids), $generated, $failed);
    if ($failed > 0) {
      throw new \RuntimeException($message);
    }
    $this->io()->success($message);
  }

  /**
   * Render a dialogue report as a PDF file.
   */
  #[CLI\Command(name: 'hoeringsportal_dialogue_report:render')]
  #[CLI\Argument(name: 'nid', description: 'Dialogue node id')]
  #[CLI\Option(name: 'user', description: 'Render the report as this user (name or id), so it only contains what that user may see. Defaults to anonymous.')]
  #[CLI\Usage(name: 'drush hoeringsportal_dialogue_report:render 87', description: 'Render the report for dialogue 87 as a PDF file')]
  #[CLI\Usage(name: 'drush hoeringsportal_dialogue_report:render 87 --user=admin', description: 'Render the report for dialogue 87 as the user "admin"')]
  public function render(string $nid, array $options = ['user' => NULL]): void {
    $node = $this->entityTypeManager->getStorage('node')->load($nid);
    if (!$node instanceof NodeInterface || 'dialogue' !== $node->bundle()) {
      throw new \RuntimeException(sprintf('Node %s is not a dialogue', $nid));
    }

    if (NULL !== $options['user']) {
      $this->accountSwitcher->switchTo($this->loadUser($options['user']));
    }
    try {
      $pdf = $this->renderer->renderPdf($node);
    }
    finally {
      if (NULL !== $options['user']) {
        $this->accountSwitcher->switchBack();
      }
    }

    $directory = self::DESTINATION_DIRECTORY;
    $this->fileSystem->prepareDirectory($directory, FileSystemInterface::CREATE_DIRECTORY | FileSystemInterface::MODIFY_PERMISSIONS);
    $uri = $this->fileSystem->saveData(
      $pdf,
      sprintf('%s/dialogue-%d-report.pdf', $directory, $node->id()),
      FileExists::Replace,
    );

    $this->io()->success(sprintf('Report saved to %s', $this->fileSystem->realpath($uri) ?: $uri));
  }

  /**
   * Load a user by id or name.
   */
  private function loadUser(string $idOrName): UserInterface {
    $storage = $this->entityTypeManager->getStorage('user');
    $user = ctype_digit($idOrName)
      ? $storage->load($idOrName)
      : (current($storage->loadByProperties(['name' => $idOrName])) ?: NULL);
    if (!$user instanceof UserInterface) {
      throw new \RuntimeException(sprintf('Cannot find user %s', $idOrName));
    }

    return $user;
  }

}
