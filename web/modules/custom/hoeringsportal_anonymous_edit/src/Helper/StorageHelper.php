<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_anonymous_edit\Helper;

use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityInterface;
use Drupal\hoeringsportal_anonymous_edit\Model\Content;
use Drupal\hoeringsportal_anonymous_edit\Model\Owner;
use Drupal\hoeringsportal_anonymous_edit\Exception\RuntimeException;

/**
 * Content helper for hoeringsportal_anonymous_edit.
 */
final class StorageHelper {
  private const string TABLE_NAME_CONTENT = 'hoeringsportal_anonymous_edit_content';
  private const string TABLE_NAME_OWNERS = 'hoeringsportal_anonymous_edit_owners';

  private const string OWNER_TOKEN = 'owner_token';
  public const string OWNER_EMAIL = 'email';
  public const string OWNER_NAME = 'name';

  public function __construct(
    private readonly Connection $database,
  ) {
  }

  /**
   * Create item.
   */
  public function createItem(EntityInterface $entity, string $token, Owner $owner): Content {
    $this->database
      ->insert(self::TABLE_NAME_CONTENT)
      ->fields([
        'entity_type' => $entity->getEntityTypeId(),
        'entity_bundle' => $entity->bundle(),
        'entity_uuid' => $entity->uuid(),
        'owner_token' => $token,
      ])
      ->execute();

    $this->database
      ->upsert(self::TABLE_NAME_OWNERS)
      ->key(self::OWNER_TOKEN)
      ->fields([
        self::OWNER_TOKEN,
        self::OWNER_EMAIL,
        self::OWNER_NAME,
      ])
      ->values([
        self::OWNER_TOKEN => $token,
        self::OWNER_EMAIL => $owner->email ?? '',
        self::OWNER_NAME => $owner->name ?? '',
      ])
      ->execute();

    return $this->fetchItemByEntity($entity);
  }

  /**
   * Delete item.
   */
  public function deleteItem(EntityInterface $entity): void {
    $this->database
      ->delete(self::TABLE_NAME_CONTENT)
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
      ->select(self::TABLE_NAME_CONTENT, 't')
      ->fields('t')
      ->condition('t.owner_token', $token)
      // Order the result to make the grouping a little easier.
      ->orderBy('t.entity_type')
      ->orderBy('t.entity_bundle')
      ->execute()
      ->fetchAll(\PDO::FETCH_CLASS, Content::class);
  }

  /**
   * Fetch items by email.
   */
  public function fetchItemsByEmail(string $email, ?string $token = NULL): array {
    $query = $this->database
      ->select(self::TABLE_NAME_CONTENT, 't')
      ->fields('t')
      ->condition('t.owner_email', $email);
    if (NULL !== $token) {
      $query->condition('t.owner_token', $token);
    }

    return $query
      ->execute()
      ->fetchAll(\PDO::FETCH_CLASS, Content::class);
  }

  /**
   * Fetch item by entity.
   */
  public function fetchItemByEntity(EntityInterface $entity): ?Content {
    $items = &drupal_static(__FUNCTION__);

    if (!isset($items[$entity->getEntityTypeId()][$entity->bundle()])) {
      // @todo Optimize this to load all content in one go and index by (entity_type, entity_bundle).
      $result = $this->database
        ->select(self::TABLE_NAME_CONTENT, 't')
        ->fields('t')
        ->condition('t.entity_type', $entity->getEntityTypeId())
        ->condition('t.entity_bundle', $entity->bundle())
        ->execute()
        ->fetchAll(\PDO::FETCH_CLASS, Content::class) ?: NULL;

      // Index by UUID.
      $items[$entity->getEntityTypeId()][$entity->bundle()] = array_combine(array_column($result, 'entity_uuid'), $result);
    }

    return $items[$entity->getEntityTypeId()][$entity->bundle()][$entity->uuid()] ?? NULL;
  }

  /**
   * Fetch owner data by token.
   */
  public function fetchOwner(string $token): ?Owner {
    $owners = &drupal_static(__FUNCTION__);

    if (!isset($owners)) {
      $owners = $this->database
        ->select(self::TABLE_NAME_OWNERS, 't')
        ->fields('t')
        ->execute()
        ->fetchAll(\PDO::FETCH_CLASS, Owner::class);

      // Index by token.
      $owners = array_combine(array_column($owners, self::OWNER_TOKEN), $owners);
    }

    return $owners[$token] ?? NULL;
  }

  /**
   * Compute a unique user name.
   */
  public function computeName(string $format) {
    $transaction = $this->database->startTransaction();
    try {
      $id = $this->database
        ->select(self::TABLE_NAME_OWNERS, 't')
        ->countQuery()
        ->execute()
        ->fetchField();
      $limit = 100;
      while ($limit-- > 0) {
        $id++;
        $name = sprintf($format, $id);
        $result = $this->database->select(self::TABLE_NAME_OWNERS, 't')
          ->fields('t')
          ->condition('t.name', $name)
          ->execute()
          ->fetchAll();
        if (empty($result)) {
          return $name;
        }
      }
    }
    catch (\Exception) {
      $transaction->rollback();
    }
    finally {
      unset($transaction);
    }

    throw new RuntimeException('Cannot compute unique name');
  }

}
