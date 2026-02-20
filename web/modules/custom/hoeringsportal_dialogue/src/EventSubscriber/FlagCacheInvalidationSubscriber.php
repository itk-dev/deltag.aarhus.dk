<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_dialogue\EventSubscriber;

use Drupal\Core\Cache\CacheTagsInvalidatorInterface;
use Drupal\flag\Event\FlaggingEvent;
use Drupal\flag\Event\UnflaggingEvent;
use Drupal\node\NodeInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Invalidates node cache when flagged or unflagged.
 */
final readonly class FlagCacheInvalidationSubscriber implements EventSubscriberInterface {

  public function __construct(
    private CacheTagsInvalidatorInterface $cacheTagsInvalidator,
  ) {}

  /**
   * Invalidates the cache for the flagged/unflagged node.
   */
  public function onFlagChange(FlaggingEvent|UnflaggingEvent $event): void {
    if ($event instanceof FlaggingEvent) {
      $flagging = $event->getFlagging();
      $entity = $flagging->getFlaggable();
    }
    else {
      $flaggings = $event->getFlaggings();
      $flagging = reset($flaggings);
      $entity = $flagging->getFlaggable();
    }

    if ($entity instanceof NodeInterface) {
      $this->cacheTagsInvalidator->invalidateTags($entity->getCacheTags());
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      'flag.entity_flagged' => ['onFlagChange'],
      'flag.entity_unflagged' => ['onFlagChange'],
    ];
  }

}
