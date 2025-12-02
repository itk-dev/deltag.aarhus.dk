/**
 * @file
 * Encore config global WidgetAPI.
 */

import proj4 from 'proj4'

window.addEventListener('load', function () {
  applyMap()
})

// If the map is added to a dialog, we need to re-apply the map after the dialog is opened.
// eslint-disable-next-line no-undef
let domObserver = new MutationObserver(function (mutation) {
  mutation.forEach(function (mutation) {
    mutation.addedNodes.forEach(function (node) {
      if (node.classList && node.classList.contains('ui-dialog')) {
        applyMap()
      }
    })
  })
})

domObserver.observe(document.body, { childList: true })

function applyMap () {
  require('../css/hearing-edit.css')
  // Define default Septima projection.
  proj4.defs('EPSG:25832', '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs')

  // Aliases for convenience.
  proj4.defs('urn:ogc:def:crs:EPSG::4326', proj4.defs('EPSG:4326'))
  proj4.defs('urn:ogc:def:crs:EPSG::25832', proj4.defs('EPSG:25832'))

  const defaultMapProjection = 'urn:ogc:def:crs:EPSG::25832'
  const targetMapProjection = 'urn:ogc:def:crs:EPSG::4326'

  // Project a simple geojson object to a new projection.
  const project = (geojson, fromProjection, toProjection) => {
    if (geojson.features.length === 1 && geojson.features[0].geometry.type === 'Point') {
      geojson.features[0].geometry.coordinates = proj4(fromProjection, toProjection, geojson.features[0].geometry.coordinates)
      geojson.crs.properties.name = toProjection
    }

    return geojson
  }

  const config = {
    'map': {
      'maxZoomLevel': 1,
      'minZoomLevel': 22,
      // Default to Aarhus C.
      'view': {
        'x': 574768.5806979571,
        'y': 6223630.016778825,
        'resolution': 78.00129222156862,
        'bbox': [
          574665.7520774566,
          6223532.674711226,
          574871.4093184576,
          6223727.358846424
        ],
        'zoomLevel': 5
      },
      'layer': [
        {
          'namedlayer': '#osm'
        },

        {
          'disable': false,
          'id': 'drawlayer',
          'edit': true,
          'features': true,
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'crs': {
              'type': 'name',
              'properties': {
                'name': defaultMapProjection
              }
            },
            'features': []
          },
          'features_dataType': 'json',
          'features_style': {

          }
        }
      ],
      'controls': [
        {
          'overlay': {
            'disable': false
          },

          // @see https://septima.dk/widget/documentation.html#control-draw
          'draw': {
            'disable': false,
            'layer': 'drawlayer',
            'clearOnDraw': true,
            'type': 'Point'
          },

          // @see https://septima.dk/widget/documentation.html#control-search
          'search': {
            'displaytext': 'Find adresse',
            'clearOnMapclick': true,
            'features_style': {
              'namedstyle': '#004'
            },
            'driver': [
              {
                'type': 'dawa',
                'options': {
                  'kommunekode': '0751' // Aarhus.
                }
              }
            ]
          }
        }
      ]
    }
  }

  const widgets = document.querySelectorAll('.septima-widget')
  widgets.forEach((container) => {
    const themePath = container.getAttribute('data-value-theme')
    if (container.getAttribute('data-value-theme')) {
      config.map.layer[1].features_style.icon = themePath + '/assets/images/maps/map-pin.png'
      config.map.layer[1].features_style.scale = 0.75
    }

    const data = (function () {
      try {
        const data = JSON.parse(container.getAttribute('data-value'))
        return project(data, targetMapProjection, config.map.srs || defaultMapProjection)
      } catch (ex) {}

      return null
    }())

    const target = document.querySelector(container.getAttribute('data-value-target'))
    const mapConfig = document.querySelector(container.getAttribute('data-value-map-config'))

    // Override default view if map config is present.
    if (mapConfig !== null && mapConfig.value) {
      const mapConfigData = JSON.parse(mapConfig.value)
      config.map.view.x = mapConfigData.center[0]
      config.map.view.y = mapConfigData.center[1]
      config.map.view.bbox = mapConfigData.bbox
      config.map.view.zoomLevel = mapConfigData.zoom
      config.map.view.resolution = mapConfigData.resolution
    }

    if (target !== null) {
      const resetMap = (data) => {
        // Override default view coordinates if target is present, and map config is not.
        if (mapConfig == null) {
          // Center map on point.
          const coordinates = data.features[0].geometry.coordinates
          config.map.view.x = coordinates[0]
          config.map.view.y = coordinates[1]
        }

        config.map.layer[1].data = data

        if (typeof map !== 'undefined') {
          map.setConfig(config)
        }

        // project modifies its first argument, so we pass it a deep clone.
        target.value = JSON.stringify(project(JSON.parse(JSON.stringify(data)), config.map.srs || defaultMapProjection, targetMapProjection))
      }

      // We have to build map config before initializing the map.
      if (data !== null) {
        resetMap(data)
      }

      const map = new WidgetAPI(container, config)
      map.on('featureadded', function (eventname, scope, mapstate) {
        const projection = mapstate.crs.properties.name
        if (mapstate.features.length === 1 && mapstate.features[0].geometry.type === 'Point') {
          mapstate = project(mapstate, projection, targetMapProjection)
          const properties = mapstate.features[0].properties
          // Clean out unwanted properties.
          delete properties._options

          target.value = JSON.stringify({
            type: mapstate.type,
            crs: mapstate.crs,
            features: mapstate.features.map((feature) => {
              return {
                type: feature.type,
                properties: feature.properties,
                geometry: feature.geometry
              }
            })
          })
        }
      })

      // On map move or zoom store the map state.
      map.on('mapmove', function (eventname, scope, mapstate) {
        mapConfig.value = JSON.stringify(mapstate)
      })

      if (data !== null) {
        const resetMapCtrl = document.createElement('button')
        resetMapCtrl.type = 'button'
        resetMapCtrl.classList.add('reset-point-on-map')
        resetMapCtrl.innerHTML = Drupal.t('Reset point on map')
        resetMapCtrl.addEventListener('click', function () {
          resetMap(data)
        })

        container.parentNode.insertBefore(resetMapCtrl, container.parentNode.lastChild)
      }
    }
  })
}
