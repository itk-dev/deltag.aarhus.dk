<?php

namespace Drupal\hoeringsportal_dialogue_report\Gotenberg;

use Drupal\Core\Site\Settings;
use GuzzleHttp\ClientInterface;

/**
 * Thin client for the Gotenberg HTML-to-PDF conversion API.
 */
final class GotenbergClient {

  public function __construct(
    private readonly ClientInterface $httpClient,
    private readonly Settings $settings,
  ) {
  }

  /**
   * Convert a self-contained HTML document to a PDF.
   *
   * @param string $html
   *   A self-contained HTML document (no external assets to fetch).
   * @param string $footerHtml
   *   HTML for the page footer, e.g. a "page X of Y" pager. Uses Chromium's
   *   native print header/footer markup: classes "pageNumber"/"totalPages".
   *
   * @return string
   *   The rendered PDF, as binary string.
   */
  public function convertHtmlToPdf(string $html, string $footerHtml): string {
    $response = $this->httpClient->request('POST', $this->getBaseUrl() . '/forms/chromium/convert/html', [
      'multipart' => [
        [
          'name' => 'files',
          'filename' => 'index.html',
          'contents' => $html,
        ],
        [
          'name' => 'files',
          'filename' => 'footer.html',
          'contents' => $footerHtml,
        ],
        [
          'name' => 'emulatedMediaType',
          'contents' => 'print',
        ],
        [
          'name' => 'paperWidth',
          'contents' => '8.27',
        ],
        [
          'name' => 'paperHeight',
          'contents' => '11.7',
        ],
        [
          'name' => 'marginTop',
          'contents' => '0.4',
        ],
        [
          'name' => 'marginBottom',
          'contents' => '0.6',
        ],
      ],
    ]);

    return (string) $response->getBody();
  }

  /**
   * Get the Gotenberg base URL.
   */
  private function getBaseUrl(): string {
    $config = $this->settings->get('hoeringsportal_dialogue.gotenberg') ?? [];

    return rtrim($config['url'] ?? 'http://gotenberg:3000', '/');
  }

}
