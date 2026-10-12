<?php

namespace Drupal\hoeringsportal_dialogue_report\Gotenberg;

use Drupal\Core\Site\Settings;
use Gotenberg\Gotenberg;
use Gotenberg\Stream;
use Psr\Http\Client\ClientInterface;

/**
 * Client for the Gotenberg HTML-to-PDF conversion API.
 */
final class GotenbergClient {

  private const DEFAULT_URL = 'http://gotenberg:3000';
  // Where Gotenberg reaches this site's nginx to fetch the report's assets.
  private const DEFAULT_ASSET_BASE_URL = 'http://nginx:8080';

  // A4.
  private const PAPER_WIDTH = '21cm';
  private const PAPER_HEIGHT = '29.7cm';
  private const MARGIN_TOP = '1cm';
  // Leaves room for the footer.
  private const MARGIN_BOTTOM = '1.5cm';
  // Mirrored by the body padding in dialogue-report-html.css.
  private const MARGIN_LEFT = '1cm';
  private const MARGIN_RIGHT = '1cm';

  // Fail on any 4xx/5xx asset response instead of producing an unstyled PDF.
  private const FAIL_ON_RESOURCE_HTTP_STATUS_CODES = [499, 599];

  public function __construct(
    // Drupal's http_client, so Gotenberg calls use the site's HTTP settings.
    private readonly ClientInterface $httpClient,
    private readonly Settings $settings,
  ) {
  }

  /**
   * Convert an HTML document to a PDF.
   *
   * @param string $html
   *   An HTML document. Linked assets must use absolute URLs Gotenberg can
   *   reach, cf. self::getAssetBaseUrl().
   * @param string $footerHtml
   *   HTML for the page footer, e.g. a "page X of Y" pager. Uses Chromium's
   *   native print header/footer markup: classes "pageNumber"/"totalPages".
   *
   * @return string
   *   The rendered PDF, as binary string.
   *
   * @throws \Gotenberg\Exceptions\GotenbergApiErrored
   *   If Gotenberg fails, e.g. because a linked asset could not be loaded.
   */
  public function convertHtmlToPdf(string $html, string $footerHtml): string {
    $request = Gotenberg::chromium($this->getBaseUrl())
      ->pdf()
      ->paperSize(self::PAPER_WIDTH, self::PAPER_HEIGHT)
      ->margins(self::MARGIN_TOP, self::MARGIN_BOTTOM, self::MARGIN_LEFT, self::MARGIN_RIGHT)
      // Makes Chromium apply the report's @media print rules.
      ->emulatePrintMediaType()
      ->failOnResourceHttpStatusCodes(self::FAIL_ON_RESOURCE_HTTP_STATUS_CODES)
      ->footer(Stream::string('footer.html', $footerHtml))
      ->html(Stream::string('index.html', $html));

    return (string) Gotenberg::send($request, $this->httpClient)->getBody();
  }

  /**
   * Get the base URL Gotenberg uses to fetch this site's assets.
   */
  public function getAssetBaseUrl(): string {
    return rtrim($this->getConfig()['asset_base_url'] ?? self::DEFAULT_ASSET_BASE_URL, '/');
  }

  /**
   * Get the Gotenberg base URL.
   */
  private function getBaseUrl(): string {
    return rtrim($this->getConfig()['url'] ?? self::DEFAULT_URL, '/');
  }

  /**
   * Get the Gotenberg settings.
   */
  private function getConfig(): array {
    return $this->settings->get('hoeringsportal_dialogue_report.gotenberg') ?? [];
  }

}
