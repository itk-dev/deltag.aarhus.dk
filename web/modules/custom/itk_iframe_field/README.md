# ITK iframe field

Adds an **Iframe (accepted domains)** field type. It behaves like the field type
from the [iframe](https://www.drupal.org/project/iframe) module, with one extra
field setting: a list of domains that may be rendered as an iframe.
The iframe is always responsive: full width, with the item's width and
height used only as an aspect ratio (see [Size](#size)).

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

An embedded iframe always fills the available width. The item's **width**
and **height** only set its aspect ratio: with plain pixel numbers for both
(say `800` and `600`) the iframe gets that ratio, otherwise it is 16:9.

`ItkIframeDefaultFormatter` adds the sizing to the iframe module's `style`
variable — the CSS it builds from the field's border, scrolling and
transparency settings, scoped to the iframe's id — so all of the iframe's CSS
is in one place. It sets `height: auto`, as the iframe module always puts a
`height` attribute on the iframe, which would otherwise win over the aspect
ratio.

## Widgets

The field reuses the widgets from the iframe module (`iframe_url`,
`iframe_urlheight`, `iframe_urlwidthheight`) via `hook_field_widget_info_alter()`
in `src/Hook/ItkIframeHooks.php`; the domain list is a display-time concern and
needs no widget of its own.
