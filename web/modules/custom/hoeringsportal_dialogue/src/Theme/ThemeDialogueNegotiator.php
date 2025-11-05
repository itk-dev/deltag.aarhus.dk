<?php

namespace Drupal\hoeringsportal_dialogue\Theme;

use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Theme\ThemeNegotiatorInterface;
use Drupal\hoeringsportal_dialogue\Helper\DialogueHelper;

/**
 * Theme negotiator for dialogue proposal.
 */
class ThemeDialogueNegotiator implements ThemeNegotiatorInterface {

  /**
   * The dialogue negotiator constructor.
   *
   * @param \Drupal\hoeringsportal_dialogue\Helper\DialogueHelper $dialogueHelper
   *   The request stack.
   */
  public function __construct(
    protected DialogueHelper $dialogueHelper,
  ) {
  }

  /**
   * {@inheritdoc}
   */
  public function applies(RouteMatchInterface $route_match): bool {
    if ('node.add' === $route_match->getRouteName() && $this->dialogueHelper::DIALOGUE_PROPOSAL_TYPE === $route_match->getParameter('node_type')->id()) {
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
  public function determineActiveTheme(RouteMatchInterface $route_match): string {
    return 'hoeringsportal';
  }

}
