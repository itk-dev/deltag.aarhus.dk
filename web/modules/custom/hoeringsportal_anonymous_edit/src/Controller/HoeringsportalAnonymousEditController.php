<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_anonymous_edit\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Response;

/**
 * Main hoeringsportal_anonymous_edit controller.
 */
final class HoeringsportalAnonymousEditController extends ControllerBase {

  /**
   * Action!
   */
  public function __invoke(): Response {
    return $this->redirect('hoeringsportal_anonymous_edit.content');
  }

}
