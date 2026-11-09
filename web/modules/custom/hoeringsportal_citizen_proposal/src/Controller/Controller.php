<?php

namespace Drupal\hoeringsportal_citizen_proposal\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\NodeInterface;
use Drupal\views\Views;

/**
 * Controller for citizen proposals.
 */
class Controller extends ControllerBase {

  /**
   * Render view of citizen proposal supporters.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The citizen proposal.
   *
   * @return array
   *   The view renderable array.
   */
  public function supporters(NodeInterface $node): array {
    $view = Views::getView('citizen_proposal_support');
    if (!$view || !$view->access('page_1')) {
      return [];
    }

    return [
      '#type' => 'view',
      '#name' => 'citizen_proposal_support',
      '#display_id' => 'page_1',
      '#arguments' => [$node->id()],
    ];
  }

}
