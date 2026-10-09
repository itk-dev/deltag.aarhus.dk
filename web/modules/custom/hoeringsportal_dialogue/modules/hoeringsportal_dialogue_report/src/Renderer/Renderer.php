<?php

namespace Drupal\hoeringsportal_dialogue_report\Renderer;

use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Render\RendererInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\hoeringsportal_dialogue_report\Gotenberg\GotenbergClient;
use Drupal\hoeringsportal_dialogue_report\Helper\ReportHelper;
use Drupal\node\NodeInterface;

/**
 * Renders a dialogue report as HTML or PDF.
 */
final class Renderer {
  use StringTranslationTrait;

  private const TEMPLATE = 'templates/dialogue-report.html.twig';
  private const BASE_CSS = 'assets/css/dialogue-report.css';
  private const HTML_CSS = 'assets/css/dialogue-report-html.css';
  private const PDF_CSS = 'assets/css/dialogue-report-pdf.css';
  private const LOGO = 'assets/images/aarhus-kommune-logo.svg';

  public function __construct(
    private readonly RendererInterface $renderer,
    private readonly ModuleHandlerInterface $moduleHandler,
    private readonly ReportHelper $reportHelper,
    private readonly GotenbergClient $gotenbergClient,
  ) {
  }

  /**
   * Render a dialogue report as a self-contained HTML document.
   *
   * @param \Drupal\node\NodeInterface $dialogue
   *   A dialogue node.
   * @param bool $forPdf
   *   TRUE when this HTML is only an intermediate step towards a PDF. Selects
   *   the PDF stylesheet instead of the HTML one and hides the PDF button.
   */
  public function renderHtml(NodeInterface $dialogue, bool $forPdf = FALSE): string {
    // The CSS is inlined rather than attached as a library: the report bypasses
    // the theme layer, and Gotenberg receives an HTML string with no way to
    // fetch linked assets.
    $css = $this->readModuleFile(self::BASE_CSS) . "\n" . $this->readModuleFile($forPdf ? self::PDF_CSS : self::HTML_CSS);

    $build = [
      '#type' => 'inline_template',
      '#template' => $this->readModuleFile(self::TEMPLATE),
      '#context' => [
        'dialogue' => $dialogue,
        'categories' => $this->reportHelper->build($dialogue),
        'css' => $css,
        'logo' => $this->readModuleFile(self::LOGO),
        'for_pdf' => $forPdf,
      ],
    ];

    return trim((string) $this->renderer->renderInIsolation($build));
  }

  /**
   * Render a dialogue report as a PDF, via Gotenberg.
   */
  public function renderPdf(NodeInterface $dialogue): string {
    $html = $this->renderHtml($dialogue, TRUE);
    // Chromium's footer template collapses spaces and ignores centring when
    // the text sits directly in <body>, hence the wrapping div.
    $footerHtml = '<html><head><style>html, body { margin: 0; padding: 0; } .pager { width: 100%; text-align: center; font-family: sans-serif; font-size: 10px; color: #555; }</style></head>'
      . '<body><div class="pager">' . $this->t('Page <span class="pageNumber"></span> of <span class="totalPages"></span>') . '</div></body></html>';

    return $this->gotenbergClient->convertHtmlToPdf($html, $footerHtml);
  }

  /**
   * Read a file relative to this module's directory.
   */
  private function readModuleFile(string $relativePath): string {
    $path = $this->moduleHandler->getModule('hoeringsportal_dialogue_report')->getPath() . '/' . $relativePath;
    $contents = file_get_contents($path);
    if (FALSE === $contents) {
      throw new \RuntimeException(sprintf('Cannot read file %s', $path));
    }

    return $contents;
  }

}
