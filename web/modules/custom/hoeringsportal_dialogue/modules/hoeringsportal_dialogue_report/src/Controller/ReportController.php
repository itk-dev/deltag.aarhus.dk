<?php

namespace Drupal\hoeringsportal_dialogue_report\Controller;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Access\AccessResultInterface;
use Drupal\Core\Controller\ControllerBase;
use Drupal\hoeringsportal_dialogue_report\Renderer\Renderer;
use Drupal\node\NodeInterface;
use Symfony\Component\HttpFoundation\Response;

/**
 * Controller for the dialogue report.
 */
class ReportController extends ControllerBase {

  public function __construct(
    protected Renderer $renderer,
  ) {
  }

  /**
   * Render the dialogue report as HTML, without the active theme.
   *
   * @param \Drupal\node\NodeInterface $node
   *   A dialogue node.
   *
   * @return \Symfony\Component\HttpFoundation\Response
   *   The report.
   */
  public function html(NodeInterface $node): Response {
    return new Response($this->renderer->renderHtml($node), 200, [
      'Content-Type' => 'text/html; charset=UTF-8',
    ]);
  }

  /**
   * Render the dialogue report as a PDF, via Gotenberg.
   *
   * @param \Drupal\node\NodeInterface $node
   *   A dialogue node.
   *
   * @return \Symfony\Component\HttpFoundation\Response
   *   The PDF.
   */
  public function pdf(NodeInterface $node): Response {
    return new Response($this->renderer->renderPdf($node), 200, [
      'Content-Type' => 'application/pdf',
      'Content-Disposition' => sprintf('attachment; filename="dialogue-%d-report.pdf"', $node->id()),
    ]);
  }

  /**
   * Access check for the dialogue report routes.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node from the route.
   *
   * @return \Drupal\Core\Access\AccessResultInterface
   *   The access result.
   */
  public function access(NodeInterface $node): AccessResultInterface {
    return AccessResult::allowedIfHasPermission($this->currentUser(), 'administer citizen proposal')
      ->andIf(AccessResult::allowedIf('dialogue' === $node->bundle()))
      ->addCacheableDependency($node);
  }

}
