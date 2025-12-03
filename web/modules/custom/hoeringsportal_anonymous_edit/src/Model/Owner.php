<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_anonymous_edit\Model;

/**
 * Record for table hoeringsportal_anonymous_edit_owners.
 */
final class Owner {
  // phpcs:disable Drupal.NamingConventions.ValidVariableName.LowerCamelName
  // phpcs:disable Drupal.Commenting.VariableComment.Missing
  public string $owner_token;
  public string $email;
  public string $name;
  public bool $isCurrent = FALSE;

}
