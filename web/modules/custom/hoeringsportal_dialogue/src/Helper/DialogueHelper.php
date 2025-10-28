<?php

namespace Drupal\hoeringsportal_dialogue\Helper;

use _PHPStan_2d0955352\Symfony\Component\Finder\Exception\AccessDeniedException;
use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\node\Entity\Node;

use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Dialogue helper.
 */
class DialogueHelper {

  /**
   * @param RequestStack $requestStack
   *   The request stack.
   */
  public function __construct(
    protected RequestStack $requestStack,
    protected EntityTypeManagerInterface $entityTypeManager,
    protected AccountInterface $account
  )
  {
  }

  /**
   * Implements access check for dialogue proposal creation.
   *
   * @param AccountInterface $account
   * The current user
   * @param array $context
   * The context.
   * @param $entity_bundle
   * The entity being created.
   *
   * @return AccessResult
   * The access result.
   */
  public function dialogueProposalCreateAccess(AccountInterface $account, array $context, $entity_bundle): AccessResult {
    if ('dialogue_proposal' === $entity_bundle) {
      $parentNode = $this->getParentNode();
      $config = $this->getProposalConfig($parentNode);

      if (!in_array('public_proposals', $config)) {
        return AccessResult::forbiddenIf($account->isAnonymous());
      }

      // Refuse to allow dialogue proposal creation if the parent dialogue is not set or not a dialogue.
      return AccessResult::forbiddenIf(!$parentNode || !($parentNode->bundle() === 'dialogue'));
    }
  }

  /**
   * Implements presave for dialogue proposal creation.
   *
   * @param EntityInterface $entity
   *   An entity to presave.
   */
  public function dialogueProposalPresave(EntityInterface $entity): void {
    if ('dialogue_proposal' === $entity->bundle()) {
      $parentDialogueId = $this->requestStack->getCurrentRequest()->query->get('dialogue');
      /**** @var Node $entity */
      $entity->set('field_dialogue', ['target_id' => $parentDialogueId]);
    }
  }

  /**
   * Changes to the dialogue proposal form.
   *
   * @param array $form
   *   The form.
   * @param FormStateInterface $form_state
   *   The state of the form.
   */
  public function dialogueProposalFormAlter(array &$form, FormStateInterface $form_state): void
  {
    // Disableable form cache to prevent serialization error on file upload.
    $form_state->disableCache();
    $form['options']['#access'] = FALSE;
    $form['advanced']['#access'] = FALSE;
    $form['revision_log']['#access'] = FALSE;
    $form['revision']['#access'] = FALSE;
    $form['meta']['#access'] = FALSE;

    $form['field_image_upload']['widget']['#attributes']['drop_zone'] = TRUE;
    $form['field_image_upload']['#drop_zone'] = TRUE;
    $form['field_image_upload']['widget'][0]['value']['#attributes']['drop_zone'] = TRUE;
    $form['field_dialogue_proposal_descr']['widget'][0]['value']['#description_display'] = 'before';
    $form['actions']['submit']['#submit'][] = [$this, 'formAlterSubmit'];
    $form['actions']['submit']['#value'] = t('Send your proposal');

    /** @var Node $parent */
    $parent = $this->getParentNode();

    if ($parent) {
      $config = $this->getProposalConfig($parent);

      if (!in_array('use_image_on_proposals', $config)) {
        $form['field_image_upload']['#access'] = FALSE;
      }

      if (!in_array('use_map_on_proposals', $config)) {
        $form['field_location']['#access'] = FALSE;
      }

      $parentLocationSelection = $parent->get('field_dialogue_proposal_location')->getValue();

      $parentPoint = json_decode($parentLocationSelection[0]['point']);
      $coordinates = $parentPoint->features[0]->geometry->coordinates;
      //$utmCoordinates = json_decode($this->ll2utm($coordinates[1], $coordinates[0]));

      $parentZoomSelection = $parent->get('field_dialogue_proposal_zoom')->getValue();
      $form['field_location']['widget'][0]['point-widget']['#attributes']['data-map-config'] = json_encode([
        'x' => $coordinates[0] ?? null,
        'y' => $coordinates[1] ?? null,
        'zoomLevel' => $parentZoomSelection[0]['value'] ?? 11,
      ]);
    }

  }

  /**
   * Custom submit handler for dialog proposal form
   *
   * @param array $form
   *   The form.
   * @param FormStateInterface $form_state
   *  The state of the form.
   */
  public function formAlterSubmit(array &$form, FormStateInterface $form_state): void
  {
      $parentNode = $this->getParentNode();

      if ($parentNode) {
        $form_state->setRedirect('entity.node.canonical', ['node' => $parentNode->id()]);
      }
  }

  /**
   * Get parent node.
   *
   * @return EntityInterface|null
   */
  private function getParentNode(): ?EntityInterface
  {
    try {
      $parentId = $this->requestStack->getCurrentRequest()->query->get('dialogue');
      if ($parentId && is_numeric($parentId)) {
        return $this->entityTypeManager->getStorage('node')->load($parentId);
      }
    } catch (\Exception $e) {
      return NULL;
    }

    return NULL;
  }

  private function getProposalConfig($parent) {
    $config = [];
    $parentConfig = $parent->get('field_dialogue_proposal_config')->getValue();

    foreach ($parentConfig as $key => $value) {
      $config[$key] = $value['value'];
    }

    return $config;
  }

