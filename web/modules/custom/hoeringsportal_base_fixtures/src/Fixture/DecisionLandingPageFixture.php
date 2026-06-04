<?php

namespace Drupal\hoeringsportal_base_fixtures\Fixture;

use Drupal\content_fixtures\Fixture\AbstractFixture;
use Drupal\content_fixtures\Fixture\DependentFixtureInterface;
use Drupal\content_fixtures\Fixture\FixtureGroupInterface;
use Drupal\node\Entity\Node;

/**
 * Decision landing page fixture.
 *
 * @package Drupal\hoeringsportal_base_fixtures\Fixture
 */
class DecisionLandingPageFixture extends AbstractFixture implements DependentFixtureInterface, FixtureGroupInterface {

  /**
   * {@inheritdoc}
   */
  public function load() {
    // Decisions ("afgørelser") landing page embedding the all_decisions view.
    $entity = Node::create([
      'type' => 'landing_page',
      'title' => 'Afgørelser',
      'field_teaser' => [
        'value' => 'Her kan du se seneste afgørelser.',
      ],
      'field_media_image_single' => ['target_id' => $this->getReference('media:Large2')->id()],
      'field_section' => [
        [
          'target_id' => $this->getReference('paragraph:content_list:all_decisions')->id(),
          'target_revision_id' => $this->getReference('paragraph:content_list:all_decisions')->getRevisionId(),
        ],
      ],
    ]);
    $entity->save();
    $this->addReference('node:landing_page:Decisions', $entity);
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
