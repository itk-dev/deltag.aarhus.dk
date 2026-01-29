<?php

namespace Drupal\hoeringsportal_project_fixtures\Fixture;

use Drupal\content_fixtures\Fixture\AbstractFixture;
use Drupal\content_fixtures\Fixture\DependentFixtureInterface;
use Drupal\content_fixtures\Fixture\FixtureGroupInterface;
use Drupal\hoeringsportal_base_fixtures\Fixture\MediaFixture;
use Drupal\hoeringsportal_base_fixtures\Fixture\ParagraphFixture;
use Drupal\hoeringsportal_base_fixtures\Fixture\TermAreaFixture;
use Drupal\hoeringsportal_dialogue_fixtures\Fixture\DialogueFixture;
use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\path_alias\Entity\PathAlias;
use Drupal\pathauto\PathautoState;

/**
 * Landing page fixture.
 *
 * @package Drupal\hoeringsportal_project_fixtures\Fixture
 */
class ProjectMainPageFixture extends AbstractFixture implements DependentFixtureInterface, FixtureGroupInterface {

  /**
   * {@inheritdoc}
   */
  public function load() {
    // Project main page.
    $entity = Node
      ::create([
        'type' => 'project_main_page',
      ])
        ->setTitle('Project')
        ->set('field_project_category', [
          $this->getReference('project_categories:Byudvikling'),
        ])
        ->set('field_short_description', 'This is the first project')
        ->set('field_project_image', [
          ['target_id' => $this->getReference('media:Medium1')->id()],
        ])
        ->set('field_area', [
          $this->getReference('area:Hele kommunen'),
        ]);

    $paragraph = Paragraph
      ::create([
        'type' => 'image',
      ])
        ->set('field_paragraph_image', [
        ['target_id' => $this->getReference('media:Medium2')->id()],
        ]);
    $paragraph->save();
    $entity->field_content_sections->appendItem([
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ]);

    $paragraph = Paragraph
      ::create([
        'type' => 'info_box',
      ])
        ->set('field_paragraph_title', 'Important!')
        ->set('field_content_block_text', [
          'value' => <<<'BODY'
<p>Beware that this is the <em>first</em> project.</p>
BODY,
          'format' => 'filtered_html',
        ]);
    $paragraph->save();
    $entity->field_content_sections->appendItem([
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ]);

    // Tell pathauto to stay away.
    $entity->path->pathauto = PathautoState::SKIP;
    $entity->save();
    $this->addReference('node:project_main_page:1', $entity);

    // Create the path alias.
    PathAlias::create([
      'path' => $entity->toUrl(options: ['alias' => TRUE])->toString(),
      'alias' => '/the-first-project',
    ])->save();
    // Let pathauto do what is does.
    unset($entity->path->pathauto);

    $entity = $entity->createDuplicate();
    $entity
      ->setTitle('Another project')
      ->set('field_short_description', 'We have more than one project')
      ->set('field_project_image', [
        ['target_id' => $this->getReference('media:Map1')->id()],
      ])
      ->set('field_area', [
        $this->getReference('area:Hele kommunen'),
      ]);

    $entity->save();
    $this->addReference('node:project_main_page:2', $entity);

    $entity = $entity->createDuplicate();
    $entity
      ->setTitle('The third project')
      ->set('field_project_category', [
        $this->getReference('project_categories:Offentlig transport'),
      ])
      ->set('field_short_description', 'We have more than one project')
      ->set('field_project_image', [
        ['target_id' => $this->getReference('media:Map1')->id()],
      ])
      ->set('field_area', [
        $this->getReference('area:Hele kommunen'),
      ]);

    $entity->save();

    // Project with all paragraph types.
    $entity = Node
      ::create([
        'type' => 'project_main_page',
      ])
        ->setTitle('Project with all content sections')
        ->set('field_project_category', [
          $this->getReference('project_categories:Byudvikling'),
        ])
        ->set('field_short_description', 'Comprehensive project with all paragraph types')
        ->set('field_project_image', [
          ['target_id' => $this->getReference('media:Medium1')->id()],
        ])
        ->set('field_area', [
          $this->getReference('area:Hele kommunen'),
        ]);

    // 1. Text paragraph.
    $paragraph = Paragraph
      ::create([
        'type' => 'text',
      ])
        ->set('field_content_block_text', [
          'value' => '<p>This is a text paragraph with rich content.</p>',
          'format' => 'filtered_html',
        ]);
    $paragraph->save();
    $entity->field_content_sections->appendItem([
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ]);

    // 2. Image paragraph.
    $paragraph = Paragraph
      ::create([
        'type' => 'image',
      ])
        ->set('field_paragraph_image', [
          ['target_id' => $this->getReference('media:Medium2')->id()],
        ]);
    $paragraph->save();
    $entity->field_content_sections->appendItem([
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ]);

    // 3. Content block paragraph.
    $paragraph = Paragraph
      ::create([
        'type' => 'content_block',
      ])
        ->set('field_paragraph_title', 'Content Block Title')
        ->set('field_content_block_text', [
          'value' => '<p>This is a content block with title and image.</p>',
          'format' => 'filtered_html',
        ])
        ->set('field_paragraph_image', [
          ['target_id' => $this->getReference('media:Medium1')->id()],
        ]);
    $paragraph->save();
    $entity->field_content_sections->appendItem([
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ]);

    // 4. Text aside blocks 2 column paragraph.
    $paragraph = Paragraph
      ::create([
        'type' => 'text_aside_blocks_2_column',
      ])
        ->set('field_title', 'Two Column Layout')
        ->set('field_abstract', 'Abstract text for the two column section')
        ->set('field_body', [
          'value' => '<p>Body text in the main column.</p>',
          'format' => 'filtered_html',
        ])
        ->set('field_aside_block', [
          ['target_id' => $this->getReference('block_content:aside_contact_info:the_main_address')->id()],
        ]);
    $paragraph->save();
    $entity->field_content_sections->appendItem([
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ]);

    // 5. Info box paragraph.
    $paragraph = Paragraph
      ::create([
        'type' => 'info_box',
      ])
        ->set('field_paragraph_title', 'Information Box')
        ->set('field_content_block_text', [
          'value' => '<p>Important information in a highlighted box.</p>',
          'format' => 'filtered_html',
        ]);
    $paragraph->save();
    $entity->field_content_sections->appendItem([
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ]);

    // 6. Introduction paragraph.
    $paragraph = Paragraph
      ::create([
        'type' => 'introduction',
      ])
        ->set('field_paragraph_title', 'Introduction Title')
        ->set('field_intro_body', 'This is an introduction text providing context for the content below.');
    $paragraph->save();
    $entity->field_content_sections->appendItem([
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ]);

    // 7. Teaser row paragraph.
    $paragraph = Paragraph
      ::create([
        'type' => 'teaser_row',
      ])
        ->set('field_paragraph_title', 'Featured Projects')
        ->set('field_content', [
          ['target_id' => $this->getReference('node:project_main_page:1')->id()],
          ['target_id' => $this->getReference('node:project_main_page:2')->id()],
        ]);
    $paragraph->save();
    $entity->field_content_sections->appendItem([
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ]);

    // 8. Files paragraph.
    $paragraph = Paragraph
      ::create([
        'type' => 'files',
      ])
        ->set('field_title', 'Downloads')
        ->set('field_files', [
          ['target_id' => $this->getReference('media:Document1')->id()],
        ]);
    $paragraph->save();
    $entity->field_content_sections->appendItem([
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ]);

    // 9. Aktuelt i projektet paragraph.
    $paragraph = Paragraph
      ::create([
        'type' => 'aktuelt_i_projektet',
      ])
        ->set('field_promoted_content', [
          ['target_id' => $this->getReference('node:dialogue:Test Dialogue - proposals full')->id()],
        ]);
    $paragraph->save();
    $entity->field_content_sections->appendItem([
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ]);

    // 10. Accordion paragraph with accordion items.
    $accordionItem1 = Paragraph
      ::create([
        'type' => 'accordion_item',
      ])
        ->set('field_accordion_item_header', 'First Accordion Item')
        ->set('field_accordion_content', [
          'value' => '<p>Content for the first accordion item.</p>',
          'format' => 'filtered_html',
        ]);
    $accordionItem1->save();

    $accordionItem2 = Paragraph
      ::create([
        'type' => 'accordion_item',
      ])
        ->set('field_accordion_item_header', 'Second Accordion Item')
        ->set('field_accordion_content', [
          'value' => '<p>Content for the second accordion item.</p>',
          'format' => 'filtered_html',
        ]);
    $accordionItem2->save();

    $paragraph = Paragraph
      ::create([
        'type' => 'accordion',
      ])
        ->set('field_accordion_items', [
          [
            'target_id' => $accordionItem1->id(),
            'target_revision_id' => $accordionItem1->getRevisionId(),
          ],
          [
            'target_id' => $accordionItem2->id(),
            'target_revision_id' => $accordionItem2->getRevisionId(),
          ],
        ]);
    $paragraph->save();
    $entity->field_content_sections->appendItem([
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ]);

    $entity->save();
    $this->addReference('node:project_main_page:comprehensive', $entity);
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies() {
    return [
      ProjectCategoryFixture::class,
      BlockContentFixture::class,
      MediaFixture::class,
      ParagraphFixture::class,
      ProjectPageFixture::class,
      TermAreaFixture::class,
      DialogueFixture::class,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getGroups() {
    return ['node', 'project'];
  }

}
