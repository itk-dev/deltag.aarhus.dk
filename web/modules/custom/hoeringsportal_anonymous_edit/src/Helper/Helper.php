<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_anonymous_edit\Helper;

use Drupal\comment\CommentInterface;
use Drupal\Component\Uuid\Uuid;
use Drupal\Component\Uuid\UuidInterface;
use Drupal\Core\Access\AccessResult;
use Drupal\Core\Access\AccessResultInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\LoggerChannelInterface;
use Drupal\Core\Logger\RfcLogLevel;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Url;
use Drupal\hoeringsportal_anonymous_edit\Event\HoeringsportalAnonymousEditEvent;
use Drupal\hoeringsportal_anonymous_edit\Exception\InvalidTokenException;
use Drupal\hoeringsportal_anonymous_edit\Model\Owner;
use Drupal\node\NodeInterface;
use Psr\Log\LoggerAwareInterface;
use Psr\Log\LoggerAwareTrait;
use Psr\Log\LoggerInterface;
use Psr\Log\LoggerTrait;
use Psr\Log\LogLevel;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;

/**
 * Helper for hoeringsportal_anonymous_edit.
 */
final class Helper implements EventSubscriberInterface, LoggerAwareInterface, LoggerInterface {
  use LoggerTrait;
  use LoggerAwareTrait;

  private const string COOKIE_NAME = 'hoeringsportal_anonymous_edit_token';
  private const string QUERY_PARAM_NAME = 'edit_token';

  public function __construct(
    private readonly Settings $settings,
    private readonly RequestStack $requestStack,
    private readonly AccountInterface $account,
    private readonly UuidInterface $uuid,
    private readonly StorageHelper $storageHelper,
    private readonly EntityTypeManagerInterface $entityTypeManager,
    private readonly EventDispatcherInterface $eventDispatcher,
    private readonly MailHelper $mailHelper,
    #[Autowire(service: 'hoeringsportal_anonymous_edit.logger')]
    LoggerChannelInterface $logger,
  ) {
    $this->setLogger($logger);
  }

  /**
   * Get owner of a piece of content.
   */
  public function getContentOwner(EntityInterface $entity): ?Owner {
    if ($item = $this->storageHelper->fetchItemByEntity($entity)) {
      if ($owner = $this->storageHelper->fetchOwner($item->owner_token)) {
        $owner->isCurrent = $owner->owner_token === $this->getToken();
        return $owner;
      }
    }

    return NULL;
  }

  /**
   * Get content for the current token if any.
   */
  public function getContent(): ?array {
    $token = $this->getToken();
    if (NULL === $token) {
      return NULL;
    }

    $items = $this->storageHelper->fetchItemsByToken($token);

    $groups = [];
    foreach ($items as $row) {
      $groups[$row->entity_type][$row->entity_bundle][] = $row->entity_uuid;
    }

    $entities = [];
    foreach ($groups as $type => $items) {
      $storage = $this->entityTypeManager->getStorage($type);
      $entityType = $storage->getEntityType();
      $entity = [
        'type' => $entityType,
        'bundles' => [],
      ];
      foreach ($items as $bundle => $ids) {
        $ids = $storage->getQuery()
          ->accessCheck(FALSE)
          ->condition($entityType->getKey('bundle'), $bundle)
          ->condition($entityType->getKey('uuid'), $ids, 'IN')
          ->sort('created')
          ->execute();
        $content = $storage->loadMultiple($ids);
        $entity['bundles'][] = [
          // @todo Get full bundle information (id, label, fields, …)
          'type' => $bundle,
          'entities' => array_map(fn (EntityInterface $entity) => [
            'instance' => $entity,
            'edit_query' => [
              self::QUERY_PARAM_NAME => $token,
            ],
          ], $content),
        ];
      }
      $entities[] = $entity;
    }

    return $entities;
  }

  /**
   * Get unique token.
   *
   * If a token does not exists in a cookie, a new one is created and set if
   * requested.
   */
  private function getToken(bool $create = FALSE): ?string {
    if (!$this->account->isAnonymous()) {
      return NULL;
    }

    $request = $this->requestStack->getCurrentRequest();
    $token = $request->cookies->get(self::COOKIE_NAME);
    if (NULL === $token && $create) {
      $token = $this->uuid->generate();
      $this->setToken($token);
    }

    return $token;
  }

  /**
   * Set token.
   *
   * The token is set in the attributes of the request and then
   * self::onKernelResponse will set it in the response cookies.
   *
   * @see self::onKernelResponse()
   */
  private function setToken(string $token): void {
    if (!Uuid::isValid($token)) {
      throw new InvalidTokenException($token);
    }
    $request = $this->requestStack->getCurrentRequest();
    $request->attributes->set(self::COOKIE_NAME, $token);
  }

  /**
   * Decide if email address matches a token.
   */
  public function isValidTokenEmail(string $email, string $token): bool {
    return NULL !== $this->fetchOwnerByEmail($email, $token);
  }

