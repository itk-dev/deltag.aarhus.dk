# ITK iframe field

Adds an **Iframe (accepted domains)** field type. It behaves like the field type
from the [iframe](https://www.drupal.org/project/iframe) module, with one extra
field setting: a list of domains that may be rendered as an iframe.

## Configuring

On *Manage fields* → the field's *Edit* tab, fill in **Accepted domains** —
one domain per line:

```text
# Aarhus municipality
aarhus.dk
*.aarhus.dk
player.vimeo.com
```

- A bare domain (`aarhus.dk`) matches that host only, not its subdomains.
- `*.aarhus.dk` matches any subdomain, but not `aarhus.dk` itself.
- Lines beginning with `#` are comments; blank lines are ignored.
- Lines may be pasted as full URLs (`https://aarhus.dk/some/page`); only the
  host is kept.

## What gets rendered

| The item's URL | Output |
| --- | --- |
| `http(s)` and host on the accepted list | `<iframe>` |
| `http(s)` and host *not* on the list | `<a href="…">` |
| anything else (`javascript:`, `data:`, no host) | nothing, logged as a warning |

So a URL to `google.com` on a field that only accepts `aarhus.dk` still shows
up — as a link, not an embed.

The third row exists because HTML-escaping does not neutralise a
`javascript:` href, so such a value cannot safely be turned into a link
either. In practice the widget's URL validation prevents these; the check
guards imported or token-generated values.

**The list is deny-by-default:** while *Accepted domains* is empty nothing is
embedded, and every item renders as a link.

The check runs on the URL the formatter resolved, so it also covers URLs
produced by token replacement when the iframe field's token support is on.

## Theming

Items are rendered through `templates/itk-iframe-field.html.twig` (theme hook
`itk_iframe_field`). The `hoeringsportal` theme overrides it in
`templates/field/itk-iframe-field.html.twig` to add its Bootstrap and Font
Awesome markup.

The template receives an `allowed` boolean and branches on it: `true` renders
the iframe, `false` renders the link. The decision itself is made in
`ItkIframeDefaultFormatter` — an override may restyle either branch, but must
not widen the condition under which the iframe is emitted.

Both templates set the iframe width with inline CSS (`width: 100%`), which is
why the widget hides its width input — see below.

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

The inputs are hidden with `#access: FALSE` rather than removed, so that saving
an existing item keeps the dimensions it already had rather than silently
rewriting them to the field defaults. Width and height in *field settings* and
*widget settings* are untouched, as is the plain `iframe` field type.

Change the ratio in the template, not in the field — that is the whole point of
hiding the inputs.

## Widgets

The field reuses the widgets from the iframe module (`iframe_url`,
`iframe_urlheight`, `iframe_urlwidthheight`) via `hook_field_widget_info_alter()`
in `src/Hook/ItkIframeHooks.php`; the domain list is a display-time concern and
needs no widget of its own.

The same class adds help text under the URL input listing the field's accepted
domains, so an editor can see up front which URLs will be embedded.

Note that the domain list is **not** enforced when content is saved: an editor
can store a URL on any domain, it simply will not render. Enforcing it at save
time would need a field constraint, which this module deliberately does not add
so that pre-existing content keeps validating.
