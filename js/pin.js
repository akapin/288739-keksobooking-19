'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var MOUSE_BUTTON_LEFT_CODE = 0;
  var OFFERS_MAX_NUMBER = 5;
  var OfferPinLocationShift = {
    X: -25,
    Y: -70,
  };
  var ActivePageMainPinLocationShift = {
    X: 32.5,
    Y: 87,
  };
  var InactivePageMainPinLocationShift = {
    X: 32.5,
    Y: 32.5,
  };

  var map = document.querySelector('.map');
  var mapPinsBlock = map.querySelector('.map__pins');
  var mapMainPin = map.querySelector('.map__pin--main');

  var generatePinElement = function (offer) {
    var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + (offer.location.x + OfferPinLocationShift.X) + 'px; top: ' + (offer.location.y + OfferPinLocationShift.Y) + 'px;';
    pinElement.querySelector('img').src = offer.author.avatar;
    pinElement.querySelector('img').alt = offer.offer.title;

    return pinElement;
  };

  var renderOfferPins = function (data) {
    resetMapPins();
    var offersAmount = data.length > OFFERS_MAX_NUMBER ? OFFERS_MAX_NUMBER : data.length;
    var fragment = document.createDocumentFragment();

    var addOfferPinListeners = function (offerPin, offerObj) {
      offerPin.addEventListener('click', function () {
        window.card.render(offerPin, offerObj);
      });
      offerPin.addEventListener('keydown', function (evt) {
        if (evt.key === ENTER_KEY) {
          window.card.render(offerPin, offerObj);
        }
      });
    };

    for (var i = 0; i < offersAmount; i++) {
      var offerObj = data[i];
      var offerPin = generatePinElement(offerObj);
      addOfferPinListeners(offerPin, offerObj);
      fragment.appendChild(offerPin);
    }
    mapPinsBlock.appendChild(fragment);
  };

  var resetMapPins = function () {
    var mapPins = mapPinsBlock.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      var mapPin = mapPins[i];
      if (!mapPin.classList.contains('map__pin--main')) {
        mapPin.parentNode.removeChild(mapPin);
      }
    }
  };

  var resetMainPinLocation = function () {
    mapMainPin.style.left = '570px';
    mapMainPin.style.top = '375px';
  };

  var activateMapPin = function (offerPin) {
    deactivateMapPin();
    offerPin.classList.add('map__pin--active');
  };

  var deactivateMapPin = function () {
    var activeMapPin = mapPinsBlock.querySelector('.map__pin--active');
    if (activeMapPin) {
      activeMapPin.classList.remove('map__pin--active');
    }
  };

  var onMapMainPinMousedown = function (evt) {
    if (evt.button === MOUSE_BUTTON_LEFT_CODE) {
      window.page.activate();
    }
  };

  var onMapMainPinKeydown = function (evt) {
    if (evt.key === ENTER_KEY) {
      window.page.activate();
    }
  };

  var addMainPinEventListeners = function () {
    mapMainPin.addEventListener('mousedown', onMapMainPinMousedown);
    mapMainPin.addEventListener('keydown', onMapMainPinKeydown);
  };

  var removeMainPinEventListeners = function () {
    mapMainPin.removeEventListener('mousedown', onMapMainPinMousedown);
    mapMainPin.removeEventListener('keydown', onMapMainPinKeydown);
  };

  window.pin = {
    render: renderOfferPins,
    resetMainLocation: resetMainPinLocation,
    reset: resetMapPins,
    activate: activateMapPin,
    deactivate: deactivateMapPin,
    addEventListeners: addMainPinEventListeners,
    removeEventListeners: removeMainPinEventListeners,
    activePageMainLocationShift: ActivePageMainPinLocationShift,
    inactivePageMainLocationShift: InactivePageMainPinLocationShift,
  };
})();
