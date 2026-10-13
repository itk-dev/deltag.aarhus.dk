<?php

namespace Drupal\hoeringsportal_dialogue_report\Renderer;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\Core\Render\RendererInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\file\FileInterface;
use Drupal\hoeringsportal_dialogue_report\Gotenberg\GotenbergClient;
use Drupal\hoeringsportal_dialogue_report\Helper\ReportHelper;
use Drupal\hoeringsportal_dialogue_report\Map\MapImageGenerator;
use Drupal\image\ImageStyleInterface;
use Drupal\media\MediaInterface;
use Drupal\node\NodeInterface;

/**
 * Renders a dialogue report as HTML or PDF.
 */
final class Renderer {
  use StringTranslationTrait;

  private const TEMPLATE = 'templates/dialogue-report.html.twig';
  private const ASSETS_DIR = 'assets';
  private const BASE_CSS = self::ASSETS_DIR . '/css/dialogue-report.css';
  private const HTML_CSS = self::ASSETS_DIR . '/css/dialogue-report-html.css';
  private const PDF_CSS = self::ASSETS_DIR . '/css/dialogue-report-pdf.css';
  private const LOGO = self::ASSETS_DIR . '/images/aarhus-kommune-logo.svg';
  private const HTML_JS = self::ASSETS_DIR . '/js/dialogue-report.js';

  // Crops images to the map images' size, so they line up side by side.
  private const IMAGE_STYLE = 'dialogue_report';
  private const DIALOGUE_IMAGES_FIELD = 'field_top_images';
  private const MEDIA_IMAGE_FIELD = 'field_itk_media_image_upload';
  private const PROPOSAL_IMAGE_FIELD = 'field_image_upload';

  public function __construct(
    private readonly RendererInterface $renderer,
    private readonly ModuleHandlerInterface $moduleHandler,
    private readonly FileUrlGeneratorInterface $fileUrlGenerator,
    private readonly ReportHelper $reportHelper,
    private readonly GotenbergClient $gotenbergClient,
    private readonly MapImageGenerator $mapImageGenerator,
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ) {
  }

