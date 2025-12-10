<?php

namespace Drupal\hoeringsportal_anonymous_edit\Form;

use Drupal\comment\CommentInterface;
use Drupal\Core\Access\AccessResultInterface;
use Drupal\Core\DependencyInjection\AutowireTrait;
use Drupal\Core\Form\ConfirmFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\Core\Url;
use Drupal\hoeringsportal_anonymous_edit\Helper\Helper;

/**
 * Provides the comment cancel confirmation form.
 *
 * @internal
 */
class CommentCancelForm extends ConfirmFormBase {
  use AutowireTrait;

  /**
   * The comment.
   *
   * @var \Drupal\comment\CommentInterface
   */
  private CommentInterface $comment;

  /**
   * Constructor.
   */
  public function __construct(
    private readonly Helper $helper,
    RouteMatchInterface $routeMatch,
  ) {
    $this->comment = $routeMatch->getParameter('comment');
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'hoeringsportal_anonymous_edit_comment_cancel_confirm';
  }

  /**
   * {@inheritdoc}
   */
  public function getQuestion(): TranslatableMarkup {
    return $this->t('Cancel comment?');
  }

  /**
   * {@inheritdoc}
   */
  public function getDescription() {
    return $this->t('If you cancel the comment its content will be deleted, but any sub-comments will remain. This action cannot be undone.');
  }

  /**
   * {@inheritdoc}
   */
  public function getConfirmText() {
    return $this->t('Cancel comment');
  }

  /**
   * {@inheritdoc}
   */
  public function getCancelText() {
    return $this->t('Keep comment');
  }

  /**
   * {@inheritdoc}
   */
  public function getCancelUrl(): Url {
    return new Url(
      'entity.node.canonical',
      ['node' => $this->comment->getCommentedEntityId()],
      ['fragment' => 'comment-' . $this->comment->id()]
    );
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(
    array &$form,
    FormStateInterface $form_state,
  ): void {
    if ($this->helper->cancelComment($this->comment)) {
      $this->messenger()->addStatus($this->t('Comment cancelled'));
      $form_state->setRedirectUrl($this->getCancelUrl());
    }
  }

  /**
   * Route access callback.
   */
  public function access(AccountInterface $account): AccessResultInterface {
    return $this->helper->entityAccess($this->comment, Helper::ACCESS_CANCEL, $account);
  }

}
