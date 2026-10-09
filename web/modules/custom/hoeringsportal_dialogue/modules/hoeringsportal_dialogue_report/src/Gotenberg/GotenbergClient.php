<?php

namespace Drupal\hoeringsportal_dialogue_report\Gotenberg;

use Drupal\Core\Site\Settings;
use GuzzleHttp\ClientInterface;

/**
 * Thin client for the Gotenberg HTML-to-PDF conversion API.
 */
final class GotenbergClient {

  private const DEFAULT_URL = 'http://gotenberg:3000';
  private const CONVERT_HTML_PATH = '/forms/chromium/convert/html';

  // A4, in inches (Gotenberg's unit).
  private const PAPER_WIDTH = '8.27';
  private const PAPER_HEIGHT = '11.7';
  private const MARGIN_TOP = '0.4';
  // Leaves room for the footer.
  private const MARGIN_BOTTOM = '0.6';

  // Makes Chromium apply the report's @media print rules.
  private const EMULATED_MEDIA_TYPE = 'print';

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
    $options = [
      'emulatedMediaType' => self::EMULATED_MEDIA_TYPE,
      'paperWidth' => self::PAPER_WIDTH,
      'paperHeight' => self::PAPER_HEIGHT,
      'marginTop' => self::MARGIN_TOP,
      'marginBottom' => self::MARGIN_BOTTOM,
    ];

    $multipart = [
      ['name' => 'files', 'filename' => 'index.html', 'contents' => $html],
      ['name' => 'files', 'filename' => 'footer.html', 'contents' => $footerHtml],
    ];
    foreach ($options as $name => $value) {
      $multipart[] = ['name' => $name, 'contents' => $value];
    }

    $response = $this->httpClient->request('POST', $this->getBaseUrl() . self::CONVERT_HTML_PATH, [
      'multipart' => $multipart,
    ]);

    return (string) $response->getBody();
  }

  /**
   * Get the Gotenberg base URL.
   */
  private function getBaseUrl(): string {
    $config = $this->settings->get('hoeringsportal_dialogue.gotenberg') ?? [];

    return rtrim($config['url'] ?? self::DEFAULT_URL, '/');
  }

}
