# ITK iframe field

Adds an **Iframe (accepted domains)** field type. It behaves like the field type
from the [iframe](https://www.drupal.org/project/iframe) module, with one extra
field setting: a list of domains that may be rendered as an iframe.
Sizing configuration of the iframe is hidden. The sizing is always
responsive set in frontend template instead of optionally fixed in config.

## Configuring

On *Manage fields* → the field's *Edit* tab, fill in **Accepted domains** —
one domain per line:

```text
# Aarhus municipality
aarhus.dk
www.aarhus.dk
player.vimeo.com
```

- A domain matches that exact host only, so list each subdomain separately.
- Lines beginning with `#` are comments; blank lines are ignored.

## What gets rendered

| The item's URL                                   | Output                       |
|--------------------------------------------------|------------------------------|
| `https` and host on the accepted list            | `<iframe>`                   |
| `http`, or `https` with a host *not* on the list | `<a href="…">`               |
| anything else (`javascript:`, `data:`, no host)  | nothing, logged as a warning |

Only `https` URLs are embedded: the site is served over `https`, so browsers
would block an `http` iframe as mixed content anyway.

So a URL to `google.com` on a field that only accepts `aarhus.dk` still shows
up — as a link, not an embed.

The third row exists because HTML-escaping does not neutralize a
`javascript:` href, so such a value cannot safely be turned into a link
either. In practice the widget's URL validation prevents these; the check
guards imported or token-generated values.

**The list is deny-by-default:** while *Accepted domains* is empty nothing is
embedded, and every item renders as a link.

The check runs on the URL the formatter resolved, so it also covers URLs
produced by token replacement when the iframe field's token support is on.

## Theming

Items are rendered through `templates/itk-iframe-field.html.twig` (theme hook
`itk_iframe_field`).

The template receives an `allowed` boolean and branches on it: `true` renders
the iframe, `false` renders the link. The decision itself is made in
`ItkIframeDefaultFormatter`

## Full screen

An embedded iframe gets a *View in full screen* link straight to the embedded
URL, opening in a new tab. Nothing renders it inside the site — it is a plain
link to the remote source.

URLs off the accepted list get no such link; the link fallback already points at
the URL itself.

## Size

The widget's **width** and **height** inputs are hidden for this field type.
Both templates size the iframe with inline CSS — full width and a fixed 16:9
aspect ratio — so the stored dimensions have no effect on the output. Editors
are left with the title and the URL.

## Widgets

The field reuses the widgets from the iframe module (`iframe_url`,
`iframe_urlheight`, `iframe_urlwidthheight`) via `hook_field_widget_info_alter()`
in `src/Hook/ItkIframeHooks.php`; the domain list is a display-time concern and
needs no widget of its own.