  /**
   * Set token by email.
   */
  public function setTokenByEmail(string $email, string $token): void {
    $item = $this->fetchOwnerByEmail($email, $token);
    if (!$item) {
      throw new InvalidTokenException($email);
    }

    $this->setToken($item->owner_token);
  }

  /**
   * Fetch item by email.
   */
  private function fetchOwnerByEmail(string $email, string $token): ?Owner {
    return $this->storageHelper->fetchOwnerByEmail($email, $token);
  }

  /**
   * Get recover URL.
   */
  public function getRecoverUrl(string $email): ?string {
    $owner = $this->storageHelper->fetchOwnerByEmail($email);
    if (NULL === $owner) {
      return NULL;
    }

    return Url::fromRoute('hoeringsportal_anonymous_edit.content_recover', ['token' => $owner->owner_token])
      ->setAbsolute()
      ->toString(TRUE)->getGeneratedUrl();
  }

  /**
   * Send recover URL.
   */
  public function sendRecoverUrl(string $email): void {
    $url = $this->getRecoverUrl($email);
    if (NULL !== $url) {
      $this->mailHelper->sendRecoverMail($email, $url);
    }
  }

  /**
   * Set ant token cookie from the request.
   */
  public function onKernelResponse(ResponseEvent $event): void {
    $request = $event->getRequest();
    if ($token = $request->attributes->get(self::COOKIE_NAME)) {
      $response = $event->getResponse();
      $response->headers->setCookie(new Cookie(
        self::COOKIE_NAME,
        $token,
      ));
    }
  }

  /**
   * Implements hook_entity_insert().
   */
  public function entityInsert(EntityInterface $entity): void {
    $token = $this->getToken(create: TRUE);
    if (NULL === $token) {
      return;
    }
    $owner = $this->storageHelper->fetchOwner($token);
    $ownerNameFormat = $this->settings->getOwnerNameFormat();
    if (NULL === $owner) {
      $owner = new Owner();
      $owner->owner_token = $token;
      $owner->name = $this->storageHelper->computeName($ownerNameFormat);
    }
    $event = new HoeringsportalAnonymousEditEvent($entity, $owner);
    $this->eventDispatcher->dispatch($event);
    if ($event->isSupported()) {
      $owner = $event->getOwner();
      $anonymousName = $this->settings->getAnonymousName();
      if ($owner->name === $anonymousName) {
        $owner->name = $this->storageHelper->computeName($ownerNameFormat);
      }
      $item = $this->storageHelper->createItem($entity, $token, $owner);
      $this->debug('Item <pre>@item</pre> created.', ['@item' => json_encode($item, JSON_PRETTY_PRINT)]);
    }
  }

  /**
   * Implements hook_entity_delete().
   */
  public function entityDelete(EntityInterface $entity): void {
    $this->storageHelper->deleteItem($entity);
  }

  /**
   * Implements hook_entity_access().
   */
  public function entityAccess(EntityInterface $entity, string $operation, AccountInterface $account): AccessResultInterface {
    if (in_array($operation, ['update', 'delete'])
      && (
        $entity instanceof NodeInterface && ('update' === $operation ? $this->settings->getNodeAllowUpdate() : $this->settings->getNodeAllowDelete())
        || $entity instanceof CommentInterface && ('update' === $operation ? $this->settings->getCommentAllowUpdate() : $this->settings->getCommentAllowDelete())
      )
    ) {
      if ($token = $this->getToken()) {
        if ($item = $this->storageHelper->fetchItemByEntity($entity)) {
          if ($item->owner_token === $token) {
            return AccessResult::allowed();
          }
        }
      }
    }

    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      KernelEvents::RESPONSE => ['onKernelResponse'],
    ];
  }

  /**
   * {@inheritdoc}
   */
  #[\Override]
  public function log($level, \Stringable|string $message, array $context = []): void {
    // Lifted from LoggerChannel.
    $levelTranslation = [
      LogLevel::EMERGENCY => RfcLogLevel::EMERGENCY,
      LogLevel::ALERT => RfcLogLevel::ALERT,
      LogLevel::CRITICAL => RfcLogLevel::CRITICAL,
      LogLevel::ERROR => RfcLogLevel::ERROR,
      LogLevel::WARNING => RfcLogLevel::WARNING,
      LogLevel::NOTICE => RfcLogLevel::NOTICE,
      LogLevel::INFO => RfcLogLevel::INFO,
      LogLevel::DEBUG => RfcLogLevel::DEBUG,
    ];
    $rfcLogLevel = $levelTranslation[$level] ?? RfcLogLevel::ERROR;
    $logLevel = $this->settings->getLogLevel();
    if ($logLevel >= $rfcLogLevel) {
      $this->logger->log($level, $message, $context);
    }
  }

  /**
   * Log an exception.
   */
  public function logException(\Exception $exception) {
    $this->error('Exception: @message', ['@message' => $exception->getMessage(), 'exception' => $exception]);
  }

}
