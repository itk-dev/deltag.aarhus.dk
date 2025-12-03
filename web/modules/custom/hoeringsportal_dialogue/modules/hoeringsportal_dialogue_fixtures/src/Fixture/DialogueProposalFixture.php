<?php

namespace Drupal\hoeringsportal_dialogue_fixtures\Fixture;

use Drupal\content_fixtures\Fixture\AbstractFixture;
use Drupal\content_fixtures\Fixture\DependentFixtureInterface;
use Drupal\content_fixtures\Fixture\FixtureGroupInterface;
use Drupal\hoeringsportal_base_fixtures\Fixture\TermDialogueProposalCategoryFixture;
use Drupal\node\Entity\Node;

/**
 * Page fixture.
 *
 * @package Drupal\hoeringsportal_dialogue_fixtures\Fixture
 */
class DialogueProposalFixture extends AbstractFixture implements FixtureGroupInterface, DependentFixtureInterface {

  /**
   * {@inheritdoc}
   */
  public function load() {
    $node = Node::create([
      'type' => 'dialogue_proposal',
      'title' => 'Titel på mit forslag',
      'status' => TRUE,
      'field_dialogue_proposal_descr' => 'Kort beskrivelse af sit amet, consectetur adipiscing elit. Sagittis mattis scelerisque habitasse elit etiam lobortis accumsan Sagittis mattis scelerisque habitasse elit etiam lobortis accumsan.
Dignissim ac sapien potenti ipsum nam penatibus leo. Facilisi potenti laoreet et scelerisque sem felis rutrum.',
      'field_dialogue_proposal_category' => [
        $this->getReference('dialogue_proposal_categories:Grønne pladser'),
        $this->getReference('dialogue_proposal_categories:Cykelstier'),
        $this->getReference('dialogue_proposal_categories:Regnvandsopsamling'),
        $this->getReference('dialogue_proposal_categories:Bæredygtig Belysning'),
        $this->getReference('dialogue_proposal_categories:Affaldshåndtering'),
      ],
      'field_dialogue' => $this->getReference('node:dialogue:Test Dialogue - proposals full'),
      'field_image_upload' => ['target_id' => $this->getReference('file:large1.jpg')->id()],
      'field_location' => [
        'type' => 'point',
        'data' => '{"type":"Feature","properties":[],"geometry":{"type":"Point","coordinates":[10.2118737466156,56.15312642194584]}}',
        'point' => '{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}},"features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[10.2118737466156,56.15312642194584]}}]}',
      ],
    ]);

    $node->save();
    $this->addReference('node:dialogue_proposal:Titel på mit forslag', $node);

    $node = Node::create([
      'type' => 'dialogue_proposal',
      'title' => 'Inspiration fra Tyskland',
      'status' => TRUE,
      'field_dialogue_proposal_descr' => 'I Tyskland har jeg set af sit amet, consectetur adipiscing elit. Sagittis mattis scelerisque habitasse elit etiam lobortis accumsan.
Dignissim ac sapien potenti ipsum nam penatibus leo. Facilisi potenti laoreet et scelerisque sem felis rutrum.',
      'field_dialogue_proposal_category' => [
        $this->getReference('dialogue_proposal_categories:Grønne pladser'),
        $this->getReference('dialogue_proposal_categories:Biodiversitet Initiativer'),
        $this->getReference('dialogue_proposal_categories:Cykelstier'),
        $this->getReference('dialogue_proposal_categories:Regnvandsopsamling'),
        $this->getReference('dialogue_proposal_categories:Bæredygtig Belysning'),
        $this->getReference('dialogue_proposal_categories:Affaldshåndtering'),
      ],
      'field_dialogue' => $this->getReference('node:dialogue:Test Dialogue - proposals full'),
      'field_image_upload' => ['target_id' => $this->getReference('file:trafic.jpg')->id()],
      'field_location' => [
        'type' => 'point',
        'data' => '{"type":"Feature","properties":[],"geometry":{"type":"Point","coordinates":[10.2118737466156,56.15312642194584]}}',
        'point' => '{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}},"features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[10.2118737466156,56.15312642194584]}}]}',
      ],
    ]);

    $node->save();
    $this->addReference('node:dialogue_proposal:Inspiration fra Tyskland', $node);

    $node = Node::create([
      'type' => 'dialogue_proposal',
      'title' => 'Test Dialogue proposal 1',
      'status' => TRUE,
      'field_dialogue_proposal_descr' => 'I Tyskland har jeg set af sit amet, consectetur adipiscing elit. Sagittis mattis scelerisque habitasse elit etiam lobortis accumsan.
Dignissim ac sapien potenti ipsum nam penatibus leo. Facilisi potenti laoreet et scelerisque sem felis rutrum.',
      'field_dialogue_proposal_category' => [
        $this->getReference('dialogue_proposal_categories:Grønne pladser'),
        $this->getReference('dialogue_proposal_categories:Biodiversitet Initiativer'),
        $this->getReference('dialogue_proposal_categories:Cykelstier'),
        $this->getReference('dialogue_proposal_categories:Regnvandsopsamling'),
        $this->getReference('dialogue_proposal_categories:Bæredygtig Belysning'),
        $this->getReference('dialogue_proposal_categories:Affaldshåndtering'),
      ],
      'field_dialogue' => $this->getReference('node:dialogue:Test Dialogue - proposals full'),
      'field_image_upload' => ['target_id' => $this->getReference('file:large2.jpg')->id()],
      'field_location' => [
        'type' => 'point',
        'data' => '{"type":"Feature","properties":[],"geometry":{"type":"Point","coordinates":[10.2118737466156,56.15312642194584]}}',
        'point' => '{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}},"features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[10.2118737466156,56.15312642194584]}}]}',
      ],
    ]);

    $node->save();
    $this->addReference('node:dialogue_proposal:Test Dialogue proposal 1', $node);

    $node = Node::create([
      'type' => 'dialogue_proposal',
      'title' => 'Test Dialogue proposal full',
      'status' => TRUE,
      'field_dialogue_proposal_descr' => 'I Tyskland har jeg set af sit amet, consectetur adipiscing elit. Sagittis mattis scelerisque habitasse elit etiam lobortis accumsan.
Dignissim ac sapien potenti ipsum nam penatibus leo. Facilisi potenti laoreet et scelerisque sem felis rutrum.',
      'field_dialogue_proposal_category' => [
        $this->getReference('dialogue_proposal_categories:Grønne pladser'),
        $this->getReference('dialogue_proposal_categories:Biodiversitet Initiativer'),
      ],
      'field_dialogue' => $this->getReference('node:dialogue:Test Dialogue - proposals full'),
      'field_image_upload' => ['target_id' => $this->getReference('file:large3.jpg')->id()],
      'field_location' => [
        'type' => 'point',
        'data' => '{"type":"Feature","properties":[],"geometry":{"type":"Point","coordinates":[10.2118737466156,56.15312642194584]}}',
        'point' => '{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}},"features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[10.2118737466156,56.15312642194584]}}]}',
      ],
    ]);

    $node->save();
    $this->addReference('node:dialogue_proposal:Test Dialogue proposal full', $node);

    $node = Node::create([
      'type' => 'dialogue_proposal',
      'title' => 'Test Dialogue proposal simple',
      'status' => TRUE,
      'field_dialogue_proposal_descr' => 'I Tyskland har jeg set af sit amet, consectetur adipiscing elit. Sagittis mattis scelerisque habitasse elit etiam lobortis accumsan.
Dignissim ac sapien potenti ipsum nam penatibus leo. Facilisi potenti laoreet et scelerisque sem felis rutrum.',
      'field_dialogue_proposal_category' => [
        $this->getReference('dialogue_proposal_categories:Grønne pladser'),
        $this->getReference('dialogue_proposal_categories:Biodiversitet Initiativer'),
        $this->getReference('dialogue_proposal_categories:Cykelstier'),
        $this->getReference('dialogue_proposal_categories:Regnvandsopsamling'),
        $this->getReference('dialogue_proposal_categories:Bæredygtig Belysning'),
        $this->getReference('dialogue_proposal_categories:Affaldshåndtering'),
      ],
      'field_dialogue' => $this->getReference('node:dialogue:Test Dialogue - proposals simple, private'),
    ]);

    $node->save();
    $this->addReference('node:dialogue_proposal:Test Dialogue proposal simple', $node);

    $node = Node::create([
      'type' => 'dialogue_proposal',
      'title' => 'Test Dialogue proposal with name and email',
      'status' => TRUE,
      'field_dialogue_proposal_descr' => 'Jeg vil gerne stå ved mit forslag.',
      'field_dialogue_proposal_category' => [
        $this->getReference('dialogue_proposal_categories:Grønne pladser'),
      ],
      'field_dialogue' => $this->getReference('node:dialogue:Test Dialogue - name and email'),
      'field_owner_name' => 'J. von And',
      'field_owner_email' => 'jva@pengeby.dk',
    ]);

    $node->save();
    $this->addReference('node:dialogue_proposal:Test Dialogue proposal with name and email', $node);
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
    return ['node'];
  }

}
