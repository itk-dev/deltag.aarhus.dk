<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_anonymous_edit\Event;

use Drupal\Component\EventDispatcher\Event;
use Drupal\Core\Entity\EntityInterface;
use Drupal\hoeringsportal_anonymous_edit\Model\Owner;

/**
 * Event for hoeringsportal_anonymous_edit.
 */
final class HoeringsportalAnonymousEditEvent extends Event {

  /**
   * Is the entity n this event supported?
   */
  private bool $isSupported = FALSE;

  public function __construct(
    private readonly EntityInterface $entity,
    private readonly Owner $owner,
  ) {
  }

  /**
   * Get the entity.
   */
  public function getEntity(): EntityInterface {
    return $this->entity;
  }

  /**
   * Is supported?
   */
  public function isSupported(): bool {
    return $this->isSupported;
  }

  /**
   * Set is supported.
   */
  public function setIsSupported(bool $isSupported = TRUE): self {
    $this->isSupported = $isSupported;

    return $this;
  }

  /**
   * Get owner data.
   */
  public function getOwner(): Owner {
    return $this->owner;
  }

}
