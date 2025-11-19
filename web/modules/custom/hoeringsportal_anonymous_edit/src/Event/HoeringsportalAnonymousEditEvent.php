<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_anonymous_edit\Event;

use Drupal\Component\EventDispatcher\Event;
use Drupal\Core\Entity\EntityInterface;

/**
 * Event for hoeringsportal_anonymous_edit.
 */
final class HoeringsportalAnonymousEditEvent extends Event {

  /**
   * Is the entity n this event supported?
   */
  private bool $isSupported = FALSE;

  /**
   * An optional email for the entity.
   */
  private ?string $email = NULL;

  public function __construct(
    private readonly EntityInterface $entity,
  ) {}

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
   * Get email.
   */
  public function getEmail(): ?string {
    return $this->email;
  }

  /**
   * Set email.
   */
  public function setEmail(string $email): self {
    $this->email = $email;

    return $this;
  }

}
