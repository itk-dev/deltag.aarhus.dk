<?php

namespace Drupal\hoeringsportal_citizen_proposal\Helper;

use Drupal\Component\Utility\Crypt;
use Drupal\Core\Site\Settings;
use Drupal\hoeringsportal_citizen_proposal\Exception\CprException;
use Drupal\os2web_audit\Service\Logger;
use GuzzleHttp\Client;
use Http\Adapter\Guzzle7\Client as GuzzleAdapter;
use Http\Factory\Guzzle\RequestFactory;
use ItkDev\AzureKeyVault\Authorisation\VaultToken;
use ItkDev\AzureKeyVault\KeyVault\VaultSecret;
use ItkDev\Serviceplatformen\Certificate\AzureKeyVaultCertificateLocator;
use ItkDev\Serviceplatformen\Certificate\CertificateLocatorInterface;
use ItkDev\Serviceplatformen\Certificate\FilesystemCertificateLocator;
use ItkDev\Serviceplatformen\Request\InvocationContextRequestGenerator;
use ItkDev\Serviceplatformen\Service\Exception\ServiceException;
use ItkDev\Serviceplatformen\Service\PersonBaseDataExtendedService;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * CPR helper.
 */
class CprHelper {
  /**
   * The service.
   *
   * @var \ItkDev\Serviceplatformen\Service\PersonBaseDataExtendedService
   */
  private PersonBaseDataExtendedService $service;

  public function __construct(
    #[Autowire(service: 'os2web_audit.logger')]
    protected Logger $auditLogger,
  ) {}

  /**
   * Look up CPR.
   */
  public function lookUpCpr(string $cpr): ?array {
    if (!isset($this->service)) {
      $this->setUpService();
    }

    $cprLogValue = Crypt::hashBase64($cpr) . ' (hashed)';
    try {
      $this->auditLogger->info('cpr_lookup', sprintf('Looking up CPR %s', $cprLogValue));
      $response = $this->service->personLookup($cpr);
      $this->auditLogger->info('cpr_lookup', sprintf('Looked up CPR %s', $cprLogValue));
    }
    catch (ServiceException $e) {
      // Don't expose actual CPR if it appears in the service error message.
      $message = str_replace($cpr, $cprLogValue, $e->getMessage());
      $this->auditLogger->error('cpr_lookup', sprintf('Error looking up CPR %s: %s', $cprLogValue, $message));
      throw new CprException($e->getMessage(), $e->getCode(), $e);
    }

    return json_decode(json_encode($response), TRUE);
  }

  /**
   * Set up service.
   */
  private function setUpService() {
    $options = $this->resolveOptions((array) (Settings::get('hoeringsportal_citizen_proposal')['cpr_helper'] ?? []));

    $certificateLocator = isset($options['certificate_path'])
      ? new FilesystemCertificateLocator($options['certificate_path'])
      : $this->getAzureKeyVaultCertificateLocator(
        $options['azure_tenant_id'],
        $options['azure_application_id'],
        $options['azure_client_secret'],
        $options['azure_key_vault_name'],
        $options['azure_key_vault_secret'],
        $options['azure_key_vault_secret_version']
      );

    $serviceContractFilename = $options['serviceplatformen_service_contract'];
    $serviceEndpoint = $options['serviceplatformen_service_endpoint'];
    $soapClientOptions = [
      'wsdl' => $serviceContractFilename,
      'certificate_locator' => $certificateLocator,
      'options' => [
        'location' => $serviceEndpoint,
      ],
    ];

    if (!realpath($serviceContractFilename)) {
      throw new CprException(sprintf('The path (%s) to the service contract is invalid.', $serviceContractFilename));
    }

    $requestGenerator = new InvocationContextRequestGenerator(
          $options['serviceplatformen_service_agreement_uuid'],
          $options['serviceplatformen_user_system_uuid'],
          $options['serviceplatformen_service_uuid'],
          $options['serviceplatformen_user_uuid']
      );

    $this->service = new PersonBaseDataExtendedService($soapClientOptions, $requestGenerator);
  }

  /**
   * Resolve options.
   */
  private function resolveOptions(array $options): array {
    return (new OptionsResolver())
      ->setRequired([
        'azure_tenant_id',
        'azure_application_id',
        'azure_client_secret',
        'azure_key_vault_name',
        'azure_key_vault_secret',
        'azure_key_vault_secret_version',
        'serviceplatformen_service_agreement_uuid',
        'serviceplatformen_user_system_uuid',
        'serviceplatformen_user_uuid',
        'serviceplatformen_service_uuid',
        'serviceplatformen_service_endpoint',
        'serviceplatformen_service_contract',
      ])

      // Allow local testing of certificates in the file system.
      ->setDefault('certificate_path', NULL)
      ->setAllowedTypes('certificate_path', ['null', 'string'])
      ->setAllowedValues('certificate_path', static fn (?string $value) => NULL === $value || is_file($value))

      ->resolve($options);
  }

  /**
   * Get AzureKeyVaultCertificateLocator.
   */
  private function getAzureKeyVaultCertificateLocator(
    string $tenantId,
    string $applicationId,
    string $clientSecret,
    string $keyVaultName,
    string $keyVaultSecret,
    string $keyVaultSecretVersion,
  ): CertificateLocatorInterface {
    $httpClient = new GuzzleAdapter(new Client());
    $requestFactory = new RequestFactory();

    $vaultToken = new VaultToken($httpClient, $requestFactory);

    $token = $vaultToken->getToken(
          $tenantId,
          $applicationId,
          $clientSecret
      );

    $vault = new VaultSecret(
          $httpClient,
          $requestFactory,
          $keyVaultName,
          $token->getAccessToken()
      );

    return new AzureKeyVaultCertificateLocator(
          $vault,
          $keyVaultSecret,
          $keyVaultSecretVersion
      );
  }

}
