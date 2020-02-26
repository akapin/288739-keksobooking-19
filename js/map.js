'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var HousingPriceThreshold = {
    LOW: 10000,
    HIGH: 50000
  };
  var MapConstraint = {
    LEFT: 0,
    RIGHT: 1200,
    TOP: 130,
    BOTTOM: 630,
  };
  var mapElement = document.querySelector('.map');
  var mapFiltersFormElement = mapElement.querySelector('.map__filters');
  var housingTypeFilterElement = mapFiltersFormElement.querySelector('#housing-type');
  var housingPriceFilterElement = mapFiltersFormElement.querySelector('#housing-price');
  var housingRoomsFilterElement = mapFiltersFormElement.querySelector('#housing-rooms');
  var housingGuestsFilterElement = mapFiltersFormElement.querySelector('#housing-guests');
  var featureWifiFilterElement = mapFiltersFormElement.querySelector('#filter-wifi');
  var featureDishwasherFilterElement = mapFiltersFormElement.querySelector('#filter-dishwasher');
  var featureParkingFilterElement = mapFiltersFormElement.querySelector('#filter-parking');
  var featureWasherFilterElement = mapFiltersFormElement.querySelector('#filter-washer');
  var featureElevatorFilterElement = mapFiltersFormElement.querySelector('#filter-elevator');
  var featureConditionerFilterElement = mapFiltersFormElement.querySelector('#filter-conditioner');
  var mapFilterElements = mapFiltersFormElement.children;
  var offers = [];

  var updateOffers = function () {
    var filteredOffers = filterOffers(offers);
    window.pin.render(filteredOffers);
  };

  var filterOffers = function (offersData) {
    var housingTypeFilterValue = housingTypeFilterElement.options[housingTypeFilterElement.selectedIndex].value;
    var housingPriceFilterValue = housingPriceFilterElement.options[housingPriceFilterElement.selectedIndex].value;
    var housingRoomsFilterValue = housingRoomsFilterElement.options[housingRoomsFilterElement.selectedIndex].value;
    var housingGuestsFilterValue = housingGuestsFilterElement.options[housingGuestsFilterElement.selectedIndex].value;

    return offersData
      .filter(function (item) {
        return housingTypeFilterValue === 'any' ? true : item.offer.type === housingTypeFilterValue;
      })
      .filter(function (item) {
        if (housingPriceFilterValue === 'any') {
          return true;
        } else if (housingPriceFilterValue === 'middle') {
          return item.offer.price >= HousingPriceThreshold.LOW && item.offer.price <= HousingPriceThreshold.HIGH;
        } else if (housingPriceFilterValue === 'low') {
          return item.offer.price < HousingPriceThreshold.LOW;
        }
        return item.offer.price > HousingPriceThreshold.HIGH;
      })
      .filter(function (item) {
        return housingRoomsFilterValue === 'any' ? true : item.offer.rooms === parseInt(housingRoomsFilterValue, 10);
      })
      .filter(function (item) {
        return housingGuestsFilterValue === 'any' ? true : item.offer.guests === parseInt(housingGuestsFilterValue, 10);
      })
      .filter(function (item) {
        return !featureWifiFilterElement.checked ? true : item.offer.features.includes('wifi');
      })
      .filter(function (item) {
        return !featureDishwasherFilterElement.checked ? true : item.offer.features.includes('dishwasher');
      })
      .filter(function (item) {
        return !featureParkingFilterElement.checked ? true : item.offer.features.includes('parking');
      })
      .filter(function (item) {
        return !featureWasherFilterElement.checked ? true : item.offer.features.includes('washer');
      })
      .filter(function (item) {
        return !featureElevatorFilterElement.checked ? true : item.offer.features.includes('elevator');
      })
      .filter(function (item) {
        return !featureConditionerFilterElement.checked ? true : item.offer.features.includes('conditioner');
      });
  };

  var onFormChange = window.debounce(function () {
    window.card.close();
    updateOffers();
  });

  var onHousingTypeFilterChange = onFormChange;
  var onHousingPriceFilterChange = onFormChange;
  var onHousingRoomsFilterChange = onFormChange;
  var onHousingGuestsFilterChange = onFormChange;
  var onFeatureWifiFilterChange = onFormChange;
  var onFeatureDishwasherFilterChange = onFormChange;
  var onFeatureParkingFilterChange = onFormChange;
  var onFeatureWasherFilterChange = onFormChange;
  var onFeatureElevatorFilterChange = onFormChange;
  var onFeatureConditionerFilterChange = onFormChange;

  var removeFiltersFormEventListeners = function () {
    housingTypeFilterElement.removeEventListener('change', onHousingTypeFilterChange);
    housingPriceFilterElement.removeEventListener('change', onHousingPriceFilterChange);
    housingRoomsFilterElement.removeEventListener('change', onHousingRoomsFilterChange);
    housingGuestsFilterElement.removeEventListener('change', onHousingGuestsFilterChange);
    featureWifiFilterElement.removeEventListener('change', onFeatureWifiFilterChange);
    featureDishwasherFilterElement.removeEventListener('change', onFeatureDishwasherFilterChange);
    featureParkingFilterElement.removeEventListener('change', onFeatureParkingFilterChange);
    featureWasherFilterElement.removeEventListener('change', onFeatureWasherFilterChange);
    featureElevatorFilterElement.removeEventListener('change', onFeatureElevatorFilterChange);
    featureConditionerFilterElement.removeEventListener('change', onFeatureConditionerFilterChange);
  };

  var addFiltersFormEventListeners = function () {
    housingTypeFilterElement.addEventListener('change', onHousingTypeFilterChange);
    housingPriceFilterElement.addEventListener('change', onHousingPriceFilterChange);
    housingRoomsFilterElement.addEventListener('change', onHousingRoomsFilterChange);
    housingGuestsFilterElement.addEventListener('change', onHousingGuestsFilterChange);
    featureWifiFilterElement.addEventListener('change', onFeatureWifiFilterChange);
    featureDishwasherFilterElement.addEventListener('change', onFeatureDishwasherFilterChange);
    featureParkingFilterElement.addEventListener('change', onFeatureParkingFilterChange);
    featureWasherFilterElement.addEventListener('change', onFeatureWasherFilterChange);
    featureElevatorFilterElement.addEventListener('change', onFeatureElevatorFilterChange);
    featureConditionerFilterElement.addEventListener('change', onFeatureConditionerFilterChange);
  };

  var resetFiltersForm = function () {
    mapFiltersFormElement.reset();
  };

  var activateFiltersForm = function () {
    for (var i = 0; i < mapFilterElements.length; i++) {
      mapFilterElements[i].disabled = false;
    }
    addFiltersFormEventListeners();
  };

  var deactivateFiltersForm = function () {
    resetFiltersForm();
    for (var i = 0; i < mapFilterElements.length; i++) {
      mapFilterElements[i].disabled = true;
    }
    removeFiltersFormEventListeners();
  };

  var onSuccess = function (data) {
    offers = data;
    window.pin.render(offers);
    activateFiltersForm();
  };

  var onError = function (errorMessage) {
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

  var initMap = function () {
    deactivateFiltersForm();
    window.pin.addEventListeners();
    mapElement.classList.add('map--faded');
  };

  var activateMap = function () {
    window.pin.removeEventListeners();
    mapElement.classList.remove('map--faded');
    window.backend.load(URL, onSuccess, onError);
  };

  var deactivateMap = function () {
    window.pin.reset();
    window.pin.resetMainLocation();
    window.card.close();
    initMap();
  };

  window.map = {
    init: initMap,
    activate: activateMap,
    deactivate: deactivateMap,
    constraint: MapConstraint
  };
})();
