<?php

namespace Drupal\hoeringsportal_anonymous_edit\Helper;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\hoeringsportal_anonymous_edit\Form\SettingsForm;
use Drupal\Component\Serialization\Yaml;

/**
 * Settings for hoeringsportal_anonymous_edit.
 */
readonly class Settings {

  /**
   * Constructor.
   */
  public function __construct(
    private ConfigFactoryInterface $configFactory,
  ) {}

  /**
   * Get node allow update.
   */
  public function getNodeAllowUpdate(): bool {
    return (bool) $this->get('node.allow_update');
  }

  /**
   * Get node allow delete.
   */
  public function getNodeAllowDelete(): bool {
    return (bool) $this->get('node.allow_delete');
  }

  /**
   * Get comment allow update.
   */
  public function getCommentAllowUpdate(): bool {
    return (bool) $this->get('comment.allow_update');
  }

  /**
   * Get comment allow cancel.
   */
  public function getCommentAllowCancel(): bool {
    return (bool) $this->get('comment.allow_cancel');
  }

  /**
   * Get comment cancel texts.
   */
  public function getCommentCancelTexts(): array {
    try {
      return self::yamlDecode((string) $this->get('comment.cancel_texts'));
    }
    catch (\Exception) {
      return [];
    }
  }

  /**
   * Get comment allow delete.
   */
  public function getCommentAllowDelete(): bool {
    return (bool) $this->get('comment.allow_delete');
  }

  /**
   * Get owner name format.
   */
  public function getOwnerNameFormat(): string {
    return $this->get('general.owner_name_format', 'Bruger %1$d');
  }

  /**
   * Get log level.
   */
  public function getLogLevel(): int {
    return (int) $this->get('general.log_level');
  }

  /**
   * Get setting.
   */
  private function get(string $key, mixed $default = NULL): mixed {
    $config = $this->configFactory->get(SettingsForm::CONFIG_NAME);

    return $config->get($key) ?? $default;
  }

  /**
   * YAML decode.
   */
  public static function yamlDecode(string $yaml): mixed {
    return Yaml::decode($yaml);
  }

}
