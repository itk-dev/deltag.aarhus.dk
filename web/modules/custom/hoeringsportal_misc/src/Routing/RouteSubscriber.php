<?php

namespace Drupal\hoeringsportal_misc\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Routing\RouteCollection;

/**
 * Listens to the dynamic route events.
 */
class RouteSubscriber extends RouteSubscriberBase implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection) {
    if ($route = $collection->get('comment.admin')) {
      $route->setRequirement('_role', 'administrator');
    }
  }

}
