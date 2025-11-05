<?php

namespace Drupal\hoeringsportal_dialogue\Helper;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

use Drupal\node\NodeInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Dialogue helper.
 */
class DialogueHelper {

  use StringTranslationTrait;

  /**
   * The dialogue helper constructor.
   *
   * @param \Symfony\Component\HttpFoundation\RequestStack $requestStack
   *   The request stack.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   The enity type manager.
   * @param \Drupal\Core\Session\AccountInterface $account
   *   The current user account.
   */
  public function __construct(
    protected RequestStack $requestStack,
    protected EntityTypeManagerInterface $entityTypeManager,
    protected AccountInterface $account,
  ) {
  }

  /**
   * Implements access check for dialogue proposal creation.
   *
   * @param \Drupal\Core\Session\AccountInterface $account
   *   The current user.
   * @param array $context
   *   The context.
   * @param string $entity_bundle
   *   The entity being created.
   *
   * @return \Drupal\Core\Access\AccessResult
   *   The access result.
   */
  public function dialogueProposalCreateAccess(AccountInterface $account, array $context, string $entity_bundle): AccessResult {
    if ('dialogue_proposal' === $entity_bundle) {
      $parentNode = $this->getParentNode();
      $config = $this->getProposalConfig($parentNode);

      if (!in_array('public_proposals', $config)) {
        return AccessResult::forbiddenIf($account->isAnonymous());
      }

      // Refuse to allow dialogue proposal creation if the parent dialogue is
      // not set or not a dialogue.
      return AccessResult::forbiddenIf(!$parentNode || !($parentNode->bundle() === 'dialogue'));
    }

    return AccessResult::neutral();
  }

  /**
   * Implements presave for dialogue proposal creation.
   *
   * @param EntityInterface $entity
   *   An entity to presave.
   */
  public function dialogueProposalPresave(EntityInterface $entity): void {
    if ('dialogue_proposal' === $entity->bundle()) {
      $parentNode = $this->getParentNode();
      if ($parentNode) {
        /**** @var \Drupal\node\Entity\Node $entity */
        $entity->set('field_dialogue', ['target_id' => $parentNode->id()]);
      }
    }
  }

  /**
   * Changes to the dialogue proposal form.
   *
   * @param array $form
   *   The form.
   * @param FormStateInterface $form_state
   *   The state of the form.
   */
  public function dialogueProposalFormAlter(array &$form, FormStateInterface $form_state): void {
    // Disable form cache to prevent serialization error on file upload.
    $form_state->disableCache();

    foreach ($form as $key => $formPart) {
      if (is_array($formPart) && isset($formPart['widget'])) {
        $this->modifyRequired($form, $key, $formPart['widget']);
      }
    }

    $form['options']['#access'] = FALSE;
    $form['advanced']['#access'] = FALSE;
    $form['revision_log']['#access'] = FALSE;
    $form['revision']['#access'] = FALSE;
    $form['meta']['#access'] = FALSE;

    $form['field_image_upload']['widget']['#attributes']['drop_zone'] = TRUE;
    $form['field_image_upload']['#drop_zone'] = TRUE;
    $form['field_image_upload']['widget'][0]['value']['#attributes']['drop_zone'] = TRUE;
    $form['field_dialogue_proposal_descr']['widget'][0]['value']['#description_display'] = 'before';
    $form['field_dialogue_proposal_category']['widget']['#description_position'] = 'top';
    $form['field_location']['widget'][0]['type']['#access'] = FALSE;
    $form['field_location']['widget'][0]['geojson']['#access'] = FALSE;
    $form['field_location']['widget'][0]['localplanids']['#access'] = FALSE;
    $form['actions']['submit']['#submit'][] = [$this, 'formAlterSubmit'];
    $form['actions']['submit']['#value'] = t('Send your proposal');
    $form['field_dialogue']['#access'] = FALSE;

    /** @var \Drupal\node\Entity\Node $parent */
    $parent = $this->getParentNode();

    if ($parent) {
      $config = $this->getProposalConfig($parent);

      if (!in_array('use_image_on_proposals', $config)) {
        $form['field_image_upload']['#access'] = FALSE;
      }

      if (!in_array('use_map_on_proposals', $config)) {
        $form['field_location']['#access'] = FALSE;
      }

      $parentLocationSelection = $parent->get('field_dialogue_proposal_location')->getValue();

      $parentPoint = json_decode($parentLocationSelection[0]['point']);
      $coordinates = $parentPoint->features[0]->geometry->coordinates;

      $parentZoomSelection = $parent->get('field_dialogue_proposal_zoom')->getValue();
      $form['field_location']['widget'][0]['point-widget']['#attributes']['data-map-config'] = json_encode([
        'x' => $coordinates[0] ?? NULL,
        'y' => $coordinates[1] ?? NULL,
        'zoomLevel' => $parentZoomSelection[0]['value'] ?? 11,
      ]);
    }

  }

  /**
   * Custom submit handler for dialog proposal form.
   *
   * @param array $form
   *   The form.
   * @param FormStateInterface $form_state
   *   The state of the form.
   */
  public function formAlterSubmit(array &$form, FormStateInterface $form_state): void {
    $parentNode = $this->getParentNode();

    if ($parentNode) {
      $form_state->setRedirect('entity.node.canonical', ['node' => $parentNode->id()]);
    }
  }

  /**
   * Get parent node.
   *
   * @return EntityInterface|null
   *   The parent node.
   */
  private function getParentNode(): ?EntityInterface {
    try {
      $parentId = $this->requestStack->getCurrentRequest()->query->get('dialogue');
      if ($parentId && is_numeric($parentId)) {
        return $this->entityTypeManager->getStorage('node')->load($parentId);
      }
    }
    catch (\Exception $e) {
      return NULL;
    }

    return NULL;
  }

  /**
   * Get proposal config related to dialogue.
   *
   * @param EntityInterface $parent
   *   The parent node.
   *
   * @return array
   *   the proposal config.
   */
  private function getProposalConfig(EntityInterface $parent): array {
    /** @var NodeInterface $parent */
    $parentConfig = $parent->get('field_dialogue_proposal_config')->getValue();

    return array_map(static fn(array $value) => $value['value'], $parentConfig);
  }

  /**
   * Change display of required fields.
   *
   * @param array $form
   *   The full form.
   * @param string $key
   *   The form field.
   * @param array $widget
   *   The form widget to change.
   */
  private function modifyRequired(array &$form, string $key, array $widget): void {
    if (!isset($widget['#required']) || !$widget['#required']) {
      if (isset($widget['#title'])) {
        $widget['#title'] = $widget['#title'] . '<span class="optional">(' . $this->t('optional') . ')</span>';
      }
      if (isset($widget[0]['#title'])) {
        $widget[0]['#title'] = $widget[0]['#title'] . '<span class="optional">(' . $this->t('optional') . ')</span>';
      }
    }

    $form[$key]['widget'] = $widget;
  }

}
