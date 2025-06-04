<?php

namespace Drupal\hoeringsportal_project_fixtures\Fixture;

use Drupal\content_fixtures\Fixture\AbstractFixture;
use Drupal\content_fixtures\Fixture\DependentFixtureInterface;
use Drupal\content_fixtures\Fixture\FixtureGroupInterface;
use Drupal\hoeringsportal_base_fixtures\Fixture\MediaFixture;
use Drupal\hoeringsportal_base_fixtures\Fixture\ParagraphFixture;
use Drupal\hoeringsportal_base_fixtures\Fixture\TermAreaFixture;
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
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getGroups() {
    return ['node', 'project'];
  }

}
