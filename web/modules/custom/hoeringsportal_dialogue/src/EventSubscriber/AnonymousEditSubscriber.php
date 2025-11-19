<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_dialogue\EventSubscriber;

use Drupal\comment\CommentInterface;
use Drupal\hoeringsportal_anonymous_edit\Event\HoeringsportalAnonymousEditEvent;
use Drupal\hoeringsportal_dialogue\Helper\DialogueHelper;
use Drupal\node\NodeInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Event subscriber.
 */
final class AnonymousEditSubscriber implements EventSubscriberInterface {

  /**
   * Event subscriber.
   */
  public function onHoeringsportalAnonymousEdit(HoeringsportalAnonymousEditEvent $event): void {
    $entity = $event->getEntity();
    if ($entity instanceof CommentInterface && DialogueHelper::DIALOGUE_PROPOSAL_COMMENT_TYPE === $entity->bundle()) {
      $event->setIsSupported();
      // @todo get email from comment.
      // $event->setEmail($entity->get('field_email')->getString());
    }
    elseif ($entity instanceof NodeInterface && DialogueHelper::DIALOGUE_PROPOSAL_TYPE === $entity->bundle()) {
      $event->setIsSupported();
      // @todo get email from node.
      // $event->setEmail($entity->get('field_email')->getString());
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      HoeringsportalAnonymousEditEvent::class => ['onHoeringsportalAnonymousEdit'],
    ];
  }

}
