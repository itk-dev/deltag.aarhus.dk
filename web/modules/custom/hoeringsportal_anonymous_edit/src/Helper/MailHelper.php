<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_anonymous_edit\Helper;

use Drupal\symfony_mailer\EmailFactoryInterface;
use Drupal\symfony_mailer\EmailInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

/**
 * Mail helper for citizen proposal archiving.
 */
final class MailHelper {

  private const string MAILER_TYPE = 'hoeringsportal_anonymous_edit';
  private const string MAILER_SUBTYPE_CONTENT_RECOVER = 'content_recover';

  /**
   * Constructor.
   */
  public function __construct(
    #[Autowire(service: 'email_factory')]
    readonly private EmailFactoryInterface $emailFactory,
  ) {
  }

  /**
   * Send recover mail.
   */
  public function sendRecoverMail(string $email, string $url): EmailInterface {
    return $this->emailFactory->sendTypedEmail(self::MAILER_TYPE,
      self::MAILER_SUBTYPE_CONTENT_RECOVER, $email, $url);
  }

}
