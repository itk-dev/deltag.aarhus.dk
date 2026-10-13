# Hoeringsportal Dialogue

## Dialogue report

The `hoeringsportal_dialogue_report` submodule renders a report of a dialogue's proposals, categories, likes and
comments at `/node/{nid}/dialogue-report`, and as a PDF (via [Gotenberg](https://gotenberg.dev/)) at
`/node/{nid}/dialogue-report/pdf`.

### Map images

A proposal's location (`field_location`) is shown in the report as a static map image, rendered with
[dantsu/php-osm-static-api](https://github.com/DantSu/php-osm-static-api).

The images are plain files in `private://dialogue-proposal-map/`. They are not tracked in the database (no file
entities), as they can always be regenerated from the proposal's location:

- The file name is `{nid}-{hash}.png`, where the hash is computed from the location, so a changed location gets a new
  image and the old one is deleted.
- An image is generated when a proposal is saved, after the response has been sent. Failures are logged and do not
  stop the proposal from being saved.
- An image is deleted when its proposal's location is removed, or the proposal is deleted.
- Only users with the "administer dialogues" permission can download the images. The PDF embeds them directly, as
  Gotenberg cannot fetch private files.

Generate missing images, e.g. for proposals saved before images were introduced or if generating failed:

```shell
task drush -- hoeringsportal_dialogue_report:generate-map-images
# Regenerate all images, e.g. after changing the tile source.
task drush -- hoeringsportal_dialogue_report:generate-map-images --force
# Regenerate the image for a single proposal.
task drush -- hoeringsportal_dialogue_report:generate-map-images --nid=87 --force
```

Map tiles are fetched from OpenStreetMap by default. Use another tile source in `settings.local.php`:

```php
$settings['hoeringsportal_dialogue_report.static_map'] = [
  'tile_url' => 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  'attribution' => '© OpenStreetMap contributors',
  // Tile servers such as OpenStreetMap's require a User-Agent that identifies the application.
  'user_agent' => 'Deltag Aarhus static map (https://deltag.aarhus.dk)',
];
```
