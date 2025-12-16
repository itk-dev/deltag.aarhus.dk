const buildDawaAutocompleteElements = (context) => {
  context
    .querySelectorAll('.js-form-type-textfield .js-dawa-element')
    .forEach(address => {
      // Check if dawa autocomplete has already been initialized.
      if (address.closest('.dawa-autocomplete-container')) {
        return
      }

      // Address autocomplete using https://dawa.aws.dk/.
      const addressWrapper = document.createElement('div')
      addressWrapper.setAttribute('class', 'dawa-autocomplete-container')
      address.parentNode.replaceChild(addressWrapper, address)
      addressWrapper.appendChild(address)

      dawaAutocomplete.dawaAutocomplete(address, {
        select: function (selected) {
          fetch(selected.data.href)
            .then(function (response) {
              return response.json()
            })
        }
      })
    })
}

addEventListener('load', () => {
  Drupal.behaviors.itk_pretix = {
    attach: (context, settings) => {
      buildDawaAutocompleteElements(context)
    }
  }

  buildDawaAutocompleteElements(document)
})
