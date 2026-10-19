<?php

namespace Drupal\hoeringsportal_dialogue_report\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\hoeringsportal_dialogue_report\Map\MapImageGenerator;
use Drupal\node\NodeInterface;

/**
 * Keeps dialogue proposal map images in sync with their proposals.
 */
class MapImageHooks {

  public function __construct(
    private readonly MapImageGenerator $mapImageGenerator,
    private readonly AccountProxyInterface $currentUser,
  ) {
  }

  /**
   * Implements hook_ENTITY_TYPE_insert() for node entities.
   */
  #[Hook('node_insert')]
  public function nodeInsert(NodeInterface $node): void {
    $this->scheduleGeneration($node);
  }

  /**
   * Implements hook_ENTITY_TYPE_update() for node entities.
   */
  #[Hook('node_update')]
  public function nodeUpdate(NodeInterface $node): void {
    $this->scheduleGeneration($node);
  }

  /**
   * Implements hook_ENTITY_TYPE_delete() for node entities.
   */
  #[Hook('node_delete')]
  public function nodeDelete(NodeInterface $node): void {
    if (MapImageGenerator::PROPOSAL_BUNDLE === $node->bundle()) {
      $this->mapImageGenerator->delete((int) $node->id());
    }
  }

  /**
   * Implements hook_file_download().
   *
   * Map images are shown in the dialogue report, so the report's permission
   * grants access to them.
   */
  #[Hook('file_download')]
  public function fileDownload(string $uri): array|int|null {
    if (!$this->mapImageGenerator->isMapImageUri($uri)) {
      return NULL;
    }
    if (!$this->currentUser->hasPermission('administer dialogues')) {
      return -1;
    }

    return [
      'Content-Type' => 'image/png',
      'Content-Length' => filesize($uri),
    ];
  }

  /**
   * Schedule (re)generation of a proposal's map image.
   *
   * Also when the location is removed: generating deletes the image then.
   */
  private function scheduleGeneration(NodeInterface $node): void {
    if (MapImageGenerator::PROPOSAL_BUNDLE === $node->bundle()) {
      $this->mapImageGenerator->scheduleGeneration($node);
    }
  }

}
