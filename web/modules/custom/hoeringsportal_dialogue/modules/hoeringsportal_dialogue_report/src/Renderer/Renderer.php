<?php

namespace Drupal\hoeringsportal_dialogue_report\Renderer;

use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Render\RendererInterface;
use Drupal\hoeringsportal_dialogue_report\Gotenberg\GotenbergClient;
use Drupal\hoeringsportal_dialogue_report\Helper\ReportHelper;
use Drupal\node\NodeInterface;

/**
 * Renders a dialogue report as HTML or PDF.
 */
final class Renderer {

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
   *   TRUE when this HTML is only an intermediate step towards a PDF, to
   *   suppress the "Download as PDF" link in that case.
   */
  public function renderHtml(NodeInterface $dialogue, bool $forPdf = FALSE): string {
    $templatePath = $this->getTemplateDirectory() . '/dialogue-report.html.twig';
    $template = file_get_contents($templatePath);
    if (FALSE === $template) {
      throw new \RuntimeException(sprintf('Cannot load template %s', $templatePath));
    }

    $printCss = file_get_contents($this->getTemplateDirectory() . '/dialogue-report-print.css') ?: '';

    $build = [
      '#type' => 'inline_template',
      '#template' => $template,
      '#context' => [
        'dialogue' => $dialogue,
        'categories' => $this->reportHelper->build($dialogue),
        'print_css' => $printCss,
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
    $footerHtml = '<html><head><style>body { font-size: 10px; width: 100%; text-align: center; margin: 0; }</style></head>'
      . '<body>Side <span class="pageNumber"></span> af <span class="totalPages"></span></body></html>';

    return $this->gotenbergClient->convertHtmlToPdf($html, $footerHtml);
  }

  /**
   * Get the module's templates directory.
   */
  private function getTemplateDirectory(): string {
    $modulePath = $this->moduleHandler->getModule('hoeringsportal_dialogue_report')->getPath();

    return $modulePath . '/templates';
  }

}
