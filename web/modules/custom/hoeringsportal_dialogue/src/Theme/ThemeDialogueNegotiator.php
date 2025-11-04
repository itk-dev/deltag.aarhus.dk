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

  /**
   * Determine the active theme.
   *
   * @param \Drupal\Core\Routing\RouteMatchInterface $route_match
   *   The route.
   *
   * @return string
   *   Machine name of theme.
   */
  public function determineActiveTheme(RouteMatchInterface $route_match) {
    return 'hoeringsportal';
  }

}
