'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var MOUSE_BUTTON_LEFT_CODE = 0;

  var mainBlock = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapMainPin = map.querySelector('.map__pin--main');
  var mapPinsBlock = map.querySelector('.map__pins');
  var mapFiltersBlock = map.querySelector('.map__filters');
  var mapFilters = mapFiltersBlock.children;

  var renderOfferPins = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.pin.generate(offers[i]));
    }
    mapPinsBlock.appendChild(fragment);
  };

  // var renderOfferCard = function (offers) {
  //   var mapFiltersContainer = map.querySelector('.map__filters-container');
  //   var offerCard = window.card.generate(offers[0]);
  //   map.insertBefore(offerCard, mapFiltersContainer);
  // };

  var onPageClick = function () {
    hideMessage();
  };

  var onPageKeydown = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      hideMessage();
    }
  };

  var showMessage = function (type) {
    var messageTemplate = document.querySelector('#' + type)
      .content
      .querySelector('.' + type);
    var messageElement = messageTemplate.cloneNode(true);

    mainBlock.appendChild(messageElement);

    document.addEventListener('click', onPageClick);
    document.addEventListener('keydown', onPageKeydown);
  };

  var hideMessage = function () {
    var messages = mainBlock.querySelectorAll('.success, .error');
    for (var i = 0; i < messages.length; i++) {
      mainBlock.removeChild(messages[i]);
    }

    document.removeEventListener('click', onPageClick);
    document.removeEventListener('keydown', onPageKeydown);
  };

  var successHandler = function (data) {
    renderOfferPins(data);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style['z-index'] = '100';
    node.style['text-align'] = 'center';
    node.style['background-color'] = 'red';
    node.style.margin = '0 auto';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var clearOtherUsersMapPins = function () {
    var mapPins = mapPinsBlock.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      var mapPin = mapPins[i];
      if (!mapPin.classList.contains('map__pin--main')) {
        mapPin.parentNode.removeChild(mapPin);
      }
    }
  };

  var activateMap = function () {
    mapMainPin.removeEventListener('mousedown', onMapMainPinMousedown);
    mapMainPin.removeEventListener('keydown', onMapMainPinKeydown);
    map.classList.remove('map--faded');
  };

  var deactivateMap = function () {
    clearOtherUsersMapPins();
    mapMainPin.addEventListener('mousedown', onMapMainPinMousedown);
    mapMainPin.addEventListener('keydown', onMapMainPinKeydown);
    map.classList.add('map--faded');
  };

  var activateFiltersForm = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = false;
    }
  };

  var deactivateFiltersForm = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = true;
    }
  };

  var initPage = function () {
    deactivatePage();
    window.form.init();
  };

  var activatePage = function () {
    activateMap();
    activateFiltersForm();
    window.form.activate();
    window.backend.load(successHandler, errorHandler);
    // renderOfferCard(offers);
  };

  var deactivatePage = function () {
    deactivateMap();
    deactivateFiltersForm();
    window.form.deactivate();
  };

  var onMapMainPinMousedown = function (evt) {
    if (evt.button === MOUSE_BUTTON_LEFT_CODE) {
      activatePage();
    }
  };

  var onMapMainPinKeydown = function (evt) {
    if (evt.key === ENTER_KEY) {
      activatePage();
    }
  };

  initPage();

  window.map = {
    deactivatePage: deactivatePage,
    showMessage: showMessage
  };
})();
