<?php

namespace Drupal\hoeringsportal_dialogue_report\Helper;

use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\node\NodeInterface;

/**
 * Gathers the data needed for a dialogue report.
 *
 * Every database query the report needs lives on this class.
 */
class ReportHelper {

  public function __construct(
    protected EntityTypeManagerInterface $entityTypeManager,
    protected Connection $database,
  ) {
  }

  /**
   * Build the full report data for a dialogue.
   *
   * @param \Drupal\node\NodeInterface $dialogue
   *   A dialogue node.
   *
   * @return array
   *   Categories, keyed by taxonomy term id, each an array with:
   *   - term: TermInterface.
   *   - proposal_count, like_count, comment_count: int.
   *   - proposals: list of arrays with node, like_count, comment_count,
   *     comments (tree).
   */
  public function build(NodeInterface $dialogue): array {
    $categories = $this->getCategories($dialogue);
    $proposalsByCategory = $this->getProposalsByCategory($dialogue);

    $allProposalIds = [];
    foreach ($proposalsByCategory as $proposals) {
      foreach ($proposals as $proposal) {
        $allProposalIds[] = (int) $proposal->id();
      }
    }

    $proposalLikeCounts = $this->getProposalLikeCounts($allProposalIds);
    $commentsByProposal = $this->getCommentsByProposal($allProposalIds);

    $allCommentIds = [];
    foreach ($commentsByProposal as $comments) {
      foreach ($comments as $comment) {
        $allCommentIds[] = (int) $comment->id();
      }
    }
    $commentLikeCounts = $this->getCommentLikeCounts($allCommentIds);

    $report = [];
    foreach ($categories as $term) {
      $tid = (int) $term->id();
      $proposals = [];
      $categoryLikeCount = 0;
      $categoryCommentCount = 0;

      foreach ($proposalsByCategory[$tid] ?? [] as $proposalNode) {
        $nid = (int) $proposalNode->id();
        $commentTree = $this->buildCommentTree($commentsByProposal[$nid] ?? [], $commentLikeCounts);
        $commentCount = $this->countComments($commentTree);
        $likeCount = (int) ($proposalLikeCounts[$nid] ?? 0);

        $proposals[] = [
          'node' => $proposalNode,
          'like_count' => $likeCount,
          'comment_count' => $commentCount,
          'comments' => $commentTree,
        ];

        $categoryLikeCount += $likeCount;
        $categoryCommentCount += $commentCount;
      }

      $report[$tid] = [
        'term' => $term,
        'proposal_count' => count($proposals),
        'like_count' => $categoryLikeCount,
        'comment_count' => $categoryCommentCount,
        'proposals' => $proposals,
      ];
    }

    return $report;
  }

  /**
   * Get the proposal categories offered by a dialogue.
   *
   * @return \Drupal\taxonomy\TermInterface[]
   *   The categories.
   */
  private function getCategories(NodeInterface $dialogue): array {
    return $dialogue->get('field_dialogue_proposal_category')->referencedEntities();
  }

  /**
   * Get all proposals for a dialogue, grouped by category term id.
   *
   * Includes unpublished proposals: this is an administrative report, not a
   * public listing.
   *
   * @return array<int, \Drupal\node\NodeInterface[]>
   *   Proposal nodes keyed by category term id.
   */
  private function getProposalsByCategory(NodeInterface $dialogue): array {
    $storage = $this->entityTypeManager->getStorage('node');
    $ids = $storage->getQuery()
      ->accessCheck(FALSE)
      ->condition('type', 'dialogue_proposal')
      ->condition('field_dialogue', $dialogue->id())
      ->sort('created')
      ->execute();

    if ([] === $ids) {
      return [];
    }

    $grouped = [];
    foreach ($storage->loadMultiple($ids) as $proposal) {
      $categoryId = $proposal->get('field_dialogue_proposal_category')->target_id;
      if (NULL !== $categoryId) {
        $grouped[(int) $categoryId][] = $proposal;
      }
    }

    return $grouped;
  }

