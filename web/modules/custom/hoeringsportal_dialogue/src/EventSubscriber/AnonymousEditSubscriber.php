<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_dialogue\EventSubscriber;

use Drupal\comment\CommentInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\hoeringsportal_anonymous_edit\Event\HoeringsportalAnonymousEditEvent;
use Drupal\hoeringsportal_dialogue\Helper\DialogueHelper;
use Drupal\node\NodeInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Event subscriber.
 */
final class AnonymousEditSubscriber implements EventSubscriberInterface {

  public function __construct(
    private readonly ConfigFactoryInterface $configFactory,
  ) {}

  /**
   * Event subscriber.
   */
  public function onHoeringsportalAnonymousEdit(
    HoeringsportalAnonymousEditEvent $event,
  ): void {
    $entity = $event->getEntity();
    if ($entity instanceof CommentInterface && DialogueHelper::DIALOGUE_PROPOSAL_COMMENT_TYPE === $entity->bundle()) {
      $event->setIsSupported();
      if ($email = $entity->getAuthorEmail()) {
        $event->getOwner()->email = $email;
      }
      $name = $entity->getAuthorName();
      $anonymousName = $this->getAnonymousName();
      if ($name && $name !== $anonymousName) {
        $event->getOwner()->name = $name;
      }
    }
    elseif ($entity instanceof NodeInterface && DialogueHelper::DIALOGUE_PROPOSAL_TYPE === $entity->bundle()) {
      $event->setIsSupported();
      if ($email = $entity->get('field_owner_email')->getString()) {
        $event->getOwner()->email = $email;
      }
      if ($name = $entity->get('field_owner_name')->getString()) {
        $event->getOwner()->name = $name;
      }
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

  /**
   * Get the anonymous name.
   */
  private function getAnonymousName() {
    return (string) $this->configFactory->get('user.settings')
      ->get('anonymous');
  }

}
