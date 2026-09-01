<?php

namespace Drupal\itk_iframe_field\Controller;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Access\AccessResultInterface;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\FieldableEntityInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Renders a single iframe field item on its own, for the fullscreen dialog.
 *
 * The URL to embed is read from the stored field item, never from the request,
 * so the field's accepted domains cannot be sidestepped by calling this route
 * directly.
 */
class FullscreenController extends ControllerBase {

  /**
   * Checks access to a single item of an iframe field.
   *
   * @param string $entity_type_id
   *   The entity type holding the field.
   * @param string $entity_id
   *   The id of the entity holding the field.
   * @param string $field_name
   *   The name of the field.
   * @param string $delta
   *   The item delta.
   *
   * @return \Drupal\Core\Access\AccessResultInterface
   *   Allowed only if the entity, the field and the item are all viewable.
   */
  public function access(string $entity_type_id, string $entity_id, string $field_name, string $delta): AccessResultInterface {
    $items = $this->loadItems($entity_type_id, $entity_id, $field_name);
    if (NULL === $items || (int) $delta >= $items->count()) {
      return AccessResult::forbidden()->setCacheMaxAge(0);
    }

    return $items->getEntity()->access('view', NULL, TRUE)
      ->andIf($items->access('view', NULL, TRUE))
      ->addCacheableDependency($items->getEntity());
  }

  /**
   * Returns the dialog title for a single iframe field item.
   *
   * @param string $entity_type_id
   *   The entity type holding the field.
   * @param string $entity_id
   *   The id of the entity holding the field.
   * @param string $field_name
   *   The name of the field.
   * @param string $delta
   *   The item delta.
   *
   * @return string|\Drupal\Core\StringTranslation\TranslatableMarkup
   *   The item's own title, or a generic fallback.
   */
  public function title(string $entity_type_id, string $entity_id, string $field_name, string $delta): string|TranslatableMarkup {
    $items = $this->loadItems($entity_type_id, $entity_id, $field_name);
    if (NULL === $items || (int) $delta >= $items->count()) {
      return new TranslatableMarkup('Full screen');
    }

    $title = (string) ($items->get((int) $delta)->title ?? '');

    return '' === $title ? new TranslatableMarkup('Full screen') : $title;
  }

  /**
   * Builds a single iframe field item for the dialog.
   *
   * @param string $entity_type_id
   *   The entity type holding the field.
   * @param string $entity_id
   *   The id of the entity holding the field.
   * @param string $field_name
   *   The name of the field.
   * @param string $delta
   *   The item delta.
   *
   * @return array
   *   A render array holding just the requested item.
   */
  public function build(string $entity_type_id, string $entity_id, string $field_name, string $delta): array {
    $items = $this->loadItems($entity_type_id, $entity_id, $field_name);
    if (NULL === $items || (int) $delta >= $items->count()) {
      throw new NotFoundHttpException();
    }

    $field = $items->view([
      'type' => 'itk_iframe_default',
      'label' => 'hidden',
    ]);
    if (!isset($field[(int) $delta])) {
      throw new NotFoundHttpException();
    }

    $item = $field[(int) $delta];
    // The dialog is already fullscreen; do not offer the link again inside it.
    unset($item['#fullscreen_url']);

    return [
      '#type' => 'container',
      '#attributes' => ['class' => ['itk-iframe-field-dialog__content']],
      'item' => $item,
    ];
  }

  /**
   * Loads the item list of an iframe field.
   *
   * @param string $entity_type_id
   *   The entity type holding the field.
   * @param string $entity_id
   *   The id of the entity holding the field.
   * @param string $field_name
   *   The name of the field.
   *
   * @return \Drupal\Core\Field\FieldItemListInterface|null
   *   The item list, or NULL if there is no such field of our field type.
   */
  private function loadItems(string $entity_type_id, string $entity_id, string $field_name): ?FieldItemListInterface {
    if (!$this->entityTypeManager()->hasDefinition($entity_type_id)) {
      return NULL;
    }

    $entity = $this->entityTypeManager()->getStorage($entity_type_id)->load($entity_id);
    if (!$entity instanceof FieldableEntityInterface || !$entity->hasField($field_name)) {
      return NULL;
    }

    $items = $entity->get($field_name);

    return 'itk_iframe' === $items->getFieldDefinition()->getType() ? $items : NULL;
  }

}
