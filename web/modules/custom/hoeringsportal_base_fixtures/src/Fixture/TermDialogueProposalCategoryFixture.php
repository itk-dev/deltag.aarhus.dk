<?php

namespace Drupal\hoeringsportal_base_fixtures\Fixture;

/**
 * Dialogue proposal category fixture.
 *
 * @package Drupal\hoeringsportal_base_fixtures\Fixture
 */
class TermDialogueProposalCategoryFixture extends AbstractTaxonomyTermFixture {
  /**
   * {@inheritdoc}
   */
  protected static $vocabularyId = 'dialogue_proposal_categories';

  /**
   * {@inheritdoc}
   */
  protected static $terms = [
    'Grønne pladser',
    'Biodiversitet Initiativer',
    'Cykelstier',
    'Regnvandsopsamling',
    'Parkeringspladser for elbiler',
    'Bæredygtig Belysning',
    'Energi Effektivisering',
    'Grønne Materialer',
    'Affaldshåndtering',
    'Vedvarende Energi'
  ];

}
