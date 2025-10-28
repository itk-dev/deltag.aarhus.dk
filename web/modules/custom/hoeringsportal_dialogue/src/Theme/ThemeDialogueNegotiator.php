<?php

namespace Drupal\hoeringsportal_dialogue\Theme;

use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Theme\ThemeNegotiatorInterface;

/**
 * Theme negotiator for dialogue proposal.
 */
class ThemeDialogueNegotiator implements ThemeNegotiatorInterface {

  /**
   * {@inheritdoc}
   */
  public function applies(RouteMatchInterface $route_match) {
    if ($route_match->getRouteName() == 'node.add' && $route_match->getParameter('node_type')->id() == 'dialogue_proposal') {
      return TRUE;
    }

    return FALSE;
  }

  public function determineActiveTheme(RouteMatchInterface $route_match)
  {
    return 'hoeringsportal';
  }
}
