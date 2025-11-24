# Anonymous edit

This module keeps track of anonymous user's content and allows them to update
and delete it.

The edit access is based on a long-lived cookie,
`hoeringsportal_anonymous_edit_token`, in a browser. If the user deletes the
cookie (or uses another browser), the cookie can be restored (or recovered?) via
a URL sent to the user's email address (see [Recovering the edit
token](#recovering-the-edit-token)).

When content, i.e. an instance of
[`EntityInterface`](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Entity%21EntityInterface.php/interface/EntityInterface/11.x),
is created by an anonymous user, the module dispatches an
`HoeringsportalAnonymousEditEvent` event to let other modules tell if the
content supports editing by anonymous users. It supported, the module ensures
that an edit token (cookie) is set in the users browser and the token is
attached to the content and any future content created by the user.

In addition to telling if the content is supported, the event subscriber can
also set an email address to be associated with the content. This email can
later be used to recover the edit token if need be.

See
[AnonymousEditSubscriber.php](../hoeringsportal_dialogue/src/EventSubscriber/AnonymousEditSubscriber.php)
for an example event subscriber implementation.

The module implements
[`hook_entity_access`](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Entity%21entity.api.php/function/hook_entity_access/11.x)
to allow anonymous users to update and delete content matching the current edit
token.

## Configuration

Anonymous user names (!) are generated on demand using a string format pattern:

``` php
# settings.local.php
$settings['hoeringsportal_anonymous_edit']['owner_name_pattern'] = 'Bruger %1$d'; // The default value
```

## Content list

An anonymous user with a valid edtit token can find a list of its content on
`/hoeringsportal-anonymous-edit/content`. The content is grouped by content type
and bundle.

The content list uses the
[`hoeringsportal-anonymous-edit-content-index.html.twig`](templates/hoeringsportal-anonymous-edit-content-index.html.twig)
template file which can — and probably should be — overridden in the theme.

## Recovering the edit token

If the user looses its edit token, the token can be recovered if an email has
been attached to a piece of content created by the user.

The `hoeringsportal_anonymous_edit.content_request` route
(`/hoeringsportal-anonymous-edit/content/request`) lets the user enter an email
address and request an email with a link to recover the edit token.

The `hoeringsportal_anonymous_edit.content_recover` route
(`/hoeringsportal-anonymous-edit/content/recover/{token}`) asks the user to
confirm the email address, and if the email matches the token, the edit token is
restored and set as en edit token.

The recover email subject and body is managed on
`/admin/config/system/mailer/policy/hoeringsportal_anonymous_edit.content_recover`.
Twig can be used in both fields and the following variable is available (cf.
[src/Plugin/EmailBuilder/EmailBuilder.php](src/Plugin/EmailBuilder/EmailBuilder.php)):

| Name        | Description              |
|-------------|--------------------------|
| recover_url | The absolute recover URL |

## Development

By default only errors (and higher levels) are logged. During development the
module's log level can be set lower, e.g.

``` php
# settings.local.php
$settings['hoeringsportal_anonymous_edit']['log_level'] = \Drupal\Core\Logger\RfcLogLevel::DEBUG;
```

Show log messages with

``` shell
drush watchdog:show --type=hoeringsportal_anonymous_edit --extended
```

Peek in the database table:

``` shell
drush sql:query --extra=--table "SELECT * FROM hoeringsportal_anonymous_edit"
```

---

* [ ] What happens if the same email is attached to multiple tokens?
* [ ] What happens if a user has used multiple tokens?
