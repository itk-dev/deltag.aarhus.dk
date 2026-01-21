<?php

namespace Drupal\hoeringsportal_project_timeline\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Controller for the timeline demo page.
 */
class DemoController extends ControllerBase {

  /**
   * Renders the timeline demo page with fixture data.
   *
   * @return array
   *   A render array.
   */
  public function render(): array {
    $items = $this->getFixtureItems();
    $legend_items = $this->getLegendItems();

    return [
      '#theme' => 'hoeringsportal_project_timeline',
      '#items' => $items,
      '#legend_items' => $legend_items,
      '#default_view' => 'vertical',
      '#attached' => [
        'library' => [
          'hoeringsportal_project_timeline/project_timeline',
        ],
      ],
    ];
  }

  /**
   * Returns fixture timeline items for demo purposes.
   *
   * @return array
   *   Array of timeline items.
   */
  protected function getFixtureItems(): array {
    // Image URLs from deltag.aarhus.dk for demo purposes.
    $baseUrl = 'https://deltag.aarhus.dk';
    $images = [
      'gaatur' => $baseUrl . '/sites/default/files/styles/responsive_small_teaser/public/images/IMG_1064_cropped.jpg',
      'workshop' => $baseUrl . '/sites/default/files/styles/responsive_small_teaser/public/images/IMG_1227%20%281%29%20-%20cropped.jpg',
      'popup' => $baseUrl . '/sites/default/files/styles/responsive_small_teaser/public/images/Billede3.jpg',
      'digital' => $baseUrl . '/sites/default/files/styles/responsive_small_teaser/public/images/Kategorier_stor_0.png',
    ];

    return [
      [
        'id' => 'item-1',
        'date' => '2023-08-01',
        'month' => $this->t('August 2023'),
        'title' => $this->t('Udpegning'),
        'subtitle' => $this->t('Dialog'),
        'description' => $this->t('Hjortshøj Stationsplads udpeges som ét af 13 byrum i Aarhus Kommunes Strategiske Byrumsplan.'),
        'status' => 'completed',
        'image' => NULL,
        'link' => 'https://aarhus.dk/nyt/teknik-og-miljoe/2023/august-2023/raadmand-vil-puste-nyt-liv-i-13-af-byens-rum',
        'linkText' => $this->t('Læs om byrumsplanen'),
        'accentColor' => NULL,
      ],
      [
        'id' => 'item-2',
        'date' => '2025-04-01',
        'month' => $this->t('April 2025'),
        'title' => $this->t('Dialog med Fællesråd'),
        'subtitle' => $this->t('Dialog'),
        'description' => $this->t('Gåtur på Stationspladsen og efterfølgende møde om stedets identitet og potentialer med fællesrådet.'),
        'status' => 'completed',
        'image' => $images['gaatur'],
        'link' => '/public_meeting/1296',
        'linkText' => $this->t('Se detaljer om mødet'),
        'accentColor' => NULL,
      ],
      [
        'id' => 'item-3',
        'date' => '2025-08-01',
        'month' => $this->t('August 2025'),
        'title' => $this->t('Workshop med Virupskolen'),
        'subtitle' => $this->t('Begivenhed'),
        'description' => $this->t('Formiddag sammen med skoleelever fra Virupskolen om fremtidens stationsplads.'),
        'status' => 'completed',
        'image' => $images['workshop'],
        'link' => '/public_meeting/1298',
        'linkText' => $this->t('Se workshoppen'),
        'accentColor' => 'pink',
      ],
      [
        'id' => 'item-4',
        'date' => '2025-08-15',
        'month' => $this->t('August 2025'),
        'title' => $this->t('Pop-up Dialog'),
        'subtitle' => $this->t('Dialog'),
        'description' => $this->t('Pop-up og kaffe på Stationspladsen med borgere. Mange gode input fra det brede lokale borgerperspektiv.'),
        'status' => 'completed',
        'image' => $images['popup'],
        'link' => '/public_meeting/1212',
        'linkText' => $this->t('Se pop-up dialogen'),
        'accentColor' => NULL,
      ],
      [
        'id' => 'item-5',
        'date' => '2025-09-01',
        'month' => $this->t('September 2025'),
        'title' => $this->t('Digital Dialog'),
        'subtitle' => $this->t('Høring'),
        'description' => $this->t('Mulighed for at berige og kvalificere de identificerede temaer, samt komme med supplerende nye input.'),
        'status' => 'completed',
        'image' => $images['digital'],
        'link' => '/public_meeting/1299',
        'linkText' => $this->t('Se den digitale dialog'),
        'accentColor' => NULL,
      ],
      [
        'id' => 'item-6',
        'date' => '2025-10-01',
        'month' => $this->t('Oktober 2025'),
        'title' => $this->t('Udarbejdelse af Forslag'),
        'subtitle' => $this->t('Dialog'),
        'description' => $this->t('De mange input danner fundament for udarbejdelse af et forslag til omdannelsen af Hjortshøj Stationsplads.'),
        'status' => 'current',
        'image' => NULL,
        'link' => NULL,
        'linkText' => NULL,
        'accentColor' => NULL,
      ],
      [
        'id' => 'item-7',
        'date' => '2025-10-15',
        'month' => $this->t('Oktober 2025'),
        'title' => $this->t('Redaktionel bemærkning'),
        'subtitle' => $this->t('Note'),
        'description' => $this->t('Dette er en redaktionel note fra projektteamet med vigtig information om projektet.'),
        'status' => 'note',
        'image' => NULL,
        'link' => NULL,
        'linkText' => NULL,
        'accentColor' => 'blue',
      ],
      [
        'id' => 'item-8',
        'date' => '2026-01-01',
        'month' => $this->t('Januar 2026'),
        'title' => $this->t('Offentlig Høring'),
        'subtitle' => $this->t('Høring'),
        'description' => $this->t('Forslaget til omdannelse af Stationspladsen sendes i offentlig høring.'),
        'status' => 'upcoming',
        'image' => NULL,
        'link' => NULL,
        'linkText' => NULL,
        'accentColor' => NULL,
      ],
      [
        'id' => 'item-9',
        'date' => '2027-01-01',
        'month' => $this->t('Januar 2027'),
        'title' => $this->t('Realisering'),
        'subtitle' => $this->t('Note'),
        'description' => $this->t('Omdannelsen af Hjortshøj Stationsplads realiseres.'),
        'status' => 'upcoming',
        'image' => NULL,
        'link' => NULL,
        'linkText' => NULL,
        'accentColor' => NULL,
      ],
    ];
  }

  /**
   * Returns legend items for the timeline.
   *
   * @return array
   *   Array of legend items.
   */
  protected function getLegendItems(): array {
    return [
      [
        'status' => 'completed',
        'label' => $this->t('Afsluttet'),
      ],
      [
        'status' => 'current',
        'label' => $this->t('I gang nu'),
      ],
      [
        'status' => 'upcoming',
        'label' => $this->t('Kommende'),
      ],
      [
        'status' => 'note',
        'label' => $this->t('Note'),
      ],
    ];
  }

}
