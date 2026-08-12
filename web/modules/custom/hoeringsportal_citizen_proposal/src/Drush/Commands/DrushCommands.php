<?php

namespace Drupal\hoeringsportal_citizen_proposal\Drush\Commands;

use Drupal\Core\DependencyInjection\AutowireTrait;
use Drupal\hoeringsportal_citizen_proposal\Helper\AnonymizationHelper;
use Drupal\hoeringsportal_citizen_proposal\Helper\Helper;
use Drush\Attributes as CLI;
use Drush\Commands\DrushCommands as BaseDrushCommands;

/**
 * Custom drush commands for citizen proposal.
 */
final class DrushCommands extends BaseDrushCommands {
  use AutowireTrait;

  /**
   * Constructor for the citizen proposal commands class.
   */
  public function __construct(
    readonly private Helper $helper,
    readonly private AnonymizationHelper $anonymizationHelper,
  ) {
    parent::__construct();
  }

  /**
   * A drush command for finishing a specific proposal.
   */
  #[CLI\Command(name: 'hoeringsportal-citizen-proposal:finish-proposal')]
  #[CLI\Argument(name: 'proposalId', description: 'The proposal (node) id to finish')]
  public function finishProposal(int $proposalId): void {
    $this->helper->finishProposal($proposalId);
  }

  /**
   * A drush command for finishing all overdue proposals.
   */
  #[CLI\Command(name: 'hoeringsportal-citizen-proposal:finish-overdue-proposals')]
  public function finishOverdueProposals(): void {
    $overdueProposals = $this->helper->findOverdueProposals();

    foreach ($overdueProposals as $proposalId) {
      $this->helper->finishProposal($proposalId);
    }
  }

  /**
   * A drush command for anonymizing proposals.
   *
   * @command hoeringsportal-citizen-proposal:anonymize-proposals
   * @usage hoeringsportal-citizen-proposal:anonymize-proposals
   *   Anonymize proposals.
   */
  #[CLI\Command(name: 'hoeringsportal-citizen-proposal:anonymize-proposals')]
  public function anonymizeProposals(): void {
    $proposals = $this->anonymizationHelper->findProposalsForAnonymization();

    foreach ($proposals as $proposalId) {
      $this->anonymizationHelper->anonymizeCitizenProposal($proposalId);
      $this->anonymizationHelper->anonymizeCitizenProposalSupport($proposalId);
    }
  }

}
