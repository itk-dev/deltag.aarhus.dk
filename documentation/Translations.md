# Translations

We use [the "translation server" stuff from the Interface Translation
module](https://git.drupalcode.org/project/drupal/-/blob/11.x/core/modules/locale/locale.api.phh) for translations, i.e.
all module and theme [.info.yml
files](https://www.drupal.org/docs/develop/creating-modules/let-drupal-know-about-your-module-with-an-infoyml-file)
contains something like

``` yaml
"interface translation project": «module/theme name»
"interface translation server pattern": «modules|themes»/custom/%project/translations/%project.%language.po
```

and each module/theme has a `translations` folder containing `.po` files with translations.

The translations can be imported via Drush by running these commands:

``` shell
drush locale:check
drush locale:update
drush cache:rebuild
```

To make life a little easier, all this[^1] can be done by running

[^1]: Plus any additional project specific translations.

``` shell
task translations:import
```

## Extracting translations

We use the [Translation extractor module](https://github.com/itk-dev/drupal_translation_extractor) to extract
translations from code (PHP and templates) in (custom) modules and themes.

> [!NOTE]
> The Translation extractor module is only needed (and hence only installed) during development and therefore it's also
> [excluded from configuration synchronization](https://www.drupal.org/node/3079028) in `settings.php`:
>
> ``` php
> # web/sites/default/settings.php
> $settings['config_exclude_modules'][] = 'drupal_translation_extractor';
> ```

Update module and theme translations by running

```sh
task translations:extract
```

See `includes.translation` in [../Taskfile.yml](../Taskfile.yml) and [the included
Taskfile](../task/Taskfile.translation.yml) for details and the list of custom modules and themes that we extract
translations from (it may not make sense to do it for all custom modules and themes).

Use `task translations:diff` to check for any changes. New (or empty) translations are marked as
"[fuzzy](https://www.gnu.org/software/gettext/manual/html_node/Fuzzy-Entries.html)" and default Danish translations for
these must be added.

> [!TIP]
> [Poedit](https://poedit.net/) is an excellent tools for editing po files.
