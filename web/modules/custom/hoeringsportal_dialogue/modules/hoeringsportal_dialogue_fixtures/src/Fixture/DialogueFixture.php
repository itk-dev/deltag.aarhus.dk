<?php

namespace Drupal\hoeringsportal_dialogue_fixtures\Fixture;

use Drupal\content_fixtures\Fixture\AbstractFixture;
use Drupal\content_fixtures\Fixture\DependentFixtureInterface;
use Drupal\content_fixtures\Fixture\FixtureGroupInterface;
use Drupal\hoeringsportal_base_fixtures\Fixture\MediaFixture;
use Drupal\hoeringsportal_base_fixtures\Fixture\ParagraphFixture;
use Drupal\hoeringsportal_base_fixtures\Fixture\TermDialogueProposalCategoryFixture;
use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;

/**
 * Page fixture.
 *
 * @package Drupal\hoeringsportal_dialogue_fixtures\Fixture
 */
class DialogueFixture extends AbstractFixture implements FixtureGroupInterface, DependentFixtureInterface {

  /**
   * {@inheritdoc}
   */
  public function load() {
    $paragraph = Paragraph
      ::create([
        'type' => 'content_block',
      ])
        ->set('field_paragraph_title', 'Det er et godt spørgsmål …')
        ->set('field_content_block_text', [
          'value' => <<<'BODY'
<p>Sagittis mattis scelerisque habitasse elit etiam lobortis accumsan. Dignissim ac sapien potenti ipsum nam penatibus leo. Facilisi potenti laoreet et scelerisque sem felis rutrum.</p>
BODY,
          'format' => 'filtered_html',
        ]);
    $paragraph->save();

    $node = Node::create([
      'type' => 'dialogue',
      'title' => 'Test Dialogue - proposals full',
      'status' => TRUE,
      'field_teaser' => 'Test teaser',
      'field_area' => [
        $this->getReference('area:Hele kommunen'),
      ],
      'field_top_images' => [
        $this->getReference('media:Large1'),
        $this->getReference('media:Large2'),
        $this->getReference('media:Large3'),
      ],
      'field_type' => [
        $this->getReference('type:Klima'),
      ],
      'field_dialogue_proposal_category' => [
        $this->getReference('dialogue_proposal_categories:Grønne pladser'),
        $this->getReference('dialogue_proposal_categories:Regnvandsopsamling'),
        $this->getReference('dialogue_proposal_categories:Parkeringspladser for elbiler'),
        $this->getReference('dialogue_proposal_categories:Vedvarende Energi'),
      ],
      'field_dialogue_proposal_config' => [
        ['value' => 'public_proposals'],
        ['value' => 'use_image_on_proposals'],
        ['value' => 'use_map_on_proposals'],
      ],
      'field_dialogue_proposal_location' => [
        'type' => 'point',
        'data' => '{"type":"Feature","properties":[],"geometry":{"type":"Point","coordinates":[10.2118737466156,56.15312642194584]}}',
        'point' => '{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}},"features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[10.2118737466156,56.15312642194584]}}]}',
      ],
      'field_dialogue_proposal_zoom' => 11,
      'field_content_sections' => [
        'target_id' => $paragraph->id(),
        'target_revision_id' => $paragraph->getRevisionId(),
      ],
    ]);

    $node->save();
    $this->addReference('node:dialogue:Test Dialogue - proposals full', $node);

    $node = Node::create([
      'type' => 'dialogue',
      'title' => 'Test Dialogue - proposals simple, private',
      'status' => TRUE,
      'field_teaser' => 'Test teaser',
      'field_area' => [
        $this->getReference('area:Hele kommunen'),
      ],
      'field_top_images' => [
        $this->getReference('media:Large1'),
        $this->getReference('media:Large2'),
        $this->getReference('media:Large3'),
      ],
      'field_type' => [
        $this->getReference('type:Klima'),
      ],
      'field_dialogue_proposal_category' => [
        $this->getReference('dialogue_proposal_categories:Grønne pladser'),
        $this->getReference('dialogue_proposal_categories:Biodiversitet Initiativer'),
        $this->getReference('dialogue_proposal_categories:Cykelstier'),
        $this->getReference('dialogue_proposal_categories:Regnvandsopsamling'),
        $this->getReference('dialogue_proposal_categories:Parkeringspladser for elbiler'),
        $this->getReference('dialogue_proposal_categories:Bæredygtig Belysning'),
        $this->getReference('dialogue_proposal_categories:Energi Effektivisering'),
        $this->getReference('dialogue_proposal_categories:Grønne Materialer'),
        $this->getReference('dialogue_proposal_categories:Affaldshåndtering'),
        $this->getReference('dialogue_proposal_categories:Vedvarende Energi'),
      ],
      'field_dialogue_proposal_config' => [],
      'field_content_sections' => [
        'target_id' => $paragraph->id(),
        'target_revision_id' => $paragraph->getRevisionId(),
      ],
    ]);

    $node->save();
    $this->addReference('node:dialogue:Test Dialogue - proposals simple, private', $node);
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies() {
    return [
      MediaFixture::class,
      ParagraphFixture::class,
      TermDialogueProposalCategoryFixture::class,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getGroups() {
    return ['node'];
  }

}
