<?php

namespace Drupal\hoeringsportal_activity\Hook;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\hoeringsportal_activity\Helper\ActivityHelper;
use Drupal\node\NodeInterface;

/**
 * Hook implementations.
 */
readonly class ActivityHooks {

  public function __construct(
    private ActivityHelper $activityHelper,
  ) {
  }

  /**
   * Theme hook for adding activity content.
   *
   * @param array $existing
   *   List of existing theme hooks.
   * @param string $type
   *   The type of theme hook.
   * @param string $theme
   *   The theme name.
   * @param string $path
   *   The path to the module.
   *
   * @return array
   *   Information about the theme implementation.
   */
  #[Hook('theme')]
  public function activityTheme(array $existing, string $type, string $theme, string $path): array {
    return [
      'hoeringsportal_activity_add_activity' => [
        'variables' => [
          'entities' => NULL,
          'module_path' => $path,
        ],
      ],
    ];
  }

  /**
   * Set content state on course save.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The entity.
   */
  #[Hook('entity_presave')]
  public function coursePresave(EntityInterface $entity): void {
    if ($entity instanceof NodeInterface) {
      $newState = $this->activityHelper->computeState($entity);
      if ($this->activityHelper->getState($entity) !== $newState) {
        $entity->set('field_content_state', $newState);
      }
    }
  }

  /**
   * Alter course form.
   *
   * @param array $form
   *   The form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   */
  #[Hook('form_node_course_form_alter')]
  #[Hook('form_node_course_edit_form_alter')]
  #[Hook('form_node_public_meeting_form_alter')]
  #[Hook('form_node_public_meeting_edit_form_alter')]
  public function activityFormAlter(&$form, $form_state): void {
    // Handle js changes to form in custom javascript, it's too complex for
    // form states.
    if ('course' === $form_state->getFormObject()->getEntity()->bundle()) {
      $form['#attached']['library'][] = 'hoeringsportal_activity/course_form_alter';
    }

    // Dawa functionality to address field.
    $form['field_address']['widget'][0]['value']['#attributes']['class'][] = 'js-dawa-element';
  }

}
