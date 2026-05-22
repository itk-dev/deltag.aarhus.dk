require('../scss/form-ticket-add.scss')

const $ = require('jquery')
require('jquery-validation')
const proj4 = require('proj4').default || require('proj4')

// Define the UTM zone 32N projection used by the adressevaelger API.
proj4.defs('EPSG:25832', '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs')

$(() => {
  const addressLookup = document.getElementById('address-lookup')
  const postalCodeAndCity = document.querySelector('[data-drupal-selector="edit-postal-code-and-city"]')
  const streetAndNumber = document.querySelector('[data-drupal-selector="edit-street-and-number"]')
  const geolocation = document.querySelector('[data-drupal-selector="edit-geolocation"]')
  const postalCode = document.querySelector('[data-drupal-selector="edit-postal-code"]')

  if (addressLookup && postalCodeAndCity && streetAndNumber && geolocation) {
    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'autocomplete-container')
    addressLookup.parentNode.replaceChild(wrapper, addressLookup)
    wrapper.appendChild(addressLookup)

    // Initialize adressevaelger on the address lookup field.
    // When an address is selected, populate hidden form fields with the
    // address components and geolocation for server-side processing.
    // `adressevaelger` is a global provided at runtime:
    // - adressevaelger: set by adressevaelger.iife.js, loaded via the
    //   hoeringsportal_forms/adressevaelger-support-text-field library dependency.
    // eslint-disable-next-line no-undef
    adressevaelger.adressevaelger(addressLookup, {
      // eslint-disable-next-line no-undef
      token: drupalSettings.adressevaelger.token,
      select: function (selected) {
        // The selected object nests address data under adresse.husnummer.
        const husnummer = (selected.adresse && selected.adresse.husnummer) || {}
        const postnr = husnummer.postnummer || {}
        postalCodeAndCity.value = (postnr.postnr || '') + ' ' + (postnr.navn || '')
        if (postalCode) {
          postalCode.value = postnr.postnr || ''
        }

        streetAndNumber.value = ((husnummer.vejnavn || '') + ' ' + (husnummer.husnummertekst || '')).trim()

        // The adressevaelger API returns coordinates in EPSG:25832 (UTM zone 32N).
        // Convert to EPSG:4326 (WGS84 longitude, latitude) for Deskpro.
        // proj4 returns [longitude, latitude].
        const coords = husnummer.adgangspunkt && husnummer.adgangspunkt.koordinater
        if (coords && coords.x && coords.y) {
          const wgs84 = proj4('EPSG:25832', 'EPSG:4326', [coords.x, coords.y])
          // Format to 8 decimal places to match the precision of the old DAWA API output.
          geolocation.value = wgs84[0].toFixed(8) + ', ' + wgs84[1].toFixed(8)
        }
      }
    })
  }

  document.querySelector('form#hearing-ticket-add-form').addEventListener('submit', function () {
    if ($(this).valid()) {
      $(this).addClass('is-submitted')
    }
  })
})
