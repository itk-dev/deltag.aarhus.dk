<?php

namespace Drupal\hoeringsportal_citizen_proposal\Helper;

use Drupal\Core\Database\Connection;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityStorageException;
use Drupal\datetime\Plugin\Field\FieldType\DateTimeItemInterface;
use Drupal\node\Entity\Node;
use Drupal\node\NodeInterface;
use Drupal\node\NodeStorageInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

/**
 * Anonymizes citizen proposal related content.
 */
class AnonymizationHelper {
  const string TIMESPAN_ANONYMIZATION = '-3 months';

  /**
   * Constructor.
   */
  public function __construct(
    #[Autowire(service: 'logger.channel.hoeringsportal_citizen_proposal')]
    private readonly LoggerInterface $logger,
    private readonly Connection $connection,
    #[Autowire(service: 'hoeringsportal_citizen_proposal.node.storage')]
    private readonly NodeStorageInterface $nodeStorage,
    private readonly Helper $helper,
  ) {
  }

  /**
   * Anonymize citizen proposal.
   *
   * @param \Drupal\node\Entity\NodeInterface $node
   *   The node.
   *
   * @return bool
   *   Whether the anonymization was successful.
   */
  public function anonymizeCitizenProposal(NodeInterface $node): bool {
    try {
      if ($this->helper->isCitizenProposal($node)) {
        $node
          ->set('field_author_name', '')
          ->set('field_author_phone', '')
          ->set('field_author_email', '')
          ->set('field_author_uuid', '')
          ->save();
        $this->logger->info('Anonymized citizen proposal with id: @nid', ['@nid' => $node->id()]);

        return TRUE;
      }
    }
    catch (EntityStorageException $exception) {
      $this->logger->error('Error updating proposal for anonymization: @message', [
        '@message' => $exception->getMessage(),
        'exception' => $exception,
      ]);
      return FALSE;
    }
  }

  /**
   * Anonymize citizen proposal support.
   *
   * @param \Drupal\node\Entity\NodeInterface $node
   *   The node.
   */
  public function anonymizeCitizenProposalSupport(NodeInterface $node): void {
    try {
      $this->connection->update(Helper::PROPOSAL_SUPOORT_TABLE_NAME)
        ->fields([
          'user_identifier' => '',
          'user_name' => '',
          'user_email' => '',
        ])
        ->condition('node_id', $node->id(), '=')
        ->execute();
      $this->logger->info('Anonymized citizen proposal support entries related to node id: @nid', ['@nid' => $node->id()]);
    }
    catch (\Exception $exception) {
      $this->logger->error('Error updating proposal support for anonymization: @message', [
        '@message' => $exception->getMessage(),
        'exception' => $exception,
      ]);
    }
  }

  /**
   * Find all proposals that need to be anonymized.
   *
   * @return array
   *   List of citizen proposals that needs to be anonymized.
   */
  public function findProposalsForAnonymization() : array {
    $anonymizationTimeSpan = new DrupalDateTime(self::TIMESPAN_ANONYMIZATION);

    $query = $this->nodeStorage->getQuery()->accessCheck(FALSE);
    $query
      ->condition('type', 'citizen_proposal')
      ->condition(
        $query->orConditionGroup()
          ->condition('field_author_name', '', 'IS NOT NULL')
          ->condition('field_author_email', '', 'IS NOT NULL')
          ->condition('field_author_phone', '', 'IS NOT NULL')
          ->condition('field_author_uuid', '', 'IS NOT NULL')
      )
      ->condition('field_vote_end', $anonymizationTimeSpan->format(DateTimeItemInterface::DATETIME_STORAGE_FORMAT), '<');
    $ids = $query->execute();

    return $this->nodeStorage->loadMultiple($ids);
  }

  /**
   * Determine if the proposal is anonymous.
   *
   * Look at the author fields to determine if the proposal is anonymous.
   *
   * @return bool
   *   TRUE if the proposal is anonymous, FALSE otherwise.
   */
  public function isAnonymous(Node $entity) : bool {
    return empty($entity->field_author_uuid->value)
      && empty($entity->field_author_name->value)
      && empty($entity->field_author_email->value)
      && empty($entity->field_author_phone->value);
  }

}
