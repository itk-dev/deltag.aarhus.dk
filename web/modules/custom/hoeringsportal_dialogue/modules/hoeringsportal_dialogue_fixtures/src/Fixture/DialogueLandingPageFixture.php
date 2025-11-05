<?php

namespace Drupal\hoeringsportal_dialogue_fixtures\Fixture;

use Drupal\content_fixtures\Fixture\AbstractFixture;
use Drupal\content_fixtures\Fixture\DependentFixtureInterface;
use Drupal\content_fixtures\Fixture\FixtureGroupInterface;
use Drupal\hoeringsportal_base_fixtures\Fixture\MediaFixture;
use Drupal\hoeringsportal_base_fixtures\Fixture\ParagraphFixture;
use Drupal\node\Entity\Node;

/**
 * Landing page fixture.
 *
 * @package Drupal\hoeringsportal_citizen_proposal_fixtures\Fixture
 */
class DialogueLandingPageFixture extends AbstractFixture implements DependentFixtureInterface, FixtureGroupInterface {

  /**
   * {@inheritdoc}
   */
  public function load() {
    // Citizen proposal landing page.
    $entity = Node::create([
      'type' => 'landing_page',
      'title' => 'Tidlig inddragelse',
      'field_teaser' => [
        'value' => <<<'BODY'
I Aarhus ønsker vi lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis mattis scelerisque habitasse elit etiam lobortis accumsan. Dignissim ac sapien potenti ipsum nam penatibus leo.
BODY
      ],
      'field_media_image_single' => ['target_id' => $this->getReference('media:Large1')->id()],
      'field_section' => [
        [
          'target_id' => $this->getReference('paragraph:content_list:all_early_inclusion')->id(),
          'target_revision_id' => $this->getReference('paragraph:content_list:all_early_inclusion')->getRevisionId(),
        ],
      ],
    ]);
    $entity->save();
    $this->addReference('node:landing_page:Dialogue proposals', $entity);
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
