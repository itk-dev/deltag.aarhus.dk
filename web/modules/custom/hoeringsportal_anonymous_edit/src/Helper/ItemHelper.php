<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_anonymous_edit\Helper;

use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityInterface;
use Drupal\hoeringsportal_anonymous_edit\Model\Item;

/**
 * Item helper for hoeringsportal_anonymous_edit.
 */
final class ItemHelper {
  private const string TABLE_NAME = 'hoeringsportal_anonymous_edit';

  public function __construct(
    private readonly Connection $database,
  ) {
  }

  /**
   * Create item.
   */
  public function createItem(EntityInterface $entity, string $token, ?string $email): Item {
    $this->database
      ->insert(self::TABLE_NAME)
      ->fields([
        'entity_type' => $entity->getEntityTypeId(),
        'entity_bundle' => $entity->bundle(),
        'entity_uuid' => $entity->uuid(),
        'owner_token' => $token,
        'owner_email' => $email,
      ])
      ->execute();

    return $this->fetchItemByEntity($entity);
  }

  /**
   * Delete item.
   */
  public function deleteItem(EntityInterface $entity): void {
    $this->database
      ->delete(self::TABLE_NAME)
      ->condition('entity_type', $entity->getEntityTypeId())
      ->condition('entity_bundle', $entity->bundle())
      ->condition('entity_uuid', $entity->uuid())
      ->execute();
  }

  /**
   * Fetch items bo token.
   */
  public function fetchItemsByToken(string $token): array {
    return $this->database
      ->select(self::TABLE_NAME, 't')
      ->fields('t')
      ->condition('t.owner_token', $token)
      // Order the result to make the grouping a little easier.
      ->orderBy('t.entity_type')
      ->orderBy('t.entity_bundle')
      ->execute()
      ->fetchAll(\PDO::FETCH_CLASS, Item::class);
  }

  /**
   * Fetch items by email.
   */
  public function fetchItemsByEmail(string $email, ?string $token = NULL): array {
    $query = $this->database
      ->select(self::TABLE_NAME, 't')
      ->fields('t')
      ->condition('t.owner_email', $email);
    if (NULL !== $token) {
      $query->condition('t.owner_token', $token);
    }

    return $query
      ->execute()
      ->fetchAll(\PDO::FETCH_CLASS, Item::class);
  }

  /**
   * Fetch item by entity.
   */
  public function fetchItemByEntity(EntityInterface $entity): ?Item {
    return $this->database
      ->select(self::TABLE_NAME, 't')
      ->fields('t')
      ->condition('t.entity_type', $entity->getEntityTypeId())
      ->condition('t.entity_bundle', $entity->bundle())
      ->condition('t.entity_uuid', $entity->uuid())
      ->execute()
      ->fetchObject(Item::class) ?: NULL;
  }

}
