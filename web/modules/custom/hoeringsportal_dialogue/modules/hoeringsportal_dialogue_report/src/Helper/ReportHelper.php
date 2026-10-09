<?php

namespace Drupal\hoeringsportal_dialogue_report\Helper;

use Drupal\comment\CommentInterface;
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
   * A proposal with several categories is listed, and counted, under each of
   * them, so category totals can add up to more than the dialogue's totals.
   * Only categories offered by the dialogue are used.
   *
   * @param \Drupal\node\NodeInterface $dialogue
   *   A dialogue node.
   *
   * @return array
   *   Categories, keyed by taxonomy term id, each an array with:
   *   - term: TermInterface.
   *   - proposal_count, like_count, comment_count: int.
   *   - proposals: list of arrays with node, like_count, comment_count,
   *     category_count (number of categories it is listed under) and
   *     comments (tree).
   */
  public function build(NodeInterface $dialogue): array {
    $categories = $this->getCategories($dialogue);
    $offeredCategoryIds = array_map(static fn($term) => (int) $term->id(), $categories);
    $proposals = $this->getProposals($dialogue);
    $proposalIds = array_keys($proposals);

    $proposalLikeCounts = $this->getProposalLikeCounts($proposalIds);
    $commentsByProposal = $this->getCommentsByProposal($proposalIds);

    $allCommentIds = [];
    foreach ($commentsByProposal as $comments) {
      foreach ($comments as $comment) {
        $allCommentIds[] = (int) $comment->id();
      }
    }
    $commentLikeCounts = $this->getCommentLikeCounts($allCommentIds);

    $entriesByCategory = [];
    foreach ($proposals as $nid => $proposal) {
      $proposalCategoryIds = array_map('intval', array_column($proposal->get('field_dialogue_proposal_category')->getValue(), 'target_id'));
      $categoryIds = array_values(array_intersect($offeredCategoryIds, $proposalCategoryIds));
      if ([] === $categoryIds) {
        continue;
      }

      $commentTree = $this->buildCommentTree($commentsByProposal[$nid] ?? [], $commentLikeCounts);
      $entry = [
        'node' => $proposal,
        'like_count' => (int) ($proposalLikeCounts[$nid] ?? 0),
        'comment_count' => $this->countComments($commentTree),
        'category_count' => count($categoryIds),
        'comments' => $commentTree,
      ];
      foreach ($categoryIds as $tid) {
        $entriesByCategory[$tid][] = $entry;
      }
    }

    $report = [];
    foreach ($categories as $term) {
      $tid = (int) $term->id();
      $entries = $entriesByCategory[$tid] ?? [];
      $report[$tid] = [
        'term' => $term,
        'proposal_count' => count($entries),
        'like_count' => array_sum(array_column($entries, 'like_count')),
        'comment_count' => array_sum(array_column($entries, 'comment_count')),
        'proposals' => $entries,
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
   * Get all published proposals for a dialogue, oldest first.
   *
   * Published status is filtered explicitly rather than via access checks, so
   * the report is the same whether rendered by an admin or by Drush.
   *
   * @return array<int, \Drupal\node\NodeInterface>
   *   Proposal nodes keyed by node id.
   */
  private function getProposals(NodeInterface $dialogue): array {
    $storage = $this->entityTypeManager->getStorage('node');
    $ids = $storage->getQuery()
      ->accessCheck(FALSE)
      ->condition('status', NodeInterface::PUBLISHED)
      ->condition('type', 'dialogue_proposal')
      ->condition('field_dialogue', $dialogue->id())
      ->sort('created')
      ->sort('nid')
      ->execute();

    if ([] === $ids) {
      return [];
    }

    $proposals = [];
    foreach ($storage->loadMultiple($ids) as $proposal) {
      $proposals[(int) $proposal->id()] = $proposal;
    }

    return $proposals;
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
   * Get published comments for a set of proposals, grouped by proposal id.
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
      ->condition('status', CommentInterface::PUBLISHED)
      ->condition('entity_type', 'node')
      ->condition('field_name', 'field_comments')
      ->condition('entity_id', $proposalIds, 'IN')
      ->sort('created')
      ->sort('cid')
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
