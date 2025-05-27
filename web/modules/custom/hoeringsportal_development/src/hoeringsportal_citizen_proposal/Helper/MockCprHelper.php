<?php

namespace Drupal\hoeringsportal_development\hoeringsportal_citizen_proposal\Helper;

use Drupal\hoeringsportal_citizen_proposal\Exception\CprException;
use Drupal\hoeringsportal_citizen_proposal\Helper\CprHelper;
use Symfony\Component\Yaml\Exception\ParseException;
use Symfony\Component\Yaml\Yaml;

/**
 * CPR helper.
 */
class MockCprHelper extends CprHelper {

  /**
   * {@inheritdoc}
   */
  #[\Override]
  public function lookUpCpr(string $cpr): ?array {
    try {
      $data = Yaml::parseFile(__DIR__ . '/../mock/personLookup.yaml');
    }
    catch (ParseException $exception) {
      \Drupal::messenger()->addError($exception->getMessage());
    }
    if (!isset($data[$cpr])) {
      throw new CprException(sprintf('Invalid cpr: %s', $cpr));
    }

    return $data[$cpr];
  }

}
