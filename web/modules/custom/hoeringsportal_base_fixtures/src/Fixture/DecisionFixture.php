<?php

namespace Drupal\hoeringsportal_base_fixtures\Fixture;

use Drupal\content_fixtures\Fixture\AbstractFixture;
use Drupal\hoeringsportal_citizen_proposal_fixtures\Fixture\CitizenProposalFixture;
use Drupal\content_fixtures\Fixture\DependentFixtureInterface;
use Drupal\content_fixtures\Fixture\FixtureGroupInterface;
use Drupal\hoeringsportal_dialogue_fixtures\Fixture\DialogueFixture;
use Drupal\hoeringsportal_hearing_fixtures\Fixture\HearingFixture;
use Drupal\hoeringsportal_project_fixtures\Fixture\ProjectPageFixture;
use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;

/**
 * Landing page fixture.
 *
 * @package Drupal\hoeringsportal_hearing_fixtures\Fixture
 */
final class DecisionFixture extends AbstractFixture implements DependentFixtureInterface, FixtureGroupInterface {

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
      'type' => 'decision',
      'title' => 'En vigtig afgørelse',
      'status' => TRUE,
      'field_decision' => 'vedtaget',
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
      'field_related_content' => [
        $this->getReference('node:citizen_proposal:Proposal1'),
        $this->getReference('node:hearing:Hearing2'),
      ],
      'field_content_sections' => [
        'target_id' => $paragraph->id(),
        'target_revision_id' => $paragraph->getRevisionId(),
      ],
      'field_reply_deadline' => '2026-08-15T12:00:00',
      'field_reply_deadline_visibility' => TRUE,
      'published_at' => (new \DateTimeImmutable('2024-01-01 12:00:00'))->getTimestamp(),
    ]);

    $node->save();
    $this->addReference('node:decision:En vigtig afgørelse', $node);

    $node = Node::create([
      'type' => 'decision',
      'title' => 'En ny afgørelse afvist',
      'status' => TRUE,
      'field_decision' => 'afvist',
      'field_teaser' => 'Test teaser',
      'field_area' => [
        $this->getReference('area:Hele kommunen'),
      ],
      'field_top_images' => [
        $this->getReference('media:Large1'),
      ],
      'field_type' => [
        $this->getReference('type:Klima'),
      ],
      'field_related_content' => [
        $this->getReference('node:hearing:Hearing1'),
        $this->getReference('node:dialogue:Test Dialogue - proposals full'),
        $this->getReference('project_page:Hvad er byudvikling?'),
      ],
      'field_content_sections' => [
        'target_id' => $paragraph->id(),
        'target_revision_id' => $paragraph->getRevisionId(),
      ],
      'field_reply_deadline' => '2026-09-30T23:59:00',
      'field_reply_deadline_visibility' => FALSE,
      'published_at' => (new \DateTimeImmutable('2025-01-01 12:00:00'))->getTimestamp(),
    ]);

    $node->save();
    $this->addReference('node:decision:En ny afgørelse afvist', $node);

    $node = Node::create([
      'type' => 'decision',
      'title' => 'Afgørelse med skjult svarfrist',
      'status' => TRUE,
      'field_decision' => 'vedtaget',
      'field_teaser' => 'Test teaser',
      'field_area' => [
        $this->getReference('area:Hele kommunen'),
      ],
      'field_top_images' => [
        $this->getReference('media:Large2'),
      ],
      'field_type' => [
        $this->getReference('type:Klima'),
      ],
      'field_content_sections' => [
        'target_id' => $paragraph->id(),
        'target_revision_id' => $paragraph->getRevisionId(),
      ],
      'field_reply_deadline' => '2026-10-15T14:00:00',
      'field_reply_deadline_visibility' => FALSE,
      'published_at' => (new \DateTimeImmutable('2025-07-01 12:00:00'))->getTimestamp(),
    ]);

    $node->save();
    $this->addReference('node:decision:Afgørelse med skjult svarfrist', $node);

    $node = Node::create([
      'type' => 'decision',
      'title' => 'Afgørelse uden svarfrist',
      'status' => TRUE,
      'field_decision' => 'vedtaget',
      'field_teaser' => 'Test teaser',
      'field_area' => [
        $this->getReference('area:Hele kommunen'),
      ],
      'field_top_images' => [
        $this->getReference('media:Large3'),
      ],
      'field_type' => [
        $this->getReference('type:Klima'),
      ],
      'field_content_sections' => [
        'target_id' => $paragraph->id(),
        'target_revision_id' => $paragraph->getRevisionId(),
      ],
      'field_reply_deadline_visibility' => TRUE,
      'published_at' => (new \DateTimeImmutable('2026-01-01 12:00:00'))->getTimestamp(),
    ]);

    $node->save();
    $this->addReference('node:decision:Afgørelse uden svarfrist', $node);

    $node = Node::create([
      'type' => 'decision',
      'title' => 'Afgørelse med udløbet svarfrist',
      'status' => TRUE,
      'field_decision' => 'vedtaget',
      'field_teaser' => 'Test teaser',
      'field_area' => [
        $this->getReference('area:Hele kommunen'),
      ],
      'field_top_images' => [
        $this->getReference('media:Large1'),
      ],
      'field_type' => [
        $this->getReference('type:Klima'),
      ],
      'field_content_sections' => [
        'target_id' => $paragraph->id(),
        'target_revision_id' => $paragraph->getRevisionId(),
      ],
      'field_reply_deadline' => '2025-01-15T10:00:00',
      'field_reply_deadline_visibility' => TRUE,
      'published_at' => (new \DateTimeImmutable('2026-07-01 12:00:00'))->getTimestamp(),
    ]);

    $node->save();
    $this->addReference('node:decision:Afgørelse med udløbet svarfrist', $node);

    $node = Node::create([
      'type' => 'decision',
      'title' => 'Afgørelse med udløbet skjult svarfrist',
      'status' => TRUE,
      'field_decision' => 'afvist',
      'field_teaser' => 'Test teaser',
      'field_area' => [
        $this->getReference('area:Hele kommunen'),
      ],
      'field_top_images' => [
        $this->getReference('media:Large2'),
      ],
      'field_type' => [
        $this->getReference('type:Klima'),
      ],
      'field_content_sections' => [
        'target_id' => $paragraph->id(),
        'target_revision_id' => $paragraph->getRevisionId(),
      ],
      'field_reply_deadline' => '2024-06-30T16:00:00',
      'field_reply_deadline_visibility' => FALSE,
      'published_at' => (new \DateTimeImmutable('2027-01-01 12:00:00'))->getTimestamp(),
    ]);

    $node->save();
    $this->addReference('node:decision:Afgørelse med udløbet skjult svarfrist', $node);

    $node = Node::create([
      'type' => 'decision',
      'title' => 'Afgørelse uden svarfrist og skjult synlighed',
      'status' => TRUE,
      'field_decision' => 'vedtaget',
      'field_teaser' => 'Test teaser',
      'field_area' => [
        $this->getReference('area:Hele kommunen'),
      ],
      'field_top_images' => [
        $this->getReference('media:Large3'),
      ],
      'field_type' => [
        $this->getReference('type:Klima'),
      ],
      'field_content_sections' => [
        'target_id' => $paragraph->id(),
        'target_revision_id' => $paragraph->getRevisionId(),
      ],
      'field_reply_deadline_visibility' => FALSE,
      'published_at' => (new \DateTimeImmutable('2027-07-01 12:00:00'))->getTimestamp(),
    ]);

    $node->save();
    $this->addReference('node:decision:Afgørelse uden svarfrist og skjult synlighed', $node);
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies() {
    return [
      MediaFixture::class,
      CitizenProposalFixture::class,
      HearingFixture::class,
      DialogueFixture::class,
      ProjectPageFixture::class,
      TermDepartmentFixture::class,
      TermAreaFixture::class,
      TermTypeFixture::class,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getGroups() {
    return ['node', 'decision'];
  }

}
