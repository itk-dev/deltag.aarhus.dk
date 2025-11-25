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

  var defaultMapConfig = function () {
    var widget = document.querySelector('.septima-widget');

    if (widget && widget.parentElement && widget.parentElement.getAttribute('data-map-config')) {
      var _config = widget.parentElement.getAttribute('data-map-config');
      var configObj = JSON.parse(_config);
      var transformedCoordinates = Object(__WEBPACK_IMPORTED_MODULE_0_proj4__["a" /* default */])('EPSG:4326', 'EPSG:25832', [configObj.x, configObj.y]);
      if (transformedCoordinates) {
        return {
          'x': transformedCoordinates[0],
          'y': transformedCoordinates[1],
          'zoomLevel': configObj.zoomLevel
        };
      }
    }
    return {
      'x': null,
      'y': null,
      'zoomLevel': 12
    };
  }();

  var config = {
    'map': {
      'maxZoomLevel': 1,
      'minZoomLevel': 22,
      'view': defaultMapConfig,
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
        'features_style': {
          'namedstyle': '#004'
        }
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
            'namedstyle': '#004'
          },
          'driver': [{
            'type': 'dawa',
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
    var data = function () {
      try {
        var _data = JSON.parse(container.getAttribute('data-value'));
        return project(_data, targetMapProjection, config.map.srs || defaultMapProjection);
      } catch (ex) {}

      return null;
    }();

    var target = document.querySelector(container.getAttribute('data-value-target'));
    if (target !== null) {
      var resetMap = function resetMap(data) {
        // Center map on point.
        var coordinates = data.features[0].geometry.coordinates;
        config.map.view.x = coordinates[0];
        config.map.view.y = coordinates[1];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWNhYzU0NjcwN2I0YzgyYzRkNjYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2Nzcy9oZWFyaW5nLWVkaXQuY3NzPzgxYTUiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2hlYXJpbmctZWRpdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWdycy9tZ3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvUG9pbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9Qcm9qLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvYWRqdXN0X2F4aXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jaGVja1Nhbml0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9hZGp1c3RfbGF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2FkanVzdF9sb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vYWRqdXN0X3pvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vYXNpbmh5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2FzaW56LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2NsZW5zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2NsZW5zX2NtcGx4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2Nvc2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vZTBmbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9lMWZuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2UyZm4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vZTNmbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9nTi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9nYXRnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2h5cG90LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2ltbGZuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2lxc2Zuei5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9sb2cxcHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vbWxmbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9tc2Zuei5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9waGkyei5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9wal9lbmZuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3BqX2ludl9tbGZuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3BqX21sZm4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vcXNmbnouanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9zaW5oLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3NyYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vdG9Qb2ludC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi90c2Zuei5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy9EYXR1bS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy9FbGxpcHNvaWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb25zdGFudHMvUHJpbWVNZXJpZGlhbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy91bml0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy92YWx1ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvZGF0dW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9kYXR1bVV0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvZGF0dW1fdHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvZGVmcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2Rlcml2ZUNvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2V4dGVuZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvbWF0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wYXJzZUNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qU3RyaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9hZWEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9hZXFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvY2Fzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2NlYS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2VxYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2VxZGMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9ldG1lcmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9nYXVzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2dub20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9rcm92YWsuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9sYWVhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbGNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbG9uZ2xhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL21lcmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9taWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbW9sbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL256bWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9vbWVyYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL29ydGhvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvcG9seS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3FzYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3JvYmluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvc2ludS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3NvbWVyYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3N0ZXJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvc3RlcmVhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvdG1lcmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy91dG0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy92YW5kZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2o0L3BhY2thZ2UuanNvbiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvajQvcHJvanMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3drdC1wYXJzZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3drdC1wYXJzZXIvcGFyc2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93a3QtcGFyc2VyL3Byb2Nlc3MuanMiXSwibmFtZXMiOlsid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImFwcGx5TWFwIiwiZG9tT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb24iLCJmb3JFYWNoIiwiYWRkZWROb2RlcyIsIm5vZGUiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm9ic2VydmUiLCJkb2N1bWVudCIsImJvZHkiLCJjaGlsZExpc3QiLCJyZXF1aXJlIiwicHJvajQiLCJkZWZzIiwiZGVmYXVsdE1hcFByb2plY3Rpb24iLCJ0YXJnZXRNYXBQcm9qZWN0aW9uIiwicHJvamVjdCIsImdlb2pzb24iLCJmcm9tUHJvamVjdGlvbiIsInRvUHJvamVjdGlvbiIsImZlYXR1cmVzIiwibGVuZ3RoIiwiZ2VvbWV0cnkiLCJ0eXBlIiwiY29vcmRpbmF0ZXMiLCJjcnMiLCJwcm9wZXJ0aWVzIiwibmFtZSIsImRlZmF1bHRNYXBDb25maWciLCJ3aWRnZXQiLCJxdWVyeVNlbGVjdG9yIiwicGFyZW50RWxlbWVudCIsImdldEF0dHJpYnV0ZSIsImNvbmZpZyIsImNvbmZpZ09iaiIsIkpTT04iLCJwYXJzZSIsInRyYW5zZm9ybWVkQ29vcmRpbmF0ZXMiLCJ4IiwieSIsInpvb21MZXZlbCIsIndpZGdldHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY29udGFpbmVyIiwiZGF0YSIsIm1hcCIsInNycyIsImV4IiwidGFyZ2V0IiwicmVzZXRNYXAiLCJ2aWV3IiwibGF5ZXIiLCJzZXRDb25maWciLCJ2YWx1ZSIsInN0cmluZ2lmeSIsIldpZGdldEFQSSIsIm9uIiwiZXZlbnRuYW1lIiwic2NvcGUiLCJtYXBzdGF0ZSIsInByb2plY3Rpb24iLCJfb3B0aW9ucyIsImZlYXR1cmUiLCJyZXNldE1hcEN0cmwiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwiaW5uZXJIVE1MIiwiRHJ1cGFsIiwidCIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJsYXN0Q2hpbGQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdEQSx5Qzs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTs7Ozs7QUFLQTs7QUFFQUEsT0FBT0MsZ0JBQVAsQ0FBd0IsTUFBeEIs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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7QUNUZTtBQUNmO0FBQ0EsQzs7Ozs7Ozs7Ozs7OztBQ0ZlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7OztBQ0plO0FBQ2Y7QUFDQSxDOzs7Ozs7Ozs7Ozs7O0FDRmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQTRDOztBQUU3QjtBQUNmO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixrRUFBTztBQUNqQyxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ1BEO0FBQUE7QUFDNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RHQTtBQUFBO0FBQUE7QUFDNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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QUNBLFVBQVUsaUVBQU07QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzRUFBSztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsa0VBQU87QUFDakI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGtFQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixnRUFBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGdFQUFLO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGdFQUFLO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGtFQUFPO0FBQ25CO0FBQ0E7QUFDQSxhQUFhLGtFQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdFQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLDJFQUFVO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmLGFBQWEsZ0VBQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsK0RBQUs7QUFDUDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUMxS2Msb0VBQVcsRUFBQzs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7QUFFdEI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaGVhcmluZy1lZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvanMvaGVhcmluZy1lZGl0LmpzXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGFjYWM1NDY3MDdiNGM4MmM0ZDY2IiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9jc3MvaGVhcmluZy1lZGl0LmNzc1xuLy8gbW9kdWxlIGlkID0gLi9hc3NldHMvY3NzL2hlYXJpbmctZWRpdC5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBAZmlsZVxuICogRW5jb3JlIGNvbmZpZyBnbG9iYWwgV2lkZ2V0QVBJLlxuICovXG5cbmltcG9ydCBwcm9qNCBmcm9tICdwcm9qNCdcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gIGFwcGx5TWFwKClcbn0pXG5cbi8vIElmIHRoZSBtYXAgaXMgYWRkZWQgdG8gYSBkaWFsb2csIHdlIG5lZWQgdG8gcmUtYXBwbHkgdGhlIG1hcCBhZnRlciB0aGUgZGlhbG9nIGlzIG9wZW5lZC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxubGV0IGRvbU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9uKSB7XG4gIG11dGF0aW9uLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XG4gICAgbXV0YXRpb24uYWRkZWROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBpZiAobm9kZS5jbGFzc0xpc3QgJiYgbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3VpLWRpYWxvZycpKSB7XG4gICAgICAgIGFwcGx5TWFwKClcbiAgICAgIH1cbiAgICB9KVxuICB9KVxufSlcblxuZG9tT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSB9KVxuXG5mdW5jdGlvbiBhcHBseU1hcCAoKSB7XG4gIHJlcXVpcmUoJy4uL2Nzcy9oZWFyaW5nLWVkaXQuY3NzJylcbiAgLy8gRGVmaW5lIGRlZmF1bHQgU2VwdGltYSBwcm9qZWN0aW9uLlxuICBwcm9qNC5kZWZzKCdFUFNHOjI1ODMyJywgJytwcm9qPXV0bSArem9uZT0zMiArZWxscHM9R1JTODAgK3VuaXRzPW0gK25vX2RlZnMnKVxuXG4gIC8vIEFsaWFzZXMgZm9yIGNvbnZlbmllbmNlLlxuICBwcm9qNC5kZWZzKCd1cm46b2djOmRlZjpjcnM6RVBTRzo6NDMyNicsIHByb2o0LmRlZnMoJ0VQU0c6NDMyNicpKVxuICBwcm9qNC5kZWZzKCd1cm46b2djOmRlZjpjcnM6RVBTRzo6MjU4MzInLCBwcm9qNC5kZWZzKCdFUFNHOjI1ODMyJykpXG5cbiAgY29uc3QgZGVmYXVsdE1hcFByb2plY3Rpb24gPSAndXJuOm9nYzpkZWY6Y3JzOkVQU0c6OjI1ODMyJ1xuICBjb25zdCB0YXJnZXRNYXBQcm9qZWN0aW9uID0gJ3VybjpvZ2M6ZGVmOmNyczpFUFNHOjo0MzI2J1xuXG4gIC8vIFByb2plY3QgYSBzaW1wbGUgZ2VvanNvbiBvYmplY3QgdG8gYSBuZXcgcHJvamVjdGlvbi5cbiAgY29uc3QgcHJvamVjdCA9IChnZW9qc29uLCBmcm9tUHJvamVjdGlvbiwgdG9Qcm9qZWN0aW9uKSA9PiB7XG4gICAgaWYgKGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoID09PSAxICYmIGdlb2pzb24uZmVhdHVyZXNbMF0uZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgZ2VvanNvbi5mZWF0dXJlc1swXS5nZW9tZXRyeS5jb29yZGluYXRlcyA9IHByb2o0KGZyb21Qcm9qZWN0aW9uLCB0b1Byb2plY3Rpb24sIGdlb2pzb24uZmVhdHVyZXNbMF0uZ2VvbWV0cnkuY29vcmRpbmF0ZXMpXG4gICAgICBnZW9qc29uLmNycy5wcm9wZXJ0aWVzLm5hbWUgPSB0b1Byb2plY3Rpb25cbiAgICB9XG5cbiAgICByZXR1cm4gZ2VvanNvblxuICB9XG5cbiAgY29uc3QgZGVmYXVsdE1hcENvbmZpZyA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlcHRpbWEtd2lkZ2V0JylcblxuICAgIGlmICh3aWRnZXQgJiYgd2lkZ2V0LnBhcmVudEVsZW1lbnQgJiYgd2lkZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW1hcC1jb25maWcnKSkge1xuICAgICAgY29uc3QgY29uZmlnID0gd2lkZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW1hcC1jb25maWcnKVxuICAgICAgY29uc3QgY29uZmlnT2JqID0gSlNPTi5wYXJzZShjb25maWcpXG4gICAgICBjb25zdCB0cmFuc2Zvcm1lZENvb3JkaW5hdGVzID0gcHJvajQoJ0VQU0c6NDMyNicsICdFUFNHOjI1ODMyJywgW2NvbmZpZ09iai54LCBjb25maWdPYmoueV0pXG4gICAgICBpZiAodHJhbnNmb3JtZWRDb29yZGluYXRlcykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICd4JzogdHJhbnNmb3JtZWRDb29yZGluYXRlc1swXSxcbiAgICAgICAgICAneSc6IHRyYW5zZm9ybWVkQ29vcmRpbmF0ZXNbMV0sXG4gICAgICAgICAgJ3pvb21MZXZlbCc6IGNvbmZpZ09iai56b29tTGV2ZWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgJ3gnOiBudWxsLFxuICAgICAgJ3knOiBudWxsLFxuICAgICAgJ3pvb21MZXZlbCc6IDEyXG4gICAgfVxuICB9KCkpXG5cbiAgY29uc3QgY29uZmlnID0ge1xuICAgICdtYXAnOiB7XG4gICAgICAnbWF4Wm9vbUxldmVsJzogMSxcbiAgICAgICdtaW5ab29tTGV2ZWwnOiAyMixcbiAgICAgICd2aWV3JzogZGVmYXVsdE1hcENvbmZpZyxcbiAgICAgICdsYXllcic6IFtcbiAgICAgICAge1xuICAgICAgICAgICduYW1lZGxheWVyJzogJyNvc20nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAnZGlzYWJsZSc6IGZhbHNlLFxuICAgICAgICAgICdpZCc6ICdkcmF3bGF5ZXInLFxuICAgICAgICAgICdlZGl0JzogdHJ1ZSxcbiAgICAgICAgICAnZmVhdHVyZXMnOiB0cnVlLFxuICAgICAgICAgICd0eXBlJzogJ2dlb2pzb24nLFxuICAgICAgICAgICdkYXRhJzoge1xuICAgICAgICAgICAgJ3R5cGUnOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgJ2Nycyc6IHtcbiAgICAgICAgICAgICAgJ3R5cGUnOiAnbmFtZScsXG4gICAgICAgICAgICAgICdwcm9wZXJ0aWVzJzoge1xuICAgICAgICAgICAgICAgICduYW1lJzogZGVmYXVsdE1hcFByb2plY3Rpb25cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdmZWF0dXJlcyc6IFtdXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnZmVhdHVyZXNfZGF0YVR5cGUnOiAnanNvbicsXG4gICAgICAgICAgJ2ZlYXR1cmVzX3N0eWxlJzoge1xuICAgICAgICAgICAgJ25hbWVkc3R5bGUnOiAnIzAwNCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICAnY29udHJvbHMnOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAnb3ZlcmxheSc6IHtcbiAgICAgICAgICAgICdkaXNhYmxlJzogZmFsc2VcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLy8gQHNlZSBodHRwczovL3NlcHRpbWEuZGsvd2lkZ2V0L2RvY3VtZW50YXRpb24uaHRtbCNjb250cm9sLWRyYXdcbiAgICAgICAgICAnZHJhdyc6IHtcbiAgICAgICAgICAgICdkaXNhYmxlJzogZmFsc2UsXG4gICAgICAgICAgICAnbGF5ZXInOiAnZHJhd2xheWVyJyxcbiAgICAgICAgICAgICdjbGVhck9uRHJhdyc6IHRydWUsXG4gICAgICAgICAgICAndHlwZSc6ICdQb2ludCdcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLy8gQHNlZSBodHRwczovL3NlcHRpbWEuZGsvd2lkZ2V0L2RvY3VtZW50YXRpb24uaHRtbCNjb250cm9sLXNlYXJjaFxuICAgICAgICAgICdzZWFyY2gnOiB7XG4gICAgICAgICAgICAnZGlzcGxheXRleHQnOiAnRmluZCBhZHJlc3NlJyxcbiAgICAgICAgICAgICdjbGVhck9uTWFwY2xpY2snOiB0cnVlLFxuICAgICAgICAgICAgJ2ZlYXR1cmVzX3N0eWxlJzoge1xuICAgICAgICAgICAgICAnbmFtZWRzdHlsZSc6ICcjMDA0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdkcml2ZXInOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAndHlwZSc6ICdkYXdhJyxcbiAgICAgICAgICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgICAgICAgICdrb21tdW5la29kZSc6ICcwNzUxJyAvLyBBYXJodXMuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgd2lkZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZXB0aW1hLXdpZGdldCcpXG4gIHdpZGdldHMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShjb250YWluZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykpXG4gICAgICAgIHJldHVybiBwcm9qZWN0KGRhdGEsIHRhcmdldE1hcFByb2plY3Rpb24sIGNvbmZpZy5tYXAuc3JzIHx8IGRlZmF1bHRNYXBQcm9qZWN0aW9uKVxuICAgICAgfSBjYXRjaCAoZXgpIHt9XG5cbiAgICAgIHJldHVybiBudWxsXG4gICAgfSgpKVxuXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlLXRhcmdldCcpKVxuICAgIGlmICh0YXJnZXQgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHJlc2V0TWFwID0gKGRhdGEpID0+IHtcbiAgICAgICAgLy8gQ2VudGVyIG1hcCBvbiBwb2ludC5cbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBkYXRhLmZlYXR1cmVzWzBdLmdlb21ldHJ5LmNvb3JkaW5hdGVzXG4gICAgICAgIGNvbmZpZy5tYXAudmlldy54ID0gY29vcmRpbmF0ZXNbMF1cbiAgICAgICAgY29uZmlnLm1hcC52aWV3LnkgPSBjb29yZGluYXRlc1sxXVxuICAgICAgICBjb25maWcubWFwLmxheWVyWzFdLmRhdGEgPSBkYXRhXG5cbiAgICAgICAgaWYgKHR5cGVvZiBtYXAgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbWFwLnNldENvbmZpZyhjb25maWcpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcm9qZWN0IG1vZGlmaWVzIGl0cyBmaXJzdCBhcmd1bWVudCwgc28gd2UgcGFzcyBpdCBhIGRlZXAgY2xvbmUuXG4gICAgICAgIHRhcmdldC52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHByb2plY3QoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSksIGNvbmZpZy5tYXAuc3JzIHx8IGRlZmF1bHRNYXBQcm9qZWN0aW9uLCB0YXJnZXRNYXBQcm9qZWN0aW9uKSlcbiAgICAgIH1cblxuICAgICAgLy8gV2UgaGF2ZSB0byBidWlsZCBtYXAgY29uZmlnIGJlZm9yZSBpbml0aWFsaXppbmcgdGhlIG1hcC5cbiAgICAgIGlmIChkYXRhICE9PSBudWxsKSB7XG4gICAgICAgIHJlc2V0TWFwKGRhdGEpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcCA9IG5ldyBXaWRnZXRBUEkoY29udGFpbmVyLCBjb25maWcpXG4gICAgICBtYXAub24oJ2ZlYXR1cmVhZGRlZCcsIGZ1bmN0aW9uIChldmVudG5hbWUsIHNjb3BlLCBtYXBzdGF0ZSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0aW9uID0gbWFwc3RhdGUuY3JzLnByb3BlcnRpZXMubmFtZVxuICAgICAgICBpZiAobWFwc3RhdGUuZmVhdHVyZXMubGVuZ3RoID09PSAxICYmIG1hcHN0YXRlLmZlYXR1cmVzWzBdLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgICAgICBtYXBzdGF0ZSA9IHByb2plY3QobWFwc3RhdGUsIHByb2plY3Rpb24sIHRhcmdldE1hcFByb2plY3Rpb24pXG4gICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IG1hcHN0YXRlLmZlYXR1cmVzWzBdLnByb3BlcnRpZXNcbiAgICAgICAgICAvLyBDbGVhbiBvdXQgdW53YW50ZWQgcHJvcGVydGllcy5cbiAgICAgICAgICBkZWxldGUgcHJvcGVydGllcy5fb3B0aW9uc1xuXG4gICAgICAgICAgdGFyZ2V0LnZhbHVlID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgdHlwZTogbWFwc3RhdGUudHlwZSxcbiAgICAgICAgICAgIGNyczogbWFwc3RhdGUuY3JzLFxuICAgICAgICAgICAgZmVhdHVyZXM6IG1hcHN0YXRlLmZlYXR1cmVzLm1hcCgoZmVhdHVyZSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IGZlYXR1cmUudHlwZSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBmZWF0dXJlLnByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAgZ2VvbWV0cnk6IGZlYXR1cmUuZ2VvbWV0cnlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCByZXNldE1hcEN0cmwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICByZXNldE1hcEN0cmwudHlwZSA9ICdidXR0b24nXG4gICAgICAgIHJlc2V0TWFwQ3RybC5jbGFzc0xpc3QuYWRkKCdyZXNldC1wb2ludC1vbi1tYXAnKVxuICAgICAgICByZXNldE1hcEN0cmwuaW5uZXJIVE1MID0gRHJ1cGFsLnQoJ1Jlc2V0IHBvaW50IG9uIG1hcCcpXG4gICAgICAgIHJlc2V0TWFwQ3RybC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXNldE1hcChkYXRhKVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnRhaW5lci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZXNldE1hcEN0cmwsIGNvbnRhaW5lci5wYXJlbnROb2RlLmxhc3RDaGlsZClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvanMvaGVhcmluZy1lZGl0LmpzIiwiXG5cblxuLyoqXG4gKiBVVE0gem9uZXMgYXJlIGdyb3VwZWQsIGFuZCBhc3NpZ25lZCB0byBvbmUgb2YgYSBncm91cCBvZiA2XG4gKiBzZXRzLlxuICpcbiAqIHtpbnR9IEBwcml2YXRlXG4gKi9cbnZhciBOVU1fMTAwS19TRVRTID0gNjtcblxuLyoqXG4gKiBUaGUgY29sdW1uIGxldHRlcnMgKGZvciBlYXN0aW5nKSBvZiB0aGUgbG93ZXIgbGVmdCB2YWx1ZSwgcGVyXG4gKiBzZXQuXG4gKlxuICoge3N0cmluZ30gQHByaXZhdGVcbiAqL1xudmFyIFNFVF9PUklHSU5fQ09MVU1OX0xFVFRFUlMgPSAnQUpTQUpTJztcblxuLyoqXG4gKiBUaGUgcm93IGxldHRlcnMgKGZvciBub3J0aGluZykgb2YgdGhlIGxvd2VyIGxlZnQgdmFsdWUsIHBlclxuICogc2V0LlxuICpcbiAqIHtzdHJpbmd9IEBwcml2YXRlXG4gKi9cbnZhciBTRVRfT1JJR0lOX1JPV19MRVRURVJTID0gJ0FGQUZBRic7XG5cbnZhciBBID0gNjU7IC8vIEFcbnZhciBJID0gNzM7IC8vIElcbnZhciBPID0gNzk7IC8vIE9cbnZhciBWID0gODY7IC8vIFZcbnZhciBaID0gOTA7IC8vIFpcbmV4cG9ydCBkZWZhdWx0IHtcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgdG9Qb2ludDogdG9Qb2ludFxufTtcbi8qKlxuICogQ29udmVyc2lvbiBvZiBsYXQvbG9uIHRvIE1HUlMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGxsIE9iamVjdCBsaXRlcmFsIHdpdGggbGF0IGFuZCBsb24gcHJvcGVydGllcyBvbiBhXG4gKiAgICAgV0dTODQgZWxsaXBzb2lkLlxuICogQHBhcmFtIHtpbnR9IGFjY3VyYWN5IEFjY3VyYWN5IGluIGRpZ2l0cyAoNSBmb3IgMSBtLCA0IGZvciAxMCBtLCAzIGZvclxuICogICAgICAxMDAgbSwgMiBmb3IgMTAwMCBtIG9yIDEgZm9yIDEwMDAwIG0pLiBPcHRpb25hbCwgZGVmYXVsdCBpcyA1LlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgTUdSUyBzdHJpbmcgZm9yIHRoZSBnaXZlbiBsb2NhdGlvbiBhbmQgYWNjdXJhY3kuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKGxsLCBhY2N1cmFjeSkge1xuICBhY2N1cmFjeSA9IGFjY3VyYWN5IHx8IDU7IC8vIGRlZmF1bHQgYWNjdXJhY3kgMW1cbiAgcmV0dXJuIGVuY29kZShMTHRvVVRNKHtcbiAgICBsYXQ6IGxsWzFdLFxuICAgIGxvbjogbGxbMF1cbiAgfSksIGFjY3VyYWN5KTtcbn07XG5cbi8qKlxuICogQ29udmVyc2lvbiBvZiBNR1JTIHRvIGxhdC9sb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1ncnMgTUdSUyBzdHJpbmcuXG4gKiBAcmV0dXJuIHthcnJheX0gQW4gYXJyYXkgd2l0aCBsZWZ0IChsb25naXR1ZGUpLCBib3R0b20gKGxhdGl0dWRlKSwgcmlnaHRcbiAqICAgICAobG9uZ2l0dWRlKSBhbmQgdG9wIChsYXRpdHVkZSkgdmFsdWVzIGluIFdHUzg0LCByZXByZXNlbnRpbmcgdGhlXG4gKiAgICAgYm91bmRpbmcgYm94IGZvciB0aGUgcHJvdmlkZWQgTUdSUyByZWZlcmVuY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKG1ncnMpIHtcbiAgdmFyIGJib3ggPSBVVE10b0xMKGRlY29kZShtZ3JzLnRvVXBwZXJDYXNlKCkpKTtcbiAgaWYgKGJib3gubGF0ICYmIGJib3gubG9uKSB7XG4gICAgcmV0dXJuIFtiYm94LmxvbiwgYmJveC5sYXQsIGJib3gubG9uLCBiYm94LmxhdF07XG4gIH1cbiAgcmV0dXJuIFtiYm94LmxlZnQsIGJib3guYm90dG9tLCBiYm94LnJpZ2h0LCBiYm94LnRvcF07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdG9Qb2ludChtZ3JzKSB7XG4gIHZhciBiYm94ID0gVVRNdG9MTChkZWNvZGUobWdycy50b1VwcGVyQ2FzZSgpKSk7XG4gIGlmIChiYm94LmxhdCAmJiBiYm94Lmxvbikge1xuICAgIHJldHVybiBbYmJveC5sb24sIGJib3gubGF0XTtcbiAgfVxuICByZXR1cm4gWyhiYm94LmxlZnQgKyBiYm94LnJpZ2h0KSAvIDIsIChiYm94LnRvcCArIGJib3guYm90dG9tKSAvIDJdO1xufTtcbi8qKlxuICogQ29udmVyc2lvbiBmcm9tIGRlZ3JlZXMgdG8gcmFkaWFucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IGRlZyB0aGUgYW5nbGUgaW4gZGVncmVlcy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIGFuZ2xlIGluIHJhZGlhbnMuXG4gKi9cbmZ1bmN0aW9uIGRlZ1RvUmFkKGRlZykge1xuICByZXR1cm4gKGRlZyAqIChNYXRoLlBJIC8gMTgwLjApKTtcbn1cblxuLyoqXG4gKiBDb252ZXJzaW9uIGZyb20gcmFkaWFucyB0byBkZWdyZWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIHRoZSBhbmdsZSBpbiByYWRpYW5zLlxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgYW5nbGUgaW4gZGVncmVlcy5cbiAqL1xuZnVuY3Rpb24gcmFkVG9EZWcocmFkKSB7XG4gIHJldHVybiAoMTgwLjAgKiAocmFkIC8gTWF0aC5QSSkpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgc2V0IG9mIExvbmdpdHVkZSBhbmQgTGF0aXR1ZGUgY28tb3JkaW5hdGVzIHRvIFVUTVxuICogdXNpbmcgdGhlIFdHUzg0IGVsbGlwc29pZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtvYmplY3R9IGxsIE9iamVjdCBsaXRlcmFsIHdpdGggbGF0IGFuZCBsb24gcHJvcGVydGllc1xuICogICAgIHJlcHJlc2VudGluZyB0aGUgV0dTODQgY29vcmRpbmF0ZSB0byBiZSBjb252ZXJ0ZWQuXG4gKiBAcmV0dXJuIHtvYmplY3R9IE9iamVjdCBsaXRlcmFsIGNvbnRhaW5pbmcgdGhlIFVUTSB2YWx1ZSB3aXRoIGVhc3RpbmcsXG4gKiAgICAgbm9ydGhpbmcsIHpvbmVOdW1iZXIgYW5kIHpvbmVMZXR0ZXIgcHJvcGVydGllcywgYW5kIGFuIG9wdGlvbmFsXG4gKiAgICAgYWNjdXJhY3kgcHJvcGVydHkgaW4gZGlnaXRzLiBSZXR1cm5zIG51bGwgaWYgdGhlIGNvbnZlcnNpb24gZmFpbGVkLlxuICovXG5mdW5jdGlvbiBMTHRvVVRNKGxsKSB7XG4gIHZhciBMYXQgPSBsbC5sYXQ7XG4gIHZhciBMb25nID0gbGwubG9uO1xuICB2YXIgYSA9IDYzNzgxMzcuMDsgLy9lbGxpcC5yYWRpdXM7XG4gIHZhciBlY2NTcXVhcmVkID0gMC4wMDY2OTQzODsgLy9lbGxpcC5lY2NzcTtcbiAgdmFyIGswID0gMC45OTk2O1xuICB2YXIgTG9uZ09yaWdpbjtcbiAgdmFyIGVjY1ByaW1lU3F1YXJlZDtcbiAgdmFyIE4sIFQsIEMsIEEsIE07XG4gIHZhciBMYXRSYWQgPSBkZWdUb1JhZChMYXQpO1xuICB2YXIgTG9uZ1JhZCA9IGRlZ1RvUmFkKExvbmcpO1xuICB2YXIgTG9uZ09yaWdpblJhZDtcbiAgdmFyIFpvbmVOdW1iZXI7XG4gIC8vIChpbnQpXG4gIFpvbmVOdW1iZXIgPSBNYXRoLmZsb29yKChMb25nICsgMTgwKSAvIDYpICsgMTtcblxuICAvL01ha2Ugc3VyZSB0aGUgbG9uZ2l0dWRlIDE4MC4wMCBpcyBpbiBab25lIDYwXG4gIGlmIChMb25nID09PSAxODApIHtcbiAgICBab25lTnVtYmVyID0gNjA7XG4gIH1cblxuICAvLyBTcGVjaWFsIHpvbmUgZm9yIE5vcndheVxuICBpZiAoTGF0ID49IDU2LjAgJiYgTGF0IDwgNjQuMCAmJiBMb25nID49IDMuMCAmJiBMb25nIDwgMTIuMCkge1xuICAgIFpvbmVOdW1iZXIgPSAzMjtcbiAgfVxuXG4gIC8vIFNwZWNpYWwgem9uZXMgZm9yIFN2YWxiYXJkXG4gIGlmIChMYXQgPj0gNzIuMCAmJiBMYXQgPCA4NC4wKSB7XG4gICAgaWYgKExvbmcgPj0gMC4wICYmIExvbmcgPCA5LjApIHtcbiAgICAgIFpvbmVOdW1iZXIgPSAzMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoTG9uZyA+PSA5LjAgJiYgTG9uZyA8IDIxLjApIHtcbiAgICAgIFpvbmVOdW1iZXIgPSAzMztcbiAgICB9XG4gICAgZWxzZSBpZiAoTG9uZyA+PSAyMS4wICYmIExvbmcgPCAzMy4wKSB7XG4gICAgICBab25lTnVtYmVyID0gMzU7XG4gICAgfVxuICAgIGVsc2UgaWYgKExvbmcgPj0gMzMuMCAmJiBMb25nIDwgNDIuMCkge1xuICAgICAgWm9uZU51bWJlciA9IDM3O1xuICAgIH1cbiAgfVxuXG4gIExvbmdPcmlnaW4gPSAoWm9uZU51bWJlciAtIDEpICogNiAtIDE4MCArIDM7IC8vKzMgcHV0cyBvcmlnaW5cbiAgLy8gaW4gbWlkZGxlIG9mXG4gIC8vIHpvbmVcbiAgTG9uZ09yaWdpblJhZCA9IGRlZ1RvUmFkKExvbmdPcmlnaW4pO1xuXG4gIGVjY1ByaW1lU3F1YXJlZCA9IChlY2NTcXVhcmVkKSAvICgxIC0gZWNjU3F1YXJlZCk7XG5cbiAgTiA9IGEgLyBNYXRoLnNxcnQoMSAtIGVjY1NxdWFyZWQgKiBNYXRoLnNpbihMYXRSYWQpICogTWF0aC5zaW4oTGF0UmFkKSk7XG4gIFQgPSBNYXRoLnRhbihMYXRSYWQpICogTWF0aC50YW4oTGF0UmFkKTtcbiAgQyA9IGVjY1ByaW1lU3F1YXJlZCAqIE1hdGguY29zKExhdFJhZCkgKiBNYXRoLmNvcyhMYXRSYWQpO1xuICBBID0gTWF0aC5jb3MoTGF0UmFkKSAqIChMb25nUmFkIC0gTG9uZ09yaWdpblJhZCk7XG5cbiAgTSA9IGEgKiAoKDEgLSBlY2NTcXVhcmVkIC8gNCAtIDMgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAvIDY0IC0gNSAqIGVjY1NxdWFyZWQgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAvIDI1NikgKiBMYXRSYWQgLSAoMyAqIGVjY1NxdWFyZWQgLyA4ICsgMyAqIGVjY1NxdWFyZWQgKiBlY2NTcXVhcmVkIC8gMzIgKyA0NSAqIGVjY1NxdWFyZWQgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAvIDEwMjQpICogTWF0aC5zaW4oMiAqIExhdFJhZCkgKyAoMTUgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAvIDI1NiArIDQ1ICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgKiBlY2NTcXVhcmVkIC8gMTAyNCkgKiBNYXRoLnNpbig0ICogTGF0UmFkKSAtICgzNSAqIGVjY1NxdWFyZWQgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAvIDMwNzIpICogTWF0aC5zaW4oNiAqIExhdFJhZCkpO1xuXG4gIHZhciBVVE1FYXN0aW5nID0gKGswICogTiAqIChBICsgKDEgLSBUICsgQykgKiBBICogQSAqIEEgLyA2LjAgKyAoNSAtIDE4ICogVCArIFQgKiBUICsgNzIgKiBDIC0gNTggKiBlY2NQcmltZVNxdWFyZWQpICogQSAqIEEgKiBBICogQSAqIEEgLyAxMjAuMCkgKyA1MDAwMDAuMCk7XG5cbiAgdmFyIFVUTU5vcnRoaW5nID0gKGswICogKE0gKyBOICogTWF0aC50YW4oTGF0UmFkKSAqIChBICogQSAvIDIgKyAoNSAtIFQgKyA5ICogQyArIDQgKiBDICogQykgKiBBICogQSAqIEEgKiBBIC8gMjQuMCArICg2MSAtIDU4ICogVCArIFQgKiBUICsgNjAwICogQyAtIDMzMCAqIGVjY1ByaW1lU3F1YXJlZCkgKiBBICogQSAqIEEgKiBBICogQSAqIEEgLyA3MjAuMCkpKTtcbiAgaWYgKExhdCA8IDAuMCkge1xuICAgIFVUTU5vcnRoaW5nICs9IDEwMDAwMDAwLjA7IC8vMTAwMDAwMDAgbWV0ZXIgb2Zmc2V0IGZvclxuICAgIC8vIHNvdXRoZXJuIGhlbWlzcGhlcmVcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbm9ydGhpbmc6IE1hdGgucm91bmQoVVRNTm9ydGhpbmcpLFxuICAgIGVhc3Rpbmc6IE1hdGgucm91bmQoVVRNRWFzdGluZyksXG4gICAgem9uZU51bWJlcjogWm9uZU51bWJlcixcbiAgICB6b25lTGV0dGVyOiBnZXRMZXR0ZXJEZXNpZ25hdG9yKExhdClcbiAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBVVE0gY29vcmRzIHRvIGxhdC9sb25nLCB1c2luZyB0aGUgV0dTODQgZWxsaXBzb2lkLiBUaGlzIGlzIGEgY29udmVuaWVuY2VcbiAqIGNsYXNzIHdoZXJlIHRoZSBab25lIGNhbiBiZSBzcGVjaWZpZWQgYXMgYSBzaW5nbGUgc3RyaW5nIGVnLlwiNjBOXCIgd2hpY2hcbiAqIGlzIHRoZW4gYnJva2VuIGRvd24gaW50byB0aGUgWm9uZU51bWJlciBhbmQgWm9uZUxldHRlci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtvYmplY3R9IHV0bSBBbiBvYmplY3QgbGl0ZXJhbCB3aXRoIG5vcnRoaW5nLCBlYXN0aW5nLCB6b25lTnVtYmVyXG4gKiAgICAgYW5kIHpvbmVMZXR0ZXIgcHJvcGVydGllcy4gSWYgYW4gb3B0aW9uYWwgYWNjdXJhY3kgcHJvcGVydHkgaXNcbiAqICAgICBwcm92aWRlZCAoaW4gbWV0ZXJzKSwgYSBib3VuZGluZyBib3ggd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mXG4gKiAgICAgbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZS5cbiAqIEByZXR1cm4ge29iamVjdH0gQW4gb2JqZWN0IGxpdGVyYWwgY29udGFpbmluZyBlaXRoZXIgbGF0IGFuZCBsb24gdmFsdWVzXG4gKiAgICAgKGlmIG5vIGFjY3VyYWN5IHdhcyBwcm92aWRlZCksIG9yIHRvcCwgcmlnaHQsIGJvdHRvbSBhbmQgbGVmdCB2YWx1ZXNcbiAqICAgICBmb3IgdGhlIGJvdW5kaW5nIGJveCBjYWxjdWxhdGVkIGFjY29yZGluZyB0byB0aGUgcHJvdmlkZWQgYWNjdXJhY3kuXG4gKiAgICAgUmV0dXJucyBudWxsIGlmIHRoZSBjb252ZXJzaW9uIGZhaWxlZC5cbiAqL1xuZnVuY3Rpb24gVVRNdG9MTCh1dG0pIHtcblxuICB2YXIgVVRNTm9ydGhpbmcgPSB1dG0ubm9ydGhpbmc7XG4gIHZhciBVVE1FYXN0aW5nID0gdXRtLmVhc3Rpbmc7XG4gIHZhciB6b25lTGV0dGVyID0gdXRtLnpvbmVMZXR0ZXI7XG4gIHZhciB6b25lTnVtYmVyID0gdXRtLnpvbmVOdW1iZXI7XG4gIC8vIGNoZWNrIHRoZSBab25lTnVtbWJlciBpcyB2YWxpZFxuICBpZiAoem9uZU51bWJlciA8IDAgfHwgem9uZU51bWJlciA+IDYwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgazAgPSAwLjk5OTY7XG4gIHZhciBhID0gNjM3ODEzNy4wOyAvL2VsbGlwLnJhZGl1cztcbiAgdmFyIGVjY1NxdWFyZWQgPSAwLjAwNjY5NDM4OyAvL2VsbGlwLmVjY3NxO1xuICB2YXIgZWNjUHJpbWVTcXVhcmVkO1xuICB2YXIgZTEgPSAoMSAtIE1hdGguc3FydCgxIC0gZWNjU3F1YXJlZCkpIC8gKDEgKyBNYXRoLnNxcnQoMSAtIGVjY1NxdWFyZWQpKTtcbiAgdmFyIE4xLCBUMSwgQzEsIFIxLCBELCBNO1xuICB2YXIgTG9uZ09yaWdpbjtcbiAgdmFyIG11LCBwaGkxUmFkO1xuXG4gIC8vIHJlbW92ZSA1MDAsMDAwIG1ldGVyIG9mZnNldCBmb3IgbG9uZ2l0dWRlXG4gIHZhciB4ID0gVVRNRWFzdGluZyAtIDUwMDAwMC4wO1xuICB2YXIgeSA9IFVUTU5vcnRoaW5nO1xuXG4gIC8vIFdlIG11c3Qga25vdyBzb21laG93IGlmIHdlIGFyZSBpbiB0aGUgTm9ydGhlcm4gb3IgU291dGhlcm5cbiAgLy8gaGVtaXNwaGVyZSwgdGhpcyBpcyB0aGUgb25seSB0aW1lIHdlIHVzZSB0aGUgbGV0dGVyIFNvIGV2ZW5cbiAgLy8gaWYgdGhlIFpvbmUgbGV0dGVyIGlzbid0IGV4YWN0bHkgY29ycmVjdCBpdCBzaG91bGQgaW5kaWNhdGVcbiAgLy8gdGhlIGhlbWlzcGhlcmUgY29ycmVjdGx5XG4gIGlmICh6b25lTGV0dGVyIDwgJ04nKSB7XG4gICAgeSAtPSAxMDAwMDAwMC4wOyAvLyByZW1vdmUgMTAsMDAwLDAwMCBtZXRlciBvZmZzZXQgdXNlZFxuICAgIC8vIGZvciBzb3V0aGVybiBoZW1pc3BoZXJlXG4gIH1cblxuICAvLyBUaGVyZSBhcmUgNjAgem9uZXMgd2l0aCB6b25lIDEgYmVpbmcgYXQgV2VzdCAtMTgwIHRvIC0xNzRcbiAgTG9uZ09yaWdpbiA9ICh6b25lTnVtYmVyIC0gMSkgKiA2IC0gMTgwICsgMzsgLy8gKzMgcHV0cyBvcmlnaW5cbiAgLy8gaW4gbWlkZGxlIG9mXG4gIC8vIHpvbmVcblxuICBlY2NQcmltZVNxdWFyZWQgPSAoZWNjU3F1YXJlZCkgLyAoMSAtIGVjY1NxdWFyZWQpO1xuXG4gIE0gPSB5IC8gazA7XG4gIG11ID0gTSAvIChhICogKDEgLSBlY2NTcXVhcmVkIC8gNCAtIDMgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAvIDY0IC0gNSAqIGVjY1NxdWFyZWQgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAvIDI1NikpO1xuXG4gIHBoaTFSYWQgPSBtdSArICgzICogZTEgLyAyIC0gMjcgKiBlMSAqIGUxICogZTEgLyAzMikgKiBNYXRoLnNpbigyICogbXUpICsgKDIxICogZTEgKiBlMSAvIDE2IC0gNTUgKiBlMSAqIGUxICogZTEgKiBlMSAvIDMyKSAqIE1hdGguc2luKDQgKiBtdSkgKyAoMTUxICogZTEgKiBlMSAqIGUxIC8gOTYpICogTWF0aC5zaW4oNiAqIG11KTtcbiAgLy8gZG91YmxlIHBoaTEgPSBQcm9qTWF0aC5yYWRUb0RlZyhwaGkxUmFkKTtcblxuICBOMSA9IGEgLyBNYXRoLnNxcnQoMSAtIGVjY1NxdWFyZWQgKiBNYXRoLnNpbihwaGkxUmFkKSAqIE1hdGguc2luKHBoaTFSYWQpKTtcbiAgVDEgPSBNYXRoLnRhbihwaGkxUmFkKSAqIE1hdGgudGFuKHBoaTFSYWQpO1xuICBDMSA9IGVjY1ByaW1lU3F1YXJlZCAqIE1hdGguY29zKHBoaTFSYWQpICogTWF0aC5jb3MocGhpMVJhZCk7XG4gIFIxID0gYSAqICgxIC0gZWNjU3F1YXJlZCkgLyBNYXRoLnBvdygxIC0gZWNjU3F1YXJlZCAqIE1hdGguc2luKHBoaTFSYWQpICogTWF0aC5zaW4ocGhpMVJhZCksIDEuNSk7XG4gIEQgPSB4IC8gKE4xICogazApO1xuXG4gIHZhciBsYXQgPSBwaGkxUmFkIC0gKE4xICogTWF0aC50YW4ocGhpMVJhZCkgLyBSMSkgKiAoRCAqIEQgLyAyIC0gKDUgKyAzICogVDEgKyAxMCAqIEMxIC0gNCAqIEMxICogQzEgLSA5ICogZWNjUHJpbWVTcXVhcmVkKSAqIEQgKiBEICogRCAqIEQgLyAyNCArICg2MSArIDkwICogVDEgKyAyOTggKiBDMSArIDQ1ICogVDEgKiBUMSAtIDI1MiAqIGVjY1ByaW1lU3F1YXJlZCAtIDMgKiBDMSAqIEMxKSAqIEQgKiBEICogRCAqIEQgKiBEICogRCAvIDcyMCk7XG4gIGxhdCA9IHJhZFRvRGVnKGxhdCk7XG5cbiAgdmFyIGxvbiA9IChEIC0gKDEgKyAyICogVDEgKyBDMSkgKiBEICogRCAqIEQgLyA2ICsgKDUgLSAyICogQzEgKyAyOCAqIFQxIC0gMyAqIEMxICogQzEgKyA4ICogZWNjUHJpbWVTcXVhcmVkICsgMjQgKiBUMSAqIFQxKSAqIEQgKiBEICogRCAqIEQgKiBEIC8gMTIwKSAvIE1hdGguY29zKHBoaTFSYWQpO1xuICBsb24gPSBMb25nT3JpZ2luICsgcmFkVG9EZWcobG9uKTtcblxuICB2YXIgcmVzdWx0O1xuICBpZiAodXRtLmFjY3VyYWN5KSB7XG4gICAgdmFyIHRvcFJpZ2h0ID0gVVRNdG9MTCh7XG4gICAgICBub3J0aGluZzogdXRtLm5vcnRoaW5nICsgdXRtLmFjY3VyYWN5LFxuICAgICAgZWFzdGluZzogdXRtLmVhc3RpbmcgKyB1dG0uYWNjdXJhY3ksXG4gICAgICB6b25lTGV0dGVyOiB1dG0uem9uZUxldHRlcixcbiAgICAgIHpvbmVOdW1iZXI6IHV0bS56b25lTnVtYmVyXG4gICAgfSk7XG4gICAgcmVzdWx0ID0ge1xuICAgICAgdG9wOiB0b3BSaWdodC5sYXQsXG4gICAgICByaWdodDogdG9wUmlnaHQubG9uLFxuICAgICAgYm90dG9tOiBsYXQsXG4gICAgICBsZWZ0OiBsb25cbiAgICB9O1xuICB9XG4gIGVsc2Uge1xuICAgIHJlc3VsdCA9IHtcbiAgICAgIGxhdDogbGF0LFxuICAgICAgbG9uOiBsb25cbiAgICB9O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgTUdSUyBsZXR0ZXIgZGVzaWduYXRvciBmb3IgdGhlIGdpdmVuIGxhdGl0dWRlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbGF0IFRoZSBsYXRpdHVkZSBpbiBXR1M4NCB0byBnZXQgdGhlIGxldHRlciBkZXNpZ25hdG9yXG4gKiAgICAgZm9yLlxuICogQHJldHVybiB7Y2hhcn0gVGhlIGxldHRlciBkZXNpZ25hdG9yLlxuICovXG5mdW5jdGlvbiBnZXRMZXR0ZXJEZXNpZ25hdG9yKGxhdCkge1xuICAvL1RoaXMgaXMgaGVyZSBhcyBhbiBlcnJvciBmbGFnIHRvIHNob3cgdGhhdCB0aGUgTGF0aXR1ZGUgaXNcbiAgLy9vdXRzaWRlIE1HUlMgbGltaXRzXG4gIHZhciBMZXR0ZXJEZXNpZ25hdG9yID0gJ1onO1xuXG4gIGlmICgoODQgPj0gbGF0KSAmJiAobGF0ID49IDcyKSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnWCc7XG4gIH1cbiAgZWxzZSBpZiAoKDcyID4gbGF0KSAmJiAobGF0ID49IDY0KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnVyc7XG4gIH1cbiAgZWxzZSBpZiAoKDY0ID4gbGF0KSAmJiAobGF0ID49IDU2KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnVic7XG4gIH1cbiAgZWxzZSBpZiAoKDU2ID4gbGF0KSAmJiAobGF0ID49IDQ4KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnVSc7XG4gIH1cbiAgZWxzZSBpZiAoKDQ4ID4gbGF0KSAmJiAobGF0ID49IDQwKSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnVCc7XG4gIH1cbiAgZWxzZSBpZiAoKDQwID4gbGF0KSAmJiAobGF0ID49IDMyKSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnUyc7XG4gIH1cbiAgZWxzZSBpZiAoKDMyID4gbGF0KSAmJiAobGF0ID49IDI0KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnUic7XG4gIH1cbiAgZWxzZSBpZiAoKDI0ID4gbGF0KSAmJiAobGF0ID49IDE2KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnUSc7XG4gIH1cbiAgZWxzZSBpZiAoKDE2ID4gbGF0KSAmJiAobGF0ID49IDgpKSB7XG4gICAgTGV0dGVyRGVzaWduYXRvciA9ICdQJztcbiAgfVxuICBlbHNlIGlmICgoOCA+IGxhdCkgJiYgKGxhdCA+PSAwKSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnTic7XG4gIH1cbiAgZWxzZSBpZiAoKDAgPiBsYXQpICYmIChsYXQgPj0gLTgpKSB7XG4gICAgTGV0dGVyRGVzaWduYXRvciA9ICdNJztcbiAgfVxuICBlbHNlIGlmICgoLTggPiBsYXQpICYmIChsYXQgPj0gLTE2KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnTCc7XG4gIH1cbiAgZWxzZSBpZiAoKC0xNiA+IGxhdCkgJiYgKGxhdCA+PSAtMjQpKSB7XG4gICAgTGV0dGVyRGVzaWduYXRvciA9ICdLJztcbiAgfVxuICBlbHNlIGlmICgoLTI0ID4gbGF0KSAmJiAobGF0ID49IC0zMikpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ0onO1xuICB9XG4gIGVsc2UgaWYgKCgtMzIgPiBsYXQpICYmIChsYXQgPj0gLTQwKSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnSCc7XG4gIH1cbiAgZWxzZSBpZiAoKC00MCA+IGxhdCkgJiYgKGxhdCA+PSAtNDgpKSB7XG4gICAgTGV0dGVyRGVzaWduYXRvciA9ICdHJztcbiAgfVxuICBlbHNlIGlmICgoLTQ4ID4gbGF0KSAmJiAobGF0ID49IC01NikpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ0YnO1xuICB9XG4gIGVsc2UgaWYgKCgtNTYgPiBsYXQpICYmIChsYXQgPj0gLTY0KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnRSc7XG4gIH1cbiAgZWxzZSBpZiAoKC02NCA+IGxhdCkgJiYgKGxhdCA+PSAtNzIpKSB7XG4gICAgTGV0dGVyRGVzaWduYXRvciA9ICdEJztcbiAgfVxuICBlbHNlIGlmICgoLTcyID4gbGF0KSAmJiAobGF0ID49IC04MCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ0MnO1xuICB9XG4gIHJldHVybiBMZXR0ZXJEZXNpZ25hdG9yO1xufVxuXG4vKipcbiAqIEVuY29kZXMgYSBVVE0gbG9jYXRpb24gYXMgTUdSUyBzdHJpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB1dG0gQW4gb2JqZWN0IGxpdGVyYWwgd2l0aCBlYXN0aW5nLCBub3J0aGluZyxcbiAqICAgICB6b25lTGV0dGVyLCB6b25lTnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gYWNjdXJhY3kgQWNjdXJhY3kgaW4gZGlnaXRzICgxLTUpLlxuICogQHJldHVybiB7c3RyaW5nfSBNR1JTIHN0cmluZyBmb3IgdGhlIGdpdmVuIFVUTSBsb2NhdGlvbi5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHV0bSwgYWNjdXJhY3kpIHtcbiAgLy8gcHJlcGVuZCB3aXRoIGxlYWRpbmcgemVyb2VzXG4gIHZhciBzZWFzdGluZyA9IFwiMDAwMDBcIiArIHV0bS5lYXN0aW5nLFxuICAgIHNub3J0aGluZyA9IFwiMDAwMDBcIiArIHV0bS5ub3J0aGluZztcblxuICByZXR1cm4gdXRtLnpvbmVOdW1iZXIgKyB1dG0uem9uZUxldHRlciArIGdldDEwMGtJRCh1dG0uZWFzdGluZywgdXRtLm5vcnRoaW5nLCB1dG0uem9uZU51bWJlcikgKyBzZWFzdGluZy5zdWJzdHIoc2Vhc3RpbmcubGVuZ3RoIC0gNSwgYWNjdXJhY3kpICsgc25vcnRoaW5nLnN1YnN0cihzbm9ydGhpbmcubGVuZ3RoIC0gNSwgYWNjdXJhY3kpO1xufVxuXG4vKipcbiAqIEdldCB0aGUgdHdvIGxldHRlciAxMDBrIGRlc2lnbmF0b3IgZm9yIGEgZ2l2ZW4gVVRNIGVhc3RpbmcsXG4gKiBub3J0aGluZyBhbmQgem9uZSBudW1iZXIgdmFsdWUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBlYXN0aW5nXG4gKiBAcGFyYW0ge251bWJlcn0gbm9ydGhpbmdcbiAqIEBwYXJhbSB7bnVtYmVyfSB6b25lTnVtYmVyXG4gKiBAcmV0dXJuIHRoZSB0d28gbGV0dGVyIDEwMGsgZGVzaWduYXRvciBmb3IgdGhlIGdpdmVuIFVUTSBsb2NhdGlvbi5cbiAqL1xuZnVuY3Rpb24gZ2V0MTAwa0lEKGVhc3RpbmcsIG5vcnRoaW5nLCB6b25lTnVtYmVyKSB7XG4gIHZhciBzZXRQYXJtID0gZ2V0MTAwa1NldEZvclpvbmUoem9uZU51bWJlcik7XG4gIHZhciBzZXRDb2x1bW4gPSBNYXRoLmZsb29yKGVhc3RpbmcgLyAxMDAwMDApO1xuICB2YXIgc2V0Um93ID0gTWF0aC5mbG9vcihub3J0aGluZyAvIDEwMDAwMCkgJSAyMDtcbiAgcmV0dXJuIGdldExldHRlcjEwMGtJRChzZXRDb2x1bW4sIHNldFJvdywgc2V0UGFybSk7XG59XG5cbi8qKlxuICogR2l2ZW4gYSBVVE0gem9uZSBudW1iZXIsIGZpZ3VyZSBvdXQgdGhlIE1HUlMgMTAwSyBzZXQgaXQgaXMgaW4uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIEFuIFVUTSB6b25lIG51bWJlci5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIDEwMGsgc2V0IHRoZSBVVE0gem9uZSBpcyBpbi5cbiAqL1xuZnVuY3Rpb24gZ2V0MTAwa1NldEZvclpvbmUoaSkge1xuICB2YXIgc2V0UGFybSA9IGkgJSBOVU1fMTAwS19TRVRTO1xuICBpZiAoc2V0UGFybSA9PT0gMCkge1xuICAgIHNldFBhcm0gPSBOVU1fMTAwS19TRVRTO1xuICB9XG5cbiAgcmV0dXJuIHNldFBhcm07XG59XG5cbi8qKlxuICogR2V0IHRoZSB0d28tbGV0dGVyIE1HUlMgMTAwayBkZXNpZ25hdG9yIGdpdmVuIGluZm9ybWF0aW9uXG4gKiB0cmFuc2xhdGVkIGZyb20gdGhlIFVUTSBub3J0aGluZywgZWFzdGluZyBhbmQgem9uZSBudW1iZXIuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW4gdGhlIGNvbHVtbiBpbmRleCBhcyBpdCByZWxhdGVzIHRvIHRoZSBNR1JTXG4gKiAgICAgICAgMTAwayBzZXQgc3ByZWFkc2hlZXQsIGNyZWF0ZWQgZnJvbSB0aGUgVVRNIGVhc3RpbmcuXG4gKiAgICAgICAgVmFsdWVzIGFyZSAxLTguXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IHRoZSByb3cgaW5kZXggYXMgaXQgcmVsYXRlcyB0byB0aGUgTUdSUyAxMDBrIHNldFxuICogICAgICAgIHNwcmVhZHNoZWV0LCBjcmVhdGVkIGZyb20gdGhlIFVUTSBub3J0aGluZyB2YWx1ZS4gVmFsdWVzXG4gKiAgICAgICAgYXJlIGZyb20gMC0xOS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBwYXJtIHRoZSBzZXQgYmxvY2ssIGFzIGl0IHJlbGF0ZXMgdG8gdGhlIE1HUlMgMTAwayBzZXRcbiAqICAgICAgICBzcHJlYWRzaGVldCwgY3JlYXRlZCBmcm9tIHRoZSBVVE0gem9uZS4gVmFsdWVzIGFyZSBmcm9tXG4gKiAgICAgICAgMS02MC5cbiAqIEByZXR1cm4gdHdvIGxldHRlciBNR1JTIDEwMGsgY29kZS5cbiAqL1xuZnVuY3Rpb24gZ2V0TGV0dGVyMTAwa0lEKGNvbHVtbiwgcm93LCBwYXJtKSB7XG4gIC8vIGNvbE9yaWdpbiBhbmQgcm93T3JpZ2luIGFyZSB0aGUgbGV0dGVycyBhdCB0aGUgb3JpZ2luIG9mIHRoZSBzZXRcbiAgdmFyIGluZGV4ID0gcGFybSAtIDE7XG4gIHZhciBjb2xPcmlnaW4gPSBTRVRfT1JJR0lOX0NPTFVNTl9MRVRURVJTLmNoYXJDb2RlQXQoaW5kZXgpO1xuICB2YXIgcm93T3JpZ2luID0gU0VUX09SSUdJTl9ST1dfTEVUVEVSUy5jaGFyQ29kZUF0KGluZGV4KTtcblxuICAvLyBjb2xJbnQgYW5kIHJvd0ludCBhcmUgdGhlIGxldHRlcnMgdG8gYnVpbGQgdG8gcmV0dXJuXG4gIHZhciBjb2xJbnQgPSBjb2xPcmlnaW4gKyBjb2x1bW4gLSAxO1xuICB2YXIgcm93SW50ID0gcm93T3JpZ2luICsgcm93O1xuICB2YXIgcm9sbG92ZXIgPSBmYWxzZTtcblxuICBpZiAoY29sSW50ID4gWikge1xuICAgIGNvbEludCA9IGNvbEludCAtIFogKyBBIC0gMTtcbiAgICByb2xsb3ZlciA9IHRydWU7XG4gIH1cblxuICBpZiAoY29sSW50ID09PSBJIHx8IChjb2xPcmlnaW4gPCBJICYmIGNvbEludCA+IEkpIHx8ICgoY29sSW50ID4gSSB8fCBjb2xPcmlnaW4gPCBJKSAmJiByb2xsb3ZlcikpIHtcbiAgICBjb2xJbnQrKztcbiAgfVxuXG4gIGlmIChjb2xJbnQgPT09IE8gfHwgKGNvbE9yaWdpbiA8IE8gJiYgY29sSW50ID4gTykgfHwgKChjb2xJbnQgPiBPIHx8IGNvbE9yaWdpbiA8IE8pICYmIHJvbGxvdmVyKSkge1xuICAgIGNvbEludCsrO1xuXG4gICAgaWYgKGNvbEludCA9PT0gSSkge1xuICAgICAgY29sSW50Kys7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNvbEludCA+IFopIHtcbiAgICBjb2xJbnQgPSBjb2xJbnQgLSBaICsgQSAtIDE7XG4gIH1cblxuICBpZiAocm93SW50ID4gVikge1xuICAgIHJvd0ludCA9IHJvd0ludCAtIFYgKyBBIC0gMTtcbiAgICByb2xsb3ZlciA9IHRydWU7XG4gIH1cbiAgZWxzZSB7XG4gICAgcm9sbG92ZXIgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICgoKHJvd0ludCA9PT0gSSkgfHwgKChyb3dPcmlnaW4gPCBJKSAmJiAocm93SW50ID4gSSkpKSB8fCAoKChyb3dJbnQgPiBJKSB8fCAocm93T3JpZ2luIDwgSSkpICYmIHJvbGxvdmVyKSkge1xuICAgIHJvd0ludCsrO1xuICB9XG5cbiAgaWYgKCgocm93SW50ID09PSBPKSB8fCAoKHJvd09yaWdpbiA8IE8pICYmIChyb3dJbnQgPiBPKSkpIHx8ICgoKHJvd0ludCA+IE8pIHx8IChyb3dPcmlnaW4gPCBPKSkgJiYgcm9sbG92ZXIpKSB7XG4gICAgcm93SW50Kys7XG5cbiAgICBpZiAocm93SW50ID09PSBJKSB7XG4gICAgICByb3dJbnQrKztcbiAgICB9XG4gIH1cblxuICBpZiAocm93SW50ID4gVikge1xuICAgIHJvd0ludCA9IHJvd0ludCAtIFYgKyBBIC0gMTtcbiAgfVxuXG4gIHZhciB0d29MZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvbEludCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKHJvd0ludCk7XG4gIHJldHVybiB0d29MZXR0ZXI7XG59XG5cbi8qKlxuICogRGVjb2RlIHRoZSBVVE0gcGFyYW1ldGVycyBmcm9tIGEgTUdSUyBzdHJpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZ3JzU3RyaW5nIGFuIFVQUEVSQ0FTRSBjb29yZGluYXRlIHN0cmluZyBpcyBleHBlY3RlZC5cbiAqIEByZXR1cm4ge29iamVjdH0gQW4gb2JqZWN0IGxpdGVyYWwgd2l0aCBlYXN0aW5nLCBub3J0aGluZywgem9uZUxldHRlcixcbiAqICAgICB6b25lTnVtYmVyIGFuZCBhY2N1cmFjeSAoaW4gbWV0ZXJzKSBwcm9wZXJ0aWVzLlxuICovXG5mdW5jdGlvbiBkZWNvZGUobWdyc1N0cmluZykge1xuXG4gIGlmIChtZ3JzU3RyaW5nICYmIG1ncnNTdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgKFwiTUdSU1BvaW50IGNvdmVydGluZyBmcm9tIG5vdGhpbmdcIik7XG4gIH1cblxuICB2YXIgbGVuZ3RoID0gbWdyc1N0cmluZy5sZW5ndGg7XG5cbiAgdmFyIGh1bksgPSBudWxsO1xuICB2YXIgc2IgPSBcIlwiO1xuICB2YXIgdGVzdENoYXI7XG4gIHZhciBpID0gMDtcblxuICAvLyBnZXQgWm9uZSBudW1iZXJcbiAgd2hpbGUgKCEoL1tBLVpdLykudGVzdCh0ZXN0Q2hhciA9IG1ncnNTdHJpbmcuY2hhckF0KGkpKSkge1xuICAgIGlmIChpID49IDIpIHtcbiAgICAgIHRocm93IChcIk1HUlNQb2ludCBiYWQgY29udmVyc2lvbiBmcm9tOiBcIiArIG1ncnNTdHJpbmcpO1xuICAgIH1cbiAgICBzYiArPSB0ZXN0Q2hhcjtcbiAgICBpKys7XG4gIH1cblxuICB2YXIgem9uZU51bWJlciA9IHBhcnNlSW50KHNiLCAxMCk7XG5cbiAgaWYgKGkgPT09IDAgfHwgaSArIDMgPiBsZW5ndGgpIHtcbiAgICAvLyBBIGdvb2QgTUdSUyBzdHJpbmcgaGFzIHRvIGJlIDQtNSBkaWdpdHMgbG9uZyxcbiAgICAvLyAjI0FBQS8jQUFBIGF0IGxlYXN0LlxuICAgIHRocm93IChcIk1HUlNQb2ludCBiYWQgY29udmVyc2lvbiBmcm9tOiBcIiArIG1ncnNTdHJpbmcpO1xuICB9XG5cbiAgdmFyIHpvbmVMZXR0ZXIgPSBtZ3JzU3RyaW5nLmNoYXJBdChpKyspO1xuXG4gIC8vIFNob3VsZCB3ZSBjaGVjayB0aGUgem9uZSBsZXR0ZXIgaGVyZT8gV2h5IG5vdC5cbiAgaWYgKHpvbmVMZXR0ZXIgPD0gJ0EnIHx8IHpvbmVMZXR0ZXIgPT09ICdCJyB8fCB6b25lTGV0dGVyID09PSAnWScgfHwgem9uZUxldHRlciA+PSAnWicgfHwgem9uZUxldHRlciA9PT0gJ0knIHx8IHpvbmVMZXR0ZXIgPT09ICdPJykge1xuICAgIHRocm93IChcIk1HUlNQb2ludCB6b25lIGxldHRlciBcIiArIHpvbmVMZXR0ZXIgKyBcIiBub3QgaGFuZGxlZDogXCIgKyBtZ3JzU3RyaW5nKTtcbiAgfVxuXG4gIGh1bksgPSBtZ3JzU3RyaW5nLnN1YnN0cmluZyhpLCBpICs9IDIpO1xuXG4gIHZhciBzZXQgPSBnZXQxMDBrU2V0Rm9yWm9uZSh6b25lTnVtYmVyKTtcblxuICB2YXIgZWFzdDEwMGsgPSBnZXRFYXN0aW5nRnJvbUNoYXIoaHVuSy5jaGFyQXQoMCksIHNldCk7XG4gIHZhciBub3J0aDEwMGsgPSBnZXROb3J0aGluZ0Zyb21DaGFyKGh1bksuY2hhckF0KDEpLCBzZXQpO1xuXG4gIC8vIFdlIGhhdmUgYSBidWcgd2hlcmUgdGhlIG5vcnRoaW5nIG1heSBiZSAyMDAwMDAwIHRvbyBsb3cuXG4gIC8vIEhvd1xuICAvLyBkbyB3ZSBrbm93IHdoZW4gdG8gcm9sbCBvdmVyP1xuXG4gIHdoaWxlIChub3J0aDEwMGsgPCBnZXRNaW5Ob3J0aGluZyh6b25lTGV0dGVyKSkge1xuICAgIG5vcnRoMTAwayArPSAyMDAwMDAwO1xuICB9XG5cbiAgLy8gY2FsY3VsYXRlIHRoZSBjaGFyIGluZGV4IGZvciBlYXN0aW5nL25vcnRoaW5nIHNlcGFyYXRvclxuICB2YXIgcmVtYWluZGVyID0gbGVuZ3RoIC0gaTtcblxuICBpZiAocmVtYWluZGVyICUgMiAhPT0gMCkge1xuICAgIHRocm93IChcIk1HUlNQb2ludCBoYXMgdG8gaGF2ZSBhbiBldmVuIG51bWJlciBcXG5vZiBkaWdpdHMgYWZ0ZXIgdGhlIHpvbmUgbGV0dGVyIGFuZCB0d28gMTAwa20gbGV0dGVycyAtIGZyb250IFxcbmhhbGYgZm9yIGVhc3RpbmcgbWV0ZXJzLCBzZWNvbmQgaGFsZiBmb3IgXFxubm9ydGhpbmcgbWV0ZXJzXCIgKyBtZ3JzU3RyaW5nKTtcbiAgfVxuXG4gIHZhciBzZXAgPSByZW1haW5kZXIgLyAyO1xuXG4gIHZhciBzZXBFYXN0aW5nID0gMC4wO1xuICB2YXIgc2VwTm9ydGhpbmcgPSAwLjA7XG4gIHZhciBhY2N1cmFjeUJvbnVzLCBzZXBFYXN0aW5nU3RyaW5nLCBzZXBOb3J0aGluZ1N0cmluZywgZWFzdGluZywgbm9ydGhpbmc7XG4gIGlmIChzZXAgPiAwKSB7XG4gICAgYWNjdXJhY3lCb251cyA9IDEwMDAwMC4wIC8gTWF0aC5wb3coMTAsIHNlcCk7XG4gICAgc2VwRWFzdGluZ1N0cmluZyA9IG1ncnNTdHJpbmcuc3Vic3RyaW5nKGksIGkgKyBzZXApO1xuICAgIHNlcEVhc3RpbmcgPSBwYXJzZUZsb2F0KHNlcEVhc3RpbmdTdHJpbmcpICogYWNjdXJhY3lCb251cztcbiAgICBzZXBOb3J0aGluZ1N0cmluZyA9IG1ncnNTdHJpbmcuc3Vic3RyaW5nKGkgKyBzZXApO1xuICAgIHNlcE5vcnRoaW5nID0gcGFyc2VGbG9hdChzZXBOb3J0aGluZ1N0cmluZykgKiBhY2N1cmFjeUJvbnVzO1xuICB9XG5cbiAgZWFzdGluZyA9IHNlcEVhc3RpbmcgKyBlYXN0MTAwaztcbiAgbm9ydGhpbmcgPSBzZXBOb3J0aGluZyArIG5vcnRoMTAwaztcblxuICByZXR1cm4ge1xuICAgIGVhc3Rpbmc6IGVhc3RpbmcsXG4gICAgbm9ydGhpbmc6IG5vcnRoaW5nLFxuICAgIHpvbmVMZXR0ZXI6IHpvbmVMZXR0ZXIsXG4gICAgem9uZU51bWJlcjogem9uZU51bWJlcixcbiAgICBhY2N1cmFjeTogYWNjdXJhY3lCb251c1xuICB9O1xufVxuXG4vKipcbiAqIEdpdmVuIHRoZSBmaXJzdCBsZXR0ZXIgZnJvbSBhIHR3by1sZXR0ZXIgTUdSUyAxMDBrIHpvbmUsIGFuZCBnaXZlbiB0aGVcbiAqIE1HUlMgdGFibGUgc2V0IGZvciB0aGUgem9uZSBudW1iZXIsIGZpZ3VyZSBvdXQgdGhlIGVhc3RpbmcgdmFsdWUgdGhhdFxuICogc2hvdWxkIGJlIGFkZGVkIHRvIHRoZSBvdGhlciwgc2Vjb25kYXJ5IGVhc3RpbmcgdmFsdWUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Y2hhcn0gZSBUaGUgZmlyc3QgbGV0dGVyIGZyb20gYSB0d28tbGV0dGVyIE1HUlMgMTAwwrRrIHpvbmUuXG4gKiBAcGFyYW0ge251bWJlcn0gc2V0IFRoZSBNR1JTIHRhYmxlIHNldCBmb3IgdGhlIHpvbmUgbnVtYmVyLlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZWFzdGluZyB2YWx1ZSBmb3IgdGhlIGdpdmVuIGxldHRlciBhbmQgc2V0LlxuICovXG5mdW5jdGlvbiBnZXRFYXN0aW5nRnJvbUNoYXIoZSwgc2V0KSB7XG4gIC8vIGNvbE9yaWdpbiBpcyB0aGUgbGV0dGVyIGF0IHRoZSBvcmlnaW4gb2YgdGhlIHNldCBmb3IgdGhlXG4gIC8vIGNvbHVtblxuICB2YXIgY3VyQ29sID0gU0VUX09SSUdJTl9DT0xVTU5fTEVUVEVSUy5jaGFyQ29kZUF0KHNldCAtIDEpO1xuICB2YXIgZWFzdGluZ1ZhbHVlID0gMTAwMDAwLjA7XG4gIHZhciByZXdpbmRNYXJrZXIgPSBmYWxzZTtcblxuICB3aGlsZSAoY3VyQ29sICE9PSBlLmNoYXJDb2RlQXQoMCkpIHtcbiAgICBjdXJDb2wrKztcbiAgICBpZiAoY3VyQ29sID09PSBJKSB7XG4gICAgICBjdXJDb2wrKztcbiAgICB9XG4gICAgaWYgKGN1ckNvbCA9PT0gTykge1xuICAgICAgY3VyQ29sKys7XG4gICAgfVxuICAgIGlmIChjdXJDb2wgPiBaKSB7XG4gICAgICBpZiAocmV3aW5kTWFya2VyKSB7XG4gICAgICAgIHRocm93IChcIkJhZCBjaGFyYWN0ZXI6IFwiICsgZSk7XG4gICAgICB9XG4gICAgICBjdXJDb2wgPSBBO1xuICAgICAgcmV3aW5kTWFya2VyID0gdHJ1ZTtcbiAgICB9XG4gICAgZWFzdGluZ1ZhbHVlICs9IDEwMDAwMC4wO1xuICB9XG5cbiAgcmV0dXJuIGVhc3RpbmdWYWx1ZTtcbn1cblxuLyoqXG4gKiBHaXZlbiB0aGUgc2Vjb25kIGxldHRlciBmcm9tIGEgdHdvLWxldHRlciBNR1JTIDEwMGsgem9uZSwgYW5kIGdpdmVuIHRoZVxuICogTUdSUyB0YWJsZSBzZXQgZm9yIHRoZSB6b25lIG51bWJlciwgZmlndXJlIG91dCB0aGUgbm9ydGhpbmcgdmFsdWUgdGhhdFxuICogc2hvdWxkIGJlIGFkZGVkIHRvIHRoZSBvdGhlciwgc2Vjb25kYXJ5IG5vcnRoaW5nIHZhbHVlLiBZb3UgaGF2ZSB0b1xuICogcmVtZW1iZXIgdGhhdCBOb3J0aGluZ3MgYXJlIGRldGVybWluZWQgZnJvbSB0aGUgZXF1YXRvciwgYW5kIHRoZSB2ZXJ0aWNhbFxuICogY3ljbGUgb2YgbGV0dGVycyBtZWFuIGEgMjAwMDAwMCBhZGRpdGlvbmFsIG5vcnRoaW5nIG1ldGVycy4gVGhpcyBoYXBwZW5zXG4gKiBhcHByb3guIGV2ZXJ5IDE4IGRlZ3JlZXMgb2YgbGF0aXR1ZGUuIFRoaXMgbWV0aG9kIGRvZXMgKk5PVCogY291bnQgYW55XG4gKiBhZGRpdGlvbmFsIG5vcnRoaW5ncy4gWW91IGhhdmUgdG8gZmlndXJlIG91dCBob3cgbWFueSAyMDAwMDAwIG1ldGVycyBuZWVkXG4gKiB0byBiZSBhZGRlZCBmb3IgdGhlIHpvbmUgbGV0dGVyIG9mIHRoZSBNR1JTIGNvb3JkaW5hdGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Y2hhcn0gbiBTZWNvbmQgbGV0dGVyIG9mIHRoZSBNR1JTIDEwMGsgem9uZVxuICogQHBhcmFtIHtudW1iZXJ9IHNldCBUaGUgTUdSUyB0YWJsZSBzZXQgbnVtYmVyLCB3aGljaCBpcyBkZXBlbmRlbnQgb24gdGhlXG4gKiAgICAgVVRNIHpvbmUgbnVtYmVyLlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbm9ydGhpbmcgdmFsdWUgZm9yIHRoZSBnaXZlbiBsZXR0ZXIgYW5kIHNldC5cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ydGhpbmdGcm9tQ2hhcihuLCBzZXQpIHtcblxuICBpZiAobiA+ICdWJykge1xuICAgIHRocm93IChcIk1HUlNQb2ludCBnaXZlbiBpbnZhbGlkIE5vcnRoaW5nIFwiICsgbik7XG4gIH1cblxuICAvLyByb3dPcmlnaW4gaXMgdGhlIGxldHRlciBhdCB0aGUgb3JpZ2luIG9mIHRoZSBzZXQgZm9yIHRoZVxuICAvLyBjb2x1bW5cbiAgdmFyIGN1clJvdyA9IFNFVF9PUklHSU5fUk9XX0xFVFRFUlMuY2hhckNvZGVBdChzZXQgLSAxKTtcbiAgdmFyIG5vcnRoaW5nVmFsdWUgPSAwLjA7XG4gIHZhciByZXdpbmRNYXJrZXIgPSBmYWxzZTtcblxuICB3aGlsZSAoY3VyUm93ICE9PSBuLmNoYXJDb2RlQXQoMCkpIHtcbiAgICBjdXJSb3crKztcbiAgICBpZiAoY3VyUm93ID09PSBJKSB7XG4gICAgICBjdXJSb3crKztcbiAgICB9XG4gICAgaWYgKGN1clJvdyA9PT0gTykge1xuICAgICAgY3VyUm93Kys7XG4gICAgfVxuICAgIC8vIGZpeGluZyBhIGJ1ZyBtYWtpbmcgd2hvbGUgYXBwbGljYXRpb24gaGFuZyBpbiB0aGlzIGxvb3BcbiAgICAvLyB3aGVuICduJyBpcyBhIHdyb25nIGNoYXJhY3RlclxuICAgIGlmIChjdXJSb3cgPiBWKSB7XG4gICAgICBpZiAocmV3aW5kTWFya2VyKSB7IC8vIG1ha2luZyBzdXJlIHRoYXQgdGhpcyBsb29wIGVuZHNcbiAgICAgICAgdGhyb3cgKFwiQmFkIGNoYXJhY3RlcjogXCIgKyBuKTtcbiAgICAgIH1cbiAgICAgIGN1clJvdyA9IEE7XG4gICAgICByZXdpbmRNYXJrZXIgPSB0cnVlO1xuICAgIH1cbiAgICBub3J0aGluZ1ZhbHVlICs9IDEwMDAwMC4wO1xuICB9XG5cbiAgcmV0dXJuIG5vcnRoaW5nVmFsdWU7XG59XG5cbi8qKlxuICogVGhlIGZ1bmN0aW9uIGdldE1pbk5vcnRoaW5nIHJldHVybnMgdGhlIG1pbmltdW0gbm9ydGhpbmcgdmFsdWUgb2YgYSBNR1JTXG4gKiB6b25lLlxuICpcbiAqIFBvcnRlZCBmcm9tIEdlb3RyYW5zJyBjIExhdHRpdHVkZV9CYW5kX1ZhbHVlIHN0cnVjdHVyZSB0YWJsZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtjaGFyfSB6b25lTGV0dGVyIFRoZSBNR1JTIHpvbmUgdG8gZ2V0IHRoZSBtaW4gbm9ydGhpbmcgZm9yLlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXRNaW5Ob3J0aGluZyh6b25lTGV0dGVyKSB7XG4gIHZhciBub3J0aGluZztcbiAgc3dpdGNoICh6b25lTGV0dGVyKSB7XG4gIGNhc2UgJ0MnOlxuICAgIG5vcnRoaW5nID0gMTEwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdEJzpcbiAgICBub3J0aGluZyA9IDIwMDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnRSc6XG4gICAgbm9ydGhpbmcgPSAyODAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ0YnOlxuICAgIG5vcnRoaW5nID0gMzcwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdHJzpcbiAgICBub3J0aGluZyA9IDQ2MDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnSCc6XG4gICAgbm9ydGhpbmcgPSA1NTAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ0onOlxuICAgIG5vcnRoaW5nID0gNjQwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdLJzpcbiAgICBub3J0aGluZyA9IDczMDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnTCc6XG4gICAgbm9ydGhpbmcgPSA4MjAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ00nOlxuICAgIG5vcnRoaW5nID0gOTEwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdOJzpcbiAgICBub3J0aGluZyA9IDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnUCc6XG4gICAgbm9ydGhpbmcgPSA4MDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnUSc6XG4gICAgbm9ydGhpbmcgPSAxNzAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ1InOlxuICAgIG5vcnRoaW5nID0gMjYwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdTJzpcbiAgICBub3J0aGluZyA9IDM1MDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnVCc6XG4gICAgbm9ydGhpbmcgPSA0NDAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ1UnOlxuICAgIG5vcnRoaW5nID0gNTMwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdWJzpcbiAgICBub3J0aGluZyA9IDYyMDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnVyc6XG4gICAgbm9ydGhpbmcgPSA3MDAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ1gnOlxuICAgIG5vcnRoaW5nID0gNzkwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBkZWZhdWx0OlxuICAgIG5vcnRoaW5nID0gLTEuMDtcbiAgfVxuICBpZiAobm9ydGhpbmcgPj0gMC4wKSB7XG4gICAgcmV0dXJuIG5vcnRoaW5nO1xuICB9XG4gIGVsc2Uge1xuICAgIHRocm93IChcIkludmFsaWQgem9uZSBsZXR0ZXI6IFwiICsgem9uZUxldHRlcik7XG4gIH1cblxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbWdycy9tZ3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9tZ3JzL21ncnMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHt0b1BvaW50LCBmb3J3YXJkfSBmcm9tICdtZ3JzJztcblxuZnVuY3Rpb24gUG9pbnQoeCwgeSwgeikge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUG9pbnQpKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh4LCB5LCB6KTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh4KSkge1xuICAgIHRoaXMueCA9IHhbMF07XG4gICAgdGhpcy55ID0geFsxXTtcbiAgICB0aGlzLnogPSB4WzJdIHx8IDAuMDtcbiAgfSBlbHNlIGlmKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgIHRoaXMueCA9IHgueDtcbiAgICB0aGlzLnkgPSB4Lnk7XG4gICAgdGhpcy56ID0geC56IHx8IDAuMDtcbiAgfSBlbHNlIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIGNvb3JkcyA9IHguc3BsaXQoJywnKTtcbiAgICB0aGlzLnggPSBwYXJzZUZsb2F0KGNvb3Jkc1swXSwgMTApO1xuICAgIHRoaXMueSA9IHBhcnNlRmxvYXQoY29vcmRzWzFdLCAxMCk7XG4gICAgdGhpcy56ID0gcGFyc2VGbG9hdChjb29yZHNbMl0sIDEwKSB8fCAwLjA7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMueiA9IHogfHwgMC4wO1xuICB9XG4gIGNvbnNvbGUud2FybigncHJvajQuUG9pbnQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMywgdXNlIHByb2o0LnRvUG9pbnQnKTtcbn1cblxuUG9pbnQuZnJvbU1HUlMgPSBmdW5jdGlvbihtZ3JzU3RyKSB7XG4gIHJldHVybiBuZXcgUG9pbnQodG9Qb2ludChtZ3JzU3RyKSk7XG59O1xuUG9pbnQucHJvdG90eXBlLnRvTUdSUyA9IGZ1bmN0aW9uKGFjY3VyYWN5KSB7XG4gIHJldHVybiBmb3J3YXJkKFt0aGlzLngsIHRoaXMueV0sIGFjY3VyYWN5KTtcbn07XG5leHBvcnQgZGVmYXVsdCBQb2ludDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9Qb2ludC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL1BvaW50LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBwYXJzZUNvZGUgZnJvbSAnLi9wYXJzZUNvZGUnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICcuL2V4dGVuZCc7XG5pbXBvcnQgcHJvamVjdGlvbnMgZnJvbSAnLi9wcm9qZWN0aW9ucyc7XG5pbXBvcnQge3NwaGVyZSBhcyBkY19zcGhlcmUsIGVjY2VudHJpY2l0eSBhcyBkY19lY2NlbnRyaWNpdHl9IGZyb20gJy4vZGVyaXZlQ29uc3RhbnRzJztcbmltcG9ydCBEYXR1bSBmcm9tICcuL2NvbnN0YW50cy9EYXR1bSc7XG5pbXBvcnQgZGF0dW0gZnJvbSAnLi9kYXR1bSc7XG5pbXBvcnQgbWF0Y2ggZnJvbSAnLi9tYXRjaCc7XG5cbmZ1bmN0aW9uIFByb2plY3Rpb24oc3JzQ29kZSxjYWxsYmFjaykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUHJvamVjdGlvbikpIHtcbiAgICByZXR1cm4gbmV3IFByb2plY3Rpb24oc3JzQ29kZSk7XG4gIH1cbiAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlcnJvcil7XG4gICAgaWYoZXJyb3Ipe1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9O1xuICB2YXIganNvbiA9IHBhcnNlQ29kZShzcnNDb2RlKTtcbiAgaWYodHlwZW9mIGpzb24gIT09ICdvYmplY3QnKXtcbiAgICBjYWxsYmFjayhzcnNDb2RlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG91clByb2ogPSBQcm9qZWN0aW9uLnByb2plY3Rpb25zLmdldChqc29uLnByb2pOYW1lKTtcbiAgaWYoIW91clByb2ope1xuICAgIGNhbGxiYWNrKHNyc0NvZGUpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoanNvbi5kYXR1bUNvZGUgJiYganNvbi5kYXR1bUNvZGUgIT09ICdub25lJykge1xuICAgIHZhciBkYXR1bURlZiA9IG1hdGNoKERhdHVtLCBqc29uLmRhdHVtQ29kZSk7XG4gICAgaWYgKGRhdHVtRGVmKSB7XG4gICAgICBqc29uLmRhdHVtX3BhcmFtcyA9IGRhdHVtRGVmLnRvd2dzODQgPyBkYXR1bURlZi50b3dnczg0LnNwbGl0KCcsJykgOiBudWxsO1xuICAgICAganNvbi5lbGxwcyA9IGRhdHVtRGVmLmVsbGlwc2U7XG4gICAgICBqc29uLmRhdHVtTmFtZSA9IGRhdHVtRGVmLmRhdHVtTmFtZSA/IGRhdHVtRGVmLmRhdHVtTmFtZSA6IGpzb24uZGF0dW1Db2RlO1xuICAgIH1cbiAgfVxuICBqc29uLmswID0ganNvbi5rMCB8fCAxLjA7XG4gIGpzb24uYXhpcyA9IGpzb24uYXhpcyB8fCAnZW51JztcbiAganNvbi5lbGxwcyA9IGpzb24uZWxscHMgfHwgJ3dnczg0JztcbiAgdmFyIHNwaGVyZV8gPSBkY19zcGhlcmUoanNvbi5hLCBqc29uLmIsIGpzb24ucmYsIGpzb24uZWxscHMsIGpzb24uc3BoZXJlKTtcbiAgdmFyIGVjYyA9IGRjX2VjY2VudHJpY2l0eShzcGhlcmVfLmEsIHNwaGVyZV8uYiwgc3BoZXJlXy5yZiwganNvbi5SX0EpO1xuICB2YXIgZGF0dW1PYmogPSBqc29uLmRhdHVtIHx8IGRhdHVtKGpzb24uZGF0dW1Db2RlLCBqc29uLmRhdHVtX3BhcmFtcywgc3BoZXJlXy5hLCBzcGhlcmVfLmIsIGVjYy5lcywgZWNjLmVwMik7XG5cbiAgZXh0ZW5kKHRoaXMsIGpzb24pOyAvLyB0cmFuc2ZlciBldmVyeXRoaW5nIG92ZXIgZnJvbSB0aGUgcHJvamVjdGlvbiBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hhdCB3ZSdsbCBuZWVkXG4gIGV4dGVuZCh0aGlzLCBvdXJQcm9qKTsgLy8gdHJhbnNmZXIgYWxsIHRoZSBtZXRob2RzIGZyb20gdGhlIHByb2plY3Rpb25cblxuICAvLyBjb3B5IHRoZSA0IHRoaW5ncyBvdmVyIHdlIGNhbHVsYXRlZCBpbiBkZXJpdmVDb25zdGFudHMuc3BoZXJlXG4gIHRoaXMuYSA9IHNwaGVyZV8uYTtcbiAgdGhpcy5iID0gc3BoZXJlXy5iO1xuICB0aGlzLnJmID0gc3BoZXJlXy5yZjtcbiAgdGhpcy5zcGhlcmUgPSBzcGhlcmVfLnNwaGVyZTtcblxuICAvLyBjb3B5IHRoZSAzIHRoaW5ncyB3ZSBjYWxjdWxhdGVkIGluIGRlcml2ZUNvbnN0YW50cy5lY2NlbnRyaWNpdHlcbiAgdGhpcy5lcyA9IGVjYy5lcztcbiAgdGhpcy5lID0gZWNjLmU7XG4gIHRoaXMuZXAyID0gZWNjLmVwMjtcblxuICAvLyBhZGQgaW4gdGhlIGRhdHVtIG9iamVjdFxuICB0aGlzLmRhdHVtID0gZGF0dW1PYmo7XG5cbiAgLy8gaW5pdCB0aGUgcHJvamVjdGlvblxuICB0aGlzLmluaXQoKTtcblxuICAvLyBsZWdlY3kgY2FsbGJhY2sgZnJvbSBiYWNrIGluIHRoZSBkYXkgd2hlbiBpdCB3ZW50IHRvIHNwYXRpYWxyZWZlcmVuY2Uub3JnXG4gIGNhbGxiYWNrKG51bGwsIHRoaXMpO1xuXG59XG5Qcm9qZWN0aW9uLnByb2plY3Rpb25zID0gcHJvamVjdGlvbnM7XG5Qcm9qZWN0aW9uLnByb2plY3Rpb25zLnN0YXJ0KCk7XG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aW9uO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL1Byb2ouanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9Qcm9qLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNycywgZGVub3JtLCBwb2ludCkge1xuICB2YXIgeGluID0gcG9pbnQueCxcbiAgICB5aW4gPSBwb2ludC55LFxuICAgIHppbiA9IHBvaW50LnogfHwgMC4wO1xuICB2YXIgdiwgdCwgaTtcbiAgdmFyIG91dCA9IHt9O1xuICBmb3IgKGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgaWYgKGRlbm9ybSAmJiBpID09PSAyICYmIHBvaW50LnogPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICB2ID0geGluO1xuICAgICAgdCA9ICd4JztcbiAgICB9XG4gICAgZWxzZSBpZiAoaSA9PT0gMSkge1xuICAgICAgdiA9IHlpbjtcbiAgICAgIHQgPSAneSc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdiA9IHppbjtcbiAgICAgIHQgPSAneic7XG4gICAgfVxuICAgIHN3aXRjaCAoY3JzLmF4aXNbaV0pIHtcbiAgICBjYXNlICdlJzpcbiAgICAgIG91dFt0XSA9IHY7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd3JzpcbiAgICAgIG91dFt0XSA9IC12O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbic6XG4gICAgICBvdXRbdF0gPSB2O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncyc6XG4gICAgICBvdXRbdF0gPSAtdjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3UnOlxuICAgICAgaWYgKHBvaW50W3RdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3V0LnogPSB2O1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZCc6XG4gICAgICBpZiAocG9pbnRbdF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvdXQueiA9IC12O1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vY29uc29sZS5sb2coXCJFUlJPUjogdW5rbm93IGF4aXMgKFwiK2Nycy5heGlzW2ldK1wiKSAtIGNoZWNrIGRlZmluaXRpb24gb2YgXCIrY3JzLnByb2pOYW1lKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2FkanVzdF9heGlzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvYWRqdXN0X2F4aXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHBvaW50KSB7XG4gIGNoZWNrQ29vcmQocG9pbnQueCk7XG4gIGNoZWNrQ29vcmQocG9pbnQueSk7XG59XG5mdW5jdGlvbiBjaGVja0Nvb3JkKG51bSkge1xuICBpZiAodHlwZW9mIE51bWJlci5pc0Zpbml0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChOdW1iZXIuaXNGaW5pdGUobnVtKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjb29yZGluYXRlcyBtdXN0IGJlIGZpbml0ZSBudW1iZXJzJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBudW0gIT09ICdudW1iZXInIHx8IG51bSAhPT0gbnVtIHx8ICFpc0Zpbml0ZShudW0pKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29vcmRpbmF0ZXMgbXVzdCBiZSBmaW5pdGUgbnVtYmVycycpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY2hlY2tTYW5pdHkuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jaGVja1Nhbml0eS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge0hBTEZfUEl9IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuaW1wb3J0IHNpZ24gZnJvbSAnLi9zaWduJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKE1hdGguYWJzKHgpIDwgSEFMRl9QSSkgPyB4IDogKHggLSAoc2lnbih4KSAqIE1hdGguUEkpKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vYWRqdXN0X2xhdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9hZGp1c3RfbGF0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuaW1wb3J0IHtUV09fUEksIFNQSX0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5pbXBvcnQgc2lnbiBmcm9tICcuL3NpZ24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAoTWF0aC5hYnMoeCkgPD0gU1BJKSA/IHggOiAoeCAtIChzaWduKHgpICogVFdPX1BJKSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2FkanVzdF9sb24uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vYWRqdXN0X2xvbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYWRqdXN0X2xvbiBmcm9tICcuL2FkanVzdF9sb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih6b25lLCBsb24pIHtcbiAgaWYgKHpvbmUgPT09IHVuZGVmaW5lZCkge1xuICAgIHpvbmUgPSBNYXRoLmZsb29yKChhZGp1c3RfbG9uKGxvbikgKyBNYXRoLlBJKSAqIDMwIC8gTWF0aC5QSSkgKyAxO1xuXG4gICAgaWYgKHpvbmUgPCAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2UgaWYgKHpvbmUgPiA2MCkge1xuICAgICAgcmV0dXJuIDYwO1xuICAgIH1cbiAgfVxuICByZXR1cm4gem9uZTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vYWRqdXN0X3pvbmUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vYWRqdXN0X3pvbmUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGh5cG90IGZyb20gJy4vaHlwb3QnO1xuaW1wb3J0IGxvZzFweSBmcm9tICcuL2xvZzFweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIHkgPSBNYXRoLmFicyh4KTtcbiAgeSA9IGxvZzFweSh5ICogKDEgKyB5IC8gKGh5cG90KDEsIHkpICsgMSkpKTtcblxuICByZXR1cm4geCA8IDAgPyAteSA6IHk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2FzaW5oeS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9hc2luaHkuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICBpZiAoTWF0aC5hYnMoeCkgPiAxKSB7XG4gICAgeCA9ICh4ID4gMSkgPyAxIDogLTE7XG4gIH1cbiAgcmV0dXJuIE1hdGguYXNpbih4KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2FzaW56LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2FzaW56LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHBwLCBhcmdfcikge1xuICB2YXIgciA9IDIgKiBNYXRoLmNvcyhhcmdfcik7XG4gIHZhciBpID0gcHAubGVuZ3RoIC0gMTtcbiAgdmFyIGhyMSA9IHBwW2ldO1xuICB2YXIgaHIyID0gMDtcbiAgdmFyIGhyO1xuXG4gIHdoaWxlICgtLWkgPj0gMCkge1xuICAgIGhyID0gLWhyMiArIHIgKiBocjEgKyBwcFtpXTtcbiAgICBocjIgPSBocjE7XG4gICAgaHIxID0gaHI7XG4gIH1cblxuICByZXR1cm4gTWF0aC5zaW4oYXJnX3IpICogaHI7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2NsZW5zLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2NsZW5zLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBzaW5oIGZyb20gJy4vc2luaCc7XG5pbXBvcnQgY29zaCBmcm9tICcuL2Nvc2gnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwcCwgYXJnX3IsIGFyZ19pKSB7XG4gIHZhciBzaW5fYXJnX3IgPSBNYXRoLnNpbihhcmdfcik7XG4gIHZhciBjb3NfYXJnX3IgPSBNYXRoLmNvcyhhcmdfcik7XG4gIHZhciBzaW5oX2FyZ19pID0gc2luaChhcmdfaSk7XG4gIHZhciBjb3NoX2FyZ19pID0gY29zaChhcmdfaSk7XG4gIHZhciByID0gMiAqIGNvc19hcmdfciAqIGNvc2hfYXJnX2k7XG4gIHZhciBpID0gLTIgKiBzaW5fYXJnX3IgKiBzaW5oX2FyZ19pO1xuICB2YXIgaiA9IHBwLmxlbmd0aCAtIDE7XG4gIHZhciBociA9IHBwW2pdO1xuICB2YXIgaGkxID0gMDtcbiAgdmFyIGhyMSA9IDA7XG4gIHZhciBoaSA9IDA7XG4gIHZhciBocjI7XG4gIHZhciBoaTI7XG5cbiAgd2hpbGUgKC0taiA+PSAwKSB7XG4gICAgaHIyID0gaHIxO1xuICAgIGhpMiA9IGhpMTtcbiAgICBocjEgPSBocjtcbiAgICBoaTEgPSBoaTtcbiAgICBociA9IC1ocjIgKyByICogaHIxIC0gaSAqIGhpMSArIHBwW2pdO1xuICAgIGhpID0gLWhpMiArIGkgKiBocjEgKyByICogaGkxO1xuICB9XG5cbiAgciA9IHNpbl9hcmdfciAqIGNvc2hfYXJnX2k7XG4gIGkgPSBjb3NfYXJnX3IgKiBzaW5oX2FyZ19pO1xuXG4gIHJldHVybiBbciAqIGhyIC0gaSAqIGhpLCByICogaGkgKyBpICogaHJdO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9jbGVuc19jbXBseC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9jbGVuc19jbXBseC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHZhciByID0gTWF0aC5leHAoeCk7XG4gIHIgPSAociArIDEgLyByKSAvIDI7XG4gIHJldHVybiByO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vY29zaC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9jb3NoLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuICgxIC0gMC4yNSAqIHggKiAoMSArIHggLyAxNiAqICgzICsgMS4yNSAqIHgpKSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9lMGZuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2UwZm4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKDAuMzc1ICogeCAqICgxICsgMC4yNSAqIHggKiAoMSArIDAuNDY4NzUgKiB4KSkpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vZTFmbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9lMWZuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuICgwLjA1ODU5Mzc1ICogeCAqIHggKiAoMSArIDAuNzUgKiB4KSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9lMmZuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2UyZm4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKHggKiB4ICogeCAqICgzNSAvIDMwNzIpKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2UzZm4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vZTNmbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBlLCBzaW5waGkpIHtcbiAgdmFyIHRlbXAgPSBlICogc2lucGhpO1xuICByZXR1cm4gYSAvIE1hdGguc3FydCgxIC0gdGVtcCAqIHRlbXApO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vZ04uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vZ04uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocHAsIEIpIHtcbiAgdmFyIGNvc18yQiA9IDIgKiBNYXRoLmNvcygyICogQik7XG4gIHZhciBpID0gcHAubGVuZ3RoIC0gMTtcbiAgdmFyIGgxID0gcHBbaV07XG4gIHZhciBoMiA9IDA7XG4gIHZhciBoO1xuXG4gIHdoaWxlICgtLWkgPj0gMCkge1xuICAgIGggPSAtaDIgKyBjb3NfMkIgKiBoMSArIHBwW2ldO1xuICAgIGgyID0gaDE7XG4gICAgaDEgPSBoO1xuICB9XG5cbiAgcmV0dXJuIChCICsgaCAqIE1hdGguc2luKDIgKiBCKSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2dhdGcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vZ2F0Zy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4LCB5KSB7XG4gIHggPSBNYXRoLmFicyh4KTtcbiAgeSA9IE1hdGguYWJzKHkpO1xuICB2YXIgYSA9IE1hdGgubWF4KHgsIHkpO1xuICB2YXIgYiA9IE1hdGgubWluKHgsIHkpIC8gKGEgPyBhIDogMSk7XG5cbiAgcmV0dXJuIGEgKiBNYXRoLnNxcnQoMSArIE1hdGgucG93KGIsIDIpKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vaHlwb3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vaHlwb3QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWwsIGUwLCBlMSwgZTIsIGUzKSB7XG4gIHZhciBwaGk7XG4gIHZhciBkcGhpO1xuXG4gIHBoaSA9IG1sIC8gZTA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMTU7IGkrKykge1xuICAgIGRwaGkgPSAobWwgLSAoZTAgKiBwaGkgLSBlMSAqIE1hdGguc2luKDIgKiBwaGkpICsgZTIgKiBNYXRoLnNpbig0ICogcGhpKSAtIGUzICogTWF0aC5zaW4oNiAqIHBoaSkpKSAvIChlMCAtIDIgKiBlMSAqIE1hdGguY29zKDIgKiBwaGkpICsgNCAqIGUyICogTWF0aC5jb3MoNCAqIHBoaSkgLSA2ICogZTMgKiBNYXRoLmNvcyg2ICogcGhpKSk7XG4gICAgcGhpICs9IGRwaGk7XG4gICAgaWYgKE1hdGguYWJzKGRwaGkpIDw9IDAuMDAwMDAwMDAwMSkge1xuICAgICAgcmV0dXJuIHBoaTtcbiAgICB9XG4gIH1cblxuICAvLy4ucmVwb3J0RXJyb3IoXCJJTUxGTi1DT05WOkxhdGl0dWRlIGZhaWxlZCB0byBjb252ZXJnZSBhZnRlciAxNSBpdGVyYXRpb25zXCIpO1xuICByZXR1cm4gTmFOO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vaW1sZm4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vaW1sZm4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtIQUxGX1BJfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZWNjZW50LCBxKSB7XG4gIHZhciB0ZW1wID0gMSAtICgxIC0gZWNjZW50ICogZWNjZW50KSAvICgyICogZWNjZW50KSAqIE1hdGgubG9nKCgxIC0gZWNjZW50KSAvICgxICsgZWNjZW50KSk7XG4gIGlmIChNYXRoLmFicyhNYXRoLmFicyhxKSAtIHRlbXApIDwgMS4wRS02KSB7XG4gICAgaWYgKHEgPCAwKSB7XG4gICAgICByZXR1cm4gKC0xICogSEFMRl9QSSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIEhBTEZfUEk7XG4gICAgfVxuICB9XG4gIC8vdmFyIHBoaSA9IDAuNSogcS8oMS1lY2NlbnQqZWNjZW50KTtcbiAgdmFyIHBoaSA9IE1hdGguYXNpbigwLjUgKiBxKTtcbiAgdmFyIGRwaGk7XG4gIHZhciBzaW5fcGhpO1xuICB2YXIgY29zX3BoaTtcbiAgdmFyIGNvbjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMDsgaSsrKSB7XG4gICAgc2luX3BoaSA9IE1hdGguc2luKHBoaSk7XG4gICAgY29zX3BoaSA9IE1hdGguY29zKHBoaSk7XG4gICAgY29uID0gZWNjZW50ICogc2luX3BoaTtcbiAgICBkcGhpID0gTWF0aC5wb3coMSAtIGNvbiAqIGNvbiwgMikgLyAoMiAqIGNvc19waGkpICogKHEgLyAoMSAtIGVjY2VudCAqIGVjY2VudCkgLSBzaW5fcGhpIC8gKDEgLSBjb24gKiBjb24pICsgMC41IC8gZWNjZW50ICogTWF0aC5sb2coKDEgLSBjb24pIC8gKDEgKyBjb24pKSk7XG4gICAgcGhpICs9IGRwaGk7XG4gICAgaWYgKE1hdGguYWJzKGRwaGkpIDw9IDAuMDAwMDAwMDAwMSkge1xuICAgICAgcmV0dXJuIHBoaTtcbiAgICB9XG4gIH1cblxuICAvL2NvbnNvbGUubG9nKFwiSVFTRk4tQ09OVjpMYXRpdHVkZSBmYWlsZWQgdG8gY29udmVyZ2UgYWZ0ZXIgMzAgaXRlcmF0aW9uc1wiKTtcbiAgcmV0dXJuIE5hTjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vaXFzZm56LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2lxc2Zuei5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHZhciB5ID0gMSArIHg7XG4gIHZhciB6ID0geSAtIDE7XG5cbiAgcmV0dXJuIHogPT09IDAgPyB4IDogeCAqIE1hdGgubG9nKHkpIC8gejtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vbG9nMXB5LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL2xvZzFweS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlMCwgZTEsIGUyLCBlMywgcGhpKSB7XG4gIHJldHVybiAoZTAgKiBwaGkgLSBlMSAqIE1hdGguc2luKDIgKiBwaGkpICsgZTIgKiBNYXRoLnNpbig0ICogcGhpKSAtIGUzICogTWF0aC5zaW4oNiAqIHBoaSkpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vbWxmbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9tbGZuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVjY2VudCwgc2lucGhpLCBjb3NwaGkpIHtcbiAgdmFyIGNvbiA9IGVjY2VudCAqIHNpbnBoaTtcbiAgcmV0dXJuIGNvc3BoaSAvIChNYXRoLnNxcnQoMSAtIGNvbiAqIGNvbikpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vbXNmbnouanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vbXNmbnouanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtIQUxGX1BJfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZWNjZW50LCB0cykge1xuICB2YXIgZWNjbnRoID0gMC41ICogZWNjZW50O1xuICB2YXIgY29uLCBkcGhpO1xuICB2YXIgcGhpID0gSEFMRl9QSSAtIDIgKiBNYXRoLmF0YW4odHMpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8PSAxNTsgaSsrKSB7XG4gICAgY29uID0gZWNjZW50ICogTWF0aC5zaW4ocGhpKTtcbiAgICBkcGhpID0gSEFMRl9QSSAtIDIgKiBNYXRoLmF0YW4odHMgKiAoTWF0aC5wb3coKCgxIC0gY29uKSAvICgxICsgY29uKSksIGVjY250aCkpKSAtIHBoaTtcbiAgICBwaGkgKz0gZHBoaTtcbiAgICBpZiAoTWF0aC5hYnMoZHBoaSkgPD0gMC4wMDAwMDAwMDAxKSB7XG4gICAgICByZXR1cm4gcGhpO1xuICAgIH1cbiAgfVxuICAvL2NvbnNvbGUubG9nKFwicGhpMnogaGFzIE5vQ29udmVyZ2VuY2VcIik7XG4gIHJldHVybiAtOTk5OTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vcGhpMnouanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vcGhpMnouanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEMwMCA9IDE7XG52YXIgQzAyID0gMC4yNTtcbnZhciBDMDQgPSAwLjA0Njg3NTtcbnZhciBDMDYgPSAwLjAxOTUzMTI1O1xudmFyIEMwOCA9IDAuMDEwNjgxMTUyMzQzNzU7XG52YXIgQzIyID0gMC43NTtcbnZhciBDNDQgPSAwLjQ2ODc1O1xudmFyIEM0NiA9IDAuMDEzMDIwODMzMzMzMzMzMzMzMzM7XG52YXIgQzQ4ID0gMC4wMDcxMjA3NjgyMjkxNjY2NjY2NjtcbnZhciBDNjYgPSAwLjM2NDU4MzMzMzMzMzMzMzMzMzMzO1xudmFyIEM2OCA9IDAuMDA1Njk2NjE0NTgzMzMzMzMzMzM7XG52YXIgQzg4ID0gMC4zMDc2MTcxODc1O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlcykge1xuICB2YXIgZW4gPSBbXTtcbiAgZW5bMF0gPSBDMDAgLSBlcyAqIChDMDIgKyBlcyAqIChDMDQgKyBlcyAqIChDMDYgKyBlcyAqIEMwOCkpKTtcbiAgZW5bMV0gPSBlcyAqIChDMjIgLSBlcyAqIChDMDQgKyBlcyAqIChDMDYgKyBlcyAqIEMwOCkpKTtcbiAgdmFyIHQgPSBlcyAqIGVzO1xuICBlblsyXSA9IHQgKiAoQzQ0IC0gZXMgKiAoQzQ2ICsgZXMgKiBDNDgpKTtcbiAgdCAqPSBlcztcbiAgZW5bM10gPSB0ICogKEM2NiAtIGVzICogQzY4KTtcbiAgZW5bNF0gPSB0ICogZXMgKiBDODg7XG4gIHJldHVybiBlbjtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3BqX2VuZm4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vcGpfZW5mbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgcGpfbWxmbiBmcm9tIFwiLi9wal9tbGZuXCI7XG5pbXBvcnQge0VQU0xOfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxudmFyIE1BWF9JVEVSID0gMjA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGFyZywgZXMsIGVuKSB7XG4gIHZhciBrID0gMSAvICgxIC0gZXMpO1xuICB2YXIgcGhpID0gYXJnO1xuICBmb3IgKHZhciBpID0gTUFYX0lURVI7IGk7IC0taSkgeyAvKiByYXJlbHkgZ29lcyBvdmVyIDIgaXRlcmF0aW9ucyAqL1xuICAgIHZhciBzID0gTWF0aC5zaW4ocGhpKTtcbiAgICB2YXIgdCA9IDEgLSBlcyAqIHMgKiBzO1xuICAgIC8vdCA9IHRoaXMucGpfbWxmbihwaGksIHMsIE1hdGguY29zKHBoaSksIGVuKSAtIGFyZztcbiAgICAvL3BoaSAtPSB0ICogKHQgKiBNYXRoLnNxcnQodCkpICogaztcbiAgICB0ID0gKHBqX21sZm4ocGhpLCBzLCBNYXRoLmNvcyhwaGkpLCBlbikgLSBhcmcpICogKHQgKiBNYXRoLnNxcnQodCkpICogaztcbiAgICBwaGkgLT0gdDtcbiAgICBpZiAoTWF0aC5hYnModCkgPCBFUFNMTikge1xuICAgICAgcmV0dXJuIHBoaTtcbiAgICB9XG4gIH1cbiAgLy8uLnJlcG9ydEVycm9yKFwiY2Fzczpwal9pbnZfbWxmbjogQ29udmVyZ2VuY2UgZXJyb3JcIik7XG4gIHJldHVybiBwaGk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3BqX2ludl9tbGZuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3BqX2ludl9tbGZuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHBoaSwgc3BoaSwgY3BoaSwgZW4pIHtcbiAgY3BoaSAqPSBzcGhpO1xuICBzcGhpICo9IHNwaGk7XG4gIHJldHVybiAoZW5bMF0gKiBwaGkgLSBjcGhpICogKGVuWzFdICsgc3BoaSAqIChlblsyXSArIHNwaGkgKiAoZW5bM10gKyBzcGhpICogZW5bNF0pKSkpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vcGpfbWxmbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9wal9tbGZuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVjY2VudCwgc2lucGhpKSB7XG4gIHZhciBjb247XG4gIGlmIChlY2NlbnQgPiAxLjBlLTcpIHtcbiAgICBjb24gPSBlY2NlbnQgKiBzaW5waGk7XG4gICAgcmV0dXJuICgoMSAtIGVjY2VudCAqIGVjY2VudCkgKiAoc2lucGhpIC8gKDEgLSBjb24gKiBjb24pIC0gKDAuNSAvIGVjY2VudCkgKiBNYXRoLmxvZygoMSAtIGNvbikgLyAoMSArIGNvbikpKSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuICgyICogc2lucGhpKTtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vcXNmbnouanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vcXNmbnouanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4geDwwID8gLTEgOiAxO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9zaWduLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIHIgPSBNYXRoLmV4cCh4KTtcbiAgciA9IChyIC0gMSAvIHIpIC8gMjtcbiAgcmV0dXJuIHI7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9zaW5oLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3NpbmguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZXNpbnAsIGV4cCkge1xuICByZXR1cm4gKE1hdGgucG93KCgxIC0gZXNpbnApIC8gKDEgKyBlc2lucCksIGV4cCkpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vc3JhdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi9zcmF0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChhcnJheSl7XG4gIHZhciBvdXQgPSB7XG4gICAgeDogYXJyYXlbMF0sXG4gICAgeTogYXJyYXlbMV1cbiAgfTtcbiAgaWYgKGFycmF5Lmxlbmd0aD4yKSB7XG4gICAgb3V0LnogPSBhcnJheVsyXTtcbiAgfVxuICBpZiAoYXJyYXkubGVuZ3RoPjMpIHtcbiAgICBvdXQubSA9IGFycmF5WzNdO1xuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbW1vbi90b1BvaW50LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29tbW9uL3RvUG9pbnQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtIQUxGX1BJfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZWNjZW50LCBwaGksIHNpbnBoaSkge1xuICB2YXIgY29uID0gZWNjZW50ICogc2lucGhpO1xuICB2YXIgY29tID0gMC41ICogZWNjZW50O1xuICBjb24gPSBNYXRoLnBvdygoKDEgLSBjb24pIC8gKDEgKyBjb24pKSwgY29tKTtcbiAgcmV0dXJuIChNYXRoLnRhbigwLjUgKiAoSEFMRl9QSSAtIHBoaSkpIC8gY29uKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vdHNmbnouanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb21tb24vdHNmbnouanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGV4cG9ydHMgPSB7fTtcbmV4cG9ydCB7ZXhwb3J0cyBhcyBkZWZhdWx0fTtcbmV4cG9ydHMud2dzODQgPSB7XG4gIHRvd2dzODQ6IFwiMCwwLDBcIixcbiAgZWxsaXBzZTogXCJXR1M4NFwiLFxuICBkYXR1bU5hbWU6IFwiV0dTODRcIlxufTtcblxuZXhwb3J0cy5jaDE5MDMgPSB7XG4gIHRvd2dzODQ6IFwiNjc0LjM3NCwxNS4wNTYsNDA1LjM0NlwiLFxuICBlbGxpcHNlOiBcImJlc3NlbFwiLFxuICBkYXR1bU5hbWU6IFwic3dpc3NcIlxufTtcblxuZXhwb3J0cy5nZ3JzODcgPSB7XG4gIHRvd2dzODQ6IFwiLTE5OS44Nyw3NC43OSwyNDYuNjJcIixcbiAgZWxsaXBzZTogXCJHUlM4MFwiLFxuICBkYXR1bU5hbWU6IFwiR3JlZWtfR2VvZGV0aWNfUmVmZXJlbmNlX1N5c3RlbV8xOTg3XCJcbn07XG5cbmV4cG9ydHMubmFkODMgPSB7XG4gIHRvd2dzODQ6IFwiMCwwLDBcIixcbiAgZWxsaXBzZTogXCJHUlM4MFwiLFxuICBkYXR1bU5hbWU6IFwiTm9ydGhfQW1lcmljYW5fRGF0dW1fMTk4M1wiXG59O1xuXG5leHBvcnRzLm5hZDI3ID0ge1xuICBuYWRncmlkczogXCJAY29udXMsQGFsYXNrYSxAbnR2Ml8wLmdzYixAbnR2MV9jYW4uZGF0XCIsXG4gIGVsbGlwc2U6IFwiY2xyazY2XCIsXG4gIGRhdHVtTmFtZTogXCJOb3J0aF9BbWVyaWNhbl9EYXR1bV8xOTI3XCJcbn07XG5cbmV4cG9ydHMucG90c2RhbSA9IHtcbiAgdG93Z3M4NDogXCI2MDYuMCwyMy4wLDQxMy4wXCIsXG4gIGVsbGlwc2U6IFwiYmVzc2VsXCIsXG4gIGRhdHVtTmFtZTogXCJQb3RzZGFtIFJhdWVuYmVyZyAxOTUwIERIRE5cIlxufTtcblxuZXhwb3J0cy5jYXJ0aGFnZSA9IHtcbiAgdG93Z3M4NDogXCItMjYzLjAsNi4wLDQzMS4wXCIsXG4gIGVsbGlwc2U6IFwiY2xhcms4MFwiLFxuICBkYXR1bU5hbWU6IFwiQ2FydGhhZ2UgMTkzNCBUdW5pc2lhXCJcbn07XG5cbmV4cG9ydHMuaGVybWFubnNrb2dlbCA9IHtcbiAgdG93Z3M4NDogXCI2NTMuMCwtMjEyLjAsNDQ5LjBcIixcbiAgZWxsaXBzZTogXCJiZXNzZWxcIixcbiAgZGF0dW1OYW1lOiBcIkhlcm1hbm5za29nZWxcIlxufTtcblxuZXhwb3J0cy5vc25pNTIgPSB7XG4gIHRvd2dzODQ6IFwiNDgyLjUzMCwtMTMwLjU5Niw1NjQuNTU3LC0xLjA0MiwtMC4yMTQsLTAuNjMxLDguMTVcIixcbiAgZWxsaXBzZTogXCJhaXJ5XCIsXG4gIGRhdHVtTmFtZTogXCJJcmlzaCBOYXRpb25hbFwiXG59O1xuXG5leHBvcnRzLmlyZTY1ID0ge1xuICB0b3dnczg0OiBcIjQ4Mi41MzAsLTEzMC41OTYsNTY0LjU1NywtMS4wNDIsLTAuMjE0LC0wLjYzMSw4LjE1XCIsXG4gIGVsbGlwc2U6IFwibW9kX2FpcnlcIixcbiAgZGF0dW1OYW1lOiBcIklyZWxhbmQgMTk2NVwiXG59O1xuXG5leHBvcnRzLnJhc3NhZGlyYW4gPSB7XG4gIHRvd2dzODQ6IFwiLTEzMy42MywtMTU3LjUsLTE1OC42MlwiLFxuICBlbGxpcHNlOiBcImludGxcIixcbiAgZGF0dW1OYW1lOiBcIlJhc3NhZGlyYW5cIlxufTtcblxuZXhwb3J0cy5uemdkNDkgPSB7XG4gIHRvd2dzODQ6IFwiNTkuNDcsLTUuMDQsMTg3LjQ0LDAuNDcsLTAuMSwxLjAyNCwtNC41OTkzXCIsXG4gIGVsbGlwc2U6IFwiaW50bFwiLFxuICBkYXR1bU5hbWU6IFwiTmV3IFplYWxhbmQgR2VvZGV0aWMgRGF0dW0gMTk0OVwiXG59O1xuXG5leHBvcnRzLm9zZ2IzNiA9IHtcbiAgdG93Z3M4NDogXCI0NDYuNDQ4LC0xMjUuMTU3LDU0Mi4wNjAsMC4xNTAyLDAuMjQ3MCwwLjg0MjEsLTIwLjQ4OTRcIixcbiAgZWxsaXBzZTogXCJhaXJ5XCIsXG4gIGRhdHVtTmFtZTogXCJBaXJ5IDE4MzBcIlxufTtcblxuZXhwb3J0cy5zX2p0c2sgPSB7XG4gIHRvd2dzODQ6IFwiNTg5LDc2LDQ4MFwiLFxuICBlbGxpcHNlOiAnYmVzc2VsJyxcbiAgZGF0dW1OYW1lOiAnUy1KVFNLIChGZXJybyknXG59O1xuXG5leHBvcnRzLmJlZHVhcmFtID0ge1xuICB0b3dnczg0OiAnLTEwNiwtODcsMTg4JyxcbiAgZWxsaXBzZTogJ2Nscms4MCcsXG4gIGRhdHVtTmFtZTogJ0JlZHVhcmFtJ1xufTtcblxuZXhwb3J0cy5ndW51bmdfc2VnYXJhID0ge1xuICB0b3dnczg0OiAnLTQwMyw2ODQsNDEnLFxuICBlbGxpcHNlOiAnYmVzc2VsJyxcbiAgZGF0dW1OYW1lOiAnR3VudW5nIFNlZ2FyYSBKYWthcnRhJ1xufTtcblxuZXhwb3J0cy5ybmI3MiA9IHtcbiAgdG93Z3M4NDogXCIxMDYuODY5LC01Mi4yOTc4LDEwMy43MjQsLTAuMzM2NTcsMC40NTY5NTUsLTEuODQyMTgsMVwiLFxuICBlbGxpcHNlOiBcImludGxcIixcbiAgZGF0dW1OYW1lOiBcIlJlc2VhdSBOYXRpb25hbCBCZWxnZSAxOTcyXCJcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29uc3RhbnRzL0RhdHVtLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29uc3RhbnRzL0RhdHVtLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBleHBvcnRzID0ge307XG5leHBvcnQge2V4cG9ydHMgYXMgZGVmYXVsdH07XG5leHBvcnRzLk1FUklUID0ge1xuICBhOiA2Mzc4MTM3LjAsXG4gIHJmOiAyOTguMjU3LFxuICBlbGxpcHNlTmFtZTogXCJNRVJJVCAxOTgzXCJcbn07XG5cbmV4cG9ydHMuU0dTODUgPSB7XG4gIGE6IDYzNzgxMzYuMCxcbiAgcmY6IDI5OC4yNTcsXG4gIGVsbGlwc2VOYW1lOiBcIlNvdmlldCBHZW9kZXRpYyBTeXN0ZW0gODVcIlxufTtcblxuZXhwb3J0cy5HUlM4MCA9IHtcbiAgYTogNjM3ODEzNy4wLFxuICByZjogMjk4LjI1NzIyMjEwMSxcbiAgZWxsaXBzZU5hbWU6IFwiR1JTIDE5ODAoSVVHRywgMTk4MClcIlxufTtcblxuZXhwb3J0cy5JQVU3NiA9IHtcbiAgYTogNjM3ODE0MC4wLFxuICByZjogMjk4LjI1NyxcbiAgZWxsaXBzZU5hbWU6IFwiSUFVIDE5NzZcIlxufTtcblxuZXhwb3J0cy5haXJ5ID0ge1xuICBhOiA2Mzc3NTYzLjM5NixcbiAgYjogNjM1NjI1Ni45MTAsXG4gIGVsbGlwc2VOYW1lOiBcIkFpcnkgMTgzMFwiXG59O1xuXG5leHBvcnRzLkFQTDQgPSB7XG4gIGE6IDYzNzgxMzcsXG4gIHJmOiAyOTguMjUsXG4gIGVsbGlwc2VOYW1lOiBcIkFwcGwuIFBoeXNpY3MuIDE5NjVcIlxufTtcblxuZXhwb3J0cy5OV0w5RCA9IHtcbiAgYTogNjM3ODE0NS4wLFxuICByZjogMjk4LjI1LFxuICBlbGxpcHNlTmFtZTogXCJOYXZhbCBXZWFwb25zIExhYi4sIDE5NjVcIlxufTtcblxuZXhwb3J0cy5tb2RfYWlyeSA9IHtcbiAgYTogNjM3NzM0MC4xODksXG4gIGI6IDYzNTYwMzQuNDQ2LFxuICBlbGxpcHNlTmFtZTogXCJNb2RpZmllZCBBaXJ5XCJcbn07XG5cbmV4cG9ydHMuYW5kcmFlID0ge1xuICBhOiA2Mzc3MTA0LjQzLFxuICByZjogMzAwLjAsXG4gIGVsbGlwc2VOYW1lOiBcIkFuZHJhZSAxODc2IChEZW4uLCBJY2xuZC4pXCJcbn07XG5cbmV4cG9ydHMuYXVzdF9TQSA9IHtcbiAgYTogNjM3ODE2MC4wLFxuICByZjogMjk4LjI1LFxuICBlbGxpcHNlTmFtZTogXCJBdXN0cmFsaWFuIE5hdGwgJiBTLiBBbWVyLiAxOTY5XCJcbn07XG5cbmV4cG9ydHMuR1JTNjcgPSB7XG4gIGE6IDYzNzgxNjAuMCxcbiAgcmY6IDI5OC4yNDcxNjc0MjcwLFxuICBlbGxpcHNlTmFtZTogXCJHUlMgNjcoSVVHRyAxOTY3KVwiXG59O1xuXG5leHBvcnRzLmJlc3NlbCA9IHtcbiAgYTogNjM3NzM5Ny4xNTUsXG4gIHJmOiAyOTkuMTUyODEyOCxcbiAgZWxsaXBzZU5hbWU6IFwiQmVzc2VsIDE4NDFcIlxufTtcblxuZXhwb3J0cy5iZXNzX25hbSA9IHtcbiAgYTogNjM3NzQ4My44NjUsXG4gIHJmOiAyOTkuMTUyODEyOCxcbiAgZWxsaXBzZU5hbWU6IFwiQmVzc2VsIDE4NDEgKE5hbWliaWEpXCJcbn07XG5cbmV4cG9ydHMuY2xyazY2ID0ge1xuICBhOiA2Mzc4MjA2LjQsXG4gIGI6IDYzNTY1ODMuOCxcbiAgZWxsaXBzZU5hbWU6IFwiQ2xhcmtlIDE4NjZcIlxufTtcblxuZXhwb3J0cy5jbHJrODAgPSB7XG4gIGE6IDYzNzgyNDkuMTQ1LFxuICByZjogMjkzLjQ2NjMsXG4gIGVsbGlwc2VOYW1lOiBcIkNsYXJrZSAxODgwIG1vZC5cIlxufTtcblxuZXhwb3J0cy5jbHJrNTggPSB7XG4gIGE6IDYzNzgyOTMuNjQ1MjA4NzU5LFxuICByZjogMjk0LjI2MDY3NjM2OTI2NTQsXG4gIGVsbGlwc2VOYW1lOiBcIkNsYXJrZSAxODU4XCJcbn07XG5cbmV4cG9ydHMuQ1BNID0ge1xuICBhOiA2Mzc1NzM4LjcsXG4gIHJmOiAzMzQuMjksXG4gIGVsbGlwc2VOYW1lOiBcIkNvbW0uIGRlcyBQb2lkcyBldCBNZXN1cmVzIDE3OTlcIlxufTtcblxuZXhwb3J0cy5kZWxtYnIgPSB7XG4gIGE6IDYzNzY0MjguMCxcbiAgcmY6IDMxMS41LFxuICBlbGxpcHNlTmFtZTogXCJEZWxhbWJyZSAxODEwIChCZWxnaXVtKVwiXG59O1xuXG5leHBvcnRzLmVuZ2VsaXMgPSB7XG4gIGE6IDYzNzgxMzYuMDUsXG4gIHJmOiAyOTguMjU2NixcbiAgZWxsaXBzZU5hbWU6IFwiRW5nZWxpcyAxOTg1XCJcbn07XG5cbmV4cG9ydHMuZXZyc3QzMCA9IHtcbiAgYTogNjM3NzI3Ni4zNDUsXG4gIHJmOiAzMDAuODAxNyxcbiAgZWxsaXBzZU5hbWU6IFwiRXZlcmVzdCAxODMwXCJcbn07XG5cbmV4cG9ydHMuZXZyc3Q0OCA9IHtcbiAgYTogNjM3NzMwNC4wNjMsXG4gIHJmOiAzMDAuODAxNyxcbiAgZWxsaXBzZU5hbWU6IFwiRXZlcmVzdCAxOTQ4XCJcbn07XG5cbmV4cG9ydHMuZXZyc3Q1NiA9IHtcbiAgYTogNjM3NzMwMS4yNDMsXG4gIHJmOiAzMDAuODAxNyxcbiAgZWxsaXBzZU5hbWU6IFwiRXZlcmVzdCAxOTU2XCJcbn07XG5cbmV4cG9ydHMuZXZyc3Q2OSA9IHtcbiAgYTogNjM3NzI5NS42NjQsXG4gIHJmOiAzMDAuODAxNyxcbiAgZWxsaXBzZU5hbWU6IFwiRXZlcmVzdCAxOTY5XCJcbn07XG5cbmV4cG9ydHMuZXZyc3RTUyA9IHtcbiAgYTogNjM3NzI5OC41NTYsXG4gIHJmOiAzMDAuODAxNyxcbiAgZWxsaXBzZU5hbWU6IFwiRXZlcmVzdCAoU2FiYWggJiBTYXJhd2FrKVwiXG59O1xuXG5leHBvcnRzLmZzY2hyNjAgPSB7XG4gIGE6IDYzNzgxNjYuMCxcbiAgcmY6IDI5OC4zLFxuICBlbGxpcHNlTmFtZTogXCJGaXNjaGVyIChNZXJjdXJ5IERhdHVtKSAxOTYwXCJcbn07XG5cbmV4cG9ydHMuZnNjaHI2MG0gPSB7XG4gIGE6IDYzNzgxNTUuMCxcbiAgcmY6IDI5OC4zLFxuICBlbGxpcHNlTmFtZTogXCJGaXNjaGVyIDE5NjBcIlxufTtcblxuZXhwb3J0cy5mc2NocjY4ID0ge1xuICBhOiA2Mzc4MTUwLjAsXG4gIHJmOiAyOTguMyxcbiAgZWxsaXBzZU5hbWU6IFwiRmlzY2hlciAxOTY4XCJcbn07XG5cbmV4cG9ydHMuaGVsbWVydCA9IHtcbiAgYTogNjM3ODIwMC4wLFxuICByZjogMjk4LjMsXG4gIGVsbGlwc2VOYW1lOiBcIkhlbG1lcnQgMTkwNlwiXG59O1xuXG5leHBvcnRzLmhvdWdoID0ge1xuICBhOiA2Mzc4MjcwLjAsXG4gIHJmOiAyOTcuMCxcbiAgZWxsaXBzZU5hbWU6IFwiSG91Z2hcIlxufTtcblxuZXhwb3J0cy5pbnRsID0ge1xuICBhOiA2Mzc4Mzg4LjAsXG4gIHJmOiAyOTcuMCxcbiAgZWxsaXBzZU5hbWU6IFwiSW50ZXJuYXRpb25hbCAxOTA5IChIYXlmb3JkKVwiXG59O1xuXG5leHBvcnRzLmthdWxhID0ge1xuICBhOiA2Mzc4MTYzLjAsXG4gIHJmOiAyOTguMjQsXG4gIGVsbGlwc2VOYW1lOiBcIkthdWxhIDE5NjFcIlxufTtcblxuZXhwb3J0cy5sZXJjaCA9IHtcbiAgYTogNjM3ODEzOS4wLFxuICByZjogMjk4LjI1NyxcbiAgZWxsaXBzZU5hbWU6IFwiTGVyY2ggMTk3OVwiXG59O1xuXG5leHBvcnRzLm1wcnRzID0ge1xuICBhOiA2Mzk3MzAwLjAsXG4gIHJmOiAxOTEuMCxcbiAgZWxsaXBzZU5hbWU6IFwiTWF1cGVydGl1cyAxNzM4XCJcbn07XG5cbmV4cG9ydHMubmV3X2ludGwgPSB7XG4gIGE6IDYzNzgxNTcuNSxcbiAgYjogNjM1Njc3Mi4yLFxuICBlbGxpcHNlTmFtZTogXCJOZXcgSW50ZXJuYXRpb25hbCAxOTY3XCJcbn07XG5cbmV4cG9ydHMucGxlc3NpcyA9IHtcbiAgYTogNjM3NjUyMy4wLFxuICByZjogNjM1NTg2My4wLFxuICBlbGxpcHNlTmFtZTogXCJQbGVzc2lzIDE4MTcgKEZyYW5jZSlcIlxufTtcblxuZXhwb3J0cy5rcmFzcyA9IHtcbiAgYTogNjM3ODI0NS4wLFxuICByZjogMjk4LjMsXG4gIGVsbGlwc2VOYW1lOiBcIktyYXNzb3Zza3ksIDE5NDJcIlxufTtcblxuZXhwb3J0cy5TRWFzaWEgPSB7XG4gIGE6IDYzNzgxNTUuMCxcbiAgYjogNjM1Njc3My4zMjA1LFxuICBlbGxpcHNlTmFtZTogXCJTb3V0aGVhc3QgQXNpYVwiXG59O1xuXG5leHBvcnRzLndhbGJlY2sgPSB7XG4gIGE6IDYzNzY4OTYuMCxcbiAgYjogNjM1NTgzNC44NDY3LFxuICBlbGxpcHNlTmFtZTogXCJXYWxiZWNrXCJcbn07XG5cbmV4cG9ydHMuV0dTNjAgPSB7XG4gIGE6IDYzNzgxNjUuMCxcbiAgcmY6IDI5OC4zLFxuICBlbGxpcHNlTmFtZTogXCJXR1MgNjBcIlxufTtcblxuZXhwb3J0cy5XR1M2NiA9IHtcbiAgYTogNjM3ODE0NS4wLFxuICByZjogMjk4LjI1LFxuICBlbGxpcHNlTmFtZTogXCJXR1MgNjZcIlxufTtcblxuZXhwb3J0cy5XR1M3ID0ge1xuICBhOiA2Mzc4MTM1LjAsXG4gIHJmOiAyOTguMjYsXG4gIGVsbGlwc2VOYW1lOiBcIldHUyA3MlwiXG59O1xuXG5leHBvcnQgdmFyIFdHUzg0ID0gZXhwb3J0cy5XR1M4NCA9IHtcbiAgYTogNjM3ODEzNy4wLFxuICByZjogMjk4LjI1NzIyMzU2MyxcbiAgZWxsaXBzZU5hbWU6IFwiV0dTIDg0XCJcbn07XG5cbmV4cG9ydHMuc3BoZXJlID0ge1xuICBhOiA2MzcwOTk3LjAsXG4gIGI6IDYzNzA5OTcuMCxcbiAgZWxsaXBzZU5hbWU6IFwiTm9ybWFsIFNwaGVyZSAocj02MzcwOTk3KVwiXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy9FbGxpcHNvaWQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb25zdGFudHMvRWxsaXBzb2lkLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBleHBvcnRzID0ge307XG5leHBvcnQge2V4cG9ydHMgYXMgZGVmYXVsdH07XG5cbmV4cG9ydHMuZ3JlZW53aWNoID0gMC4wOyAvL1wiMGRFXCIsXG5leHBvcnRzLmxpc2JvbiA9IC05LjEzMTkwNjExMTExMTsgLy9cIjlkMDcnNTQuODYyXFxcIldcIixcbmV4cG9ydHMucGFyaXMgPSAyLjMzNzIyOTE2NjY2NzsgLy9cIjJkMjAnMTQuMDI1XFxcIkVcIixcbmV4cG9ydHMuYm9nb3RhID0gLTc0LjA4MDkxNjY2NjY2NzsgLy9cIjc0ZDA0JzUxLjNcXFwiV1wiLFxuZXhwb3J0cy5tYWRyaWQgPSAtMy42ODc5Mzg4ODg4ODk7IC8vXCIzZDQxJzE2LjU4XFxcIldcIixcbmV4cG9ydHMucm9tZSA9IDEyLjQ1MjMzMzMzMzMzMzsgLy9cIjEyZDI3JzguNFxcXCJFXCIsXG5leHBvcnRzLmJlcm4gPSA3LjQzOTU4MzMzMzMzMzsgLy9cIjdkMjYnMjIuNVxcXCJFXCIsXG5leHBvcnRzLmpha2FydGEgPSAxMDYuODA3NzE5NDQ0NDQ0OyAvL1wiMTA2ZDQ4JzI3Ljc5XFxcIkVcIixcbmV4cG9ydHMuZmVycm8gPSAtMTcuNjY2NjY2NjY2NjY3OyAvL1wiMTdkNDAnV1wiLFxuZXhwb3J0cy5icnVzc2VscyA9IDQuMzY3OTc1OyAvL1wiNGQyMic0LjcxXFxcIkVcIixcbmV4cG9ydHMuc3RvY2tob2xtID0gMTguMDU4Mjc3Nzc3Nzc4OyAvL1wiMThkMycyOS44XFxcIkVcIixcbmV4cG9ydHMuYXRoZW5zID0gMjMuNzE2MzM3NTsgLy9cIjIzZDQyJzU4LjgxNVxcXCJFXCIsXG5leHBvcnRzLm9zbG8gPSAxMC43MjI5MTY2NjY2Njc7IC8vXCIxMGQ0MycyMi41XFxcIkVcIlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy9QcmltZU1lcmlkaWFuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29uc3RhbnRzL1ByaW1lTWVyaWRpYW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQge1xuICBmdDoge3RvX21ldGVyOiAwLjMwNDh9LFxuICAndXMtZnQnOiB7dG9fbWV0ZXI6IDEyMDAgLyAzOTM3fVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb25zdGFudHMvdW5pdHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9jb25zdGFudHMvdW5pdHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IHZhciBQSkRfM1BBUkFNID0gMTtcbmV4cG9ydCB2YXIgUEpEXzdQQVJBTSA9IDI7XG5leHBvcnQgdmFyIFBKRF9XR1M4NCA9IDQ7IC8vIFdHUzg0IG9yIGVxdWl2YWxlbnRcbmV4cG9ydCB2YXIgUEpEX05PREFUVU0gPSA1OyAvLyBXR1M4NCBvciBlcXVpdmFsZW50XG5leHBvcnQgdmFyIFNFQ19UT19SQUQgPSA0Ljg0ODEzNjgxMTA5NTM1OTkzNTg5OTE0MTAyMzU3ZS02O1xuZXhwb3J0IHZhciBIQUxGX1BJID0gTWF0aC5QSS8yO1xuLy8gZWxsaXBvaWQgcGpfc2V0X2VsbC5jXG5leHBvcnQgdmFyIFNJWFRIID0gMC4xNjY2NjY2NjY2NjY2NjY2NjY3O1xuLyogMS82ICovXG5leHBvcnQgdmFyIFJBNCA9IDAuMDQ3MjIyMjIyMjIyMjIyMjIyMjI7XG4vKiAxNy8zNjAgKi9cbmV4cG9ydCB2YXIgUkE2ID0gMC4wMjIxNTYwODQ2NTYwODQ2NTYwODtcbmV4cG9ydCB2YXIgRVBTTE4gPSAxLjBlLTEwO1xuLy8geW91J2QgdGhpbmsgeW91IGNvdWxkIHVzZSBOdW1iZXIuRVBTSUxPTiBhYm92ZSBidXQgdGhhdCBtYWtlc1xuLy8gTW9sbHdlaWRlIGdldCBpbnRvIGFuIGluZmluYXRlIGxvb3AuXG5cbmV4cG9ydCB2YXIgRDJSID0gMC4wMTc0NTMyOTI1MTk5NDMyOTU3NztcbmV4cG9ydCB2YXIgUjJEID0gNTcuMjk1Nzc5NTEzMDgyMzIwODg7XG5leHBvcnQgdmFyIEZPUlRQSSA9IE1hdGguUEkvNDtcbmV4cG9ydCB2YXIgVFdPX1BJID0gTWF0aC5QSSAqIDI7XG4vLyBTUEkgaXMgc2xpZ2h0bHkgZ3JlYXRlciB0aGFuIE1hdGguUEksIHNvIHZhbHVlcyB0aGF0IGV4Y2VlZCB0aGUgLTE4MC4uMTgwXG4vLyBkZWdyZWUgcmFuZ2UgYnkgYSB0aW55IGFtb3VudCBkb24ndCBnZXQgd3JhcHBlZC4gVGhpcyBwcmV2ZW50cyBwb2ludHMgdGhhdFxuLy8gaGF2ZSBkcmlmdGVkIGZyb20gdGhlaXIgb3JpZ2luYWwgbG9jYXRpb24gYWxvbmcgdGhlIDE4MHRoIG1lcmlkaWFuIChkdWUgdG9cbi8vIGZsb2F0aW5nIHBvaW50IGVycm9yKSBmcm9tIGNoYW5naW5nIHRoZWlyIHNpZ24uXG5leHBvcnQgdmFyIFNQSSA9IDMuMTQxNTkyNjUzNTk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29uc3RhbnRzL3ZhbHVlcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvbnN0YW50cy92YWx1ZXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHByb2ogZnJvbSAnLi9Qcm9qJztcbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm0nO1xudmFyIHdnczg0ID0gcHJvaignV0dTODQnKTtcblxuZnVuY3Rpb24gdHJhbnNmb3JtZXIoZnJvbSwgdG8sIGNvb3Jkcykge1xuICB2YXIgdHJhbnNmb3JtZWRBcnJheSwgb3V0LCBrZXlzO1xuICBpZiAoQXJyYXkuaXNBcnJheShjb29yZHMpKSB7XG4gICAgdHJhbnNmb3JtZWRBcnJheSA9IHRyYW5zZm9ybShmcm9tLCB0bywgY29vcmRzKTtcbiAgICBpZiAoY29vcmRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgcmV0dXJuIFt0cmFuc2Zvcm1lZEFycmF5LngsIHRyYW5zZm9ybWVkQXJyYXkueSwgdHJhbnNmb3JtZWRBcnJheS56XTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gW3RyYW5zZm9ybWVkQXJyYXkueCwgdHJhbnNmb3JtZWRBcnJheS55XTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgb3V0ID0gdHJhbnNmb3JtKGZyb20sIHRvLCBjb29yZHMpO1xuICAgIGtleXMgPSBPYmplY3Qua2V5cyhjb29yZHMpO1xuICAgIGlmIChrZXlzLmxlbmd0aCA9PT0gMikge1xuICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09ICd4JyB8fCBrZXkgPT09ICd5Jykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBvdXRba2V5XSA9IGNvb3Jkc1trZXldO1xuICAgIH0pO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tQcm9qKGl0ZW0pIHtcbiAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBwcm9qKSB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cbiAgaWYgKGl0ZW0ub1Byb2opIHtcbiAgICByZXR1cm4gaXRlbS5vUHJvajtcbiAgfVxuICByZXR1cm4gcHJvaihpdGVtKTtcbn1cbmZ1bmN0aW9uIHByb2o0KGZyb21Qcm9qLCB0b1Byb2osIGNvb3JkKSB7XG4gIGZyb21Qcm9qID0gY2hlY2tQcm9qKGZyb21Qcm9qKTtcbiAgdmFyIHNpbmdsZSA9IGZhbHNlO1xuICB2YXIgb2JqO1xuICBpZiAodHlwZW9mIHRvUHJvaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0b1Byb2ogPSBmcm9tUHJvajtcbiAgICBmcm9tUHJvaiA9IHdnczg0O1xuICAgIHNpbmdsZSA9IHRydWU7XG4gIH1cbiAgZWxzZSBpZiAodHlwZW9mIHRvUHJvai54ICE9PSAndW5kZWZpbmVkJyB8fCBBcnJheS5pc0FycmF5KHRvUHJvaikpIHtcbiAgICBjb29yZCA9IHRvUHJvajtcbiAgICB0b1Byb2ogPSBmcm9tUHJvajtcbiAgICBmcm9tUHJvaiA9IHdnczg0O1xuICAgIHNpbmdsZSA9IHRydWU7XG4gIH1cbiAgdG9Qcm9qID0gY2hlY2tQcm9qKHRvUHJvaik7XG4gIGlmIChjb29yZCkge1xuICAgIHJldHVybiB0cmFuc2Zvcm1lcihmcm9tUHJvaiwgdG9Qcm9qLCBjb29yZCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgb2JqID0ge1xuICAgICAgZm9yd2FyZDogZnVuY3Rpb24oY29vcmRzKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1lcihmcm9tUHJvaiwgdG9Qcm9qLCBjb29yZHMpO1xuICAgICAgfSxcbiAgICAgIGludmVyc2U6IGZ1bmN0aW9uKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZXIodG9Qcm9qLCBmcm9tUHJvaiwgY29vcmRzKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmIChzaW5nbGUpIHtcbiAgICAgIG9iai5vUHJvaiA9IHRvUHJvajtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgcHJvajQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2NvcmUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtQSkRfM1BBUkFNLCBQSkRfN1BBUkFNLCBQSkRfV0dTODQsIFBKRF9OT0RBVFVNLCBTRUNfVE9fUkFEfSBmcm9tICcuL2NvbnN0YW50cy92YWx1ZXMnO1xuXG5mdW5jdGlvbiBkYXR1bShkYXR1bUNvZGUsIGRhdHVtX3BhcmFtcywgYSwgYiwgZXMsIGVwMikge1xuICB2YXIgb3V0ID0ge307XG5cbiAgaWYgKGRhdHVtQ29kZSA9PT0gdW5kZWZpbmVkIHx8IGRhdHVtQ29kZSA9PT0gJ25vbmUnKSB7XG4gICAgb3V0LmRhdHVtX3R5cGUgPSBQSkRfTk9EQVRVTTtcbiAgfSBlbHNlIHtcbiAgICBvdXQuZGF0dW1fdHlwZSA9IFBKRF9XR1M4NDtcbiAgfVxuXG4gIGlmIChkYXR1bV9wYXJhbXMpIHtcbiAgICBvdXQuZGF0dW1fcGFyYW1zID0gZGF0dW1fcGFyYW1zLm1hcChwYXJzZUZsb2F0KTtcbiAgICBpZiAob3V0LmRhdHVtX3BhcmFtc1swXSAhPT0gMCB8fCBvdXQuZGF0dW1fcGFyYW1zWzFdICE9PSAwIHx8IG91dC5kYXR1bV9wYXJhbXNbMl0gIT09IDApIHtcbiAgICAgIG91dC5kYXR1bV90eXBlID0gUEpEXzNQQVJBTTtcbiAgICB9XG4gICAgaWYgKG91dC5kYXR1bV9wYXJhbXMubGVuZ3RoID4gMykge1xuICAgICAgaWYgKG91dC5kYXR1bV9wYXJhbXNbM10gIT09IDAgfHwgb3V0LmRhdHVtX3BhcmFtc1s0XSAhPT0gMCB8fCBvdXQuZGF0dW1fcGFyYW1zWzVdICE9PSAwIHx8IG91dC5kYXR1bV9wYXJhbXNbNl0gIT09IDApIHtcbiAgICAgICAgb3V0LmRhdHVtX3R5cGUgPSBQSkRfN1BBUkFNO1xuICAgICAgICBvdXQuZGF0dW1fcGFyYW1zWzNdICo9IFNFQ19UT19SQUQ7XG4gICAgICAgIG91dC5kYXR1bV9wYXJhbXNbNF0gKj0gU0VDX1RPX1JBRDtcbiAgICAgICAgb3V0LmRhdHVtX3BhcmFtc1s1XSAqPSBTRUNfVE9fUkFEO1xuICAgICAgICBvdXQuZGF0dW1fcGFyYW1zWzZdID0gKG91dC5kYXR1bV9wYXJhbXNbNl0gLyAxMDAwMDAwLjApICsgMS4wO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG91dC5hID0gYTsgLy9kYXR1bSBvYmplY3QgYWxzbyB1c2VzIHRoZXNlIHZhbHVlc1xuICBvdXQuYiA9IGI7XG4gIG91dC5lcyA9IGVzO1xuICBvdXQuZXAyID0gZXAyO1xuICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBkYXR1bTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9kYXR1bS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2RhdHVtLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCB7UEpEXzNQQVJBTSwgUEpEXzdQQVJBTSwgSEFMRl9QSX0gZnJvbSAnLi9jb25zdGFudHMvdmFsdWVzJztcbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlRGF0dW1zKHNvdXJjZSwgZGVzdCkge1xuICBpZiAoc291cmNlLmRhdHVtX3R5cGUgIT09IGRlc3QuZGF0dW1fdHlwZSkge1xuICAgIHJldHVybiBmYWxzZTsgLy8gZmFsc2UsIGRhdHVtcyBhcmUgbm90IGVxdWFsXG4gIH0gZWxzZSBpZiAoc291cmNlLmEgIT09IGRlc3QuYSB8fCBNYXRoLmFicyhzb3VyY2UuZXMgLSBkZXN0LmVzKSA+IDAuMDAwMDAwMDAwMDUwKSB7XG4gICAgLy8gdGhlIHRvbGVyYW5jZSBmb3IgZXMgaXMgdG8gZW5zdXJlIHRoYXQgR1JTODAgYW5kIFdHUzg0XG4gICAgLy8gYXJlIGNvbnNpZGVyZWQgaWRlbnRpY2FsXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2UgaWYgKHNvdXJjZS5kYXR1bV90eXBlID09PSBQSkRfM1BBUkFNKSB7XG4gICAgcmV0dXJuIChzb3VyY2UuZGF0dW1fcGFyYW1zWzBdID09PSBkZXN0LmRhdHVtX3BhcmFtc1swXSAmJiBzb3VyY2UuZGF0dW1fcGFyYW1zWzFdID09PSBkZXN0LmRhdHVtX3BhcmFtc1sxXSAmJiBzb3VyY2UuZGF0dW1fcGFyYW1zWzJdID09PSBkZXN0LmRhdHVtX3BhcmFtc1syXSk7XG4gIH0gZWxzZSBpZiAoc291cmNlLmRhdHVtX3R5cGUgPT09IFBKRF83UEFSQU0pIHtcbiAgICByZXR1cm4gKHNvdXJjZS5kYXR1bV9wYXJhbXNbMF0gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzBdICYmIHNvdXJjZS5kYXR1bV9wYXJhbXNbMV0gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzFdICYmIHNvdXJjZS5kYXR1bV9wYXJhbXNbMl0gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzJdICYmIHNvdXJjZS5kYXR1bV9wYXJhbXNbM10gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzNdICYmIHNvdXJjZS5kYXR1bV9wYXJhbXNbNF0gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzRdICYmIHNvdXJjZS5kYXR1bV9wYXJhbXNbNV0gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzVdICYmIHNvdXJjZS5kYXR1bV9wYXJhbXNbNl0gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzZdKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gZGF0dW1zIGFyZSBlcXVhbFxuICB9XG59IC8vIGNzX2NvbXBhcmVfZGF0dW1zKClcblxuLypcbiAqIFRoZSBmdW5jdGlvbiBDb252ZXJ0X0dlb2RldGljX1RvX0dlb2NlbnRyaWMgY29udmVydHMgZ2VvZGV0aWMgY29vcmRpbmF0ZXNcbiAqIChsYXRpdHVkZSwgbG9uZ2l0dWRlLCBhbmQgaGVpZ2h0KSB0byBnZW9jZW50cmljIGNvb3JkaW5hdGVzIChYLCBZLCBaKSxcbiAqIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBlbGxpcHNvaWQgcGFyYW1ldGVycy5cbiAqXG4gKiAgICBMYXRpdHVkZSAgOiBHZW9kZXRpYyBsYXRpdHVkZSBpbiByYWRpYW5zICAgICAgICAgICAgICAgICAgICAgKGlucHV0KVxuICogICAgTG9uZ2l0dWRlIDogR2VvZGV0aWMgbG9uZ2l0dWRlIGluIHJhZGlhbnMgICAgICAgICAgICAgICAgICAgIChpbnB1dClcbiAqICAgIEhlaWdodCAgICA6IEdlb2RldGljIGhlaWdodCwgaW4gbWV0ZXJzICAgICAgICAgICAgICAgICAgICAgICAoaW5wdXQpXG4gKiAgICBYICAgICAgICAgOiBDYWxjdWxhdGVkIEdlb2NlbnRyaWMgWCBjb29yZGluYXRlLCBpbiBtZXRlcnMgICAgKG91dHB1dClcbiAqICAgIFkgICAgICAgICA6IENhbGN1bGF0ZWQgR2VvY2VudHJpYyBZIGNvb3JkaW5hdGUsIGluIG1ldGVycyAgICAob3V0cHV0KVxuICogICAgWiAgICAgICAgIDogQ2FsY3VsYXRlZCBHZW9jZW50cmljIFogY29vcmRpbmF0ZSwgaW4gbWV0ZXJzICAgIChvdXRwdXQpXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VvZGV0aWNUb0dlb2NlbnRyaWMocCwgZXMsIGEpIHtcbiAgdmFyIExvbmdpdHVkZSA9IHAueDtcbiAgdmFyIExhdGl0dWRlID0gcC55O1xuICB2YXIgSGVpZ2h0ID0gcC56ID8gcC56IDogMDsgLy9aIHZhbHVlIG5vdCBhbHdheXMgc3VwcGxpZWRcblxuICB2YXIgUm47IC8qICBFYXJ0aCByYWRpdXMgYXQgbG9jYXRpb24gICovXG4gIHZhciBTaW5fTGF0OyAvKiAgTWF0aC5zaW4oTGF0aXR1ZGUpICAqL1xuICB2YXIgU2luMl9MYXQ7IC8qICBTcXVhcmUgb2YgTWF0aC5zaW4oTGF0aXR1ZGUpICAqL1xuICB2YXIgQ29zX0xhdDsgLyogIE1hdGguY29zKExhdGl0dWRlKSAgKi9cblxuICAvKlxuICAgKiogRG9uJ3QgYmxvdyB1cCBpZiBMYXRpdHVkZSBpcyBqdXN0IGEgbGl0dGxlIG91dCBvZiB0aGUgdmFsdWVcbiAgICoqIHJhbmdlIGFzIGl0IG1heSBqdXN0IGJlIGEgcm91bmRpbmcgaXNzdWUuICBBbHNvIHJlbW92ZWQgbG9uZ2l0dWRlXG4gICAqKiB0ZXN0LCBpdCBzaG91bGQgYmUgd3JhcHBlZCBieSBNYXRoLmNvcygpIGFuZCBNYXRoLnNpbigpLiAgTkZXIGZvciBQUk9KLjQsIFNlcC8yMDAxLlxuICAgKi9cbiAgaWYgKExhdGl0dWRlIDwgLUhBTEZfUEkgJiYgTGF0aXR1ZGUgPiAtMS4wMDEgKiBIQUxGX1BJKSB7XG4gICAgTGF0aXR1ZGUgPSAtSEFMRl9QSTtcbiAgfSBlbHNlIGlmIChMYXRpdHVkZSA+IEhBTEZfUEkgJiYgTGF0aXR1ZGUgPCAxLjAwMSAqIEhBTEZfUEkpIHtcbiAgICBMYXRpdHVkZSA9IEhBTEZfUEk7XG4gIH0gZWxzZSBpZiAoTGF0aXR1ZGUgPCAtSEFMRl9QSSkge1xuICAgIC8qIExhdGl0dWRlIG91dCBvZiByYW5nZSAqL1xuICAgIC8vLi5yZXBvcnRFcnJvcignZ2VvY2VudDpsYXQgb3V0IG9mIHJhbmdlOicgKyBMYXRpdHVkZSk7XG4gICAgcmV0dXJuIHsgeDogLUluZmluaXR5LCB5OiAtSW5maW5pdHksIHo6IHAueiB9O1xuICB9IGVsc2UgaWYgKExhdGl0dWRlID4gSEFMRl9QSSkge1xuICAgIC8qIExhdGl0dWRlIG91dCBvZiByYW5nZSAqL1xuICAgIHJldHVybiB7IHg6IEluZmluaXR5LCB5OiBJbmZpbml0eSwgejogcC56IH07XG4gIH1cblxuICBpZiAoTG9uZ2l0dWRlID4gTWF0aC5QSSkge1xuICAgIExvbmdpdHVkZSAtPSAoMiAqIE1hdGguUEkpO1xuICB9XG4gIFNpbl9MYXQgPSBNYXRoLnNpbihMYXRpdHVkZSk7XG4gIENvc19MYXQgPSBNYXRoLmNvcyhMYXRpdHVkZSk7XG4gIFNpbjJfTGF0ID0gU2luX0xhdCAqIFNpbl9MYXQ7XG4gIFJuID0gYSAvIChNYXRoLnNxcnQoMS4wZTAgLSBlcyAqIFNpbjJfTGF0KSk7XG4gIHJldHVybiB7XG4gICAgeDogKFJuICsgSGVpZ2h0KSAqIENvc19MYXQgKiBNYXRoLmNvcyhMb25naXR1ZGUpLFxuICAgIHk6IChSbiArIEhlaWdodCkgKiBDb3NfTGF0ICogTWF0aC5zaW4oTG9uZ2l0dWRlKSxcbiAgICB6OiAoKFJuICogKDEgLSBlcykpICsgSGVpZ2h0KSAqIFNpbl9MYXRcbiAgfTtcbn0gLy8gY3NfZ2VvZGV0aWNfdG9fZ2VvY2VudHJpYygpXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9jZW50cmljVG9HZW9kZXRpYyhwLCBlcywgYSwgYikge1xuICAvKiBsb2NhbCBkZWZpbnRpb25zIGFuZCB2YXJpYWJsZXMgKi9cbiAgLyogZW5kLWNyaXRlcml1bSBvZiBsb29wLCBhY2N1cmFjeSBvZiBzaW4oTGF0aXR1ZGUpICovXG4gIHZhciBnZW5hdSA9IDFlLTEyO1xuICB2YXIgZ2VuYXUyID0gKGdlbmF1ICogZ2VuYXUpO1xuICB2YXIgbWF4aXRlciA9IDMwO1xuXG4gIHZhciBQOyAvKiBkaXN0YW5jZSBiZXR3ZWVuIHNlbWktbWlub3IgYXhpcyBhbmQgbG9jYXRpb24gKi9cbiAgdmFyIFJSOyAvKiBkaXN0YW5jZSBiZXR3ZWVuIGNlbnRlciBhbmQgbG9jYXRpb24gKi9cbiAgdmFyIENUOyAvKiBzaW4gb2YgZ2VvY2VudHJpYyBsYXRpdHVkZSAqL1xuICB2YXIgU1Q7IC8qIGNvcyBvZiBnZW9jZW50cmljIGxhdGl0dWRlICovXG4gIHZhciBSWDtcbiAgdmFyIFJLO1xuICB2YXIgUk47IC8qIEVhcnRoIHJhZGl1cyBhdCBsb2NhdGlvbiAqL1xuICB2YXIgQ1BISTA7IC8qIGNvcyBvZiBzdGFydCBvciBvbGQgZ2VvZGV0aWMgbGF0aXR1ZGUgaW4gaXRlcmF0aW9ucyAqL1xuICB2YXIgU1BISTA7IC8qIHNpbiBvZiBzdGFydCBvciBvbGQgZ2VvZGV0aWMgbGF0aXR1ZGUgaW4gaXRlcmF0aW9ucyAqL1xuICB2YXIgQ1BISTsgLyogY29zIG9mIHNlYXJjaGVkIGdlb2RldGljIGxhdGl0dWRlICovXG4gIHZhciBTUEhJOyAvKiBzaW4gb2Ygc2VhcmNoZWQgZ2VvZGV0aWMgbGF0aXR1ZGUgKi9cbiAgdmFyIFNEUEhJOyAvKiBlbmQtY3JpdGVyaXVtOiBhZGRpdGlvbi10aGVvcmVtIG9mIHNpbihMYXRpdHVkZShpdGVyKS1MYXRpdHVkZShpdGVyLTEpKSAqL1xuICB2YXIgaXRlcjsgLyogIyBvZiBjb250aW5vdXMgaXRlcmF0aW9uLCBtYXguIDMwIGlzIGFsd2F5cyBlbm91Z2ggKHMuYS4pICovXG5cbiAgdmFyIFggPSBwLng7XG4gIHZhciBZID0gcC55O1xuICB2YXIgWiA9IHAueiA/IHAueiA6IDAuMDsgLy9aIHZhbHVlIG5vdCBhbHdheXMgc3VwcGxpZWRcbiAgdmFyIExvbmdpdHVkZTtcbiAgdmFyIExhdGl0dWRlO1xuICB2YXIgSGVpZ2h0O1xuXG4gIFAgPSBNYXRoLnNxcnQoWCAqIFggKyBZICogWSk7XG4gIFJSID0gTWF0aC5zcXJ0KFggKiBYICsgWSAqIFkgKyBaICogWik7XG5cbiAgLyogICAgICBzcGVjaWFsIGNhc2VzIGZvciBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlICovXG4gIGlmIChQIC8gYSA8IGdlbmF1KSB7XG5cbiAgICAvKiAgc3BlY2lhbCBjYXNlLCBpZiBQPTAuIChYPTAuLCBZPTAuKSAqL1xuICAgIExvbmdpdHVkZSA9IDAuMDtcblxuICAgIC8qICBpZiAoWCxZLFopPSgwLiwwLiwwLikgdGhlbiBIZWlnaHQgYmVjb21lcyBzZW1pLW1pbm9yIGF4aXNcbiAgICAgKiAgb2YgZWxsaXBzb2lkICg9Y2VudGVyIG9mIG1hc3MpLCBMYXRpdHVkZSBiZWNvbWVzIFBJLzIgKi9cbiAgICBpZiAoUlIgLyBhIDwgZ2VuYXUpIHtcbiAgICAgIExhdGl0dWRlID0gSEFMRl9QSTtcbiAgICAgIEhlaWdodCA9IC1iO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogcC54LFxuICAgICAgICB5OiBwLnksXG4gICAgICAgIHo6IHAuelxuICAgICAgfTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLyogIGVsbGlwc29pZGFsIChnZW9kZXRpYykgbG9uZ2l0dWRlXG4gICAgICogIGludGVydmFsOiAtUEkgPCBMb25naXR1ZGUgPD0gK1BJICovXG4gICAgTG9uZ2l0dWRlID0gTWF0aC5hdGFuMihZLCBYKTtcbiAgfVxuXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEZvbGxvd2luZyBpdGVyYXRpdmUgYWxnb3JpdGhtIHdhcyBkZXZlbG9wcGVkIGJ5XG4gICAqIFwiSW5zdGl0dXQgZm9yIEVyZG1lc3N1bmdcIiwgVW5pdmVyc2l0eSBvZiBIYW5ub3ZlciwgSnVseSAxOTg4LlxuICAgKiBJbnRlcm5ldDogd3d3LmlmZS51bmktaGFubm92ZXIuZGVcbiAgICogSXRlcmF0aXZlIGNvbXB1dGF0aW9uIG9mIENQSEksU1BISSBhbmQgSGVpZ2h0LlxuICAgKiBJdGVyYXRpb24gb2YgQ1BISSBhbmQgU1BISSB0byAxMCoqLTEyIHJhZGlhbiByZXNwLlxuICAgKiAyKjEwKiotNyBhcmNzZWMuXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuICBDVCA9IFogLyBSUjtcbiAgU1QgPSBQIC8gUlI7XG4gIFJYID0gMS4wIC8gTWF0aC5zcXJ0KDEuMCAtIGVzICogKDIuMCAtIGVzKSAqIFNUICogU1QpO1xuICBDUEhJMCA9IFNUICogKDEuMCAtIGVzKSAqIFJYO1xuICBTUEhJMCA9IENUICogUlg7XG4gIGl0ZXIgPSAwO1xuXG4gIC8qIGxvb3AgdG8gZmluZCBzaW4oTGF0aXR1ZGUpIHJlc3AuIExhdGl0dWRlXG4gICAqIHVudGlsIHxzaW4oTGF0aXR1ZGUoaXRlciktTGF0aXR1ZGUoaXRlci0xKSl8IDwgZ2VuYXUgKi9cbiAgZG8ge1xuICAgIGl0ZXIrKztcbiAgICBSTiA9IGEgLyBNYXRoLnNxcnQoMS4wIC0gZXMgKiBTUEhJMCAqIFNQSEkwKTtcblxuICAgIC8qICBlbGxpcHNvaWRhbCAoZ2VvZGV0aWMpIGhlaWdodCAqL1xuICAgIEhlaWdodCA9IFAgKiBDUEhJMCArIFogKiBTUEhJMCAtIFJOICogKDEuMCAtIGVzICogU1BISTAgKiBTUEhJMCk7XG5cbiAgICBSSyA9IGVzICogUk4gLyAoUk4gKyBIZWlnaHQpO1xuICAgIFJYID0gMS4wIC8gTWF0aC5zcXJ0KDEuMCAtIFJLICogKDIuMCAtIFJLKSAqIFNUICogU1QpO1xuICAgIENQSEkgPSBTVCAqICgxLjAgLSBSSykgKiBSWDtcbiAgICBTUEhJID0gQ1QgKiBSWDtcbiAgICBTRFBISSA9IFNQSEkgKiBDUEhJMCAtIENQSEkgKiBTUEhJMDtcbiAgICBDUEhJMCA9IENQSEk7XG4gICAgU1BISTAgPSBTUEhJO1xuICB9XG4gIHdoaWxlIChTRFBISSAqIFNEUEhJID4gZ2VuYXUyICYmIGl0ZXIgPCBtYXhpdGVyKTtcblxuICAvKiAgICAgIGVsbGlwc29pZGFsIChnZW9kZXRpYykgbGF0aXR1ZGUgKi9cbiAgTGF0aXR1ZGUgPSBNYXRoLmF0YW4oU1BISSAvIE1hdGguYWJzKENQSEkpKTtcbiAgcmV0dXJuIHtcbiAgICB4OiBMb25naXR1ZGUsXG4gICAgeTogTGF0aXR1ZGUsXG4gICAgejogSGVpZ2h0XG4gIH07XG59IC8vIGNzX2dlb2NlbnRyaWNfdG9fZ2VvZGV0aWMoKVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8vIHBqX2dlb2NlbnRpY190b193Z3M4NCggcCApXG4vLyAgcCA9IHBvaW50IHRvIHRyYW5zZm9ybSBpbiBnZW9jZW50cmljIGNvb3JkaW5hdGVzICh4LHkseilcblxuXG4vKiogcG9pbnQgb2JqZWN0LCBub3RoaW5nIGZhbmN5LCBqdXN0IGFsbG93cyB2YWx1ZXMgdG8gYmVcbiAgICBwYXNzZWQgYmFjayBhbmQgZm9ydGggYnkgcmVmZXJlbmNlIHJhdGhlciB0aGFuIGJ5IHZhbHVlLlxuICAgIE90aGVyIHBvaW50IGNsYXNzZXMgbWF5IGJlIHVzZWQgYXMgbG9uZyBhcyB0aGV5IGhhdmVcbiAgICB4IGFuZCB5IHByb3BlcnRpZXMsIHdoaWNoIHdpbGwgZ2V0IG1vZGlmaWVkIGluIHRoZSB0cmFuc2Zvcm0gbWV0aG9kLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW9jZW50cmljVG9XZ3M4NChwLCBkYXR1bV90eXBlLCBkYXR1bV9wYXJhbXMpIHtcblxuICBpZiAoZGF0dW1fdHlwZSA9PT0gUEpEXzNQQVJBTSkge1xuICAgIC8vIGlmKCB4W2lvXSA9PT0gSFVHRV9WQUwgKVxuICAgIC8vICAgIGNvbnRpbnVlO1xuICAgIHJldHVybiB7XG4gICAgICB4OiBwLnggKyBkYXR1bV9wYXJhbXNbMF0sXG4gICAgICB5OiBwLnkgKyBkYXR1bV9wYXJhbXNbMV0sXG4gICAgICB6OiBwLnogKyBkYXR1bV9wYXJhbXNbMl0sXG4gICAgfTtcbiAgfSBlbHNlIGlmIChkYXR1bV90eXBlID09PSBQSkRfN1BBUkFNKSB7XG4gICAgdmFyIER4X0JGID0gZGF0dW1fcGFyYW1zWzBdO1xuICAgIHZhciBEeV9CRiA9IGRhdHVtX3BhcmFtc1sxXTtcbiAgICB2YXIgRHpfQkYgPSBkYXR1bV9wYXJhbXNbMl07XG4gICAgdmFyIFJ4X0JGID0gZGF0dW1fcGFyYW1zWzNdO1xuICAgIHZhciBSeV9CRiA9IGRhdHVtX3BhcmFtc1s0XTtcbiAgICB2YXIgUnpfQkYgPSBkYXR1bV9wYXJhbXNbNV07XG4gICAgdmFyIE1fQkYgPSBkYXR1bV9wYXJhbXNbNl07XG4gICAgLy8gaWYoIHhbaW9dID09PSBIVUdFX1ZBTCApXG4gICAgLy8gICAgY29udGludWU7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IE1fQkYgKiAocC54IC0gUnpfQkYgKiBwLnkgKyBSeV9CRiAqIHAueikgKyBEeF9CRixcbiAgICAgIHk6IE1fQkYgKiAoUnpfQkYgKiBwLnggKyBwLnkgLSBSeF9CRiAqIHAueikgKyBEeV9CRixcbiAgICAgIHo6IE1fQkYgKiAoLVJ5X0JGICogcC54ICsgUnhfQkYgKiBwLnkgKyBwLnopICsgRHpfQkZcbiAgICB9O1xuICB9XG59IC8vIGNzX2dlb2NlbnRyaWNfdG9fd2dzODRcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vLyBwal9nZW9jZW50aWNfZnJvbV93Z3M4NCgpXG4vLyAgY29vcmRpbmF0ZSBzeXN0ZW0gZGVmaW5pdGlvbixcbi8vICBwb2ludCB0byB0cmFuc2Zvcm0gaW4gZ2VvY2VudHJpYyBjb29yZGluYXRlcyAoeCx5LHopXG5leHBvcnQgZnVuY3Rpb24gZ2VvY2VudHJpY0Zyb21XZ3M4NChwLCBkYXR1bV90eXBlLCBkYXR1bV9wYXJhbXMpIHtcblxuICBpZiAoZGF0dW1fdHlwZSA9PT0gUEpEXzNQQVJBTSkge1xuICAgIC8vaWYoIHhbaW9dID09PSBIVUdFX1ZBTCApXG4gICAgLy8gICAgY29udGludWU7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHAueCAtIGRhdHVtX3BhcmFtc1swXSxcbiAgICAgIHk6IHAueSAtIGRhdHVtX3BhcmFtc1sxXSxcbiAgICAgIHo6IHAueiAtIGRhdHVtX3BhcmFtc1syXSxcbiAgICB9O1xuXG4gIH0gZWxzZSBpZiAoZGF0dW1fdHlwZSA9PT0gUEpEXzdQQVJBTSkge1xuICAgIHZhciBEeF9CRiA9IGRhdHVtX3BhcmFtc1swXTtcbiAgICB2YXIgRHlfQkYgPSBkYXR1bV9wYXJhbXNbMV07XG4gICAgdmFyIER6X0JGID0gZGF0dW1fcGFyYW1zWzJdO1xuICAgIHZhciBSeF9CRiA9IGRhdHVtX3BhcmFtc1szXTtcbiAgICB2YXIgUnlfQkYgPSBkYXR1bV9wYXJhbXNbNF07XG4gICAgdmFyIFJ6X0JGID0gZGF0dW1fcGFyYW1zWzVdO1xuICAgIHZhciBNX0JGID0gZGF0dW1fcGFyYW1zWzZdO1xuICAgIHZhciB4X3RtcCA9IChwLnggLSBEeF9CRikgLyBNX0JGO1xuICAgIHZhciB5X3RtcCA9IChwLnkgLSBEeV9CRikgLyBNX0JGO1xuICAgIHZhciB6X3RtcCA9IChwLnogLSBEel9CRikgLyBNX0JGO1xuICAgIC8vaWYoIHhbaW9dID09PSBIVUdFX1ZBTCApXG4gICAgLy8gICAgY29udGludWU7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogeF90bXAgKyBSel9CRiAqIHlfdG1wIC0gUnlfQkYgKiB6X3RtcCxcbiAgICAgIHk6IC1Sel9CRiAqIHhfdG1wICsgeV90bXAgKyBSeF9CRiAqIHpfdG1wLFxuICAgICAgejogUnlfQkYgKiB4X3RtcCAtIFJ4X0JGICogeV90bXAgKyB6X3RtcFxuICAgIH07XG4gIH0gLy9jc19nZW9jZW50cmljX2Zyb21fd2dzODQoKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2RhdHVtVXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9kYXR1bVV0aWxzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7UEpEXzNQQVJBTSwgUEpEXzdQQVJBTSwgUEpEX05PREFUVU19IGZyb20gJy4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbmltcG9ydCB7Z2VvZGV0aWNUb0dlb2NlbnRyaWMsIGdlb2NlbnRyaWNUb0dlb2RldGljLCBnZW9jZW50cmljVG9XZ3M4NCwgZ2VvY2VudHJpY0Zyb21XZ3M4NCwgY29tcGFyZURhdHVtc30gZnJvbSAnLi9kYXR1bVV0aWxzJztcbmZ1bmN0aW9uIGNoZWNrUGFyYW1zKHR5cGUpIHtcbiAgcmV0dXJuICh0eXBlID09PSBQSkRfM1BBUkFNIHx8IHR5cGUgPT09IFBKRF83UEFSQU0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzb3VyY2UsIGRlc3QsIHBvaW50KSB7XG4gIC8vIFNob3J0IGN1dCBpZiB0aGUgZGF0dW1zIGFyZSBpZGVudGljYWwuXG4gIGlmIChjb21wYXJlRGF0dW1zKHNvdXJjZSwgZGVzdCkpIHtcbiAgICByZXR1cm4gcG9pbnQ7IC8vIGluIHRoaXMgY2FzZSwgemVybyBpcyBzdWNlc3MsXG4gICAgLy8gd2hlcmVhcyBjc19jb21wYXJlX2RhdHVtcyByZXR1cm5zIDEgdG8gaW5kaWNhdGUgVFJVRVxuICAgIC8vIGNvbmZ1c2luZywgc2hvdWxkIGZpeCB0aGlzXG4gIH1cblxuICAvLyBFeHBsaWNpdGx5IHNraXAgZGF0dW0gdHJhbnNmb3JtIGJ5IHNldHRpbmcgJ2RhdHVtPW5vbmUnIGFzIHBhcmFtZXRlciBmb3IgZWl0aGVyIHNvdXJjZSBvciBkZXN0XG4gIGlmIChzb3VyY2UuZGF0dW1fdHlwZSA9PT0gUEpEX05PREFUVU0gfHwgZGVzdC5kYXR1bV90eXBlID09PSBQSkRfTk9EQVRVTSkge1xuICAgIHJldHVybiBwb2ludDtcbiAgfVxuXG4gIC8vIElmIHRoaXMgZGF0dW0gcmVxdWlyZXMgZ3JpZCBzaGlmdHMsIHRoZW4gYXBwbHkgaXQgdG8gZ2VvZGV0aWMgY29vcmRpbmF0ZXMuXG5cbiAgLy8gRG8gd2UgbmVlZCB0byBnbyB0aHJvdWdoIGdlb2NlbnRyaWMgY29vcmRpbmF0ZXM/XG4gIGlmIChzb3VyY2UuZXMgPT09IGRlc3QuZXMgJiYgc291cmNlLmEgPT09IGRlc3QuYSAmJiAhY2hlY2tQYXJhbXMoc291cmNlLmRhdHVtX3R5cGUpICYmICAhY2hlY2tQYXJhbXMoZGVzdC5kYXR1bV90eXBlKSkge1xuICAgIHJldHVybiBwb2ludDtcbiAgfVxuXG4gIC8vIENvbnZlcnQgdG8gZ2VvY2VudHJpYyBjb29yZGluYXRlcy5cbiAgcG9pbnQgPSBnZW9kZXRpY1RvR2VvY2VudHJpYyhwb2ludCwgc291cmNlLmVzLCBzb3VyY2UuYSk7XG4gIC8vIENvbnZlcnQgYmV0d2VlbiBkYXR1bXNcbiAgaWYgKGNoZWNrUGFyYW1zKHNvdXJjZS5kYXR1bV90eXBlKSkge1xuICAgIHBvaW50ID0gZ2VvY2VudHJpY1RvV2dzODQocG9pbnQsIHNvdXJjZS5kYXR1bV90eXBlLCBzb3VyY2UuZGF0dW1fcGFyYW1zKTtcbiAgfVxuICBpZiAoY2hlY2tQYXJhbXMoZGVzdC5kYXR1bV90eXBlKSkge1xuICAgIHBvaW50ID0gZ2VvY2VudHJpY0Zyb21XZ3M4NChwb2ludCwgZGVzdC5kYXR1bV90eXBlLCBkZXN0LmRhdHVtX3BhcmFtcyk7XG4gIH1cbiAgcmV0dXJuIGdlb2NlbnRyaWNUb0dlb2RldGljKHBvaW50LCBkZXN0LmVzLCBkZXN0LmEsIGRlc3QuYik7XG5cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9kYXR1bV90cmFuc2Zvcm0uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9kYXR1bV90cmFuc2Zvcm0uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGdsb2JhbHMgZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IHBhcnNlUHJvaiBmcm9tICcuL3Byb2pTdHJpbmcnO1xuaW1wb3J0IHdrdCBmcm9tICd3a3QtcGFyc2VyJztcblxuZnVuY3Rpb24gZGVmcyhuYW1lKSB7XG4gIC8qZ2xvYmFsIGNvbnNvbGUqL1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgdmFyIGRlZiA9IGFyZ3VtZW50c1sxXTtcbiAgICBpZiAodHlwZW9mIGRlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChkZWYuY2hhckF0KDApID09PSAnKycpIHtcbiAgICAgICAgZGVmc1tuYW1lXSA9IHBhcnNlUHJvaihhcmd1bWVudHNbMV0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRlZnNbbmFtZV0gPSB3a3QoYXJndW1lbnRzWzFdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVmc1tuYW1lXSA9IGRlZjtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG5hbWUpKSB7XG4gICAgICByZXR1cm4gbmFtZS5tYXAoZnVuY3Rpb24odikge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICAgIGRlZnMuYXBwbHkodGhhdCwgdik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVmcyh2KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKG5hbWUgaW4gZGVmcykge1xuICAgICAgICByZXR1cm4gZGVmc1tuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoJ0VQU0cnIGluIG5hbWUpIHtcbiAgICAgIGRlZnNbJ0VQU0c6JyArIG5hbWUuRVBTR10gPSBuYW1lO1xuICAgIH1cbiAgICBlbHNlIGlmICgnRVNSSScgaW4gbmFtZSkge1xuICAgICAgZGVmc1snRVNSSTonICsgbmFtZS5FU1JJXSA9IG5hbWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKCdJQVUyMDAwJyBpbiBuYW1lKSB7XG4gICAgICBkZWZzWydJQVUyMDAwOicgKyBuYW1lLklBVTIwMDBdID0gbmFtZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cblxufVxuZ2xvYmFscyhkZWZzKTtcbmV4cG9ydCBkZWZhdWx0IGRlZnM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvZGVmcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2RlZnMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtTSVhUSCwgUkE0LCBSQTYsIEVQU0xOfSBmcm9tICcuL2NvbnN0YW50cy92YWx1ZXMnO1xuaW1wb3J0IHtkZWZhdWx0IGFzIEVsbGlwc29pZCwgV0dTODR9IGZyb20gJy4vY29uc3RhbnRzL0VsbGlwc29pZCc7XG5pbXBvcnQgbWF0Y2ggZnJvbSAnLi9tYXRjaCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBlY2NlbnRyaWNpdHkoYSwgYiwgcmYsIFJfQSkge1xuICB2YXIgYTIgPSBhICogYTsgLy8gdXNlZCBpbiBnZW9jZW50cmljXG4gIHZhciBiMiA9IGIgKiBiOyAvLyB1c2VkIGluIGdlb2NlbnRyaWNcbiAgdmFyIGVzID0gKGEyIC0gYjIpIC8gYTI7IC8vIGUgXiAyXG4gIHZhciBlID0gMDtcbiAgaWYgKFJfQSkge1xuICAgIGEgKj0gMSAtIGVzICogKFNJWFRIICsgZXMgKiAoUkE0ICsgZXMgKiBSQTYpKTtcbiAgICBhMiA9IGEgKiBhO1xuICAgIGVzID0gMDtcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5zcXJ0KGVzKTsgLy8gZWNjZW50cmljaXR5XG4gIH1cbiAgdmFyIGVwMiA9IChhMiAtIGIyKSAvIGIyOyAvLyB1c2VkIGluIGdlb2NlbnRyaWNcbiAgcmV0dXJuIHtcbiAgICBlczogZXMsXG4gICAgZTogZSxcbiAgICBlcDI6IGVwMlxuICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNwaGVyZShhLCBiLCByZiwgZWxscHMsIHNwaGVyZSkge1xuICBpZiAoIWEpIHsgLy8gZG8gd2UgaGF2ZSBhbiBlbGxpcHNvaWQ/XG4gICAgdmFyIGVsbGlwc2UgPSBtYXRjaChFbGxpcHNvaWQsIGVsbHBzKTtcbiAgICBpZiAoIWVsbGlwc2UpIHtcbiAgICAgIGVsbGlwc2UgPSBXR1M4NDtcbiAgICB9XG4gICAgYSA9IGVsbGlwc2UuYTtcbiAgICBiID0gZWxsaXBzZS5iO1xuICAgIHJmID0gZWxsaXBzZS5yZjtcbiAgfVxuXG4gIGlmIChyZiAmJiAhYikge1xuICAgIGIgPSAoMS4wIC0gMS4wIC8gcmYpICogYTtcbiAgfVxuICBpZiAocmYgPT09IDAgfHwgTWF0aC5hYnMoYSAtIGIpIDwgRVBTTE4pIHtcbiAgICBzcGhlcmUgPSB0cnVlO1xuICAgIGIgPSBhO1xuICB9XG4gIHJldHVybiB7XG4gICAgYTogYSxcbiAgICBiOiBiLFxuICAgIHJmOiByZixcbiAgICBzcGhlcmU6IHNwaGVyZVxuICB9O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2Rlcml2ZUNvbnN0YW50cy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2Rlcml2ZUNvbnN0YW50cy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gIGRlc3RpbmF0aW9uID0gZGVzdGluYXRpb24gfHwge307XG4gIHZhciB2YWx1ZSwgcHJvcGVydHk7XG4gIGlmICghc291cmNlKSB7XG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICB9XG4gIGZvciAocHJvcGVydHkgaW4gc291cmNlKSB7XG4gICAgdmFsdWUgPSBzb3VyY2VbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2V4dGVuZC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2V4dGVuZC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihkZWZzKSB7XG4gIGRlZnMoJ0VQU0c6NDMyNicsIFwiK3RpdGxlPVdHUyA4NCAobG9uZy9sYXQpICtwcm9qPWxvbmdsYXQgK2VsbHBzPVdHUzg0ICtkYXR1bT1XR1M4NCArdW5pdHM9ZGVncmVlc1wiKTtcbiAgZGVmcygnRVBTRzo0MjY5JywgXCIrdGl0bGU9TkFEODMgKGxvbmcvbGF0KSArcHJvaj1sb25nbGF0ICthPTYzNzgxMzcuMCArYj02MzU2NzUyLjMxNDE0MDM2ICtlbGxwcz1HUlM4MCArZGF0dW09TkFEODMgK3VuaXRzPWRlZ3JlZXNcIik7XG4gIGRlZnMoJ0VQU0c6Mzg1NycsIFwiK3RpdGxlPVdHUyA4NCAvIFBzZXVkby1NZXJjYXRvciArcHJvaj1tZXJjICthPTYzNzgxMzcgK2I9NjM3ODEzNyArbGF0X3RzPTAuMCArbG9uXzA9MC4wICt4XzA9MC4wICt5XzA9MCAraz0xLjAgK3VuaXRzPW0gK25hZGdyaWRzPUBudWxsICtub19kZWZzXCIpO1xuXG4gIGRlZnMuV0dTODQgPSBkZWZzWydFUFNHOjQzMjYnXTtcbiAgZGVmc1snRVBTRzozNzg1J10gPSBkZWZzWydFUFNHOjM4NTcnXTsgLy8gbWFpbnRhaW4gYmFja3dhcmQgY29tcGF0LCBvZmZpY2lhbCBjb2RlIGlzIDM4NTdcbiAgZGVmcy5HT09HTEUgPSBkZWZzWydFUFNHOjM4NTcnXTtcbiAgZGVmc1snRVBTRzo5MDA5MTMnXSA9IGRlZnNbJ0VQU0c6Mzg1NyddO1xuICBkZWZzWydFUFNHOjEwMjExMyddID0gZGVmc1snRVBTRzozODU3J107XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvZ2xvYmFsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBwcm9qNCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IFByb2ogZnJvbSBcIi4vUHJvalwiO1xuaW1wb3J0IFBvaW50IGZyb20gXCIuL1BvaW50XCI7XG5pbXBvcnQgY29tbW9uIGZyb20gXCIuL2NvbW1vbi90b1BvaW50XCI7XG5pbXBvcnQgZGVmcyBmcm9tIFwiLi9kZWZzXCI7XG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gXCIuL3RyYW5zZm9ybVwiO1xuaW1wb3J0IG1ncnMgZnJvbSBcIm1ncnNcIjtcbmltcG9ydCB2ZXJzaW9uIGZyb20gXCIuL3ZlcnNpb25cIjtcbmltcG9ydCBpbmNsdWRlZFByb2plY3Rpb25zIGZyb20gXCIuLi9wcm9qc1wiO1xuXG5wcm9qNC5kZWZhdWx0RGF0dW0gPSAnV0dTODQnOyAvL2RlZmF1bHQgZGF0dW1cbnByb2o0LlByb2ogPSBQcm9qO1xucHJvajQuV0dTODQgPSBuZXcgcHJvajQuUHJvaignV0dTODQnKTtcbnByb2o0LlBvaW50ID0gUG9pbnQ7XG5wcm9qNC50b1BvaW50ID0gY29tbW9uO1xucHJvajQuZGVmcyA9IGRlZnM7XG5wcm9qNC50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG5wcm9qNC5tZ3JzID0gbWdycztcbnByb2o0LnZlcnNpb24gPSB2ZXJzaW9uO1xuaW5jbHVkZWRQcm9qZWN0aW9ucyhwcm9qNCk7XG5leHBvcnQgZGVmYXVsdCBwcm9qNDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpZ25vcmVkQ2hhciA9IC9bXFxzX1xcLVxcL1xcKFxcKV0vZztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hdGNoKG9iaiwga2V5KSB7XG4gIGlmIChvYmpba2V5XSkge1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIHZhciBsa2V5ID0ga2V5LnRvTG93ZXJDYXNlKCkucmVwbGFjZShpZ25vcmVkQ2hhciwgJycpO1xuICB2YXIgaSA9IC0xO1xuICB2YXIgdGVzdGtleSwgcHJvY2Vzc2VkS2V5O1xuICB3aGlsZSAoKytpIDwga2V5cy5sZW5ndGgpIHtcbiAgICB0ZXN0a2V5ID0ga2V5c1tpXTtcbiAgICBwcm9jZXNzZWRLZXkgPSB0ZXN0a2V5LnRvTG93ZXJDYXNlKCkucmVwbGFjZShpZ25vcmVkQ2hhciwgJycpO1xuICAgIGlmIChwcm9jZXNzZWRLZXkgPT09IGxrZXkpIHtcbiAgICAgIHJldHVybiBvYmpbdGVzdGtleV07XG4gICAgfVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvbWF0Y2guanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9tYXRjaC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZGVmcyBmcm9tICcuL2RlZnMnO1xuaW1wb3J0IHdrdCBmcm9tICd3a3QtcGFyc2VyJztcbmltcG9ydCBwcm9qU3RyIGZyb20gJy4vcHJvalN0cmluZyc7XG5pbXBvcnQgbWF0Y2ggZnJvbSAnLi9tYXRjaCc7XG5mdW5jdGlvbiB0ZXN0T2JqKGNvZGUpe1xuICByZXR1cm4gdHlwZW9mIGNvZGUgPT09ICdzdHJpbmcnO1xufVxuZnVuY3Rpb24gdGVzdERlZihjb2RlKXtcbiAgcmV0dXJuIGNvZGUgaW4gZGVmcztcbn1cbiB2YXIgY29kZVdvcmRzID0gWydQUk9KRUNURURDUlMnLCAnUFJPSkNSUycsICdHRU9HQ1MnLCdHRU9DQ1MnLCdQUk9KQ1MnLCdMT0NBTF9DUycsICdHRU9EQ1JTJywgJ0dFT0RFVElDQ1JTJywgJ0dFT0RFVElDREFUVU0nLCAnRU5HQ1JTJywgJ0VOR0lORUVSSU5HQ1JTJ107XG5mdW5jdGlvbiB0ZXN0V0tUKGNvZGUpe1xuICByZXR1cm4gY29kZVdvcmRzLnNvbWUoZnVuY3Rpb24gKHdvcmQpIHtcbiAgICByZXR1cm4gY29kZS5pbmRleE9mKHdvcmQpID4gLTE7XG4gIH0pO1xufVxudmFyIGNvZGVzID0gWyczODU3JywgJzkwMDkxMycsICczNzg1JywgJzEwMjExMyddO1xuZnVuY3Rpb24gY2hlY2tNZXJjYXRvcihpdGVtKSB7XG4gIHZhciBhdXRoID0gbWF0Y2goaXRlbSwgJ2F1dGhvcml0eScpO1xuICBpZiAoIWF1dGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGNvZGUgPSBtYXRjaChhdXRoLCAnZXBzZycpO1xuICByZXR1cm4gY29kZSAmJiBjb2Rlcy5pbmRleE9mKGNvZGUpID4gLTE7XG59XG5mdW5jdGlvbiBjaGVja1Byb2pTdHIoaXRlbSkge1xuICB2YXIgZXh0ID0gbWF0Y2goaXRlbSwgJ2V4dGVuc2lvbicpO1xuICBpZiAoIWV4dCkge1xuICAgIHJldHVybjtcbiAgfVxuICByZXR1cm4gbWF0Y2goZXh0LCAncHJvajQnKTtcbn1cbmZ1bmN0aW9uIHRlc3RQcm9qKGNvZGUpe1xuICByZXR1cm4gY29kZVswXSA9PT0gJysnO1xufVxuZnVuY3Rpb24gcGFyc2UoY29kZSl7XG4gIGlmICh0ZXN0T2JqKGNvZGUpKSB7XG4gICAgLy9jaGVjayB0byBzZWUgaWYgdGhpcyBpcyBhIFdLVCBzdHJpbmdcbiAgICBpZiAodGVzdERlZihjb2RlKSkge1xuICAgICAgcmV0dXJuIGRlZnNbY29kZV07XG4gICAgfVxuICAgIGlmICh0ZXN0V0tUKGNvZGUpKSB7XG4gICAgICB2YXIgb3V0ID0gd2t0KGNvZGUpO1xuICAgICAgLy8gdGVzdCBvZiBzcGV0aWFsIGNhc2UsIGR1ZSB0byB0aGlzIGJlaW5nIGEgdmVyeSBjb21tb24gYW5kIG9mdGVuIG1hbGZvcm1lZFxuICAgICAgaWYgKGNoZWNrTWVyY2F0b3Iob3V0KSkge1xuICAgICAgICByZXR1cm4gZGVmc1snRVBTRzozODU3J107XG4gICAgICB9XG4gICAgICB2YXIgbWF5YmVQcm9qU3RyID0gY2hlY2tQcm9qU3RyKG91dCk7XG4gICAgICBpZiAobWF5YmVQcm9qU3RyKSB7XG4gICAgICAgIHJldHVybiBwcm9qU3RyKG1heWJlUHJvalN0cik7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICBpZiAodGVzdFByb2ooY29kZSkpIHtcbiAgICAgIHJldHVybiBwcm9qU3RyKGNvZGUpO1xuICAgIH1cbiAgfWVsc2V7XG4gICAgcmV0dXJuIGNvZGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcGFyc2VDb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcGFyc2VDb2RlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7RDJSfSBmcm9tICcuL2NvbnN0YW50cy92YWx1ZXMnO1xuaW1wb3J0IFByaW1lTWVyaWRpYW4gZnJvbSAnLi9jb25zdGFudHMvUHJpbWVNZXJpZGlhbic7XG5pbXBvcnQgdW5pdHMgZnJvbSAnLi9jb25zdGFudHMvdW5pdHMnO1xuaW1wb3J0IG1hdGNoIGZyb20gJy4vbWF0Y2gnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihkZWZEYXRhKSB7XG4gIHZhciBzZWxmID0ge307XG4gIHZhciBwYXJhbU9iaiA9IGRlZkRhdGEuc3BsaXQoJysnKS5tYXAoZnVuY3Rpb24odikge1xuICAgIHJldHVybiB2LnRyaW0oKTtcbiAgfSkuZmlsdGVyKGZ1bmN0aW9uKGEpIHtcbiAgICByZXR1cm4gYTtcbiAgfSkucmVkdWNlKGZ1bmN0aW9uKHAsIGEpIHtcbiAgICB2YXIgc3BsaXQgPSBhLnNwbGl0KCc9Jyk7XG4gICAgc3BsaXQucHVzaCh0cnVlKTtcbiAgICBwW3NwbGl0WzBdLnRvTG93ZXJDYXNlKCldID0gc3BsaXRbMV07XG4gICAgcmV0dXJuIHA7XG4gIH0sIHt9KTtcbiAgdmFyIHBhcmFtTmFtZSwgcGFyYW1WYWwsIHBhcmFtT3V0bmFtZTtcbiAgdmFyIHBhcmFtcyA9IHtcbiAgICBwcm9qOiAncHJvak5hbWUnLFxuICAgIGRhdHVtOiAnZGF0dW1Db2RlJyxcbiAgICByZjogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5yZiA9IHBhcnNlRmxvYXQodik7XG4gICAgfSxcbiAgICBsYXRfMDogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5sYXQwID0gdiAqIEQyUjtcbiAgICB9LFxuICAgIGxhdF8xOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmxhdDEgPSB2ICogRDJSO1xuICAgIH0sXG4gICAgbGF0XzI6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYubGF0MiA9IHYgKiBEMlI7XG4gICAgfSxcbiAgICBsYXRfdHM6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYubGF0X3RzID0gdiAqIEQyUjtcbiAgICB9LFxuICAgIGxvbl8wOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmxvbmcwID0gdiAqIEQyUjtcbiAgICB9LFxuICAgIGxvbl8xOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmxvbmcxID0gdiAqIEQyUjtcbiAgICB9LFxuICAgIGxvbl8yOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmxvbmcyID0gdiAqIEQyUjtcbiAgICB9LFxuICAgIGFscGhhOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmFscGhhID0gcGFyc2VGbG9hdCh2KSAqIEQyUjtcbiAgICB9LFxuICAgIGxvbmM6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYubG9uZ2MgPSB2ICogRDJSO1xuICAgIH0sXG4gICAgeF8wOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLngwID0gcGFyc2VGbG9hdCh2KTtcbiAgICB9LFxuICAgIHlfMDogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi55MCA9IHBhcnNlRmxvYXQodik7XG4gICAgfSxcbiAgICBrXzA6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYuazAgPSBwYXJzZUZsb2F0KHYpO1xuICAgIH0sXG4gICAgazogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5rMCA9IHBhcnNlRmxvYXQodik7XG4gICAgfSxcbiAgICBhOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmEgPSBwYXJzZUZsb2F0KHYpO1xuICAgIH0sXG4gICAgYjogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5iID0gcGFyc2VGbG9hdCh2KTtcbiAgICB9LFxuICAgIHJfYTogZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLlJfQSA9IHRydWU7XG4gICAgfSxcbiAgICB6b25lOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLnpvbmUgPSBwYXJzZUludCh2LCAxMCk7XG4gICAgfSxcbiAgICBzb3V0aDogZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnV0bVNvdXRoID0gdHJ1ZTtcbiAgICB9LFxuICAgIHRvd2dzODQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYuZGF0dW1fcGFyYW1zID0gdi5zcGxpdChcIixcIikubWFwKGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoYSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHRvX21ldGVyOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLnRvX21ldGVyID0gcGFyc2VGbG9hdCh2KTtcbiAgICB9LFxuICAgIHVuaXRzOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLnVuaXRzID0gdjtcbiAgICAgIHZhciB1bml0ID0gbWF0Y2godW5pdHMsIHYpO1xuICAgICAgaWYgKHVuaXQpIHtcbiAgICAgICAgc2VsZi50b19tZXRlciA9IHVuaXQudG9fbWV0ZXI7XG4gICAgICB9XG4gICAgfSxcbiAgICBmcm9tX2dyZWVud2ljaDogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5mcm9tX2dyZWVud2ljaCA9IHYgKiBEMlI7XG4gICAgfSxcbiAgICBwbTogZnVuY3Rpb24odikge1xuICAgICAgdmFyIHBtID0gbWF0Y2goUHJpbWVNZXJpZGlhbiwgdik7XG4gICAgICBzZWxmLmZyb21fZ3JlZW53aWNoID0gKHBtID8gcG0gOiBwYXJzZUZsb2F0KHYpKSAqIEQyUjtcbiAgICB9LFxuICAgIG5hZGdyaWRzOiBmdW5jdGlvbih2KSB7XG4gICAgICBpZiAodiA9PT0gJ0BudWxsJykge1xuICAgICAgICBzZWxmLmRhdHVtQ29kZSA9ICdub25lJztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWxmLm5hZGdyaWRzID0gdjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGF4aXM6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHZhciBsZWdhbEF4aXMgPSBcImV3bnN1ZFwiO1xuICAgICAgaWYgKHYubGVuZ3RoID09PSAzICYmIGxlZ2FsQXhpcy5pbmRleE9mKHYuc3Vic3RyKDAsIDEpKSAhPT0gLTEgJiYgbGVnYWxBeGlzLmluZGV4T2Yodi5zdWJzdHIoMSwgMSkpICE9PSAtMSAmJiBsZWdhbEF4aXMuaW5kZXhPZih2LnN1YnN0cigyLCAxKSkgIT09IC0xKSB7XG4gICAgICAgIHNlbGYuYXhpcyA9IHY7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBmb3IgKHBhcmFtTmFtZSBpbiBwYXJhbU9iaikge1xuICAgIHBhcmFtVmFsID0gcGFyYW1PYmpbcGFyYW1OYW1lXTtcbiAgICBpZiAocGFyYW1OYW1lIGluIHBhcmFtcykge1xuICAgICAgcGFyYW1PdXRuYW1lID0gcGFyYW1zW3BhcmFtTmFtZV07XG4gICAgICBpZiAodHlwZW9mIHBhcmFtT3V0bmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwYXJhbU91dG5hbWUocGFyYW1WYWwpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNlbGZbcGFyYW1PdXRuYW1lXSA9IHBhcmFtVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNlbGZbcGFyYW1OYW1lXSA9IHBhcmFtVmFsO1xuICAgIH1cbiAgfVxuICBpZih0eXBlb2Ygc2VsZi5kYXR1bUNvZGUgPT09ICdzdHJpbmcnICYmIHNlbGYuZGF0dW1Db2RlICE9PSBcIldHUzg0XCIpe1xuICAgIHNlbGYuZGF0dW1Db2RlID0gc2VsZi5kYXR1bUNvZGUudG9Mb3dlckNhc2UoKTtcbiAgfVxuICByZXR1cm4gc2VsZjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qU3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvalN0cmluZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgbWVyYyBmcm9tIFwiLi9wcm9qZWN0aW9ucy9tZXJjXCI7XG5pbXBvcnQgbG9uZ2xhdCBmcm9tIFwiLi9wcm9qZWN0aW9ucy9sb25nbGF0XCI7XG52YXIgcHJvanMgPSBbbWVyYywgbG9uZ2xhdF07XG52YXIgbmFtZXMgPSB7fTtcbnZhciBwcm9qU3RvcmUgPSBbXTtcblxuZnVuY3Rpb24gYWRkKHByb2osIGkpIHtcbiAgdmFyIGxlbiA9IHByb2pTdG9yZS5sZW5ndGg7XG4gIGlmICghcHJvai5uYW1lcykge1xuICAgIGNvbnNvbGUubG9nKGkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHByb2pTdG9yZVtsZW5dID0gcHJvajtcbiAgcHJvai5uYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG4pIHtcbiAgICBuYW1lc1tuLnRvTG93ZXJDYXNlKCldID0gbGVuO1xuICB9KTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCB7YWRkfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldChuYW1lKSB7XG4gIGlmICghbmFtZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbiA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgaWYgKHR5cGVvZiBuYW1lc1tuXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvalN0b3JlW25hbWVzW25dXSkge1xuICAgIHJldHVybiBwcm9qU3RvcmVbbmFtZXNbbl1dO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydCgpIHtcbiAgcHJvanMuZm9yRWFjaChhZGQpO1xufVxuZXhwb3J0IGRlZmF1bHQge1xuICBzdGFydDogc3RhcnQsXG4gIGFkZDogYWRkLFxuICBnZXQ6IGdldFxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBtc2ZueiBmcm9tICcuLi9jb21tb24vbXNmbnonO1xuaW1wb3J0IHFzZm56IGZyb20gJy4uL2NvbW1vbi9xc2Zueic7XG5pbXBvcnQgYWRqdXN0X2xvbiBmcm9tICcuLi9jb21tb24vYWRqdXN0X2xvbic7XG5pbXBvcnQgYXNpbnogZnJvbSAnLi4vY29tbW9uL2FzaW56JztcbmltcG9ydCB7RVBTTE59IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcblxuICBpZiAoTWF0aC5hYnModGhpcy5sYXQxICsgdGhpcy5sYXQyKSA8IEVQU0xOKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMudGVtcCA9IHRoaXMuYiAvIHRoaXMuYTtcbiAgdGhpcy5lcyA9IDEgLSBNYXRoLnBvdyh0aGlzLnRlbXAsIDIpO1xuICB0aGlzLmUzID0gTWF0aC5zcXJ0KHRoaXMuZXMpO1xuXG4gIHRoaXMuc2luX3BvID0gTWF0aC5zaW4odGhpcy5sYXQxKTtcbiAgdGhpcy5jb3NfcG8gPSBNYXRoLmNvcyh0aGlzLmxhdDEpO1xuICB0aGlzLnQxID0gdGhpcy5zaW5fcG87XG4gIHRoaXMuY29uID0gdGhpcy5zaW5fcG87XG4gIHRoaXMubXMxID0gbXNmbnoodGhpcy5lMywgdGhpcy5zaW5fcG8sIHRoaXMuY29zX3BvKTtcbiAgdGhpcy5xczEgPSBxc2Zueih0aGlzLmUzLCB0aGlzLnNpbl9wbywgdGhpcy5jb3NfcG8pO1xuXG4gIHRoaXMuc2luX3BvID0gTWF0aC5zaW4odGhpcy5sYXQyKTtcbiAgdGhpcy5jb3NfcG8gPSBNYXRoLmNvcyh0aGlzLmxhdDIpO1xuICB0aGlzLnQyID0gdGhpcy5zaW5fcG87XG4gIHRoaXMubXMyID0gbXNmbnoodGhpcy5lMywgdGhpcy5zaW5fcG8sIHRoaXMuY29zX3BvKTtcbiAgdGhpcy5xczIgPSBxc2Zueih0aGlzLmUzLCB0aGlzLnNpbl9wbywgdGhpcy5jb3NfcG8pO1xuXG4gIHRoaXMuc2luX3BvID0gTWF0aC5zaW4odGhpcy5sYXQwKTtcbiAgdGhpcy5jb3NfcG8gPSBNYXRoLmNvcyh0aGlzLmxhdDApO1xuICB0aGlzLnQzID0gdGhpcy5zaW5fcG87XG4gIHRoaXMucXMwID0gcXNmbnoodGhpcy5lMywgdGhpcy5zaW5fcG8sIHRoaXMuY29zX3BvKTtcblxuICBpZiAoTWF0aC5hYnModGhpcy5sYXQxIC0gdGhpcy5sYXQyKSA+IEVQU0xOKSB7XG4gICAgdGhpcy5uczAgPSAodGhpcy5tczEgKiB0aGlzLm1zMSAtIHRoaXMubXMyICogdGhpcy5tczIpIC8gKHRoaXMucXMyIC0gdGhpcy5xczEpO1xuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMubnMwID0gdGhpcy5jb247XG4gIH1cbiAgdGhpcy5jID0gdGhpcy5tczEgKiB0aGlzLm1zMSArIHRoaXMubnMwICogdGhpcy5xczE7XG4gIHRoaXMucmggPSB0aGlzLmEgKiBNYXRoLnNxcnQodGhpcy5jIC0gdGhpcy5uczAgKiB0aGlzLnFzMCkgLyB0aGlzLm5zMDtcbn1cblxuLyogQWxiZXJzIENvbmljYWwgRXF1YWwgQXJlYSBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG5cbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcblxuICB0aGlzLnNpbl9waGkgPSBNYXRoLnNpbihsYXQpO1xuICB0aGlzLmNvc19waGkgPSBNYXRoLmNvcyhsYXQpO1xuXG4gIHZhciBxcyA9IHFzZm56KHRoaXMuZTMsIHRoaXMuc2luX3BoaSwgdGhpcy5jb3NfcGhpKTtcbiAgdmFyIHJoMSA9IHRoaXMuYSAqIE1hdGguc3FydCh0aGlzLmMgLSB0aGlzLm5zMCAqIHFzKSAvIHRoaXMubnMwO1xuICB2YXIgdGhldGEgPSB0aGlzLm5zMCAqIGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG4gIHZhciB4ID0gcmgxICogTWF0aC5zaW4odGhldGEpICsgdGhpcy54MDtcbiAgdmFyIHkgPSB0aGlzLnJoIC0gcmgxICogTWF0aC5jb3ModGhldGEpICsgdGhpcy55MDtcblxuICBwLnggPSB4O1xuICBwLnkgPSB5O1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuICB2YXIgcmgxLCBxcywgY29uLCB0aGV0YSwgbG9uLCBsYXQ7XG5cbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSA9IHRoaXMucmggLSBwLnkgKyB0aGlzLnkwO1xuICBpZiAodGhpcy5uczAgPj0gMCkge1xuICAgIHJoMSA9IE1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpO1xuICAgIGNvbiA9IDE7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmgxID0gLU1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpO1xuICAgIGNvbiA9IC0xO1xuICB9XG4gIHRoZXRhID0gMDtcbiAgaWYgKHJoMSAhPT0gMCkge1xuICAgIHRoZXRhID0gTWF0aC5hdGFuMihjb24gKiBwLngsIGNvbiAqIHAueSk7XG4gIH1cbiAgY29uID0gcmgxICogdGhpcy5uczAgLyB0aGlzLmE7XG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIGxhdCA9IE1hdGguYXNpbigodGhpcy5jIC0gY29uICogY29uKSAvICgyICogdGhpcy5uczApKTtcbiAgfVxuICBlbHNlIHtcbiAgICBxcyA9ICh0aGlzLmMgLSBjb24gKiBjb24pIC8gdGhpcy5uczA7XG4gICAgbGF0ID0gdGhpcy5waGkxeih0aGlzLmUzLCBxcyk7XG4gIH1cblxuICBsb24gPSBhZGp1c3RfbG9uKHRoZXRhIC8gdGhpcy5uczAgKyB0aGlzLmxvbmcwKTtcbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG4gIHJldHVybiBwO1xufVxuXG4vKiBGdW5jdGlvbiB0byBjb21wdXRlIHBoaTEsIHRoZSBsYXRpdHVkZSBmb3IgdGhlIGludmVyc2Ugb2YgdGhlXG4gICBBbGJlcnMgQ29uaWNhbCBFcXVhbC1BcmVhIHByb2plY3Rpb24uXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBwaGkxeihlY2NlbnQsIHFzKSB7XG4gIHZhciBzaW5waGksIGNvc3BoaSwgY29uLCBjb20sIGRwaGk7XG4gIHZhciBwaGkgPSBhc2lueigwLjUgKiBxcyk7XG4gIGlmIChlY2NlbnQgPCBFUFNMTikge1xuICAgIHJldHVybiBwaGk7XG4gIH1cblxuICB2YXIgZWNjbnRzID0gZWNjZW50ICogZWNjZW50O1xuICBmb3IgKHZhciBpID0gMTsgaSA8PSAyNTsgaSsrKSB7XG4gICAgc2lucGhpID0gTWF0aC5zaW4ocGhpKTtcbiAgICBjb3NwaGkgPSBNYXRoLmNvcyhwaGkpO1xuICAgIGNvbiA9IGVjY2VudCAqIHNpbnBoaTtcbiAgICBjb20gPSAxIC0gY29uICogY29uO1xuICAgIGRwaGkgPSAwLjUgKiBjb20gKiBjb20gLyBjb3NwaGkgKiAocXMgLyAoMSAtIGVjY250cykgLSBzaW5waGkgLyBjb20gKyAwLjUgLyBlY2NlbnQgKiBNYXRoLmxvZygoMSAtIGNvbikgLyAoMSArIGNvbikpKTtcbiAgICBwaGkgPSBwaGkgKyBkcGhpO1xuICAgIGlmIChNYXRoLmFicyhkcGhpKSA8PSAxZS03KSB7XG4gICAgICByZXR1cm4gcGhpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIkFsYmVyc19Db25pY19FcXVhbF9BcmVhXCIsIFwiQWxiZXJzXCIsIFwiYWVhXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXMsXG4gIHBoaTF6OiBwaGkxelxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9hZWEuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9hZWEuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuaW1wb3J0IHtIQUxGX1BJLCBFUFNMTn0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbmltcG9ydCBtbGZuIGZyb20gJy4uL2NvbW1vbi9tbGZuJztcbmltcG9ydCBlMGZuIGZyb20gJy4uL2NvbW1vbi9lMGZuJztcbmltcG9ydCBlMWZuIGZyb20gJy4uL2NvbW1vbi9lMWZuJztcbmltcG9ydCBlMmZuIGZyb20gJy4uL2NvbW1vbi9lMmZuJztcbmltcG9ydCBlM2ZuIGZyb20gJy4uL2NvbW1vbi9lM2ZuJztcbmltcG9ydCBnTiBmcm9tICcuLi9jb21tb24vZ04nO1xuaW1wb3J0IGFzaW56IGZyb20gJy4uL2NvbW1vbi9hc2lueic7XG5pbXBvcnQgaW1sZm4gZnJvbSAnLi4vY29tbW9uL2ltbGZuJztcblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICB0aGlzLnNpbl9wMTIgPSBNYXRoLnNpbih0aGlzLmxhdDApO1xuICB0aGlzLmNvc19wMTIgPSBNYXRoLmNvcyh0aGlzLmxhdDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG4gIHZhciBzaW5waGkgPSBNYXRoLnNpbihwLnkpO1xuICB2YXIgY29zcGhpID0gTWF0aC5jb3MocC55KTtcbiAgdmFyIGRsb24gPSBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICB2YXIgZTAsIGUxLCBlMiwgZTMsIE1scCwgTWwsIHRhbnBoaSwgTmwxLCBObCwgcHNpLCBBeiwgRywgSCwgR0gsIEhzLCBjLCBrcCwgY29zX2MsIHMsIHMyLCBzMywgczQsIHM1O1xuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICBpZiAoTWF0aC5hYnModGhpcy5zaW5fcDEyIC0gMSkgPD0gRVBTTE4pIHtcbiAgICAgIC8vTm9ydGggUG9sZSBjYXNlXG4gICAgICBwLnggPSB0aGlzLngwICsgdGhpcy5hICogKEhBTEZfUEkgLSBsYXQpICogTWF0aC5zaW4oZGxvbik7XG4gICAgICBwLnkgPSB0aGlzLnkwIC0gdGhpcy5hICogKEhBTEZfUEkgLSBsYXQpICogTWF0aC5jb3MoZGxvbik7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgZWxzZSBpZiAoTWF0aC5hYnModGhpcy5zaW5fcDEyICsgMSkgPD0gRVBTTE4pIHtcbiAgICAgIC8vU291dGggUG9sZSBjYXNlXG4gICAgICBwLnggPSB0aGlzLngwICsgdGhpcy5hICogKEhBTEZfUEkgKyBsYXQpICogTWF0aC5zaW4oZGxvbik7XG4gICAgICBwLnkgPSB0aGlzLnkwICsgdGhpcy5hICogKEhBTEZfUEkgKyBsYXQpICogTWF0aC5jb3MoZGxvbik7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvL2RlZmF1bHQgY2FzZVxuICAgICAgY29zX2MgPSB0aGlzLnNpbl9wMTIgKiBzaW5waGkgKyB0aGlzLmNvc19wMTIgKiBjb3NwaGkgKiBNYXRoLmNvcyhkbG9uKTtcbiAgICAgIGMgPSBNYXRoLmFjb3MoY29zX2MpO1xuICAgICAga3AgPSBjIC8gTWF0aC5zaW4oYyk7XG4gICAgICBwLnggPSB0aGlzLngwICsgdGhpcy5hICoga3AgKiBjb3NwaGkgKiBNYXRoLnNpbihkbG9uKTtcbiAgICAgIHAueSA9IHRoaXMueTAgKyB0aGlzLmEgKiBrcCAqICh0aGlzLmNvc19wMTIgKiBzaW5waGkgLSB0aGlzLnNpbl9wMTIgKiBjb3NwaGkgKiBNYXRoLmNvcyhkbG9uKSk7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgZTAgPSBlMGZuKHRoaXMuZXMpO1xuICAgIGUxID0gZTFmbih0aGlzLmVzKTtcbiAgICBlMiA9IGUyZm4odGhpcy5lcyk7XG4gICAgZTMgPSBlM2ZuKHRoaXMuZXMpO1xuICAgIGlmIChNYXRoLmFicyh0aGlzLnNpbl9wMTIgLSAxKSA8PSBFUFNMTikge1xuICAgICAgLy9Ob3J0aCBQb2xlIGNhc2VcbiAgICAgIE1scCA9IHRoaXMuYSAqIG1sZm4oZTAsIGUxLCBlMiwgZTMsIEhBTEZfUEkpO1xuICAgICAgTWwgPSB0aGlzLmEgKiBtbGZuKGUwLCBlMSwgZTIsIGUzLCBsYXQpO1xuICAgICAgcC54ID0gdGhpcy54MCArIChNbHAgLSBNbCkgKiBNYXRoLnNpbihkbG9uKTtcbiAgICAgIHAueSA9IHRoaXMueTAgLSAoTWxwIC0gTWwpICogTWF0aC5jb3MoZGxvbik7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgZWxzZSBpZiAoTWF0aC5hYnModGhpcy5zaW5fcDEyICsgMSkgPD0gRVBTTE4pIHtcbiAgICAgIC8vU291dGggUG9sZSBjYXNlXG4gICAgICBNbHAgPSB0aGlzLmEgKiBtbGZuKGUwLCBlMSwgZTIsIGUzLCBIQUxGX1BJKTtcbiAgICAgIE1sID0gdGhpcy5hICogbWxmbihlMCwgZTEsIGUyLCBlMywgbGF0KTtcbiAgICAgIHAueCA9IHRoaXMueDAgKyAoTWxwICsgTWwpICogTWF0aC5zaW4oZGxvbik7XG4gICAgICBwLnkgPSB0aGlzLnkwICsgKE1scCArIE1sKSAqIE1hdGguY29zKGRsb24pO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy9EZWZhdWx0IGNhc2VcbiAgICAgIHRhbnBoaSA9IHNpbnBoaSAvIGNvc3BoaTtcbiAgICAgIE5sMSA9IGdOKHRoaXMuYSwgdGhpcy5lLCB0aGlzLnNpbl9wMTIpO1xuICAgICAgTmwgPSBnTih0aGlzLmEsIHRoaXMuZSwgc2lucGhpKTtcbiAgICAgIHBzaSA9IE1hdGguYXRhbigoMSAtIHRoaXMuZXMpICogdGFucGhpICsgdGhpcy5lcyAqIE5sMSAqIHRoaXMuc2luX3AxMiAvIChObCAqIGNvc3BoaSkpO1xuICAgICAgQXogPSBNYXRoLmF0YW4yKE1hdGguc2luKGRsb24pLCB0aGlzLmNvc19wMTIgKiBNYXRoLnRhbihwc2kpIC0gdGhpcy5zaW5fcDEyICogTWF0aC5jb3MoZGxvbikpO1xuICAgICAgaWYgKEF6ID09PSAwKSB7XG4gICAgICAgIHMgPSBNYXRoLmFzaW4odGhpcy5jb3NfcDEyICogTWF0aC5zaW4ocHNpKSAtIHRoaXMuc2luX3AxMiAqIE1hdGguY29zKHBzaSkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoTWF0aC5hYnMoTWF0aC5hYnMoQXopIC0gTWF0aC5QSSkgPD0gRVBTTE4pIHtcbiAgICAgICAgcyA9IC1NYXRoLmFzaW4odGhpcy5jb3NfcDEyICogTWF0aC5zaW4ocHNpKSAtIHRoaXMuc2luX3AxMiAqIE1hdGguY29zKHBzaSkpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHMgPSBNYXRoLmFzaW4oTWF0aC5zaW4oZGxvbikgKiBNYXRoLmNvcyhwc2kpIC8gTWF0aC5zaW4oQXopKTtcbiAgICAgIH1cbiAgICAgIEcgPSB0aGlzLmUgKiB0aGlzLnNpbl9wMTIgLyBNYXRoLnNxcnQoMSAtIHRoaXMuZXMpO1xuICAgICAgSCA9IHRoaXMuZSAqIHRoaXMuY29zX3AxMiAqIE1hdGguY29zKEF6KSAvIE1hdGguc3FydCgxIC0gdGhpcy5lcyk7XG4gICAgICBHSCA9IEcgKiBIO1xuICAgICAgSHMgPSBIICogSDtcbiAgICAgIHMyID0gcyAqIHM7XG4gICAgICBzMyA9IHMyICogcztcbiAgICAgIHM0ID0gczMgKiBzO1xuICAgICAgczUgPSBzNCAqIHM7XG4gICAgICBjID0gTmwxICogcyAqICgxIC0gczIgKiBIcyAqICgxIC0gSHMpIC8gNiArIHMzIC8gOCAqIEdIICogKDEgLSAyICogSHMpICsgczQgLyAxMjAgKiAoSHMgKiAoNCAtIDcgKiBIcykgLSAzICogRyAqIEcgKiAoMSAtIDcgKiBIcykpIC0gczUgLyA0OCAqIEdIKTtcbiAgICAgIHAueCA9IHRoaXMueDAgKyBjICogTWF0aC5zaW4oQXopO1xuICAgICAgcC55ID0gdGhpcy55MCArIGMgKiBNYXRoLmNvcyhBeik7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gIH1cblxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSAtPSB0aGlzLnkwO1xuICB2YXIgcmgsIHosIHNpbnosIGNvc3osIGxvbiwgbGF0LCBjb24sIGUwLCBlMSwgZTIsIGUzLCBNbHAsIE0sIE4xLCBwc2ksIEF6LCBjb3NBeiwgdG1wLCBBLCBCLCBELCBFZSwgRjtcbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgcmggPSBNYXRoLnNxcnQocC54ICogcC54ICsgcC55ICogcC55KTtcbiAgICBpZiAocmggPiAoMiAqIEhBTEZfUEkgKiB0aGlzLmEpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHogPSByaCAvIHRoaXMuYTtcblxuICAgIHNpbnogPSBNYXRoLnNpbih6KTtcbiAgICBjb3N6ID0gTWF0aC5jb3Moeik7XG5cbiAgICBsb24gPSB0aGlzLmxvbmcwO1xuICAgIGlmIChNYXRoLmFicyhyaCkgPD0gRVBTTE4pIHtcbiAgICAgIGxhdCA9IHRoaXMubGF0MDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsYXQgPSBhc2lueihjb3N6ICogdGhpcy5zaW5fcDEyICsgKHAueSAqIHNpbnogKiB0aGlzLmNvc19wMTIpIC8gcmgpO1xuICAgICAgY29uID0gTWF0aC5hYnModGhpcy5sYXQwKSAtIEhBTEZfUEk7XG4gICAgICBpZiAoTWF0aC5hYnMoY29uKSA8PSBFUFNMTikge1xuICAgICAgICBpZiAodGhpcy5sYXQwID49IDApIHtcbiAgICAgICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBNYXRoLmF0YW4yKHAueCwgLSBwLnkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgLSBNYXRoLmF0YW4yKC1wLngsIHAueSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLypjb24gPSBjb3N6IC0gdGhpcy5zaW5fcDEyICogTWF0aC5zaW4obGF0KTtcbiAgICAgICAgaWYgKChNYXRoLmFicyhjb24pIDwgRVBTTE4pICYmIChNYXRoLmFicyhwLngpIDwgRVBTTE4pKSB7XG4gICAgICAgICAgLy9uby1vcCwganVzdCBrZWVwIHRoZSBsb24gdmFsdWUgYXMgaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgdGVtcCA9IE1hdGguYXRhbjIoKHAueCAqIHNpbnogKiB0aGlzLmNvc19wMTIpLCAoY29uICogcmgpKTtcbiAgICAgICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBNYXRoLmF0YW4yKChwLnggKiBzaW56ICogdGhpcy5jb3NfcDEyKSwgKGNvbiAqIHJoKSkpO1xuICAgICAgICB9Ki9cbiAgICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMihwLnggKiBzaW56LCByaCAqIHRoaXMuY29zX3AxMiAqIGNvc3ogLSBwLnkgKiB0aGlzLnNpbl9wMTIgKiBzaW56KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcC54ID0gbG9uO1xuICAgIHAueSA9IGxhdDtcbiAgICByZXR1cm4gcDtcbiAgfVxuICBlbHNlIHtcbiAgICBlMCA9IGUwZm4odGhpcy5lcyk7XG4gICAgZTEgPSBlMWZuKHRoaXMuZXMpO1xuICAgIGUyID0gZTJmbih0aGlzLmVzKTtcbiAgICBlMyA9IGUzZm4odGhpcy5lcyk7XG4gICAgaWYgKE1hdGguYWJzKHRoaXMuc2luX3AxMiAtIDEpIDw9IEVQU0xOKSB7XG4gICAgICAvL05vcnRoIHBvbGUgY2FzZVxuICAgICAgTWxwID0gdGhpcy5hICogbWxmbihlMCwgZTEsIGUyLCBlMywgSEFMRl9QSSk7XG4gICAgICByaCA9IE1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpO1xuICAgICAgTSA9IE1scCAtIHJoO1xuICAgICAgbGF0ID0gaW1sZm4oTSAvIHRoaXMuYSwgZTAsIGUxLCBlMiwgZTMpO1xuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMihwLngsIC0gMSAqIHAueSkpO1xuICAgICAgcC54ID0gbG9uO1xuICAgICAgcC55ID0gbGF0O1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGVsc2UgaWYgKE1hdGguYWJzKHRoaXMuc2luX3AxMiArIDEpIDw9IEVQU0xOKSB7XG4gICAgICAvL1NvdXRoIHBvbGUgY2FzZVxuICAgICAgTWxwID0gdGhpcy5hICogbWxmbihlMCwgZTEsIGUyLCBlMywgSEFMRl9QSSk7XG4gICAgICByaCA9IE1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpO1xuICAgICAgTSA9IHJoIC0gTWxwO1xuXG4gICAgICBsYXQgPSBpbWxmbihNIC8gdGhpcy5hLCBlMCwgZTEsIGUyLCBlMyk7XG4gICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBNYXRoLmF0YW4yKHAueCwgcC55KSk7XG4gICAgICBwLnggPSBsb247XG4gICAgICBwLnkgPSBsYXQ7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvL2RlZmF1bHQgY2FzZVxuICAgICAgcmggPSBNYXRoLnNxcnQocC54ICogcC54ICsgcC55ICogcC55KTtcbiAgICAgIEF6ID0gTWF0aC5hdGFuMihwLngsIHAueSk7XG4gICAgICBOMSA9IGdOKHRoaXMuYSwgdGhpcy5lLCB0aGlzLnNpbl9wMTIpO1xuICAgICAgY29zQXogPSBNYXRoLmNvcyhBeik7XG4gICAgICB0bXAgPSB0aGlzLmUgKiB0aGlzLmNvc19wMTIgKiBjb3NBejtcbiAgICAgIEEgPSAtdG1wICogdG1wIC8gKDEgLSB0aGlzLmVzKTtcbiAgICAgIEIgPSAzICogdGhpcy5lcyAqICgxIC0gQSkgKiB0aGlzLnNpbl9wMTIgKiB0aGlzLmNvc19wMTIgKiBjb3NBeiAvICgxIC0gdGhpcy5lcyk7XG4gICAgICBEID0gcmggLyBOMTtcbiAgICAgIEVlID0gRCAtIEEgKiAoMSArIEEpICogTWF0aC5wb3coRCwgMykgLyA2IC0gQiAqICgxICsgMyAqIEEpICogTWF0aC5wb3coRCwgNCkgLyAyNDtcbiAgICAgIEYgPSAxIC0gQSAqIEVlICogRWUgLyAyIC0gRCAqIEVlICogRWUgKiBFZSAvIDY7XG4gICAgICBwc2kgPSBNYXRoLmFzaW4odGhpcy5zaW5fcDEyICogTWF0aC5jb3MoRWUpICsgdGhpcy5jb3NfcDEyICogTWF0aC5zaW4oRWUpICogY29zQXopO1xuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hc2luKE1hdGguc2luKEF6KSAqIE1hdGguc2luKEVlKSAvIE1hdGguY29zKHBzaSkpKTtcbiAgICAgIGxhdCA9IE1hdGguYXRhbigoMSAtIHRoaXMuZXMgKiBGICogdGhpcy5zaW5fcDEyIC8gTWF0aC5zaW4ocHNpKSkgKiBNYXRoLnRhbihwc2kpIC8gKDEgLSB0aGlzLmVzKSk7XG4gICAgICBwLnggPSBsb247XG4gICAgICBwLnkgPSBsYXQ7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgdmFyIG5hbWVzID0gW1wiQXppbXV0aGFsX0VxdWlkaXN0YW50XCIsIFwiYWVxZFwiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2FlcWQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9hZXFkLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBtbGZuIGZyb20gJy4uL2NvbW1vbi9tbGZuJztcbmltcG9ydCBlMGZuIGZyb20gJy4uL2NvbW1vbi9lMGZuJztcbmltcG9ydCBlMWZuIGZyb20gJy4uL2NvbW1vbi9lMWZuJztcbmltcG9ydCBlMmZuIGZyb20gJy4uL2NvbW1vbi9lMmZuJztcbmltcG9ydCBlM2ZuIGZyb20gJy4uL2NvbW1vbi9lM2ZuJztcbmltcG9ydCBnTiBmcm9tICcuLi9jb21tb24vZ04nO1xuaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuaW1wb3J0IGFkanVzdF9sYXQgZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sYXQnO1xuaW1wb3J0IGltbGZuIGZyb20gJy4uL2NvbW1vbi9pbWxmbic7XG5pbXBvcnQge0hBTEZfUEksIEVQU0xOfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIGlmICghdGhpcy5zcGhlcmUpIHtcbiAgICB0aGlzLmUwID0gZTBmbih0aGlzLmVzKTtcbiAgICB0aGlzLmUxID0gZTFmbih0aGlzLmVzKTtcbiAgICB0aGlzLmUyID0gZTJmbih0aGlzLmVzKTtcbiAgICB0aGlzLmUzID0gZTNmbih0aGlzLmVzKTtcbiAgICB0aGlzLm1sMCA9IHRoaXMuYSAqIG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgdGhpcy5sYXQwKTtcbiAgfVxufVxuXG4vKiBDYXNzaW5pIGZvcndhcmQgZXF1YXRpb25zLS1tYXBwaW5nIGxhdCxsb25nIHRvIHgseVxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG5cbiAgLyogRm9yd2FyZCBlcXVhdGlvbnNcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgdmFyIHgsIHk7XG4gIHZhciBsYW0gPSBwLng7XG4gIHZhciBwaGkgPSBwLnk7XG4gIGxhbSA9IGFkanVzdF9sb24obGFtIC0gdGhpcy5sb25nMCk7XG5cbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgeCA9IHRoaXMuYSAqIE1hdGguYXNpbihNYXRoLmNvcyhwaGkpICogTWF0aC5zaW4obGFtKSk7XG4gICAgeSA9IHRoaXMuYSAqIChNYXRoLmF0YW4yKE1hdGgudGFuKHBoaSksIE1hdGguY29zKGxhbSkpIC0gdGhpcy5sYXQwKTtcbiAgfVxuICBlbHNlIHtcbiAgICAvL2VsbGlwc29pZFxuICAgIHZhciBzaW5waGkgPSBNYXRoLnNpbihwaGkpO1xuICAgIHZhciBjb3NwaGkgPSBNYXRoLmNvcyhwaGkpO1xuICAgIHZhciBubCA9IGdOKHRoaXMuYSwgdGhpcy5lLCBzaW5waGkpO1xuICAgIHZhciB0bCA9IE1hdGgudGFuKHBoaSkgKiBNYXRoLnRhbihwaGkpO1xuICAgIHZhciBhbCA9IGxhbSAqIE1hdGguY29zKHBoaSk7XG4gICAgdmFyIGFzcSA9IGFsICogYWw7XG4gICAgdmFyIGNsID0gdGhpcy5lcyAqIGNvc3BoaSAqIGNvc3BoaSAvICgxIC0gdGhpcy5lcyk7XG4gICAgdmFyIG1sID0gdGhpcy5hICogbWxmbih0aGlzLmUwLCB0aGlzLmUxLCB0aGlzLmUyLCB0aGlzLmUzLCBwaGkpO1xuXG4gICAgeCA9IG5sICogYWwgKiAoMSAtIGFzcSAqIHRsICogKDEgLyA2IC0gKDggLSB0bCArIDggKiBjbCkgKiBhc3EgLyAxMjApKTtcbiAgICB5ID0gbWwgLSB0aGlzLm1sMCArIG5sICogc2lucGhpIC8gY29zcGhpICogYXNxICogKDAuNSArICg1IC0gdGwgKyA2ICogY2wpICogYXNxIC8gMjQpO1xuXG5cbiAgfVxuXG4gIHAueCA9IHggKyB0aGlzLngwO1xuICBwLnkgPSB5ICsgdGhpcy55MDtcbiAgcmV0dXJuIHA7XG59XG5cbi8qIEludmVyc2UgZXF1YXRpb25zXG4gIC0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSAtPSB0aGlzLnkwO1xuICB2YXIgeCA9IHAueCAvIHRoaXMuYTtcbiAgdmFyIHkgPSBwLnkgLyB0aGlzLmE7XG4gIHZhciBwaGksIGxhbTtcblxuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICB2YXIgZGQgPSB5ICsgdGhpcy5sYXQwO1xuICAgIHBoaSA9IE1hdGguYXNpbihNYXRoLnNpbihkZCkgKiBNYXRoLmNvcyh4KSk7XG4gICAgbGFtID0gTWF0aC5hdGFuMihNYXRoLnRhbih4KSwgTWF0aC5jb3MoZGQpKTtcbiAgfVxuICBlbHNlIHtcbiAgICAvKiBlbGxpcHNvaWQgKi9cbiAgICB2YXIgbWwxID0gdGhpcy5tbDAgLyB0aGlzLmEgKyB5O1xuICAgIHZhciBwaGkxID0gaW1sZm4obWwxLCB0aGlzLmUwLCB0aGlzLmUxLCB0aGlzLmUyLCB0aGlzLmUzKTtcbiAgICBpZiAoTWF0aC5hYnMoTWF0aC5hYnMocGhpMSkgLSBIQUxGX1BJKSA8PSBFUFNMTikge1xuICAgICAgcC54ID0gdGhpcy5sb25nMDtcbiAgICAgIHAueSA9IEhBTEZfUEk7XG4gICAgICBpZiAoeSA8IDApIHtcbiAgICAgICAgcC55ICo9IC0xO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHZhciBubDEgPSBnTih0aGlzLmEsIHRoaXMuZSwgTWF0aC5zaW4ocGhpMSkpO1xuXG4gICAgdmFyIHJsMSA9IG5sMSAqIG5sMSAqIG5sMSAvIHRoaXMuYSAvIHRoaXMuYSAqICgxIC0gdGhpcy5lcyk7XG4gICAgdmFyIHRsMSA9IE1hdGgucG93KE1hdGgudGFuKHBoaTEpLCAyKTtcbiAgICB2YXIgZGwgPSB4ICogdGhpcy5hIC8gbmwxO1xuICAgIHZhciBkc3EgPSBkbCAqIGRsO1xuICAgIHBoaSA9IHBoaTEgLSBubDEgKiBNYXRoLnRhbihwaGkxKSAvIHJsMSAqIGRsICogZGwgKiAoMC41IC0gKDEgKyAzICogdGwxKSAqIGRsICogZGwgLyAyNCk7XG4gICAgbGFtID0gZGwgKiAoMSAtIGRzcSAqICh0bDEgLyAzICsgKDEgKyAzICogdGwxKSAqIHRsMSAqIGRzcSAvIDE1KSkgLyBNYXRoLmNvcyhwaGkxKTtcblxuICB9XG5cbiAgcC54ID0gYWRqdXN0X2xvbihsYW0gKyB0aGlzLmxvbmcwKTtcbiAgcC55ID0gYWRqdXN0X2xhdChwaGkpO1xuICByZXR1cm4gcDtcblxufVxuXG5leHBvcnQgdmFyIG5hbWVzID0gW1wiQ2Fzc2luaVwiLCBcIkNhc3NpbmlfU29sZG5lclwiLCBcImNhc3NcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9jYXNzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvY2Fzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYWRqdXN0X2xvbiBmcm9tICcuLi9jb21tb24vYWRqdXN0X2xvbic7XG5pbXBvcnQgcXNmbnogZnJvbSAnLi4vY29tbW9uL3FzZm56JztcbmltcG9ydCBtc2ZueiBmcm9tICcuLi9jb21tb24vbXNmbnonO1xuaW1wb3J0IGlxc2ZueiBmcm9tICcuLi9jb21tb24vaXFzZm56JztcblxuLypcbiAgcmVmZXJlbmNlOlxuICAgIFwiQ2FydG9ncmFwaGljIFByb2plY3Rpb24gUHJvY2VkdXJlcyBmb3IgdGhlIFVOSVggRW52aXJvbm1lbnQtXG4gICAgQSBVc2VyJ3MgTWFudWFsXCIgYnkgR2VyYWxkIEkuIEV2ZW5kZW4sXG4gICAgVVNHUyBPcGVuIEZpbGUgUmVwb3J0IDkwLTI4NGFuZCBSZWxlYXNlIDQgSW50ZXJpbSBSZXBvcnRzICgyMDAzKVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAvL25vLW9wXG4gIGlmICghdGhpcy5zcGhlcmUpIHtcbiAgICB0aGlzLmswID0gbXNmbnoodGhpcy5lLCBNYXRoLnNpbih0aGlzLmxhdF90cyksIE1hdGguY29zKHRoaXMubGF0X3RzKSk7XG4gIH1cbn1cblxuLyogQ3lsaW5kcmljYWwgRXF1YWwgQXJlYSBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuICB2YXIgeCwgeTtcbiAgLyogRm9yd2FyZCBlcXVhdGlvbnNcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgdmFyIGRsb24gPSBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICB4ID0gdGhpcy54MCArIHRoaXMuYSAqIGRsb24gKiBNYXRoLmNvcyh0aGlzLmxhdF90cyk7XG4gICAgeSA9IHRoaXMueTAgKyB0aGlzLmEgKiBNYXRoLnNpbihsYXQpIC8gTWF0aC5jb3ModGhpcy5sYXRfdHMpO1xuICB9XG4gIGVsc2Uge1xuICAgIHZhciBxcyA9IHFzZm56KHRoaXMuZSwgTWF0aC5zaW4obGF0KSk7XG4gICAgeCA9IHRoaXMueDAgKyB0aGlzLmEgKiB0aGlzLmswICogZGxvbjtcbiAgICB5ID0gdGhpcy55MCArIHRoaXMuYSAqIHFzICogMC41IC8gdGhpcy5rMDtcbiAgfVxuXG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG4gIHJldHVybiBwO1xufVxuXG4vKiBDeWxpbmRyaWNhbCBFcXVhbCBBcmVhIGludmVyc2UgZXF1YXRpb25zLS1tYXBwaW5nIHgseSB0byBsYXQvbG9uZ1xuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHAueCAtPSB0aGlzLngwO1xuICBwLnkgLT0gdGhpcy55MDtcbiAgdmFyIGxvbiwgbGF0O1xuXG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIChwLnggLyB0aGlzLmEpIC8gTWF0aC5jb3ModGhpcy5sYXRfdHMpKTtcbiAgICBsYXQgPSBNYXRoLmFzaW4oKHAueSAvIHRoaXMuYSkgKiBNYXRoLmNvcyh0aGlzLmxhdF90cykpO1xuICB9XG4gIGVsc2Uge1xuICAgIGxhdCA9IGlxc2Zueih0aGlzLmUsIDIgKiBwLnkgKiB0aGlzLmswIC8gdGhpcy5hKTtcbiAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBwLnggLyAodGhpcy5hICogdGhpcy5rMCkpO1xuICB9XG5cbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgdmFyIG5hbWVzID0gW1wiY2VhXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvY2VhLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvY2VhLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcbmltcG9ydCBhZGp1c3RfbGF0IGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbGF0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgdGhpcy54MCA9IHRoaXMueDAgfHwgMDtcbiAgdGhpcy55MCA9IHRoaXMueTAgfHwgMDtcbiAgdGhpcy5sYXQwID0gdGhpcy5sYXQwIHx8IDA7XG4gIHRoaXMubG9uZzAgPSB0aGlzLmxvbmcwIHx8IDA7XG4gIHRoaXMubGF0X3RzID0gdGhpcy5sYXRfdHMgfHwgMDtcbiAgdGhpcy50aXRsZSA9IHRoaXMudGl0bGUgfHwgXCJFcXVpZGlzdGFudCBDeWxpbmRyaWNhbCAoUGxhdGUgQ2FycmUpXCI7XG5cbiAgdGhpcy5yYyA9IE1hdGguY29zKHRoaXMubGF0X3RzKTtcbn1cblxuLy8gZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuXG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG5cbiAgdmFyIGRsb24gPSBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICB2YXIgZGxhdCA9IGFkanVzdF9sYXQobGF0IC0gdGhpcy5sYXQwKTtcbiAgcC54ID0gdGhpcy54MCArICh0aGlzLmEgKiBkbG9uICogdGhpcy5yYyk7XG4gIHAueSA9IHRoaXMueTAgKyAodGhpcy5hICogZGxhdCk7XG4gIHJldHVybiBwO1xufVxuXG4vLyBpbnZlcnNlIGVxdWF0aW9ucy0tbWFwcGluZyB4LHkgdG8gbGF0L2xvbmdcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG5cbiAgdmFyIHggPSBwLng7XG4gIHZhciB5ID0gcC55O1xuXG4gIHAueCA9IGFkanVzdF9sb24odGhpcy5sb25nMCArICgoeCAtIHRoaXMueDApIC8gKHRoaXMuYSAqIHRoaXMucmMpKSk7XG4gIHAueSA9IGFkanVzdF9sYXQodGhpcy5sYXQwICsgKCh5IC0gdGhpcy55MCkgLyAodGhpcy5hKSkpO1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIkVxdWlyZWN0YW5ndWxhclwiLCBcIkVxdWlkaXN0YW50X0N5bGluZHJpY2FsXCIsIFwiZXFjXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvZXFjLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvZXFjLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBlMGZuIGZyb20gJy4uL2NvbW1vbi9lMGZuJztcbmltcG9ydCBlMWZuIGZyb20gJy4uL2NvbW1vbi9lMWZuJztcbmltcG9ydCBlMmZuIGZyb20gJy4uL2NvbW1vbi9lMmZuJztcbmltcG9ydCBlM2ZuIGZyb20gJy4uL2NvbW1vbi9lM2ZuJztcbmltcG9ydCBtc2ZueiBmcm9tICcuLi9jb21tb24vbXNmbnonO1xuaW1wb3J0IG1sZm4gZnJvbSAnLi4vY29tbW9uL21sZm4nO1xuaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuaW1wb3J0IGFkanVzdF9sYXQgZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sYXQnO1xuaW1wb3J0IGltbGZuIGZyb20gJy4uL2NvbW1vbi9pbWxmbic7XG5pbXBvcnQge0VQU0xOfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgLyogUGxhY2UgcGFyYW1ldGVycyBpbiBzdGF0aWMgc3RvcmFnZSBmb3IgY29tbW9uIHVzZVxuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIC8vIFN0YW5kYXJkIFBhcmFsbGVscyBjYW5ub3QgYmUgZXF1YWwgYW5kIG9uIG9wcG9zaXRlIHNpZGVzIG9mIHRoZSBlcXVhdG9yXG4gIGlmIChNYXRoLmFicyh0aGlzLmxhdDEgKyB0aGlzLmxhdDIpIDwgRVBTTE4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5sYXQyID0gdGhpcy5sYXQyIHx8IHRoaXMubGF0MTtcbiAgdGhpcy50ZW1wID0gdGhpcy5iIC8gdGhpcy5hO1xuICB0aGlzLmVzID0gMSAtIE1hdGgucG93KHRoaXMudGVtcCwgMik7XG4gIHRoaXMuZSA9IE1hdGguc3FydCh0aGlzLmVzKTtcbiAgdGhpcy5lMCA9IGUwZm4odGhpcy5lcyk7XG4gIHRoaXMuZTEgPSBlMWZuKHRoaXMuZXMpO1xuICB0aGlzLmUyID0gZTJmbih0aGlzLmVzKTtcbiAgdGhpcy5lMyA9IGUzZm4odGhpcy5lcyk7XG5cbiAgdGhpcy5zaW5waGkgPSBNYXRoLnNpbih0aGlzLmxhdDEpO1xuICB0aGlzLmNvc3BoaSA9IE1hdGguY29zKHRoaXMubGF0MSk7XG5cbiAgdGhpcy5tczEgPSBtc2Zueih0aGlzLmUsIHRoaXMuc2lucGhpLCB0aGlzLmNvc3BoaSk7XG4gIHRoaXMubWwxID0gbWxmbih0aGlzLmUwLCB0aGlzLmUxLCB0aGlzLmUyLCB0aGlzLmUzLCB0aGlzLmxhdDEpO1xuXG4gIGlmIChNYXRoLmFicyh0aGlzLmxhdDEgLSB0aGlzLmxhdDIpIDwgRVBTTE4pIHtcbiAgICB0aGlzLm5zID0gdGhpcy5zaW5waGk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5zaW5waGkgPSBNYXRoLnNpbih0aGlzLmxhdDIpO1xuICAgIHRoaXMuY29zcGhpID0gTWF0aC5jb3ModGhpcy5sYXQyKTtcbiAgICB0aGlzLm1zMiA9IG1zZm56KHRoaXMuZSwgdGhpcy5zaW5waGksIHRoaXMuY29zcGhpKTtcbiAgICB0aGlzLm1sMiA9IG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgdGhpcy5sYXQyKTtcbiAgICB0aGlzLm5zID0gKHRoaXMubXMxIC0gdGhpcy5tczIpIC8gKHRoaXMubWwyIC0gdGhpcy5tbDEpO1xuICB9XG4gIHRoaXMuZyA9IHRoaXMubWwxICsgdGhpcy5tczEgLyB0aGlzLm5zO1xuICB0aGlzLm1sMCA9IG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgdGhpcy5sYXQwKTtcbiAgdGhpcy5yaCA9IHRoaXMuYSAqICh0aGlzLmcgLSB0aGlzLm1sMCk7XG59XG5cbi8qIEVxdWlkaXN0YW50IENvbmljIGZvcndhcmQgZXF1YXRpb25zLS1tYXBwaW5nIGxhdCxsb25nIHRvIHgseVxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG4gIHZhciByaDE7XG5cbiAgLyogRm9yd2FyZCBlcXVhdGlvbnNcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgcmgxID0gdGhpcy5hICogKHRoaXMuZyAtIGxhdCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdmFyIG1sID0gbWxmbih0aGlzLmUwLCB0aGlzLmUxLCB0aGlzLmUyLCB0aGlzLmUzLCBsYXQpO1xuICAgIHJoMSA9IHRoaXMuYSAqICh0aGlzLmcgLSBtbCk7XG4gIH1cbiAgdmFyIHRoZXRhID0gdGhpcy5ucyAqIGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG4gIHZhciB4ID0gdGhpcy54MCArIHJoMSAqIE1hdGguc2luKHRoZXRhKTtcbiAgdmFyIHkgPSB0aGlzLnkwICsgdGhpcy5yaCAtIHJoMSAqIE1hdGguY29zKHRoZXRhKTtcbiAgcC54ID0geDtcbiAgcC55ID0geTtcbiAgcmV0dXJuIHA7XG59XG5cbi8qIEludmVyc2UgZXF1YXRpb25zXG4gIC0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSA9IHRoaXMucmggLSBwLnkgKyB0aGlzLnkwO1xuICB2YXIgY29uLCByaDEsIGxhdCwgbG9uO1xuICBpZiAodGhpcy5ucyA+PSAwKSB7XG4gICAgcmgxID0gTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSk7XG4gICAgY29uID0gMTtcbiAgfVxuICBlbHNlIHtcbiAgICByaDEgPSAtTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSk7XG4gICAgY29uID0gLTE7XG4gIH1cbiAgdmFyIHRoZXRhID0gMDtcbiAgaWYgKHJoMSAhPT0gMCkge1xuICAgIHRoZXRhID0gTWF0aC5hdGFuMihjb24gKiBwLngsIGNvbiAqIHAueSk7XG4gIH1cblxuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyB0aGV0YSAvIHRoaXMubnMpO1xuICAgIGxhdCA9IGFkanVzdF9sYXQodGhpcy5nIC0gcmgxIC8gdGhpcy5hKTtcbiAgICBwLnggPSBsb247XG4gICAgcC55ID0gbGF0O1xuICAgIHJldHVybiBwO1xuICB9XG4gIGVsc2Uge1xuICAgIHZhciBtbCA9IHRoaXMuZyAtIHJoMSAvIHRoaXMuYTtcbiAgICBsYXQgPSBpbWxmbihtbCwgdGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMyk7XG4gICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgdGhldGEgLyB0aGlzLm5zKTtcbiAgICBwLnggPSBsb247XG4gICAgcC55ID0gbGF0O1xuICAgIHJldHVybiBwO1xuICB9XG5cbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIkVxdWlkaXN0YW50X0NvbmljXCIsIFwiZXFkY1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2VxZGMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9lcWRjLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEhlYXZpbHkgYmFzZWQgb24gdGhpcyBldG1lcmMgcHJvamVjdGlvbiBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21ibG9jaC9tYXBzaGFwZXItcHJvai9ibG9iL21hc3Rlci9zcmMvcHJvamVjdGlvbnMvZXRtZXJjLmpzXG5cbmltcG9ydCBzaW5oIGZyb20gJy4uL2NvbW1vbi9zaW5oJztcbmltcG9ydCBoeXBvdCBmcm9tICcuLi9jb21tb24vaHlwb3QnO1xuaW1wb3J0IGFzaW5oeSBmcm9tICcuLi9jb21tb24vYXNpbmh5JztcbmltcG9ydCBnYXRnIGZyb20gJy4uL2NvbW1vbi9nYXRnJztcbmltcG9ydCBjbGVucyBmcm9tICcuLi9jb21tb24vY2xlbnMnO1xuaW1wb3J0IGNsZW5zX2NtcGx4IGZyb20gJy4uL2NvbW1vbi9jbGVuc19jbXBseCc7XG5pbXBvcnQgYWRqdXN0X2xvbiBmcm9tICcuLi9jb21tb24vYWRqdXN0X2xvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICBpZiAodGhpcy5lcyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuZXMgPD0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5jb3JyZWN0IGVsbGlwdGljYWwgdXNhZ2UnKTtcbiAgfVxuXG4gIHRoaXMueDAgPSB0aGlzLngwICE9PSB1bmRlZmluZWQgPyB0aGlzLngwIDogMDtcbiAgdGhpcy55MCA9IHRoaXMueTAgIT09IHVuZGVmaW5lZCA/IHRoaXMueTAgOiAwO1xuICB0aGlzLmxvbmcwID0gdGhpcy5sb25nMCAhPT0gdW5kZWZpbmVkID8gdGhpcy5sb25nMCA6IDA7XG4gIHRoaXMubGF0MCA9IHRoaXMubGF0MCAhPT0gdW5kZWZpbmVkID8gdGhpcy5sYXQwIDogMDtcblxuICB0aGlzLmNnYiA9IFtdO1xuICB0aGlzLmNiZyA9IFtdO1xuICB0aGlzLnV0ZyA9IFtdO1xuICB0aGlzLmd0dSA9IFtdO1xuXG4gIHZhciBmID0gdGhpcy5lcyAvICgxICsgTWF0aC5zcXJ0KDEgLSB0aGlzLmVzKSk7XG4gIHZhciBuID0gZiAvICgyIC0gZik7XG4gIHZhciBucCA9IG47XG5cbiAgdGhpcy5jZ2JbMF0gPSBuICogKDIgKyBuICogKC0yIC8gMyArIG4gKiAoLTIgKyBuICogKDExNiAvIDQ1ICsgbiAqICgyNiAvIDQ1ICsgbiAqICgtMjg1NCAvIDY3NSApKSkpKSk7XG4gIHRoaXMuY2JnWzBdID0gbiAqICgtMiArIG4gKiAoIDIgLyAzICsgbiAqICggNCAvIDMgKyBuICogKC04MiAvIDQ1ICsgbiAqICgzMiAvIDQ1ICsgbiAqICg0NjQyIC8gNDcyNSkpKSkpKTtcblxuICBucCA9IG5wICogbjtcbiAgdGhpcy5jZ2JbMV0gPSBucCAqICg3IC8gMyArIG4gKiAoLTggLyA1ICsgbiAqICgtMjI3IC8gNDUgKyBuICogKDI3MDQgLyAzMTUgKyBuICogKDIzMjMgLyA5NDUpKSkpKTtcbiAgdGhpcy5jYmdbMV0gPSBucCAqICg1IC8gMyArIG4gKiAoLTE2IC8gMTUgKyBuICogKCAtMTMgLyA5ICsgbiAqICg5MDQgLyAzMTUgKyBuICogKC0xNTIyIC8gOTQ1KSkpKSk7XG5cbiAgbnAgPSBucCAqIG47XG4gIHRoaXMuY2diWzJdID0gbnAgKiAoNTYgLyAxNSArIG4gKiAoLTEzNiAvIDM1ICsgbiAqICgtMTI2MiAvIDEwNSArIG4gKiAoNzM4MTQgLyAyODM1KSkpKTtcbiAgdGhpcy5jYmdbMl0gPSBucCAqICgtMjYgLyAxNSArIG4gKiAoMzQgLyAyMSArIG4gKiAoOCAvIDUgKyBuICogKC0xMjY4NiAvIDI4MzUpKSkpO1xuXG4gIG5wID0gbnAgKiBuO1xuICB0aGlzLmNnYlszXSA9IG5wICogKDQyNzkgLyA2MzAgKyBuICogKC0zMzIgLyAzNSArIG4gKiAoLTM5OTU3MiAvIDE0MTc1KSkpO1xuICB0aGlzLmNiZ1szXSA9IG5wICogKDEyMzcgLyA2MzAgKyBuICogKC0xMiAvIDUgKyBuICogKCAtMjQ4MzIgLyAxNDE3NSkpKTtcblxuICBucCA9IG5wICogbjtcbiAgdGhpcy5jZ2JbNF0gPSBucCAqICg0MTc0IC8gMzE1ICsgbiAqICgtMTQ0ODM4IC8gNjIzNykpO1xuICB0aGlzLmNiZ1s0XSA9IG5wICogKC03MzQgLyAzMTUgKyBuICogKDEwOTU5OCAvIDMxMTg1KSk7XG5cbiAgbnAgPSBucCAqIG47XG4gIHRoaXMuY2diWzVdID0gbnAgKiAoNjAxNjc2IC8gMjIyNzUpO1xuICB0aGlzLmNiZ1s1XSA9IG5wICogKDQ0NDMzNyAvIDE1NTkyNSk7XG5cbiAgbnAgPSBNYXRoLnBvdyhuLCAyKTtcbiAgdGhpcy5RbiA9IHRoaXMuazAgLyAoMSArIG4pICogKDEgKyBucCAqICgxIC8gNCArIG5wICogKDEgLyA2NCArIG5wIC8gMjU2KSkpO1xuXG4gIHRoaXMudXRnWzBdID0gbiAqICgtMC41ICsgbiAqICggMiAvIDMgKyBuICogKC0zNyAvIDk2ICsgbiAqICggMSAvIDM2MCArIG4gKiAoODEgLyA1MTIgKyBuICogKC05NjE5OSAvIDYwNDgwMCkpKSkpKTtcbiAgdGhpcy5ndHVbMF0gPSBuICogKDAuNSArIG4gKiAoLTIgLyAzICsgbiAqICg1IC8gMTYgKyBuICogKDQxIC8gMTgwICsgbiAqICgtMTI3IC8gMjg4ICsgbiAqICg3ODkxIC8gMzc4MDApKSkpKSk7XG5cbiAgdGhpcy51dGdbMV0gPSBucCAqICgtMSAvIDQ4ICsgbiAqICgtMSAvIDE1ICsgbiAqICg0MzcgLyAxNDQwICsgbiAqICgtNDYgLyAxMDUgKyBuICogKDExMTg3MTEgLyAzODcwNzIwKSkpKSk7XG4gIHRoaXMuZ3R1WzFdID0gbnAgKiAoMTMgLyA0OCArIG4gKiAoLTMgLyA1ICsgbiAqICg1NTcgLyAxNDQwICsgbiAqICgyODEgLyA2MzAgKyBuICogKC0xOTgzNDMzIC8gMTkzNTM2MCkpKSkpO1xuXG4gIG5wID0gbnAgKiBuO1xuICB0aGlzLnV0Z1syXSA9IG5wICogKC0xNyAvIDQ4MCArIG4gKiAoMzcgLyA4NDAgKyBuICogKDIwOSAvIDQ0ODAgKyBuICogKC01NTY5IC8gOTA3MjAgKSkpKTtcbiAgdGhpcy5ndHVbMl0gPSBucCAqICg2MSAvIDI0MCArIG4gKiAoLTEwMyAvIDE0MCArIG4gKiAoMTUwNjEgLyAyNjg4MCArIG4gKiAoMTY3NjAzIC8gMTgxNDQwKSkpKTtcblxuICBucCA9IG5wICogbjtcbiAgdGhpcy51dGdbM10gPSBucCAqICgtNDM5NyAvIDE2MTI4MCArIG4gKiAoMTEgLyA1MDQgKyBuICogKDgzMDI1MSAvIDcyNTc2MDApKSk7XG4gIHRoaXMuZ3R1WzNdID0gbnAgKiAoNDk1NjEgLyAxNjEyODAgKyBuICogKC0xNzkgLyAxNjggKyBuICogKDY2MDE2NjEgLyA3MjU3NjAwKSkpO1xuXG4gIG5wID0gbnAgKiBuO1xuICB0aGlzLnV0Z1s0XSA9IG5wICogKC00NTgzIC8gMTYxMjgwICsgbiAqICgxMDg4NDcgLyAzOTkxNjgwKSk7XG4gIHRoaXMuZ3R1WzRdID0gbnAgKiAoMzQ3MjkgLyA4MDY0MCArIG4gKiAoLTM0MTg4ODkgLyAxOTk1ODQwKSk7XG5cbiAgbnAgPSBucCAqIG47XG4gIHRoaXMudXRnWzVdID0gbnAgKiAoLTIwNjQ4NjkzIC8gNjM4NjY4ODAwKTtcbiAgdGhpcy5ndHVbNV0gPSBucCAqICgyMTIzNzg5NDEgLyAzMTkzMzQ0MDApO1xuXG4gIHZhciBaID0gZ2F0Zyh0aGlzLmNiZywgdGhpcy5sYXQwKTtcbiAgdGhpcy5aYiA9IC10aGlzLlFuICogKFogKyBjbGVucyh0aGlzLmd0dSwgMiAqIFopKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgQ2UgPSBhZGp1c3RfbG9uKHAueCAtIHRoaXMubG9uZzApO1xuICB2YXIgQ24gPSBwLnk7XG5cbiAgQ24gPSBnYXRnKHRoaXMuY2JnLCBDbik7XG4gIHZhciBzaW5fQ24gPSBNYXRoLnNpbihDbik7XG4gIHZhciBjb3NfQ24gPSBNYXRoLmNvcyhDbik7XG4gIHZhciBzaW5fQ2UgPSBNYXRoLnNpbihDZSk7XG4gIHZhciBjb3NfQ2UgPSBNYXRoLmNvcyhDZSk7XG5cbiAgQ24gPSBNYXRoLmF0YW4yKHNpbl9DbiwgY29zX0NlICogY29zX0NuKTtcbiAgQ2UgPSBNYXRoLmF0YW4yKHNpbl9DZSAqIGNvc19DbiwgaHlwb3Qoc2luX0NuLCBjb3NfQ24gKiBjb3NfQ2UpKTtcbiAgQ2UgPSBhc2luaHkoTWF0aC50YW4oQ2UpKTtcblxuICB2YXIgdG1wID0gY2xlbnNfY21wbHgodGhpcy5ndHUsIDIgKiBDbiwgMiAqIENlKTtcblxuICBDbiA9IENuICsgdG1wWzBdO1xuICBDZSA9IENlICsgdG1wWzFdO1xuXG4gIHZhciB4O1xuICB2YXIgeTtcblxuICBpZiAoTWF0aC5hYnMoQ2UpIDw9IDIuNjIzMzk1MTYyNzc4KSB7XG4gICAgeCA9IHRoaXMuYSAqICh0aGlzLlFuICogQ2UpICsgdGhpcy54MDtcbiAgICB5ID0gdGhpcy5hICogKHRoaXMuUW4gKiBDbiArIHRoaXMuWmIpICsgdGhpcy55MDtcbiAgfVxuICBlbHNlIHtcbiAgICB4ID0gSW5maW5pdHk7XG4gICAgeSA9IEluZmluaXR5O1xuICB9XG5cbiAgcC54ID0geDtcbiAgcC55ID0geTtcblxuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuICB2YXIgQ2UgPSAocC54IC0gdGhpcy54MCkgKiAoMSAvIHRoaXMuYSk7XG4gIHZhciBDbiA9IChwLnkgLSB0aGlzLnkwKSAqICgxIC8gdGhpcy5hKTtcblxuICBDbiA9IChDbiAtIHRoaXMuWmIpIC8gdGhpcy5RbjtcbiAgQ2UgPSBDZSAvIHRoaXMuUW47XG5cbiAgdmFyIGxvbjtcbiAgdmFyIGxhdDtcblxuICBpZiAoTWF0aC5hYnMoQ2UpIDw9IDIuNjIzMzk1MTYyNzc4KSB7XG4gICAgdmFyIHRtcCA9IGNsZW5zX2NtcGx4KHRoaXMudXRnLCAyICogQ24sIDIgKiBDZSk7XG5cbiAgICBDbiA9IENuICsgdG1wWzBdO1xuICAgIENlID0gQ2UgKyB0bXBbMV07XG4gICAgQ2UgPSBNYXRoLmF0YW4oc2luaChDZSkpO1xuXG4gICAgdmFyIHNpbl9DbiA9IE1hdGguc2luKENuKTtcbiAgICB2YXIgY29zX0NuID0gTWF0aC5jb3MoQ24pO1xuICAgIHZhciBzaW5fQ2UgPSBNYXRoLnNpbihDZSk7XG4gICAgdmFyIGNvc19DZSA9IE1hdGguY29zKENlKTtcblxuICAgIENuID0gTWF0aC5hdGFuMihzaW5fQ24gKiBjb3NfQ2UsIGh5cG90KHNpbl9DZSwgY29zX0NlICogY29zX0NuKSk7XG4gICAgQ2UgPSBNYXRoLmF0YW4yKHNpbl9DZSwgY29zX0NlICogY29zX0NuKTtcblxuICAgIGxvbiA9IGFkanVzdF9sb24oQ2UgKyB0aGlzLmxvbmcwKTtcbiAgICBsYXQgPSBnYXRnKHRoaXMuY2diLCBDbik7XG4gIH1cbiAgZWxzZSB7XG4gICAgbG9uID0gSW5maW5pdHk7XG4gICAgbGF0ID0gSW5maW5pdHk7XG4gIH1cblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcblxuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIkV4dGVuZGVkX1RyYW5zdmVyc2VfTWVyY2F0b3JcIiwgXCJFeHRlbmRlZCBUcmFuc3ZlcnNlIE1lcmNhdG9yXCIsIFwiZXRtZXJjXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvZXRtZXJjLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvZXRtZXJjLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBzcmF0IGZyb20gJy4uL2NvbW1vbi9zcmF0JztcbnZhciBNQVhfSVRFUiA9IDIwO1xuaW1wb3J0IHtIQUxGX1BJLCBGT1JUUEl9IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgdmFyIHNwaGkgPSBNYXRoLnNpbih0aGlzLmxhdDApO1xuICB2YXIgY3BoaSA9IE1hdGguY29zKHRoaXMubGF0MCk7XG4gIGNwaGkgKj0gY3BoaTtcbiAgdGhpcy5yYyA9IE1hdGguc3FydCgxIC0gdGhpcy5lcykgLyAoMSAtIHRoaXMuZXMgKiBzcGhpICogc3BoaSk7XG4gIHRoaXMuQyA9IE1hdGguc3FydCgxICsgdGhpcy5lcyAqIGNwaGkgKiBjcGhpIC8gKDEgLSB0aGlzLmVzKSk7XG4gIHRoaXMucGhpYzAgPSBNYXRoLmFzaW4oc3BoaSAvIHRoaXMuQyk7XG4gIHRoaXMucmF0ZXhwID0gMC41ICogdGhpcy5DICogdGhpcy5lO1xuICB0aGlzLksgPSBNYXRoLnRhbigwLjUgKiB0aGlzLnBoaWMwICsgRk9SVFBJKSAvIChNYXRoLnBvdyhNYXRoLnRhbigwLjUgKiB0aGlzLmxhdDAgKyBGT1JUUEkpLCB0aGlzLkMpICogc3JhdCh0aGlzLmUgKiBzcGhpLCB0aGlzLnJhdGV4cCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG5cbiAgcC55ID0gMiAqIE1hdGguYXRhbih0aGlzLksgKiBNYXRoLnBvdyhNYXRoLnRhbigwLjUgKiBsYXQgKyBGT1JUUEkpLCB0aGlzLkMpICogc3JhdCh0aGlzLmUgKiBNYXRoLnNpbihsYXQpLCB0aGlzLnJhdGV4cCkpIC0gSEFMRl9QSTtcbiAgcC54ID0gdGhpcy5DICogbG9uO1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuICB2YXIgREVMX1RPTCA9IDFlLTE0O1xuICB2YXIgbG9uID0gcC54IC8gdGhpcy5DO1xuICB2YXIgbGF0ID0gcC55O1xuICB2YXIgbnVtID0gTWF0aC5wb3coTWF0aC50YW4oMC41ICogbGF0ICsgRk9SVFBJKSAvIHRoaXMuSywgMSAvIHRoaXMuQyk7XG4gIGZvciAodmFyIGkgPSBNQVhfSVRFUjsgaSA+IDA7IC0taSkge1xuICAgIGxhdCA9IDIgKiBNYXRoLmF0YW4obnVtICogc3JhdCh0aGlzLmUgKiBNYXRoLnNpbihwLnkpLCAtIDAuNSAqIHRoaXMuZSkpIC0gSEFMRl9QSTtcbiAgICBpZiAoTWF0aC5hYnMobGF0IC0gcC55KSA8IERFTF9UT0wpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBwLnkgPSBsYXQ7XG4gIH1cbiAgLyogY29udmVyZ2VuY2UgZmFpbGVkICovXG4gIGlmICghaSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcImdhdXNzXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvZ2F1c3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9nYXVzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYWRqdXN0X2xvbiBmcm9tICcuLi9jb21tb24vYWRqdXN0X2xvbic7XG5pbXBvcnQgYXNpbnogZnJvbSAnLi4vY29tbW9uL2FzaW56JztcbmltcG9ydCB7RVBTTE59IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuXG4vKlxuICByZWZlcmVuY2U6XG4gICAgV29sZnJhbSBNYXRod29ybGQgXCJHbm9tb25pYyBQcm9qZWN0aW9uXCJcbiAgICBodHRwOi8vbWF0aHdvcmxkLndvbGZyYW0uY29tL0dub21vbmljUHJvamVjdGlvbi5odG1sXG4gICAgQWNjZXNzZWQ6IDEydGggTm92ZW1iZXIgMjAwOVxuICAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgLyogUGxhY2UgcGFyYW1ldGVycyBpbiBzdGF0aWMgc3RvcmFnZSBmb3IgY29tbW9uIHVzZVxuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIHRoaXMuc2luX3AxNCA9IE1hdGguc2luKHRoaXMubGF0MCk7XG4gIHRoaXMuY29zX3AxNCA9IE1hdGguY29zKHRoaXMubGF0MCk7XG4gIC8vIEFwcHJveGltYXRpb24gZm9yIHByb2plY3RpbmcgcG9pbnRzIHRvIHRoZSBob3Jpem9uIChpbmZpbml0eSlcbiAgdGhpcy5pbmZpbml0eV9kaXN0ID0gMTAwMCAqIHRoaXMuYTtcbiAgdGhpcy5yYyA9IDE7XG59XG5cbi8qIEdub21vbmljIGZvcndhcmQgZXF1YXRpb25zLS1tYXBwaW5nIGxhdCxsb25nIHRvIHgseVxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG4gIHZhciBzaW5waGksIGNvc3BoaTsgLyogc2luIGFuZCBjb3MgdmFsdWUgICAgICAgICovXG4gIHZhciBkbG9uOyAvKiBkZWx0YSBsb25naXR1ZGUgdmFsdWUgICAgICAqL1xuICB2YXIgY29zbG9uOyAvKiBjb3Mgb2YgbG9uZ2l0dWRlICAgICAgICAqL1xuICB2YXIga3NwOyAvKiBzY2FsZSBmYWN0b3IgICAgICAgICAgKi9cbiAgdmFyIGc7XG4gIHZhciB4LCB5O1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuICAvKiBGb3J3YXJkIGVxdWF0aW9uc1xuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBkbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcblxuICBzaW5waGkgPSBNYXRoLnNpbihsYXQpO1xuICBjb3NwaGkgPSBNYXRoLmNvcyhsYXQpO1xuXG4gIGNvc2xvbiA9IE1hdGguY29zKGRsb24pO1xuICBnID0gdGhpcy5zaW5fcDE0ICogc2lucGhpICsgdGhpcy5jb3NfcDE0ICogY29zcGhpICogY29zbG9uO1xuICBrc3AgPSAxO1xuICBpZiAoKGcgPiAwKSB8fCAoTWF0aC5hYnMoZykgPD0gRVBTTE4pKSB7XG4gICAgeCA9IHRoaXMueDAgKyB0aGlzLmEgKiBrc3AgKiBjb3NwaGkgKiBNYXRoLnNpbihkbG9uKSAvIGc7XG4gICAgeSA9IHRoaXMueTAgKyB0aGlzLmEgKiBrc3AgKiAodGhpcy5jb3NfcDE0ICogc2lucGhpIC0gdGhpcy5zaW5fcDE0ICogY29zcGhpICogY29zbG9uKSAvIGc7XG4gIH1cbiAgZWxzZSB7XG5cbiAgICAvLyBQb2ludCBpcyBpbiB0aGUgb3Bwb3NpbmcgaGVtaXNwaGVyZSBhbmQgaXMgdW5wcm9qZWN0YWJsZVxuICAgIC8vIFdlIHN0aWxsIG5lZWQgdG8gcmV0dXJuIGEgcmVhc29uYWJsZSBwb2ludCwgc28gd2UgcHJvamVjdFxuICAgIC8vIHRvIGluZmluaXR5LCBvbiBhIGJlYXJpbmdcbiAgICAvLyBlcXVpdmFsZW50IHRvIHRoZSBub3J0aGVybiBoZW1pc3BoZXJlIGVxdWl2YWxlbnRcbiAgICAvLyBUaGlzIGlzIGEgcmVhc29uYWJsZSBhcHByb3hpbWF0aW9uIGZvciBzaG9ydCBzaGFwZXMgYW5kIGxpbmVzIHRoYXRcbiAgICAvLyBzdHJhZGRsZSB0aGUgaG9yaXpvbi5cblxuICAgIHggPSB0aGlzLngwICsgdGhpcy5pbmZpbml0eV9kaXN0ICogY29zcGhpICogTWF0aC5zaW4oZGxvbik7XG4gICAgeSA9IHRoaXMueTAgKyB0aGlzLmluZmluaXR5X2Rpc3QgKiAodGhpcy5jb3NfcDE0ICogc2lucGhpIC0gdGhpcy5zaW5fcDE0ICogY29zcGhpICogY29zbG9uKTtcblxuICB9XG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHZhciByaDsgLyogUmhvICovXG4gIHZhciBzaW5jLCBjb3NjO1xuICB2YXIgYztcbiAgdmFyIGxvbiwgbGF0O1xuXG4gIC8qIEludmVyc2UgZXF1YXRpb25zXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIHAueCA9IChwLnggLSB0aGlzLngwKSAvIHRoaXMuYTtcbiAgcC55ID0gKHAueSAtIHRoaXMueTApIC8gdGhpcy5hO1xuXG4gIHAueCAvPSB0aGlzLmswO1xuICBwLnkgLz0gdGhpcy5rMDtcblxuICBpZiAoKHJoID0gTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSkpKSB7XG4gICAgYyA9IE1hdGguYXRhbjIocmgsIHRoaXMucmMpO1xuICAgIHNpbmMgPSBNYXRoLnNpbihjKTtcbiAgICBjb3NjID0gTWF0aC5jb3MoYyk7XG5cbiAgICBsYXQgPSBhc2lueihjb3NjICogdGhpcy5zaW5fcDE0ICsgKHAueSAqIHNpbmMgKiB0aGlzLmNvc19wMTQpIC8gcmgpO1xuICAgIGxvbiA9IE1hdGguYXRhbjIocC54ICogc2luYywgcmggKiB0aGlzLmNvc19wMTQgKiBjb3NjIC0gcC55ICogdGhpcy5zaW5fcDE0ICogc2luYyk7XG4gICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgbG9uKTtcbiAgfVxuICBlbHNlIHtcbiAgICBsYXQgPSB0aGlzLnBoaWMwO1xuICAgIGxvbiA9IDA7XG4gIH1cblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJnbm9tXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvZ25vbS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2dub20uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGhpcy5hID0gNjM3NzM5Ny4xNTU7XG4gIHRoaXMuZXMgPSAwLjAwNjY3NDM3MjIzMDYxNDtcbiAgdGhpcy5lID0gTWF0aC5zcXJ0KHRoaXMuZXMpO1xuICBpZiAoIXRoaXMubGF0MCkge1xuICAgIHRoaXMubGF0MCA9IDAuODYzOTM3OTc5NzM3MTkzO1xuICB9XG4gIGlmICghdGhpcy5sb25nMCkge1xuICAgIHRoaXMubG9uZzAgPSAwLjc0MTc2NDkzMjA5NzU5MDEgLSAwLjMwODM0MTUwMTE4NTY2NTtcbiAgfVxuICAvKiBpZiBzY2FsZSBub3Qgc2V0IGRlZmF1bHQgdG8gMC45OTk5ICovXG4gIGlmICghdGhpcy5rMCkge1xuICAgIHRoaXMuazAgPSAwLjk5OTk7XG4gIH1cbiAgdGhpcy5zNDUgPSAwLjc4NTM5ODE2MzM5NzQ0ODsgLyogNDUgKi9cbiAgdGhpcy5zOTAgPSAyICogdGhpcy5zNDU7XG4gIHRoaXMuZmkwID0gdGhpcy5sYXQwO1xuICB0aGlzLmUyID0gdGhpcy5lcztcbiAgdGhpcy5lID0gTWF0aC5zcXJ0KHRoaXMuZTIpO1xuICB0aGlzLmFsZmEgPSBNYXRoLnNxcnQoMSArICh0aGlzLmUyICogTWF0aC5wb3coTWF0aC5jb3ModGhpcy5maTApLCA0KSkgLyAoMSAtIHRoaXMuZTIpKTtcbiAgdGhpcy51cSA9IDEuMDQyMTY4NTYzODA0NzQ7XG4gIHRoaXMudTAgPSBNYXRoLmFzaW4oTWF0aC5zaW4odGhpcy5maTApIC8gdGhpcy5hbGZhKTtcbiAgdGhpcy5nID0gTWF0aC5wb3coKDEgKyB0aGlzLmUgKiBNYXRoLnNpbih0aGlzLmZpMCkpIC8gKDEgLSB0aGlzLmUgKiBNYXRoLnNpbih0aGlzLmZpMCkpLCB0aGlzLmFsZmEgKiB0aGlzLmUgLyAyKTtcbiAgdGhpcy5rID0gTWF0aC50YW4odGhpcy51MCAvIDIgKyB0aGlzLnM0NSkgLyBNYXRoLnBvdyhNYXRoLnRhbih0aGlzLmZpMCAvIDIgKyB0aGlzLnM0NSksIHRoaXMuYWxmYSkgKiB0aGlzLmc7XG4gIHRoaXMuazEgPSB0aGlzLmswO1xuICB0aGlzLm4wID0gdGhpcy5hICogTWF0aC5zcXJ0KDEgLSB0aGlzLmUyKSAvICgxIC0gdGhpcy5lMiAqIE1hdGgucG93KE1hdGguc2luKHRoaXMuZmkwKSwgMikpO1xuICB0aGlzLnMwID0gMS4zNzAwODM0NjI4MTU1NTtcbiAgdGhpcy5uID0gTWF0aC5zaW4odGhpcy5zMCk7XG4gIHRoaXMucm8wID0gdGhpcy5rMSAqIHRoaXMubjAgLyBNYXRoLnRhbih0aGlzLnMwKTtcbiAgdGhpcy5hZCA9IHRoaXMuczkwIC0gdGhpcy51cTtcbn1cblxuLyogZWxsaXBzb2lkICovXG4vKiBjYWxjdWxhdGUgeHkgZnJvbSBsYXQvbG9uICovXG4vKiBDb25zdGFudHMsIGlkZW50aWNhbCB0byBpbnZlcnNlIHRyYW5zZm9ybSBmdW5jdGlvbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgZ2ZpLCB1LCBkZWx0YXYsIHMsIGQsIGVwcywgcm87XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG4gIHZhciBkZWx0YV9sb24gPSBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICAvKiBUcmFuc2Zvcm1hdGlvbiAqL1xuICBnZmkgPSBNYXRoLnBvdygoKDEgKyB0aGlzLmUgKiBNYXRoLnNpbihsYXQpKSAvICgxIC0gdGhpcy5lICogTWF0aC5zaW4obGF0KSkpLCAodGhpcy5hbGZhICogdGhpcy5lIC8gMikpO1xuICB1ID0gMiAqIChNYXRoLmF0YW4odGhpcy5rICogTWF0aC5wb3coTWF0aC50YW4obGF0IC8gMiArIHRoaXMuczQ1KSwgdGhpcy5hbGZhKSAvIGdmaSkgLSB0aGlzLnM0NSk7XG4gIGRlbHRhdiA9IC1kZWx0YV9sb24gKiB0aGlzLmFsZmE7XG4gIHMgPSBNYXRoLmFzaW4oTWF0aC5jb3ModGhpcy5hZCkgKiBNYXRoLnNpbih1KSArIE1hdGguc2luKHRoaXMuYWQpICogTWF0aC5jb3ModSkgKiBNYXRoLmNvcyhkZWx0YXYpKTtcbiAgZCA9IE1hdGguYXNpbihNYXRoLmNvcyh1KSAqIE1hdGguc2luKGRlbHRhdikgLyBNYXRoLmNvcyhzKSk7XG4gIGVwcyA9IHRoaXMubiAqIGQ7XG4gIHJvID0gdGhpcy5ybzAgKiBNYXRoLnBvdyhNYXRoLnRhbih0aGlzLnMwIC8gMiArIHRoaXMuczQ1KSwgdGhpcy5uKSAvIE1hdGgucG93KE1hdGgudGFuKHMgLyAyICsgdGhpcy5zNDUpLCB0aGlzLm4pO1xuICBwLnkgPSBybyAqIE1hdGguY29zKGVwcykgLyAxO1xuICBwLnggPSBybyAqIE1hdGguc2luKGVwcykgLyAxO1xuXG4gIGlmICghdGhpcy5jemVjaCkge1xuICAgIHAueSAqPSAtMTtcbiAgICBwLnggKj0gLTE7XG4gIH1cbiAgcmV0dXJuIChwKTtcbn1cblxuLyogY2FsY3VsYXRlIGxhdC9sb24gZnJvbSB4eSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuICB2YXIgdSwgZGVsdGF2LCBzLCBkLCBlcHMsIHJvLCBmaTE7XG4gIHZhciBvaztcblxuICAvKiBUcmFuc2Zvcm1hdGlvbiAqL1xuICAvKiByZXZlcnQgeSwgeCovXG4gIHZhciB0bXAgPSBwLng7XG4gIHAueCA9IHAueTtcbiAgcC55ID0gdG1wO1xuICBpZiAoIXRoaXMuY3plY2gpIHtcbiAgICBwLnkgKj0gLTE7XG4gICAgcC54ICo9IC0xO1xuICB9XG4gIHJvID0gTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSk7XG4gIGVwcyA9IE1hdGguYXRhbjIocC55LCBwLngpO1xuICBkID0gZXBzIC8gTWF0aC5zaW4odGhpcy5zMCk7XG4gIHMgPSAyICogKE1hdGguYXRhbihNYXRoLnBvdyh0aGlzLnJvMCAvIHJvLCAxIC8gdGhpcy5uKSAqIE1hdGgudGFuKHRoaXMuczAgLyAyICsgdGhpcy5zNDUpKSAtIHRoaXMuczQ1KTtcbiAgdSA9IE1hdGguYXNpbihNYXRoLmNvcyh0aGlzLmFkKSAqIE1hdGguc2luKHMpIC0gTWF0aC5zaW4odGhpcy5hZCkgKiBNYXRoLmNvcyhzKSAqIE1hdGguY29zKGQpKTtcbiAgZGVsdGF2ID0gTWF0aC5hc2luKE1hdGguY29zKHMpICogTWF0aC5zaW4oZCkgLyBNYXRoLmNvcyh1KSk7XG4gIHAueCA9IHRoaXMubG9uZzAgLSBkZWx0YXYgLyB0aGlzLmFsZmE7XG4gIGZpMSA9IHU7XG4gIG9rID0gMDtcbiAgdmFyIGl0ZXIgPSAwO1xuICBkbyB7XG4gICAgcC55ID0gMiAqIChNYXRoLmF0YW4oTWF0aC5wb3codGhpcy5rLCAtIDEgLyB0aGlzLmFsZmEpICogTWF0aC5wb3coTWF0aC50YW4odSAvIDIgKyB0aGlzLnM0NSksIDEgLyB0aGlzLmFsZmEpICogTWF0aC5wb3coKDEgKyB0aGlzLmUgKiBNYXRoLnNpbihmaTEpKSAvICgxIC0gdGhpcy5lICogTWF0aC5zaW4oZmkxKSksIHRoaXMuZSAvIDIpKSAtIHRoaXMuczQ1KTtcbiAgICBpZiAoTWF0aC5hYnMoZmkxIC0gcC55KSA8IDAuMDAwMDAwMDAwMSkge1xuICAgICAgb2sgPSAxO1xuICAgIH1cbiAgICBmaTEgPSBwLnk7XG4gICAgaXRlciArPSAxO1xuICB9IHdoaWxlIChvayA9PT0gMCAmJiBpdGVyIDwgMTUpO1xuICBpZiAoaXRlciA+PSAxNSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIChwKTtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIktyb3Zha1wiLCBcImtyb3Zha1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2tyb3Zhay5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2tyb3Zhay5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmltcG9ydCB7SEFMRl9QSSwgRVBTTE4sIEZPUlRQSX0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cbmltcG9ydCBxc2ZueiBmcm9tICcuLi9jb21tb24vcXNmbnonO1xuaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuXG4vKlxuICByZWZlcmVuY2VcbiAgICBcIk5ldyBFcXVhbC1BcmVhIE1hcCBQcm9qZWN0aW9ucyBmb3IgTm9uY2lyY3VsYXIgUmVnaW9uc1wiLCBKb2huIFAuIFNueWRlcixcbiAgICBUaGUgQW1lcmljYW4gQ2FydG9ncmFwaGVyLCBWb2wgMTUsIE5vLiA0LCBPY3RvYmVyIDE5ODgsIHBwLiAzNDEtMzU1LlxuICAqL1xuXG5leHBvcnQgdmFyIFNfUE9MRSA9IDE7XG5cbmV4cG9ydCB2YXIgTl9QT0xFID0gMjtcbmV4cG9ydCB2YXIgRVFVSVQgPSAzO1xuZXhwb3J0IHZhciBPQkxJUSA9IDQ7XG5cbi8qIEluaXRpYWxpemUgdGhlIExhbWJlcnQgQXppbXV0aGFsIEVxdWFsIEFyZWEgcHJvamVjdGlvblxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIHZhciB0ID0gTWF0aC5hYnModGhpcy5sYXQwKTtcbiAgaWYgKE1hdGguYWJzKHQgLSBIQUxGX1BJKSA8IEVQU0xOKSB7XG4gICAgdGhpcy5tb2RlID0gdGhpcy5sYXQwIDwgMCA/IHRoaXMuU19QT0xFIDogdGhpcy5OX1BPTEU7XG4gIH1cbiAgZWxzZSBpZiAoTWF0aC5hYnModCkgPCBFUFNMTikge1xuICAgIHRoaXMubW9kZSA9IHRoaXMuRVFVSVQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5tb2RlID0gdGhpcy5PQkxJUTtcbiAgfVxuICBpZiAodGhpcy5lcyA+IDApIHtcbiAgICB2YXIgc2lucGhpO1xuXG4gICAgdGhpcy5xcCA9IHFzZm56KHRoaXMuZSwgMSk7XG4gICAgdGhpcy5tbWYgPSAwLjUgLyAoMSAtIHRoaXMuZXMpO1xuICAgIHRoaXMuYXBhID0gYXV0aHNldCh0aGlzLmVzKTtcbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgIGNhc2UgdGhpcy5OX1BPTEU6XG4gICAgICB0aGlzLmRkID0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5TX1BPTEU6XG4gICAgICB0aGlzLmRkID0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5FUVVJVDpcbiAgICAgIHRoaXMucnEgPSBNYXRoLnNxcnQoMC41ICogdGhpcy5xcCk7XG4gICAgICB0aGlzLmRkID0gMSAvIHRoaXMucnE7XG4gICAgICB0aGlzLnhtZiA9IDE7XG4gICAgICB0aGlzLnltZiA9IDAuNSAqIHRoaXMucXA7XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuT0JMSVE6XG4gICAgICB0aGlzLnJxID0gTWF0aC5zcXJ0KDAuNSAqIHRoaXMucXApO1xuICAgICAgc2lucGhpID0gTWF0aC5zaW4odGhpcy5sYXQwKTtcbiAgICAgIHRoaXMuc2luYjEgPSBxc2Zueih0aGlzLmUsIHNpbnBoaSkgLyB0aGlzLnFwO1xuICAgICAgdGhpcy5jb3NiMSA9IE1hdGguc3FydCgxIC0gdGhpcy5zaW5iMSAqIHRoaXMuc2luYjEpO1xuICAgICAgdGhpcy5kZCA9IE1hdGguY29zKHRoaXMubGF0MCkgLyAoTWF0aC5zcXJ0KDEgLSB0aGlzLmVzICogc2lucGhpICogc2lucGhpKSAqIHRoaXMucnEgKiB0aGlzLmNvc2IxKTtcbiAgICAgIHRoaXMueW1mID0gKHRoaXMueG1mID0gdGhpcy5ycSkgLyB0aGlzLmRkO1xuICAgICAgdGhpcy54bWYgKj0gdGhpcy5kZDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSB0aGlzLk9CTElRKSB7XG4gICAgICB0aGlzLnNpbnBoMCA9IE1hdGguc2luKHRoaXMubGF0MCk7XG4gICAgICB0aGlzLmNvc3BoMCA9IE1hdGguY29zKHRoaXMubGF0MCk7XG4gICAgfVxuICB9XG59XG5cbi8qIExhbWJlcnQgQXppbXV0aGFsIEVxdWFsIEFyZWEgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKHApIHtcblxuICAvKiBGb3J3YXJkIGVxdWF0aW9uc1xuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICB2YXIgeCwgeSwgY29zbGFtLCBzaW5sYW0sIHNpbnBoaSwgcSwgc2luYiwgY29zYiwgYiwgY29zcGhpO1xuICB2YXIgbGFtID0gcC54O1xuICB2YXIgcGhpID0gcC55O1xuXG4gIGxhbSA9IGFkanVzdF9sb24obGFtIC0gdGhpcy5sb25nMCk7XG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIHNpbnBoaSA9IE1hdGguc2luKHBoaSk7XG4gICAgY29zcGhpID0gTWF0aC5jb3MocGhpKTtcbiAgICBjb3NsYW0gPSBNYXRoLmNvcyhsYW0pO1xuICAgIGlmICh0aGlzLm1vZGUgPT09IHRoaXMuT0JMSVEgfHwgdGhpcy5tb2RlID09PSB0aGlzLkVRVUlUKSB7XG4gICAgICB5ID0gKHRoaXMubW9kZSA9PT0gdGhpcy5FUVVJVCkgPyAxICsgY29zcGhpICogY29zbGFtIDogMSArIHRoaXMuc2lucGgwICogc2lucGhpICsgdGhpcy5jb3NwaDAgKiBjb3NwaGkgKiBjb3NsYW07XG4gICAgICBpZiAoeSA8PSBFUFNMTikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHkgPSBNYXRoLnNxcnQoMiAvIHkpO1xuICAgICAgeCA9IHkgKiBjb3NwaGkgKiBNYXRoLnNpbihsYW0pO1xuICAgICAgeSAqPSAodGhpcy5tb2RlID09PSB0aGlzLkVRVUlUKSA/IHNpbnBoaSA6IHRoaXMuY29zcGgwICogc2lucGhpIC0gdGhpcy5zaW5waDAgKiBjb3NwaGkgKiBjb3NsYW07XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gdGhpcy5OX1BPTEUgfHwgdGhpcy5tb2RlID09PSB0aGlzLlNfUE9MRSkge1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gdGhpcy5OX1BPTEUpIHtcbiAgICAgICAgY29zbGFtID0gLWNvc2xhbTtcbiAgICAgIH1cbiAgICAgIGlmIChNYXRoLmFicyhwaGkgKyB0aGlzLnBoaTApIDwgRVBTTE4pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB5ID0gRk9SVFBJIC0gcGhpICogMC41O1xuICAgICAgeSA9IDIgKiAoKHRoaXMubW9kZSA9PT0gdGhpcy5TX1BPTEUpID8gTWF0aC5jb3MoeSkgOiBNYXRoLnNpbih5KSk7XG4gICAgICB4ID0geSAqIE1hdGguc2luKGxhbSk7XG4gICAgICB5ICo9IGNvc2xhbTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgc2luYiA9IDA7XG4gICAgY29zYiA9IDA7XG4gICAgYiA9IDA7XG4gICAgY29zbGFtID0gTWF0aC5jb3MobGFtKTtcbiAgICBzaW5sYW0gPSBNYXRoLnNpbihsYW0pO1xuICAgIHNpbnBoaSA9IE1hdGguc2luKHBoaSk7XG4gICAgcSA9IHFzZm56KHRoaXMuZSwgc2lucGhpKTtcbiAgICBpZiAodGhpcy5tb2RlID09PSB0aGlzLk9CTElRIHx8IHRoaXMubW9kZSA9PT0gdGhpcy5FUVVJVCkge1xuICAgICAgc2luYiA9IHEgLyB0aGlzLnFwO1xuICAgICAgY29zYiA9IE1hdGguc3FydCgxIC0gc2luYiAqIHNpbmIpO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgIGNhc2UgdGhpcy5PQkxJUTpcbiAgICAgIGIgPSAxICsgdGhpcy5zaW5iMSAqIHNpbmIgKyB0aGlzLmNvc2IxICogY29zYiAqIGNvc2xhbTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5FUVVJVDpcbiAgICAgIGIgPSAxICsgY29zYiAqIGNvc2xhbTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5OX1BPTEU6XG4gICAgICBiID0gSEFMRl9QSSArIHBoaTtcbiAgICAgIHEgPSB0aGlzLnFwIC0gcTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5TX1BPTEU6XG4gICAgICBiID0gcGhpIC0gSEFMRl9QSTtcbiAgICAgIHEgPSB0aGlzLnFwICsgcTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoTWF0aC5hYnMoYikgPCBFUFNMTikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgY2FzZSB0aGlzLk9CTElROlxuICAgIGNhc2UgdGhpcy5FUVVJVDpcbiAgICAgIGIgPSBNYXRoLnNxcnQoMiAvIGIpO1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gdGhpcy5PQkxJUSkge1xuICAgICAgICB5ID0gdGhpcy55bWYgKiBiICogKHRoaXMuY29zYjEgKiBzaW5iIC0gdGhpcy5zaW5iMSAqIGNvc2IgKiBjb3NsYW0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHkgPSAoYiA9IE1hdGguc3FydCgyIC8gKDEgKyBjb3NiICogY29zbGFtKSkpICogc2luYiAqIHRoaXMueW1mO1xuICAgICAgfVxuICAgICAgeCA9IHRoaXMueG1mICogYiAqIGNvc2IgKiBzaW5sYW07XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuTl9QT0xFOlxuICAgIGNhc2UgdGhpcy5TX1BPTEU6XG4gICAgICBpZiAocSA+PSAwKSB7XG4gICAgICAgIHggPSAoYiA9IE1hdGguc3FydChxKSkgKiBzaW5sYW07XG4gICAgICAgIHkgPSBjb3NsYW0gKiAoKHRoaXMubW9kZSA9PT0gdGhpcy5TX1BPTEUpID8gYiA6IC1iKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB4ID0geSA9IDA7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwLnggPSB0aGlzLmEgKiB4ICsgdGhpcy54MDtcbiAgcC55ID0gdGhpcy5hICogeSArIHRoaXMueTA7XG4gIHJldHVybiBwO1xufVxuXG4vKiBJbnZlcnNlIGVxdWF0aW9uc1xuICAtLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHAueCAtPSB0aGlzLngwO1xuICBwLnkgLT0gdGhpcy55MDtcbiAgdmFyIHggPSBwLnggLyB0aGlzLmE7XG4gIHZhciB5ID0gcC55IC8gdGhpcy5hO1xuICB2YXIgbGFtLCBwaGksIGNDZSwgc0NlLCBxLCByaG8sIGFiO1xuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICB2YXIgY29zeiA9IDAsXG4gICAgICByaCwgc2lueiA9IDA7XG5cbiAgICByaCA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICBwaGkgPSByaCAqIDAuNTtcbiAgICBpZiAocGhpID4gMSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHBoaSA9IDIgKiBNYXRoLmFzaW4ocGhpKTtcbiAgICBpZiAodGhpcy5tb2RlID09PSB0aGlzLk9CTElRIHx8IHRoaXMubW9kZSA9PT0gdGhpcy5FUVVJVCkge1xuICAgICAgc2lueiA9IE1hdGguc2luKHBoaSk7XG4gICAgICBjb3N6ID0gTWF0aC5jb3MocGhpKTtcbiAgICB9XG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICBjYXNlIHRoaXMuRVFVSVQ6XG4gICAgICBwaGkgPSAoTWF0aC5hYnMocmgpIDw9IEVQU0xOKSA/IDAgOiBNYXRoLmFzaW4oeSAqIHNpbnogLyByaCk7XG4gICAgICB4ICo9IHNpbno7XG4gICAgICB5ID0gY29zeiAqIHJoO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0aGlzLk9CTElROlxuICAgICAgcGhpID0gKE1hdGguYWJzKHJoKSA8PSBFUFNMTikgPyB0aGlzLnBoaTAgOiBNYXRoLmFzaW4oY29zeiAqIHRoaXMuc2lucGgwICsgeSAqIHNpbnogKiB0aGlzLmNvc3BoMCAvIHJoKTtcbiAgICAgIHggKj0gc2lueiAqIHRoaXMuY29zcGgwO1xuICAgICAgeSA9IChjb3N6IC0gTWF0aC5zaW4ocGhpKSAqIHRoaXMuc2lucGgwKSAqIHJoO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0aGlzLk5fUE9MRTpcbiAgICAgIHkgPSAteTtcbiAgICAgIHBoaSA9IEhBTEZfUEkgLSBwaGk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuU19QT0xFOlxuICAgICAgcGhpIC09IEhBTEZfUEk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbGFtID0gKHkgPT09IDAgJiYgKHRoaXMubW9kZSA9PT0gdGhpcy5FUVVJVCB8fCB0aGlzLm1vZGUgPT09IHRoaXMuT0JMSVEpKSA/IDAgOiBNYXRoLmF0YW4yKHgsIHkpO1xuICB9XG4gIGVsc2Uge1xuICAgIGFiID0gMDtcbiAgICBpZiAodGhpcy5tb2RlID09PSB0aGlzLk9CTElRIHx8IHRoaXMubW9kZSA9PT0gdGhpcy5FUVVJVCkge1xuICAgICAgeCAvPSB0aGlzLmRkO1xuICAgICAgeSAqPSB0aGlzLmRkO1xuICAgICAgcmhvID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuICAgICAgaWYgKHJobyA8IEVQU0xOKSB7XG4gICAgICAgIHAueCA9IDA7XG4gICAgICAgIHAueSA9IHRoaXMucGhpMDtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9XG4gICAgICBzQ2UgPSAyICogTWF0aC5hc2luKDAuNSAqIHJobyAvIHRoaXMucnEpO1xuICAgICAgY0NlID0gTWF0aC5jb3Moc0NlKTtcbiAgICAgIHggKj0gKHNDZSA9IE1hdGguc2luKHNDZSkpO1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gdGhpcy5PQkxJUSkge1xuICAgICAgICBhYiA9IGNDZSAqIHRoaXMuc2luYjEgKyB5ICogc0NlICogdGhpcy5jb3NiMSAvIHJobztcbiAgICAgICAgcSA9IHRoaXMucXAgKiBhYjtcbiAgICAgICAgeSA9IHJobyAqIHRoaXMuY29zYjEgKiBjQ2UgLSB5ICogdGhpcy5zaW5iMSAqIHNDZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhYiA9IHkgKiBzQ2UgLyByaG87XG4gICAgICAgIHEgPSB0aGlzLnFwICogYWI7XG4gICAgICAgIHkgPSByaG8gKiBjQ2U7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gdGhpcy5OX1BPTEUgfHwgdGhpcy5tb2RlID09PSB0aGlzLlNfUE9MRSkge1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gdGhpcy5OX1BPTEUpIHtcbiAgICAgICAgeSA9IC15O1xuICAgICAgfVxuICAgICAgcSA9ICh4ICogeCArIHkgKiB5KTtcbiAgICAgIGlmICghcSkge1xuICAgICAgICBwLnggPSAwO1xuICAgICAgICBwLnkgPSB0aGlzLnBoaTA7XG4gICAgICAgIHJldHVybiBwO1xuICAgICAgfVxuICAgICAgYWIgPSAxIC0gcSAvIHRoaXMucXA7XG4gICAgICBpZiAodGhpcy5tb2RlID09PSB0aGlzLlNfUE9MRSkge1xuICAgICAgICBhYiA9IC1hYjtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFtID0gTWF0aC5hdGFuMih4LCB5KTtcbiAgICBwaGkgPSBhdXRobGF0KE1hdGguYXNpbihhYiksIHRoaXMuYXBhKTtcbiAgfVxuXG4gIHAueCA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIGxhbSk7XG4gIHAueSA9IHBoaTtcbiAgcmV0dXJuIHA7XG59XG5cbi8qIGRldGVybWluZSBsYXRpdHVkZSBmcm9tIGF1dGhhbGljIGxhdGl0dWRlICovXG52YXIgUDAwID0gMC4zMzMzMzMzMzMzMzMzMzMzMzMzMztcblxudmFyIFAwMSA9IDAuMTcyMjIyMjIyMjIyMjIyMjIyMjI7XG52YXIgUDAyID0gMC4xMDI1NzkzNjUwNzkzNjUwNzkzNjtcbnZhciBQMTAgPSAwLjA2Mzg4ODg4ODg4ODg4ODg4ODg4O1xudmFyIFAxMSA9IDAuMDY2NDAyMTE2NDAyMTE2NDAyMTE7XG52YXIgUDIwID0gMC4wMTY0MTUwMTI5NDIxOTE1NDQ0MztcblxuZnVuY3Rpb24gYXV0aHNldChlcykge1xuICB2YXIgdDtcbiAgdmFyIEFQQSA9IFtdO1xuICBBUEFbMF0gPSBlcyAqIFAwMDtcbiAgdCA9IGVzICogZXM7XG4gIEFQQVswXSArPSB0ICogUDAxO1xuICBBUEFbMV0gPSB0ICogUDEwO1xuICB0ICo9IGVzO1xuICBBUEFbMF0gKz0gdCAqIFAwMjtcbiAgQVBBWzFdICs9IHQgKiBQMTE7XG4gIEFQQVsyXSA9IHQgKiBQMjA7XG4gIHJldHVybiBBUEE7XG59XG5cbmZ1bmN0aW9uIGF1dGhsYXQoYmV0YSwgQVBBKSB7XG4gIHZhciB0ID0gYmV0YSArIGJldGE7XG4gIHJldHVybiAoYmV0YSArIEFQQVswXSAqIE1hdGguc2luKHQpICsgQVBBWzFdICogTWF0aC5zaW4odCArIHQpICsgQVBBWzJdICogTWF0aC5zaW4odCArIHQgKyB0KSk7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJMYW1iZXJ0IEF6aW11dGhhbCBFcXVhbCBBcmVhXCIsIFwiTGFtYmVydF9BemltdXRoYWxfRXF1YWxfQXJlYVwiLCBcImxhZWFcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lcyxcbiAgU19QT0xFOiBTX1BPTEUsXG4gIE5fUE9MRTogTl9QT0xFLFxuICBFUVVJVDogRVFVSVQsXG4gIE9CTElROiBPQkxJUVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9sYWVhLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbGFlYS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgbXNmbnogZnJvbSAnLi4vY29tbW9uL21zZm56JztcbmltcG9ydCB0c2ZueiBmcm9tICcuLi9jb21tb24vdHNmbnonO1xuaW1wb3J0IHNpZ24gZnJvbSAnLi4vY29tbW9uL3NpZ24nO1xuaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuaW1wb3J0IHBoaTJ6IGZyb20gJy4uL2NvbW1vbi9waGkyeic7XG5pbXBvcnQge0hBTEZfUEksIEVQU0xOfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuXG4gIC8vIGFycmF5IG9mOiAgcl9tYWoscl9taW4sbGF0MSxsYXQyLGNfbG9uLGNfbGF0LGZhbHNlX2Vhc3QsZmFsc2Vfbm9ydGhcbiAgLy9kb3VibGUgY19sYXQ7ICAgICAgICAgICAgICAgICAgIC8qIGNlbnRlciBsYXRpdHVkZSAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvL2RvdWJsZSBjX2xvbjsgICAgICAgICAgICAgICAgICAgLyogY2VudGVyIGxvbmdpdHVkZSAgICAgICAgICAgICAgICAgICAgICovXG4gIC8vZG91YmxlIGxhdDE7ICAgICAgICAgICAgICAgICAgICAvKiBmaXJzdCBzdGFuZGFyZCBwYXJhbGxlbCAgICAgICAgICAgICAgKi9cbiAgLy9kb3VibGUgbGF0MjsgICAgICAgICAgICAgICAgICAgIC8qIHNlY29uZCBzdGFuZGFyZCBwYXJhbGxlbCAgICAgICAgICAgICAqL1xuICAvL2RvdWJsZSByX21hajsgICAgICAgICAgICAgICAgICAgLyogbWFqb3IgYXhpcyAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gIC8vZG91YmxlIHJfbWluOyAgICAgICAgICAgICAgICAgICAvKiBtaW5vciBheGlzICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLy9kb3VibGUgZmFsc2VfZWFzdDsgICAgICAgICAgICAgIC8qIHggb2Zmc2V0IGluIG1ldGVycyAgICAgICAgICAgICAgICAgICAqL1xuICAvL2RvdWJsZSBmYWxzZV9ub3J0aDsgICAgICAgICAgICAgLyogeSBvZmZzZXQgaW4gbWV0ZXJzICAgICAgICAgICAgICAgICAgICovXG5cbiAgaWYgKCF0aGlzLmxhdDIpIHtcbiAgICB0aGlzLmxhdDIgPSB0aGlzLmxhdDE7XG4gIH0gLy9pZiBsYXQyIGlzIG5vdCBkZWZpbmVkXG4gIGlmICghdGhpcy5rMCkge1xuICAgIHRoaXMuazAgPSAxO1xuICB9XG4gIHRoaXMueDAgPSB0aGlzLngwIHx8IDA7XG4gIHRoaXMueTAgPSB0aGlzLnkwIHx8IDA7XG4gIC8vIFN0YW5kYXJkIFBhcmFsbGVscyBjYW5ub3QgYmUgZXF1YWwgYW5kIG9uIG9wcG9zaXRlIHNpZGVzIG9mIHRoZSBlcXVhdG9yXG4gIGlmIChNYXRoLmFicyh0aGlzLmxhdDEgKyB0aGlzLmxhdDIpIDwgRVBTTE4pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdGVtcCA9IHRoaXMuYiAvIHRoaXMuYTtcbiAgdGhpcy5lID0gTWF0aC5zcXJ0KDEgLSB0ZW1wICogdGVtcCk7XG5cbiAgdmFyIHNpbjEgPSBNYXRoLnNpbih0aGlzLmxhdDEpO1xuICB2YXIgY29zMSA9IE1hdGguY29zKHRoaXMubGF0MSk7XG4gIHZhciBtczEgPSBtc2Zueih0aGlzLmUsIHNpbjEsIGNvczEpO1xuICB2YXIgdHMxID0gdHNmbnoodGhpcy5lLCB0aGlzLmxhdDEsIHNpbjEpO1xuXG4gIHZhciBzaW4yID0gTWF0aC5zaW4odGhpcy5sYXQyKTtcbiAgdmFyIGNvczIgPSBNYXRoLmNvcyh0aGlzLmxhdDIpO1xuICB2YXIgbXMyID0gbXNmbnoodGhpcy5lLCBzaW4yLCBjb3MyKTtcbiAgdmFyIHRzMiA9IHRzZm56KHRoaXMuZSwgdGhpcy5sYXQyLCBzaW4yKTtcblxuICB2YXIgdHMwID0gdHNmbnoodGhpcy5lLCB0aGlzLmxhdDAsIE1hdGguc2luKHRoaXMubGF0MCkpO1xuXG4gIGlmIChNYXRoLmFicyh0aGlzLmxhdDEgLSB0aGlzLmxhdDIpID4gRVBTTE4pIHtcbiAgICB0aGlzLm5zID0gTWF0aC5sb2cobXMxIC8gbXMyKSAvIE1hdGgubG9nKHRzMSAvIHRzMik7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5ucyA9IHNpbjE7XG4gIH1cbiAgaWYgKGlzTmFOKHRoaXMubnMpKSB7XG4gICAgdGhpcy5ucyA9IHNpbjE7XG4gIH1cbiAgdGhpcy5mMCA9IG1zMSAvICh0aGlzLm5zICogTWF0aC5wb3codHMxLCB0aGlzLm5zKSk7XG4gIHRoaXMucmggPSB0aGlzLmEgKiB0aGlzLmYwICogTWF0aC5wb3codHMwLCB0aGlzLm5zKTtcbiAgaWYgKCF0aGlzLnRpdGxlKSB7XG4gICAgdGhpcy50aXRsZSA9IFwiTGFtYmVydCBDb25mb3JtYWwgQ29uaWNcIjtcbiAgfVxufVxuXG4vLyBMYW1iZXJ0IENvbmZvcm1hbCBjb25pYyBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG5cbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcblxuICAvLyBzaW5ndWxhciBjYXNlcyA6XG4gIGlmIChNYXRoLmFicygyICogTWF0aC5hYnMobGF0KSAtIE1hdGguUEkpIDw9IEVQU0xOKSB7XG4gICAgbGF0ID0gc2lnbihsYXQpICogKEhBTEZfUEkgLSAyICogRVBTTE4pO1xuICB9XG5cbiAgdmFyIGNvbiA9IE1hdGguYWJzKE1hdGguYWJzKGxhdCkgLSBIQUxGX1BJKTtcbiAgdmFyIHRzLCByaDE7XG4gIGlmIChjb24gPiBFUFNMTikge1xuICAgIHRzID0gdHNmbnoodGhpcy5lLCBsYXQsIE1hdGguc2luKGxhdCkpO1xuICAgIHJoMSA9IHRoaXMuYSAqIHRoaXMuZjAgKiBNYXRoLnBvdyh0cywgdGhpcy5ucyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uID0gbGF0ICogdGhpcy5ucztcbiAgICBpZiAoY29uIDw9IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByaDEgPSAwO1xuICB9XG4gIHZhciB0aGV0YSA9IHRoaXMubnMgKiBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICBwLnggPSB0aGlzLmswICogKHJoMSAqIE1hdGguc2luKHRoZXRhKSkgKyB0aGlzLngwO1xuICBwLnkgPSB0aGlzLmswICogKHRoaXMucmggLSByaDEgKiBNYXRoLmNvcyh0aGV0YSkpICsgdGhpcy55MDtcblxuICByZXR1cm4gcDtcbn1cblxuLy8gTGFtYmVydCBDb25mb3JtYWwgQ29uaWMgaW52ZXJzZSBlcXVhdGlvbnMtLW1hcHBpbmcgeCx5IHRvIGxhdC9sb25nXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuXG4gIHZhciByaDEsIGNvbiwgdHM7XG4gIHZhciBsYXQsIGxvbjtcbiAgdmFyIHggPSAocC54IC0gdGhpcy54MCkgLyB0aGlzLmswO1xuICB2YXIgeSA9ICh0aGlzLnJoIC0gKHAueSAtIHRoaXMueTApIC8gdGhpcy5rMCk7XG4gIGlmICh0aGlzLm5zID4gMCkge1xuICAgIHJoMSA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICBjb24gPSAxO1xuICB9XG4gIGVsc2Uge1xuICAgIHJoMSA9IC1NYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gICAgY29uID0gLTE7XG4gIH1cbiAgdmFyIHRoZXRhID0gMDtcbiAgaWYgKHJoMSAhPT0gMCkge1xuICAgIHRoZXRhID0gTWF0aC5hdGFuMigoY29uICogeCksIChjb24gKiB5KSk7XG4gIH1cbiAgaWYgKChyaDEgIT09IDApIHx8ICh0aGlzLm5zID4gMCkpIHtcbiAgICBjb24gPSAxIC8gdGhpcy5ucztcbiAgICB0cyA9IE1hdGgucG93KChyaDEgLyAodGhpcy5hICogdGhpcy5mMCkpLCBjb24pO1xuICAgIGxhdCA9IHBoaTJ6KHRoaXMuZSwgdHMpO1xuICAgIGlmIChsYXQgPT09IC05OTk5KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgbGF0ID0gLUhBTEZfUEk7XG4gIH1cbiAgbG9uID0gYWRqdXN0X2xvbih0aGV0YSAvIHRoaXMubnMgKyB0aGlzLmxvbmcwKTtcblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJMYW1iZXJ0IFRhbmdlbnRpYWwgQ29uZm9ybWFsIENvbmljIFByb2plY3Rpb25cIiwgXCJMYW1iZXJ0X0NvbmZvcm1hbF9Db25pY1wiLCBcIkxhbWJlcnRfQ29uZm9ybWFsX0NvbmljXzJTUFwiLCBcImxjY1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2xjYy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2xjYy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgLy9uby1vcCBmb3IgbG9uZ2xhdFxufVxuXG5mdW5jdGlvbiBpZGVudGl0eShwdCkge1xuICByZXR1cm4gcHQ7XG59XG5leHBvcnQge2lkZW50aXR5IGFzIGZvcndhcmR9O1xuZXhwb3J0IHtpZGVudGl0eSBhcyBpbnZlcnNlfTtcbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJsb25nbGF0XCIsIFwiaWRlbnRpdHlcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGlkZW50aXR5LFxuICBpbnZlcnNlOiBpZGVudGl0eSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL2xvbmdsYXQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9sb25nbGF0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBtc2ZueiBmcm9tICcuLi9jb21tb24vbXNmbnonO1xuXG5pbXBvcnQgYWRqdXN0X2xvbiBmcm9tICcuLi9jb21tb24vYWRqdXN0X2xvbic7XG5pbXBvcnQgdHNmbnogZnJvbSAnLi4vY29tbW9uL3RzZm56JztcbmltcG9ydCBwaGkyeiBmcm9tICcuLi9jb21tb24vcGhpMnonO1xuaW1wb3J0IHtGT1JUUEksIFIyRCwgRVBTTE4sIEhBTEZfUEl9IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIHZhciBjb24gPSB0aGlzLmIgLyB0aGlzLmE7XG4gIHRoaXMuZXMgPSAxIC0gY29uICogY29uO1xuICBpZighKCd4MCcgaW4gdGhpcykpe1xuICAgIHRoaXMueDAgPSAwO1xuICB9XG4gIGlmKCEoJ3kwJyBpbiB0aGlzKSl7XG4gICAgdGhpcy55MCA9IDA7XG4gIH1cbiAgdGhpcy5lID0gTWF0aC5zcXJ0KHRoaXMuZXMpO1xuICBpZiAodGhpcy5sYXRfdHMpIHtcbiAgICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICAgIHRoaXMuazAgPSBNYXRoLmNvcyh0aGlzLmxhdF90cyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5rMCA9IG1zZm56KHRoaXMuZSwgTWF0aC5zaW4odGhpcy5sYXRfdHMpLCBNYXRoLmNvcyh0aGlzLmxhdF90cykpO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoIXRoaXMuazApIHtcbiAgICAgIGlmICh0aGlzLmspIHtcbiAgICAgICAgdGhpcy5rMCA9IHRoaXMuaztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmswID0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyogTWVyY2F0b3IgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuICAvLyBjb252ZXJ0IHRvIHJhZGlhbnNcbiAgaWYgKGxhdCAqIFIyRCA+IDkwICYmIGxhdCAqIFIyRCA8IC05MCAmJiBsb24gKiBSMkQgPiAxODAgJiYgbG9uICogUjJEIDwgLTE4MCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIHgsIHk7XG4gIGlmIChNYXRoLmFicyhNYXRoLmFicyhsYXQpIC0gSEFMRl9QSSkgPD0gRVBTTE4pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICAgIHggPSB0aGlzLngwICsgdGhpcy5hICogdGhpcy5rMCAqIGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG4gICAgICB5ID0gdGhpcy55MCArIHRoaXMuYSAqIHRoaXMuazAgKiBNYXRoLmxvZyhNYXRoLnRhbihGT1JUUEkgKyAwLjUgKiBsYXQpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgc2lucGhpID0gTWF0aC5zaW4obGF0KTtcbiAgICAgIHZhciB0cyA9IHRzZm56KHRoaXMuZSwgbGF0LCBzaW5waGkpO1xuICAgICAgeCA9IHRoaXMueDAgKyB0aGlzLmEgKiB0aGlzLmswICogYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgICAgIHkgPSB0aGlzLnkwIC0gdGhpcy5hICogdGhpcy5rMCAqIE1hdGgubG9nKHRzKTtcbiAgICB9XG4gICAgcC54ID0geDtcbiAgICBwLnkgPSB5O1xuICAgIHJldHVybiBwO1xuICB9XG59XG5cbi8qIE1lcmNhdG9yIGludmVyc2UgZXF1YXRpb25zLS1tYXBwaW5nIHgseSB0byBsYXQvbG9uZ1xuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG5cbiAgdmFyIHggPSBwLnggLSB0aGlzLngwO1xuICB2YXIgeSA9IHAueSAtIHRoaXMueTA7XG4gIHZhciBsb24sIGxhdDtcblxuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICBsYXQgPSBIQUxGX1BJIC0gMiAqIE1hdGguYXRhbihNYXRoLmV4cCgteSAvICh0aGlzLmEgKiB0aGlzLmswKSkpO1xuICB9XG4gIGVsc2Uge1xuICAgIHZhciB0cyA9IE1hdGguZXhwKC15IC8gKHRoaXMuYSAqIHRoaXMuazApKTtcbiAgICBsYXQgPSBwaGkyeih0aGlzLmUsIHRzKTtcbiAgICBpZiAobGF0ID09PSAtOTk5OSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIHggLyAodGhpcy5hICogdGhpcy5rMCkpO1xuXG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIk1lcmNhdG9yXCIsIFwiUG9wdWxhciBWaXN1YWxpc2F0aW9uIFBzZXVkbyBNZXJjYXRvclwiLCBcIk1lcmNhdG9yXzFTUFwiLCBcIk1lcmNhdG9yX0F1eGlsaWFyeV9TcGhlcmVcIiwgXCJtZXJjXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbWVyYy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL21lcmMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuXG4vKlxuICByZWZlcmVuY2VcbiAgICBcIk5ldyBFcXVhbC1BcmVhIE1hcCBQcm9qZWN0aW9ucyBmb3IgTm9uY2lyY3VsYXIgUmVnaW9uc1wiLCBKb2huIFAuIFNueWRlcixcbiAgICBUaGUgQW1lcmljYW4gQ2FydG9ncmFwaGVyLCBWb2wgMTUsIE5vLiA0LCBPY3RvYmVyIDE5ODgsIHBwLiAzNDEtMzU1LlxuICAqL1xuXG5cbi8qIEluaXRpYWxpemUgdGhlIE1pbGxlciBDeWxpbmRyaWNhbCBwcm9qZWN0aW9uXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vbm8tb3Bcbn1cblxuLyogTWlsbGVyIEN5bGluZHJpY2FsIGZvcndhcmQgZXF1YXRpb25zLS1tYXBwaW5nIGxhdCxsb25nIHRvIHgseVxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG4gIC8qIEZvcndhcmQgZXF1YXRpb25zXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIHZhciBkbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgdmFyIHggPSB0aGlzLngwICsgdGhpcy5hICogZGxvbjtcbiAgdmFyIHkgPSB0aGlzLnkwICsgdGhpcy5hICogTWF0aC5sb2coTWF0aC50YW4oKE1hdGguUEkgLyA0KSArIChsYXQgLyAyLjUpKSkgKiAxLjI1O1xuXG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG4gIHJldHVybiBwO1xufVxuXG4vKiBNaWxsZXIgQ3lsaW5kcmljYWwgaW52ZXJzZSBlcXVhdGlvbnMtLW1hcHBpbmcgeCx5IHRvIGxhdC9sb25nXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSAtPSB0aGlzLnkwO1xuXG4gIHZhciBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBwLnggLyB0aGlzLmEpO1xuICB2YXIgbGF0ID0gMi41ICogKE1hdGguYXRhbihNYXRoLmV4cCgwLjggKiBwLnkgLyB0aGlzLmEpKSAtIE1hdGguUEkgLyA0KTtcblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCB2YXIgbmFtZXMgPSBbXCJNaWxsZXJfQ3lsaW5kcmljYWxcIiwgXCJtaWxsXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbWlsbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL21pbGwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7fVxuaW1wb3J0IHtFUFNMTn0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG4vKiBNb2xsd2VpZGUgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG5cbiAgLyogRm9yd2FyZCBlcXVhdGlvbnNcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcblxuICB2YXIgZGVsdGFfbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgdmFyIHRoZXRhID0gbGF0O1xuICB2YXIgY29uID0gTWF0aC5QSSAqIE1hdGguc2luKGxhdCk7XG5cbiAgLyogSXRlcmF0ZSB1c2luZyB0aGUgTmV3dG9uLVJhcGhzb24gbWV0aG9kIHRvIGZpbmQgdGhldGFcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgd2hpbGUgKHRydWUpIHtcbiAgICB2YXIgZGVsdGFfdGhldGEgPSAtKHRoZXRhICsgTWF0aC5zaW4odGhldGEpIC0gY29uKSAvICgxICsgTWF0aC5jb3ModGhldGEpKTtcbiAgICB0aGV0YSArPSBkZWx0YV90aGV0YTtcbiAgICBpZiAoTWF0aC5hYnMoZGVsdGFfdGhldGEpIDwgRVBTTE4pIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICB0aGV0YSAvPSAyO1xuXG4gIC8qIElmIHRoZSBsYXRpdHVkZSBpcyA5MCBkZWcsIGZvcmNlIHRoZSB4IGNvb3JkaW5hdGUgdG8gYmUgXCIwICsgZmFsc2UgZWFzdGluZ1wiXG4gICAgICAgdGhpcyBpcyBkb25lIGhlcmUgYmVjYXVzZSBvZiBwcmVjaXNpb24gcHJvYmxlbXMgd2l0aCBcImNvcyh0aGV0YSlcIlxuICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgaWYgKE1hdGguUEkgLyAyIC0gTWF0aC5hYnMobGF0KSA8IEVQU0xOKSB7XG4gICAgZGVsdGFfbG9uID0gMDtcbiAgfVxuICB2YXIgeCA9IDAuOTAwMzE2MzE2MTU4ICogdGhpcy5hICogZGVsdGFfbG9uICogTWF0aC5jb3ModGhldGEpICsgdGhpcy54MDtcbiAgdmFyIHkgPSAxLjQxNDIxMzU2MjM3MzEgKiB0aGlzLmEgKiBNYXRoLnNpbih0aGV0YSkgKyB0aGlzLnkwO1xuXG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHZhciB0aGV0YTtcbiAgdmFyIGFyZztcblxuICAvKiBJbnZlcnNlIGVxdWF0aW9uc1xuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBwLnggLT0gdGhpcy54MDtcbiAgcC55IC09IHRoaXMueTA7XG4gIGFyZyA9IHAueSAvICgxLjQxNDIxMzU2MjM3MzEgKiB0aGlzLmEpO1xuXG4gIC8qIEJlY2F1c2Ugb2YgZGl2aXNpb24gYnkgemVybyBwcm9ibGVtcywgJ2FyZycgY2FuIG5vdCBiZSAxLiAgVGhlcmVmb3JlXG4gICAgICAgYSBudW1iZXIgdmVyeSBjbG9zZSB0byBvbmUgaXMgdXNlZCBpbnN0ZWFkLlxuICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBpZiAoTWF0aC5hYnMoYXJnKSA+IDAuOTk5OTk5OTk5OTk5KSB7XG4gICAgYXJnID0gMC45OTk5OTk5OTk5OTk7XG4gIH1cbiAgdGhldGEgPSBNYXRoLmFzaW4oYXJnKTtcbiAgdmFyIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIChwLnggLyAoMC45MDAzMTYzMTYxNTggKiB0aGlzLmEgKiBNYXRoLmNvcyh0aGV0YSkpKSk7XG4gIGlmIChsb24gPCAoLU1hdGguUEkpKSB7XG4gICAgbG9uID0gLU1hdGguUEk7XG4gIH1cbiAgaWYgKGxvbiA+IE1hdGguUEkpIHtcbiAgICBsb24gPSBNYXRoLlBJO1xuICB9XG4gIGFyZyA9ICgyICogdGhldGEgKyBNYXRoLnNpbigyICogdGhldGEpKSAvIE1hdGguUEk7XG4gIGlmIChNYXRoLmFicyhhcmcpID4gMSkge1xuICAgIGFyZyA9IDE7XG4gIH1cbiAgdmFyIGxhdCA9IE1hdGguYXNpbihhcmcpO1xuXG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIk1vbGx3ZWlkZVwiLCBcIm1vbGxcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9tb2xsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvbW9sbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1NFQ19UT19SQUR9IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuXG4vKlxuICByZWZlcmVuY2VcbiAgICBEZXBhcnRtZW50IG9mIExhbmQgYW5kIFN1cnZleSBUZWNobmljYWwgQ2lyY3VsYXIgMTk3My8zMlxuICAgICAgaHR0cDovL3d3dy5saW56LmdvdnQubnovZG9jcy9taXNjZWxsYW5lb3VzL256LW1hcC1kZWZpbml0aW9uLnBkZlxuICAgIE9TRyBUZWNobmljYWwgUmVwb3J0IDQuMVxuICAgICAgaHR0cDovL3d3dy5saW56LmdvdnQubnovZG9jcy9taXNjZWxsYW5lb3VzL256bWcucGRmXG4gICovXG5cbi8qKlxuICogaXRlcmF0aW9uczogTnVtYmVyIG9mIGl0ZXJhdGlvbnMgdG8gcmVmaW5lIGludmVyc2UgdHJhbnNmb3JtLlxuICogICAgIDAgLT4ga20gYWNjdXJhY3lcbiAqICAgICAxIC0+IG0gYWNjdXJhY3kgLS0gc3VpdGFibGUgZm9yIG1vc3QgbWFwcGluZyBhcHBsaWNhdGlvbnNcbiAqICAgICAyIC0+IG1tIGFjY3VyYWN5XG4gKi9cbmV4cG9ydCB2YXIgaXRlcmF0aW9ucyA9IDE7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICB0aGlzLkEgPSBbXTtcbiAgdGhpcy5BWzFdID0gMC42Mzk5MTc1MDczO1xuICB0aGlzLkFbMl0gPSAtMC4xMzU4Nzk3NjEzO1xuICB0aGlzLkFbM10gPSAwLjA2MzI5NDQwOTtcbiAgdGhpcy5BWzRdID0gLTAuMDI1MjY4NTM7XG4gIHRoaXMuQVs1XSA9IDAuMDExNzg3OTtcbiAgdGhpcy5BWzZdID0gLTAuMDA1NTE2MTtcbiAgdGhpcy5BWzddID0gMC4wMDI2OTA2O1xuICB0aGlzLkFbOF0gPSAtMC4wMDEzMzM7XG4gIHRoaXMuQVs5XSA9IDAuMDAwNjc7XG4gIHRoaXMuQVsxMF0gPSAtMC4wMDAzNDtcblxuICB0aGlzLkJfcmUgPSBbXTtcbiAgdGhpcy5CX2ltID0gW107XG4gIHRoaXMuQl9yZVsxXSA9IDAuNzU1Nzg1MzIyODtcbiAgdGhpcy5CX2ltWzFdID0gMDtcbiAgdGhpcy5CX3JlWzJdID0gMC4yNDkyMDQ2NDY7XG4gIHRoaXMuQl9pbVsyXSA9IDAuMDAzMzcxNTA3O1xuICB0aGlzLkJfcmVbM10gPSAtMC4wMDE1NDE3Mzk7XG4gIHRoaXMuQl9pbVszXSA9IDAuMDQxMDU4NTYwO1xuICB0aGlzLkJfcmVbNF0gPSAtMC4xMDE2MjkwNztcbiAgdGhpcy5CX2ltWzRdID0gMC4wMTcyNzYwOTtcbiAgdGhpcy5CX3JlWzVdID0gLTAuMjY2MjM0ODk7XG4gIHRoaXMuQl9pbVs1XSA9IC0wLjM2MjQ5MjE4O1xuICB0aGlzLkJfcmVbNl0gPSAtMC42ODcwOTgzO1xuICB0aGlzLkJfaW1bNl0gPSAtMS4xNjUxOTY3O1xuXG4gIHRoaXMuQ19yZSA9IFtdO1xuICB0aGlzLkNfaW0gPSBbXTtcbiAgdGhpcy5DX3JlWzFdID0gMS4zMjMxMjcwNDM5O1xuICB0aGlzLkNfaW1bMV0gPSAwO1xuICB0aGlzLkNfcmVbMl0gPSAtMC41NzcyNDU3ODk7XG4gIHRoaXMuQ19pbVsyXSA9IC0wLjAwNzgwOTU5ODtcbiAgdGhpcy5DX3JlWzNdID0gMC41MDgzMDc1MTM7XG4gIHRoaXMuQ19pbVszXSA9IC0wLjExMjIwODk1MjtcbiAgdGhpcy5DX3JlWzRdID0gLTAuMTUwOTQ3NjI7XG4gIHRoaXMuQ19pbVs0XSA9IDAuMTgyMDA2MDI7XG4gIHRoaXMuQ19yZVs1XSA9IDEuMDE0MTgxNzk7XG4gIHRoaXMuQ19pbVs1XSA9IDEuNjQ0OTc2OTY7XG4gIHRoaXMuQ19yZVs2XSA9IDEuOTY2MDU0OTtcbiAgdGhpcy5DX2ltWzZdID0gMi41MTI3NjQ1O1xuXG4gIHRoaXMuRCA9IFtdO1xuICB0aGlzLkRbMV0gPSAxLjU2MjcwMTQyNDM7XG4gIHRoaXMuRFsyXSA9IDAuNTE4NTQwNjM5ODtcbiAgdGhpcy5EWzNdID0gLTAuMDMzMzMwOTg7XG4gIHRoaXMuRFs0XSA9IC0wLjEwNTI5MDY7XG4gIHRoaXMuRFs1XSA9IC0wLjAzNjg1OTQ7XG4gIHRoaXMuRFs2XSA9IDAuMDA3MzE3O1xuICB0aGlzLkRbN10gPSAwLjAxMjIwO1xuICB0aGlzLkRbOF0gPSAwLjAwMzk0O1xuICB0aGlzLkRbOV0gPSAtMC4wMDEzO1xufVxuXG4vKipcbiAgICBOZXcgWmVhbGFuZCBNYXAgR3JpZCBGb3J3YXJkICAtIGxvbmcvbGF0IHRvIHgveVxuICAgIGxvbmcvbGF0IGluIHJhZGlhbnNcbiAgKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKHApIHtcbiAgdmFyIG47XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG5cbiAgdmFyIGRlbHRhX2xhdCA9IGxhdCAtIHRoaXMubGF0MDtcbiAgdmFyIGRlbHRhX2xvbiA9IGxvbiAtIHRoaXMubG9uZzA7XG5cbiAgLy8gMS4gQ2FsY3VsYXRlIGRfcGhpIGFuZCBkX3BzaSAgICAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBkX2xhbWJkYVxuICAvLyBGb3IgdGhpcyBhbGdvcml0aG0sIGRlbHRhX2xhdGl0dWRlIGlzIGluIHNlY29uZHMgb2YgYXJjIHggMTAtNSwgc28gd2UgbmVlZCB0byBzY2FsZSB0byB0aG9zZSB1bml0cy4gTG9uZ2l0dWRlIGlzIHJhZGlhbnMuXG4gIHZhciBkX3BoaSA9IGRlbHRhX2xhdCAvIFNFQ19UT19SQUQgKiAxRS01O1xuICB2YXIgZF9sYW1iZGEgPSBkZWx0YV9sb247XG4gIHZhciBkX3BoaV9uID0gMTsgLy8gZF9waGleMFxuXG4gIHZhciBkX3BzaSA9IDA7XG4gIGZvciAobiA9IDE7IG4gPD0gMTA7IG4rKykge1xuICAgIGRfcGhpX24gPSBkX3BoaV9uICogZF9waGk7XG4gICAgZF9wc2kgPSBkX3BzaSArIHRoaXMuQVtuXSAqIGRfcGhpX247XG4gIH1cblxuICAvLyAyLiBDYWxjdWxhdGUgdGhldGFcbiAgdmFyIHRoX3JlID0gZF9wc2k7XG4gIHZhciB0aF9pbSA9IGRfbGFtYmRhO1xuXG4gIC8vIDMuIENhbGN1bGF0ZSB6XG4gIHZhciB0aF9uX3JlID0gMTtcbiAgdmFyIHRoX25faW0gPSAwOyAvLyB0aGV0YV4wXG4gIHZhciB0aF9uX3JlMTtcbiAgdmFyIHRoX25faW0xO1xuXG4gIHZhciB6X3JlID0gMDtcbiAgdmFyIHpfaW0gPSAwO1xuICBmb3IgKG4gPSAxOyBuIDw9IDY7IG4rKykge1xuICAgIHRoX25fcmUxID0gdGhfbl9yZSAqIHRoX3JlIC0gdGhfbl9pbSAqIHRoX2ltO1xuICAgIHRoX25faW0xID0gdGhfbl9pbSAqIHRoX3JlICsgdGhfbl9yZSAqIHRoX2ltO1xuICAgIHRoX25fcmUgPSB0aF9uX3JlMTtcbiAgICB0aF9uX2ltID0gdGhfbl9pbTE7XG4gICAgel9yZSA9IHpfcmUgKyB0aGlzLkJfcmVbbl0gKiB0aF9uX3JlIC0gdGhpcy5CX2ltW25dICogdGhfbl9pbTtcbiAgICB6X2ltID0gel9pbSArIHRoaXMuQl9pbVtuXSAqIHRoX25fcmUgKyB0aGlzLkJfcmVbbl0gKiB0aF9uX2ltO1xuICB9XG5cbiAgLy8gNC4gQ2FsY3VsYXRlIGVhc3RpbmcgYW5kIG5vcnRoaW5nXG4gIHAueCA9ICh6X2ltICogdGhpcy5hKSArIHRoaXMueDA7XG4gIHAueSA9ICh6X3JlICogdGhpcy5hKSArIHRoaXMueTA7XG5cbiAgcmV0dXJuIHA7XG59XG5cbi8qKlxuICAgIE5ldyBaZWFsYW5kIE1hcCBHcmlkIEludmVyc2UgIC0gIHgveSB0byBsb25nL2xhdFxuICAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuICB2YXIgbjtcbiAgdmFyIHggPSBwLng7XG4gIHZhciB5ID0gcC55O1xuXG4gIHZhciBkZWx0YV94ID0geCAtIHRoaXMueDA7XG4gIHZhciBkZWx0YV95ID0geSAtIHRoaXMueTA7XG5cbiAgLy8gMS4gQ2FsY3VsYXRlIHpcbiAgdmFyIHpfcmUgPSBkZWx0YV95IC8gdGhpcy5hO1xuICB2YXIgel9pbSA9IGRlbHRhX3ggLyB0aGlzLmE7XG5cbiAgLy8gMmEuIENhbGN1bGF0ZSB0aGV0YSAtIGZpcnN0IGFwcHJveGltYXRpb24gZ2l2ZXMga20gYWNjdXJhY3lcbiAgdmFyIHpfbl9yZSA9IDE7XG4gIHZhciB6X25faW0gPSAwOyAvLyB6XjBcbiAgdmFyIHpfbl9yZTE7XG4gIHZhciB6X25faW0xO1xuXG4gIHZhciB0aF9yZSA9IDA7XG4gIHZhciB0aF9pbSA9IDA7XG4gIGZvciAobiA9IDE7IG4gPD0gNjsgbisrKSB7XG4gICAgel9uX3JlMSA9IHpfbl9yZSAqIHpfcmUgLSB6X25faW0gKiB6X2ltO1xuICAgIHpfbl9pbTEgPSB6X25faW0gKiB6X3JlICsgel9uX3JlICogel9pbTtcbiAgICB6X25fcmUgPSB6X25fcmUxO1xuICAgIHpfbl9pbSA9IHpfbl9pbTE7XG4gICAgdGhfcmUgPSB0aF9yZSArIHRoaXMuQ19yZVtuXSAqIHpfbl9yZSAtIHRoaXMuQ19pbVtuXSAqIHpfbl9pbTtcbiAgICB0aF9pbSA9IHRoX2ltICsgdGhpcy5DX2ltW25dICogel9uX3JlICsgdGhpcy5DX3JlW25dICogel9uX2ltO1xuICB9XG5cbiAgLy8gMmIuIEl0ZXJhdGUgdG8gcmVmaW5lIHRoZSBhY2N1cmFjeSBvZiB0aGUgY2FsY3VsYXRpb25cbiAgLy8gICAgICAgIDAgaXRlcmF0aW9ucyBnaXZlcyBrbSBhY2N1cmFjeVxuICAvLyAgICAgICAgMSBpdGVyYXRpb24gZ2l2ZXMgbSBhY2N1cmFjeSAtLSBnb29kIGVub3VnaCBmb3IgbW9zdCBtYXBwaW5nIGFwcGxpY2F0aW9uc1xuICAvLyAgICAgICAgMiBpdGVyYXRpb25zIGJpdmVzIG1tIGFjY3VyYWN5XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVyYXRpb25zOyBpKyspIHtcbiAgICB2YXIgdGhfbl9yZSA9IHRoX3JlO1xuICAgIHZhciB0aF9uX2ltID0gdGhfaW07XG4gICAgdmFyIHRoX25fcmUxO1xuICAgIHZhciB0aF9uX2ltMTtcblxuICAgIHZhciBudW1fcmUgPSB6X3JlO1xuICAgIHZhciBudW1faW0gPSB6X2ltO1xuICAgIGZvciAobiA9IDI7IG4gPD0gNjsgbisrKSB7XG4gICAgICB0aF9uX3JlMSA9IHRoX25fcmUgKiB0aF9yZSAtIHRoX25faW0gKiB0aF9pbTtcbiAgICAgIHRoX25faW0xID0gdGhfbl9pbSAqIHRoX3JlICsgdGhfbl9yZSAqIHRoX2ltO1xuICAgICAgdGhfbl9yZSA9IHRoX25fcmUxO1xuICAgICAgdGhfbl9pbSA9IHRoX25faW0xO1xuICAgICAgbnVtX3JlID0gbnVtX3JlICsgKG4gLSAxKSAqICh0aGlzLkJfcmVbbl0gKiB0aF9uX3JlIC0gdGhpcy5CX2ltW25dICogdGhfbl9pbSk7XG4gICAgICBudW1faW0gPSBudW1faW0gKyAobiAtIDEpICogKHRoaXMuQl9pbVtuXSAqIHRoX25fcmUgKyB0aGlzLkJfcmVbbl0gKiB0aF9uX2ltKTtcbiAgICB9XG5cbiAgICB0aF9uX3JlID0gMTtcbiAgICB0aF9uX2ltID0gMDtcbiAgICB2YXIgZGVuX3JlID0gdGhpcy5CX3JlWzFdO1xuICAgIHZhciBkZW5faW0gPSB0aGlzLkJfaW1bMV07XG4gICAgZm9yIChuID0gMjsgbiA8PSA2OyBuKyspIHtcbiAgICAgIHRoX25fcmUxID0gdGhfbl9yZSAqIHRoX3JlIC0gdGhfbl9pbSAqIHRoX2ltO1xuICAgICAgdGhfbl9pbTEgPSB0aF9uX2ltICogdGhfcmUgKyB0aF9uX3JlICogdGhfaW07XG4gICAgICB0aF9uX3JlID0gdGhfbl9yZTE7XG4gICAgICB0aF9uX2ltID0gdGhfbl9pbTE7XG4gICAgICBkZW5fcmUgPSBkZW5fcmUgKyBuICogKHRoaXMuQl9yZVtuXSAqIHRoX25fcmUgLSB0aGlzLkJfaW1bbl0gKiB0aF9uX2ltKTtcbiAgICAgIGRlbl9pbSA9IGRlbl9pbSArIG4gKiAodGhpcy5CX2ltW25dICogdGhfbl9yZSArIHRoaXMuQl9yZVtuXSAqIHRoX25faW0pO1xuICAgIH1cblxuICAgIC8vIENvbXBsZXggZGl2aXNpb25cbiAgICB2YXIgZGVuMiA9IGRlbl9yZSAqIGRlbl9yZSArIGRlbl9pbSAqIGRlbl9pbTtcbiAgICB0aF9yZSA9IChudW1fcmUgKiBkZW5fcmUgKyBudW1faW0gKiBkZW5faW0pIC8gZGVuMjtcbiAgICB0aF9pbSA9IChudW1faW0gKiBkZW5fcmUgLSBudW1fcmUgKiBkZW5faW0pIC8gZGVuMjtcbiAgfVxuXG4gIC8vIDMuIENhbGN1bGF0ZSBkX3BoaSAgICAgICAgICAgICAgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGRfbGFtYmRhXG4gIHZhciBkX3BzaSA9IHRoX3JlO1xuICB2YXIgZF9sYW1iZGEgPSB0aF9pbTtcbiAgdmFyIGRfcHNpX24gPSAxOyAvLyBkX3BzaV4wXG5cbiAgdmFyIGRfcGhpID0gMDtcbiAgZm9yIChuID0gMTsgbiA8PSA5OyBuKyspIHtcbiAgICBkX3BzaV9uID0gZF9wc2lfbiAqIGRfcHNpO1xuICAgIGRfcGhpID0gZF9waGkgKyB0aGlzLkRbbl0gKiBkX3BzaV9uO1xuICB9XG5cbiAgLy8gNC4gQ2FsY3VsYXRlIGxhdGl0dWRlIGFuZCBsb25naXR1ZGVcbiAgLy8gZF9waGkgaXMgY2FsY3VhdGVkIGluIHNlY29uZCBvZiBhcmMgKiAxMF4tNSwgc28gd2UgbmVlZCB0byBzY2FsZSBiYWNrIHRvIHJhZGlhbnMuIGRfbGFtYmRhIGlzIGluIHJhZGlhbnMuXG4gIHZhciBsYXQgPSB0aGlzLmxhdDAgKyAoZF9waGkgKiBTRUNfVE9fUkFEICogMUU1KTtcbiAgdmFyIGxvbiA9IHRoaXMubG9uZzAgKyBkX2xhbWJkYTtcblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcblxuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIk5ld19aZWFsYW5kX01hcF9HcmlkXCIsIFwibnptZ1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL256bWcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9uem1nLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB0c2ZueiBmcm9tICcuLi9jb21tb24vdHNmbnonO1xuaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuaW1wb3J0IHBoaTJ6IGZyb20gJy4uL2NvbW1vbi9waGkyeic7XG5pbXBvcnQge0VQU0xOLCBIQUxGX1BJLCBGT1JUUEl9IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuXG4vKiBJbml0aWFsaXplIHRoZSBPYmxpcXVlIE1lcmNhdG9yICBwcm9qZWN0aW9uXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICB0aGlzLm5vX29mZiA9IHRoaXMubm9fb2ZmIHx8IGZhbHNlO1xuICB0aGlzLm5vX3JvdCA9IHRoaXMubm9fcm90IHx8IGZhbHNlO1xuXG4gIGlmIChpc05hTih0aGlzLmswKSkge1xuICAgIHRoaXMuazAgPSAxO1xuICB9XG4gIHZhciBzaW5sYXQgPSBNYXRoLnNpbih0aGlzLmxhdDApO1xuICB2YXIgY29zbGF0ID0gTWF0aC5jb3ModGhpcy5sYXQwKTtcbiAgdmFyIGNvbiA9IHRoaXMuZSAqIHNpbmxhdDtcblxuICB0aGlzLmJsID0gTWF0aC5zcXJ0KDEgKyB0aGlzLmVzIC8gKDEgLSB0aGlzLmVzKSAqIE1hdGgucG93KGNvc2xhdCwgNCkpO1xuICB0aGlzLmFsID0gdGhpcy5hICogdGhpcy5ibCAqIHRoaXMuazAgKiBNYXRoLnNxcnQoMSAtIHRoaXMuZXMpIC8gKDEgLSBjb24gKiBjb24pO1xuICB2YXIgdDAgPSB0c2Zueih0aGlzLmUsIHRoaXMubGF0MCwgc2lubGF0KTtcbiAgdmFyIGRsID0gdGhpcy5ibCAvIGNvc2xhdCAqIE1hdGguc3FydCgoMSAtIHRoaXMuZXMpIC8gKDEgLSBjb24gKiBjb24pKTtcbiAgaWYgKGRsICogZGwgPCAxKSB7XG4gICAgZGwgPSAxO1xuICB9XG4gIHZhciBmbDtcbiAgdmFyIGdsO1xuICBpZiAoIWlzTmFOKHRoaXMubG9uZ2MpKSB7XG4gICAgLy9DZW50cmFsIHBvaW50IGFuZCBhemltdXRoIG1ldGhvZFxuXG4gICAgaWYgKHRoaXMubGF0MCA+PSAwKSB7XG4gICAgICBmbCA9IGRsICsgTWF0aC5zcXJ0KGRsICogZGwgLSAxKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBmbCA9IGRsIC0gTWF0aC5zcXJ0KGRsICogZGwgLSAxKTtcbiAgICB9XG4gICAgdGhpcy5lbCA9IGZsICogTWF0aC5wb3codDAsIHRoaXMuYmwpO1xuICAgIGdsID0gMC41ICogKGZsIC0gMSAvIGZsKTtcbiAgICB0aGlzLmdhbW1hMCA9IE1hdGguYXNpbihNYXRoLnNpbih0aGlzLmFscGhhKSAvIGRsKTtcbiAgICB0aGlzLmxvbmcwID0gdGhpcy5sb25nYyAtIE1hdGguYXNpbihnbCAqIE1hdGgudGFuKHRoaXMuZ2FtbWEwKSkgLyB0aGlzLmJsO1xuXG4gIH1cbiAgZWxzZSB7XG4gICAgLy8yIHBvaW50cyBtZXRob2RcbiAgICB2YXIgdDEgPSB0c2Zueih0aGlzLmUsIHRoaXMubGF0MSwgTWF0aC5zaW4odGhpcy5sYXQxKSk7XG4gICAgdmFyIHQyID0gdHNmbnoodGhpcy5lLCB0aGlzLmxhdDIsIE1hdGguc2luKHRoaXMubGF0MikpO1xuICAgIGlmICh0aGlzLmxhdDAgPj0gMCkge1xuICAgICAgdGhpcy5lbCA9IChkbCArIE1hdGguc3FydChkbCAqIGRsIC0gMSkpICogTWF0aC5wb3codDAsIHRoaXMuYmwpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZWwgPSAoZGwgLSBNYXRoLnNxcnQoZGwgKiBkbCAtIDEpKSAqIE1hdGgucG93KHQwLCB0aGlzLmJsKTtcbiAgICB9XG4gICAgdmFyIGhsID0gTWF0aC5wb3codDEsIHRoaXMuYmwpO1xuICAgIHZhciBsbCA9IE1hdGgucG93KHQyLCB0aGlzLmJsKTtcbiAgICBmbCA9IHRoaXMuZWwgLyBobDtcbiAgICBnbCA9IDAuNSAqIChmbCAtIDEgLyBmbCk7XG4gICAgdmFyIGpsID0gKHRoaXMuZWwgKiB0aGlzLmVsIC0gbGwgKiBobCkgLyAodGhpcy5lbCAqIHRoaXMuZWwgKyBsbCAqIGhsKTtcbiAgICB2YXIgcGwgPSAobGwgLSBobCkgLyAobGwgKyBobCk7XG4gICAgdmFyIGRsb24xMiA9IGFkanVzdF9sb24odGhpcy5sb25nMSAtIHRoaXMubG9uZzIpO1xuICAgIHRoaXMubG9uZzAgPSAwLjUgKiAodGhpcy5sb25nMSArIHRoaXMubG9uZzIpIC0gTWF0aC5hdGFuKGpsICogTWF0aC50YW4oMC41ICogdGhpcy5ibCAqIChkbG9uMTIpKSAvIHBsKSAvIHRoaXMuYmw7XG4gICAgdGhpcy5sb25nMCA9IGFkanVzdF9sb24odGhpcy5sb25nMCk7XG4gICAgdmFyIGRsb24xMCA9IGFkanVzdF9sb24odGhpcy5sb25nMSAtIHRoaXMubG9uZzApO1xuICAgIHRoaXMuZ2FtbWEwID0gTWF0aC5hdGFuKE1hdGguc2luKHRoaXMuYmwgKiAoZGxvbjEwKSkgLyBnbCk7XG4gICAgdGhpcy5hbHBoYSA9IE1hdGguYXNpbihkbCAqIE1hdGguc2luKHRoaXMuZ2FtbWEwKSk7XG4gIH1cblxuICBpZiAodGhpcy5ub19vZmYpIHtcbiAgICB0aGlzLnVjID0gMDtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAodGhpcy5sYXQwID49IDApIHtcbiAgICAgIHRoaXMudWMgPSB0aGlzLmFsIC8gdGhpcy5ibCAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGRsICogZGwgLSAxKSwgTWF0aC5jb3ModGhpcy5hbHBoYSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMudWMgPSAtMSAqIHRoaXMuYWwgLyB0aGlzLmJsICogTWF0aC5hdGFuMihNYXRoLnNxcnQoZGwgKiBkbCAtIDEpLCBNYXRoLmNvcyh0aGlzLmFscGhhKSk7XG4gICAgfVxuICB9XG5cbn1cblxuLyogT2JsaXF1ZSBNZXJjYXRvciBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKHApIHtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcbiAgdmFyIGRsb24gPSBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICB2YXIgdXMsIHZzO1xuICB2YXIgY29uO1xuICBpZiAoTWF0aC5hYnMoTWF0aC5hYnMobGF0KSAtIEhBTEZfUEkpIDw9IEVQU0xOKSB7XG4gICAgaWYgKGxhdCA+IDApIHtcbiAgICAgIGNvbiA9IC0xO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbiA9IDE7XG4gICAgfVxuICAgIHZzID0gdGhpcy5hbCAvIHRoaXMuYmwgKiBNYXRoLmxvZyhNYXRoLnRhbihGT1JUUEkgKyBjb24gKiB0aGlzLmdhbW1hMCAqIDAuNSkpO1xuICAgIHVzID0gLTEgKiBjb24gKiBIQUxGX1BJICogdGhpcy5hbCAvIHRoaXMuYmw7XG4gIH1cbiAgZWxzZSB7XG4gICAgdmFyIHQgPSB0c2Zueih0aGlzLmUsIGxhdCwgTWF0aC5zaW4obGF0KSk7XG4gICAgdmFyIHFsID0gdGhpcy5lbCAvIE1hdGgucG93KHQsIHRoaXMuYmwpO1xuICAgIHZhciBzbCA9IDAuNSAqIChxbCAtIDEgLyBxbCk7XG4gICAgdmFyIHRsID0gMC41ICogKHFsICsgMSAvIHFsKTtcbiAgICB2YXIgdmwgPSBNYXRoLnNpbih0aGlzLmJsICogKGRsb24pKTtcbiAgICB2YXIgdWwgPSAoc2wgKiBNYXRoLnNpbih0aGlzLmdhbW1hMCkgLSB2bCAqIE1hdGguY29zKHRoaXMuZ2FtbWEwKSkgLyB0bDtcbiAgICBpZiAoTWF0aC5hYnMoTWF0aC5hYnModWwpIC0gMSkgPD0gRVBTTE4pIHtcbiAgICAgIHZzID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZzID0gMC41ICogdGhpcy5hbCAqIE1hdGgubG9nKCgxIC0gdWwpIC8gKDEgKyB1bCkpIC8gdGhpcy5ibDtcbiAgICB9XG4gICAgaWYgKE1hdGguYWJzKE1hdGguY29zKHRoaXMuYmwgKiAoZGxvbikpKSA8PSBFUFNMTikge1xuICAgICAgdXMgPSB0aGlzLmFsICogdGhpcy5ibCAqIChkbG9uKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB1cyA9IHRoaXMuYWwgKiBNYXRoLmF0YW4yKHNsICogTWF0aC5jb3ModGhpcy5nYW1tYTApICsgdmwgKiBNYXRoLnNpbih0aGlzLmdhbW1hMCksIE1hdGguY29zKHRoaXMuYmwgKiBkbG9uKSkgLyB0aGlzLmJsO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzLm5vX3JvdCkge1xuICAgIHAueCA9IHRoaXMueDAgKyB1cztcbiAgICBwLnkgPSB0aGlzLnkwICsgdnM7XG4gIH1cbiAgZWxzZSB7XG5cbiAgICB1cyAtPSB0aGlzLnVjO1xuICAgIHAueCA9IHRoaXMueDAgKyB2cyAqIE1hdGguY29zKHRoaXMuYWxwaGEpICsgdXMgKiBNYXRoLnNpbih0aGlzLmFscGhhKTtcbiAgICBwLnkgPSB0aGlzLnkwICsgdXMgKiBNYXRoLmNvcyh0aGlzLmFscGhhKSAtIHZzICogTWF0aC5zaW4odGhpcy5hbHBoYSk7XG4gIH1cbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgdmFyIHVzLCB2cztcbiAgaWYgKHRoaXMubm9fcm90KSB7XG4gICAgdnMgPSBwLnkgLSB0aGlzLnkwO1xuICAgIHVzID0gcC54IC0gdGhpcy54MDtcbiAgfVxuICBlbHNlIHtcbiAgICB2cyA9IChwLnggLSB0aGlzLngwKSAqIE1hdGguY29zKHRoaXMuYWxwaGEpIC0gKHAueSAtIHRoaXMueTApICogTWF0aC5zaW4odGhpcy5hbHBoYSk7XG4gICAgdXMgPSAocC55IC0gdGhpcy55MCkgKiBNYXRoLmNvcyh0aGlzLmFscGhhKSArIChwLnggLSB0aGlzLngwKSAqIE1hdGguc2luKHRoaXMuYWxwaGEpO1xuICAgIHVzICs9IHRoaXMudWM7XG4gIH1cbiAgdmFyIHFwID0gTWF0aC5leHAoLTEgKiB0aGlzLmJsICogdnMgLyB0aGlzLmFsKTtcbiAgdmFyIHNwID0gMC41ICogKHFwIC0gMSAvIHFwKTtcbiAgdmFyIHRwID0gMC41ICogKHFwICsgMSAvIHFwKTtcbiAgdmFyIHZwID0gTWF0aC5zaW4odGhpcy5ibCAqIHVzIC8gdGhpcy5hbCk7XG4gIHZhciB1cCA9ICh2cCAqIE1hdGguY29zKHRoaXMuZ2FtbWEwKSArIHNwICogTWF0aC5zaW4odGhpcy5nYW1tYTApKSAvIHRwO1xuICB2YXIgdHMgPSBNYXRoLnBvdyh0aGlzLmVsIC8gTWF0aC5zcXJ0KCgxICsgdXApIC8gKDEgLSB1cCkpLCAxIC8gdGhpcy5ibCk7XG4gIGlmIChNYXRoLmFicyh1cCAtIDEpIDwgRVBTTE4pIHtcbiAgICBwLnggPSB0aGlzLmxvbmcwO1xuICAgIHAueSA9IEhBTEZfUEk7XG4gIH1cbiAgZWxzZSBpZiAoTWF0aC5hYnModXAgKyAxKSA8IEVQU0xOKSB7XG4gICAgcC54ID0gdGhpcy5sb25nMDtcbiAgICBwLnkgPSAtMSAqIEhBTEZfUEk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcC55ID0gcGhpMnoodGhpcy5lLCB0cyk7XG4gICAgcC54ID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwIC0gTWF0aC5hdGFuMihzcCAqIE1hdGguY29zKHRoaXMuZ2FtbWEwKSAtIHZwICogTWF0aC5zaW4odGhpcy5nYW1tYTApLCBNYXRoLmNvcyh0aGlzLmJsICogdXMgLyB0aGlzLmFsKSkgLyB0aGlzLmJsKTtcbiAgfVxuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIkhvdGluZV9PYmxpcXVlX01lcmNhdG9yXCIsIFwiSG90aW5lIE9ibGlxdWUgTWVyY2F0b3JcIiwgXCJIb3RpbmVfT2JsaXF1ZV9NZXJjYXRvcl9BemltdXRoX05hdHVyYWxfT3JpZ2luXCIsIFwiSG90aW5lX09ibGlxdWVfTWVyY2F0b3JfQXppbXV0aF9DZW50ZXJcIiwgXCJvbWVyY1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL29tZXJjLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvb21lcmMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuaW1wb3J0IGFzaW56IGZyb20gJy4uL2NvbW1vbi9hc2lueic7XG5pbXBvcnQge0VQU0xOLCBIQUxGX1BJfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vZG91YmxlIHRlbXA7ICAgICAgLyogdGVtcG9yYXJ5IHZhcmlhYmxlICAgICovXG5cbiAgLyogUGxhY2UgcGFyYW1ldGVycyBpbiBzdGF0aWMgc3RvcmFnZSBmb3IgY29tbW9uIHVzZVxuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIHRoaXMuc2luX3AxNCA9IE1hdGguc2luKHRoaXMubGF0MCk7XG4gIHRoaXMuY29zX3AxNCA9IE1hdGguY29zKHRoaXMubGF0MCk7XG59XG5cbi8qIE9ydGhvZ3JhcGhpYyBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgc2lucGhpLCBjb3NwaGk7IC8qIHNpbiBhbmQgY29zIHZhbHVlICAgICAgICAqL1xuICB2YXIgZGxvbjsgLyogZGVsdGEgbG9uZ2l0dWRlIHZhbHVlICAgICAgKi9cbiAgdmFyIGNvc2xvbjsgLyogY29zIG9mIGxvbmdpdHVkZSAgICAgICAgKi9cbiAgdmFyIGtzcDsgLyogc2NhbGUgZmFjdG9yICAgICAgICAgICovXG4gIHZhciBnLCB4LCB5O1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuICAvKiBGb3J3YXJkIGVxdWF0aW9uc1xuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBkbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcblxuICBzaW5waGkgPSBNYXRoLnNpbihsYXQpO1xuICBjb3NwaGkgPSBNYXRoLmNvcyhsYXQpO1xuXG4gIGNvc2xvbiA9IE1hdGguY29zKGRsb24pO1xuICBnID0gdGhpcy5zaW5fcDE0ICogc2lucGhpICsgdGhpcy5jb3NfcDE0ICogY29zcGhpICogY29zbG9uO1xuICBrc3AgPSAxO1xuICBpZiAoKGcgPiAwKSB8fCAoTWF0aC5hYnMoZykgPD0gRVBTTE4pKSB7XG4gICAgeCA9IHRoaXMuYSAqIGtzcCAqIGNvc3BoaSAqIE1hdGguc2luKGRsb24pO1xuICAgIHkgPSB0aGlzLnkwICsgdGhpcy5hICoga3NwICogKHRoaXMuY29zX3AxNCAqIHNpbnBoaSAtIHRoaXMuc2luX3AxNCAqIGNvc3BoaSAqIGNvc2xvbik7XG4gIH1cbiAgcC54ID0geDtcbiAgcC55ID0geTtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgdmFyIHJoOyAvKiBoZWlnaHQgYWJvdmUgZWxsaXBzb2lkICAgICAgKi9cbiAgdmFyIHo7IC8qIGFuZ2xlICAgICAgICAgICovXG4gIHZhciBzaW56LCBjb3N6OyAvKiBzaW4gb2YgeiBhbmQgY29zIG9mIHogICAgICAqL1xuICB2YXIgY29uO1xuICB2YXIgbG9uLCBsYXQ7XG4gIC8qIEludmVyc2UgZXF1YXRpb25zXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIHAueCAtPSB0aGlzLngwO1xuICBwLnkgLT0gdGhpcy55MDtcbiAgcmggPSBNYXRoLnNxcnQocC54ICogcC54ICsgcC55ICogcC55KTtcbiAgeiA9IGFzaW56KHJoIC8gdGhpcy5hKTtcblxuICBzaW56ID0gTWF0aC5zaW4oeik7XG4gIGNvc3ogPSBNYXRoLmNvcyh6KTtcblxuICBsb24gPSB0aGlzLmxvbmcwO1xuICBpZiAoTWF0aC5hYnMocmgpIDw9IEVQU0xOKSB7XG4gICAgbGF0ID0gdGhpcy5sYXQwO1xuICAgIHAueCA9IGxvbjtcbiAgICBwLnkgPSBsYXQ7XG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgbGF0ID0gYXNpbnooY29zeiAqIHRoaXMuc2luX3AxNCArIChwLnkgKiBzaW56ICogdGhpcy5jb3NfcDE0KSAvIHJoKTtcbiAgY29uID0gTWF0aC5hYnModGhpcy5sYXQwKSAtIEhBTEZfUEk7XG4gIGlmIChNYXRoLmFicyhjb24pIDw9IEVQU0xOKSB7XG4gICAgaWYgKHRoaXMubGF0MCA+PSAwKSB7XG4gICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBNYXRoLmF0YW4yKHAueCwgLSBwLnkpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgLSBNYXRoLmF0YW4yKC1wLngsIHAueSkpO1xuICAgIH1cbiAgICBwLnggPSBsb247XG4gICAgcC55ID0gbGF0O1xuICAgIHJldHVybiBwO1xuICB9XG4gIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIE1hdGguYXRhbjIoKHAueCAqIHNpbnopLCByaCAqIHRoaXMuY29zX3AxNCAqIGNvc3ogLSBwLnkgKiB0aGlzLnNpbl9wMTQgKiBzaW56KSk7XG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIm9ydGhvXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvb3J0aG8uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9vcnRoby5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZTBmbiBmcm9tICcuLi9jb21tb24vZTBmbic7XG5pbXBvcnQgZTFmbiBmcm9tICcuLi9jb21tb24vZTFmbic7XG5pbXBvcnQgZTJmbiBmcm9tICcuLi9jb21tb24vZTJmbic7XG5pbXBvcnQgZTNmbiBmcm9tICcuLi9jb21tb24vZTNmbic7XG5pbXBvcnQgYWRqdXN0X2xvbiBmcm9tICcuLi9jb21tb24vYWRqdXN0X2xvbic7XG5pbXBvcnQgYWRqdXN0X2xhdCBmcm9tICcuLi9jb21tb24vYWRqdXN0X2xhdCc7XG5pbXBvcnQgbWxmbiBmcm9tICcuLi9jb21tb24vbWxmbic7XG5pbXBvcnQge0VQU0xOfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuaW1wb3J0IGdOIGZyb20gJy4uL2NvbW1vbi9nTic7XG52YXIgTUFYX0lURVIgPSAyMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIC8qIFBsYWNlIHBhcmFtZXRlcnMgaW4gc3RhdGljIHN0b3JhZ2UgZm9yIGNvbW1vbiB1c2VcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICB0aGlzLnRlbXAgPSB0aGlzLmIgLyB0aGlzLmE7XG4gIHRoaXMuZXMgPSAxIC0gTWF0aC5wb3codGhpcy50ZW1wLCAyKTsgLy8gZGV2YWl0IGV0cmUgZGFucyB0bWVyYy5qcyBtYWlzIG4geSBlc3QgcGFzIGRvbmMgamUgY29tbWVudGUgc2lub24gcmV0b3VyIGRlIHZhbGV1cnMgbnVsbGVzXG4gIHRoaXMuZSA9IE1hdGguc3FydCh0aGlzLmVzKTtcbiAgdGhpcy5lMCA9IGUwZm4odGhpcy5lcyk7XG4gIHRoaXMuZTEgPSBlMWZuKHRoaXMuZXMpO1xuICB0aGlzLmUyID0gZTJmbih0aGlzLmVzKTtcbiAgdGhpcy5lMyA9IGUzZm4odGhpcy5lcyk7XG4gIHRoaXMubWwwID0gdGhpcy5hICogbWxmbih0aGlzLmUwLCB0aGlzLmUxLCB0aGlzLmUyLCB0aGlzLmUzLCB0aGlzLmxhdDApOyAvL3NpIHF1ZSBkZXMgemVyb3MgbGUgY2FsY3VsIG5lIHNlIGZhaXQgcGFzXG59XG5cbi8qIFBvbHljb25pYyBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuICB2YXIgeCwgeSwgZWw7XG4gIHZhciBkbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgZWwgPSBkbG9uICogTWF0aC5zaW4obGF0KTtcbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgaWYgKE1hdGguYWJzKGxhdCkgPD0gRVBTTE4pIHtcbiAgICAgIHggPSB0aGlzLmEgKiBkbG9uO1xuICAgICAgeSA9IC0xICogdGhpcy5hICogdGhpcy5sYXQwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHggPSB0aGlzLmEgKiBNYXRoLnNpbihlbCkgLyBNYXRoLnRhbihsYXQpO1xuICAgICAgeSA9IHRoaXMuYSAqIChhZGp1c3RfbGF0KGxhdCAtIHRoaXMubGF0MCkgKyAoMSAtIE1hdGguY29zKGVsKSkgLyBNYXRoLnRhbihsYXQpKTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKE1hdGguYWJzKGxhdCkgPD0gRVBTTE4pIHtcbiAgICAgIHggPSB0aGlzLmEgKiBkbG9uO1xuICAgICAgeSA9IC0xICogdGhpcy5tbDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5sID0gZ04odGhpcy5hLCB0aGlzLmUsIE1hdGguc2luKGxhdCkpIC8gTWF0aC50YW4obGF0KTtcbiAgICAgIHggPSBubCAqIE1hdGguc2luKGVsKTtcbiAgICAgIHkgPSB0aGlzLmEgKiBtbGZuKHRoaXMuZTAsIHRoaXMuZTEsIHRoaXMuZTIsIHRoaXMuZTMsIGxhdCkgLSB0aGlzLm1sMCArIG5sICogKDEgLSBNYXRoLmNvcyhlbCkpO1xuICAgIH1cblxuICB9XG4gIHAueCA9IHggKyB0aGlzLngwO1xuICBwLnkgPSB5ICsgdGhpcy55MDtcbiAgcmV0dXJuIHA7XG59XG5cbi8qIEludmVyc2UgZXF1YXRpb25zXG4gIC0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgdmFyIGxvbiwgbGF0LCB4LCB5LCBpO1xuICB2YXIgYWwsIGJsO1xuICB2YXIgcGhpLCBkcGhpO1xuICB4ID0gcC54IC0gdGhpcy54MDtcbiAgeSA9IHAueSAtIHRoaXMueTA7XG5cbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgaWYgKE1hdGguYWJzKHkgKyB0aGlzLmEgKiB0aGlzLmxhdDApIDw9IEVQU0xOKSB7XG4gICAgICBsb24gPSBhZGp1c3RfbG9uKHggLyB0aGlzLmEgKyB0aGlzLmxvbmcwKTtcbiAgICAgIGxhdCA9IDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYWwgPSB0aGlzLmxhdDAgKyB5IC8gdGhpcy5hO1xuICAgICAgYmwgPSB4ICogeCAvIHRoaXMuYSAvIHRoaXMuYSArIGFsICogYWw7XG4gICAgICBwaGkgPSBhbDtcbiAgICAgIHZhciB0YW5waGk7XG4gICAgICBmb3IgKGkgPSBNQVhfSVRFUjsgaTsgLS1pKSB7XG4gICAgICAgIHRhbnBoaSA9IE1hdGgudGFuKHBoaSk7XG4gICAgICAgIGRwaGkgPSAtMSAqIChhbCAqIChwaGkgKiB0YW5waGkgKyAxKSAtIHBoaSAtIDAuNSAqIChwaGkgKiBwaGkgKyBibCkgKiB0YW5waGkpIC8gKChwaGkgLSBhbCkgLyB0YW5waGkgLSAxKTtcbiAgICAgICAgcGhpICs9IGRwaGk7XG4gICAgICAgIGlmIChNYXRoLmFicyhkcGhpKSA8PSBFUFNMTikge1xuICAgICAgICAgIGxhdCA9IHBoaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgKE1hdGguYXNpbih4ICogTWF0aC50YW4ocGhpKSAvIHRoaXMuYSkpIC8gTWF0aC5zaW4obGF0KSk7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGlmIChNYXRoLmFicyh5ICsgdGhpcy5tbDApIDw9IEVQU0xOKSB7XG4gICAgICBsYXQgPSAwO1xuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgeCAvIHRoaXMuYSk7XG4gICAgfVxuICAgIGVsc2Uge1xuXG4gICAgICBhbCA9ICh0aGlzLm1sMCArIHkpIC8gdGhpcy5hO1xuICAgICAgYmwgPSB4ICogeCAvIHRoaXMuYSAvIHRoaXMuYSArIGFsICogYWw7XG4gICAgICBwaGkgPSBhbDtcbiAgICAgIHZhciBjbCwgbWxuLCBtbG5wLCBtYTtcbiAgICAgIHZhciBjb247XG4gICAgICBmb3IgKGkgPSBNQVhfSVRFUjsgaTsgLS1pKSB7XG4gICAgICAgIGNvbiA9IHRoaXMuZSAqIE1hdGguc2luKHBoaSk7XG4gICAgICAgIGNsID0gTWF0aC5zcXJ0KDEgLSBjb24gKiBjb24pICogTWF0aC50YW4ocGhpKTtcbiAgICAgICAgbWxuID0gdGhpcy5hICogbWxmbih0aGlzLmUwLCB0aGlzLmUxLCB0aGlzLmUyLCB0aGlzLmUzLCBwaGkpO1xuICAgICAgICBtbG5wID0gdGhpcy5lMCAtIDIgKiB0aGlzLmUxICogTWF0aC5jb3MoMiAqIHBoaSkgKyA0ICogdGhpcy5lMiAqIE1hdGguY29zKDQgKiBwaGkpIC0gNiAqIHRoaXMuZTMgKiBNYXRoLmNvcyg2ICogcGhpKTtcbiAgICAgICAgbWEgPSBtbG4gLyB0aGlzLmE7XG4gICAgICAgIGRwaGkgPSAoYWwgKiAoY2wgKiBtYSArIDEpIC0gbWEgLSAwLjUgKiBjbCAqIChtYSAqIG1hICsgYmwpKSAvICh0aGlzLmVzICogTWF0aC5zaW4oMiAqIHBoaSkgKiAobWEgKiBtYSArIGJsIC0gMiAqIGFsICogbWEpIC8gKDQgKiBjbCkgKyAoYWwgLSBtYSkgKiAoY2wgKiBtbG5wIC0gMiAvIE1hdGguc2luKDIgKiBwaGkpKSAtIG1sbnApO1xuICAgICAgICBwaGkgLT0gZHBoaTtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRwaGkpIDw9IEVQU0xOKSB7XG4gICAgICAgICAgbGF0ID0gcGhpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vbGF0PXBoaTR6KHRoaXMuZSx0aGlzLmUwLHRoaXMuZTEsdGhpcy5lMix0aGlzLmUzLGFsLGJsLDAsMCk7XG4gICAgICBjbCA9IE1hdGguc3FydCgxIC0gdGhpcy5lcyAqIE1hdGgucG93KE1hdGguc2luKGxhdCksIDIpKSAqIE1hdGgudGFuKGxhdCk7XG4gICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBNYXRoLmFzaW4oeCAqIGNsIC8gdGhpcy5hKSAvIE1hdGguc2luKGxhdCkpO1xuICAgIH1cbiAgfVxuXG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIlBvbHljb25pY1wiLCBcInBvbHlcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9wb2x5LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvcG9seS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBRU0MgcHJvamVjdGlvbiByZXdyaXR0ZW4gZnJvbSB0aGUgb3JpZ2luYWwgUFJPSjRcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9PU0dlby9wcm9qLjQvYmxvYi9tYXN0ZXIvc3JjL1BKX3FzYy5jXG5cbmltcG9ydCB7RVBTTE4sIFRXT19QSSwgU1BJLCBIQUxGX1BJLCBGT1JUUEl9IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuXG4vKiBjb25zdGFudHMgKi9cbnZhciBGQUNFX0VOVU0gPSB7XG4gICAgRlJPTlQ6IDEsXG4gICAgUklHSFQ6IDIsXG4gICAgQkFDSzogMyxcbiAgICBMRUZUOiA0LFxuICAgIFRPUDogNSxcbiAgICBCT1RUT006IDZcbn07XG5cbnZhciBBUkVBX0VOVU0gPSB7XG4gICAgQVJFQV8wOiAxLFxuICAgIEFSRUFfMTogMixcbiAgICBBUkVBXzI6IDMsXG4gICAgQVJFQV8zOiA0XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcblxuICB0aGlzLngwID0gdGhpcy54MCB8fCAwO1xuICB0aGlzLnkwID0gdGhpcy55MCB8fCAwO1xuICB0aGlzLmxhdDAgPSB0aGlzLmxhdDAgfHwgMDtcbiAgdGhpcy5sb25nMCA9IHRoaXMubG9uZzAgfHwgMDtcbiAgdGhpcy5sYXRfdHMgPSB0aGlzLmxhdF90cyB8fCAwO1xuICB0aGlzLnRpdGxlID0gdGhpcy50aXRsZSB8fCBcIlF1YWRyaWxhdGVyYWxpemVkIFNwaGVyaWNhbCBDdWJlXCI7XG5cbiAgLyogRGV0ZXJtaW5lIHRoZSBjdWJlIGZhY2UgZnJvbSB0aGUgY2VudGVyIG9mIHByb2plY3Rpb24uICovXG4gIGlmICh0aGlzLmxhdDAgPj0gSEFMRl9QSSAtIEZPUlRQSSAvIDIuMCkge1xuICAgIHRoaXMuZmFjZSA9IEZBQ0VfRU5VTS5UT1A7XG4gIH0gZWxzZSBpZiAodGhpcy5sYXQwIDw9IC0oSEFMRl9QSSAtIEZPUlRQSSAvIDIuMCkpIHtcbiAgICB0aGlzLmZhY2UgPSBGQUNFX0VOVU0uQk9UVE9NO1xuICB9IGVsc2UgaWYgKE1hdGguYWJzKHRoaXMubG9uZzApIDw9IEZPUlRQSSkge1xuICAgIHRoaXMuZmFjZSA9IEZBQ0VfRU5VTS5GUk9OVDtcbiAgfSBlbHNlIGlmIChNYXRoLmFicyh0aGlzLmxvbmcwKSA8PSBIQUxGX1BJICsgRk9SVFBJKSB7XG4gICAgdGhpcy5mYWNlID0gdGhpcy5sb25nMCA+IDAuMCA/IEZBQ0VfRU5VTS5SSUdIVCA6IEZBQ0VfRU5VTS5MRUZUO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZmFjZSA9IEZBQ0VfRU5VTS5CQUNLO1xuICB9XG5cbiAgLyogRmlsbCBpbiB1c2VmdWwgdmFsdWVzIGZvciB0aGUgZWxsaXBzb2lkIDwtPiBzcGhlcmUgc2hpZnRcbiAgICogZGVzY3JpYmVkIGluIFtMSzEyXS4gKi9cbiAgaWYgKHRoaXMuZXMgIT09IDApIHtcbiAgICB0aGlzLm9uZV9taW51c19mID0gMSAtICh0aGlzLmEgLSB0aGlzLmIpIC8gdGhpcy5hO1xuICAgIHRoaXMub25lX21pbnVzX2Zfc3F1YXJlZCA9IHRoaXMub25lX21pbnVzX2YgKiB0aGlzLm9uZV9taW51c19mO1xuICB9XG59XG5cbi8vIFFTQyBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG4gIHZhciB4eSA9IHt4OiAwLCB5OiAwfTtcbiAgdmFyIGxhdCwgbG9uO1xuICB2YXIgdGhldGEsIHBoaTtcbiAgdmFyIHQsIG11O1xuICAvKiBudTsgKi9cbiAgdmFyIGFyZWEgPSB7dmFsdWU6IDB9O1xuXG4gIC8vIG1vdmUgbG9uIGFjY29yZGluZyB0byBwcm9qZWN0aW9uJ3MgbG9uXG4gIHAueCAtPSB0aGlzLmxvbmcwO1xuXG4gIC8qIENvbnZlcnQgdGhlIGdlb2RldGljIGxhdGl0dWRlIHRvIGEgZ2VvY2VudHJpYyBsYXRpdHVkZS5cbiAgICogVGhpcyBjb3JyZXNwb25kcyB0byB0aGUgc2hpZnQgZnJvbSB0aGUgZWxsaXBzb2lkIHRvIHRoZSBzcGhlcmVcbiAgICogZGVzY3JpYmVkIGluIFtMSzEyXS4gKi9cbiAgaWYgKHRoaXMuZXMgIT09IDApIHsvL2lmIChQLT5lcyAhPSAwKSB7XG4gICAgbGF0ID0gTWF0aC5hdGFuKHRoaXMub25lX21pbnVzX2Zfc3F1YXJlZCAqIE1hdGgudGFuKHAueSkpO1xuICB9IGVsc2Uge1xuICAgIGxhdCA9IHAueTtcbiAgfVxuXG4gIC8qIENvbnZlcnQgdGhlIGlucHV0IGxhdCwgbG9uIGludG8gdGhldGEsIHBoaSBhcyB1c2VkIGJ5IFFTQy5cbiAgICogVGhpcyBkZXBlbmRzIG9uIHRoZSBjdWJlIGZhY2UgYW5kIHRoZSBhcmVhIG9uIGl0LlxuICAgKiBGb3IgdGhlIHRvcCBhbmQgYm90dG9tIGZhY2UsIHdlIGNhbiBjb21wdXRlIHRoZXRhIGFuZCBwaGlcbiAgICogZGlyZWN0bHkgZnJvbSBwaGksIGxhbS4gRm9yIHRoZSBvdGhlciBmYWNlcywgd2UgbXVzdCB1c2VcbiAgICogdW5pdCBzcGhlcmUgY2FydGVzaWFuIGNvb3JkaW5hdGVzIGFzIGFuIGludGVybWVkaWF0ZSBzdGVwLiAqL1xuICBsb24gPSBwLng7IC8vbG9uID0gbHAubGFtO1xuICBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uVE9QKSB7XG4gICAgcGhpID0gSEFMRl9QSSAtIGxhdDtcbiAgICBpZiAobG9uID49IEZPUlRQSSAmJiBsb24gPD0gSEFMRl9QSSArIEZPUlRQSSkge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzA7XG4gICAgICB0aGV0YSA9IGxvbiAtIEhBTEZfUEk7XG4gICAgfSBlbHNlIGlmIChsb24gPiBIQUxGX1BJICsgRk9SVFBJIHx8IGxvbiA8PSAtKEhBTEZfUEkgKyBGT1JUUEkpKSB7XG4gICAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMTtcbiAgICAgIHRoZXRhID0gKGxvbiA+IDAuMCA/IGxvbiAtIFNQSSA6IGxvbiArIFNQSSk7XG4gICAgfSBlbHNlIGlmIChsb24gPiAtKEhBTEZfUEkgKyBGT1JUUEkpICYmIGxvbiA8PSAtRk9SVFBJKSB7XG4gICAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMjtcbiAgICAgIHRoZXRhID0gbG9uICsgSEFMRl9QSTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzM7XG4gICAgICB0aGV0YSA9IGxvbjtcbiAgICB9XG4gIH0gZWxzZSBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uQk9UVE9NKSB7XG4gICAgcGhpID0gSEFMRl9QSSArIGxhdDtcbiAgICBpZiAobG9uID49IEZPUlRQSSAmJiBsb24gPD0gSEFMRl9QSSArIEZPUlRQSSkge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzA7XG4gICAgICB0aGV0YSA9IC1sb24gKyBIQUxGX1BJO1xuICAgIH0gZWxzZSBpZiAobG9uIDwgRk9SVFBJICYmIGxvbiA+PSAtRk9SVFBJKSB7XG4gICAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMTtcbiAgICAgIHRoZXRhID0gLWxvbjtcbiAgICB9IGVsc2UgaWYgKGxvbiA8IC1GT1JUUEkgJiYgbG9uID49IC0oSEFMRl9QSSArIEZPUlRQSSkpIHtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8yO1xuICAgICAgdGhldGEgPSAtbG9uIC0gSEFMRl9QSTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzM7XG4gICAgICB0aGV0YSA9IChsb24gPiAwLjAgPyAtbG9uICsgU1BJIDogLWxvbiAtIFNQSSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBxLCByLCBzO1xuICAgIHZhciBzaW5sYXQsIGNvc2xhdDtcbiAgICB2YXIgc2lubG9uLCBjb3Nsb247XG5cbiAgICBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uUklHSFQpIHtcbiAgICAgIGxvbiA9IHFzY19zaGlmdF9sb25fb3JpZ2luKGxvbiwgK0hBTEZfUEkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uQkFDSykge1xuICAgICAgbG9uID0gcXNjX3NoaWZ0X2xvbl9vcmlnaW4obG9uLCArU1BJKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkxFRlQpIHtcbiAgICAgIGxvbiA9IHFzY19zaGlmdF9sb25fb3JpZ2luKGxvbiwgLUhBTEZfUEkpO1xuICAgIH1cbiAgICBzaW5sYXQgPSBNYXRoLnNpbihsYXQpO1xuICAgIGNvc2xhdCA9IE1hdGguY29zKGxhdCk7XG4gICAgc2lubG9uID0gTWF0aC5zaW4obG9uKTtcbiAgICBjb3Nsb24gPSBNYXRoLmNvcyhsb24pO1xuICAgIHEgPSBjb3NsYXQgKiBjb3Nsb247XG4gICAgciA9IGNvc2xhdCAqIHNpbmxvbjtcbiAgICBzID0gc2lubGF0O1xuXG4gICAgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkZST05UKSB7XG4gICAgICBwaGkgPSBNYXRoLmFjb3MocSk7XG4gICAgICB0aGV0YSA9IHFzY19md2RfZXF1YXRfZmFjZV90aGV0YShwaGksIHMsIHIsIGFyZWEpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uUklHSFQpIHtcbiAgICAgIHBoaSA9IE1hdGguYWNvcyhyKTtcbiAgICAgIHRoZXRhID0gcXNjX2Z3ZF9lcXVhdF9mYWNlX3RoZXRhKHBoaSwgcywgLXEsIGFyZWEpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uQkFDSykge1xuICAgICAgcGhpID0gTWF0aC5hY29zKC1xKTtcbiAgICAgIHRoZXRhID0gcXNjX2Z3ZF9lcXVhdF9mYWNlX3RoZXRhKHBoaSwgcywgLXIsIGFyZWEpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uTEVGVCkge1xuICAgICAgcGhpID0gTWF0aC5hY29zKC1yKTtcbiAgICAgIHRoZXRhID0gcXNjX2Z3ZF9lcXVhdF9mYWNlX3RoZXRhKHBoaSwgcywgcSwgYXJlYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qIEltcG9zc2libGUgKi9cbiAgICAgIHBoaSA9IHRoZXRhID0gMDtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8wO1xuICAgIH1cbiAgfVxuXG4gIC8qIENvbXB1dGUgbXUgYW5kIG51IGZvciB0aGUgYXJlYSBvZiBkZWZpbml0aW9uLlxuICAgKiBGb3IgbXUsIHNlZSBFcS4gKDMtMjEpIGluIFtPTDc2XSwgYnV0IG5vdGUgdGhlIHR5cG9zOlxuICAgKiBjb21wYXJlIHdpdGggRXEuICgzLTE0KS4gRm9yIG51LCBzZWUgRXEuICgzLTM4KS4gKi9cbiAgbXUgPSBNYXRoLmF0YW4oKDEyIC8gU1BJKSAqICh0aGV0YSArIE1hdGguYWNvcyhNYXRoLnNpbih0aGV0YSkgKiBNYXRoLmNvcyhGT1JUUEkpKSAtIEhBTEZfUEkpKTtcbiAgdCA9IE1hdGguc3FydCgoMSAtIE1hdGguY29zKHBoaSkpIC8gKE1hdGguY29zKG11KSAqIE1hdGguY29zKG11KSkgLyAoMSAtIE1hdGguY29zKE1hdGguYXRhbigxIC8gTWF0aC5jb3ModGhldGEpKSkpKTtcblxuICAvKiBBcHBseSB0aGUgcmVzdWx0IHRvIHRoZSByZWFsIGFyZWEuICovXG4gIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8xKSB7XG4gICAgbXUgKz0gSEFMRl9QSTtcbiAgfSBlbHNlIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8yKSB7XG4gICAgbXUgKz0gU1BJO1xuICB9IGVsc2UgaWYgKGFyZWEudmFsdWUgPT09IEFSRUFfRU5VTS5BUkVBXzMpIHtcbiAgICBtdSArPSAxLjUgKiBTUEk7XG4gIH1cblxuICAvKiBOb3cgY29tcHV0ZSB4LCB5IGZyb20gbXUgYW5kIG51ICovXG4gIHh5LnggPSB0ICogTWF0aC5jb3MobXUpO1xuICB4eS55ID0gdCAqIE1hdGguc2luKG11KTtcbiAgeHkueCA9IHh5LnggKiB0aGlzLmEgKyB0aGlzLngwO1xuICB4eS55ID0geHkueSAqIHRoaXMuYSArIHRoaXMueTA7XG5cbiAgcC54ID0geHkueDtcbiAgcC55ID0geHkueTtcbiAgcmV0dXJuIHA7XG59XG5cbi8vIFFTQyBpbnZlcnNlIGVxdWF0aW9ucy0tbWFwcGluZyB4LHkgdG8gbGF0L2xvbmdcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHZhciBscCA9IHtsYW06IDAsIHBoaTogMH07XG4gIHZhciBtdSwgbnUsIGNvc211LCB0YW5udTtcbiAgdmFyIHRhbnRoZXRhLCB0aGV0YSwgY29zcGhpLCBwaGk7XG4gIHZhciB0O1xuICB2YXIgYXJlYSA9IHt2YWx1ZTogMH07XG5cbiAgLyogZGUtb2Zmc2V0ICovXG4gIHAueCA9IChwLnggLSB0aGlzLngwKSAvIHRoaXMuYTtcbiAgcC55ID0gKHAueSAtIHRoaXMueTApIC8gdGhpcy5hO1xuXG4gIC8qIENvbnZlcnQgdGhlIGlucHV0IHgsIHkgdG8gdGhlIG11IGFuZCBudSBhbmdsZXMgYXMgdXNlZCBieSBRU0MuXG4gICAqIFRoaXMgZGVwZW5kcyBvbiB0aGUgYXJlYSBvZiB0aGUgY3ViZSBmYWNlLiAqL1xuICBudSA9IE1hdGguYXRhbihNYXRoLnNxcnQocC54ICogcC54ICsgcC55ICogcC55KSk7XG4gIG11ID0gTWF0aC5hdGFuMihwLnksIHAueCk7XG4gIGlmIChwLnggPj0gMC4wICYmIHAueCA+PSBNYXRoLmFicyhwLnkpKSB7XG4gICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzA7XG4gIH0gZWxzZSBpZiAocC55ID49IDAuMCAmJiBwLnkgPj0gTWF0aC5hYnMocC54KSkge1xuICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8xO1xuICAgIG11IC09IEhBTEZfUEk7XG4gIH0gZWxzZSBpZiAocC54IDwgMC4wICYmIC1wLnggPj0gTWF0aC5hYnMocC55KSkge1xuICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8yO1xuICAgIG11ID0gKG11IDwgMC4wID8gbXUgKyBTUEkgOiBtdSAtIFNQSSk7XG4gIH0gZWxzZSB7XG4gICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzM7XG4gICAgbXUgKz0gSEFMRl9QSTtcbiAgfVxuXG4gIC8qIENvbXB1dGUgcGhpIGFuZCB0aGV0YSBmb3IgdGhlIGFyZWEgb2YgZGVmaW5pdGlvbi5cbiAgICogVGhlIGludmVyc2UgcHJvamVjdGlvbiBpcyBub3QgZGVzY3JpYmVkIGluIHRoZSBvcmlnaW5hbCBwYXBlciwgYnV0IHNvbWVcbiAgICogZ29vZCBoaW50cyBjYW4gYmUgZm91bmQgaGVyZSAoYXMgb2YgMjAxMS0xMi0xNCk6XG4gICAqIGh0dHA6Ly9maXRzLmdzZmMubmFzYS5nb3YvZml0c2JpdHMvc2FmLjkzL3NhZi45MzAyXG4gICAqIChzZWFyY2ggZm9yIFwiTWVzc2FnZS1JZDogPDkzMDIxODE3NTkuQUEyNTQ3NyBhdCBmaXRzLmN2Lm5yYW8uZWR1PlwiKSAqL1xuICB0ID0gKFNQSSAvIDEyKSAqIE1hdGgudGFuKG11KTtcbiAgdGFudGhldGEgPSBNYXRoLnNpbih0KSAvIChNYXRoLmNvcyh0KSAtICgxIC8gTWF0aC5zcXJ0KDIpKSk7XG4gIHRoZXRhID0gTWF0aC5hdGFuKHRhbnRoZXRhKTtcbiAgY29zbXUgPSBNYXRoLmNvcyhtdSk7XG4gIHRhbm51ID0gTWF0aC50YW4obnUpO1xuICBjb3NwaGkgPSAxIC0gY29zbXUgKiBjb3NtdSAqIHRhbm51ICogdGFubnUgKiAoMSAtIE1hdGguY29zKE1hdGguYXRhbigxIC8gTWF0aC5jb3ModGhldGEpKSkpO1xuICBpZiAoY29zcGhpIDwgLTEpIHtcbiAgICBjb3NwaGkgPSAtMTtcbiAgfSBlbHNlIGlmIChjb3NwaGkgPiArMSkge1xuICAgIGNvc3BoaSA9ICsxO1xuICB9XG5cbiAgLyogQXBwbHkgdGhlIHJlc3VsdCB0byB0aGUgcmVhbCBhcmVhIG9uIHRoZSBjdWJlIGZhY2UuXG4gICAqIEZvciB0aGUgdG9wIGFuZCBib3R0b20gZmFjZSwgd2UgY2FuIGNvbXB1dGUgcGhpIGFuZCBsYW0gZGlyZWN0bHkuXG4gICAqIEZvciB0aGUgb3RoZXIgZmFjZXMsIHdlIG11c3QgdXNlIHVuaXQgc3BoZXJlIGNhcnRlc2lhbiBjb29yZGluYXRlc1xuICAgKiBhcyBhbiBpbnRlcm1lZGlhdGUgc3RlcC4gKi9cbiAgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLlRPUCkge1xuICAgIHBoaSA9IE1hdGguYWNvcyhjb3NwaGkpO1xuICAgIGxwLnBoaSA9IEhBTEZfUEkgLSBwaGk7XG4gICAgaWYgKGFyZWEudmFsdWUgPT09IEFSRUFfRU5VTS5BUkVBXzApIHtcbiAgICAgIGxwLmxhbSA9IHRoZXRhICsgSEFMRl9QSTtcbiAgICB9IGVsc2UgaWYgKGFyZWEudmFsdWUgPT09IEFSRUFfRU5VTS5BUkVBXzEpIHtcbiAgICAgIGxwLmxhbSA9ICh0aGV0YSA8IDAuMCA/IHRoZXRhICsgU1BJIDogdGhldGEgLSBTUEkpO1xuICAgIH0gZWxzZSBpZiAoYXJlYS52YWx1ZSA9PT0gQVJFQV9FTlVNLkFSRUFfMikge1xuICAgICAgbHAubGFtID0gdGhldGEgLSBIQUxGX1BJO1xuICAgIH0gZWxzZSAvKiBhcmVhLnZhbHVlID09IEFSRUFfRU5VTS5BUkVBXzMgKi8ge1xuICAgICAgbHAubGFtID0gdGhldGE7XG4gICAgfVxuICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkJPVFRPTSkge1xuICAgIHBoaSA9IE1hdGguYWNvcyhjb3NwaGkpO1xuICAgIGxwLnBoaSA9IHBoaSAtIEhBTEZfUEk7XG4gICAgaWYgKGFyZWEudmFsdWUgPT09IEFSRUFfRU5VTS5BUkVBXzApIHtcbiAgICAgIGxwLmxhbSA9IC10aGV0YSArIEhBTEZfUEk7XG4gICAgfSBlbHNlIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8xKSB7XG4gICAgICBscC5sYW0gPSAtdGhldGE7XG4gICAgfSBlbHNlIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8yKSB7XG4gICAgICBscC5sYW0gPSAtdGhldGEgLSBIQUxGX1BJO1xuICAgIH0gZWxzZSAvKiBhcmVhLnZhbHVlID09IEFSRUFfRU5VTS5BUkVBXzMgKi8ge1xuICAgICAgbHAubGFtID0gKHRoZXRhIDwgMC4wID8gLXRoZXRhIC0gU1BJIDogLXRoZXRhICsgU1BJKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLyogQ29tcHV0ZSBwaGkgYW5kIGxhbSB2aWEgY2FydGVzaWFuIHVuaXQgc3BoZXJlIGNvb3JkaW5hdGVzLiAqL1xuICAgIHZhciBxLCByLCBzO1xuICAgIHEgPSBjb3NwaGk7XG4gICAgdCA9IHEgKiBxO1xuICAgIGlmICh0ID49IDEpIHtcbiAgICAgIHMgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzID0gTWF0aC5zcXJ0KDEgLSB0KSAqIE1hdGguc2luKHRoZXRhKTtcbiAgICB9XG4gICAgdCArPSBzICogcztcbiAgICBpZiAodCA+PSAxKSB7XG4gICAgICByID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgciA9IE1hdGguc3FydCgxIC0gdCk7XG4gICAgfVxuICAgIC8qIFJvdGF0ZSBxLHIscyBpbnRvIHRoZSBjb3JyZWN0IGFyZWEuICovXG4gICAgaWYgKGFyZWEudmFsdWUgPT09IEFSRUFfRU5VTS5BUkVBXzEpIHtcbiAgICAgIHQgPSByO1xuICAgICAgciA9IC1zO1xuICAgICAgcyA9IHQ7XG4gICAgfSBlbHNlIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8yKSB7XG4gICAgICByID0gLXI7XG4gICAgICBzID0gLXM7XG4gICAgfSBlbHNlIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8zKSB7XG4gICAgICB0ID0gcjtcbiAgICAgIHIgPSBzO1xuICAgICAgcyA9IC10O1xuICAgIH1cbiAgICAvKiBSb3RhdGUgcSxyLHMgaW50byB0aGUgY29ycmVjdCBjdWJlIGZhY2UuICovXG4gICAgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLlJJR0hUKSB7XG4gICAgICB0ID0gcTtcbiAgICAgIHEgPSAtcjtcbiAgICAgIHIgPSB0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uQkFDSykge1xuICAgICAgcSA9IC1xO1xuICAgICAgciA9IC1yO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uTEVGVCkge1xuICAgICAgdCA9IHE7XG4gICAgICBxID0gcjtcbiAgICAgIHIgPSAtdDtcbiAgICB9XG4gICAgLyogTm93IGNvbXB1dGUgcGhpIGFuZCBsYW0gZnJvbSB0aGUgdW5pdCBzcGhlcmUgY29vcmRpbmF0ZXMuICovXG4gICAgbHAucGhpID0gTWF0aC5hY29zKC1zKSAtIEhBTEZfUEk7XG4gICAgbHAubGFtID0gTWF0aC5hdGFuMihyLCBxKTtcbiAgICBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uUklHSFQpIHtcbiAgICAgIGxwLmxhbSA9IHFzY19zaGlmdF9sb25fb3JpZ2luKGxwLmxhbSwgLUhBTEZfUEkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uQkFDSykge1xuICAgICAgbHAubGFtID0gcXNjX3NoaWZ0X2xvbl9vcmlnaW4obHAubGFtLCAtU1BJKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkxFRlQpIHtcbiAgICAgIGxwLmxhbSA9IHFzY19zaGlmdF9sb25fb3JpZ2luKGxwLmxhbSwgK0hBTEZfUEkpO1xuICAgIH1cbiAgfVxuXG4gIC8qIEFwcGx5IHRoZSBzaGlmdCBmcm9tIHRoZSBzcGhlcmUgdG8gdGhlIGVsbGlwc29pZCBhcyBkZXNjcmliZWRcbiAgICogaW4gW0xLMTJdLiAqL1xuICBpZiAodGhpcy5lcyAhPT0gMCkge1xuICAgIHZhciBpbnZlcnRfc2lnbjtcbiAgICB2YXIgdGFucGhpLCB4YTtcbiAgICBpbnZlcnRfc2lnbiA9IChscC5waGkgPCAwID8gMSA6IDApO1xuICAgIHRhbnBoaSA9IE1hdGgudGFuKGxwLnBoaSk7XG4gICAgeGEgPSB0aGlzLmIgLyBNYXRoLnNxcnQodGFucGhpICogdGFucGhpICsgdGhpcy5vbmVfbWludXNfZl9zcXVhcmVkKTtcbiAgICBscC5waGkgPSBNYXRoLmF0YW4oTWF0aC5zcXJ0KHRoaXMuYSAqIHRoaXMuYSAtIHhhICogeGEpIC8gKHRoaXMub25lX21pbnVzX2YgKiB4YSkpO1xuICAgIGlmIChpbnZlcnRfc2lnbikge1xuICAgICAgbHAucGhpID0gLWxwLnBoaTtcbiAgICB9XG4gIH1cblxuICBscC5sYW0gKz0gdGhpcy5sb25nMDtcbiAgcC54ID0gbHAubGFtO1xuICBwLnkgPSBscC5waGk7XG4gIHJldHVybiBwO1xufVxuXG4vKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGZvcndhcmQgcHJvamVjdGlvbjogY29tcHV0ZSB0aGUgdGhldGEgYW5nbGVcbiAqIGFuZCBkZXRlcm1pbmUgdGhlIGFyZWEgbnVtYmVyLiAqL1xuZnVuY3Rpb24gcXNjX2Z3ZF9lcXVhdF9mYWNlX3RoZXRhKHBoaSwgeSwgeCwgYXJlYSkge1xuICB2YXIgdGhldGE7XG4gIGlmIChwaGkgPCBFUFNMTikge1xuICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8wO1xuICAgIHRoZXRhID0gMC4wO1xuICB9IGVsc2Uge1xuICAgIHRoZXRhID0gTWF0aC5hdGFuMih5LCB4KTtcbiAgICBpZiAoTWF0aC5hYnModGhldGEpIDw9IEZPUlRQSSkge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzA7XG4gICAgfSBlbHNlIGlmICh0aGV0YSA+IEZPUlRQSSAmJiB0aGV0YSA8PSBIQUxGX1BJICsgRk9SVFBJKSB7XG4gICAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMTtcbiAgICAgIHRoZXRhIC09IEhBTEZfUEk7XG4gICAgfSBlbHNlIGlmICh0aGV0YSA+IEhBTEZfUEkgKyBGT1JUUEkgfHwgdGhldGEgPD0gLShIQUxGX1BJICsgRk9SVFBJKSkge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzI7XG4gICAgICB0aGV0YSA9ICh0aGV0YSA+PSAwLjAgPyB0aGV0YSAtIFNQSSA6IHRoZXRhICsgU1BJKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzM7XG4gICAgICB0aGV0YSArPSBIQUxGX1BJO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhldGE7XG59XG5cbi8qIEhlbHBlciBmdW5jdGlvbjogc2hpZnQgdGhlIGxvbmdpdHVkZS4gKi9cbmZ1bmN0aW9uIHFzY19zaGlmdF9sb25fb3JpZ2luKGxvbiwgb2Zmc2V0KSB7XG4gIHZhciBzbG9uID0gbG9uICsgb2Zmc2V0O1xuICBpZiAoc2xvbiA8IC1TUEkpIHtcbiAgICBzbG9uICs9IFRXT19QSTtcbiAgfSBlbHNlIGlmIChzbG9uID4gK1NQSSkge1xuICAgIHNsb24gLT0gVFdPX1BJO1xuICB9XG4gIHJldHVybiBzbG9uO1xufVxuXG5leHBvcnQgdmFyIG5hbWVzID0gW1wiUXVhZHJpbGF0ZXJhbGl6ZWQgU3BoZXJpY2FsIEN1YmVcIiwgXCJRdWFkcmlsYXRlcmFsaXplZF9TcGhlcmljYWxfQ3ViZVwiLCBcInFzY1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvcXNjLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvcXNjLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIFJvYmluc29uIHByb2plY3Rpb25cbi8vIEJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9PU0dlby9wcm9qLjQvYmxvYi9tYXN0ZXIvc3JjL1BKX3JvYmluLmNcbi8vIFBvbHlub21pYWwgY29lZmljaWVudHMgZnJvbSBodHRwOi8vYXJ0aWNsZS5nbWFuZS5vcmcvZ21hbmUuY29tcC5naXMucHJvai00LmRldmVsLzYwMzlcblxuaW1wb3J0IHtIQUxGX1BJLCBEMlIsIFIyRCwgRVBTTE59IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuXG52YXIgQ09FRlNfWCA9IFtcbiAgICBbMS4wMDAwLCAyLjIxOTllLTE3LCAtNy4xNTUxNWUtMDUsIDMuMTEwM2UtMDZdLFxuICAgIFswLjk5ODYsIC0wLjAwMDQ4MjI0MywgLTIuNDg5N2UtMDUsIC0xLjMzMDllLTA2XSxcbiAgICBbMC45OTU0LCAtMC4wMDA4MzEwMywgLTQuNDg2MDVlLTA1LCAtOS44NjcwMWUtMDddLFxuICAgIFswLjk5MDAsIC0wLjAwMTM1MzY0LCAtNS45NjYxZS0wNSwgMy42Nzc3ZS0wNl0sXG4gICAgWzAuOTgyMiwgLTAuMDAxNjc0NDIsIC00LjQ5NTQ3ZS0wNiwgLTUuNzI0MTFlLTA2XSxcbiAgICBbMC45NzMwLCAtMC4wMDIxNDg2OCwgLTkuMDM1NzFlLTA1LCAxLjg3MzZlLTA4XSxcbiAgICBbMC45NjAwLCAtMC4wMDMwNTA4NSwgLTkuMDA3NjFlLTA1LCAxLjY0OTE3ZS0wNl0sXG4gICAgWzAuOTQyNywgLTAuMDAzODI3OTIsIC02LjUzMzg2ZS0wNSwgLTIuNjE1NGUtMDZdLFxuICAgIFswLjkyMTYsIC0wLjAwNDY3NzQ2LCAtMC4wMDAxMDQ1NywgNC44MTI0M2UtMDZdLFxuICAgIFswLjg5NjIsIC0wLjAwNTM2MjIzLCAtMy4yMzgzMWUtMDUsIC01LjQzNDMyZS0wNl0sXG4gICAgWzAuODY3OSwgLTAuMDA2MDkzNjMsIC0wLjAwMDExMzg5OCwgMy4zMjQ4NGUtMDZdLFxuICAgIFswLjgzNTAsIC0wLjAwNjk4MzI1LCAtNi40MDI1M2UtMDUsIDkuMzQ5NTllLTA3XSxcbiAgICBbMC43OTg2LCAtMC4wMDc1NTMzOCwgLTUuMDAwMDllLTA1LCA5LjM1MzI0ZS0wN10sXG4gICAgWzAuNzU5NywgLTAuMDA3OTgzMjQsIC0zLjU5NzFlLTA1LCAtMi4yNzYyNmUtMDZdLFxuICAgIFswLjcxODYsIC0wLjAwODUxMzY3LCAtNy4wMTE0OWUtMDUsIC04LjYzMDNlLTA2XSxcbiAgICBbMC42NzMyLCAtMC4wMDk4NjIwOSwgLTAuMDAwMTk5NTY5LCAxLjkxOTc0ZS0wNV0sXG4gICAgWzAuNjIxMywgLTAuMDEwNDE4LCA4LjgzOTIzZS0wNSwgNi4yNDA1MWUtMDZdLFxuICAgIFswLjU3MjIsIC0wLjAwOTA2NjAxLCAwLjAwMDE4MiwgNi4yNDA1MWUtMDZdLFxuICAgIFswLjUzMjIsIC0wLjAwNjc3Nzk3LCAwLjAwMDI3NTYwOCwgNi4yNDA1MWUtMDZdXG5dO1xuXG52YXIgQ09FRlNfWSA9IFtcbiAgICBbLTUuMjA0MTdlLTE4LCAwLjAxMjQsIDEuMjE0MzFlLTE4LCAtOC40NTI4NGUtMTFdLFxuICAgIFswLjA2MjAsIDAuMDEyNCwgLTEuMjY3OTNlLTA5LCA0LjIyNjQyZS0xMF0sXG4gICAgWzAuMTI0MCwgMC4wMTI0LCA1LjA3MTcxZS0wOSwgLTEuNjA2MDRlLTA5XSxcbiAgICBbMC4xODYwLCAwLjAxMjM5OTksIC0xLjkwMTg5ZS0wOCwgNi4wMDE1MmUtMDldLFxuICAgIFswLjI0ODAsIDAuMDEyNDAwMiwgNy4xMDAzOWUtMDgsIC0yLjI0ZS0wOF0sXG4gICAgWzAuMzEwMCwgMC4wMTIzOTkyLCAtMi42NDk5N2UtMDcsIDguMzU5ODZlLTA4XSxcbiAgICBbMC4zNzIwLCAwLjAxMjQwMjksIDkuODg5ODNlLTA3LCAtMy4xMTk5NGUtMDddLFxuICAgIFswLjQzNDAsIDAuMDEyMzg5MywgLTMuNjkwOTNlLTA2LCAtNC4zNTYyMWUtMDddLFxuICAgIFswLjQ5NTgsIDAuMDEyMzE5OCwgLTEuMDIyNTJlLTA1LCAtMy40NTUyM2UtMDddLFxuICAgIFswLjU1NzEsIDAuMDEyMTkxNiwgLTEuNTQwODFlLTA1LCAtNS44MjI4OGUtMDddLFxuICAgIFswLjYxNzYsIDAuMDExOTkzOCwgLTIuNDE0MjRlLTA1LCAtNS4yNTMyN2UtMDddLFxuICAgIFswLjY3NjksIDAuMDExNzEzLCAtMy4yMDIyM2UtMDUsIC01LjE2NDA1ZS0wN10sXG4gICAgWzAuNzM0NiwgMC4wMTEzNTQxLCAtMy45NzY4NGUtMDUsIC02LjA5MDUyZS0wN10sXG4gICAgWzAuNzkwMywgMC4wMTA5MTA3LCAtNC44OTA0MmUtMDUsIC0xLjA0NzM5ZS0wNl0sXG4gICAgWzAuODQzNSwgMC4wMTAzNDMxLCAtNi40NjE1ZS0wNSwgLTEuNDAzNzRlLTA5XSxcbiAgICBbMC44OTM2LCAwLjAwOTY5Njg2LCAtNi40NjM2ZS0wNSwgLTguNTQ3ZS0wNl0sXG4gICAgWzAuOTM5NCwgMC4wMDg0MDk0NywgLTAuMDAwMTkyODQxLCAtNC4yMTA2ZS0wNl0sXG4gICAgWzAuOTc2MSwgMC4wMDYxNjUyNywgLTAuMDAwMjU2LCAtNC4yMTA2ZS0wNl0sXG4gICAgWzEuMDAwMCwgMC4wMDMyODk0NywgLTAuMDAwMzE5MTU5LCAtNC4yMTA2ZS0wNl1cbl07XG5cbnZhciBGWEMgPSAwLjg0ODc7XG52YXIgRllDID0gMS4zNTIzO1xudmFyIEMxID0gUjJELzU7IC8vIHJhZCB0byA1LWRlZ3JlZSBpbnRlcnZhbFxudmFyIFJDMSA9IDEvQzE7XG52YXIgTk9ERVMgPSAxODtcblxudmFyIHBvbHkzX3ZhbCA9IGZ1bmN0aW9uKGNvZWZzLCB4KSB7XG4gICAgcmV0dXJuIGNvZWZzWzBdICsgeCAqIChjb2Vmc1sxXSArIHggKiAoY29lZnNbMl0gKyB4ICogY29lZnNbM10pKTtcbn07XG5cbnZhciBwb2x5M19kZXIgPSBmdW5jdGlvbihjb2VmcywgeCkge1xuICAgIHJldHVybiBjb2Vmc1sxXSArIHggKiAoMiAqIGNvZWZzWzJdICsgeCAqIDMgKiBjb2Vmc1szXSk7XG59O1xuXG5mdW5jdGlvbiBuZXd0b25fcmFwc2hvbihmX2RmLCBzdGFydCwgbWF4X2VyciwgaXRlcnMpIHtcbiAgICB2YXIgeCA9IHN0YXJ0O1xuICAgIGZvciAoOyBpdGVyczsgLS1pdGVycykge1xuICAgICAgICB2YXIgdXBkID0gZl9kZih4KTtcbiAgICAgICAgeCAtPSB1cGQ7XG4gICAgICAgIGlmIChNYXRoLmFicyh1cGQpIDwgbWF4X2Vycikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAgIHRoaXMueDAgPSB0aGlzLngwIHx8IDA7XG4gICAgdGhpcy55MCA9IHRoaXMueTAgfHwgMDtcbiAgICB0aGlzLmxvbmcwID0gdGhpcy5sb25nMCB8fCAwO1xuICAgIHRoaXMuZXMgPSAwO1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLnRpdGxlIHx8IFwiUm9iaW5zb25cIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQobGwpIHtcbiAgICB2YXIgbG9uID0gYWRqdXN0X2xvbihsbC54IC0gdGhpcy5sb25nMCk7XG5cbiAgICB2YXIgZHBoaSA9IE1hdGguYWJzKGxsLnkpO1xuICAgIHZhciBpID0gTWF0aC5mbG9vcihkcGhpICogQzEpO1xuICAgIGlmIChpIDwgMCkge1xuICAgICAgICBpID0gMDtcbiAgICB9IGVsc2UgaWYgKGkgPj0gTk9ERVMpIHtcbiAgICAgICAgaSA9IE5PREVTIC0gMTtcbiAgICB9XG4gICAgZHBoaSA9IFIyRCAqIChkcGhpIC0gUkMxICogaSk7XG4gICAgdmFyIHh5ID0ge1xuICAgICAgICB4OiBwb2x5M192YWwoQ09FRlNfWFtpXSwgZHBoaSkgKiBsb24sXG4gICAgICAgIHk6IHBvbHkzX3ZhbChDT0VGU19ZW2ldLCBkcGhpKVxuICAgIH07XG4gICAgaWYgKGxsLnkgPCAwKSB7XG4gICAgICAgIHh5LnkgPSAteHkueTtcbiAgICB9XG5cbiAgICB4eS54ID0geHkueCAqIHRoaXMuYSAqIEZYQyArIHRoaXMueDA7XG4gICAgeHkueSA9IHh5LnkgKiB0aGlzLmEgKiBGWUMgKyB0aGlzLnkwO1xuICAgIHJldHVybiB4eTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UoeHkpIHtcbiAgICB2YXIgbGwgPSB7XG4gICAgICAgIHg6ICh4eS54IC0gdGhpcy54MCkgLyAodGhpcy5hICogRlhDKSxcbiAgICAgICAgeTogTWF0aC5hYnMoeHkueSAtIHRoaXMueTApIC8gKHRoaXMuYSAqIEZZQylcbiAgICB9O1xuXG4gICAgaWYgKGxsLnkgPj0gMSkgeyAvLyBwYXRob2xvZ2ljIGNhc2VcbiAgICAgICAgbGwueCAvPSBDT0VGU19YW05PREVTXVswXTtcbiAgICAgICAgbGwueSA9IHh5LnkgPCAwID8gLUhBTEZfUEkgOiBIQUxGX1BJO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGZpbmQgdGFibGUgaW50ZXJ2YWxcbiAgICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKGxsLnkgKiBOT0RFUyk7XG4gICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA+PSBOT0RFUykge1xuICAgICAgICAgICAgaSA9IE5PREVTIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgICBpZiAoQ09FRlNfWVtpXVswXSA+IGxsLnkpIHtcbiAgICAgICAgICAgICAgICAtLWk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKENPRUZTX1lbaSsxXVswXSA8PSBsbC55KSB7XG4gICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBsaW5lYXIgaW50ZXJwb2xhdGlvbiBpbiA1IGRlZ3JlZSBpbnRlcnZhbFxuICAgICAgICB2YXIgY29lZnMgPSBDT0VGU19ZW2ldO1xuICAgICAgICB2YXIgdCA9IDUgKiAobGwueSAtIGNvZWZzWzBdKSAvIChDT0VGU19ZW2krMV1bMF0gLSBjb2Vmc1swXSk7XG4gICAgICAgIC8vIGZpbmQgdCBzbyB0aGF0IHBvbHkzX3ZhbChjb2VmcywgdCkgPSBsbC55XG4gICAgICAgIHQgPSBuZXd0b25fcmFwc2hvbihmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICByZXR1cm4gKHBvbHkzX3ZhbChjb2VmcywgeCkgLSBsbC55KSAvIHBvbHkzX2Rlcihjb2VmcywgeCk7XG4gICAgICAgIH0sIHQsIEVQU0xOLCAxMDApO1xuXG4gICAgICAgIGxsLnggLz0gcG9seTNfdmFsKENPRUZTX1hbaV0sIHQpO1xuICAgICAgICBsbC55ID0gKDUgKiBpICsgdCkgKiBEMlI7XG4gICAgICAgIGlmICh4eS55IDwgMCkge1xuICAgICAgICAgICAgbGwueSA9IC1sbC55O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGwueCA9IGFkanVzdF9sb24obGwueCArIHRoaXMubG9uZzApO1xuICAgIHJldHVybiBsbDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIlJvYmluc29uXCIsIFwicm9iaW5cIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9yb2Jpbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3JvYmluLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcbmltcG9ydCBhZGp1c3RfbGF0IGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbGF0JztcbmltcG9ydCBwal9lbmZuIGZyb20gJy4uL2NvbW1vbi9wal9lbmZuJztcbnZhciBNQVhfSVRFUiA9IDIwO1xuaW1wb3J0IHBqX21sZm4gZnJvbSAnLi4vY29tbW9uL3BqX21sZm4nO1xuaW1wb3J0IHBqX2ludl9tbGZuIGZyb20gJy4uL2NvbW1vbi9wal9pbnZfbWxmbic7XG5pbXBvcnQge0VQU0xOLCBIQUxGX1BJfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuaW1wb3J0IGFzaW56IGZyb20gJy4uL2NvbW1vbi9hc2lueic7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIC8qIFBsYWNlIHBhcmFtZXRlcnMgaW4gc3RhdGljIHN0b3JhZ2UgZm9yIGNvbW1vbiB1c2VcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG4gIGlmICghdGhpcy5zcGhlcmUpIHtcbiAgICB0aGlzLmVuID0gcGpfZW5mbih0aGlzLmVzKTtcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLm4gPSAxO1xuICAgIHRoaXMubSA9IDA7XG4gICAgdGhpcy5lcyA9IDA7XG4gICAgdGhpcy5DX3kgPSBNYXRoLnNxcnQoKHRoaXMubSArIDEpIC8gdGhpcy5uKTtcbiAgICB0aGlzLkNfeCA9IHRoaXMuQ195IC8gKHRoaXMubSArIDEpO1xuICB9XG5cbn1cblxuLyogU2ludXNvaWRhbCBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQocCkge1xuICB2YXIgeCwgeTtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcbiAgLyogRm9yd2FyZCBlcXVhdGlvbnNcbiAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIGxvbiA9IGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG5cbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgaWYgKCF0aGlzLm0pIHtcbiAgICAgIGxhdCA9IHRoaXMubiAhPT0gMSA/IE1hdGguYXNpbih0aGlzLm4gKiBNYXRoLnNpbihsYXQpKSA6IGxhdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgayA9IHRoaXMubiAqIE1hdGguc2luKGxhdCk7XG4gICAgICBmb3IgKHZhciBpID0gTUFYX0lURVI7IGk7IC0taSkge1xuICAgICAgICB2YXIgViA9ICh0aGlzLm0gKiBsYXQgKyBNYXRoLnNpbihsYXQpIC0gaykgLyAodGhpcy5tICsgTWF0aC5jb3MobGF0KSk7XG4gICAgICAgIGxhdCAtPSBWO1xuICAgICAgICBpZiAoTWF0aC5hYnMoVikgPCBFUFNMTikge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHggPSB0aGlzLmEgKiB0aGlzLkNfeCAqIGxvbiAqICh0aGlzLm0gKyBNYXRoLmNvcyhsYXQpKTtcbiAgICB5ID0gdGhpcy5hICogdGhpcy5DX3kgKiBsYXQ7XG5cbiAgfVxuICBlbHNlIHtcblxuICAgIHZhciBzID0gTWF0aC5zaW4obGF0KTtcbiAgICB2YXIgYyA9IE1hdGguY29zKGxhdCk7XG4gICAgeSA9IHRoaXMuYSAqIHBqX21sZm4obGF0LCBzLCBjLCB0aGlzLmVuKTtcbiAgICB4ID0gdGhpcy5hICogbG9uICogYyAvIE1hdGguc3FydCgxIC0gdGhpcy5lcyAqIHMgKiBzKTtcbiAgfVxuXG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShwKSB7XG4gIHZhciBsYXQsIHRlbXAsIGxvbiwgcztcblxuICBwLnggLT0gdGhpcy54MDtcbiAgbG9uID0gcC54IC8gdGhpcy5hO1xuICBwLnkgLT0gdGhpcy55MDtcbiAgbGF0ID0gcC55IC8gdGhpcy5hO1xuXG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIGxhdCAvPSB0aGlzLkNfeTtcbiAgICBsb24gPSBsb24gLyAodGhpcy5DX3ggKiAodGhpcy5tICsgTWF0aC5jb3MobGF0KSkpO1xuICAgIGlmICh0aGlzLm0pIHtcbiAgICAgIGxhdCA9IGFzaW56KCh0aGlzLm0gKiBsYXQgKyBNYXRoLnNpbihsYXQpKSAvIHRoaXMubik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMubiAhPT0gMSkge1xuICAgICAgbGF0ID0gYXNpbnooTWF0aC5zaW4obGF0KSAvIHRoaXMubik7XG4gICAgfVxuICAgIGxvbiA9IGFkanVzdF9sb24obG9uICsgdGhpcy5sb25nMCk7XG4gICAgbGF0ID0gYWRqdXN0X2xhdChsYXQpO1xuICB9XG4gIGVsc2Uge1xuICAgIGxhdCA9IHBqX2ludl9tbGZuKHAueSAvIHRoaXMuYSwgdGhpcy5lcywgdGhpcy5lbik7XG4gICAgcyA9IE1hdGguYWJzKGxhdCk7XG4gICAgaWYgKHMgPCBIQUxGX1BJKSB7XG4gICAgICBzID0gTWF0aC5zaW4obGF0KTtcbiAgICAgIHRlbXAgPSB0aGlzLmxvbmcwICsgcC54ICogTWF0aC5zcXJ0KDEgLSB0aGlzLmVzICogcyAqIHMpIC8gKHRoaXMuYSAqIE1hdGguY29zKGxhdCkpO1xuICAgICAgLy90ZW1wID0gdGhpcy5sb25nMCArIHAueCAvICh0aGlzLmEgKiBNYXRoLmNvcyhsYXQpKTtcbiAgICAgIGxvbiA9IGFkanVzdF9sb24odGVtcCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKChzIC0gRVBTTE4pIDwgSEFMRl9QSSkge1xuICAgICAgbG9uID0gdGhpcy5sb25nMDtcbiAgICB9XG4gIH1cbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgdmFyIG5hbWVzID0gW1wiU2ludXNvaWRhbFwiLCBcInNpbnVcIl07XG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGluaXQsXG4gIGZvcndhcmQ6IGZvcndhcmQsXG4gIGludmVyc2U6IGludmVyc2UsXG4gIG5hbWVzOiBuYW1lc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9zaW51LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvc2ludS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuICByZWZlcmVuY2VzOlxuICAgIEZvcm11bGVzIGV0IGNvbnN0YW50ZXMgcG91ciBsZSBDYWxjdWwgcG91ciBsYVxuICAgIHByb2plY3Rpb24gY3lsaW5kcmlxdWUgY29uZm9ybWUgw6AgYXhlIG9ibGlxdWUgZXQgcG91ciBsYSB0cmFuc2Zvcm1hdGlvbiBlbnRyZVxuICAgIGRlcyBzeXN0w6htZXMgZGUgcsOpZsOpcmVuY2UuXG4gICAgaHR0cDovL3d3dy5zd2lzc3RvcG8uYWRtaW4uY2gvaW50ZXJuZXQvc3dpc3N0b3BvL2ZyL2hvbWUvdG9waWNzL3N1cnZleS9zeXMvcmVmc3lzL3N3aXR6ZXJsYW5kLnBhcnN5c3JlbGF0ZWQxLjMxMjE2LmRvd25sb2FkTGlzdC43NzAwNC5Eb3dubG9hZEZpbGUudG1wL3N3aXNzcHJvamVjdGlvbmZyLnBkZlxuICAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgdmFyIHBoeTAgPSB0aGlzLmxhdDA7XG4gIHRoaXMubGFtYmRhMCA9IHRoaXMubG9uZzA7XG4gIHZhciBzaW5QaHkwID0gTWF0aC5zaW4ocGh5MCk7XG4gIHZhciBzZW1pTWFqb3JBeGlzID0gdGhpcy5hO1xuICB2YXIgaW52RiA9IHRoaXMucmY7XG4gIHZhciBmbGF0dGVuaW5nID0gMSAvIGludkY7XG4gIHZhciBlMiA9IDIgKiBmbGF0dGVuaW5nIC0gTWF0aC5wb3coZmxhdHRlbmluZywgMik7XG4gIHZhciBlID0gdGhpcy5lID0gTWF0aC5zcXJ0KGUyKTtcbiAgdGhpcy5SID0gdGhpcy5rMCAqIHNlbWlNYWpvckF4aXMgKiBNYXRoLnNxcnQoMSAtIGUyKSAvICgxIC0gZTIgKiBNYXRoLnBvdyhzaW5QaHkwLCAyKSk7XG4gIHRoaXMuYWxwaGEgPSBNYXRoLnNxcnQoMSArIGUyIC8gKDEgLSBlMikgKiBNYXRoLnBvdyhNYXRoLmNvcyhwaHkwKSwgNCkpO1xuICB0aGlzLmIwID0gTWF0aC5hc2luKHNpblBoeTAgLyB0aGlzLmFscGhhKTtcbiAgdmFyIGsxID0gTWF0aC5sb2coTWF0aC50YW4oTWF0aC5QSSAvIDQgKyB0aGlzLmIwIC8gMikpO1xuICB2YXIgazIgPSBNYXRoLmxvZyhNYXRoLnRhbihNYXRoLlBJIC8gNCArIHBoeTAgLyAyKSk7XG4gIHZhciBrMyA9IE1hdGgubG9nKCgxICsgZSAqIHNpblBoeTApIC8gKDEgLSBlICogc2luUGh5MCkpO1xuICB0aGlzLksgPSBrMSAtIHRoaXMuYWxwaGEgKiBrMiArIHRoaXMuYWxwaGEgKiBlIC8gMiAqIGszO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG4gIHZhciBTYTEgPSBNYXRoLmxvZyhNYXRoLnRhbihNYXRoLlBJIC8gNCAtIHAueSAvIDIpKTtcbiAgdmFyIFNhMiA9IHRoaXMuZSAvIDIgKiBNYXRoLmxvZygoMSArIHRoaXMuZSAqIE1hdGguc2luKHAueSkpIC8gKDEgLSB0aGlzLmUgKiBNYXRoLnNpbihwLnkpKSk7XG4gIHZhciBTID0gLXRoaXMuYWxwaGEgKiAoU2ExICsgU2EyKSArIHRoaXMuSztcblxuICAvLyBzcGhlcmljIGxhdGl0dWRlXG4gIHZhciBiID0gMiAqIChNYXRoLmF0YW4oTWF0aC5leHAoUykpIC0gTWF0aC5QSSAvIDQpO1xuXG4gIC8vIHNwaGVyaWMgbG9uZ2l0dWRlXG4gIHZhciBJID0gdGhpcy5hbHBoYSAqIChwLnggLSB0aGlzLmxhbWJkYTApO1xuXG4gIC8vIHBzb2V1ZG8gZXF1YXRvcmlhbCByb3RhdGlvblxuICB2YXIgcm90SSA9IE1hdGguYXRhbihNYXRoLnNpbihJKSAvIChNYXRoLnNpbih0aGlzLmIwKSAqIE1hdGgudGFuKGIpICsgTWF0aC5jb3ModGhpcy5iMCkgKiBNYXRoLmNvcyhJKSkpO1xuXG4gIHZhciByb3RCID0gTWF0aC5hc2luKE1hdGguY29zKHRoaXMuYjApICogTWF0aC5zaW4oYikgLSBNYXRoLnNpbih0aGlzLmIwKSAqIE1hdGguY29zKGIpICogTWF0aC5jb3MoSSkpO1xuXG4gIHAueSA9IHRoaXMuUiAvIDIgKiBNYXRoLmxvZygoMSArIE1hdGguc2luKHJvdEIpKSAvICgxIC0gTWF0aC5zaW4ocm90QikpKSArIHRoaXMueTA7XG4gIHAueCA9IHRoaXMuUiAqIHJvdEkgKyB0aGlzLngwO1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuICB2YXIgWSA9IHAueCAtIHRoaXMueDA7XG4gIHZhciBYID0gcC55IC0gdGhpcy55MDtcblxuICB2YXIgcm90SSA9IFkgLyB0aGlzLlI7XG4gIHZhciByb3RCID0gMiAqIChNYXRoLmF0YW4oTWF0aC5leHAoWCAvIHRoaXMuUikpIC0gTWF0aC5QSSAvIDQpO1xuXG4gIHZhciBiID0gTWF0aC5hc2luKE1hdGguY29zKHRoaXMuYjApICogTWF0aC5zaW4ocm90QikgKyBNYXRoLnNpbih0aGlzLmIwKSAqIE1hdGguY29zKHJvdEIpICogTWF0aC5jb3Mocm90SSkpO1xuICB2YXIgSSA9IE1hdGguYXRhbihNYXRoLnNpbihyb3RJKSAvIChNYXRoLmNvcyh0aGlzLmIwKSAqIE1hdGguY29zKHJvdEkpIC0gTWF0aC5zaW4odGhpcy5iMCkgKiBNYXRoLnRhbihyb3RCKSkpO1xuXG4gIHZhciBsYW1iZGEgPSB0aGlzLmxhbWJkYTAgKyBJIC8gdGhpcy5hbHBoYTtcblxuICB2YXIgUyA9IDA7XG4gIHZhciBwaHkgPSBiO1xuICB2YXIgcHJldlBoeSA9IC0xMDAwO1xuICB2YXIgaXRlcmF0aW9uID0gMDtcbiAgd2hpbGUgKE1hdGguYWJzKHBoeSAtIHByZXZQaHkpID4gMC4wMDAwMDAxKSB7XG4gICAgaWYgKCsraXRlcmF0aW9uID4gMjApIHtcbiAgICAgIC8vLi4ucmVwb3J0RXJyb3IoXCJvbWVyY0Z3ZEluZmluaXR5XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL1MgPSBNYXRoLmxvZyhNYXRoLnRhbihNYXRoLlBJIC8gNCArIHBoeSAvIDIpKTtcbiAgICBTID0gMSAvIHRoaXMuYWxwaGEgKiAoTWF0aC5sb2coTWF0aC50YW4oTWF0aC5QSSAvIDQgKyBiIC8gMikpIC0gdGhpcy5LKSArIHRoaXMuZSAqIE1hdGgubG9nKE1hdGgudGFuKE1hdGguUEkgLyA0ICsgTWF0aC5hc2luKHRoaXMuZSAqIE1hdGguc2luKHBoeSkpIC8gMikpO1xuICAgIHByZXZQaHkgPSBwaHk7XG4gICAgcGh5ID0gMiAqIE1hdGguYXRhbihNYXRoLmV4cChTKSkgLSBNYXRoLlBJIC8gMjtcbiAgfVxuXG4gIHAueCA9IGxhbWJkYTtcbiAgcC55ID0gcGh5O1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcInNvbWVyY1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3NvbWVyYy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3NvbWVyYy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge0VQU0xOLCBIQUxGX1BJfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuaW1wb3J0IHNpZ24gZnJvbSAnLi4vY29tbW9uL3NpZ24nO1xuaW1wb3J0IG1zZm56IGZyb20gJy4uL2NvbW1vbi9tc2Zueic7XG5pbXBvcnQgdHNmbnogZnJvbSAnLi4vY29tbW9uL3RzZm56JztcbmltcG9ydCBwaGkyeiBmcm9tICcuLi9jb21tb24vcGhpMnonO1xuaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gc3Nmbl8ocGhpdCwgc2lucGhpLCBlY2Nlbikge1xuICBzaW5waGkgKj0gZWNjZW47XG4gIHJldHVybiAoTWF0aC50YW4oMC41ICogKEhBTEZfUEkgKyBwaGl0KSkgKiBNYXRoLnBvdygoMSAtIHNpbnBoaSkgLyAoMSArIHNpbnBoaSksIDAuNSAqIGVjY2VuKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICB0aGlzLmNvc2xhdDAgPSBNYXRoLmNvcyh0aGlzLmxhdDApO1xuICB0aGlzLnNpbmxhdDAgPSBNYXRoLnNpbih0aGlzLmxhdDApO1xuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICBpZiAodGhpcy5rMCA9PT0gMSAmJiAhaXNOYU4odGhpcy5sYXRfdHMpICYmIE1hdGguYWJzKHRoaXMuY29zbGF0MCkgPD0gRVBTTE4pIHtcbiAgICAgIHRoaXMuazAgPSAwLjUgKiAoMSArIHNpZ24odGhpcy5sYXQwKSAqIE1hdGguc2luKHRoaXMubGF0X3RzKSk7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGlmIChNYXRoLmFicyh0aGlzLmNvc2xhdDApIDw9IEVQU0xOKSB7XG4gICAgICBpZiAodGhpcy5sYXQwID4gMCkge1xuICAgICAgICAvL05vcnRoIHBvbGVcbiAgICAgICAgLy90cmFjZSgnc3RlcmU6bm9ydGggcG9sZScpO1xuICAgICAgICB0aGlzLmNvbiA9IDE7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy9Tb3V0aCBwb2xlXG4gICAgICAgIC8vdHJhY2UoJ3N0ZXJlOnNvdXRoIHBvbGUnKTtcbiAgICAgICAgdGhpcy5jb24gPSAtMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb25zID0gTWF0aC5zcXJ0KE1hdGgucG93KDEgKyB0aGlzLmUsIDEgKyB0aGlzLmUpICogTWF0aC5wb3coMSAtIHRoaXMuZSwgMSAtIHRoaXMuZSkpO1xuICAgIGlmICh0aGlzLmswID09PSAxICYmICFpc05hTih0aGlzLmxhdF90cykgJiYgTWF0aC5hYnModGhpcy5jb3NsYXQwKSA8PSBFUFNMTikge1xuICAgICAgdGhpcy5rMCA9IDAuNSAqIHRoaXMuY29ucyAqIG1zZm56KHRoaXMuZSwgTWF0aC5zaW4odGhpcy5sYXRfdHMpLCBNYXRoLmNvcyh0aGlzLmxhdF90cykpIC8gdHNmbnoodGhpcy5lLCB0aGlzLmNvbiAqIHRoaXMubGF0X3RzLCB0aGlzLmNvbiAqIE1hdGguc2luKHRoaXMubGF0X3RzKSk7XG4gICAgfVxuICAgIHRoaXMubXMxID0gbXNmbnoodGhpcy5lLCB0aGlzLnNpbmxhdDAsIHRoaXMuY29zbGF0MCk7XG4gICAgdGhpcy5YMCA9IDIgKiBNYXRoLmF0YW4odGhpcy5zc2ZuXyh0aGlzLmxhdDAsIHRoaXMuc2lubGF0MCwgdGhpcy5lKSkgLSBIQUxGX1BJO1xuICAgIHRoaXMuY29zWDAgPSBNYXRoLmNvcyh0aGlzLlgwKTtcbiAgICB0aGlzLnNpblgwID0gTWF0aC5zaW4odGhpcy5YMCk7XG4gIH1cbn1cblxuLy8gU3RlcmVvZ3JhcGhpYyBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKHApIHtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcbiAgdmFyIHNpbmxhdCA9IE1hdGguc2luKGxhdCk7XG4gIHZhciBjb3NsYXQgPSBNYXRoLmNvcyhsYXQpO1xuICB2YXIgQSwgWCwgc2luWCwgY29zWCwgdHMsIHJoO1xuICB2YXIgZGxvbiA9IGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG5cbiAgaWYgKE1hdGguYWJzKE1hdGguYWJzKGxvbiAtIHRoaXMubG9uZzApIC0gTWF0aC5QSSkgPD0gRVBTTE4gJiYgTWF0aC5hYnMobGF0ICsgdGhpcy5sYXQwKSA8PSBFUFNMTikge1xuICAgIC8vY2FzZSBvZiB0aGUgb3JpZ2luZSBwb2ludFxuICAgIC8vdHJhY2UoJ3N0ZXJlOnRoaXMgaXMgdGhlIG9yaWdpbiBwb2ludCcpO1xuICAgIHAueCA9IE5hTjtcbiAgICBwLnkgPSBOYU47XG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgLy90cmFjZSgnc3RlcmU6c3BoZXJlIGNhc2UnKTtcbiAgICBBID0gMiAqIHRoaXMuazAgLyAoMSArIHRoaXMuc2lubGF0MCAqIHNpbmxhdCArIHRoaXMuY29zbGF0MCAqIGNvc2xhdCAqIE1hdGguY29zKGRsb24pKTtcbiAgICBwLnggPSB0aGlzLmEgKiBBICogY29zbGF0ICogTWF0aC5zaW4oZGxvbikgKyB0aGlzLngwO1xuICAgIHAueSA9IHRoaXMuYSAqIEEgKiAodGhpcy5jb3NsYXQwICogc2lubGF0IC0gdGhpcy5zaW5sYXQwICogY29zbGF0ICogTWF0aC5jb3MoZGxvbikpICsgdGhpcy55MDtcbiAgICByZXR1cm4gcDtcbiAgfVxuICBlbHNlIHtcbiAgICBYID0gMiAqIE1hdGguYXRhbih0aGlzLnNzZm5fKGxhdCwgc2lubGF0LCB0aGlzLmUpKSAtIEhBTEZfUEk7XG4gICAgY29zWCA9IE1hdGguY29zKFgpO1xuICAgIHNpblggPSBNYXRoLnNpbihYKTtcbiAgICBpZiAoTWF0aC5hYnModGhpcy5jb3NsYXQwKSA8PSBFUFNMTikge1xuICAgICAgdHMgPSB0c2Zueih0aGlzLmUsIGxhdCAqIHRoaXMuY29uLCB0aGlzLmNvbiAqIHNpbmxhdCk7XG4gICAgICByaCA9IDIgKiB0aGlzLmEgKiB0aGlzLmswICogdHMgLyB0aGlzLmNvbnM7XG4gICAgICBwLnggPSB0aGlzLngwICsgcmggKiBNYXRoLnNpbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgICAgIHAueSA9IHRoaXMueTAgLSB0aGlzLmNvbiAqIHJoICogTWF0aC5jb3MobG9uIC0gdGhpcy5sb25nMCk7XG4gICAgICAvL3RyYWNlKHAudG9TdHJpbmcoKSk7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgZWxzZSBpZiAoTWF0aC5hYnModGhpcy5zaW5sYXQwKSA8IEVQU0xOKSB7XG4gICAgICAvL0VxXG4gICAgICAvL3RyYWNlKCdzdGVyZTplcXVhdGV1cicpO1xuICAgICAgQSA9IDIgKiB0aGlzLmEgKiB0aGlzLmswIC8gKDEgKyBjb3NYICogTWF0aC5jb3MoZGxvbikpO1xuICAgICAgcC55ID0gQSAqIHNpblg7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy9vdGhlciBjYXNlXG4gICAgICAvL3RyYWNlKCdzdGVyZTpub3JtYWwgY2FzZScpO1xuICAgICAgQSA9IDIgKiB0aGlzLmEgKiB0aGlzLmswICogdGhpcy5tczEgLyAodGhpcy5jb3NYMCAqICgxICsgdGhpcy5zaW5YMCAqIHNpblggKyB0aGlzLmNvc1gwICogY29zWCAqIE1hdGguY29zKGRsb24pKSk7XG4gICAgICBwLnkgPSBBICogKHRoaXMuY29zWDAgKiBzaW5YIC0gdGhpcy5zaW5YMCAqIGNvc1ggKiBNYXRoLmNvcyhkbG9uKSkgKyB0aGlzLnkwO1xuICAgIH1cbiAgICBwLnggPSBBICogY29zWCAqIE1hdGguc2luKGRsb24pICsgdGhpcy54MDtcbiAgfVxuICAvL3RyYWNlKHAudG9TdHJpbmcoKSk7XG4gIHJldHVybiBwO1xufVxuXG4vLyogU3RlcmVvZ3JhcGhpYyBpbnZlcnNlIGVxdWF0aW9ucy0tbWFwcGluZyB4LHkgdG8gbGF0L2xvbmdcbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSAtPSB0aGlzLnkwO1xuICB2YXIgbG9uLCBsYXQsIHRzLCBjZSwgQ2hpO1xuICB2YXIgcmggPSBNYXRoLnNxcnQocC54ICogcC54ICsgcC55ICogcC55KTtcbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgdmFyIGMgPSAyICogTWF0aC5hdGFuKHJoIC8gKDIgKiB0aGlzLmEgKiB0aGlzLmswKSk7XG4gICAgbG9uID0gdGhpcy5sb25nMDtcbiAgICBsYXQgPSB0aGlzLmxhdDA7XG4gICAgaWYgKHJoIDw9IEVQU0xOKSB7XG4gICAgICBwLnggPSBsb247XG4gICAgICBwLnkgPSBsYXQ7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgbGF0ID0gTWF0aC5hc2luKE1hdGguY29zKGMpICogdGhpcy5zaW5sYXQwICsgcC55ICogTWF0aC5zaW4oYykgKiB0aGlzLmNvc2xhdDAgLyByaCk7XG4gICAgaWYgKE1hdGguYWJzKHRoaXMuY29zbGF0MCkgPCBFUFNMTikge1xuICAgICAgaWYgKHRoaXMubGF0MCA+IDApIHtcbiAgICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMihwLngsIC0gMSAqIHAueSkpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIE1hdGguYXRhbjIocC54LCBwLnkpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBNYXRoLmF0YW4yKHAueCAqIE1hdGguc2luKGMpLCByaCAqIHRoaXMuY29zbGF0MCAqIE1hdGguY29zKGMpIC0gcC55ICogdGhpcy5zaW5sYXQwICogTWF0aC5zaW4oYykpKTtcbiAgICB9XG4gICAgcC54ID0gbG9uO1xuICAgIHAueSA9IGxhdDtcbiAgICByZXR1cm4gcDtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoTWF0aC5hYnModGhpcy5jb3NsYXQwKSA8PSBFUFNMTikge1xuICAgICAgaWYgKHJoIDw9IEVQU0xOKSB7XG4gICAgICAgIGxhdCA9IHRoaXMubGF0MDtcbiAgICAgICAgbG9uID0gdGhpcy5sb25nMDtcbiAgICAgICAgcC54ID0gbG9uO1xuICAgICAgICBwLnkgPSBsYXQ7XG4gICAgICAgIC8vdHJhY2UocC50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9XG4gICAgICBwLnggKj0gdGhpcy5jb247XG4gICAgICBwLnkgKj0gdGhpcy5jb247XG4gICAgICB0cyA9IHJoICogdGhpcy5jb25zIC8gKDIgKiB0aGlzLmEgKiB0aGlzLmswKTtcbiAgICAgIGxhdCA9IHRoaXMuY29uICogcGhpMnoodGhpcy5lLCB0cyk7XG4gICAgICBsb24gPSB0aGlzLmNvbiAqIGFkanVzdF9sb24odGhpcy5jb24gKiB0aGlzLmxvbmcwICsgTWF0aC5hdGFuMihwLngsIC0gMSAqIHAueSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNlID0gMiAqIE1hdGguYXRhbihyaCAqIHRoaXMuY29zWDAgLyAoMiAqIHRoaXMuYSAqIHRoaXMuazAgKiB0aGlzLm1zMSkpO1xuICAgICAgbG9uID0gdGhpcy5sb25nMDtcbiAgICAgIGlmIChyaCA8PSBFUFNMTikge1xuICAgICAgICBDaGkgPSB0aGlzLlgwO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIENoaSA9IE1hdGguYXNpbihNYXRoLmNvcyhjZSkgKiB0aGlzLnNpblgwICsgcC55ICogTWF0aC5zaW4oY2UpICogdGhpcy5jb3NYMCAvIHJoKTtcbiAgICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMihwLnggKiBNYXRoLnNpbihjZSksIHJoICogdGhpcy5jb3NYMCAqIE1hdGguY29zKGNlKSAtIHAueSAqIHRoaXMuc2luWDAgKiBNYXRoLnNpbihjZSkpKTtcbiAgICAgIH1cbiAgICAgIGxhdCA9IC0xICogcGhpMnoodGhpcy5lLCBNYXRoLnRhbigwLjUgKiAoSEFMRl9QSSArIENoaSkpKTtcbiAgICB9XG4gIH1cbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG5cbiAgLy90cmFjZShwLnRvU3RyaW5nKCkpO1xuICByZXR1cm4gcDtcblxufVxuXG5leHBvcnQgdmFyIG5hbWVzID0gW1wic3RlcmVcIiwgXCJTdGVyZW9ncmFwaGljX1NvdXRoX1BvbGVcIiwgXCJQb2xhciBTdGVyZW9ncmFwaGljICh2YXJpYW50IEIpXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXMsXG4gIHNzZm5fOiBzc2ZuX1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy9zdGVyZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3N0ZXJlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBnYXVzcyBmcm9tICcuL2dhdXNzJztcbmltcG9ydCBhZGp1c3RfbG9uIGZyb20gJy4uL2NvbW1vbi9hZGp1c3RfbG9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIGdhdXNzLmluaXQuYXBwbHkodGhpcyk7XG4gIGlmICghdGhpcy5yYykge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnNpbmMwID0gTWF0aC5zaW4odGhpcy5waGljMCk7XG4gIHRoaXMuY29zYzAgPSBNYXRoLmNvcyh0aGlzLnBoaWMwKTtcbiAgdGhpcy5SMiA9IDIgKiB0aGlzLnJjO1xuICBpZiAoIXRoaXMudGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gXCJPYmxpcXVlIFN0ZXJlb2dyYXBoaWMgQWx0ZXJuYXRpdmVcIjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG4gIHZhciBzaW5jLCBjb3NjLCBjb3NsLCBrO1xuICBwLnggPSBhZGp1c3RfbG9uKHAueCAtIHRoaXMubG9uZzApO1xuICBnYXVzcy5mb3J3YXJkLmFwcGx5KHRoaXMsIFtwXSk7XG4gIHNpbmMgPSBNYXRoLnNpbihwLnkpO1xuICBjb3NjID0gTWF0aC5jb3MocC55KTtcbiAgY29zbCA9IE1hdGguY29zKHAueCk7XG4gIGsgPSB0aGlzLmswICogdGhpcy5SMiAvICgxICsgdGhpcy5zaW5jMCAqIHNpbmMgKyB0aGlzLmNvc2MwICogY29zYyAqIGNvc2wpO1xuICBwLnggPSBrICogY29zYyAqIE1hdGguc2luKHAueCk7XG4gIHAueSA9IGsgKiAodGhpcy5jb3NjMCAqIHNpbmMgLSB0aGlzLnNpbmMwICogY29zYyAqIGNvc2wpO1xuICBwLnggPSB0aGlzLmEgKiBwLnggKyB0aGlzLngwO1xuICBwLnkgPSB0aGlzLmEgKiBwLnkgKyB0aGlzLnkwO1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2UocCkge1xuICB2YXIgc2luYywgY29zYywgbG9uLCBsYXQsIHJobztcbiAgcC54ID0gKHAueCAtIHRoaXMueDApIC8gdGhpcy5hO1xuICBwLnkgPSAocC55IC0gdGhpcy55MCkgLyB0aGlzLmE7XG5cbiAgcC54IC89IHRoaXMuazA7XG4gIHAueSAvPSB0aGlzLmswO1xuICBpZiAoKHJobyA9IE1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpKSkge1xuICAgIHZhciBjID0gMiAqIE1hdGguYXRhbjIocmhvLCB0aGlzLlIyKTtcbiAgICBzaW5jID0gTWF0aC5zaW4oYyk7XG4gICAgY29zYyA9IE1hdGguY29zKGMpO1xuICAgIGxhdCA9IE1hdGguYXNpbihjb3NjICogdGhpcy5zaW5jMCArIHAueSAqIHNpbmMgKiB0aGlzLmNvc2MwIC8gcmhvKTtcbiAgICBsb24gPSBNYXRoLmF0YW4yKHAueCAqIHNpbmMsIHJobyAqIHRoaXMuY29zYzAgKiBjb3NjIC0gcC55ICogdGhpcy5zaW5jMCAqIHNpbmMpO1xuICB9XG4gIGVsc2Uge1xuICAgIGxhdCA9IHRoaXMucGhpYzA7XG4gICAgbG9uID0gMDtcbiAgfVxuXG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuICBnYXVzcy5pbnZlcnNlLmFwcGx5KHRoaXMsIFtwXSk7XG4gIHAueCA9IGFkanVzdF9sb24ocC54ICsgdGhpcy5sb25nMCk7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgdmFyIG5hbWVzID0gW1wiU3RlcmVvZ3JhcGhpY19Ob3J0aF9Qb2xlXCIsIFwiT2JsaXF1ZV9TdGVyZW9ncmFwaGljXCIsIFwiUG9sYXJfU3RlcmVvZ3JhcGhpY1wiLCBcInN0ZXJlYVwiLFwiT2JsaXF1ZSBTdGVyZW9ncmFwaGljIEFsdGVybmF0aXZlXCIsXCJEb3VibGVfU3RlcmVvZ3JhcGhpY1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3N0ZXJlYS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3N0ZXJlYS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBIZWF2aWx5IGJhc2VkIG9uIHRoaXMgdG1lcmMgcHJvamVjdGlvbiBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21ibG9jaC9tYXBzaGFwZXItcHJvai9ibG9iL21hc3Rlci9zcmMvcHJvamVjdGlvbnMvdG1lcmMuanNcblxuaW1wb3J0IHBqX2VuZm4gZnJvbSAnLi4vY29tbW9uL3BqX2VuZm4nO1xuaW1wb3J0IHBqX21sZm4gZnJvbSAnLi4vY29tbW9uL3BqX21sZm4nO1xuaW1wb3J0IHBqX2ludl9tbGZuIGZyb20gJy4uL2NvbW1vbi9wal9pbnZfbWxmbic7XG5pbXBvcnQgYWRqdXN0X2xvbiBmcm9tICcuLi9jb21tb24vYWRqdXN0X2xvbic7XG5cbmltcG9ydCB7RVBTTE4sIEhBTEZfUEl9IGZyb20gJy4uL2NvbnN0YW50cy92YWx1ZXMnO1xuaW1wb3J0IHNpZ24gZnJvbSAnLi4vY29tbW9uL3NpZ24nO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGhpcy54MCA9IHRoaXMueDAgIT09IHVuZGVmaW5lZCA/IHRoaXMueDAgOiAwO1xuICB0aGlzLnkwID0gdGhpcy55MCAhPT0gdW5kZWZpbmVkID8gdGhpcy55MCA6IDA7XG4gIHRoaXMubG9uZzAgPSB0aGlzLmxvbmcwICE9PSB1bmRlZmluZWQgPyB0aGlzLmxvbmcwIDogMDtcbiAgdGhpcy5sYXQwID0gdGhpcy5sYXQwICE9PSB1bmRlZmluZWQgPyB0aGlzLmxhdDAgOiAwO1xuXG4gIGlmICh0aGlzLmVzKSB7XG4gICAgdGhpcy5lbiA9IHBqX2VuZm4odGhpcy5lcyk7XG4gICAgdGhpcy5tbDAgPSBwal9tbGZuKHRoaXMubGF0MCwgTWF0aC5zaW4odGhpcy5sYXQwKSwgTWF0aC5jb3ModGhpcy5sYXQwKSwgdGhpcy5lbik7XG4gIH1cbn1cblxuLyoqXG4gICAgVHJhbnN2ZXJzZSBNZXJjYXRvciBGb3J3YXJkICAtIGxvbmcvbGF0IHRvIHgveVxuICAgIGxvbmcvbGF0IGluIHJhZGlhbnNcbiAgKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKHApIHtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcblxuICB2YXIgZGVsdGFfbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgdmFyIGNvbjtcbiAgdmFyIHgsIHk7XG4gIHZhciBzaW5fcGhpID0gTWF0aC5zaW4obGF0KTtcbiAgdmFyIGNvc19waGkgPSBNYXRoLmNvcyhsYXQpO1xuXG4gIGlmICghdGhpcy5lcykge1xuICAgIHZhciBiID0gY29zX3BoaSAqIE1hdGguc2luKGRlbHRhX2xvbik7XG5cbiAgICBpZiAoKE1hdGguYWJzKE1hdGguYWJzKGIpIC0gMSkpIDwgRVBTTE4pIHtcbiAgICAgIHJldHVybiAoOTMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHggPSAwLjUgKiB0aGlzLmEgKiB0aGlzLmswICogTWF0aC5sb2coKDEgKyBiKSAvICgxIC0gYikpICsgdGhpcy54MDtcbiAgICAgIHkgPSBjb3NfcGhpICogTWF0aC5jb3MoZGVsdGFfbG9uKSAvIE1hdGguc3FydCgxIC0gTWF0aC5wb3coYiwgMikpO1xuICAgICAgYiA9IE1hdGguYWJzKHkpO1xuXG4gICAgICBpZiAoYiA+PSAxKSB7XG4gICAgICAgIGlmICgoYiAtIDEpID4gRVBTTE4pIHtcbiAgICAgICAgICByZXR1cm4gKDkzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB5ID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHkgPSBNYXRoLmFjb3MoeSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChsYXQgPCAwKSB7XG4gICAgICAgIHkgPSAteTtcbiAgICAgIH1cblxuICAgICAgeSA9IHRoaXMuYSAqIHRoaXMuazAgKiAoeSAtIHRoaXMubGF0MCkgKyB0aGlzLnkwO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICB2YXIgYWwgPSBjb3NfcGhpICogZGVsdGFfbG9uO1xuICAgIHZhciBhbHMgPSBNYXRoLnBvdyhhbCwgMik7XG4gICAgdmFyIGMgPSB0aGlzLmVwMiAqIE1hdGgucG93KGNvc19waGksIDIpO1xuICAgIHZhciBjcyA9IE1hdGgucG93KGMsIDIpO1xuICAgIHZhciB0cSA9IE1hdGguYWJzKGNvc19waGkpID4gRVBTTE4gPyBNYXRoLnRhbihsYXQpIDogMDtcbiAgICB2YXIgdCA9IE1hdGgucG93KHRxLCAyKTtcbiAgICB2YXIgdHMgPSBNYXRoLnBvdyh0LCAyKTtcbiAgICBjb24gPSAxIC0gdGhpcy5lcyAqIE1hdGgucG93KHNpbl9waGksIDIpO1xuICAgIGFsID0gYWwgLyBNYXRoLnNxcnQoY29uKTtcbiAgICB2YXIgbWwgPSBwal9tbGZuKGxhdCwgc2luX3BoaSwgY29zX3BoaSwgdGhpcy5lbik7XG5cbiAgICB4ID0gdGhpcy5hICogKHRoaXMuazAgKiBhbCAqICgxICtcbiAgICAgIGFscyAvIDYgKiAoMSAtIHQgKyBjICtcbiAgICAgIGFscyAvIDIwICogKDUgLSAxOCAqIHQgKyB0cyArIDE0ICogYyAtIDU4ICogdCAqIGMgK1xuICAgICAgYWxzIC8gNDIgKiAoNjEgKyAxNzkgKiB0cyAtIHRzICogdCAtIDQ3OSAqIHQpKSkpKSArXG4gICAgICB0aGlzLngwO1xuXG4gICAgeSA9IHRoaXMuYSAqICh0aGlzLmswICogKG1sIC0gdGhpcy5tbDAgK1xuICAgICAgc2luX3BoaSAqIGRlbHRhX2xvbiAqIGFsIC8gMiAqICgxICtcbiAgICAgIGFscyAvIDEyICogKDUgLSB0ICsgOSAqIGMgKyA0ICogY3MgK1xuICAgICAgYWxzIC8gMzAgKiAoNjEgKyB0cyAtIDU4ICogdCArIDI3MCAqIGMgLSAzMzAgKiB0ICogYyArXG4gICAgICBhbHMgLyA1NiAqICgxMzg1ICsgNTQzICogdHMgLSB0cyAqIHQgLSAzMTExICogdCkpKSkpKSArXG4gICAgICB0aGlzLnkwO1xuICB9XG5cbiAgcC54ID0geDtcbiAgcC55ID0geTtcblxuICByZXR1cm4gcDtcbn1cblxuLyoqXG4gICAgVHJhbnN2ZXJzZSBNZXJjYXRvciBJbnZlcnNlICAtICB4L3kgdG8gbG9uZy9sYXRcbiAgKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgdmFyIGNvbiwgcGhpO1xuICB2YXIgbGF0LCBsb247XG4gIHZhciB4ID0gKHAueCAtIHRoaXMueDApICogKDEgLyB0aGlzLmEpO1xuICB2YXIgeSA9IChwLnkgLSB0aGlzLnkwKSAqICgxIC8gdGhpcy5hKTtcblxuICBpZiAoIXRoaXMuZXMpIHtcbiAgICB2YXIgZiA9IE1hdGguZXhwKHggLyB0aGlzLmswKTtcbiAgICB2YXIgZyA9IDAuNSAqIChmIC0gMSAvIGYpO1xuICAgIHZhciB0ZW1wID0gdGhpcy5sYXQwICsgeSAvIHRoaXMuazA7XG4gICAgdmFyIGggPSBNYXRoLmNvcyh0ZW1wKTtcbiAgICBjb24gPSBNYXRoLnNxcnQoKDEgLSBNYXRoLnBvdyhoLCAyKSkgLyAoMSArIE1hdGgucG93KGcsIDIpKSk7XG4gICAgbGF0ID0gTWF0aC5hc2luKGNvbik7XG5cbiAgICBpZiAoeSA8IDApIHtcbiAgICAgIGxhdCA9IC1sYXQ7XG4gICAgfVxuXG4gICAgaWYgKChnID09PSAwKSAmJiAoaCA9PT0gMCkpIHtcbiAgICAgIGxvbiA9IDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbG9uID0gYWRqdXN0X2xvbihNYXRoLmF0YW4yKGcsIGgpICsgdGhpcy5sb25nMCk7XG4gICAgfVxuICB9XG4gIGVsc2UgeyAvLyBlbGxpcHNvaWRhbCBmb3JtXG4gICAgY29uID0gdGhpcy5tbDAgKyB5IC8gdGhpcy5rMDtcbiAgICBwaGkgPSBwal9pbnZfbWxmbihjb24sIHRoaXMuZXMsIHRoaXMuZW4pO1xuXG4gICAgaWYgKE1hdGguYWJzKHBoaSkgPCBIQUxGX1BJKSB7XG4gICAgICB2YXIgc2luX3BoaSA9IE1hdGguc2luKHBoaSk7XG4gICAgICB2YXIgY29zX3BoaSA9IE1hdGguY29zKHBoaSk7XG4gICAgICB2YXIgdGFuX3BoaSA9IE1hdGguYWJzKGNvc19waGkpID4gRVBTTE4gPyBNYXRoLnRhbihwaGkpIDogMDtcbiAgICAgIHZhciBjID0gdGhpcy5lcDIgKiBNYXRoLnBvdyhjb3NfcGhpLCAyKTtcbiAgICAgIHZhciBjcyA9IE1hdGgucG93KGMsIDIpO1xuICAgICAgdmFyIHQgPSBNYXRoLnBvdyh0YW5fcGhpLCAyKTtcbiAgICAgIHZhciB0cyA9IE1hdGgucG93KHQsIDIpO1xuICAgICAgY29uID0gMSAtIHRoaXMuZXMgKiBNYXRoLnBvdyhzaW5fcGhpLCAyKTtcbiAgICAgIHZhciBkID0geCAqIE1hdGguc3FydChjb24pIC8gdGhpcy5rMDtcbiAgICAgIHZhciBkcyA9IE1hdGgucG93KGQsIDIpO1xuICAgICAgY29uID0gY29uICogdGFuX3BoaTtcblxuICAgICAgbGF0ID0gcGhpIC0gKGNvbiAqIGRzIC8gKDEgLSB0aGlzLmVzKSkgKiAwLjUgKiAoMSAtXG4gICAgICAgIGRzIC8gMTIgKiAoNSArIDMgKiB0IC0gOSAqIGMgKiB0ICsgYyAtIDQgKiBjcyAtXG4gICAgICAgIGRzIC8gMzAgKiAoNjEgKyA5MCAqIHQgLSAyNTIgKiBjICogdCArIDQ1ICogdHMgKyA0NiAqIGMgLVxuICAgICAgICBkcyAvIDU2ICogKDEzODUgKyAzNjMzICogdCArIDQwOTUgKiB0cyArIDE1NzQgKiB0cyAqIHQpKSkpO1xuXG4gICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyAoZCAqICgxIC1cbiAgICAgICAgZHMgLyA2ICogKDEgKyAyICogdCArIGMgLVxuICAgICAgICBkcyAvIDIwICogKDUgKyAyOCAqIHQgKyAyNCAqIHRzICsgOCAqIGMgKiB0ICsgNiAqIGMgLVxuICAgICAgICBkcyAvIDQyICogKDYxICsgNjYyICogdCArIDEzMjAgKiB0cyArIDcyMCAqIHRzICogdCkpKSkgLyBjb3NfcGhpKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGF0ID0gSEFMRl9QSSAqIHNpZ24oeSk7XG4gICAgICBsb24gPSAwO1xuICAgIH1cbiAgfVxuXG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuXG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgdmFyIG5hbWVzID0gW1wiVHJhbnN2ZXJzZV9NZXJjYXRvclwiLCBcIlRyYW5zdmVyc2UgTWVyY2F0b3JcIiwgXCJ0bWVyY1wiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgZm9yd2FyZDogZm9yd2FyZCxcbiAgaW52ZXJzZTogaW52ZXJzZSxcbiAgbmFtZXM6IG5hbWVzXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3Byb2plY3Rpb25zL3RtZXJjLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvdG1lcmMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGFkanVzdF96b25lIGZyb20gJy4uL2NvbW1vbi9hZGp1c3Rfem9uZSc7XG5pbXBvcnQgZXRtZXJjIGZyb20gJy4vZXRtZXJjJztcbmV4cG9ydCB2YXIgZGVwZW5kc09uID0gJ2V0bWVyYyc7XG5pbXBvcnQge0QyUn0gZnJvbSAnLi4vY29uc3RhbnRzL3ZhbHVlcyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIHZhciB6b25lID0gYWRqdXN0X3pvbmUodGhpcy56b25lLCB0aGlzLmxvbmcwKTtcbiAgaWYgKHpvbmUgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndW5rbm93biB1dG0gem9uZScpO1xuICB9XG4gIHRoaXMubGF0MCA9IDA7XG4gIHRoaXMubG9uZzAgPSAgKCg2ICogTWF0aC5hYnMoem9uZSkpIC0gMTgzKSAqIEQyUjtcbiAgdGhpcy54MCA9IDUwMDAwMDtcbiAgdGhpcy55MCA9IHRoaXMudXRtU291dGggPyAxMDAwMDAwMCA6IDA7XG4gIHRoaXMuazAgPSAwLjk5OTY7XG5cbiAgZXRtZXJjLmluaXQuYXBwbHkodGhpcyk7XG4gIHRoaXMuZm9yd2FyZCA9IGV0bWVyYy5mb3J3YXJkO1xuICB0aGlzLmludmVyc2UgPSBldG1lcmMuaW52ZXJzZTtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIlVuaXZlcnNhbCBUcmFuc3ZlcnNlIE1lcmNhdG9yIFN5c3RlbVwiLCBcInV0bVwiXTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogaW5pdCxcbiAgbmFtZXM6IG5hbWVzLFxuICBkZXBlbmRzT246IGRlcGVuZHNPblxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy91dG0uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy91dG0uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGFkanVzdF9sb24gZnJvbSAnLi4vY29tbW9uL2FkanVzdF9sb24nO1xuXG5pbXBvcnQge0hBTEZfUEksIEVQU0xOfSBmcm9tICcuLi9jb25zdGFudHMvdmFsdWVzJztcblxuaW1wb3J0IGFzaW56IGZyb20gJy4uL2NvbW1vbi9hc2lueic7XG5cbi8qIEluaXRpYWxpemUgdGhlIFZhbiBEZXIgR3JpbnRlbiBwcm9qZWN0aW9uXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vdGhpcy5SID0gNjM3MDk5NzsgLy9SYWRpdXMgb2YgZWFydGhcbiAgdGhpcy5SID0gdGhpcy5hO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZChwKSB7XG5cbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcblxuICAvKiBGb3J3YXJkIGVxdWF0aW9uc1xuICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgdmFyIGRsb24gPSBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICB2YXIgeCwgeTtcblxuICBpZiAoTWF0aC5hYnMobGF0KSA8PSBFUFNMTikge1xuICAgIHggPSB0aGlzLngwICsgdGhpcy5SICogZGxvbjtcbiAgICB5ID0gdGhpcy55MDtcbiAgfVxuICB2YXIgdGhldGEgPSBhc2lueigyICogTWF0aC5hYnMobGF0IC8gTWF0aC5QSSkpO1xuICBpZiAoKE1hdGguYWJzKGRsb24pIDw9IEVQU0xOKSB8fCAoTWF0aC5hYnMoTWF0aC5hYnMobGF0KSAtIEhBTEZfUEkpIDw9IEVQU0xOKSkge1xuICAgIHggPSB0aGlzLngwO1xuICAgIGlmIChsYXQgPj0gMCkge1xuICAgICAgeSA9IHRoaXMueTAgKyBNYXRoLlBJICogdGhpcy5SICogTWF0aC50YW4oMC41ICogdGhldGEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHkgPSB0aGlzLnkwICsgTWF0aC5QSSAqIHRoaXMuUiAqIC1NYXRoLnRhbigwLjUgKiB0aGV0YSk7XG4gICAgfVxuICAgIC8vICByZXR1cm4oT0spO1xuICB9XG4gIHZhciBhbCA9IDAuNSAqIE1hdGguYWJzKChNYXRoLlBJIC8gZGxvbikgLSAoZGxvbiAvIE1hdGguUEkpKTtcbiAgdmFyIGFzcSA9IGFsICogYWw7XG4gIHZhciBzaW50aCA9IE1hdGguc2luKHRoZXRhKTtcbiAgdmFyIGNvc3RoID0gTWF0aC5jb3ModGhldGEpO1xuXG4gIHZhciBnID0gY29zdGggLyAoc2ludGggKyBjb3N0aCAtIDEpO1xuICB2YXIgZ3NxID0gZyAqIGc7XG4gIHZhciBtID0gZyAqICgyIC8gc2ludGggLSAxKTtcbiAgdmFyIG1zcSA9IG0gKiBtO1xuICB2YXIgY29uID0gTWF0aC5QSSAqIHRoaXMuUiAqIChhbCAqIChnIC0gbXNxKSArIE1hdGguc3FydChhc3EgKiAoZyAtIG1zcSkgKiAoZyAtIG1zcSkgLSAobXNxICsgYXNxKSAqIChnc3EgLSBtc3EpKSkgLyAobXNxICsgYXNxKTtcbiAgaWYgKGRsb24gPCAwKSB7XG4gICAgY29uID0gLWNvbjtcbiAgfVxuICB4ID0gdGhpcy54MCArIGNvbjtcbiAgLy9jb24gPSBNYXRoLmFicyhjb24gLyAoTWF0aC5QSSAqIHRoaXMuUikpO1xuICB2YXIgcSA9IGFzcSArIGc7XG4gIGNvbiA9IE1hdGguUEkgKiB0aGlzLlIgKiAobSAqIHEgLSBhbCAqIE1hdGguc3FydCgobXNxICsgYXNxKSAqIChhc3EgKyAxKSAtIHEgKiBxKSkgLyAobXNxICsgYXNxKTtcbiAgaWYgKGxhdCA+PSAwKSB7XG4gICAgLy95ID0gdGhpcy55MCArIE1hdGguUEkgKiB0aGlzLlIgKiBNYXRoLnNxcnQoMSAtIGNvbiAqIGNvbiAtIDIgKiBhbCAqIGNvbik7XG4gICAgeSA9IHRoaXMueTAgKyBjb247XG4gIH1cbiAgZWxzZSB7XG4gICAgLy95ID0gdGhpcy55MCAtIE1hdGguUEkgKiB0aGlzLlIgKiBNYXRoLnNxcnQoMSAtIGNvbiAqIGNvbiAtIDIgKiBhbCAqIGNvbik7XG4gICAgeSA9IHRoaXMueTAgLSBjb247XG4gIH1cbiAgcC54ID0geDtcbiAgcC55ID0geTtcbiAgcmV0dXJuIHA7XG59XG5cbi8qIFZhbiBEZXIgR3JpbnRlbiBpbnZlcnNlIGVxdWF0aW9ucy0tbWFwcGluZyB4LHkgdG8gbGF0L2xvbmdcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgdmFyIGxvbiwgbGF0O1xuICB2YXIgeHgsIHl5LCB4eXMsIGMxLCBjMiwgYzM7XG4gIHZhciBhMTtcbiAgdmFyIG0xO1xuICB2YXIgY29uO1xuICB2YXIgdGgxO1xuICB2YXIgZDtcblxuICAvKiBpbnZlcnNlIGVxdWF0aW9uc1xuICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSAtPSB0aGlzLnkwO1xuICBjb24gPSBNYXRoLlBJICogdGhpcy5SO1xuICB4eCA9IHAueCAvIGNvbjtcbiAgeXkgPSBwLnkgLyBjb247XG4gIHh5cyA9IHh4ICogeHggKyB5eSAqIHl5O1xuICBjMSA9IC1NYXRoLmFicyh5eSkgKiAoMSArIHh5cyk7XG4gIGMyID0gYzEgLSAyICogeXkgKiB5eSArIHh4ICogeHg7XG4gIGMzID0gLTIgKiBjMSArIDEgKyAyICogeXkgKiB5eSArIHh5cyAqIHh5cztcbiAgZCA9IHl5ICogeXkgLyBjMyArICgyICogYzIgKiBjMiAqIGMyIC8gYzMgLyBjMyAvIGMzIC0gOSAqIGMxICogYzIgLyBjMyAvIGMzKSAvIDI3O1xuICBhMSA9IChjMSAtIGMyICogYzIgLyAzIC8gYzMpIC8gYzM7XG4gIG0xID0gMiAqIE1hdGguc3FydCgtYTEgLyAzKTtcbiAgY29uID0gKCgzICogZCkgLyBhMSkgLyBtMTtcbiAgaWYgKE1hdGguYWJzKGNvbikgPiAxKSB7XG4gICAgaWYgKGNvbiA+PSAwKSB7XG4gICAgICBjb24gPSAxO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbiA9IC0xO1xuICAgIH1cbiAgfVxuICB0aDEgPSBNYXRoLmFjb3MoY29uKSAvIDM7XG4gIGlmIChwLnkgPj0gMCkge1xuICAgIGxhdCA9ICgtbTEgKiBNYXRoLmNvcyh0aDEgKyBNYXRoLlBJIC8gMykgLSBjMiAvIDMgLyBjMykgKiBNYXRoLlBJO1xuICB9XG4gIGVsc2Uge1xuICAgIGxhdCA9IC0oLW0xICogTWF0aC5jb3ModGgxICsgTWF0aC5QSSAvIDMpIC0gYzIgLyAzIC8gYzMpICogTWF0aC5QSTtcbiAgfVxuXG4gIGlmIChNYXRoLmFicyh4eCkgPCBFUFNMTikge1xuICAgIGxvbiA9IHRoaXMubG9uZzA7XG4gIH1cbiAgZWxzZSB7XG4gICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5QSSAqICh4eXMgLSAxICsgTWF0aC5zcXJ0KDEgKyAyICogKHh4ICogeHggLSB5eSAqIHl5KSArIHh5cyAqIHh5cykpIC8gMiAvIHh4KTtcbiAgfVxuXG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IHZhciBuYW1lcyA9IFtcIlZhbl9kZXJfR3JpbnRlbl9JXCIsIFwiVmFuRGVyR3JpbnRlblwiLCBcInZhbmRnXCJdO1xuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBpbml0LFxuICBmb3J3YXJkOiBmb3J3YXJkLFxuICBpbnZlcnNlOiBpbnZlcnNlLFxuICBuYW1lczogbmFtZXNcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvcHJvamVjdGlvbnMvdmFuZGcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi9wcm9qZWN0aW9ucy92YW5kZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge0QyUiwgUjJELCBQSkRfM1BBUkFNLCBQSkRfN1BBUkFNfSBmcm9tICcuL2NvbnN0YW50cy92YWx1ZXMnO1xuaW1wb3J0IGRhdHVtX3RyYW5zZm9ybSBmcm9tICcuL2RhdHVtX3RyYW5zZm9ybSc7XG5pbXBvcnQgYWRqdXN0X2F4aXMgZnJvbSAnLi9hZGp1c3RfYXhpcyc7XG5pbXBvcnQgcHJvaiBmcm9tICcuL1Byb2onO1xuaW1wb3J0IHRvUG9pbnQgZnJvbSAnLi9jb21tb24vdG9Qb2ludCc7XG5pbXBvcnQgY2hlY2tTYW5pdHkgZnJvbSAnLi9jaGVja1Nhbml0eSc7XG5cbmZ1bmN0aW9uIGNoZWNrTm90V0dTKHNvdXJjZSwgZGVzdCkge1xuICByZXR1cm4gKChzb3VyY2UuZGF0dW0uZGF0dW1fdHlwZSA9PT0gUEpEXzNQQVJBTSB8fCBzb3VyY2UuZGF0dW0uZGF0dW1fdHlwZSA9PT0gUEpEXzdQQVJBTSkgJiYgZGVzdC5kYXR1bUNvZGUgIT09ICdXR1M4NCcpIHx8ICgoZGVzdC5kYXR1bS5kYXR1bV90eXBlID09PSBQSkRfM1BBUkFNIHx8IGRlc3QuZGF0dW0uZGF0dW1fdHlwZSA9PT0gUEpEXzdQQVJBTSkgJiYgc291cmNlLmRhdHVtQ29kZSAhPT0gJ1dHUzg0Jyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybShzb3VyY2UsIGRlc3QsIHBvaW50KSB7XG4gIHZhciB3Z3M4NDtcbiAgaWYgKEFycmF5LmlzQXJyYXkocG9pbnQpKSB7XG4gICAgcG9pbnQgPSB0b1BvaW50KHBvaW50KTtcbiAgfVxuICBjaGVja1Nhbml0eShwb2ludCk7XG4gIC8vIFdvcmthcm91bmQgZm9yIGRhdHVtIHNoaWZ0cyB0b3dnczg0LCBpZiBlaXRoZXIgc291cmNlIG9yIGRlc3RpbmF0aW9uIHByb2plY3Rpb24gaXMgbm90IHdnczg0XG4gIGlmIChzb3VyY2UuZGF0dW0gJiYgZGVzdC5kYXR1bSAmJiBjaGVja05vdFdHUyhzb3VyY2UsIGRlc3QpKSB7XG4gICAgd2dzODQgPSBuZXcgcHJvaignV0dTODQnKTtcbiAgICBwb2ludCA9IHRyYW5zZm9ybShzb3VyY2UsIHdnczg0LCBwb2ludCk7XG4gICAgc291cmNlID0gd2dzODQ7XG4gIH1cbiAgLy8gREdSLCAyMDEwLzExLzEyXG4gIGlmIChzb3VyY2UuYXhpcyAhPT0gJ2VudScpIHtcbiAgICBwb2ludCA9IGFkanVzdF9heGlzKHNvdXJjZSwgZmFsc2UsIHBvaW50KTtcbiAgfVxuICAvLyBUcmFuc2Zvcm0gc291cmNlIHBvaW50cyB0byBsb25nL2xhdCwgaWYgdGhleSBhcmVuJ3QgYWxyZWFkeS5cbiAgaWYgKHNvdXJjZS5wcm9qTmFtZSA9PT0gJ2xvbmdsYXQnKSB7XG4gICAgcG9pbnQgPSB7XG4gICAgICB4OiBwb2ludC54ICogRDJSLFxuICAgICAgeTogcG9pbnQueSAqIEQyUlxuICAgIH07XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHNvdXJjZS50b19tZXRlcikge1xuICAgICAgcG9pbnQgPSB7XG4gICAgICAgIHg6IHBvaW50LnggKiBzb3VyY2UudG9fbWV0ZXIsXG4gICAgICAgIHk6IHBvaW50LnkgKiBzb3VyY2UudG9fbWV0ZXJcbiAgICAgIH07XG4gICAgfVxuICAgIHBvaW50ID0gc291cmNlLmludmVyc2UocG9pbnQpOyAvLyBDb252ZXJ0IENhcnRlc2lhbiB0byBsb25nbGF0XG4gIH1cbiAgLy8gQWRqdXN0IGZvciB0aGUgcHJpbWUgbWVyaWRpYW4gaWYgbmVjZXNzYXJ5XG4gIGlmIChzb3VyY2UuZnJvbV9ncmVlbndpY2gpIHtcbiAgICBwb2ludC54ICs9IHNvdXJjZS5mcm9tX2dyZWVud2ljaDtcbiAgfVxuXG4gIC8vIENvbnZlcnQgZGF0dW1zIGlmIG5lZWRlZCwgYW5kIGlmIHBvc3NpYmxlLlxuICBwb2ludCA9IGRhdHVtX3RyYW5zZm9ybShzb3VyY2UuZGF0dW0sIGRlc3QuZGF0dW0sIHBvaW50KTtcblxuICAvLyBBZGp1c3QgZm9yIHRoZSBwcmltZSBtZXJpZGlhbiBpZiBuZWNlc3NhcnlcbiAgaWYgKGRlc3QuZnJvbV9ncmVlbndpY2gpIHtcbiAgICBwb2ludCA9IHtcbiAgICAgIHg6IHBvaW50LnggLSBkZXN0LmZyb21fZ3JlZW53aWNoLFxuICAgICAgeTogcG9pbnQueVxuICAgIH07XG4gIH1cblxuICBpZiAoZGVzdC5wcm9qTmFtZSA9PT0gJ2xvbmdsYXQnKSB7XG4gICAgLy8gY29udmVydCByYWRpYW5zIHRvIGRlY2ltYWwgZGVncmVlc1xuICAgIHBvaW50ID0ge1xuICAgICAgeDogcG9pbnQueCAqIFIyRCxcbiAgICAgIHk6IHBvaW50LnkgKiBSMkRcbiAgICB9O1xuICB9IGVsc2UgeyAvLyBlbHNlIHByb2plY3RcbiAgICBwb2ludCA9IGRlc3QuZm9yd2FyZChwb2ludCk7XG4gICAgaWYgKGRlc3QudG9fbWV0ZXIpIHtcbiAgICAgIHBvaW50ID0ge1xuICAgICAgICB4OiBwb2ludC54IC8gZGVzdC50b19tZXRlcixcbiAgICAgICAgeTogcG9pbnQueSAvIGRlc3QudG9fbWV0ZXJcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLy8gREdSLCAyMDEwLzExLzEyXG4gIGlmIChkZXN0LmF4aXMgIT09ICdlbnUnKSB7XG4gICAgcmV0dXJuIGFkanVzdF9heGlzKGRlc3QsIHRydWUsIHBvaW50KTtcbiAgfVxuXG4gIHJldHVybiBwb2ludDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi90cmFuc2Zvcm0uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L2xpYi90cmFuc2Zvcm0uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IHt2ZXJzaW9uIGFzIGRlZmF1bHR9IGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9saWIvdmVyc2lvbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvajQvbGliL3ZlcnNpb24uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XCJuYW1lXCI6XCJwcm9qNFwiLFwidmVyc2lvblwiOlwiMi41LjBcIixcImRlc2NyaXB0aW9uXCI6XCJQcm9qNGpzIGlzIGEgSmF2YVNjcmlwdCBsaWJyYXJ5IHRvIHRyYW5zZm9ybSBwb2ludCBjb29yZGluYXRlcyBmcm9tIG9uZSBjb29yZGluYXRlIHN5c3RlbSB0byBhbm90aGVyLCBpbmNsdWRpbmcgZGF0dW0gdHJhbnNmb3JtYXRpb25zLlwiLFwibWFpblwiOlwiZGlzdC9wcm9qNC1zcmMuanNcIixcIm1vZHVsZVwiOlwibGliL2luZGV4LmpzXCIsXCJkaXJlY3Rvcmllc1wiOntcInRlc3RcIjpcInRlc3RcIixcImRvY1wiOlwiZG9jc1wifSxcInNjcmlwdHNcIjp7XCJidWlsZFwiOlwiZ3J1bnRcIixcImJ1aWxkOnRtZXJjXCI6XCJncnVudCBidWlsZDp0bWVyY1wiLFwidGVzdFwiOlwibnBtIHJ1biBidWlsZCAmJiBpc3RhbmJ1bCB0ZXN0IF9tb2NoYSB0ZXN0L3Rlc3QuanNcIn0sXCJyZXBvc2l0b3J5XCI6e1widHlwZVwiOlwiZ2l0XCIsXCJ1cmxcIjpcImdpdDovL2dpdGh1Yi5jb20vcHJvajRqcy9wcm9qNGpzLmdpdFwifSxcImF1dGhvclwiOlwiXCIsXCJsaWNlbnNlXCI6XCJNSVRcIixcImRldkRlcGVuZGVuY2llc1wiOntcImNoYWlcIjpcIn40LjEuMlwiLFwiY3VybC1hbWRcIjpcImdpdGh1YjpjdWpvanMvY3VybFwiLFwiZ3J1bnRcIjpcIl4xLjAuMVwiLFwiZ3J1bnQtY2xpXCI6XCJ+MS4yLjBcIixcImdydW50LWNvbnRyaWItY29ubmVjdFwiOlwifjEuMC4yXCIsXCJncnVudC1jb250cmliLWpzaGludFwiOlwifjEuMS4wXCIsXCJncnVudC1jb250cmliLXVnbGlmeVwiOlwifjMuMS4wXCIsXCJncnVudC1tb2NoYS1waGFudG9tanNcIjpcIn40LjAuMFwiLFwiZ3J1bnQtcm9sbHVwXCI6XCJeNi4wLjBcIixcImlzdGFuYnVsXCI6XCJ+MC40LjVcIixcIm1vY2hhXCI6XCJ+NC4wLjBcIixcInJvbGx1cFwiOlwiXjAuNTAuMFwiLFwicm9sbHVwLXBsdWdpbi1qc29uXCI6XCJeMi4zLjBcIixcInJvbGx1cC1wbHVnaW4tbm9kZS1yZXNvbHZlXCI6XCJeMy4wLjBcIixcInRpblwiOlwifjAuNS4wXCJ9LFwiZGVwZW5kZW5jaWVzXCI6e1wibWdyc1wiOlwiMS4wLjBcIixcIndrdC1wYXJzZXJcIjpcIl4xLjIuMFwifX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9qNC9wYWNrYWdlLmpzb25cbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L3BhY2thZ2UuanNvblxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgdG1lcmMgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvdG1lcmMnO1xuaW1wb3J0IGV0bWVyYyBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9ldG1lcmMnO1xuaW1wb3J0IHV0bSBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy91dG0nO1xuaW1wb3J0IHN0ZXJlYSBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9zdGVyZWEnO1xuaW1wb3J0IHN0ZXJlIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL3N0ZXJlJztcbmltcG9ydCBzb21lcmMgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvc29tZXJjJztcbmltcG9ydCBvbWVyYyBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9vbWVyYyc7XG5pbXBvcnQgbGNjIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL2xjYyc7XG5pbXBvcnQga3JvdmFrIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL2tyb3Zhayc7XG5pbXBvcnQgY2FzcyBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9jYXNzJztcbmltcG9ydCBsYWVhIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL2xhZWEnO1xuaW1wb3J0IGFlYSBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9hZWEnO1xuaW1wb3J0IGdub20gZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvZ25vbSc7XG5pbXBvcnQgY2VhIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL2NlYSc7XG5pbXBvcnQgZXFjIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL2VxYyc7XG5pbXBvcnQgcG9seSBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9wb2x5JztcbmltcG9ydCBuem1nIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL256bWcnO1xuaW1wb3J0IG1pbGwgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvbWlsbCc7XG5pbXBvcnQgc2ludSBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9zaW51JztcbmltcG9ydCBtb2xsIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL21vbGwnO1xuaW1wb3J0IGVxZGMgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvZXFkYyc7XG5pbXBvcnQgdmFuZGcgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvdmFuZGcnO1xuaW1wb3J0IGFlcWQgZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvYWVxZCc7XG5pbXBvcnQgb3J0aG8gZnJvbSAnLi9saWIvcHJvamVjdGlvbnMvb3J0aG8nO1xuaW1wb3J0IHFzYyBmcm9tICcuL2xpYi9wcm9qZWN0aW9ucy9xc2MnO1xuaW1wb3J0IHJvYmluIGZyb20gJy4vbGliL3Byb2plY3Rpb25zL3JvYmluJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHByb2o0KXtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQodG1lcmMpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChldG1lcmMpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZCh1dG0pO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChzdGVyZWEpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChzdGVyZSk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKHNvbWVyYyk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKG9tZXJjKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQobGNjKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoa3JvdmFrKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoY2Fzcyk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKGxhZWEpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChhZWEpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChnbm9tKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoY2VhKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoZXFjKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQocG9seSk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKG56bWcpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChtaWxsKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoc2ludSk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKG1vbGwpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChlcWRjKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQodmFuZGcpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChhZXFkKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQob3J0aG8pO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChxc2MpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChyb2Jpbik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvajQvcHJvanMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2o0L3Byb2pzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBEMlIgPSAwLjAxNzQ1MzI5MjUxOTk0MzI5NTc3O1xuaW1wb3J0IHBhcnNlciBmcm9tICcuL3BhcnNlcic7XG5pbXBvcnQge3NFeHByfSBmcm9tICcuL3Byb2Nlc3MnO1xuXG5cblxuZnVuY3Rpb24gcmVuYW1lKG9iaiwgcGFyYW1zKSB7XG4gIHZhciBvdXROYW1lID0gcGFyYW1zWzBdO1xuICB2YXIgaW5OYW1lID0gcGFyYW1zWzFdO1xuICBpZiAoIShvdXROYW1lIGluIG9iaikgJiYgKGluTmFtZSBpbiBvYmopKSB7XG4gICAgb2JqW291dE5hbWVdID0gb2JqW2luTmFtZV07XG4gICAgaWYgKHBhcmFtcy5sZW5ndGggPT09IDMpIHtcbiAgICAgIG9ialtvdXROYW1lXSA9IHBhcmFtc1syXShvYmpbb3V0TmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkMnIoaW5wdXQpIHtcbiAgcmV0dXJuIGlucHV0ICogRDJSO1xufVxuXG5mdW5jdGlvbiBjbGVhbldLVCh3a3QpIHtcbiAgaWYgKHdrdC50eXBlID09PSAnR0VPR0NTJykge1xuICAgIHdrdC5wcm9qTmFtZSA9ICdsb25nbGF0JztcbiAgfSBlbHNlIGlmICh3a3QudHlwZSA9PT0gJ0xPQ0FMX0NTJykge1xuICAgIHdrdC5wcm9qTmFtZSA9ICdpZGVudGl0eSc7XG4gICAgd2t0LmxvY2FsID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHdrdC5QUk9KRUNUSU9OID09PSAnb2JqZWN0Jykge1xuICAgICAgd2t0LnByb2pOYW1lID0gT2JqZWN0LmtleXMod2t0LlBST0pFQ1RJT04pWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB3a3QucHJvak5hbWUgPSB3a3QuUFJPSkVDVElPTjtcbiAgICB9XG4gIH1cbiAgaWYgKHdrdC5VTklUKSB7XG4gICAgd2t0LnVuaXRzID0gd2t0LlVOSVQubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh3a3QudW5pdHMgPT09ICdtZXRyZScpIHtcbiAgICAgIHdrdC51bml0cyA9ICdtZXRlcic7XG4gICAgfVxuICAgIGlmICh3a3QuVU5JVC5jb252ZXJ0KSB7XG4gICAgICBpZiAod2t0LnR5cGUgPT09ICdHRU9HQ1MnKSB7XG4gICAgICAgIGlmICh3a3QuREFUVU0gJiYgd2t0LkRBVFVNLlNQSEVST0lEKSB7XG4gICAgICAgICAgd2t0LnRvX21ldGVyID0gd2t0LlVOSVQuY29udmVydCp3a3QuREFUVU0uU1BIRVJPSUQuYTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2t0LnRvX21ldGVyID0gd2t0LlVOSVQuY29udmVydDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFyIGdlb2djcyA9IHdrdC5HRU9HQ1M7XG4gIGlmICh3a3QudHlwZSA9PT0gJ0dFT0dDUycpIHtcbiAgICBnZW9nY3MgPSB3a3Q7XG4gIH1cbiAgaWYgKGdlb2djcykge1xuICAgIC8vaWYod2t0LkdFT0dDUy5QUklNRU0mJndrdC5HRU9HQ1MuUFJJTUVNLmNvbnZlcnQpe1xuICAgIC8vICB3a3QuZnJvbV9ncmVlbndpY2g9d2t0LkdFT0dDUy5QUklNRU0uY29udmVydCpEMlI7XG4gICAgLy99XG4gICAgaWYgKGdlb2djcy5EQVRVTSkge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9IGdlb2djcy5EQVRVTS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSBnZW9nY3MubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAod2t0LmRhdHVtQ29kZS5zbGljZSgwLCAyKSA9PT0gJ2RfJykge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9IHdrdC5kYXR1bUNvZGUuc2xpY2UoMik7XG4gICAgfVxuICAgIGlmICh3a3QuZGF0dW1Db2RlID09PSAnbmV3X3plYWxhbmRfZ2VvZGV0aWNfZGF0dW1fMTk0OScgfHwgd2t0LmRhdHVtQ29kZSA9PT0gJ25ld196ZWFsYW5kXzE5NDknKSB7XG4gICAgICB3a3QuZGF0dW1Db2RlID0gJ256Z2Q0OSc7XG4gICAgfVxuICAgIGlmICh3a3QuZGF0dW1Db2RlID09PSAnd2dzXzE5ODQnKSB7XG4gICAgICBpZiAod2t0LlBST0pFQ1RJT04gPT09ICdNZXJjYXRvcl9BdXhpbGlhcnlfU3BoZXJlJykge1xuICAgICAgICB3a3Quc3BoZXJlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHdrdC5kYXR1bUNvZGUgPSAnd2dzODQnO1xuICAgIH1cbiAgICBpZiAod2t0LmRhdHVtQ29kZS5zbGljZSgtNikgPT09ICdfZmVycm8nKSB7XG4gICAgICB3a3QuZGF0dW1Db2RlID0gd2t0LmRhdHVtQ29kZS5zbGljZSgwLCAtIDYpO1xuICAgIH1cbiAgICBpZiAod2t0LmRhdHVtQ29kZS5zbGljZSgtOCkgPT09ICdfamFrYXJ0YScpIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSB3a3QuZGF0dW1Db2RlLnNsaWNlKDAsIC0gOCk7XG4gICAgfVxuICAgIGlmICh+d2t0LmRhdHVtQ29kZS5pbmRleE9mKCdiZWxnZScpKSB7XG4gICAgICB3a3QuZGF0dW1Db2RlID0gJ3JuYjcyJztcbiAgICB9XG4gICAgaWYgKGdlb2djcy5EQVRVTSAmJiBnZW9nY3MuREFUVU0uU1BIRVJPSUQpIHtcbiAgICAgIHdrdC5lbGxwcyA9IGdlb2djcy5EQVRVTS5TUEhFUk9JRC5uYW1lLnJlcGxhY2UoJ18xOScsICcnKS5yZXBsYWNlKC9bQ2NdbGFya2VcXF8xOC8sICdjbHJrJyk7XG4gICAgICBpZiAod2t0LmVsbHBzLnRvTG93ZXJDYXNlKCkuc2xpY2UoMCwgMTMpID09PSAnaW50ZXJuYXRpb25hbCcpIHtcbiAgICAgICAgd2t0LmVsbHBzID0gJ2ludGwnO1xuICAgICAgfVxuXG4gICAgICB3a3QuYSA9IGdlb2djcy5EQVRVTS5TUEhFUk9JRC5hO1xuICAgICAgd2t0LnJmID0gcGFyc2VGbG9hdChnZW9nY3MuREFUVU0uU1BIRVJPSUQucmYsIDEwKTtcbiAgICB9XG5cbiAgICBpZiAoZ2VvZ2NzLkRBVFVNICYmIGdlb2djcy5EQVRVTS5UT1dHUzg0KSB7XG4gICAgICB3a3QuZGF0dW1fcGFyYW1zID0gZ2VvZ2NzLkRBVFVNLlRPV0dTODQ7XG4gICAgfVxuICAgIGlmICh+d2t0LmRhdHVtQ29kZS5pbmRleE9mKCdvc2diXzE5MzYnKSkge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9ICdvc2diMzYnO1xuICAgIH1cbiAgICBpZiAofndrdC5kYXR1bUNvZGUuaW5kZXhPZignb3NuaV8xOTUyJykpIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSAnb3NuaTUyJztcbiAgICB9XG4gICAgaWYgKH53a3QuZGF0dW1Db2RlLmluZGV4T2YoJ3RtNjUnKVxuICAgICAgfHwgfndrdC5kYXR1bUNvZGUuaW5kZXhPZignZ2VvZGV0aWNfZGF0dW1fb2ZfMTk2NScpKSB7XG4gICAgICB3a3QuZGF0dW1Db2RlID0gJ2lyZTY1JztcbiAgICB9XG4gICAgaWYgKHdrdC5kYXR1bUNvZGUgPT09ICdjaDE5MDMrJykge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9ICdjaDE5MDMnO1xuICAgIH1cbiAgICBpZiAofndrdC5kYXR1bUNvZGUuaW5kZXhPZignaXNyYWVsJykpIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSAnaXNyOTMnO1xuICAgIH1cbiAgfVxuICBpZiAod2t0LmIgJiYgIWlzRmluaXRlKHdrdC5iKSkge1xuICAgIHdrdC5iID0gd2t0LmE7XG4gIH1cblxuICBmdW5jdGlvbiB0b01ldGVyKGlucHV0KSB7XG4gICAgdmFyIHJhdGlvID0gd2t0LnRvX21ldGVyIHx8IDE7XG4gICAgcmV0dXJuIGlucHV0ICogcmF0aW87XG4gIH1cbiAgdmFyIHJlbmFtZXIgPSBmdW5jdGlvbihhKSB7XG4gICAgcmV0dXJuIHJlbmFtZSh3a3QsIGEpO1xuICB9O1xuICB2YXIgbGlzdCA9IFtcbiAgICBbJ3N0YW5kYXJkX3BhcmFsbGVsXzEnLCAnU3RhbmRhcmRfUGFyYWxsZWxfMSddLFxuICAgIFsnc3RhbmRhcmRfcGFyYWxsZWxfMicsICdTdGFuZGFyZF9QYXJhbGxlbF8yJ10sXG4gICAgWydmYWxzZV9lYXN0aW5nJywgJ0ZhbHNlX0Vhc3RpbmcnXSxcbiAgICBbJ2ZhbHNlX25vcnRoaW5nJywgJ0ZhbHNlX05vcnRoaW5nJ10sXG4gICAgWydjZW50cmFsX21lcmlkaWFuJywgJ0NlbnRyYWxfTWVyaWRpYW4nXSxcbiAgICBbJ2xhdGl0dWRlX29mX29yaWdpbicsICdMYXRpdHVkZV9PZl9PcmlnaW4nXSxcbiAgICBbJ2xhdGl0dWRlX29mX29yaWdpbicsICdDZW50cmFsX1BhcmFsbGVsJ10sXG4gICAgWydzY2FsZV9mYWN0b3InLCAnU2NhbGVfRmFjdG9yJ10sXG4gICAgWydrMCcsICdzY2FsZV9mYWN0b3InXSxcbiAgICBbJ2xhdGl0dWRlX29mX2NlbnRlcicsICdMYXRpdHVkZV9PZl9DZW50ZXInXSxcbiAgICBbJ2xhdGl0dWRlX29mX2NlbnRlcicsICdMYXRpdHVkZV9vZl9jZW50ZXInXSxcbiAgICBbJ2xhdDAnLCAnbGF0aXR1ZGVfb2ZfY2VudGVyJywgZDJyXSxcbiAgICBbJ2xvbmdpdHVkZV9vZl9jZW50ZXInLCAnTG9uZ2l0dWRlX09mX0NlbnRlciddLFxuICAgIFsnbG9uZ2l0dWRlX29mX2NlbnRlcicsICdMb25naXR1ZGVfb2ZfY2VudGVyJ10sXG4gICAgWydsb25nYycsICdsb25naXR1ZGVfb2ZfY2VudGVyJywgZDJyXSxcbiAgICBbJ3gwJywgJ2ZhbHNlX2Vhc3RpbmcnLCB0b01ldGVyXSxcbiAgICBbJ3kwJywgJ2ZhbHNlX25vcnRoaW5nJywgdG9NZXRlcl0sXG4gICAgWydsb25nMCcsICdjZW50cmFsX21lcmlkaWFuJywgZDJyXSxcbiAgICBbJ2xhdDAnLCAnbGF0aXR1ZGVfb2Zfb3JpZ2luJywgZDJyXSxcbiAgICBbJ2xhdDAnLCAnc3RhbmRhcmRfcGFyYWxsZWxfMScsIGQycl0sXG4gICAgWydsYXQxJywgJ3N0YW5kYXJkX3BhcmFsbGVsXzEnLCBkMnJdLFxuICAgIFsnbGF0MicsICdzdGFuZGFyZF9wYXJhbGxlbF8yJywgZDJyXSxcbiAgICBbJ2F6aW11dGgnLCAnQXppbXV0aCddLFxuICAgIFsnYWxwaGEnLCAnYXppbXV0aCcsIGQycl0sXG4gICAgWydzcnNDb2RlJywgJ25hbWUnXVxuICBdO1xuICBsaXN0LmZvckVhY2gocmVuYW1lcik7XG4gIGlmICghd2t0LmxvbmcwICYmIHdrdC5sb25nYyAmJiAod2t0LnByb2pOYW1lID09PSAnQWxiZXJzX0NvbmljX0VxdWFsX0FyZWEnIHx8IHdrdC5wcm9qTmFtZSA9PT0gJ0xhbWJlcnRfQXppbXV0aGFsX0VxdWFsX0FyZWEnKSkge1xuICAgIHdrdC5sb25nMCA9IHdrdC5sb25nYztcbiAgfVxuICBpZiAoIXdrdC5sYXRfdHMgJiYgd2t0LmxhdDEgJiYgKHdrdC5wcm9qTmFtZSA9PT0gJ1N0ZXJlb2dyYXBoaWNfU291dGhfUG9sZScgfHwgd2t0LnByb2pOYW1lID09PSAnUG9sYXIgU3RlcmVvZ3JhcGhpYyAodmFyaWFudCBCKScpKSB7XG4gICAgd2t0LmxhdDAgPSBkMnIod2t0LmxhdDEgPiAwID8gOTAgOiAtOTApO1xuICAgIHdrdC5sYXRfdHMgPSB3a3QubGF0MTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24od2t0KSB7XG4gIHZhciBsaXNwID0gcGFyc2VyKHdrdCk7XG4gIHZhciB0eXBlID0gbGlzcC5zaGlmdCgpO1xuICB2YXIgbmFtZSA9IGxpc3Auc2hpZnQoKTtcbiAgbGlzcC51bnNoaWZ0KFsnbmFtZScsIG5hbWVdKTtcbiAgbGlzcC51bnNoaWZ0KFsndHlwZScsIHR5cGVdKTtcbiAgdmFyIG9iaiA9IHt9O1xuICBzRXhwcihsaXNwLCBvYmopO1xuICBjbGVhbldLVChvYmopO1xuICByZXR1cm4gb2JqO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2t0LXBhcnNlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2t0LXBhcnNlci9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBwYXJzZVN0cmluZztcblxudmFyIE5FVVRSQUwgPSAxO1xudmFyIEtFWVdPUkQgPSAyO1xudmFyIE5VTUJFUiA9IDM7XG52YXIgUVVPVEVEID0gNDtcbnZhciBBRlRFUlFVT1RFID0gNTtcbnZhciBFTkRFRCA9IC0xO1xudmFyIHdoaXRlc3BhY2UgPSAvXFxzLztcbnZhciBsYXRpbiA9IC9bQS1aYS16XS87XG52YXIga2V5d29yZCA9IC9bQS1aYS16ODRdLztcbnZhciBlbmRUaGluZ3MgPSAvWyxcXF1dLztcbnZhciBkaWdldHMgPSAvW1xcZFxcLkVcXC1cXCtdLztcbi8vIGNvbnN0IGlnbm9yZWRDaGFyID0gL1tcXHNfXFwtXFwvXFwoXFwpXS9nO1xuZnVuY3Rpb24gUGFyc2VyKHRleHQpIHtcbiAgaWYgKHR5cGVvZiB0ZXh0ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignbm90IGEgc3RyaW5nJyk7XG4gIH1cbiAgdGhpcy50ZXh0ID0gdGV4dC50cmltKCk7XG4gIHRoaXMubGV2ZWwgPSAwO1xuICB0aGlzLnBsYWNlID0gMDtcbiAgdGhpcy5yb290ID0gbnVsbDtcbiAgdGhpcy5zdGFjayA9IFtdO1xuICB0aGlzLmN1cnJlbnRPYmplY3QgPSBudWxsO1xuICB0aGlzLnN0YXRlID0gTkVVVFJBTDtcbn1cblBhcnNlci5wcm90b3R5cGUucmVhZENoYXJpY3RlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY2hhciA9IHRoaXMudGV4dFt0aGlzLnBsYWNlKytdO1xuICBpZiAodGhpcy5zdGF0ZSAhPT0gUVVPVEVEKSB7XG4gICAgd2hpbGUgKHdoaXRlc3BhY2UudGVzdChjaGFyKSkge1xuICAgICAgaWYgKHRoaXMucGxhY2UgPj0gdGhpcy50ZXh0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjaGFyID0gdGhpcy50ZXh0W3RoaXMucGxhY2UrK107XG4gICAgfVxuICB9XG4gIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgIGNhc2UgTkVVVFJBTDpcbiAgICAgIHJldHVybiB0aGlzLm5ldXRyYWwoY2hhcik7XG4gICAgY2FzZSBLRVlXT1JEOlxuICAgICAgcmV0dXJuIHRoaXMua2V5d29yZChjaGFyKVxuICAgIGNhc2UgUVVPVEVEOlxuICAgICAgcmV0dXJuIHRoaXMucXVvdGVkKGNoYXIpO1xuICAgIGNhc2UgQUZURVJRVU9URTpcbiAgICAgIHJldHVybiB0aGlzLmFmdGVycXVvdGUoY2hhcik7XG4gICAgY2FzZSBOVU1CRVI6XG4gICAgICByZXR1cm4gdGhpcy5udW1iZXIoY2hhcik7XG4gICAgY2FzZSBFTkRFRDpcbiAgICAgIHJldHVybjtcbiAgfVxufTtcblBhcnNlci5wcm90b3R5cGUuYWZ0ZXJxdW90ZSA9IGZ1bmN0aW9uKGNoYXIpIHtcbiAgaWYgKGNoYXIgPT09ICdcIicpIHtcbiAgICB0aGlzLndvcmQgKz0gJ1wiJztcbiAgICB0aGlzLnN0YXRlID0gUVVPVEVEO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZW5kVGhpbmdzLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLndvcmQgPSB0aGlzLndvcmQudHJpbSgpO1xuICAgIHRoaXMuYWZ0ZXJJdGVtKGNoYXIpO1xuICAgIHJldHVybjtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ2hhdm5cXCd0IGhhbmRsZWQgXCInICtjaGFyICsgJ1wiIGluIGFmdGVycXVvdGUgeWV0LCBpbmRleCAnICsgdGhpcy5wbGFjZSk7XG59O1xuUGFyc2VyLnByb3RvdHlwZS5hZnRlckl0ZW0gPSBmdW5jdGlvbihjaGFyKSB7XG4gIGlmIChjaGFyID09PSAnLCcpIHtcbiAgICBpZiAodGhpcy53b3JkICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmN1cnJlbnRPYmplY3QucHVzaCh0aGlzLndvcmQpO1xuICAgIH1cbiAgICB0aGlzLndvcmQgPSBudWxsO1xuICAgIHRoaXMuc3RhdGUgPSBORVVUUkFMO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2hhciA9PT0gJ10nKSB7XG4gICAgdGhpcy5sZXZlbC0tO1xuICAgIGlmICh0aGlzLndvcmQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY3VycmVudE9iamVjdC5wdXNoKHRoaXMud29yZCk7XG4gICAgICB0aGlzLndvcmQgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlID0gTkVVVFJBTDtcbiAgICB0aGlzLmN1cnJlbnRPYmplY3QgPSB0aGlzLnN0YWNrLnBvcCgpO1xuICAgIGlmICghdGhpcy5jdXJyZW50T2JqZWN0KSB7XG4gICAgICB0aGlzLnN0YXRlID0gRU5ERUQ7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG59O1xuUGFyc2VyLnByb3RvdHlwZS5udW1iZXIgPSBmdW5jdGlvbihjaGFyKSB7XG4gIGlmIChkaWdldHMudGVzdChjaGFyKSkge1xuICAgIHRoaXMud29yZCArPSBjaGFyO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZW5kVGhpbmdzLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLndvcmQgPSBwYXJzZUZsb2F0KHRoaXMud29yZCk7XG4gICAgdGhpcy5hZnRlckl0ZW0oY2hhcik7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignaGF2blxcJ3QgaGFuZGxlZCBcIicgK2NoYXIgKyAnXCIgaW4gbnVtYmVyIHlldCwgaW5kZXggJyArIHRoaXMucGxhY2UpO1xufTtcblBhcnNlci5wcm90b3R5cGUucXVvdGVkID0gZnVuY3Rpb24oY2hhcikge1xuICBpZiAoY2hhciA9PT0gJ1wiJykge1xuICAgIHRoaXMuc3RhdGUgPSBBRlRFUlFVT1RFO1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLndvcmQgKz0gY2hhcjtcbiAgcmV0dXJuO1xufTtcblBhcnNlci5wcm90b3R5cGUua2V5d29yZCA9IGZ1bmN0aW9uKGNoYXIpIHtcbiAgaWYgKGtleXdvcmQudGVzdChjaGFyKSkge1xuICAgIHRoaXMud29yZCArPSBjaGFyO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2hhciA9PT0gJ1snKSB7XG4gICAgdmFyIG5ld09iamVjdHMgPSBbXTtcbiAgICBuZXdPYmplY3RzLnB1c2godGhpcy53b3JkKTtcbiAgICB0aGlzLmxldmVsKys7XG4gICAgaWYgKHRoaXMucm9vdCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5yb290ID0gbmV3T2JqZWN0cztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50T2JqZWN0LnB1c2gobmV3T2JqZWN0cyk7XG4gICAgfVxuICAgIHRoaXMuc3RhY2sucHVzaCh0aGlzLmN1cnJlbnRPYmplY3QpO1xuICAgIHRoaXMuY3VycmVudE9iamVjdCA9IG5ld09iamVjdHM7XG4gICAgdGhpcy5zdGF0ZSA9IE5FVVRSQUw7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlbmRUaGluZ3MudGVzdChjaGFyKSkge1xuICAgIHRoaXMuYWZ0ZXJJdGVtKGNoYXIpO1xuICAgIHJldHVybjtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ2hhdm5cXCd0IGhhbmRsZWQgXCInICtjaGFyICsgJ1wiIGluIGtleXdvcmQgeWV0LCBpbmRleCAnICsgdGhpcy5wbGFjZSk7XG59O1xuUGFyc2VyLnByb3RvdHlwZS5uZXV0cmFsID0gZnVuY3Rpb24oY2hhcikge1xuICBpZiAobGF0aW4udGVzdChjaGFyKSkge1xuICAgIHRoaXMud29yZCA9IGNoYXI7XG4gICAgdGhpcy5zdGF0ZSA9IEtFWVdPUkQ7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjaGFyID09PSAnXCInKSB7XG4gICAgdGhpcy53b3JkID0gJyc7XG4gICAgdGhpcy5zdGF0ZSA9IFFVT1RFRDtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGRpZ2V0cy50ZXN0KGNoYXIpKSB7XG4gICAgdGhpcy53b3JkID0gY2hhcjtcbiAgICB0aGlzLnN0YXRlID0gTlVNQkVSO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZW5kVGhpbmdzLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLmFmdGVySXRlbShjaGFyKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdoYXZuXFwndCBoYW5kbGVkIFwiJyArY2hhciArICdcIiBpbiBuZXV0cmFsIHlldCwgaW5kZXggJyArIHRoaXMucGxhY2UpO1xufTtcblBhcnNlci5wcm90b3R5cGUub3V0cHV0ID0gZnVuY3Rpb24oKSB7XG4gIHdoaWxlICh0aGlzLnBsYWNlIDwgdGhpcy50ZXh0Lmxlbmd0aCkge1xuICAgIHRoaXMucmVhZENoYXJpY3RlcigpO1xuICB9XG4gIGlmICh0aGlzLnN0YXRlID09PSBFTkRFRCkge1xuICAgIHJldHVybiB0aGlzLnJvb3Q7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCd1bmFibGUgdG8gcGFyc2Ugc3RyaW5nIFwiJyArdGhpcy50ZXh0ICsgJ1wiLiBTdGF0ZSBpcyAnICsgdGhpcy5zdGF0ZSk7XG59O1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyh0eHQpIHtcbiAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIodHh0KTtcbiAgcmV0dXJuIHBhcnNlci5vdXRwdXQoKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3drdC1wYXJzZXIvcGFyc2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93a3QtcGFyc2VyL3BhcnNlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcblxuZnVuY3Rpb24gbWFwaXQob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGtleSkpIHtcbiAgICB2YWx1ZS51bnNoaWZ0KGtleSk7XG4gICAga2V5ID0gbnVsbDtcbiAgfVxuICB2YXIgdGhpbmcgPSBrZXkgPyB7fSA6IG9iajtcblxuICB2YXIgb3V0ID0gdmFsdWUucmVkdWNlKGZ1bmN0aW9uKG5ld09iaiwgaXRlbSkge1xuICAgIHNFeHByKGl0ZW0sIG5ld09iaik7XG4gICAgcmV0dXJuIG5ld09ialxuICB9LCB0aGluZyk7XG4gIGlmIChrZXkpIHtcbiAgICBvYmpba2V5XSA9IG91dDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc0V4cHIodiwgb2JqKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheSh2KSkge1xuICAgIG9ialt2XSA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBrZXkgPSB2LnNoaWZ0KCk7XG4gIGlmIChrZXkgPT09ICdQQVJBTUVURVInKSB7XG4gICAga2V5ID0gdi5zaGlmdCgpO1xuICB9XG4gIGlmICh2Lmxlbmd0aCA9PT0gMSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZbMF0pKSB7XG4gICAgICBvYmpba2V5XSA9IHt9O1xuICAgICAgc0V4cHIodlswXSwgb2JqW2tleV0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvYmpba2V5XSA9IHZbMF07XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghdi5sZW5ndGgpIHtcbiAgICBvYmpba2V5XSA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChrZXkgPT09ICdUT1dHUzg0Jykge1xuICAgIG9ialtrZXldID0gdjtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFBcnJheS5pc0FycmF5KGtleSkpIHtcbiAgICBvYmpba2V5XSA9IHt9O1xuICB9XG5cbiAgdmFyIGk7XG4gIHN3aXRjaCAoa2V5KSB7XG4gICAgY2FzZSAnVU5JVCc6XG4gICAgY2FzZSAnUFJJTUVNJzpcbiAgICBjYXNlICdWRVJUX0RBVFVNJzpcbiAgICAgIG9ialtrZXldID0ge1xuICAgICAgICBuYW1lOiB2WzBdLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIGNvbnZlcnQ6IHZbMV1cbiAgICAgIH07XG4gICAgICBpZiAodi5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgc0V4cHIodlsyXSwgb2JqW2tleV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIGNhc2UgJ1NQSEVST0lEJzpcbiAgICBjYXNlICdFTExJUFNPSUQnOlxuICAgICAgb2JqW2tleV0gPSB7XG4gICAgICAgIG5hbWU6IHZbMF0sXG4gICAgICAgIGE6IHZbMV0sXG4gICAgICAgIHJmOiB2WzJdXG4gICAgICB9O1xuICAgICAgaWYgKHYubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHNFeHByKHZbM10sIG9ialtrZXldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICBjYXNlICdQUk9KRUNURURDUlMnOlxuICAgIGNhc2UgJ1BST0pDUlMnOlxuICAgIGNhc2UgJ0dFT0dDUyc6XG4gICAgY2FzZSAnR0VPQ0NTJzpcbiAgICBjYXNlICdQUk9KQ1MnOlxuICAgIGNhc2UgJ0xPQ0FMX0NTJzpcbiAgICBjYXNlICdHRU9EQ1JTJzpcbiAgICBjYXNlICdHRU9ERVRJQ0NSUyc6XG4gICAgY2FzZSAnR0VPREVUSUNEQVRVTSc6XG4gICAgY2FzZSAnRURBVFVNJzpcbiAgICBjYXNlICdFTkdJTkVFUklOR0RBVFVNJzpcbiAgICBjYXNlICdWRVJUX0NTJzpcbiAgICBjYXNlICdWRVJUQ1JTJzpcbiAgICBjYXNlICdWRVJUSUNBTENSUyc6XG4gICAgY2FzZSAnQ09NUERfQ1MnOlxuICAgIGNhc2UgJ0NPTVBPVU5EQ1JTJzpcbiAgICBjYXNlICdFTkdJTkVFUklOR0NSUyc6XG4gICAgY2FzZSAnRU5HQ1JTJzpcbiAgICBjYXNlICdGSVRURURfQ1MnOlxuICAgIGNhc2UgJ0xPQ0FMX0RBVFVNJzpcbiAgICBjYXNlICdEQVRVTSc6XG4gICAgICB2WzBdID0gWyduYW1lJywgdlswXV07XG4gICAgICBtYXBpdChvYmosIGtleSwgdik7XG4gICAgICByZXR1cm47XG4gICAgZGVmYXVsdDpcbiAgICAgIGkgPSAtMTtcbiAgICAgIHdoaWxlICgrK2kgPCB2Lmxlbmd0aCkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodltpXSkpIHtcbiAgICAgICAgICByZXR1cm4gc0V4cHIodiwgb2JqW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbWFwaXQob2JqLCBrZXksIHYpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93a3QtcGFyc2VyL3Byb2Nlc3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3drdC1wYXJzZXIvcHJvY2Vzcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9