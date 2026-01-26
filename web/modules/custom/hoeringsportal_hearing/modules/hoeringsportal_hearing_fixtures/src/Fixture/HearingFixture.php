<?php

namespace Drupal\hoeringsportal_hearing_fixtures\Fixture;

use Drupal\content_fixtures\Fixture\AbstractFixture;
use Drupal\content_fixtures\Fixture\DependentFixtureInterface;
use Drupal\content_fixtures\Fixture\FixtureGroupInterface;
use Drupal\Core\Database\Connection;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\datetime\Plugin\Field\FieldType\DateTimeItemInterface;
use Drupal\hoeringsportal_base_fixtures\Fixture\MediaFixture;
use Drupal\hoeringsportal_base_fixtures\Fixture\ParagraphFixture;
use Drupal\hoeringsportal_deskpro\State\DeskproConfig;
use Drupal\node\Entity\Node;
use Drupal\node\NodeInterface;

/**
 * Page fixture.
 *
 * @package Drupal\hoeringsportal_hearing_fixtures\Fixture
 */
class HearingFixture extends AbstractFixture implements DependentFixtureInterface, FixtureGroupInterface {

  public function __construct(
    private readonly Connection $database,
    private readonly DeskproConfig $deskproConfig,
  ) {
  }

  /**
   * {@inheritdoc}
   */
  public function load() {
    $this->deleteAllHearingReplies();

    foreach (range(1, 3) as $i) {
      // Vary content state and dates to have active hearings for "other ongoing hearings" section.
      $contentState = match ($i) {
        1 => 'active',
        2 => 'active',
        default => 'upcoming',
      };
      $startDate = match ($i) {
        1, 2 => strtotime('-7 days'),
        default => strtotime('tomorrow'),
      };
      $replyDeadline = match ($i) {
        1 => strtotime('+14 days'),
        2 => strtotime('+30 days'),
        default => strtotime('tomorrow'),
      };

      // Hearing node.
      $entity = Node::create([
        'type' => 'hearing',
        'title' => 'Høring ' . $i,
        'field_description' => [
          'value' => '
Lorem ipsum bum bum bum.

Dette er en høring. Den har ID node:landing_page:Hearing1 ',
          'format' => 'hearing_description',
        ],
        'field_media_image' => [
          ['target_id' => $this->getReference('media:Medium1')->id()],
          ['target_id' => $this->getReference('media:Medium2')->id()],
          ['target_id' => $this->getReference('media:Map1')->id()],
        ],
        'field_content_state' => $contentState,
        'field_media_document' => [
          ['target_id' => $this->getReference('media:Document1')->id()],
          ['target_id' => $this->getReference('media:Pdf1')->id()],
        ],
        'field_start_date' => DrupalDateTime::createFromFormat('U', $startDate)->format('Y-m-d\TH:i:s'),
        'field_reply_deadline' => DrupalDateTime::createFromFormat('U', $replyDeadline)->format('Y-m-d\TH:i:s'),
        'field_edoc_casefile_id' => '',
        'field_tags' => [
          'target_id' => $this->getReference('tags:Kultur og borgerservice')
            ->id(),
        ],
        'field_getorganized_case_id' => 'test-case-id',
        'field_contact' => [
          'value' => '
This is the contact field.

Input address here.',
          'format' => 'filtered_html',
        ],
        'field_map' => [
          'type' => 'point',
          'data' => '{"type":"Feature","properties":[],"geometry":{"type":"Point","coordinates":[10.213748135074276,56.15345564612786]}}',
          'geojson' => '',
          'localplanids' => '',
          'point' => '{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}},"features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[10.213748135074276,56.15345564612786]}}]}',
        ],
        'field_map_display' => '',
        'field_lokalplaner' => '',
        'field_area' => [
          'target_id' => $this->getReference('area:Hele kommunen')
            ->id(),
        ],
        'field_project_reference' => '',
        // If we're lucky (or follow the test mode instructions in
        // ../../../../../hoeringsportal_deskpro/README.md) this Deskpro data
        // makes sense.
        'field_deskpro_department_id' => 1,
        'field_deskpro_agent_email' => 'deskpro@example.com',
        'field_teaser' => 'Lorem ipsum teaser',
        'field_hearing_ticket_add' => '',
        'field_type' => [
          'target_id' => $this->getReference('type:Kommuneplan')
            ->id(),
        ],
        'field_video_embed' => '',
        'field_more_info' => [
          'value' => '
This is the more info field.

Lorem ipsum 1234 Lorem ipsum',
          'format' => 'filtered_html',
        ],
        'field_hearing_ticket_list' => '',
        'field_department' => [
          $this->getReference('department:Department ' . $i)->id(),
        ],
      ]);
      $entity->save();
      $this->addReference('node:hearing:Hearing' . $i, $entity);

      $this->createHearingReplies($entity, match ($i) {
        1 => 1,
        2 => 87,
        default => 0,
      });
    }

    $entity = $entity->createDuplicate();
    $entity->setCreatedTime((new \DateTimeImmutable('-87 days'))->getTimestamp());
    $entity->setChangedTime((new \DateTimeImmutable('-42 days'))->getTimestamp());
    $entity->setTitle('Høring med GIS-kort');
    $entity->set('field_description', [
      'value' => <<<'EOD'
<h2>Et GIS-kort</h2>

<p>[gis:minimap:409c1dc9-b604-4f1e-9df9-2768d050acb4]</p>


<h2>Et lavt GIS-kort</h2>
<p>[gis:minimap:409c1dc9-b604-4f1e-9df9-2768d050acb4:height=200px]</p>

<h2>Et ugyldigt kort</h2>

<p>[gis:minimap:hest]</p>
EOD,
      'format' => 'hearing_description',
    ]);
    $entity->save();

    $entity = $entity->createDuplicate();
    $entity->setCreatedTime((new \DateTimeImmutable('-2 days'))->getTimestamp());
    $entity->setChangedTime((new \DateTimeImmutable('-1 days'))->getTimestamp());
    $entity->setTitle('Høring med slettede høringssvar');
    $entity->set('field_delete_date', (new DrupalDateTime('2001-01-01'))->format(DateTimeItemInterface::DATE_STORAGE_FORMAT));
    $entity->save();
  }

