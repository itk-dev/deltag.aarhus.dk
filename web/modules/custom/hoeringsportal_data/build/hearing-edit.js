/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/hearing-edit.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/css/hearing-edit.css":
/*!*************************************!*\
  !*** ./assets/css/hearing-edit.css ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/js/hearing-edit.js":
/*!***********************************!*\
  !*** ./assets/js/hearing-edit.js ***!
  \***********************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_proj4__ = __webpack_require__(/*! proj4 */ "./node_modules/proj4/lib/index.js");
/**
 * @file
 * Encore config global WidgetAPI.
 */



window.addEventListener('load', function () {
  applyMap();
});

// If the map is added to a dialog, we need to re-apply the map after the dialog is opened.
// eslint-disable-next-line no-undef
var domObserver = new MutationObserver(function (mutation) {
  mutation.forEach(function (mutation) {
    mutation.addedNodes.forEach(function (node) {
      if (node.classList && node.classList.contains('ui-dialog')) {
        applyMap();
      }
    });
  });
});

domObserver.observe(document.body, { childList: true });

function applyMap() {
  __webpack_require__(/*! ../css/hearing-edit.css */ "./assets/css/hearing-edit.css");
  // Define default Septima projection.
  __WEBPACK_IMPORTED_MODULE_0_proj4__["a" /* default */].defs('EPSG:25832', '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs');

  // Aliases for convenience.
  __WEBPACK_IMPORTED_MODULE_0_proj4__["a" /* default */].defs('urn:ogc:def:crs:EPSG::4326', __WEBPACK_IMPORTED_MODULE_0_proj4__["a" /* default */].defs('EPSG:4326'));
  __WEBPACK_IMPORTED_MODULE_0_proj4__["a" /* default */].defs('urn:ogc:def:crs:EPSG::25832', __WEBPACK_IMPORTED_MODULE_0_proj4__["a" /* default */].defs('EPSG:25832'));

  var defaultMapProjection = 'urn:ogc:def:crs:EPSG::25832';
  var targetMapProjection = 'urn:ogc:def:crs:EPSG::4326';

  // Project a simple geojson object to a new projection.
  var project = function project(geojson, fromProjection, toProjection) {
    if (geojson.features.length === 1 && geojson.features[0].geometry.type === 'Point') {
      geojson.features[0].geometry.coordinates = Object(__WEBPACK_IMPORTED_MODULE_0_proj4__["a" /* default */])(fromProjection, toProjection, geojson.features[0].geometry.coordinates);
      geojson.crs.properties.name = toProjection;
    }

    return geojson;
  };

  var config = {
    'map': {
      'maxZoomLevel': 1,
      'minZoomLevel': 22,
      // Default to Aarhus C.
      'view': {
        'x': 574768.5806979571,
        'y': 6223630.016778825,
        'resolution': 78.00129222156862,
        'bbox': [574665.7520774566, 6223532.674711226, 574871.4093184576, 6223727.358846424],
        'zoomLevel': 5
      },
      'layer': [{
        'namedlayer': '#osm'
      }, {
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
        'features_style': {}
      }],
      'controls': [{
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
            'namedstyle': '#001'
          },
          'driver': [{
            'type': 'address',
            'options': {
              'kommunekode': '0751' // Aarhus.
            }
          }]
        }
      }]
    }
  };

  var widgets = document.querySelectorAll('.septima-widget');
  widgets.forEach(function (container) {
    var themePath = container.getAttribute('data-value-theme');
    if (container.getAttribute('data-value-theme')) {
      config.map.layer[1].features_style.icon = themePath + '/assets/images/maps/map-pin.png';
      config.map.layer[1].features_style.scale = 0.75;
      config.map.controls[0].search.features_style.icon = themePath + '/assets/images/maps/map-pin.png';
      config.map.controls[0].search.features_style.scale = 0.75;
    }

    var data = function () {
      try {
        var _data = JSON.parse(container.getAttribute('data-value'));
        return project(_data, targetMapProjection, config.map.srs || defaultMapProjection);
      } catch (ex) {}

      return null;
    }();

    var target = document.querySelector(container.getAttribute('data-value-target'));
    var mapConfig = document.querySelector(container.getAttribute('data-value-map-config'));

    // Override default view if map config is present.
    if (mapConfig !== null && mapConfig.value) {
      var mapConfigData = JSON.parse(mapConfig.value);
      config.map.view.x = mapConfigData.center[0];
      config.map.view.y = mapConfigData.center[1];
      config.map.view.bbox = mapConfigData.bbox;
      config.map.view.zoomLevel = mapConfigData.zoom;
      config.map.view.resolution = mapConfigData.resolution;
    }

    if (target !== null) {
      var resetMap = function resetMap(data) {
        // Override default view coordinates if target is present, and map config is not.
        if (mapConfig == null) {
          // Center map on point.
          var coordinates = data.features[0].geometry.coordinates;
          config.map.view.x = coordinates[0];
          config.map.view.y = coordinates[1];
        }

        config.map.layer[1].data = data;

        if (typeof map !== 'undefined') {
          map.setConfig(config);
        }

        // project modifies its first argument, so we pass it a deep clone.
        target.value = JSON.stringify(project(JSON.parse(JSON.stringify(data)), config.map.srs || defaultMapProjection, targetMapProjection));
      };

      // We have to build map config before initializing the map.
      if (data !== null) {
        resetMap(data);
      }

      var map = new WidgetAPI(container, config);
      map.on('featureadded', function (eventname, scope, mapstate) {
        var projection = mapstate.crs.properties.name;
        if (mapstate.features.length === 1 && mapstate.features[0].geometry.type === 'Point') {
          mapstate = project(mapstate, projection, targetMapProjection);
          var properties = mapstate.features[0].properties;
          // Clean out unwanted properties.
          delete properties._options;

          target.value = JSON.stringify({
            type: mapstate.type,
            crs: mapstate.crs,
            features: mapstate.features.map(function (feature) {
              return {
                type: feature.type,
                properties: feature.properties,
                geometry: feature.geometry
              };
            })
          });
        }
      });

      // On map move or zoom store the map state.
      map.on('mapmove', function (eventname, scope, mapstate) {
        mapConfig.value = JSON.stringify(mapstate);
      });

      if (data !== null) {
        var resetMapCtrl = document.createElement('button');
        resetMapCtrl.type = 'button';
        resetMapCtrl.classList.add('reset-point-on-map');
        resetMapCtrl.innerHTML = Drupal.t('Reset point on map');
        resetMapCtrl.addEventListener('click', function () {
          resetMap(data);
        });

        container.parentNode.insertBefore(resetMapCtrl, container.parentNode.lastChild);
      }
    }
  });
}

/***/ }),

/***/ "./node_modules/mgrs/mgrs.js":
/*!***********************************!*\
  !*** ./node_modules/mgrs/mgrs.js ***!
  \***********************************/
/*! exports provided: default, forward, inverse, toPoint */
/*! exports used: default, forward, toPoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = forward;
/* unused harmony export inverse */
/* harmony export (immutable) */ __webpack_exports__["c"] = toPoint;



/**
 * UTM zones are grouped, and assigned to one of a group of 6
 * sets.
 *
 * {int} @private
 */
var NUM_100K_SETS = 6;

/**
 * The column letters (for easting) of the lower left value, per
 * set.
 *
 * {string} @private
 */
var SET_ORIGIN_COLUMN_LETTERS = 'AJSAJS';

/**
 * The row letters (for northing) of the lower left value, per
 * set.
 *
 * {string} @private
 */
var SET_ORIGIN_ROW_LETTERS = 'AFAFAF';

var A = 65; // A
var I = 73; // I
var O = 79; // O
var V = 86; // V
var Z = 90; // Z
/* harmony default export */ __webpack_exports__["a"] = ({
  forward: forward,
  inverse: inverse,
  toPoint: toPoint
});
/**
 * Conversion of lat/lon to MGRS.
 *
 * @param {object} ll Object literal with lat and lon properties on a
 *     WGS84 ellipsoid.
 * @param {int} accuracy Accuracy in digits (5 for 1 m, 4 for 10 m, 3 for
 *      100 m, 2 for 1000 m or 1 for 10000 m). Optional, default is 5.
 * @return {string} the MGRS string for the given location and accuracy.
 */
function forward(ll, accuracy) {
  accuracy = accuracy || 5; // default accuracy 1m
  return encode(LLtoUTM({
    lat: ll[1],
    lon: ll[0]
  }), accuracy);
};

/**
 * Conversion of MGRS to lat/lon.
 *
 * @param {string} mgrs MGRS string.
 * @return {array} An array with left (longitude), bottom (latitude), right
 *     (longitude) and top (latitude) values in WGS84, representing the
 *     bounding box for the provided MGRS reference.
 */
function inverse(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat, bbox.lon, bbox.lat];
  }
  return [bbox.left, bbox.bottom, bbox.right, bbox.top];
};

function toPoint(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat];
  }
  return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
};
/**
 * Conversion from degrees to radians.
 *
 * @private
 * @param {number} deg the angle in degrees.
 * @return {number} the angle in radians.
 */
function degToRad(deg) {
  return (deg * (Math.PI / 180.0));
}

/**
 * Conversion from radians to degrees.
 *
 * @private
 * @param {number} rad the angle in radians.
 * @return {number} the angle in degrees.
 */
function radToDeg(rad) {
  return (180.0 * (rad / Math.PI));
}

/**
 * Converts a set of Longitude and Latitude co-ordinates to UTM
 * using the WGS84 ellipsoid.
 *
 * @private
 * @param {object} ll Object literal with lat and lon properties
 *     representing the WGS84 coordinate to be converted.
 * @return {object} Object literal containing the UTM value with easting,
 *     northing, zoneNumber and zoneLetter properties, and an optional
 *     accuracy property in digits. Returns null if the conversion failed.
 */
function LLtoUTM(ll) {
  var Lat = ll.lat;
  var Long = ll.lon;
  var a = 6378137.0; //ellip.radius;
  var eccSquared = 0.00669438; //ellip.eccsq;
  var k0 = 0.9996;
  var LongOrigin;
  var eccPrimeSquared;
  var N, T, C, A, M;
  var LatRad = degToRad(Lat);
  var LongRad = degToRad(Long);
  var LongOriginRad;
  var ZoneNumber;
  // (int)
  ZoneNumber = Math.floor((Long + 180) / 6) + 1;

  //Make sure the longitude 180.00 is in Zone 60
  if (Long === 180) {
    ZoneNumber = 60;
  }

  // Special zone for Norway
  if (Lat >= 56.0 && Lat < 64.0 && Long >= 3.0 && Long < 12.0) {
    ZoneNumber = 32;
  }

  // Special zones for Svalbard
  if (Lat >= 72.0 && Lat < 84.0) {
    if (Long >= 0.0 && Long < 9.0) {
      ZoneNumber = 31;
    }
    else if (Long >= 9.0 && Long < 21.0) {
      ZoneNumber = 33;
    }
    else if (Long >= 21.0 && Long < 33.0) {
      ZoneNumber = 35;
    }
    else if (Long >= 33.0 && Long < 42.0) {
      ZoneNumber = 37;
    }
  }

  LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3; //+3 puts origin
  // in middle of
  // zone
  LongOriginRad = degToRad(LongOrigin);

  eccPrimeSquared = (eccSquared) / (1 - eccSquared);

  N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
  T = Math.tan(LatRad) * Math.tan(LatRad);
  C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
  A = Math.cos(LatRad) * (LongRad - LongOriginRad);

  M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - (35 * eccSquared * eccSquared * eccSquared / 3072) * Math.sin(6 * LatRad));

  var UTMEasting = (k0 * N * (A + (1 - T + C) * A * A * A / 6.0 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120.0) + 500000.0);

  var UTMNorthing = (k0 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24.0 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720.0)));
  if (Lat < 0.0) {
    UTMNorthing += 10000000.0; //10000000 meter offset for
    // southern hemisphere
  }

  return {
    northing: Math.round(UTMNorthing),
    easting: Math.round(UTMEasting),
    zoneNumber: ZoneNumber,
    zoneLetter: getLetterDesignator(Lat)
  };
}

/**
 * Converts UTM coords to lat/long, using the WGS84 ellipsoid. This is a convenience
 * class where the Zone can be specified as a single string eg."60N" which
 * is then broken down into the ZoneNumber and ZoneLetter.
 *
 * @private
 * @param {object} utm An object literal with northing, easting, zoneNumber
 *     and zoneLetter properties. If an optional accuracy property is
 *     provided (in meters), a bounding box will be returned instead of
 *     latitude and longitude.
 * @return {object} An object literal containing either lat and lon values
 *     (if no accuracy was provided), or top, right, bottom and left values
 *     for the bounding box calculated according to the provided accuracy.
 *     Returns null if the conversion failed.
 */
function UTMtoLL(utm) {

  var UTMNorthing = utm.northing;
  var UTMEasting = utm.easting;
  var zoneLetter = utm.zoneLetter;
  var zoneNumber = utm.zoneNumber;
  // check the ZoneNummber is valid
  if (zoneNumber < 0 || zoneNumber > 60) {
    return null;
  }

  var k0 = 0.9996;
  var a = 6378137.0; //ellip.radius;
  var eccSquared = 0.00669438; //ellip.eccsq;
  var eccPrimeSquared;
  var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
  var N1, T1, C1, R1, D, M;
  var LongOrigin;
  var mu, phi1Rad;

  // remove 500,000 meter offset for longitude
  var x = UTMEasting - 500000.0;
  var y = UTMNorthing;

  // We must know somehow if we are in the Northern or Southern
  // hemisphere, this is the only time we use the letter So even
  // if the Zone letter isn't exactly correct it should indicate
  // the hemisphere correctly
  if (zoneLetter < 'N') {
    y -= 10000000.0; // remove 10,000,000 meter offset used
    // for southern hemisphere
  }

  // There are 60 zones with zone 1 being at West -180 to -174
  LongOrigin = (zoneNumber - 1) * 6 - 180 + 3; // +3 puts origin
  // in middle of
  // zone

  eccPrimeSquared = (eccSquared) / (1 - eccSquared);

  M = y / k0;
  mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));

  phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu);
  // double phi1 = ProjMath.radToDeg(phi1Rad);

  N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
  T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
  C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
  R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
  D = x / (N1 * k0);

  var lat = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
  lat = radToDeg(lat);

  var lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
  lon = LongOrigin + radToDeg(lon);

  var result;
  if (utm.accuracy) {
    var topRight = UTMtoLL({
      northing: utm.northing + utm.accuracy,
      easting: utm.easting + utm.accuracy,
      zoneLetter: utm.zoneLetter,
      zoneNumber: utm.zoneNumber
    });
    result = {
      top: topRight.lat,
      right: topRight.lon,
      bottom: lat,
      left: lon
    };
  }
  else {
    result = {
      lat: lat,
      lon: lon
    };
  }
  return result;
}

/**
 * Calculates the MGRS letter designator for the given latitude.
 *
 * @private
 * @param {number} lat The latitude in WGS84 to get the letter designator
 *     for.
 * @return {char} The letter designator.
 */
function getLetterDesignator(lat) {
  //This is here as an error flag to show that the Latitude is
  //outside MGRS limits
  var LetterDesignator = 'Z';

  if ((84 >= lat) && (lat >= 72)) {
    LetterDesignator = 'X';
  }
  else if ((72 > lat) && (lat >= 64)) {
    LetterDesignator = 'W';
  }
  else if ((64 > lat) && (lat >= 56)) {
    LetterDesignator = 'V';
  }
  else if ((56 > lat) && (lat >= 48)) {
    LetterDesignator = 'U';
  }
  else if ((48 > lat) && (lat >= 40)) {
    LetterDesignator = 'T';
  }
  else if ((40 > lat) && (lat >= 32)) {
    LetterDesignator = 'S';
  }
  else if ((32 > lat) && (lat >= 24)) {
    LetterDesignator = 'R';
  }
  else if ((24 > lat) && (lat >= 16)) {
    LetterDesignator = 'Q';
  }
  else if ((16 > lat) && (lat >= 8)) {
    LetterDesignator = 'P';
  }
  else if ((8 > lat) && (lat >= 0)) {
    LetterDesignator = 'N';
  }
  else if ((0 > lat) && (lat >= -8)) {
    LetterDesignator = 'M';
  }
  else if ((-8 > lat) && (lat >= -16)) {
    LetterDesignator = 'L';
  }
  else if ((-16 > lat) && (lat >= -24)) {
    LetterDesignator = 'K';
  }
  else if ((-24 > lat) && (lat >= -32)) {
    LetterDesignator = 'J';
  }
  else if ((-32 > lat) && (lat >= -40)) {
    LetterDesignator = 'H';
  }
  else if ((-40 > lat) && (lat >= -48)) {
    LetterDesignator = 'G';
  }
  else if ((-48 > lat) && (lat >= -56)) {
    LetterDesignator = 'F';
  }
  else if ((-56 > lat) && (lat >= -64)) {
    LetterDesignator = 'E';
  }
  else if ((-64 > lat) && (lat >= -72)) {
    LetterDesignator = 'D';
  }
  else if ((-72 > lat) && (lat >= -80)) {
    LetterDesignator = 'C';
  }
  return LetterDesignator;
}

/**
 * Encodes a UTM location as MGRS string.
 *
 * @private
 * @param {object} utm An object literal with easting, northing,
 *     zoneLetter, zoneNumber
 * @param {number} accuracy Accuracy in digits (1-5).
 * @return {string} MGRS string for the given UTM location.
 */
function encode(utm, accuracy) {
  // prepend with leading zeroes
  var seasting = "00000" + utm.easting,
    snorthing = "00000" + utm.northing;

  return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
}

/**
 * Get the two letter 100k designator for a given UTM easting,
 * northing and zone number value.
 *
 * @private
 * @param {number} easting
 * @param {number} northing
 * @param {number} zoneNumber
 * @return the two letter 100k designator for the given UTM location.
 */
function get100kID(easting, northing, zoneNumber) {
  var setParm = get100kSetForZone(zoneNumber);
  var setColumn = Math.floor(easting / 100000);
  var setRow = Math.floor(northing / 100000) % 20;
  return getLetter100kID(setColumn, setRow, setParm);
}

/**
 * Given a UTM zone number, figure out the MGRS 100K set it is in.
 *
 * @private
 * @param {number} i An UTM zone number.
 * @return {number} the 100k set the UTM zone is in.
 */
function get100kSetForZone(i) {
  var setParm = i % NUM_100K_SETS;
  if (setParm === 0) {
    setParm = NUM_100K_SETS;
  }

  return setParm;
}

/**
 * Get the two-letter MGRS 100k designator given information
 * translated from the UTM northing, easting and zone number.
 *
 * @private
 * @param {number} column the column index as it relates to the MGRS
 *        100k set spreadsheet, created from the UTM easting.
 *        Values are 1-8.
 * @param {number} row the row index as it relates to the MGRS 100k set
 *        spreadsheet, created from the UTM northing value. Values
 *        are from 0-19.
 * @param {number} parm the set block, as it relates to the MGRS 100k set
 *        spreadsheet, created from the UTM zone. Values are from
 *        1-60.
 * @return two letter MGRS 100k code.
 */
function getLetter100kID(column, row, parm) {
  // colOrigin and rowOrigin are the letters at the origin of the set
  var index = parm - 1;
  var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
  var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);

  // colInt and rowInt are the letters to build to return
  var colInt = colOrigin + column - 1;
  var rowInt = rowOrigin + row;
  var rollover = false;

  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
    rollover = true;
  }

  if (colInt === I || (colOrigin < I && colInt > I) || ((colInt > I || colOrigin < I) && rollover)) {
    colInt++;
  }

  if (colInt === O || (colOrigin < O && colInt > O) || ((colInt > O || colOrigin < O) && rollover)) {
    colInt++;

    if (colInt === I) {
      colInt++;
    }
  }

  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
  }

  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
    rollover = true;
  }
  else {
    rollover = false;
  }

  if (((rowInt === I) || ((rowOrigin < I) && (rowInt > I))) || (((rowInt > I) || (rowOrigin < I)) && rollover)) {
    rowInt++;
  }

  if (((rowInt === O) || ((rowOrigin < O) && (rowInt > O))) || (((rowInt > O) || (rowOrigin < O)) && rollover)) {
    rowInt++;

    if (rowInt === I) {
      rowInt++;
    }
  }

  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
  }

  var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
  return twoLetter;
}

/**
 * Decode the UTM parameters from a MGRS string.
 *
 * @private
 * @param {string} mgrsString an UPPERCASE coordinate string is expected.
 * @return {object} An object literal with easting, northing, zoneLetter,
 *     zoneNumber and accuracy (in meters) properties.
 */
function decode(mgrsString) {

  if (mgrsString && mgrsString.length === 0) {
    throw ("MGRSPoint coverting from nothing");
  }

  var length = mgrsString.length;

  var hunK = null;
  var sb = "";
  var testChar;
  var i = 0;

  // get Zone number
  while (!(/[A-Z]/).test(testChar = mgrsString.charAt(i))) {
    if (i >= 2) {
      throw ("MGRSPoint bad conversion from: " + mgrsString);
    }
    sb += testChar;
    i++;
  }

  var zoneNumber = parseInt(sb, 10);

  if (i === 0 || i + 3 > length) {
    // A good MGRS string has to be 4-5 digits long,
    // ##AAA/#AAA at least.
    throw ("MGRSPoint bad conversion from: " + mgrsString);
  }

  var zoneLetter = mgrsString.charAt(i++);

  // Should we check the zone letter here? Why not.
  if (zoneLetter <= 'A' || zoneLetter === 'B' || zoneLetter === 'Y' || zoneLetter >= 'Z' || zoneLetter === 'I' || zoneLetter === 'O') {
    throw ("MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString);
  }

  hunK = mgrsString.substring(i, i += 2);

  var set = get100kSetForZone(zoneNumber);

  var east100k = getEastingFromChar(hunK.charAt(0), set);
  var north100k = getNorthingFromChar(hunK.charAt(1), set);

  // We have a bug where the northing may be 2000000 too low.
  // How
  // do we know when to roll over?

  while (north100k < getMinNorthing(zoneLetter)) {
    north100k += 2000000;
  }

  // calculate the char index for easting/northing separator
  var remainder = length - i;

  if (remainder % 2 !== 0) {
    throw ("MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString);
  }

  var sep = remainder / 2;

  var sepEasting = 0.0;
  var sepNorthing = 0.0;
  var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
  if (sep > 0) {
    accuracyBonus = 100000.0 / Math.pow(10, sep);
    sepEastingString = mgrsString.substring(i, i + sep);
    sepEasting = parseFloat(sepEastingString) * accuracyBonus;
    sepNorthingString = mgrsString.substring(i + sep);
    sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
  }

  easting = sepEasting + east100k;
  northing = sepNorthing + north100k;

  return {
    easting: easting,
    northing: northing,
    zoneLetter: zoneLetter,
    zoneNumber: zoneNumber,
    accuracy: accuracyBonus
  };
}

/**
 * Given the first letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the easting value that
 * should be added to the other, secondary easting value.
 *
 * @private
 * @param {char} e The first letter from a two-letter MGRS 100´k zone.
 * @param {number} set The MGRS table set for the zone number.
 * @return {number} The easting value for the given letter and set.
 */
function getEastingFromChar(e, set) {
  // colOrigin is the letter at the origin of the set for the
  // column
  var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
  var eastingValue = 100000.0;
  var rewindMarker = false;

  while (curCol !== e.charCodeAt(0)) {
    curCol++;
    if (curCol === I) {
      curCol++;
    }
    if (curCol === O) {
      curCol++;
    }
    if (curCol > Z) {
      if (rewindMarker) {
        throw ("Bad character: " + e);
      }
      curCol = A;
      rewindMarker = true;
    }
    eastingValue += 100000.0;
  }

  return eastingValue;
}

/**
 * Given the second letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the northing value that
 * should be added to the other, secondary northing value. You have to
 * remember that Northings are determined from the equator, and the vertical
 * cycle of letters mean a 2000000 additional northing meters. This happens
 * approx. every 18 degrees of latitude. This method does *NOT* count any
 * additional northings. You have to figure out how many 2000000 meters need
 * to be added for the zone letter of the MGRS coordinate.
 *
 * @private
 * @param {char} n Second letter of the MGRS 100k zone
 * @param {number} set The MGRS table set number, which is dependent on the
 *     UTM zone number.
 * @return {number} The northing value for the given letter and set.
 */
function getNorthingFromChar(n, set) {

  if (n > 'V') {
    throw ("MGRSPoint given invalid Northing " + n);
  }

  // rowOrigin is the letter at the origin of the set for the
  // column
  var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
  var northingValue = 0.0;
  var rewindMarker = false;

  while (curRow !== n.charCodeAt(0)) {
    curRow++;
    if (curRow === I) {
      curRow++;
    }
    if (curRow === O) {
      curRow++;
    }
    // fixing a bug making whole application hang in this loop
    // when 'n' is a wrong character
    if (curRow > V) {
      if (rewindMarker) { // making sure that this loop ends
        throw ("Bad character: " + n);
      }
      curRow = A;
      rewindMarker = true;
    }
    northingValue += 100000.0;
  }

  return northingValue;
}

/**
 * The function getMinNorthing returns the minimum northing value of a MGRS
 * zone.
 *
 * Ported from Geotrans' c Lattitude_Band_Value structure table.
 *
 * @private
 * @param {char} zoneLetter The MGRS zone to get the min northing for.
 * @return {number}
 */
function getMinNorthing(zoneLetter) {
  var northing;
  switch (zoneLetter) {
  case 'C':
    northing = 1100000.0;
    break;
  case 'D':
    northing = 2000000.0;
    break;
  case 'E':
    northing = 2800000.0;
    break;
  case 'F':
    northing = 3700000.0;
    break;
  case 'G':
    northing = 4600000.0;
    break;
  case 'H':
    northing = 5500000.0;
    break;
  case 'J':
    northing = 6400000.0;
    break;
  case 'K':
    northing = 7300000.0;
    break;
  case 'L':
    northing = 8200000.0;
    break;
  case 'M':
    northing = 9100000.0;
    break;
  case 'N':
    northing = 0.0;
    break;
  case 'P':
    northing = 800000.0;
    break;
  case 'Q':
    northing = 1700000.0;
    break;
  case 'R':
    northing = 2600000.0;
    break;
  case 'S':
    northing = 3500000.0;
    break;
  case 'T':
    northing = 4400000.0;
    break;
  case 'U':
    northing = 5300000.0;
    break;
  case 'V':
    northing = 6200000.0;
    break;
  case 'W':
    northing = 7000000.0;
    break;
  case 'X':
    northing = 7900000.0;
    break;
  default:
    northing = -1.0;
  }
  if (northing >= 0.0) {
    return northing;
  }
  else {
    throw ("Invalid zone letter: " + zoneLetter);
  }

}


/***/ }),

/***/ "./node_modules/proj4/lib/Point.js":
/*!*****************************************!*\
  !*** ./node_modules/proj4/lib/Point.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mgrs__ = __webpack_require__(/*! mgrs */ "./node_modules/mgrs/mgrs.js");


function Point(x, y, z) {
  if (!(this instanceof Point)) {
    return new Point(x, y, z);
  }
  if (Array.isArray(x)) {
    this.x = x[0];
    this.y = x[1];
    this.z = x[2] || 0.0;
  } else if(typeof x === 'object') {
    this.x = x.x;
    this.y = x.y;
    this.z = x.z || 0.0;
  } else if (typeof x === 'string' && typeof y === 'undefined') {
    var coords = x.split(',');
    this.x = parseFloat(coords[0], 10);
    this.y = parseFloat(coords[1], 10);
    this.z = parseFloat(coords[2], 10) || 0.0;
  } else {
    this.x = x;
    this.y = y;
    this.z = z || 0.0;
  }
  console.warn('proj4.Point will be removed in version 3, use proj4.toPoint');
}

Point.fromMGRS = function(mgrsStr) {
  return new Point(Object(__WEBPACK_IMPORTED_MODULE_0_mgrs__["c" /* toPoint */])(mgrsStr));
};
Point.prototype.toMGRS = function(accuracy) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_mgrs__["b" /* forward */])([this.x, this.y], accuracy);
};
/* harmony default export */ __webpack_exports__["a"] = (Point);


/***/ }),

/***/ "./node_modules/proj4/lib/Proj.js":
/*!****************************************!*\
  !*** ./node_modules/proj4/lib/Proj.js ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parseCode__ = __webpack_require__(/*! ./parseCode */ "./node_modules/proj4/lib/parseCode.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__extend__ = __webpack_require__(/*! ./extend */ "./node_modules/proj4/lib/extend.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__projections__ = __webpack_require__(/*! ./projections */ "./node_modules/proj4/lib/projections.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__deriveConstants__ = __webpack_require__(/*! ./deriveConstants */ "./node_modules/proj4/lib/deriveConstants.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_Datum__ = __webpack_require__(/*! ./constants/Datum */ "./node_modules/proj4/lib/constants/Datum.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__datum__ = __webpack_require__(/*! ./datum */ "./node_modules/proj4/lib/datum.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__match__ = __webpack_require__(/*! ./match */ "./node_modules/proj4/lib/match.js");








function Projection(srsCode,callback) {
  if (!(this instanceof Projection)) {
    return new Projection(srsCode);
  }
  callback = callback || function(error){
    if(error){
      throw error;
    }
  };
  var json = Object(__WEBPACK_IMPORTED_MODULE_0__parseCode__["a" /* default */])(srsCode);
  if(typeof json !== 'object'){
    callback(srsCode);
    return;
  }
  var ourProj = Projection.projections.get(json.projName);
  if(!ourProj){
    callback(srsCode);
    return;
  }
  if (json.datumCode && json.datumCode !== 'none') {
    var datumDef = Object(__WEBPACK_IMPORTED_MODULE_6__match__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_4__constants_Datum__["a" /* default */], json.datumCode);
    if (datumDef) {
      json.datum_params = datumDef.towgs84 ? datumDef.towgs84.split(',') : null;
      json.ellps = datumDef.ellipse;
      json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
    }
  }
  json.k0 = json.k0 || 1.0;
  json.axis = json.axis || 'enu';
  json.ellps = json.ellps || 'wgs84';
  var sphere_ = Object(__WEBPACK_IMPORTED_MODULE_3__deriveConstants__["b" /* sphere */])(json.a, json.b, json.rf, json.ellps, json.sphere);
  var ecc = Object(__WEBPACK_IMPORTED_MODULE_3__deriveConstants__["a" /* eccentricity */])(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
  var datumObj = json.datum || Object(__WEBPACK_IMPORTED_MODULE_5__datum__["a" /* default */])(json.datumCode, json.datum_params, sphere_.a, sphere_.b, ecc.es, ecc.ep2);

  Object(__WEBPACK_IMPORTED_MODULE_1__extend__["a" /* default */])(this, json); // transfer everything over from the projection because we don't know what we'll need
  Object(__WEBPACK_IMPORTED_MODULE_1__extend__["a" /* default */])(this, ourProj); // transfer all the methods from the projection

  // copy the 4 things over we calulated in deriveConstants.sphere
  this.a = sphere_.a;
  this.b = sphere_.b;
  this.rf = sphere_.rf;
  this.sphere = sphere_.sphere;

  // copy the 3 things we calculated in deriveConstants.eccentricity
  this.es = ecc.es;
  this.e = ecc.e;
  this.ep2 = ecc.ep2;

  // add in the datum object
  this.datum = datumObj;

  // init the projection
  this.init();

  // legecy callback from back in the day when it went to spatialreference.org
  callback(null, this);

}
Projection.projections = __WEBPACK_IMPORTED_MODULE_2__projections__["a" /* default */];
Projection.projections.start();
/* harmony default export */ __webpack_exports__["a"] = (Projection);


/***/ }),

/***/ "./node_modules/proj4/lib/adjust_axis.js":
/*!***********************************************!*\
  !*** ./node_modules/proj4/lib/adjust_axis.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(crs, denorm, point) {
  var xin = point.x,
    yin = point.y,
    zin = point.z || 0.0;
  var v, t, i;
  var out = {};
  for (i = 0; i < 3; i++) {
    if (denorm && i === 2 && point.z === undefined) {
      continue;
    }
    if (i === 0) {
      v = xin;
      t = 'x';
    }
    else if (i === 1) {
      v = yin;
      t = 'y';
    }
    else {
      v = zin;
      t = 'z';
    }
    switch (crs.axis[i]) {
    case 'e':
      out[t] = v;
      break;
    case 'w':
      out[t] = -v;
      break;
    case 'n':
      out[t] = v;
      break;
    case 's':
      out[t] = -v;
      break;
    case 'u':
      if (point[t] !== undefined) {
        out.z = v;
      }
      break;
    case 'd':
      if (point[t] !== undefined) {
        out.z = -v;
      }
      break;
    default:
      //console.log("ERROR: unknow axis ("+crs.axis[i]+") - check definition of "+crs.projName);
      return null;
    }
  }
  return out;
});


/***/ }),

/***/ "./node_modules/proj4/lib/checkSanity.js":
/*!***********************************************!*\
  !*** ./node_modules/proj4/lib/checkSanity.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (point) {
  checkCoord(point.x);
  checkCoord(point.y);
});
function checkCoord(num) {
  if (typeof Number.isFinite === 'function') {
    if (Number.isFinite(num)) {
      return;
    }
    throw new TypeError('coordinates must be finite numbers');
  }
  if (typeof num !== 'number' || num !== num || !isFinite(num)) {
    throw new TypeError('coordinates must be finite numbers');
  }
}


/***/ }),

/***/ "./node_modules/proj4/lib/common/adjust_lat.js":
/*!*****************************************************!*\
  !*** ./node_modules/proj4/lib/common/adjust_lat.js ***!
  \*****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sign__ = __webpack_require__(/*! ./sign */ "./node_modules/proj4/lib/common/sign.js");



/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return (Math.abs(x) < __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */]) ? x : (x - (Object(__WEBPACK_IMPORTED_MODULE_1__sign__["a" /* default */])(x) * Math.PI));
});


/***/ }),

/***/ "./node_modules/proj4/lib/common/adjust_lon.js":
/*!*****************************************************!*\
  !*** ./node_modules/proj4/lib/common/adjust_lon.js ***!
  \*****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sign__ = __webpack_require__(/*! ./sign */ "./node_modules/proj4/lib/common/sign.js");




/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return (Math.abs(x) <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */]) ? x : (x - (Object(__WEBPACK_IMPORTED_MODULE_1__sign__["a" /* default */])(x) * __WEBPACK_IMPORTED_MODULE_0__constants_values__["o" /* TWO_PI */]));
});


/***/ }),

/***/ "./node_modules/proj4/lib/common/adjust_zone.js":
/*!******************************************************!*\
  !*** ./node_modules/proj4/lib/common/adjust_zone.js ***!
  \******************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__adjust_lon__ = __webpack_require__(/*! ./adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");


/* harmony default export */ __webpack_exports__["a"] = (function(zone, lon) {
  if (zone === undefined) {
    zone = Math.floor((Object(__WEBPACK_IMPORTED_MODULE_0__adjust_lon__["a" /* default */])(lon) + Math.PI) * 30 / Math.PI) + 1;

    if (zone < 0) {
      return 0;
    } else if (zone > 60) {
      return 60;
    }
  }
  return zone;
});


/***/ }),

/***/ "./node_modules/proj4/lib/common/asinhy.js":
/*!*************************************************!*\
  !*** ./node_modules/proj4/lib/common/asinhy.js ***!
  \*************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hypot__ = __webpack_require__(/*! ./hypot */ "./node_modules/proj4/lib/common/hypot.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__log1py__ = __webpack_require__(/*! ./log1py */ "./node_modules/proj4/lib/common/log1py.js");



/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  var y = Math.abs(x);
  y = Object(__WEBPACK_IMPORTED_MODULE_1__log1py__["a" /* default */])(y * (1 + y / (Object(__WEBPACK_IMPORTED_MODULE_0__hypot__["a" /* default */])(1, y) + 1)));

  return x < 0 ? -y : y;
});


/***/ }),

/***/ "./node_modules/proj4/lib/common/asinz.js":
/*!************************************************!*\
  !*** ./node_modules/proj4/lib/common/asinz.js ***!
  \************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  if (Math.abs(x) > 1) {
    x = (x > 1) ? 1 : -1;
  }
  return Math.asin(x);
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/clens.js":
/*!************************************************!*\
  !*** ./node_modules/proj4/lib/common/clens.js ***!
  \************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(pp, arg_r) {
  var r = 2 * Math.cos(arg_r);
  var i = pp.length - 1;
  var hr1 = pp[i];
  var hr2 = 0;
  var hr;

  while (--i >= 0) {
    hr = -hr2 + r * hr1 + pp[i];
    hr2 = hr1;
    hr1 = hr;
  }

  return Math.sin(arg_r) * hr;
});


/***/ }),

/***/ "./node_modules/proj4/lib/common/clens_cmplx.js":
/*!******************************************************!*\
  !*** ./node_modules/proj4/lib/common/clens_cmplx.js ***!
  \******************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sinh__ = __webpack_require__(/*! ./sinh */ "./node_modules/proj4/lib/common/sinh.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cosh__ = __webpack_require__(/*! ./cosh */ "./node_modules/proj4/lib/common/cosh.js");



/* harmony default export */ __webpack_exports__["a"] = (function(pp, arg_r, arg_i) {
  var sin_arg_r = Math.sin(arg_r);
  var cos_arg_r = Math.cos(arg_r);
  var sinh_arg_i = Object(__WEBPACK_IMPORTED_MODULE_0__sinh__["a" /* default */])(arg_i);
  var cosh_arg_i = Object(__WEBPACK_IMPORTED_MODULE_1__cosh__["a" /* default */])(arg_i);
  var r = 2 * cos_arg_r * cosh_arg_i;
  var i = -2 * sin_arg_r * sinh_arg_i;
  var j = pp.length - 1;
  var hr = pp[j];
  var hi1 = 0;
  var hr1 = 0;
  var hi = 0;
  var hr2;
  var hi2;

  while (--j >= 0) {
    hr2 = hr1;
    hi2 = hi1;
    hr1 = hr;
    hi1 = hi;
    hr = -hr2 + r * hr1 - i * hi1 + pp[j];
    hi = -hi2 + i * hr1 + r * hi1;
  }

  r = sin_arg_r * cosh_arg_i;
  i = cos_arg_r * sinh_arg_i;

  return [r * hr - i * hi, r * hi + i * hr];
});


/***/ }),

/***/ "./node_modules/proj4/lib/common/cosh.js":
/*!***********************************************!*\
  !*** ./node_modules/proj4/lib/common/cosh.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  var r = Math.exp(x);
  r = (r + 1 / r) / 2;
  return r;
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/e0fn.js":
/*!***********************************************!*\
  !*** ./node_modules/proj4/lib/common/e0fn.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return (1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x)));
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/e1fn.js":
/*!***********************************************!*\
  !*** ./node_modules/proj4/lib/common/e1fn.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return (0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x)));
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/e2fn.js":
/*!***********************************************!*\
  !*** ./node_modules/proj4/lib/common/e2fn.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return (0.05859375 * x * x * (1 + 0.75 * x));
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/e3fn.js":
/*!***********************************************!*\
  !*** ./node_modules/proj4/lib/common/e3fn.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return (x * x * x * (35 / 3072));
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/gN.js":
/*!*********************************************!*\
  !*** ./node_modules/proj4/lib/common/gN.js ***!
  \*********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(a, e, sinphi) {
  var temp = e * sinphi;
  return a / Math.sqrt(1 - temp * temp);
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/gatg.js":
/*!***********************************************!*\
  !*** ./node_modules/proj4/lib/common/gatg.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(pp, B) {
  var cos_2B = 2 * Math.cos(2 * B);
  var i = pp.length - 1;
  var h1 = pp[i];
  var h2 = 0;
  var h;

  while (--i >= 0) {
    h = -h2 + cos_2B * h1 + pp[i];
    h2 = h1;
    h1 = h;
  }

  return (B + h * Math.sin(2 * B));
});


/***/ }),

/***/ "./node_modules/proj4/lib/common/hypot.js":
/*!************************************************!*\
  !*** ./node_modules/proj4/lib/common/hypot.js ***!
  \************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  var a = Math.max(x, y);
  var b = Math.min(x, y) / (a ? a : 1);

  return a * Math.sqrt(1 + Math.pow(b, 2));
});


/***/ }),

/***/ "./node_modules/proj4/lib/common/imlfn.js":
/*!************************************************!*\
  !*** ./node_modules/proj4/lib/common/imlfn.js ***!
  \************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(ml, e0, e1, e2, e3) {
  var phi;
  var dphi;

  phi = ml / e0;
  for (var i = 0; i < 15; i++) {
    dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }

  //..reportError("IMLFN-CONV:Latitude failed to converge after 15 iterations");
  return NaN;
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/iqsfnz.js":
/*!*************************************************!*\
  !*** ./node_modules/proj4/lib/common/iqsfnz.js ***!
  \*************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");


/* harmony default export */ __webpack_exports__["a"] = (function(eccent, q) {
  var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
  if (Math.abs(Math.abs(q) - temp) < 1.0E-6) {
    if (q < 0) {
      return (-1 * __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */]);
    }
    else {
      return __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    }
  }
  //var phi = 0.5* q/(1-eccent*eccent);
  var phi = Math.asin(0.5 * q);
  var dphi;
  var sin_phi;
  var cos_phi;
  var con;
  for (var i = 0; i < 30; i++) {
    sin_phi = Math.sin(phi);
    cos_phi = Math.cos(phi);
    con = eccent * sin_phi;
    dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }

  //console.log("IQSFN-CONV:Latitude failed to converge after 30 iterations");
  return NaN;
});


/***/ }),

/***/ "./node_modules/proj4/lib/common/log1py.js":
/*!*************************************************!*\
  !*** ./node_modules/proj4/lib/common/log1py.js ***!
  \*************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  var y = 1 + x;
  var z = y - 1;

  return z === 0 ? x : x * Math.log(y) / z;
});


/***/ }),

/***/ "./node_modules/proj4/lib/common/mlfn.js":
/*!***********************************************!*\
  !*** ./node_modules/proj4/lib/common/mlfn.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(e0, e1, e2, e3, phi) {
  return (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi));
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/msfnz.js":
/*!************************************************!*\
  !*** ./node_modules/proj4/lib/common/msfnz.js ***!
  \************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(eccent, sinphi, cosphi) {
  var con = eccent * sinphi;
  return cosphi / (Math.sqrt(1 - con * con));
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/phi2z.js":
/*!************************************************!*\
  !*** ./node_modules/proj4/lib/common/phi2z.js ***!
  \************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");


/* harmony default export */ __webpack_exports__["a"] = (function(eccent, ts) {
  var eccnth = 0.5 * eccent;
  var con, dphi;
  var phi = __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] - 2 * Math.atan(ts);
  for (var i = 0; i <= 15; i++) {
    con = eccent * Math.sin(phi);
    dphi = __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] - 2 * Math.atan(ts * (Math.pow(((1 - con) / (1 + con)), eccnth))) - phi;
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }
  //console.log("phi2z has NoConvergence");
  return -9999;
});


/***/ }),

/***/ "./node_modules/proj4/lib/common/pj_enfn.js":
/*!**************************************************!*\
  !*** ./node_modules/proj4/lib/common/pj_enfn.js ***!
  \**************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var C00 = 1;
var C02 = 0.25;
var C04 = 0.046875;
var C06 = 0.01953125;
var C08 = 0.01068115234375;
var C22 = 0.75;
var C44 = 0.46875;
var C46 = 0.01302083333333333333;
var C48 = 0.00712076822916666666;
var C66 = 0.36458333333333333333;
var C68 = 0.00569661458333333333;
var C88 = 0.3076171875;

/* harmony default export */ __webpack_exports__["a"] = (function(es) {
  var en = [];
  en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
  en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
  var t = es * es;
  en[2] = t * (C44 - es * (C46 + es * C48));
  t *= es;
  en[3] = t * (C66 - es * C68);
  en[4] = t * es * C88;
  return en;
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/pj_inv_mlfn.js":
/*!******************************************************!*\
  !*** ./node_modules/proj4/lib/common/pj_inv_mlfn.js ***!
  \******************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pj_mlfn__ = __webpack_require__(/*! ./pj_mlfn */ "./node_modules/proj4/lib/common/pj_mlfn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");



var MAX_ITER = 20;

/* harmony default export */ __webpack_exports__["a"] = (function(arg, es, en) {
  var k = 1 / (1 - es);
  var phi = arg;
  for (var i = MAX_ITER; i; --i) { /* rarely goes over 2 iterations */
    var s = Math.sin(phi);
    var t = 1 - es * s * s;
    //t = this.pj_mlfn(phi, s, Math.cos(phi), en) - arg;
    //phi -= t * (t * Math.sqrt(t)) * k;
    t = (Object(__WEBPACK_IMPORTED_MODULE_0__pj_mlfn__["a" /* default */])(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
    phi -= t;
    if (Math.abs(t) < __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
      return phi;
    }
  }
  //..reportError("cass:pj_inv_mlfn: Convergence error");
  return phi;
});


/***/ }),

/***/ "./node_modules/proj4/lib/common/pj_mlfn.js":
/*!**************************************************!*\
  !*** ./node_modules/proj4/lib/common/pj_mlfn.js ***!
  \**************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(phi, sphi, cphi, en) {
  cphi *= sphi;
  sphi *= sphi;
  return (en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4]))));
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/qsfnz.js":
/*!************************************************!*\
  !*** ./node_modules/proj4/lib/common/qsfnz.js ***!
  \************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(eccent, sinphi) {
  var con;
  if (eccent > 1.0e-7) {
    con = eccent * sinphi;
    return ((1 - eccent * eccent) * (sinphi / (1 - con * con) - (0.5 / eccent) * Math.log((1 - con) / (1 + con))));
  }
  else {
    return (2 * sinphi);
  }
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/sign.js":
/*!***********************************************!*\
  !*** ./node_modules/proj4/lib/common/sign.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return x<0 ? -1 : 1;
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/sinh.js":
/*!***********************************************!*\
  !*** ./node_modules/proj4/lib/common/sinh.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  var r = Math.exp(x);
  r = (r - 1 / r) / 2;
  return r;
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/srat.js":
/*!***********************************************!*\
  !*** ./node_modules/proj4/lib/common/srat.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(esinp, exp) {
  return (Math.pow((1 - esinp) / (1 + esinp), exp));
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/toPoint.js":
/*!**************************************************!*\
  !*** ./node_modules/proj4/lib/common/toPoint.js ***!
  \**************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (array){
  var out = {
    x: array[0],
    y: array[1]
  };
  if (array.length>2) {
    out.z = array[2];
  }
  if (array.length>3) {
    out.m = array[3];
  }
  return out;
});

/***/ }),

/***/ "./node_modules/proj4/lib/common/tsfnz.js":
/*!************************************************!*\
  !*** ./node_modules/proj4/lib/common/tsfnz.js ***!
  \************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");


/* harmony default export */ __webpack_exports__["a"] = (function(eccent, phi, sinphi) {
  var con = eccent * sinphi;
  var com = 0.5 * eccent;
  con = Math.pow(((1 - con) / (1 + con)), com);
  return (Math.tan(0.5 * (__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] - phi)) / con);
});


/***/ }),

/***/ "./node_modules/proj4/lib/constants/Datum.js":
/*!***************************************************!*\
  !*** ./node_modules/proj4/lib/constants/Datum.js ***!
  \***************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return exports; });
var exports = {};

exports.wgs84 = {
  towgs84: "0,0,0",
  ellipse: "WGS84",
  datumName: "WGS84"
};

exports.ch1903 = {
  towgs84: "674.374,15.056,405.346",
  ellipse: "bessel",
  datumName: "swiss"
};

exports.ggrs87 = {
  towgs84: "-199.87,74.79,246.62",
  ellipse: "GRS80",
  datumName: "Greek_Geodetic_Reference_System_1987"
};

exports.nad83 = {
  towgs84: "0,0,0",
  ellipse: "GRS80",
  datumName: "North_American_Datum_1983"
};

exports.nad27 = {
  nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
  ellipse: "clrk66",
  datumName: "North_American_Datum_1927"
};

exports.potsdam = {
  towgs84: "606.0,23.0,413.0",
  ellipse: "bessel",
  datumName: "Potsdam Rauenberg 1950 DHDN"
};

exports.carthage = {
  towgs84: "-263.0,6.0,431.0",
  ellipse: "clark80",
  datumName: "Carthage 1934 Tunisia"
};

exports.hermannskogel = {
  towgs84: "653.0,-212.0,449.0",
  ellipse: "bessel",
  datumName: "Hermannskogel"
};

exports.osni52 = {
  towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
  ellipse: "airy",
  datumName: "Irish National"
};

exports.ire65 = {
  towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
  ellipse: "mod_airy",
  datumName: "Ireland 1965"
};

exports.rassadiran = {
  towgs84: "-133.63,-157.5,-158.62",
  ellipse: "intl",
  datumName: "Rassadiran"
};

exports.nzgd49 = {
  towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
  ellipse: "intl",
  datumName: "New Zealand Geodetic Datum 1949"
};

exports.osgb36 = {
  towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
  ellipse: "airy",
  datumName: "Airy 1830"
};

exports.s_jtsk = {
  towgs84: "589,76,480",
  ellipse: 'bessel',
  datumName: 'S-JTSK (Ferro)'
};

exports.beduaram = {
  towgs84: '-106,-87,188',
  ellipse: 'clrk80',
  datumName: 'Beduaram'
};

exports.gunung_segara = {
  towgs84: '-403,684,41',
  ellipse: 'bessel',
  datumName: 'Gunung Segara Jakarta'
};

exports.rnb72 = {
  towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
  ellipse: "intl",
  datumName: "Reseau National Belge 1972"
};


/***/ }),

/***/ "./node_modules/proj4/lib/constants/Ellipsoid.js":
/*!*******************************************************!*\
  !*** ./node_modules/proj4/lib/constants/Ellipsoid.js ***!
  \*******************************************************/
/*! exports provided: default, WGS84 */
/*! exports used: WGS84, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return exports; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WGS84; });
var exports = {};

exports.MERIT = {
  a: 6378137.0,
  rf: 298.257,
  ellipseName: "MERIT 1983"
};

exports.SGS85 = {
  a: 6378136.0,
  rf: 298.257,
  ellipseName: "Soviet Geodetic System 85"
};

exports.GRS80 = {
  a: 6378137.0,
  rf: 298.257222101,
  ellipseName: "GRS 1980(IUGG, 1980)"
};

exports.IAU76 = {
  a: 6378140.0,
  rf: 298.257,
  ellipseName: "IAU 1976"
};

exports.airy = {
  a: 6377563.396,
  b: 6356256.910,
  ellipseName: "Airy 1830"
};

exports.APL4 = {
  a: 6378137,
  rf: 298.25,
  ellipseName: "Appl. Physics. 1965"
};

exports.NWL9D = {
  a: 6378145.0,
  rf: 298.25,
  ellipseName: "Naval Weapons Lab., 1965"
};

exports.mod_airy = {
  a: 6377340.189,
  b: 6356034.446,
  ellipseName: "Modified Airy"
};

exports.andrae = {
  a: 6377104.43,
  rf: 300.0,
  ellipseName: "Andrae 1876 (Den., Iclnd.)"
};

exports.aust_SA = {
  a: 6378160.0,
  rf: 298.25,
  ellipseName: "Australian Natl & S. Amer. 1969"
};

exports.GRS67 = {
  a: 6378160.0,
  rf: 298.2471674270,
  ellipseName: "GRS 67(IUGG 1967)"
};

exports.bessel = {
  a: 6377397.155,
  rf: 299.1528128,
  ellipseName: "Bessel 1841"
};

exports.bess_nam = {
  a: 6377483.865,
  rf: 299.1528128,
  ellipseName: "Bessel 1841 (Namibia)"
};

exports.clrk66 = {
  a: 6378206.4,
  b: 6356583.8,
  ellipseName: "Clarke 1866"
};

exports.clrk80 = {
  a: 6378249.145,
  rf: 293.4663,
  ellipseName: "Clarke 1880 mod."
};

exports.clrk58 = {
  a: 6378293.645208759,
  rf: 294.2606763692654,
  ellipseName: "Clarke 1858"
};

exports.CPM = {
  a: 6375738.7,
  rf: 334.29,
  ellipseName: "Comm. des Poids et Mesures 1799"
};

exports.delmbr = {
  a: 6376428.0,
  rf: 311.5,
  ellipseName: "Delambre 1810 (Belgium)"
};

exports.engelis = {
  a: 6378136.05,
  rf: 298.2566,
  ellipseName: "Engelis 1985"
};

exports.evrst30 = {
  a: 6377276.345,
  rf: 300.8017,
  ellipseName: "Everest 1830"
};

exports.evrst48 = {
  a: 6377304.063,
  rf: 300.8017,
  ellipseName: "Everest 1948"
};

exports.evrst56 = {
  a: 6377301.243,
  rf: 300.8017,
  ellipseName: "Everest 1956"
};

exports.evrst69 = {
  a: 6377295.664,
  rf: 300.8017,
  ellipseName: "Everest 1969"
};

exports.evrstSS = {
  a: 6377298.556,
  rf: 300.8017,
  ellipseName: "Everest (Sabah & Sarawak)"
};

exports.fschr60 = {
  a: 6378166.0,
  rf: 298.3,
  ellipseName: "Fischer (Mercury Datum) 1960"
};

exports.fschr60m = {
  a: 6378155.0,
  rf: 298.3,
  ellipseName: "Fischer 1960"
};

exports.fschr68 = {
  a: 6378150.0,
  rf: 298.3,
  ellipseName: "Fischer 1968"
};

exports.helmert = {
  a: 6378200.0,
  rf: 298.3,
  ellipseName: "Helmert 1906"
};

exports.hough = {
  a: 6378270.0,
  rf: 297.0,
  ellipseName: "Hough"
};

exports.intl = {
  a: 6378388.0,
  rf: 297.0,
  ellipseName: "International 1909 (Hayford)"
};

exports.kaula = {
  a: 6378163.0,
  rf: 298.24,
  ellipseName: "Kaula 1961"
};

exports.lerch = {
  a: 6378139.0,
  rf: 298.257,
  ellipseName: "Lerch 1979"
};

exports.mprts = {
  a: 6397300.0,
  rf: 191.0,
  ellipseName: "Maupertius 1738"
};

exports.new_intl = {
  a: 6378157.5,
  b: 6356772.2,
  ellipseName: "New International 1967"
};

exports.plessis = {
  a: 6376523.0,
  rf: 6355863.0,
  ellipseName: "Plessis 1817 (France)"
};

exports.krass = {
  a: 6378245.0,
  rf: 298.3,
  ellipseName: "Krassovsky, 1942"
};

exports.SEasia = {
  a: 6378155.0,
  b: 6356773.3205,
  ellipseName: "Southeast Asia"
};

exports.walbeck = {
  a: 6376896.0,
  b: 6355834.8467,
  ellipseName: "Walbeck"
};

exports.WGS60 = {
  a: 6378165.0,
  rf: 298.3,
  ellipseName: "WGS 60"
};

exports.WGS66 = {
  a: 6378145.0,
  rf: 298.25,
  ellipseName: "WGS 66"
};

exports.WGS7 = {
  a: 6378135.0,
  rf: 298.26,
  ellipseName: "WGS 72"
};

var WGS84 = exports.WGS84 = {
  a: 6378137.0,
  rf: 298.257223563,
  ellipseName: "WGS 84"
};

exports.sphere = {
  a: 6370997.0,
  b: 6370997.0,
  ellipseName: "Normal Sphere (r=6370997)"
};


/***/ }),

/***/ "./node_modules/proj4/lib/constants/PrimeMeridian.js":
/*!***********************************************************!*\
  !*** ./node_modules/proj4/lib/constants/PrimeMeridian.js ***!
  \***********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return exports; });
var exports = {};


exports.greenwich = 0.0; //"0dE",
exports.lisbon = -9.131906111111; //"9d07'54.862\"W",
exports.paris = 2.337229166667; //"2d20'14.025\"E",
exports.bogota = -74.080916666667; //"74d04'51.3\"W",
exports.madrid = -3.687938888889; //"3d41'16.58\"W",
exports.rome = 12.452333333333; //"12d27'8.4\"E",
exports.bern = 7.439583333333; //"7d26'22.5\"E",
exports.jakarta = 106.807719444444; //"106d48'27.79\"E",
exports.ferro = -17.666666666667; //"17d40'W",
exports.brussels = 4.367975; //"4d22'4.71\"E",
exports.stockholm = 18.058277777778; //"18d3'29.8\"E",
exports.athens = 23.7163375; //"23d42'58.815\"E",
exports.oslo = 10.722916666667; //"10d43'22.5\"E"


/***/ }),

/***/ "./node_modules/proj4/lib/constants/units.js":
/*!***************************************************!*\
  !*** ./node_modules/proj4/lib/constants/units.js ***!
  \***************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  ft: {to_meter: 0.3048},
  'us-ft': {to_meter: 1200 / 3937}
});


/***/ }),

/***/ "./node_modules/proj4/lib/constants/values.js":
/*!****************************************************!*\
  !*** ./node_modules/proj4/lib/constants/values.js ***!
  \****************************************************/
/*! exports provided: PJD_3PARAM, PJD_7PARAM, PJD_WGS84, PJD_NODATUM, SEC_TO_RAD, HALF_PI, SIXTH, RA4, RA6, EPSLN, D2R, R2D, FORTPI, TWO_PI, SPI */
/*! exports used: D2R, EPSLN, FORTPI, HALF_PI, PJD_3PARAM, PJD_7PARAM, PJD_NODATUM, PJD_WGS84, R2D, RA4, RA6, SEC_TO_RAD, SIXTH, SPI, TWO_PI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PJD_3PARAM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PJD_7PARAM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return PJD_WGS84; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return PJD_NODATUM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return SEC_TO_RAD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return HALF_PI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return SIXTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return RA4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return RA6; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EPSLN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return D2R; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return R2D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FORTPI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return TWO_PI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return SPI; });
var PJD_3PARAM = 1;
var PJD_7PARAM = 2;
var PJD_WGS84 = 4; // WGS84 or equivalent
var PJD_NODATUM = 5; // WGS84 or equivalent
var SEC_TO_RAD = 4.84813681109535993589914102357e-6;
var HALF_PI = Math.PI/2;
// ellipoid pj_set_ell.c
var SIXTH = 0.1666666666666666667;
/* 1/6 */
var RA4 = 0.04722222222222222222;
/* 17/360 */
var RA6 = 0.02215608465608465608;
var EPSLN = 1.0e-10;
// you'd think you could use Number.EPSILON above but that makes
// Mollweide get into an infinate loop.

var D2R = 0.01745329251994329577;
var R2D = 57.29577951308232088;
var FORTPI = Math.PI/4;
var TWO_PI = Math.PI * 2;
// SPI is slightly greater than Math.PI, so values that exceed the -180..180
// degree range by a tiny amount don't get wrapped. This prevents points that
// have drifted from their original location along the 180th meridian (due to
// floating point error) from changing their sign.
var SPI = 3.14159265359;


/***/ }),

/***/ "./node_modules/proj4/lib/core.js":
/*!****************************************!*\
  !*** ./node_modules/proj4/lib/core.js ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Proj__ = __webpack_require__(/*! ./Proj */ "./node_modules/proj4/lib/Proj.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transform__ = __webpack_require__(/*! ./transform */ "./node_modules/proj4/lib/transform.js");


var wgs84 = Object(__WEBPACK_IMPORTED_MODULE_0__Proj__["a" /* default */])('WGS84');

function transformer(from, to, coords) {
  var transformedArray, out, keys;
  if (Array.isArray(coords)) {
    transformedArray = Object(__WEBPACK_IMPORTED_MODULE_1__transform__["a" /* default */])(from, to, coords);
    if (coords.length === 3) {
      return [transformedArray.x, transformedArray.y, transformedArray.z];
    }
    else {
      return [transformedArray.x, transformedArray.y];
    }
  }
  else {
    out = Object(__WEBPACK_IMPORTED_MODULE_1__transform__["a" /* default */])(from, to, coords);
    keys = Object.keys(coords);
    if (keys.length === 2) {
      return out;
    }
    keys.forEach(function (key) {
      if (key === 'x' || key === 'y') {
        return;
      }
      out[key] = coords[key];
    });
    return out;
  }
}

function checkProj(item) {
  if (item instanceof __WEBPACK_IMPORTED_MODULE_0__Proj__["a" /* default */]) {
    return item;
  }
  if (item.oProj) {
    return item.oProj;
  }
  return Object(__WEBPACK_IMPORTED_MODULE_0__Proj__["a" /* default */])(item);
}
function proj4(fromProj, toProj, coord) {
  fromProj = checkProj(fromProj);
  var single = false;
  var obj;
  if (typeof toProj === 'undefined') {
    toProj = fromProj;
    fromProj = wgs84;
    single = true;
  }
  else if (typeof toProj.x !== 'undefined' || Array.isArray(toProj)) {
    coord = toProj;
    toProj = fromProj;
    fromProj = wgs84;
    single = true;
  }
  toProj = checkProj(toProj);
  if (coord) {
    return transformer(fromProj, toProj, coord);
  }
  else {
    obj = {
      forward: function(coords) {
        return transformer(fromProj, toProj, coords);
      },
      inverse: function(coords) {
        return transformer(toProj, fromProj, coords);
      }
    };
    if (single) {
      obj.oProj = toProj;
    }
    return obj;
  }
}
/* harmony default export */ __webpack_exports__["a"] = (proj4);


/***/ }),

/***/ "./node_modules/proj4/lib/datum.js":
/*!*****************************************!*\
  !*** ./node_modules/proj4/lib/datum.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ./constants/values */ "./node_modules/proj4/lib/constants/values.js");


function datum(datumCode, datum_params, a, b, es, ep2) {
  var out = {};

  if (datumCode === undefined || datumCode === 'none') {
    out.datum_type = __WEBPACK_IMPORTED_MODULE_0__constants_values__["g" /* PJD_NODATUM */];
  } else {
    out.datum_type = __WEBPACK_IMPORTED_MODULE_0__constants_values__["h" /* PJD_WGS84 */];
  }

  if (datum_params) {
    out.datum_params = datum_params.map(parseFloat);
    if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) {
      out.datum_type = __WEBPACK_IMPORTED_MODULE_0__constants_values__["e" /* PJD_3PARAM */];
    }
    if (out.datum_params.length > 3) {
      if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
        out.datum_type = __WEBPACK_IMPORTED_MODULE_0__constants_values__["f" /* PJD_7PARAM */];
        out.datum_params[3] *= __WEBPACK_IMPORTED_MODULE_0__constants_values__["l" /* SEC_TO_RAD */];
        out.datum_params[4] *= __WEBPACK_IMPORTED_MODULE_0__constants_values__["l" /* SEC_TO_RAD */];
        out.datum_params[5] *= __WEBPACK_IMPORTED_MODULE_0__constants_values__["l" /* SEC_TO_RAD */];
        out.datum_params[6] = (out.datum_params[6] / 1000000.0) + 1.0;
      }
    }
  }

  out.a = a; //datum object also uses these values
  out.b = b;
  out.es = es;
  out.ep2 = ep2;
  return out;
}

/* harmony default export */ __webpack_exports__["a"] = (datum);


/***/ }),

/***/ "./node_modules/proj4/lib/datumUtils.js":
/*!**********************************************!*\
  !*** ./node_modules/proj4/lib/datumUtils.js ***!
  \**********************************************/
/*! exports provided: compareDatums, geodeticToGeocentric, geocentricToGeodetic, geocentricToWgs84, geocentricFromWgs84 */
/*! exports used: compareDatums, geocentricFromWgs84, geocentricToGeodetic, geocentricToWgs84, geodeticToGeocentric */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compareDatums;
/* harmony export (immutable) */ __webpack_exports__["e"] = geodeticToGeocentric;
/* harmony export (immutable) */ __webpack_exports__["c"] = geocentricToGeodetic;
/* harmony export (immutable) */ __webpack_exports__["d"] = geocentricToWgs84;
/* harmony export (immutable) */ __webpack_exports__["b"] = geocentricFromWgs84;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ./constants/values */ "./node_modules/proj4/lib/constants/values.js");


function compareDatums(source, dest) {
  if (source.datum_type !== dest.datum_type) {
    return false; // false, datums are not equal
  } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 0.000000000050) {
    // the tolerance for es is to ensure that GRS80 and WGS84
    // are considered identical
    return false;
  } else if (source.datum_type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["e" /* PJD_3PARAM */]) {
    return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2]);
  } else if (source.datum_type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["f" /* PJD_7PARAM */]) {
    return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6]);
  } else {
    return true; // datums are equal
  }
} // cs_compare_datums()

/*
 * The function Convert_Geodetic_To_Geocentric converts geodetic coordinates
 * (latitude, longitude, and height) to geocentric coordinates (X, Y, Z),
 * according to the current ellipsoid parameters.
 *
 *    Latitude  : Geodetic latitude in radians                     (input)
 *    Longitude : Geodetic longitude in radians                    (input)
 *    Height    : Geodetic height, in meters                       (input)
 *    X         : Calculated Geocentric X coordinate, in meters    (output)
 *    Y         : Calculated Geocentric Y coordinate, in meters    (output)
 *    Z         : Calculated Geocentric Z coordinate, in meters    (output)
 *
 */
function geodeticToGeocentric(p, es, a) {
  var Longitude = p.x;
  var Latitude = p.y;
  var Height = p.z ? p.z : 0; //Z value not always supplied

  var Rn; /*  Earth radius at location  */
  var Sin_Lat; /*  Math.sin(Latitude)  */
  var Sin2_Lat; /*  Square of Math.sin(Latitude)  */
  var Cos_Lat; /*  Math.cos(Latitude)  */

  /*
   ** Don't blow up if Latitude is just a little out of the value
   ** range as it may just be a rounding issue.  Also removed longitude
   ** test, it should be wrapped by Math.cos() and Math.sin().  NFW for PROJ.4, Sep/2001.
   */
  if (Latitude < -__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] && Latitude > -1.001 * __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */]) {
    Latitude = -__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
  } else if (Latitude > __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] && Latitude < 1.001 * __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */]) {
    Latitude = __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
  } else if (Latitude < -__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */]) {
    /* Latitude out of range */
    //..reportError('geocent:lat out of range:' + Latitude);
    return { x: -Infinity, y: -Infinity, z: p.z };
  } else if (Latitude > __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */]) {
    /* Latitude out of range */
    return { x: Infinity, y: Infinity, z: p.z };
  }

  if (Longitude > Math.PI) {
    Longitude -= (2 * Math.PI);
  }
  Sin_Lat = Math.sin(Latitude);
  Cos_Lat = Math.cos(Latitude);
  Sin2_Lat = Sin_Lat * Sin_Lat;
  Rn = a / (Math.sqrt(1.0e0 - es * Sin2_Lat));
  return {
    x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
    y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
    z: ((Rn * (1 - es)) + Height) * Sin_Lat
  };
} // cs_geodetic_to_geocentric()

function geocentricToGeodetic(p, es, a, b) {
  /* local defintions and variables */
  /* end-criterium of loop, accuracy of sin(Latitude) */
  var genau = 1e-12;
  var genau2 = (genau * genau);
  var maxiter = 30;

  var P; /* distance between semi-minor axis and location */
  var RR; /* distance between center and location */
  var CT; /* sin of geocentric latitude */
  var ST; /* cos of geocentric latitude */
  var RX;
  var RK;
  var RN; /* Earth radius at location */
  var CPHI0; /* cos of start or old geodetic latitude in iterations */
  var SPHI0; /* sin of start or old geodetic latitude in iterations */
  var CPHI; /* cos of searched geodetic latitude */
  var SPHI; /* sin of searched geodetic latitude */
  var SDPHI; /* end-criterium: addition-theorem of sin(Latitude(iter)-Latitude(iter-1)) */
  var iter; /* # of continous iteration, max. 30 is always enough (s.a.) */

  var X = p.x;
  var Y = p.y;
  var Z = p.z ? p.z : 0.0; //Z value not always supplied
  var Longitude;
  var Latitude;
  var Height;

  P = Math.sqrt(X * X + Y * Y);
  RR = Math.sqrt(X * X + Y * Y + Z * Z);

  /*      special cases for latitude and longitude */
  if (P / a < genau) {

    /*  special case, if P=0. (X=0., Y=0.) */
    Longitude = 0.0;

    /*  if (X,Y,Z)=(0.,0.,0.) then Height becomes semi-minor axis
     *  of ellipsoid (=center of mass), Latitude becomes PI/2 */
    if (RR / a < genau) {
      Latitude = __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
      Height = -b;
      return {
        x: p.x,
        y: p.y,
        z: p.z
      };
    }
  } else {
    /*  ellipsoidal (geodetic) longitude
     *  interval: -PI < Longitude <= +PI */
    Longitude = Math.atan2(Y, X);
  }

  /* --------------------------------------------------------------
   * Following iterative algorithm was developped by
   * "Institut for Erdmessung", University of Hannover, July 1988.
   * Internet: www.ife.uni-hannover.de
   * Iterative computation of CPHI,SPHI and Height.
   * Iteration of CPHI and SPHI to 10**-12 radian resp.
   * 2*10**-7 arcsec.
   * --------------------------------------------------------------
   */
  CT = Z / RR;
  ST = P / RR;
  RX = 1.0 / Math.sqrt(1.0 - es * (2.0 - es) * ST * ST);
  CPHI0 = ST * (1.0 - es) * RX;
  SPHI0 = CT * RX;
  iter = 0;

  /* loop to find sin(Latitude) resp. Latitude
   * until |sin(Latitude(iter)-Latitude(iter-1))| < genau */
  do {
    iter++;
    RN = a / Math.sqrt(1.0 - es * SPHI0 * SPHI0);

    /*  ellipsoidal (geodetic) height */
    Height = P * CPHI0 + Z * SPHI0 - RN * (1.0 - es * SPHI0 * SPHI0);

    RK = es * RN / (RN + Height);
    RX = 1.0 / Math.sqrt(1.0 - RK * (2.0 - RK) * ST * ST);
    CPHI = ST * (1.0 - RK) * RX;
    SPHI = CT * RX;
    SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
    CPHI0 = CPHI;
    SPHI0 = SPHI;
  }
  while (SDPHI * SDPHI > genau2 && iter < maxiter);

  /*      ellipsoidal (geodetic) latitude */
  Latitude = Math.atan(SPHI / Math.abs(CPHI));
  return {
    x: Longitude,
    y: Latitude,
    z: Height
  };
} // cs_geocentric_to_geodetic()

/****************************************************************/
// pj_geocentic_to_wgs84( p )
//  p = point to transform in geocentric coordinates (x,y,z)


/** point object, nothing fancy, just allows values to be
    passed back and forth by reference rather than by value.
    Other point classes may be used as long as they have
    x and y properties, which will get modified in the transform method.
*/
function geocentricToWgs84(p, datum_type, datum_params) {

  if (datum_type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["e" /* PJD_3PARAM */]) {
    // if( x[io] === HUGE_VAL )
    //    continue;
    return {
      x: p.x + datum_params[0],
      y: p.y + datum_params[1],
      z: p.z + datum_params[2],
    };
  } else if (datum_type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["f" /* PJD_7PARAM */]) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    // if( x[io] === HUGE_VAL )
    //    continue;
    return {
      x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
      y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
      z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
    };
  }
} // cs_geocentric_to_wgs84

/****************************************************************/
// pj_geocentic_from_wgs84()
//  coordinate system definition,
//  point to transform in geocentric coordinates (x,y,z)
function geocentricFromWgs84(p, datum_type, datum_params) {

  if (datum_type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["e" /* PJD_3PARAM */]) {
    //if( x[io] === HUGE_VAL )
    //    continue;
    return {
      x: p.x - datum_params[0],
      y: p.y - datum_params[1],
      z: p.z - datum_params[2],
    };

  } else if (datum_type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["f" /* PJD_7PARAM */]) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    var x_tmp = (p.x - Dx_BF) / M_BF;
    var y_tmp = (p.y - Dy_BF) / M_BF;
    var z_tmp = (p.z - Dz_BF) / M_BF;
    //if( x[io] === HUGE_VAL )
    //    continue;

    return {
      x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
      y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
      z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
    };
  } //cs_geocentric_from_wgs84()
}


/***/ }),

/***/ "./node_modules/proj4/lib/datum_transform.js":
/*!***************************************************!*\
  !*** ./node_modules/proj4/lib/datum_transform.js ***!
  \***************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ./constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__datumUtils__ = __webpack_require__(/*! ./datumUtils */ "./node_modules/proj4/lib/datumUtils.js");



function checkParams(type) {
  return (type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["e" /* PJD_3PARAM */] || type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["f" /* PJD_7PARAM */]);
}

/* harmony default export */ __webpack_exports__["a"] = (function(source, dest, point) {
  // Short cut if the datums are identical.
  if (Object(__WEBPACK_IMPORTED_MODULE_1__datumUtils__["a" /* compareDatums */])(source, dest)) {
    return point; // in this case, zero is sucess,
    // whereas cs_compare_datums returns 1 to indicate TRUE
    // confusing, should fix this
  }

  // Explicitly skip datum transform by setting 'datum=none' as parameter for either source or dest
  if (source.datum_type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["g" /* PJD_NODATUM */] || dest.datum_type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["g" /* PJD_NODATUM */]) {
    return point;
  }

  // If this datum requires grid shifts, then apply it to geodetic coordinates.

  // Do we need to go through geocentric coordinates?
  if (source.es === dest.es && source.a === dest.a && !checkParams(source.datum_type) &&  !checkParams(dest.datum_type)) {
    return point;
  }

  // Convert to geocentric coordinates.
  point = Object(__WEBPACK_IMPORTED_MODULE_1__datumUtils__["e" /* geodeticToGeocentric */])(point, source.es, source.a);
  // Convert between datums
  if (checkParams(source.datum_type)) {
    point = Object(__WEBPACK_IMPORTED_MODULE_1__datumUtils__["d" /* geocentricToWgs84 */])(point, source.datum_type, source.datum_params);
  }
  if (checkParams(dest.datum_type)) {
    point = Object(__WEBPACK_IMPORTED_MODULE_1__datumUtils__["b" /* geocentricFromWgs84 */])(point, dest.datum_type, dest.datum_params);
  }
  return Object(__WEBPACK_IMPORTED_MODULE_1__datumUtils__["c" /* geocentricToGeodetic */])(point, dest.es, dest.a, dest.b);

});


/***/ }),

/***/ "./node_modules/proj4/lib/defs.js":
/*!****************************************!*\
  !*** ./node_modules/proj4/lib/defs.js ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__(/*! ./global */ "./node_modules/proj4/lib/global.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__projString__ = __webpack_require__(/*! ./projString */ "./node_modules/proj4/lib/projString.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_wkt_parser__ = __webpack_require__(/*! wkt-parser */ "./node_modules/wkt-parser/index.js");




function defs(name) {
  /*global console*/
  var that = this;
  if (arguments.length === 2) {
    var def = arguments[1];
    if (typeof def === 'string') {
      if (def.charAt(0) === '+') {
        defs[name] = Object(__WEBPACK_IMPORTED_MODULE_1__projString__["a" /* default */])(arguments[1]);
      }
      else {
        defs[name] = Object(__WEBPACK_IMPORTED_MODULE_2_wkt_parser__["a" /* default */])(arguments[1]);
      }
    } else {
      defs[name] = def;
    }
  }
  else if (arguments.length === 1) {
    if (Array.isArray(name)) {
      return name.map(function(v) {
        if (Array.isArray(v)) {
          defs.apply(that, v);
        }
        else {
          defs(v);
        }
      });
    }
    else if (typeof name === 'string') {
      if (name in defs) {
        return defs[name];
      }
    }
    else if ('EPSG' in name) {
      defs['EPSG:' + name.EPSG] = name;
    }
    else if ('ESRI' in name) {
      defs['ESRI:' + name.ESRI] = name;
    }
    else if ('IAU2000' in name) {
      defs['IAU2000:' + name.IAU2000] = name;
    }
    else {
      console.log(name);
    }
    return;
  }


}
Object(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */])(defs);
/* harmony default export */ __webpack_exports__["a"] = (defs);


/***/ }),

/***/ "./node_modules/proj4/lib/deriveConstants.js":
/*!***************************************************!*\
  !*** ./node_modules/proj4/lib/deriveConstants.js ***!
  \***************************************************/
/*! exports provided: eccentricity, sphere */
/*! exports used: eccentricity, sphere */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = eccentricity;
/* harmony export (immutable) */ __webpack_exports__["b"] = sphere;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ./constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_Ellipsoid__ = __webpack_require__(/*! ./constants/Ellipsoid */ "./node_modules/proj4/lib/constants/Ellipsoid.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__match__ = __webpack_require__(/*! ./match */ "./node_modules/proj4/lib/match.js");




function eccentricity(a, b, rf, R_A) {
  var a2 = a * a; // used in geocentric
  var b2 = b * b; // used in geocentric
  var es = (a2 - b2) / a2; // e ^ 2
  var e = 0;
  if (R_A) {
    a *= 1 - es * (__WEBPACK_IMPORTED_MODULE_0__constants_values__["m" /* SIXTH */] + es * (__WEBPACK_IMPORTED_MODULE_0__constants_values__["j" /* RA4 */] + es * __WEBPACK_IMPORTED_MODULE_0__constants_values__["k" /* RA6 */]));
    a2 = a * a;
    es = 0;
  } else {
    e = Math.sqrt(es); // eccentricity
  }
  var ep2 = (a2 - b2) / b2; // used in geocentric
  return {
    es: es,
    e: e,
    ep2: ep2
  };
}
function sphere(a, b, rf, ellps, sphere) {
  if (!a) { // do we have an ellipsoid?
    var ellipse = Object(__WEBPACK_IMPORTED_MODULE_2__match__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__constants_Ellipsoid__["b" /* default */], ellps);
    if (!ellipse) {
      ellipse = __WEBPACK_IMPORTED_MODULE_1__constants_Ellipsoid__["a" /* WGS84 */];
    }
    a = ellipse.a;
    b = ellipse.b;
    rf = ellipse.rf;
  }

  if (rf && !b) {
    b = (1.0 - 1.0 / rf) * a;
  }
  if (rf === 0 || Math.abs(a - b) < __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
    sphere = true;
    b = a;
  }
  return {
    a: a,
    b: b,
    rf: rf,
    sphere: sphere
  };
}


/***/ }),

/***/ "./node_modules/proj4/lib/extend.js":
/*!******************************************!*\
  !*** ./node_modules/proj4/lib/extend.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(destination, source) {
  destination = destination || {};
  var value, property;
  if (!source) {
    return destination;
  }
  for (property in source) {
    value = source[property];
    if (value !== undefined) {
      destination[property] = value;
    }
  }
  return destination;
});


/***/ }),

/***/ "./node_modules/proj4/lib/global.js":
/*!******************************************!*\
  !*** ./node_modules/proj4/lib/global.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(defs) {
  defs('EPSG:4326', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
  defs('EPSG:4269', "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
  defs('EPSG:3857', "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");

  defs.WGS84 = defs['EPSG:4326'];
  defs['EPSG:3785'] = defs['EPSG:3857']; // maintain backward compat, official code is 3857
  defs.GOOGLE = defs['EPSG:3857'];
  defs['EPSG:900913'] = defs['EPSG:3857'];
  defs['EPSG:102113'] = defs['EPSG:3857'];
});


/***/ }),

/***/ "./node_modules/proj4/lib/index.js":
/*!*****************************************!*\
  !*** ./node_modules/proj4/lib/index.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(/*! ./core */ "./node_modules/proj4/lib/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Proj__ = __webpack_require__(/*! ./Proj */ "./node_modules/proj4/lib/Proj.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Point__ = __webpack_require__(/*! ./Point */ "./node_modules/proj4/lib/Point.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_toPoint__ = __webpack_require__(/*! ./common/toPoint */ "./node_modules/proj4/lib/common/toPoint.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__defs__ = __webpack_require__(/*! ./defs */ "./node_modules/proj4/lib/defs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__transform__ = __webpack_require__(/*! ./transform */ "./node_modules/proj4/lib/transform.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_mgrs__ = __webpack_require__(/*! mgrs */ "./node_modules/mgrs/mgrs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__version__ = __webpack_require__(/*! ./version */ "./node_modules/proj4/lib/version.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__projs__ = __webpack_require__(/*! ../projs */ "./node_modules/proj4/projs.js");










__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].defaultDatum = 'WGS84'; //default datum
__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].Proj = __WEBPACK_IMPORTED_MODULE_1__Proj__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].WGS84 = new __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].Proj('WGS84');
__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].Point = __WEBPACK_IMPORTED_MODULE_2__Point__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].toPoint = __WEBPACK_IMPORTED_MODULE_3__common_toPoint__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].defs = __WEBPACK_IMPORTED_MODULE_4__defs__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].transform = __WEBPACK_IMPORTED_MODULE_5__transform__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].mgrs = __WEBPACK_IMPORTED_MODULE_6_mgrs__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].version = __WEBPACK_IMPORTED_MODULE_7__version__["a" /* default */];
Object(__WEBPACK_IMPORTED_MODULE_8__projs__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */]);
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */]);


/***/ }),

/***/ "./node_modules/proj4/lib/match.js":
/*!*****************************************!*\
  !*** ./node_modules/proj4/lib/match.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = match;
var ignoredChar = /[\s_\-\/\(\)]/g;
function match(obj, key) {
  if (obj[key]) {
    return obj[key];
  }
  var keys = Object.keys(obj);
  var lkey = key.toLowerCase().replace(ignoredChar, '');
  var i = -1;
  var testkey, processedKey;
  while (++i < keys.length) {
    testkey = keys[i];
    processedKey = testkey.toLowerCase().replace(ignoredChar, '');
    if (processedKey === lkey) {
      return obj[testkey];
    }
  }
}


/***/ }),

/***/ "./node_modules/proj4/lib/parseCode.js":
/*!*********************************************!*\
  !*** ./node_modules/proj4/lib/parseCode.js ***!
  \*********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__defs__ = __webpack_require__(/*! ./defs */ "./node_modules/proj4/lib/defs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_wkt_parser__ = __webpack_require__(/*! wkt-parser */ "./node_modules/wkt-parser/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__projString__ = __webpack_require__(/*! ./projString */ "./node_modules/proj4/lib/projString.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__match__ = __webpack_require__(/*! ./match */ "./node_modules/proj4/lib/match.js");




function testObj(code){
  return typeof code === 'string';
}
function testDef(code){
  return code in __WEBPACK_IMPORTED_MODULE_0__defs__["a" /* default */];
}
 var codeWords = ['PROJECTEDCRS', 'PROJCRS', 'GEOGCS','GEOCCS','PROJCS','LOCAL_CS', 'GEODCRS', 'GEODETICCRS', 'GEODETICDATUM', 'ENGCRS', 'ENGINEERINGCRS'];
function testWKT(code){
  return codeWords.some(function (word) {
    return code.indexOf(word) > -1;
  });
}
var codes = ['3857', '900913', '3785', '102113'];
function checkMercator(item) {
  var auth = Object(__WEBPACK_IMPORTED_MODULE_3__match__["a" /* default */])(item, 'authority');
  if (!auth) {
    return;
  }
  var code = Object(__WEBPACK_IMPORTED_MODULE_3__match__["a" /* default */])(auth, 'epsg');
  return code && codes.indexOf(code) > -1;
}
function checkProjStr(item) {
  var ext = Object(__WEBPACK_IMPORTED_MODULE_3__match__["a" /* default */])(item, 'extension');
  if (!ext) {
    return;
  }
  return Object(__WEBPACK_IMPORTED_MODULE_3__match__["a" /* default */])(ext, 'proj4');
}
function testProj(code){
  return code[0] === '+';
}
function parse(code){
  if (testObj(code)) {
    //check to see if this is a WKT string
    if (testDef(code)) {
      return __WEBPACK_IMPORTED_MODULE_0__defs__["a" /* default */][code];
    }
    if (testWKT(code)) {
      var out = Object(__WEBPACK_IMPORTED_MODULE_1_wkt_parser__["a" /* default */])(code);
      // test of spetial case, due to this being a very common and often malformed
      if (checkMercator(out)) {
        return __WEBPACK_IMPORTED_MODULE_0__defs__["a" /* default */]['EPSG:3857'];
      }
      var maybeProjStr = checkProjStr(out);
      if (maybeProjStr) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__projString__["a" /* default */])(maybeProjStr);
      }
      return out;
    }
    if (testProj(code)) {
      return Object(__WEBPACK_IMPORTED_MODULE_2__projString__["a" /* default */])(code);
    }
  }else{
    return code;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (parse);


/***/ }),

/***/ "./node_modules/proj4/lib/projString.js":
/*!**********************************************!*\
  !*** ./node_modules/proj4/lib/projString.js ***!
  \**********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ./constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_PrimeMeridian__ = __webpack_require__(/*! ./constants/PrimeMeridian */ "./node_modules/proj4/lib/constants/PrimeMeridian.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_units__ = __webpack_require__(/*! ./constants/units */ "./node_modules/proj4/lib/constants/units.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__match__ = __webpack_require__(/*! ./match */ "./node_modules/proj4/lib/match.js");





/* harmony default export */ __webpack_exports__["a"] = (function(defData) {
  var self = {};
  var paramObj = defData.split('+').map(function(v) {
    return v.trim();
  }).filter(function(a) {
    return a;
  }).reduce(function(p, a) {
    var split = a.split('=');
    split.push(true);
    p[split[0].toLowerCase()] = split[1];
    return p;
  }, {});
  var paramName, paramVal, paramOutname;
  var params = {
    proj: 'projName',
    datum: 'datumCode',
    rf: function(v) {
      self.rf = parseFloat(v);
    },
    lat_0: function(v) {
      self.lat0 = v * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */];
    },
    lat_1: function(v) {
      self.lat1 = v * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */];
    },
    lat_2: function(v) {
      self.lat2 = v * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */];
    },
    lat_ts: function(v) {
      self.lat_ts = v * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */];
    },
    lon_0: function(v) {
      self.long0 = v * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */];
    },
    lon_1: function(v) {
      self.long1 = v * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */];
    },
    lon_2: function(v) {
      self.long2 = v * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */];
    },
    alpha: function(v) {
      self.alpha = parseFloat(v) * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */];
    },
    lonc: function(v) {
      self.longc = v * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */];
    },
    x_0: function(v) {
      self.x0 = parseFloat(v);
    },
    y_0: function(v) {
      self.y0 = parseFloat(v);
    },
    k_0: function(v) {
      self.k0 = parseFloat(v);
    },
    k: function(v) {
      self.k0 = parseFloat(v);
    },
    a: function(v) {
      self.a = parseFloat(v);
    },
    b: function(v) {
      self.b = parseFloat(v);
    },
    r_a: function() {
      self.R_A = true;
    },
    zone: function(v) {
      self.zone = parseInt(v, 10);
    },
    south: function() {
      self.utmSouth = true;
    },
    towgs84: function(v) {
      self.datum_params = v.split(",").map(function(a) {
        return parseFloat(a);
      });
    },
    to_meter: function(v) {
      self.to_meter = parseFloat(v);
    },
    units: function(v) {
      self.units = v;
      var unit = Object(__WEBPACK_IMPORTED_MODULE_3__match__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2__constants_units__["a" /* default */], v);
      if (unit) {
        self.to_meter = unit.to_meter;
      }
    },
    from_greenwich: function(v) {
      self.from_greenwich = v * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */];
    },
    pm: function(v) {
      var pm = Object(__WEBPACK_IMPORTED_MODULE_3__match__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__constants_PrimeMeridian__["a" /* default */], v);
      self.from_greenwich = (pm ? pm : parseFloat(v)) * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */];
    },
    nadgrids: function(v) {
      if (v === '@null') {
        self.datumCode = 'none';
      }
      else {
        self.nadgrids = v;
      }
    },
    axis: function(v) {
      var legalAxis = "ewnsud";
      if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) {
        self.axis = v;
      }
    }
  };
  for (paramName in paramObj) {
    paramVal = paramObj[paramName];
    if (paramName in params) {
      paramOutname = params[paramName];
      if (typeof paramOutname === 'function') {
        paramOutname(paramVal);
      }
      else {
        self[paramOutname] = paramVal;
      }
    }
    else {
      self[paramName] = paramVal;
    }
  }
  if(typeof self.datumCode === 'string' && self.datumCode !== "WGS84"){
    self.datumCode = self.datumCode.toLowerCase();
  }
  return self;
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections.js":
/*!***********************************************!*\
  !*** ./node_modules/proj4/lib/projections.js ***!
  \***********************************************/
/*! exports provided: add, get, start, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export add */
/* unused harmony export get */
/* unused harmony export start */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__projections_merc__ = __webpack_require__(/*! ./projections/merc */ "./node_modules/proj4/lib/projections/merc.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__projections_longlat__ = __webpack_require__(/*! ./projections/longlat */ "./node_modules/proj4/lib/projections/longlat.js");


var projs = [__WEBPACK_IMPORTED_MODULE_0__projections_merc__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__projections_longlat__["a" /* default */]];
var names = {};
var projStore = [];

function add(proj, i) {
  var len = projStore.length;
  if (!proj.names) {
    console.log(i);
    return true;
  }
  projStore[len] = proj;
  proj.names.forEach(function(n) {
    names[n.toLowerCase()] = len;
  });
  return this;
}



function get(name) {
  if (!name) {
    return false;
  }
  var n = name.toLowerCase();
  if (typeof names[n] !== 'undefined' && projStore[names[n]]) {
    return projStore[names[n]];
  }
}

function start() {
  projs.forEach(add);
}
/* harmony default export */ __webpack_exports__["a"] = ({
  start: start,
  add: add,
  get: get
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/aea.js":
/*!***************************************************!*\
  !*** ./node_modules/proj4/lib/projections/aea.js ***!
  \***************************************************/
/*! exports provided: init, forward, inverse, phi1z, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export phi1z */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_msfnz__ = __webpack_require__(/*! ../common/msfnz */ "./node_modules/proj4/lib/common/msfnz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_qsfnz__ = __webpack_require__(/*! ../common/qsfnz */ "./node_modules/proj4/lib/common/qsfnz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_asinz__ = __webpack_require__(/*! ../common/asinz */ "./node_modules/proj4/lib/common/asinz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");






function init() {

  if (Math.abs(this.lat1 + this.lat2) < __WEBPACK_IMPORTED_MODULE_4__constants_values__["b" /* EPSLN */]) {
    return;
  }
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e3 = Math.sqrt(this.es);

  this.sin_po = Math.sin(this.lat1);
  this.cos_po = Math.cos(this.lat1);
  this.t1 = this.sin_po;
  this.con = this.sin_po;
  this.ms1 = Object(__WEBPACK_IMPORTED_MODULE_0__common_msfnz__["a" /* default */])(this.e3, this.sin_po, this.cos_po);
  this.qs1 = Object(__WEBPACK_IMPORTED_MODULE_1__common_qsfnz__["a" /* default */])(this.e3, this.sin_po, this.cos_po);

  this.sin_po = Math.sin(this.lat2);
  this.cos_po = Math.cos(this.lat2);
  this.t2 = this.sin_po;
  this.ms2 = Object(__WEBPACK_IMPORTED_MODULE_0__common_msfnz__["a" /* default */])(this.e3, this.sin_po, this.cos_po);
  this.qs2 = Object(__WEBPACK_IMPORTED_MODULE_1__common_qsfnz__["a" /* default */])(this.e3, this.sin_po, this.cos_po);

  this.sin_po = Math.sin(this.lat0);
  this.cos_po = Math.cos(this.lat0);
  this.t3 = this.sin_po;
  this.qs0 = Object(__WEBPACK_IMPORTED_MODULE_1__common_qsfnz__["a" /* default */])(this.e3, this.sin_po, this.cos_po);

  if (Math.abs(this.lat1 - this.lat2) > __WEBPACK_IMPORTED_MODULE_4__constants_values__["b" /* EPSLN */]) {
    this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
  }
  else {
    this.ns0 = this.con;
  }
  this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
  this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
}

/* Albers Conical Equal Area forward equations--mapping lat,long to x,y
  -------------------------------------------------------------------*/
function forward(p) {

  var lon = p.x;
  var lat = p.y;

  this.sin_phi = Math.sin(lat);
  this.cos_phi = Math.cos(lat);

  var qs = Object(__WEBPACK_IMPORTED_MODULE_1__common_qsfnz__["a" /* default */])(this.e3, this.sin_phi, this.cos_phi);
  var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
  var theta = this.ns0 * Object(__WEBPACK_IMPORTED_MODULE_2__common_adjust_lon__["a" /* default */])(lon - this.long0);
  var x = rh1 * Math.sin(theta) + this.x0;
  var y = this.rh - rh1 * Math.cos(theta) + this.y0;

  p.x = x;
  p.y = y;
  return p;
}

function inverse(p) {
  var rh1, qs, con, theta, lon, lat;

  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  if (this.ns0 >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  }
  else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }
  con = rh1 * this.ns0 / this.a;
  if (this.sphere) {
    lat = Math.asin((this.c - con * con) / (2 * this.ns0));
  }
  else {
    qs = (this.c - con * con) / this.ns0;
    lat = this.phi1z(this.e3, qs);
  }

  lon = Object(__WEBPACK_IMPORTED_MODULE_2__common_adjust_lon__["a" /* default */])(theta / this.ns0 + this.long0);
  p.x = lon;
  p.y = lat;
  return p;
}

/* Function to compute phi1, the latitude for the inverse of the
   Albers Conical Equal-Area projection.
-------------------------------------------*/
function phi1z(eccent, qs) {
  var sinphi, cosphi, con, com, dphi;
  var phi = Object(__WEBPACK_IMPORTED_MODULE_3__common_asinz__["a" /* default */])(0.5 * qs);
  if (eccent < __WEBPACK_IMPORTED_MODULE_4__constants_values__["b" /* EPSLN */]) {
    return phi;
  }

  var eccnts = eccent * eccent;
  for (var i = 1; i <= 25; i++) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    con = eccent * sinphi;
    com = 1 - con * con;
    dphi = 0.5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi = phi + dphi;
    if (Math.abs(dphi) <= 1e-7) {
      return phi;
    }
  }
  return null;
}

var names = ["Albers_Conic_Equal_Area", "Albers", "aea"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names,
  phi1z: phi1z
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/aeqd.js":
/*!****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/aeqd.js ***!
  \****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_mlfn__ = __webpack_require__(/*! ../common/mlfn */ "./node_modules/proj4/lib/common/mlfn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_e0fn__ = __webpack_require__(/*! ../common/e0fn */ "./node_modules/proj4/lib/common/e0fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_e1fn__ = __webpack_require__(/*! ../common/e1fn */ "./node_modules/proj4/lib/common/e1fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_e2fn__ = __webpack_require__(/*! ../common/e2fn */ "./node_modules/proj4/lib/common/e2fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_e3fn__ = __webpack_require__(/*! ../common/e3fn */ "./node_modules/proj4/lib/common/e3fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_gN__ = __webpack_require__(/*! ../common/gN */ "./node_modules/proj4/lib/common/gN.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_asinz__ = __webpack_require__(/*! ../common/asinz */ "./node_modules/proj4/lib/common/asinz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_imlfn__ = __webpack_require__(/*! ../common/imlfn */ "./node_modules/proj4/lib/common/imlfn.js");














function init() {
  this.sin_p12 = Math.sin(this.lat0);
  this.cos_p12 = Math.cos(this.lat0);
}

function forward(p) {
  var lon = p.x;
  var lat = p.y;
  var sinphi = Math.sin(p.y);
  var cosphi = Math.cos(p.y);
  var dlon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(lon - this.long0);
  var e0, e1, e2, e3, Mlp, Ml, tanphi, Nl1, Nl, psi, Az, G, H, GH, Hs, c, kp, cos_c, s, s2, s3, s4, s5;
  if (this.sphere) {
    if (Math.abs(this.sin_p12 - 1) <= __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
      //North Pole case
      p.x = this.x0 + this.a * (__WEBPACK_IMPORTED_MODULE_1__constants_values__["d" /* HALF_PI */] - lat) * Math.sin(dlon);
      p.y = this.y0 - this.a * (__WEBPACK_IMPORTED_MODULE_1__constants_values__["d" /* HALF_PI */] - lat) * Math.cos(dlon);
      return p;
    }
    else if (Math.abs(this.sin_p12 + 1) <= __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
      //South Pole case
      p.x = this.x0 + this.a * (__WEBPACK_IMPORTED_MODULE_1__constants_values__["d" /* HALF_PI */] + lat) * Math.sin(dlon);
      p.y = this.y0 + this.a * (__WEBPACK_IMPORTED_MODULE_1__constants_values__["d" /* HALF_PI */] + lat) * Math.cos(dlon);
      return p;
    }
    else {
      //default case
      cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
      c = Math.acos(cos_c);
      kp = c / Math.sin(c);
      p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
      p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
      return p;
    }
  }
  else {
    e0 = Object(__WEBPACK_IMPORTED_MODULE_3__common_e0fn__["a" /* default */])(this.es);
    e1 = Object(__WEBPACK_IMPORTED_MODULE_4__common_e1fn__["a" /* default */])(this.es);
    e2 = Object(__WEBPACK_IMPORTED_MODULE_5__common_e2fn__["a" /* default */])(this.es);
    e3 = Object(__WEBPACK_IMPORTED_MODULE_6__common_e3fn__["a" /* default */])(this.es);
    if (Math.abs(this.sin_p12 - 1) <= __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
      //North Pole case
      Mlp = this.a * Object(__WEBPACK_IMPORTED_MODULE_2__common_mlfn__["a" /* default */])(e0, e1, e2, e3, __WEBPACK_IMPORTED_MODULE_1__constants_values__["d" /* HALF_PI */]);
      Ml = this.a * Object(__WEBPACK_IMPORTED_MODULE_2__common_mlfn__["a" /* default */])(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
      p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
      return p;
    }
    else if (Math.abs(this.sin_p12 + 1) <= __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
      //South Pole case
      Mlp = this.a * Object(__WEBPACK_IMPORTED_MODULE_2__common_mlfn__["a" /* default */])(e0, e1, e2, e3, __WEBPACK_IMPORTED_MODULE_1__constants_values__["d" /* HALF_PI */]);
      Ml = this.a * Object(__WEBPACK_IMPORTED_MODULE_2__common_mlfn__["a" /* default */])(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
      p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
      return p;
    }
    else {
      //Default case
      tanphi = sinphi / cosphi;
      Nl1 = Object(__WEBPACK_IMPORTED_MODULE_7__common_gN__["a" /* default */])(this.a, this.e, this.sin_p12);
      Nl = Object(__WEBPACK_IMPORTED_MODULE_7__common_gN__["a" /* default */])(this.a, this.e, sinphi);
      psi = Math.atan((1 - this.es) * tanphi + this.es * Nl1 * this.sin_p12 / (Nl * cosphi));
      Az = Math.atan2(Math.sin(dlon), this.cos_p12 * Math.tan(psi) - this.sin_p12 * Math.cos(dlon));
      if (Az === 0) {
        s = Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
      }
      else if (Math.abs(Math.abs(Az) - Math.PI) <= __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
        s = -Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
      }
      else {
        s = Math.asin(Math.sin(dlon) * Math.cos(psi) / Math.sin(Az));
      }
      G = this.e * this.sin_p12 / Math.sqrt(1 - this.es);
      H = this.e * this.cos_p12 * Math.cos(Az) / Math.sqrt(1 - this.es);
      GH = G * H;
      Hs = H * H;
      s2 = s * s;
      s3 = s2 * s;
      s4 = s3 * s;
      s5 = s4 * s;
      c = Nl1 * s * (1 - s2 * Hs * (1 - Hs) / 6 + s3 / 8 * GH * (1 - 2 * Hs) + s4 / 120 * (Hs * (4 - 7 * Hs) - 3 * G * G * (1 - 7 * Hs)) - s5 / 48 * GH);
      p.x = this.x0 + c * Math.sin(Az);
      p.y = this.y0 + c * Math.cos(Az);
      return p;
    }
  }


}

function inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M, N1, psi, Az, cosAz, tmp, A, B, D, Ee, F;
  if (this.sphere) {
    rh = Math.sqrt(p.x * p.x + p.y * p.y);
    if (rh > (2 * __WEBPACK_IMPORTED_MODULE_1__constants_values__["d" /* HALF_PI */] * this.a)) {
      return;
    }
    z = rh / this.a;

    sinz = Math.sin(z);
    cosz = Math.cos(z);

    lon = this.long0;
    if (Math.abs(rh) <= __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
      lat = this.lat0;
    }
    else {
      lat = Object(__WEBPACK_IMPORTED_MODULE_8__common_asinz__["a" /* default */])(cosz * this.sin_p12 + (p.y * sinz * this.cos_p12) / rh);
      con = Math.abs(this.lat0) - __WEBPACK_IMPORTED_MODULE_1__constants_values__["d" /* HALF_PI */];
      if (Math.abs(con) <= __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
        if (this.lat0 >= 0) {
          lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + Math.atan2(p.x, - p.y));
        }
        else {
          lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 - Math.atan2(-p.x, p.y));
        }
      }
      else {
        /*con = cosz - this.sin_p12 * Math.sin(lat);
        if ((Math.abs(con) < EPSLN) && (Math.abs(p.x) < EPSLN)) {
          //no-op, just keep the lon value as is
        } else {
          var temp = Math.atan2((p.x * sinz * this.cos_p12), (con * rh));
          lon = adjust_lon(this.long0 + Math.atan2((p.x * sinz * this.cos_p12), (con * rh)));
        }*/
        lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz));
      }
    }

    p.x = lon;
    p.y = lat;
    return p;
  }
  else {
    e0 = Object(__WEBPACK_IMPORTED_MODULE_3__common_e0fn__["a" /* default */])(this.es);
    e1 = Object(__WEBPACK_IMPORTED_MODULE_4__common_e1fn__["a" /* default */])(this.es);
    e2 = Object(__WEBPACK_IMPORTED_MODULE_5__common_e2fn__["a" /* default */])(this.es);
    e3 = Object(__WEBPACK_IMPORTED_MODULE_6__common_e3fn__["a" /* default */])(this.es);
    if (Math.abs(this.sin_p12 - 1) <= __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
      //North pole case
      Mlp = this.a * Object(__WEBPACK_IMPORTED_MODULE_2__common_mlfn__["a" /* default */])(e0, e1, e2, e3, __WEBPACK_IMPORTED_MODULE_1__constants_values__["d" /* HALF_PI */]);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M = Mlp - rh;
      lat = Object(__WEBPACK_IMPORTED_MODULE_9__common_imlfn__["a" /* default */])(M / this.a, e0, e1, e2, e3);
      lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + Math.atan2(p.x, - 1 * p.y));
      p.x = lon;
      p.y = lat;
      return p;
    }
    else if (Math.abs(this.sin_p12 + 1) <= __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
      //South pole case
      Mlp = this.a * Object(__WEBPACK_IMPORTED_MODULE_2__common_mlfn__["a" /* default */])(e0, e1, e2, e3, __WEBPACK_IMPORTED_MODULE_1__constants_values__["d" /* HALF_PI */]);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M = rh - Mlp;

      lat = Object(__WEBPACK_IMPORTED_MODULE_9__common_imlfn__["a" /* default */])(M / this.a, e0, e1, e2, e3);
      lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + Math.atan2(p.x, p.y));
      p.x = lon;
      p.y = lat;
      return p;
    }
    else {
      //default case
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      Az = Math.atan2(p.x, p.y);
      N1 = Object(__WEBPACK_IMPORTED_MODULE_7__common_gN__["a" /* default */])(this.a, this.e, this.sin_p12);
      cosAz = Math.cos(Az);
      tmp = this.e * this.cos_p12 * cosAz;
      A = -tmp * tmp / (1 - this.es);
      B = 3 * this.es * (1 - A) * this.sin_p12 * this.cos_p12 * cosAz / (1 - this.es);
      D = rh / N1;
      Ee = D - A * (1 + A) * Math.pow(D, 3) / 6 - B * (1 + 3 * A) * Math.pow(D, 4) / 24;
      F = 1 - A * Ee * Ee / 2 - D * Ee * Ee * Ee / 6;
      psi = Math.asin(this.sin_p12 * Math.cos(Ee) + this.cos_p12 * Math.sin(Ee) * cosAz);
      lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + Math.asin(Math.sin(Az) * Math.sin(Ee) / Math.cos(psi)));
      lat = Math.atan((1 - this.es * F * this.sin_p12 / Math.sin(psi)) * Math.tan(psi) / (1 - this.es));
      p.x = lon;
      p.y = lat;
      return p;
    }
  }

}

var names = ["Azimuthal_Equidistant", "aeqd"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/cass.js":
/*!****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/cass.js ***!
  \****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_mlfn__ = __webpack_require__(/*! ../common/mlfn */ "./node_modules/proj4/lib/common/mlfn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_e0fn__ = __webpack_require__(/*! ../common/e0fn */ "./node_modules/proj4/lib/common/e0fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_e1fn__ = __webpack_require__(/*! ../common/e1fn */ "./node_modules/proj4/lib/common/e1fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_e2fn__ = __webpack_require__(/*! ../common/e2fn */ "./node_modules/proj4/lib/common/e2fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_e3fn__ = __webpack_require__(/*! ../common/e3fn */ "./node_modules/proj4/lib/common/e3fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_gN__ = __webpack_require__(/*! ../common/gN */ "./node_modules/proj4/lib/common/gN.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_adjust_lat__ = __webpack_require__(/*! ../common/adjust_lat */ "./node_modules/proj4/lib/common/adjust_lat.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_imlfn__ = __webpack_require__(/*! ../common/imlfn */ "./node_modules/proj4/lib/common/imlfn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");











function init() {
  if (!this.sphere) {
    this.e0 = Object(__WEBPACK_IMPORTED_MODULE_1__common_e0fn__["a" /* default */])(this.es);
    this.e1 = Object(__WEBPACK_IMPORTED_MODULE_2__common_e1fn__["a" /* default */])(this.es);
    this.e2 = Object(__WEBPACK_IMPORTED_MODULE_3__common_e2fn__["a" /* default */])(this.es);
    this.e3 = Object(__WEBPACK_IMPORTED_MODULE_4__common_e3fn__["a" /* default */])(this.es);
    this.ml0 = this.a * Object(__WEBPACK_IMPORTED_MODULE_0__common_mlfn__["a" /* default */])(this.e0, this.e1, this.e2, this.e3, this.lat0);
  }
}

/* Cassini forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
function forward(p) {

  /* Forward equations
      -----------------*/
  var x, y;
  var lam = p.x;
  var phi = p.y;
  lam = Object(__WEBPACK_IMPORTED_MODULE_6__common_adjust_lon__["a" /* default */])(lam - this.long0);

  if (this.sphere) {
    x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
    y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
  }
  else {
    //ellipsoid
    var sinphi = Math.sin(phi);
    var cosphi = Math.cos(phi);
    var nl = Object(__WEBPACK_IMPORTED_MODULE_5__common_gN__["a" /* default */])(this.a, this.e, sinphi);
    var tl = Math.tan(phi) * Math.tan(phi);
    var al = lam * Math.cos(phi);
    var asq = al * al;
    var cl = this.es * cosphi * cosphi / (1 - this.es);
    var ml = this.a * Object(__WEBPACK_IMPORTED_MODULE_0__common_mlfn__["a" /* default */])(this.e0, this.e1, this.e2, this.e3, phi);

    x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120));
    y = ml - this.ml0 + nl * sinphi / cosphi * asq * (0.5 + (5 - tl + 6 * cl) * asq / 24);


  }

  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
}

/* Inverse equations
  -----------------*/
function inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var phi, lam;

  if (this.sphere) {
    var dd = y + this.lat0;
    phi = Math.asin(Math.sin(dd) * Math.cos(x));
    lam = Math.atan2(Math.tan(x), Math.cos(dd));
  }
  else {
    /* ellipsoid */
    var ml1 = this.ml0 / this.a + y;
    var phi1 = Object(__WEBPACK_IMPORTED_MODULE_8__common_imlfn__["a" /* default */])(ml1, this.e0, this.e1, this.e2, this.e3);
    if (Math.abs(Math.abs(phi1) - __WEBPACK_IMPORTED_MODULE_9__constants_values__["d" /* HALF_PI */]) <= __WEBPACK_IMPORTED_MODULE_9__constants_values__["b" /* EPSLN */]) {
      p.x = this.long0;
      p.y = __WEBPACK_IMPORTED_MODULE_9__constants_values__["d" /* HALF_PI */];
      if (y < 0) {
        p.y *= -1;
      }
      return p;
    }
    var nl1 = Object(__WEBPACK_IMPORTED_MODULE_5__common_gN__["a" /* default */])(this.a, this.e, Math.sin(phi1));

    var rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es);
    var tl1 = Math.pow(Math.tan(phi1), 2);
    var dl = x * this.a / nl1;
    var dsq = dl * dl;
    phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (0.5 - (1 + 3 * tl1) * dl * dl / 24);
    lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1);

  }

  p.x = Object(__WEBPACK_IMPORTED_MODULE_6__common_adjust_lon__["a" /* default */])(lam + this.long0);
  p.y = Object(__WEBPACK_IMPORTED_MODULE_7__common_adjust_lat__["a" /* default */])(phi);
  return p;

}

var names = ["Cassini", "Cassini_Soldner", "cass"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/cea.js":
/*!***************************************************!*\
  !*** ./node_modules/proj4/lib/projections/cea.js ***!
  \***************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_qsfnz__ = __webpack_require__(/*! ../common/qsfnz */ "./node_modules/proj4/lib/common/qsfnz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_msfnz__ = __webpack_require__(/*! ../common/msfnz */ "./node_modules/proj4/lib/common/msfnz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_iqsfnz__ = __webpack_require__(/*! ../common/iqsfnz */ "./node_modules/proj4/lib/common/iqsfnz.js");





/*
  reference:
    "Cartographic Projection Procedures for the UNIX Environment-
    A User's Manual" by Gerald I. Evenden,
    USGS Open File Report 90-284and Release 4 Interim Reports (2003)
*/
function init() {
  //no-op
  if (!this.sphere) {
    this.k0 = Object(__WEBPACK_IMPORTED_MODULE_2__common_msfnz__["a" /* default */])(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
  }
}

/* Cylindrical Equal Area forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
function forward(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y;
  /* Forward equations
      -----------------*/
  var dlon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(lon - this.long0);
  if (this.sphere) {
    x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
    y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
  }
  else {
    var qs = Object(__WEBPACK_IMPORTED_MODULE_1__common_qsfnz__["a" /* default */])(this.e, Math.sin(lat));
    x = this.x0 + this.a * this.k0 * dlon;
    y = this.y0 + this.a * qs * 0.5 / this.k0;
  }

  p.x = x;
  p.y = y;
  return p;
}

/* Cylindrical Equal Area inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
function inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat;

  if (this.sphere) {
    lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + (p.x / this.a) / Math.cos(this.lat_ts));
    lat = Math.asin((p.y / this.a) * Math.cos(this.lat_ts));
  }
  else {
    lat = Object(__WEBPACK_IMPORTED_MODULE_3__common_iqsfnz__["a" /* default */])(this.e, 2 * p.y * this.k0 / this.a);
    lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + p.x / (this.a * this.k0));
  }

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["cea"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/eqc.js":
/*!***************************************************!*\
  !*** ./node_modules/proj4/lib/projections/eqc.js ***!
  \***************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_adjust_lat__ = __webpack_require__(/*! ../common/adjust_lat */ "./node_modules/proj4/lib/common/adjust_lat.js");



function init() {

  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Equidistant Cylindrical (Plate Carre)";

  this.rc = Math.cos(this.lat_ts);
}

// forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
function forward(p) {

  var lon = p.x;
  var lat = p.y;

  var dlon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(lon - this.long0);
  var dlat = Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lat__["a" /* default */])(lat - this.lat0);
  p.x = this.x0 + (this.a * dlon * this.rc);
  p.y = this.y0 + (this.a * dlat);
  return p;
}

// inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
function inverse(p) {

  var x = p.x;
  var y = p.y;

  p.x = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + ((x - this.x0) / (this.a * this.rc)));
  p.y = Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lat__["a" /* default */])(this.lat0 + ((y - this.y0) / (this.a)));
  return p;
}

var names = ["Equirectangular", "Equidistant_Cylindrical", "eqc"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/eqdc.js":
/*!****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/eqdc.js ***!
  \****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_e0fn__ = __webpack_require__(/*! ../common/e0fn */ "./node_modules/proj4/lib/common/e0fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_e1fn__ = __webpack_require__(/*! ../common/e1fn */ "./node_modules/proj4/lib/common/e1fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_e2fn__ = __webpack_require__(/*! ../common/e2fn */ "./node_modules/proj4/lib/common/e2fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_e3fn__ = __webpack_require__(/*! ../common/e3fn */ "./node_modules/proj4/lib/common/e3fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_msfnz__ = __webpack_require__(/*! ../common/msfnz */ "./node_modules/proj4/lib/common/msfnz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_mlfn__ = __webpack_require__(/*! ../common/mlfn */ "./node_modules/proj4/lib/common/mlfn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_adjust_lat__ = __webpack_require__(/*! ../common/adjust_lat */ "./node_modules/proj4/lib/common/adjust_lat.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_imlfn__ = __webpack_require__(/*! ../common/imlfn */ "./node_modules/proj4/lib/common/imlfn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");











function init() {

  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  // Standard Parallels cannot be equal and on opposite sides of the equator
  if (Math.abs(this.lat1 + this.lat2) < __WEBPACK_IMPORTED_MODULE_9__constants_values__["b" /* EPSLN */]) {
    return;
  }
  this.lat2 = this.lat2 || this.lat1;
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e = Math.sqrt(this.es);
  this.e0 = Object(__WEBPACK_IMPORTED_MODULE_0__common_e0fn__["a" /* default */])(this.es);
  this.e1 = Object(__WEBPACK_IMPORTED_MODULE_1__common_e1fn__["a" /* default */])(this.es);
  this.e2 = Object(__WEBPACK_IMPORTED_MODULE_2__common_e2fn__["a" /* default */])(this.es);
  this.e3 = Object(__WEBPACK_IMPORTED_MODULE_3__common_e3fn__["a" /* default */])(this.es);

  this.sinphi = Math.sin(this.lat1);
  this.cosphi = Math.cos(this.lat1);

  this.ms1 = Object(__WEBPACK_IMPORTED_MODULE_4__common_msfnz__["a" /* default */])(this.e, this.sinphi, this.cosphi);
  this.ml1 = Object(__WEBPACK_IMPORTED_MODULE_5__common_mlfn__["a" /* default */])(this.e0, this.e1, this.e2, this.e3, this.lat1);

  if (Math.abs(this.lat1 - this.lat2) < __WEBPACK_IMPORTED_MODULE_9__constants_values__["b" /* EPSLN */]) {
    this.ns = this.sinphi;
  }
  else {
    this.sinphi = Math.sin(this.lat2);
    this.cosphi = Math.cos(this.lat2);
    this.ms2 = Object(__WEBPACK_IMPORTED_MODULE_4__common_msfnz__["a" /* default */])(this.e, this.sinphi, this.cosphi);
    this.ml2 = Object(__WEBPACK_IMPORTED_MODULE_5__common_mlfn__["a" /* default */])(this.e0, this.e1, this.e2, this.e3, this.lat2);
    this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
  }
  this.g = this.ml1 + this.ms1 / this.ns;
  this.ml0 = Object(__WEBPACK_IMPORTED_MODULE_5__common_mlfn__["a" /* default */])(this.e0, this.e1, this.e2, this.e3, this.lat0);
  this.rh = this.a * (this.g - this.ml0);
}

/* Equidistant Conic forward equations--mapping lat,long to x,y
  -----------------------------------------------------------*/
function forward(p) {
  var lon = p.x;
  var lat = p.y;
  var rh1;

  /* Forward equations
      -----------------*/
  if (this.sphere) {
    rh1 = this.a * (this.g - lat);
  }
  else {
    var ml = Object(__WEBPACK_IMPORTED_MODULE_5__common_mlfn__["a" /* default */])(this.e0, this.e1, this.e2, this.e3, lat);
    rh1 = this.a * (this.g - ml);
  }
  var theta = this.ns * Object(__WEBPACK_IMPORTED_MODULE_6__common_adjust_lon__["a" /* default */])(lon - this.long0);
  var x = this.x0 + rh1 * Math.sin(theta);
  var y = this.y0 + this.rh - rh1 * Math.cos(theta);
  p.x = x;
  p.y = y;
  return p;
}

/* Inverse equations
  -----------------*/
function inverse(p) {
  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  var con, rh1, lat, lon;
  if (this.ns >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  }
  else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }

  if (this.sphere) {
    lon = Object(__WEBPACK_IMPORTED_MODULE_6__common_adjust_lon__["a" /* default */])(this.long0 + theta / this.ns);
    lat = Object(__WEBPACK_IMPORTED_MODULE_7__common_adjust_lat__["a" /* default */])(this.g - rh1 / this.a);
    p.x = lon;
    p.y = lat;
    return p;
  }
  else {
    var ml = this.g - rh1 / this.a;
    lat = Object(__WEBPACK_IMPORTED_MODULE_8__common_imlfn__["a" /* default */])(ml, this.e0, this.e1, this.e2, this.e3);
    lon = Object(__WEBPACK_IMPORTED_MODULE_6__common_adjust_lon__["a" /* default */])(this.long0 + theta / this.ns);
    p.x = lon;
    p.y = lat;
    return p;
  }

}

var names = ["Equidistant_Conic", "eqdc"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/etmerc.js":
/*!******************************************************!*\
  !*** ./node_modules/proj4/lib/projections/etmerc.js ***!
  \******************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_sinh__ = __webpack_require__(/*! ../common/sinh */ "./node_modules/proj4/lib/common/sinh.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_hypot__ = __webpack_require__(/*! ../common/hypot */ "./node_modules/proj4/lib/common/hypot.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_asinhy__ = __webpack_require__(/*! ../common/asinhy */ "./node_modules/proj4/lib/common/asinhy.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_gatg__ = __webpack_require__(/*! ../common/gatg */ "./node_modules/proj4/lib/common/gatg.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_clens__ = __webpack_require__(/*! ../common/clens */ "./node_modules/proj4/lib/common/clens.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_clens_cmplx__ = __webpack_require__(/*! ../common/clens_cmplx */ "./node_modules/proj4/lib/common/clens_cmplx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
// Heavily based on this etmerc projection implementation
// https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/etmerc.js









function init() {
  if (this.es === undefined || this.es <= 0) {
    throw new Error('incorrect elliptical usage');
  }

  this.x0 = this.x0 !== undefined ? this.x0 : 0;
  this.y0 = this.y0 !== undefined ? this.y0 : 0;
  this.long0 = this.long0 !== undefined ? this.long0 : 0;
  this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;

  this.cgb = [];
  this.cbg = [];
  this.utg = [];
  this.gtu = [];

  var f = this.es / (1 + Math.sqrt(1 - this.es));
  var n = f / (2 - f);
  var np = n;

  this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675 ))))));
  this.cbg[0] = n * (-2 + n * ( 2 / 3 + n * ( 4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));

  np = np * n;
  this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
  this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * ( -13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));

  np = np * n;
  this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
  this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));

  np = np * n;
  this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
  this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * ( -24832 / 14175)));

  np = np * n;
  this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
  this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));

  np = np * n;
  this.cgb[5] = np * (601676 / 22275);
  this.cbg[5] = np * (444337 / 155925);

  np = Math.pow(n, 2);
  this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));

  this.utg[0] = n * (-0.5 + n * ( 2 / 3 + n * (-37 / 96 + n * ( 1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
  this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));

  this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
  this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));

  np = np * n;
  this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720 ))));
  this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))));

  np = np * n;
  this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)));
  this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)));

  np = np * n;
  this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680));
  this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840));

  np = np * n;
  this.utg[5] = np * (-20648693 / 638668800);
  this.gtu[5] = np * (212378941 / 319334400);

  var Z = Object(__WEBPACK_IMPORTED_MODULE_3__common_gatg__["a" /* default */])(this.cbg, this.lat0);
  this.Zb = -this.Qn * (Z + Object(__WEBPACK_IMPORTED_MODULE_4__common_clens__["a" /* default */])(this.gtu, 2 * Z));
}

function forward(p) {
  var Ce = Object(__WEBPACK_IMPORTED_MODULE_6__common_adjust_lon__["a" /* default */])(p.x - this.long0);
  var Cn = p.y;

  Cn = Object(__WEBPACK_IMPORTED_MODULE_3__common_gatg__["a" /* default */])(this.cbg, Cn);
  var sin_Cn = Math.sin(Cn);
  var cos_Cn = Math.cos(Cn);
  var sin_Ce = Math.sin(Ce);
  var cos_Ce = Math.cos(Ce);

  Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn);
  Ce = Math.atan2(sin_Ce * cos_Cn, Object(__WEBPACK_IMPORTED_MODULE_1__common_hypot__["a" /* default */])(sin_Cn, cos_Cn * cos_Ce));
  Ce = Object(__WEBPACK_IMPORTED_MODULE_2__common_asinhy__["a" /* default */])(Math.tan(Ce));

  var tmp = Object(__WEBPACK_IMPORTED_MODULE_5__common_clens_cmplx__["a" /* default */])(this.gtu, 2 * Cn, 2 * Ce);

  Cn = Cn + tmp[0];
  Ce = Ce + tmp[1];

  var x;
  var y;

  if (Math.abs(Ce) <= 2.623395162778) {
    x = this.a * (this.Qn * Ce) + this.x0;
    y = this.a * (this.Qn * Cn + this.Zb) + this.y0;
  }
  else {
    x = Infinity;
    y = Infinity;
  }

  p.x = x;
  p.y = y;

  return p;
}

function inverse(p) {
  var Ce = (p.x - this.x0) * (1 / this.a);
  var Cn = (p.y - this.y0) * (1 / this.a);

  Cn = (Cn - this.Zb) / this.Qn;
  Ce = Ce / this.Qn;

  var lon;
  var lat;

  if (Math.abs(Ce) <= 2.623395162778) {
    var tmp = Object(__WEBPACK_IMPORTED_MODULE_5__common_clens_cmplx__["a" /* default */])(this.utg, 2 * Cn, 2 * Ce);

    Cn = Cn + tmp[0];
    Ce = Ce + tmp[1];
    Ce = Math.atan(Object(__WEBPACK_IMPORTED_MODULE_0__common_sinh__["a" /* default */])(Ce));

    var sin_Cn = Math.sin(Cn);
    var cos_Cn = Math.cos(Cn);
    var sin_Ce = Math.sin(Ce);
    var cos_Ce = Math.cos(Ce);

    Cn = Math.atan2(sin_Cn * cos_Ce, Object(__WEBPACK_IMPORTED_MODULE_1__common_hypot__["a" /* default */])(sin_Ce, cos_Ce * cos_Cn));
    Ce = Math.atan2(sin_Ce, cos_Ce * cos_Cn);

    lon = Object(__WEBPACK_IMPORTED_MODULE_6__common_adjust_lon__["a" /* default */])(Ce + this.long0);
    lat = Object(__WEBPACK_IMPORTED_MODULE_3__common_gatg__["a" /* default */])(this.cgb, Cn);
  }
  else {
    lon = Infinity;
    lat = Infinity;
  }

  p.x = lon;
  p.y = lat;

  return p;
}

var names = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/gauss.js":
/*!*****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/gauss.js ***!
  \*****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_srat__ = __webpack_require__(/*! ../common/srat */ "./node_modules/proj4/lib/common/srat.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");

var MAX_ITER = 20;


function init() {
  var sphi = Math.sin(this.lat0);
  var cphi = Math.cos(this.lat0);
  cphi *= cphi;
  this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
  this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
  this.phic0 = Math.asin(sphi / this.C);
  this.ratexp = 0.5 * this.C * this.e;
  this.K = Math.tan(0.5 * this.phic0 + __WEBPACK_IMPORTED_MODULE_1__constants_values__["c" /* FORTPI */]) / (Math.pow(Math.tan(0.5 * this.lat0 + __WEBPACK_IMPORTED_MODULE_1__constants_values__["c" /* FORTPI */]), this.C) * Object(__WEBPACK_IMPORTED_MODULE_0__common_srat__["a" /* default */])(this.e * sphi, this.ratexp));
}

function forward(p) {
  var lon = p.x;
  var lat = p.y;

  p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + __WEBPACK_IMPORTED_MODULE_1__constants_values__["c" /* FORTPI */]), this.C) * Object(__WEBPACK_IMPORTED_MODULE_0__common_srat__["a" /* default */])(this.e * Math.sin(lat), this.ratexp)) - __WEBPACK_IMPORTED_MODULE_1__constants_values__["d" /* HALF_PI */];
  p.x = this.C * lon;
  return p;
}

function inverse(p) {
  var DEL_TOL = 1e-14;
  var lon = p.x / this.C;
  var lat = p.y;
  var num = Math.pow(Math.tan(0.5 * lat + __WEBPACK_IMPORTED_MODULE_1__constants_values__["c" /* FORTPI */]) / this.K, 1 / this.C);
  for (var i = MAX_ITER; i > 0; --i) {
    lat = 2 * Math.atan(num * Object(__WEBPACK_IMPORTED_MODULE_0__common_srat__["a" /* default */])(this.e * Math.sin(p.y), - 0.5 * this.e)) - __WEBPACK_IMPORTED_MODULE_1__constants_values__["d" /* HALF_PI */];
    if (Math.abs(lat - p.y) < DEL_TOL) {
      break;
    }
    p.y = lat;
  }
  /* convergence failed */
  if (!i) {
    return null;
  }
  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["gauss"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/gnom.js":
/*!****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/gnom.js ***!
  \****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_asinz__ = __webpack_require__(/*! ../common/asinz */ "./node_modules/proj4/lib/common/asinz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");




/*
  reference:
    Wolfram Mathworld "Gnomonic Projection"
    http://mathworld.wolfram.com/GnomonicProjection.html
    Accessed: 12th November 2009
  */
function init() {

  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.sin_p14 = Math.sin(this.lat0);
  this.cos_p14 = Math.cos(this.lat0);
  // Approximation for projecting points to the horizon (infinity)
  this.infinity_dist = 1000 * this.a;
  this.rc = 1;
}

/* Gnomonic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
function forward(p) {
  var sinphi, cosphi; /* sin and cos value        */
  var dlon; /* delta longitude value      */
  var coslon; /* cos of longitude        */
  var ksp; /* scale factor          */
  var g;
  var x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  dlon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(lon - this.long0);

  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);

  coslon = Math.cos(dlon);
  g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if ((g > 0) || (Math.abs(g) <= __WEBPACK_IMPORTED_MODULE_2__constants_values__["b" /* EPSLN */])) {
    x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
    y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
  }
  else {

    // Point is in the opposing hemisphere and is unprojectable
    // We still need to return a reasonable point, so we project
    // to infinity, on a bearing
    // equivalent to the northern hemisphere equivalent
    // This is a reasonable approximation for short shapes and lines that
    // straddle the horizon.

    x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
    y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);

  }
  p.x = x;
  p.y = y;
  return p;
}

function inverse(p) {
  var rh; /* Rho */
  var sinc, cosc;
  var c;
  var lon, lat;

  /* Inverse equations
      -----------------*/
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;

  p.x /= this.k0;
  p.y /= this.k0;

  if ((rh = Math.sqrt(p.x * p.x + p.y * p.y))) {
    c = Math.atan2(rh, this.rc);
    sinc = Math.sin(c);
    cosc = Math.cos(c);

    lat = Object(__WEBPACK_IMPORTED_MODULE_1__common_asinz__["a" /* default */])(cosc * this.sin_p14 + (p.y * sinc * this.cos_p14) / rh);
    lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
    lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + lon);
  }
  else {
    lat = this.phic0;
    lon = 0;
  }

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["gnom"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/krovak.js":
/*!******************************************************!*\
  !*** ./node_modules/proj4/lib/projections/krovak.js ***!
  \******************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");


function init() {
  this.a = 6377397.155;
  this.es = 0.006674372230614;
  this.e = Math.sqrt(this.es);
  if (!this.lat0) {
    this.lat0 = 0.863937979737193;
  }
  if (!this.long0) {
    this.long0 = 0.7417649320975901 - 0.308341501185665;
  }
  /* if scale not set default to 0.9999 */
  if (!this.k0) {
    this.k0 = 0.9999;
  }
  this.s45 = 0.785398163397448; /* 45 */
  this.s90 = 2 * this.s45;
  this.fi0 = this.lat0;
  this.e2 = this.es;
  this.e = Math.sqrt(this.e2);
  this.alfa = Math.sqrt(1 + (this.e2 * Math.pow(Math.cos(this.fi0), 4)) / (1 - this.e2));
  this.uq = 1.04216856380474;
  this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
  this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
  this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
  this.k1 = this.k0;
  this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
  this.s0 = 1.37008346281555;
  this.n = Math.sin(this.s0);
  this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
  this.ad = this.s90 - this.uq;
}

/* ellipsoid */
/* calculate xy from lat/lon */
/* Constants, identical to inverse transform function */
function forward(p) {
  var gfi, u, deltav, s, d, eps, ro;
  var lon = p.x;
  var lat = p.y;
  var delta_lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(lon - this.long0);
  /* Transformation */
  gfi = Math.pow(((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat))), (this.alfa * this.e / 2));
  u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
  deltav = -delta_lon * this.alfa;
  s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
  d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
  eps = this.n * d;
  ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
  p.y = ro * Math.cos(eps) / 1;
  p.x = ro * Math.sin(eps) / 1;

  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  return (p);
}

/* calculate lat/lon from xy */
function inverse(p) {
  var u, deltav, s, d, eps, ro, fi1;
  var ok;

  /* Transformation */
  /* revert y, x*/
  var tmp = p.x;
  p.x = p.y;
  p.y = tmp;
  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  ro = Math.sqrt(p.x * p.x + p.y * p.y);
  eps = Math.atan2(p.y, p.x);
  d = eps / Math.sin(this.s0);
  s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
  u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
  deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
  p.x = this.long0 - deltav / this.alfa;
  fi1 = u;
  ok = 0;
  var iter = 0;
  do {
    p.y = 2 * (Math.atan(Math.pow(this.k, - 1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
    if (Math.abs(fi1 - p.y) < 0.0000000001) {
      ok = 1;
    }
    fi1 = p.y;
    iter += 1;
  } while (ok === 0 && iter < 15);
  if (iter >= 15) {
    return null;
  }

  return (p);
}

var names = ["Krovak", "krovak"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/laea.js":
/*!****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/laea.js ***!
  \****************************************************/
/*! exports provided: S_POLE, N_POLE, EQUIT, OBLIQ, init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export S_POLE */
/* unused harmony export N_POLE */
/* unused harmony export EQUIT */
/* unused harmony export OBLIQ */
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_qsfnz__ = __webpack_require__(/*! ../common/qsfnz */ "./node_modules/proj4/lib/common/qsfnz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");






/*
  reference
    "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
  */

var S_POLE = 1;

var N_POLE = 2;
var EQUIT = 3;
var OBLIQ = 4;

/* Initialize the Lambert Azimuthal Equal Area projection
  ------------------------------------------------------*/
function init() {
  var t = Math.abs(this.lat0);
  if (Math.abs(t - __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */]) < __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
    this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE;
  }
  else if (Math.abs(t) < __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
    this.mode = this.EQUIT;
  }
  else {
    this.mode = this.OBLIQ;
  }
  if (this.es > 0) {
    var sinphi;

    this.qp = Object(__WEBPACK_IMPORTED_MODULE_1__common_qsfnz__["a" /* default */])(this.e, 1);
    this.mmf = 0.5 / (1 - this.es);
    this.apa = authset(this.es);
    switch (this.mode) {
    case this.N_POLE:
      this.dd = 1;
      break;
    case this.S_POLE:
      this.dd = 1;
      break;
    case this.EQUIT:
      this.rq = Math.sqrt(0.5 * this.qp);
      this.dd = 1 / this.rq;
      this.xmf = 1;
      this.ymf = 0.5 * this.qp;
      break;
    case this.OBLIQ:
      this.rq = Math.sqrt(0.5 * this.qp);
      sinphi = Math.sin(this.lat0);
      this.sinb1 = Object(__WEBPACK_IMPORTED_MODULE_1__common_qsfnz__["a" /* default */])(this.e, sinphi) / this.qp;
      this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
      this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
      this.ymf = (this.xmf = this.rq) / this.dd;
      this.xmf *= this.dd;
      break;
    }
  }
  else {
    if (this.mode === this.OBLIQ) {
      this.sinph0 = Math.sin(this.lat0);
      this.cosph0 = Math.cos(this.lat0);
    }
  }
}

/* Lambert Azimuthal Equal Area forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
function forward(p) {

  /* Forward equations
      -----------------*/
  var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
  var lam = p.x;
  var phi = p.y;

  lam = Object(__WEBPACK_IMPORTED_MODULE_2__common_adjust_lon__["a" /* default */])(lam - this.long0);
  if (this.sphere) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    coslam = Math.cos(lam);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      y = (this.mode === this.EQUIT) ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      if (y <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
        return null;
      }
      y = Math.sqrt(2 / y);
      x = y * cosphi * Math.sin(lam);
      y *= (this.mode === this.EQUIT) ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
    }
    else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        coslam = -coslam;
      }
      if (Math.abs(phi + this.phi0) < __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
        return null;
      }
      y = __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */] - phi * 0.5;
      y = 2 * ((this.mode === this.S_POLE) ? Math.cos(y) : Math.sin(y));
      x = y * Math.sin(lam);
      y *= coslam;
    }
  }
  else {
    sinb = 0;
    cosb = 0;
    b = 0;
    coslam = Math.cos(lam);
    sinlam = Math.sin(lam);
    sinphi = Math.sin(phi);
    q = Object(__WEBPACK_IMPORTED_MODULE_1__common_qsfnz__["a" /* default */])(this.e, sinphi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinb = q / this.qp;
      cosb = Math.sqrt(1 - sinb * sinb);
    }
    switch (this.mode) {
    case this.OBLIQ:
      b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
      break;
    case this.EQUIT:
      b = 1 + cosb * coslam;
      break;
    case this.N_POLE:
      b = __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + phi;
      q = this.qp - q;
      break;
    case this.S_POLE:
      b = phi - __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
      q = this.qp + q;
      break;
    }
    if (Math.abs(b) < __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
      return null;
    }
    switch (this.mode) {
    case this.OBLIQ:
    case this.EQUIT:
      b = Math.sqrt(2 / b);
      if (this.mode === this.OBLIQ) {
        y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
      }
      else {
        y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
      }
      x = this.xmf * b * cosb * sinlam;
      break;
    case this.N_POLE:
    case this.S_POLE:
      if (q >= 0) {
        x = (b = Math.sqrt(q)) * sinlam;
        y = coslam * ((this.mode === this.S_POLE) ? b : -b);
      }
      else {
        x = y = 0;
      }
      break;
    }
  }

  p.x = this.a * x + this.x0;
  p.y = this.a * y + this.y0;
  return p;
}

/* Inverse equations
  -----------------*/
function inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var lam, phi, cCe, sCe, q, rho, ab;
  if (this.sphere) {
    var cosz = 0,
      rh, sinz = 0;

    rh = Math.sqrt(x * x + y * y);
    phi = rh * 0.5;
    if (phi > 1) {
      return null;
    }
    phi = 2 * Math.asin(phi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinz = Math.sin(phi);
      cosz = Math.cos(phi);
    }
    switch (this.mode) {
    case this.EQUIT:
      phi = (Math.abs(rh) <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) ? 0 : Math.asin(y * sinz / rh);
      x *= sinz;
      y = cosz * rh;
      break;
    case this.OBLIQ:
      phi = (Math.abs(rh) <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) ? this.phi0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
      x *= sinz * this.cosph0;
      y = (cosz - Math.sin(phi) * this.sinph0) * rh;
      break;
    case this.N_POLE:
      y = -y;
      phi = __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] - phi;
      break;
    case this.S_POLE:
      phi -= __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
      break;
    }
    lam = (y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ)) ? 0 : Math.atan2(x, y);
  }
  else {
    ab = 0;
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      x /= this.dd;
      y *= this.dd;
      rho = Math.sqrt(x * x + y * y);
      if (rho < __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
        p.x = 0;
        p.y = this.phi0;
        return p;
      }
      sCe = 2 * Math.asin(0.5 * rho / this.rq);
      cCe = Math.cos(sCe);
      x *= (sCe = Math.sin(sCe));
      if (this.mode === this.OBLIQ) {
        ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
        q = this.qp * ab;
        y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
      }
      else {
        ab = y * sCe / rho;
        q = this.qp * ab;
        y = rho * cCe;
      }
    }
    else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        y = -y;
      }
      q = (x * x + y * y);
      if (!q) {
        p.x = 0;
        p.y = this.phi0;
        return p;
      }
      ab = 1 - q / this.qp;
      if (this.mode === this.S_POLE) {
        ab = -ab;
      }
    }
    lam = Math.atan2(x, y);
    phi = authlat(Math.asin(ab), this.apa);
  }

  p.x = Object(__WEBPACK_IMPORTED_MODULE_2__common_adjust_lon__["a" /* default */])(this.long0 + lam);
  p.y = phi;
  return p;
}

/* determine latitude from authalic latitude */
var P00 = 0.33333333333333333333;

var P01 = 0.17222222222222222222;
var P02 = 0.10257936507936507936;
var P10 = 0.06388888888888888888;
var P11 = 0.06640211640211640211;
var P20 = 0.01641501294219154443;

function authset(es) {
  var t;
  var APA = [];
  APA[0] = es * P00;
  t = es * es;
  APA[0] += t * P01;
  APA[1] = t * P10;
  t *= es;
  APA[0] += t * P02;
  APA[1] += t * P11;
  APA[2] = t * P20;
  return APA;
}

function authlat(beta, APA) {
  var t = beta + beta;
  return (beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t));
}

var names = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names,
  S_POLE: S_POLE,
  N_POLE: N_POLE,
  EQUIT: EQUIT,
  OBLIQ: OBLIQ
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/lcc.js":
/*!***************************************************!*\
  !*** ./node_modules/proj4/lib/projections/lcc.js ***!
  \***************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_msfnz__ = __webpack_require__(/*! ../common/msfnz */ "./node_modules/proj4/lib/common/msfnz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_tsfnz__ = __webpack_require__(/*! ../common/tsfnz */ "./node_modules/proj4/lib/common/tsfnz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_sign__ = __webpack_require__(/*! ../common/sign */ "./node_modules/proj4/lib/common/sign.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_phi2z__ = __webpack_require__(/*! ../common/phi2z */ "./node_modules/proj4/lib/common/phi2z.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");






function init() {

  // array of:  r_maj,r_min,lat1,lat2,c_lon,c_lat,false_east,false_north
  //double c_lat;                   /* center latitude                      */
  //double c_lon;                   /* center longitude                     */
  //double lat1;                    /* first standard parallel              */
  //double lat2;                    /* second standard parallel             */
  //double r_maj;                   /* major axis                           */
  //double r_min;                   /* minor axis                           */
  //double false_east;              /* x offset in meters                   */
  //double false_north;             /* y offset in meters                   */

  if (!this.lat2) {
    this.lat2 = this.lat1;
  } //if lat2 is not defined
  if (!this.k0) {
    this.k0 = 1;
  }
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  // Standard Parallels cannot be equal and on opposite sides of the equator
  if (Math.abs(this.lat1 + this.lat2) < __WEBPACK_IMPORTED_MODULE_5__constants_values__["b" /* EPSLN */]) {
    return;
  }

  var temp = this.b / this.a;
  this.e = Math.sqrt(1 - temp * temp);

  var sin1 = Math.sin(this.lat1);
  var cos1 = Math.cos(this.lat1);
  var ms1 = Object(__WEBPACK_IMPORTED_MODULE_0__common_msfnz__["a" /* default */])(this.e, sin1, cos1);
  var ts1 = Object(__WEBPACK_IMPORTED_MODULE_1__common_tsfnz__["a" /* default */])(this.e, this.lat1, sin1);

  var sin2 = Math.sin(this.lat2);
  var cos2 = Math.cos(this.lat2);
  var ms2 = Object(__WEBPACK_IMPORTED_MODULE_0__common_msfnz__["a" /* default */])(this.e, sin2, cos2);
  var ts2 = Object(__WEBPACK_IMPORTED_MODULE_1__common_tsfnz__["a" /* default */])(this.e, this.lat2, sin2);

  var ts0 = Object(__WEBPACK_IMPORTED_MODULE_1__common_tsfnz__["a" /* default */])(this.e, this.lat0, Math.sin(this.lat0));

  if (Math.abs(this.lat1 - this.lat2) > __WEBPACK_IMPORTED_MODULE_5__constants_values__["b" /* EPSLN */]) {
    this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
  }
  else {
    this.ns = sin1;
  }
  if (isNaN(this.ns)) {
    this.ns = sin1;
  }
  this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
  this.rh = this.a * this.f0 * Math.pow(ts0, this.ns);
  if (!this.title) {
    this.title = "Lambert Conformal Conic";
  }
}

// Lambert Conformal conic forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
function forward(p) {

  var lon = p.x;
  var lat = p.y;

  // singular cases :
  if (Math.abs(2 * Math.abs(lat) - Math.PI) <= __WEBPACK_IMPORTED_MODULE_5__constants_values__["b" /* EPSLN */]) {
    lat = Object(__WEBPACK_IMPORTED_MODULE_2__common_sign__["a" /* default */])(lat) * (__WEBPACK_IMPORTED_MODULE_5__constants_values__["d" /* HALF_PI */] - 2 * __WEBPACK_IMPORTED_MODULE_5__constants_values__["b" /* EPSLN */]);
  }

  var con = Math.abs(Math.abs(lat) - __WEBPACK_IMPORTED_MODULE_5__constants_values__["d" /* HALF_PI */]);
  var ts, rh1;
  if (con > __WEBPACK_IMPORTED_MODULE_5__constants_values__["b" /* EPSLN */]) {
    ts = Object(__WEBPACK_IMPORTED_MODULE_1__common_tsfnz__["a" /* default */])(this.e, lat, Math.sin(lat));
    rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
  }
  else {
    con = lat * this.ns;
    if (con <= 0) {
      return null;
    }
    rh1 = 0;
  }
  var theta = this.ns * Object(__WEBPACK_IMPORTED_MODULE_3__common_adjust_lon__["a" /* default */])(lon - this.long0);
  p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
  p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;

  return p;
}

// Lambert Conformal Conic inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
function inverse(p) {

  var rh1, con, ts;
  var lat, lon;
  var x = (p.x - this.x0) / this.k0;
  var y = (this.rh - (p.y - this.y0) / this.k0);
  if (this.ns > 0) {
    rh1 = Math.sqrt(x * x + y * y);
    con = 1;
  }
  else {
    rh1 = -Math.sqrt(x * x + y * y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2((con * x), (con * y));
  }
  if ((rh1 !== 0) || (this.ns > 0)) {
    con = 1 / this.ns;
    ts = Math.pow((rh1 / (this.a * this.f0)), con);
    lat = Object(__WEBPACK_IMPORTED_MODULE_4__common_phi2z__["a" /* default */])(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  }
  else {
    lat = -__WEBPACK_IMPORTED_MODULE_5__constants_values__["d" /* HALF_PI */];
  }
  lon = Object(__WEBPACK_IMPORTED_MODULE_3__common_adjust_lon__["a" /* default */])(theta / this.ns + this.long0);

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["Lambert Tangential Conformal Conic Projection", "Lambert_Conformal_Conic", "Lambert_Conformal_Conic_2SP", "lcc"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/longlat.js":
/*!*******************************************************!*\
  !*** ./node_modules/proj4/lib/projections/longlat.js ***!
  \*******************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
function init() {
  //no-op for longlat
}

function identity(pt) {
  return pt;
}


var names = ["longlat", "identity"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: identity,
  inverse: identity,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/merc.js":
/*!****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/merc.js ***!
  \****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_msfnz__ = __webpack_require__(/*! ../common/msfnz */ "./node_modules/proj4/lib/common/msfnz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_tsfnz__ = __webpack_require__(/*! ../common/tsfnz */ "./node_modules/proj4/lib/common/tsfnz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_phi2z__ = __webpack_require__(/*! ../common/phi2z */ "./node_modules/proj4/lib/common/phi2z.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");






function init() {
  var con = this.b / this.a;
  this.es = 1 - con * con;
  if(!('x0' in this)){
    this.x0 = 0;
  }
  if(!('y0' in this)){
    this.y0 = 0;
  }
  this.e = Math.sqrt(this.es);
  if (this.lat_ts) {
    if (this.sphere) {
      this.k0 = Math.cos(this.lat_ts);
    }
    else {
      this.k0 = Object(__WEBPACK_IMPORTED_MODULE_0__common_msfnz__["a" /* default */])(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
    }
  }
  else {
    if (!this.k0) {
      if (this.k) {
        this.k0 = this.k;
      }
      else {
        this.k0 = 1;
      }
    }
  }
}

/* Mercator forward equations--mapping lat,long to x,y
  --------------------------------------------------*/

function forward(p) {
  var lon = p.x;
  var lat = p.y;
  // convert to radians
  if (lat * __WEBPACK_IMPORTED_MODULE_4__constants_values__["i" /* R2D */] > 90 && lat * __WEBPACK_IMPORTED_MODULE_4__constants_values__["i" /* R2D */] < -90 && lon * __WEBPACK_IMPORTED_MODULE_4__constants_values__["i" /* R2D */] > 180 && lon * __WEBPACK_IMPORTED_MODULE_4__constants_values__["i" /* R2D */] < -180) {
    return null;
  }

  var x, y;
  if (Math.abs(Math.abs(lat) - __WEBPACK_IMPORTED_MODULE_4__constants_values__["d" /* HALF_PI */]) <= __WEBPACK_IMPORTED_MODULE_4__constants_values__["b" /* EPSLN */]) {
    return null;
  }
  else {
    if (this.sphere) {
      x = this.x0 + this.a * this.k0 * Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__["a" /* default */])(lon - this.long0);
      y = this.y0 + this.a * this.k0 * Math.log(Math.tan(__WEBPACK_IMPORTED_MODULE_4__constants_values__["c" /* FORTPI */] + 0.5 * lat));
    }
    else {
      var sinphi = Math.sin(lat);
      var ts = Object(__WEBPACK_IMPORTED_MODULE_2__common_tsfnz__["a" /* default */])(this.e, lat, sinphi);
      x = this.x0 + this.a * this.k0 * Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__["a" /* default */])(lon - this.long0);
      y = this.y0 - this.a * this.k0 * Math.log(ts);
    }
    p.x = x;
    p.y = y;
    return p;
  }
}

/* Mercator inverse equations--mapping x,y to lat/long
  --------------------------------------------------*/
function inverse(p) {

  var x = p.x - this.x0;
  var y = p.y - this.y0;
  var lon, lat;

  if (this.sphere) {
    lat = __WEBPACK_IMPORTED_MODULE_4__constants_values__["d" /* HALF_PI */] - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
  }
  else {
    var ts = Math.exp(-y / (this.a * this.k0));
    lat = Object(__WEBPACK_IMPORTED_MODULE_3__common_phi2z__["a" /* default */])(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  }
  lon = Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__["a" /* default */])(this.long0 + x / (this.a * this.k0));

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/mill.js":
/*!****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/mill.js ***!
  \****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");


/*
  reference
    "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
  */


/* Initialize the Miller Cylindrical projection
  -------------------------------------------*/
function init() {
  //no-op
}

/* Miller Cylindrical forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
function forward(p) {
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  var dlon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(lon - this.long0);
  var x = this.x0 + this.a * dlon;
  var y = this.y0 + this.a * Math.log(Math.tan((Math.PI / 4) + (lat / 2.5))) * 1.25;

  p.x = x;
  p.y = y;
  return p;
}

/* Miller Cylindrical inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
function inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;

  var lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + p.x / this.a);
  var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Math.PI / 4);

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["Miller_Cylindrical", "mill"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/moll.js":
/*!****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/moll.js ***!
  \****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");

function init() {}

/* Mollweide forward equations--mapping lat,long to x,y
    ----------------------------------------------------*/
function forward(p) {

  /* Forward equations
      -----------------*/
  var lon = p.x;
  var lat = p.y;

  var delta_lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(lon - this.long0);
  var theta = lat;
  var con = Math.PI * Math.sin(lat);

  /* Iterate using the Newton-Raphson method to find theta
      -----------------------------------------------------*/
  while (true) {
    var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
    theta += delta_theta;
    if (Math.abs(delta_theta) < __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
      break;
    }
  }
  theta /= 2;

  /* If the latitude is 90 deg, force the x coordinate to be "0 + false easting"
       this is done here because of precision problems with "cos(theta)"
       --------------------------------------------------------------------------*/
  if (Math.PI / 2 - Math.abs(lat) < __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
    delta_lon = 0;
  }
  var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
  var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;

  p.x = x;
  p.y = y;
  return p;
}

function inverse(p) {
  var theta;
  var arg;

  /* Inverse equations
      -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  arg = p.y / (1.4142135623731 * this.a);

  /* Because of division by zero problems, 'arg' can not be 1.  Therefore
       a number very close to one is used instead.
       -------------------------------------------------------------------*/
  if (Math.abs(arg) > 0.999999999999) {
    arg = 0.999999999999;
  }
  theta = Math.asin(arg);
  var lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + (p.x / (0.900316316158 * this.a * Math.cos(theta))));
  if (lon < (-Math.PI)) {
    lon = -Math.PI;
  }
  if (lon > Math.PI) {
    lon = Math.PI;
  }
  arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
  if (Math.abs(arg) > 1) {
    arg = 1;
  }
  var lat = Math.asin(arg);

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["Mollweide", "moll"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/nzmg.js":
/*!****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/nzmg.js ***!
  \****************************************************/
/*! exports provided: iterations, init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export iterations */
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");


/*
  reference
    Department of Land and Survey Technical Circular 1973/32
      http://www.linz.govt.nz/docs/miscellaneous/nz-map-definition.pdf
    OSG Technical Report 4.1
      http://www.linz.govt.nz/docs/miscellaneous/nzmg.pdf
  */

/**
 * iterations: Number of iterations to refine inverse transform.
 *     0 -> km accuracy
 *     1 -> m accuracy -- suitable for most mapping applications
 *     2 -> mm accuracy
 */
var iterations = 1;

function init() {
  this.A = [];
  this.A[1] = 0.6399175073;
  this.A[2] = -0.1358797613;
  this.A[3] = 0.063294409;
  this.A[4] = -0.02526853;
  this.A[5] = 0.0117879;
  this.A[6] = -0.0055161;
  this.A[7] = 0.0026906;
  this.A[8] = -0.001333;
  this.A[9] = 0.00067;
  this.A[10] = -0.00034;

  this.B_re = [];
  this.B_im = [];
  this.B_re[1] = 0.7557853228;
  this.B_im[1] = 0;
  this.B_re[2] = 0.249204646;
  this.B_im[2] = 0.003371507;
  this.B_re[3] = -0.001541739;
  this.B_im[3] = 0.041058560;
  this.B_re[4] = -0.10162907;
  this.B_im[4] = 0.01727609;
  this.B_re[5] = -0.26623489;
  this.B_im[5] = -0.36249218;
  this.B_re[6] = -0.6870983;
  this.B_im[6] = -1.1651967;

  this.C_re = [];
  this.C_im = [];
  this.C_re[1] = 1.3231270439;
  this.C_im[1] = 0;
  this.C_re[2] = -0.577245789;
  this.C_im[2] = -0.007809598;
  this.C_re[3] = 0.508307513;
  this.C_im[3] = -0.112208952;
  this.C_re[4] = -0.15094762;
  this.C_im[4] = 0.18200602;
  this.C_re[5] = 1.01418179;
  this.C_im[5] = 1.64497696;
  this.C_re[6] = 1.9660549;
  this.C_im[6] = 2.5127645;

  this.D = [];
  this.D[1] = 1.5627014243;
  this.D[2] = 0.5185406398;
  this.D[3] = -0.03333098;
  this.D[4] = -0.1052906;
  this.D[5] = -0.0368594;
  this.D[6] = 0.007317;
  this.D[7] = 0.01220;
  this.D[8] = 0.00394;
  this.D[9] = -0.0013;
}

/**
    New Zealand Map Grid Forward  - long/lat to x/y
    long/lat in radians
  */
function forward(p) {
  var n;
  var lon = p.x;
  var lat = p.y;

  var delta_lat = lat - this.lat0;
  var delta_lon = lon - this.long0;

  // 1. Calculate d_phi and d_psi    ...                          // and d_lambda
  // For this algorithm, delta_latitude is in seconds of arc x 10-5, so we need to scale to those units. Longitude is radians.
  var d_phi = delta_lat / __WEBPACK_IMPORTED_MODULE_0__constants_values__["l" /* SEC_TO_RAD */] * 1E-5;
  var d_lambda = delta_lon;
  var d_phi_n = 1; // d_phi^0

  var d_psi = 0;
  for (n = 1; n <= 10; n++) {
    d_phi_n = d_phi_n * d_phi;
    d_psi = d_psi + this.A[n] * d_phi_n;
  }

  // 2. Calculate theta
  var th_re = d_psi;
  var th_im = d_lambda;

  // 3. Calculate z
  var th_n_re = 1;
  var th_n_im = 0; // theta^0
  var th_n_re1;
  var th_n_im1;

  var z_re = 0;
  var z_im = 0;
  for (n = 1; n <= 6; n++) {
    th_n_re1 = th_n_re * th_re - th_n_im * th_im;
    th_n_im1 = th_n_im * th_re + th_n_re * th_im;
    th_n_re = th_n_re1;
    th_n_im = th_n_im1;
    z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
    z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
  }

  // 4. Calculate easting and northing
  p.x = (z_im * this.a) + this.x0;
  p.y = (z_re * this.a) + this.y0;

  return p;
}

/**
    New Zealand Map Grid Inverse  -  x/y to long/lat
  */
function inverse(p) {
  var n;
  var x = p.x;
  var y = p.y;

  var delta_x = x - this.x0;
  var delta_y = y - this.y0;

  // 1. Calculate z
  var z_re = delta_y / this.a;
  var z_im = delta_x / this.a;

  // 2a. Calculate theta - first approximation gives km accuracy
  var z_n_re = 1;
  var z_n_im = 0; // z^0
  var z_n_re1;
  var z_n_im1;

  var th_re = 0;
  var th_im = 0;
  for (n = 1; n <= 6; n++) {
    z_n_re1 = z_n_re * z_re - z_n_im * z_im;
    z_n_im1 = z_n_im * z_re + z_n_re * z_im;
    z_n_re = z_n_re1;
    z_n_im = z_n_im1;
    th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
    th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
  }

  // 2b. Iterate to refine the accuracy of the calculation
  //        0 iterations gives km accuracy
  //        1 iteration gives m accuracy -- good enough for most mapping applications
  //        2 iterations bives mm accuracy
  for (var i = 0; i < this.iterations; i++) {
    var th_n_re = th_re;
    var th_n_im = th_im;
    var th_n_re1;
    var th_n_im1;

    var num_re = z_re;
    var num_im = z_im;
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }

    th_n_re = 1;
    th_n_im = 0;
    var den_re = this.B_re[1];
    var den_im = this.B_im[1];
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }

    // Complex division
    var den2 = den_re * den_re + den_im * den_im;
    th_re = (num_re * den_re + num_im * den_im) / den2;
    th_im = (num_im * den_re - num_re * den_im) / den2;
  }

  // 3. Calculate d_phi              ...                                    // and d_lambda
  var d_psi = th_re;
  var d_lambda = th_im;
  var d_psi_n = 1; // d_psi^0

  var d_phi = 0;
  for (n = 1; n <= 9; n++) {
    d_psi_n = d_psi_n * d_psi;
    d_phi = d_phi + this.D[n] * d_psi_n;
  }

  // 4. Calculate latitude and longitude
  // d_phi is calcuated in second of arc * 10^-5, so we need to scale back to radians. d_lambda is in radians.
  var lat = this.lat0 + (d_phi * __WEBPACK_IMPORTED_MODULE_0__constants_values__["l" /* SEC_TO_RAD */] * 1E5);
  var lon = this.long0 + d_lambda;

  p.x = lon;
  p.y = lat;

  return p;
}

var names = ["New_Zealand_Map_Grid", "nzmg"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/omerc.js":
/*!*****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/omerc.js ***!
  \*****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_tsfnz__ = __webpack_require__(/*! ../common/tsfnz */ "./node_modules/proj4/lib/common/tsfnz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_phi2z__ = __webpack_require__(/*! ../common/phi2z */ "./node_modules/proj4/lib/common/phi2z.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");





/* Initialize the Oblique Mercator  projection
    ------------------------------------------*/
function init() {
  this.no_off = this.no_off || false;
  this.no_rot = this.no_rot || false;

  if (isNaN(this.k0)) {
    this.k0 = 1;
  }
  var sinlat = Math.sin(this.lat0);
  var coslat = Math.cos(this.lat0);
  var con = this.e * sinlat;

  this.bl = Math.sqrt(1 + this.es / (1 - this.es) * Math.pow(coslat, 4));
  this.al = this.a * this.bl * this.k0 * Math.sqrt(1 - this.es) / (1 - con * con);
  var t0 = Object(__WEBPACK_IMPORTED_MODULE_0__common_tsfnz__["a" /* default */])(this.e, this.lat0, sinlat);
  var dl = this.bl / coslat * Math.sqrt((1 - this.es) / (1 - con * con));
  if (dl * dl < 1) {
    dl = 1;
  }
  var fl;
  var gl;
  if (!isNaN(this.longc)) {
    //Central point and azimuth method

    if (this.lat0 >= 0) {
      fl = dl + Math.sqrt(dl * dl - 1);
    }
    else {
      fl = dl - Math.sqrt(dl * dl - 1);
    }
    this.el = fl * Math.pow(t0, this.bl);
    gl = 0.5 * (fl - 1 / fl);
    this.gamma0 = Math.asin(Math.sin(this.alpha) / dl);
    this.long0 = this.longc - Math.asin(gl * Math.tan(this.gamma0)) / this.bl;

  }
  else {
    //2 points method
    var t1 = Object(__WEBPACK_IMPORTED_MODULE_0__common_tsfnz__["a" /* default */])(this.e, this.lat1, Math.sin(this.lat1));
    var t2 = Object(__WEBPACK_IMPORTED_MODULE_0__common_tsfnz__["a" /* default */])(this.e, this.lat2, Math.sin(this.lat2));
    if (this.lat0 >= 0) {
      this.el = (dl + Math.sqrt(dl * dl - 1)) * Math.pow(t0, this.bl);
    }
    else {
      this.el = (dl - Math.sqrt(dl * dl - 1)) * Math.pow(t0, this.bl);
    }
    var hl = Math.pow(t1, this.bl);
    var ll = Math.pow(t2, this.bl);
    fl = this.el / hl;
    gl = 0.5 * (fl - 1 / fl);
    var jl = (this.el * this.el - ll * hl) / (this.el * this.el + ll * hl);
    var pl = (ll - hl) / (ll + hl);
    var dlon12 = Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__["a" /* default */])(this.long1 - this.long2);
    this.long0 = 0.5 * (this.long1 + this.long2) - Math.atan(jl * Math.tan(0.5 * this.bl * (dlon12)) / pl) / this.bl;
    this.long0 = Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__["a" /* default */])(this.long0);
    var dlon10 = Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__["a" /* default */])(this.long1 - this.long0);
    this.gamma0 = Math.atan(Math.sin(this.bl * (dlon10)) / gl);
    this.alpha = Math.asin(dl * Math.sin(this.gamma0));
  }

  if (this.no_off) {
    this.uc = 0;
  }
  else {
    if (this.lat0 >= 0) {
      this.uc = this.al / this.bl * Math.atan2(Math.sqrt(dl * dl - 1), Math.cos(this.alpha));
    }
    else {
      this.uc = -1 * this.al / this.bl * Math.atan2(Math.sqrt(dl * dl - 1), Math.cos(this.alpha));
    }
  }

}

/* Oblique Mercator forward equations--mapping lat,long to x,y
    ----------------------------------------------------------*/
function forward(p) {
  var lon = p.x;
  var lat = p.y;
  var dlon = Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__["a" /* default */])(lon - this.long0);
  var us, vs;
  var con;
  if (Math.abs(Math.abs(lat) - __WEBPACK_IMPORTED_MODULE_3__constants_values__["d" /* HALF_PI */]) <= __WEBPACK_IMPORTED_MODULE_3__constants_values__["b" /* EPSLN */]) {
    if (lat > 0) {
      con = -1;
    }
    else {
      con = 1;
    }
    vs = this.al / this.bl * Math.log(Math.tan(__WEBPACK_IMPORTED_MODULE_3__constants_values__["c" /* FORTPI */] + con * this.gamma0 * 0.5));
    us = -1 * con * __WEBPACK_IMPORTED_MODULE_3__constants_values__["d" /* HALF_PI */] * this.al / this.bl;
  }
  else {
    var t = Object(__WEBPACK_IMPORTED_MODULE_0__common_tsfnz__["a" /* default */])(this.e, lat, Math.sin(lat));
    var ql = this.el / Math.pow(t, this.bl);
    var sl = 0.5 * (ql - 1 / ql);
    var tl = 0.5 * (ql + 1 / ql);
    var vl = Math.sin(this.bl * (dlon));
    var ul = (sl * Math.sin(this.gamma0) - vl * Math.cos(this.gamma0)) / tl;
    if (Math.abs(Math.abs(ul) - 1) <= __WEBPACK_IMPORTED_MODULE_3__constants_values__["b" /* EPSLN */]) {
      vs = Number.POSITIVE_INFINITY;
    }
    else {
      vs = 0.5 * this.al * Math.log((1 - ul) / (1 + ul)) / this.bl;
    }
    if (Math.abs(Math.cos(this.bl * (dlon))) <= __WEBPACK_IMPORTED_MODULE_3__constants_values__["b" /* EPSLN */]) {
      us = this.al * this.bl * (dlon);
    }
    else {
      us = this.al * Math.atan2(sl * Math.cos(this.gamma0) + vl * Math.sin(this.gamma0), Math.cos(this.bl * dlon)) / this.bl;
    }
  }

  if (this.no_rot) {
    p.x = this.x0 + us;
    p.y = this.y0 + vs;
  }
  else {

    us -= this.uc;
    p.x = this.x0 + vs * Math.cos(this.alpha) + us * Math.sin(this.alpha);
    p.y = this.y0 + us * Math.cos(this.alpha) - vs * Math.sin(this.alpha);
  }
  return p;
}

function inverse(p) {
  var us, vs;
  if (this.no_rot) {
    vs = p.y - this.y0;
    us = p.x - this.x0;
  }
  else {
    vs = (p.x - this.x0) * Math.cos(this.alpha) - (p.y - this.y0) * Math.sin(this.alpha);
    us = (p.y - this.y0) * Math.cos(this.alpha) + (p.x - this.x0) * Math.sin(this.alpha);
    us += this.uc;
  }
  var qp = Math.exp(-1 * this.bl * vs / this.al);
  var sp = 0.5 * (qp - 1 / qp);
  var tp = 0.5 * (qp + 1 / qp);
  var vp = Math.sin(this.bl * us / this.al);
  var up = (vp * Math.cos(this.gamma0) + sp * Math.sin(this.gamma0)) / tp;
  var ts = Math.pow(this.el / Math.sqrt((1 + up) / (1 - up)), 1 / this.bl);
  if (Math.abs(up - 1) < __WEBPACK_IMPORTED_MODULE_3__constants_values__["b" /* EPSLN */]) {
    p.x = this.long0;
    p.y = __WEBPACK_IMPORTED_MODULE_3__constants_values__["d" /* HALF_PI */];
  }
  else if (Math.abs(up + 1) < __WEBPACK_IMPORTED_MODULE_3__constants_values__["b" /* EPSLN */]) {
    p.x = this.long0;
    p.y = -1 * __WEBPACK_IMPORTED_MODULE_3__constants_values__["d" /* HALF_PI */];
  }
  else {
    p.y = Object(__WEBPACK_IMPORTED_MODULE_2__common_phi2z__["a" /* default */])(this.e, ts);
    p.x = Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__["a" /* default */])(this.long0 - Math.atan2(sp * Math.cos(this.gamma0) - vp * Math.sin(this.gamma0), Math.cos(this.bl * us / this.al)) / this.bl);
  }
  return p;
}

var names = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "omerc"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/ortho.js":
/*!*****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/ortho.js ***!
  \*****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_asinz__ = __webpack_require__(/*! ../common/asinz */ "./node_modules/proj4/lib/common/asinz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");




function init() {
  //double temp;      /* temporary variable    */

  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.sin_p14 = Math.sin(this.lat0);
  this.cos_p14 = Math.cos(this.lat0);
}

/* Orthographic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
function forward(p) {
  var sinphi, cosphi; /* sin and cos value        */
  var dlon; /* delta longitude value      */
  var coslon; /* cos of longitude        */
  var ksp; /* scale factor          */
  var g, x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  dlon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(lon - this.long0);

  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);

  coslon = Math.cos(dlon);
  g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if ((g > 0) || (Math.abs(g) <= __WEBPACK_IMPORTED_MODULE_2__constants_values__["b" /* EPSLN */])) {
    x = this.a * ksp * cosphi * Math.sin(dlon);
    y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
  }
  p.x = x;
  p.y = y;
  return p;
}

function inverse(p) {
  var rh; /* height above ellipsoid      */
  var z; /* angle          */
  var sinz, cosz; /* sin of z and cos of z      */
  var con;
  var lon, lat;
  /* Inverse equations
      -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  rh = Math.sqrt(p.x * p.x + p.y * p.y);
  z = Object(__WEBPACK_IMPORTED_MODULE_1__common_asinz__["a" /* default */])(rh / this.a);

  sinz = Math.sin(z);
  cosz = Math.cos(z);

  lon = this.long0;
  if (Math.abs(rh) <= __WEBPACK_IMPORTED_MODULE_2__constants_values__["b" /* EPSLN */]) {
    lat = this.lat0;
    p.x = lon;
    p.y = lat;
    return p;
  }
  lat = Object(__WEBPACK_IMPORTED_MODULE_1__common_asinz__["a" /* default */])(cosz * this.sin_p14 + (p.y * sinz * this.cos_p14) / rh);
  con = Math.abs(this.lat0) - __WEBPACK_IMPORTED_MODULE_2__constants_values__["d" /* HALF_PI */];
  if (Math.abs(con) <= __WEBPACK_IMPORTED_MODULE_2__constants_values__["b" /* EPSLN */]) {
    if (this.lat0 >= 0) {
      lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + Math.atan2(p.x, - p.y));
    }
    else {
      lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 - Math.atan2(-p.x, p.y));
    }
    p.x = lon;
    p.y = lat;
    return p;
  }
  lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + Math.atan2((p.x * sinz), rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz));
  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["ortho"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/poly.js":
/*!****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/poly.js ***!
  \****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_e0fn__ = __webpack_require__(/*! ../common/e0fn */ "./node_modules/proj4/lib/common/e0fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_e1fn__ = __webpack_require__(/*! ../common/e1fn */ "./node_modules/proj4/lib/common/e1fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_e2fn__ = __webpack_require__(/*! ../common/e2fn */ "./node_modules/proj4/lib/common/e2fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_e3fn__ = __webpack_require__(/*! ../common/e3fn */ "./node_modules/proj4/lib/common/e3fn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_adjust_lat__ = __webpack_require__(/*! ../common/adjust_lat */ "./node_modules/proj4/lib/common/adjust_lat.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_mlfn__ = __webpack_require__(/*! ../common/mlfn */ "./node_modules/proj4/lib/common/mlfn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_gN__ = __webpack_require__(/*! ../common/gN */ "./node_modules/proj4/lib/common/gN.js");










var MAX_ITER = 20;

function init() {
  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2); // devait etre dans tmerc.js mais n y est pas donc je commente sinon retour de valeurs nulles
  this.e = Math.sqrt(this.es);
  this.e0 = Object(__WEBPACK_IMPORTED_MODULE_0__common_e0fn__["a" /* default */])(this.es);
  this.e1 = Object(__WEBPACK_IMPORTED_MODULE_1__common_e1fn__["a" /* default */])(this.es);
  this.e2 = Object(__WEBPACK_IMPORTED_MODULE_2__common_e2fn__["a" /* default */])(this.es);
  this.e3 = Object(__WEBPACK_IMPORTED_MODULE_3__common_e3fn__["a" /* default */])(this.es);
  this.ml0 = this.a * Object(__WEBPACK_IMPORTED_MODULE_6__common_mlfn__["a" /* default */])(this.e0, this.e1, this.e2, this.e3, this.lat0); //si que des zeros le calcul ne se fait pas
}

/* Polyconic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
function forward(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y, el;
  var dlon = Object(__WEBPACK_IMPORTED_MODULE_4__common_adjust_lon__["a" /* default */])(lon - this.long0);
  el = dlon * Math.sin(lat);
  if (this.sphere) {
    if (Math.abs(lat) <= __WEBPACK_IMPORTED_MODULE_7__constants_values__["b" /* EPSLN */]) {
      x = this.a * dlon;
      y = -1 * this.a * this.lat0;
    }
    else {
      x = this.a * Math.sin(el) / Math.tan(lat);
      y = this.a * (Object(__WEBPACK_IMPORTED_MODULE_5__common_adjust_lat__["a" /* default */])(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
    }
  }
  else {
    if (Math.abs(lat) <= __WEBPACK_IMPORTED_MODULE_7__constants_values__["b" /* EPSLN */]) {
      x = this.a * dlon;
      y = -1 * this.ml0;
    }
    else {
      var nl = Object(__WEBPACK_IMPORTED_MODULE_8__common_gN__["a" /* default */])(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
      x = nl * Math.sin(el);
      y = this.a * Object(__WEBPACK_IMPORTED_MODULE_6__common_mlfn__["a" /* default */])(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
    }

  }
  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
}

/* Inverse equations
  -----------------*/
function inverse(p) {
  var lon, lat, x, y, i;
  var al, bl;
  var phi, dphi;
  x = p.x - this.x0;
  y = p.y - this.y0;

  if (this.sphere) {
    if (Math.abs(y + this.a * this.lat0) <= __WEBPACK_IMPORTED_MODULE_7__constants_values__["b" /* EPSLN */]) {
      lon = Object(__WEBPACK_IMPORTED_MODULE_4__common_adjust_lon__["a" /* default */])(x / this.a + this.long0);
      lat = 0;
    }
    else {
      al = this.lat0 + y / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var tanphi;
      for (i = MAX_ITER; i; --i) {
        tanphi = Math.tan(phi);
        dphi = -1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
        phi += dphi;
        if (Math.abs(dphi) <= __WEBPACK_IMPORTED_MODULE_7__constants_values__["b" /* EPSLN */]) {
          lat = phi;
          break;
        }
      }
      lon = Object(__WEBPACK_IMPORTED_MODULE_4__common_adjust_lon__["a" /* default */])(this.long0 + (Math.asin(x * Math.tan(phi) / this.a)) / Math.sin(lat));
    }
  }
  else {
    if (Math.abs(y + this.ml0) <= __WEBPACK_IMPORTED_MODULE_7__constants_values__["b" /* EPSLN */]) {
      lat = 0;
      lon = Object(__WEBPACK_IMPORTED_MODULE_4__common_adjust_lon__["a" /* default */])(this.long0 + x / this.a);
    }
    else {

      al = (this.ml0 + y) / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var cl, mln, mlnp, ma;
      var con;
      for (i = MAX_ITER; i; --i) {
        con = this.e * Math.sin(phi);
        cl = Math.sqrt(1 - con * con) * Math.tan(phi);
        mln = this.a * Object(__WEBPACK_IMPORTED_MODULE_6__common_mlfn__["a" /* default */])(this.e0, this.e1, this.e2, this.e3, phi);
        mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
        ma = mln / this.a;
        dphi = (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
        phi -= dphi;
        if (Math.abs(dphi) <= __WEBPACK_IMPORTED_MODULE_7__constants_values__["b" /* EPSLN */]) {
          lat = phi;
          break;
        }
      }

      //lat=phi4z(this.e,this.e0,this.e1,this.e2,this.e3,al,bl,0,0);
      cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
      lon = Object(__WEBPACK_IMPORTED_MODULE_4__common_adjust_lon__["a" /* default */])(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat));
    }
  }

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["Polyconic", "poly"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/qsc.js":
/*!***************************************************!*\
  !*** ./node_modules/proj4/lib/projections/qsc.js ***!
  \***************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");
// QSC projection rewritten from the original PROJ4
// https://github.com/OSGeo/proj.4/blob/master/src/PJ_qsc.c



/* constants */
var FACE_ENUM = {
    FRONT: 1,
    RIGHT: 2,
    BACK: 3,
    LEFT: 4,
    TOP: 5,
    BOTTOM: 6
};

var AREA_ENUM = {
    AREA_0: 1,
    AREA_1: 2,
    AREA_2: 3,
    AREA_3: 4
};

function init() {

  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Quadrilateralized Spherical Cube";

  /* Determine the cube face from the center of projection. */
  if (this.lat0 >= __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] - __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */] / 2.0) {
    this.face = FACE_ENUM.TOP;
  } else if (this.lat0 <= -(__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] - __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */] / 2.0)) {
    this.face = FACE_ENUM.BOTTOM;
  } else if (Math.abs(this.long0) <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */]) {
    this.face = FACE_ENUM.FRONT;
  } else if (Math.abs(this.long0) <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */]) {
    this.face = this.long0 > 0.0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
  } else {
    this.face = FACE_ENUM.BACK;
  }

  /* Fill in useful values for the ellipsoid <-> sphere shift
   * described in [LK12]. */
  if (this.es !== 0) {
    this.one_minus_f = 1 - (this.a - this.b) / this.a;
    this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
  }
}

// QSC forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
function forward(p) {
  var xy = {x: 0, y: 0};
  var lat, lon;
  var theta, phi;
  var t, mu;
  /* nu; */
  var area = {value: 0};

  // move lon according to projection's lon
  p.x -= this.long0;

  /* Convert the geodetic latitude to a geocentric latitude.
   * This corresponds to the shift from the ellipsoid to the sphere
   * described in [LK12]. */
  if (this.es !== 0) {//if (P->es != 0) {
    lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y));
  } else {
    lat = p.y;
  }

  /* Convert the input lat, lon into theta, phi as used by QSC.
   * This depends on the cube face and the area on it.
   * For the top and bottom face, we can compute theta and phi
   * directly from phi, lam. For the other faces, we must use
   * unit sphere cartesian coordinates as an intermediate step. */
  lon = p.x; //lon = lp.lam;
  if (this.face === FACE_ENUM.TOP) {
    phi = __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] - lat;
    if (lon >= __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */] && lon <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */]) {
      area.value = AREA_ENUM.AREA_0;
      theta = lon - __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    } else if (lon > __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */] || lon <= -(__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */])) {
      area.value = AREA_ENUM.AREA_1;
      theta = (lon > 0.0 ? lon - __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */] : lon + __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */]);
    } else if (lon > -(__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */]) && lon <= -__WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */]) {
      area.value = AREA_ENUM.AREA_2;
      theta = lon + __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = lon;
    }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + lat;
    if (lon >= __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */] && lon <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */]) {
      area.value = AREA_ENUM.AREA_0;
      theta = -lon + __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    } else if (lon < __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */] && lon >= -__WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */]) {
      area.value = AREA_ENUM.AREA_1;
      theta = -lon;
    } else if (lon < -__WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */] && lon >= -(__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */])) {
      area.value = AREA_ENUM.AREA_2;
      theta = -lon - __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = (lon > 0.0 ? -lon + __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */] : -lon - __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */]);
    }
  } else {
    var q, r, s;
    var sinlat, coslat;
    var sinlon, coslon;

    if (this.face === FACE_ENUM.RIGHT) {
      lon = qsc_shift_lon_origin(lon, +__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */]);
    } else if (this.face === FACE_ENUM.BACK) {
      lon = qsc_shift_lon_origin(lon, +__WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */]);
    } else if (this.face === FACE_ENUM.LEFT) {
      lon = qsc_shift_lon_origin(lon, -__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */]);
    }
    sinlat = Math.sin(lat);
    coslat = Math.cos(lat);
    sinlon = Math.sin(lon);
    coslon = Math.cos(lon);
    q = coslat * coslon;
    r = coslat * sinlon;
    s = sinlat;

    if (this.face === FACE_ENUM.FRONT) {
      phi = Math.acos(q);
      theta = qsc_fwd_equat_face_theta(phi, s, r, area);
    } else if (this.face === FACE_ENUM.RIGHT) {
      phi = Math.acos(r);
      theta = qsc_fwd_equat_face_theta(phi, s, -q, area);
    } else if (this.face === FACE_ENUM.BACK) {
      phi = Math.acos(-q);
      theta = qsc_fwd_equat_face_theta(phi, s, -r, area);
    } else if (this.face === FACE_ENUM.LEFT) {
      phi = Math.acos(-r);
      theta = qsc_fwd_equat_face_theta(phi, s, q, area);
    } else {
      /* Impossible */
      phi = theta = 0;
      area.value = AREA_ENUM.AREA_0;
    }
  }

  /* Compute mu and nu for the area of definition.
   * For mu, see Eq. (3-21) in [OL76], but note the typos:
   * compare with Eq. (3-14). For nu, see Eq. (3-38). */
  mu = Math.atan((12 / __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */]) * (theta + Math.acos(Math.sin(theta) * Math.cos(__WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */])) - __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */]));
  t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));

  /* Apply the result to the real area. */
  if (area.value === AREA_ENUM.AREA_1) {
    mu += __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
  } else if (area.value === AREA_ENUM.AREA_2) {
    mu += __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */];
  } else if (area.value === AREA_ENUM.AREA_3) {
    mu += 1.5 * __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */];
  }

  /* Now compute x, y from mu and nu */
  xy.x = t * Math.cos(mu);
  xy.y = t * Math.sin(mu);
  xy.x = xy.x * this.a + this.x0;
  xy.y = xy.y * this.a + this.y0;

  p.x = xy.x;
  p.y = xy.y;
  return p;
}

// QSC inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
function inverse(p) {
  var lp = {lam: 0, phi: 0};
  var mu, nu, cosmu, tannu;
  var tantheta, theta, cosphi, phi;
  var t;
  var area = {value: 0};

  /* de-offset */
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;

  /* Convert the input x, y to the mu and nu angles as used by QSC.
   * This depends on the area of the cube face. */
  nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y));
  mu = Math.atan2(p.y, p.x);
  if (p.x >= 0.0 && p.x >= Math.abs(p.y)) {
    area.value = AREA_ENUM.AREA_0;
  } else if (p.y >= 0.0 && p.y >= Math.abs(p.x)) {
    area.value = AREA_ENUM.AREA_1;
    mu -= __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
  } else if (p.x < 0.0 && -p.x >= Math.abs(p.y)) {
    area.value = AREA_ENUM.AREA_2;
    mu = (mu < 0.0 ? mu + __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */] : mu - __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */]);
  } else {
    area.value = AREA_ENUM.AREA_3;
    mu += __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
  }

  /* Compute phi and theta for the area of definition.
   * The inverse projection is not described in the original paper, but some
   * good hints can be found here (as of 2011-12-14):
   * http://fits.gsfc.nasa.gov/fitsbits/saf.93/saf.9302
   * (search for "Message-Id: <9302181759.AA25477 at fits.cv.nrao.edu>") */
  t = (__WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */] / 12) * Math.tan(mu);
  tantheta = Math.sin(t) / (Math.cos(t) - (1 / Math.sqrt(2)));
  theta = Math.atan(tantheta);
  cosmu = Math.cos(mu);
  tannu = Math.tan(nu);
  cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
  if (cosphi < -1) {
    cosphi = -1;
  } else if (cosphi > +1) {
    cosphi = +1;
  }

  /* Apply the result to the real area on the cube face.
   * For the top and bottom face, we can compute phi and lam directly.
   * For the other faces, we must use unit sphere cartesian coordinates
   * as an intermediate step. */
  if (this.face === FACE_ENUM.TOP) {
    phi = Math.acos(cosphi);
    lp.phi = __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] - phi;
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = theta + __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = (theta < 0.0 ? theta + __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */] : theta - __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */]);
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = theta - __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    } else /* area.value == AREA_ENUM.AREA_3 */ {
      lp.lam = theta;
    }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = Math.acos(cosphi);
    lp.phi = phi - __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = -theta + __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = -theta;
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = -theta - __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    } else /* area.value == AREA_ENUM.AREA_3 */ {
      lp.lam = (theta < 0.0 ? -theta - __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */] : -theta + __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */]);
    }
  } else {
    /* Compute phi and lam via cartesian unit sphere coordinates. */
    var q, r, s;
    q = cosphi;
    t = q * q;
    if (t >= 1) {
      s = 0;
    } else {
      s = Math.sqrt(1 - t) * Math.sin(theta);
    }
    t += s * s;
    if (t >= 1) {
      r = 0;
    } else {
      r = Math.sqrt(1 - t);
    }
    /* Rotate q,r,s into the correct area. */
    if (area.value === AREA_ENUM.AREA_1) {
      t = r;
      r = -s;
      s = t;
    } else if (area.value === AREA_ENUM.AREA_2) {
      r = -r;
      s = -s;
    } else if (area.value === AREA_ENUM.AREA_3) {
      t = r;
      r = s;
      s = -t;
    }
    /* Rotate q,r,s into the correct cube face. */
    if (this.face === FACE_ENUM.RIGHT) {
      t = q;
      q = -r;
      r = t;
    } else if (this.face === FACE_ENUM.BACK) {
      q = -q;
      r = -r;
    } else if (this.face === FACE_ENUM.LEFT) {
      t = q;
      q = r;
      r = -t;
    }
    /* Now compute phi and lam from the unit sphere coordinates. */
    lp.phi = Math.acos(-s) - __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    lp.lam = Math.atan2(r, q);
    if (this.face === FACE_ENUM.RIGHT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */]);
    } else if (this.face === FACE_ENUM.BACK) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -__WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */]);
    } else if (this.face === FACE_ENUM.LEFT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, +__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */]);
    }
  }

  /* Apply the shift from the sphere to the ellipsoid as described
   * in [LK12]. */
  if (this.es !== 0) {
    var invert_sign;
    var tanphi, xa;
    invert_sign = (lp.phi < 0 ? 1 : 0);
    tanphi = Math.tan(lp.phi);
    xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared);
    lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa));
    if (invert_sign) {
      lp.phi = -lp.phi;
    }
  }

  lp.lam += this.long0;
  p.x = lp.lam;
  p.y = lp.phi;
  return p;
}

/* Helper function for forward projection: compute the theta angle
 * and determine the area number. */
function qsc_fwd_equat_face_theta(phi, y, x, area) {
  var theta;
  if (phi < __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
    area.value = AREA_ENUM.AREA_0;
    theta = 0.0;
  } else {
    theta = Math.atan2(y, x);
    if (Math.abs(theta) <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */]) {
      area.value = AREA_ENUM.AREA_0;
    } else if (theta > __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */] && theta <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */]) {
      area.value = AREA_ENUM.AREA_1;
      theta -= __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    } else if (theta > __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */] || theta <= -(__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + __WEBPACK_IMPORTED_MODULE_0__constants_values__["c" /* FORTPI */])) {
      area.value = AREA_ENUM.AREA_2;
      theta = (theta >= 0.0 ? theta - __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */] : theta + __WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */]);
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta += __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    }
  }
  return theta;
}

/* Helper function: shift the longitude. */
function qsc_shift_lon_origin(lon, offset) {
  var slon = lon + offset;
  if (slon < -__WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */]) {
    slon += __WEBPACK_IMPORTED_MODULE_0__constants_values__["o" /* TWO_PI */];
  } else if (slon > +__WEBPACK_IMPORTED_MODULE_0__constants_values__["n" /* SPI */]) {
    slon -= __WEBPACK_IMPORTED_MODULE_0__constants_values__["o" /* TWO_PI */];
  }
  return slon;
}

var names = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});



/***/ }),

/***/ "./node_modules/proj4/lib/projections/robin.js":
/*!*****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/robin.js ***!
  \*****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
// Robinson projection
// Based on https://github.com/OSGeo/proj.4/blob/master/src/PJ_robin.c
// Polynomial coeficients from http://article.gmane.org/gmane.comp.gis.proj-4.devel/6039




var COEFS_X = [
    [1.0000, 2.2199e-17, -7.15515e-05, 3.1103e-06],
    [0.9986, -0.000482243, -2.4897e-05, -1.3309e-06],
    [0.9954, -0.00083103, -4.48605e-05, -9.86701e-07],
    [0.9900, -0.00135364, -5.9661e-05, 3.6777e-06],
    [0.9822, -0.00167442, -4.49547e-06, -5.72411e-06],
    [0.9730, -0.00214868, -9.03571e-05, 1.8736e-08],
    [0.9600, -0.00305085, -9.00761e-05, 1.64917e-06],
    [0.9427, -0.00382792, -6.53386e-05, -2.6154e-06],
    [0.9216, -0.00467746, -0.00010457, 4.81243e-06],
    [0.8962, -0.00536223, -3.23831e-05, -5.43432e-06],
    [0.8679, -0.00609363, -0.000113898, 3.32484e-06],
    [0.8350, -0.00698325, -6.40253e-05, 9.34959e-07],
    [0.7986, -0.00755338, -5.00009e-05, 9.35324e-07],
    [0.7597, -0.00798324, -3.5971e-05, -2.27626e-06],
    [0.7186, -0.00851367, -7.01149e-05, -8.6303e-06],
    [0.6732, -0.00986209, -0.000199569, 1.91974e-05],
    [0.6213, -0.010418, 8.83923e-05, 6.24051e-06],
    [0.5722, -0.00906601, 0.000182, 6.24051e-06],
    [0.5322, -0.00677797, 0.000275608, 6.24051e-06]
];

var COEFS_Y = [
    [-5.20417e-18, 0.0124, 1.21431e-18, -8.45284e-11],
    [0.0620, 0.0124, -1.26793e-09, 4.22642e-10],
    [0.1240, 0.0124, 5.07171e-09, -1.60604e-09],
    [0.1860, 0.0123999, -1.90189e-08, 6.00152e-09],
    [0.2480, 0.0124002, 7.10039e-08, -2.24e-08],
    [0.3100, 0.0123992, -2.64997e-07, 8.35986e-08],
    [0.3720, 0.0124029, 9.88983e-07, -3.11994e-07],
    [0.4340, 0.0123893, -3.69093e-06, -4.35621e-07],
    [0.4958, 0.0123198, -1.02252e-05, -3.45523e-07],
    [0.5571, 0.0121916, -1.54081e-05, -5.82288e-07],
    [0.6176, 0.0119938, -2.41424e-05, -5.25327e-07],
    [0.6769, 0.011713, -3.20223e-05, -5.16405e-07],
    [0.7346, 0.0113541, -3.97684e-05, -6.09052e-07],
    [0.7903, 0.0109107, -4.89042e-05, -1.04739e-06],
    [0.8435, 0.0103431, -6.4615e-05, -1.40374e-09],
    [0.8936, 0.00969686, -6.4636e-05, -8.547e-06],
    [0.9394, 0.00840947, -0.000192841, -4.2106e-06],
    [0.9761, 0.00616527, -0.000256, -4.2106e-06],
    [1.0000, 0.00328947, -0.000319159, -4.2106e-06]
];

var FXC = 0.8487;
var FYC = 1.3523;
var C1 = __WEBPACK_IMPORTED_MODULE_0__constants_values__["i" /* R2D */]/5; // rad to 5-degree interval
var RC1 = 1/C1;
var NODES = 18;

var poly3_val = function(coefs, x) {
    return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]));
};

var poly3_der = function(coefs, x) {
    return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3]);
};

function newton_rapshon(f_df, start, max_err, iters) {
    var x = start;
    for (; iters; --iters) {
        var upd = f_df(x);
        x -= upd;
        if (Math.abs(upd) < max_err) {
            break;
        }
    }
    return x;
}

function init() {
    this.x0 = this.x0 || 0;
    this.y0 = this.y0 || 0;
    this.long0 = this.long0 || 0;
    this.es = 0;
    this.title = this.title || "Robinson";
}

function forward(ll) {
    var lon = Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__["a" /* default */])(ll.x - this.long0);

    var dphi = Math.abs(ll.y);
    var i = Math.floor(dphi * C1);
    if (i < 0) {
        i = 0;
    } else if (i >= NODES) {
        i = NODES - 1;
    }
    dphi = __WEBPACK_IMPORTED_MODULE_0__constants_values__["i" /* R2D */] * (dphi - RC1 * i);
    var xy = {
        x: poly3_val(COEFS_X[i], dphi) * lon,
        y: poly3_val(COEFS_Y[i], dphi)
    };
    if (ll.y < 0) {
        xy.y = -xy.y;
    }

    xy.x = xy.x * this.a * FXC + this.x0;
    xy.y = xy.y * this.a * FYC + this.y0;
    return xy;
}

function inverse(xy) {
    var ll = {
        x: (xy.x - this.x0) / (this.a * FXC),
        y: Math.abs(xy.y - this.y0) / (this.a * FYC)
    };

    if (ll.y >= 1) { // pathologic case
        ll.x /= COEFS_X[NODES][0];
        ll.y = xy.y < 0 ? -__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] : __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    } else {
        // find table interval
        var i = Math.floor(ll.y * NODES);
        if (i < 0) {
            i = 0;
        } else if (i >= NODES) {
            i = NODES - 1;
        }
        for (;;) {
            if (COEFS_Y[i][0] > ll.y) {
                --i;
            } else if (COEFS_Y[i+1][0] <= ll.y) {
                ++i;
            } else {
                break;
            }
        }
        // linear interpolation in 5 degree interval
        var coefs = COEFS_Y[i];
        var t = 5 * (ll.y - coefs[0]) / (COEFS_Y[i+1][0] - coefs[0]);
        // find t so that poly3_val(coefs, t) = ll.y
        t = newton_rapshon(function(x) {
            return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x);
        }, t, __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */], 100);

        ll.x /= poly3_val(COEFS_X[i], t);
        ll.y = (5 * i + t) * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */];
        if (xy.y < 0) {
            ll.y = -ll.y;
        }
    }

    ll.x = Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__["a" /* default */])(ll.x + this.long0);
    return ll;
}

var names = ["Robinson", "robin"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/sinu.js":
/*!****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/sinu.js ***!
  \****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_adjust_lat__ = __webpack_require__(/*! ../common/adjust_lat */ "./node_modules/proj4/lib/common/adjust_lat.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_pj_enfn__ = __webpack_require__(/*! ../common/pj_enfn */ "./node_modules/proj4/lib/common/pj_enfn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_pj_mlfn__ = __webpack_require__(/*! ../common/pj_mlfn */ "./node_modules/proj4/lib/common/pj_mlfn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_pj_inv_mlfn__ = __webpack_require__(/*! ../common/pj_inv_mlfn */ "./node_modules/proj4/lib/common/pj_inv_mlfn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_asinz__ = __webpack_require__(/*! ../common/asinz */ "./node_modules/proj4/lib/common/asinz.js");



var MAX_ITER = 20;







function init() {
  /* Place parameters in static storage for common use
    -------------------------------------------------*/


  if (!this.sphere) {
    this.en = Object(__WEBPACK_IMPORTED_MODULE_2__common_pj_enfn__["a" /* default */])(this.es);
  }
  else {
    this.n = 1;
    this.m = 0;
    this.es = 0;
    this.C_y = Math.sqrt((this.m + 1) / this.n);
    this.C_x = this.C_y / (this.m + 1);
  }

}

/* Sinusoidal forward equations--mapping lat,long to x,y
  -----------------------------------------------------*/
function forward(p) {
  var x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
    -----------------*/
  lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(lon - this.long0);

  if (this.sphere) {
    if (!this.m) {
      lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
    }
    else {
      var k = this.n * Math.sin(lat);
      for (var i = MAX_ITER; i; --i) {
        var V = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
        lat -= V;
        if (Math.abs(V) < __WEBPACK_IMPORTED_MODULE_5__constants_values__["b" /* EPSLN */]) {
          break;
        }
      }
    }
    x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
    y = this.a * this.C_y * lat;

  }
  else {

    var s = Math.sin(lat);
    var c = Math.cos(lat);
    y = this.a * Object(__WEBPACK_IMPORTED_MODULE_3__common_pj_mlfn__["a" /* default */])(lat, s, c, this.en);
    x = this.a * lon * c / Math.sqrt(1 - this.es * s * s);
  }

  p.x = x;
  p.y = y;
  return p;
}

function inverse(p) {
  var lat, temp, lon, s;

  p.x -= this.x0;
  lon = p.x / this.a;
  p.y -= this.y0;
  lat = p.y / this.a;

  if (this.sphere) {
    lat /= this.C_y;
    lon = lon / (this.C_x * (this.m + Math.cos(lat)));
    if (this.m) {
      lat = Object(__WEBPACK_IMPORTED_MODULE_6__common_asinz__["a" /* default */])((this.m * lat + Math.sin(lat)) / this.n);
    }
    else if (this.n !== 1) {
      lat = Object(__WEBPACK_IMPORTED_MODULE_6__common_asinz__["a" /* default */])(Math.sin(lat) / this.n);
    }
    lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(lon + this.long0);
    lat = Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lat__["a" /* default */])(lat);
  }
  else {
    lat = Object(__WEBPACK_IMPORTED_MODULE_4__common_pj_inv_mlfn__["a" /* default */])(p.y / this.a, this.es, this.en);
    s = Math.abs(lat);
    if (s < __WEBPACK_IMPORTED_MODULE_5__constants_values__["d" /* HALF_PI */]) {
      s = Math.sin(lat);
      temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
      //temp = this.long0 + p.x / (this.a * Math.cos(lat));
      lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(temp);
    }
    else if ((s - __WEBPACK_IMPORTED_MODULE_5__constants_values__["b" /* EPSLN */]) < __WEBPACK_IMPORTED_MODULE_5__constants_values__["d" /* HALF_PI */]) {
      lon = this.long0;
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["Sinusoidal", "sinu"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/somerc.js":
/*!******************************************************!*\
  !*** ./node_modules/proj4/lib/projections/somerc.js ***!
  \******************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/*
  references:
    Formules et constantes pour le Calcul pour la
    projection cylindrique conforme à axe oblique et pour la transformation entre
    des systèmes de référence.
    http://www.swisstopo.admin.ch/internet/swisstopo/fr/home/topics/survey/sys/refsys/switzerland.parsysrelated1.31216.downloadList.77004.DownloadFile.tmp/swissprojectionfr.pdf
  */

function init() {
  var phy0 = this.lat0;
  this.lambda0 = this.long0;
  var sinPhy0 = Math.sin(phy0);
  var semiMajorAxis = this.a;
  var invF = this.rf;
  var flattening = 1 / invF;
  var e2 = 2 * flattening - Math.pow(flattening, 2);
  var e = this.e = Math.sqrt(e2);
  this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
  this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
  this.b0 = Math.asin(sinPhy0 / this.alpha);
  var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
  var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
  var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
  this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
}

function forward(p) {
  var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2));
  var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)));
  var S = -this.alpha * (Sa1 + Sa2) + this.K;

  // spheric latitude
  var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);

  // spheric longitude
  var I = this.alpha * (p.x - this.lambda0);

  // psoeudo equatorial rotation
  var rotI = Math.atan(Math.sin(I) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I)));

  var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I));

  p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
  p.x = this.R * rotI + this.x0;
  return p;
}

function inverse(p) {
  var Y = p.x - this.x0;
  var X = p.y - this.y0;

  var rotI = Y / this.R;
  var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);

  var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
  var I = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));

  var lambda = this.lambda0 + I / this.alpha;

  var S = 0;
  var phy = b;
  var prevPhy = -1000;
  var iteration = 0;
  while (Math.abs(phy - prevPhy) > 0.0000001) {
    if (++iteration > 20) {
      //...reportError("omercFwdInfinity");
      return;
    }
    //S = Math.log(Math.tan(Math.PI / 4 + phy / 2));
    S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
    prevPhy = phy;
    phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
  }

  p.x = lambda;
  p.y = phy;
  return p;
}

var names = ["somerc"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/stere.js":
/*!*****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/stere.js ***!
  \*****************************************************/
/*! exports provided: ssfn_, init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ssfn_ */
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_sign__ = __webpack_require__(/*! ../common/sign */ "./node_modules/proj4/lib/common/sign.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_msfnz__ = __webpack_require__(/*! ../common/msfnz */ "./node_modules/proj4/lib/common/msfnz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_tsfnz__ = __webpack_require__(/*! ../common/tsfnz */ "./node_modules/proj4/lib/common/tsfnz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_phi2z__ = __webpack_require__(/*! ../common/phi2z */ "./node_modules/proj4/lib/common/phi2z.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");








function ssfn_(phit, sinphi, eccen) {
  sinphi *= eccen;
  return (Math.tan(0.5 * (__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen));
}

function init() {
  this.coslat0 = Math.cos(this.lat0);
  this.sinlat0 = Math.sin(this.lat0);
  if (this.sphere) {
    if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
      this.k0 = 0.5 * (1 + Object(__WEBPACK_IMPORTED_MODULE_1__common_sign__["a" /* default */])(this.lat0) * Math.sin(this.lat_ts));
    }
  }
  else {
    if (Math.abs(this.coslat0) <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
      if (this.lat0 > 0) {
        //North pole
        //trace('stere:north pole');
        this.con = 1;
      }
      else {
        //South pole
        //trace('stere:south pole');
        this.con = -1;
      }
    }
    this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
    if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
      this.k0 = 0.5 * this.cons * Object(__WEBPACK_IMPORTED_MODULE_2__common_msfnz__["a" /* default */])(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / Object(__WEBPACK_IMPORTED_MODULE_3__common_tsfnz__["a" /* default */])(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
    }
    this.ms1 = Object(__WEBPACK_IMPORTED_MODULE_2__common_msfnz__["a" /* default */])(this.e, this.sinlat0, this.coslat0);
    this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    this.cosX0 = Math.cos(this.X0);
    this.sinX0 = Math.sin(this.X0);
  }
}

// Stereographic forward equations--mapping lat,long to x,y
function forward(p) {
  var lon = p.x;
  var lat = p.y;
  var sinlat = Math.sin(lat);
  var coslat = Math.cos(lat);
  var A, X, sinX, cosX, ts, rh;
  var dlon = Object(__WEBPACK_IMPORTED_MODULE_5__common_adjust_lon__["a" /* default */])(lon - this.long0);

  if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */] && Math.abs(lat + this.lat0) <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
    //case of the origine point
    //trace('stere:this is the origin point');
    p.x = NaN;
    p.y = NaN;
    return p;
  }
  if (this.sphere) {
    //trace('stere:sphere case');
    A = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
    p.x = this.a * A * coslat * Math.sin(dlon) + this.x0;
    p.y = this.a * A * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
    return p;
  }
  else {
    X = 2 * Math.atan(this.ssfn_(lat, sinlat, this.e)) - __WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */];
    cosX = Math.cos(X);
    sinX = Math.sin(X);
    if (Math.abs(this.coslat0) <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
      ts = Object(__WEBPACK_IMPORTED_MODULE_3__common_tsfnz__["a" /* default */])(this.e, lat * this.con, this.con * sinlat);
      rh = 2 * this.a * this.k0 * ts / this.cons;
      p.x = this.x0 + rh * Math.sin(lon - this.long0);
      p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
      //trace(p.toString());
      return p;
    }
    else if (Math.abs(this.sinlat0) < __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
      //Eq
      //trace('stere:equateur');
      A = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
      p.y = A * sinX;
    }
    else {
      //other case
      //trace('stere:normal case');
      A = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
      p.y = A * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
    }
    p.x = A * cosX * Math.sin(dlon) + this.x0;
  }
  //trace(p.toString());
  return p;
}

//* Stereographic inverse equations--mapping x,y to lat/long
function inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat, ts, ce, Chi;
  var rh = Math.sqrt(p.x * p.x + p.y * p.y);
  if (this.sphere) {
    var c = 2 * Math.atan(rh / (2 * this.a * this.k0));
    lon = this.long0;
    lat = this.lat0;
    if (rh <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
      p.x = lon;
      p.y = lat;
      return p;
    }
    lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh);
    if (Math.abs(this.coslat0) < __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
      if (this.lat0 > 0) {
        lon = Object(__WEBPACK_IMPORTED_MODULE_5__common_adjust_lon__["a" /* default */])(this.long0 + Math.atan2(p.x, - 1 * p.y));
      }
      else {
        lon = Object(__WEBPACK_IMPORTED_MODULE_5__common_adjust_lon__["a" /* default */])(this.long0 + Math.atan2(p.x, p.y));
      }
    }
    else {
      lon = Object(__WEBPACK_IMPORTED_MODULE_5__common_adjust_lon__["a" /* default */])(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)));
    }
    p.x = lon;
    p.y = lat;
    return p;
  }
  else {
    if (Math.abs(this.coslat0) <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
      if (rh <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
        lat = this.lat0;
        lon = this.long0;
        p.x = lon;
        p.y = lat;
        //trace(p.toString());
        return p;
      }
      p.x *= this.con;
      p.y *= this.con;
      ts = rh * this.cons / (2 * this.a * this.k0);
      lat = this.con * Object(__WEBPACK_IMPORTED_MODULE_4__common_phi2z__["a" /* default */])(this.e, ts);
      lon = this.con * Object(__WEBPACK_IMPORTED_MODULE_5__common_adjust_lon__["a" /* default */])(this.con * this.long0 + Math.atan2(p.x, - 1 * p.y));
    }
    else {
      ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
      lon = this.long0;
      if (rh <= __WEBPACK_IMPORTED_MODULE_0__constants_values__["b" /* EPSLN */]) {
        Chi = this.X0;
      }
      else {
        Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
        lon = Object(__WEBPACK_IMPORTED_MODULE_5__common_adjust_lon__["a" /* default */])(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)));
      }
      lat = -1 * Object(__WEBPACK_IMPORTED_MODULE_4__common_phi2z__["a" /* default */])(this.e, Math.tan(0.5 * (__WEBPACK_IMPORTED_MODULE_0__constants_values__["d" /* HALF_PI */] + Chi)));
    }
  }
  p.x = lon;
  p.y = lat;

  //trace(p.toString());
  return p;

}

var names = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names,
  ssfn_: ssfn_
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/sterea.js":
/*!******************************************************!*\
  !*** ./node_modules/proj4/lib/projections/sterea.js ***!
  \******************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gauss__ = __webpack_require__(/*! ./gauss */ "./node_modules/proj4/lib/projections/gauss.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");



function init() {
  __WEBPACK_IMPORTED_MODULE_0__gauss__["a" /* default */].init.apply(this);
  if (!this.rc) {
    return;
  }
  this.sinc0 = Math.sin(this.phic0);
  this.cosc0 = Math.cos(this.phic0);
  this.R2 = 2 * this.rc;
  if (!this.title) {
    this.title = "Oblique Stereographic Alternative";
  }
}

function forward(p) {
  var sinc, cosc, cosl, k;
  p.x = Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__["a" /* default */])(p.x - this.long0);
  __WEBPACK_IMPORTED_MODULE_0__gauss__["a" /* default */].forward.apply(this, [p]);
  sinc = Math.sin(p.y);
  cosc = Math.cos(p.y);
  cosl = Math.cos(p.x);
  k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
  p.x = k * cosc * Math.sin(p.x);
  p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
  p.x = this.a * p.x + this.x0;
  p.y = this.a * p.y + this.y0;
  return p;
}

function inverse(p) {
  var sinc, cosc, lon, lat, rho;
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;

  p.x /= this.k0;
  p.y /= this.k0;
  if ((rho = Math.sqrt(p.x * p.x + p.y * p.y))) {
    var c = 2 * Math.atan2(rho, this.R2);
    sinc = Math.sin(c);
    cosc = Math.cos(c);
    lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
    lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
  }
  else {
    lat = this.phic0;
    lon = 0;
  }

  p.x = lon;
  p.y = lat;
  __WEBPACK_IMPORTED_MODULE_0__gauss__["a" /* default */].inverse.apply(this, [p]);
  p.x = Object(__WEBPACK_IMPORTED_MODULE_1__common_adjust_lon__["a" /* default */])(p.x + this.long0);
  return p;
}

var names = ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea","Oblique Stereographic Alternative","Double_Stereographic"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/tmerc.js":
/*!*****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/tmerc.js ***!
  \*****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_pj_enfn__ = __webpack_require__(/*! ../common/pj_enfn */ "./node_modules/proj4/lib/common/pj_enfn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_pj_mlfn__ = __webpack_require__(/*! ../common/pj_mlfn */ "./node_modules/proj4/lib/common/pj_mlfn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_pj_inv_mlfn__ = __webpack_require__(/*! ../common/pj_inv_mlfn */ "./node_modules/proj4/lib/common/pj_inv_mlfn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_sign__ = __webpack_require__(/*! ../common/sign */ "./node_modules/proj4/lib/common/sign.js");
// Heavily based on this tmerc projection implementation
// https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/tmerc.js









function init() {
  this.x0 = this.x0 !== undefined ? this.x0 : 0;
  this.y0 = this.y0 !== undefined ? this.y0 : 0;
  this.long0 = this.long0 !== undefined ? this.long0 : 0;
  this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;

  if (this.es) {
    this.en = Object(__WEBPACK_IMPORTED_MODULE_0__common_pj_enfn__["a" /* default */])(this.es);
    this.ml0 = Object(__WEBPACK_IMPORTED_MODULE_1__common_pj_mlfn__["a" /* default */])(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
  }
}

/**
    Transverse Mercator Forward  - long/lat to x/y
    long/lat in radians
  */
function forward(p) {
  var lon = p.x;
  var lat = p.y;

  var delta_lon = Object(__WEBPACK_IMPORTED_MODULE_3__common_adjust_lon__["a" /* default */])(lon - this.long0);
  var con;
  var x, y;
  var sin_phi = Math.sin(lat);
  var cos_phi = Math.cos(lat);

  if (!this.es) {
    var b = cos_phi * Math.sin(delta_lon);

    if ((Math.abs(Math.abs(b) - 1)) < __WEBPACK_IMPORTED_MODULE_4__constants_values__["b" /* EPSLN */]) {
      return (93);
    }
    else {
      x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0;
      y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b, 2));
      b = Math.abs(y);

      if (b >= 1) {
        if ((b - 1) > __WEBPACK_IMPORTED_MODULE_4__constants_values__["b" /* EPSLN */]) {
          return (93);
        }
        else {
          y = 0;
        }
      }
      else {
        y = Math.acos(y);
      }

      if (lat < 0) {
        y = -y;
      }

      y = this.a * this.k0 * (y - this.lat0) + this.y0;
    }
  }
  else {
    var al = cos_phi * delta_lon;
    var als = Math.pow(al, 2);
    var c = this.ep2 * Math.pow(cos_phi, 2);
    var cs = Math.pow(c, 2);
    var tq = Math.abs(cos_phi) > __WEBPACK_IMPORTED_MODULE_4__constants_values__["b" /* EPSLN */] ? Math.tan(lat) : 0;
    var t = Math.pow(tq, 2);
    var ts = Math.pow(t, 2);
    con = 1 - this.es * Math.pow(sin_phi, 2);
    al = al / Math.sqrt(con);
    var ml = Object(__WEBPACK_IMPORTED_MODULE_1__common_pj_mlfn__["a" /* default */])(lat, sin_phi, cos_phi, this.en);

    x = this.a * (this.k0 * al * (1 +
      als / 6 * (1 - t + c +
      als / 20 * (5 - 18 * t + ts + 14 * c - 58 * t * c +
      als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) +
      this.x0;

    y = this.a * (this.k0 * (ml - this.ml0 +
      sin_phi * delta_lon * al / 2 * (1 +
      als / 12 * (5 - t + 9 * c + 4 * cs +
      als / 30 * (61 + ts - 58 * t + 270 * c - 330 * t * c +
      als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) +
      this.y0;
  }

  p.x = x;
  p.y = y;

  return p;
}

/**
    Transverse Mercator Inverse  -  x/y to long/lat
  */
function inverse(p) {
  var con, phi;
  var lat, lon;
  var x = (p.x - this.x0) * (1 / this.a);
  var y = (p.y - this.y0) * (1 / this.a);

  if (!this.es) {
    var f = Math.exp(x / this.k0);
    var g = 0.5 * (f - 1 / f);
    var temp = this.lat0 + y / this.k0;
    var h = Math.cos(temp);
    con = Math.sqrt((1 - Math.pow(h, 2)) / (1 + Math.pow(g, 2)));
    lat = Math.asin(con);

    if (y < 0) {
      lat = -lat;
    }

    if ((g === 0) && (h === 0)) {
      lon = 0;
    }
    else {
      lon = Object(__WEBPACK_IMPORTED_MODULE_3__common_adjust_lon__["a" /* default */])(Math.atan2(g, h) + this.long0);
    }
  }
  else { // ellipsoidal form
    con = this.ml0 + y / this.k0;
    phi = Object(__WEBPACK_IMPORTED_MODULE_2__common_pj_inv_mlfn__["a" /* default */])(con, this.es, this.en);

    if (Math.abs(phi) < __WEBPACK_IMPORTED_MODULE_4__constants_values__["d" /* HALF_PI */]) {
      var sin_phi = Math.sin(phi);
      var cos_phi = Math.cos(phi);
      var tan_phi = Math.abs(cos_phi) > __WEBPACK_IMPORTED_MODULE_4__constants_values__["b" /* EPSLN */] ? Math.tan(phi) : 0;
      var c = this.ep2 * Math.pow(cos_phi, 2);
      var cs = Math.pow(c, 2);
      var t = Math.pow(tan_phi, 2);
      var ts = Math.pow(t, 2);
      con = 1 - this.es * Math.pow(sin_phi, 2);
      var d = x * Math.sqrt(con) / this.k0;
      var ds = Math.pow(d, 2);
      con = con * tan_phi;

      lat = phi - (con * ds / (1 - this.es)) * 0.5 * (1 -
        ds / 12 * (5 + 3 * t - 9 * c * t + c - 4 * cs -
        ds / 30 * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c -
        ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));

      lon = Object(__WEBPACK_IMPORTED_MODULE_3__common_adjust_lon__["a" /* default */])(this.long0 + (d * (1 -
        ds / 6 * (1 + 2 * t + c -
        ds / 20 * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c -
        ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi));
    }
    else {
      lat = __WEBPACK_IMPORTED_MODULE_4__constants_values__["d" /* HALF_PI */] * Object(__WEBPACK_IMPORTED_MODULE_5__common_sign__["a" /* default */])(y);
      lon = 0;
    }
  }

  p.x = lon;
  p.y = lat;

  return p;
}

var names = ["Transverse_Mercator", "Transverse Mercator", "tmerc"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/utm.js":
/*!***************************************************!*\
  !*** ./node_modules/proj4/lib/projections/utm.js ***!
  \***************************************************/
/*! exports provided: dependsOn, init, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export dependsOn */
/* unused harmony export init */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_adjust_zone__ = __webpack_require__(/*! ../common/adjust_zone */ "./node_modules/proj4/lib/common/adjust_zone.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__etmerc__ = __webpack_require__(/*! ./etmerc */ "./node_modules/proj4/lib/projections/etmerc.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");


var dependsOn = 'etmerc';



function init() {
  var zone = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_zone__["a" /* default */])(this.zone, this.long0);
  if (zone === undefined) {
    throw new Error('unknown utm zone');
  }
  this.lat0 = 0;
  this.long0 =  ((6 * Math.abs(zone)) - 183) * __WEBPACK_IMPORTED_MODULE_2__constants_values__["a" /* D2R */];
  this.x0 = 500000;
  this.y0 = this.utmSouth ? 10000000 : 0;
  this.k0 = 0.9996;

  __WEBPACK_IMPORTED_MODULE_1__etmerc__["a" /* default */].init.apply(this);
  this.forward = __WEBPACK_IMPORTED_MODULE_1__etmerc__["a" /* default */].forward;
  this.inverse = __WEBPACK_IMPORTED_MODULE_1__etmerc__["a" /* default */].inverse;
}

var names = ["Universal Transverse Mercator System", "utm"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  names: names,
  dependsOn: dependsOn
});


/***/ }),

/***/ "./node_modules/proj4/lib/projections/vandg.js":
/*!*****************************************************!*\
  !*** ./node_modules/proj4/lib/projections/vandg.js ***!
  \*****************************************************/
/*! exports provided: init, forward, inverse, names, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* unused harmony export forward */
/* unused harmony export inverse */
/* unused harmony export names */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__ = __webpack_require__(/*! ../common/adjust_lon */ "./node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_values__ = __webpack_require__(/*! ../constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_asinz__ = __webpack_require__(/*! ../common/asinz */ "./node_modules/proj4/lib/common/asinz.js");






/* Initialize the Van Der Grinten projection
  ----------------------------------------*/
function init() {
  //this.R = 6370997; //Radius of earth
  this.R = this.a;
}

function forward(p) {

  var lon = p.x;
  var lat = p.y;

  /* Forward equations
    -----------------*/
  var dlon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(lon - this.long0);
  var x, y;

  if (Math.abs(lat) <= __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
    x = this.x0 + this.R * dlon;
    y = this.y0;
  }
  var theta = Object(__WEBPACK_IMPORTED_MODULE_2__common_asinz__["a" /* default */])(2 * Math.abs(lat / Math.PI));
  if ((Math.abs(dlon) <= __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) || (Math.abs(Math.abs(lat) - __WEBPACK_IMPORTED_MODULE_1__constants_values__["d" /* HALF_PI */]) <= __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */])) {
    x = this.x0;
    if (lat >= 0) {
      y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
    }
    else {
      y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
    }
    //  return(OK);
  }
  var al = 0.5 * Math.abs((Math.PI / dlon) - (dlon / Math.PI));
  var asq = al * al;
  var sinth = Math.sin(theta);
  var costh = Math.cos(theta);

  var g = costh / (sinth + costh - 1);
  var gsq = g * g;
  var m = g * (2 / sinth - 1);
  var msq = m * m;
  var con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
  if (dlon < 0) {
    con = -con;
  }
  x = this.x0 + con;
  //con = Math.abs(con / (Math.PI * this.R));
  var q = asq + g;
  con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
  if (lat >= 0) {
    //y = this.y0 + Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
    y = this.y0 + con;
  }
  else {
    //y = this.y0 - Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
    y = this.y0 - con;
  }
  p.x = x;
  p.y = y;
  return p;
}

/* Van Der Grinten inverse equations--mapping x,y to lat/long
  ---------------------------------------------------------*/
function inverse(p) {
  var lon, lat;
  var xx, yy, xys, c1, c2, c3;
  var a1;
  var m1;
  var con;
  var th1;
  var d;

  /* inverse equations
    -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  con = Math.PI * this.R;
  xx = p.x / con;
  yy = p.y / con;
  xys = xx * xx + yy * yy;
  c1 = -Math.abs(yy) * (1 + xys);
  c2 = c1 - 2 * yy * yy + xx * xx;
  c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
  d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
  a1 = (c1 - c2 * c2 / 3 / c3) / c3;
  m1 = 2 * Math.sqrt(-a1 / 3);
  con = ((3 * d) / a1) / m1;
  if (Math.abs(con) > 1) {
    if (con >= 0) {
      con = 1;
    }
    else {
      con = -1;
    }
  }
  th1 = Math.acos(con) / 3;
  if (p.y >= 0) {
    lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  }
  else {
    lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  }

  if (Math.abs(xx) < __WEBPACK_IMPORTED_MODULE_1__constants_values__["b" /* EPSLN */]) {
    lon = this.long0;
  }
  else {
    lon = Object(__WEBPACK_IMPORTED_MODULE_0__common_adjust_lon__["a" /* default */])(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx);
  }

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"];
/* harmony default export */ __webpack_exports__["a"] = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "./node_modules/proj4/lib/transform.js":
/*!*********************************************!*\
  !*** ./node_modules/proj4/lib/transform.js ***!
  \*********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = transform;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_values__ = __webpack_require__(/*! ./constants/values */ "./node_modules/proj4/lib/constants/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__datum_transform__ = __webpack_require__(/*! ./datum_transform */ "./node_modules/proj4/lib/datum_transform.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__adjust_axis__ = __webpack_require__(/*! ./adjust_axis */ "./node_modules/proj4/lib/adjust_axis.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Proj__ = __webpack_require__(/*! ./Proj */ "./node_modules/proj4/lib/Proj.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_toPoint__ = __webpack_require__(/*! ./common/toPoint */ "./node_modules/proj4/lib/common/toPoint.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__checkSanity__ = __webpack_require__(/*! ./checkSanity */ "./node_modules/proj4/lib/checkSanity.js");







function checkNotWGS(source, dest) {
  return ((source.datum.datum_type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["e" /* PJD_3PARAM */] || source.datum.datum_type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["f" /* PJD_7PARAM */]) && dest.datumCode !== 'WGS84') || ((dest.datum.datum_type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["e" /* PJD_3PARAM */] || dest.datum.datum_type === __WEBPACK_IMPORTED_MODULE_0__constants_values__["f" /* PJD_7PARAM */]) && source.datumCode !== 'WGS84');
}

function transform(source, dest, point) {
  var wgs84;
  if (Array.isArray(point)) {
    point = Object(__WEBPACK_IMPORTED_MODULE_4__common_toPoint__["a" /* default */])(point);
  }
  Object(__WEBPACK_IMPORTED_MODULE_5__checkSanity__["a" /* default */])(point);
  // Workaround for datum shifts towgs84, if either source or destination projection is not wgs84
  if (source.datum && dest.datum && checkNotWGS(source, dest)) {
    wgs84 = new __WEBPACK_IMPORTED_MODULE_3__Proj__["a" /* default */]('WGS84');
    point = transform(source, wgs84, point);
    source = wgs84;
  }
  // DGR, 2010/11/12
  if (source.axis !== 'enu') {
    point = Object(__WEBPACK_IMPORTED_MODULE_2__adjust_axis__["a" /* default */])(source, false, point);
  }
  // Transform source points to long/lat, if they aren't already.
  if (source.projName === 'longlat') {
    point = {
      x: point.x * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */],
      y: point.y * __WEBPACK_IMPORTED_MODULE_0__constants_values__["a" /* D2R */]
    };
  }
  else {
    if (source.to_meter) {
      point = {
        x: point.x * source.to_meter,
        y: point.y * source.to_meter
      };
    }
    point = source.inverse(point); // Convert Cartesian to longlat
  }
  // Adjust for the prime meridian if necessary
  if (source.from_greenwich) {
    point.x += source.from_greenwich;
  }

  // Convert datums if needed, and if possible.
  point = Object(__WEBPACK_IMPORTED_MODULE_1__datum_transform__["a" /* default */])(source.datum, dest.datum, point);

  // Adjust for the prime meridian if necessary
  if (dest.from_greenwich) {
    point = {
      x: point.x - dest.from_greenwich,
      y: point.y
    };
  }

  if (dest.projName === 'longlat') {
    // convert radians to decimal degrees
    point = {
      x: point.x * __WEBPACK_IMPORTED_MODULE_0__constants_values__["i" /* R2D */],
      y: point.y * __WEBPACK_IMPORTED_MODULE_0__constants_values__["i" /* R2D */]
    };
  } else { // else project
    point = dest.forward(point);
    if (dest.to_meter) {
      point = {
        x: point.x / dest.to_meter,
        y: point.y / dest.to_meter
      };
    }
  }

  // DGR, 2010/11/12
  if (dest.axis !== 'enu') {
    return Object(__WEBPACK_IMPORTED_MODULE_2__adjust_axis__["a" /* default */])(dest, true, point);
  }

  return point;
}


/***/ }),

/***/ "./node_modules/proj4/lib/version.js":
/*!*******************************************!*\
  !*** ./node_modules/proj4/lib/version.js ***!
  \*******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__package_json__ = __webpack_require__(/*! ../package.json */ "./node_modules/proj4/package.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__package_json__);
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__package_json__, "version")) __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__package_json__["version"]; });



/***/ }),

/***/ "./node_modules/proj4/package.json":
/*!*****************************************!*\
  !*** ./node_modules/proj4/package.json ***!
  \*****************************************/
/*! dynamic exports provided */
/*! exports used: version */
/***/ (function(module, exports) {

module.exports = {"name":"proj4","version":"2.5.0","description":"Proj4js is a JavaScript library to transform point coordinates from one coordinate system to another, including datum transformations.","main":"dist/proj4-src.js","module":"lib/index.js","directories":{"test":"test","doc":"docs"},"scripts":{"build":"grunt","build:tmerc":"grunt build:tmerc","test":"npm run build && istanbul test _mocha test/test.js"},"repository":{"type":"git","url":"git://github.com/proj4js/proj4js.git"},"author":"","license":"MIT","devDependencies":{"chai":"~4.1.2","curl-amd":"github:cujojs/curl","grunt":"^1.0.1","grunt-cli":"~1.2.0","grunt-contrib-connect":"~1.0.2","grunt-contrib-jshint":"~1.1.0","grunt-contrib-uglify":"~3.1.0","grunt-mocha-phantomjs":"~4.0.0","grunt-rollup":"^6.0.0","istanbul":"~0.4.5","mocha":"~4.0.0","rollup":"^0.50.0","rollup-plugin-json":"^2.3.0","rollup-plugin-node-resolve":"^3.0.0","tin":"~0.5.0"},"dependencies":{"mgrs":"1.0.0","wkt-parser":"^1.2.0"}}

/***/ }),

/***/ "./node_modules/proj4/projs.js":
/*!*************************************!*\
  !*** ./node_modules/proj4/projs.js ***!
  \*************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_projections_tmerc__ = __webpack_require__(/*! ./lib/projections/tmerc */ "./node_modules/proj4/lib/projections/tmerc.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_projections_etmerc__ = __webpack_require__(/*! ./lib/projections/etmerc */ "./node_modules/proj4/lib/projections/etmerc.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_projections_utm__ = __webpack_require__(/*! ./lib/projections/utm */ "./node_modules/proj4/lib/projections/utm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_projections_sterea__ = __webpack_require__(/*! ./lib/projections/sterea */ "./node_modules/proj4/lib/projections/sterea.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_projections_stere__ = __webpack_require__(/*! ./lib/projections/stere */ "./node_modules/proj4/lib/projections/stere.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_projections_somerc__ = __webpack_require__(/*! ./lib/projections/somerc */ "./node_modules/proj4/lib/projections/somerc.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_projections_omerc__ = __webpack_require__(/*! ./lib/projections/omerc */ "./node_modules/proj4/lib/projections/omerc.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_projections_lcc__ = __webpack_require__(/*! ./lib/projections/lcc */ "./node_modules/proj4/lib/projections/lcc.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_projections_krovak__ = __webpack_require__(/*! ./lib/projections/krovak */ "./node_modules/proj4/lib/projections/krovak.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_projections_cass__ = __webpack_require__(/*! ./lib/projections/cass */ "./node_modules/proj4/lib/projections/cass.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lib_projections_laea__ = __webpack_require__(/*! ./lib/projections/laea */ "./node_modules/proj4/lib/projections/laea.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__lib_projections_aea__ = __webpack_require__(/*! ./lib/projections/aea */ "./node_modules/proj4/lib/projections/aea.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__lib_projections_gnom__ = __webpack_require__(/*! ./lib/projections/gnom */ "./node_modules/proj4/lib/projections/gnom.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__lib_projections_cea__ = __webpack_require__(/*! ./lib/projections/cea */ "./node_modules/proj4/lib/projections/cea.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__lib_projections_eqc__ = __webpack_require__(/*! ./lib/projections/eqc */ "./node_modules/proj4/lib/projections/eqc.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__lib_projections_poly__ = __webpack_require__(/*! ./lib/projections/poly */ "./node_modules/proj4/lib/projections/poly.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__lib_projections_nzmg__ = __webpack_require__(/*! ./lib/projections/nzmg */ "./node_modules/proj4/lib/projections/nzmg.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__lib_projections_mill__ = __webpack_require__(/*! ./lib/projections/mill */ "./node_modules/proj4/lib/projections/mill.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__lib_projections_sinu__ = __webpack_require__(/*! ./lib/projections/sinu */ "./node_modules/proj4/lib/projections/sinu.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__lib_projections_moll__ = __webpack_require__(/*! ./lib/projections/moll */ "./node_modules/proj4/lib/projections/moll.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__lib_projections_eqdc__ = __webpack_require__(/*! ./lib/projections/eqdc */ "./node_modules/proj4/lib/projections/eqdc.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__lib_projections_vandg__ = __webpack_require__(/*! ./lib/projections/vandg */ "./node_modules/proj4/lib/projections/vandg.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__lib_projections_aeqd__ = __webpack_require__(/*! ./lib/projections/aeqd */ "./node_modules/proj4/lib/projections/aeqd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__lib_projections_ortho__ = __webpack_require__(/*! ./lib/projections/ortho */ "./node_modules/proj4/lib/projections/ortho.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__lib_projections_qsc__ = __webpack_require__(/*! ./lib/projections/qsc */ "./node_modules/proj4/lib/projections/qsc.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__lib_projections_robin__ = __webpack_require__(/*! ./lib/projections/robin */ "./node_modules/proj4/lib/projections/robin.js");


























/* harmony default export */ __webpack_exports__["a"] = (function(proj4){
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_0__lib_projections_tmerc__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_1__lib_projections_etmerc__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_2__lib_projections_utm__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_3__lib_projections_sterea__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_4__lib_projections_stere__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_5__lib_projections_somerc__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_6__lib_projections_omerc__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_7__lib_projections_lcc__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_8__lib_projections_krovak__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_9__lib_projections_cass__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_10__lib_projections_laea__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_11__lib_projections_aea__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_12__lib_projections_gnom__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_13__lib_projections_cea__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_14__lib_projections_eqc__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_15__lib_projections_poly__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_16__lib_projections_nzmg__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_17__lib_projections_mill__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_18__lib_projections_sinu__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_19__lib_projections_moll__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_20__lib_projections_eqdc__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_21__lib_projections_vandg__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_22__lib_projections_aeqd__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_23__lib_projections_ortho__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_24__lib_projections_qsc__["a" /* default */]);
  proj4.Proj.projections.add(__WEBPACK_IMPORTED_MODULE_25__lib_projections_robin__["a" /* default */]);
});

/***/ }),

/***/ "./node_modules/wkt-parser/index.js":
/*!******************************************!*\
  !*** ./node_modules/wkt-parser/index.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parser__ = __webpack_require__(/*! ./parser */ "./node_modules/wkt-parser/parser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__process__ = __webpack_require__(/*! ./process */ "./node_modules/wkt-parser/process.js");
var D2R = 0.01745329251994329577;





function rename(obj, params) {
  var outName = params[0];
  var inName = params[1];
  if (!(outName in obj) && (inName in obj)) {
    obj[outName] = obj[inName];
    if (params.length === 3) {
      obj[outName] = params[2](obj[outName]);
    }
  }
}

function d2r(input) {
  return input * D2R;
}

function cleanWKT(wkt) {
  if (wkt.type === 'GEOGCS') {
    wkt.projName = 'longlat';
  } else if (wkt.type === 'LOCAL_CS') {
    wkt.projName = 'identity';
    wkt.local = true;
  } else {
    if (typeof wkt.PROJECTION === 'object') {
      wkt.projName = Object.keys(wkt.PROJECTION)[0];
    } else {
      wkt.projName = wkt.PROJECTION;
    }
  }
  if (wkt.UNIT) {
    wkt.units = wkt.UNIT.name.toLowerCase();
    if (wkt.units === 'metre') {
      wkt.units = 'meter';
    }
    if (wkt.UNIT.convert) {
      if (wkt.type === 'GEOGCS') {
        if (wkt.DATUM && wkt.DATUM.SPHEROID) {
          wkt.to_meter = wkt.UNIT.convert*wkt.DATUM.SPHEROID.a;
        }
      } else {
        wkt.to_meter = wkt.UNIT.convert;
      }
    }
  }
  var geogcs = wkt.GEOGCS;
  if (wkt.type === 'GEOGCS') {
    geogcs = wkt;
  }
  if (geogcs) {
    //if(wkt.GEOGCS.PRIMEM&&wkt.GEOGCS.PRIMEM.convert){
    //  wkt.from_greenwich=wkt.GEOGCS.PRIMEM.convert*D2R;
    //}
    if (geogcs.DATUM) {
      wkt.datumCode = geogcs.DATUM.name.toLowerCase();
    } else {
      wkt.datumCode = geogcs.name.toLowerCase();
    }
    if (wkt.datumCode.slice(0, 2) === 'd_') {
      wkt.datumCode = wkt.datumCode.slice(2);
    }
    if (wkt.datumCode === 'new_zealand_geodetic_datum_1949' || wkt.datumCode === 'new_zealand_1949') {
      wkt.datumCode = 'nzgd49';
    }
    if (wkt.datumCode === 'wgs_1984') {
      if (wkt.PROJECTION === 'Mercator_Auxiliary_Sphere') {
        wkt.sphere = true;
      }
      wkt.datumCode = 'wgs84';
    }
    if (wkt.datumCode.slice(-6) === '_ferro') {
      wkt.datumCode = wkt.datumCode.slice(0, - 6);
    }
    if (wkt.datumCode.slice(-8) === '_jakarta') {
      wkt.datumCode = wkt.datumCode.slice(0, - 8);
    }
    if (~wkt.datumCode.indexOf('belge')) {
      wkt.datumCode = 'rnb72';
    }
    if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
      wkt.ellps = geogcs.DATUM.SPHEROID.name.replace('_19', '').replace(/[Cc]larke\_18/, 'clrk');
      if (wkt.ellps.toLowerCase().slice(0, 13) === 'international') {
        wkt.ellps = 'intl';
      }

      wkt.a = geogcs.DATUM.SPHEROID.a;
      wkt.rf = parseFloat(geogcs.DATUM.SPHEROID.rf, 10);
    }

    if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {
      wkt.datum_params = geogcs.DATUM.TOWGS84;
    }
    if (~wkt.datumCode.indexOf('osgb_1936')) {
      wkt.datumCode = 'osgb36';
    }
    if (~wkt.datumCode.indexOf('osni_1952')) {
      wkt.datumCode = 'osni52';
    }
    if (~wkt.datumCode.indexOf('tm65')
      || ~wkt.datumCode.indexOf('geodetic_datum_of_1965')) {
      wkt.datumCode = 'ire65';
    }
    if (wkt.datumCode === 'ch1903+') {
      wkt.datumCode = 'ch1903';
    }
    if (~wkt.datumCode.indexOf('israel')) {
      wkt.datumCode = 'isr93';
    }
  }
  if (wkt.b && !isFinite(wkt.b)) {
    wkt.b = wkt.a;
  }

  function toMeter(input) {
    var ratio = wkt.to_meter || 1;
    return input * ratio;
  }
  var renamer = function(a) {
    return rename(wkt, a);
  };
  var list = [
    ['standard_parallel_1', 'Standard_Parallel_1'],
    ['standard_parallel_2', 'Standard_Parallel_2'],
    ['false_easting', 'False_Easting'],
    ['false_northing', 'False_Northing'],
    ['central_meridian', 'Central_Meridian'],
    ['latitude_of_origin', 'Latitude_Of_Origin'],
    ['latitude_of_origin', 'Central_Parallel'],
    ['scale_factor', 'Scale_Factor'],
    ['k0', 'scale_factor'],
    ['latitude_of_center', 'Latitude_Of_Center'],
    ['latitude_of_center', 'Latitude_of_center'],
    ['lat0', 'latitude_of_center', d2r],
    ['longitude_of_center', 'Longitude_Of_Center'],
    ['longitude_of_center', 'Longitude_of_center'],
    ['longc', 'longitude_of_center', d2r],
    ['x0', 'false_easting', toMeter],
    ['y0', 'false_northing', toMeter],
    ['long0', 'central_meridian', d2r],
    ['lat0', 'latitude_of_origin', d2r],
    ['lat0', 'standard_parallel_1', d2r],
    ['lat1', 'standard_parallel_1', d2r],
    ['lat2', 'standard_parallel_2', d2r],
    ['azimuth', 'Azimuth'],
    ['alpha', 'azimuth', d2r],
    ['srsCode', 'name']
  ];
  list.forEach(renamer);
  if (!wkt.long0 && wkt.longc && (wkt.projName === 'Albers_Conic_Equal_Area' || wkt.projName === 'Lambert_Azimuthal_Equal_Area')) {
    wkt.long0 = wkt.longc;
  }
  if (!wkt.lat_ts && wkt.lat1 && (wkt.projName === 'Stereographic_South_Pole' || wkt.projName === 'Polar Stereographic (variant B)')) {
    wkt.lat0 = d2r(wkt.lat1 > 0 ? 90 : -90);
    wkt.lat_ts = wkt.lat1;
  }
}
/* harmony default export */ __webpack_exports__["a"] = (function(wkt) {
  var lisp = Object(__WEBPACK_IMPORTED_MODULE_0__parser__["a" /* default */])(wkt);
  var type = lisp.shift();
  var name = lisp.shift();
  lisp.unshift(['name', name]);
  lisp.unshift(['type', type]);
  var obj = {};
  Object(__WEBPACK_IMPORTED_MODULE_1__process__["a" /* sExpr */])(lisp, obj);
  cleanWKT(obj);
  return obj;
});


/***/ }),

/***/ "./node_modules/wkt-parser/parser.js":
/*!*******************************************!*\
  !*** ./node_modules/wkt-parser/parser.js ***!
  \*******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (parseString);

var NEUTRAL = 1;
var KEYWORD = 2;
var NUMBER = 3;
var QUOTED = 4;
var AFTERQUOTE = 5;
var ENDED = -1;
var whitespace = /\s/;
var latin = /[A-Za-z]/;
var keyword = /[A-Za-z84]/;
var endThings = /[,\]]/;
var digets = /[\d\.E\-\+]/;
// const ignoredChar = /[\s_\-\/\(\)]/g;
function Parser(text) {
  if (typeof text !== 'string') {
    throw new Error('not a string');
  }
  this.text = text.trim();
  this.level = 0;
  this.place = 0;
  this.root = null;
  this.stack = [];
  this.currentObject = null;
  this.state = NEUTRAL;
}
Parser.prototype.readCharicter = function() {
  var char = this.text[this.place++];
  if (this.state !== QUOTED) {
    while (whitespace.test(char)) {
      if (this.place >= this.text.length) {
        return;
      }
      char = this.text[this.place++];
    }
  }
  switch (this.state) {
    case NEUTRAL:
      return this.neutral(char);
    case KEYWORD:
      return this.keyword(char)
    case QUOTED:
      return this.quoted(char);
    case AFTERQUOTE:
      return this.afterquote(char);
    case NUMBER:
      return this.number(char);
    case ENDED:
      return;
  }
};
Parser.prototype.afterquote = function(char) {
  if (char === '"') {
    this.word += '"';
    this.state = QUOTED;
    return;
  }
  if (endThings.test(char)) {
    this.word = this.word.trim();
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' +char + '" in afterquote yet, index ' + this.place);
};
Parser.prototype.afterItem = function(char) {
  if (char === ',') {
    if (this.word !== null) {
      this.currentObject.push(this.word);
    }
    this.word = null;
    this.state = NEUTRAL;
    return;
  }
  if (char === ']') {
    this.level--;
    if (this.word !== null) {
      this.currentObject.push(this.word);
      this.word = null;
    }
    this.state = NEUTRAL;
    this.currentObject = this.stack.pop();
    if (!this.currentObject) {
      this.state = ENDED;
    }

    return;
  }
};
Parser.prototype.number = function(char) {
  if (digets.test(char)) {
    this.word += char;
    return;
  }
  if (endThings.test(char)) {
    this.word = parseFloat(this.word);
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' +char + '" in number yet, index ' + this.place);
};
Parser.prototype.quoted = function(char) {
  if (char === '"') {
    this.state = AFTERQUOTE;
    return;
  }
  this.word += char;
  return;
};
Parser.prototype.keyword = function(char) {
  if (keyword.test(char)) {
    this.word += char;
    return;
  }
  if (char === '[') {
    var newObjects = [];
    newObjects.push(this.word);
    this.level++;
    if (this.root === null) {
      this.root = newObjects;
    } else {
      this.currentObject.push(newObjects);
    }
    this.stack.push(this.currentObject);
    this.currentObject = newObjects;
    this.state = NEUTRAL;
    return;
  }
  if (endThings.test(char)) {
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' +char + '" in keyword yet, index ' + this.place);
};
Parser.prototype.neutral = function(char) {
  if (latin.test(char)) {
    this.word = char;
    this.state = KEYWORD;
    return;
  }
  if (char === '"') {
    this.word = '';
    this.state = QUOTED;
    return;
  }
  if (digets.test(char)) {
    this.word = char;
    this.state = NUMBER;
    return;
  }
  if (endThings.test(char)) {
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' +char + '" in neutral yet, index ' + this.place);
};
Parser.prototype.output = function() {
  while (this.place < this.text.length) {
    this.readCharicter();
  }
  if (this.state === ENDED) {
    return this.root;
  }
  throw new Error('unable to parse string "' +this.text + '". State is ' + this.state);
};

function parseString(txt) {
  var parser = new Parser(txt);
  return parser.output();
}


/***/ }),

/***/ "./node_modules/wkt-parser/process.js":
/*!********************************************!*\
  !*** ./node_modules/wkt-parser/process.js ***!
  \********************************************/
/*! exports provided: sExpr */
/*! exports used: sExpr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sExpr;


function mapit(obj, key, value) {
  if (Array.isArray(key)) {
    value.unshift(key);
    key = null;
  }
  var thing = key ? {} : obj;

  var out = value.reduce(function(newObj, item) {
    sExpr(item, newObj);
    return newObj
  }, thing);
  if (key) {
    obj[key] = out;
  }
}

function sExpr(v, obj) {
  if (!Array.isArray(v)) {
    obj[v] = true;
    return;
  }
  var key = v.shift();
  if (key === 'PARAMETER') {
    key = v.shift();
  }
  if (v.length === 1) {
    if (Array.isArray(v[0])) {
      obj[key] = {};
      sExpr(v[0], obj[key]);
      return;
    }
    obj[key] = v[0];
    return;
  }
  if (!v.length) {
    obj[key] = true;
    return;
  }
  if (key === 'TOWGS84') {
    obj[key] = v;
    return;
  }
  if (!Array.isArray(key)) {
    obj[key] = {};
  }

  var i;
  switch (key) {
    case 'UNIT':
    case 'PRIMEM':
    case 'VERT_DATUM':
      obj[key] = {
        name: v[0].toLowerCase(),
        convert: v[1]
      };
      if (v.length === 3) {
        sExpr(v[2], obj[key]);
      }
      return;
    case 'SPHEROID':
    case 'ELLIPSOID':
      obj[key] = {
        name: v[0],
        a: v[1],
        rf: v[2]
      };
      if (v.length === 4) {
        sExpr(v[3], obj[key]);
      }
      return;
    case 'PROJECTEDCRS':
    case 'PROJCRS':
    case 'GEOGCS':
    case 'GEOCCS':
    case 'PROJCS':
    case 'LOCAL_CS':
    case 'GEODCRS':
    case 'GEODETICCRS':
    case 'GEODETICDATUM':
    case 'EDATUM':
    case 'ENGINEERINGDATUM':
    case 'VERT_CS':
    case 'VERTCRS':
    case 'VERTICALCRS':
    case 'COMPD_CS':
    case 'COMPOUNDCRS':
    case 'ENGINEERINGCRS':
    case 'ENGCRS':
    case 'FITTED_CS':
    case 'LOCAL_DATUM':
    case 'DATUM':
      v[0] = ['name', v[0]];
      mapit(obj, key, v);
      return;
    default:
      i = -1;
      while (++i < v.length) {
        if (!Array.isArray(v[i])) {
          return sExpr(v, obj[key]);
        }
      }
      return mapit(obj, key, v);
  }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODZiYTQ4MjkxOGQ1ZTc1NGI0ZjkiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2Nzcy9oZWFyaW5nLWVkaXQuY3NzPzgxYTUiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2hlYXJpbmctZWRpdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWdycy9tZ3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvUG9pbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9Qcm9qLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvYWRqdXN0X2F4aXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jaGVja1Nhbml0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9hZGp1c3RfbGF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2FkanVzdF9sb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vYWRqdXN0X3pvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vYXNpbmh5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2FzaW56LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2NsZW5zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2NsZW5zX2NtcGx4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2Nvc2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vZTBmbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9lMWZuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2UyZm4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vZTNmbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9nTi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9nYXRnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2h5cG90LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2ltbGZuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2lxc2Zuei5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9sb2cxcHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vbWxmbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9tc2Zuei5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9waGkyei5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9wal9lbmZuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3BqX2ludl9tbGZuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3BqX21sZm4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vcXNmbnouanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9zaW5oLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3NyYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vdG9Qb2ludC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi90c2Zuei5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy9EYXR1bS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy9FbGxpcHNvaWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb25zdGFudHMvUHJpbWVNZXJpZGlhbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy91bml0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy92YWx1ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvZGF0dW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9kYXR1bVV0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvZGF0dW1fdHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvZGVmcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2Rlcml2ZUNvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2V4dGVuZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvbWF0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wYXJzZUNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qU3RyaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9hZWEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9hZXFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvY2Fzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2NlYS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2VxYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2VxZGMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9ldG1lcmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9nYXVzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2dub20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9rcm92YWsuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9sYWVhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbGNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbG9uZ2xhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL21lcmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9taWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbW9sbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL256bWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9vbWVyYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL29ydGhvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvcG9seS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3FzYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3JvYmluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvc2ludS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3NvbWVyYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3N0ZXJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvc3RlcmVhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvdG1lcmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy91dG0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy92YW5kZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L3BhY2thZ2UuanNvbiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvcHJvanMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3drdC1wYXJzZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3drdC1wYXJzZXIvcGFyc2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93a3QtcGFyc2VyL3Byb2Nlc3MuanMiXSwibmFtZXMiOlsid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImFwcGx5TWFwIiwiZG9tT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb24iLCJmb3JFYWNoIiwiYWRkZWROb2RlcyIsIm5vZGUiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm9ic2VydmUiLCJkb2N1bWVudCIsImJvZHkiLCJjaGlsZExpc3QiLCJyZXF1aXJlIiwicHJvajQiLCJkZWZzIiwiZGVmYXVsdE1hcFByb2plY3Rpb24iLCJ0YXJnZXRNYXBQcm9qZWN0aW9uIiwicHJvamVjdCIsImdlb2pzb24iLCJmcm9tUHJvamVjdGlvbiIsInRvUHJvamVjdGlvbiIsImZlYXR1cmVzIiwibGVuZ3RoIiwiZ2VvbWV0cnkiLCJ0eXBlIiwiY29vcmRpbmF0ZXMiLCJjcnMiLCJwcm9wZXJ0aWVzIiwibmFtZSIsImNvbmZpZyIsIndpZGdldHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY29udGFpbmVyIiwidGhlbWVQYXRoIiwiZ2V0QXR0cmlidXRlIiwibWFwIiwibGF5ZXIiLCJmZWF0dXJlc19zdHlsZSIsImljb24iLCJzY2FsZSIsImNvbnRyb2xzIiwic2VhcmNoIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsInNycyIsImV4IiwidGFyZ2V0IiwicXVlcnlTZWxlY3RvciIsIm1hcENvbmZpZyIsInZhbHVlIiwibWFwQ29uZmlnRGF0YSIsInZpZXciLCJ4IiwiY2VudGVyIiwieSIsImJib3giLCJ6b29tTGV2ZWwiLCJ6b29tIiwicmVzb2x1dGlvbiIsInJlc2V0TWFwIiwic2V0Q29uZmlnIiwic3RyaW5naWZ5IiwiV2lkZ2V0QVBJIiwib24iLCJldmVudG5hbWUiLCJzY29wZSIsIm1hcHN0YXRlIiwicHJvamVjdGlvbiIsIl9vcHRpb25zIiwiZmVhdHVyZSIsInJlc2V0TWFwQ3RybCIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJpbm5lckhUTUwiLCJEcnVwYWwiLCJ0IiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImxhc3RDaGlsZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RBLHlDOzs7Ozs7Ozs7Ozs7O0FDQUE7QUFB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FB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QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQTRDOztBQUU3QjtBQUNmO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixrRUFBTztBQUNqQyxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ1BEO0FBQUE7QUFDNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RHQTtBQUFBO0FBQUE7QUFDNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsUUE7QUFBQTtBQUM0Qjs7QUFFNUIsd0JB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsa0VBQU87QUFDakI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGtFQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixnRUFBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGdFQUFLO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGdFQUFLO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGtFQUFPO0FBQ25CO0FBQ0E7QUFDQSxhQUFhLGtFQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdFQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLDJFQUFVO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDZTtBQUNmLGFBQWEsZ0VBQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsK0RBQUs7QUFDUDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUMxS2Msb0VBQVcsRUFBQzs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7QUFFdEI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaGVhcmluZy1lZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvanMvaGVhcmluZy1lZGl0LmpzXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg2YmE0ODI5MThkNWU3NTRiNGY5IiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9jc3MvaGVhcmluZy1lZGl0LmNzc1xuLy8gbW9kdWxlIGlkID0gLi9hc3NldHMvY3NzL2hlYXJpbmctZWRpdC5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBAZmlsZVxuICogRW5jb3JlIGNvbmZpZyBnbG9iYWwgV2lkZ2V0QVBJLlxuICovXG5cbmltcG9ydCBwcm9qNCBmcm9tICdwcm9qNCdcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gIGFwcGx5TWFwKClcbn0pXG5cbi8vIElmIHRoZSBtYXAgaXMgYWRkZWQgdG8gYSBkaWFsb2csIHdlIG5lZWQgdG8gcmUtYXBwbHkgdGhlIG1hcCBhZnRlciB0aGUgZGlhbG9nIGlzIG9wZW5lZC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxubGV0IGRvbU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9uKSB7XG4gIG11dGF0aW9uLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XG4gICAgbXV0YXRpb24uYWRkZWROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBpZiAobm9kZS5jbGFzc0xpc3QgJiYgbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3VpLWRpYWxvZycpKSB7XG4gICAgICAgIGFwcGx5TWFwKClcbiAgICAgIH1cbiAgICB9KVxuICB9KVxufSlcblxuZG9tT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSB9KVxuXG5mdW5jdGlvbiBhcHBseU1hcCAoKSB7XG4gIHJlcXVpcmUoJy4uL2Nzcy9oZWFyaW5nLWVkaXQuY3NzJylcbiAgLy8gRGVmaW5lIGRlZmF1bHQgU2VwdGltYSBwcm9qZWN0aW9uLlxuICBwcm9qNC5kZWZzKCdFUFNHOjI1ODMyJywgJytwcm9qPXV0bSArem9uZT0zMiArZWxscHM9R1JTODAgK3VuaXRzPW0gK25vX2RlZnMnKVxuXG4gIC8vIEFsaWFzZXMgZm9yIGNvbnZlbmllbmNlLlxuICBwcm9qNC5kZWZzKCd1cm46b2djOmRlZjpjcnM6RVBTRzo6NDMyNicsIHByb2o0LmRlZnMoJ0VQU0c6NDMyNicpKVxuICBwcm9qNC5kZWZzKCd1cm46b2djOmRlZjpjcnM6RVBTRzo6MjU4MzInLCBwcm9qNC5kZWZzKCdFUFNHOjI1ODMyJykpXG5cbiAgY29uc3QgZGVmYXVsdE1hcFByb2plY3Rpb24gPSAndXJuOm9nYzpkZWY6Y3JzOkVQU0c6OjI1ODMyJ1xuICBjb25zdCB0YXJnZXRNYXBQcm9qZWN0aW9uID0gJ3VybjpvZ2M6ZGVmOmNyczpFUFNHOjo0MzI2J1xuXG4gIC8vIFByb2plY3QgYSBzaW1wbGUgZ2VvanNvbiBvYmplY3QgdG8gYSBuZXcgcHJvamVjdGlvbi5cbiAgY29uc3QgcHJvamVjdCA9IChnZW9qc29uLCBmcm9tUHJvamVjdGlvbiwgdG9Qcm9qZWN0aW9uKSA9PiB7XG4gICAgaWYgKGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoID09PSAxICYmIGdlb2pzb24uZmVhdHVyZXNbMF0uZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgZ2VvanNvbi5mZWF0dXJlc1swXS5nZW9tZXRyeS5jb29yZGluYXRlcyA9IHByb2o0KGZyb21Qcm9qZWN0aW9uLCB0b1Byb2plY3Rpb24sIGdlb2pzb24uZmVhdHVyZXNbMF0uZ2VvbWV0cnkuY29vcmRpbmF0ZXMpXG4gICAgICBnZW9qc29uLmNycy5wcm9wZXJ0aWVzLm5hbWUgPSB0b1Byb2plY3Rpb25cbiAgICB9XG5cbiAgICByZXR1cm4gZ2VvanNvblxuICB9XG5cbiAgY29uc3QgY29uZmlnID0ge1xuICAgICdtYXAnOiB7XG4gICAgICAnbWF4Wm9vbUxldmVsJzogMSxcbiAgICAgICdtaW5ab29tTGV2ZWwnOiAyMixcbiAgICAgIC8vIERlZmF1bHQgdG8gQWFyaHVzIEMuXG4gICAgICAndmlldyc6IHtcbiAgICAgICAgJ3gnOiA1NzQ3NjguNTgwNjk3OTU3MSxcbiAgICAgICAgJ3knOiA2MjIzNjMwLjAxNjc3ODgyNSxcbiAgICAgICAgJ3Jlc29sdXRpb24nOiA3OC4wMDEyOTIyMjE1Njg2MixcbiAgICAgICAgJ2Jib3gnOiBbXG4gICAgICAgICAgNTc0NjY1Ljc1MjA3NzQ1NjYsXG4gICAgICAgICAgNjIyMzUzMi42NzQ3MTEyMjYsXG4gICAgICAgICAgNTc0ODcxLjQwOTMxODQ1NzYsXG4gICAgICAgICAgNjIyMzcyNy4zNTg4NDY0MjRcbiAgICAgICAgXSxcbiAgICAgICAgJ3pvb21MZXZlbCc6IDVcbiAgICAgIH0sXG4gICAgICAnbGF5ZXInOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAnbmFtZWRsYXllcic6ICcjb3NtJ1xuICAgICAgICB9LFxuXG4gICAgICAgIHtcbiAgICAgICAgICAnZGlzYWJsZSc6IGZhbHNlLFxuICAgICAgICAgICdpZCc6ICdkcmF3bGF5ZXInLFxuICAgICAgICAgICdlZGl0JzogdHJ1ZSxcbiAgICAgICAgICAnZmVhdHVyZXMnOiB0cnVlLFxuICAgICAgICAgICd0eXBlJzogJ2dlb2pzb24nLFxuICAgICAgICAgICdkYXRhJzoge1xuICAgICAgICAgICAgJ3R5cGUnOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgJ2Nycyc6IHtcbiAgICAgICAgICAgICAgJ3R5cGUnOiAnbmFtZScsXG4gICAgICAgICAgICAgICdwcm9wZXJ0aWVzJzoge1xuICAgICAgICAgICAgICAgICduYW1lJzogZGVmYXVsdE1hcFByb2plY3Rpb25cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdmZWF0dXJlcyc6IFtdXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnZmVhdHVyZXNfZGF0YVR5cGUnOiAnanNvbicsXG4gICAgICAgICAgJ2ZlYXR1cmVzX3N0eWxlJzoge1xuXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgJ2NvbnRyb2xzJzogW1xuICAgICAgICB7XG4gICAgICAgICAgJ292ZXJsYXknOiB7XG4gICAgICAgICAgICAnZGlzYWJsZSc6IGZhbHNlXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8vIEBzZWUgaHR0cHM6Ly9zZXB0aW1hLmRrL3dpZGdldC9kb2N1bWVudGF0aW9uLmh0bWwjY29udHJvbC1kcmF3XG4gICAgICAgICAgJ2RyYXcnOiB7XG4gICAgICAgICAgICAnZGlzYWJsZSc6IGZhbHNlLFxuICAgICAgICAgICAgJ2xheWVyJzogJ2RyYXdsYXllcicsXG4gICAgICAgICAgICAnY2xlYXJPbkRyYXcnOiB0cnVlLFxuICAgICAgICAgICAgJ3R5cGUnOiAnUG9pbnQnXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8vIEBzZWUgaHR0cHM6Ly9zZXB0aW1hLmRrL3dpZGdldC9kb2N1bWVudGF0aW9uLmh0bWwjY29udHJvbC1zZWFyY2hcbiAgICAgICAgICAnc2VhcmNoJzoge1xuICAgICAgICAgICAgJ2Rpc3BsYXl0ZXh0JzogJ0ZpbmQgYWRyZXNzZScsXG4gICAgICAgICAgICAnY2xlYXJPbk1hcGNsaWNrJzogdHJ1ZSxcbiAgICAgICAgICAgICdmZWF0dXJlc19zdHlsZSc6IHtcbiAgICAgICAgICAgICAgJ25hbWVkc3R5bGUnOiAnIzAwMSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnZHJpdmVyJzogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICAgICAgICAna29tbXVuZWtvZGUnOiAnMDc1MScgLy8gQWFyaHVzLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHdpZGdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VwdGltYS13aWRnZXQnKVxuICB3aWRnZXRzLmZvckVhY2goKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IHRoZW1lUGF0aCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUtdGhlbWUnKVxuICAgIGlmIChjb250YWluZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlLXRoZW1lJykpIHtcbiAgICAgIGNvbmZpZy5tYXAubGF5ZXJbMV0uZmVhdHVyZXNfc3R5bGUuaWNvbiA9IHRoZW1lUGF0aCArICcvYXNzZXRzL2ltYWdlcy9tYXBzL21hcC1waW4ucG5nJ1xuICAgICAgY29uZmlnLm1hcC5sYXllclsxXS5mZWF0dXJlc19zdHlsZS5zY2FsZSA9IDAuNzVcbiAgICAgIGNvbmZpZy5tYXAuY29udHJvbHNbMF0uc2VhcmNoLmZlYXR1cmVzX3N0eWxlLmljb24gPSB0aGVtZVBhdGggKyAnL2Fzc2V0cy9pbWFnZXMvbWFwcy9tYXAtcGluLnBuZydcbiAgICAgIGNvbmZpZy5tYXAuY29udHJvbHNbMF0uc2VhcmNoLmZlYXR1cmVzX3N0eWxlLnNjYWxlID0gMC43NVxuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpKVxuICAgICAgICByZXR1cm4gcHJvamVjdChkYXRhLCB0YXJnZXRNYXBQcm9qZWN0aW9uLCBjb25maWcubWFwLnNycyB8fCBkZWZhdWx0TWFwUHJvamVjdGlvbilcbiAgICAgIH0gY2F0Y2ggKGV4KSB7fVxuXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH0oKSlcblxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZS10YXJnZXQnKSlcbiAgICBjb25zdCBtYXBDb25maWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUtbWFwLWNvbmZpZycpKVxuXG4gICAgLy8gT3ZlcnJpZGUgZGVmYXVsdCB2aWV3IGlmIG1hcCBjb25maWcgaXMgcHJlc2VudC5cbiAgICBpZiAobWFwQ29uZmlnICE9PSBudWxsICYmIG1hcENvbmZpZy52YWx1ZSkge1xuICAgICAgY29uc3QgbWFwQ29uZmlnRGF0YSA9IEpTT04ucGFyc2UobWFwQ29uZmlnLnZhbHVlKVxuICAgICAgY29uZmlnLm1hcC52aWV3LnggPSBtYXBDb25maWdEYXRhLmNlbnRlclswXVxuICAgICAgY29uZmlnLm1hcC52aWV3LnkgPSBtYXBDb25maWdEYXRhLmNlbnRlclsxXVxuICAgICAgY29uZmlnLm1hcC52aWV3LmJib3ggPSBtYXBDb25maWdEYXRhLmJib3hcbiAgICAgIGNvbmZpZy5tYXAudmlldy56b29tTGV2ZWwgPSBtYXBDb25maWdEYXRhLnpvb21cbiAgICAgIGNvbmZpZy5tYXAudmlldy5yZXNvbHV0aW9uID0gbWFwQ29uZmlnRGF0YS5yZXNvbHV0aW9uXG4gICAgfVxuXG4gICAgaWYgKHRhcmdldCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgcmVzZXRNYXAgPSAoZGF0YSkgPT4ge1xuICAgICAgICAvLyBPdmVycmlkZSBkZWZhdWx0IHZpZXcgY29vcmRpbmF0ZXMgaWYgdGFyZ2V0IGlzIHByZXNlbnQsIGFuZCBtYXAgY29uZmlnIGlzIG5vdC5cbiAgICAgICAgaWYgKG1hcENvbmZpZyA9PSBudWxsKSB7XG4gICAgICAgICAgLy8gQ2VudGVyIG1hcCBvbiBwb2ludC5cbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IGRhdGEuZmVhdHVyZXNbMF0uZ2VvbWV0cnkuY29vcmRpbmF0ZXNcbiAgICAgICAgICBjb25maWcubWFwLnZpZXcueCA9IGNvb3JkaW5hdGVzWzBdXG4gICAgICAgICAgY29uZmlnLm1hcC52aWV3LnkgPSBjb29yZGluYXRlc1sxXVxuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnLm1hcC5sYXllclsxXS5kYXRhID0gZGF0YVxuXG4gICAgICAgIGlmICh0eXBlb2YgbWFwICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIG1hcC5zZXRDb25maWcoY29uZmlnKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJvamVjdCBtb2RpZmllcyBpdHMgZmlyc3QgYXJndW1lbnQsIHNvIHdlIHBhc3MgaXQgYSBkZWVwIGNsb25lLlxuICAgICAgICB0YXJnZXQudmFsdWUgPSBKU09OLnN0cmluZ2lmeShwcm9qZWN0KEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpLCBjb25maWcubWFwLnNycyB8fCBkZWZhdWx0TWFwUHJvamVjdGlvbiwgdGFyZ2V0TWFwUHJvamVjdGlvbikpXG4gICAgICB9XG5cbiAgICAgIC8vIFdlIGhhdmUgdG8gYnVpbGQgbWFwIGNvbmZpZyBiZWZvcmUgaW5pdGlhbGl6aW5nIHRoZSBtYXAuXG4gICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICByZXNldE1hcChkYXRhKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXAgPSBuZXcgV2lkZ2V0QVBJKGNvbnRhaW5lciwgY29uZmlnKVxuICAgICAgbWFwLm9uKCdmZWF0dXJlYWRkZWQnLCBmdW5jdGlvbiAoZXZlbnRuYW1lLCBzY29wZSwgbWFwc3RhdGUpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdGlvbiA9IG1hcHN0YXRlLmNycy5wcm9wZXJ0aWVzLm5hbWVcbiAgICAgICAgaWYgKG1hcHN0YXRlLmZlYXR1cmVzLmxlbmd0aCA9PT0gMSAmJiBtYXBzdGF0ZS5mZWF0dXJlc1swXS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICAgICAgbWFwc3RhdGUgPSBwcm9qZWN0KG1hcHN0YXRlLCBwcm9qZWN0aW9uLCB0YXJnZXRNYXBQcm9qZWN0aW9uKVxuICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBtYXBzdGF0ZS5mZWF0dXJlc1swXS5wcm9wZXJ0aWVzXG4gICAgICAgICAgLy8gQ2xlYW4gb3V0IHVud2FudGVkIHByb3BlcnRpZXMuXG4gICAgICAgICAgZGVsZXRlIHByb3BlcnRpZXMuX29wdGlvbnNcblxuICAgICAgICAgIHRhcmdldC52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHR5cGU6IG1hcHN0YXRlLnR5cGUsXG4gICAgICAgICAgICBjcnM6IG1hcHN0YXRlLmNycyxcbiAgICAgICAgICAgIGZlYXR1cmVzOiBtYXBzdGF0ZS5mZWF0dXJlcy5tYXAoKGZlYXR1cmUpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBmZWF0dXJlLnR5cGUsXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczogZmVhdHVyZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgIGdlb21ldHJ5OiBmZWF0dXJlLmdlb21ldHJ5XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gT24gbWFwIG1vdmUgb3Igem9vbSBzdG9yZSB0aGUgbWFwIHN0YXRlLlxuICAgICAgbWFwLm9uKCdtYXBtb3ZlJywgZnVuY3Rpb24gKGV2ZW50bmFtZSwgc2NvcGUsIG1hcHN0YXRlKSB7XG4gICAgICAgIG1hcENvbmZpZy52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KG1hcHN0YXRlKVxuICAgICAgfSlcblxuICAgICAgaWYgKGRhdGEgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgcmVzZXRNYXBDdHJsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgICAgcmVzZXRNYXBDdHJsLnR5cGUgPSAnYnV0dG9uJ1xuICAgICAgICByZXNldE1hcEN0cmwuY2xhc3NMaXN0LmFkZCgncmVzZXQtcG9pbnQtb24tbWFwJylcbiAgICAgICAgcmVzZXRNYXBDdHJsLmlubmVySFRNTCA9IERydXBhbC50KCdSZXNldCBwb2ludCBvbiBtYXAnKVxuICAgICAgICByZXNldE1hcEN0cmwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVzZXRNYXAoZGF0YSlcbiAgICAgICAgfSlcblxuICAgICAgICBjb250YWluZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVzZXRNYXBDdHJsLCBjb250YWluZXIucGFyZW50Tm9kZS5sYXN0Q2hpbGQpXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2pzL2hlYXJpbmctZWRpdC5qcyIsIlxuXG5cbi8qKlxuICogVVRNIHpvbmVzIGFyZSBncm91cGVkLCBhbmQgYXNzaWduZWQgdG8gb25lIG9mIGEgZ3JvdXAgb2YgNlxuICogc2V0cy5cbiAqXG4gKiB7aW50fSBAcHJpdmF0ZVxuICovXG52YXIgTlVNXzEwMEtfU0VUUyA9IDY7XG5cbi8qKlxuICogVGhlIGNvbHVtbiBsZXR0ZXJzIChmb3IgZWFzdGluZykgb2YgdGhlIGxvd2VyIGxlZnQgdmFsdWUsIHBlclxuICogc2V0LlxuICpcbiAqIHtzdHJpbmd9IEBwcml2YXRlXG4gKi9cbnZhciBTRVRfT1JJR0lOX0NPTFVNTl9MRVRURVJTID0gJ0FKU0FKUyc7XG5cbi8qKlxuICogVGhlIHJvdyBsZXR0ZXJzIChmb3Igbm9ydGhpbmcpIG9mIHRoZSBsb3dlciBsZWZ0IHZhbHVlLCBwZXJcbiAqIHNldC5cbiAqXG4gKiB7c3RyaW5nfSBAcHJpdmF0ZVxuICovXG52YXIgU0VUX09SSUdJTl9ST1dfTEVUVEVSUyA9ICdBRkFGQUYnO1xuXG52YXIgQSA9IDY1OyAvLyBBXG52YXIgSSA9IDczOyAvLyBJXG52YXIgTyA9IDc5OyAvLyBPXG52YXIgViA9IDg2OyAvLyBWXG52YXIgWiA9IDkwOyAvLyBaXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIHRvUG9pbnQ6IHRvUG9pbnRcbn07XG4vKipcbiAqIENvbnZlcnNpb24gb2YgbGF0L2xvbiB0byBNR1JTLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBsbCBPYmplY3QgbGl0ZXJhbCB3aXRoIGxhdCBhbmQgbG9uIHByb3BlcnRpZXMgb24gYVxuICogICAgIFdHUzg0IGVsbGlwc29pZC5cbiAqIEBwYXJhbSB7aW50fSBhY2N1cmFjeSBBY2N1cmFjeSBpbiBkaWdpdHMgKDUgZm9yIDEgbSwgNCBmb3IgMTAgbSwgMyBmb3JcbiAqICAgICAgMTAwIG0sIDIgZm9yIDEwMDAgbSBvciAxIGZvciAxMDAwMCBtKS4gT3B0aW9uYWwsIGRlZmF1bHQgaXMgNS5cbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIE1HUlMgc3RyaW5nIGZvciB0aGUgZ2l2ZW4gbG9jYXRpb24gYW5kIGFjY3VyYWN5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChsbCwgYWNjdXJhY3kpIHtcbiAgYWNjdXJhY3kgPSBhY2N1cmFjeSB8fCA1OyAvLyBkZWZhdWx0IGFjY3VyYWN5IDFtXG4gIHJldHVybiBlbmNvZGUoTEx0b1VUTSh7XG4gICAgbGF0OiBsbFsxXSxcbiAgICBsb246IGxsWzBdXG4gIH0pLCBhY2N1cmFjeSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnNpb24gb2YgTUdSUyB0byBsYXQvbG9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZ3JzIE1HUlMgc3RyaW5nLlxuICogQHJldHVybiB7YXJyYXl9IEFuIGFycmF5IHdpdGggbGVmdCAobG9uZ2l0dWRlKSwgYm90dG9tIChsYXRpdHVkZSksIHJpZ2h0XG4gKiAgICAgKGxvbmdpdHVkZSkgYW5kIHRvcCAobGF0aXR1ZGUpIHZhbHVlcyBpbiBXR1M4NCwgcmVwcmVzZW50aW5nIHRoZVxuICogICAgIGJvdW5kaW5nIGJveCBmb3IgdGhlIHByb3ZpZGVkIE1HUlMgcmVmZXJlbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShtZ3JzKSB7XG4gIHZhciBiYm94ID0gVVRNdG9MTChkZWNvZGUobWdycy50b1VwcGVyQ2FzZSgpKSk7XG4gIGlmIChiYm94LmxhdCAmJiBiYm94Lmxvbikge1xuICAgIHJldHVybiBbYmJveC5sb24sIGJib3gubGF0LCBiYm94LmxvbiwgYmJveC5sYXRdO1xuICB9XG4gIHJldHVybiBbYmJveC5sZWZ0LCBiYm94LmJvdHRvbSwgYmJveC5yaWdodCwgYmJveC50b3BdO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvUG9pbnQobWdycykge1xuICB2YXIgYmJveCA9IFVUTXRvTEwoZGVjb2RlKG1ncnMudG9VcHBlckNhc2UoKSkpO1xuICBpZiAoYmJveC5sYXQgJiYgYmJveC5sb24pIHtcbiAgICByZXR1cm4gW2Jib3gubG9uLCBiYm94LmxhdF07XG4gIH1cbiAgcmV0dXJuIFsoYmJveC5sZWZ0ICsgYmJveC5yaWdodCkgLyAyLCAoYmJveC50b3AgKyBiYm94LmJvdHRvbSkgLyAyXTtcbn07XG4vKipcbiAqIENvbnZlcnNpb24gZnJvbSBkZWdyZWVzIHRvIHJhZGlhbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgdGhlIGFuZ2xlIGluIGRlZ3JlZXMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBhbmdsZSBpbiByYWRpYW5zLlxuICovXG5mdW5jdGlvbiBkZWdUb1JhZChkZWcpIHtcbiAgcmV0dXJuIChkZWcgKiAoTWF0aC5QSSAvIDE4MC4wKSk7XG59XG5cbi8qKlxuICogQ29udmVyc2lvbiBmcm9tIHJhZGlhbnMgdG8gZGVncmVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHJhZCB0aGUgYW5nbGUgaW4gcmFkaWFucy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIGFuZ2xlIGluIGRlZ3JlZXMuXG4gKi9cbmZ1bmN0aW9uIHJhZFRvRGVnKHJhZCkge1xuICByZXR1cm4gKDE4MC4wICogKHJhZCAvIE1hdGguUEkpKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIHNldCBvZiBMb25naXR1ZGUgYW5kIExhdGl0dWRlIGNvLW9yZGluYXRlcyB0byBVVE1cbiAqIHVzaW5nIHRoZSBXR1M4NCBlbGxpcHNvaWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBsbCBPYmplY3QgbGl0ZXJhbCB3aXRoIGxhdCBhbmQgbG9uIHByb3BlcnRpZXNcbiAqICAgICByZXByZXNlbnRpbmcgdGhlIFdHUzg0IGNvb3JkaW5hdGUgdG8gYmUgY29udmVydGVkLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgbGl0ZXJhbCBjb250YWluaW5nIHRoZSBVVE0gdmFsdWUgd2l0aCBlYXN0aW5nLFxuICogICAgIG5vcnRoaW5nLCB6b25lTnVtYmVyIGFuZCB6b25lTGV0dGVyIHByb3BlcnRpZXMsIGFuZCBhbiBvcHRpb25hbFxuICogICAgIGFjY3VyYWN5IHByb3BlcnR5IGluIGRpZ2l0cy4gUmV0dXJucyBudWxsIGlmIHRoZSBjb252ZXJzaW9uIGZhaWxlZC5cbiAqL1xuZnVuY3Rpb24gTEx0b1VUTShsbCkge1xuICB2YXIgTGF0ID0gbGwubGF0O1xuICB2YXIgTG9uZyA9IGxsLmxvbjtcbiAgdmFyIGEgPSA2Mzc4MTM3LjA7IC8vZWxsaXAucmFkaXVzO1xuICB2YXIgZWNjU3F1YXJlZCA9IDAuMDA2Njk0Mzg7IC8vZWxsaXAuZWNjc3E7XG4gIHZhciBrMCA9IDAuOTk5NjtcbiAgdmFyIExvbmdPcmlnaW47XG4gIHZhciBlY2NQcmltZVNxdWFyZWQ7XG4gIHZhciBOLCBULCBDLCBBLCBNO1xuICB2YXIgTGF0UmFkID0gZGVnVG9SYWQoTGF0KTtcbiAgdmFyIExvbmdSYWQgPSBkZWdUb1JhZChMb25nKTtcbiAgdmFyIExvbmdPcmlnaW5SYWQ7XG4gIHZhciBab25lTnVtYmVyO1xuICAvLyAoaW50KVxuICBab25lTnVtYmVyID0gTWF0aC5mbG9vcigoTG9uZyArIDE4MCkgLyA2KSArIDE7XG5cbiAgLy9NYWtlIHN1cmUgdGhlIGxvbmdpdHVkZSAxODAuMDAgaXMgaW4gWm9uZSA2MFxuICBpZiAoTG9uZyA9PT0gMTgwKSB7XG4gICAgWm9uZU51bWJlciA9IDYwO1xuICB9XG5cbiAgLy8gU3BlY2lhbCB6b25lIGZvciBOb3J3YXlcbiAgaWYgKExhdCA+PSA1Ni4wICYmIExhdCA8IDY0LjAgJiYgTG9uZyA+PSAzLjAgJiYgTG9uZyA8IDEyLjApIHtcbiAgICBab25lTnVtYmVyID0gMzI7XG4gIH1cblxuICAvLyBTcGVjaWFsIHpvbmVzIGZvciBTdmFsYmFyZFxuICBpZiAoTGF0ID49IDcyLjAgJiYgTGF0IDwgODQuMCkge1xuICAgIGlmIChMb25nID49IDAuMCAmJiBMb25nIDwgOS4wKSB7XG4gICAgICBab25lTnVtYmVyID0gMzE7XG4gICAgfVxuICAgIGVsc2UgaWYgKExvbmcgPj0gOS4wICYmIExvbmcgPCAyMS4wKSB7XG4gICAgICBab25lTnVtYmVyID0gMzM7XG4gICAgfVxuICAgIGVsc2UgaWYgKExvbmcgPj0gMjEuMCAmJiBMb25nIDwgMzMuMCkge1xuICAgICAgWm9uZU51bWJlciA9IDM1O1xuICAgIH1cbiAgICBlbHNlIGlmIChMb25nID49IDMzLjAgJiYgTG9uZyA8IDQyLjApIHtcbiAgICAgIFpvbmVOdW1iZXIgPSAzNztcbiAgICB9XG4gIH1cblxuICBMb25nT3JpZ2luID0gKFpvbmVOdW1iZXIgLSAxKSAqIDYgLSAxODAgKyAzOyAvLyszIHB1dHMgb3JpZ2luXG4gIC8vIGluIG1pZGRsZSBvZlxuICAvLyB6b25lXG4gIExvbmdPcmlnaW5SYWQgPSBkZWdUb1JhZChMb25nT3JpZ2luKTtcblxuICBlY2NQcmltZVNxdWFyZWQgPSAoZWNjU3F1YXJlZCkgLyAoMSAtIGVjY1NxdWFyZWQpO1xuXG4gIE4gPSBhIC8gTWF0aC5zcXJ0KDEgLSBlY2NTcXVhcmVkICogTWF0aC5zaW4oTGF0UmFkKSAqIE1hdGguc2luKExhdFJhZCkpO1xuICBUID0gTWF0aC50YW4oTGF0UmFkKSAqIE1hdGgudGFuKExhdFJhZCk7XG4gIEMgPSBlY2NQcmltZVNxdWFyZWQgKiBNYXRoLmNvcyhMYXRSYWQpICogTWF0aC5jb3MoTGF0UmFkKTtcbiAgQSA9IE1hdGguY29zKExhdFJhZCkgKiAoTG9uZ1JhZCAtIExvbmdPcmlnaW5SYWQpO1xuXG4gIE0gPSBhICogKCgxIC0gZWNjU3F1YXJlZCAvIDQgLSAzICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyA2NCAtIDUgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyAyNTYpICogTGF0UmFkIC0gKDMgKiBlY2NTcXVhcmVkIC8gOCArIDMgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAvIDMyICsgNDUgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyAxMDI0KSAqIE1hdGguc2luKDIgKiBMYXRSYWQpICsgKDE1ICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyAyNTYgKyA0NSAqIGVjY1NxdWFyZWQgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAvIDEwMjQpICogTWF0aC5zaW4oNCAqIExhdFJhZCkgLSAoMzUgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyAzMDcyKSAqIE1hdGguc2luKDYgKiBMYXRSYWQpKTtcblxuICB2YXIgVVRNRWFzdGluZyA9IChrMCAqIE4gKiAoQSArICgxIC0gVCArIEMpICogQSAqIEEgKiBBIC8gNi4wICsgKDUgLSAxOCAqIFQgKyBUICogVCArIDcyICogQyAtIDU4ICogZWNjUHJpbWVTcXVhcmVkKSAqIEEgKiBBICogQSAqIEEgKiBBIC8gMTIwLjApICsgNTAwMDAwLjApO1xuXG4gIHZhciBVVE1Ob3J0aGluZyA9IChrMCAqIChNICsgTiAqIE1hdGgudGFuKExhdFJhZCkgKiAoQSAqIEEgLyAyICsgKDUgLSBUICsgOSAqIEMgKyA0ICogQyAqIEMpICogQSAqIEEgKiBBICogQSAvIDI0LjAgKyAoNjEgLSA1OCAqIFQgKyBUICogVCArIDYwMCAqIEMgLSAzMzAgKiBlY2NQcmltZVNxdWFyZWQpICogQSAqIEEgKiBBICogQSAqIEEgKiBBIC8gNzIwLjApKSk7XG4gIGlmIChMYXQgPCAwLjApIHtcbiAgICBVVE1Ob3J0aGluZyArPSAxMDAwMDAwMC4wOyAvLzEwMDAwMDAwIG1ldGVyIG9mZnNldCBmb3JcbiAgICAvLyBzb3V0aGVybiBoZW1pc3BoZXJlXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5vcnRoaW5nOiBNYXRoLnJvdW5kKFVUTU5vcnRoaW5nKSxcbiAgICBlYXN0aW5nOiBNYXRoLnJvdW5kKFVUTUVhc3RpbmcpLFxuICAgIHpvbmVOdW1iZXI6IFpvbmVOdW1iZXIsXG4gICAgem9uZUxldHRlcjogZ2V0TGV0dGVyRGVzaWduYXRvcihMYXQpXG4gIH07XG59XG5cbi8qKlxuICogQ29udmVydHMgVVRNIGNvb3JkcyB0byBsYXQvbG9uZywgdXNpbmcgdGhlIFdHUzg0IGVsbGlwc29pZC4gVGhpcyBpcyBhIGNvbnZlbmllbmNlXG4gKiBjbGFzcyB3aGVyZSB0aGUgWm9uZSBjYW4gYmUgc3BlY2lmaWVkIGFzIGEgc2luZ2xlIHN0cmluZyBlZy5cIjYwTlwiIHdoaWNoXG4gKiBpcyB0aGVuIGJyb2tlbiBkb3duIGludG8gdGhlIFpvbmVOdW1iZXIgYW5kIFpvbmVMZXR0ZXIuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB1dG0gQW4gb2JqZWN0IGxpdGVyYWwgd2l0aCBub3J0aGluZywgZWFzdGluZywgem9uZU51bWJlclxuICogICAgIGFuZCB6b25lTGV0dGVyIHByb3BlcnRpZXMuIElmIGFuIG9wdGlvbmFsIGFjY3VyYWN5IHByb3BlcnR5IGlzXG4gKiAgICAgcHJvdmlkZWQgKGluIG1ldGVycyksIGEgYm91bmRpbmcgYm94IHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZlxuICogICAgIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUuXG4gKiBAcmV0dXJuIHtvYmplY3R9IEFuIG9iamVjdCBsaXRlcmFsIGNvbnRhaW5pbmcgZWl0aGVyIGxhdCBhbmQgbG9uIHZhbHVlc1xuICogICAgIChpZiBubyBhY2N1cmFjeSB3YXMgcHJvdmlkZWQpLCBvciB0b3AsIHJpZ2h0LCBib3R0b20gYW5kIGxlZnQgdmFsdWVzXG4gKiAgICAgZm9yIHRoZSBib3VuZGluZyBib3ggY2FsY3VsYXRlZCBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkIGFjY3VyYWN5LlxuICogICAgIFJldHVybnMgbnVsbCBpZiB0aGUgY29udmVyc2lvbiBmYWlsZWQuXG4gKi9cbmZ1bmN0aW9uIFVUTXRvTEwodXRtKSB7XG5cbiAgdmFyIFVUTU5vcnRoaW5nID0gdXRtLm5vcnRoaW5nO1xuICB2YXIgVVRNRWFzdGluZyA9IHV0bS5lYXN0aW5nO1xuICB2YXIgem9uZUxldHRlciA9IHV0bS56b25lTGV0dGVyO1xuICB2YXIgem9uZU51bWJlciA9IHV0bS56b25lTnVtYmVyO1xuICAvLyBjaGVjayB0aGUgWm9uZU51bW1iZXIgaXMgdmFsaWRcbiAgaWYgKHpvbmVOdW1iZXIgPCAwIHx8IHpvbmVOdW1iZXIgPiA2MCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIGswID0gMC45OTk2O1xuICB2YXIgYSA9IDYzNzgxMzcuMDsgLy9lbGxpcC5yYWRpdXM7XG4gIHZhciBlY2NTcXVhcmVkID0gMC4wMDY2OTQzODsgLy9lbGxpcC5lY2NzcTtcbiAgdmFyIGVjY1ByaW1lU3F1YXJlZDtcbiAgdmFyIGUxID0gKDEgLSBNYXRoLnNxcnQoMSAtIGVjY1NxdWFyZWQpKSAvICgxICsgTWF0aC5zcXJ0KDEgLSBlY2NTcXVhcmVkKSk7XG4gIHZhciBOMSwgVDEsIEMxLCBSMSwgRCwgTTtcbiAgdmFyIExvbmdPcmlnaW47XG4gIHZhciBtdSwgcGhpMVJhZDtcblxuICAvLyByZW1vdmUgNTAwLDAwMCBtZXRlciBvZmZzZXQgZm9yIGxvbmdpdHVkZVxuICB2YXIgeCA9IFVUTUVhc3RpbmcgLSA1MDAwMDAuMDtcbiAgdmFyIHkgPSBVVE1Ob3J0aGluZztcblxuICAvLyBXZSBtdXN0IGtub3cgc29tZWhvdyBpZiB3ZSBhcmUgaW4gdGhlIE5vcnRoZXJuIG9yIFNvdXRoZXJuXG4gIC8vIGhlbWlzcGhlcmUsIHRoaXMgaXMgdGhlIG9ubHkgdGltZSB3ZSB1c2UgdGhlIGxldHRlciBTbyBldmVuXG4gIC8vIGlmIHRoZSBab25lIGxldHRlciBpc24ndCBleGFjdGx5IGNvcnJlY3QgaXQgc2hvdWxkIGluZGljYXRlXG4gIC8vIHRoZSBoZW1pc3BoZXJlIGNvcnJlY3RseVxuICBpZiAoem9uZUxldHRlciA8ICdOJykge1xuICAgIHkgLT0gMTAwMDAwMDAuMDsgLy8gcmVtb3ZlIDEwLDAwMCwwMDAgbWV0ZXIgb2Zmc2V0IHVzZWRcbiAgICAvLyBmb3Igc291dGhlcm4gaGVtaXNwaGVyZVxuICB9XG5cbiAgLy8gVGhlcmUgYXJlIDYwIHpvbmVzIHdpdGggem9uZSAxIGJlaW5nIGF0IFdlc3QgLTE4MCB0byAtMTc0XG4gIExvbmdPcmlnaW4gPSAoem9uZU51bWJlciAtIDEpICogNiAtIDE4MCArIDM7IC8vICszIHB1dHMgb3JpZ2luXG4gIC8vIGluIG1pZGRsZSBvZlxuICAvLyB6b25lXG5cbiAgZWNjUHJpbWVTcXVhcmVkID0gKGVjY1NxdWFyZWQpIC8gKDEgLSBlY2NTcXVhcmVkKTtcblxuICBNID0geSAvIGswO1xuICBtdSA9IE0gLyAoYSAqICgxIC0gZWNjU3F1YXJlZCAvIDQgLSAzICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyA2NCAtIDUgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyAyNTYpKTtcblxuICBwaGkxUmFkID0gbXUgKyAoMyAqIGUxIC8gMiAtIDI3ICogZTEgKiBlMSAqIGUxIC8gMzIpICogTWF0aC5zaW4oMiAqIG11KSArICgyMSAqIGUxICogZTEgLyAxNiAtIDU1ICogZTEgKiBlMSAqIGUxICogZTEgLyAzMikgKiBNYXRoLnNpbig0ICogbXUpICsgKDE1MSAqIGUxICogZTEgKiBlMSAvIDk2KSAqIE1hdGguc2luKDYgKiBtdSk7XG4gIC8vIGRvdWJsZSBwaGkxID0gUHJvak1hdGgucmFkVG9EZWcocGhpMVJhZCk7XG5cbiAgTjEgPSBhIC8gTWF0aC5zcXJ0KDEgLSBlY2NTcXVhcmVkICogTWF0aC5zaW4ocGhpMVJhZCkgKiBNYXRoLnNpbihwaGkxUmFkKSk7XG4gIFQxID0gTWF0aC50YW4ocGhpMVJhZCkgKiBNYXRoLnRhbihwaGkxUmFkKTtcbiAgQzEgPSBlY2NQcmltZVNxdWFyZWQgKiBNYXRoLmNvcyhwaGkxUmFkKSAqIE1hdGguY29zKHBoaTFSYWQpO1xuICBSMSA9IGEgKiAoMSAtIGVjY1NxdWFyZWQpIC8gTWF0aC5wb3coMSAtIGVjY1NxdWFyZWQgKiBNYXRoLnNpbihwaGkxUmFkKSAqIE1hdGguc2luKHBoaTFSYWQpLCAxLjUpO1xuICBEID0geCAvIChOMSAqIGswKTtcblxuICB2YXIgbGF0ID0gcGhpMVJhZCAtIChOMSAqIE1hdGgudGFuKHBoaTFSYWQpIC8gUjEpICogKEQgKiBEIC8gMiAtICg1ICsgMyAqIFQxICsgMTAgKiBDMSAtIDQgKiBDMSAqIEMxIC0gOSAqIGVjY1ByaW1lU3F1YXJlZCkgKiBEICogRCAqIEQgKiBEIC8gMjQgKyAoNjEgKyA5MCAqIFQxICsgMjk4ICogQzEgKyA0NSAqIFQxICogVDEgLSAyNTIgKiBlY2NQcmltZVNxdWFyZWQgLSAzICogQzEgKiBDMSkgKiBEICogRCAqIEQgKiBEICogRCAqIEQgLyA3MjApO1xuICBsYXQgPSByYWRUb0RlZyhsYXQpO1xuXG4gIHZhciBsb24gPSAoRCAtICgxICsgMiAqIFQxICsgQzEpICogRCAqIEQgKiBEIC8gNiArICg1IC0gMiAqIEMxICsgMjggKiBUMSAtIDMgKiBDMSAqIEMxICsgOCAqIGVjY1ByaW1lU3F1YXJlZCArIDI0ICogVDEgKiBUMSkgKiBEICogRCAqIEQgKiBEICogRCAvIDEyMCkgLyBNYXRoLmNvcyhwaGkxUmFkKTtcbiAgbG9uID0gTG9uZ09yaWdpbiArIHJhZFRvRGVnKGxvbik7XG5cbiAgdmFyIHJlc3VsdDtcbiAgaWYgKHV0bS5hY2N1cmFjeSkge1xuICAgIHZhciB0b3BSaWdodCA9IFVUTXRvTEwoe1xuICAgICAgbm9ydGhpbmc6IHV0bS5ub3J0aGluZyArIHV0bS5hY2N1cmFjeSxcbiAgICAgIGVhc3Rpbmc6IHV0bS5lYXN0aW5nICsgdXRtLmFjY3VyYWN5LFxuICAgICAgem9uZUxldHRlcjogdXRtLnpvbmVMZXR0ZXIsXG4gICAgICB6b25lTnVtYmVyOiB1dG0uem9uZU51bWJlclxuICAgIH0pO1xuICAgIHJlc3VsdCA9IHtcbiAgICAgIHRvcDogdG9wUmlnaHQubGF0LFxuICAgICAgcmlnaHQ6IHRvcFJpZ2h0LmxvbixcbiAgICAgIGJvdHRvbTogbGF0LFxuICAgICAgbGVmdDogbG9uXG4gICAgfTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXN1bHQgPSB7XG4gICAgICBsYXQ6IGxhdCxcbiAgICAgIGxvbjogbG9uXG4gICAgfTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIE1HUlMgbGV0dGVyIGRlc2lnbmF0b3IgZm9yIHRoZSBnaXZlbiBsYXRpdHVkZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IGxhdCBUaGUgbGF0aXR1ZGUgaW4gV0dTODQgdG8gZ2V0IHRoZSBsZXR0ZXIgZGVzaWduYXRvclxuICogICAgIGZvci5cbiAqIEByZXR1cm4ge2NoYXJ9IFRoZSBsZXR0ZXIgZGVzaWduYXRvci5cbiAqL1xuZnVuY3Rpb24gZ2V0TGV0dGVyRGVzaWduYXRvcihsYXQpIHtcbiAgLy9UaGlzIGlzIGhlcmUgYXMgYW4gZXJyb3IgZmxhZyB0byBzaG93IHRoYXQgdGhlIExhdGl0dWRlIGlzXG4gIC8vb3V0c2lkZSBNR1JTIGxpbWl0c1xuICB2YXIgTGV0dGVyRGVzaWduYXRvciA9ICdaJztcblxuICBpZiAoKDg0ID49IGxhdCkgJiYgKGxhdCA+PSA3MikpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1gnO1xuICB9XG4gIGVsc2UgaWYgKCg3MiA+IGxhdCkgJiYgKGxhdCA+PSA2NCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1cnO1xuICB9XG4gIGVsc2UgaWYgKCg2NCA+IGxhdCkgJiYgKGxhdCA+PSA1NikpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1YnO1xuICB9XG4gIGVsc2UgaWYgKCg1NiA+IGxhdCkgJiYgKGxhdCA+PSA0OCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1UnO1xuICB9XG4gIGVsc2UgaWYgKCg0OCA+IGxhdCkgJiYgKGxhdCA+PSA0MCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1QnO1xuICB9XG4gIGVsc2UgaWYgKCg0MCA+IGxhdCkgJiYgKGxhdCA+PSAzMikpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1MnO1xuICB9XG4gIGVsc2UgaWYgKCgzMiA+IGxhdCkgJiYgKGxhdCA+PSAyNCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1InO1xuICB9XG4gIGVsc2UgaWYgKCgyNCA+IGxhdCkgJiYgKGxhdCA+PSAxNikpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1EnO1xuICB9XG4gIGVsc2UgaWYgKCgxNiA+IGxhdCkgJiYgKGxhdCA+PSA4KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnUCc7XG4gIH1cbiAgZWxzZSBpZiAoKDggPiBsYXQpICYmIChsYXQgPj0gMCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ04nO1xuICB9XG4gIGVsc2UgaWYgKCgwID4gbGF0KSAmJiAobGF0ID49IC04KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnTSc7XG4gIH1cbiAgZWxzZSBpZiAoKC04ID4gbGF0KSAmJiAobGF0ID49IC0xNikpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ0wnO1xuICB9XG4gIGVsc2UgaWYgKCgtMTYgPiBsYXQpICYmIChsYXQgPj0gLTI0KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnSyc7XG4gIH1cbiAgZWxzZSBpZiAoKC0yNCA+IGxhdCkgJiYgKGxhdCA+PSAtMzIpKSB7XG4gICAgTGV0dGVyRGVzaWduYXRvciA9ICdKJztcbiAgfVxuICBlbHNlIGlmICgoLTMyID4gbGF0KSAmJiAobGF0ID49IC00MCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ0gnO1xuICB9XG4gIGVsc2UgaWYgKCgtNDAgPiBsYXQpICYmIChsYXQgPj0gLTQ4KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnRyc7XG4gIH1cbiAgZWxzZSBpZiAoKC00OCA+IGxhdCkgJiYgKGxhdCA+PSAtNTYpKSB7XG4gICAgTGV0dGVyRGVzaWduYXRvciA9ICdGJztcbiAgfVxuICBlbHNlIGlmICgoLTU2ID4gbGF0KSAmJiAobGF0ID49IC02NCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ0UnO1xuICB9XG4gIGVsc2UgaWYgKCgtNjQgPiBsYXQpICYmIChsYXQgPj0gLTcyKSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnRCc7XG4gIH1cbiAgZWxzZSBpZiAoKC03MiA+IGxhdCkgJiYgKGxhdCA+PSAtODApKSB7XG4gICAgTGV0dGVyRGVzaWduYXRvciA9ICdDJztcbiAgfVxuICByZXR1cm4gTGV0dGVyRGVzaWduYXRvcjtcbn1cblxuLyoqXG4gKiBFbmNvZGVzIGEgVVRNIGxvY2F0aW9uIGFzIE1HUlMgc3RyaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gdXRtIEFuIG9iamVjdCBsaXRlcmFsIHdpdGggZWFzdGluZywgbm9ydGhpbmcsXG4gKiAgICAgem9uZUxldHRlciwgem9uZU51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGFjY3VyYWN5IEFjY3VyYWN5IGluIGRpZ2l0cyAoMS01KS5cbiAqIEByZXR1cm4ge3N0cmluZ30gTUdSUyBzdHJpbmcgZm9yIHRoZSBnaXZlbiBVVE0gbG9jYXRpb24uXG4gKi9cbmZ1bmN0aW9uIGVuY29kZSh1dG0sIGFjY3VyYWN5KSB7XG4gIC8vIHByZXBlbmQgd2l0aCBsZWFkaW5nIHplcm9lc1xuICB2YXIgc2Vhc3RpbmcgPSBcIjAwMDAwXCIgKyB1dG0uZWFzdGluZyxcbiAgICBzbm9ydGhpbmcgPSBcIjAwMDAwXCIgKyB1dG0ubm9ydGhpbmc7XG5cbiAgcmV0dXJuIHV0bS56b25lTnVtYmVyICsgdXRtLnpvbmVMZXR0ZXIgKyBnZXQxMDBrSUQodXRtLmVhc3RpbmcsIHV0bS5ub3J0aGluZywgdXRtLnpvbmVOdW1iZXIpICsgc2Vhc3Rpbmcuc3Vic3RyKHNlYXN0aW5nLmxlbmd0aCAtIDUsIGFjY3VyYWN5KSArIHNub3J0aGluZy5zdWJzdHIoc25vcnRoaW5nLmxlbmd0aCAtIDUsIGFjY3VyYWN5KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHR3byBsZXR0ZXIgMTAwayBkZXNpZ25hdG9yIGZvciBhIGdpdmVuIFVUTSBlYXN0aW5nLFxuICogbm9ydGhpbmcgYW5kIHpvbmUgbnVtYmVyIHZhbHVlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gZWFzdGluZ1xuICogQHBhcmFtIHtudW1iZXJ9IG5vcnRoaW5nXG4gKiBAcGFyYW0ge251bWJlcn0gem9uZU51bWJlclxuICogQHJldHVybiB0aGUgdHdvIGxldHRlciAxMDBrIGRlc2lnbmF0b3IgZm9yIHRoZSBnaXZlbiBVVE0gbG9jYXRpb24uXG4gKi9cbmZ1bmN0aW9uIGdldDEwMGtJRChlYXN0aW5nLCBub3J0aGluZywgem9uZU51bWJlcikge1xuICB2YXIgc2V0UGFybSA9IGdldDEwMGtTZXRGb3Jab25lKHpvbmVOdW1iZXIpO1xuICB2YXIgc2V0Q29sdW1uID0gTWF0aC5mbG9vcihlYXN0aW5nIC8gMTAwMDAwKTtcbiAgdmFyIHNldFJvdyA9IE1hdGguZmxvb3Iobm9ydGhpbmcgLyAxMDAwMDApICUgMjA7XG4gIHJldHVybiBnZXRMZXR0ZXIxMDBrSUQoc2V0Q29sdW1uLCBzZXRSb3csIHNldFBhcm0pO1xufVxuXG4vKipcbiAqIEdpdmVuIGEgVVRNIHpvbmUgbnVtYmVyLCBmaWd1cmUgb3V0IHRoZSBNR1JTIDEwMEsgc2V0IGl0IGlzIGluLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gaSBBbiBVVE0gem9uZSBudW1iZXIuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSAxMDBrIHNldCB0aGUgVVRNIHpvbmUgaXMgaW4uXG4gKi9cbmZ1bmN0aW9uIGdldDEwMGtTZXRGb3Jab25lKGkpIHtcbiAgdmFyIHNldFBhcm0gPSBpICUgTlVNXzEwMEtfU0VUUztcbiAgaWYgKHNldFBhcm0gPT09IDApIHtcbiAgICBzZXRQYXJtID0gTlVNXzEwMEtfU0VUUztcbiAgfVxuXG4gIHJldHVybiBzZXRQYXJtO1xufVxuXG4vKipcbiAqIEdldCB0aGUgdHdvLWxldHRlciBNR1JTIDEwMGsgZGVzaWduYXRvciBnaXZlbiBpbmZvcm1hdGlvblxuICogdHJhbnNsYXRlZCBmcm9tIHRoZSBVVE0gbm9ydGhpbmcsIGVhc3RpbmcgYW5kIHpvbmUgbnVtYmVyLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gY29sdW1uIHRoZSBjb2x1bW4gaW5kZXggYXMgaXQgcmVsYXRlcyB0byB0aGUgTUdSU1xuICogICAgICAgIDEwMGsgc2V0IHNwcmVhZHNoZWV0LCBjcmVhdGVkIGZyb20gdGhlIFVUTSBlYXN0aW5nLlxuICogICAgICAgIFZhbHVlcyBhcmUgMS04LlxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyB0aGUgcm93IGluZGV4IGFzIGl0IHJlbGF0ZXMgdG8gdGhlIE1HUlMgMTAwayBzZXRcbiAqICAgICAgICBzcHJlYWRzaGVldCwgY3JlYXRlZCBmcm9tIHRoZSBVVE0gbm9ydGhpbmcgdmFsdWUuIFZhbHVlc1xuICogICAgICAgIGFyZSBmcm9tIDAtMTkuXG4gKiBAcGFyYW0ge251bWJlcn0gcGFybSB0aGUgc2V0IGJsb2NrLCBhcyBpdCByZWxhdGVzIHRvIHRoZSBNR1JTIDEwMGsgc2V0XG4gKiAgICAgICAgc3ByZWFkc2hlZXQsIGNyZWF0ZWQgZnJvbSB0aGUgVVRNIHpvbmUuIFZhbHVlcyBhcmUgZnJvbVxuICogICAgICAgIDEtNjAuXG4gKiBAcmV0dXJuIHR3byBsZXR0ZXIgTUdSUyAxMDBrIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIGdldExldHRlcjEwMGtJRChjb2x1bW4sIHJvdywgcGFybSkge1xuICAvLyBjb2xPcmlnaW4gYW5kIHJvd09yaWdpbiBhcmUgdGhlIGxldHRlcnMgYXQgdGhlIG9yaWdpbiBvZiB0aGUgc2V0XG4gIHZhciBpbmRleCA9IHBhcm0gLSAxO1xuICB2YXIgY29sT3JpZ2luID0gU0VUX09SSUdJTl9DT0xVTU5fTEVUVEVSUy5jaGFyQ29kZUF0KGluZGV4KTtcbiAgdmFyIHJvd09yaWdpbiA9IFNFVF9PUklHSU5fUk9XX0xFVFRFUlMuY2hhckNvZGVBdChpbmRleCk7XG5cbiAgLy8gY29sSW50IGFuZCByb3dJbnQgYXJlIHRoZSBsZXR0ZXJzIHRvIGJ1aWxkIHRvIHJldHVyblxuICB2YXIgY29sSW50ID0gY29sT3JpZ2luICsgY29sdW1uIC0gMTtcbiAgdmFyIHJvd0ludCA9IHJvd09yaWdpbiArIHJvdztcbiAgdmFyIHJvbGxvdmVyID0gZmFsc2U7XG5cbiAgaWYgKGNvbEludCA+IFopIHtcbiAgICBjb2xJbnQgPSBjb2xJbnQgLSBaICsgQSAtIDE7XG4gICAgcm9sbG92ZXIgPSB0cnVlO1xuICB9XG5cbiAgaWYgKGNvbEludCA9PT0gSSB8fCAoY29sT3JpZ2luIDwgSSAmJiBjb2xJbnQgPiBJKSB8fCAoKGNvbEludCA+IEkgfHwgY29sT3JpZ2luIDwgSSkgJiYgcm9sbG92ZXIpKSB7XG4gICAgY29sSW50Kys7XG4gIH1cblxuICBpZiAoY29sSW50ID09PSBPIHx8IChjb2xPcmlnaW4gPCBPICYmIGNvbEludCA+IE8pIHx8ICgoY29sSW50ID4gTyB8fCBjb2xPcmlnaW4gPCBPKSAmJiByb2xsb3ZlcikpIHtcbiAgICBjb2xJbnQrKztcblxuICAgIGlmIChjb2xJbnQgPT09IEkpIHtcbiAgICAgIGNvbEludCsrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb2xJbnQgPiBaKSB7XG4gICAgY29sSW50ID0gY29sSW50IC0gWiArIEEgLSAxO1xuICB9XG5cbiAgaWYgKHJvd0ludCA+IFYpIHtcbiAgICByb3dJbnQgPSByb3dJbnQgLSBWICsgQSAtIDE7XG4gICAgcm9sbG92ZXIgPSB0cnVlO1xuICB9XG4gIGVsc2Uge1xuICAgIHJvbGxvdmVyID0gZmFsc2U7XG4gIH1cblxuICBpZiAoKChyb3dJbnQgPT09IEkpIHx8ICgocm93T3JpZ2luIDwgSSkgJiYgKHJvd0ludCA+IEkpKSkgfHwgKCgocm93SW50ID4gSSkgfHwgKHJvd09yaWdpbiA8IEkpKSAmJiByb2xsb3ZlcikpIHtcbiAgICByb3dJbnQrKztcbiAgfVxuXG4gIGlmICgoKHJvd0ludCA9PT0gTykgfHwgKChyb3dPcmlnaW4gPCBPKSAmJiAocm93SW50ID4gTykpKSB8fCAoKChyb3dJbnQgPiBPKSB8fCAocm93T3JpZ2luIDwgTykpICYmIHJvbGxvdmVyKSkge1xuICAgIHJvd0ludCsrO1xuXG4gICAgaWYgKHJvd0ludCA9PT0gSSkge1xuICAgICAgcm93SW50Kys7XG4gICAgfVxuICB9XG5cbiAgaWYgKHJvd0ludCA+IFYpIHtcbiAgICByb3dJbnQgPSByb3dJbnQgLSBWICsgQSAtIDE7XG4gIH1cblxuICB2YXIgdHdvTGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2xJbnQpICsgU3RyaW5nLmZyb21DaGFyQ29kZShyb3dJbnQpO1xuICByZXR1cm4gdHdvTGV0dGVyO1xufVxuXG4vKipcbiAqIERlY29kZSB0aGUgVVRNIHBhcmFtZXRlcnMgZnJvbSBhIE1HUlMgc3RyaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWdyc1N0cmluZyBhbiBVUFBFUkNBU0UgY29vcmRpbmF0ZSBzdHJpbmcgaXMgZXhwZWN0ZWQuXG4gKiBAcmV0dXJuIHtvYmplY3R9IEFuIG9iamVjdCBsaXRlcmFsIHdpdGggZWFzdGluZywgbm9ydGhpbmcsIHpvbmVMZXR0ZXIsXG4gKiAgICAgem9uZU51bWJlciBhbmQgYWNjdXJhY3kgKGluIG1ldGVycykgcHJvcGVydGllcy5cbiAqL1xuZnVuY3Rpb24gZGVjb2RlKG1ncnNTdHJpbmcpIHtcblxuICBpZiAobWdyc1N0cmluZyAmJiBtZ3JzU3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IChcIk1HUlNQb2ludCBjb3ZlcnRpbmcgZnJvbSBub3RoaW5nXCIpO1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9IG1ncnNTdHJpbmcubGVuZ3RoO1xuXG4gIHZhciBodW5LID0gbnVsbDtcbiAgdmFyIHNiID0gXCJcIjtcbiAgdmFyIHRlc3RDaGFyO1xuICB2YXIgaSA9IDA7XG5cbiAgLy8gZ2V0IFpvbmUgbnVtYmVyXG4gIHdoaWxlICghKC9bQS1aXS8pLnRlc3QodGVzdENoYXIgPSBtZ3JzU3RyaW5nLmNoYXJBdChpKSkpIHtcbiAgICBpZiAoaSA+PSAyKSB7XG4gICAgICB0aHJvdyAoXCJNR1JTUG9pbnQgYmFkIGNvbnZlcnNpb24gZnJvbTogXCIgKyBtZ3JzU3RyaW5nKTtcbiAgICB9XG4gICAgc2IgKz0gdGVzdENoYXI7XG4gICAgaSsrO1xuICB9XG5cbiAgdmFyIHpvbmVOdW1iZXIgPSBwYXJzZUludChzYiwgMTApO1xuXG4gIGlmIChpID09PSAwIHx8IGkgKyAzID4gbGVuZ3RoKSB7XG4gICAgLy8gQSBnb29kIE1HUlMgc3RyaW5nIGhhcyB0byBiZSA0LTUgZGlnaXRzIGxvbmcsXG4gICAgLy8gIyNBQUEvI0FBQSBhdCBsZWFzdC5cbiAgICB0aHJvdyAoXCJNR1JTUG9pbnQgYmFkIGNvbnZlcnNpb24gZnJvbTogXCIgKyBtZ3JzU3RyaW5nKTtcbiAgfVxuXG4gIHZhciB6b25lTGV0dGVyID0gbWdyc1N0cmluZy5jaGFyQXQoaSsrKTtcblxuICAvLyBTaG91bGQgd2UgY2hlY2sgdGhlIHpvbmUgbGV0dGVyIGhlcmU/IFdoeSBub3QuXG4gIGlmICh6b25lTGV0dGVyIDw9ICdBJyB8fCB6b25lTGV0dGVyID09PSAnQicgfHwgem9uZUxldHRlciA9PT0gJ1knIHx8IHpvbmVMZXR0ZXIgPj0gJ1onIHx8IHpvbmVMZXR0ZXIgPT09ICdJJyB8fCB6b25lTGV0dGVyID09PSAnTycpIHtcbiAgICB0aHJvdyAoXCJNR1JTUG9pbnQgem9uZSBsZXR0ZXIgXCIgKyB6b25lTGV0dGVyICsgXCIgbm90IGhhbmRsZWQ6IFwiICsgbWdyc1N0cmluZyk7XG4gIH1cblxuICBodW5LID0gbWdyc1N0cmluZy5zdWJzdHJpbmcoaSwgaSArPSAyKTtcblxuICB2YXIgc2V0ID0gZ2V0MTAwa1NldEZvclpvbmUoem9uZU51bWJlcik7XG5cbiAgdmFyIGVhc3QxMDBrID0gZ2V0RWFzdGluZ0Zyb21DaGFyKGh1bksuY2hhckF0KDApLCBzZXQpO1xuICB2YXIgbm9ydGgxMDBrID0gZ2V0Tm9ydGhpbmdGcm9tQ2hhcihodW5LLmNoYXJBdCgxKSwgc2V0KTtcblxuICAvLyBXZSBoYXZlIGEgYnVnIHdoZXJlIHRoZSBub3J0aGluZyBtYXkgYmUgMjAwMDAwMCB0b28gbG93LlxuICAvLyBIb3dcbiAgLy8gZG8gd2Uga25vdyB3aGVuIHRvIHJvbGwgb3Zlcj9cblxuICB3aGlsZSAobm9ydGgxMDBrIDwgZ2V0TWluTm9ydGhpbmcoem9uZUxldHRlcikpIHtcbiAgICBub3J0aDEwMGsgKz0gMjAwMDAwMDtcbiAgfVxuXG4gIC8vIGNhbGN1bGF0ZSB0aGUgY2hhciBpbmRleCBmb3IgZWFzdGluZy9ub3J0aGluZyBzZXBhcmF0b3JcbiAgdmFyIHJlbWFpbmRlciA9IGxlbmd0aCAtIGk7XG5cbiAgaWYgKHJlbWFpbmRlciAlIDIgIT09IDApIHtcbiAgICB0aHJvdyAoXCJNR1JTUG9pbnQgaGFzIHRvIGhhdmUgYW4gZXZlbiBudW1iZXIgXFxub2YgZGlnaXRzIGFmdGVyIHRoZSB6b25lIGxldHRlciBhbmQgdHdvIDEwMGttIGxldHRlcnMgLSBmcm9udCBcXG5oYWxmIGZvciBlYXN0aW5nIG1ldGVycywgc2Vjb25kIGhhbGYgZm9yIFxcbm5vcnRoaW5nIG1ldGVyc1wiICsgbWdyc1N0cmluZyk7XG4gIH1cblxuICB2YXIgc2VwID0gcmVtYWluZGVyIC8gMjtcblxuICB2YXIgc2VwRWFzdGluZyA9IDAuMDtcbiAgdmFyIHNlcE5vcnRoaW5nID0gMC4wO1xuICB2YXIgYWNjdXJhY3lCb251cywgc2VwRWFzdGluZ1N0cmluZywgc2VwTm9ydGhpbmdTdHJpbmcsIGVhc3RpbmcsIG5vcnRoaW5nO1xuICBpZiAoc2VwID4gMCkge1xuICAgIGFjY3VyYWN5Qm9udXMgPSAxMDAwMDAuMCAvIE1hdGgucG93KDEwLCBzZXApO1xuICAgIHNlcEVhc3RpbmdTdHJpbmcgPSBtZ3JzU3RyaW5nLnN1YnN0cmluZyhpLCBpICsgc2VwKTtcbiAgICBzZXBFYXN0aW5nID0gcGFyc2VGbG9hdChzZXBFYXN0aW5nU3RyaW5nKSAqIGFjY3VyYWN5Qm9udXM7XG4gICAgc2VwTm9ydGhpbmdTdHJpbmcgPSBtZ3JzU3RyaW5nLnN1YnN0cmluZyhpICsgc2VwKTtcbiAgICBzZXBOb3J0aGluZyA9IHBhcnNlRmxvYXQoc2VwTm9ydGhpbmdTdHJpbmcpICogYWNjdXJhY3lCb251cztcbiAgfVxuXG4gIGVhc3RpbmcgPSBzZXBFYXN0aW5nICsgZWFzdDEwMGs7XG4gIG5vcnRoaW5nID0gc2VwTm9ydGhpbmcgKyBub3J0aDEwMGs7XG5cbiAgcmV0dXJuIHtcbiAgICBlYXN0aW5nOiBlYXN0aW5nLFxuICAgIG5vcnRoaW5nOiBub3J0aGluZyxcbiAgICB6b25lTGV0dGVyOiB6b25lTGV0dGVyLFxuICAgIHpvbmVOdW1iZXI6IHpvbmVOdW1iZXIsXG4gICAgYWNjdXJhY3k6IGFjY3VyYWN5Qm9udXNcbiAgfTtcbn1cblxuLyoqXG4gKiBHaXZlbiB0aGUgZmlyc3QgbGV0dGVyIGZyb20gYSB0d28tbGV0dGVyIE1HUlMgMTAwayB6b25lLCBhbmQgZ2l2ZW4gdGhlXG4gKiBNR1JTIHRhYmxlIHNldCBmb3IgdGhlIHpvbmUgbnVtYmVyLCBmaWd1cmUgb3V0IHRoZSBlYXN0aW5nIHZhbHVlIHRoYXRcbiAqIHNob3VsZCBiZSBhZGRlZCB0byB0aGUgb3RoZXIsIHNlY29uZGFyeSBlYXN0aW5nIHZhbHVlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2NoYXJ9IGUgVGhlIGZpcnN0IGxldHRlciBmcm9tIGEgdHdvLWxldHRlciBNR1JTIDEwMMK0ayB6b25lLlxuICogQHBhcmFtIHtudW1iZXJ9IHNldCBUaGUgTUdSUyB0YWJsZSBzZXQgZm9yIHRoZSB6b25lIG51bWJlci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGVhc3RpbmcgdmFsdWUgZm9yIHRoZSBnaXZlbiBsZXR0ZXIgYW5kIHNldC5cbiAqL1xuZnVuY3Rpb24gZ2V0RWFzdGluZ0Zyb21DaGFyKGUsIHNldCkge1xuICAvLyBjb2xPcmlnaW4gaXMgdGhlIGxldHRlciBhdCB0aGUgb3JpZ2luIG9mIHRoZSBzZXQgZm9yIHRoZVxuICAvLyBjb2x1bW5cbiAgdmFyIGN1ckNvbCA9IFNFVF9PUklHSU5fQ09MVU1OX0xFVFRFUlMuY2hhckNvZGVBdChzZXQgLSAxKTtcbiAgdmFyIGVhc3RpbmdWYWx1ZSA9IDEwMDAwMC4wO1xuICB2YXIgcmV3aW5kTWFya2VyID0gZmFsc2U7XG5cbiAgd2hpbGUgKGN1ckNvbCAhPT0gZS5jaGFyQ29kZUF0KDApKSB7XG4gICAgY3VyQ29sKys7XG4gICAgaWYgKGN1ckNvbCA9PT0gSSkge1xuICAgICAgY3VyQ29sKys7XG4gICAgfVxuICAgIGlmIChjdXJDb2wgPT09IE8pIHtcbiAgICAgIGN1ckNvbCsrO1xuICAgIH1cbiAgICBpZiAoY3VyQ29sID4gWikge1xuICAgICAgaWYgKHJld2luZE1hcmtlcikge1xuICAgICAgICB0aHJvdyAoXCJCYWQgY2hhcmFjdGVyOiBcIiArIGUpO1xuICAgICAgfVxuICAgICAgY3VyQ29sID0gQTtcbiAgICAgIHJld2luZE1hcmtlciA9IHRydWU7XG4gICAgfVxuICAgIGVhc3RpbmdWYWx1ZSArPSAxMDAwMDAuMDtcbiAgfVxuXG4gIHJldHVybiBlYXN0aW5nVmFsdWU7XG59XG5cbi8qKlxuICogR2l2ZW4gdGhlIHNlY29uZCBsZXR0ZXIgZnJvbSBhIHR3by1sZXR0ZXIgTUdSUyAxMDBrIHpvbmUsIGFuZCBnaXZlbiB0aGVcbiAqIE1HUlMgdGFibGUgc2V0IGZvciB0aGUgem9uZSBudW1iZXIsIGZpZ3VyZSBvdXQgdGhlIG5vcnRoaW5nIHZhbHVlIHRoYXRcbiAqIHNob3VsZCBiZSBhZGRlZCB0byB0aGUgb3RoZXIsIHNlY29uZGFyeSBub3J0aGluZyB2YWx1ZS4gWW91IGhhdmUgdG9cbiAqIHJlbWVtYmVyIHRoYXQgTm9ydGhpbmdzIGFyZSBkZXRlcm1pbmVkIGZyb20gdGhlIGVxdWF0b3IsIGFuZCB0aGUgdmVydGljYWxcbiAqIGN5Y2xlIG9mIGxldHRlcnMgbWVhbiBhIDIwMDAwMDAgYWRkaXRpb25hbCBub3J0aGluZyBtZXRlcnMuIFRoaXMgaGFwcGVuc1xuICogYXBwcm94LiBldmVyeSAxOCBkZWdyZWVzIG9mIGxhdGl0dWRlLiBUaGlzIG1ldGhvZCBkb2VzICpOT1QqIGNvdW50IGFueVxuICogYWRkaXRpb25hbCBub3J0aGluZ3MuIFlvdSBoYXZlIHRvIGZpZ3VyZSBvdXQgaG93IG1hbnkgMjAwMDAwMCBtZXRlcnMgbmVlZFxuICogdG8gYmUgYWRkZWQgZm9yIHRoZSB6b25lIGxldHRlciBvZiB0aGUgTUdSUyBjb29yZGluYXRlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2NoYXJ9IG4gU2Vjb25kIGxldHRlciBvZiB0aGUgTUdSUyAxMDBrIHpvbmVcbiAqIEBwYXJhbSB7bnVtYmVyfSBzZXQgVGhlIE1HUlMgdGFibGUgc2V0IG51bWJlciwgd2hpY2ggaXMgZGVwZW5kZW50IG9uIHRoZVxuICogICAgIFVUTSB6b25lIG51bWJlci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG5vcnRoaW5nIHZhbHVlIGZvciB0aGUgZ2l2ZW4gbGV0dGVyIGFuZCBzZXQuXG4gKi9cbmZ1bmN0aW9uIGdldE5vcnRoaW5nRnJvbUNoYXIobiwgc2V0KSB7XG5cbiAgaWYgKG4gPiAnVicpIHtcbiAgICB0aHJvdyAoXCJNR1JTUG9pbnQgZ2l2ZW4gaW52YWxpZCBOb3J0aGluZyBcIiArIG4pO1xuICB9XG5cbiAgLy8gcm93T3JpZ2luIGlzIHRoZSBsZXR0ZXIgYXQgdGhlIG9yaWdpbiBvZiB0aGUgc2V0IGZvciB0aGVcbiAgLy8gY29sdW1uXG4gIHZhciBjdXJSb3cgPSBTRVRfT1JJR0lOX1JPV19MRVRURVJTLmNoYXJDb2RlQXQoc2V0IC0gMSk7XG4gIHZhciBub3J0aGluZ1ZhbHVlID0gMC4wO1xuICB2YXIgcmV3aW5kTWFya2VyID0gZmFsc2U7XG5cbiAgd2hpbGUgKGN1clJvdyAhPT0gbi5jaGFyQ29kZUF0KDApKSB7XG4gICAgY3VyUm93Kys7XG4gICAgaWYgKGN1clJvdyA9PT0gSSkge1xuICAgICAgY3VyUm93Kys7XG4gICAgfVxuICAgIGlmIChjdXJSb3cgPT09IE8pIHtcbiAgICAgIGN1clJvdysrO1xuICAgIH1cbiAgICAvLyBmaXhpbmcgYSBidWcgbWFraW5nIHdob2xlIGFwcGxpY2F0aW9uIGhhbmcgaW4gdGhpcyBsb29wXG4gICAgLy8gd2hlbiAnbicgaXMgYSB3cm9uZyBjaGFyYWN0ZXJcbiAgICBpZiAoY3VyUm93ID4gVikge1xuICAgICAgaWYgKHJld2luZE1hcmtlcikgeyAvLyBtYWtpbmcgc3VyZSB0aGF0IHRoaXMgbG9vcCBlbmRzXG4gICAgICAgIHRocm93IChcIkJhZCBjaGFyYWN0ZXI6IFwiICsgbik7XG4gICAgICB9XG4gICAgICBjdXJSb3cgPSBBO1xuICAgICAgcmV3aW5kTWFya2VyID0gdHJ1ZTtcbiAgICB9XG4gICAgbm9ydGhpbmdWYWx1ZSArPSAxMDAwMDAuMDtcbiAgfVxuXG4gIHJldHVybiBub3J0aGluZ1ZhbHVlO1xufVxuXG4vKipcbiAqIFRoZSBmdW5jdGlvbiBnZXRNaW5Ob3J0aGluZyByZXR1cm5zIHRoZSBtaW5pbXVtIG5vcnRoaW5nIHZhbHVlIG9mIGEgTUdSU1xuICogem9uZS5cbiAqXG4gKiBQb3J0ZWQgZnJvbSBHZW90cmFucycgYyBMYXR0aXR1ZGVfQmFuZF9WYWx1ZSBzdHJ1Y3R1cmUgdGFibGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Y2hhcn0gem9uZUxldHRlciBUaGUgTUdSUyB6b25lIHRvIGdldCB0aGUgbWluIG5vcnRoaW5nIGZvci5cbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0TWluTm9ydGhpbmcoem9uZUxldHRlcikge1xuICB2YXIgbm9ydGhpbmc7XG4gIHN3aXRjaCAoem9uZUxldHRlcikge1xuICBjYXNlICdDJzpcbiAgICBub3J0aGluZyA9IDExMDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnRCc6XG4gICAgbm9ydGhpbmcgPSAyMDAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ0UnOlxuICAgIG5vcnRoaW5nID0gMjgwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdGJzpcbiAgICBub3J0aGluZyA9IDM3MDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnRyc6XG4gICAgbm9ydGhpbmcgPSA0NjAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ0gnOlxuICAgIG5vcnRoaW5nID0gNTUwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdKJzpcbiAgICBub3J0aGluZyA9IDY0MDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnSyc6XG4gICAgbm9ydGhpbmcgPSA3MzAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ0wnOlxuICAgIG5vcnRoaW5nID0gODIwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdNJzpcbiAgICBub3J0aGluZyA9IDkxMDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnTic6XG4gICAgbm9ydGhpbmcgPSAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ1AnOlxuICAgIG5vcnRoaW5nID0gODAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ1EnOlxuICAgIG5vcnRoaW5nID0gMTcwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdSJzpcbiAgICBub3J0aGluZyA9IDI2MDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnUyc6XG4gICAgbm9ydGhpbmcgPSAzNTAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ1QnOlxuICAgIG5vcnRoaW5nID0gNDQwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdVJzpcbiAgICBub3J0aGluZyA9IDUzMDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnVic6XG4gICAgbm9ydGhpbmcgPSA2MjAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ1cnOlxuICAgIG5vcnRoaW5nID0gNzAwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdYJzpcbiAgICBub3J0aGluZyA9IDc5MDAwMDAuMDtcbiAgICBicmVhaztcbiAgZGVmYXVsdDpcbiAgICBub3J0aGluZyA9IC0xLjA7XG4gIH1cbiAgaWYgKG5vcnRoaW5nID49IDAuMCkge1xuICAgIHJldHVybiBub3J0aGluZztcbiAgfVxuICBlbHNlIHtcbiAgICB0aHJvdyAoXCJJbnZhbGlkIHpvbmUgbGV0dGVyOiBcIiArIHpvbmVMZXR0ZXIpO1xuICB9XG5cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21ncnMvbWdycy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbWdycy9tZ3JzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7dG9Qb2ludCwgZm9yd2FyZH0gZnJvbSAnbWdycyc7XG5cbmZ1bmN0aW9uIFBvaW50KHgsIHksIHopIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBvaW50KSkge1xuICAgIHJldHVybiBuZXcgUG9pbnQoeCwgeSwgeik7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkoeCkpIHtcbiAgICB0aGlzLnggPSB4WzBdO1xuICAgIHRoaXMueSA9IHhbMV07XG4gICAgdGhpcy56ID0geFsyXSB8fCAwLjA7XG4gIH0gZWxzZSBpZih0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICB0aGlzLnggPSB4Lng7XG4gICAgdGhpcy55ID0geC55O1xuICAgIHRoaXMueiA9IHgueiB8fCAwLjA7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnICYmIHR5cGVvZiB5ID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBjb29yZHMgPSB4LnNwbGl0KCcsJyk7XG4gICAgdGhpcy54ID0gcGFyc2VGbG9hdChjb29yZHNbMF0sIDEwKTtcbiAgICB0aGlzLnkgPSBwYXJzZUZsb2F0KGNvb3Jkc1sxXSwgMTApO1xuICAgIHRoaXMueiA9IHBhcnNlRmxvYXQoY29vcmRzWzJdLCAxMCkgfHwgMC4wO1xuICB9IGVsc2Uge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnogPSB6IHx8IDAuMDtcbiAgfVxuICBjb25zb2xlLndhcm4oJ3Byb2o0LlBvaW50IHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDMsIHVzZSBwcm9qNC50b1BvaW50Jyk7XG59XG5cblBvaW50LmZyb21NR1JTID0gZnVuY3Rpb24obWdyc1N0cikge1xuICByZXR1cm4gbmV3IFBvaW50KHRvUG9pbnQobWdyc1N0cikpO1xufTtcblBvaW50LnByb3RvdHlwZS50b01HUlMgPSBmdW5jdGlvbihhY2N1cmFjeSkge1xuICByZXR1cm4gZm9yd2FyZChbdGhpcy54LCB0aGlzLnldLCBhY2N1cmFjeSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgUG9pbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvUG9pbnQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9Qb2ludC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgcGFyc2VDb2RlIGZyb20gJy4vcGFyc2VDb2RlJztcbmltcG9ydCBleHRlbmQgZnJvbSAnLi9leHRlbmQnO1xuaW1wb3J0IHByb2plY3Rpb25zIGZyb20gJy4vcHJvamVjdGlvbnMnO1xuaW1wb3J0IHtzcGhlcmUgYXMgZGNfc3BoZXJlLCBlY2NlbnRyaWNpdHkgYXMgZGNfZWNjZW50cmljaXR5fSBmcm9tICcuL2Rlcml2ZUNvbnN0YW50cyc7XG5pbXBvcnQgRGF0dW0gZnJvbSAnLi9jb25zdGFudHMvRGF0dW0nO1xuaW1wb3J0IGRhdHVtIGZyb20gJy4vZGF0dW0nO1xuaW1wb3J0IG1hdGNoIGZyb20gJy4vbWF0Y2gnO1xuXG5mdW5jdGlvbiBQcm9qZWN0aW9uKHNyc0NvZGUsY2FsbGJhY2spIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb2plY3Rpb24pKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9qZWN0aW9uKHNyc0NvZGUpO1xuICB9XG4gIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgIGlmKGVycm9yKXtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcbiAgdmFyIGpzb24gPSBwYXJzZUNvZGUoc3JzQ29kZSk7XG4gIGlmKHR5cGVvZiBqc29uICE9PSAnb2JqZWN0Jyl7XG4gICAgY2FsbGJhY2soc3JzQ29kZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBvdXJQcm9qID0gUHJvamVjdGlvbi5wcm9qZWN0aW9ucy5nZXQoanNvbi5wcm9qTmFtZSk7XG4gIGlmKCFvdXJQcm9qKXtcbiAgICBjYWxsYmFjayhzcnNDb2RlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGpzb24uZGF0dW1Db2RlICYmIGpzb24uZGF0dW1Db2RlICE9PSAnbm9uZScpIHtcbiAgICB2YXIgZGF0dW1EZWYgPSBtYXRjaChEYXR1bSwganNvbi5kYXR1bUNvZGUpO1xuICAgIGlmIChkYXR1bURlZikge1xuICAgICAganNvbi5kYXR1bV9wYXJhbXMgPSBkYXR1bURlZi50b3dnczg0ID8gZGF0dW1EZWYudG93Z3M4NC5zcGxpdCgnLCcpIDogbnVsbDtcbiAgICAgIGpzb24uZWxscHMgPSBkYXR1bURlZi5lbGxpcHNlO1xuICAgICAganNvbi5kYXR1bU5hbWUgPSBkYXR1bURlZi5kYXR1bU5hbWUgPyBkYXR1bURlZi5kYXR1bU5hbWUgOiBqc29uLmRhdHVtQ29kZTtcbiAgICB9XG4gIH1cbiAganNvbi5rMCA9IGpzb24uazAgfHwgMS4wO1xuICBqc29uLmF4aXMgPSBqc29uLmF4aXMgfHwgJ2VudSc7XG4gIGpzb24uZWxscHMgPSBqc29uLmVsbHBzIHx8ICd3Z3M4NCc7XG4gIHZhciBzcGhlcmVfID0gZGNfc3BoZXJlKGpzb24uYSwganNvbi5iLCBqc29uLnJmLCBqc29uLmVsbHBzLCBqc29uLnNwaGVyZSk7XG4gIHZhciBlY2MgPSBkY19lY2NlbnRyaWNpdHkoc3BoZXJlXy5hLCBzcGhlcmVfLmIsIHNwaGVyZV8ucmYsIGpzb24uUl9BKTtcbiAgdmFyIGRhdHVtT2JqID0ganNvbi5kYXR1bSB8fCBkYXR1bShqc29uLmRhdHVtQ29kZSwganNvbi5kYXR1bV9wYXJhbXMsIHNwaGVyZV8uYSwgc3BoZXJlXy5iLCBlY2MuZXMsIGVjYy5lcDIpO1xuXG4gIGV4dGVuZCh0aGlzLCBqc29uKTsgLy8gdHJhbnNmZXIgZXZlcnl0aGluZyBvdmVyIGZyb20gdGhlIHByb2plY3Rpb24gYmVjYXVzZSB3ZSBkb24ndCBrbm93IHdoYXQgd2UnbGwgbmVlZFxuICBleHRlbmQodGhpcywgb3VyUHJvaik7IC8vIHRyYW5zZmVyIGFsbCB0aGUgbWV0aG9kcyBmcm9tIHRoZSBwcm9qZWN0aW9uXG5cbiAgLy8gY29weSB0aGUgNCB0aGluZ3Mgb3ZlciB3ZSBjYWx1bGF0ZWQgaW4gZGVyaXZlQ29uc3RhbnRzLnNwaGVyZVxuICB0aGlzLmEgPSBzcGhlcmVfLmE7XG4gIHRoaXMuYiA9IHNwaGVyZV8uYjtcbiAgdGhpcy5yZiA9IHNwaGVyZV8ucmY7XG4gIHRoaXMuc3BoZXJlID0gc3BoZXJlXy5zcGhlcmU7XG5cbiAgLy8gY29weSB0aGUgMyB0aGluZ3Mgd2UgY2FsY3VsYXRlZCBpbiBkZXJpdmVDb25zdGFudHMuZWNjZW50cmljaXR5XG4gIHRoaXMuZXMgPSBlY2MuZXM7XG4gIHRoaXMuZSA9IGVjYy5lO1xuICB0aGlzLmVwMiA9IGVjYy5lcDI7XG5cbiAgLy8gYWRkIGluIHRoZSBkYXR1bSBvYmplY3RcbiAgdGhpcy5kYXR1bSA9IGRhdHVtT2JqO1xuXG4gIC8vIGluaXQgdGhlIHByb2plY3Rpb25cbiAgdGhpcy5pbml0KCk7XG5cbiAgLy8gbGVnZWN5IGNhbGxiYWNrIGZyb20gYmFjayBpbiB0aGUgZGF5IHdoZW4gaXQgd2VudCB0byBzcGF0aWFscmVmZXJlbmNlLm9yZ1xuICBjYWxsYmFjayhudWxsLCB0aGlzKTtcblxufVxuUHJvamVjdGlvbi5wcm9qZWN0aW9ucyA9IHByb2plY3Rpb25zO1xuUHJvamVjdGlvbi5wcm9qZWN0aW9ucy5zdGFydCgpO1xuZXhwb3J0IGRlZmF1bHQgUHJvamVjdGlvbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9Qcm9qLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvUHJvai5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjcnMsIGRlbm9ybSwgcG9pbnQpIHtcbiAgdmFyIHhpbiA9IHBvaW50LngsXG4gICAgeWluID0gcG9pbnQueSxcbiAgICB6aW4gPSBwb2ludC56IHx8IDAuMDtcbiAgdmFyIHYsIHQsIGk7XG4gIHZhciBvdXQgPSB7fTtcbiAgZm9yIChpID0gMDsgaSA8IDM7IGkrKykge1xuICAgIGlmIChkZW5vcm0gJiYgaSA9PT0gMiAmJiBwb2ludC56ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgdiA9IHhpbjtcbiAgICAgIHQgPSAneCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGkgPT09IDEpIHtcbiAgICAgIHYgPSB5aW47XG4gICAgICB0ID0gJ3knO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHYgPSB6aW47XG4gICAgICB0ID0gJ3onO1xuICAgIH1cbiAgICBzd2l0Y2ggKGNycy5heGlzW2ldKSB7XG4gICAgY2FzZSAnZSc6XG4gICAgICBvdXRbdF0gPSB2O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndyc6XG4gICAgICBvdXRbdF0gPSAtdjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ24nOlxuICAgICAgb3V0W3RdID0gdjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3MnOlxuICAgICAgb3V0W3RdID0gLXY7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1JzpcbiAgICAgIGlmIChwb2ludFt0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG91dC56ID0gdjtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2QnOlxuICAgICAgaWYgKHBvaW50W3RdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3V0LnogPSAtdjtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAvL2NvbnNvbGUubG9nKFwiRVJST1I6IHVua25vdyBheGlzIChcIitjcnMuYXhpc1tpXStcIikgLSBjaGVjayBkZWZpbml0aW9uIG9mIFwiK2Nycy5wcm9qTmFtZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG91dDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9hZGp1c3RfYXhpcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2FkanVzdF9heGlzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwb2ludCkge1xuICBjaGVja0Nvb3JkKHBvaW50LngpO1xuICBjaGVja0Nvb3JkKHBvaW50LnkpO1xufVxuZnVuY3Rpb24gY2hlY2tDb29yZChudW0pIHtcbiAgaWYgKHR5cGVvZiBOdW1iZXIuaXNGaW5pdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoTnVtYmVyLmlzRmluaXRlKG51bSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29vcmRpbmF0ZXMgbXVzdCBiZSBmaW5pdGUgbnVtYmVycycpO1xuICB9XG4gIGlmICh0eXBlb2YgbnVtICE9PSAnbnVtYmVyJyB8fCBudW0gIT09IG51bSB8fCAhaXNGaW5pdGUobnVtKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2Nvb3JkaW5hdGVzIG11c3QgYmUgZmluaXRlIG51bWJlcnMnKTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NoZWNrU2FuaXR5LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY2hlY2tTYW5pdHkuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtIQUxGX1BJfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcbmltcG9ydCBzaWduIGZyb20gJy4vc2lnbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIChNYXRoLmFicyh4KSA8IEhBTEZfUEkpID8geCA6ICh4IC0gKHNpZ24oeCkgKiBNYXRoLlBJKSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2FkanVzdF9sYXQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vYWRqdXN0X2xhdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmltcG9ydCB7VFdPX1BJLCBTUEl9IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuaW1wb3J0IHNpZ24gZnJvbSAnLi9zaWduJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKE1hdGguYWJzKHgpIDw9IFNQSSkgPyB4IDogKHggLSAoc2lnbih4KSAqIFRXT19QSSkpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9hZGp1c3RfbG9uLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2FkanVzdF9sb24uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi9hZGp1c3RfbG9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oem9uZSwgbG9uKSB7XG4gIGlmICh6b25lID09PSB1bmRlZmluZWQpIHtcbiAgICB6b25lID0gTWF0aC5mbG9vcigoYWRqdXN0X2xvbihsb24pICsgTWF0aC5QSSkgKiAzMCAvIE1hdGguUEkpICsgMTtcblxuICAgIGlmICh6b25lIDwgMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIGlmICh6b25lID4gNjApIHtcbiAgICAgIHJldHVybiA2MDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHpvbmU7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2FkanVzdF96b25lLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2FkanVzdF96b25lLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBoeXBvdCBmcm9tICcuL2h5cG90JztcbmltcG9ydCBsb2cxcHkgZnJvbSAnLi9sb2cxcHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHZhciB5ID0gTWF0aC5hYnMoeCk7XG4gIHkgPSBsb2cxcHkoeSAqICgxICsgeSAvIChoeXBvdCgxLCB5KSArIDEpKSk7XG5cbiAgcmV0dXJuIHggPCAwID8gLXkgOiB5O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9hc2luaHkuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vYXNpbmh5LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgaWYgKE1hdGguYWJzKHgpID4gMSkge1xuICAgIHggPSAoeCA+IDEpID8gMSA6IC0xO1xuICB9XG4gIHJldHVybiBNYXRoLmFzaW4oeCk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9hc2luei5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9hc2luei5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwcCwgYXJnX3IpIHtcbiAgdmFyIHIgPSAyICogTWF0aC5jb3MoYXJnX3IpO1xuICB2YXIgaSA9IHBwLmxlbmd0aCAtIDE7XG4gIHZhciBocjEgPSBwcFtpXTtcbiAgdmFyIGhyMiA9IDA7XG4gIHZhciBocjtcblxuICB3aGlsZSAoLS1pID49IDApIHtcbiAgICBociA9IC1ocjIgKyByICogaHIxICsgcHBbaV07XG4gICAgaHIyID0gaHIxO1xuICAgIGhyMSA9IGhyO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguc2luKGFyZ19yKSAqIGhyO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9jbGVucy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9jbGVucy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgc2luaCBmcm9tICcuL3NpbmgnO1xuaW1wb3J0IGNvc2ggZnJvbSAnLi9jb3NoJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocHAsIGFyZ19yLCBhcmdfaSkge1xuICB2YXIgc2luX2FyZ19yID0gTWF0aC5zaW4oYXJnX3IpO1xuICB2YXIgY29zX2FyZ19yID0gTWF0aC5jb3MoYXJnX3IpO1xuICB2YXIgc2luaF9hcmdfaSA9IHNpbmgoYXJnX2kpO1xuICB2YXIgY29zaF9hcmdfaSA9IGNvc2goYXJnX2kpO1xuICB2YXIgciA9IDIgKiBjb3NfYXJnX3IgKiBjb3NoX2FyZ19pO1xuICB2YXIgaSA9IC0yICogc2luX2FyZ19yICogc2luaF9hcmdfaTtcbiAgdmFyIGogPSBwcC5sZW5ndGggLSAxO1xuICB2YXIgaHIgPSBwcFtqXTtcbiAgdmFyIGhpMSA9IDA7XG4gIHZhciBocjEgPSAwO1xuICB2YXIgaGkgPSAwO1xuICB2YXIgaHIyO1xuICB2YXIgaGkyO1xuXG4gIHdoaWxlICgtLWogPj0gMCkge1xuICAgIGhyMiA9IGhyMTtcbiAgICBoaTIgPSBoaTE7XG4gICAgaHIxID0gaHI7XG4gICAgaGkxID0gaGk7XG4gICAgaHIgPSAtaHIyICsgciAqIGhyMSAtIGkgKiBoaTEgKyBwcFtqXTtcbiAgICBoaSA9IC1oaTIgKyBpICogaHIxICsgciAqIGhpMTtcbiAgfVxuXG4gIHIgPSBzaW5fYXJnX3IgKiBjb3NoX2FyZ19pO1xuICBpID0gY29zX2FyZ19yICogc2luaF9hcmdfaTtcblxuICByZXR1cm4gW3IgKiBociAtIGkgKiBoaSwgciAqIGhpICsgaSAqIGhyXTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vY2xlbnNfY21wbHguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vY2xlbnNfY21wbHguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICB2YXIgciA9IE1hdGguZXhwKHgpO1xuICByID0gKHIgKyAxIC8gcikgLyAyO1xuICByZXR1cm4gcjtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2Nvc2guanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vY29zaC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAoMSAtIDAuMjUgKiB4ICogKDEgKyB4IC8gMTYgKiAoMyArIDEuMjUgKiB4KSkpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vZTBmbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9lMGZuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuICgwLjM3NSAqIHggKiAoMSArIDAuMjUgKiB4ICogKDEgKyAwLjQ2ODc1ICogeCkpKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2UxZm4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vZTFmbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAoMC4wNTg1OTM3NSAqIHggKiB4ICogKDEgKyAwLjc1ICogeCkpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vZTJmbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9lMmZuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuICh4ICogeCAqIHggKiAoMzUgLyAzMDcyKSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9lM2ZuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2UzZm4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgZSwgc2lucGhpKSB7XG4gIHZhciB0ZW1wID0gZSAqIHNpbnBoaTtcbiAgcmV0dXJuIGEgLyBNYXRoLnNxcnQoMSAtIHRlbXAgKiB0ZW1wKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2dOLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2dOLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHBwLCBCKSB7XG4gIHZhciBjb3NfMkIgPSAyICogTWF0aC5jb3MoMiAqIEIpO1xuICB2YXIgaSA9IHBwLmxlbmd0aCAtIDE7XG4gIHZhciBoMSA9IHBwW2ldO1xuICB2YXIgaDIgPSAwO1xuICB2YXIgaDtcblxuICB3aGlsZSAoLS1pID49IDApIHtcbiAgICBoID0gLWgyICsgY29zXzJCICogaDEgKyBwcFtpXTtcbiAgICBoMiA9IGgxO1xuICAgIGgxID0gaDtcbiAgfVxuXG4gIHJldHVybiAoQiArIGggKiBNYXRoLnNpbigyICogQikpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9nYXRnLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2dhdGcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCwgeSkge1xuICB4ID0gTWF0aC5hYnMoeCk7XG4gIHkgPSBNYXRoLmFicyh5KTtcbiAgdmFyIGEgPSBNYXRoLm1heCh4LCB5KTtcbiAgdmFyIGIgPSBNYXRoLm1pbih4LCB5KSAvIChhID8gYSA6IDEpO1xuXG4gIHJldHVybiBhICogTWF0aC5zcXJ0KDEgKyBNYXRoLnBvdyhiLCAyKSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2h5cG90LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2h5cG90LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1sLCBlMCwgZTEsIGUyLCBlMykge1xuICB2YXIgcGhpO1xuICB2YXIgZHBoaTtcblxuICBwaGkgPSBtbCAvIGUwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICBkcGhpID0gKG1sIC0gKGUwICogcGhpIC0gZTEgKiBNYXRoLnNpbigyICogcGhpKSArIGUyICogTWF0aC5zaW4oNCAqIHBoaSkgLSBlMyAqIE1hdGguc2luKDYgKiBwaGkpKSkgLyAoZTAgLSAyICogZTEgKiBNYXRoLmNvcygyICogcGhpKSArIDQgKiBlMiAqIE1hdGguY29zKDQgKiBwaGkpIC0gNiAqIGUzICogTWF0aC5jb3MoNiAqIHBoaSkpO1xuICAgIHBoaSArPSBkcGhpO1xuICAgIGlmIChNYXRoLmFicyhkcGhpKSA8PSAwLjAwMDAwMDAwMDEpIHtcbiAgICAgIHJldHVybiBwaGk7XG4gICAgfVxuICB9XG5cbiAgLy8uLnJlcG9ydEVycm9yKFwiSU1MRk4tQ09OVjpMYXRpdHVkZSBmYWlsZWQgdG8gY29udmVyZ2UgYWZ0ZXIgMTUgaXRlcmF0aW9uc1wiKTtcbiAgcmV0dXJuIE5hTjtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2ltbGZuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2ltbGZuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7SEFMRl9QSX0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVjY2VudCwgcSkge1xuICB2YXIgdGVtcCA9IDEgLSAoMSAtIGVjY2VudCAqIGVjY2VudCkgLyAoMiAqIGVjY2VudCkgKiBNYXRoLmxvZygoMSAtIGVjY2VudCkgLyAoMSArIGVjY2VudCkpO1xuICBpZiAoTWF0aC5hYnMoTWF0aC5hYnMocSkgLSB0ZW1wKSA8IDEuMEUtNikge1xuICAgIGlmIChxIDwgMCkge1xuICAgICAgcmV0dXJuICgtMSAqIEhBTEZfUEkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBIQUxGX1BJO1xuICAgIH1cbiAgfVxuICAvL3ZhciBwaGkgPSAwLjUqIHEvKDEtZWNjZW50KmVjY2VudCk7XG4gIHZhciBwaGkgPSBNYXRoLmFzaW4oMC41ICogcSk7XG4gIHZhciBkcGhpO1xuICB2YXIgc2luX3BoaTtcbiAgdmFyIGNvc19waGk7XG4gIHZhciBjb247XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMzA7IGkrKykge1xuICAgIHNpbl9waGkgPSBNYXRoLnNpbihwaGkpO1xuICAgIGNvc19waGkgPSBNYXRoLmNvcyhwaGkpO1xuICAgIGNvbiA9IGVjY2VudCAqIHNpbl9waGk7XG4gICAgZHBoaSA9IE1hdGgucG93KDEgLSBjb24gKiBjb24sIDIpIC8gKDIgKiBjb3NfcGhpKSAqIChxIC8gKDEgLSBlY2NlbnQgKiBlY2NlbnQpIC0gc2luX3BoaSAvICgxIC0gY29uICogY29uKSArIDAuNSAvIGVjY2VudCAqIE1hdGgubG9nKCgxIC0gY29uKSAvICgxICsgY29uKSkpO1xuICAgIHBoaSArPSBkcGhpO1xuICAgIGlmIChNYXRoLmFicyhkcGhpKSA8PSAwLjAwMDAwMDAwMDEpIHtcbiAgICAgIHJldHVybiBwaGk7XG4gICAgfVxuICB9XG5cbiAgLy9jb25zb2xlLmxvZyhcIklRU0ZOLUNPTlY6TGF0aXR1ZGUgZmFpbGVkIHRvIGNvbnZlcmdlIGFmdGVyIDMwIGl0ZXJhdGlvbnNcIik7XG4gIHJldHVybiBOYU47XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2lxc2Zuei5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9pcXNmbnouanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICB2YXIgeSA9IDEgKyB4O1xuICB2YXIgeiA9IHkgLSAxO1xuXG4gIHJldHVybiB6ID09PSAwID8geCA6IHggKiBNYXRoLmxvZyh5KSAvIHo7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2xvZzFweS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9sb2cxcHkuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZTAsIGUxLCBlMiwgZTMsIHBoaSkge1xuICByZXR1cm4gKGUwICogcGhpIC0gZTEgKiBNYXRoLnNpbigyICogcGhpKSArIGUyICogTWF0aC5zaW4oNCAqIHBoaSkgLSBlMyAqIE1hdGguc2luKDYgKiBwaGkpKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL21sZm4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vbWxmbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlY2NlbnQsIHNpbnBoaSwgY29zcGhpKSB7XG4gIHZhciBjb24gPSBlY2NlbnQgKiBzaW5waGk7XG4gIHJldHVybiBjb3NwaGkgLyAoTWF0aC5zcXJ0KDEgLSBjb24gKiBjb24pKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL21zZm56LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL21zZm56LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7SEFMRl9QSX0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVjY2VudCwgdHMpIHtcbiAgdmFyIGVjY250aCA9IDAuNSAqIGVjY2VudDtcbiAgdmFyIGNvbiwgZHBoaTtcbiAgdmFyIHBoaSA9IEhBTEZfUEkgLSAyICogTWF0aC5hdGFuKHRzKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPD0gMTU7IGkrKykge1xuICAgIGNvbiA9IGVjY2VudCAqIE1hdGguc2luKHBoaSk7XG4gICAgZHBoaSA9IEhBTEZfUEkgLSAyICogTWF0aC5hdGFuKHRzICogKE1hdGgucG93KCgoMSAtIGNvbikgLyAoMSArIGNvbikpLCBlY2NudGgpKSkgLSBwaGk7XG4gICAgcGhpICs9IGRwaGk7XG4gICAgaWYgKE1hdGguYWJzKGRwaGkpIDw9IDAuMDAwMDAwMDAwMSkge1xuICAgICAgcmV0dXJuIHBoaTtcbiAgICB9XG4gIH1cbiAgLy9jb25zb2xlLmxvZyhcInBoaTJ6IGhhcyBOb0NvbnZlcmdlbmNlXCIpO1xuICByZXR1cm4gLTk5OTk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3BoaTJ6LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3BoaTJ6LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBDMDAgPSAxO1xudmFyIEMwMiA9IDAuMjU7XG52YXIgQzA0ID0gMC4wNDY4NzU7XG52YXIgQzA2ID0gMC4wMTk1MzEyNTtcbnZhciBDMDggPSAwLjAxMDY4MTE1MjM0Mzc1O1xudmFyIEMyMiA9IDAuNzU7XG52YXIgQzQ0ID0gMC40Njg3NTtcbnZhciBDNDYgPSAwLjAxMzAyMDgzMzMzMzMzMzMzMzMzO1xudmFyIEM0OCA9IDAuMDA3MTIwNzY4MjI5MTY2NjY2NjY7XG52YXIgQzY2ID0gMC4zNjQ1ODMzMzMzMzMzMzMzMzMzMztcbnZhciBDNjggPSAwLjAwNTY5NjYxNDU4MzMzMzMzMzMzO1xudmFyIEM4OCA9IDAuMzA3NjE3MTg3NTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZXMpIHtcbiAgdmFyIGVuID0gW107XG4gIGVuWzBdID0gQzAwIC0gZXMgKiAoQzAyICsgZXMgKiAoQzA0ICsgZXMgKiAoQzA2ICsgZXMgKiBDMDgpKSk7XG4gIGVuWzFdID0gZXMgKiAoQzIyIC0gZXMgKiAoQzA0ICsgZXMgKiAoQzA2ICsgZXMgKiBDMDgpKSk7XG4gIHZhciB0ID0gZXMgKiBlcztcbiAgZW5bMl0gPSB0ICogKEM0NCAtIGVzICogKEM0NiArIGVzICogQzQ4KSk7XG4gIHQgKj0gZXM7XG4gIGVuWzNdID0gdCAqIChDNjYgLSBlcyAqIEM2OCk7XG4gIGVuWzRdID0gdCAqIGVzICogQzg4O1xuICByZXR1cm4gZW47XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9wal9lbmZuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3BqX2VuZm4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHBqX21sZm4gZnJvbSBcIi4vcGpfbWxmblwiO1xuaW1wb3J0IHtFUFNMTn0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbnZhciBNQVhfSVRFUiA9IDIwO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcmcsIGVzLCBlbikge1xuICB2YXIgayA9IDEgLyAoMSAtIGVzKTtcbiAgdmFyIHBoaSA9IGFyZztcbiAgZm9yICh2YXIgaSA9IE1BWF9JVEVSOyBpOyAtLWkpIHsgLyogcmFyZWx5IGdvZXMgb3ZlciAyIGl0ZXJhdGlvbnMgKi9cbiAgICB2YXIgcyA9IE1hdGguc2luKHBoaSk7XG4gICAgdmFyIHQgPSAxIC0gZXMgKiBzICogcztcbiAgICAvL3QgPSB0aGlzLnBqX21sZm4ocGhpLCBzLCBNYXRoLmNvcyhwaGkpLCBlbikgLSBhcmc7XG4gICAgLy9waGkgLT0gdCAqICh0ICogTWF0aC5zcXJ0KHQpKSAqIGs7XG4gICAgdCA9IChwal9tbGZuKHBoaSwgcywgTWF0aC5jb3MocGhpKSwgZW4pIC0gYXJnKSAqICh0ICogTWF0aC5zcXJ0KHQpKSAqIGs7XG4gICAgcGhpIC09IHQ7XG4gICAgaWYgKE1hdGguYWJzKHQpIDwgRVBTTE4pIHtcbiAgICAgIHJldHVybiBwaGk7XG4gICAgfVxuICB9XG4gIC8vLi5yZXBvcnRFcnJvcihcImNhc3M6cGpfaW52X21sZm46IENvbnZlcmdlbmNlIGVycm9yXCIpO1xuICByZXR1cm4gcGhpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9wal9pbnZfbWxmbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9wal9pbnZfbWxmbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwaGksIHNwaGksIGNwaGksIGVuKSB7XG4gIGNwaGkgKj0gc3BoaTtcbiAgc3BoaSAqPSBzcGhpO1xuICByZXR1cm4gKGVuWzBdICogcGhpIC0gY3BoaSAqIChlblsxXSArIHNwaGkgKiAoZW5bMl0gKyBzcGhpICogKGVuWzNdICsgc3BoaSAqIGVuWzRdKSkpKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3BqX21sZm4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vcGpfbWxmbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlY2NlbnQsIHNpbnBoaSkge1xuICB2YXIgY29uO1xuICBpZiAoZWNjZW50ID4gMS4wZS03KSB7XG4gICAgY29uID0gZWNjZW50ICogc2lucGhpO1xuICAgIHJldHVybiAoKDEgLSBlY2NlbnQgKiBlY2NlbnQpICogKHNpbnBoaSAvICgxIC0gY29uICogY29uKSAtICgwLjUgLyBlY2NlbnQpICogTWF0aC5sb2coKDEgLSBjb24pIC8gKDEgKyBjb24pKSkpO1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiAoMiAqIHNpbnBoaSk7XG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3FzZm56LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3FzZm56LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHg8MCA/IC0xIDogMTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vc2lnbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHZhciByID0gTWF0aC5leHAoeCk7XG4gIHIgPSAociAtIDEgLyByKSAvIDI7XG4gIHJldHVybiByO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vc2luaC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9zaW5oLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVzaW5wLCBleHApIHtcbiAgcmV0dXJuIChNYXRoLnBvdygoMSAtIGVzaW5wKSAvICgxICsgZXNpbnApLCBleHApKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3NyYXQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vc3JhdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoYXJyYXkpe1xuICB2YXIgb3V0ID0ge1xuICAgIHg6IGFycmF5WzBdLFxuICAgIHk6IGFycmF5WzFdXG4gIH07XG4gIGlmIChhcnJheS5sZW5ndGg+Mikge1xuICAgIG91dC56ID0gYXJyYXlbMl07XG4gIH1cbiAgaWYgKGFycmF5Lmxlbmd0aD4zKSB7XG4gICAgb3V0Lm0gPSBhcnJheVszXTtcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vdG9Qb2ludC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi90b1BvaW50LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7SEFMRl9QSX0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVjY2VudCwgcGhpLCBzaW5waGkpIHtcbiAgdmFyIGNvbiA9IGVjY2VudCAqIHNpbnBoaTtcbiAgdmFyIGNvbSA9IDAuNSAqIGVjY2VudDtcbiAgY29uID0gTWF0aC5wb3coKCgxIC0gY29uKSAvICgxICsgY29uKSksIGNvbSk7XG4gIHJldHVybiAoTWF0aC50YW4oMC41ICogKEhBTEZfUEkgLSBwaGkpKSAvIGNvbik7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3RzZm56LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3RzZm56LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBleHBvcnRzID0ge307XG5leHBvcnQge2V4cG9ydHMgYXMgZGVmYXVsdH07XG5leHBvcnRzLndnczg0ID0ge1xuICB0b3dnczg0OiBcIjAsMCwwXCIsXG4gIGVsbGlwc2U6IFwiV0dTODRcIixcbiAgZGF0dW1OYW1lOiBcIldHUzg0XCJcbn07XG5cbmV4cG9ydHMuY2gxOTAzID0ge1xuICB0b3dnczg0OiBcIjY3NC4zNzQsMTUuMDU2LDQwNS4zNDZcIixcbiAgZWxsaXBzZTogXCJiZXNzZWxcIixcbiAgZGF0dW1OYW1lOiBcInN3aXNzXCJcbn07XG5cbmV4cG9ydHMuZ2dyczg3ID0ge1xuICB0b3dnczg0OiBcIi0xOTkuODcsNzQuNzksMjQ2LjYyXCIsXG4gIGVsbGlwc2U6IFwiR1JTODBcIixcbiAgZGF0dW1OYW1lOiBcIkdyZWVrX0dlb2RldGljX1JlZmVyZW5jZV9TeXN0ZW1fMTk4N1wiXG59O1xuXG5leHBvcnRzLm5hZDgzID0ge1xuICB0b3dnczg0OiBcIjAsMCwwXCIsXG4gIGVsbGlwc2U6IFwiR1JTODBcIixcbiAgZGF0dW1OYW1lOiBcIk5vcnRoX0FtZXJpY2FuX0RhdHVtXzE5ODNcIlxufTtcblxuZXhwb3J0cy5uYWQyNyA9IHtcbiAgbmFkZ3JpZHM6IFwiQGNvbnVzLEBhbGFza2EsQG50djJfMC5nc2IsQG50djFfY2FuLmRhdFwiLFxuICBlbGxpcHNlOiBcImNscms2NlwiLFxuICBkYXR1bU5hbWU6IFwiTm9ydGhfQW1lcmljYW5fRGF0dW1fMTkyN1wiXG59O1xuXG5leHBvcnRzLnBvdHNkYW0gPSB7XG4gIHRvd2dzODQ6IFwiNjA2LjAsMjMuMCw0MTMuMFwiLFxuICBlbGxpcHNlOiBcImJlc3NlbFwiLFxuICBkYXR1bU5hbWU6IFwiUG90c2RhbSBSYXVlbmJlcmcgMTk1MCBESEROXCJcbn07XG5cbmV4cG9ydHMuY2FydGhhZ2UgPSB7XG4gIHRvd2dzODQ6IFwiLTI2My4wLDYuMCw0MzEuMFwiLFxuICBlbGxpcHNlOiBcImNsYXJrODBcIixcbiAgZGF0dW1OYW1lOiBcIkNhcnRoYWdlIDE5MzQgVHVuaXNpYVwiXG59O1xuXG5leHBvcnRzLmhlcm1hbm5za29nZWwgPSB7XG4gIHRvd2dzODQ6IFwiNjUzLjAsLTIxMi4wLDQ0OS4wXCIsXG4gIGVsbGlwc2U6IFwiYmVzc2VsXCIsXG4gIGRhdHVtTmFtZTogXCJIZXJtYW5uc2tvZ2VsXCJcbn07XG5cbmV4cG9ydHMub3NuaTUyID0ge1xuICB0b3dnczg0OiBcIjQ4Mi41MzAsLTEzMC41OTYsNTY0LjU1NywtMS4wNDIsLTAuMjE0LC0wLjYzMSw4LjE1XCIsXG4gIGVsbGlwc2U6IFwiYWlyeVwiLFxuICBkYXR1bU5hbWU6IFwiSXJpc2ggTmF0aW9uYWxcIlxufTtcblxuZXhwb3J0cy5pcmU2NSA9IHtcbiAgdG93Z3M4NDogXCI0ODIuNTMwLC0xMzAuNTk2LDU2NC41NTcsLTEuMDQyLC0wLjIxNCwtMC42MzEsOC4xNVwiLFxuICBlbGxpcHNlOiBcIm1vZF9haXJ5XCIsXG4gIGRhdHVtTmFtZTogXCJJcmVsYW5kIDE5NjVcIlxufTtcblxuZXhwb3J0cy5yYXNzYWRpcmFuID0ge1xuICB0b3dnczg0OiBcIi0xMzMuNjMsLTE1Ny41LC0xNTguNjJcIixcbiAgZWxsaXBzZTogXCJpbnRsXCIsXG4gIGRhdHVtTmFtZTogXCJSYXNzYWRpcmFuXCJcbn07XG5cbmV4cG9ydHMubnpnZDQ5ID0ge1xuICB0b3dnczg0OiBcIjU5LjQ3LC01LjA0LDE4Ny40NCwwLjQ3LC0wLjEsMS4wMjQsLTQuNTk5M1wiLFxuICBlbGxpcHNlOiBcImludGxcIixcbiAgZGF0dW1OYW1lOiBcIk5ldyBaZWFsYW5kIEdlb2RldGljIERhdHVtIDE5NDlcIlxufTtcblxuZXhwb3J0cy5vc2diMzYgPSB7XG4gIHRvd2dzODQ6IFwiNDQ2LjQ0OCwtMTI1LjE1Nyw1NDIuMDYwLDAuMTUwMiwwLjI0NzAsMC44NDIxLC0yMC40ODk0XCIsXG4gIGVsbGlwc2U6IFwiYWlyeVwiLFxuICBkYXR1bU5hbWU6IFwiQWlyeSAxODMwXCJcbn07XG5cbmV4cG9ydHMuc19qdHNrID0ge1xuICB0b3dnczg0OiBcIjU4OSw3Niw0ODBcIixcbiAgZWxsaXBzZTogJ2Jlc3NlbCcsXG4gIGRhdHVtTmFtZTogJ1MtSlRTSyAoRmVycm8pJ1xufTtcblxuZXhwb3J0cy5iZWR1YXJhbSA9IHtcbiAgdG93Z3M4NDogJy0xMDYsLTg3LDE4OCcsXG4gIGVsbGlwc2U6ICdjbHJrODAnLFxuICBkYXR1bU5hbWU6ICdCZWR1YXJhbSdcbn07XG5cbmV4cG9ydHMuZ3VudW5nX3NlZ2FyYSA9IHtcbiAgdG93Z3M4NDogJy00MDMsNjg0LDQxJyxcbiAgZWxsaXBzZTogJ2Jlc3NlbCcsXG4gIGRhdHVtTmFtZTogJ0d1bnVuZyBTZWdhcmEgSmFrYXJ0YSdcbn07XG5cbmV4cG9ydHMucm5iNzIgPSB7XG4gIHRvd2dzODQ6IFwiMTA2Ljg2OSwtNTIuMjk3OCwxMDMuNzI0LC0wLjMzNjU3LDAuNDU2OTU1LC0xLjg0MjE4LDFcIixcbiAgZWxsaXBzZTogXCJpbnRsXCIsXG4gIGRhdHVtTmFtZTogXCJSZXNlYXUgTmF0aW9uYWwgQmVsZ2UgMTk3MlwiXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy9EYXR1bS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy9EYXR1bS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZXhwb3J0cyA9IHt9O1xuZXhwb3J0IHtleHBvcnRzIGFzIGRlZmF1bHR9O1xuZXhwb3J0cy5NRVJJVCA9IHtcbiAgYTogNjM3ODEzNy4wLFxuICByZjogMjk4LjI1NyxcbiAgZWxsaXBzZU5hbWU6IFwiTUVSSVQgMTk4M1wiXG59O1xuXG5leHBvcnRzLlNHUzg1ID0ge1xuICBhOiA2Mzc4MTM2LjAsXG4gIHJmOiAyOTguMjU3LFxuICBlbGxpcHNlTmFtZTogXCJTb3ZpZXQgR2VvZGV0aWMgU3lzdGVtIDg1XCJcbn07XG5cbmV4cG9ydHMuR1JTODAgPSB7XG4gIGE6IDYzNzgxMzcuMCxcbiAgcmY6IDI5OC4yNTcyMjIxMDEsXG4gIGVsbGlwc2VOYW1lOiBcIkdSUyAxOTgwKElVR0csIDE5ODApXCJcbn07XG5cbmV4cG9ydHMuSUFVNzYgPSB7XG4gIGE6IDYzNzgxNDAuMCxcbiAgcmY6IDI5OC4yNTcsXG4gIGVsbGlwc2VOYW1lOiBcIklBVSAxOTc2XCJcbn07XG5cbmV4cG9ydHMuYWlyeSA9IHtcbiAgYTogNjM3NzU2My4zOTYsXG4gIGI6IDYzNTYyNTYuOTEwLFxuICBlbGxpcHNlTmFtZTogXCJBaXJ5IDE4MzBcIlxufTtcblxuZXhwb3J0cy5BUEw0ID0ge1xuICBhOiA2Mzc4MTM3LFxuICByZjogMjk4LjI1LFxuICBlbGxpcHNlTmFtZTogXCJBcHBsLiBQaHlzaWNzLiAxOTY1XCJcbn07XG5cbmV4cG9ydHMuTldMOUQgPSB7XG4gIGE6IDYzNzgxNDUuMCxcbiAgcmY6IDI5OC4yNSxcbiAgZWxsaXBzZU5hbWU6IFwiTmF2YWwgV2VhcG9ucyBMYWIuLCAxOTY1XCJcbn07XG5cbmV4cG9ydHMubW9kX2FpcnkgPSB7XG4gIGE6IDYzNzczNDAuMTg5LFxuICBiOiA2MzU2MDM0LjQ0NixcbiAgZWxsaXBzZU5hbWU6IFwiTW9kaWZpZWQgQWlyeVwiXG59O1xuXG5leHBvcnRzLmFuZHJhZSA9IHtcbiAgYTogNjM3NzEwNC40MyxcbiAgcmY6IDMwMC4wLFxuICBlbGxpcHNlTmFtZTogXCJBbmRyYWUgMTg3NiAoRGVuLiwgSWNsbmQuKVwiXG59O1xuXG5leHBvcnRzLmF1c3RfU0EgPSB7XG4gIGE6IDYzNzgxNjAuMCxcbiAgcmY6IDI5OC4yNSxcbiAgZWxsaXBzZU5hbWU6IFwiQXVzdHJhbGlhbiBOYXRsICYgUy4gQW1lci4gMTk2OVwiXG59O1xuXG5leHBvcnRzLkdSUzY3ID0ge1xuICBhOiA2Mzc4MTYwLjAsXG4gIHJmOiAyOTguMjQ3MTY3NDI3MCxcbiAgZWxsaXBzZU5hbWU6IFwiR1JTIDY3KElVR0cgMTk2NylcIlxufTtcblxuZXhwb3J0cy5iZXNzZWwgPSB7XG4gIGE6IDYzNzczOTcuMTU1LFxuICByZjogMjk5LjE1MjgxMjgsXG4gIGVsbGlwc2VOYW1lOiBcIkJlc3NlbCAxODQxXCJcbn07XG5cbmV4cG9ydHMuYmVzc19uYW0gPSB7XG4gIGE6IDYzNzc0ODMuODY1LFxuICByZjogMjk5LjE1MjgxMjgsXG4gIGVsbGlwc2VOYW1lOiBcIkJlc3NlbCAxODQxIChOYW1pYmlhKVwiXG59O1xuXG5leHBvcnRzLmNscms2NiA9IHtcbiAgYTogNjM3ODIwNi40LFxuICBiOiA2MzU2NTgzLjgsXG4gIGVsbGlwc2VOYW1lOiBcIkNsYXJrZSAxODY2XCJcbn07XG5cbmV4cG9ydHMuY2xyazgwID0ge1xuICBhOiA2Mzc4MjQ5LjE0NSxcbiAgcmY6IDI5My40NjYzLFxuICBlbGxpcHNlTmFtZTogXCJDbGFya2UgMTg4MCBtb2QuXCJcbn07XG5cbmV4cG9ydHMuY2xyazU4ID0ge1xuICBhOiA2Mzc4MjkzLjY0NTIwODc1OSxcbiAgcmY6IDI5NC4yNjA2NzYzNjkyNjU0LFxuICBlbGxpcHNlTmFtZTogXCJDbGFya2UgMTg1OFwiXG59O1xuXG5leHBvcnRzLkNQTSA9IHtcbiAgYTogNjM3NTczOC43LFxuICByZjogMzM0LjI5LFxuICBlbGxpcHNlTmFtZTogXCJDb21tLiBkZXMgUG9pZHMgZXQgTWVzdXJlcyAxNzk5XCJcbn07XG5cbmV4cG9ydHMuZGVsbWJyID0ge1xuICBhOiA2Mzc2NDI4LjAsXG4gIHJmOiAzMTEuNSxcbiAgZWxsaXBzZU5hbWU6IFwiRGVsYW1icmUgMTgxMCAoQmVsZ2l1bSlcIlxufTtcblxuZXhwb3J0cy5lbmdlbGlzID0ge1xuICBhOiA2Mzc4MTM2LjA1LFxuICByZjogMjk4LjI1NjYsXG4gIGVsbGlwc2VOYW1lOiBcIkVuZ2VsaXMgMTk4NVwiXG59O1xuXG5leHBvcnRzLmV2cnN0MzAgPSB7XG4gIGE6IDYzNzcyNzYuMzQ1LFxuICByZjogMzAwLjgwMTcsXG4gIGVsbGlwc2VOYW1lOiBcIkV2ZXJlc3QgMTgzMFwiXG59O1xuXG5leHBvcnRzLmV2cnN0NDggPSB7XG4gIGE6IDYzNzczMDQuMDYzLFxuICByZjogMzAwLjgwMTcsXG4gIGVsbGlwc2VOYW1lOiBcIkV2ZXJlc3QgMTk0OFwiXG59O1xuXG5leHBvcnRzLmV2cnN0NTYgPSB7XG4gIGE6IDYzNzczMDEuMjQzLFxuICByZjogMzAwLjgwMTcsXG4gIGVsbGlwc2VOYW1lOiBcIkV2ZXJlc3QgMTk1NlwiXG59O1xuXG5leHBvcnRzLmV2cnN0NjkgPSB7XG4gIGE6IDYzNzcyOTUuNjY0LFxuICByZjogMzAwLjgwMTcsXG4gIGVsbGlwc2VOYW1lOiBcIkV2ZXJlc3QgMTk2OVwiXG59O1xuXG5leHBvcnRzLmV2cnN0U1MgPSB7XG4gIGE6IDYzNzcyOTguNTU2LFxuICByZjogMzAwLjgwMTcsXG4gIGVsbGlwc2VOYW1lOiBcIkV2ZXJlc3QgKFNhYmFoICYgU2FyYXdhaylcIlxufTtcblxuZXhwb3J0cy5mc2NocjYwID0ge1xuICBhOiA2Mzc4MTY2LjAsXG4gIHJmOiAyOTguMyxcbiAgZWxsaXBzZU5hbWU6IFwiRmlzY2hlciAoTWVyY3VyeSBEYXR1bSkgMTk2MFwiXG59O1xuXG5leHBvcnRzLmZzY2hyNjBtID0ge1xuICBhOiA2Mzc4MTU1LjAsXG4gIHJmOiAyOTguMyxcbiAgZWxsaXBzZU5hbWU6IFwiRmlzY2hlciAxOTYwXCJcbn07XG5cbmV4cG9ydHMuZnNjaHI2OCA9IHtcbiAgYTogNjM3ODE1MC4wLFxuICByZjogMjk4LjMsXG4gIGVsbGlwc2VOYW1lOiBcIkZpc2NoZXIgMTk2OFwiXG59O1xuXG5leHBvcnRzLmhlbG1lcnQgPSB7XG4gIGE6IDYzNzgyMDAuMCxcbiAgcmY6IDI5OC4zLFxuICBlbGxpcHNlTmFtZTogXCJIZWxtZXJ0IDE5MDZcIlxufTtcblxuZXhwb3J0cy5ob3VnaCA9IHtcbiAgYTogNjM3ODI3MC4wLFxuICByZjogMjk3LjAsXG4gIGVsbGlwc2VOYW1lOiBcIkhvdWdoXCJcbn07XG5cbmV4cG9ydHMuaW50bCA9IHtcbiAgYTogNjM3ODM4OC4wLFxuICByZjogMjk3LjAsXG4gIGVsbGlwc2VOYW1lOiBcIkludGVybmF0aW9uYWwgMTkwOSAoSGF5Zm9yZClcIlxufTtcblxuZXhwb3J0cy5rYXVsYSA9IHtcbiAgYTogNjM3ODE2My4wLFxuICByZjogMjk4LjI0LFxuICBlbGxpcHNlTmFtZTogXCJLYXVsYSAxOTYxXCJcbn07XG5cbmV4cG9ydHMubGVyY2ggPSB7XG4gIGE6IDYzNzgxMzkuMCxcbiAgcmY6IDI5OC4yNTcsXG4gIGVsbGlwc2VOYW1lOiBcIkxlcmNoIDE5NzlcIlxufTtcblxuZXhwb3J0cy5tcHJ0cyA9IHtcbiAgYTogNjM5NzMwMC4wLFxuICByZjogMTkxLjAsXG4gIGVsbGlwc2VOYW1lOiBcIk1hdXBlcnRpdXMgMTczOFwiXG59O1xuXG5leHBvcnRzLm5ld19pbnRsID0ge1xuICBhOiA2Mzc4MTU3LjUsXG4gIGI6IDYzNTY3NzIuMixcbiAgZWxsaXBzZU5hbWU6IFwiTmV3IEludGVybmF0aW9uYWwgMTk2N1wiXG59O1xuXG5leHBvcnRzLnBsZXNzaXMgPSB7XG4gIGE6IDYzNzY1MjMuMCxcbiAgcmY6IDYzNTU4NjMuMCxcbiAgZWxsaXBzZU5hbWU6IFwiUGxlc3NpcyAxODE3IChGcmFuY2UpXCJcbn07XG5cbmV4cG9ydHMua3Jhc3MgPSB7XG4gIGE6IDYzNzgyNDUuMCxcbiAgcmY6IDI5OC4zLFxuICBlbGxpcHNlTmFtZTogXCJLcmFzc292c2t5LCAxOTQyXCJcbn07XG5cbmV4cG9ydHMuU0Vhc2lhID0ge1xuICBhOiA2Mzc4MTU1LjAsXG4gIGI6IDYzNTY3NzMuMzIwNSxcbiAgZWxsaXBzZU5hbWU6IFwiU291dGhlYXN0IEFzaWFcIlxufTtcblxuZXhwb3J0cy53YWxiZWNrID0ge1xuICBhOiA2Mzc2ODk2LjAsXG4gIGI6IDYzNTU4MzQuODQ2NyxcbiAgZWxsaXBzZU5hbWU6IFwiV2FsYmVja1wiXG59O1xuXG5leHBvcnRzLldHUzYwID0ge1xuICBhOiA2Mzc4MTY1LjAsXG4gIHJmOiAyOTguMyxcbiAgZWxsaXBzZU5hbWU6IFwiV0dTIDYwXCJcbn07XG5cbmV4cG9ydHMuV0dTNjYgPSB7XG4gIGE6IDYzNzgxNDUuMCxcbiAgcmY6IDI5OC4yNSxcbiAgZWxsaXBzZU5hbWU6IFwiV0dTIDY2XCJcbn07XG5cbmV4cG9ydHMuV0dTNyA9IHtcbiAgYTogNjM3ODEzNS4wLFxuICByZjogMjk4LjI2LFxuICBlbGxpcHNlTmFtZTogXCJXR1MgNzJcIlxufTtcblxuZXhwb3J0IHZhciBXR1M4NCA9IGV4cG9ydHMuV0dTODQgPSB7XG4gIGE6IDYzNzgxMzcuMCxcbiAgcmY6IDI5OC4yNTcyMjM1NjMsXG4gIGVsbGlwc2VOYW1lOiBcIldHUyA4NFwiXG59O1xuXG5leHBvcnRzLnNwaGVyZSA9IHtcbiAgYTogNjM3MDk5Ny4wLFxuICBiOiA2MzcwOTk3LjAsXG4gIGVsbGlwc2VOYW1lOiBcIk5vcm1hbCBTcGhlcmUgKHI9NjM3MDk5NylcIlxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb25zdGFudHMvRWxsaXBzb2lkLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29uc3RhbnRzL0VsbGlwc29pZC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZXhwb3J0cyA9IHt9O1xuZXhwb3J0IHtleHBvcnRzIGFzIGRlZmF1bHR9O1xuXG5leHBvcnRzLmdyZWVud2ljaCA9IDAuMDsgLy9cIjBkRVwiLFxuZXhwb3J0cy5saXNib24gPSAtOS4xMzE5MDYxMTExMTE7IC8vXCI5ZDA3JzU0Ljg2MlxcXCJXXCIsXG5leHBvcnRzLnBhcmlzID0gMi4zMzcyMjkxNjY2Njc7IC8vXCIyZDIwJzE0LjAyNVxcXCJFXCIsXG5leHBvcnRzLmJvZ290YSA9IC03NC4wODA5MTY2NjY2Njc7IC8vXCI3NGQwNCc1MS4zXFxcIldcIixcbmV4cG9ydHMubWFkcmlkID0gLTMuNjg3OTM4ODg4ODg5OyAvL1wiM2Q0MScxNi41OFxcXCJXXCIsXG5leHBvcnRzLnJvbWUgPSAxMi40NTIzMzMzMzMzMzM7IC8vXCIxMmQyNyc4LjRcXFwiRVwiLFxuZXhwb3J0cy5iZXJuID0gNy40Mzk1ODMzMzMzMzM7IC8vXCI3ZDI2JzIyLjVcXFwiRVwiLFxuZXhwb3J0cy5qYWthcnRhID0gMTA2LjgwNzcxOTQ0NDQ0NDsgLy9cIjEwNmQ0OCcyNy43OVxcXCJFXCIsXG5leHBvcnRzLmZlcnJvID0gLTE3LjY2NjY2NjY2NjY2NzsgLy9cIjE3ZDQwJ1dcIixcbmV4cG9ydHMuYnJ1c3NlbHMgPSA0LjM2Nzk3NTsgLy9cIjRkMjInNC43MVxcXCJFXCIsXG5leHBvcnRzLnN0b2NraG9sbSA9IDE4LjA1ODI3Nzc3Nzc3ODsgLy9cIjE4ZDMnMjkuOFxcXCJFXCIsXG5leHBvcnRzLmF0aGVucyA9IDIzLjcxNjMzNzU7IC8vXCIyM2Q0Mic1OC44MTVcXFwiRVwiLFxuZXhwb3J0cy5vc2xvID0gMTAuNzIyOTE2NjY2NjY3OyAvL1wiMTBkNDMnMjIuNVxcXCJFXCJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb25zdGFudHMvUHJpbWVNZXJpZGlhbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy9QcmltZU1lcmlkaWFuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IHtcbiAgZnQ6IHt0b19tZXRlcjogMC4zMDQ4fSxcbiAgJ3VzLWZ0Jzoge3RvX21ldGVyOiAxMjAwIC8gMzkzN31cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29uc3RhbnRzL3VuaXRzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29uc3RhbnRzL3VuaXRzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCB2YXIgUEpEXzNQQVJBTSA9IDE7XG5leHBvcnQgdmFyIFBKRF83UEFSQU0gPSAyO1xuZXhwb3J0IHZhciBQSkRfV0dTODQgPSA0OyAvLyBXR1M4NCBvciBlcXVpdmFsZW50XG5leHBvcnQgdmFyIFBKRF9OT0RBVFVNID0gNTsgLy8gV0dTODQgb3IgZXF1aXZhbGVudFxuZXhwb3J0IHZhciBTRUNfVE9fUkFEID0gNC44NDgxMzY4MTEwOTUzNTk5MzU4OTkxNDEwMjM1N2UtNjtcbmV4cG9ydCB2YXIgSEFMRl9QSSA9IE1hdGguUEkvMjtcbi8vIGVsbGlwb2lkIHBqX3NldF9lbGwuY1xuZXhwb3J0IHZhciBTSVhUSCA9IDAuMTY2NjY2NjY2NjY2NjY2NjY2Nztcbi8qIDEvNiAqL1xuZXhwb3J0IHZhciBSQTQgPSAwLjA0NzIyMjIyMjIyMjIyMjIyMjIyO1xuLyogMTcvMzYwICovXG5leHBvcnQgdmFyIFJBNiA9IDAuMDIyMTU2MDg0NjU2MDg0NjU2MDg7XG5leHBvcnQgdmFyIEVQU0xOID0gMS4wZS0xMDtcbi8vIHlvdSdkIHRoaW5rIHlvdSBjb3VsZCB1c2UgTnVtYmVyLkVQU0lMT04gYWJvdmUgYnV0IHRoYXQgbWFrZXNcbi8vIE1vbGx3ZWlkZSBnZXQgaW50byBhbiBpbmZpbmF0ZSBsb29wLlxuXG5leHBvcnQgdmFyIEQyUiA9IDAuMDE3NDUzMjkyNTE5OTQzMjk1Nzc7XG5leHBvcnQgdmFyIFIyRCA9IDU3LjI5NTc3OTUxMzA4MjMyMDg4O1xuZXhwb3J0IHZhciBGT1JUUEkgPSBNYXRoLlBJLzQ7XG5leHBvcnQgdmFyIFRXT19QSSA9IE1hdGguUEkgKiAyO1xuLy8gU1BJIGlzIHNsaWdodGx5IGdyZWF0ZXIgdGhhbiBNYXRoLlBJLCBzbyB2YWx1ZXMgdGhhdCBleGNlZWQgdGhlIC0xODAuLjE4MFxuLy8gZGVncmVlIHJhbmdlIGJ5IGEgdGlueSBhbW91bnQgZG9uJ3QgZ2V0IHdyYXBwZWQuIFRoaXMgcHJldmVudHMgcG9pbnRzIHRoYXRcbi8vIGhhdmUgZHJpZnRlZCBmcm9tIHRoZWlyIG9yaWdpbmFsIGxvY2F0aW9uIGFsb25nIHRoZSAxODB0aCBtZXJpZGlhbiAoZHVlIHRvXG4vLyBmbG9hdGluZyBwb2ludCBlcnJvcikgZnJvbSBjaGFuZ2luZyB0aGVpciBzaWduLlxuZXhwb3J0IHZhciBTUEkgPSAzLjE0MTU5MjY1MzU5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy92YWx1ZXMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb25zdGFudHMvdmFsdWVzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBwcm9qIGZyb20gJy4vUHJvaic7XG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3JtJztcbnZhciB3Z3M4NCA9IHByb2ooJ1dHUzg0Jyk7XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybWVyKGZyb20sIHRvLCBjb29yZHMpIHtcbiAgdmFyIHRyYW5zZm9ybWVkQXJyYXksIG91dCwga2V5cztcbiAgaWYgKEFycmF5LmlzQXJyYXkoY29vcmRzKSkge1xuICAgIHRyYW5zZm9ybWVkQXJyYXkgPSB0cmFuc2Zvcm0oZnJvbSwgdG8sIGNvb3Jkcyk7XG4gICAgaWYgKGNvb3Jkcy5sZW5ndGggPT09IDMpIHtcbiAgICAgIHJldHVybiBbdHJhbnNmb3JtZWRBcnJheS54LCB0cmFuc2Zvcm1lZEFycmF5LnksIHRyYW5zZm9ybWVkQXJyYXkuel07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFt0cmFuc2Zvcm1lZEFycmF5LngsIHRyYW5zZm9ybWVkQXJyYXkueV07XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIG91dCA9IHRyYW5zZm9ybShmcm9tLCB0bywgY29vcmRzKTtcbiAgICBrZXlzID0gT2JqZWN0LmtleXMoY29vcmRzKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoa2V5ID09PSAneCcgfHwga2V5ID09PSAneScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgb3V0W2tleV0gPSBjb29yZHNba2V5XTtcbiAgICB9KTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrUHJvaihpdGVtKSB7XG4gIGlmIChpdGVtIGluc3RhbmNlb2YgcHJvaikge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG4gIGlmIChpdGVtLm9Qcm9qKSB7XG4gICAgcmV0dXJuIGl0ZW0ub1Byb2o7XG4gIH1cbiAgcmV0dXJuIHByb2ooaXRlbSk7XG59XG5mdW5jdGlvbiBwcm9qNChmcm9tUHJvaiwgdG9Qcm9qLCBjb29yZCkge1xuICBmcm9tUHJvaiA9IGNoZWNrUHJvaihmcm9tUHJvaik7XG4gIHZhciBzaW5nbGUgPSBmYWxzZTtcbiAgdmFyIG9iajtcbiAgaWYgKHR5cGVvZiB0b1Byb2ogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdG9Qcm9qID0gZnJvbVByb2o7XG4gICAgZnJvbVByb2ogPSB3Z3M4NDtcbiAgICBzaW5nbGUgPSB0cnVlO1xuICB9XG4gIGVsc2UgaWYgKHR5cGVvZiB0b1Byb2oueCAhPT0gJ3VuZGVmaW5lZCcgfHwgQXJyYXkuaXNBcnJheSh0b1Byb2opKSB7XG4gICAgY29vcmQgPSB0b1Byb2o7XG4gICAgdG9Qcm9qID0gZnJvbVByb2o7XG4gICAgZnJvbVByb2ogPSB3Z3M4NDtcbiAgICBzaW5nbGUgPSB0cnVlO1xuICB9XG4gIHRvUHJvaiA9IGNoZWNrUHJvaih0b1Byb2opO1xuICBpZiAoY29vcmQpIHtcbiAgICByZXR1cm4gdHJhbnNmb3JtZXIoZnJvbVByb2osIHRvUHJvaiwgY29vcmQpO1xuICB9XG4gIGVsc2Uge1xuICAgIG9iaiA9IHtcbiAgICAgIGZvcndhcmQ6IGZ1bmN0aW9uKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZXIoZnJvbVByb2osIHRvUHJvaiwgY29vcmRzKTtcbiAgICAgIH0sXG4gICAgICBpbnZlcnNlOiBmdW5jdGlvbihjb29yZHMpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVyKHRvUHJvaiwgZnJvbVByb2osIGNvb3Jkcyk7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAoc2luZ2xlKSB7XG4gICAgICBvYmoub1Byb2ogPSB0b1Byb2o7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHByb2o0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb3JlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7UEpEXzNQQVJBTSwgUEpEXzdQQVJBTSwgUEpEX1dHUzg0LCBQSkRfTk9EQVRVTSwgU0VDX1RPX1JBRH0gZnJvbSAnLi9jb25zdGFudHMvdmFsdWVzJztcblxuZnVuY3Rpb24gZGF0dW0oZGF0dW1Db2RlLCBkYXR1bV9wYXJhbXMsIGEsIGIsIGVzLCBlcDIpIHtcbiAgdmFyIG91dCA9IHt9O1xuXG4gIGlmIChkYXR1bUNvZGUgPT09IHVuZGVmaW5lZCB8fCBkYXR1bUNvZGUgPT09ICdub25lJykge1xuICAgIG91dC5kYXR1bV90eXBlID0gUEpEX05PREFUVU07XG4gIH0gZWxzZSB7XG4gICAgb3V0LmRhdHVtX3R5cGUgPSBQSkRfV0dTODQ7XG4gIH1cblxuICBpZiAoZGF0dW1fcGFyYW1zKSB7XG4gICAgb3V0LmRhdHVtX3BhcmFtcyA9IGRhdHVtX3BhcmFtcy5tYXAocGFyc2VGbG9hdCk7XG4gICAgaWYgKG91dC5kYXR1bV9wYXJhbXNbMF0gIT09IDAgfHwgb3V0LmRhdHVtX3BhcmFtc1sxXSAhPT0gMCB8fCBvdXQuZGF0dW1fcGFyYW1zWzJdICE9PSAwKSB7XG4gICAgICBvdXQuZGF0dW1fdHlwZSA9IFBKRF8zUEFSQU07XG4gICAgfVxuICAgIGlmIChvdXQuZGF0dW1fcGFyYW1zLmxlbmd0aCA+IDMpIHtcbiAgICAgIGlmIChvdXQuZGF0dW1fcGFyYW1zWzNdICE9PSAwIHx8IG91dC5kYXR1bV9wYXJhbXNbNF0gIT09IDAgfHwgb3V0LmRhdHVtX3BhcmFtc1s1XSAhPT0gMCB8fCBvdXQuZGF0dW1fcGFyYW1zWzZdICE9PSAwKSB7XG4gICAgICAgIG91dC5kYXR1bV90eXBlID0gUEpEXzdQQVJBTTtcbiAgICAgICAgb3V0LmRhdHVtX3BhcmFtc1szXSAqPSBTRUNfVE9fUkFEO1xuICAgICAgICBvdXQuZGF0dW1fcGFyYW1zWzRdICo9IFNFQ19UT19SQUQ7XG4gICAgICAgIG91dC5kYXR1bV9wYXJhbXNbNV0gKj0gU0VDX1RPX1JBRDtcbiAgICAgICAgb3V0LmRhdHVtX3BhcmFtc1s2XSA9IChvdXQuZGF0dW1fcGFyYW1zWzZdIC8gMTAwMDAwMC4wKSArIDEuMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvdXQuYSA9IGE7IC8vZGF0dW0gb2JqZWN0IGFsc28gdXNlcyB0aGVzZSB2YWx1ZXNcbiAgb3V0LmIgPSBiO1xuICBvdXQuZXMgPSBlcztcbiAgb3V0LmVwMiA9IGVwMjtcbiAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGF0dW07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvZGF0dW0uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9kYXR1bS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5pbXBvcnQge1BKRF8zUEFSQU0sIFBKRF83UEFSQU0sIEhBTEZfUEl9IGZyb20gJy4vY29uc3RhbnRzL3ZhbHVlcyc7XG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZURhdHVtcyhzb3VyY2UsIGRlc3QpIHtcbiAgaWYgKHNvdXJjZS5kYXR1bV90eXBlICE9PSBkZXN0LmRhdHVtX3R5cGUpIHtcbiAgICByZXR1cm4gZmFsc2U7IC8vIGZhbHNlLCBkYXR1bXMgYXJlIG5vdCBlcXVhbFxuICB9IGVsc2UgaWYgKHNvdXJjZS5hICE9PSBkZXN0LmEgfHwgTWF0aC5hYnMoc291cmNlLmVzIC0gZGVzdC5lcykgPiAwLjAwMDAwMDAwMDA1MCkge1xuICAgIC8vIHRoZSB0b2xlcmFuY2UgZm9yIGVzIGlzIHRvIGVuc3VyZSB0aGF0IEdSUzgwIGFuZCBXR1M4NFxuICAgIC8vIGFyZSBjb25zaWRlcmVkIGlkZW50aWNhbFxuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIGlmIChzb3VyY2UuZGF0dW1fdHlwZSA9PT0gUEpEXzNQQVJBTSkge1xuICAgIHJldHVybiAoc291cmNlLmRhdHVtX3BhcmFtc1swXSA9PT0gZGVzdC5kYXR1bV9wYXJhbXNbMF0gJiYgc291cmNlLmRhdHVtX3BhcmFtc1sxXSA9PT0gZGVzdC5kYXR1bV9wYXJhbXNbMV0gJiYgc291cmNlLmRhdHVtX3BhcmFtc1syXSA9PT0gZGVzdC5kYXR1bV9wYXJhbXNbMl0pO1xuICB9IGVsc2UgaWYgKHNvdXJjZS5kYXR1bV90eXBlID09PSBQSkRfN1BBUkFNKSB7XG4gICAgcmV0dXJuIChzb3VyY2UuZGF0dW1fcGFyYW1zWzBdID09PSBkZXN0LmRhdHVtX3BhcmFtc1swXSAmJiBzb3VyY2UuZGF0dW1fcGFyYW1zWzFdID09PSBkZXN0LmRhdHVtX3BhcmFtc1sxXSAmJiBzb3VyY2UuZGF0dW1fcGFyYW1zWzJdID09PSBkZXN0LmRhdHVtX3BhcmFtc1syXSAmJiBzb3VyY2UuZGF0dW1fcGFyYW1zWzNdID09PSBkZXN0LmRhdHVtX3BhcmFtc1szXSAmJiBzb3VyY2UuZGF0dW1fcGFyYW1zWzRdID09PSBkZXN0LmRhdHVtX3BhcmFtc1s0XSAmJiBzb3VyY2UuZGF0dW1fcGFyYW1zWzVdID09PSBkZXN0LmRhdHVtX3BhcmFtc1s1XSAmJiBzb3VyY2UuZGF0dW1fcGFyYW1zWzZdID09PSBkZXN0LmRhdHVtX3BhcmFtc1s2XSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRydWU7IC8vIGRhdHVtcyBhcmUgZXF1YWxcbiAgfVxufSAvLyBjc19jb21wYXJlX2RhdHVtcygpXG5cbi8qXG4gKiBUaGUgZnVuY3Rpb24gQ29udmVydF9HZW9kZXRpY19Ub19HZW9jZW50cmljIGNvbnZlcnRzIGdlb2RldGljIGNvb3JkaW5hdGVzXG4gKiAobGF0aXR1ZGUsIGxvbmdpdHVkZSwgYW5kIGhlaWdodCkgdG8gZ2VvY2VudHJpYyBjb29yZGluYXRlcyAoWCwgWSwgWiksXG4gKiBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgZWxsaXBzb2lkIHBhcmFtZXRlcnMuXG4gKlxuICogICAgTGF0aXR1ZGUgIDogR2VvZGV0aWMgbGF0aXR1ZGUgaW4gcmFkaWFucyAgICAgICAgICAgICAgICAgICAgIChpbnB1dClcbiAqICAgIExvbmdpdHVkZSA6IEdlb2RldGljIGxvbmdpdHVkZSBpbiByYWRpYW5zICAgICAgICAgICAgICAgICAgICAoaW5wdXQpXG4gKiAgICBIZWlnaHQgICAgOiBHZW9kZXRpYyBoZWlnaHQsIGluIG1ldGVycyAgICAgICAgICAgICAgICAgICAgICAgKGlucHV0KVxuICogICAgWCAgICAgICAgIDogQ2FsY3VsYXRlZCBHZW9jZW50cmljIFggY29vcmRpbmF0ZSwgaW4gbWV0ZXJzICAgIChvdXRwdXQpXG4gKiAgICBZICAgICAgICAgOiBDYWxjdWxhdGVkIEdlb2NlbnRyaWMgWSBjb29yZGluYXRlLCBpbiBtZXRlcnMgICAgKG91dHB1dClcbiAqICAgIFogICAgICAgICA6IENhbGN1bGF0ZWQgR2VvY2VudHJpYyBaIGNvb3JkaW5hdGUsIGluIG1ldGVycyAgICAob3V0cHV0KVxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlb2RldGljVG9HZW9jZW50cmljKHAsIGVzLCBhKSB7XG4gIHZhciBMb25naXR1ZGUgPSBwLng7XG4gIHZhciBMYXRpdHVkZSA9IHAueTtcbiAgdmFyIEhlaWdodCA9IHAueiA/IHAueiA6IDA7IC8vWiB2YWx1ZSBub3QgYWx3YXlzIHN1cHBsaWVkXG5cbiAgdmFyIFJuOyAvKiAgRWFydGggcmFkaXVzIGF0IGxvY2F0aW9uICAqL1xuICB2YXIgU2luX0xhdDsgLyogIE1hdGguc2luKExhdGl0dWRlKSAgKi9cbiAgdmFyIFNpbjJfTGF0OyAvKiAgU3F1YXJlIG9mIE1hdGguc2luKExhdGl0dWRlKSAgKi9cbiAgdmFyIENvc19MYXQ7IC8qICBNYXRoLmNvcyhMYXRpdHVkZSkgICovXG5cbiAgLypcbiAgICoqIERvbid0IGJsb3cgdXAgaWYgTGF0aXR1ZGUgaXMganVzdCBhIGxpdHRsZSBvdXQgb2YgdGhlIHZhbHVlXG4gICAqKiByYW5nZSBhcyBpdCBtYXkganVzdCBiZSBhIHJvdW5kaW5nIGlzc3VlLiAgQWxzbyByZW1vdmVkIGxvbmdpdHVkZVxuICAgKiogdGVzdCwgaXQgc2hvdWxkIGJlIHdyYXBwZWQgYnkgTWF0aC5jb3MoKSBhbmQgTWF0aC5zaW4oKS4gIE5GVyBmb3IgUFJPSi40LCBTZXAvMjAwMS5cbiAgICovXG4gIGlmIChMYXRpdHVkZSA8IC1IQUxGX1BJICYmIExhdGl0dWRlID4gLTEuMDAxICogSEFMRl9QSSkge1xuICAgIExhdGl0dWRlID0gLUhBTEZfUEk7XG4gIH0gZWxzZSBpZiAoTGF0aXR1ZGUgPiBIQUxGX1BJICYmIExhdGl0dWRlIDwgMS4wMDEgKiBIQUxGX1BJKSB7XG4gICAgTGF0aXR1ZGUgPSBIQUxGX1BJO1xuICB9IGVsc2UgaWYgKExhdGl0dWRlIDwgLUhBTEZfUEkpIHtcbiAgICAvKiBMYXRpdHVkZSBvdXQgb2YgcmFuZ2UgKi9cbiAgICAvLy4ucmVwb3J0RXJyb3IoJ2dlb2NlbnQ6bGF0IG91dCBvZiByYW5nZTonICsgTGF0aXR1ZGUpO1xuICAgIHJldHVybiB7IHg6IC1JbmZpbml0eSwgeTogLUluZmluaXR5LCB6OiBwLnogfTtcbiAgfSBlbHNlIGlmIChMYXRpdHVkZSA+IEhBTEZfUEkpIHtcbiAgICAvKiBMYXRpdHVkZSBvdXQgb2YgcmFuZ2UgKi9cbiAgICByZXR1cm4geyB4OiBJbmZpbml0eSwgeTogSW5maW5pdHksIHo6IHAueiB9O1xuICB9XG5cbiAgaWYgKExvbmdpdHVkZSA+IE1hdGguUEkpIHtcbiAgICBMb25naXR1ZGUgLT0gKDIgKiBNYXRoLlBJKTtcbiAgfVxuICBTaW5fTGF0ID0gTWF0aC5zaW4oTGF0aXR1ZGUpO1xuICBDb3NfTGF0ID0gTWF0aC5jb3MoTGF0aXR1ZGUpO1xuICBTaW4yX0xhdCA9IFNpbl9MYXQgKiBTaW5fTGF0O1xuICBSbiA9IGEgLyAoTWF0aC5zcXJ0KDEuMGUwIC0gZXMgKiBTaW4yX0xhdCkpO1xuICByZXR1cm4ge1xuICAgIHg6IChSbiArIEhlaWdodCkgKiBDb3NfTGF0ICogTWF0aC5jb3MoTG9uZ2l0dWRlKSxcbiAgICB5OiAoUm4gKyBIZWlnaHQpICogQ29zX0xhdCAqIE1hdGguc2luKExvbmdpdHVkZSksXG4gICAgejogKChSbiAqICgxIC0gZXMpKSArIEhlaWdodCkgKiBTaW5fTGF0XG4gIH07XG59IC8vIGNzX2dlb2RldGljX3RvX2dlb2NlbnRyaWMoKVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VvY2VudHJpY1RvR2VvZGV0aWMocCwgZXMsIGEsIGIpIHtcbiAgLyogbG9jYWwgZGVmaW50aW9ucyBhbmQgdmFyaWFibGVzICovXG4gIC8qIGVuZC1jcml0ZXJpdW0gb2YgbG9vcCwgYWNjdXJhY3kgb2Ygc2luKExhdGl0dWRlKSAqL1xuICB2YXIgZ2VuYXUgPSAxZS0xMjtcbiAgdmFyIGdlbmF1MiA9IChnZW5hdSAqIGdlbmF1KTtcbiAgdmFyIG1heGl0ZXIgPSAzMDtcblxuICB2YXIgUDsgLyogZGlzdGFuY2UgYmV0d2VlbiBzZW1pLW1pbm9yIGF4aXMgYW5kIGxvY2F0aW9uICovXG4gIHZhciBSUjsgLyogZGlzdGFuY2UgYmV0d2VlbiBjZW50ZXIgYW5kIGxvY2F0aW9uICovXG4gIHZhciBDVDsgLyogc2luIG9mIGdlb2NlbnRyaWMgbGF0aXR1ZGUgKi9cbiAgdmFyIFNUOyAvKiBjb3Mgb2YgZ2VvY2VudHJpYyBsYXRpdHVkZSAqL1xuICB2YXIgUlg7XG4gIHZhciBSSztcbiAgdmFyIFJOOyAvKiBFYXJ0aCByYWRpdXMgYXQgbG9jYXRpb24gKi9cbiAgdmFyIENQSEkwOyAvKiBjb3Mgb2Ygc3RhcnQgb3Igb2xkIGdlb2RldGljIGxhdGl0dWRlIGluIGl0ZXJhdGlvbnMgKi9cbiAgdmFyIFNQSEkwOyAvKiBzaW4gb2Ygc3RhcnQgb3Igb2xkIGdlb2RldGljIGxhdGl0dWRlIGluIGl0ZXJhdGlvbnMgKi9cbiAgdmFyIENQSEk7IC8qIGNvcyBvZiBzZWFyY2hlZCBnZW9kZXRpYyBsYXRpdHVkZSAqL1xuICB2YXIgU1BISTsgLyogc2luIG9mIHNlYXJjaGVkIGdlb2RldGljIGxhdGl0dWRlICovXG4gIHZhciBTRFBISTsgLyogZW5kLWNyaXRlcml1bTogYWRkaXRpb24tdGhlb3JlbSBvZiBzaW4oTGF0aXR1ZGUoaXRlciktTGF0aXR1ZGUoaXRlci0xKSkgKi9cbiAgdmFyIGl0ZXI7IC8qICMgb2YgY29udGlub3VzIGl0ZXJhdGlvbiwgbWF4LiAzMCBpcyBhbHdheXMgZW5vdWdoIChzLmEuKSAqL1xuXG4gIHZhciBYID0gcC54O1xuICB2YXIgWSA9IHAueTtcbiAgdmFyIFogPSBwLnogPyBwLnogOiAwLjA7IC8vWiB2YWx1ZSBub3QgYWx3YXlzIHN1cHBsaWVkXG4gIHZhciBMb25naXR1ZGU7XG4gIHZhciBMYXRpdHVkZTtcbiAgdmFyIEhlaWdodDtcblxuICBQID0gTWF0aC5zcXJ0KFggKiBYICsgWSAqIFkpO1xuICBSUiA9IE1hdGguc3FydChYICogWCArIFkgKiBZICsgWiAqIFopO1xuXG4gIC8qICAgICAgc3BlY2lhbCBjYXNlcyBmb3IgbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSAqL1xuICBpZiAoUCAvIGEgPCBnZW5hdSkge1xuXG4gICAgLyogIHNwZWNpYWwgY2FzZSwgaWYgUD0wLiAoWD0wLiwgWT0wLikgKi9cbiAgICBMb25naXR1ZGUgPSAwLjA7XG5cbiAgICAvKiAgaWYgKFgsWSxaKT0oMC4sMC4sMC4pIHRoZW4gSGVpZ2h0IGJlY29tZXMgc2VtaS1taW5vciBheGlzXG4gICAgICogIG9mIGVsbGlwc29pZCAoPWNlbnRlciBvZiBtYXNzKSwgTGF0aXR1ZGUgYmVjb21lcyBQSS8yICovXG4gICAgaWYgKFJSIC8gYSA8IGdlbmF1KSB7XG4gICAgICBMYXRpdHVkZSA9IEhBTEZfUEk7XG4gICAgICBIZWlnaHQgPSAtYjtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IHAueCxcbiAgICAgICAgeTogcC55LFxuICAgICAgICB6OiBwLnpcbiAgICAgIH07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8qICBlbGxpcHNvaWRhbCAoZ2VvZGV0aWMpIGxvbmdpdHVkZVxuICAgICAqICBpbnRlcnZhbDogLVBJIDwgTG9uZ2l0dWRlIDw9ICtQSSAqL1xuICAgIExvbmdpdHVkZSA9IE1hdGguYXRhbjIoWSwgWCk7XG4gIH1cblxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBGb2xsb3dpbmcgaXRlcmF0aXZlIGFsZ29yaXRobSB3YXMgZGV2ZWxvcHBlZCBieVxuICAgKiBcIkluc3RpdHV0IGZvciBFcmRtZXNzdW5nXCIsIFVuaXZlcnNpdHkgb2YgSGFubm92ZXIsIEp1bHkgMTk4OC5cbiAgICogSW50ZXJuZXQ6IHd3dy5pZmUudW5pLWhhbm5vdmVyLmRlXG4gICAqIEl0ZXJhdGl2ZSBjb21wdXRhdGlvbiBvZiBDUEhJLFNQSEkgYW5kIEhlaWdodC5cbiAgICogSXRlcmF0aW9uIG9mIENQSEkgYW5kIFNQSEkgdG8gMTAqKi0xMiByYWRpYW4gcmVzcC5cbiAgICogMioxMCoqLTcgYXJjc2VjLlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cbiAgQ1QgPSBaIC8gUlI7XG4gIFNUID0gUCAvIFJSO1xuICBSWCA9IDEuMCAvIE1hdGguc3FydCgxLjAgLSBlcyAqICgyLjAgLSBlcykgKiBTVCAqIFNUKTtcbiAgQ1BISTAgPSBTVCAqICgxLjAgLSBlcykgKiBSWDtcbiAgU1BISTAgPSBDVCAqIFJYO1xuICBpdGVyID0gMDtcblxuICAvKiBsb29wIHRvIGZpbmQgc2luKExhdGl0dWRlKSByZXNwLiBMYXRpdHVkZVxuICAgKiB1bnRpbCB8c2luKExhdGl0dWRlKGl0ZXIpLUxhdGl0dWRlKGl0ZXItMSkpfCA8IGdlbmF1ICovXG4gIGRvIHtcbiAgICBpdGVyKys7XG4gICAgUk4gPSBhIC8gTWF0aC5zcXJ0KDEuMCAtIGVzICogU1BISTAgKiBTUEhJMCk7XG5cbiAgICAvKiAgZWxsaXBzb2lkYWwgKGdlb2RldGljKSBoZWlnaHQgKi9cbiAgICBIZWlnaHQgPSBQICogQ1BISTAgKyBaICogU1BISTAgLSBSTiAqICgxLjAgLSBlcyAqIFNQSEkwICogU1BISTApO1xuXG4gICAgUksgPSBlcyAqIFJOIC8gKFJOICsgSGVpZ2h0KTtcbiAgICBSWCA9IDEuMCAvIE1hdGguc3FydCgxLjAgLSBSSyAqICgyLjAgLSBSSykgKiBTVCAqIFNUKTtcbiAgICBDUEhJID0gU1QgKiAoMS4wIC0gUkspICogUlg7XG4gICAgU1BISSA9IENUICogUlg7XG4gICAgU0RQSEkgPSBTUEhJICogQ1BISTAgLSBDUEhJICogU1BISTA7XG4gICAgQ1BISTAgPSBDUEhJO1xuICAgIFNQSEkwID0gU1BISTtcbiAgfVxuICB3aGlsZSAoU0RQSEkgKiBTRFBISSA+IGdlbmF1MiAmJiBpdGVyIDwgbWF4aXRlcik7XG5cbiAgLyogICAgICBlbGxpcHNvaWRhbCAoZ2VvZGV0aWMpIGxhdGl0dWRlICovXG4gIExhdGl0dWRlID0gTWF0aC5hdGFuKFNQSEkgLyBNYXRoLmFicyhDUEhJKSk7XG4gIHJldHVybiB7XG4gICAgeDogTG9uZ2l0dWRlLFxuICAgIHk6IExhdGl0dWRlLFxuICAgIHo6IEhlaWdodFxuICB9O1xufSAvLyBjc19nZW9jZW50cmljX3RvX2dlb2RldGljKClcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vLyBwal9nZW9jZW50aWNfdG9fd2dzODQoIHAgKVxuLy8gIHAgPSBwb2ludCB0byB0cmFuc2Zvcm0gaW4gZ2VvY2VudHJpYyBjb29yZGluYXRlcyAoeCx5LHopXG5cblxuLyoqIHBvaW50IG9iamVjdCwgbm90aGluZyBmYW5jeSwganVzdCBhbGxvd3MgdmFsdWVzIHRvIGJlXG4gICAgcGFzc2VkIGJhY2sgYW5kIGZvcnRoIGJ5IHJlZmVyZW5jZSByYXRoZXIgdGhhbiBieSB2YWx1ZS5cbiAgICBPdGhlciBwb2ludCBjbGFzc2VzIG1heSBiZSB1c2VkIGFzIGxvbmcgYXMgdGhleSBoYXZlXG4gICAgeCBhbmQgeSBwcm9wZXJ0aWVzLCB3aGljaCB3aWxsIGdldCBtb2RpZmllZCBpbiB0aGUgdHJhbnNmb3JtIG1ldGhvZC5cbiovXG5leHBvcnQgZnVuY3Rpb24gZ2VvY2VudHJpY1RvV2dzODQocCwgZGF0dW1fdHlwZSwgZGF0dW1fcGFyYW1zKSB7XG5cbiAgaWYgKGRhdHVtX3R5cGUgPT09IFBKRF8zUEFSQU0pIHtcbiAgICAvLyBpZiggeFtpb10gPT09IEhVR0VfVkFMIClcbiAgICAvLyAgICBjb250aW51ZTtcbiAgICByZXR1cm4ge1xuICAgICAgeDogcC54ICsgZGF0dW1fcGFyYW1zWzBdLFxuICAgICAgeTogcC55ICsgZGF0dW1fcGFyYW1zWzFdLFxuICAgICAgejogcC56ICsgZGF0dW1fcGFyYW1zWzJdLFxuICAgIH07XG4gIH0gZWxzZSBpZiAoZGF0dW1fdHlwZSA9PT0gUEpEXzdQQVJBTSkge1xuICAgIHZhciBEeF9CRiA9IGRhdHVtX3BhcmFtc1swXTtcbiAgICB2YXIgRHlfQkYgPSBkYXR1bV9wYXJhbXNbMV07XG4gICAgdmFyIER6X0JGID0gZGF0dW1fcGFyYW1zWzJdO1xuICAgIHZhciBSeF9CRiA9IGRhdHVtX3BhcmFtc1szXTtcbiAgICB2YXIgUnlfQkYgPSBkYXR1bV9wYXJhbXNbNF07XG4gICAgdmFyIFJ6X0JGID0gZGF0dW1fcGFyYW1zWzVdO1xuICAgIHZhciBNX0JGID0gZGF0dW1fcGFyYW1zWzZdO1xuICAgIC8vIGlmKCB4W2lvXSA9PT0gSFVHRV9WQUwgKVxuICAgIC8vICAgIGNvbnRpbnVlO1xuICAgIHJldHVybiB7XG4gICAgICB4OiBNX0JGICogKHAueCAtIFJ6X0JGICogcC55ICsgUnlfQkYgKiBwLnopICsgRHhfQkYsXG4gICAgICB5OiBNX0JGICogKFJ6X0JGICogcC54ICsgcC55IC0gUnhfQkYgKiBwLnopICsgRHlfQkYsXG4gICAgICB6OiBNX0JGICogKC1SeV9CRiAqIHAueCArIFJ4X0JGICogcC55ICsgcC56KSArIER6X0JGXG4gICAgfTtcbiAgfVxufSAvLyBjc19nZW9jZW50cmljX3RvX3dnczg0XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLy8gcGpfZ2VvY2VudGljX2Zyb21fd2dzODQoKVxuLy8gIGNvb3JkaW5hdGUgc3lzdGVtIGRlZmluaXRpb24sXG4vLyAgcG9pbnQgdG8gdHJhbnNmb3JtIGluIGdlb2NlbnRyaWMgY29vcmRpbmF0ZXMgKHgseSx6KVxuZXhwb3J0IGZ1bmN0aW9uIGdlb2NlbnRyaWNGcm9tV2dzODQocCwgZGF0dW1fdHlwZSwgZGF0dW1fcGFyYW1zKSB7XG5cbiAgaWYgKGRhdHVtX3R5cGUgPT09IFBKRF8zUEFSQU0pIHtcbiAgICAvL2lmKCB4W2lvXSA9PT0gSFVHRV9WQUwgKVxuICAgIC8vICAgIGNvbnRpbnVlO1xuICAgIHJldHVybiB7XG4gICAgICB4OiBwLnggLSBkYXR1bV9wYXJhbXNbMF0sXG4gICAgICB5OiBwLnkgLSBkYXR1bV9wYXJhbXNbMV0sXG4gICAgICB6OiBwLnogLSBkYXR1bV9wYXJhbXNbMl0sXG4gICAgfTtcblxuICB9IGVsc2UgaWYgKGRhdHVtX3R5cGUgPT09IFBKRF83UEFSQU0pIHtcbiAgICB2YXIgRHhfQkYgPSBkYXR1bV9wYXJhbXNbMF07XG4gICAgdmFyIER5X0JGID0gZGF0dW1fcGFyYW1zWzFdO1xuICAgIHZhciBEel9CRiA9IGRhdHVtX3BhcmFtc1syXTtcbiAgICB2YXIgUnhfQkYgPSBkYXR1bV9wYXJhbXNbM107XG4gICAgdmFyIFJ5X0JGID0gZGF0dW1fcGFyYW1zWzRdO1xuICAgIHZhciBSel9CRiA9IGRhdHVtX3BhcmFtc1s1XTtcbiAgICB2YXIgTV9CRiA9IGRhdHVtX3BhcmFtc1s2XTtcbiAgICB2YXIgeF90bXAgPSAocC54IC0gRHhfQkYpIC8gTV9CRjtcbiAgICB2YXIgeV90bXAgPSAocC55IC0gRHlfQkYpIC8gTV9CRjtcbiAgICB2YXIgel90bXAgPSAocC56IC0gRHpfQkYpIC8gTV9CRjtcbiAgICAvL2lmKCB4W2lvXSA9PT0gSFVHRV9WQUwgKVxuICAgIC8vICAgIGNvbnRpbnVlO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHhfdG1wICsgUnpfQkYgKiB5X3RtcCAtIFJ5X0JGICogel90bXAsXG4gICAgICB5OiAtUnpfQkYgKiB4X3RtcCArIHlfdG1wICsgUnhfQkYgKiB6X3RtcCxcbiAgICAgIHo6IFJ5X0JGICogeF90bXAgLSBSeF9CRiAqIHlfdG1wICsgel90bXBcbiAgICB9O1xuICB9IC8vY3NfZ2VvY2VudHJpY19mcm9tX3dnczg0KClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9kYXR1bVV0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvZGF0dW1VdGlscy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1BKRF8zUEFSQU0sIFBKRF83UEFSQU0sIFBKRF9OT0RBVFVNfSBmcm9tICcuL2NvbnN0YW50cy92YWx1ZXMnO1xuXG5pbXBvcnQge2dlb2RldGljVG9HZW9jZW50cmljLCBnZW9jZW50cmljVG9HZW9kZXRpYywgZ2VvY2VudHJpY1RvV2dzODQsIGdlb2NlbnRyaWNGcm9tV2dzODQsIGNvbXBhcmVEYXR1bXN9IGZyb20gJy4vZGF0dW1VdGlscyc7XG5mdW5jdGlvbiBjaGVja1BhcmFtcyh0eXBlKSB7XG4gIHJldHVybiAodHlwZSA9PT0gUEpEXzNQQVJBTSB8fCB0eXBlID09PSBQSkRfN1BBUkFNKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc291cmNlLCBkZXN0LCBwb2ludCkge1xuICAvLyBTaG9ydCBjdXQgaWYgdGhlIGRhdHVtcyBhcmUgaWRlbnRpY2FsLlxuICBpZiAoY29tcGFyZURhdHVtcyhzb3VyY2UsIGRlc3QpKSB7XG4gICAgcmV0dXJuIHBvaW50OyAvLyBpbiB0aGlzIGNhc2UsIHplcm8gaXMgc3VjZXNzLFxuICAgIC8vIHdoZXJlYXMgY3NfY29tcGFyZV9kYXR1bXMgcmV0dXJucyAxIHRvIGluZGljYXRlIFRSVUVcbiAgICAvLyBjb25mdXNpbmcsIHNob3VsZCBmaXggdGhpc1xuICB9XG5cbiAgLy8gRXhwbGljaXRseSBza2lwIGRhdHVtIHRyYW5zZm9ybSBieSBzZXR0aW5nICdkYXR1bT1ub25lJyBhcyBwYXJhbWV0ZXIgZm9yIGVpdGhlciBzb3VyY2Ugb3IgZGVzdFxuICBpZiAoc291cmNlLmRhdHVtX3R5cGUgPT09IFBKRF9OT0RBVFVNIHx8IGRlc3QuZGF0dW1fdHlwZSA9PT0gUEpEX05PREFUVU0pIHtcbiAgICByZXR1cm4gcG9pbnQ7XG4gIH1cblxuICAvLyBJZiB0aGlzIGRhdHVtIHJlcXVpcmVzIGdyaWQgc2hpZnRzLCB0aGVuIGFwcGx5IGl0IHRvIGdlb2RldGljIGNvb3JkaW5hdGVzLlxuXG4gIC8vIERvIHdlIG5lZWQgdG8gZ28gdGhyb3VnaCBnZW9jZW50cmljIGNvb3JkaW5hdGVzP1xuICBpZiAoc291cmNlLmVzID09PSBkZXN0LmVzICYmIHNvdXJjZS5hID09PSBkZXN0LmEgJiYgIWNoZWNrUGFyYW1zKHNvdXJjZS5kYXR1bV90eXBlKSAmJiAgIWNoZWNrUGFyYW1zKGRlc3QuZGF0dW1fdHlwZSkpIHtcbiAgICByZXR1cm4gcG9pbnQ7XG4gIH1cblxuICAvLyBDb252ZXJ0IHRvIGdlb2NlbnRyaWMgY29vcmRpbmF0ZXMuXG4gIHBvaW50ID0gZ2VvZGV0aWNUb0dlb2NlbnRyaWMocG9pbnQsIHNvdXJjZS5lcywgc291cmNlLmEpO1xuICAvLyBDb252ZXJ0IGJldHdlZW4gZGF0dW1zXG4gIGlmIChjaGVja1BhcmFtcyhzb3VyY2UuZGF0dW1fdHlwZSkpIHtcbiAgICBwb2ludCA9IGdlb2NlbnRyaWNUb1dnczg0KHBvaW50LCBzb3VyY2UuZGF0dW1fdHlwZSwgc291cmNlLmRhdHVtX3BhcmFtcyk7XG4gIH1cbiAgaWYgKGNoZWNrUGFyYW1zKGRlc3QuZGF0dW1fdHlwZSkpIHtcbiAgICBwb2ludCA9IGdlb2NlbnRyaWNGcm9tV2dzODQocG9pbnQsIGRlc3QuZGF0dW1fdHlwZSwgZGVzdC5kYXR1bV9wYXJhbXMpO1xuICB9XG4gIHJldHVybiBnZW9jZW50cmljVG9HZW9kZXRpYyhwb2ludCwgZGVzdC5lcywgZGVzdC5hLCBkZXN0LmIpO1xuXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvZGF0dW1fdHJhbnNmb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvZGF0dW1fdHJhbnNmb3JtLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFsJztcbmltcG9ydCBwYXJzZVByb2ogZnJvbSAnLi9wcm9qU3RyaW5nJztcbmltcG9ydCB3a3QgZnJvbSAnd2t0LXBhcnNlcic7XG5cbmZ1bmN0aW9uIGRlZnMobmFtZSkge1xuICAvKmdsb2JhbCBjb25zb2xlKi9cbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHZhciBkZWYgPSBhcmd1bWVudHNbMV07XG4gICAgaWYgKHR5cGVvZiBkZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoZGVmLmNoYXJBdCgwKSA9PT0gJysnKSB7XG4gICAgICAgIGRlZnNbbmFtZV0gPSBwYXJzZVByb2ooYXJndW1lbnRzWzFdKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkZWZzW25hbWVdID0gd2t0KGFyZ3VtZW50c1sxXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlZnNbbmFtZV0gPSBkZWY7XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShuYW1lKSkge1xuICAgICAgcmV0dXJuIG5hbWUubWFwKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodikpIHtcbiAgICAgICAgICBkZWZzLmFwcGx5KHRoYXQsIHYpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlZnModik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChuYW1lIGluIGRlZnMpIHtcbiAgICAgICAgcmV0dXJuIGRlZnNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKCdFUFNHJyBpbiBuYW1lKSB7XG4gICAgICBkZWZzWydFUFNHOicgKyBuYW1lLkVQU0ddID0gbmFtZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoJ0VTUkknIGluIG5hbWUpIHtcbiAgICAgIGRlZnNbJ0VTUkk6JyArIG5hbWUuRVNSSV0gPSBuYW1lO1xuICAgIH1cbiAgICBlbHNlIGlmICgnSUFVMjAwMCcgaW4gbmFtZSkge1xuICAgICAgZGVmc1snSUFVMjAwMDonICsgbmFtZS5JQVUyMDAwXSA9IG5hbWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc29sZS5sb2cobmFtZSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG5cbn1cbmdsb2JhbHMoZGVmcyk7XG5leHBvcnQgZGVmYXVsdCBkZWZzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2RlZnMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9kZWZzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7U0lYVEgsIFJBNCwgUkE2LCBFUFNMTn0gZnJvbSAnLi9jb25zdGFudHMvdmFsdWVzJztcbmltcG9ydCB7ZGVmYXVsdCBhcyBFbGxpcHNvaWQsIFdHUzg0fSBmcm9tICcuL2NvbnN0YW50cy9FbGxpcHNvaWQnO1xuaW1wb3J0IG1hdGNoIGZyb20gJy4vbWF0Y2gnO1xuXG5leHBvcnQgZnVuY3Rpb24gZWNjZW50cmljaXR5KGEsIGIsIHJmLCBSX0EpIHtcbiAgdmFyIGEyID0gYSAqIGE7IC8vIHVzZWQgaW4gZ2VvY2VudHJpY1xuICB2YXIgYjIgPSBiICogYjsgLy8gdXNlZCBpbiBnZW9jZW50cmljXG4gIHZhciBlcyA9IChhMiAtIGIyKSAvIGEyOyAvLyBlIF4gMlxuICB2YXIgZSA9IDA7XG4gIGlmIChSX0EpIHtcbiAgICBhICo9IDEgLSBlcyAqIChTSVhUSCArIGVzICogKFJBNCArIGVzICogUkE2KSk7XG4gICAgYTIgPSBhICogYTtcbiAgICBlcyA9IDA7XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguc3FydChlcyk7IC8vIGVjY2VudHJpY2l0eVxuICB9XG4gIHZhciBlcDIgPSAoYTIgLSBiMikgLyBiMjsgLy8gdXNlZCBpbiBnZW9jZW50cmljXG4gIHJldHVybiB7XG4gICAgZXM6IGVzLFxuICAgIGU6IGUsXG4gICAgZXAyOiBlcDJcbiAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzcGhlcmUoYSwgYiwgcmYsIGVsbHBzLCBzcGhlcmUpIHtcbiAgaWYgKCFhKSB7IC8vIGRvIHdlIGhhdmUgYW4gZWxsaXBzb2lkP1xuICAgIHZhciBlbGxpcHNlID0gbWF0Y2goRWxsaXBzb2lkLCBlbGxwcyk7XG4gICAgaWYgKCFlbGxpcHNlKSB7XG4gICAgICBlbGxpcHNlID0gV0dTODQ7XG4gICAgfVxuICAgIGEgPSBlbGxpcHNlLmE7XG4gICAgYiA9IGVsbGlwc2UuYjtcbiAgICByZiA9IGVsbGlwc2UucmY7XG4gIH1cblxuICBpZiAocmYgJiYgIWIpIHtcbiAgICBiID0gKDEuMCAtIDEuMCAvIHJmKSAqIGE7XG4gIH1cbiAgaWYgKHJmID09PSAwIHx8IE1hdGguYWJzKGEgLSBiKSA8IEVQU0xOKSB7XG4gICAgc3BoZXJlID0gdHJ1ZTtcbiAgICBiID0gYTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGE6IGEsXG4gICAgYjogYixcbiAgICByZjogcmYsXG4gICAgc3BoZXJlOiBzcGhlcmVcbiAgfTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9kZXJpdmVDb25zdGFudHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9kZXJpdmVDb25zdGFudHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uIHx8IHt9O1xuICB2YXIgdmFsdWUsIHByb3BlcnR5O1xuICBpZiAoIXNvdXJjZSkge1xuICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgfVxuICBmb3IgKHByb3BlcnR5IGluIHNvdXJjZSkge1xuICAgIHZhbHVlID0gc291cmNlW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVzdGluYXRpb25bcHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0aW5hdGlvbjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9leHRlbmQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9leHRlbmQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGVmcykge1xuICBkZWZzKCdFUFNHOjQzMjYnLCBcIit0aXRsZT1XR1MgODQgKGxvbmcvbGF0KSArcHJvaj1sb25nbGF0ICtlbGxwcz1XR1M4NCArZGF0dW09V0dTODQgK3VuaXRzPWRlZ3JlZXNcIik7XG4gIGRlZnMoJ0VQU0c6NDI2OScsIFwiK3RpdGxlPU5BRDgzIChsb25nL2xhdCkgK3Byb2o9bG9uZ2xhdCArYT02Mzc4MTM3LjAgK2I9NjM1Njc1Mi4zMTQxNDAzNiArZWxscHM9R1JTODAgK2RhdHVtPU5BRDgzICt1bml0cz1kZWdyZWVzXCIpO1xuICBkZWZzKCdFUFNHOjM4NTcnLCBcIit0aXRsZT1XR1MgODQgLyBQc2V1ZG8tTWVyY2F0b3IgK3Byb2o9bWVyYyArYT02Mzc4MTM3ICtiPTYzNzgxMzcgK2xhdF90cz0wLjAgK2xvbl8wPTAuMCAreF8wPTAuMCAreV8wPTAgK2s9MS4wICt1bml0cz1tICtuYWRncmlkcz1AbnVsbCArbm9fZGVmc1wiKTtcblxuICBkZWZzLldHUzg0ID0gZGVmc1snRVBTRzo0MzI2J107XG4gIGRlZnNbJ0VQU0c6Mzc4NSddID0gZGVmc1snRVBTRzozODU3J107IC8vIG1haW50YWluIGJhY2t3YXJkIGNvbXBhdCwgb2ZmaWNpYWwgY29kZSBpcyAzODU3XG4gIGRlZnMuR09PR0xFID0gZGVmc1snRVBTRzozODU3J107XG4gIGRlZnNbJ0VQU0c6OTAwOTEzJ10gPSBkZWZzWydFUFNHOjM4NTcnXTtcbiAgZGVmc1snRVBTRzoxMDIxMTMnXSA9IGRlZnNbJ0VQU0c6Mzg1NyddO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgcHJvajQgZnJvbSAnLi9jb3JlJztcbmltcG9ydCBQcm9qIGZyb20gXCIuL1Byb2pcIjtcbmltcG9ydCBQb2ludCBmcm9tIFwiLi9Qb2ludFwiO1xuaW1wb3J0IGNvbW1vbiBmcm9tIFwiLi9jb21tb24vdG9Qb2ludFwiO1xuaW1wb3J0IGRlZnMgZnJvbSBcIi4vZGVmc1wiO1xuaW1wb3J0IHRyYW5zZm9ybSBmcm9tIFwiLi90cmFuc2Zvcm1cIjtcbmltcG9ydCBtZ3JzIGZyb20gXCJtZ3JzXCI7XG5pbXBvcnQgdmVyc2lvbiBmcm9tIFwiLi92ZXJzaW9uXCI7XG5pbXBvcnQgaW5jbHVkZWRQcm9qZWN0aW9ucyBmcm9tIFwiLi4vcHJvanNcIjtcblxucHJvajQuZGVmYXVsdERhdHVtID0gJ1dHUzg0JzsgLy9kZWZhdWx0IGRhdHVtXG5wcm9qNC5Qcm9qID0gUHJvajtcbnByb2o0LldHUzg0ID0gbmV3IHByb2o0LlByb2ooJ1dHUzg0Jyk7XG5wcm9qNC5Qb2ludCA9IFBvaW50O1xucHJvajQudG9Qb2ludCA9IGNvbW1vbjtcbnByb2o0LmRlZnMgPSBkZWZzO1xucHJvajQudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xucHJvajQubWdycyA9IG1ncnM7XG5wcm9qNC52ZXJzaW9uID0gdmVyc2lvbjtcbmluY2x1ZGVkUHJvamVjdGlvbnMocHJvajQpO1xuZXhwb3J0IGRlZmF1bHQgcHJvajQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaWdub3JlZENoYXIgPSAvW1xcc19cXC1cXC9cXChcXCldL2c7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXRjaChvYmosIGtleSkge1xuICBpZiAob2JqW2tleV0pIHtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICB2YXIgbGtleSA9IGtleS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoaWdub3JlZENoYXIsICcnKTtcbiAgdmFyIGkgPSAtMTtcbiAgdmFyIHRlc3RrZXksIHByb2Nlc3NlZEtleTtcbiAgd2hpbGUgKCsraSA8IGtleXMubGVuZ3RoKSB7XG4gICAgdGVzdGtleSA9IGtleXNbaV07XG4gICAgcHJvY2Vzc2VkS2V5ID0gdGVzdGtleS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoaWdub3JlZENoYXIsICcnKTtcbiAgICBpZiAocHJvY2Vzc2VkS2V5ID09PSBsa2V5KSB7XG4gICAgICByZXR1cm4gb2JqW3Rlc3RrZXldO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL21hdGNoLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvbWF0Y2guanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9kZWZzJztcbmltcG9ydCB3a3QgZnJvbSAnd2t0LXBhcnNlcic7XG5pbXBvcnQgcHJvalN0ciBmcm9tICcuL3Byb2pTdHJpbmcnO1xuaW1wb3J0IG1hdGNoIGZyb20gJy4vbWF0Y2gnO1xuZnVuY3Rpb24gdGVzdE9iaihjb2RlKXtcbiAgcmV0dXJuIHR5cGVvZiBjb2RlID09PSAnc3RyaW5nJztcbn1cbmZ1bmN0aW9uIHRlc3REZWYoY29kZSl7XG4gIHJldHVybiBjb2RlIGluIGRlZnM7XG59XG4gdmFyIGNvZGVXb3JkcyA9IFsnUFJPSkVDVEVEQ1JTJywgJ1BST0pDUlMnLCAnR0VPR0NTJywnR0VPQ0NTJywnUFJPSkNTJywnTE9DQUxfQ1MnLCAnR0VPRENSUycsICdHRU9ERVRJQ0NSUycsICdHRU9ERVRJQ0RBVFVNJywgJ0VOR0NSUycsICdFTkdJTkVFUklOR0NSUyddO1xuZnVuY3Rpb24gdGVzdFdLVChjb2RlKXtcbiAgcmV0dXJuIGNvZGVXb3Jkcy5zb21lKGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgcmV0dXJuIGNvZGUuaW5kZXhPZih3b3JkKSA+IC0xO1xuICB9KTtcbn1cbnZhciBjb2RlcyA9IFsnMzg1NycsICc5MDA5MTMnLCAnMzc4NScsICcxMDIxMTMnXTtcbmZ1bmN0aW9uIGNoZWNrTWVyY2F0b3IoaXRlbSkge1xuICB2YXIgYXV0aCA9IG1hdGNoKGl0ZW0sICdhdXRob3JpdHknKTtcbiAgaWYgKCFhdXRoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBjb2RlID0gbWF0Y2goYXV0aCwgJ2Vwc2cnKTtcbiAgcmV0dXJuIGNvZGUgJiYgY29kZXMuaW5kZXhPZihjb2RlKSA+IC0xO1xufVxuZnVuY3Rpb24gY2hlY2tQcm9qU3RyKGl0ZW0pIHtcbiAgdmFyIGV4dCA9IG1hdGNoKGl0ZW0sICdleHRlbnNpb24nKTtcbiAgaWYgKCFleHQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIG1hdGNoKGV4dCwgJ3Byb2o0Jyk7XG59XG5mdW5jdGlvbiB0ZXN0UHJvaihjb2RlKXtcbiAgcmV0dXJuIGNvZGVbMF0gPT09ICcrJztcbn1cbmZ1bmN0aW9uIHBhcnNlKGNvZGUpe1xuICBpZiAodGVzdE9iaihjb2RlKSkge1xuICAgIC8vY2hlY2sgdG8gc2VlIGlmIHRoaXMgaXMgYSBXS1Qgc3RyaW5nXG4gICAgaWYgKHRlc3REZWYoY29kZSkpIHtcbiAgICAgIHJldHVybiBkZWZzW2NvZGVdO1xuICAgIH1cbiAgICBpZiAodGVzdFdLVChjb2RlKSkge1xuICAgICAgdmFyIG91dCA9IHdrdChjb2RlKTtcbiAgICAgIC8vIHRlc3Qgb2Ygc3BldGlhbCBjYXNlLCBkdWUgdG8gdGhpcyBiZWluZyBhIHZlcnkgY29tbW9uIGFuZCBvZnRlbiBtYWxmb3JtZWRcbiAgICAgIGlmIChjaGVja01lcmNhdG9yKG91dCkpIHtcbiAgICAgICAgcmV0dXJuIGRlZnNbJ0VQU0c6Mzg1NyddO1xuICAgICAgfVxuICAgICAgdmFyIG1heWJlUHJvalN0ciA9IGNoZWNrUHJvalN0cihvdXQpO1xuICAgICAgaWYgKG1heWJlUHJvalN0cikge1xuICAgICAgICByZXR1cm4gcHJvalN0cihtYXliZVByb2pTdHIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgaWYgKHRlc3RQcm9qKGNvZGUpKSB7XG4gICAgICByZXR1cm4gcHJvalN0cihjb2RlKTtcbiAgICB9XG4gIH1lbHNle1xuICAgIHJldHVybiBjb2RlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3BhcnNlQ29kZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3BhcnNlQ29kZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge0QyUn0gZnJvbSAnLi9jb25zdGFudHMvdmFsdWVzJztcbmltcG9ydCBQcmltZU1lcmlkaWFuIGZyb20gJy4vY29uc3RhbnRzL1ByaW1lTWVyaWRpYW4nO1xuaW1wb3J0IHVuaXRzIGZyb20gJy4vY29uc3RhbnRzL3VuaXRzJztcbmltcG9ydCBtYXRjaCBmcm9tICcuL21hdGNoJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGVmRGF0YSkge1xuICB2YXIgc2VsZiA9IHt9O1xuICB2YXIgcGFyYW1PYmogPSBkZWZEYXRhLnNwbGl0KCcrJykubWFwKGZ1bmN0aW9uKHYpIHtcbiAgICByZXR1cm4gdi50cmltKCk7XG4gIH0pLmZpbHRlcihmdW5jdGlvbihhKSB7XG4gICAgcmV0dXJuIGE7XG4gIH0pLnJlZHVjZShmdW5jdGlvbihwLCBhKSB7XG4gICAgdmFyIHNwbGl0ID0gYS5zcGxpdCgnPScpO1xuICAgIHNwbGl0LnB1c2godHJ1ZSk7XG4gICAgcFtzcGxpdFswXS50b0xvd2VyQ2FzZSgpXSA9IHNwbGl0WzFdO1xuICAgIHJldHVybiBwO1xuICB9LCB7fSk7XG4gIHZhciBwYXJhbU5hbWUsIHBhcmFtVmFsLCBwYXJhbU91dG5hbWU7XG4gIHZhciBwYXJhbXMgPSB7XG4gICAgcHJvajogJ3Byb2pOYW1lJyxcbiAgICBkYXR1bTogJ2RhdHVtQ29kZScsXG4gICAgcmY6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYucmYgPSBwYXJzZUZsb2F0KHYpO1xuICAgIH0sXG4gICAgbGF0XzA6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYubGF0MCA9IHYgKiBEMlI7XG4gICAgfSxcbiAgICBsYXRfMTogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5sYXQxID0gdiAqIEQyUjtcbiAgICB9LFxuICAgIGxhdF8yOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmxhdDIgPSB2ICogRDJSO1xuICAgIH0sXG4gICAgbGF0X3RzOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmxhdF90cyA9IHYgKiBEMlI7XG4gICAgfSxcbiAgICBsb25fMDogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5sb25nMCA9IHYgKiBEMlI7XG4gICAgfSxcbiAgICBsb25fMTogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5sb25nMSA9IHYgKiBEMlI7XG4gICAgfSxcbiAgICBsb25fMjogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5sb25nMiA9IHYgKiBEMlI7XG4gICAgfSxcbiAgICBhbHBoYTogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5hbHBoYSA9IHBhcnNlRmxvYXQodikgKiBEMlI7XG4gICAgfSxcbiAgICBsb25jOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmxvbmdjID0gdiAqIEQyUjtcbiAgICB9LFxuICAgIHhfMDogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi54MCA9IHBhcnNlRmxvYXQodik7XG4gICAgfSxcbiAgICB5XzA6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYueTAgPSBwYXJzZUZsb2F0KHYpO1xuICAgIH0sXG4gICAga18wOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmswID0gcGFyc2VGbG9hdCh2KTtcbiAgICB9LFxuICAgIGs6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYuazAgPSBwYXJzZUZsb2F0KHYpO1xuICAgIH0sXG4gICAgYTogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5hID0gcGFyc2VGbG9hdCh2KTtcbiAgICB9LFxuICAgIGI6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYuYiA9IHBhcnNlRmxvYXQodik7XG4gICAgfSxcbiAgICByX2E6IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5SX0EgPSB0cnVlO1xuICAgIH0sXG4gICAgem9uZTogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi56b25lID0gcGFyc2VJbnQodiwgMTApO1xuICAgIH0sXG4gICAgc291dGg6IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi51dG1Tb3V0aCA9IHRydWU7XG4gICAgfSxcbiAgICB0b3dnczg0OiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmRhdHVtX3BhcmFtcyA9IHYuc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvbihhKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KGEpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB0b19tZXRlcjogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi50b19tZXRlciA9IHBhcnNlRmxvYXQodik7XG4gICAgfSxcbiAgICB1bml0czogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi51bml0cyA9IHY7XG4gICAgICB2YXIgdW5pdCA9IG1hdGNoKHVuaXRzLCB2KTtcbiAgICAgIGlmICh1bml0KSB7XG4gICAgICAgIHNlbGYudG9fbWV0ZXIgPSB1bml0LnRvX21ldGVyO1xuICAgICAgfVxuICAgIH0sXG4gICAgZnJvbV9ncmVlbndpY2g6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYuZnJvbV9ncmVlbndpY2ggPSB2ICogRDJSO1xuICAgIH0sXG4gICAgcG06IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHZhciBwbSA9IG1hdGNoKFByaW1lTWVyaWRpYW4sIHYpO1xuICAgICAgc2VsZi5mcm9tX2dyZWVud2ljaCA9IChwbSA/IHBtIDogcGFyc2VGbG9hdCh2KSkgKiBEMlI7XG4gICAgfSxcbiAgICBuYWRncmlkczogZnVuY3Rpb24odikge1xuICAgICAgaWYgKHYgPT09ICdAbnVsbCcpIHtcbiAgICAgICAgc2VsZi5kYXR1bUNvZGUgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VsZi5uYWRncmlkcyA9IHY7XG4gICAgICB9XG4gICAgfSxcbiAgICBheGlzOiBmdW5jdGlvbih2KSB7XG4gICAgICB2YXIgbGVnYWxBeGlzID0gXCJld25zdWRcIjtcbiAgICAgIGlmICh2Lmxlbmd0aCA9PT0gMyAmJiBsZWdhbEF4aXMuaW5kZXhPZih2LnN1YnN0cigwLCAxKSkgIT09IC0xICYmIGxlZ2FsQXhpcy5pbmRleE9mKHYuc3Vic3RyKDEsIDEpKSAhPT0gLTEgJiYgbGVnYWxBeGlzLmluZGV4T2Yodi5zdWJzdHIoMiwgMSkpICE9PSAtMSkge1xuICAgICAgICBzZWxmLmF4aXMgPSB2O1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgZm9yIChwYXJhbU5hbWUgaW4gcGFyYW1PYmopIHtcbiAgICBwYXJhbVZhbCA9IHBhcmFtT2JqW3BhcmFtTmFtZV07XG4gICAgaWYgKHBhcmFtTmFtZSBpbiBwYXJhbXMpIHtcbiAgICAgIHBhcmFtT3V0bmFtZSA9IHBhcmFtc1twYXJhbU5hbWVdO1xuICAgICAgaWYgKHR5cGVvZiBwYXJhbU91dG5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcGFyYW1PdXRuYW1lKHBhcmFtVmFsKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWxmW3BhcmFtT3V0bmFtZV0gPSBwYXJhbVZhbDtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzZWxmW3BhcmFtTmFtZV0gPSBwYXJhbVZhbDtcbiAgICB9XG4gIH1cbiAgaWYodHlwZW9mIHNlbGYuZGF0dW1Db2RlID09PSAnc3RyaW5nJyAmJiBzZWxmLmRhdHVtQ29kZSAhPT0gXCJXR1M4NFwiKXtcbiAgICBzZWxmLmRhdHVtQ29kZSA9IHNlbGYuZGF0dW1Db2RlLnRvTG93ZXJDYXNlKCk7XG4gIH1cbiAgcmV0dXJuIHNlbGY7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvalN0cmluZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2pTdHJpbmcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IG1lcmMgZnJvbSBcIi4vcHJvamVjdGlvbnMvbWVyY1wiO1xuaW1wb3J0IGxvbmdsYXQgZnJvbSBcIi4vcHJvamVjdGlvbnMvbG9uZ2xhdFwiO1xudmFyIHByb2pzID0gW21lcmMsIGxvbmdsYXRdO1xudmFyIG5hbWVzID0ge307XG52YXIgcHJvalN0b3JlID0gW107XG5cbmZ1bmN0aW9uIGFkZChwcm9qLCBpKSB7XG4gIHZhciBsZW4gPSBwcm9qU3RvcmUubGVuZ3RoO1xuICBpZiAoIXByb2oubmFtZXMpIHtcbiAgICBjb25zb2xlLmxvZyhpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBwcm9qU3RvcmVbbGVuXSA9IHByb2o7XG4gIHByb2oubmFtZXMuZm9yRWFjaChmdW5jdGlvbihuKSB7XG4gICAgbmFtZXNbbi50b0xvd2VyQ2FzZSgpXSA9IGxlbjtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQge2FkZH07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQobmFtZSkge1xuICBpZiAoIW5hbWUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIG4gPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gIGlmICh0eXBlb2YgbmFtZXNbbl0gIT09ICd1bmRlZmluZWQnICYmIHByb2pTdG9yZVtuYW1lc1tuXV0pIHtcbiAgICByZXR1cm4gcHJvalN0b3JlW25hbWVzW25dXTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnQoKSB7XG4gIHByb2pzLmZvckVhY2goYWRkKTtcbn1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3RhcnQ6IHN0YXJ0LFxuICBhZGQ6IGFkZCxcbiAgZ2V0OiBnZXRcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgbXNmbnogZnJvbSAnLi4vY29tbW9uL21zZm56JztcbmltcG9ydCBxc2ZueiBmcm9tICcuLi9jb21tb24vcXNmbnonO1xuaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuaW1wb3J0IGFzaW56IGZyb20gJy4uL2NvbW1vbi9hc2lueic7XG5pbXBvcnQge0VQU0xOfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgaWYgKE1hdGguYWJzKHRoaXMubGF0MSArIHRoaXMubGF0MikgPCBFUFNMTikge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnRlbXAgPSB0aGlzLmIgLyB0aGlzLmE7XG4gIHRoaXMuZXMgPSAxIC0gTWF0aC5wb3codGhpcy50ZW1wLCAyKTtcbiAgdGhpcy5lMyA9IE1hdGguc3FydCh0aGlzLmVzKTtcblxuICB0aGlzLnNpbl9wbyA9IE1hdGguc2luKHRoaXMubGF0MSk7XG4gIHRoaXMuY29zX3BvID0gTWF0aC5jb3ModGhpcy5sYXQxKTtcbiAgdGhpcy50MSA9IHRoaXMuc2luX3BvO1xuICB0aGlzLmNvbiA9IHRoaXMuc2luX3BvO1xuICB0aGlzLm1zMSA9IG1zZm56KHRoaXMuZTMsIHRoaXMuc2luX3BvLCB0aGlzLmNvc19wbyk7XG4gIHRoaXMucXMxID0gcXNmbnoodGhpcy5lMywgdGhpcy5zaW5fcG8sIHRoaXMuY29zX3BvKTtcblxuICB0aGlzLnNpbl9wbyA9IE1hdGguc2luKHRoaXMubGF0Mik7XG4gIHRoaXMuY29zX3BvID0gTWF0aC5jb3ModGhpcy5sYXQyKTtcbiAgdGhpcy50MiA9IHRoaXMuc2luX3BvO1xuICB0aGlzLm1zMiA9IG1zZm56KHRoaXMuZTMsIHRoaXMuc2luX3BvLCB0aGlzLmNvc19wbyk7XG4gIHRoaXMucXMyID0gcXNmbnoodGhpcy5lMywgdGhpcy5zaW5fcG8sIHRoaXMuY29zX3BvKTtcblxuICB0aGlzLnNpbl9wbyA9IE1hdGguc2luKHRoaXMubGF0MCk7XG4gIHRoaXMuY29zX3BvID0gTWF0aC5jb3ModGhpcy5sYXQwKTtcbiAgdGhpcy50MyA9IHRoaXMuc2luX3BvO1xuICB0aGlzLnFzMCA9IHFzZm56KHRoaXMuZTMsIHRoaXMuc2luX3BvLCB0aGlzLmNvc19wbyk7XG5cbiAgaWYgKE1hdGguYWJzKHRoaXMubGF0MSAtIHRoaXMubGF0MikgPiBFUFNMTikge1xuICAgIHRoaXMubnMwID0gKHRoaXMubXMxICogdGhpcy5tczEgLSB0aGlzLm1zMiAqIHRoaXMubXMyKSAvICh0aGlzLnFzMiAtIHRoaXMucXMxKTtcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLm5zMCA9IHRoaXMuY29uO1xuICB9XG4gIHRoaXMuYyA9IHRoaXMubXMxICogdGhpcy5tczEgKyB0aGlzLm5zMCAqIHRoaXMucXMxO1xuICB0aGlzLnJoID0gdGhpcy5hICogTWF0aC5zcXJ0KHRoaXMuYyAtIHRoaXMubnMwICogdGhpcy5xczApIC8gdGhpcy5uczA7XG59XG5cbi8qIEFsYmVycyBDb25pY2FsIEVxdWFsIEFyZWEgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuXG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG5cbiAgdGhpcy5zaW5fcGhpID0gTWF0aC5zaW4obGF0KTtcbiAgdGhpcy5jb3NfcGhpID0gTWF0aC5jb3MobGF0KTtcblxuICB2YXIgcXMgPSBxc2Zueih0aGlzLmUzLCB0aGlzLnNpbl9waGksIHRoaXMuY29zX3BoaSk7XG4gIHZhciByaDEgPSB0aGlzLmEgKiBNYXRoLnNxcnQodGhpcy5jIC0gdGhpcy5uczAgKiBxcykgLyB0aGlzLm5zMDtcbiAgdmFyIHRoZXRhID0gdGhpcy5uczAgKiBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICB2YXIgeCA9IHJoMSAqIE1hdGguc2luKHRoZXRhKSArIHRoaXMueDA7XG4gIHZhciB5ID0gdGhpcy5yaCAtIHJoMSAqIE1hdGguY29zKHRoZXRhKSArIHRoaXMueTA7XG5cbiAgcC54ID0geDtcbiAgcC55ID0geTtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgdmFyIHJoMSwgcXMsIGNvbiwgdGhldGEsIGxvbiwgbGF0O1xuXG4gIHAueCAtPSB0aGlzLngwO1xuICBwLnkgPSB0aGlzLnJoIC0gcC55ICsgdGhpcy55MDtcbiAgaWYgKHRoaXMubnMwID49IDApIHtcbiAgICByaDEgPSBNYXRoLnNxcnQocC54ICogcC54ICsgcC55ICogcC55KTtcbiAgICBjb24gPSAxO1xuICB9XG4gIGVsc2Uge1xuICAgIHJoMSA9IC1NYXRoLnNxcnQocC54ICogcC54ICsgcC55ICogcC55KTtcbiAgICBjb24gPSAtMTtcbiAgfVxuICB0aGV0YSA9IDA7XG4gIGlmIChyaDEgIT09IDApIHtcbiAgICB0aGV0YSA9IE1hdGguYXRhbjIoY29uICogcC54LCBjb24gKiBwLnkpO1xuICB9XG4gIGNvbiA9IHJoMSAqIHRoaXMubnMwIC8gdGhpcy5hO1xuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICBsYXQgPSBNYXRoLmFzaW4oKHRoaXMuYyAtIGNvbiAqIGNvbikgLyAoMiAqIHRoaXMubnMwKSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcXMgPSAodGhpcy5jIC0gY29uICogY29uKSAvIHRoaXMubnMwO1xuICAgIGxhdCA9IHRoaXMucGhpMXoodGhpcy5lMywgcXMpO1xuICB9XG5cbiAgbG9uID0gYWRqdXN0X2xvbih0aGV0YSAvIHRoaXMubnMwICsgdGhpcy5sb25nMCk7XG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuICByZXR1cm4gcDtcbn1cblxuLyogRnVuY3Rpb24gdG8gY29tcHV0ZSBwaGkxLCB0aGUgbGF0aXR1ZGUgZm9yIHRoZSBpbnZlcnNlIG9mIHRoZVxuICAgQWxiZXJzIENvbmljYWwgRXF1YWwtQXJlYSBwcm9qZWN0aW9uLlxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gcGhpMXooZWNjZW50LCBxcykge1xuICB2YXIgc2lucGhpLCBjb3NwaGksIGNvbiwgY29tLCBkcGhpO1xuICB2YXIgcGhpID0gYXNpbnooMC41ICogcXMpO1xuICBpZiAoZWNjZW50IDwgRVBTTE4pIHtcbiAgICByZXR1cm4gcGhpO1xuICB9XG5cbiAgdmFyIGVjY250cyA9IGVjY2VudCAqIGVjY2VudDtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPD0gMjU7IGkrKykge1xuICAgIHNpbnBoaSA9IE1hdGguc2luKHBoaSk7XG4gICAgY29zcGhpID0gTWF0aC5jb3MocGhpKTtcbiAgICBjb24gPSBlY2NlbnQgKiBzaW5waGk7XG4gICAgY29tID0gMSAtIGNvbiAqIGNvbjtcbiAgICBkcGhpID0gMC41ICogY29tICogY29tIC8gY29zcGhpICogKHFzIC8gKDEgLSBlY2NudHMpIC0gc2lucGhpIC8gY29tICsgMC41IC8gZWNjZW50ICogTWF0aC5sb2coKDEgLSBjb24pIC8gKDEgKyBjb24pKSk7XG4gICAgcGhpID0gcGhpICsgZHBoaTtcbiAgICBpZiAoTWF0aC5hYnMoZHBoaSkgPD0gMWUtNykge1xuICAgICAgcmV0dXJuIHBoaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJBbGJlcnNfQ29uaWNfRXF1YWxfQXJlYVwiLCBcIkFsYmVyc1wiLCBcImFlYVwiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzLFxuICBwaGkxejogcGhpMXpcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvYWVhLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvYWVhLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcbmltcG9ydCB7SEFMRl9QSSwgRVBTTE59IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuXG5pbXBvcnQgbWxmbiBmcm9tICcuLi9jb21tb24vbWxmbic7XG5pbXBvcnQgZTBmbiBmcm9tICcuLi9jb21tb24vZTBmbic7XG5pbXBvcnQgZTFmbiBmcm9tICcuLi9jb21tb24vZTFmbic7XG5pbXBvcnQgZTJmbiBmcm9tICcuLi9jb21tb24vZTJmbic7XG5pbXBvcnQgZTNmbiBmcm9tICcuLi9jb21tb24vZTNmbic7XG5pbXBvcnQgZ04gZnJvbSAnLi4vY29tbW9uL2dOJztcbmltcG9ydCBhc2lueiBmcm9tICcuLi9jb21tb24vYXNpbnonO1xuaW1wb3J0IGltbGZuIGZyb20gJy4uL2NvbW1vbi9pbWxmbic7XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGhpcy5zaW5fcDEyID0gTWF0aC5zaW4odGhpcy5sYXQwKTtcbiAgdGhpcy5jb3NfcDEyID0gTWF0aC5jb3ModGhpcy5sYXQwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuICB2YXIgc2lucGhpID0gTWF0aC5zaW4ocC55KTtcbiAgdmFyIGNvc3BoaSA9IE1hdGguY29zKHAueSk7XG4gIHZhciBkbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgdmFyIGUwLCBlMSwgZTIsIGUzLCBNbHAsIE1sLCB0YW5waGksIE5sMSwgTmwsIHBzaSwgQXosIEcsIEgsIEdILCBIcywgYywga3AsIGNvc19jLCBzLCBzMiwgczMsIHM0LCBzNTtcbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgaWYgKE1hdGguYWJzKHRoaXMuc2luX3AxMiAtIDEpIDw9IEVQU0xOKSB7XG4gICAgICAvL05vcnRoIFBvbGUgY2FzZVxuICAgICAgcC54ID0gdGhpcy54MCArIHRoaXMuYSAqIChIQUxGX1BJIC0gbGF0KSAqIE1hdGguc2luKGRsb24pO1xuICAgICAgcC55ID0gdGhpcy55MCAtIHRoaXMuYSAqIChIQUxGX1BJIC0gbGF0KSAqIE1hdGguY29zKGRsb24pO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGVsc2UgaWYgKE1hdGguYWJzKHRoaXMuc2luX3AxMiArIDEpIDw9IEVQU0xOKSB7XG4gICAgICAvL1NvdXRoIFBvbGUgY2FzZVxuICAgICAgcC54ID0gdGhpcy54MCArIHRoaXMuYSAqIChIQUxGX1BJICsgbGF0KSAqIE1hdGguc2luKGRsb24pO1xuICAgICAgcC55ID0gdGhpcy55MCArIHRoaXMuYSAqIChIQUxGX1BJICsgbGF0KSAqIE1hdGguY29zKGRsb24pO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy9kZWZhdWx0IGNhc2VcbiAgICAgIGNvc19jID0gdGhpcy5zaW5fcDEyICogc2lucGhpICsgdGhpcy5jb3NfcDEyICogY29zcGhpICogTWF0aC5jb3MoZGxvbik7XG4gICAgICBjID0gTWF0aC5hY29zKGNvc19jKTtcbiAgICAgIGtwID0gYyAvIE1hdGguc2luKGMpO1xuICAgICAgcC54ID0gdGhpcy54MCArIHRoaXMuYSAqIGtwICogY29zcGhpICogTWF0aC5zaW4oZGxvbik7XG4gICAgICBwLnkgPSB0aGlzLnkwICsgdGhpcy5hICoga3AgKiAodGhpcy5jb3NfcDEyICogc2lucGhpIC0gdGhpcy5zaW5fcDEyICogY29zcGhpICogTWF0aC5jb3MoZGxvbikpO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGUwID0gZTBmbih0aGlzLmVzKTtcbiAgICBlMSA9IGUxZm4odGhpcy5lcyk7XG4gICAgZTIgPSBlMmZuKHRoaXMuZXMpO1xuICAgIGUzID0gZTNmbih0aGlzLmVzKTtcbiAgICBpZiAoTWF0aC5hYnModGhpcy5zaW5fcDEyIC0gMSkgPD0gRVBTTE4pIHtcbiAgICAgIC8vTm9ydGggUG9sZSBjYXNlXG4gICAgICBNbHAgPSB0aGlzLmEgKiBtbGZuKGUwLCBlMSwgZTIsIGUzLCBIQUxGX1BJKTtcbiAgICAgIE1sID0gdGhpcy5hICogbWxmbihlMCwgZTEsIGUyLCBlMywgbGF0KTtcbiAgICAgIHAueCA9IHRoaXMueDAgKyAoTWxwIC0gTWwpICogTWF0aC5zaW4oZGxvbik7XG4gICAgICBwLnkgPSB0aGlzLnkwIC0gKE1scCAtIE1sKSAqIE1hdGguY29zKGRsb24pO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGVsc2UgaWYgKE1hdGguYWJzKHRoaXMuc2luX3AxMiArIDEpIDw9IEVQU0xOKSB7XG4gICAgICAvL1NvdXRoIFBvbGUgY2FzZVxuICAgICAgTWxwID0gdGhpcy5hICogbWxmbihlMCwgZTEsIGUyLCBlMywgSEFMRl9QSSk7XG4gICAgICBNbCA9IHRoaXMuYSAqIG1sZm4oZTAsIGUxLCBlMiwgZTMsIGxhdCk7XG4gICAgICBwLnggPSB0aGlzLngwICsgKE1scCArIE1sKSAqIE1hdGguc2luKGRsb24pO1xuICAgICAgcC55ID0gdGhpcy55MCArIChNbHAgKyBNbCkgKiBNYXRoLmNvcyhkbG9uKTtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vRGVmYXVsdCBjYXNlXG4gICAgICB0YW5waGkgPSBzaW5waGkgLyBjb3NwaGk7XG4gICAgICBObDEgPSBnTih0aGlzLmEsIHRoaXMuZSwgdGhpcy5zaW5fcDEyKTtcbiAgICAgIE5sID0gZ04odGhpcy5hLCB0aGlzLmUsIHNpbnBoaSk7XG4gICAgICBwc2kgPSBNYXRoLmF0YW4oKDEgLSB0aGlzLmVzKSAqIHRhbnBoaSArIHRoaXMuZXMgKiBObDEgKiB0aGlzLnNpbl9wMTIgLyAoTmwgKiBjb3NwaGkpKTtcbiAgICAgIEF6ID0gTWF0aC5hdGFuMihNYXRoLnNpbihkbG9uKSwgdGhpcy5jb3NfcDEyICogTWF0aC50YW4ocHNpKSAtIHRoaXMuc2luX3AxMiAqIE1hdGguY29zKGRsb24pKTtcbiAgICAgIGlmIChBeiA9PT0gMCkge1xuICAgICAgICBzID0gTWF0aC5hc2luKHRoaXMuY29zX3AxMiAqIE1hdGguc2luKHBzaSkgLSB0aGlzLnNpbl9wMTIgKiBNYXRoLmNvcyhwc2kpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKE1hdGguYWJzKE1hdGguYWJzKEF6KSAtIE1hdGguUEkpIDw9IEVQU0xOKSB7XG4gICAgICAgIHMgPSAtTWF0aC5hc2luKHRoaXMuY29zX3AxMiAqIE1hdGguc2luKHBzaSkgLSB0aGlzLnNpbl9wMTIgKiBNYXRoLmNvcyhwc2kpKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzID0gTWF0aC5hc2luKE1hdGguc2luKGRsb24pICogTWF0aC5jb3MocHNpKSAvIE1hdGguc2luKEF6KSk7XG4gICAgICB9XG4gICAgICBHID0gdGhpcy5lICogdGhpcy5zaW5fcDEyIC8gTWF0aC5zcXJ0KDEgLSB0aGlzLmVzKTtcbiAgICAgIEggPSB0aGlzLmUgKiB0aGlzLmNvc19wMTIgKiBNYXRoLmNvcyhBeikgLyBNYXRoLnNxcnQoMSAtIHRoaXMuZXMpO1xuICAgICAgR0ggPSBHICogSDtcbiAgICAgIEhzID0gSCAqIEg7XG4gICAgICBzMiA9IHMgKiBzO1xuICAgICAgczMgPSBzMiAqIHM7XG4gICAgICBzNCA9IHMzICogcztcbiAgICAgIHM1ID0gczQgKiBzO1xuICAgICAgYyA9IE5sMSAqIHMgKiAoMSAtIHMyICogSHMgKiAoMSAtIEhzKSAvIDYgKyBzMyAvIDggKiBHSCAqICgxIC0gMiAqIEhzKSArIHM0IC8gMTIwICogKEhzICogKDQgLSA3ICogSHMpIC0gMyAqIEcgKiBHICogKDEgLSA3ICogSHMpKSAtIHM1IC8gNDggKiBHSCk7XG4gICAgICBwLnggPSB0aGlzLngwICsgYyAqIE1hdGguc2luKEF6KTtcbiAgICAgIHAueSA9IHRoaXMueTAgKyBjICogTWF0aC5jb3MoQXopO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICB9XG5cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHAueCAtPSB0aGlzLngwO1xuICBwLnkgLT0gdGhpcy55MDtcbiAgdmFyIHJoLCB6LCBzaW56LCBjb3N6LCBsb24sIGxhdCwgY29uLCBlMCwgZTEsIGUyLCBlMywgTWxwLCBNLCBOMSwgcHNpLCBBeiwgY29zQXosIHRtcCwgQSwgQiwgRCwgRWUsIEY7XG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIHJoID0gTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSk7XG4gICAgaWYgKHJoID4gKDIgKiBIQUxGX1BJICogdGhpcy5hKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB6ID0gcmggLyB0aGlzLmE7XG5cbiAgICBzaW56ID0gTWF0aC5zaW4oeik7XG4gICAgY29zeiA9IE1hdGguY29zKHopO1xuXG4gICAgbG9uID0gdGhpcy5sb25nMDtcbiAgICBpZiAoTWF0aC5hYnMocmgpIDw9IEVQU0xOKSB7XG4gICAgICBsYXQgPSB0aGlzLmxhdDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGF0ID0gYXNpbnooY29zeiAqIHRoaXMuc2luX3AxMiArIChwLnkgKiBzaW56ICogdGhpcy5jb3NfcDEyKSAvIHJoKTtcbiAgICAgIGNvbiA9IE1hdGguYWJzKHRoaXMubGF0MCkgLSBIQUxGX1BJO1xuICAgICAgaWYgKE1hdGguYWJzKGNvbikgPD0gRVBTTE4pIHtcbiAgICAgICAgaWYgKHRoaXMubGF0MCA+PSAwKSB7XG4gICAgICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMihwLngsIC0gcC55KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwIC0gTWF0aC5hdGFuMigtcC54LCBwLnkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8qY29uID0gY29zeiAtIHRoaXMuc2luX3AxMiAqIE1hdGguc2luKGxhdCk7XG4gICAgICAgIGlmICgoTWF0aC5hYnMoY29uKSA8IEVQU0xOKSAmJiAoTWF0aC5hYnMocC54KSA8IEVQU0xOKSkge1xuICAgICAgICAgIC8vbm8tb3AsIGp1c3Qga2VlcCB0aGUgbG9uIHZhbHVlIGFzIGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHRlbXAgPSBNYXRoLmF0YW4yKChwLnggKiBzaW56ICogdGhpcy5jb3NfcDEyKSwgKGNvbiAqIHJoKSk7XG4gICAgICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMigocC54ICogc2lueiAqIHRoaXMuY29zX3AxMiksIChjb24gKiByaCkpKTtcbiAgICAgICAgfSovXG4gICAgICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIE1hdGguYXRhbjIocC54ICogc2lueiwgcmggKiB0aGlzLmNvc19wMTIgKiBjb3N6IC0gcC55ICogdGhpcy5zaW5fcDEyICogc2lueikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHAueCA9IGxvbjtcbiAgICBwLnkgPSBsYXQ7XG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgZWxzZSB7XG4gICAgZTAgPSBlMGZuKHRoaXMuZXMpO1xuICAgIGUxID0gZTFmbih0aGlzLmVzKTtcbiAgICBlMiA9IGUyZm4odGhpcy5lcyk7XG4gICAgZTMgPSBlM2ZuKHRoaXMuZXMpO1xuICAgIGlmIChNYXRoLmFicyh0aGlzLnNpbl9wMTIgLSAxKSA8PSBFUFNMTikge1xuICAgICAgLy9Ob3J0aCBwb2xlIGNhc2VcbiAgICAgIE1scCA9IHRoaXMuYSAqIG1sZm4oZTAsIGUxLCBlMiwgZTMsIEhBTEZfUEkpO1xuICAgICAgcmggPSBNYXRoLnNxcnQocC54ICogcC54ICsgcC55ICogcC55KTtcbiAgICAgIE0gPSBNbHAgLSByaDtcbiAgICAgIGxhdCA9IGltbGZuKE0gLyB0aGlzLmEsIGUwLCBlMSwgZTIsIGUzKTtcbiAgICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIE1hdGguYXRhbjIocC54LCAtIDEgKiBwLnkpKTtcbiAgICAgIHAueCA9IGxvbjtcbiAgICAgIHAueSA9IGxhdDtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBlbHNlIGlmIChNYXRoLmFicyh0aGlzLnNpbl9wMTIgKyAxKSA8PSBFUFNMTikge1xuICAgICAgLy9Tb3V0aCBwb2xlIGNhc2VcbiAgICAgIE1scCA9IHRoaXMuYSAqIG1sZm4oZTAsIGUxLCBlMiwgZTMsIEhBTEZfUEkpO1xuICAgICAgcmggPSBNYXRoLnNxcnQocC54ICogcC54ICsgcC55ICogcC55KTtcbiAgICAgIE0gPSByaCAtIE1scDtcblxuICAgICAgbGF0ID0gaW1sZm4oTSAvIHRoaXMuYSwgZTAsIGUxLCBlMiwgZTMpO1xuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMihwLngsIHAueSkpO1xuICAgICAgcC54ID0gbG9uO1xuICAgICAgcC55ID0gbGF0O1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy9kZWZhdWx0IGNhc2VcbiAgICAgIHJoID0gTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSk7XG4gICAgICBBeiA9IE1hdGguYXRhbjIocC54LCBwLnkpO1xuICAgICAgTjEgPSBnTih0aGlzLmEsIHRoaXMuZSwgdGhpcy5zaW5fcDEyKTtcbiAgICAgIGNvc0F6ID0gTWF0aC5jb3MoQXopO1xuICAgICAgdG1wID0gdGhpcy5lICogdGhpcy5jb3NfcDEyICogY29zQXo7XG4gICAgICBBID0gLXRtcCAqIHRtcCAvICgxIC0gdGhpcy5lcyk7XG4gICAgICBCID0gMyAqIHRoaXMuZXMgKiAoMSAtIEEpICogdGhpcy5zaW5fcDEyICogdGhpcy5jb3NfcDEyICogY29zQXogLyAoMSAtIHRoaXMuZXMpO1xuICAgICAgRCA9IHJoIC8gTjE7XG4gICAgICBFZSA9IEQgLSBBICogKDEgKyBBKSAqIE1hdGgucG93KEQsIDMpIC8gNiAtIEIgKiAoMSArIDMgKiBBKSAqIE1hdGgucG93KEQsIDQpIC8gMjQ7XG4gICAgICBGID0gMSAtIEEgKiBFZSAqIEVlIC8gMiAtIEQgKiBFZSAqIEVlICogRWUgLyA2O1xuICAgICAgcHNpID0gTWF0aC5hc2luKHRoaXMuc2luX3AxMiAqIE1hdGguY29zKEVlKSArIHRoaXMuY29zX3AxMiAqIE1hdGguc2luKEVlKSAqIGNvc0F6KTtcbiAgICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIE1hdGguYXNpbihNYXRoLnNpbihBeikgKiBNYXRoLnNpbihFZSkgLyBNYXRoLmNvcyhwc2kpKSk7XG4gICAgICBsYXQgPSBNYXRoLmF0YW4oKDEgLSB0aGlzLmVzICogRiAqIHRoaXMuc2luX3AxMiAvIE1hdGguc2luKHBzaSkpICogTWF0aC50YW4ocHNpKSAvICgxIC0gdGhpcy5lcykpO1xuICAgICAgcC54ID0gbG9uO1xuICAgICAgcC55ID0gbGF0O1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICB9XG5cbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIkF6aW11dGhhbF9FcXVpZGlzdGFudFwiLCBcImFlcWRcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9hZXFkLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvYWVxZC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgbWxmbiBmcm9tICcuLi9jb21tb24vbWxmbic7XG5pbXBvcnQgZTBmbiBmcm9tICcuLi9jb21tb24vZTBmbic7XG5pbXBvcnQgZTFmbiBmcm9tICcuLi9jb21tb24vZTFmbic7XG5pbXBvcnQgZTJmbiBmcm9tICcuLi9jb21tb24vZTJmbic7XG5pbXBvcnQgZTNmbiBmcm9tICcuLi9jb21tb24vZTNmbic7XG5pbXBvcnQgZ04gZnJvbSAnLi4vY29tbW9uL2dOJztcbmltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcbmltcG9ydCBhZGp1c3RfbGF0IGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbGF0JztcbmltcG9ydCBpbWxmbiBmcm9tICcuLi9jb21tb24vaW1sZm4nO1xuaW1wb3J0IHtIQUxGX1BJLCBFUFNMTn0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICBpZiAoIXRoaXMuc3BoZXJlKSB7XG4gICAgdGhpcy5lMCA9IGUwZm4odGhpcy5lcyk7XG4gICAgdGhpcy5lMSA9IGUxZm4odGhpcy5lcyk7XG4gICAgdGhpcy5lMiA9IGUyZm4odGhpcy5lcyk7XG4gICAgdGhpcy5lMyA9IGUzZm4odGhpcy5lcyk7XG4gICAgdGhpcy5tbDAgPSB0aGlzLmEgKiBtbGZuKHRoaXMuZTAsIHRoaXMuZTEsIHRoaXMuZTIsIHRoaXMuZTMsIHRoaXMubGF0MCk7XG4gIH1cbn1cblxuLyogQ2Fzc2luaSBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuXG4gIC8qIEZvcndhcmQgZXF1YXRpb25zXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIHZhciB4LCB5O1xuICB2YXIgbGFtID0gcC54O1xuICB2YXIgcGhpID0gcC55O1xuICBsYW0gPSBhZGp1c3RfbG9uKGxhbSAtIHRoaXMubG9uZzApO1xuXG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIHggPSB0aGlzLmEgKiBNYXRoLmFzaW4oTWF0aC5jb3MocGhpKSAqIE1hdGguc2luKGxhbSkpO1xuICAgIHkgPSB0aGlzLmEgKiAoTWF0aC5hdGFuMihNYXRoLnRhbihwaGkpLCBNYXRoLmNvcyhsYW0pKSAtIHRoaXMubGF0MCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy9lbGxpcHNvaWRcbiAgICB2YXIgc2lucGhpID0gTWF0aC5zaW4ocGhpKTtcbiAgICB2YXIgY29zcGhpID0gTWF0aC5jb3MocGhpKTtcbiAgICB2YXIgbmwgPSBnTih0aGlzLmEsIHRoaXMuZSwgc2lucGhpKTtcbiAgICB2YXIgdGwgPSBNYXRoLnRhbihwaGkpICogTWF0aC50YW4ocGhpKTtcbiAgICB2YXIgYWwgPSBsYW0gKiBNYXRoLmNvcyhwaGkpO1xuICAgIHZhciBhc3EgPSBhbCAqIGFsO1xuICAgIHZhciBjbCA9IHRoaXMuZXMgKiBjb3NwaGkgKiBjb3NwaGkgLyAoMSAtIHRoaXMuZXMpO1xuICAgIHZhciBtbCA9IHRoaXMuYSAqIG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgcGhpKTtcblxuICAgIHggPSBubCAqIGFsICogKDEgLSBhc3EgKiB0bCAqICgxIC8gNiAtICg4IC0gdGwgKyA4ICogY2wpICogYXNxIC8gMTIwKSk7XG4gICAgeSA9IG1sIC0gdGhpcy5tbDAgKyBubCAqIHNpbnBoaSAvIGNvc3BoaSAqIGFzcSAqICgwLjUgKyAoNSAtIHRsICsgNiAqIGNsKSAqIGFzcSAvIDI0KTtcblxuXG4gIH1cblxuICBwLnggPSB4ICsgdGhpcy54MDtcbiAgcC55ID0geSArIHRoaXMueTA7XG4gIHJldHVybiBwO1xufVxuXG4vKiBJbnZlcnNlIGVxdWF0aW9uc1xuICAtLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHAueCAtPSB0aGlzLngwO1xuICBwLnkgLT0gdGhpcy55MDtcbiAgdmFyIHggPSBwLnggLyB0aGlzLmE7XG4gIHZhciB5ID0gcC55IC8gdGhpcy5hO1xuICB2YXIgcGhpLCBsYW07XG5cbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgdmFyIGRkID0geSArIHRoaXMubGF0MDtcbiAgICBwaGkgPSBNYXRoLmFzaW4oTWF0aC5zaW4oZGQpICogTWF0aC5jb3MoeCkpO1xuICAgIGxhbSA9IE1hdGguYXRhbjIoTWF0aC50YW4oeCksIE1hdGguY29zKGRkKSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLyogZWxsaXBzb2lkICovXG4gICAgdmFyIG1sMSA9IHRoaXMubWwwIC8gdGhpcy5hICsgeTtcbiAgICB2YXIgcGhpMSA9IGltbGZuKG1sMSwgdGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMyk7XG4gICAgaWYgKE1hdGguYWJzKE1hdGguYWJzKHBoaTEpIC0gSEFMRl9QSSkgPD0gRVBTTE4pIHtcbiAgICAgIHAueCA9IHRoaXMubG9uZzA7XG4gICAgICBwLnkgPSBIQUxGX1BJO1xuICAgICAgaWYgKHkgPCAwKSB7XG4gICAgICAgIHAueSAqPSAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICB2YXIgbmwxID0gZ04odGhpcy5hLCB0aGlzLmUsIE1hdGguc2luKHBoaTEpKTtcblxuICAgIHZhciBybDEgPSBubDEgKiBubDEgKiBubDEgLyB0aGlzLmEgLyB0aGlzLmEgKiAoMSAtIHRoaXMuZXMpO1xuICAgIHZhciB0bDEgPSBNYXRoLnBvdyhNYXRoLnRhbihwaGkxKSwgMik7XG4gICAgdmFyIGRsID0geCAqIHRoaXMuYSAvIG5sMTtcbiAgICB2YXIgZHNxID0gZGwgKiBkbDtcbiAgICBwaGkgPSBwaGkxIC0gbmwxICogTWF0aC50YW4ocGhpMSkgLyBybDEgKiBkbCAqIGRsICogKDAuNSAtICgxICsgMyAqIHRsMSkgKiBkbCAqIGRsIC8gMjQpO1xuICAgIGxhbSA9IGRsICogKDEgLSBkc3EgKiAodGwxIC8gMyArICgxICsgMyAqIHRsMSkgKiB0bDEgKiBkc3EgLyAxNSkpIC8gTWF0aC5jb3MocGhpMSk7XG5cbiAgfVxuXG4gIHAueCA9IGFkanVzdF9sb24obGFtICsgdGhpcy5sb25nMCk7XG4gIHAueSA9IGFkanVzdF9sYXQocGhpKTtcbiAgcmV0dXJuIHA7XG5cbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIkNhc3NpbmlcIiwgXCJDYXNzaW5pX1NvbGRuZXJcIiwgXCJjYXNzXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvY2Fzcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2Nhc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuaW1wb3J0IHFzZm56IGZyb20gJy4uL2NvbW1vbi9xc2Zueic7XG5pbXBvcnQgbXNmbnogZnJvbSAnLi4vY29tbW9uL21zZm56JztcbmltcG9ydCBpcXNmbnogZnJvbSAnLi4vY29tbW9uL2lxc2Zueic7XG5cbi8qXG4gIHJlZmVyZW5jZTpcbiAgICBcIkNhcnRvZ3JhcGhpYyBQcm9qZWN0aW9uIFByb2NlZHVyZXMgZm9yIHRoZSBVTklYIEVudmlyb25tZW50LVxuICAgIEEgVXNlcidzIE1hbnVhbFwiIGJ5IEdlcmFsZCBJLiBFdmVuZGVuLFxuICAgIFVTR1MgT3BlbiBGaWxlIFJlcG9ydCA5MC0yODRhbmQgUmVsZWFzZSA0IEludGVyaW0gUmVwb3J0cyAoMjAwMylcbiovXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgLy9uby1vcFxuICBpZiAoIXRoaXMuc3BoZXJlKSB7XG4gICAgdGhpcy5rMCA9IG1zZm56KHRoaXMuZSwgTWF0aC5zaW4odGhpcy5sYXRfdHMpLCBNYXRoLmNvcyh0aGlzLmxhdF90cykpO1xuICB9XG59XG5cbi8qIEN5bGluZHJpY2FsIEVxdWFsIEFyZWEgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKHApIHtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcbiAgdmFyIHgsIHk7XG4gIC8qIEZvcndhcmQgZXF1YXRpb25zXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIHZhciBkbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgeCA9IHRoaXMueDAgKyB0aGlzLmEgKiBkbG9uICogTWF0aC5jb3ModGhpcy5sYXRfdHMpO1xuICAgIHkgPSB0aGlzLnkwICsgdGhpcy5hICogTWF0aC5zaW4obGF0KSAvIE1hdGguY29zKHRoaXMubGF0X3RzKTtcbiAgfVxuICBlbHNlIHtcbiAgICB2YXIgcXMgPSBxc2Zueih0aGlzLmUsIE1hdGguc2luKGxhdCkpO1xuICAgIHggPSB0aGlzLngwICsgdGhpcy5hICogdGhpcy5rMCAqIGRsb247XG4gICAgeSA9IHRoaXMueTAgKyB0aGlzLmEgKiBxcyAqIDAuNSAvIHRoaXMuazA7XG4gIH1cblxuICBwLnggPSB4O1xuICBwLnkgPSB5O1xuICByZXR1cm4gcDtcbn1cblxuLyogQ3lsaW5kcmljYWwgRXF1YWwgQXJlYSBpbnZlcnNlIGVxdWF0aW9ucy0tbWFwcGluZyB4LHkgdG8gbGF0L2xvbmdcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuICBwLnggLT0gdGhpcy54MDtcbiAgcC55IC09IHRoaXMueTA7XG4gIHZhciBsb24sIGxhdDtcblxuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyAocC54IC8gdGhpcy5hKSAvIE1hdGguY29zKHRoaXMubGF0X3RzKSk7XG4gICAgbGF0ID0gTWF0aC5hc2luKChwLnkgLyB0aGlzLmEpICogTWF0aC5jb3ModGhpcy5sYXRfdHMpKTtcbiAgfVxuICBlbHNlIHtcbiAgICBsYXQgPSBpcXNmbnoodGhpcy5lLCAyICogcC55ICogdGhpcy5rMCAvIHRoaXMuYSk7XG4gICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgcC54IC8gKHRoaXMuYSAqIHRoaXMuazApKTtcbiAgfVxuXG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcImNlYVwiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2NlYS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2NlYS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYWRqdXN0X2xvbiBmcm9tICcuLi9jb21tb24vYWRqdXN0X2xvbic7XG5pbXBvcnQgYWRqdXN0X2xhdCBmcm9tICcuLi9jb21tb24vYWRqdXN0X2xhdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuXG4gIHRoaXMueDAgPSB0aGlzLngwIHx8IDA7XG4gIHRoaXMueTAgPSB0aGlzLnkwIHx8IDA7XG4gIHRoaXMubGF0MCA9IHRoaXMubGF0MCB8fCAwO1xuICB0aGlzLmxvbmcwID0gdGhpcy5sb25nMCB8fCAwO1xuICB0aGlzLmxhdF90cyA9IHRoaXMubGF0X3RzIHx8IDA7XG4gIHRoaXMudGl0bGUgPSB0aGlzLnRpdGxlIHx8IFwiRXF1aWRpc3RhbnQgQ3lsaW5kcmljYWwgKFBsYXRlIENhcnJlKVwiO1xuXG4gIHRoaXMucmMgPSBNYXRoLmNvcyh0aGlzLmxhdF90cyk7XG59XG5cbi8vIGZvcndhcmQgZXF1YXRpb25zLS1tYXBwaW5nIGxhdCxsb25nIHRvIHgseVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKHApIHtcblxuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuXG4gIHZhciBkbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgdmFyIGRsYXQgPSBhZGp1c3RfbGF0KGxhdCAtIHRoaXMubGF0MCk7XG4gIHAueCA9IHRoaXMueDAgKyAodGhpcy5hICogZGxvbiAqIHRoaXMucmMpO1xuICBwLnkgPSB0aGlzLnkwICsgKHRoaXMuYSAqIGRsYXQpO1xuICByZXR1cm4gcDtcbn1cblxuLy8gaW52ZXJzZSBlcXVhdGlvbnMtLW1hcHBpbmcgeCx5IHRvIGxhdC9sb25nXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuXG4gIHZhciB4ID0gcC54O1xuICB2YXIgeSA9IHAueTtcblxuICBwLnggPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyAoKHggLSB0aGlzLngwKSAvICh0aGlzLmEgKiB0aGlzLnJjKSkpO1xuICBwLnkgPSBhZGp1c3RfbGF0KHRoaXMubGF0MCArICgoeSAtIHRoaXMueTApIC8gKHRoaXMuYSkpKTtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJFcXVpcmVjdGFuZ3VsYXJcIiwgXCJFcXVpZGlzdGFudF9DeWxpbmRyaWNhbFwiLCBcImVxY1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2VxYy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2VxYy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZTBmbiBmcm9tICcuLi9jb21tb24vZTBmbic7XG5pbXBvcnQgZTFmbiBmcm9tICcuLi9jb21tb24vZTFmbic7XG5pbXBvcnQgZTJmbiBmcm9tICcuLi9jb21tb24vZTJmbic7XG5pbXBvcnQgZTNmbiBmcm9tICcuLi9jb21tb24vZTNmbic7XG5pbXBvcnQgbXNmbnogZnJvbSAnLi4vY29tbW9uL21zZm56JztcbmltcG9ydCBtbGZuIGZyb20gJy4uL2NvbW1vbi9tbGZuJztcbmltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcbmltcG9ydCBhZGp1c3RfbGF0IGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbGF0JztcbmltcG9ydCBpbWxmbiBmcm9tICcuLi9jb21tb24vaW1sZm4nO1xuaW1wb3J0IHtFUFNMTn0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuXG4gIC8qIFBsYWNlIHBhcmFtZXRlcnMgaW4gc3RhdGljIHN0b3JhZ2UgZm9yIGNvbW1vbiB1c2VcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAvLyBTdGFuZGFyZCBQYXJhbGxlbHMgY2Fubm90IGJlIGVxdWFsIGFuZCBvbiBvcHBvc2l0ZSBzaWRlcyBvZiB0aGUgZXF1YXRvclxuICBpZiAoTWF0aC5hYnModGhpcy5sYXQxICsgdGhpcy5sYXQyKSA8IEVQU0xOKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMubGF0MiA9IHRoaXMubGF0MiB8fCB0aGlzLmxhdDE7XG4gIHRoaXMudGVtcCA9IHRoaXMuYiAvIHRoaXMuYTtcbiAgdGhpcy5lcyA9IDEgLSBNYXRoLnBvdyh0aGlzLnRlbXAsIDIpO1xuICB0aGlzLmUgPSBNYXRoLnNxcnQodGhpcy5lcyk7XG4gIHRoaXMuZTAgPSBlMGZuKHRoaXMuZXMpO1xuICB0aGlzLmUxID0gZTFmbih0aGlzLmVzKTtcbiAgdGhpcy5lMiA9IGUyZm4odGhpcy5lcyk7XG4gIHRoaXMuZTMgPSBlM2ZuKHRoaXMuZXMpO1xuXG4gIHRoaXMuc2lucGhpID0gTWF0aC5zaW4odGhpcy5sYXQxKTtcbiAgdGhpcy5jb3NwaGkgPSBNYXRoLmNvcyh0aGlzLmxhdDEpO1xuXG4gIHRoaXMubXMxID0gbXNmbnoodGhpcy5lLCB0aGlzLnNpbnBoaSwgdGhpcy5jb3NwaGkpO1xuICB0aGlzLm1sMSA9IG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgdGhpcy5sYXQxKTtcblxuICBpZiAoTWF0aC5hYnModGhpcy5sYXQxIC0gdGhpcy5sYXQyKSA8IEVQU0xOKSB7XG4gICAgdGhpcy5ucyA9IHRoaXMuc2lucGhpO1xuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMuc2lucGhpID0gTWF0aC5zaW4odGhpcy5sYXQyKTtcbiAgICB0aGlzLmNvc3BoaSA9IE1hdGguY29zKHRoaXMubGF0Mik7XG4gICAgdGhpcy5tczIgPSBtc2Zueih0aGlzLmUsIHRoaXMuc2lucGhpLCB0aGlzLmNvc3BoaSk7XG4gICAgdGhpcy5tbDIgPSBtbGZuKHRoaXMuZTAsIHRoaXMuZTEsIHRoaXMuZTIsIHRoaXMuZTMsIHRoaXMubGF0Mik7XG4gICAgdGhpcy5ucyA9ICh0aGlzLm1zMSAtIHRoaXMubXMyKSAvICh0aGlzLm1sMiAtIHRoaXMubWwxKTtcbiAgfVxuICB0aGlzLmcgPSB0aGlzLm1sMSArIHRoaXMubXMxIC8gdGhpcy5ucztcbiAgdGhpcy5tbDAgPSBtbGZuKHRoaXMuZTAsIHRoaXMuZTEsIHRoaXMuZTIsIHRoaXMuZTMsIHRoaXMubGF0MCk7XG4gIHRoaXMucmggPSB0aGlzLmEgKiAodGhpcy5nIC0gdGhpcy5tbDApO1xufVxuXG4vKiBFcXVpZGlzdGFudCBDb25pYyBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuICB2YXIgcmgxO1xuXG4gIC8qIEZvcndhcmQgZXF1YXRpb25zXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIHJoMSA9IHRoaXMuYSAqICh0aGlzLmcgLSBsYXQpO1xuICB9XG4gIGVsc2Uge1xuICAgIHZhciBtbCA9IG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgbGF0KTtcbiAgICByaDEgPSB0aGlzLmEgKiAodGhpcy5nIC0gbWwpO1xuICB9XG4gIHZhciB0aGV0YSA9IHRoaXMubnMgKiBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICB2YXIgeCA9IHRoaXMueDAgKyByaDEgKiBNYXRoLnNpbih0aGV0YSk7XG4gIHZhciB5ID0gdGhpcy55MCArIHRoaXMucmggLSByaDEgKiBNYXRoLmNvcyh0aGV0YSk7XG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG4gIHJldHVybiBwO1xufVxuXG4vKiBJbnZlcnNlIGVxdWF0aW9uc1xuICAtLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHAueCAtPSB0aGlzLngwO1xuICBwLnkgPSB0aGlzLnJoIC0gcC55ICsgdGhpcy55MDtcbiAgdmFyIGNvbiwgcmgxLCBsYXQsIGxvbjtcbiAgaWYgKHRoaXMubnMgPj0gMCkge1xuICAgIHJoMSA9IE1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpO1xuICAgIGNvbiA9IDE7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmgxID0gLU1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpO1xuICAgIGNvbiA9IC0xO1xuICB9XG4gIHZhciB0aGV0YSA9IDA7XG4gIGlmIChyaDEgIT09IDApIHtcbiAgICB0aGV0YSA9IE1hdGguYXRhbjIoY29uICogcC54LCBjb24gKiBwLnkpO1xuICB9XG5cbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgdGhldGEgLyB0aGlzLm5zKTtcbiAgICBsYXQgPSBhZGp1c3RfbGF0KHRoaXMuZyAtIHJoMSAvIHRoaXMuYSk7XG4gICAgcC54ID0gbG9uO1xuICAgIHAueSA9IGxhdDtcbiAgICByZXR1cm4gcDtcbiAgfVxuICBlbHNlIHtcbiAgICB2YXIgbWwgPSB0aGlzLmcgLSByaDEgLyB0aGlzLmE7XG4gICAgbGF0ID0gaW1sZm4obWwsIHRoaXMuZTAsIHRoaXMuZTEsIHRoaXMuZTIsIHRoaXMuZTMpO1xuICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIHRoZXRhIC8gdGhpcy5ucyk7XG4gICAgcC54ID0gbG9uO1xuICAgIHAueSA9IGxhdDtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJFcXVpZGlzdGFudF9Db25pY1wiLCBcImVxZGNcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9lcWRjLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvZXFkYy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBIZWF2aWx5IGJhc2VkIG9uIHRoaXMgZXRtZXJjIHByb2plY3Rpb24gaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYmxvY2gvbWFwc2hhcGVyLXByb2ovYmxvYi9tYXN0ZXIvc3JjL3Byb2plY3Rpb25zL2V0bWVyYy5qc1xuXG5pbXBvcnQgc2luaCBmcm9tICcuLi9jb21tb24vc2luaCc7XG5pbXBvcnQgaHlwb3QgZnJvbSAnLi4vY29tbW9uL2h5cG90JztcbmltcG9ydCBhc2luaHkgZnJvbSAnLi4vY29tbW9uL2FzaW5oeSc7XG5pbXBvcnQgZ2F0ZyBmcm9tICcuLi9jb21tb24vZ2F0Zyc7XG5pbXBvcnQgY2xlbnMgZnJvbSAnLi4vY29tbW9uL2NsZW5zJztcbmltcG9ydCBjbGVuc19jbXBseCBmcm9tICcuLi9jb21tb24vY2xlbnNfY21wbHgnO1xuaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgaWYgKHRoaXMuZXMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmVzIDw9IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2luY29ycmVjdCBlbGxpcHRpY2FsIHVzYWdlJyk7XG4gIH1cblxuICB0aGlzLngwID0gdGhpcy54MCAhPT0gdW5kZWZpbmVkID8gdGhpcy54MCA6IDA7XG4gIHRoaXMueTAgPSB0aGlzLnkwICE9PSB1bmRlZmluZWQgPyB0aGlzLnkwIDogMDtcbiAgdGhpcy5sb25nMCA9IHRoaXMubG9uZzAgIT09IHVuZGVmaW5lZCA/IHRoaXMubG9uZzAgOiAwO1xuICB0aGlzLmxhdDAgPSB0aGlzLmxhdDAgIT09IHVuZGVmaW5lZCA/IHRoaXMubGF0MCA6IDA7XG5cbiAgdGhpcy5jZ2IgPSBbXTtcbiAgdGhpcy5jYmcgPSBbXTtcbiAgdGhpcy51dGcgPSBbXTtcbiAgdGhpcy5ndHUgPSBbXTtcblxuICB2YXIgZiA9IHRoaXMuZXMgLyAoMSArIE1hdGguc3FydCgxIC0gdGhpcy5lcykpO1xuICB2YXIgbiA9IGYgLyAoMiAtIGYpO1xuICB2YXIgbnAgPSBuO1xuXG4gIHRoaXMuY2diWzBdID0gbiAqICgyICsgbiAqICgtMiAvIDMgKyBuICogKC0yICsgbiAqICgxMTYgLyA0NSArIG4gKiAoMjYgLyA0NSArIG4gKiAoLTI4NTQgLyA2NzUgKSkpKSkpO1xuICB0aGlzLmNiZ1swXSA9IG4gKiAoLTIgKyBuICogKCAyIC8gMyArIG4gKiAoIDQgLyAzICsgbiAqICgtODIgLyA0NSArIG4gKiAoMzIgLyA0NSArIG4gKiAoNDY0MiAvIDQ3MjUpKSkpKSk7XG5cbiAgbnAgPSBucCAqIG47XG4gIHRoaXMuY2diWzFdID0gbnAgKiAoNyAvIDMgKyBuICogKC04IC8gNSArIG4gKiAoLTIyNyAvIDQ1ICsgbiAqICgyNzA0IC8gMzE1ICsgbiAqICgyMzIzIC8gOTQ1KSkpKSk7XG4gIHRoaXMuY2JnWzFdID0gbnAgKiAoNSAvIDMgKyBuICogKC0xNiAvIDE1ICsgbiAqICggLTEzIC8gOSArIG4gKiAoOTA0IC8gMzE1ICsgbiAqICgtMTUyMiAvIDk0NSkpKSkpO1xuXG4gIG5wID0gbnAgKiBuO1xuICB0aGlzLmNnYlsyXSA9IG5wICogKDU2IC8gMTUgKyBuICogKC0xMzYgLyAzNSArIG4gKiAoLTEyNjIgLyAxMDUgKyBuICogKDczODE0IC8gMjgzNSkpKSk7XG4gIHRoaXMuY2JnWzJdID0gbnAgKiAoLTI2IC8gMTUgKyBuICogKDM0IC8gMjEgKyBuICogKDggLyA1ICsgbiAqICgtMTI2ODYgLyAyODM1KSkpKTtcblxuICBucCA9IG5wICogbjtcbiAgdGhpcy5jZ2JbM10gPSBucCAqICg0Mjc5IC8gNjMwICsgbiAqICgtMzMyIC8gMzUgKyBuICogKC0zOTk1NzIgLyAxNDE3NSkpKTtcbiAgdGhpcy5jYmdbM10gPSBucCAqICgxMjM3IC8gNjMwICsgbiAqICgtMTIgLyA1ICsgbiAqICggLTI0ODMyIC8gMTQxNzUpKSk7XG5cbiAgbnAgPSBucCAqIG47XG4gIHRoaXMuY2diWzRdID0gbnAgKiAoNDE3NCAvIDMxNSArIG4gKiAoLTE0NDgzOCAvIDYyMzcpKTtcbiAgdGhpcy5jYmdbNF0gPSBucCAqICgtNzM0IC8gMzE1ICsgbiAqICgxMDk1OTggLyAzMTE4NSkpO1xuXG4gIG5wID0gbnAgKiBuO1xuICB0aGlzLmNnYls1XSA9IG5wICogKDYwMTY3NiAvIDIyMjc1KTtcbiAgdGhpcy5jYmdbNV0gPSBucCAqICg0NDQzMzcgLyAxNTU5MjUpO1xuXG4gIG5wID0gTWF0aC5wb3cobiwgMik7XG4gIHRoaXMuUW4gPSB0aGlzLmswIC8gKDEgKyBuKSAqICgxICsgbnAgKiAoMSAvIDQgKyBucCAqICgxIC8gNjQgKyBucCAvIDI1NikpKTtcblxuICB0aGlzLnV0Z1swXSA9IG4gKiAoLTAuNSArIG4gKiAoIDIgLyAzICsgbiAqICgtMzcgLyA5NiArIG4gKiAoIDEgLyAzNjAgKyBuICogKDgxIC8gNTEyICsgbiAqICgtOTYxOTkgLyA2MDQ4MDApKSkpKSk7XG4gIHRoaXMuZ3R1WzBdID0gbiAqICgwLjUgKyBuICogKC0yIC8gMyArIG4gKiAoNSAvIDE2ICsgbiAqICg0MSAvIDE4MCArIG4gKiAoLTEyNyAvIDI4OCArIG4gKiAoNzg5MSAvIDM3ODAwKSkpKSkpO1xuXG4gIHRoaXMudXRnWzFdID0gbnAgKiAoLTEgLyA0OCArIG4gKiAoLTEgLyAxNSArIG4gKiAoNDM3IC8gMTQ0MCArIG4gKiAoLTQ2IC8gMTA1ICsgbiAqICgxMTE4NzExIC8gMzg3MDcyMCkpKSkpO1xuICB0aGlzLmd0dVsxXSA9IG5wICogKDEzIC8gNDggKyBuICogKC0zIC8gNSArIG4gKiAoNTU3IC8gMTQ0MCArIG4gKiAoMjgxIC8gNjMwICsgbiAqICgtMTk4MzQzMyAvIDE5MzUzNjApKSkpKTtcblxuICBucCA9IG5wICogbjtcbiAgdGhpcy51dGdbMl0gPSBucCAqICgtMTcgLyA0ODAgKyBuICogKDM3IC8gODQwICsgbiAqICgyMDkgLyA0NDgwICsgbiAqICgtNTU2OSAvIDkwNzIwICkpKSk7XG4gIHRoaXMuZ3R1WzJdID0gbnAgKiAoNjEgLyAyNDAgKyBuICogKC0xMDMgLyAxNDAgKyBuICogKDE1MDYxIC8gMjY4ODAgKyBuICogKDE2NzYwMyAvIDE4MTQ0MCkpKSk7XG5cbiAgbnAgPSBucCAqIG47XG4gIHRoaXMudXRnWzNdID0gbnAgKiAoLTQzOTcgLyAxNjEyODAgKyBuICogKDExIC8gNTA0ICsgbiAqICg4MzAyNTEgLyA3MjU3NjAwKSkpO1xuICB0aGlzLmd0dVszXSA9IG5wICogKDQ5NTYxIC8gMTYxMjgwICsgbiAqICgtMTc5IC8gMTY4ICsgbiAqICg2NjAxNjYxIC8gNzI1NzYwMCkpKTtcblxuICBucCA9IG5wICogbjtcbiAgdGhpcy51dGdbNF0gPSBucCAqICgtNDU4MyAvIDE2MTI4MCArIG4gKiAoMTA4ODQ3IC8gMzk5MTY4MCkpO1xuICB0aGlzLmd0dVs0XSA9IG5wICogKDM0NzI5IC8gODA2NDAgKyBuICogKC0zNDE4ODg5IC8gMTk5NTg0MCkpO1xuXG4gIG5wID0gbnAgKiBuO1xuICB0aGlzLnV0Z1s1XSA9IG5wICogKC0yMDY0ODY5MyAvIDYzODY2ODgwMCk7XG4gIHRoaXMuZ3R1WzVdID0gbnAgKiAoMjEyMzc4OTQxIC8gMzE5MzM0NDAwKTtcblxuICB2YXIgWiA9IGdhdGcodGhpcy5jYmcsIHRoaXMubGF0MCk7XG4gIHRoaXMuWmIgPSAtdGhpcy5RbiAqIChaICsgY2xlbnModGhpcy5ndHUsIDIgKiBaKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKHApIHtcbiAgdmFyIENlID0gYWRqdXN0X2xvbihwLnggLSB0aGlzLmxvbmcwKTtcbiAgdmFyIENuID0gcC55O1xuXG4gIENuID0gZ2F0Zyh0aGlzLmNiZywgQ24pO1xuICB2YXIgc2luX0NuID0gTWF0aC5zaW4oQ24pO1xuICB2YXIgY29zX0NuID0gTWF0aC5jb3MoQ24pO1xuICB2YXIgc2luX0NlID0gTWF0aC5zaW4oQ2UpO1xuICB2YXIgY29zX0NlID0gTWF0aC5jb3MoQ2UpO1xuXG4gIENuID0gTWF0aC5hdGFuMihzaW5fQ24sIGNvc19DZSAqIGNvc19Dbik7XG4gIENlID0gTWF0aC5hdGFuMihzaW5fQ2UgKiBjb3NfQ24sIGh5cG90KHNpbl9DbiwgY29zX0NuICogY29zX0NlKSk7XG4gIENlID0gYXNpbmh5KE1hdGgudGFuKENlKSk7XG5cbiAgdmFyIHRtcCA9IGNsZW5zX2NtcGx4KHRoaXMuZ3R1LCAyICogQ24sIDIgKiBDZSk7XG5cbiAgQ24gPSBDbiArIHRtcFswXTtcbiAgQ2UgPSBDZSArIHRtcFsxXTtcblxuICB2YXIgeDtcbiAgdmFyIHk7XG5cbiAgaWYgKE1hdGguYWJzKENlKSA8PSAyLjYyMzM5NTE2Mjc3OCkge1xuICAgIHggPSB0aGlzLmEgKiAodGhpcy5RbiAqIENlKSArIHRoaXMueDA7XG4gICAgeSA9IHRoaXMuYSAqICh0aGlzLlFuICogQ24gKyB0aGlzLlpiKSArIHRoaXMueTA7XG4gIH1cbiAgZWxzZSB7XG4gICAgeCA9IEluZmluaXR5O1xuICAgIHkgPSBJbmZpbml0eTtcbiAgfVxuXG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG5cbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgdmFyIENlID0gKHAueCAtIHRoaXMueDApICogKDEgLyB0aGlzLmEpO1xuICB2YXIgQ24gPSAocC55IC0gdGhpcy55MCkgKiAoMSAvIHRoaXMuYSk7XG5cbiAgQ24gPSAoQ24gLSB0aGlzLlpiKSAvIHRoaXMuUW47XG4gIENlID0gQ2UgLyB0aGlzLlFuO1xuXG4gIHZhciBsb247XG4gIHZhciBsYXQ7XG5cbiAgaWYgKE1hdGguYWJzKENlKSA8PSAyLjYyMzM5NTE2Mjc3OCkge1xuICAgIHZhciB0bXAgPSBjbGVuc19jbXBseCh0aGlzLnV0ZywgMiAqIENuLCAyICogQ2UpO1xuXG4gICAgQ24gPSBDbiArIHRtcFswXTtcbiAgICBDZSA9IENlICsgdG1wWzFdO1xuICAgIENlID0gTWF0aC5hdGFuKHNpbmgoQ2UpKTtcblxuICAgIHZhciBzaW5fQ24gPSBNYXRoLnNpbihDbik7XG4gICAgdmFyIGNvc19DbiA9IE1hdGguY29zKENuKTtcbiAgICB2YXIgc2luX0NlID0gTWF0aC5zaW4oQ2UpO1xuICAgIHZhciBjb3NfQ2UgPSBNYXRoLmNvcyhDZSk7XG5cbiAgICBDbiA9IE1hdGguYXRhbjIoc2luX0NuICogY29zX0NlLCBoeXBvdChzaW5fQ2UsIGNvc19DZSAqIGNvc19DbikpO1xuICAgIENlID0gTWF0aC5hdGFuMihzaW5fQ2UsIGNvc19DZSAqIGNvc19Dbik7XG5cbiAgICBsb24gPSBhZGp1c3RfbG9uKENlICsgdGhpcy5sb25nMCk7XG4gICAgbGF0ID0gZ2F0Zyh0aGlzLmNnYiwgQ24pO1xuICB9XG4gIGVsc2Uge1xuICAgIGxvbiA9IEluZmluaXR5O1xuICAgIGxhdCA9IEluZmluaXR5O1xuICB9XG5cbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG5cbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJFeHRlbmRlZF9UcmFuc3ZlcnNlX01lcmNhdG9yXCIsIFwiRXh0ZW5kZWQgVHJhbnN2ZXJzZSBNZXJjYXRvclwiLCBcImV0bWVyY1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2V0bWVyYy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2V0bWVyYy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgc3JhdCBmcm9tICcuLi9jb21tb24vc3JhdCc7XG52YXIgTUFYX0lURVIgPSAyMDtcbmltcG9ydCB7SEFMRl9QSSwgRk9SVFBJfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIHZhciBzcGhpID0gTWF0aC5zaW4odGhpcy5sYXQwKTtcbiAgdmFyIGNwaGkgPSBNYXRoLmNvcyh0aGlzLmxhdDApO1xuICBjcGhpICo9IGNwaGk7XG4gIHRoaXMucmMgPSBNYXRoLnNxcnQoMSAtIHRoaXMuZXMpIC8gKDEgLSB0aGlzLmVzICogc3BoaSAqIHNwaGkpO1xuICB0aGlzLkMgPSBNYXRoLnNxcnQoMSArIHRoaXMuZXMgKiBjcGhpICogY3BoaSAvICgxIC0gdGhpcy5lcykpO1xuICB0aGlzLnBoaWMwID0gTWF0aC5hc2luKHNwaGkgLyB0aGlzLkMpO1xuICB0aGlzLnJhdGV4cCA9IDAuNSAqIHRoaXMuQyAqIHRoaXMuZTtcbiAgdGhpcy5LID0gTWF0aC50YW4oMC41ICogdGhpcy5waGljMCArIEZPUlRQSSkgLyAoTWF0aC5wb3coTWF0aC50YW4oMC41ICogdGhpcy5sYXQwICsgRk9SVFBJKSwgdGhpcy5DKSAqIHNyYXQodGhpcy5lICogc3BoaSwgdGhpcy5yYXRleHApKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuXG4gIHAueSA9IDIgKiBNYXRoLmF0YW4odGhpcy5LICogTWF0aC5wb3coTWF0aC50YW4oMC41ICogbGF0ICsgRk9SVFBJKSwgdGhpcy5DKSAqIHNyYXQodGhpcy5lICogTWF0aC5zaW4obGF0KSwgdGhpcy5yYXRleHApKSAtIEhBTEZfUEk7XG4gIHAueCA9IHRoaXMuQyAqIGxvbjtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgdmFyIERFTF9UT0wgPSAxZS0xNDtcbiAgdmFyIGxvbiA9IHAueCAvIHRoaXMuQztcbiAgdmFyIGxhdCA9IHAueTtcbiAgdmFyIG51bSA9IE1hdGgucG93KE1hdGgudGFuKDAuNSAqIGxhdCArIEZPUlRQSSkgLyB0aGlzLkssIDEgLyB0aGlzLkMpO1xuICBmb3IgKHZhciBpID0gTUFYX0lURVI7IGkgPiAwOyAtLWkpIHtcbiAgICBsYXQgPSAyICogTWF0aC5hdGFuKG51bSAqIHNyYXQodGhpcy5lICogTWF0aC5zaW4ocC55KSwgLSAwLjUgKiB0aGlzLmUpKSAtIEhBTEZfUEk7XG4gICAgaWYgKE1hdGguYWJzKGxhdCAtIHAueSkgPCBERUxfVE9MKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgcC55ID0gbGF0O1xuICB9XG4gIC8qIGNvbnZlcmdlbmNlIGZhaWxlZCAqL1xuICBpZiAoIWkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJnYXVzc1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2dhdXNzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvZ2F1c3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuaW1wb3J0IGFzaW56IGZyb20gJy4uL2NvbW1vbi9hc2lueic7XG5pbXBvcnQge0VQU0xOfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuLypcbiAgcmVmZXJlbmNlOlxuICAgIFdvbGZyYW0gTWF0aHdvcmxkIFwiR25vbW9uaWMgUHJvamVjdGlvblwiXG4gICAgaHR0cDovL21hdGh3b3JsZC53b2xmcmFtLmNvbS9Hbm9tb25pY1Byb2plY3Rpb24uaHRtbFxuICAgIEFjY2Vzc2VkOiAxMnRoIE5vdmVtYmVyIDIwMDlcbiAgKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuXG4gIC8qIFBsYWNlIHBhcmFtZXRlcnMgaW4gc3RhdGljIHN0b3JhZ2UgZm9yIGNvbW1vbiB1c2VcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICB0aGlzLnNpbl9wMTQgPSBNYXRoLnNpbih0aGlzLmxhdDApO1xuICB0aGlzLmNvc19wMTQgPSBNYXRoLmNvcyh0aGlzLmxhdDApO1xuICAvLyBBcHByb3hpbWF0aW9uIGZvciBwcm9qZWN0aW5nIHBvaW50cyB0byB0aGUgaG9yaXpvbiAoaW5maW5pdHkpXG4gIHRoaXMuaW5maW5pdHlfZGlzdCA9IDEwMDAgKiB0aGlzLmE7XG4gIHRoaXMucmMgPSAxO1xufVxuXG4vKiBHbm9tb25pYyBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgc2lucGhpLCBjb3NwaGk7IC8qIHNpbiBhbmQgY29zIHZhbHVlICAgICAgICAqL1xuICB2YXIgZGxvbjsgLyogZGVsdGEgbG9uZ2l0dWRlIHZhbHVlICAgICAgKi9cbiAgdmFyIGNvc2xvbjsgLyogY29zIG9mIGxvbmdpdHVkZSAgICAgICAgKi9cbiAgdmFyIGtzcDsgLyogc2NhbGUgZmFjdG9yICAgICAgICAgICovXG4gIHZhciBnO1xuICB2YXIgeCwgeTtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcbiAgLyogRm9yd2FyZCBlcXVhdGlvbnNcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgZGxvbiA9IGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG5cbiAgc2lucGhpID0gTWF0aC5zaW4obGF0KTtcbiAgY29zcGhpID0gTWF0aC5jb3MobGF0KTtcblxuICBjb3Nsb24gPSBNYXRoLmNvcyhkbG9uKTtcbiAgZyA9IHRoaXMuc2luX3AxNCAqIHNpbnBoaSArIHRoaXMuY29zX3AxNCAqIGNvc3BoaSAqIGNvc2xvbjtcbiAga3NwID0gMTtcbiAgaWYgKChnID4gMCkgfHwgKE1hdGguYWJzKGcpIDw9IEVQU0xOKSkge1xuICAgIHggPSB0aGlzLngwICsgdGhpcy5hICoga3NwICogY29zcGhpICogTWF0aC5zaW4oZGxvbikgLyBnO1xuICAgIHkgPSB0aGlzLnkwICsgdGhpcy5hICoga3NwICogKHRoaXMuY29zX3AxNCAqIHNpbnBoaSAtIHRoaXMuc2luX3AxNCAqIGNvc3BoaSAqIGNvc2xvbikgLyBnO1xuICB9XG4gIGVsc2Uge1xuXG4gICAgLy8gUG9pbnQgaXMgaW4gdGhlIG9wcG9zaW5nIGhlbWlzcGhlcmUgYW5kIGlzIHVucHJvamVjdGFibGVcbiAgICAvLyBXZSBzdGlsbCBuZWVkIHRvIHJldHVybiBhIHJlYXNvbmFibGUgcG9pbnQsIHNvIHdlIHByb2plY3RcbiAgICAvLyB0byBpbmZpbml0eSwgb24gYSBiZWFyaW5nXG4gICAgLy8gZXF1aXZhbGVudCB0byB0aGUgbm9ydGhlcm4gaGVtaXNwaGVyZSBlcXVpdmFsZW50XG4gICAgLy8gVGhpcyBpcyBhIHJlYXNvbmFibGUgYXBwcm94aW1hdGlvbiBmb3Igc2hvcnQgc2hhcGVzIGFuZCBsaW5lcyB0aGF0XG4gICAgLy8gc3RyYWRkbGUgdGhlIGhvcml6b24uXG5cbiAgICB4ID0gdGhpcy54MCArIHRoaXMuaW5maW5pdHlfZGlzdCAqIGNvc3BoaSAqIE1hdGguc2luKGRsb24pO1xuICAgIHkgPSB0aGlzLnkwICsgdGhpcy5pbmZpbml0eV9kaXN0ICogKHRoaXMuY29zX3AxNCAqIHNpbnBoaSAtIHRoaXMuc2luX3AxNCAqIGNvc3BoaSAqIGNvc2xvbik7XG5cbiAgfVxuICBwLnggPSB4O1xuICBwLnkgPSB5O1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuICB2YXIgcmg7IC8qIFJobyAqL1xuICB2YXIgc2luYywgY29zYztcbiAgdmFyIGM7XG4gIHZhciBsb24sIGxhdDtcblxuICAvKiBJbnZlcnNlIGVxdWF0aW9uc1xuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBwLnggPSAocC54IC0gdGhpcy54MCkgLyB0aGlzLmE7XG4gIHAueSA9IChwLnkgLSB0aGlzLnkwKSAvIHRoaXMuYTtcblxuICBwLnggLz0gdGhpcy5rMDtcbiAgcC55IC89IHRoaXMuazA7XG5cbiAgaWYgKChyaCA9IE1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpKSkge1xuICAgIGMgPSBNYXRoLmF0YW4yKHJoLCB0aGlzLnJjKTtcbiAgICBzaW5jID0gTWF0aC5zaW4oYyk7XG4gICAgY29zYyA9IE1hdGguY29zKGMpO1xuXG4gICAgbGF0ID0gYXNpbnooY29zYyAqIHRoaXMuc2luX3AxNCArIChwLnkgKiBzaW5jICogdGhpcy5jb3NfcDE0KSAvIHJoKTtcbiAgICBsb24gPSBNYXRoLmF0YW4yKHAueCAqIHNpbmMsIHJoICogdGhpcy5jb3NfcDE0ICogY29zYyAtIHAueSAqIHRoaXMuc2luX3AxNCAqIHNpbmMpO1xuICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIGxvbik7XG4gIH1cbiAgZWxzZSB7XG4gICAgbGF0ID0gdGhpcy5waGljMDtcbiAgICBsb24gPSAwO1xuICB9XG5cbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgdmFyIG5hbWVzID0gW1wiZ25vbVwiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2dub20uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9nbm9tLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIHRoaXMuYSA9IDYzNzczOTcuMTU1O1xuICB0aGlzLmVzID0gMC4wMDY2NzQzNzIyMzA2MTQ7XG4gIHRoaXMuZSA9IE1hdGguc3FydCh0aGlzLmVzKTtcbiAgaWYgKCF0aGlzLmxhdDApIHtcbiAgICB0aGlzLmxhdDAgPSAwLjg2MzkzNzk3OTczNzE5MztcbiAgfVxuICBpZiAoIXRoaXMubG9uZzApIHtcbiAgICB0aGlzLmxvbmcwID0gMC43NDE3NjQ5MzIwOTc1OTAxIC0gMC4zMDgzNDE1MDExODU2NjU7XG4gIH1cbiAgLyogaWYgc2NhbGUgbm90IHNldCBkZWZhdWx0IHRvIDAuOTk5OSAqL1xuICBpZiAoIXRoaXMuazApIHtcbiAgICB0aGlzLmswID0gMC45OTk5O1xuICB9XG4gIHRoaXMuczQ1ID0gMC43ODUzOTgxNjMzOTc0NDg7IC8qIDQ1ICovXG4gIHRoaXMuczkwID0gMiAqIHRoaXMuczQ1O1xuICB0aGlzLmZpMCA9IHRoaXMubGF0MDtcbiAgdGhpcy5lMiA9IHRoaXMuZXM7XG4gIHRoaXMuZSA9IE1hdGguc3FydCh0aGlzLmUyKTtcbiAgdGhpcy5hbGZhID0gTWF0aC5zcXJ0KDEgKyAodGhpcy5lMiAqIE1hdGgucG93KE1hdGguY29zKHRoaXMuZmkwKSwgNCkpIC8gKDEgLSB0aGlzLmUyKSk7XG4gIHRoaXMudXEgPSAxLjA0MjE2ODU2MzgwNDc0O1xuICB0aGlzLnUwID0gTWF0aC5hc2luKE1hdGguc2luKHRoaXMuZmkwKSAvIHRoaXMuYWxmYSk7XG4gIHRoaXMuZyA9IE1hdGgucG93KCgxICsgdGhpcy5lICogTWF0aC5zaW4odGhpcy5maTApKSAvICgxIC0gdGhpcy5lICogTWF0aC5zaW4odGhpcy5maTApKSwgdGhpcy5hbGZhICogdGhpcy5lIC8gMik7XG4gIHRoaXMuayA9IE1hdGgudGFuKHRoaXMudTAgLyAyICsgdGhpcy5zNDUpIC8gTWF0aC5wb3coTWF0aC50YW4odGhpcy5maTAgLyAyICsgdGhpcy5zNDUpLCB0aGlzLmFsZmEpICogdGhpcy5nO1xuICB0aGlzLmsxID0gdGhpcy5rMDtcbiAgdGhpcy5uMCA9IHRoaXMuYSAqIE1hdGguc3FydCgxIC0gdGhpcy5lMikgLyAoMSAtIHRoaXMuZTIgKiBNYXRoLnBvdyhNYXRoLnNpbih0aGlzLmZpMCksIDIpKTtcbiAgdGhpcy5zMCA9IDEuMzcwMDgzNDYyODE1NTU7XG4gIHRoaXMubiA9IE1hdGguc2luKHRoaXMuczApO1xuICB0aGlzLnJvMCA9IHRoaXMuazEgKiB0aGlzLm4wIC8gTWF0aC50YW4odGhpcy5zMCk7XG4gIHRoaXMuYWQgPSB0aGlzLnM5MCAtIHRoaXMudXE7XG59XG5cbi8qIGVsbGlwc29pZCAqL1xuLyogY2FsY3VsYXRlIHh5IGZyb20gbGF0L2xvbiAqL1xuLyogQ29uc3RhbnRzLCBpZGVudGljYWwgdG8gaW52ZXJzZSB0cmFuc2Zvcm0gZnVuY3Rpb24gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKHApIHtcbiAgdmFyIGdmaSwgdSwgZGVsdGF2LCBzLCBkLCBlcHMsIHJvO1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuICB2YXIgZGVsdGFfbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgLyogVHJhbnNmb3JtYXRpb24gKi9cbiAgZ2ZpID0gTWF0aC5wb3coKCgxICsgdGhpcy5lICogTWF0aC5zaW4obGF0KSkgLyAoMSAtIHRoaXMuZSAqIE1hdGguc2luKGxhdCkpKSwgKHRoaXMuYWxmYSAqIHRoaXMuZSAvIDIpKTtcbiAgdSA9IDIgKiAoTWF0aC5hdGFuKHRoaXMuayAqIE1hdGgucG93KE1hdGgudGFuKGxhdCAvIDIgKyB0aGlzLnM0NSksIHRoaXMuYWxmYSkgLyBnZmkpIC0gdGhpcy5zNDUpO1xuICBkZWx0YXYgPSAtZGVsdGFfbG9uICogdGhpcy5hbGZhO1xuICBzID0gTWF0aC5hc2luKE1hdGguY29zKHRoaXMuYWQpICogTWF0aC5zaW4odSkgKyBNYXRoLnNpbih0aGlzLmFkKSAqIE1hdGguY29zKHUpICogTWF0aC5jb3MoZGVsdGF2KSk7XG4gIGQgPSBNYXRoLmFzaW4oTWF0aC5jb3ModSkgKiBNYXRoLnNpbihkZWx0YXYpIC8gTWF0aC5jb3MocykpO1xuICBlcHMgPSB0aGlzLm4gKiBkO1xuICBybyA9IHRoaXMucm8wICogTWF0aC5wb3coTWF0aC50YW4odGhpcy5zMCAvIDIgKyB0aGlzLnM0NSksIHRoaXMubikgLyBNYXRoLnBvdyhNYXRoLnRhbihzIC8gMiArIHRoaXMuczQ1KSwgdGhpcy5uKTtcbiAgcC55ID0gcm8gKiBNYXRoLmNvcyhlcHMpIC8gMTtcbiAgcC54ID0gcm8gKiBNYXRoLnNpbihlcHMpIC8gMTtcblxuICBpZiAoIXRoaXMuY3plY2gpIHtcbiAgICBwLnkgKj0gLTE7XG4gICAgcC54ICo9IC0xO1xuICB9XG4gIHJldHVybiAocCk7XG59XG5cbi8qIGNhbGN1bGF0ZSBsYXQvbG9uIGZyb20geHkgKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgdmFyIHUsIGRlbHRhdiwgcywgZCwgZXBzLCBybywgZmkxO1xuICB2YXIgb2s7XG5cbiAgLyogVHJhbnNmb3JtYXRpb24gKi9cbiAgLyogcmV2ZXJ0IHksIHgqL1xuICB2YXIgdG1wID0gcC54O1xuICBwLnggPSBwLnk7XG4gIHAueSA9IHRtcDtcbiAgaWYgKCF0aGlzLmN6ZWNoKSB7XG4gICAgcC55ICo9IC0xO1xuICAgIHAueCAqPSAtMTtcbiAgfVxuICBybyA9IE1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpO1xuICBlcHMgPSBNYXRoLmF0YW4yKHAueSwgcC54KTtcbiAgZCA9IGVwcyAvIE1hdGguc2luKHRoaXMuczApO1xuICBzID0gMiAqIChNYXRoLmF0YW4oTWF0aC5wb3codGhpcy5ybzAgLyBybywgMSAvIHRoaXMubikgKiBNYXRoLnRhbih0aGlzLnMwIC8gMiArIHRoaXMuczQ1KSkgLSB0aGlzLnM0NSk7XG4gIHUgPSBNYXRoLmFzaW4oTWF0aC5jb3ModGhpcy5hZCkgKiBNYXRoLnNpbihzKSAtIE1hdGguc2luKHRoaXMuYWQpICogTWF0aC5jb3MocykgKiBNYXRoLmNvcyhkKSk7XG4gIGRlbHRhdiA9IE1hdGguYXNpbihNYXRoLmNvcyhzKSAqIE1hdGguc2luKGQpIC8gTWF0aC5jb3ModSkpO1xuICBwLnggPSB0aGlzLmxvbmcwIC0gZGVsdGF2IC8gdGhpcy5hbGZhO1xuICBmaTEgPSB1O1xuICBvayA9IDA7XG4gIHZhciBpdGVyID0gMDtcbiAgZG8ge1xuICAgIHAueSA9IDIgKiAoTWF0aC5hdGFuKE1hdGgucG93KHRoaXMuaywgLSAxIC8gdGhpcy5hbGZhKSAqIE1hdGgucG93KE1hdGgudGFuKHUgLyAyICsgdGhpcy5zNDUpLCAxIC8gdGhpcy5hbGZhKSAqIE1hdGgucG93KCgxICsgdGhpcy5lICogTWF0aC5zaW4oZmkxKSkgLyAoMSAtIHRoaXMuZSAqIE1hdGguc2luKGZpMSkpLCB0aGlzLmUgLyAyKSkgLSB0aGlzLnM0NSk7XG4gICAgaWYgKE1hdGguYWJzKGZpMSAtIHAueSkgPCAwLjAwMDAwMDAwMDEpIHtcbiAgICAgIG9rID0gMTtcbiAgICB9XG4gICAgZmkxID0gcC55O1xuICAgIGl0ZXIgKz0gMTtcbiAgfSB3aGlsZSAob2sgPT09IDAgJiYgaXRlciA8IDE1KTtcbiAgaWYgKGl0ZXIgPj0gMTUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAocCk7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJLcm92YWtcIiwgXCJrcm92YWtcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9rcm92YWsuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9rcm92YWsuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5pbXBvcnQge0hBTEZfUEksIEVQU0xOLCBGT1JUUEl9IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuXG5pbXBvcnQgcXNmbnogZnJvbSAnLi4vY29tbW9uL3FzZm56JztcbmltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcblxuLypcbiAgcmVmZXJlbmNlXG4gICAgXCJOZXcgRXF1YWwtQXJlYSBNYXAgUHJvamVjdGlvbnMgZm9yIE5vbmNpcmN1bGFyIFJlZ2lvbnNcIiwgSm9obiBQLiBTbnlkZXIsXG4gICAgVGhlIEFtZXJpY2FuIENhcnRvZ3JhcGhlciwgVm9sIDE1LCBOby4gNCwgT2N0b2JlciAxOTg4LCBwcC4gMzQxLTM1NS5cbiAgKi9cblxuZXhwb3J0IHZhciBTX1BPTEUgPSAxO1xuXG5leHBvcnQgdmFyIE5fUE9MRSA9IDI7XG5leHBvcnQgdmFyIEVRVUlUID0gMztcbmV4cG9ydCB2YXIgT0JMSVEgPSA0O1xuXG4vKiBJbml0aWFsaXplIHRoZSBMYW1iZXJ0IEF6aW11dGhhbCBFcXVhbCBBcmVhIHByb2plY3Rpb25cbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICB2YXIgdCA9IE1hdGguYWJzKHRoaXMubGF0MCk7XG4gIGlmIChNYXRoLmFicyh0IC0gSEFMRl9QSSkgPCBFUFNMTikge1xuICAgIHRoaXMubW9kZSA9IHRoaXMubGF0MCA8IDAgPyB0aGlzLlNfUE9MRSA6IHRoaXMuTl9QT0xFO1xuICB9XG4gIGVsc2UgaWYgKE1hdGguYWJzKHQpIDwgRVBTTE4pIHtcbiAgICB0aGlzLm1vZGUgPSB0aGlzLkVRVUlUO1xuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMubW9kZSA9IHRoaXMuT0JMSVE7XG4gIH1cbiAgaWYgKHRoaXMuZXMgPiAwKSB7XG4gICAgdmFyIHNpbnBoaTtcblxuICAgIHRoaXMucXAgPSBxc2Zueih0aGlzLmUsIDEpO1xuICAgIHRoaXMubW1mID0gMC41IC8gKDEgLSB0aGlzLmVzKTtcbiAgICB0aGlzLmFwYSA9IGF1dGhzZXQodGhpcy5lcyk7XG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICBjYXNlIHRoaXMuTl9QT0xFOlxuICAgICAgdGhpcy5kZCA9IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuU19QT0xFOlxuICAgICAgdGhpcy5kZCA9IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuRVFVSVQ6XG4gICAgICB0aGlzLnJxID0gTWF0aC5zcXJ0KDAuNSAqIHRoaXMucXApO1xuICAgICAgdGhpcy5kZCA9IDEgLyB0aGlzLnJxO1xuICAgICAgdGhpcy54bWYgPSAxO1xuICAgICAgdGhpcy55bWYgPSAwLjUgKiB0aGlzLnFwO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0aGlzLk9CTElROlxuICAgICAgdGhpcy5ycSA9IE1hdGguc3FydCgwLjUgKiB0aGlzLnFwKTtcbiAgICAgIHNpbnBoaSA9IE1hdGguc2luKHRoaXMubGF0MCk7XG4gICAgICB0aGlzLnNpbmIxID0gcXNmbnoodGhpcy5lLCBzaW5waGkpIC8gdGhpcy5xcDtcbiAgICAgIHRoaXMuY29zYjEgPSBNYXRoLnNxcnQoMSAtIHRoaXMuc2luYjEgKiB0aGlzLnNpbmIxKTtcbiAgICAgIHRoaXMuZGQgPSBNYXRoLmNvcyh0aGlzLmxhdDApIC8gKE1hdGguc3FydCgxIC0gdGhpcy5lcyAqIHNpbnBoaSAqIHNpbnBoaSkgKiB0aGlzLnJxICogdGhpcy5jb3NiMSk7XG4gICAgICB0aGlzLnltZiA9ICh0aGlzLnhtZiA9IHRoaXMucnEpIC8gdGhpcy5kZDtcbiAgICAgIHRoaXMueG1mICo9IHRoaXMuZGQ7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gdGhpcy5PQkxJUSkge1xuICAgICAgdGhpcy5zaW5waDAgPSBNYXRoLnNpbih0aGlzLmxhdDApO1xuICAgICAgdGhpcy5jb3NwaDAgPSBNYXRoLmNvcyh0aGlzLmxhdDApO1xuICAgIH1cbiAgfVxufVxuXG4vKiBMYW1iZXJ0IEF6aW11dGhhbCBFcXVhbCBBcmVhIGZvcndhcmQgZXF1YXRpb25zLS1tYXBwaW5nIGxhdCxsb25nIHRvIHgseVxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG5cbiAgLyogRm9yd2FyZCBlcXVhdGlvbnNcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgdmFyIHgsIHksIGNvc2xhbSwgc2lubGFtLCBzaW5waGksIHEsIHNpbmIsIGNvc2IsIGIsIGNvc3BoaTtcbiAgdmFyIGxhbSA9IHAueDtcbiAgdmFyIHBoaSA9IHAueTtcblxuICBsYW0gPSBhZGp1c3RfbG9uKGxhbSAtIHRoaXMubG9uZzApO1xuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICBzaW5waGkgPSBNYXRoLnNpbihwaGkpO1xuICAgIGNvc3BoaSA9IE1hdGguY29zKHBoaSk7XG4gICAgY29zbGFtID0gTWF0aC5jb3MobGFtKTtcbiAgICBpZiAodGhpcy5tb2RlID09PSB0aGlzLk9CTElRIHx8IHRoaXMubW9kZSA9PT0gdGhpcy5FUVVJVCkge1xuICAgICAgeSA9ICh0aGlzLm1vZGUgPT09IHRoaXMuRVFVSVQpID8gMSArIGNvc3BoaSAqIGNvc2xhbSA6IDEgKyB0aGlzLnNpbnBoMCAqIHNpbnBoaSArIHRoaXMuY29zcGgwICogY29zcGhpICogY29zbGFtO1xuICAgICAgaWYgKHkgPD0gRVBTTE4pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB5ID0gTWF0aC5zcXJ0KDIgLyB5KTtcbiAgICAgIHggPSB5ICogY29zcGhpICogTWF0aC5zaW4obGFtKTtcbiAgICAgIHkgKj0gKHRoaXMubW9kZSA9PT0gdGhpcy5FUVVJVCkgPyBzaW5waGkgOiB0aGlzLmNvc3BoMCAqIHNpbnBoaSAtIHRoaXMuc2lucGgwICogY29zcGhpICogY29zbGFtO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLm1vZGUgPT09IHRoaXMuTl9QT0xFIHx8IHRoaXMubW9kZSA9PT0gdGhpcy5TX1BPTEUpIHtcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09IHRoaXMuTl9QT0xFKSB7XG4gICAgICAgIGNvc2xhbSA9IC1jb3NsYW07XG4gICAgICB9XG4gICAgICBpZiAoTWF0aC5hYnMocGhpICsgdGhpcy5waGkwKSA8IEVQU0xOKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgeSA9IEZPUlRQSSAtIHBoaSAqIDAuNTtcbiAgICAgIHkgPSAyICogKCh0aGlzLm1vZGUgPT09IHRoaXMuU19QT0xFKSA/IE1hdGguY29zKHkpIDogTWF0aC5zaW4oeSkpO1xuICAgICAgeCA9IHkgKiBNYXRoLnNpbihsYW0pO1xuICAgICAgeSAqPSBjb3NsYW07XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHNpbmIgPSAwO1xuICAgIGNvc2IgPSAwO1xuICAgIGIgPSAwO1xuICAgIGNvc2xhbSA9IE1hdGguY29zKGxhbSk7XG4gICAgc2lubGFtID0gTWF0aC5zaW4obGFtKTtcbiAgICBzaW5waGkgPSBNYXRoLnNpbihwaGkpO1xuICAgIHEgPSBxc2Zueih0aGlzLmUsIHNpbnBoaSk7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gdGhpcy5PQkxJUSB8fCB0aGlzLm1vZGUgPT09IHRoaXMuRVFVSVQpIHtcbiAgICAgIHNpbmIgPSBxIC8gdGhpcy5xcDtcbiAgICAgIGNvc2IgPSBNYXRoLnNxcnQoMSAtIHNpbmIgKiBzaW5iKTtcbiAgICB9XG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICBjYXNlIHRoaXMuT0JMSVE6XG4gICAgICBiID0gMSArIHRoaXMuc2luYjEgKiBzaW5iICsgdGhpcy5jb3NiMSAqIGNvc2IgKiBjb3NsYW07XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuRVFVSVQ6XG4gICAgICBiID0gMSArIGNvc2IgKiBjb3NsYW07XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuTl9QT0xFOlxuICAgICAgYiA9IEhBTEZfUEkgKyBwaGk7XG4gICAgICBxID0gdGhpcy5xcCAtIHE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuU19QT0xFOlxuICAgICAgYiA9IHBoaSAtIEhBTEZfUEk7XG4gICAgICBxID0gdGhpcy5xcCArIHE7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKE1hdGguYWJzKGIpIDwgRVBTTE4pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgIGNhc2UgdGhpcy5PQkxJUTpcbiAgICBjYXNlIHRoaXMuRVFVSVQ6XG4gICAgICBiID0gTWF0aC5zcXJ0KDIgLyBiKTtcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09IHRoaXMuT0JMSVEpIHtcbiAgICAgICAgeSA9IHRoaXMueW1mICogYiAqICh0aGlzLmNvc2IxICogc2luYiAtIHRoaXMuc2luYjEgKiBjb3NiICogY29zbGFtKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB5ID0gKGIgPSBNYXRoLnNxcnQoMiAvICgxICsgY29zYiAqIGNvc2xhbSkpKSAqIHNpbmIgKiB0aGlzLnltZjtcbiAgICAgIH1cbiAgICAgIHggPSB0aGlzLnhtZiAqIGIgKiBjb3NiICogc2lubGFtO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0aGlzLk5fUE9MRTpcbiAgICBjYXNlIHRoaXMuU19QT0xFOlxuICAgICAgaWYgKHEgPj0gMCkge1xuICAgICAgICB4ID0gKGIgPSBNYXRoLnNxcnQocSkpICogc2lubGFtO1xuICAgICAgICB5ID0gY29zbGFtICogKCh0aGlzLm1vZGUgPT09IHRoaXMuU19QT0xFKSA/IGIgOiAtYik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgeCA9IHkgPSAwO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcC54ID0gdGhpcy5hICogeCArIHRoaXMueDA7XG4gIHAueSA9IHRoaXMuYSAqIHkgKyB0aGlzLnkwO1xuICByZXR1cm4gcDtcbn1cblxuLyogSW52ZXJzZSBlcXVhdGlvbnNcbiAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuICBwLnggLT0gdGhpcy54MDtcbiAgcC55IC09IHRoaXMueTA7XG4gIHZhciB4ID0gcC54IC8gdGhpcy5hO1xuICB2YXIgeSA9IHAueSAvIHRoaXMuYTtcbiAgdmFyIGxhbSwgcGhpLCBjQ2UsIHNDZSwgcSwgcmhvLCBhYjtcbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgdmFyIGNvc3ogPSAwLFxuICAgICAgcmgsIHNpbnogPSAwO1xuXG4gICAgcmggPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gICAgcGhpID0gcmggKiAwLjU7XG4gICAgaWYgKHBoaSA+IDEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBwaGkgPSAyICogTWF0aC5hc2luKHBoaSk7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gdGhpcy5PQkxJUSB8fCB0aGlzLm1vZGUgPT09IHRoaXMuRVFVSVQpIHtcbiAgICAgIHNpbnogPSBNYXRoLnNpbihwaGkpO1xuICAgICAgY29zeiA9IE1hdGguY29zKHBoaSk7XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgY2FzZSB0aGlzLkVRVUlUOlxuICAgICAgcGhpID0gKE1hdGguYWJzKHJoKSA8PSBFUFNMTikgPyAwIDogTWF0aC5hc2luKHkgKiBzaW56IC8gcmgpO1xuICAgICAgeCAqPSBzaW56O1xuICAgICAgeSA9IGNvc3ogKiByaDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5PQkxJUTpcbiAgICAgIHBoaSA9IChNYXRoLmFicyhyaCkgPD0gRVBTTE4pID8gdGhpcy5waGkwIDogTWF0aC5hc2luKGNvc3ogKiB0aGlzLnNpbnBoMCArIHkgKiBzaW56ICogdGhpcy5jb3NwaDAgLyByaCk7XG4gICAgICB4ICo9IHNpbnogKiB0aGlzLmNvc3BoMDtcbiAgICAgIHkgPSAoY29zeiAtIE1hdGguc2luKHBoaSkgKiB0aGlzLnNpbnBoMCkgKiByaDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5OX1BPTEU6XG4gICAgICB5ID0gLXk7XG4gICAgICBwaGkgPSBIQUxGX1BJIC0gcGhpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0aGlzLlNfUE9MRTpcbiAgICAgIHBoaSAtPSBIQUxGX1BJO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGxhbSA9ICh5ID09PSAwICYmICh0aGlzLm1vZGUgPT09IHRoaXMuRVFVSVQgfHwgdGhpcy5tb2RlID09PSB0aGlzLk9CTElRKSkgPyAwIDogTWF0aC5hdGFuMih4LCB5KTtcbiAgfVxuICBlbHNlIHtcbiAgICBhYiA9IDA7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gdGhpcy5PQkxJUSB8fCB0aGlzLm1vZGUgPT09IHRoaXMuRVFVSVQpIHtcbiAgICAgIHggLz0gdGhpcy5kZDtcbiAgICAgIHkgKj0gdGhpcy5kZDtcbiAgICAgIHJobyA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICAgIGlmIChyaG8gPCBFUFNMTikge1xuICAgICAgICBwLnggPSAwO1xuICAgICAgICBwLnkgPSB0aGlzLnBoaTA7XG4gICAgICAgIHJldHVybiBwO1xuICAgICAgfVxuICAgICAgc0NlID0gMiAqIE1hdGguYXNpbigwLjUgKiByaG8gLyB0aGlzLnJxKTtcbiAgICAgIGNDZSA9IE1hdGguY29zKHNDZSk7XG4gICAgICB4ICo9IChzQ2UgPSBNYXRoLnNpbihzQ2UpKTtcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09IHRoaXMuT0JMSVEpIHtcbiAgICAgICAgYWIgPSBjQ2UgKiB0aGlzLnNpbmIxICsgeSAqIHNDZSAqIHRoaXMuY29zYjEgLyByaG87XG4gICAgICAgIHEgPSB0aGlzLnFwICogYWI7XG4gICAgICAgIHkgPSByaG8gKiB0aGlzLmNvc2IxICogY0NlIC0geSAqIHRoaXMuc2luYjEgKiBzQ2U7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYWIgPSB5ICogc0NlIC8gcmhvO1xuICAgICAgICBxID0gdGhpcy5xcCAqIGFiO1xuICAgICAgICB5ID0gcmhvICogY0NlO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLm1vZGUgPT09IHRoaXMuTl9QT0xFIHx8IHRoaXMubW9kZSA9PT0gdGhpcy5TX1BPTEUpIHtcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09IHRoaXMuTl9QT0xFKSB7XG4gICAgICAgIHkgPSAteTtcbiAgICAgIH1cbiAgICAgIHEgPSAoeCAqIHggKyB5ICogeSk7XG4gICAgICBpZiAoIXEpIHtcbiAgICAgICAgcC54ID0gMDtcbiAgICAgICAgcC55ID0gdGhpcy5waGkwO1xuICAgICAgICByZXR1cm4gcDtcbiAgICAgIH1cbiAgICAgIGFiID0gMSAtIHEgLyB0aGlzLnFwO1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gdGhpcy5TX1BPTEUpIHtcbiAgICAgICAgYWIgPSAtYWI7XG4gICAgICB9XG4gICAgfVxuICAgIGxhbSA9IE1hdGguYXRhbjIoeCwgeSk7XG4gICAgcGhpID0gYXV0aGxhdChNYXRoLmFzaW4oYWIpLCB0aGlzLmFwYSk7XG4gIH1cblxuICBwLnggPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBsYW0pO1xuICBwLnkgPSBwaGk7XG4gIHJldHVybiBwO1xufVxuXG4vKiBkZXRlcm1pbmUgbGF0aXR1ZGUgZnJvbSBhdXRoYWxpYyBsYXRpdHVkZSAqL1xudmFyIFAwMCA9IDAuMzMzMzMzMzMzMzMzMzMzMzMzMzM7XG5cbnZhciBQMDEgPSAwLjE3MjIyMjIyMjIyMjIyMjIyMjIyO1xudmFyIFAwMiA9IDAuMTAyNTc5MzY1MDc5MzY1MDc5MzY7XG52YXIgUDEwID0gMC4wNjM4ODg4ODg4ODg4ODg4ODg4ODtcbnZhciBQMTEgPSAwLjA2NjQwMjExNjQwMjExNjQwMjExO1xudmFyIFAyMCA9IDAuMDE2NDE1MDEyOTQyMTkxNTQ0NDM7XG5cbmZ1bmN0aW9uIGF1dGhzZXQoZXMpIHtcbiAgdmFyIHQ7XG4gIHZhciBBUEEgPSBbXTtcbiAgQVBBWzBdID0gZXMgKiBQMDA7XG4gIHQgPSBlcyAqIGVzO1xuICBBUEFbMF0gKz0gdCAqIFAwMTtcbiAgQVBBWzFdID0gdCAqIFAxMDtcbiAgdCAqPSBlcztcbiAgQVBBWzBdICs9IHQgKiBQMDI7XG4gIEFQQVsxXSArPSB0ICogUDExO1xuICBBUEFbMl0gPSB0ICogUDIwO1xuICByZXR1cm4gQVBBO1xufVxuXG5mdW5jdGlvbiBhdXRobGF0KGJldGEsIEFQQSkge1xuICB2YXIgdCA9IGJldGEgKyBiZXRhO1xuICByZXR1cm4gKGJldGEgKyBBUEFbMF0gKiBNYXRoLnNpbih0KSArIEFQQVsxXSAqIE1hdGguc2luKHQgKyB0KSArIEFQQVsyXSAqIE1hdGguc2luKHQgKyB0ICsgdCkpO1xufVxuXG5leHBvcnQgdmFyIG5hbWVzID0gW1wiTGFtYmVydCBBemltdXRoYWwgRXF1YWwgQXJlYVwiLCBcIkxhbWJlcnRfQXppbXV0aGFsX0VxdWFsX0FyZWFcIiwgXCJsYWVhXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXMsXG4gIFNfUE9MRTogU19QT0xFLFxuICBOX1BPTEU6IE5fUE9MRSxcbiAgRVFVSVQ6IEVRVUlULFxuICBPQkxJUTogT0JMSVFcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbGFlYS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2xhZWEuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IG1zZm56IGZyb20gJy4uL2NvbW1vbi9tc2Zueic7XG5pbXBvcnQgdHNmbnogZnJvbSAnLi4vY29tbW9uL3RzZm56JztcbmltcG9ydCBzaWduIGZyb20gJy4uL2NvbW1vbi9zaWduJztcbmltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcbmltcG9ydCBwaGkyeiBmcm9tICcuLi9jb21tb24vcGhpMnonO1xuaW1wb3J0IHtIQUxGX1BJLCBFUFNMTn0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcblxuICAvLyBhcnJheSBvZjogIHJfbWFqLHJfbWluLGxhdDEsbGF0MixjX2xvbixjX2xhdCxmYWxzZV9lYXN0LGZhbHNlX25vcnRoXG4gIC8vZG91YmxlIGNfbGF0OyAgICAgICAgICAgICAgICAgICAvKiBjZW50ZXIgbGF0aXR1ZGUgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLy9kb3VibGUgY19sb247ICAgICAgICAgICAgICAgICAgIC8qIGNlbnRlciBsb25naXR1ZGUgICAgICAgICAgICAgICAgICAgICAqL1xuICAvL2RvdWJsZSBsYXQxOyAgICAgICAgICAgICAgICAgICAgLyogZmlyc3Qgc3RhbmRhcmQgcGFyYWxsZWwgICAgICAgICAgICAgICovXG4gIC8vZG91YmxlIGxhdDI7ICAgICAgICAgICAgICAgICAgICAvKiBzZWNvbmQgc3RhbmRhcmQgcGFyYWxsZWwgICAgICAgICAgICAgKi9cbiAgLy9kb3VibGUgcl9tYWo7ICAgICAgICAgICAgICAgICAgIC8qIG1ham9yIGF4aXMgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvL2RvdWJsZSByX21pbjsgICAgICAgICAgICAgICAgICAgLyogbWlub3IgYXhpcyAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gIC8vZG91YmxlIGZhbHNlX2Vhc3Q7ICAgICAgICAgICAgICAvKiB4IG9mZnNldCBpbiBtZXRlcnMgICAgICAgICAgICAgICAgICAgKi9cbiAgLy9kb3VibGUgZmFsc2Vfbm9ydGg7ICAgICAgICAgICAgIC8qIHkgb2Zmc2V0IGluIG1ldGVycyAgICAgICAgICAgICAgICAgICAqL1xuXG4gIGlmICghdGhpcy5sYXQyKSB7XG4gICAgdGhpcy5sYXQyID0gdGhpcy5sYXQxO1xuICB9IC8vaWYgbGF0MiBpcyBub3QgZGVmaW5lZFxuICBpZiAoIXRoaXMuazApIHtcbiAgICB0aGlzLmswID0gMTtcbiAgfVxuICB0aGlzLngwID0gdGhpcy54MCB8fCAwO1xuICB0aGlzLnkwID0gdGhpcy55MCB8fCAwO1xuICAvLyBTdGFuZGFyZCBQYXJhbGxlbHMgY2Fubm90IGJlIGVxdWFsIGFuZCBvbiBvcHBvc2l0ZSBzaWRlcyBvZiB0aGUgZXF1YXRvclxuICBpZiAoTWF0aC5hYnModGhpcy5sYXQxICsgdGhpcy5sYXQyKSA8IEVQU0xOKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHRlbXAgPSB0aGlzLmIgLyB0aGlzLmE7XG4gIHRoaXMuZSA9IE1hdGguc3FydCgxIC0gdGVtcCAqIHRlbXApO1xuXG4gIHZhciBzaW4xID0gTWF0aC5zaW4odGhpcy5sYXQxKTtcbiAgdmFyIGNvczEgPSBNYXRoLmNvcyh0aGlzLmxhdDEpO1xuICB2YXIgbXMxID0gbXNmbnoodGhpcy5lLCBzaW4xLCBjb3MxKTtcbiAgdmFyIHRzMSA9IHRzZm56KHRoaXMuZSwgdGhpcy5sYXQxLCBzaW4xKTtcblxuICB2YXIgc2luMiA9IE1hdGguc2luKHRoaXMubGF0Mik7XG4gIHZhciBjb3MyID0gTWF0aC5jb3ModGhpcy5sYXQyKTtcbiAgdmFyIG1zMiA9IG1zZm56KHRoaXMuZSwgc2luMiwgY29zMik7XG4gIHZhciB0czIgPSB0c2Zueih0aGlzLmUsIHRoaXMubGF0Miwgc2luMik7XG5cbiAgdmFyIHRzMCA9IHRzZm56KHRoaXMuZSwgdGhpcy5sYXQwLCBNYXRoLnNpbih0aGlzLmxhdDApKTtcblxuICBpZiAoTWF0aC5hYnModGhpcy5sYXQxIC0gdGhpcy5sYXQyKSA+IEVQU0xOKSB7XG4gICAgdGhpcy5ucyA9IE1hdGgubG9nKG1zMSAvIG1zMikgLyBNYXRoLmxvZyh0czEgLyB0czIpO1xuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMubnMgPSBzaW4xO1xuICB9XG4gIGlmIChpc05hTih0aGlzLm5zKSkge1xuICAgIHRoaXMubnMgPSBzaW4xO1xuICB9XG4gIHRoaXMuZjAgPSBtczEgLyAodGhpcy5ucyAqIE1hdGgucG93KHRzMSwgdGhpcy5ucykpO1xuICB0aGlzLnJoID0gdGhpcy5hICogdGhpcy5mMCAqIE1hdGgucG93KHRzMCwgdGhpcy5ucyk7XG4gIGlmICghdGhpcy50aXRsZSkge1xuICAgIHRoaXMudGl0bGUgPSBcIkxhbWJlcnQgQ29uZm9ybWFsIENvbmljXCI7XG4gIH1cbn1cblxuLy8gTGFtYmVydCBDb25mb3JtYWwgY29uaWMgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuXG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG5cbiAgLy8gc2luZ3VsYXIgY2FzZXMgOlxuICBpZiAoTWF0aC5hYnMoMiAqIE1hdGguYWJzKGxhdCkgLSBNYXRoLlBJKSA8PSBFUFNMTikge1xuICAgIGxhdCA9IHNpZ24obGF0KSAqIChIQUxGX1BJIC0gMiAqIEVQU0xOKTtcbiAgfVxuXG4gIHZhciBjb24gPSBNYXRoLmFicyhNYXRoLmFicyhsYXQpIC0gSEFMRl9QSSk7XG4gIHZhciB0cywgcmgxO1xuICBpZiAoY29uID4gRVBTTE4pIHtcbiAgICB0cyA9IHRzZm56KHRoaXMuZSwgbGF0LCBNYXRoLnNpbihsYXQpKTtcbiAgICByaDEgPSB0aGlzLmEgKiB0aGlzLmYwICogTWF0aC5wb3codHMsIHRoaXMubnMpO1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbiA9IGxhdCAqIHRoaXMubnM7XG4gICAgaWYgKGNvbiA8PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmgxID0gMDtcbiAgfVxuICB2YXIgdGhldGEgPSB0aGlzLm5zICogYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgcC54ID0gdGhpcy5rMCAqIChyaDEgKiBNYXRoLnNpbih0aGV0YSkpICsgdGhpcy54MDtcbiAgcC55ID0gdGhpcy5rMCAqICh0aGlzLnJoIC0gcmgxICogTWF0aC5jb3ModGhldGEpKSArIHRoaXMueTA7XG5cbiAgcmV0dXJuIHA7XG59XG5cbi8vIExhbWJlcnQgQ29uZm9ybWFsIENvbmljIGludmVyc2UgZXF1YXRpb25zLS1tYXBwaW5nIHgseSB0byBsYXQvbG9uZ1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcblxuICB2YXIgcmgxLCBjb24sIHRzO1xuICB2YXIgbGF0LCBsb247XG4gIHZhciB4ID0gKHAueCAtIHRoaXMueDApIC8gdGhpcy5rMDtcbiAgdmFyIHkgPSAodGhpcy5yaCAtIChwLnkgLSB0aGlzLnkwKSAvIHRoaXMuazApO1xuICBpZiAodGhpcy5ucyA+IDApIHtcbiAgICByaDEgPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gICAgY29uID0gMTtcbiAgfVxuICBlbHNlIHtcbiAgICByaDEgPSAtTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuICAgIGNvbiA9IC0xO1xuICB9XG4gIHZhciB0aGV0YSA9IDA7XG4gIGlmIChyaDEgIT09IDApIHtcbiAgICB0aGV0YSA9IE1hdGguYXRhbjIoKGNvbiAqIHgpLCAoY29uICogeSkpO1xuICB9XG4gIGlmICgocmgxICE9PSAwKSB8fCAodGhpcy5ucyA+IDApKSB7XG4gICAgY29uID0gMSAvIHRoaXMubnM7XG4gICAgdHMgPSBNYXRoLnBvdygocmgxIC8gKHRoaXMuYSAqIHRoaXMuZjApKSwgY29uKTtcbiAgICBsYXQgPSBwaGkyeih0aGlzLmUsIHRzKTtcbiAgICBpZiAobGF0ID09PSAtOTk5OSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGxhdCA9IC1IQUxGX1BJO1xuICB9XG4gIGxvbiA9IGFkanVzdF9sb24odGhldGEgLyB0aGlzLm5zICsgdGhpcy5sb25nMCk7XG5cbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgdmFyIG5hbWVzID0gW1wiTGFtYmVydCBUYW5nZW50aWFsIENvbmZvcm1hbCBDb25pYyBQcm9qZWN0aW9uXCIsIFwiTGFtYmVydF9Db25mb3JtYWxfQ29uaWNcIiwgXCJMYW1iZXJ0X0NvbmZvcm1hbF9Db25pY18yU1BcIiwgXCJsY2NcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9sY2MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9sY2MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vbm8tb3AgZm9yIGxvbmdsYXRcbn1cblxuZnVuY3Rpb24gaWRlbnRpdHkocHQpIHtcbiAgcmV0dXJuIHB0O1xufVxuZXhwb3J0IHtpZGVudGl0eSBhcyBmb3J3YXJkfTtcbmV4cG9ydCB7aWRlbnRpdHkgYXMgaW52ZXJzZX07XG5leHBvcnQgdmFyIG5hbWVzID0gW1wibG9uZ2xhdFwiLCBcImlkZW50aXR5XCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBpZGVudGl0eSxcbiAgaW52ZXJzZTogaWRlbnRpdHksXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9sb25nbGF0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbG9uZ2xhdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgbXNmbnogZnJvbSAnLi4vY29tbW9uL21zZm56JztcblxuaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuaW1wb3J0IHRzZm56IGZyb20gJy4uL2NvbW1vbi90c2Zueic7XG5pbXBvcnQgcGhpMnogZnJvbSAnLi4vY29tbW9uL3BoaTJ6JztcbmltcG9ydCB7Rk9SVFBJLCBSMkQsIEVQU0xOLCBIQUxGX1BJfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICB2YXIgY29uID0gdGhpcy5iIC8gdGhpcy5hO1xuICB0aGlzLmVzID0gMSAtIGNvbiAqIGNvbjtcbiAgaWYoISgneDAnIGluIHRoaXMpKXtcbiAgICB0aGlzLngwID0gMDtcbiAgfVxuICBpZighKCd5MCcgaW4gdGhpcykpe1xuICAgIHRoaXMueTAgPSAwO1xuICB9XG4gIHRoaXMuZSA9IE1hdGguc3FydCh0aGlzLmVzKTtcbiAgaWYgKHRoaXMubGF0X3RzKSB7XG4gICAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgICB0aGlzLmswID0gTWF0aC5jb3ModGhpcy5sYXRfdHMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuazAgPSBtc2Zueih0aGlzLmUsIE1hdGguc2luKHRoaXMubGF0X3RzKSwgTWF0aC5jb3ModGhpcy5sYXRfdHMpKTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKCF0aGlzLmswKSB7XG4gICAgICBpZiAodGhpcy5rKSB7XG4gICAgICAgIHRoaXMuazAgPSB0aGlzLms7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5rMCA9IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qIE1lcmNhdG9yIGZvcndhcmQgZXF1YXRpb25zLS1tYXBwaW5nIGxhdCxsb25nIHRvIHgseVxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKHApIHtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcbiAgLy8gY29udmVydCB0byByYWRpYW5zXG4gIGlmIChsYXQgKiBSMkQgPiA5MCAmJiBsYXQgKiBSMkQgPCAtOTAgJiYgbG9uICogUjJEID4gMTgwICYmIGxvbiAqIFIyRCA8IC0xODApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciB4LCB5O1xuICBpZiAoTWF0aC5hYnMoTWF0aC5hYnMobGF0KSAtIEhBTEZfUEkpIDw9IEVQU0xOKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgICB4ID0gdGhpcy54MCArIHRoaXMuYSAqIHRoaXMuazAgKiBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICAgICAgeSA9IHRoaXMueTAgKyB0aGlzLmEgKiB0aGlzLmswICogTWF0aC5sb2coTWF0aC50YW4oRk9SVFBJICsgMC41ICogbGF0KSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHNpbnBoaSA9IE1hdGguc2luKGxhdCk7XG4gICAgICB2YXIgdHMgPSB0c2Zueih0aGlzLmUsIGxhdCwgc2lucGhpKTtcbiAgICAgIHggPSB0aGlzLngwICsgdGhpcy5hICogdGhpcy5rMCAqIGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG4gICAgICB5ID0gdGhpcy55MCAtIHRoaXMuYSAqIHRoaXMuazAgKiBNYXRoLmxvZyh0cyk7XG4gICAgfVxuICAgIHAueCA9IHg7XG4gICAgcC55ID0geTtcbiAgICByZXR1cm4gcDtcbiAgfVxufVxuXG4vKiBNZXJjYXRvciBpbnZlcnNlIGVxdWF0aW9ucy0tbWFwcGluZyB4LHkgdG8gbGF0L2xvbmdcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuXG4gIHZhciB4ID0gcC54IC0gdGhpcy54MDtcbiAgdmFyIHkgPSBwLnkgLSB0aGlzLnkwO1xuICB2YXIgbG9uLCBsYXQ7XG5cbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgbGF0ID0gSEFMRl9QSSAtIDIgKiBNYXRoLmF0YW4oTWF0aC5leHAoLXkgLyAodGhpcy5hICogdGhpcy5rMCkpKTtcbiAgfVxuICBlbHNlIHtcbiAgICB2YXIgdHMgPSBNYXRoLmV4cCgteSAvICh0aGlzLmEgKiB0aGlzLmswKSk7XG4gICAgbGF0ID0gcGhpMnoodGhpcy5lLCB0cyk7XG4gICAgaWYgKGxhdCA9PT0gLTk5OTkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyB4IC8gKHRoaXMuYSAqIHRoaXMuazApKTtcblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJNZXJjYXRvclwiLCBcIlBvcHVsYXIgVmlzdWFsaXNhdGlvbiBQc2V1ZG8gTWVyY2F0b3JcIiwgXCJNZXJjYXRvcl8xU1BcIiwgXCJNZXJjYXRvcl9BdXhpbGlhcnlfU3BoZXJlXCIsIFwibWVyY1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL21lcmMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9tZXJjLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcblxuLypcbiAgcmVmZXJlbmNlXG4gICAgXCJOZXcgRXF1YWwtQXJlYSBNYXAgUHJvamVjdGlvbnMgZm9yIE5vbmNpcmN1bGFyIFJlZ2lvbnNcIiwgSm9obiBQLiBTbnlkZXIsXG4gICAgVGhlIEFtZXJpY2FuIENhcnRvZ3JhcGhlciwgVm9sIDE1LCBOby4gNCwgT2N0b2JlciAxOTg4LCBwcC4gMzQxLTM1NS5cbiAgKi9cblxuXG4vKiBJbml0aWFsaXplIHRoZSBNaWxsZXIgQ3lsaW5kcmljYWwgcHJvamVjdGlvblxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAvL25vLW9wXG59XG5cbi8qIE1pbGxlciBDeWxpbmRyaWNhbCBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuICAvKiBGb3J3YXJkIGVxdWF0aW9uc1xuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICB2YXIgZGxvbiA9IGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG4gIHZhciB4ID0gdGhpcy54MCArIHRoaXMuYSAqIGRsb247XG4gIHZhciB5ID0gdGhpcy55MCArIHRoaXMuYSAqIE1hdGgubG9nKE1hdGgudGFuKChNYXRoLlBJIC8gNCkgKyAobGF0IC8gMi41KSkpICogMS4yNTtcblxuICBwLnggPSB4O1xuICBwLnkgPSB5O1xuICByZXR1cm4gcDtcbn1cblxuLyogTWlsbGVyIEN5bGluZHJpY2FsIGludmVyc2UgZXF1YXRpb25zLS1tYXBwaW5nIHgseSB0byBsYXQvbG9uZ1xuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHAueCAtPSB0aGlzLngwO1xuICBwLnkgLT0gdGhpcy55MDtcblxuICB2YXIgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgcC54IC8gdGhpcy5hKTtcbiAgdmFyIGxhdCA9IDIuNSAqIChNYXRoLmF0YW4oTWF0aC5leHAoMC44ICogcC55IC8gdGhpcy5hKSkgLSBNYXRoLlBJIC8gNCk7XG5cbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgdmFyIG5hbWVzID0gW1wiTWlsbGVyX0N5bGluZHJpY2FsXCIsIFwibWlsbFwiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL21pbGwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9taWxsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge31cbmltcG9ydCB7RVBTTE59IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuLyogTW9sbHdlaWRlIGZvcndhcmQgZXF1YXRpb25zLS1tYXBwaW5nIGxhdCxsb25nIHRvIHgseVxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuXG4gIC8qIEZvcndhcmQgZXF1YXRpb25zXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG5cbiAgdmFyIGRlbHRhX2xvbiA9IGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG4gIHZhciB0aGV0YSA9IGxhdDtcbiAgdmFyIGNvbiA9IE1hdGguUEkgKiBNYXRoLnNpbihsYXQpO1xuXG4gIC8qIEl0ZXJhdGUgdXNpbmcgdGhlIE5ld3Rvbi1SYXBoc29uIG1ldGhvZCB0byBmaW5kIHRoZXRhXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgdmFyIGRlbHRhX3RoZXRhID0gLSh0aGV0YSArIE1hdGguc2luKHRoZXRhKSAtIGNvbikgLyAoMSArIE1hdGguY29zKHRoZXRhKSk7XG4gICAgdGhldGEgKz0gZGVsdGFfdGhldGE7XG4gICAgaWYgKE1hdGguYWJzKGRlbHRhX3RoZXRhKSA8IEVQU0xOKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgdGhldGEgLz0gMjtcblxuICAvKiBJZiB0aGUgbGF0aXR1ZGUgaXMgOTAgZGVnLCBmb3JjZSB0aGUgeCBjb29yZGluYXRlIHRvIGJlIFwiMCArIGZhbHNlIGVhc3RpbmdcIlxuICAgICAgIHRoaXMgaXMgZG9uZSBoZXJlIGJlY2F1c2Ugb2YgcHJlY2lzaW9uIHByb2JsZW1zIHdpdGggXCJjb3ModGhldGEpXCJcbiAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIGlmIChNYXRoLlBJIC8gMiAtIE1hdGguYWJzKGxhdCkgPCBFUFNMTikge1xuICAgIGRlbHRhX2xvbiA9IDA7XG4gIH1cbiAgdmFyIHggPSAwLjkwMDMxNjMxNjE1OCAqIHRoaXMuYSAqIGRlbHRhX2xvbiAqIE1hdGguY29zKHRoZXRhKSArIHRoaXMueDA7XG4gIHZhciB5ID0gMS40MTQyMTM1NjIzNzMxICogdGhpcy5hICogTWF0aC5zaW4odGhldGEpICsgdGhpcy55MDtcblxuICBwLnggPSB4O1xuICBwLnkgPSB5O1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuICB2YXIgdGhldGE7XG4gIHZhciBhcmc7XG5cbiAgLyogSW52ZXJzZSBlcXVhdGlvbnNcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSAtPSB0aGlzLnkwO1xuICBhcmcgPSBwLnkgLyAoMS40MTQyMTM1NjIzNzMxICogdGhpcy5hKTtcblxuICAvKiBCZWNhdXNlIG9mIGRpdmlzaW9uIGJ5IHplcm8gcHJvYmxlbXMsICdhcmcnIGNhbiBub3QgYmUgMS4gIFRoZXJlZm9yZVxuICAgICAgIGEgbnVtYmVyIHZlcnkgY2xvc2UgdG8gb25lIGlzIHVzZWQgaW5zdGVhZC5cbiAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgaWYgKE1hdGguYWJzKGFyZykgPiAwLjk5OTk5OTk5OTk5OSkge1xuICAgIGFyZyA9IDAuOTk5OTk5OTk5OTk5O1xuICB9XG4gIHRoZXRhID0gTWF0aC5hc2luKGFyZyk7XG4gIHZhciBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyAocC54IC8gKDAuOTAwMzE2MzE2MTU4ICogdGhpcy5hICogTWF0aC5jb3ModGhldGEpKSkpO1xuICBpZiAobG9uIDwgKC1NYXRoLlBJKSkge1xuICAgIGxvbiA9IC1NYXRoLlBJO1xuICB9XG4gIGlmIChsb24gPiBNYXRoLlBJKSB7XG4gICAgbG9uID0gTWF0aC5QSTtcbiAgfVxuICBhcmcgPSAoMiAqIHRoZXRhICsgTWF0aC5zaW4oMiAqIHRoZXRhKSkgLyBNYXRoLlBJO1xuICBpZiAoTWF0aC5hYnMoYXJnKSA+IDEpIHtcbiAgICBhcmcgPSAxO1xuICB9XG4gIHZhciBsYXQgPSBNYXRoLmFzaW4oYXJnKTtcblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJNb2xsd2VpZGVcIiwgXCJtb2xsXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbW9sbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL21vbGwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtTRUNfVE9fUkFEfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuLypcbiAgcmVmZXJlbmNlXG4gICAgRGVwYXJ0bWVudCBvZiBMYW5kIGFuZCBTdXJ2ZXkgVGVjaG5pY2FsIENpcmN1bGFyIDE5NzMvMzJcbiAgICAgIGh0dHA6Ly93d3cubGluei5nb3Z0Lm56L2RvY3MvbWlzY2VsbGFuZW91cy9uei1tYXAtZGVmaW5pdGlvbi5wZGZcbiAgICBPU0cgVGVjaG5pY2FsIFJlcG9ydCA0LjFcbiAgICAgIGh0dHA6Ly93d3cubGluei5nb3Z0Lm56L2RvY3MvbWlzY2VsbGFuZW91cy9uem1nLnBkZlxuICAqL1xuXG4vKipcbiAqIGl0ZXJhdGlvbnM6IE51bWJlciBvZiBpdGVyYXRpb25zIHRvIHJlZmluZSBpbnZlcnNlIHRyYW5zZm9ybS5cbiAqICAgICAwIC0+IGttIGFjY3VyYWN5XG4gKiAgICAgMSAtPiBtIGFjY3VyYWN5IC0tIHN1aXRhYmxlIGZvciBtb3N0IG1hcHBpbmcgYXBwbGljYXRpb25zXG4gKiAgICAgMiAtPiBtbSBhY2N1cmFjeVxuICovXG5leHBvcnQgdmFyIGl0ZXJhdGlvbnMgPSAxO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGhpcy5BID0gW107XG4gIHRoaXMuQVsxXSA9IDAuNjM5OTE3NTA3MztcbiAgdGhpcy5BWzJdID0gLTAuMTM1ODc5NzYxMztcbiAgdGhpcy5BWzNdID0gMC4wNjMyOTQ0MDk7XG4gIHRoaXMuQVs0XSA9IC0wLjAyNTI2ODUzO1xuICB0aGlzLkFbNV0gPSAwLjAxMTc4Nzk7XG4gIHRoaXMuQVs2XSA9IC0wLjAwNTUxNjE7XG4gIHRoaXMuQVs3XSA9IDAuMDAyNjkwNjtcbiAgdGhpcy5BWzhdID0gLTAuMDAxMzMzO1xuICB0aGlzLkFbOV0gPSAwLjAwMDY3O1xuICB0aGlzLkFbMTBdID0gLTAuMDAwMzQ7XG5cbiAgdGhpcy5CX3JlID0gW107XG4gIHRoaXMuQl9pbSA9IFtdO1xuICB0aGlzLkJfcmVbMV0gPSAwLjc1NTc4NTMyMjg7XG4gIHRoaXMuQl9pbVsxXSA9IDA7XG4gIHRoaXMuQl9yZVsyXSA9IDAuMjQ5MjA0NjQ2O1xuICB0aGlzLkJfaW1bMl0gPSAwLjAwMzM3MTUwNztcbiAgdGhpcy5CX3JlWzNdID0gLTAuMDAxNTQxNzM5O1xuICB0aGlzLkJfaW1bM10gPSAwLjA0MTA1ODU2MDtcbiAgdGhpcy5CX3JlWzRdID0gLTAuMTAxNjI5MDc7XG4gIHRoaXMuQl9pbVs0XSA9IDAuMDE3Mjc2MDk7XG4gIHRoaXMuQl9yZVs1XSA9IC0wLjI2NjIzNDg5O1xuICB0aGlzLkJfaW1bNV0gPSAtMC4zNjI0OTIxODtcbiAgdGhpcy5CX3JlWzZdID0gLTAuNjg3MDk4MztcbiAgdGhpcy5CX2ltWzZdID0gLTEuMTY1MTk2NztcblxuICB0aGlzLkNfcmUgPSBbXTtcbiAgdGhpcy5DX2ltID0gW107XG4gIHRoaXMuQ19yZVsxXSA9IDEuMzIzMTI3MDQzOTtcbiAgdGhpcy5DX2ltWzFdID0gMDtcbiAgdGhpcy5DX3JlWzJdID0gLTAuNTc3MjQ1Nzg5O1xuICB0aGlzLkNfaW1bMl0gPSAtMC4wMDc4MDk1OTg7XG4gIHRoaXMuQ19yZVszXSA9IDAuNTA4MzA3NTEzO1xuICB0aGlzLkNfaW1bM10gPSAtMC4xMTIyMDg5NTI7XG4gIHRoaXMuQ19yZVs0XSA9IC0wLjE1MDk0NzYyO1xuICB0aGlzLkNfaW1bNF0gPSAwLjE4MjAwNjAyO1xuICB0aGlzLkNfcmVbNV0gPSAxLjAxNDE4MTc5O1xuICB0aGlzLkNfaW1bNV0gPSAxLjY0NDk3Njk2O1xuICB0aGlzLkNfcmVbNl0gPSAxLjk2NjA1NDk7XG4gIHRoaXMuQ19pbVs2XSA9IDIuNTEyNzY0NTtcblxuICB0aGlzLkQgPSBbXTtcbiAgdGhpcy5EWzFdID0gMS41NjI3MDE0MjQzO1xuICB0aGlzLkRbMl0gPSAwLjUxODU0MDYzOTg7XG4gIHRoaXMuRFszXSA9IC0wLjAzMzMzMDk4O1xuICB0aGlzLkRbNF0gPSAtMC4xMDUyOTA2O1xuICB0aGlzLkRbNV0gPSAtMC4wMzY4NTk0O1xuICB0aGlzLkRbNl0gPSAwLjAwNzMxNztcbiAgdGhpcy5EWzddID0gMC4wMTIyMDtcbiAgdGhpcy5EWzhdID0gMC4wMDM5NDtcbiAgdGhpcy5EWzldID0gLTAuMDAxMztcbn1cblxuLyoqXG4gICAgTmV3IFplYWxhbmQgTWFwIEdyaWQgRm9yd2FyZCAgLSBsb25nL2xhdCB0byB4L3lcbiAgICBsb25nL2xhdCBpbiByYWRpYW5zXG4gICovXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG4gIHZhciBuO1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuXG4gIHZhciBkZWx0YV9sYXQgPSBsYXQgLSB0aGlzLmxhdDA7XG4gIHZhciBkZWx0YV9sb24gPSBsb24gLSB0aGlzLmxvbmcwO1xuXG4gIC8vIDEuIENhbGN1bGF0ZSBkX3BoaSBhbmQgZF9wc2kgICAgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgZF9sYW1iZGFcbiAgLy8gRm9yIHRoaXMgYWxnb3JpdGhtLCBkZWx0YV9sYXRpdHVkZSBpcyBpbiBzZWNvbmRzIG9mIGFyYyB4IDEwLTUsIHNvIHdlIG5lZWQgdG8gc2NhbGUgdG8gdGhvc2UgdW5pdHMuIExvbmdpdHVkZSBpcyByYWRpYW5zLlxuICB2YXIgZF9waGkgPSBkZWx0YV9sYXQgLyBTRUNfVE9fUkFEICogMUUtNTtcbiAgdmFyIGRfbGFtYmRhID0gZGVsdGFfbG9uO1xuICB2YXIgZF9waGlfbiA9IDE7IC8vIGRfcGhpXjBcblxuICB2YXIgZF9wc2kgPSAwO1xuICBmb3IgKG4gPSAxOyBuIDw9IDEwOyBuKyspIHtcbiAgICBkX3BoaV9uID0gZF9waGlfbiAqIGRfcGhpO1xuICAgIGRfcHNpID0gZF9wc2kgKyB0aGlzLkFbbl0gKiBkX3BoaV9uO1xuICB9XG5cbiAgLy8gMi4gQ2FsY3VsYXRlIHRoZXRhXG4gIHZhciB0aF9yZSA9IGRfcHNpO1xuICB2YXIgdGhfaW0gPSBkX2xhbWJkYTtcblxuICAvLyAzLiBDYWxjdWxhdGUgelxuICB2YXIgdGhfbl9yZSA9IDE7XG4gIHZhciB0aF9uX2ltID0gMDsgLy8gdGhldGFeMFxuICB2YXIgdGhfbl9yZTE7XG4gIHZhciB0aF9uX2ltMTtcblxuICB2YXIgel9yZSA9IDA7XG4gIHZhciB6X2ltID0gMDtcbiAgZm9yIChuID0gMTsgbiA8PSA2OyBuKyspIHtcbiAgICB0aF9uX3JlMSA9IHRoX25fcmUgKiB0aF9yZSAtIHRoX25faW0gKiB0aF9pbTtcbiAgICB0aF9uX2ltMSA9IHRoX25faW0gKiB0aF9yZSArIHRoX25fcmUgKiB0aF9pbTtcbiAgICB0aF9uX3JlID0gdGhfbl9yZTE7XG4gICAgdGhfbl9pbSA9IHRoX25faW0xO1xuICAgIHpfcmUgPSB6X3JlICsgdGhpcy5CX3JlW25dICogdGhfbl9yZSAtIHRoaXMuQl9pbVtuXSAqIHRoX25faW07XG4gICAgel9pbSA9IHpfaW0gKyB0aGlzLkJfaW1bbl0gKiB0aF9uX3JlICsgdGhpcy5CX3JlW25dICogdGhfbl9pbTtcbiAgfVxuXG4gIC8vIDQuIENhbGN1bGF0ZSBlYXN0aW5nIGFuZCBub3J0aGluZ1xuICBwLnggPSAoel9pbSAqIHRoaXMuYSkgKyB0aGlzLngwO1xuICBwLnkgPSAoel9yZSAqIHRoaXMuYSkgKyB0aGlzLnkwO1xuXG4gIHJldHVybiBwO1xufVxuXG4vKipcbiAgICBOZXcgWmVhbGFuZCBNYXAgR3JpZCBJbnZlcnNlICAtICB4L3kgdG8gbG9uZy9sYXRcbiAgKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgdmFyIG47XG4gIHZhciB4ID0gcC54O1xuICB2YXIgeSA9IHAueTtcblxuICB2YXIgZGVsdGFfeCA9IHggLSB0aGlzLngwO1xuICB2YXIgZGVsdGFfeSA9IHkgLSB0aGlzLnkwO1xuXG4gIC8vIDEuIENhbGN1bGF0ZSB6XG4gIHZhciB6X3JlID0gZGVsdGFfeSAvIHRoaXMuYTtcbiAgdmFyIHpfaW0gPSBkZWx0YV94IC8gdGhpcy5hO1xuXG4gIC8vIDJhLiBDYWxjdWxhdGUgdGhldGEgLSBmaXJzdCBhcHByb3hpbWF0aW9uIGdpdmVzIGttIGFjY3VyYWN5XG4gIHZhciB6X25fcmUgPSAxO1xuICB2YXIgel9uX2ltID0gMDsgLy8gel4wXG4gIHZhciB6X25fcmUxO1xuICB2YXIgel9uX2ltMTtcblxuICB2YXIgdGhfcmUgPSAwO1xuICB2YXIgdGhfaW0gPSAwO1xuICBmb3IgKG4gPSAxOyBuIDw9IDY7IG4rKykge1xuICAgIHpfbl9yZTEgPSB6X25fcmUgKiB6X3JlIC0gel9uX2ltICogel9pbTtcbiAgICB6X25faW0xID0gel9uX2ltICogel9yZSArIHpfbl9yZSAqIHpfaW07XG4gICAgel9uX3JlID0gel9uX3JlMTtcbiAgICB6X25faW0gPSB6X25faW0xO1xuICAgIHRoX3JlID0gdGhfcmUgKyB0aGlzLkNfcmVbbl0gKiB6X25fcmUgLSB0aGlzLkNfaW1bbl0gKiB6X25faW07XG4gICAgdGhfaW0gPSB0aF9pbSArIHRoaXMuQ19pbVtuXSAqIHpfbl9yZSArIHRoaXMuQ19yZVtuXSAqIHpfbl9pbTtcbiAgfVxuXG4gIC8vIDJiLiBJdGVyYXRlIHRvIHJlZmluZSB0aGUgYWNjdXJhY3kgb2YgdGhlIGNhbGN1bGF0aW9uXG4gIC8vICAgICAgICAwIGl0ZXJhdGlvbnMgZ2l2ZXMga20gYWNjdXJhY3lcbiAgLy8gICAgICAgIDEgaXRlcmF0aW9uIGdpdmVzIG0gYWNjdXJhY3kgLS0gZ29vZCBlbm91Z2ggZm9yIG1vc3QgbWFwcGluZyBhcHBsaWNhdGlvbnNcbiAgLy8gICAgICAgIDIgaXRlcmF0aW9ucyBiaXZlcyBtbSBhY2N1cmFjeVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlcmF0aW9uczsgaSsrKSB7XG4gICAgdmFyIHRoX25fcmUgPSB0aF9yZTtcbiAgICB2YXIgdGhfbl9pbSA9IHRoX2ltO1xuICAgIHZhciB0aF9uX3JlMTtcbiAgICB2YXIgdGhfbl9pbTE7XG5cbiAgICB2YXIgbnVtX3JlID0gel9yZTtcbiAgICB2YXIgbnVtX2ltID0gel9pbTtcbiAgICBmb3IgKG4gPSAyOyBuIDw9IDY7IG4rKykge1xuICAgICAgdGhfbl9yZTEgPSB0aF9uX3JlICogdGhfcmUgLSB0aF9uX2ltICogdGhfaW07XG4gICAgICB0aF9uX2ltMSA9IHRoX25faW0gKiB0aF9yZSArIHRoX25fcmUgKiB0aF9pbTtcbiAgICAgIHRoX25fcmUgPSB0aF9uX3JlMTtcbiAgICAgIHRoX25faW0gPSB0aF9uX2ltMTtcbiAgICAgIG51bV9yZSA9IG51bV9yZSArIChuIC0gMSkgKiAodGhpcy5CX3JlW25dICogdGhfbl9yZSAtIHRoaXMuQl9pbVtuXSAqIHRoX25faW0pO1xuICAgICAgbnVtX2ltID0gbnVtX2ltICsgKG4gLSAxKSAqICh0aGlzLkJfaW1bbl0gKiB0aF9uX3JlICsgdGhpcy5CX3JlW25dICogdGhfbl9pbSk7XG4gICAgfVxuXG4gICAgdGhfbl9yZSA9IDE7XG4gICAgdGhfbl9pbSA9IDA7XG4gICAgdmFyIGRlbl9yZSA9IHRoaXMuQl9yZVsxXTtcbiAgICB2YXIgZGVuX2ltID0gdGhpcy5CX2ltWzFdO1xuICAgIGZvciAobiA9IDI7IG4gPD0gNjsgbisrKSB7XG4gICAgICB0aF9uX3JlMSA9IHRoX25fcmUgKiB0aF9yZSAtIHRoX25faW0gKiB0aF9pbTtcbiAgICAgIHRoX25faW0xID0gdGhfbl9pbSAqIHRoX3JlICsgdGhfbl9yZSAqIHRoX2ltO1xuICAgICAgdGhfbl9yZSA9IHRoX25fcmUxO1xuICAgICAgdGhfbl9pbSA9IHRoX25faW0xO1xuICAgICAgZGVuX3JlID0gZGVuX3JlICsgbiAqICh0aGlzLkJfcmVbbl0gKiB0aF9uX3JlIC0gdGhpcy5CX2ltW25dICogdGhfbl9pbSk7XG4gICAgICBkZW5faW0gPSBkZW5faW0gKyBuICogKHRoaXMuQl9pbVtuXSAqIHRoX25fcmUgKyB0aGlzLkJfcmVbbl0gKiB0aF9uX2ltKTtcbiAgICB9XG5cbiAgICAvLyBDb21wbGV4IGRpdmlzaW9uXG4gICAgdmFyIGRlbjIgPSBkZW5fcmUgKiBkZW5fcmUgKyBkZW5faW0gKiBkZW5faW07XG4gICAgdGhfcmUgPSAobnVtX3JlICogZGVuX3JlICsgbnVtX2ltICogZGVuX2ltKSAvIGRlbjI7XG4gICAgdGhfaW0gPSAobnVtX2ltICogZGVuX3JlIC0gbnVtX3JlICogZGVuX2ltKSAvIGRlbjI7XG4gIH1cblxuICAvLyAzLiBDYWxjdWxhdGUgZF9waGkgICAgICAgICAgICAgIC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBkX2xhbWJkYVxuICB2YXIgZF9wc2kgPSB0aF9yZTtcbiAgdmFyIGRfbGFtYmRhID0gdGhfaW07XG4gIHZhciBkX3BzaV9uID0gMTsgLy8gZF9wc2leMFxuXG4gIHZhciBkX3BoaSA9IDA7XG4gIGZvciAobiA9IDE7IG4gPD0gOTsgbisrKSB7XG4gICAgZF9wc2lfbiA9IGRfcHNpX24gKiBkX3BzaTtcbiAgICBkX3BoaSA9IGRfcGhpICsgdGhpcy5EW25dICogZF9wc2lfbjtcbiAgfVxuXG4gIC8vIDQuIENhbGN1bGF0ZSBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlXG4gIC8vIGRfcGhpIGlzIGNhbGN1YXRlZCBpbiBzZWNvbmQgb2YgYXJjICogMTBeLTUsIHNvIHdlIG5lZWQgdG8gc2NhbGUgYmFjayB0byByYWRpYW5zLiBkX2xhbWJkYSBpcyBpbiByYWRpYW5zLlxuICB2YXIgbGF0ID0gdGhpcy5sYXQwICsgKGRfcGhpICogU0VDX1RPX1JBRCAqIDFFNSk7XG4gIHZhciBsb24gPSB0aGlzLmxvbmcwICsgZF9sYW1iZGE7XG5cbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG5cbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJOZXdfWmVhbGFuZF9NYXBfR3JpZFwiLCBcIm56bWdcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9uem1nLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbnptZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgdHNmbnogZnJvbSAnLi4vY29tbW9uL3RzZm56JztcbmltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcbmltcG9ydCBwaGkyeiBmcm9tICcuLi9jb21tb24vcGhpMnonO1xuaW1wb3J0IHtFUFNMTiwgSEFMRl9QSSwgRk9SVFBJfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuLyogSW5pdGlhbGl6ZSB0aGUgT2JsaXF1ZSBNZXJjYXRvciAgcHJvamVjdGlvblxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGhpcy5ub19vZmYgPSB0aGlzLm5vX29mZiB8fCBmYWxzZTtcbiAgdGhpcy5ub19yb3QgPSB0aGlzLm5vX3JvdCB8fCBmYWxzZTtcblxuICBpZiAoaXNOYU4odGhpcy5rMCkpIHtcbiAgICB0aGlzLmswID0gMTtcbiAgfVxuICB2YXIgc2lubGF0ID0gTWF0aC5zaW4odGhpcy5sYXQwKTtcbiAgdmFyIGNvc2xhdCA9IE1hdGguY29zKHRoaXMubGF0MCk7XG4gIHZhciBjb24gPSB0aGlzLmUgKiBzaW5sYXQ7XG5cbiAgdGhpcy5ibCA9IE1hdGguc3FydCgxICsgdGhpcy5lcyAvICgxIC0gdGhpcy5lcykgKiBNYXRoLnBvdyhjb3NsYXQsIDQpKTtcbiAgdGhpcy5hbCA9IHRoaXMuYSAqIHRoaXMuYmwgKiB0aGlzLmswICogTWF0aC5zcXJ0KDEgLSB0aGlzLmVzKSAvICgxIC0gY29uICogY29uKTtcbiAgdmFyIHQwID0gdHNmbnoodGhpcy5lLCB0aGlzLmxhdDAsIHNpbmxhdCk7XG4gIHZhciBkbCA9IHRoaXMuYmwgLyBjb3NsYXQgKiBNYXRoLnNxcnQoKDEgLSB0aGlzLmVzKSAvICgxIC0gY29uICogY29uKSk7XG4gIGlmIChkbCAqIGRsIDwgMSkge1xuICAgIGRsID0gMTtcbiAgfVxuICB2YXIgZmw7XG4gIHZhciBnbDtcbiAgaWYgKCFpc05hTih0aGlzLmxvbmdjKSkge1xuICAgIC8vQ2VudHJhbCBwb2ludCBhbmQgYXppbXV0aCBtZXRob2RcblxuICAgIGlmICh0aGlzLmxhdDAgPj0gMCkge1xuICAgICAgZmwgPSBkbCArIE1hdGguc3FydChkbCAqIGRsIC0gMSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZmwgPSBkbCAtIE1hdGguc3FydChkbCAqIGRsIC0gMSk7XG4gICAgfVxuICAgIHRoaXMuZWwgPSBmbCAqIE1hdGgucG93KHQwLCB0aGlzLmJsKTtcbiAgICBnbCA9IDAuNSAqIChmbCAtIDEgLyBmbCk7XG4gICAgdGhpcy5nYW1tYTAgPSBNYXRoLmFzaW4oTWF0aC5zaW4odGhpcy5hbHBoYSkgLyBkbCk7XG4gICAgdGhpcy5sb25nMCA9IHRoaXMubG9uZ2MgLSBNYXRoLmFzaW4oZ2wgKiBNYXRoLnRhbih0aGlzLmdhbW1hMCkpIC8gdGhpcy5ibDtcblxuICB9XG4gIGVsc2Uge1xuICAgIC8vMiBwb2ludHMgbWV0aG9kXG4gICAgdmFyIHQxID0gdHNmbnoodGhpcy5lLCB0aGlzLmxhdDEsIE1hdGguc2luKHRoaXMubGF0MSkpO1xuICAgIHZhciB0MiA9IHRzZm56KHRoaXMuZSwgdGhpcy5sYXQyLCBNYXRoLnNpbih0aGlzLmxhdDIpKTtcbiAgICBpZiAodGhpcy5sYXQwID49IDApIHtcbiAgICAgIHRoaXMuZWwgPSAoZGwgKyBNYXRoLnNxcnQoZGwgKiBkbCAtIDEpKSAqIE1hdGgucG93KHQwLCB0aGlzLmJsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmVsID0gKGRsIC0gTWF0aC5zcXJ0KGRsICogZGwgLSAxKSkgKiBNYXRoLnBvdyh0MCwgdGhpcy5ibCk7XG4gICAgfVxuICAgIHZhciBobCA9IE1hdGgucG93KHQxLCB0aGlzLmJsKTtcbiAgICB2YXIgbGwgPSBNYXRoLnBvdyh0MiwgdGhpcy5ibCk7XG4gICAgZmwgPSB0aGlzLmVsIC8gaGw7XG4gICAgZ2wgPSAwLjUgKiAoZmwgLSAxIC8gZmwpO1xuICAgIHZhciBqbCA9ICh0aGlzLmVsICogdGhpcy5lbCAtIGxsICogaGwpIC8gKHRoaXMuZWwgKiB0aGlzLmVsICsgbGwgKiBobCk7XG4gICAgdmFyIHBsID0gKGxsIC0gaGwpIC8gKGxsICsgaGwpO1xuICAgIHZhciBkbG9uMTIgPSBhZGp1c3RfbG9uKHRoaXMubG9uZzEgLSB0aGlzLmxvbmcyKTtcbiAgICB0aGlzLmxvbmcwID0gMC41ICogKHRoaXMubG9uZzEgKyB0aGlzLmxvbmcyKSAtIE1hdGguYXRhbihqbCAqIE1hdGgudGFuKDAuNSAqIHRoaXMuYmwgKiAoZGxvbjEyKSkgLyBwbCkgLyB0aGlzLmJsO1xuICAgIHRoaXMubG9uZzAgPSBhZGp1c3RfbG9uKHRoaXMubG9uZzApO1xuICAgIHZhciBkbG9uMTAgPSBhZGp1c3RfbG9uKHRoaXMubG9uZzEgLSB0aGlzLmxvbmcwKTtcbiAgICB0aGlzLmdhbW1hMCA9IE1hdGguYXRhbihNYXRoLnNpbih0aGlzLmJsICogKGRsb24xMCkpIC8gZ2wpO1xuICAgIHRoaXMuYWxwaGEgPSBNYXRoLmFzaW4oZGwgKiBNYXRoLnNpbih0aGlzLmdhbW1hMCkpO1xuICB9XG5cbiAgaWYgKHRoaXMubm9fb2ZmKSB7XG4gICAgdGhpcy51YyA9IDA7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHRoaXMubGF0MCA+PSAwKSB7XG4gICAgICB0aGlzLnVjID0gdGhpcy5hbCAvIHRoaXMuYmwgKiBNYXRoLmF0YW4yKE1hdGguc3FydChkbCAqIGRsIC0gMSksIE1hdGguY29zKHRoaXMuYWxwaGEpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnVjID0gLTEgKiB0aGlzLmFsIC8gdGhpcy5ibCAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGRsICogZGwgLSAxKSwgTWF0aC5jb3ModGhpcy5hbHBoYSkpO1xuICAgIH1cbiAgfVxuXG59XG5cbi8qIE9ibGlxdWUgTWVyY2F0b3IgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG4gIHZhciBkbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgdmFyIHVzLCB2cztcbiAgdmFyIGNvbjtcbiAgaWYgKE1hdGguYWJzKE1hdGguYWJzKGxhdCkgLSBIQUxGX1BJKSA8PSBFUFNMTikge1xuICAgIGlmIChsYXQgPiAwKSB7XG4gICAgICBjb24gPSAtMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb24gPSAxO1xuICAgIH1cbiAgICB2cyA9IHRoaXMuYWwgLyB0aGlzLmJsICogTWF0aC5sb2coTWF0aC50YW4oRk9SVFBJICsgY29uICogdGhpcy5nYW1tYTAgKiAwLjUpKTtcbiAgICB1cyA9IC0xICogY29uICogSEFMRl9QSSAqIHRoaXMuYWwgLyB0aGlzLmJsO1xuICB9XG4gIGVsc2Uge1xuICAgIHZhciB0ID0gdHNmbnoodGhpcy5lLCBsYXQsIE1hdGguc2luKGxhdCkpO1xuICAgIHZhciBxbCA9IHRoaXMuZWwgLyBNYXRoLnBvdyh0LCB0aGlzLmJsKTtcbiAgICB2YXIgc2wgPSAwLjUgKiAocWwgLSAxIC8gcWwpO1xuICAgIHZhciB0bCA9IDAuNSAqIChxbCArIDEgLyBxbCk7XG4gICAgdmFyIHZsID0gTWF0aC5zaW4odGhpcy5ibCAqIChkbG9uKSk7XG4gICAgdmFyIHVsID0gKHNsICogTWF0aC5zaW4odGhpcy5nYW1tYTApIC0gdmwgKiBNYXRoLmNvcyh0aGlzLmdhbW1hMCkpIC8gdGw7XG4gICAgaWYgKE1hdGguYWJzKE1hdGguYWJzKHVsKSAtIDEpIDw9IEVQU0xOKSB7XG4gICAgICB2cyA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2cyA9IDAuNSAqIHRoaXMuYWwgKiBNYXRoLmxvZygoMSAtIHVsKSAvICgxICsgdWwpKSAvIHRoaXMuYmw7XG4gICAgfVxuICAgIGlmIChNYXRoLmFicyhNYXRoLmNvcyh0aGlzLmJsICogKGRsb24pKSkgPD0gRVBTTE4pIHtcbiAgICAgIHVzID0gdGhpcy5hbCAqIHRoaXMuYmwgKiAoZGxvbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdXMgPSB0aGlzLmFsICogTWF0aC5hdGFuMihzbCAqIE1hdGguY29zKHRoaXMuZ2FtbWEwKSArIHZsICogTWF0aC5zaW4odGhpcy5nYW1tYTApLCBNYXRoLmNvcyh0aGlzLmJsICogZGxvbikpIC8gdGhpcy5ibDtcbiAgICB9XG4gIH1cblxuICBpZiAodGhpcy5ub19yb3QpIHtcbiAgICBwLnggPSB0aGlzLngwICsgdXM7XG4gICAgcC55ID0gdGhpcy55MCArIHZzO1xuICB9XG4gIGVsc2Uge1xuXG4gICAgdXMgLT0gdGhpcy51YztcbiAgICBwLnggPSB0aGlzLngwICsgdnMgKiBNYXRoLmNvcyh0aGlzLmFscGhhKSArIHVzICogTWF0aC5zaW4odGhpcy5hbHBoYSk7XG4gICAgcC55ID0gdGhpcy55MCArIHVzICogTWF0aC5jb3ModGhpcy5hbHBoYSkgLSB2cyAqIE1hdGguc2luKHRoaXMuYWxwaGEpO1xuICB9XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHZhciB1cywgdnM7XG4gIGlmICh0aGlzLm5vX3JvdCkge1xuICAgIHZzID0gcC55IC0gdGhpcy55MDtcbiAgICB1cyA9IHAueCAtIHRoaXMueDA7XG4gIH1cbiAgZWxzZSB7XG4gICAgdnMgPSAocC54IC0gdGhpcy54MCkgKiBNYXRoLmNvcyh0aGlzLmFscGhhKSAtIChwLnkgLSB0aGlzLnkwKSAqIE1hdGguc2luKHRoaXMuYWxwaGEpO1xuICAgIHVzID0gKHAueSAtIHRoaXMueTApICogTWF0aC5jb3ModGhpcy5hbHBoYSkgKyAocC54IC0gdGhpcy54MCkgKiBNYXRoLnNpbih0aGlzLmFscGhhKTtcbiAgICB1cyArPSB0aGlzLnVjO1xuICB9XG4gIHZhciBxcCA9IE1hdGguZXhwKC0xICogdGhpcy5ibCAqIHZzIC8gdGhpcy5hbCk7XG4gIHZhciBzcCA9IDAuNSAqIChxcCAtIDEgLyBxcCk7XG4gIHZhciB0cCA9IDAuNSAqIChxcCArIDEgLyBxcCk7XG4gIHZhciB2cCA9IE1hdGguc2luKHRoaXMuYmwgKiB1cyAvIHRoaXMuYWwpO1xuICB2YXIgdXAgPSAodnAgKiBNYXRoLmNvcyh0aGlzLmdhbW1hMCkgKyBzcCAqIE1hdGguc2luKHRoaXMuZ2FtbWEwKSkgLyB0cDtcbiAgdmFyIHRzID0gTWF0aC5wb3codGhpcy5lbCAvIE1hdGguc3FydCgoMSArIHVwKSAvICgxIC0gdXApKSwgMSAvIHRoaXMuYmwpO1xuICBpZiAoTWF0aC5hYnModXAgLSAxKSA8IEVQU0xOKSB7XG4gICAgcC54ID0gdGhpcy5sb25nMDtcbiAgICBwLnkgPSBIQUxGX1BJO1xuICB9XG4gIGVsc2UgaWYgKE1hdGguYWJzKHVwICsgMSkgPCBFUFNMTikge1xuICAgIHAueCA9IHRoaXMubG9uZzA7XG4gICAgcC55ID0gLTEgKiBIQUxGX1BJO1xuICB9XG4gIGVsc2Uge1xuICAgIHAueSA9IHBoaTJ6KHRoaXMuZSwgdHMpO1xuICAgIHAueCA9IGFkanVzdF9sb24odGhpcy5sb25nMCAtIE1hdGguYXRhbjIoc3AgKiBNYXRoLmNvcyh0aGlzLmdhbW1hMCkgLSB2cCAqIE1hdGguc2luKHRoaXMuZ2FtbWEwKSwgTWF0aC5jb3ModGhpcy5ibCAqIHVzIC8gdGhpcy5hbCkpIC8gdGhpcy5ibCk7XG4gIH1cbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJIb3RpbmVfT2JsaXF1ZV9NZXJjYXRvclwiLCBcIkhvdGluZSBPYmxpcXVlIE1lcmNhdG9yXCIsIFwiSG90aW5lX09ibGlxdWVfTWVyY2F0b3JfQXppbXV0aF9OYXR1cmFsX09yaWdpblwiLCBcIkhvdGluZV9PYmxpcXVlX01lcmNhdG9yX0F6aW11dGhfQ2VudGVyXCIsIFwib21lcmNcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9vbWVyYy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL29tZXJjLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcbmltcG9ydCBhc2lueiBmcm9tICcuLi9jb21tb24vYXNpbnonO1xuaW1wb3J0IHtFUFNMTiwgSEFMRl9QSX0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAvL2RvdWJsZSB0ZW1wOyAgICAgIC8qIHRlbXBvcmFyeSB2YXJpYWJsZSAgICAqL1xuXG4gIC8qIFBsYWNlIHBhcmFtZXRlcnMgaW4gc3RhdGljIHN0b3JhZ2UgZm9yIGNvbW1vbiB1c2VcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICB0aGlzLnNpbl9wMTQgPSBNYXRoLnNpbih0aGlzLmxhdDApO1xuICB0aGlzLmNvc19wMTQgPSBNYXRoLmNvcyh0aGlzLmxhdDApO1xufVxuXG4vKiBPcnRob2dyYXBoaWMgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKHApIHtcbiAgdmFyIHNpbnBoaSwgY29zcGhpOyAvKiBzaW4gYW5kIGNvcyB2YWx1ZSAgICAgICAgKi9cbiAgdmFyIGRsb247IC8qIGRlbHRhIGxvbmdpdHVkZSB2YWx1ZSAgICAgICovXG4gIHZhciBjb3Nsb247IC8qIGNvcyBvZiBsb25naXR1ZGUgICAgICAgICovXG4gIHZhciBrc3A7IC8qIHNjYWxlIGZhY3RvciAgICAgICAgICAqL1xuICB2YXIgZywgeCwgeTtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcbiAgLyogRm9yd2FyZCBlcXVhdGlvbnNcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgZGxvbiA9IGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG5cbiAgc2lucGhpID0gTWF0aC5zaW4obGF0KTtcbiAgY29zcGhpID0gTWF0aC5jb3MobGF0KTtcblxuICBjb3Nsb24gPSBNYXRoLmNvcyhkbG9uKTtcbiAgZyA9IHRoaXMuc2luX3AxNCAqIHNpbnBoaSArIHRoaXMuY29zX3AxNCAqIGNvc3BoaSAqIGNvc2xvbjtcbiAga3NwID0gMTtcbiAgaWYgKChnID4gMCkgfHwgKE1hdGguYWJzKGcpIDw9IEVQU0xOKSkge1xuICAgIHggPSB0aGlzLmEgKiBrc3AgKiBjb3NwaGkgKiBNYXRoLnNpbihkbG9uKTtcbiAgICB5ID0gdGhpcy55MCArIHRoaXMuYSAqIGtzcCAqICh0aGlzLmNvc19wMTQgKiBzaW5waGkgLSB0aGlzLnNpbl9wMTQgKiBjb3NwaGkgKiBjb3Nsb24pO1xuICB9XG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHZhciByaDsgLyogaGVpZ2h0IGFib3ZlIGVsbGlwc29pZCAgICAgICovXG4gIHZhciB6OyAvKiBhbmdsZSAgICAgICAgICAqL1xuICB2YXIgc2lueiwgY29zejsgLyogc2luIG9mIHogYW5kIGNvcyBvZiB6ICAgICAgKi9cbiAgdmFyIGNvbjtcbiAgdmFyIGxvbiwgbGF0O1xuICAvKiBJbnZlcnNlIGVxdWF0aW9uc1xuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBwLnggLT0gdGhpcy54MDtcbiAgcC55IC09IHRoaXMueTA7XG4gIHJoID0gTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSk7XG4gIHogPSBhc2lueihyaCAvIHRoaXMuYSk7XG5cbiAgc2lueiA9IE1hdGguc2luKHopO1xuICBjb3N6ID0gTWF0aC5jb3Moeik7XG5cbiAgbG9uID0gdGhpcy5sb25nMDtcbiAgaWYgKE1hdGguYWJzKHJoKSA8PSBFUFNMTikge1xuICAgIGxhdCA9IHRoaXMubGF0MDtcbiAgICBwLnggPSBsb247XG4gICAgcC55ID0gbGF0O1xuICAgIHJldHVybiBwO1xuICB9XG4gIGxhdCA9IGFzaW56KGNvc3ogKiB0aGlzLnNpbl9wMTQgKyAocC55ICogc2lueiAqIHRoaXMuY29zX3AxNCkgLyByaCk7XG4gIGNvbiA9IE1hdGguYWJzKHRoaXMubGF0MCkgLSBIQUxGX1BJO1xuICBpZiAoTWF0aC5hYnMoY29uKSA8PSBFUFNMTikge1xuICAgIGlmICh0aGlzLmxhdDAgPj0gMCkge1xuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMihwLngsIC0gcC55KSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwIC0gTWF0aC5hdGFuMigtcC54LCBwLnkpKTtcbiAgICB9XG4gICAgcC54ID0gbG9uO1xuICAgIHAueSA9IGxhdDtcbiAgICByZXR1cm4gcDtcbiAgfVxuICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBNYXRoLmF0YW4yKChwLnggKiBzaW56KSwgcmggKiB0aGlzLmNvc19wMTQgKiBjb3N6IC0gcC55ICogdGhpcy5zaW5fcDE0ICogc2lueikpO1xuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJvcnRob1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL29ydGhvLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvb3J0aG8uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGUwZm4gZnJvbSAnLi4vY29tbW9uL2UwZm4nO1xuaW1wb3J0IGUxZm4gZnJvbSAnLi4vY29tbW9uL2UxZm4nO1xuaW1wb3J0IGUyZm4gZnJvbSAnLi4vY29tbW9uL2UyZm4nO1xuaW1wb3J0IGUzZm4gZnJvbSAnLi4vY29tbW9uL2UzZm4nO1xuaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuaW1wb3J0IGFkanVzdF9sYXQgZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sYXQnO1xuaW1wb3J0IG1sZm4gZnJvbSAnLi4vY29tbW9uL21sZm4nO1xuaW1wb3J0IHtFUFNMTn0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbmltcG9ydCBnTiBmcm9tICcuLi9jb21tb24vZ04nO1xudmFyIE1BWF9JVEVSID0gMjA7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAvKiBQbGFjZSBwYXJhbWV0ZXJzIGluIHN0YXRpYyBzdG9yYWdlIGZvciBjb21tb24gdXNlXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgdGhpcy50ZW1wID0gdGhpcy5iIC8gdGhpcy5hO1xuICB0aGlzLmVzID0gMSAtIE1hdGgucG93KHRoaXMudGVtcCwgMik7IC8vIGRldmFpdCBldHJlIGRhbnMgdG1lcmMuanMgbWFpcyBuIHkgZXN0IHBhcyBkb25jIGplIGNvbW1lbnRlIHNpbm9uIHJldG91ciBkZSB2YWxldXJzIG51bGxlc1xuICB0aGlzLmUgPSBNYXRoLnNxcnQodGhpcy5lcyk7XG4gIHRoaXMuZTAgPSBlMGZuKHRoaXMuZXMpO1xuICB0aGlzLmUxID0gZTFmbih0aGlzLmVzKTtcbiAgdGhpcy5lMiA9IGUyZm4odGhpcy5lcyk7XG4gIHRoaXMuZTMgPSBlM2ZuKHRoaXMuZXMpO1xuICB0aGlzLm1sMCA9IHRoaXMuYSAqIG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgdGhpcy5sYXQwKTsgLy9zaSBxdWUgZGVzIHplcm9zIGxlIGNhbGN1bCBuZSBzZSBmYWl0IHBhc1xufVxuXG4vKiBQb2x5Y29uaWMgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKHApIHtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcbiAgdmFyIHgsIHksIGVsO1xuICB2YXIgZGxvbiA9IGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG4gIGVsID0gZGxvbiAqIE1hdGguc2luKGxhdCk7XG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIGlmIChNYXRoLmFicyhsYXQpIDw9IEVQU0xOKSB7XG4gICAgICB4ID0gdGhpcy5hICogZGxvbjtcbiAgICAgIHkgPSAtMSAqIHRoaXMuYSAqIHRoaXMubGF0MDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB4ID0gdGhpcy5hICogTWF0aC5zaW4oZWwpIC8gTWF0aC50YW4obGF0KTtcbiAgICAgIHkgPSB0aGlzLmEgKiAoYWRqdXN0X2xhdChsYXQgLSB0aGlzLmxhdDApICsgKDEgLSBNYXRoLmNvcyhlbCkpIC8gTWF0aC50YW4obGF0KSk7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGlmIChNYXRoLmFicyhsYXQpIDw9IEVQU0xOKSB7XG4gICAgICB4ID0gdGhpcy5hICogZGxvbjtcbiAgICAgIHkgPSAtMSAqIHRoaXMubWwwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBubCA9IGdOKHRoaXMuYSwgdGhpcy5lLCBNYXRoLnNpbihsYXQpKSAvIE1hdGgudGFuKGxhdCk7XG4gICAgICB4ID0gbmwgKiBNYXRoLnNpbihlbCk7XG4gICAgICB5ID0gdGhpcy5hICogbWxmbih0aGlzLmUwLCB0aGlzLmUxLCB0aGlzLmUyLCB0aGlzLmUzLCBsYXQpIC0gdGhpcy5tbDAgKyBubCAqICgxIC0gTWF0aC5jb3MoZWwpKTtcbiAgICB9XG5cbiAgfVxuICBwLnggPSB4ICsgdGhpcy54MDtcbiAgcC55ID0geSArIHRoaXMueTA7XG4gIHJldHVybiBwO1xufVxuXG4vKiBJbnZlcnNlIGVxdWF0aW9uc1xuICAtLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHZhciBsb24sIGxhdCwgeCwgeSwgaTtcbiAgdmFyIGFsLCBibDtcbiAgdmFyIHBoaSwgZHBoaTtcbiAgeCA9IHAueCAtIHRoaXMueDA7XG4gIHkgPSBwLnkgLSB0aGlzLnkwO1xuXG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIGlmIChNYXRoLmFicyh5ICsgdGhpcy5hICogdGhpcy5sYXQwKSA8PSBFUFNMTikge1xuICAgICAgbG9uID0gYWRqdXN0X2xvbih4IC8gdGhpcy5hICsgdGhpcy5sb25nMCk7XG4gICAgICBsYXQgPSAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGFsID0gdGhpcy5sYXQwICsgeSAvIHRoaXMuYTtcbiAgICAgIGJsID0geCAqIHggLyB0aGlzLmEgLyB0aGlzLmEgKyBhbCAqIGFsO1xuICAgICAgcGhpID0gYWw7XG4gICAgICB2YXIgdGFucGhpO1xuICAgICAgZm9yIChpID0gTUFYX0lURVI7IGk7IC0taSkge1xuICAgICAgICB0YW5waGkgPSBNYXRoLnRhbihwaGkpO1xuICAgICAgICBkcGhpID0gLTEgKiAoYWwgKiAocGhpICogdGFucGhpICsgMSkgLSBwaGkgLSAwLjUgKiAocGhpICogcGhpICsgYmwpICogdGFucGhpKSAvICgocGhpIC0gYWwpIC8gdGFucGhpIC0gMSk7XG4gICAgICAgIHBoaSArPSBkcGhpO1xuICAgICAgICBpZiAoTWF0aC5hYnMoZHBoaSkgPD0gRVBTTE4pIHtcbiAgICAgICAgICBsYXQgPSBwaGk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIChNYXRoLmFzaW4oeCAqIE1hdGgudGFuKHBoaSkgLyB0aGlzLmEpKSAvIE1hdGguc2luKGxhdCkpO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoTWF0aC5hYnMoeSArIHRoaXMubWwwKSA8PSBFUFNMTikge1xuICAgICAgbGF0ID0gMDtcbiAgICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIHggLyB0aGlzLmEpO1xuICAgIH1cbiAgICBlbHNlIHtcblxuICAgICAgYWwgPSAodGhpcy5tbDAgKyB5KSAvIHRoaXMuYTtcbiAgICAgIGJsID0geCAqIHggLyB0aGlzLmEgLyB0aGlzLmEgKyBhbCAqIGFsO1xuICAgICAgcGhpID0gYWw7XG4gICAgICB2YXIgY2wsIG1sbiwgbWxucCwgbWE7XG4gICAgICB2YXIgY29uO1xuICAgICAgZm9yIChpID0gTUFYX0lURVI7IGk7IC0taSkge1xuICAgICAgICBjb24gPSB0aGlzLmUgKiBNYXRoLnNpbihwaGkpO1xuICAgICAgICBjbCA9IE1hdGguc3FydCgxIC0gY29uICogY29uKSAqIE1hdGgudGFuKHBoaSk7XG4gICAgICAgIG1sbiA9IHRoaXMuYSAqIG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgcGhpKTtcbiAgICAgICAgbWxucCA9IHRoaXMuZTAgLSAyICogdGhpcy5lMSAqIE1hdGguY29zKDIgKiBwaGkpICsgNCAqIHRoaXMuZTIgKiBNYXRoLmNvcyg0ICogcGhpKSAtIDYgKiB0aGlzLmUzICogTWF0aC5jb3MoNiAqIHBoaSk7XG4gICAgICAgIG1hID0gbWxuIC8gdGhpcy5hO1xuICAgICAgICBkcGhpID0gKGFsICogKGNsICogbWEgKyAxKSAtIG1hIC0gMC41ICogY2wgKiAobWEgKiBtYSArIGJsKSkgLyAodGhpcy5lcyAqIE1hdGguc2luKDIgKiBwaGkpICogKG1hICogbWEgKyBibCAtIDIgKiBhbCAqIG1hKSAvICg0ICogY2wpICsgKGFsIC0gbWEpICogKGNsICogbWxucCAtIDIgLyBNYXRoLnNpbigyICogcGhpKSkgLSBtbG5wKTtcbiAgICAgICAgcGhpIC09IGRwaGk7XG4gICAgICAgIGlmIChNYXRoLmFicyhkcGhpKSA8PSBFUFNMTikge1xuICAgICAgICAgIGxhdCA9IHBoaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL2xhdD1waGk0eih0aGlzLmUsdGhpcy5lMCx0aGlzLmUxLHRoaXMuZTIsdGhpcy5lMyxhbCxibCwwLDApO1xuICAgICAgY2wgPSBNYXRoLnNxcnQoMSAtIHRoaXMuZXMgKiBNYXRoLnBvdyhNYXRoLnNpbihsYXQpLCAyKSkgKiBNYXRoLnRhbihsYXQpO1xuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hc2luKHggKiBjbCAvIHRoaXMuYSkgLyBNYXRoLnNpbihsYXQpKTtcbiAgICB9XG4gIH1cblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJQb2x5Y29uaWNcIiwgXCJwb2x5XCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvcG9seS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3BvbHkuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gUVNDIHByb2plY3Rpb24gcmV3cml0dGVuIGZyb20gdGhlIG9yaWdpbmFsIFBST0o0XG4vLyBodHRwczovL2dpdGh1Yi5jb20vT1NHZW8vcHJvai40L2Jsb2IvbWFzdGVyL3NyYy9QSl9xc2MuY1xuXG5pbXBvcnQge0VQU0xOLCBUV09fUEksIFNQSSwgSEFMRl9QSSwgRk9SVFBJfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuLyogY29uc3RhbnRzICovXG52YXIgRkFDRV9FTlVNID0ge1xuICAgIEZST05UOiAxLFxuICAgIFJJR0hUOiAyLFxuICAgIEJBQ0s6IDMsXG4gICAgTEVGVDogNCxcbiAgICBUT1A6IDUsXG4gICAgQk9UVE9NOiA2XG59O1xuXG52YXIgQVJFQV9FTlVNID0ge1xuICAgIEFSRUFfMDogMSxcbiAgICBBUkVBXzE6IDIsXG4gICAgQVJFQV8yOiAzLFxuICAgIEFSRUFfMzogNFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgdGhpcy54MCA9IHRoaXMueDAgfHwgMDtcbiAgdGhpcy55MCA9IHRoaXMueTAgfHwgMDtcbiAgdGhpcy5sYXQwID0gdGhpcy5sYXQwIHx8IDA7XG4gIHRoaXMubG9uZzAgPSB0aGlzLmxvbmcwIHx8IDA7XG4gIHRoaXMubGF0X3RzID0gdGhpcy5sYXRfdHMgfHwgMDtcbiAgdGhpcy50aXRsZSA9IHRoaXMudGl0bGUgfHwgXCJRdWFkcmlsYXRlcmFsaXplZCBTcGhlcmljYWwgQ3ViZVwiO1xuXG4gIC8qIERldGVybWluZSB0aGUgY3ViZSBmYWNlIGZyb20gdGhlIGNlbnRlciBvZiBwcm9qZWN0aW9uLiAqL1xuICBpZiAodGhpcy5sYXQwID49IEhBTEZfUEkgLSBGT1JUUEkgLyAyLjApIHtcbiAgICB0aGlzLmZhY2UgPSBGQUNFX0VOVU0uVE9QO1xuICB9IGVsc2UgaWYgKHRoaXMubGF0MCA8PSAtKEhBTEZfUEkgLSBGT1JUUEkgLyAyLjApKSB7XG4gICAgdGhpcy5mYWNlID0gRkFDRV9FTlVNLkJPVFRPTTtcbiAgfSBlbHNlIGlmIChNYXRoLmFicyh0aGlzLmxvbmcwKSA8PSBGT1JUUEkpIHtcbiAgICB0aGlzLmZhY2UgPSBGQUNFX0VOVU0uRlJPTlQ7XG4gIH0gZWxzZSBpZiAoTWF0aC5hYnModGhpcy5sb25nMCkgPD0gSEFMRl9QSSArIEZPUlRQSSkge1xuICAgIHRoaXMuZmFjZSA9IHRoaXMubG9uZzAgPiAwLjAgPyBGQUNFX0VOVU0uUklHSFQgOiBGQUNFX0VOVU0uTEVGVDtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmZhY2UgPSBGQUNFX0VOVU0uQkFDSztcbiAgfVxuXG4gIC8qIEZpbGwgaW4gdXNlZnVsIHZhbHVlcyBmb3IgdGhlIGVsbGlwc29pZCA8LT4gc3BoZXJlIHNoaWZ0XG4gICAqIGRlc2NyaWJlZCBpbiBbTEsxMl0uICovXG4gIGlmICh0aGlzLmVzICE9PSAwKSB7XG4gICAgdGhpcy5vbmVfbWludXNfZiA9IDEgLSAodGhpcy5hIC0gdGhpcy5iKSAvIHRoaXMuYTtcbiAgICB0aGlzLm9uZV9taW51c19mX3NxdWFyZWQgPSB0aGlzLm9uZV9taW51c19mICogdGhpcy5vbmVfbWludXNfZjtcbiAgfVxufVxuXG4vLyBRU0MgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgeHkgPSB7eDogMCwgeTogMH07XG4gIHZhciBsYXQsIGxvbjtcbiAgdmFyIHRoZXRhLCBwaGk7XG4gIHZhciB0LCBtdTtcbiAgLyogbnU7ICovXG4gIHZhciBhcmVhID0ge3ZhbHVlOiAwfTtcblxuICAvLyBtb3ZlIGxvbiBhY2NvcmRpbmcgdG8gcHJvamVjdGlvbidzIGxvblxuICBwLnggLT0gdGhpcy5sb25nMDtcblxuICAvKiBDb252ZXJ0IHRoZSBnZW9kZXRpYyBsYXRpdHVkZSB0byBhIGdlb2NlbnRyaWMgbGF0aXR1ZGUuXG4gICAqIFRoaXMgY29ycmVzcG9uZHMgdG8gdGhlIHNoaWZ0IGZyb20gdGhlIGVsbGlwc29pZCB0byB0aGUgc3BoZXJlXG4gICAqIGRlc2NyaWJlZCBpbiBbTEsxMl0uICovXG4gIGlmICh0aGlzLmVzICE9PSAwKSB7Ly9pZiAoUC0+ZXMgIT0gMCkge1xuICAgIGxhdCA9IE1hdGguYXRhbih0aGlzLm9uZV9taW51c19mX3NxdWFyZWQgKiBNYXRoLnRhbihwLnkpKTtcbiAgfSBlbHNlIHtcbiAgICBsYXQgPSBwLnk7XG4gIH1cblxuICAvKiBDb252ZXJ0IHRoZSBpbnB1dCBsYXQsIGxvbiBpbnRvIHRoZXRhLCBwaGkgYXMgdXNlZCBieSBRU0MuXG4gICAqIFRoaXMgZGVwZW5kcyBvbiB0aGUgY3ViZSBmYWNlIGFuZCB0aGUgYXJlYSBvbiBpdC5cbiAgICogRm9yIHRoZSB0b3AgYW5kIGJvdHRvbSBmYWNlLCB3ZSBjYW4gY29tcHV0ZSB0aGV0YSBhbmQgcGhpXG4gICAqIGRpcmVjdGx5IGZyb20gcGhpLCBsYW0uIEZvciB0aGUgb3RoZXIgZmFjZXMsIHdlIG11c3QgdXNlXG4gICAqIHVuaXQgc3BoZXJlIGNhcnRlc2lhbiBjb29yZGluYXRlcyBhcyBhbiBpbnRlcm1lZGlhdGUgc3RlcC4gKi9cbiAgbG9uID0gcC54OyAvL2xvbiA9IGxwLmxhbTtcbiAgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLlRPUCkge1xuICAgIHBoaSA9IEhBTEZfUEkgLSBsYXQ7XG4gICAgaWYgKGxvbiA+PSBGT1JUUEkgJiYgbG9uIDw9IEhBTEZfUEkgKyBGT1JUUEkpIHtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8wO1xuICAgICAgdGhldGEgPSBsb24gLSBIQUxGX1BJO1xuICAgIH0gZWxzZSBpZiAobG9uID4gSEFMRl9QSSArIEZPUlRQSSB8fCBsb24gPD0gLShIQUxGX1BJICsgRk9SVFBJKSkge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzE7XG4gICAgICB0aGV0YSA9IChsb24gPiAwLjAgPyBsb24gLSBTUEkgOiBsb24gKyBTUEkpO1xuICAgIH0gZWxzZSBpZiAobG9uID4gLShIQUxGX1BJICsgRk9SVFBJKSAmJiBsb24gPD0gLUZPUlRQSSkge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzI7XG4gICAgICB0aGV0YSA9IGxvbiArIEhBTEZfUEk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8zO1xuICAgICAgdGhldGEgPSBsb247XG4gICAgfVxuICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkJPVFRPTSkge1xuICAgIHBoaSA9IEhBTEZfUEkgKyBsYXQ7XG4gICAgaWYgKGxvbiA+PSBGT1JUUEkgJiYgbG9uIDw9IEhBTEZfUEkgKyBGT1JUUEkpIHtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8wO1xuICAgICAgdGhldGEgPSAtbG9uICsgSEFMRl9QSTtcbiAgICB9IGVsc2UgaWYgKGxvbiA8IEZPUlRQSSAmJiBsb24gPj0gLUZPUlRQSSkge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzE7XG4gICAgICB0aGV0YSA9IC1sb247XG4gICAgfSBlbHNlIGlmIChsb24gPCAtRk9SVFBJICYmIGxvbiA+PSAtKEhBTEZfUEkgKyBGT1JUUEkpKSB7XG4gICAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMjtcbiAgICAgIHRoZXRhID0gLWxvbiAtIEhBTEZfUEk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8zO1xuICAgICAgdGhldGEgPSAobG9uID4gMC4wID8gLWxvbiArIFNQSSA6IC1sb24gLSBTUEkpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgcSwgciwgcztcbiAgICB2YXIgc2lubGF0LCBjb3NsYXQ7XG4gICAgdmFyIHNpbmxvbiwgY29zbG9uO1xuXG4gICAgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLlJJR0hUKSB7XG4gICAgICBsb24gPSBxc2Nfc2hpZnRfbG9uX29yaWdpbihsb24sICtIQUxGX1BJKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkJBQ0spIHtcbiAgICAgIGxvbiA9IHFzY19zaGlmdF9sb25fb3JpZ2luKGxvbiwgK1NQSSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZhY2UgPT09IEZBQ0VfRU5VTS5MRUZUKSB7XG4gICAgICBsb24gPSBxc2Nfc2hpZnRfbG9uX29yaWdpbihsb24sIC1IQUxGX1BJKTtcbiAgICB9XG4gICAgc2lubGF0ID0gTWF0aC5zaW4obGF0KTtcbiAgICBjb3NsYXQgPSBNYXRoLmNvcyhsYXQpO1xuICAgIHNpbmxvbiA9IE1hdGguc2luKGxvbik7XG4gICAgY29zbG9uID0gTWF0aC5jb3MobG9uKTtcbiAgICBxID0gY29zbGF0ICogY29zbG9uO1xuICAgIHIgPSBjb3NsYXQgKiBzaW5sb247XG4gICAgcyA9IHNpbmxhdDtcblxuICAgIGlmICh0aGlzLmZhY2UgPT09IEZBQ0VfRU5VTS5GUk9OVCkge1xuICAgICAgcGhpID0gTWF0aC5hY29zKHEpO1xuICAgICAgdGhldGEgPSBxc2NfZndkX2VxdWF0X2ZhY2VfdGhldGEocGhpLCBzLCByLCBhcmVhKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLlJJR0hUKSB7XG4gICAgICBwaGkgPSBNYXRoLmFjb3Mocik7XG4gICAgICB0aGV0YSA9IHFzY19md2RfZXF1YXRfZmFjZV90aGV0YShwaGksIHMsIC1xLCBhcmVhKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkJBQ0spIHtcbiAgICAgIHBoaSA9IE1hdGguYWNvcygtcSk7XG4gICAgICB0aGV0YSA9IHFzY19md2RfZXF1YXRfZmFjZV90aGV0YShwaGksIHMsIC1yLCBhcmVhKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkxFRlQpIHtcbiAgICAgIHBoaSA9IE1hdGguYWNvcygtcik7XG4gICAgICB0aGV0YSA9IHFzY19md2RfZXF1YXRfZmFjZV90aGV0YShwaGksIHMsIHEsIGFyZWEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiBJbXBvc3NpYmxlICovXG4gICAgICBwaGkgPSB0aGV0YSA9IDA7XG4gICAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMDtcbiAgICB9XG4gIH1cblxuICAvKiBDb21wdXRlIG11IGFuZCBudSBmb3IgdGhlIGFyZWEgb2YgZGVmaW5pdGlvbi5cbiAgICogRm9yIG11LCBzZWUgRXEuICgzLTIxKSBpbiBbT0w3Nl0sIGJ1dCBub3RlIHRoZSB0eXBvczpcbiAgICogY29tcGFyZSB3aXRoIEVxLiAoMy0xNCkuIEZvciBudSwgc2VlIEVxLiAoMy0zOCkuICovXG4gIG11ID0gTWF0aC5hdGFuKCgxMiAvIFNQSSkgKiAodGhldGEgKyBNYXRoLmFjb3MoTWF0aC5zaW4odGhldGEpICogTWF0aC5jb3MoRk9SVFBJKSkgLSBIQUxGX1BJKSk7XG4gIHQgPSBNYXRoLnNxcnQoKDEgLSBNYXRoLmNvcyhwaGkpKSAvIChNYXRoLmNvcyhtdSkgKiBNYXRoLmNvcyhtdSkpIC8gKDEgLSBNYXRoLmNvcyhNYXRoLmF0YW4oMSAvIE1hdGguY29zKHRoZXRhKSkpKSk7XG5cbiAgLyogQXBwbHkgdGhlIHJlc3VsdCB0byB0aGUgcmVhbCBhcmVhLiAqL1xuICBpZiAoYXJlYS52YWx1ZSA9PT0gQVJFQV9FTlVNLkFSRUFfMSkge1xuICAgIG11ICs9IEhBTEZfUEk7XG4gIH0gZWxzZSBpZiAoYXJlYS52YWx1ZSA9PT0gQVJFQV9FTlVNLkFSRUFfMikge1xuICAgIG11ICs9IFNQSTtcbiAgfSBlbHNlIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8zKSB7XG4gICAgbXUgKz0gMS41ICogU1BJO1xuICB9XG5cbiAgLyogTm93IGNvbXB1dGUgeCwgeSBmcm9tIG11IGFuZCBudSAqL1xuICB4eS54ID0gdCAqIE1hdGguY29zKG11KTtcbiAgeHkueSA9IHQgKiBNYXRoLnNpbihtdSk7XG4gIHh5LnggPSB4eS54ICogdGhpcy5hICsgdGhpcy54MDtcbiAgeHkueSA9IHh5LnkgKiB0aGlzLmEgKyB0aGlzLnkwO1xuXG4gIHAueCA9IHh5Lng7XG4gIHAueSA9IHh5Lnk7XG4gIHJldHVybiBwO1xufVxuXG4vLyBRU0MgaW52ZXJzZSBlcXVhdGlvbnMtLW1hcHBpbmcgeCx5IHRvIGxhdC9sb25nXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuICB2YXIgbHAgPSB7bGFtOiAwLCBwaGk6IDB9O1xuICB2YXIgbXUsIG51LCBjb3NtdSwgdGFubnU7XG4gIHZhciB0YW50aGV0YSwgdGhldGEsIGNvc3BoaSwgcGhpO1xuICB2YXIgdDtcbiAgdmFyIGFyZWEgPSB7dmFsdWU6IDB9O1xuXG4gIC8qIGRlLW9mZnNldCAqL1xuICBwLnggPSAocC54IC0gdGhpcy54MCkgLyB0aGlzLmE7XG4gIHAueSA9IChwLnkgLSB0aGlzLnkwKSAvIHRoaXMuYTtcblxuICAvKiBDb252ZXJ0IHRoZSBpbnB1dCB4LCB5IHRvIHRoZSBtdSBhbmQgbnUgYW5nbGVzIGFzIHVzZWQgYnkgUVNDLlxuICAgKiBUaGlzIGRlcGVuZHMgb24gdGhlIGFyZWEgb2YgdGhlIGN1YmUgZmFjZS4gKi9cbiAgbnUgPSBNYXRoLmF0YW4oTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSkpO1xuICBtdSA9IE1hdGguYXRhbjIocC55LCBwLngpO1xuICBpZiAocC54ID49IDAuMCAmJiBwLnggPj0gTWF0aC5hYnMocC55KSkge1xuICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8wO1xuICB9IGVsc2UgaWYgKHAueSA+PSAwLjAgJiYgcC55ID49IE1hdGguYWJzKHAueCkpIHtcbiAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMTtcbiAgICBtdSAtPSBIQUxGX1BJO1xuICB9IGVsc2UgaWYgKHAueCA8IDAuMCAmJiAtcC54ID49IE1hdGguYWJzKHAueSkpIHtcbiAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMjtcbiAgICBtdSA9IChtdSA8IDAuMCA/IG11ICsgU1BJIDogbXUgLSBTUEkpO1xuICB9IGVsc2Uge1xuICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8zO1xuICAgIG11ICs9IEhBTEZfUEk7XG4gIH1cblxuICAvKiBDb21wdXRlIHBoaSBhbmQgdGhldGEgZm9yIHRoZSBhcmVhIG9mIGRlZmluaXRpb24uXG4gICAqIFRoZSBpbnZlcnNlIHByb2plY3Rpb24gaXMgbm90IGRlc2NyaWJlZCBpbiB0aGUgb3JpZ2luYWwgcGFwZXIsIGJ1dCBzb21lXG4gICAqIGdvb2QgaGludHMgY2FuIGJlIGZvdW5kIGhlcmUgKGFzIG9mIDIwMTEtMTItMTQpOlxuICAgKiBodHRwOi8vZml0cy5nc2ZjLm5hc2EuZ292L2ZpdHNiaXRzL3NhZi45My9zYWYuOTMwMlxuICAgKiAoc2VhcmNoIGZvciBcIk1lc3NhZ2UtSWQ6IDw5MzAyMTgxNzU5LkFBMjU0NzcgYXQgZml0cy5jdi5ucmFvLmVkdT5cIikgKi9cbiAgdCA9IChTUEkgLyAxMikgKiBNYXRoLnRhbihtdSk7XG4gIHRhbnRoZXRhID0gTWF0aC5zaW4odCkgLyAoTWF0aC5jb3ModCkgLSAoMSAvIE1hdGguc3FydCgyKSkpO1xuICB0aGV0YSA9IE1hdGguYXRhbih0YW50aGV0YSk7XG4gIGNvc211ID0gTWF0aC5jb3MobXUpO1xuICB0YW5udSA9IE1hdGgudGFuKG51KTtcbiAgY29zcGhpID0gMSAtIGNvc211ICogY29zbXUgKiB0YW5udSAqIHRhbm51ICogKDEgLSBNYXRoLmNvcyhNYXRoLmF0YW4oMSAvIE1hdGguY29zKHRoZXRhKSkpKTtcbiAgaWYgKGNvc3BoaSA8IC0xKSB7XG4gICAgY29zcGhpID0gLTE7XG4gIH0gZWxzZSBpZiAoY29zcGhpID4gKzEpIHtcbiAgICBjb3NwaGkgPSArMTtcbiAgfVxuXG4gIC8qIEFwcGx5IHRoZSByZXN1bHQgdG8gdGhlIHJlYWwgYXJlYSBvbiB0aGUgY3ViZSBmYWNlLlxuICAgKiBGb3IgdGhlIHRvcCBhbmQgYm90dG9tIGZhY2UsIHdlIGNhbiBjb21wdXRlIHBoaSBhbmQgbGFtIGRpcmVjdGx5LlxuICAgKiBGb3IgdGhlIG90aGVyIGZhY2VzLCB3ZSBtdXN0IHVzZSB1bml0IHNwaGVyZSBjYXJ0ZXNpYW4gY29vcmRpbmF0ZXNcbiAgICogYXMgYW4gaW50ZXJtZWRpYXRlIHN0ZXAuICovXG4gIGlmICh0aGlzLmZhY2UgPT09IEZBQ0VfRU5VTS5UT1ApIHtcbiAgICBwaGkgPSBNYXRoLmFjb3MoY29zcGhpKTtcbiAgICBscC5waGkgPSBIQUxGX1BJIC0gcGhpO1xuICAgIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8wKSB7XG4gICAgICBscC5sYW0gPSB0aGV0YSArIEhBTEZfUEk7XG4gICAgfSBlbHNlIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8xKSB7XG4gICAgICBscC5sYW0gPSAodGhldGEgPCAwLjAgPyB0aGV0YSArIFNQSSA6IHRoZXRhIC0gU1BJKTtcbiAgICB9IGVsc2UgaWYgKGFyZWEudmFsdWUgPT09IEFSRUFfRU5VTS5BUkVBXzIpIHtcbiAgICAgIGxwLmxhbSA9IHRoZXRhIC0gSEFMRl9QSTtcbiAgICB9IGVsc2UgLyogYXJlYS52YWx1ZSA9PSBBUkVBX0VOVU0uQVJFQV8zICovIHtcbiAgICAgIGxwLmxhbSA9IHRoZXRhO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0aGlzLmZhY2UgPT09IEZBQ0VfRU5VTS5CT1RUT00pIHtcbiAgICBwaGkgPSBNYXRoLmFjb3MoY29zcGhpKTtcbiAgICBscC5waGkgPSBwaGkgLSBIQUxGX1BJO1xuICAgIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8wKSB7XG4gICAgICBscC5sYW0gPSAtdGhldGEgKyBIQUxGX1BJO1xuICAgIH0gZWxzZSBpZiAoYXJlYS52YWx1ZSA9PT0gQVJFQV9FTlVNLkFSRUFfMSkge1xuICAgICAgbHAubGFtID0gLXRoZXRhO1xuICAgIH0gZWxzZSBpZiAoYXJlYS52YWx1ZSA9PT0gQVJFQV9FTlVNLkFSRUFfMikge1xuICAgICAgbHAubGFtID0gLXRoZXRhIC0gSEFMRl9QSTtcbiAgICB9IGVsc2UgLyogYXJlYS52YWx1ZSA9PSBBUkVBX0VOVU0uQVJFQV8zICovIHtcbiAgICAgIGxwLmxhbSA9ICh0aGV0YSA8IDAuMCA/IC10aGV0YSAtIFNQSSA6IC10aGV0YSArIFNQSSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8qIENvbXB1dGUgcGhpIGFuZCBsYW0gdmlhIGNhcnRlc2lhbiB1bml0IHNwaGVyZSBjb29yZGluYXRlcy4gKi9cbiAgICB2YXIgcSwgciwgcztcbiAgICBxID0gY29zcGhpO1xuICAgIHQgPSBxICogcTtcbiAgICBpZiAodCA+PSAxKSB7XG4gICAgICBzID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcyA9IE1hdGguc3FydCgxIC0gdCkgKiBNYXRoLnNpbih0aGV0YSk7XG4gICAgfVxuICAgIHQgKz0gcyAqIHM7XG4gICAgaWYgKHQgPj0gMSkge1xuICAgICAgciA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHIgPSBNYXRoLnNxcnQoMSAtIHQpO1xuICAgIH1cbiAgICAvKiBSb3RhdGUgcSxyLHMgaW50byB0aGUgY29ycmVjdCBhcmVhLiAqL1xuICAgIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8xKSB7XG4gICAgICB0ID0gcjtcbiAgICAgIHIgPSAtcztcbiAgICAgIHMgPSB0O1xuICAgIH0gZWxzZSBpZiAoYXJlYS52YWx1ZSA9PT0gQVJFQV9FTlVNLkFSRUFfMikge1xuICAgICAgciA9IC1yO1xuICAgICAgcyA9IC1zO1xuICAgIH0gZWxzZSBpZiAoYXJlYS52YWx1ZSA9PT0gQVJFQV9FTlVNLkFSRUFfMykge1xuICAgICAgdCA9IHI7XG4gICAgICByID0gcztcbiAgICAgIHMgPSAtdDtcbiAgICB9XG4gICAgLyogUm90YXRlIHEscixzIGludG8gdGhlIGNvcnJlY3QgY3ViZSBmYWNlLiAqL1xuICAgIGlmICh0aGlzLmZhY2UgPT09IEZBQ0VfRU5VTS5SSUdIVCkge1xuICAgICAgdCA9IHE7XG4gICAgICBxID0gLXI7XG4gICAgICByID0gdDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkJBQ0spIHtcbiAgICAgIHEgPSAtcTtcbiAgICAgIHIgPSAtcjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkxFRlQpIHtcbiAgICAgIHQgPSBxO1xuICAgICAgcSA9IHI7XG4gICAgICByID0gLXQ7XG4gICAgfVxuICAgIC8qIE5vdyBjb21wdXRlIHBoaSBhbmQgbGFtIGZyb20gdGhlIHVuaXQgc3BoZXJlIGNvb3JkaW5hdGVzLiAqL1xuICAgIGxwLnBoaSA9IE1hdGguYWNvcygtcykgLSBIQUxGX1BJO1xuICAgIGxwLmxhbSA9IE1hdGguYXRhbjIociwgcSk7XG4gICAgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLlJJR0hUKSB7XG4gICAgICBscC5sYW0gPSBxc2Nfc2hpZnRfbG9uX29yaWdpbihscC5sYW0sIC1IQUxGX1BJKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkJBQ0spIHtcbiAgICAgIGxwLmxhbSA9IHFzY19zaGlmdF9sb25fb3JpZ2luKGxwLmxhbSwgLVNQSSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZhY2UgPT09IEZBQ0VfRU5VTS5MRUZUKSB7XG4gICAgICBscC5sYW0gPSBxc2Nfc2hpZnRfbG9uX29yaWdpbihscC5sYW0sICtIQUxGX1BJKTtcbiAgICB9XG4gIH1cblxuICAvKiBBcHBseSB0aGUgc2hpZnQgZnJvbSB0aGUgc3BoZXJlIHRvIHRoZSBlbGxpcHNvaWQgYXMgZGVzY3JpYmVkXG4gICAqIGluIFtMSzEyXS4gKi9cbiAgaWYgKHRoaXMuZXMgIT09IDApIHtcbiAgICB2YXIgaW52ZXJ0X3NpZ247XG4gICAgdmFyIHRhbnBoaSwgeGE7XG4gICAgaW52ZXJ0X3NpZ24gPSAobHAucGhpIDwgMCA/IDEgOiAwKTtcbiAgICB0YW5waGkgPSBNYXRoLnRhbihscC5waGkpO1xuICAgIHhhID0gdGhpcy5iIC8gTWF0aC5zcXJ0KHRhbnBoaSAqIHRhbnBoaSArIHRoaXMub25lX21pbnVzX2Zfc3F1YXJlZCk7XG4gICAgbHAucGhpID0gTWF0aC5hdGFuKE1hdGguc3FydCh0aGlzLmEgKiB0aGlzLmEgLSB4YSAqIHhhKSAvICh0aGlzLm9uZV9taW51c19mICogeGEpKTtcbiAgICBpZiAoaW52ZXJ0X3NpZ24pIHtcbiAgICAgIGxwLnBoaSA9IC1scC5waGk7XG4gICAgfVxuICB9XG5cbiAgbHAubGFtICs9IHRoaXMubG9uZzA7XG4gIHAueCA9IGxwLmxhbTtcbiAgcC55ID0gbHAucGhpO1xuICByZXR1cm4gcDtcbn1cblxuLyogSGVscGVyIGZ1bmN0aW9uIGZvciBmb3J3YXJkIHByb2plY3Rpb246IGNvbXB1dGUgdGhlIHRoZXRhIGFuZ2xlXG4gKiBhbmQgZGV0ZXJtaW5lIHRoZSBhcmVhIG51bWJlci4gKi9cbmZ1bmN0aW9uIHFzY19md2RfZXF1YXRfZmFjZV90aGV0YShwaGksIHksIHgsIGFyZWEpIHtcbiAgdmFyIHRoZXRhO1xuICBpZiAocGhpIDwgRVBTTE4pIHtcbiAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMDtcbiAgICB0aGV0YSA9IDAuMDtcbiAgfSBlbHNlIHtcbiAgICB0aGV0YSA9IE1hdGguYXRhbjIoeSwgeCk7XG4gICAgaWYgKE1hdGguYWJzKHRoZXRhKSA8PSBGT1JUUEkpIHtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8wO1xuICAgIH0gZWxzZSBpZiAodGhldGEgPiBGT1JUUEkgJiYgdGhldGEgPD0gSEFMRl9QSSArIEZPUlRQSSkge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzE7XG4gICAgICB0aGV0YSAtPSBIQUxGX1BJO1xuICAgIH0gZWxzZSBpZiAodGhldGEgPiBIQUxGX1BJICsgRk9SVFBJIHx8IHRoZXRhIDw9IC0oSEFMRl9QSSArIEZPUlRQSSkpIHtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8yO1xuICAgICAgdGhldGEgPSAodGhldGEgPj0gMC4wID8gdGhldGEgLSBTUEkgOiB0aGV0YSArIFNQSSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8zO1xuICAgICAgdGhldGEgKz0gSEFMRl9QSTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoZXRhO1xufVxuXG4vKiBIZWxwZXIgZnVuY3Rpb246IHNoaWZ0IHRoZSBsb25naXR1ZGUuICovXG5mdW5jdGlvbiBxc2Nfc2hpZnRfbG9uX29yaWdpbihsb24sIG9mZnNldCkge1xuICB2YXIgc2xvbiA9IGxvbiArIG9mZnNldDtcbiAgaWYgKHNsb24gPCAtU1BJKSB7XG4gICAgc2xvbiArPSBUV09fUEk7XG4gIH0gZWxzZSBpZiAoc2xvbiA+ICtTUEkpIHtcbiAgICBzbG9uIC09IFRXT19QSTtcbiAgfVxuICByZXR1cm4gc2xvbjtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIlF1YWRyaWxhdGVyYWxpemVkIFNwaGVyaWNhbCBDdWJlXCIsIFwiUXVhZHJpbGF0ZXJhbGl6ZWRfU3BoZXJpY2FsX0N1YmVcIiwgXCJxc2NcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3FzYy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3FzYy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBSb2JpbnNvbiBwcm9qZWN0aW9uXG4vLyBCYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vT1NHZW8vcHJvai40L2Jsb2IvbWFzdGVyL3NyYy9QSl9yb2Jpbi5jXG4vLyBQb2x5bm9taWFsIGNvZWZpY2llbnRzIGZyb20gaHR0cDovL2FydGljbGUuZ21hbmUub3JnL2dtYW5lLmNvbXAuZ2lzLnByb2otNC5kZXZlbC82MDM5XG5cbmltcG9ydCB7SEFMRl9QSSwgRDJSLCBSMkQsIEVQU0xOfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcbmltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcblxudmFyIENPRUZTX1ggPSBbXG4gICAgWzEuMDAwMCwgMi4yMTk5ZS0xNywgLTcuMTU1MTVlLTA1LCAzLjExMDNlLTA2XSxcbiAgICBbMC45OTg2LCAtMC4wMDA0ODIyNDMsIC0yLjQ4OTdlLTA1LCAtMS4zMzA5ZS0wNl0sXG4gICAgWzAuOTk1NCwgLTAuMDAwODMxMDMsIC00LjQ4NjA1ZS0wNSwgLTkuODY3MDFlLTA3XSxcbiAgICBbMC45OTAwLCAtMC4wMDEzNTM2NCwgLTUuOTY2MWUtMDUsIDMuNjc3N2UtMDZdLFxuICAgIFswLjk4MjIsIC0wLjAwMTY3NDQyLCAtNC40OTU0N2UtMDYsIC01LjcyNDExZS0wNl0sXG4gICAgWzAuOTczMCwgLTAuMDAyMTQ4NjgsIC05LjAzNTcxZS0wNSwgMS44NzM2ZS0wOF0sXG4gICAgWzAuOTYwMCwgLTAuMDAzMDUwODUsIC05LjAwNzYxZS0wNSwgMS42NDkxN2UtMDZdLFxuICAgIFswLjk0MjcsIC0wLjAwMzgyNzkyLCAtNi41MzM4NmUtMDUsIC0yLjYxNTRlLTA2XSxcbiAgICBbMC45MjE2LCAtMC4wMDQ2Nzc0NiwgLTAuMDAwMTA0NTcsIDQuODEyNDNlLTA2XSxcbiAgICBbMC44OTYyLCAtMC4wMDUzNjIyMywgLTMuMjM4MzFlLTA1LCAtNS40MzQzMmUtMDZdLFxuICAgIFswLjg2NzksIC0wLjAwNjA5MzYzLCAtMC4wMDAxMTM4OTgsIDMuMzI0ODRlLTA2XSxcbiAgICBbMC44MzUwLCAtMC4wMDY5ODMyNSwgLTYuNDAyNTNlLTA1LCA5LjM0OTU5ZS0wN10sXG4gICAgWzAuNzk4NiwgLTAuMDA3NTUzMzgsIC01LjAwMDA5ZS0wNSwgOS4zNTMyNGUtMDddLFxuICAgIFswLjc1OTcsIC0wLjAwNzk4MzI0LCAtMy41OTcxZS0wNSwgLTIuMjc2MjZlLTA2XSxcbiAgICBbMC43MTg2LCAtMC4wMDg1MTM2NywgLTcuMDExNDllLTA1LCAtOC42MzAzZS0wNl0sXG4gICAgWzAuNjczMiwgLTAuMDA5ODYyMDksIC0wLjAwMDE5OTU2OSwgMS45MTk3NGUtMDVdLFxuICAgIFswLjYyMTMsIC0wLjAxMDQxOCwgOC44MzkyM2UtMDUsIDYuMjQwNTFlLTA2XSxcbiAgICBbMC41NzIyLCAtMC4wMDkwNjYwMSwgMC4wMDAxODIsIDYuMjQwNTFlLTA2XSxcbiAgICBbMC41MzIyLCAtMC4wMDY3Nzc5NywgMC4wMDAyNzU2MDgsIDYuMjQwNTFlLTA2XVxuXTtcblxudmFyIENPRUZTX1kgPSBbXG4gICAgWy01LjIwNDE3ZS0xOCwgMC4wMTI0LCAxLjIxNDMxZS0xOCwgLTguNDUyODRlLTExXSxcbiAgICBbMC4wNjIwLCAwLjAxMjQsIC0xLjI2NzkzZS0wOSwgNC4yMjY0MmUtMTBdLFxuICAgIFswLjEyNDAsIDAuMDEyNCwgNS4wNzE3MWUtMDksIC0xLjYwNjA0ZS0wOV0sXG4gICAgWzAuMTg2MCwgMC4wMTIzOTk5LCAtMS45MDE4OWUtMDgsIDYuMDAxNTJlLTA5XSxcbiAgICBbMC4yNDgwLCAwLjAxMjQwMDIsIDcuMTAwMzllLTA4LCAtMi4yNGUtMDhdLFxuICAgIFswLjMxMDAsIDAuMDEyMzk5MiwgLTIuNjQ5OTdlLTA3LCA4LjM1OTg2ZS0wOF0sXG4gICAgWzAuMzcyMCwgMC4wMTI0MDI5LCA5Ljg4OTgzZS0wNywgLTMuMTE5OTRlLTA3XSxcbiAgICBbMC40MzQwLCAwLjAxMjM4OTMsIC0zLjY5MDkzZS0wNiwgLTQuMzU2MjFlLTA3XSxcbiAgICBbMC40OTU4LCAwLjAxMjMxOTgsIC0xLjAyMjUyZS0wNSwgLTMuNDU1MjNlLTA3XSxcbiAgICBbMC41NTcxLCAwLjAxMjE5MTYsIC0xLjU0MDgxZS0wNSwgLTUuODIyODhlLTA3XSxcbiAgICBbMC42MTc2LCAwLjAxMTk5MzgsIC0yLjQxNDI0ZS0wNSwgLTUuMjUzMjdlLTA3XSxcbiAgICBbMC42NzY5LCAwLjAxMTcxMywgLTMuMjAyMjNlLTA1LCAtNS4xNjQwNWUtMDddLFxuICAgIFswLjczNDYsIDAuMDExMzU0MSwgLTMuOTc2ODRlLTA1LCAtNi4wOTA1MmUtMDddLFxuICAgIFswLjc5MDMsIDAuMDEwOTEwNywgLTQuODkwNDJlLTA1LCAtMS4wNDczOWUtMDZdLFxuICAgIFswLjg0MzUsIDAuMDEwMzQzMSwgLTYuNDYxNWUtMDUsIC0xLjQwMzc0ZS0wOV0sXG4gICAgWzAuODkzNiwgMC4wMDk2OTY4NiwgLTYuNDYzNmUtMDUsIC04LjU0N2UtMDZdLFxuICAgIFswLjkzOTQsIDAuMDA4NDA5NDcsIC0wLjAwMDE5Mjg0MSwgLTQuMjEwNmUtMDZdLFxuICAgIFswLjk3NjEsIDAuMDA2MTY1MjcsIC0wLjAwMDI1NiwgLTQuMjEwNmUtMDZdLFxuICAgIFsxLjAwMDAsIDAuMDAzMjg5NDcsIC0wLjAwMDMxOTE1OSwgLTQuMjEwNmUtMDZdXG5dO1xuXG52YXIgRlhDID0gMC44NDg3O1xudmFyIEZZQyA9IDEuMzUyMztcbnZhciBDMSA9IFIyRC81OyAvLyByYWQgdG8gNS1kZWdyZWUgaW50ZXJ2YWxcbnZhciBSQzEgPSAxL0MxO1xudmFyIE5PREVTID0gMTg7XG5cbnZhciBwb2x5M192YWwgPSBmdW5jdGlvbihjb2VmcywgeCkge1xuICAgIHJldHVybiBjb2Vmc1swXSArIHggKiAoY29lZnNbMV0gKyB4ICogKGNvZWZzWzJdICsgeCAqIGNvZWZzWzNdKSk7XG59O1xuXG52YXIgcG9seTNfZGVyID0gZnVuY3Rpb24oY29lZnMsIHgpIHtcbiAgICByZXR1cm4gY29lZnNbMV0gKyB4ICogKDIgKiBjb2Vmc1syXSArIHggKiAzICogY29lZnNbM10pO1xufTtcblxuZnVuY3Rpb24gbmV3dG9uX3JhcHNob24oZl9kZiwgc3RhcnQsIG1heF9lcnIsIGl0ZXJzKSB7XG4gICAgdmFyIHggPSBzdGFydDtcbiAgICBmb3IgKDsgaXRlcnM7IC0taXRlcnMpIHtcbiAgICAgICAgdmFyIHVwZCA9IGZfZGYoeCk7XG4gICAgICAgIHggLT0gdXBkO1xuICAgICAgICBpZiAoTWF0aC5hYnModXBkKSA8IG1heF9lcnIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB0aGlzLngwID0gdGhpcy54MCB8fCAwO1xuICAgIHRoaXMueTAgPSB0aGlzLnkwIHx8IDA7XG4gICAgdGhpcy5sb25nMCA9IHRoaXMubG9uZzAgfHwgMDtcbiAgICB0aGlzLmVzID0gMDtcbiAgICB0aGlzLnRpdGxlID0gdGhpcy50aXRsZSB8fCBcIlJvYmluc29uXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKGxsKSB7XG4gICAgdmFyIGxvbiA9IGFkanVzdF9sb24obGwueCAtIHRoaXMubG9uZzApO1xuXG4gICAgdmFyIGRwaGkgPSBNYXRoLmFicyhsbC55KTtcbiAgICB2YXIgaSA9IE1hdGguZmxvb3IoZHBoaSAqIEMxKTtcbiAgICBpZiAoaSA8IDApIHtcbiAgICAgICAgaSA9IDA7XG4gICAgfSBlbHNlIGlmIChpID49IE5PREVTKSB7XG4gICAgICAgIGkgPSBOT0RFUyAtIDE7XG4gICAgfVxuICAgIGRwaGkgPSBSMkQgKiAoZHBoaSAtIFJDMSAqIGkpO1xuICAgIHZhciB4eSA9IHtcbiAgICAgICAgeDogcG9seTNfdmFsKENPRUZTX1hbaV0sIGRwaGkpICogbG9uLFxuICAgICAgICB5OiBwb2x5M192YWwoQ09FRlNfWVtpXSwgZHBoaSlcbiAgICB9O1xuICAgIGlmIChsbC55IDwgMCkge1xuICAgICAgICB4eS55ID0gLXh5Lnk7XG4gICAgfVxuXG4gICAgeHkueCA9IHh5LnggKiB0aGlzLmEgKiBGWEMgKyB0aGlzLngwO1xuICAgIHh5LnkgPSB4eS55ICogdGhpcy5hICogRllDICsgdGhpcy55MDtcbiAgICByZXR1cm4geHk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHh5KSB7XG4gICAgdmFyIGxsID0ge1xuICAgICAgICB4OiAoeHkueCAtIHRoaXMueDApIC8gKHRoaXMuYSAqIEZYQyksXG4gICAgICAgIHk6IE1hdGguYWJzKHh5LnkgLSB0aGlzLnkwKSAvICh0aGlzLmEgKiBGWUMpXG4gICAgfTtcblxuICAgIGlmIChsbC55ID49IDEpIHsgLy8gcGF0aG9sb2dpYyBjYXNlXG4gICAgICAgIGxsLnggLz0gQ09FRlNfWFtOT0RFU11bMF07XG4gICAgICAgIGxsLnkgPSB4eS55IDwgMCA/IC1IQUxGX1BJIDogSEFMRl9QSTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBmaW5kIHRhYmxlIGludGVydmFsXG4gICAgICAgIHZhciBpID0gTWF0aC5mbG9vcihsbC55ICogTk9ERVMpO1xuICAgICAgICBpZiAoaSA8IDApIHtcbiAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGkgPj0gTk9ERVMpIHtcbiAgICAgICAgICAgIGkgPSBOT0RFUyAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICg7Oykge1xuICAgICAgICAgICAgaWYgKENPRUZTX1lbaV1bMF0gPiBsbC55KSB7XG4gICAgICAgICAgICAgICAgLS1pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChDT0VGU19ZW2krMV1bMF0gPD0gbGwueSkge1xuICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gbGluZWFyIGludGVycG9sYXRpb24gaW4gNSBkZWdyZWUgaW50ZXJ2YWxcbiAgICAgICAgdmFyIGNvZWZzID0gQ09FRlNfWVtpXTtcbiAgICAgICAgdmFyIHQgPSA1ICogKGxsLnkgLSBjb2Vmc1swXSkgLyAoQ09FRlNfWVtpKzFdWzBdIC0gY29lZnNbMF0pO1xuICAgICAgICAvLyBmaW5kIHQgc28gdGhhdCBwb2x5M192YWwoY29lZnMsIHQpID0gbGwueVxuICAgICAgICB0ID0gbmV3dG9uX3JhcHNob24oZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgcmV0dXJuIChwb2x5M192YWwoY29lZnMsIHgpIC0gbGwueSkgLyBwb2x5M19kZXIoY29lZnMsIHgpO1xuICAgICAgICB9LCB0LCBFUFNMTiwgMTAwKTtcblxuICAgICAgICBsbC54IC89IHBvbHkzX3ZhbChDT0VGU19YW2ldLCB0KTtcbiAgICAgICAgbGwueSA9ICg1ICogaSArIHQpICogRDJSO1xuICAgICAgICBpZiAoeHkueSA8IDApIHtcbiAgICAgICAgICAgIGxsLnkgPSAtbGwueTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxsLnggPSBhZGp1c3RfbG9uKGxsLnggKyB0aGlzLmxvbmcwKTtcbiAgICByZXR1cm4gbGw7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJSb2JpbnNvblwiLCBcInJvYmluXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvcm9iaW4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9yb2Jpbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYWRqdXN0X2xvbiBmcm9tICcuLi9jb21tb24vYWRqdXN0X2xvbic7XG5pbXBvcnQgYWRqdXN0X2xhdCBmcm9tICcuLi9jb21tb24vYWRqdXN0X2xhdCc7XG5pbXBvcnQgcGpfZW5mbiBmcm9tICcuLi9jb21tb24vcGpfZW5mbic7XG52YXIgTUFYX0lURVIgPSAyMDtcbmltcG9ydCBwal9tbGZuIGZyb20gJy4uL2NvbW1vbi9wal9tbGZuJztcbmltcG9ydCBwal9pbnZfbWxmbiBmcm9tICcuLi9jb21tb24vcGpfaW52X21sZm4nO1xuaW1wb3J0IHtFUFNMTiwgSEFMRl9QSX0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbmltcG9ydCBhc2lueiBmcm9tICcuLi9jb21tb24vYXNpbnonO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAvKiBQbGFjZSBwYXJhbWV0ZXJzIGluIHN0YXRpYyBzdG9yYWdlIGZvciBjb21tb24gdXNlXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuICBpZiAoIXRoaXMuc3BoZXJlKSB7XG4gICAgdGhpcy5lbiA9IHBqX2VuZm4odGhpcy5lcyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5uID0gMTtcbiAgICB0aGlzLm0gPSAwO1xuICAgIHRoaXMuZXMgPSAwO1xuICAgIHRoaXMuQ195ID0gTWF0aC5zcXJ0KCh0aGlzLm0gKyAxKSAvIHRoaXMubik7XG4gICAgdGhpcy5DX3ggPSB0aGlzLkNfeSAvICh0aGlzLm0gKyAxKTtcbiAgfVxuXG59XG5cbi8qIFNpbnVzb2lkYWwgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKHApIHtcbiAgdmFyIHgsIHk7XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG4gIC8qIEZvcndhcmQgZXF1YXRpb25zXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBsb24gPSBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuXG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIGlmICghdGhpcy5tKSB7XG4gICAgICBsYXQgPSB0aGlzLm4gIT09IDEgPyBNYXRoLmFzaW4odGhpcy5uICogTWF0aC5zaW4obGF0KSkgOiBsYXQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIGsgPSB0aGlzLm4gKiBNYXRoLnNpbihsYXQpO1xuICAgICAgZm9yICh2YXIgaSA9IE1BWF9JVEVSOyBpOyAtLWkpIHtcbiAgICAgICAgdmFyIFYgPSAodGhpcy5tICogbGF0ICsgTWF0aC5zaW4obGF0KSAtIGspIC8gKHRoaXMubSArIE1hdGguY29zKGxhdCkpO1xuICAgICAgICBsYXQgLT0gVjtcbiAgICAgICAgaWYgKE1hdGguYWJzKFYpIDwgRVBTTE4pIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB4ID0gdGhpcy5hICogdGhpcy5DX3ggKiBsb24gKiAodGhpcy5tICsgTWF0aC5jb3MobGF0KSk7XG4gICAgeSA9IHRoaXMuYSAqIHRoaXMuQ195ICogbGF0O1xuXG4gIH1cbiAgZWxzZSB7XG5cbiAgICB2YXIgcyA9IE1hdGguc2luKGxhdCk7XG4gICAgdmFyIGMgPSBNYXRoLmNvcyhsYXQpO1xuICAgIHkgPSB0aGlzLmEgKiBwal9tbGZuKGxhdCwgcywgYywgdGhpcy5lbik7XG4gICAgeCA9IHRoaXMuYSAqIGxvbiAqIGMgLyBNYXRoLnNxcnQoMSAtIHRoaXMuZXMgKiBzICogcyk7XG4gIH1cblxuICBwLnggPSB4O1xuICBwLnkgPSB5O1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuICB2YXIgbGF0LCB0ZW1wLCBsb24sIHM7XG5cbiAgcC54IC09IHRoaXMueDA7XG4gIGxvbiA9IHAueCAvIHRoaXMuYTtcbiAgcC55IC09IHRoaXMueTA7XG4gIGxhdCA9IHAueSAvIHRoaXMuYTtcblxuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICBsYXQgLz0gdGhpcy5DX3k7XG4gICAgbG9uID0gbG9uIC8gKHRoaXMuQ194ICogKHRoaXMubSArIE1hdGguY29zKGxhdCkpKTtcbiAgICBpZiAodGhpcy5tKSB7XG4gICAgICBsYXQgPSBhc2lueigodGhpcy5tICogbGF0ICsgTWF0aC5zaW4obGF0KSkgLyB0aGlzLm4pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLm4gIT09IDEpIHtcbiAgICAgIGxhdCA9IGFzaW56KE1hdGguc2luKGxhdCkgLyB0aGlzLm4pO1xuICAgIH1cbiAgICBsb24gPSBhZGp1c3RfbG9uKGxvbiArIHRoaXMubG9uZzApO1xuICAgIGxhdCA9IGFkanVzdF9sYXQobGF0KTtcbiAgfVxuICBlbHNlIHtcbiAgICBsYXQgPSBwal9pbnZfbWxmbihwLnkgLyB0aGlzLmEsIHRoaXMuZXMsIHRoaXMuZW4pO1xuICAgIHMgPSBNYXRoLmFicyhsYXQpO1xuICAgIGlmIChzIDwgSEFMRl9QSSkge1xuICAgICAgcyA9IE1hdGguc2luKGxhdCk7XG4gICAgICB0ZW1wID0gdGhpcy5sb25nMCArIHAueCAqIE1hdGguc3FydCgxIC0gdGhpcy5lcyAqIHMgKiBzKSAvICh0aGlzLmEgKiBNYXRoLmNvcyhsYXQpKTtcbiAgICAgIC8vdGVtcCA9IHRoaXMubG9uZzAgKyBwLnggLyAodGhpcy5hICogTWF0aC5jb3MobGF0KSk7XG4gICAgICBsb24gPSBhZGp1c3RfbG9uKHRlbXApO1xuICAgIH1cbiAgICBlbHNlIGlmICgocyAtIEVQU0xOKSA8IEhBTEZfUEkpIHtcbiAgICAgIGxvbiA9IHRoaXMubG9uZzA7XG4gICAgfVxuICB9XG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIlNpbnVzb2lkYWxcIiwgXCJzaW51XCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvc2ludS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3NpbnUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcbiAgcmVmZXJlbmNlczpcbiAgICBGb3JtdWxlcyBldCBjb25zdGFudGVzIHBvdXIgbGUgQ2FsY3VsIHBvdXIgbGFcbiAgICBwcm9qZWN0aW9uIGN5bGluZHJpcXVlIGNvbmZvcm1lIMOgIGF4ZSBvYmxpcXVlIGV0IHBvdXIgbGEgdHJhbnNmb3JtYXRpb24gZW50cmVcbiAgICBkZXMgc3lzdMOobWVzIGRlIHLDqWbDqXJlbmNlLlxuICAgIGh0dHA6Ly93d3cuc3dpc3N0b3BvLmFkbWluLmNoL2ludGVybmV0L3N3aXNzdG9wby9mci9ob21lL3RvcGljcy9zdXJ2ZXkvc3lzL3JlZnN5cy9zd2l0emVybGFuZC5wYXJzeXNyZWxhdGVkMS4zMTIxNi5kb3dubG9hZExpc3QuNzcwMDQuRG93bmxvYWRGaWxlLnRtcC9zd2lzc3Byb2plY3Rpb25mci5wZGZcbiAgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIHZhciBwaHkwID0gdGhpcy5sYXQwO1xuICB0aGlzLmxhbWJkYTAgPSB0aGlzLmxvbmcwO1xuICB2YXIgc2luUGh5MCA9IE1hdGguc2luKHBoeTApO1xuICB2YXIgc2VtaU1ham9yQXhpcyA9IHRoaXMuYTtcbiAgdmFyIGludkYgPSB0aGlzLnJmO1xuICB2YXIgZmxhdHRlbmluZyA9IDEgLyBpbnZGO1xuICB2YXIgZTIgPSAyICogZmxhdHRlbmluZyAtIE1hdGgucG93KGZsYXR0ZW5pbmcsIDIpO1xuICB2YXIgZSA9IHRoaXMuZSA9IE1hdGguc3FydChlMik7XG4gIHRoaXMuUiA9IHRoaXMuazAgKiBzZW1pTWFqb3JBeGlzICogTWF0aC5zcXJ0KDEgLSBlMikgLyAoMSAtIGUyICogTWF0aC5wb3coc2luUGh5MCwgMikpO1xuICB0aGlzLmFscGhhID0gTWF0aC5zcXJ0KDEgKyBlMiAvICgxIC0gZTIpICogTWF0aC5wb3coTWF0aC5jb3MocGh5MCksIDQpKTtcbiAgdGhpcy5iMCA9IE1hdGguYXNpbihzaW5QaHkwIC8gdGhpcy5hbHBoYSk7XG4gIHZhciBrMSA9IE1hdGgubG9nKE1hdGgudGFuKE1hdGguUEkgLyA0ICsgdGhpcy5iMCAvIDIpKTtcbiAgdmFyIGsyID0gTWF0aC5sb2coTWF0aC50YW4oTWF0aC5QSSAvIDQgKyBwaHkwIC8gMikpO1xuICB2YXIgazMgPSBNYXRoLmxvZygoMSArIGUgKiBzaW5QaHkwKSAvICgxIC0gZSAqIHNpblBoeTApKTtcbiAgdGhpcy5LID0gazEgLSB0aGlzLmFscGhhICogazIgKyB0aGlzLmFscGhhICogZSAvIDIgKiBrMztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgU2ExID0gTWF0aC5sb2coTWF0aC50YW4oTWF0aC5QSSAvIDQgLSBwLnkgLyAyKSk7XG4gIHZhciBTYTIgPSB0aGlzLmUgLyAyICogTWF0aC5sb2coKDEgKyB0aGlzLmUgKiBNYXRoLnNpbihwLnkpKSAvICgxIC0gdGhpcy5lICogTWF0aC5zaW4ocC55KSkpO1xuICB2YXIgUyA9IC10aGlzLmFscGhhICogKFNhMSArIFNhMikgKyB0aGlzLks7XG5cbiAgLy8gc3BoZXJpYyBsYXRpdHVkZVxuICB2YXIgYiA9IDIgKiAoTWF0aC5hdGFuKE1hdGguZXhwKFMpKSAtIE1hdGguUEkgLyA0KTtcblxuICAvLyBzcGhlcmljIGxvbmdpdHVkZVxuICB2YXIgSSA9IHRoaXMuYWxwaGEgKiAocC54IC0gdGhpcy5sYW1iZGEwKTtcblxuICAvLyBwc29ldWRvIGVxdWF0b3JpYWwgcm90YXRpb25cbiAgdmFyIHJvdEkgPSBNYXRoLmF0YW4oTWF0aC5zaW4oSSkgLyAoTWF0aC5zaW4odGhpcy5iMCkgKiBNYXRoLnRhbihiKSArIE1hdGguY29zKHRoaXMuYjApICogTWF0aC5jb3MoSSkpKTtcblxuICB2YXIgcm90QiA9IE1hdGguYXNpbihNYXRoLmNvcyh0aGlzLmIwKSAqIE1hdGguc2luKGIpIC0gTWF0aC5zaW4odGhpcy5iMCkgKiBNYXRoLmNvcyhiKSAqIE1hdGguY29zKEkpKTtcblxuICBwLnkgPSB0aGlzLlIgLyAyICogTWF0aC5sb2coKDEgKyBNYXRoLnNpbihyb3RCKSkgLyAoMSAtIE1hdGguc2luKHJvdEIpKSkgKyB0aGlzLnkwO1xuICBwLnggPSB0aGlzLlIgKiByb3RJICsgdGhpcy54MDtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgdmFyIFkgPSBwLnggLSB0aGlzLngwO1xuICB2YXIgWCA9IHAueSAtIHRoaXMueTA7XG5cbiAgdmFyIHJvdEkgPSBZIC8gdGhpcy5SO1xuICB2YXIgcm90QiA9IDIgKiAoTWF0aC5hdGFuKE1hdGguZXhwKFggLyB0aGlzLlIpKSAtIE1hdGguUEkgLyA0KTtcblxuICB2YXIgYiA9IE1hdGguYXNpbihNYXRoLmNvcyh0aGlzLmIwKSAqIE1hdGguc2luKHJvdEIpICsgTWF0aC5zaW4odGhpcy5iMCkgKiBNYXRoLmNvcyhyb3RCKSAqIE1hdGguY29zKHJvdEkpKTtcbiAgdmFyIEkgPSBNYXRoLmF0YW4oTWF0aC5zaW4ocm90SSkgLyAoTWF0aC5jb3ModGhpcy5iMCkgKiBNYXRoLmNvcyhyb3RJKSAtIE1hdGguc2luKHRoaXMuYjApICogTWF0aC50YW4ocm90QikpKTtcblxuICB2YXIgbGFtYmRhID0gdGhpcy5sYW1iZGEwICsgSSAvIHRoaXMuYWxwaGE7XG5cbiAgdmFyIFMgPSAwO1xuICB2YXIgcGh5ID0gYjtcbiAgdmFyIHByZXZQaHkgPSAtMTAwMDtcbiAgdmFyIGl0ZXJhdGlvbiA9IDA7XG4gIHdoaWxlIChNYXRoLmFicyhwaHkgLSBwcmV2UGh5KSA+IDAuMDAwMDAwMSkge1xuICAgIGlmICgrK2l0ZXJhdGlvbiA+IDIwKSB7XG4gICAgICAvLy4uLnJlcG9ydEVycm9yKFwib21lcmNGd2RJbmZpbml0eVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9TID0gTWF0aC5sb2coTWF0aC50YW4oTWF0aC5QSSAvIDQgKyBwaHkgLyAyKSk7XG4gICAgUyA9IDEgLyB0aGlzLmFscGhhICogKE1hdGgubG9nKE1hdGgudGFuKE1hdGguUEkgLyA0ICsgYiAvIDIpKSAtIHRoaXMuSykgKyB0aGlzLmUgKiBNYXRoLmxvZyhNYXRoLnRhbihNYXRoLlBJIC8gNCArIE1hdGguYXNpbih0aGlzLmUgKiBNYXRoLnNpbihwaHkpKSAvIDIpKTtcbiAgICBwcmV2UGh5ID0gcGh5O1xuICAgIHBoeSA9IDIgKiBNYXRoLmF0YW4oTWF0aC5leHAoUykpIC0gTWF0aC5QSSAvIDI7XG4gIH1cblxuICBwLnggPSBsYW1iZGE7XG4gIHAueSA9IHBoeTtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJzb21lcmNcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9zb21lcmMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9zb21lcmMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtFUFNMTiwgSEFMRl9QSX0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbmltcG9ydCBzaWduIGZyb20gJy4uL2NvbW1vbi9zaWduJztcbmltcG9ydCBtc2ZueiBmcm9tICcuLi9jb21tb24vbXNmbnonO1xuaW1wb3J0IHRzZm56IGZyb20gJy4uL2NvbW1vbi90c2Zueic7XG5pbXBvcnQgcGhpMnogZnJvbSAnLi4vY29tbW9uL3BoaTJ6JztcbmltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNzZm5fKHBoaXQsIHNpbnBoaSwgZWNjZW4pIHtcbiAgc2lucGhpICo9IGVjY2VuO1xuICByZXR1cm4gKE1hdGgudGFuKDAuNSAqIChIQUxGX1BJICsgcGhpdCkpICogTWF0aC5wb3coKDEgLSBzaW5waGkpIC8gKDEgKyBzaW5waGkpLCAwLjUgKiBlY2NlbikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGhpcy5jb3NsYXQwID0gTWF0aC5jb3ModGhpcy5sYXQwKTtcbiAgdGhpcy5zaW5sYXQwID0gTWF0aC5zaW4odGhpcy5sYXQwKTtcbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgaWYgKHRoaXMuazAgPT09IDEgJiYgIWlzTmFOKHRoaXMubGF0X3RzKSAmJiBNYXRoLmFicyh0aGlzLmNvc2xhdDApIDw9IEVQU0xOKSB7XG4gICAgICB0aGlzLmswID0gMC41ICogKDEgKyBzaWduKHRoaXMubGF0MCkgKiBNYXRoLnNpbih0aGlzLmxhdF90cykpO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoTWF0aC5hYnModGhpcy5jb3NsYXQwKSA8PSBFUFNMTikge1xuICAgICAgaWYgKHRoaXMubGF0MCA+IDApIHtcbiAgICAgICAgLy9Ob3J0aCBwb2xlXG4gICAgICAgIC8vdHJhY2UoJ3N0ZXJlOm5vcnRoIHBvbGUnKTtcbiAgICAgICAgdGhpcy5jb24gPSAxO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vU291dGggcG9sZVxuICAgICAgICAvL3RyYWNlKCdzdGVyZTpzb3V0aCBwb2xlJyk7XG4gICAgICAgIHRoaXMuY29uID0gLTE7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29ucyA9IE1hdGguc3FydChNYXRoLnBvdygxICsgdGhpcy5lLCAxICsgdGhpcy5lKSAqIE1hdGgucG93KDEgLSB0aGlzLmUsIDEgLSB0aGlzLmUpKTtcbiAgICBpZiAodGhpcy5rMCA9PT0gMSAmJiAhaXNOYU4odGhpcy5sYXRfdHMpICYmIE1hdGguYWJzKHRoaXMuY29zbGF0MCkgPD0gRVBTTE4pIHtcbiAgICAgIHRoaXMuazAgPSAwLjUgKiB0aGlzLmNvbnMgKiBtc2Zueih0aGlzLmUsIE1hdGguc2luKHRoaXMubGF0X3RzKSwgTWF0aC5jb3ModGhpcy5sYXRfdHMpKSAvIHRzZm56KHRoaXMuZSwgdGhpcy5jb24gKiB0aGlzLmxhdF90cywgdGhpcy5jb24gKiBNYXRoLnNpbih0aGlzLmxhdF90cykpO1xuICAgIH1cbiAgICB0aGlzLm1zMSA9IG1zZm56KHRoaXMuZSwgdGhpcy5zaW5sYXQwLCB0aGlzLmNvc2xhdDApO1xuICAgIHRoaXMuWDAgPSAyICogTWF0aC5hdGFuKHRoaXMuc3Nmbl8odGhpcy5sYXQwLCB0aGlzLnNpbmxhdDAsIHRoaXMuZSkpIC0gSEFMRl9QSTtcbiAgICB0aGlzLmNvc1gwID0gTWF0aC5jb3ModGhpcy5YMCk7XG4gICAgdGhpcy5zaW5YMCA9IE1hdGguc2luKHRoaXMuWDApO1xuICB9XG59XG5cbi8vIFN0ZXJlb2dyYXBoaWMgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG4gIHZhciBzaW5sYXQgPSBNYXRoLnNpbihsYXQpO1xuICB2YXIgY29zbGF0ID0gTWF0aC5jb3MobGF0KTtcbiAgdmFyIEEsIFgsIHNpblgsIGNvc1gsIHRzLCByaDtcbiAgdmFyIGRsb24gPSBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuXG4gIGlmIChNYXRoLmFicyhNYXRoLmFicyhsb24gLSB0aGlzLmxvbmcwKSAtIE1hdGguUEkpIDw9IEVQU0xOICYmIE1hdGguYWJzKGxhdCArIHRoaXMubGF0MCkgPD0gRVBTTE4pIHtcbiAgICAvL2Nhc2Ugb2YgdGhlIG9yaWdpbmUgcG9pbnRcbiAgICAvL3RyYWNlKCdzdGVyZTp0aGlzIGlzIHRoZSBvcmlnaW4gcG9pbnQnKTtcbiAgICBwLnggPSBOYU47XG4gICAgcC55ID0gTmFOO1xuICAgIHJldHVybiBwO1xuICB9XG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIC8vdHJhY2UoJ3N0ZXJlOnNwaGVyZSBjYXNlJyk7XG4gICAgQSA9IDIgKiB0aGlzLmswIC8gKDEgKyB0aGlzLnNpbmxhdDAgKiBzaW5sYXQgKyB0aGlzLmNvc2xhdDAgKiBjb3NsYXQgKiBNYXRoLmNvcyhkbG9uKSk7XG4gICAgcC54ID0gdGhpcy5hICogQSAqIGNvc2xhdCAqIE1hdGguc2luKGRsb24pICsgdGhpcy54MDtcbiAgICBwLnkgPSB0aGlzLmEgKiBBICogKHRoaXMuY29zbGF0MCAqIHNpbmxhdCAtIHRoaXMuc2lubGF0MCAqIGNvc2xhdCAqIE1hdGguY29zKGRsb24pKSArIHRoaXMueTA7XG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgZWxzZSB7XG4gICAgWCA9IDIgKiBNYXRoLmF0YW4odGhpcy5zc2ZuXyhsYXQsIHNpbmxhdCwgdGhpcy5lKSkgLSBIQUxGX1BJO1xuICAgIGNvc1ggPSBNYXRoLmNvcyhYKTtcbiAgICBzaW5YID0gTWF0aC5zaW4oWCk7XG4gICAgaWYgKE1hdGguYWJzKHRoaXMuY29zbGF0MCkgPD0gRVBTTE4pIHtcbiAgICAgIHRzID0gdHNmbnoodGhpcy5lLCBsYXQgKiB0aGlzLmNvbiwgdGhpcy5jb24gKiBzaW5sYXQpO1xuICAgICAgcmggPSAyICogdGhpcy5hICogdGhpcy5rMCAqIHRzIC8gdGhpcy5jb25zO1xuICAgICAgcC54ID0gdGhpcy54MCArIHJoICogTWF0aC5zaW4obG9uIC0gdGhpcy5sb25nMCk7XG4gICAgICBwLnkgPSB0aGlzLnkwIC0gdGhpcy5jb24gKiByaCAqIE1hdGguY29zKGxvbiAtIHRoaXMubG9uZzApO1xuICAgICAgLy90cmFjZShwLnRvU3RyaW5nKCkpO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGVsc2UgaWYgKE1hdGguYWJzKHRoaXMuc2lubGF0MCkgPCBFUFNMTikge1xuICAgICAgLy9FcVxuICAgICAgLy90cmFjZSgnc3RlcmU6ZXF1YXRldXInKTtcbiAgICAgIEEgPSAyICogdGhpcy5hICogdGhpcy5rMCAvICgxICsgY29zWCAqIE1hdGguY29zKGRsb24pKTtcbiAgICAgIHAueSA9IEEgKiBzaW5YO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vb3RoZXIgY2FzZVxuICAgICAgLy90cmFjZSgnc3RlcmU6bm9ybWFsIGNhc2UnKTtcbiAgICAgIEEgPSAyICogdGhpcy5hICogdGhpcy5rMCAqIHRoaXMubXMxIC8gKHRoaXMuY29zWDAgKiAoMSArIHRoaXMuc2luWDAgKiBzaW5YICsgdGhpcy5jb3NYMCAqIGNvc1ggKiBNYXRoLmNvcyhkbG9uKSkpO1xuICAgICAgcC55ID0gQSAqICh0aGlzLmNvc1gwICogc2luWCAtIHRoaXMuc2luWDAgKiBjb3NYICogTWF0aC5jb3MoZGxvbikpICsgdGhpcy55MDtcbiAgICB9XG4gICAgcC54ID0gQSAqIGNvc1ggKiBNYXRoLnNpbihkbG9uKSArIHRoaXMueDA7XG4gIH1cbiAgLy90cmFjZShwLnRvU3RyaW5nKCkpO1xuICByZXR1cm4gcDtcbn1cblxuLy8qIFN0ZXJlb2dyYXBoaWMgaW52ZXJzZSBlcXVhdGlvbnMtLW1hcHBpbmcgeCx5IHRvIGxhdC9sb25nXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHAueCAtPSB0aGlzLngwO1xuICBwLnkgLT0gdGhpcy55MDtcbiAgdmFyIGxvbiwgbGF0LCB0cywgY2UsIENoaTtcbiAgdmFyIHJoID0gTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSk7XG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIHZhciBjID0gMiAqIE1hdGguYXRhbihyaCAvICgyICogdGhpcy5hICogdGhpcy5rMCkpO1xuICAgIGxvbiA9IHRoaXMubG9uZzA7XG4gICAgbGF0ID0gdGhpcy5sYXQwO1xuICAgIGlmIChyaCA8PSBFUFNMTikge1xuICAgICAgcC54ID0gbG9uO1xuICAgICAgcC55ID0gbGF0O1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGxhdCA9IE1hdGguYXNpbihNYXRoLmNvcyhjKSAqIHRoaXMuc2lubGF0MCArIHAueSAqIE1hdGguc2luKGMpICogdGhpcy5jb3NsYXQwIC8gcmgpO1xuICAgIGlmIChNYXRoLmFicyh0aGlzLmNvc2xhdDApIDwgRVBTTE4pIHtcbiAgICAgIGlmICh0aGlzLmxhdDAgPiAwKSB7XG4gICAgICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIE1hdGguYXRhbjIocC54LCAtIDEgKiBwLnkpKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBNYXRoLmF0YW4yKHAueCwgcC55KSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMihwLnggKiBNYXRoLnNpbihjKSwgcmggKiB0aGlzLmNvc2xhdDAgKiBNYXRoLmNvcyhjKSAtIHAueSAqIHRoaXMuc2lubGF0MCAqIE1hdGguc2luKGMpKSk7XG4gICAgfVxuICAgIHAueCA9IGxvbjtcbiAgICBwLnkgPSBsYXQ7XG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKE1hdGguYWJzKHRoaXMuY29zbGF0MCkgPD0gRVBTTE4pIHtcbiAgICAgIGlmIChyaCA8PSBFUFNMTikge1xuICAgICAgICBsYXQgPSB0aGlzLmxhdDA7XG4gICAgICAgIGxvbiA9IHRoaXMubG9uZzA7XG4gICAgICAgIHAueCA9IGxvbjtcbiAgICAgICAgcC55ID0gbGF0O1xuICAgICAgICAvL3RyYWNlKHAudG9TdHJpbmcoKSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgICAgfVxuICAgICAgcC54ICo9IHRoaXMuY29uO1xuICAgICAgcC55ICo9IHRoaXMuY29uO1xuICAgICAgdHMgPSByaCAqIHRoaXMuY29ucyAvICgyICogdGhpcy5hICogdGhpcy5rMCk7XG4gICAgICBsYXQgPSB0aGlzLmNvbiAqIHBoaTJ6KHRoaXMuZSwgdHMpO1xuICAgICAgbG9uID0gdGhpcy5jb24gKiBhZGp1c3RfbG9uKHRoaXMuY29uICogdGhpcy5sb25nMCArIE1hdGguYXRhbjIocC54LCAtIDEgKiBwLnkpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjZSA9IDIgKiBNYXRoLmF0YW4ocmggKiB0aGlzLmNvc1gwIC8gKDIgKiB0aGlzLmEgKiB0aGlzLmswICogdGhpcy5tczEpKTtcbiAgICAgIGxvbiA9IHRoaXMubG9uZzA7XG4gICAgICBpZiAocmggPD0gRVBTTE4pIHtcbiAgICAgICAgQ2hpID0gdGhpcy5YMDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBDaGkgPSBNYXRoLmFzaW4oTWF0aC5jb3MoY2UpICogdGhpcy5zaW5YMCArIHAueSAqIE1hdGguc2luKGNlKSAqIHRoaXMuY29zWDAgLyByaCk7XG4gICAgICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIE1hdGguYXRhbjIocC54ICogTWF0aC5zaW4oY2UpLCByaCAqIHRoaXMuY29zWDAgKiBNYXRoLmNvcyhjZSkgLSBwLnkgKiB0aGlzLnNpblgwICogTWF0aC5zaW4oY2UpKSk7XG4gICAgICB9XG4gICAgICBsYXQgPSAtMSAqIHBoaTJ6KHRoaXMuZSwgTWF0aC50YW4oMC41ICogKEhBTEZfUEkgKyBDaGkpKSk7XG4gICAgfVxuICB9XG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuXG4gIC8vdHJhY2UocC50b1N0cmluZygpKTtcbiAgcmV0dXJuIHA7XG5cbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcInN0ZXJlXCIsIFwiU3RlcmVvZ3JhcGhpY19Tb3V0aF9Qb2xlXCIsIFwiUG9sYXIgU3RlcmVvZ3JhcGhpYyAodmFyaWFudCBCKVwiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzLFxuICBzc2ZuXzogc3Nmbl9cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvc3RlcmUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9zdGVyZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZ2F1c3MgZnJvbSAnLi9nYXVzcyc7XG5pbXBvcnQgYWRqdXN0X2xvbiBmcm9tICcuLi9jb21tb24vYWRqdXN0X2xvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICBnYXVzcy5pbml0LmFwcGx5KHRoaXMpO1xuICBpZiAoIXRoaXMucmMpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5zaW5jMCA9IE1hdGguc2luKHRoaXMucGhpYzApO1xuICB0aGlzLmNvc2MwID0gTWF0aC5jb3ModGhpcy5waGljMCk7XG4gIHRoaXMuUjIgPSAyICogdGhpcy5yYztcbiAgaWYgKCF0aGlzLnRpdGxlKSB7XG4gICAgdGhpcy50aXRsZSA9IFwiT2JsaXF1ZSBTdGVyZW9ncmFwaGljIEFsdGVybmF0aXZlXCI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgc2luYywgY29zYywgY29zbCwgaztcbiAgcC54ID0gYWRqdXN0X2xvbihwLnggLSB0aGlzLmxvbmcwKTtcbiAgZ2F1c3MuZm9yd2FyZC5hcHBseSh0aGlzLCBbcF0pO1xuICBzaW5jID0gTWF0aC5zaW4ocC55KTtcbiAgY29zYyA9IE1hdGguY29zKHAueSk7XG4gIGNvc2wgPSBNYXRoLmNvcyhwLngpO1xuICBrID0gdGhpcy5rMCAqIHRoaXMuUjIgLyAoMSArIHRoaXMuc2luYzAgKiBzaW5jICsgdGhpcy5jb3NjMCAqIGNvc2MgKiBjb3NsKTtcbiAgcC54ID0gayAqIGNvc2MgKiBNYXRoLnNpbihwLngpO1xuICBwLnkgPSBrICogKHRoaXMuY29zYzAgKiBzaW5jIC0gdGhpcy5zaW5jMCAqIGNvc2MgKiBjb3NsKTtcbiAgcC54ID0gdGhpcy5hICogcC54ICsgdGhpcy54MDtcbiAgcC55ID0gdGhpcy5hICogcC55ICsgdGhpcy55MDtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgdmFyIHNpbmMsIGNvc2MsIGxvbiwgbGF0LCByaG87XG4gIHAueCA9IChwLnggLSB0aGlzLngwKSAvIHRoaXMuYTtcbiAgcC55ID0gKHAueSAtIHRoaXMueTApIC8gdGhpcy5hO1xuXG4gIHAueCAvPSB0aGlzLmswO1xuICBwLnkgLz0gdGhpcy5rMDtcbiAgaWYgKChyaG8gPSBNYXRoLnNxcnQocC54ICogcC54ICsgcC55ICogcC55KSkpIHtcbiAgICB2YXIgYyA9IDIgKiBNYXRoLmF0YW4yKHJobywgdGhpcy5SMik7XG4gICAgc2luYyA9IE1hdGguc2luKGMpO1xuICAgIGNvc2MgPSBNYXRoLmNvcyhjKTtcbiAgICBsYXQgPSBNYXRoLmFzaW4oY29zYyAqIHRoaXMuc2luYzAgKyBwLnkgKiBzaW5jICogdGhpcy5jb3NjMCAvIHJobyk7XG4gICAgbG9uID0gTWF0aC5hdGFuMihwLnggKiBzaW5jLCByaG8gKiB0aGlzLmNvc2MwICogY29zYyAtIHAueSAqIHRoaXMuc2luYzAgKiBzaW5jKTtcbiAgfVxuICBlbHNlIHtcbiAgICBsYXQgPSB0aGlzLnBoaWMwO1xuICAgIGxvbiA9IDA7XG4gIH1cblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgZ2F1c3MuaW52ZXJzZS5hcHBseSh0aGlzLCBbcF0pO1xuICBwLnggPSBhZGp1c3RfbG9uKHAueCArIHRoaXMubG9uZzApO1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIlN0ZXJlb2dyYXBoaWNfTm9ydGhfUG9sZVwiLCBcIk9ibGlxdWVfU3RlcmVvZ3JhcGhpY1wiLCBcIlBvbGFyX1N0ZXJlb2dyYXBoaWNcIiwgXCJzdGVyZWFcIixcIk9ibGlxdWUgU3RlcmVvZ3JhcGhpYyBBbHRlcm5hdGl2ZVwiLFwiRG91YmxlX1N0ZXJlb2dyYXBoaWNcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9zdGVyZWEuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9zdGVyZWEuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gSGVhdmlseSBiYXNlZCBvbiB0aGlzIHRtZXJjIHByb2plY3Rpb24gaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYmxvY2gvbWFwc2hhcGVyLXByb2ovYmxvYi9tYXN0ZXIvc3JjL3Byb2plY3Rpb25zL3RtZXJjLmpzXG5cbmltcG9ydCBwal9lbmZuIGZyb20gJy4uL2NvbW1vbi9wal9lbmZuJztcbmltcG9ydCBwal9tbGZuIGZyb20gJy4uL2NvbW1vbi9wal9tbGZuJztcbmltcG9ydCBwal9pbnZfbWxmbiBmcm9tICcuLi9jb21tb24vcGpfaW52X21sZm4nO1xuaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuXG5pbXBvcnQge0VQU0xOLCBIQUxGX1BJfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcbmltcG9ydCBzaWduIGZyb20gJy4uL2NvbW1vbi9zaWduJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIHRoaXMueDAgPSB0aGlzLngwICE9PSB1bmRlZmluZWQgPyB0aGlzLngwIDogMDtcbiAgdGhpcy55MCA9IHRoaXMueTAgIT09IHVuZGVmaW5lZCA/IHRoaXMueTAgOiAwO1xuICB0aGlzLmxvbmcwID0gdGhpcy5sb25nMCAhPT0gdW5kZWZpbmVkID8gdGhpcy5sb25nMCA6IDA7XG4gIHRoaXMubGF0MCA9IHRoaXMubGF0MCAhPT0gdW5kZWZpbmVkID8gdGhpcy5sYXQwIDogMDtcblxuICBpZiAodGhpcy5lcykge1xuICAgIHRoaXMuZW4gPSBwal9lbmZuKHRoaXMuZXMpO1xuICAgIHRoaXMubWwwID0gcGpfbWxmbih0aGlzLmxhdDAsIE1hdGguc2luKHRoaXMubGF0MCksIE1hdGguY29zKHRoaXMubGF0MCksIHRoaXMuZW4pO1xuICB9XG59XG5cbi8qKlxuICAgIFRyYW5zdmVyc2UgTWVyY2F0b3IgRm9yd2FyZCAgLSBsb25nL2xhdCB0byB4L3lcbiAgICBsb25nL2xhdCBpbiByYWRpYW5zXG4gICovXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG5cbiAgdmFyIGRlbHRhX2xvbiA9IGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG4gIHZhciBjb247XG4gIHZhciB4LCB5O1xuICB2YXIgc2luX3BoaSA9IE1hdGguc2luKGxhdCk7XG4gIHZhciBjb3NfcGhpID0gTWF0aC5jb3MobGF0KTtcblxuICBpZiAoIXRoaXMuZXMpIHtcbiAgICB2YXIgYiA9IGNvc19waGkgKiBNYXRoLnNpbihkZWx0YV9sb24pO1xuXG4gICAgaWYgKChNYXRoLmFicyhNYXRoLmFicyhiKSAtIDEpKSA8IEVQU0xOKSB7XG4gICAgICByZXR1cm4gKDkzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB4ID0gMC41ICogdGhpcy5hICogdGhpcy5rMCAqIE1hdGgubG9nKCgxICsgYikgLyAoMSAtIGIpKSArIHRoaXMueDA7XG4gICAgICB5ID0gY29zX3BoaSAqIE1hdGguY29zKGRlbHRhX2xvbikgLyBNYXRoLnNxcnQoMSAtIE1hdGgucG93KGIsIDIpKTtcbiAgICAgIGIgPSBNYXRoLmFicyh5KTtcblxuICAgICAgaWYgKGIgPj0gMSkge1xuICAgICAgICBpZiAoKGIgLSAxKSA+IEVQU0xOKSB7XG4gICAgICAgICAgcmV0dXJuICg5Myk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgeSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB5ID0gTWF0aC5hY29zKHkpO1xuICAgICAgfVxuXG4gICAgICBpZiAobGF0IDwgMCkge1xuICAgICAgICB5ID0gLXk7XG4gICAgICB9XG5cbiAgICAgIHkgPSB0aGlzLmEgKiB0aGlzLmswICogKHkgLSB0aGlzLmxhdDApICsgdGhpcy55MDtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgdmFyIGFsID0gY29zX3BoaSAqIGRlbHRhX2xvbjtcbiAgICB2YXIgYWxzID0gTWF0aC5wb3coYWwsIDIpO1xuICAgIHZhciBjID0gdGhpcy5lcDIgKiBNYXRoLnBvdyhjb3NfcGhpLCAyKTtcbiAgICB2YXIgY3MgPSBNYXRoLnBvdyhjLCAyKTtcbiAgICB2YXIgdHEgPSBNYXRoLmFicyhjb3NfcGhpKSA+IEVQU0xOID8gTWF0aC50YW4obGF0KSA6IDA7XG4gICAgdmFyIHQgPSBNYXRoLnBvdyh0cSwgMik7XG4gICAgdmFyIHRzID0gTWF0aC5wb3codCwgMik7XG4gICAgY29uID0gMSAtIHRoaXMuZXMgKiBNYXRoLnBvdyhzaW5fcGhpLCAyKTtcbiAgICBhbCA9IGFsIC8gTWF0aC5zcXJ0KGNvbik7XG4gICAgdmFyIG1sID0gcGpfbWxmbihsYXQsIHNpbl9waGksIGNvc19waGksIHRoaXMuZW4pO1xuXG4gICAgeCA9IHRoaXMuYSAqICh0aGlzLmswICogYWwgKiAoMSArXG4gICAgICBhbHMgLyA2ICogKDEgLSB0ICsgYyArXG4gICAgICBhbHMgLyAyMCAqICg1IC0gMTggKiB0ICsgdHMgKyAxNCAqIGMgLSA1OCAqIHQgKiBjICtcbiAgICAgIGFscyAvIDQyICogKDYxICsgMTc5ICogdHMgLSB0cyAqIHQgLSA0NzkgKiB0KSkpKSkgK1xuICAgICAgdGhpcy54MDtcblxuICAgIHkgPSB0aGlzLmEgKiAodGhpcy5rMCAqIChtbCAtIHRoaXMubWwwICtcbiAgICAgIHNpbl9waGkgKiBkZWx0YV9sb24gKiBhbCAvIDIgKiAoMSArXG4gICAgICBhbHMgLyAxMiAqICg1IC0gdCArIDkgKiBjICsgNCAqIGNzICtcbiAgICAgIGFscyAvIDMwICogKDYxICsgdHMgLSA1OCAqIHQgKyAyNzAgKiBjIC0gMzMwICogdCAqIGMgK1xuICAgICAgYWxzIC8gNTYgKiAoMTM4NSArIDU0MyAqIHRzIC0gdHMgKiB0IC0gMzExMSAqIHQpKSkpKSkgK1xuICAgICAgdGhpcy55MDtcbiAgfVxuXG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG5cbiAgcmV0dXJuIHA7XG59XG5cbi8qKlxuICAgIFRyYW5zdmVyc2UgTWVyY2F0b3IgSW52ZXJzZSAgLSAgeC95IHRvIGxvbmcvbGF0XG4gICovXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHZhciBjb24sIHBoaTtcbiAgdmFyIGxhdCwgbG9uO1xuICB2YXIgeCA9IChwLnggLSB0aGlzLngwKSAqICgxIC8gdGhpcy5hKTtcbiAgdmFyIHkgPSAocC55IC0gdGhpcy55MCkgKiAoMSAvIHRoaXMuYSk7XG5cbiAgaWYgKCF0aGlzLmVzKSB7XG4gICAgdmFyIGYgPSBNYXRoLmV4cCh4IC8gdGhpcy5rMCk7XG4gICAgdmFyIGcgPSAwLjUgKiAoZiAtIDEgLyBmKTtcbiAgICB2YXIgdGVtcCA9IHRoaXMubGF0MCArIHkgLyB0aGlzLmswO1xuICAgIHZhciBoID0gTWF0aC5jb3ModGVtcCk7XG4gICAgY29uID0gTWF0aC5zcXJ0KCgxIC0gTWF0aC5wb3coaCwgMikpIC8gKDEgKyBNYXRoLnBvdyhnLCAyKSkpO1xuICAgIGxhdCA9IE1hdGguYXNpbihjb24pO1xuXG4gICAgaWYgKHkgPCAwKSB7XG4gICAgICBsYXQgPSAtbGF0O1xuICAgIH1cblxuICAgIGlmICgoZyA9PT0gMCkgJiYgKGggPT09IDApKSB7XG4gICAgICBsb24gPSAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvbiA9IGFkanVzdF9sb24oTWF0aC5hdGFuMihnLCBoKSArIHRoaXMubG9uZzApO1xuICAgIH1cbiAgfVxuICBlbHNlIHsgLy8gZWxsaXBzb2lkYWwgZm9ybVxuICAgIGNvbiA9IHRoaXMubWwwICsgeSAvIHRoaXMuazA7XG4gICAgcGhpID0gcGpfaW52X21sZm4oY29uLCB0aGlzLmVzLCB0aGlzLmVuKTtcblxuICAgIGlmIChNYXRoLmFicyhwaGkpIDwgSEFMRl9QSSkge1xuICAgICAgdmFyIHNpbl9waGkgPSBNYXRoLnNpbihwaGkpO1xuICAgICAgdmFyIGNvc19waGkgPSBNYXRoLmNvcyhwaGkpO1xuICAgICAgdmFyIHRhbl9waGkgPSBNYXRoLmFicyhjb3NfcGhpKSA+IEVQU0xOID8gTWF0aC50YW4ocGhpKSA6IDA7XG4gICAgICB2YXIgYyA9IHRoaXMuZXAyICogTWF0aC5wb3coY29zX3BoaSwgMik7XG4gICAgICB2YXIgY3MgPSBNYXRoLnBvdyhjLCAyKTtcbiAgICAgIHZhciB0ID0gTWF0aC5wb3codGFuX3BoaSwgMik7XG4gICAgICB2YXIgdHMgPSBNYXRoLnBvdyh0LCAyKTtcbiAgICAgIGNvbiA9IDEgLSB0aGlzLmVzICogTWF0aC5wb3coc2luX3BoaSwgMik7XG4gICAgICB2YXIgZCA9IHggKiBNYXRoLnNxcnQoY29uKSAvIHRoaXMuazA7XG4gICAgICB2YXIgZHMgPSBNYXRoLnBvdyhkLCAyKTtcbiAgICAgIGNvbiA9IGNvbiAqIHRhbl9waGk7XG5cbiAgICAgIGxhdCA9IHBoaSAtIChjb24gKiBkcyAvICgxIC0gdGhpcy5lcykpICogMC41ICogKDEgLVxuICAgICAgICBkcyAvIDEyICogKDUgKyAzICogdCAtIDkgKiBjICogdCArIGMgLSA0ICogY3MgLVxuICAgICAgICBkcyAvIDMwICogKDYxICsgOTAgKiB0IC0gMjUyICogYyAqIHQgKyA0NSAqIHRzICsgNDYgKiBjIC1cbiAgICAgICAgZHMgLyA1NiAqICgxMzg1ICsgMzYzMyAqIHQgKyA0MDk1ICogdHMgKyAxNTc0ICogdHMgKiB0KSkpKTtcblxuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgKGQgKiAoMSAtXG4gICAgICAgIGRzIC8gNiAqICgxICsgMiAqIHQgKyBjIC1cbiAgICAgICAgZHMgLyAyMCAqICg1ICsgMjggKiB0ICsgMjQgKiB0cyArIDggKiBjICogdCArIDYgKiBjIC1cbiAgICAgICAgZHMgLyA0MiAqICg2MSArIDY2MiAqIHQgKyAxMzIwICogdHMgKyA3MjAgKiB0cyAqIHQpKSkpIC8gY29zX3BoaSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxhdCA9IEhBTEZfUEkgKiBzaWduKHkpO1xuICAgICAgbG9uID0gMDtcbiAgICB9XG4gIH1cblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcblxuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIlRyYW5zdmVyc2VfTWVyY2F0b3JcIiwgXCJUcmFuc3ZlcnNlIE1lcmNhdG9yXCIsIFwidG1lcmNcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy90bWVyYy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3RtZXJjLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhZGp1c3Rfem9uZSBmcm9tICcuLi9jb21tb24vYWRqdXN0X3pvbmUnO1xuaW1wb3J0IGV0bWVyYyBmcm9tICcuL2V0bWVyYyc7XG5leHBvcnQgdmFyIGRlcGVuZHNPbiA9ICdldG1lcmMnO1xuaW1wb3J0IHtEMlJ9IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICB2YXIgem9uZSA9IGFkanVzdF96b25lKHRoaXMuem9uZSwgdGhpcy5sb25nMCk7XG4gIGlmICh6b25lID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gdXRtIHpvbmUnKTtcbiAgfVxuICB0aGlzLmxhdDAgPSAwO1xuICB0aGlzLmxvbmcwID0gICgoNiAqIE1hdGguYWJzKHpvbmUpKSAtIDE4MykgKiBEMlI7XG4gIHRoaXMueDAgPSA1MDAwMDA7XG4gIHRoaXMueTAgPSB0aGlzLnV0bVNvdXRoID8gMTAwMDAwMDAgOiAwO1xuICB0aGlzLmswID0gMC45OTk2O1xuXG4gIGV0bWVyYy5pbml0LmFwcGx5KHRoaXMpO1xuICB0aGlzLmZvcndhcmQgPSBldG1lcmMuZm9yd2FyZDtcbiAgdGhpcy5pbnZlcnNlID0gZXRtZXJjLmludmVyc2U7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJVbml2ZXJzYWwgVHJhbnN2ZXJzZSBNZXJjYXRvciBTeXN0ZW1cIiwgXCJ1dG1cIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIG5hbWVzOiBuYW1lcyxcbiAgZGVwZW5kc09uOiBkZXBlbmRzT25cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvdXRtLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvdXRtLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcblxuaW1wb3J0IHtIQUxGX1BJLCBFUFNMTn0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbmltcG9ydCBhc2lueiBmcm9tICcuLi9jb21tb24vYXNpbnonO1xuXG4vKiBJbml0aWFsaXplIHRoZSBWYW4gRGVyIEdyaW50ZW4gcHJvamVjdGlvblxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAvL3RoaXMuUiA9IDYzNzA5OTc7IC8vUmFkaXVzIG9mIGVhcnRoXG4gIHRoaXMuUiA9IHRoaXMuYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuXG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG5cbiAgLyogRm9yd2FyZCBlcXVhdGlvbnNcbiAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIHZhciBkbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgdmFyIHgsIHk7XG5cbiAgaWYgKE1hdGguYWJzKGxhdCkgPD0gRVBTTE4pIHtcbiAgICB4ID0gdGhpcy54MCArIHRoaXMuUiAqIGRsb247XG4gICAgeSA9IHRoaXMueTA7XG4gIH1cbiAgdmFyIHRoZXRhID0gYXNpbnooMiAqIE1hdGguYWJzKGxhdCAvIE1hdGguUEkpKTtcbiAgaWYgKChNYXRoLmFicyhkbG9uKSA8PSBFUFNMTikgfHwgKE1hdGguYWJzKE1hdGguYWJzKGxhdCkgLSBIQUxGX1BJKSA8PSBFUFNMTikpIHtcbiAgICB4ID0gdGhpcy54MDtcbiAgICBpZiAobGF0ID49IDApIHtcbiAgICAgIHkgPSB0aGlzLnkwICsgTWF0aC5QSSAqIHRoaXMuUiAqIE1hdGgudGFuKDAuNSAqIHRoZXRhKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB5ID0gdGhpcy55MCArIE1hdGguUEkgKiB0aGlzLlIgKiAtTWF0aC50YW4oMC41ICogdGhldGEpO1xuICAgIH1cbiAgICAvLyAgcmV0dXJuKE9LKTtcbiAgfVxuICB2YXIgYWwgPSAwLjUgKiBNYXRoLmFicygoTWF0aC5QSSAvIGRsb24pIC0gKGRsb24gLyBNYXRoLlBJKSk7XG4gIHZhciBhc3EgPSBhbCAqIGFsO1xuICB2YXIgc2ludGggPSBNYXRoLnNpbih0aGV0YSk7XG4gIHZhciBjb3N0aCA9IE1hdGguY29zKHRoZXRhKTtcblxuICB2YXIgZyA9IGNvc3RoIC8gKHNpbnRoICsgY29zdGggLSAxKTtcbiAgdmFyIGdzcSA9IGcgKiBnO1xuICB2YXIgbSA9IGcgKiAoMiAvIHNpbnRoIC0gMSk7XG4gIHZhciBtc3EgPSBtICogbTtcbiAgdmFyIGNvbiA9IE1hdGguUEkgKiB0aGlzLlIgKiAoYWwgKiAoZyAtIG1zcSkgKyBNYXRoLnNxcnQoYXNxICogKGcgLSBtc3EpICogKGcgLSBtc3EpIC0gKG1zcSArIGFzcSkgKiAoZ3NxIC0gbXNxKSkpIC8gKG1zcSArIGFzcSk7XG4gIGlmIChkbG9uIDwgMCkge1xuICAgIGNvbiA9IC1jb247XG4gIH1cbiAgeCA9IHRoaXMueDAgKyBjb247XG4gIC8vY29uID0gTWF0aC5hYnMoY29uIC8gKE1hdGguUEkgKiB0aGlzLlIpKTtcbiAgdmFyIHEgPSBhc3EgKyBnO1xuICBjb24gPSBNYXRoLlBJICogdGhpcy5SICogKG0gKiBxIC0gYWwgKiBNYXRoLnNxcnQoKG1zcSArIGFzcSkgKiAoYXNxICsgMSkgLSBxICogcSkpIC8gKG1zcSArIGFzcSk7XG4gIGlmIChsYXQgPj0gMCkge1xuICAgIC8veSA9IHRoaXMueTAgKyBNYXRoLlBJICogdGhpcy5SICogTWF0aC5zcXJ0KDEgLSBjb24gKiBjb24gLSAyICogYWwgKiBjb24pO1xuICAgIHkgPSB0aGlzLnkwICsgY29uO1xuICB9XG4gIGVsc2Uge1xuICAgIC8veSA9IHRoaXMueTAgLSBNYXRoLlBJICogdGhpcy5SICogTWF0aC5zcXJ0KDEgLSBjb24gKiBjb24gLSAyICogYWwgKiBjb24pO1xuICAgIHkgPSB0aGlzLnkwIC0gY29uO1xuICB9XG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG4gIHJldHVybiBwO1xufVxuXG4vKiBWYW4gRGVyIEdyaW50ZW4gaW52ZXJzZSBlcXVhdGlvbnMtLW1hcHBpbmcgeCx5IHRvIGxhdC9sb25nXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHZhciBsb24sIGxhdDtcbiAgdmFyIHh4LCB5eSwgeHlzLCBjMSwgYzIsIGMzO1xuICB2YXIgYTE7XG4gIHZhciBtMTtcbiAgdmFyIGNvbjtcbiAgdmFyIHRoMTtcbiAgdmFyIGQ7XG5cbiAgLyogaW52ZXJzZSBlcXVhdGlvbnNcbiAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIHAueCAtPSB0aGlzLngwO1xuICBwLnkgLT0gdGhpcy55MDtcbiAgY29uID0gTWF0aC5QSSAqIHRoaXMuUjtcbiAgeHggPSBwLnggLyBjb247XG4gIHl5ID0gcC55IC8gY29uO1xuICB4eXMgPSB4eCAqIHh4ICsgeXkgKiB5eTtcbiAgYzEgPSAtTWF0aC5hYnMoeXkpICogKDEgKyB4eXMpO1xuICBjMiA9IGMxIC0gMiAqIHl5ICogeXkgKyB4eCAqIHh4O1xuICBjMyA9IC0yICogYzEgKyAxICsgMiAqIHl5ICogeXkgKyB4eXMgKiB4eXM7XG4gIGQgPSB5eSAqIHl5IC8gYzMgKyAoMiAqIGMyICogYzIgKiBjMiAvIGMzIC8gYzMgLyBjMyAtIDkgKiBjMSAqIGMyIC8gYzMgLyBjMykgLyAyNztcbiAgYTEgPSAoYzEgLSBjMiAqIGMyIC8gMyAvIGMzKSAvIGMzO1xuICBtMSA9IDIgKiBNYXRoLnNxcnQoLWExIC8gMyk7XG4gIGNvbiA9ICgoMyAqIGQpIC8gYTEpIC8gbTE7XG4gIGlmIChNYXRoLmFicyhjb24pID4gMSkge1xuICAgIGlmIChjb24gPj0gMCkge1xuICAgICAgY29uID0gMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb24gPSAtMTtcbiAgICB9XG4gIH1cbiAgdGgxID0gTWF0aC5hY29zKGNvbikgLyAzO1xuICBpZiAocC55ID49IDApIHtcbiAgICBsYXQgPSAoLW0xICogTWF0aC5jb3ModGgxICsgTWF0aC5QSSAvIDMpIC0gYzIgLyAzIC8gYzMpICogTWF0aC5QSTtcbiAgfVxuICBlbHNlIHtcbiAgICBsYXQgPSAtKC1tMSAqIE1hdGguY29zKHRoMSArIE1hdGguUEkgLyAzKSAtIGMyIC8gMyAvIGMzKSAqIE1hdGguUEk7XG4gIH1cblxuICBpZiAoTWF0aC5hYnMoeHgpIDwgRVBTTE4pIHtcbiAgICBsb24gPSB0aGlzLmxvbmcwO1xuICB9XG4gIGVsc2Uge1xuICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIE1hdGguUEkgKiAoeHlzIC0gMSArIE1hdGguc3FydCgxICsgMiAqICh4eCAqIHh4IC0geXkgKiB5eSkgKyB4eXMgKiB4eXMpKSAvIDIgLyB4eCk7XG4gIH1cblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJWYW5fZGVyX0dyaW50ZW5fSVwiLCBcIlZhbkRlckdyaW50ZW5cIiwgXCJ2YW5kZ1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3ZhbmRnLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvdmFuZGcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtEMlIsIFIyRCwgUEpEXzNQQVJBTSwgUEpEXzdQQVJBTX0gZnJvbSAnLi9jb25zdGFudHMvdmFsdWVzJztcbmltcG9ydCBkYXR1bV90cmFuc2Zvcm0gZnJvbSAnLi9kYXR1bV90cmFuc2Zvcm0nO1xuaW1wb3J0IGFkanVzdF9heGlzIGZyb20gJy4vYWRqdXN0X2F4aXMnO1xuaW1wb3J0IHByb2ogZnJvbSAnLi9Qcm9qJztcbmltcG9ydCB0b1BvaW50IGZyb20gJy4vY29tbW9uL3RvUG9pbnQnO1xuaW1wb3J0IGNoZWNrU2FuaXR5IGZyb20gJy4vY2hlY2tTYW5pdHknO1xuXG5mdW5jdGlvbiBjaGVja05vdFdHUyhzb3VyY2UsIGRlc3QpIHtcbiAgcmV0dXJuICgoc291cmNlLmRhdHVtLmRhdHVtX3R5cGUgPT09IFBKRF8zUEFSQU0gfHwgc291cmNlLmRhdHVtLmRhdHVtX3R5cGUgPT09IFBKRF83UEFSQU0pICYmIGRlc3QuZGF0dW1Db2RlICE9PSAnV0dTODQnKSB8fCAoKGRlc3QuZGF0dW0uZGF0dW1fdHlwZSA9PT0gUEpEXzNQQVJBTSB8fCBkZXN0LmRhdHVtLmRhdHVtX3R5cGUgPT09IFBKRF83UEFSQU0pICYmIHNvdXJjZS5kYXR1bUNvZGUgIT09ICdXR1M4NCcpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm0oc291cmNlLCBkZXN0LCBwb2ludCkge1xuICB2YXIgd2dzODQ7XG4gIGlmIChBcnJheS5pc0FycmF5KHBvaW50KSkge1xuICAgIHBvaW50ID0gdG9Qb2ludChwb2ludCk7XG4gIH1cbiAgY2hlY2tTYW5pdHkocG9pbnQpO1xuICAvLyBXb3JrYXJvdW5kIGZvciBkYXR1bSBzaGlmdHMgdG93Z3M4NCwgaWYgZWl0aGVyIHNvdXJjZSBvciBkZXN0aW5hdGlvbiBwcm9qZWN0aW9uIGlzIG5vdCB3Z3M4NFxuICBpZiAoc291cmNlLmRhdHVtICYmIGRlc3QuZGF0dW0gJiYgY2hlY2tOb3RXR1Moc291cmNlLCBkZXN0KSkge1xuICAgIHdnczg0ID0gbmV3IHByb2ooJ1dHUzg0Jyk7XG4gICAgcG9pbnQgPSB0cmFuc2Zvcm0oc291cmNlLCB3Z3M4NCwgcG9pbnQpO1xuICAgIHNvdXJjZSA9IHdnczg0O1xuICB9XG4gIC8vIERHUiwgMjAxMC8xMS8xMlxuICBpZiAoc291cmNlLmF4aXMgIT09ICdlbnUnKSB7XG4gICAgcG9pbnQgPSBhZGp1c3RfYXhpcyhzb3VyY2UsIGZhbHNlLCBwb2ludCk7XG4gIH1cbiAgLy8gVHJhbnNmb3JtIHNvdXJjZSBwb2ludHMgdG8gbG9uZy9sYXQsIGlmIHRoZXkgYXJlbid0IGFscmVhZHkuXG4gIGlmIChzb3VyY2UucHJvak5hbWUgPT09ICdsb25nbGF0Jykge1xuICAgIHBvaW50ID0ge1xuICAgICAgeDogcG9pbnQueCAqIEQyUixcbiAgICAgIHk6IHBvaW50LnkgKiBEMlJcbiAgICB9O1xuICB9XG4gIGVsc2Uge1xuICAgIGlmIChzb3VyY2UudG9fbWV0ZXIpIHtcbiAgICAgIHBvaW50ID0ge1xuICAgICAgICB4OiBwb2ludC54ICogc291cmNlLnRvX21ldGVyLFxuICAgICAgICB5OiBwb2ludC55ICogc291cmNlLnRvX21ldGVyXG4gICAgICB9O1xuICAgIH1cbiAgICBwb2ludCA9IHNvdXJjZS5pbnZlcnNlKHBvaW50KTsgLy8gQ29udmVydCBDYXJ0ZXNpYW4gdG8gbG9uZ2xhdFxuICB9XG4gIC8vIEFkanVzdCBmb3IgdGhlIHByaW1lIG1lcmlkaWFuIGlmIG5lY2Vzc2FyeVxuICBpZiAoc291cmNlLmZyb21fZ3JlZW53aWNoKSB7XG4gICAgcG9pbnQueCArPSBzb3VyY2UuZnJvbV9ncmVlbndpY2g7XG4gIH1cblxuICAvLyBDb252ZXJ0IGRhdHVtcyBpZiBuZWVkZWQsIGFuZCBpZiBwb3NzaWJsZS5cbiAgcG9pbnQgPSBkYXR1bV90cmFuc2Zvcm0oc291cmNlLmRhdHVtLCBkZXN0LmRhdHVtLCBwb2ludCk7XG5cbiAgLy8gQWRqdXN0IGZvciB0aGUgcHJpbWUgbWVyaWRpYW4gaWYgbmVjZXNzYXJ5XG4gIGlmIChkZXN0LmZyb21fZ3JlZW53aWNoKSB7XG4gICAgcG9pbnQgPSB7XG4gICAgICB4OiBwb2ludC54IC0gZGVzdC5mcm9tX2dyZWVud2ljaCxcbiAgICAgIHk6IHBvaW50LnlcbiAgICB9O1xuICB9XG5cbiAgaWYgKGRlc3QucHJvak5hbWUgPT09ICdsb25nbGF0Jykge1xuICAgIC8vIGNvbnZlcnQgcmFkaWFucyB0byBkZWNpbWFsIGRlZ3JlZXNcbiAgICBwb2ludCA9IHtcbiAgICAgIHg6IHBvaW50LnggKiBSMkQsXG4gICAgICB5OiBwb2ludC55ICogUjJEXG4gICAgfTtcbiAgfSBlbHNlIHsgLy8gZWxzZSBwcm9qZWN0XG4gICAgcG9pbnQgPSBkZXN0LmZvcndhcmQocG9pbnQpO1xuICAgIGlmIChkZXN0LnRvX21ldGVyKSB7XG4gICAgICBwb2ludCA9IHtcbiAgICAgICAgeDogcG9pbnQueCAvIGRlc3QudG9fbWV0ZXIsXG4gICAgICAgIHk6IHBvaW50LnkgLyBkZXN0LnRvX21ldGVyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIERHUiwgMjAxMC8xMS8xMlxuICBpZiAoZGVzdC5heGlzICE9PSAnZW51Jykge1xuICAgIHJldHVybiBhZGp1c3RfYXhpcyhkZXN0LCB0cnVlLCBwb2ludCk7XG4gIH1cblxuICByZXR1cm4gcG9pbnQ7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvdHJhbnNmb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvdHJhbnNmb3JtLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCB7dmVyc2lvbiBhcyBkZWZhdWx0fSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3ZlcnNpb24uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi92ZXJzaW9uLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1wibmFtZVwiOlwicHJvajRcIixcInZlcnNpb25cIjpcIjIuNS4wXCIsXCJkZXNjcmlwdGlvblwiOlwiUHJvajRqcyBpcyBhIEphdmFTY3JpcHQgbGlicmFyeSB0byB0cmFuc2Zvcm0gcG9pbnQgY29vcmRpbmF0ZXMgZnJvbSBvbmUgY29vcmRpbmF0ZSBzeXN0ZW0gdG8gYW5vdGhlciwgaW5jbHVkaW5nIGRhdHVtIHRyYW5zZm9ybWF0aW9ucy5cIixcIm1haW5cIjpcImRpc3QvcHJvajQtc3JjLmpzXCIsXCJtb2R1bGVcIjpcImxpYi9pbmRleC5qc1wiLFwiZGlyZWN0b3JpZXNcIjp7XCJ0ZXN0XCI6XCJ0ZXN0XCIsXCJkb2NcIjpcImRvY3NcIn0sXCJzY3JpcHRzXCI6e1wiYnVpbGRcIjpcImdydW50XCIsXCJidWlsZDp0bWVyY1wiOlwiZ3J1bnQgYnVpbGQ6dG1lcmNcIixcInRlc3RcIjpcIm5wbSBydW4gYnVpbGQgJiYgaXN0YW5idWwgdGVzdCBfbW9jaGEgdGVzdC90ZXN0LmpzXCJ9LFwicmVwb3NpdG9yeVwiOntcInR5cGVcIjpcImdpdFwiLFwidXJsXCI6XCJnaXQ6Ly9naXRodWIuY29tL3Byb2o0anMvcHJvajRqcy5naXRcIn0sXCJhdXRob3JcIjpcIlwiLFwibGljZW5zZVwiOlwiTUlUXCIsXCJkZXZEZXBlbmRlbmNpZXNcIjp7XCJjaGFpXCI6XCJ+NC4xLjJcIixcImN1cmwtYW1kXCI6XCJnaXRodWI6Y3Vqb2pzL2N1cmxcIixcImdydW50XCI6XCJeMS4wLjFcIixcImdydW50LWNsaVwiOlwifjEuMi4wXCIsXCJncnVudC1jb250cmliLWNvbm5lY3RcIjpcIn4xLjAuMlwiLFwiZ3J1bnQtY29udHJpYi1qc2hpbnRcIjpcIn4xLjEuMFwiLFwiZ3J1bnQtY29udHJpYi11Z2xpZnlcIjpcIn4zLjEuMFwiLFwiZ3J1bnQtbW9jaGEtcGhhbnRvbWpzXCI6XCJ+NC4wLjBcIixcImdydW50LXJvbGx1cFwiOlwiXjYuMC4wXCIsXCJpc3RhbmJ1bFwiOlwifjAuNC41XCIsXCJtb2NoYVwiOlwifjQuMC4wXCIsXCJyb2xsdXBcIjpcIl4wLjUwLjBcIixcInJvbGx1cC1wbHVnaW4tanNvblwiOlwiXjIuMy4wXCIsXCJyb2xsdXAtcGx1Z2luLW5vZGUtcmVzb2x2ZVwiOlwiXjMuMC4wXCIsXCJ0aW5cIjpcIn4wLjUuMFwifSxcImRlcGVuZGVuY2llc1wiOntcIm1ncnNcIjpcIjEuMC4wXCIsXCJ3a3QtcGFyc2VyXCI6XCJeMS4yLjBcIn19XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvcGFja2FnZS5qc29uXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9wYWNrYWdlLmpzb25cbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHRtZXJjIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL3RtZXJjJztcbmltcG9ydCBldG1lcmMgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvZXRtZXJjJztcbmltcG9ydCB1dG0gZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvdXRtJztcbmltcG9ydCBzdGVyZWEgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvc3RlcmVhJztcbmltcG9ydCBzdGVyZSBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9zdGVyZSc7XG5pbXBvcnQgc29tZXJjIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL3NvbWVyYyc7XG5pbXBvcnQgb21lcmMgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvb21lcmMnO1xuaW1wb3J0IGxjYyBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9sY2MnO1xuaW1wb3J0IGtyb3ZhayBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9rcm92YWsnO1xuaW1wb3J0IGNhc3MgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvY2Fzcyc7XG5pbXBvcnQgbGFlYSBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9sYWVhJztcbmltcG9ydCBhZWEgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvYWVhJztcbmltcG9ydCBnbm9tIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL2dub20nO1xuaW1wb3J0IGNlYSBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9jZWEnO1xuaW1wb3J0IGVxYyBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9lcWMnO1xuaW1wb3J0IHBvbHkgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvcG9seSc7XG5pbXBvcnQgbnptZyBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9uem1nJztcbmltcG9ydCBtaWxsIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL21pbGwnO1xuaW1wb3J0IHNpbnUgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvc2ludSc7XG5pbXBvcnQgbW9sbCBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9tb2xsJztcbmltcG9ydCBlcWRjIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL2VxZGMnO1xuaW1wb3J0IHZhbmRnIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL3ZhbmRnJztcbmltcG9ydCBhZXFkIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL2FlcWQnO1xuaW1wb3J0IG9ydGhvIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL29ydGhvJztcbmltcG9ydCBxc2MgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvcXNjJztcbmltcG9ydCByb2JpbiBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9yb2Jpbic7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwcm9qNCl7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKHRtZXJjKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoZXRtZXJjKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQodXRtKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoc3RlcmVhKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoc3RlcmUpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChzb21lcmMpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChvbWVyYyk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKGxjYyk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKGtyb3Zhayk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKGNhc3MpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChsYWVhKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoYWVhKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoZ25vbSk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKGNlYSk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKGVxYyk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKHBvbHkpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChuem1nKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQobWlsbCk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKHNpbnUpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChtb2xsKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoZXFkYyk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKHZhbmRnKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoYWVxZCk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKG9ydGhvKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQocXNjKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQocm9iaW4pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L3Byb2pzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9wcm9qcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgRDJSID0gMC4wMTc0NTMyOTI1MTk5NDMyOTU3NztcbmltcG9ydCBwYXJzZXIgZnJvbSAnLi9wYXJzZXInO1xuaW1wb3J0IHtzRXhwcn0gZnJvbSAnLi9wcm9jZXNzJztcblxuXG5cbmZ1bmN0aW9uIHJlbmFtZShvYmosIHBhcmFtcykge1xuICB2YXIgb3V0TmFtZSA9IHBhcmFtc1swXTtcbiAgdmFyIGluTmFtZSA9IHBhcmFtc1sxXTtcbiAgaWYgKCEob3V0TmFtZSBpbiBvYmopICYmIChpbk5hbWUgaW4gb2JqKSkge1xuICAgIG9ialtvdXROYW1lXSA9IG9ialtpbk5hbWVdO1xuICAgIGlmIChwYXJhbXMubGVuZ3RoID09PSAzKSB7XG4gICAgICBvYmpbb3V0TmFtZV0gPSBwYXJhbXNbMl0ob2JqW291dE5hbWVdKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZDJyKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dCAqIEQyUjtcbn1cblxuZnVuY3Rpb24gY2xlYW5XS1Qod2t0KSB7XG4gIGlmICh3a3QudHlwZSA9PT0gJ0dFT0dDUycpIHtcbiAgICB3a3QucHJvak5hbWUgPSAnbG9uZ2xhdCc7XG4gIH0gZWxzZSBpZiAod2t0LnR5cGUgPT09ICdMT0NBTF9DUycpIHtcbiAgICB3a3QucHJvak5hbWUgPSAnaWRlbnRpdHknO1xuICAgIHdrdC5sb2NhbCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiB3a3QuUFJPSkVDVElPTiA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHdrdC5wcm9qTmFtZSA9IE9iamVjdC5rZXlzKHdrdC5QUk9KRUNUSU9OKVswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2t0LnByb2pOYW1lID0gd2t0LlBST0pFQ1RJT047XG4gICAgfVxuICB9XG4gIGlmICh3a3QuVU5JVCkge1xuICAgIHdrdC51bml0cyA9IHdrdC5VTklULm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAod2t0LnVuaXRzID09PSAnbWV0cmUnKSB7XG4gICAgICB3a3QudW5pdHMgPSAnbWV0ZXInO1xuICAgIH1cbiAgICBpZiAod2t0LlVOSVQuY29udmVydCkge1xuICAgICAgaWYgKHdrdC50eXBlID09PSAnR0VPR0NTJykge1xuICAgICAgICBpZiAod2t0LkRBVFVNICYmIHdrdC5EQVRVTS5TUEhFUk9JRCkge1xuICAgICAgICAgIHdrdC50b19tZXRlciA9IHdrdC5VTklULmNvbnZlcnQqd2t0LkRBVFVNLlNQSEVST0lELmE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdrdC50b19tZXRlciA9IHdrdC5VTklULmNvbnZlcnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHZhciBnZW9nY3MgPSB3a3QuR0VPR0NTO1xuICBpZiAod2t0LnR5cGUgPT09ICdHRU9HQ1MnKSB7XG4gICAgZ2VvZ2NzID0gd2t0O1xuICB9XG4gIGlmIChnZW9nY3MpIHtcbiAgICAvL2lmKHdrdC5HRU9HQ1MuUFJJTUVNJiZ3a3QuR0VPR0NTLlBSSU1FTS5jb252ZXJ0KXtcbiAgICAvLyAgd2t0LmZyb21fZ3JlZW53aWNoPXdrdC5HRU9HQ1MuUFJJTUVNLmNvbnZlcnQqRDJSO1xuICAgIC8vfVxuICAgIGlmIChnZW9nY3MuREFUVU0pIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSBnZW9nY3MuREFUVU0ubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3a3QuZGF0dW1Db2RlID0gZ2VvZ2NzLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gICAgaWYgKHdrdC5kYXR1bUNvZGUuc2xpY2UoMCwgMikgPT09ICdkXycpIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSB3a3QuZGF0dW1Db2RlLnNsaWNlKDIpO1xuICAgIH1cbiAgICBpZiAod2t0LmRhdHVtQ29kZSA9PT0gJ25ld196ZWFsYW5kX2dlb2RldGljX2RhdHVtXzE5NDknIHx8IHdrdC5kYXR1bUNvZGUgPT09ICduZXdfemVhbGFuZF8xOTQ5Jykge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9ICduemdkNDknO1xuICAgIH1cbiAgICBpZiAod2t0LmRhdHVtQ29kZSA9PT0gJ3dnc18xOTg0Jykge1xuICAgICAgaWYgKHdrdC5QUk9KRUNUSU9OID09PSAnTWVyY2F0b3JfQXV4aWxpYXJ5X1NwaGVyZScpIHtcbiAgICAgICAgd2t0LnNwaGVyZSA9IHRydWU7XG4gICAgICB9XG4gICAgICB3a3QuZGF0dW1Db2RlID0gJ3dnczg0JztcbiAgICB9XG4gICAgaWYgKHdrdC5kYXR1bUNvZGUuc2xpY2UoLTYpID09PSAnX2ZlcnJvJykge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9IHdrdC5kYXR1bUNvZGUuc2xpY2UoMCwgLSA2KTtcbiAgICB9XG4gICAgaWYgKHdrdC5kYXR1bUNvZGUuc2xpY2UoLTgpID09PSAnX2pha2FydGEnKSB7XG4gICAgICB3a3QuZGF0dW1Db2RlID0gd2t0LmRhdHVtQ29kZS5zbGljZSgwLCAtIDgpO1xuICAgIH1cbiAgICBpZiAofndrdC5kYXR1bUNvZGUuaW5kZXhPZignYmVsZ2UnKSkge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9ICdybmI3Mic7XG4gICAgfVxuICAgIGlmIChnZW9nY3MuREFUVU0gJiYgZ2VvZ2NzLkRBVFVNLlNQSEVST0lEKSB7XG4gICAgICB3a3QuZWxscHMgPSBnZW9nY3MuREFUVU0uU1BIRVJPSUQubmFtZS5yZXBsYWNlKCdfMTknLCAnJykucmVwbGFjZSgvW0NjXWxhcmtlXFxfMTgvLCAnY2xyaycpO1xuICAgICAgaWYgKHdrdC5lbGxwcy50b0xvd2VyQ2FzZSgpLnNsaWNlKDAsIDEzKSA9PT0gJ2ludGVybmF0aW9uYWwnKSB7XG4gICAgICAgIHdrdC5lbGxwcyA9ICdpbnRsJztcbiAgICAgIH1cblxuICAgICAgd2t0LmEgPSBnZW9nY3MuREFUVU0uU1BIRVJPSUQuYTtcbiAgICAgIHdrdC5yZiA9IHBhcnNlRmxvYXQoZ2VvZ2NzLkRBVFVNLlNQSEVST0lELnJmLCAxMCk7XG4gICAgfVxuXG4gICAgaWYgKGdlb2djcy5EQVRVTSAmJiBnZW9nY3MuREFUVU0uVE9XR1M4NCkge1xuICAgICAgd2t0LmRhdHVtX3BhcmFtcyA9IGdlb2djcy5EQVRVTS5UT1dHUzg0O1xuICAgIH1cbiAgICBpZiAofndrdC5kYXR1bUNvZGUuaW5kZXhPZignb3NnYl8xOTM2JykpIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSAnb3NnYjM2JztcbiAgICB9XG4gICAgaWYgKH53a3QuZGF0dW1Db2RlLmluZGV4T2YoJ29zbmlfMTk1MicpKSB7XG4gICAgICB3a3QuZGF0dW1Db2RlID0gJ29zbmk1Mic7XG4gICAgfVxuICAgIGlmICh+d2t0LmRhdHVtQ29kZS5pbmRleE9mKCd0bTY1JylcbiAgICAgIHx8IH53a3QuZGF0dW1Db2RlLmluZGV4T2YoJ2dlb2RldGljX2RhdHVtX29mXzE5NjUnKSkge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9ICdpcmU2NSc7XG4gICAgfVxuICAgIGlmICh3a3QuZGF0dW1Db2RlID09PSAnY2gxOTAzKycpIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSAnY2gxOTAzJztcbiAgICB9XG4gICAgaWYgKH53a3QuZGF0dW1Db2RlLmluZGV4T2YoJ2lzcmFlbCcpKSB7XG4gICAgICB3a3QuZGF0dW1Db2RlID0gJ2lzcjkzJztcbiAgICB9XG4gIH1cbiAgaWYgKHdrdC5iICYmICFpc0Zpbml0ZSh3a3QuYikpIHtcbiAgICB3a3QuYiA9IHdrdC5hO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9NZXRlcihpbnB1dCkge1xuICAgIHZhciByYXRpbyA9IHdrdC50b19tZXRlciB8fCAxO1xuICAgIHJldHVybiBpbnB1dCAqIHJhdGlvO1xuICB9XG4gIHZhciByZW5hbWVyID0gZnVuY3Rpb24oYSkge1xuICAgIHJldHVybiByZW5hbWUod2t0LCBhKTtcbiAgfTtcbiAgdmFyIGxpc3QgPSBbXG4gICAgWydzdGFuZGFyZF9wYXJhbGxlbF8xJywgJ1N0YW5kYXJkX1BhcmFsbGVsXzEnXSxcbiAgICBbJ3N0YW5kYXJkX3BhcmFsbGVsXzInLCAnU3RhbmRhcmRfUGFyYWxsZWxfMiddLFxuICAgIFsnZmFsc2VfZWFzdGluZycsICdGYWxzZV9FYXN0aW5nJ10sXG4gICAgWydmYWxzZV9ub3J0aGluZycsICdGYWxzZV9Ob3J0aGluZyddLFxuICAgIFsnY2VudHJhbF9tZXJpZGlhbicsICdDZW50cmFsX01lcmlkaWFuJ10sXG4gICAgWydsYXRpdHVkZV9vZl9vcmlnaW4nLCAnTGF0aXR1ZGVfT2ZfT3JpZ2luJ10sXG4gICAgWydsYXRpdHVkZV9vZl9vcmlnaW4nLCAnQ2VudHJhbF9QYXJhbGxlbCddLFxuICAgIFsnc2NhbGVfZmFjdG9yJywgJ1NjYWxlX0ZhY3RvciddLFxuICAgIFsnazAnLCAnc2NhbGVfZmFjdG9yJ10sXG4gICAgWydsYXRpdHVkZV9vZl9jZW50ZXInLCAnTGF0aXR1ZGVfT2ZfQ2VudGVyJ10sXG4gICAgWydsYXRpdHVkZV9vZl9jZW50ZXInLCAnTGF0aXR1ZGVfb2ZfY2VudGVyJ10sXG4gICAgWydsYXQwJywgJ2xhdGl0dWRlX29mX2NlbnRlcicsIGQycl0sXG4gICAgWydsb25naXR1ZGVfb2ZfY2VudGVyJywgJ0xvbmdpdHVkZV9PZl9DZW50ZXInXSxcbiAgICBbJ2xvbmdpdHVkZV9vZl9jZW50ZXInLCAnTG9uZ2l0dWRlX29mX2NlbnRlciddLFxuICAgIFsnbG9uZ2MnLCAnbG9uZ2l0dWRlX29mX2NlbnRlcicsIGQycl0sXG4gICAgWyd4MCcsICdmYWxzZV9lYXN0aW5nJywgdG9NZXRlcl0sXG4gICAgWyd5MCcsICdmYWxzZV9ub3J0aGluZycsIHRvTWV0ZXJdLFxuICAgIFsnbG9uZzAnLCAnY2VudHJhbF9tZXJpZGlhbicsIGQycl0sXG4gICAgWydsYXQwJywgJ2xhdGl0dWRlX29mX29yaWdpbicsIGQycl0sXG4gICAgWydsYXQwJywgJ3N0YW5kYXJkX3BhcmFsbGVsXzEnLCBkMnJdLFxuICAgIFsnbGF0MScsICdzdGFuZGFyZF9wYXJhbGxlbF8xJywgZDJyXSxcbiAgICBbJ2xhdDInLCAnc3RhbmRhcmRfcGFyYWxsZWxfMicsIGQycl0sXG4gICAgWydhemltdXRoJywgJ0F6aW11dGgnXSxcbiAgICBbJ2FscGhhJywgJ2F6aW11dGgnLCBkMnJdLFxuICAgIFsnc3JzQ29kZScsICduYW1lJ11cbiAgXTtcbiAgbGlzdC5mb3JFYWNoKHJlbmFtZXIpO1xuICBpZiAoIXdrdC5sb25nMCAmJiB3a3QubG9uZ2MgJiYgKHdrdC5wcm9qTmFtZSA9PT0gJ0FsYmVyc19Db25pY19FcXVhbF9BcmVhJyB8fCB3a3QucHJvak5hbWUgPT09ICdMYW1iZXJ0X0F6aW11dGhhbF9FcXVhbF9BcmVhJykpIHtcbiAgICB3a3QubG9uZzAgPSB3a3QubG9uZ2M7XG4gIH1cbiAgaWYgKCF3a3QubGF0X3RzICYmIHdrdC5sYXQxICYmICh3a3QucHJvak5hbWUgPT09ICdTdGVyZW9ncmFwaGljX1NvdXRoX1BvbGUnIHx8IHdrdC5wcm9qTmFtZSA9PT0gJ1BvbGFyIFN0ZXJlb2dyYXBoaWMgKHZhcmlhbnQgQiknKSkge1xuICAgIHdrdC5sYXQwID0gZDJyKHdrdC5sYXQxID4gMCA/IDkwIDogLTkwKTtcbiAgICB3a3QubGF0X3RzID0gd2t0LmxhdDE7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHdrdCkge1xuICB2YXIgbGlzcCA9IHBhcnNlcih3a3QpO1xuICB2YXIgdHlwZSA9IGxpc3Auc2hpZnQoKTtcbiAgdmFyIG5hbWUgPSBsaXNwLnNoaWZ0KCk7XG4gIGxpc3AudW5zaGlmdChbJ25hbWUnLCBuYW1lXSk7XG4gIGxpc3AudW5zaGlmdChbJ3R5cGUnLCB0eXBlXSk7XG4gIHZhciBvYmogPSB7fTtcbiAgc0V4cHIobGlzcCwgb2JqKTtcbiAgY2xlYW5XS1Qob2JqKTtcbiAgcmV0dXJuIG9iajtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3drdC1wYXJzZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3drdC1wYXJzZXIvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgcGFyc2VTdHJpbmc7XG5cbnZhciBORVVUUkFMID0gMTtcbnZhciBLRVlXT1JEID0gMjtcbnZhciBOVU1CRVIgPSAzO1xudmFyIFFVT1RFRCA9IDQ7XG52YXIgQUZURVJRVU9URSA9IDU7XG52YXIgRU5ERUQgPSAtMTtcbnZhciB3aGl0ZXNwYWNlID0gL1xccy87XG52YXIgbGF0aW4gPSAvW0EtWmEtel0vO1xudmFyIGtleXdvcmQgPSAvW0EtWmEtejg0XS87XG52YXIgZW5kVGhpbmdzID0gL1ssXFxdXS87XG52YXIgZGlnZXRzID0gL1tcXGRcXC5FXFwtXFwrXS87XG4vLyBjb25zdCBpZ25vcmVkQ2hhciA9IC9bXFxzX1xcLVxcL1xcKFxcKV0vZztcbmZ1bmN0aW9uIFBhcnNlcih0ZXh0KSB7XG4gIGlmICh0eXBlb2YgdGV4dCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBhIHN0cmluZycpO1xuICB9XG4gIHRoaXMudGV4dCA9IHRleHQudHJpbSgpO1xuICB0aGlzLmxldmVsID0gMDtcbiAgdGhpcy5wbGFjZSA9IDA7XG4gIHRoaXMucm9vdCA9IG51bGw7XG4gIHRoaXMuc3RhY2sgPSBbXTtcbiAgdGhpcy5jdXJyZW50T2JqZWN0ID0gbnVsbDtcbiAgdGhpcy5zdGF0ZSA9IE5FVVRSQUw7XG59XG5QYXJzZXIucHJvdG90eXBlLnJlYWRDaGFyaWN0ZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNoYXIgPSB0aGlzLnRleHRbdGhpcy5wbGFjZSsrXTtcbiAgaWYgKHRoaXMuc3RhdGUgIT09IFFVT1RFRCkge1xuICAgIHdoaWxlICh3aGl0ZXNwYWNlLnRlc3QoY2hhcikpIHtcbiAgICAgIGlmICh0aGlzLnBsYWNlID49IHRoaXMudGV4dC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY2hhciA9IHRoaXMudGV4dFt0aGlzLnBsYWNlKytdO1xuICAgIH1cbiAgfVxuICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICBjYXNlIE5FVVRSQUw6XG4gICAgICByZXR1cm4gdGhpcy5uZXV0cmFsKGNoYXIpO1xuICAgIGNhc2UgS0VZV09SRDpcbiAgICAgIHJldHVybiB0aGlzLmtleXdvcmQoY2hhcilcbiAgICBjYXNlIFFVT1RFRDpcbiAgICAgIHJldHVybiB0aGlzLnF1b3RlZChjaGFyKTtcbiAgICBjYXNlIEFGVEVSUVVPVEU6XG4gICAgICByZXR1cm4gdGhpcy5hZnRlcnF1b3RlKGNoYXIpO1xuICAgIGNhc2UgTlVNQkVSOlxuICAgICAgcmV0dXJuIHRoaXMubnVtYmVyKGNoYXIpO1xuICAgIGNhc2UgRU5ERUQ6XG4gICAgICByZXR1cm47XG4gIH1cbn07XG5QYXJzZXIucHJvdG90eXBlLmFmdGVycXVvdGUgPSBmdW5jdGlvbihjaGFyKSB7XG4gIGlmIChjaGFyID09PSAnXCInKSB7XG4gICAgdGhpcy53b3JkICs9ICdcIic7XG4gICAgdGhpcy5zdGF0ZSA9IFFVT1RFRDtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGVuZFRoaW5ncy50ZXN0KGNoYXIpKSB7XG4gICAgdGhpcy53b3JkID0gdGhpcy53b3JkLnRyaW0oKTtcbiAgICB0aGlzLmFmdGVySXRlbShjaGFyKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdoYXZuXFwndCBoYW5kbGVkIFwiJyArY2hhciArICdcIiBpbiBhZnRlcnF1b3RlIHlldCwgaW5kZXggJyArIHRoaXMucGxhY2UpO1xufTtcblBhcnNlci5wcm90b3R5cGUuYWZ0ZXJJdGVtID0gZnVuY3Rpb24oY2hhcikge1xuICBpZiAoY2hhciA9PT0gJywnKSB7XG4gICAgaWYgKHRoaXMud29yZCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5jdXJyZW50T2JqZWN0LnB1c2godGhpcy53b3JkKTtcbiAgICB9XG4gICAgdGhpcy53b3JkID0gbnVsbDtcbiAgICB0aGlzLnN0YXRlID0gTkVVVFJBTDtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNoYXIgPT09ICddJykge1xuICAgIHRoaXMubGV2ZWwtLTtcbiAgICBpZiAodGhpcy53b3JkICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmN1cnJlbnRPYmplY3QucHVzaCh0aGlzLndvcmQpO1xuICAgICAgdGhpcy53b3JkID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IE5FVVRSQUw7XG4gICAgdGhpcy5jdXJyZW50T2JqZWN0ID0gdGhpcy5zdGFjay5wb3AoKTtcbiAgICBpZiAoIXRoaXMuY3VycmVudE9iamVjdCkge1xuICAgICAgdGhpcy5zdGF0ZSA9IEVOREVEO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxufTtcblBhcnNlci5wcm90b3R5cGUubnVtYmVyID0gZnVuY3Rpb24oY2hhcikge1xuICBpZiAoZGlnZXRzLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLndvcmQgKz0gY2hhcjtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGVuZFRoaW5ncy50ZXN0KGNoYXIpKSB7XG4gICAgdGhpcy53b3JkID0gcGFyc2VGbG9hdCh0aGlzLndvcmQpO1xuICAgIHRoaXMuYWZ0ZXJJdGVtKGNoYXIpO1xuICAgIHJldHVybjtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ2hhdm5cXCd0IGhhbmRsZWQgXCInICtjaGFyICsgJ1wiIGluIG51bWJlciB5ZXQsIGluZGV4ICcgKyB0aGlzLnBsYWNlKTtcbn07XG5QYXJzZXIucHJvdG90eXBlLnF1b3RlZCA9IGZ1bmN0aW9uKGNoYXIpIHtcbiAgaWYgKGNoYXIgPT09ICdcIicpIHtcbiAgICB0aGlzLnN0YXRlID0gQUZURVJRVU9URTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy53b3JkICs9IGNoYXI7XG4gIHJldHVybjtcbn07XG5QYXJzZXIucHJvdG90eXBlLmtleXdvcmQgPSBmdW5jdGlvbihjaGFyKSB7XG4gIGlmIChrZXl3b3JkLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLndvcmQgKz0gY2hhcjtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNoYXIgPT09ICdbJykge1xuICAgIHZhciBuZXdPYmplY3RzID0gW107XG4gICAgbmV3T2JqZWN0cy5wdXNoKHRoaXMud29yZCk7XG4gICAgdGhpcy5sZXZlbCsrO1xuICAgIGlmICh0aGlzLnJvb3QgPT09IG51bGwpIHtcbiAgICAgIHRoaXMucm9vdCA9IG5ld09iamVjdHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudE9iamVjdC5wdXNoKG5ld09iamVjdHMpO1xuICAgIH1cbiAgICB0aGlzLnN0YWNrLnB1c2godGhpcy5jdXJyZW50T2JqZWN0KTtcbiAgICB0aGlzLmN1cnJlbnRPYmplY3QgPSBuZXdPYmplY3RzO1xuICAgIHRoaXMuc3RhdGUgPSBORVVUUkFMO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZW5kVGhpbmdzLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLmFmdGVySXRlbShjaGFyKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdoYXZuXFwndCBoYW5kbGVkIFwiJyArY2hhciArICdcIiBpbiBrZXl3b3JkIHlldCwgaW5kZXggJyArIHRoaXMucGxhY2UpO1xufTtcblBhcnNlci5wcm90b3R5cGUubmV1dHJhbCA9IGZ1bmN0aW9uKGNoYXIpIHtcbiAgaWYgKGxhdGluLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLndvcmQgPSBjaGFyO1xuICAgIHRoaXMuc3RhdGUgPSBLRVlXT1JEO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2hhciA9PT0gJ1wiJykge1xuICAgIHRoaXMud29yZCA9ICcnO1xuICAgIHRoaXMuc3RhdGUgPSBRVU9URUQ7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChkaWdldHMudGVzdChjaGFyKSkge1xuICAgIHRoaXMud29yZCA9IGNoYXI7XG4gICAgdGhpcy5zdGF0ZSA9IE5VTUJFUjtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGVuZFRoaW5ncy50ZXN0KGNoYXIpKSB7XG4gICAgdGhpcy5hZnRlckl0ZW0oY2hhcik7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignaGF2blxcJ3QgaGFuZGxlZCBcIicgK2NoYXIgKyAnXCIgaW4gbmV1dHJhbCB5ZXQsIGluZGV4ICcgKyB0aGlzLnBsYWNlKTtcbn07XG5QYXJzZXIucHJvdG90eXBlLm91dHB1dCA9IGZ1bmN0aW9uKCkge1xuICB3aGlsZSAodGhpcy5wbGFjZSA8IHRoaXMudGV4dC5sZW5ndGgpIHtcbiAgICB0aGlzLnJlYWRDaGFyaWN0ZXIoKTtcbiAgfVxuICBpZiAodGhpcy5zdGF0ZSA9PT0gRU5ERUQpIHtcbiAgICByZXR1cm4gdGhpcy5yb290O1xuICB9XG4gIHRocm93IG5ldyBFcnJvcigndW5hYmxlIHRvIHBhcnNlIHN0cmluZyBcIicgK3RoaXMudGV4dCArICdcIi4gU3RhdGUgaXMgJyArIHRoaXMuc3RhdGUpO1xufTtcblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcodHh0KSB7XG4gIHZhciBwYXJzZXIgPSBuZXcgUGFyc2VyKHR4dCk7XG4gIHJldHVybiBwYXJzZXIub3V0cHV0KCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93a3QtcGFyc2VyL3BhcnNlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2t0LXBhcnNlci9wYXJzZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5cbmZ1bmN0aW9uIG1hcGl0KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShrZXkpKSB7XG4gICAgdmFsdWUudW5zaGlmdChrZXkpO1xuICAgIGtleSA9IG51bGw7XG4gIH1cbiAgdmFyIHRoaW5nID0ga2V5ID8ge30gOiBvYmo7XG5cbiAgdmFyIG91dCA9IHZhbHVlLnJlZHVjZShmdW5jdGlvbihuZXdPYmosIGl0ZW0pIHtcbiAgICBzRXhwcihpdGVtLCBuZXdPYmopO1xuICAgIHJldHVybiBuZXdPYmpcbiAgfSwgdGhpbmcpO1xuICBpZiAoa2V5KSB7XG4gICAgb2JqW2tleV0gPSBvdXQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNFeHByKHYsIG9iaikge1xuICBpZiAoIUFycmF5LmlzQXJyYXkodikpIHtcbiAgICBvYmpbdl0gPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIga2V5ID0gdi5zaGlmdCgpO1xuICBpZiAoa2V5ID09PSAnUEFSQU1FVEVSJykge1xuICAgIGtleSA9IHYuc2hpZnQoKTtcbiAgfVxuICBpZiAodi5sZW5ndGggPT09IDEpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2WzBdKSkge1xuICAgICAgb2JqW2tleV0gPSB7fTtcbiAgICAgIHNFeHByKHZbMF0sIG9ialtrZXldKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb2JqW2tleV0gPSB2WzBdO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXYubGVuZ3RoKSB7XG4gICAgb2JqW2tleV0gPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoa2V5ID09PSAnVE9XR1M4NCcpIHtcbiAgICBvYmpba2V5XSA9IHY7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghQXJyYXkuaXNBcnJheShrZXkpKSB7XG4gICAgb2JqW2tleV0gPSB7fTtcbiAgfVxuXG4gIHZhciBpO1xuICBzd2l0Y2ggKGtleSkge1xuICAgIGNhc2UgJ1VOSVQnOlxuICAgIGNhc2UgJ1BSSU1FTSc6XG4gICAgY2FzZSAnVkVSVF9EQVRVTSc6XG4gICAgICBvYmpba2V5XSA9IHtcbiAgICAgICAgbmFtZTogdlswXS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICBjb252ZXJ0OiB2WzFdXG4gICAgICB9O1xuICAgICAgaWYgKHYubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIHNFeHByKHZbMl0sIG9ialtrZXldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICBjYXNlICdTUEhFUk9JRCc6XG4gICAgY2FzZSAnRUxMSVBTT0lEJzpcbiAgICAgIG9ialtrZXldID0ge1xuICAgICAgICBuYW1lOiB2WzBdLFxuICAgICAgICBhOiB2WzFdLFxuICAgICAgICByZjogdlsyXVxuICAgICAgfTtcbiAgICAgIGlmICh2Lmxlbmd0aCA9PT0gNCkge1xuICAgICAgICBzRXhwcih2WzNdLCBvYmpba2V5XSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgY2FzZSAnUFJPSkVDVEVEQ1JTJzpcbiAgICBjYXNlICdQUk9KQ1JTJzpcbiAgICBjYXNlICdHRU9HQ1MnOlxuICAgIGNhc2UgJ0dFT0NDUyc6XG4gICAgY2FzZSAnUFJPSkNTJzpcbiAgICBjYXNlICdMT0NBTF9DUyc6XG4gICAgY2FzZSAnR0VPRENSUyc6XG4gICAgY2FzZSAnR0VPREVUSUNDUlMnOlxuICAgIGNhc2UgJ0dFT0RFVElDREFUVU0nOlxuICAgIGNhc2UgJ0VEQVRVTSc6XG4gICAgY2FzZSAnRU5HSU5FRVJJTkdEQVRVTSc6XG4gICAgY2FzZSAnVkVSVF9DUyc6XG4gICAgY2FzZSAnVkVSVENSUyc6XG4gICAgY2FzZSAnVkVSVElDQUxDUlMnOlxuICAgIGNhc2UgJ0NPTVBEX0NTJzpcbiAgICBjYXNlICdDT01QT1VORENSUyc6XG4gICAgY2FzZSAnRU5HSU5FRVJJTkdDUlMnOlxuICAgIGNhc2UgJ0VOR0NSUyc6XG4gICAgY2FzZSAnRklUVEVEX0NTJzpcbiAgICBjYXNlICdMT0NBTF9EQVRVTSc6XG4gICAgY2FzZSAnREFUVU0nOlxuICAgICAgdlswXSA9IFsnbmFtZScsIHZbMF1dO1xuICAgICAgbWFwaXQob2JqLCBrZXksIHYpO1xuICAgICAgcmV0dXJuO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpID0gLTE7XG4gICAgICB3aGlsZSAoKytpIDwgdi5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIHNFeHByKHYsIG9ialtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1hcGl0KG9iaiwga2V5LCB2KTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2t0LXBhcnNlci9wcm9jZXNzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93a3QtcGFyc2VyL3Byb2Nlc3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==