# Hoeringsportal local development

We use [Task](https://taskfile.dev/) in this project. Run

``` shell
task site-update
```

to update the site (previously installed by running `task site-install`).

For performance reasons, we start only the basic docker services by default, but you can set
`TASK_DOCKER_COMPOSE_PROFILES` in `.env.local` to start more docker services based on
[profiles](https://docs.docker.com/compose/how-tos/profiles/), e.g.

``` shell
# .env.local

# Always start pretix and friends.
TASK_DOCKER_COMPOSE_PROFILES=pretix
```

You can also set 'PROFILES` when running the `compose` task, e.g.

``` shell
PROFILES=pretix task compose -- up --detach
```

> [!TIP]
> Run `git grep -A2 'profiles:' '*.y*ml'` to get a crude list of all profiles in the project.

When running `task site-update`, theme assets are built and this may take quite some time. To skip building assets, you
can run `ASSETS_SKIP_BUILD=1 task site-update` or set `TASK_ASSETS_SKIP_BUILD` in `.env.local`, e.g.

``` shell
# .env.local

TASK_ASSETS_SKIP_BUILD=1
```

## Local setup

> [!CAUTION]
> The following should be updated and rewritten to reflect the actual development workflow.

Create the file `web/sites/default/settings.local.php` and add:

```php
<?php
/**
 * @file
 * Local settings.
 */

/**
 * Add development service settings.
 */
if (file_exists(__DIR__ . '/services.local.yml')) {
  $settings['container_yamls'][] = __DIR__ . '/services.local.yml';
}

/**
 * Disable CSS and JS aggregation.
 */
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

/**
 * Disable caching.
 */
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
$settings['cache']['bins']['page'] = 'cache.backend.null';

/**
 * Setup logging.
 */
$config['system.logging']['error_level'] = 'verbose';

/**
 * Set Hash salt value.
 */
$settings['hash_salt'] = 'GIVE_ME_STRING';

/**
 * Set trusted host pattern.
 */
$settings['trusted_host_patterns'] = [
  '^hoeringsportal\.local\.itkdev\.dk$',
];

/**
 * Set local db.
 */
$databases['default']['default'] = [
  'database' => getenv('DATABASE_DATABASE') ?: 'db',
  'username' => getenv('DATABASE_USERNAME') ?: 'db',
  'password' => getenv('DATABASE_PASSWORD') ?: 'db',
  'host' => getenv('DATABASE_HOST') ?: 'mariadb',
  'port' => getenv('DATABASE_PORT') ?: '',
  'driver' => getenv('DATABASE_DRIVER') ?: 'mysql',
  'prefix' => '',
];
```

Start docker

```sh
docker compose pull
docker compose up --detach
# Note: If you want to start pretix and the mock OIDC IdP you have to enable the "pretix" and "oidc" profiles (cf. https://docs.docker.com/compose/profiles/):
# docker compose --profile pretix --profile oidc up --detach
docker compose exec phpfpm composer install
docker compose exec phpfpm vendor/bin/drush --yes site:install --existing-config

# Build theme assets
docker compose run --rm node npm install --prefix web/themes/custom/hoeringsportal
docker compose run --rm node npm run build --prefix web/themes/custom/hoeringsportal

# Get admin sign in url
docker compose exec phpfpm vendor/bin/drush --yes --uri="http://hoeringsportal.local.itkdev.dk" user:login
```

Add all fixtures

```sh name=load-fixtures
task fixtures:load
```

### Coding standards and code analysis

All code must follow the [Drupal coding standards](https://www.drupal.org/docs/develop/standards).

#### Coding standards

Apply and check coding standard  by running

```sh
task coding-standards:check
```

#### Code analysis

```sh
task code-analysis
```

#### Markdown

Apply and check Markdown coding standards:

```sh
task coding-standards:markdown:check
```

## About translations

Import translations by running

```sh
(cd web && ../vendor/bin/drush locale:import --type=customized --override=all da ../translations/custom-translations.da.po)
```

Export translations by running

```sh
(cd web && ../vendor/bin/drush locale:export da --types=customized > ../translations/custom-translations.da.po)
```

Open `translations/custom-translations.da.po` with the latest version of [Poedit](https://poedit.net/) to clean up and
then save the file.

See [How to deploy drupal interface
translations](https://medium.com/limoengroen/how-to-deploy-drupal-interface-translations-5653294c4af6) for further
details.

### Further local setup

[OpenIdConnect local setup](openIdConnect.md)

[Deskpro local setup Readme](../web/modules/custom/hoeringsportal_deskpro/README.md)

[Pretix local setup Readme](pretix.md#local-setup)

[Our custom development module](../web/modules/custom/hoeringsportal_development/README.md)

## Production setup

```sh
composer install --no-dev --optimize-autoloader
```

## Deskpro

See [hoeringsportal_deskpro/README.md](../web/modules/custom/hoeringsportal_deskpro/README.md#test-mode).

## Web profiler

The [WebProfiler](https://www.drupal.org/project/webprofiler) can be installed to see useful information on what goes on
behind the scenes:

``` shell
task drush -- pm:install webprofiler
```
