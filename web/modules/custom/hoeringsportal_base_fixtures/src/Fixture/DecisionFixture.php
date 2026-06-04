<?php

namespace Drupal\hoeringsportal_base_fixtures\Fixture;

use Drupal\content_fixtures\Fixture\AbstractFixture;
use Drupal\Core\Datetime\DrupalDateTime;
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
      'field_deadline' => (new DrupalDateTime('now', 'UTC'))->modify('+30 days')->format('Y-m-d'),
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
    ]);

    $node->save();
    $this->addReference('node:decision:En vigtig afgørelse', $node);

    $node = Node::create([
      'type' => 'decision',
      'title' => 'En ny afgørelse afvist',
      'status' => TRUE,
      'field_decision' => 'afvist',
      'field_deadline' => (new DrupalDateTime('now', 'UTC'))->modify('-15 days')->format('Y-m-d'),
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
    ]);

    $node->save();
    $this->addReference('node:decision:En ny afgørelse afvist', $node);

    // Synthetic decisions so the "Afgørelser" overview has a realistic,
    // paginated list. Titles/teasers are invented and only loosely inspired by
    // the public site's structure; areas, types and media reuse existing
    // fixture references so this stays self-contained and anonymized.
    $teaser = 'Sagittis mattis scelerisque habitasse elit etiam lobortis accumsan. Dignissim ac sapien potenti ipsum nam penatibus leo.';

    // Each row: [title, decision, type, area, decisionDate, deadlineOffset].
    // Positive deadline offset = future ("Aktiv"); negative = past ("Udløbet").
    // friststatus is computed automatically on save by hoeringsportal_decision.
    $decisions = [
      ['VVM-screeningsafgørelse for et anlæg', 'vedtaget', 'Klima', 'Beder - Malling', '2024-11-04', 28],
      ['Lokalplan er vedtaget', 'vedtaget', 'Lokalplan', 'Midtbyen', '2024-10-28', 21],
      ['Specialskole med klub og daginstitution', 'orientering', 'Lokalplan', 'Lisbjerg', '2024-10-21', 14],
      ['Lukning af planproces for solcelleanlæg', 'afvist', 'Lokalplan', 'Mårslet', '2024-10-14', 7],
      ['VVM-screeningsafgørelse for et forsyningsanlæg', 'vedtaget', 'Klima', 'Hele kommunen', '2024-10-07', 3],
      ['Lokalplan for etagebyggeri er vedtaget', 'vedtaget', 'Lokalplan', 'Viby', '2024-09-30', 45],
      ['VVM-screeningsafgørelse for et anlæg II', 'vedtaget', 'Klima', 'Vejlby-Risskov', '2024-09-23', -3],
      ['Lukning af planproces for boliger', 'afvist', 'Lokalplan', 'Holme - Højbjerg - Skåde', '2024-09-16', -10],
      ['Lukning af planproces for solceller', 'afvist', 'Lokalplan', 'Trige - Spørring', '2024-09-09', -21],
      ['VVM-screeningsafgørelse for et anlæg III', 'vedtaget', 'Klima', 'Åbyhøj', '2024-09-02', -35],
      ['VVM-afgørelse for en cykelsti', 'vedtaget', 'Trafik og transport', 'Beder - Malling', '2024-08-26', -60],
      ['Kommuneplantillæg under behandling', 'orientering', 'Kommuneplan', 'Midtbyen', '2024-08-19', -90],
      ['VVM-screeningsafgørelse for et idrætsanlæg', 'vedtaget', 'Fritid', 'Lisbjerg', '2024-08-12', -120],
    ];

    $images = ['media:Large1', 'media:Large2', 'media:Large3'];

    foreach ($decisions as $index => [$title, $decision, $type, $area, $date, $deadlineOffset]) {
      $paragraph = Paragraph
        ::create([
          'type' => 'content_block',
        ])
          ->set('field_paragraph_title', 'Det er et godt spørgsmål …')
          ->set('field_content_block_text', [
            'value' => '<p>' . $teaser . '</p>',
            'format' => 'filtered_html',
          ]);
      $paragraph->save();

      $deadline = (new DrupalDateTime('now', 'UTC'))
        ->modify(sprintf('%+d days', $deadlineOffset))
        ->format('Y-m-d');

      $values = [
        'type' => 'decision',
        'title' => $title,
        'status' => TRUE,
        'field_decision' => $decision,
        'field_decision_date' => $date,
        'field_deadline' => $deadline,
        'field_teaser' => $teaser,
        'field_area' => [
          $this->getReference('area:' . $area),
        ],
        'field_top_images' => [
          $this->getReference($images[$index % count($images)]),
        ],
        'field_type' => [
          $this->getReference('type:' . $type),
        ],
        'field_content_sections' => [
          'target_id' => $paragraph->id(),
          'target_revision_id' => $paragraph->getRevisionId(),
        ],
      ];

      // Demonstrate scheduled publishing: the last two decisions get a future
      // publish date, so they stay unpublished until that date is reached.
      if ($index >= count($decisions) - 2) {
        $values['field_publish_date'] = (new DrupalDateTime('now', 'UTC'))
          ->modify('+14 days')
          ->format('Y-m-d');
      }

      $node = Node::create($values);
      $node->save();
      $this->addReference('node:decision:synthetic:' . $index, $node);
    }
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
