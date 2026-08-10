# Hoeringsportal Forms

Customization of backend forms for the Hoeringsportal project.

## Address autocomplete (Adressevaelger)

This module provides Danish address autocomplete on text fields using the
[Adressevaelger](https://github.com/Klimadatastyrelsen/adressevaelger) library.

### How it works

The `adressevaelger-support-text-field` library is automatically attached to all
node forms. Any text field with the CSS class `js-adressevaelger-element` will get address
autocomplete.

To enable autocomplete on a field, add the class in a form alter:

```php
$form['field_address']['widget'][0]['value']['#attributes']['class'][] = 'js-adressevaelger-element';
```

### Configuration

The Adressevaelger library requires an API token. Configure it at:

**Admin > Site setup > General** (`/admin/site-setup/general`) under the
**Integrations** tab.

The default token is `adressevaelger123` (test token from Klimadatastyrelsen).

### Updating the library

The Adressevaelger library is distributed via GitHub (no npm/CDN). To update:

1. Download `adressevaelger.iife.js` and `adressevaelger.css` from
   <https://github.com/Klimadatastyrelsen/adressevaelger/tree/main/dist>
2. Replace the files in this module:
   - `js/adressevaelger.iife.js`
   - `css/adressevaelger.css`
