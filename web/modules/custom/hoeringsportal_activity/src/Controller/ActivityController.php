<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_activity\Controller;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Session\AccountInterface;

/**
 * Activity controller.
 */
final class ActivityController extends ControllerBase {

  /**
   * Action!
   */
  public function activityAdd(): array {
    $build['content'] = [
      '#type' => 'theme',
      '#theme' => 'hoeringsportal_activity_add_activity',
      '#attached' => [
        'library' => [
          'hoeringsportal_activity/backend',
        ],
      ],
    ];

    return $build;
  }

  /**
   * Checks access for a specific request.
   *
   * @param \Drupal\Core\Session\AccountInterface $account
   *   Run access checks for this account.
   *
   * @return \Drupal\Core\Access\AccessResultInterface
   *   The access result.
   */
  public function access(AccountInterface $account) {
    return AccessResult::allowedIf($account->hasPermission('create public_meeting content') || $account->hasPermission('create course content'));
  }

}
