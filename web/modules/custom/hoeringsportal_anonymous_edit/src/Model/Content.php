<?php

declare(strict_types=1);

namespace Drupal\hoeringsportal_anonymous_edit\Model;

/**
 * Record for table hoeringsportal_anonymous_edit_content.
 */
final class Content {
  // phpcs:disable Drupal.NamingConventions.ValidVariableName.LowerCamelName
  // phpcs:disable Drupal.Commenting.VariableComment.Missing
  public string $entity_type;
  public string $entity_bundle;
  public string $entity_uuid;
  public string $owner_token;

}