  private function ll2utm($lat,$lon): false|string
  {
    if(!is_numeric($lon)){
      return json_encode(array('success'=>false,'msg'=>"Wrong longitude value"));
    }
    if($lon<-180.0 or $lon>=180.0){
      return json_encode(array('success'=>false,'msg'=>"The longitude is out of range"));
    }
    if(!is_numeric($lat)){
      return json_encode(array('success'=>false,'msg'=>"Wrong latitude value"));
    }
    if($lat<-90.0 or $lat>90.0){
      return json_encode(array('success'=>false,'msg'=>"The longitude is out of range"));
    }
    $zone = floor(($lon + 180.0) / 6) + 1;
    //compute values
    $result = $this->LatLonToUTMXY($this->degree2radian($lat), $this->degree2radian($lon),$zone);
    $aboveEquator = false;
    if($lat >0){
      $aboveEquator = true;
    }
    return json_encode(array('success'=>true,'attr'=>array('x'=>$result[0],'y'=>$result[1],'zone'=>$zone,'aboveEquator'=>$aboveEquator)));
  }

  private function LatLonToUTMXY ($lat, $lon, $zone): array
  {
    $xy = $this->MapLatLonToXY ($lat, $lon, $this->UTMCentralMeridian($zone));
    /* Adjust easting and northing for UTM system. */
    $UTMScaleFactor = 0.9996;
    $xy[0] = $xy[0] * $UTMScaleFactor + 500000.0;
    $xy[1] = $xy[1] * $UTMScaleFactor;
    if ($xy[1] < 0.0)
      $xy[1] = $xy[1] + 10000000.0;
    return $xy;
  }

  private function MapLatLonToXY ($phi, $lambda, $lambda0): array
  {
    $xy=array();
    $sm_b = 6356752.314;
    $sm_a = 6378137.0;
    $ep2 = (pow ($sm_a, 2.0) - pow ($sm_b, 2.0)) / pow ($sm_b, 2.0);
    $nu2 = $ep2 * pow (cos ($phi), 2.0);
    $N = pow ($sm_a, 2.0) / ($sm_b * sqrt (1 + $nu2));
    $t = tan ($phi);
    $t2 = $t * $t;
    $l = $lambda - $lambda0;
    $l3coef = 1.0 - $t2 + $nu2;
    $l4coef = 5.0 - $t2 + 9 * $nu2 + 4.0 * ($nu2 * $nu2);
    $l5coef = 5.0 - 18.0 * $t2 + ($t2 * $t2) + 14.0 * $nu2- 58.0 * $t2 * $nu2;
    $l6coef = 61.0 - 58.0 * $t2 + ($t2 * $t2) + 270.0 * $nu2- 330.0 * $t2 * $nu2;
    $l7coef = 61.0 - 479.0 * $t2 + 179.0 * ($t2 * $t2) - ($t2 * $t2 * $t2);
    $l8coef = 1385.0 - 3111.0 * $t2 + 543.0 * ($t2 * $t2) - ($t2 * $t2 * $t2);
    $xy[0] = $N * cos ($phi) * $l
      + ($N / 6.0 * pow (cos ($phi), 3.0) * $l3coef * pow ($l, 3.0))
      + ($N / 120.0 * pow (cos ($phi), 5.0) * $l5coef * pow ($l, 5.0))
      + ($N / 5040.0 * pow (cos ($phi), 7.0) * $l7coef * pow ($l, 7.0));
    $xy[1] = $this->ArcLengthOfMeridian ($phi)
      + ($t / 2.0 * $N * pow (cos ($phi), 2.0) * pow ($l, 2.0))
      + ($t / 24.0 * $N * pow (cos ($phi), 4.0) * $l4coef * pow ($l, 4.0))
      + ($t / 720.0 * $N * pow (cos ($phi), 6.0) * $l6coef * pow ($l, 6.0))
      + ($t / 40320.0 * $N * pow (cos ($phi), 8.0) * $l8coef * pow ($l, 8.0));
    return $xy;
  }

  private	function UTMCentralMeridian($zone): float
  {
    $cmeridian = $this->degree2radian(-183.0 + ($zone * 6.0));
    return $cmeridian;
  }

  private function degree2radian($deg): float
  {
    $pi = 3.14159265358979;
    return ($deg/180.0*$pi);
  }

  private function ArcLengthOfMeridian($phi): float
  {
    $sm_b = 6356752.314;
    $sm_a = 6378137.0;
    $n = ($sm_a - $sm_b) / ($sm_a + $sm_b);
    $alpha = (($sm_a + $sm_b) / 2.0)
      * (1.0 + (pow ($n, 2.0) / 4.0) + (pow ($n, 4.0) / 64.0));
    $beta = (-3.0 * $n / 2.0) + (9.0 * pow ($n, 3.0) / 16.0)
      + (-3.0 * pow ($n, 5.0) / 32.0);
    $gamma = (15.0 * pow ($n, 2.0) / 16.0)
      + (-15.0 * pow ($n, 4.0) / 32.0);
    $delta = (-35.0 * pow ($n, 3.0) / 48.0)
      + (105.0 * pow ($n, 5.0) / 256.0);
    $epsilon = (315.0 * pow ($n, 4.0) / 512.0);
    return $alpha* ($phi + ($beta * sin (2.0 * $phi))
        + ($gamma * sin (4.0 * $phi))
        + ($delta * sin (6.0 * $phi))
        + ($epsilon * sin (8.0 * $phi)));
  }

}
