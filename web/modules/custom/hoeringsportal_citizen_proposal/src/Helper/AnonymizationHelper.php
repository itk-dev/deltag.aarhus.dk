<?php

namespace Drupal\hoeringsportal_citizen_proposal\Helper;

use Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException;
use Drupal\Component\Plugin\Exception\PluginNotFoundException;
use Drupal\Core\Database\Connection;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityStorageException;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\node\Entity\Node;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

/**
 * Anonymizes citizen proposel related content.
 */
class AnonymizationHelper {

  const string TABLE_NAME = 'hoeringsportal_citizen_proposal_support';

  const string TIMESPAN_ANONYMIZATION = '-3 months';

  /**
   * Constructor.
   */
  public function __construct(
    #[Autowire(service: 'logger.channel.hoeringsportal_citizen_proposal')]
    private readonly LoggerInterface $logger,
    private readonly Connection $connection,
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ) {
  }

  /**
   * Anonymize citizen proposal.
   *
   * @param int $nid
   *   The id of the node related to the proposal.
   */
  public function anonymizeCitizenProposal(int $nid): void {
    try {
      $node = $this->entityTypeManager->getStorage('node')->load($nid);

      /** @var \Drupal\node\NodeInterface $node */
      $node
        ->set('field_author_name', '')
        ->set('field_author_phone', '')
        ->set('field_author_email', '')
        ->set('field_author_uuid', '')
        ->save();
    }
    catch (InvalidPluginDefinitionException | PluginNotFoundException | EntityStorageException $exception) {
      $this->logger->error($exception);
    }
  }

  /**
   * Anonymize citizen proposal support.
   *
   * @param int $nid
   *   The id of the node related to the proposal support.
   */
  public function anonymizeCitizenProposalSupport(int $nid): void {
    try {
      $this->connection->update(self::TABLE_NAME)
        ->fields([
          'user_identifier' => '',
          'user_name' => '',
          'user_email' => '',
        ])
        ->condition('node_id', $nid, '=')
        ->execute();
    }
    catch (\Exception $exception) {
      $this->logger->error($exception);
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
    try {
      $query = $this->entityTypeManager->getStorage('node')->getQuery()->accessCheck(FALSE);
      $query
        ->condition('type', 'citizen_proposal')
        ->condition(
          $query->orConditionGroup()
            ->condition('field_author_name', '', 'IS NOT NULL')
            ->condition('field_author_email', '', 'IS NOT NULL')
            ->condition('field_author_phone', '', 'IS NOT NULL')
            ->condition('field_author_uuid', '', 'IS NOT NULL')
        )
        ->condition('field_vote_end', $anonymizationTimeSpan->format('Y-m-d\TH:i:s'), '<');
      return $query->execute();
    }
    catch (\Exception $exception) {
      $this->logger->error($exception);
      return [];
    }
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
    if (empty($entity->field_author_uuid->value) && empty($entity->field_author_name->value) && empty($entity->field_author_email->value) && empty($entity->field_author_phone->value)) {
      return TRUE;
    }
    return FALSE;
  }

}
