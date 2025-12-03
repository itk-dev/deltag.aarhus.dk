<?php

namespace Drupal\hoeringsportal_anonymous_edit\Plugin\EmailBuilder;

use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\symfony_mailer\EmailFactoryInterface;
use Drupal\symfony_mailer\EmailInterface;
use Drupal\symfony_mailer\MailerHelperTrait;
use Drupal\symfony_mailer\Processor\EmailBuilderBase;
use Drupal\symfony_mailer\Processor\TokenProcessorTrait;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Email builder plug-in for the hoeringsportal_anonymous_edit module.
 *
 * @see https://www.drupal.org/docs/contributed-modules/symfony-mailer-0/development/emailbuilder-development-override-existing
 *
 * @EmailBuilder(
 *   id = "hoeringsportal_anonymous_edit",
 *   sub_types = {
 *     "content_recover" = @Translation("Content recover"),
 *   }
 * )
 */
final class EmailBuilder extends EmailBuilderBase implements ContainerFactoryPluginInterface {
  use MailerHelperTrait;
  use TokenProcessorTrait;

  /**
   * {@inheritdoc}
   */
  public static function create(
    ContainerInterface $container,
    array $configuration,
    $plugin_id,
    $plugin_definition,
  ): static {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
    );
  }

  /**
   * {@inheritdoc}
   */
  public function createParams(EmailInterface $email, ?string $to = NULL, ?string $url = NULL) {
    $email->setParam('to', $to);
    $email->setParam('recover_url', $url);
  }

  /**
   * {@inheritdoc}
   */
  public function fromArray(EmailFactoryInterface $factory, array $message) {
    return $factory->newTypedEmail($message['module'], $message['key'], $message['params']['to'], $message['params']['recover_url']);
  }

  /**
   * {@inheritdoc}
   */
  public function build(EmailInterface $email) {
    $to = $email->getParam('to');
    $url = $email->getParam('recover_url');
    $email->setTo($to);
    $email->setVariable('recover_url', $url);
    parent::build($email);
  }

}
