<?php

namespace Drupal\hoeringsportal_dialogue\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\node\NodeInterface;
use proj4php\Point;
use Symfony\Component\HttpFoundation\JsonResponse;
use proj4php\Proj4php;
use proj4php\Proj;

/**
 * Controller for dialogue content.
 */
class DialogueController extends ControllerBase {

  /**
   * Generate map data for a dialogue map.
   *
   * @param \Drupal\node\NodeInterface $node
   *   A dialogue node.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   The data.
   */
  public function mapData(NodeInterface $node) {
    $zoom = $node->field_dialogue_proposal_zoom->value;
    $locationData = $node->field_dialogue_proposal_location->data;
    if (empty($locationData || empty($zoom))) {
      $this->messenger()->addError($this->t('Error fetching map data'));
      return new JsonResponse([]);
    }

    $proposalLocationData = $this->getProposalLocationData($node);
    $nodeMapData = json_decode($locationData, TRUE);
    $proj4 = new Proj4php();
    $e4326 = new Proj('EPSG:4326', $proj4);
    $e25832 = new Proj('EPSG:25832', $proj4);
    $mapCenter = new Point($nodeMapData['geometry']['coordinates'][0], $nodeMapData['geometry']['coordinates'][1]);
    $projectedMapCenter = $proj4->transform($e4326, $e25832, $mapCenter)->toArray();

    $mapConfig = [
      'map' => [
        'minZoomLevel' => 15,
        'view' => [
          'zoomLevel' => $zoom,
          'x' => $projectedMapCenter[0],
          'y' => $projectedMapCenter[1],
        ],
        'layer' => [
          [
            'namedlayer' => '#septima_standard',
          ],
          [
            'name' => $this->t('Dialogue proposals'),
            'selectable' => TRUE,
            'features' => TRUE,
            'type' => 'geojson',
            'visible' => TRUE,
            'data' => $proposalLocationData,
            'features_dataType' => 'json',
            'features_type' => 'Point',
            'features_style' => [
              'namedstyle' => '#pin004',
              'fillcolor' => '#008486',
              'fillcolor_selected' => '#008486',
            ],
            'template_info' => "<div class='widget-hoverbox-title'><%= title %></div><div class='widget-hoverbox-sub'><div><%= description %><div><a target='blank' href='<%= url %>'>" . $this->t('View more') . '</a></div></div>',
          ],
        ],
        'controls' => [
          [
            'info' => [
              'disable' => FALSE,
              'closeButton' => TRUE,
            ],
            'fullscreen' => [
              'disable' => FALSE,
            ],
          ],
        ],
      ],
    ];

    return new JsonResponse($mapConfig);
  }

  /**
   * Render the map view.
   *
   * @param \Drupal\node\NodeInterface $node
   *   A dialogue node.
   *
   * @return array
   *   The render array.
   */
  public function mapView(NodeInterface $node): array {
    return [
      '#theme' => 'dialogue_map',
      '#node' => $node,
      '#data_widget_url' => Url::fromRoute('hoeringsportal_dialogue.map_data', ['node' => $node->id()])->setAbsolute()->toString(),
      '#attached' => [
        'library' => [
          'hoeringsportal_dialogue/map-config',
        ],
      ],
    ];
  }

  /**
   * Get a list of location data for all proposals related to a dialogue.
   *
   * @param \Drupal\node\NodeInterface $node
   *   A dialogue node.
   *
   * @return array
   *   List of proposal locations.
   */
  private function getProposalLocationData(NodeInterface $node): array {
    try {
      $proposalLocations = [];
      $proposalIds = $this->entityTypeManager()->getStorage('node')->getQuery()
        ->accessCheck()
        ->condition('field_dialogue', $node->id())
        ->execute();

      $proposals = $this->entityTypeManager()->getStorage('node')->loadMultiple($proposalIds);
      foreach ($proposals as $proposal) {
        $location = json_decode($proposal->field_location->data, TRUE);
        $location['properties']['title'] = $proposal->label();
        $location['properties']['url'] = Url::fromRoute('entity.node.canonical', ['node' => $proposal->id()])->toString();
        $location['properties']['description'] = mb_strimwidth($proposal->field_dialogue_proposal_descr->value, 0, 200, '...');
        $proposalLocations[] = $location;
      }

    }
    catch (\Exception $e) {
      $this->messenger()->addError($this->t('Error fetching proposal locations: @message', ['@message' => $e->getMessage()]));
    }

    return [
      'type' => 'FeatureCollection',
      'crs' => [
        'type' => 'name',
        'properties' => [
          'name' => 'EPSG:4326',
        ],
      ],
      'features' => $proposalLocations,
    ];
  }

}
