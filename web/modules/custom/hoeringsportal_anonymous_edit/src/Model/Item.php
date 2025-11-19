<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_anonymous_edit\Model;

/**
 * Event for hoeringsportal_anonymous_edit.
 */
final class Item {
  // phpcs:disable Drupal.NamingConventions.ValidVariableName.LowerCamelName
  // phpcs:disable Drupal.Commenting.VariableComment.Missing
  public string $entity_type;
  public string $entity_bundle;
  public string $entity_uuid;
  public string $owner_token;
  public ?string $owner_email;

}
