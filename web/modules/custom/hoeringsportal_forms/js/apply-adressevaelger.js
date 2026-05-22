const buildAdressevaelgerElements = (context) => {
  context
    .querySelectorAll('.js-form-type-textfield .js-adressevaelger-element')
    .forEach((address) => {
      // Check if adressevaelger has already been initialized.
      if (address.closest('.autocomplete-container')) {
        return
      }

      const addressWrapper = document.createElement('div')
      addressWrapper.setAttribute('class', 'autocomplete-container')
      address.parentNode.replaceChild(addressWrapper, address)
      addressWrapper.appendChild(address)

      adressevaelger.adressevaelger(address, {
        select: function (selected) {
          address.value = selected.tekst
        },
        token: drupalSettings.adressevaelger.token,
      })
    })
}

addEventListener('load', () => {
  Drupal.behaviors.text_field_adressevaelger = {
    attach: (context, settings) => {
      buildAdressevaelgerElements(context)
    },
  }

  buildAdressevaelgerElements(document)
})