  /**
   * Delete all hearing replies.
   */
  private function deleteAllHearingReplies(): void {
    $this->database
      ->truncate('hoeringsportal_deskpro_deskpro_tickets')
      ->execute();
  }

  /**
   * Create replies for a hearing.
   */
  private function createHearingReplies(NodeInterface $node, int $numberOfReplies): void {
    // Set Deskpro config to match our mock data (cf. /admin/site-setup/deskpro)
    $this->deskproConfig->setMultiple([
      // "Deskpro integration"
      'deskpro_url' => 'http://test-mode/deskpro',
      'deskpro_api_code_key' => '1:test-mode',
      'deskpro_ticket_custom_fields' => [
        'hearing_id' => 28,
        'hearing_name' => 30,
        'edoc_id' => 15,
        'getorganized_case_id' => 38,
        'pdf_download_url' => 22,
        'person_name' => 61,
        'representation' => 2,
        'organization' => 7,
        'address_secret' => 32,
        'address' => 1,
        'postal_code' => 37,
        'geolocation' => 31,
        'message' => 35,
        'files' => 36,
        'accept_terms' => 11,
        'unpublish_reply' => 18,
      ],
      'deskpro_available_department_ids' => [1],
      'deskpro_languages' => [
        'ticket_languages' => [
          'da' => 2,
        ],
        'default_ticket_language' => 2,
      ],
      'deskpro_data_token' => 'deskpro_data_token',
      'deskpro_cache_ttl' => 60,
      'deskpro_synchronization_delay' => 60,

      // "Add hearing ticket form"
      'consent' => '<p>consent</p>',
      'intro' => '',
      'ticket_created_confirmation' => '',
      'representations' => [
        5 => [
          'title' => 'Privatperson',
          'is_available' => 1,
          'require_organization' => 0,
        ],
        3 => [
          'title' => 'Virksomhed',
          'is_available' => 1,
          'require_organization' => 1,
        ],
        4 => [
          'title' => 'Forening, organisation eller bestyrelse',
          'is_available' => 1,
          'require_organization' => 1,
        ],
        20 => [
          'title' => 'Ru00e5d og nu00e6vn',
          'is_available' => 1,
          'require_organization' => 1,
        ],
        21 => [
          'title' => 'Myndighed',
          'is_available' => 1,
          'require_organization' => 1,
        ],
        42 => [
          'title' => 'MED-udvalg',
          'is_available' => 1,
          'require_organization' => 1,
        ],
      ],
    ]);

    // Sample data for realistic fixtures.
    $subjects = [
      'Bekymring over trafikstøj',
      'Støtte til projektet',
      'Forslag til alternativ placering',
      'Spørgsmål om byggehøjde',
      'Indsigelse mod parkeringsforhold',
      'Ønske om flere grønne områder',
      'Kommentar til tidsplan',
      'Bekymring for lokal biodiversitet',
      'Forslag til forbedret adgang',
      'Spørgsmål om miljøvurdering',
    ];

    $messages = [
      'Jeg er bekymret for den øgede trafikstøj, som projektet vil medføre. Har kommunen overvejet støjdæmpende foranstaltninger langs vejen? Det vil have stor betydning for os, der bor i området.',
      'Som nabo til området vil jeg gerne udtrykke min fulde støtte til projektet. Det vil være en stor forbedring for hele kvarteret og skabe nye muligheder for fællesskab.',
      'Har kommunen overvejet en alternativ placering af bygningen? Den nuværende placering vil skygge for flere boliger i området i de sene eftermiddagstimer.',
      'Jeg vil gerne have oplyst, hvor høj bygningen præcist bliver, og om der er taget højde for de eksisterende bebyggelseslinjer i lokalplanen.',
      'De planlagte parkeringsforhold virker utilstrækkelige i forhold til det forventede antal besøgende. Jeg foreslår, at der etableres yderligere parkeringspladser.',
      'Det er vigtigt, at der bevares så mange træer som muligt, og at der plantes nye for at sikre grønne områder til glæde for beboere og dyreliv.',
      'Hvornår forventes projektet at være færdigt? Vi har brug for at vide, hvor længe byggearbejdet vil påvirke vores dagligdag.',
      'Området er levested for flere beskyttede arter. Jeg opfordrer til, at der laves en grundig undersøgelse af konsekvenserne for den lokale biodiversitet.',
      'Kan der etableres bedre stiforbindelser, så cyklister og fodgængere får lettere adgang til området? Det vil øge brugen af bæredygtig transport.',
      'Er der lavet en fuld miljøvurdering af projektet? Jeg vil gerne se dokumentation for, at alle miljømæssige hensyn er taget.',
    ];

    $names = [
      'Anders Jensen', 'Mette Pedersen', 'Lars Nielsen', 'Hanne Christensen',
      'Peter Andersen', 'Kirsten Larsen', 'Jens Hansen', 'Anne Sørensen',
      'Thomas Rasmussen', 'Lone Petersen', 'Michael Madsen', 'Pia Olsen',
      'Henrik Thomsen', 'Gitte Mortensen', 'Søren Poulsen', 'Lise Jørgensen',
    ];

    $organizations = [
      'Grundejerforeningen Skovparken',
      'Beboerforeningen Vesterbro',
      'Danmarks Naturfredningsforening, Lokalafdeling',
      'Erhvervsforeningen Midtbyen',
      'Seniorrådet',
      'Friluftsrådet',
      'Handicaprådet',
      'Cyklistforbundet',
    ];

    // Keywords mapped to each subject/message pair.
    $keywords = [
      ['Trafik', 'Støj', 'Miljø'],
      ['Støtte', 'Fællesskab'],
      ['Placering', 'Skygge', 'Boliger'],
      ['Byggehøjde', 'Lokalplan'],
      ['Parkering', 'Tilgængelighed'],
      ['Grønne områder', 'Træer', 'Natur'],
      ['Tidsplan', 'Byggeri'],
      ['Biodiversitet', 'Dyreliv', 'Natur'],
      ['Stiforbindelser', 'Cykling', 'Transport'],
      ['Miljøvurdering', 'Dokumentation'],
    ];

    for ($i = 0; $i < $numberOfReplies; $i++) {
      $data = [
        'id' => 1000 * (int) $node->id() + $i,
        'date_created' => (new \DateTimeImmutable('now'))->modify(sprintf('-%d hours', $i * 3 + rand(1, 12)))->format(\DateTimeImmutable::ATOM),
        'subject' => $subjects[$i % count($subjects)],
        'fields' => [
          'person_name' => $names[$i % count($names)],
          'representation' => [
            5 => [
              'id' => 5,
              'title' => 'Privatperson',
            ],
          ],
          'message' => $messages[$i % count($messages)],
          'keywords' => $keywords[$i % count($keywords)],
        ],
      ];

      if (1 === $i % 2) {
        $data['fields']['representation'] = [
          4 => [
            'id' => 4,
            'title' => 'Forening, organisation eller bestyrelse',
          ],
        ];
        $data['fields']['organization'] = $organizations[$i % count($organizations)];
      }

      $this->database->insert(
        'hoeringsportal_deskpro_deskpro_tickets',
      )
        ->fields([
          'bundle' => $node->bundle(),
          'entity_type' => $node->getEntityTypeId(),
          'entity_id' => $node->id(),
          'created_at' => (new DrupalDateTime($data['date_created']))->format(DrupalDateTime::FORMAT),
          'updated_at' => (new DrupalDateTime($data['date_created']))->format(DrupalDateTime::FORMAT),
          'ticket_id' => $data['id'],
          'data' => json_encode($data),
        ])
        ->execute();
    }
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies() {
    return [
      MediaFixture::class,
      ParagraphFixture::class,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getGroups() {
    return ['node'];
  }

}
