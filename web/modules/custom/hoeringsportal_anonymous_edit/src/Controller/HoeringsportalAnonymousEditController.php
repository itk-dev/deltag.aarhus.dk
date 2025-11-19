<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_anonymous_edit\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\hoeringsportal_anonymous_edit\Helper\Helper;

/**
 * Returns responses for hoeringsportal_anonymous_edit routes.
 */
final class HoeringsportalAnonymousEditController extends ControllerBase {

  public function __construct(
    private readonly Helper $helper,
  ) {}

  /**
   * Action!
   */
  public function __invoke(): array {
    $entities = $this->helper->getContent();

    $build['content'] = [
      '#type' => 'theme',
      '#theme' => 'hoeringsportal_anonymous_edit_content_index',
      '#entities' => $entities,
    ];

    return $build;
  }

}
