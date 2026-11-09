<?php

namespace Drupal\hoeringsportal_dialogue_fixtures\Fixture;

use Drupal\comment\CommentInterface;
use Drupal\comment\Entity\Comment;
use Drupal\content_fixtures\Fixture\AbstractFixture;
use Drupal\content_fixtures\Fixture\DependentFixtureInterface;
use Drupal\content_fixtures\Fixture\FixtureGroupInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\flag\Entity\Flag;
use Drupal\flag\FlagInterface;
use Drupal\hoeringsportal_base_fixtures\Fixture\TermDialogueProposalCategoryFixture;
use Drupal\node\Entity\Node;
use Drupal\user\Entity\User;

/**
 * A dialogue with many proposals, comments and likes, for testing large data.
 *
 * The content is generated in loops and is deterministic (no randomness), so
 * every load produces the same counts. It is not meant to look realistic.
 *
 * @package Drupal\hoeringsportal_dialogue_fixtures\Fixture
 */
class DialogueLargeFixture extends AbstractFixture implements FixtureGroupInterface, DependentFixtureInterface {

  public const TITLE = 'Test Dialogue - large data set';

  private const PROPOSAL_COUNT = 200;
  // Top-level comments per proposal cycle through 0 to this number.
  private const MAX_COMMENTS_PER_PROPOSAL = 8;
  // Each like is a flagging by a distinct user.
  private const LIKER_COUNT = 12;
  // Every Nth proposal/comment is unpublished, to test that it is left out.
  private const UNPUBLISHED_PROPOSAL_EVERY = 25;
  private const UNPUBLISHED_COMMENT_EVERY = 20;

  // The dialogue offers all ten categories, but proposals only use the first
  // nine, so the report has a category without proposals.
  private const CATEGORIES = [
    'Grønne pladser',
    'Biodiversitet Initiativer',
    'Cykelstier',
    'Regnvandsopsamling',
    'Parkeringspladser for elbiler',
    'Bæredygtig Belysning',
    'Energi Effektivisering',
    'Grønne Materialer',
    'Affaldshåndtering',
    'Vedvarende Energi',
  ];
  private const USED_CATEGORY_COUNT = 9;

  private const SENTENCE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis mattis scelerisque habitasse elit etiam lobortis accumsan. ';

  /**
   * Users that like proposals and comments.
   *
   * @var \Drupal\user\UserInterface[]
   */
  private array $likers = [];

  /**
   * The number of comments created so far, across all proposals.
   */
  private int $commentCount = 0;

  /**
   * {@inheritdoc}
   */
  public function load() {
    $categories = array_map(
      fn (string $name) => $this->getReference('dialogue_proposal_categories:' . $name),
      self::CATEGORIES,
    );

    $dialogue = Node::create([
      'type' => 'dialogue',
      'title' => self::TITLE,
      'status' => TRUE,
      'field_teaser' => sprintf('%d proposals with comments, replies and likes, for testing the dialogue report with large data sets.', self::PROPOSAL_COUNT),
      'field_area' => [$this->getReference('area:Hele kommunen')],
      'field_type' => [$this->getReference('type:Klima')],
      'field_dialogue_proposal_category' => $categories,
      'field_dialogue_proposal_config' => [['value' => 'public_proposals']],
    ]);
    $dialogue->save();
    $this->addReference('node:dialogue:' . self::TITLE, $dialogue);

    for ($i = 1; $i <= self::LIKER_COUNT; $i++) {
      $liker = User::create([
        'name' => 'dialogue-liker-' . $i,
        'mail' => 'dialogue-liker-' . $i . '@example.com',
        'status' => 1,
      ]);
      $liker->save();
      $this->likers[] = $liker;
    }

    $proposalFlag = Flag::load('support_proposal');
    $commentFlag = Flag::load('support_comment');
    // Spread creation times out so the report's ordering is meaningful.
    $created = strtotime('-1 year');

    for ($i = 1; $i <= self::PROPOSAL_COUNT; $i++) {
      $proposal = Node::create([
        'type' => 'dialogue_proposal',
        'title' => sprintf('Forslag %d', $i),
        'status' => 0 !== $i % self::UNPUBLISHED_PROPOSAL_EVERY,
        'created' => $created += 3600,
        'field_dialogue' => $dialogue,
        'field_dialogue_proposal_descr' => trim(str_repeat(self::SENTENCE, 1 + $i % 6)),
        'field_dialogue_proposal_category' => array_map(
          fn (int $index) => $categories[$index],
          $this->getCategoryIndexes($i),
        ),
      ]);
      $proposal->save();
      $this->like($proposalFlag, $proposal, ($i * 5) % (self::LIKER_COUNT + 1));

      for ($j = 1; $j <= $i % (self::MAX_COMMENTS_PER_PROPOSAL + 1); $j++) {
        $comment = $this->createComment($proposal->id(), NULL, sprintf('Kommentar %d til forslag %d.', $j, $i), $created += 60);
        $this->like($commentFlag, $comment, $this->commentCount % 4);

        // Every third comment gets replies, and its first reply a reply too.
        if (0 === $j % 3) {
          for ($k = 1; $k <= 2; $k++) {
            $reply = $this->createComment($proposal->id(), $comment, sprintf('Svar %d på kommentar %d.', $k, $j), $created += 60);
            if (1 === $k) {
              $this->createComment($proposal->id(), $reply, 'Svar på svaret.', $created += 60);
            }
          }
        }
      }
    }
  }

  /**
   * Get the category indexes for a proposal: one, two or three categories.
   *
   * @return int[]
   *   Indexes into self::CATEGORIES.
   */
  private function getCategoryIndexes(int $i): array {
    $indexes = [$i % self::USED_CATEGORY_COUNT];
    if (0 === $i % 3) {
      $indexes[] = ($i + 3) % self::USED_CATEGORY_COUNT;
    }
    if (0 === $i % 7) {
      $indexes[] = ($i + 5) % self::USED_CATEGORY_COUNT;
    }

    return array_values(array_unique($indexes));
  }

  /**
   * Create a comment on a proposal.
   */
  private function createComment(int|string $proposalId, ?CommentInterface $parent, string $text, int $created): CommentInterface {
    $this->commentCount++;
    $comment = Comment::create([
      'comment_type' => 'early_inclusion_comment',
      'field_name' => 'field_comments',
      'entity_type' => 'node',
      'entity_id' => $proposalId,
      'pid' => $parent,
      'uid' => 0,
      'subject' => '(No subject)',
      'status' => 0 !== $this->commentCount % self::UNPUBLISHED_COMMENT_EVERY,
      'created' => $created,
      'field_comment' => $text,
    ]);
    $comment->save();

    return $comment;
  }

  /**
   * Let the first $count likers flag an entity.
   */
  private function like(FlagInterface $flag, EntityInterface $entity, int $count): void {
    $flagService = \Drupal::service('flag');
    foreach (array_slice($this->likers, 0, $count) as $liker) {
      $flagService->flag($flag, $entity, $liker);
    }
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies() {
    return [
      TermDialogueProposalCategoryFixture::class,
      DialogueFixture::class,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getGroups() {
    return ['node', 'comment'];
  }

}
