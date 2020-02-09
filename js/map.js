'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var MOUSE_BUTTON_LEFT_CODE = 0;

  var map = document.querySelector('.map');
  var mapMainPin = map.querySelector('.map__pin--main');
  var mapFiltersBlock = map.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = mapFiltersBlock.children;

  var renderOfferPins = function (offers) {
    var mapPinsElement = map.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.pin.generate(offers[i]));
    }
    mapPinsElement.appendChild(fragment);
  };

  // var renderOfferCard = function (offers) {
  //   var mapFiltersContainer = map.querySelector('.map__filters-container');
  //   var offerCard = window.card.generate(offers[0]);
  //   map.insertBefore(offerCard, mapFiltersContainer);
  // };

  var activatePage = function () {
    mapMainPin.removeEventListener('mousedown', onMapMainPinMousedown);
    mapMainPin.removeEventListener('keydown', onMapMainPinKeydown);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = false;
    }
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = false;
    }
    window.form.roomCapacityCustomValidation();
    var offers = window.data.generateOffers();
    renderOfferPins(offers);
    // renderOfferCard(offers);
  };

  var disableFiltersForm = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = true;
    }
  };

  var onMapMainPinMousedown = function (evt) {
    if (evt.button === MOUSE_BUTTON_LEFT_CODE) {
      activatePage();
      window.form.fillActivePageAddressValue();
    }
  };

  var onMapMainPinKeydown = function (evt) {
    if (evt.key === ENTER_KEY) {
      activatePage();
      window.form.fillActivePageAddressValue();
    }
  };

  var initPage = function () {
    mapMainPin.addEventListener('mousedown', onMapMainPinMousedown);
    mapMainPin.addEventListener('keydown', onMapMainPinKeydown);
    disableFiltersForm();
    window.form.init();
  };

  initPage();
})();