  /**
   * Render a dialogue report as a standalone HTML document.
   *
   * @param \Drupal\node\NodeInterface $dialogue
   *   A dialogue node.
   * @param bool $forPdf
   *   TRUE when this HTML is only an intermediate step towards a PDF. Selects
   *   the PDF stylesheet instead of the HTML one, hides the PDF button and
   *   makes asset URLs reachable from Gotenberg.
   */
  public function renderHtml(NodeInterface $dialogue, bool $forPdf = FALSE): string {
    $build = [
      '#type' => 'inline_template',
      '#template' => $this->readModuleFile(self::TEMPLATE),
      '#context' => [
        'dialogue' => $dialogue,
        'dialogue_images' => $this->getDialogueImages($dialogue, $forPdf),
        'categories' => $this->addProposalImages($this->reportHelper->build($dialogue), $forPdf),
        'image_width' => MapImageGenerator::WIDTH,
        'image_height' => MapImageGenerator::HEIGHT,
        'stylesheets' => [
          $this->assetUrl(self::BASE_CSS, $forPdf),
          $this->assetUrl($forPdf ? self::PDF_CSS : self::HTML_CSS, $forPdf),
        ],
        'logo_url' => $this->assetUrl(self::LOGO, $forPdf),
        'script_url' => $forPdf ? NULL : $this->assetUrl(self::HTML_JS, FALSE),
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
   * Get the dialogue's images.
   *
   * @return array<int, array{src: string, alt: string}>
   *   The images.
   */
  private function getDialogueImages(NodeInterface $dialogue, bool $forPdf): array {
    if (!$dialogue->hasField(self::DIALOGUE_IMAGES_FIELD)) {
      return [];
    }

    $images = [];
    foreach ($dialogue->get(self::DIALOGUE_IMAGES_FIELD)->referencedEntities() as $media) {
      if ($media instanceof MediaInterface && $media->hasField(self::MEDIA_IMAGE_FIELD) && $media->access('view')) {
        $image = $this->getImage($media->get(self::MEDIA_IMAGE_FIELD), $forPdf);
        if (NULL !== $image) {
          $images[] = $image;
        }
      }
    }

    return $images;
  }

  /**
   * Add each proposal's image and map image, if any.
   *
   * Adds "image" (array{src: string, alt: string}) and "map_image" (string).
   *
   * @param array $categories
   *   The report categories, cf. ReportHelper::build().
   * @param bool $forPdf
   *   Whether the HTML is for the PDF.
   */
  private function addProposalImages(array $categories, bool $forPdf): array {
    // A proposal is listed under each of its categories.
    $images = [];
    foreach ($categories as $tid => $category) {
      foreach ($category['proposals'] as $index => $proposal) {
        $node = $proposal['node'];
        $nid = (int) $node->id();
        $images[$nid] ??= [
          'image' => $node->hasField(self::PROPOSAL_IMAGE_FIELD) ? $this->getImage($node->get(self::PROPOSAL_IMAGE_FIELD), $forPdf) : NULL,
          'map_image' => $this->getMapImageSource($node, $forPdf),
        ];
        $categories[$tid]['proposals'][$index] += $images[$nid];
      }
    }

    return $categories;
  }

  /**
   * Get the first image in an image field, in the report's image style.
   *
   * @return array{src: string, alt: string}|null
   *   The image, or NULL if the field has none.
   */
  private function getImage(FieldItemListInterface $items, bool $forPdf): ?array {
    $item = $items->first();
    $file = $item?->entity;
    if (!$file instanceof FileInterface) {
      return NULL;
    }

    $uri = $file->getFileUri();
    $style = $this->entityTypeManager->getStorage('image_style')->load(self::IMAGE_STYLE);
    if ($style instanceof ImageStyleInterface) {
      // Gotenberg's requests to Drupal fail the trusted host check, so the
      // derivative must exist for nginx to serve it as a static file.
      $derivativeUri = $style->buildUri($uri);
      if ($forPdf && !file_exists($derivativeUri)) {
        $style->createDerivative($uri, $derivativeUri);
      }
      $url = $style->buildUrl($uri);
    }
    else {
      $url = $this->fileUrlGenerator->generateString($uri);
    }
    $url = $this->fileUrlGenerator->transformRelative($url);

    return [
      // The files are public, so Gotenberg can fetch them like the assets.
      'src' => $forPdf ? $this->gotenbergClient->getAssetBaseUrl() . $url : $url,
      'alt' => (string) ($item->alt ?? ''),
    ];
  }

  /**
   * Get the image source of a proposal's map image.
   *
   * Gotenberg cannot fetch private files, so the PDF gets the image inline.
   */
  private function getMapImageSource(NodeInterface $proposal, bool $forPdf): ?string {
    $uri = $this->mapImageGenerator->getUri($proposal);
    if (NULL === $uri) {
      return NULL;
    }
    if (!$forPdf) {
      return $this->fileUrlGenerator->generateString($uri);
    }

    $data = file_get_contents($uri);

    return FALSE === $data ? NULL : 'data:image/png;base64,' . base64_encode($data);
  }

  /**
   * Get the URL of one of this module's assets.
   *
   * The browser gets a root-relative URL. Gotenberg receives the HTML as a
   * string, so for the PDF the URL is made absolute on an address Gotenberg
   * can reach. An absolute URL is used rather than a <base> element, which
   * would also turn the report's #anchor links into links to that address.
   */
  private function assetUrl(string $relativePath, bool $forPdf): string {
    $path = $this->getModulePath() . '/' . $relativePath;
    // The modification time busts browser caches when the file changes.
    $url = $this->fileUrlGenerator->generateString($path) . '?' . filemtime($path);

    return $forPdf ? $this->gotenbergClient->getAssetBaseUrl() . $url : $url;
  }

  /**
   * Read a file relative to this module's directory.
   */
  private function readModuleFile(string $relativePath): string {
    $path = $this->getModulePath() . '/' . $relativePath;
    $contents = file_get_contents($path);
    if (FALSE === $contents) {
      throw new \RuntimeException(sprintf('Cannot read file %s', $path));
    }

    return $contents;
  }

  /**
   * Get this module's path, relative to the Drupal root.
   */
  private function getModulePath(): string {
    return $this->moduleHandler->getModule('hoeringsportal_dialogue_report')->getPath();
  }

}
