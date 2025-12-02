<?php

namespace Drupal\hoeringsportal_dialogue_fixtures\Fixture;

use Drupal\comment\Entity\Comment;
use Drupal\content_fixtures\Fixture\AbstractFixture;
use Drupal\content_fixtures\Fixture\DependentFixtureInterface;
use Drupal\content_fixtures\Fixture\FixtureGroupInterface;

/**
 * Page fixture.
 *
 * @package Drupal\hoeringsportal_dialogue_fixtures\Fixture
 */
class CommentFixture extends AbstractFixture implements FixtureGroupInterface, DependentFixtureInterface {

  /**
   * {@inheritdoc}
   */
  public function load() {
    $comment = Comment::create([
      'comment_type' => 'early_inclusion_comment',
      'field_name' => 'field_comments',
    ])
      ->set('subject', '(No subject)')
      ->set('entity_type', 'node')
      ->set('entity_id', $this->getReference('node:dialogue_proposal:Titel på mit forslag'))
      ->set('uid', 0)
      ->set('status', 1)
      ->set('field_comment', 'Det lyder som en god idé!');

    $comment->save();
    $this->addReference('comment:early_inclusion_comment:1', $comment);

    $comment = Comment::create([
      'comment_type' => 'early_inclusion_comment',
      'field_name' => 'field_comments',
    ])
      ->set('subject', '(No subject)')
      ->set('entity_type', 'node')
      ->set('entity_id', $this->getReference('node:dialogue_proposal:Titel på mit forslag'))
      ->set('uid', 0)
      ->set('status', 1)
      ->set('field_comment', 'Dette er en test kommentar med underkommentarer');

    $comment->save();
    $this->addReference('comment:early_inclusion_comment:2', $comment);

    $comment = Comment::create([
      'comment_type' => 'early_inclusion_comment',
      'field_name' => 'field_comments',
    ])
      ->set('subject', '(No subject)')
      ->set('entity_type', 'node')
      ->set('entity_id', $this->getReference('node:dialogue_proposal:Titel på mit forslag'))
      ->set('uid', 0)
      ->set('status', 1)
      ->set('field_comment', 'Dette er en kommentar til en kommentar')
      ->set('pid', $this->getReference('comment:early_inclusion_comment:2'));

    $comment->save();
    $this->addReference('comment:early_inclusion_comment:3', $comment);

    $comment = Comment::create([
      'comment_type' => 'early_inclusion_comment',
      'field_name' => 'field_comments',
    ])
      ->set('subject', '(No subject)')
      ->set('entity_type', 'node')
      ->set('entity_id', $this->getReference('node:dialogue_proposal:Titel på mit forslag'))
      ->set('uid', 0)
      ->set('status', 1)
      ->set('field_comment', 'Dette er en lang kommentar Det giver spændende muligheder som også lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis imperdiet erat nascetur condimentum quis non neque semper. Sit phasellus dictum ligula imperdiet sociis ac pretium pharetra. Ad pharetra luctus convallis eget nulla tincidunt euismod ligula. Dapibus bibendum quisque nisi est rhoncus pellentesque integer phasellus. Viverra integer nunc senectus dui bibendum porta mauris cras. Hendrerit class facilisi velit dignissim sit eget consectetur nulla.');

    $comment->save();
    $this->addReference('comment:early_inclusion_comment:4', $comment);

    $comment = Comment::create([
      'comment_type' => 'early_inclusion_comment',
      'field_name' => 'field_comments',
    ])
      ->set('subject', '(No subject)')
      ->set('entity_type', 'node')
      ->set('entity_id', $this->getReference('node:dialogue_proposal:Titel på mit forslag'))
      ->set('uid', 0)
      ->set('status', 1)
      ->set('field_comment', 'Og dette er en lang kommentar til en kommentar. Convallis imperdiet erat nascetur condimentum quis non neque semper. Sit phasellus dictum ligula imperdiet sociis ac pretium pharetra. Ad pharetra luctus convallis eget nulla tincidunt euismod ligula. Dapibus bibendum quisque nisi est rhoncus pellentesque integer phasellus. Viverra integer nunc senectus dui bibendum porta mauris cras. Hendrerit class facilisi velit dignissim sit eget consectetur nulla.')
      ->set('pid', $this->getReference('comment:early_inclusion_comment:2'));
    $comment->save();
    $this->addReference('comment:early_inclusion_comment:5', $comment);

    $comment = Comment::create([
      'comment_type' => 'early_inclusion_comment',
      'field_name' => 'field_comments',
    ])
      ->set('subject', '(No subject)')
      ->set('entity_type', 'node')
      ->set('entity_id', $this->getReference('node:dialogue_proposal:Titel på mit forslag'))
      ->set('uid', 0)
      ->set('status', 1)
      ->set('field_comment', 'Det lyder som en god idé!');

    $comment->save();
    $this->addReference('comment:early_inclusion_comment:6', $comment);

    $comment = Comment::create([
      'comment_type' => 'early_inclusion_comment',
      'field_name' => 'field_comments',
    ])
      ->set('subject', '(No subject)')
      ->set('entity_type', 'node')
      ->set('entity_id', $this->getReference('node:dialogue_proposal:Titel på mit forslag'))
      ->set('uid', 0)
      ->set('status', 1)
      ->set('field_comment', 'Det lyder som en god idé!');

    $comment->save();
    $this->addReference('comment:early_inclusion_comment:7', $comment);

    $comment = Comment::create([
      'comment_type' => 'early_inclusion_comment',
      'field_name' => 'field_comments',
    ])
      ->set('subject', '(No subject)')
      ->set('entity_type', 'node')
      ->set('entity_id', $this->getReference('node:dialogue_proposal:Titel på mit forslag'))
      ->set('uid', 0)
      ->set('status', 1)
      ->set('field_comment', 'Det lyder som en god idé!');

    $comment->save();
    $this->addReference('comment:early_inclusion_comment:8', $comment);
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies() {
    return [
      DialogueProposalFixture::class,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getGroups() {
    return ['comment'];
  }

}