  /**
   * Get support_proposal like counts, keyed by proposal node id.
   *
   * @param int[] $nids
   *   Proposal node ids.
   *
   * @return array<int, int>
   *   Like counts keyed by node id.
   */
  private function getProposalLikeCounts(array $nids): array {
    return $this->getFlagCounts('support_proposal', $nids);
  }

  /**
   * Get support_comment like counts, keyed by comment id.
   *
   * @param int[] $cids
   *   Comment ids.
   *
   * @return array<int, int>
   *   Like counts keyed by comment id.
   */
  private function getCommentLikeCounts(array $cids): array {
    return $this->getFlagCounts('support_comment', $cids);
  }

  /**
   * Get flag counts for a set of entity ids.
   *
   * @param string $flagId
   *   The flag id.
   * @param int[] $entityIds
   *   The flagged entity ids.
   *
   * @return array<int, int>
   *   Counts keyed by entity id.
   */
  private function getFlagCounts(string $flagId, array $entityIds): array {
    if ([] === $entityIds) {
      return [];
    }

    return $this->database->select('flag_counts', 'fc')
      ->fields('fc', ['entity_id', 'count'])
      ->condition('flag_id', $flagId)
      ->condition('entity_id', $entityIds, 'IN')
      ->execute()
      ->fetchAllKeyed();
  }

  /**
   * Get all comments for a set of proposals, grouped by proposal node id.
   *
   * @param int[] $proposalIds
   *   Proposal node ids.
   *
   * @return array<int, \Drupal\comment\CommentInterface[]>
   *   Comments keyed by the proposal node id they belong to.
   */
  private function getCommentsByProposal(array $proposalIds): array {
    if ([] === $proposalIds) {
      return [];
    }

    $storage = $this->entityTypeManager->getStorage('comment');
    $ids = $storage->getQuery()
      ->accessCheck(FALSE)
      ->condition('entity_type', 'node')
      ->condition('field_name', 'field_comments')
      ->condition('entity_id', $proposalIds, 'IN')
      ->sort('created')
      ->execute();

    if ([] === $ids) {
      return [];
    }

    $grouped = [];
    foreach ($storage->loadMultiple($ids) as $comment) {
      /** @var \Drupal\comment\CommentInterface $comment */
      $grouped[(int) $comment->getCommentedEntityId()][] = $comment;
    }

    return $grouped;
  }

  /**
   * Build a parent/child comment tree from a flat list of comments.
   *
   * @param \Drupal\comment\CommentInterface[] $comments
   *   All comments for one proposal.
   * @param array<int, int> $likeCounts
   *   Comment like counts, keyed by comment id.
   *
   * @return array
   *   List of ['comment' => CommentInterface, 'like_count' => int,
   *   'children' => [...]], top-level first.
   */
  private function buildCommentTree(array $comments, array $likeCounts): array {
    $byParent = [];
    foreach ($comments as $comment) {
      /** @var \Drupal\comment\CommentInterface $comment */
      $parentId = (int) ($comment->getParentComment()?->id() ?? 0);
      $byParent[$parentId][] = $comment;
    }

    $build = function (int $parentId) use (&$build, $byParent, $likeCounts): array {
      $nodes = [];
      foreach ($byParent[$parentId] ?? [] as $comment) {
        $cid = (int) $comment->id();
        $nodes[] = [
          'comment' => $comment,
          'like_count' => (int) ($likeCounts[$cid] ?? 0),
          'children' => $build($cid),
        ];
      }
      return $nodes;
    };

    return $build(0);
  }

  /**
   * Count all comments in a tree, including nested replies.
   */
  private function countComments(array $tree): int {
    $count = 0;
    foreach ($tree as $node) {
      $count += 1 + $this->countComments($node['children']);
    }
    return $count;
  }

}
