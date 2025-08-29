<?php

namespace Drupal\hoeringsportal_public_meeting\EventSubscriber;

use Drupal\node\NodeInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Routing\TrustedRedirectResponse;
use Drupal\Core\Url;
use Drupal\hoeringsportal_public_meeting\Helper\PublicMeetingHelper;
use Drupal\itk_pretix\Plugin\Field\FieldType\PretixDate;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * An event subscriber.
 */
class RedirectEventSubscriber implements EventSubscriberInterface {

  public function __construct(
    private readonly RouteMatchInterface $routeMatch,
    #[Autowire(service: 'hoeringsportal_public_meeting.public_meeting_helper')]
    private readonly PublicMeetingHelper $publicMeetingHelper,
  ) {}

  /**
   * Redirect to first upcoming date (or first date)
   */
  public function redirectToDate(RequestEvent $event) {
    // Redirect to a date if viewing a pretix meeting with no specific pretix
    // date requested.
    if ('entity.node.canonical' === $this->routeMatch->getRouteName()
      || ('hoeringsportal_public_meeting.public_meeting_date' === $this->routeMatch->getRouteName()
        && (int) $this->routeMatch->getParameter('dates_delta') < 0)) {
      /** @var \Drupal\node\NodeInterface $node */
      $node = $this->routeMatch->getParameter('node');
      if ($this->publicMeetingHelper->isPublicMeeting($node) && $this->publicMeetingHelper->hasPretixSignUp($node)) {
        $datesDelta = $this->getNextDatesDelta($node);
        if (NULL !== $datesDelta) {
          $url = Url::fromRoute(
            'hoeringsportal_public_meeting.public_meeting_date',
            [
              'node' => $node->id(),
              'dates_delta' => $datesDelta,
            ]
          );
          $event->setResponse(new TrustedRedirectResponse($url->toString(TRUE)
            ->getGeneratedUrl()));
        }
      }
    }
  }

  /**
   * Get next dates delta if any.
   *
   * The "next dates delta" is the delta of an upcoming date if any or of the
   * first date.
   */
  private function getNextDatesDelta(NodeInterface $node): ?int {
    $getDelta = static function (PretixDate $date): ?int {
      $delta = (int) $date->getName();

      return $delta > -1 ? $delta : NULL;
    };

    // Check if we have a context with an upcoming date.
    $context = $this->publicMeetingHelper->getPublicMeetingContext($node);
    if (isset($context['upcoming'])) {
      if ($data = reset($context['upcoming'])) {
        $delta = $getDelta($data);
        if (NULL !== $delta) {
          return $delta;
        }
      }
    }

    $dates = $this->publicMeetingHelper->getPretixDates($node);
    if ($date = $dates->first()) {
      $delta = $getDelta($date);
      if (NULL !== $delta) {
        return $delta;
      }
    }

    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    return [
      KernelEvents::REQUEST => [['redirectToDate']],
    ];
  }

}
