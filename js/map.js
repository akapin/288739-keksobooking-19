'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var MapConstraint = {
    LEFT: 0,
    RIGHT: 1200,
    TOP: 130,
    BOTTOM: 630,
  };
  var map = document.querySelector('.map');
  var mapFiltersForm = map.querySelector('.map__filters');
  var housingTypeFilter = mapFiltersForm.querySelector('#housing-type');
  var housingPriceFilter = mapFiltersForm.querySelector('#housing-price');
  var housingRoomsFilter = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuestsFilter = mapFiltersForm.querySelector('#housing-guests');
  var featureWifiFilter = mapFiltersForm.querySelector('#filter-wifi');
  var featureDishwasherFilter = mapFiltersForm.querySelector('#filter-dishwasher');
  var featureParkingFilter = mapFiltersForm.querySelector('#filter-parking');
  var featureWasherFilter = mapFiltersForm.querySelector('#filter-washer');
  var featureElevatorFilter = mapFiltersForm.querySelector('#filter-elevator');
  var featureConditionerFilter = mapFiltersForm.querySelector('#filter-conditioner');
  var mapFilters = mapFiltersForm.children;
  var offers = [];

  var updateOffers = function () {
    var filteredOffers = filterOffers(offers);
    window.pin.render(filteredOffers);
  };

  var filterOffers = function (offersData) {
    var housingTypeFilterValue = housingTypeFilter.options[housingTypeFilter.selectedIndex].value;
    var housingPriceFilterValue = housingPriceFilter.options[housingPriceFilter.selectedIndex].value;
    var housingRoomsFilterValue = housingRoomsFilter.options[housingRoomsFilter.selectedIndex].value;
    var housingGuestsFilterValue = housingGuestsFilter.options[housingGuestsFilter.selectedIndex].value;

    var filteredOffers = offersData
    .filter(function (item) {
      return housingTypeFilterValue === 'any' ? true : item.offer.type === housingTypeFilterValue;
    })
    .filter(function (item) {
      if (housingPriceFilterValue === 'any') {
        return true;
      } else if (housingPriceFilterValue === 'middle') {
        return item.offer.price >= 10000 && item.offer.price <= 50000;
      } else if (housingPriceFilterValue === 'low') {
        return item.offer.price < 10000;
      }
      return item.offer.price > 50000;
    })
    .filter(function (item) {
      return housingRoomsFilterValue === 'any' ? true : item.offer.rooms === parseInt(housingRoomsFilterValue, 10);
    })
    .filter(function (item) {
      return housingGuestsFilterValue === 'any' ? true : item.offer.guests === parseInt(housingGuestsFilterValue, 10);
    })
    .filter(function (item) {
      return !featureWifiFilter.checked ? true : item.offer.features.includes('wifi');
    })
    .filter(function (item) {
      return !featureDishwasherFilter.checked ? true : item.offer.features.includes('dishwasher');
    })
    .filter(function (item) {
      return !featureParkingFilter.checked ? true : item.offer.features.includes('parking');
    })
    .filter(function (item) {
      return !featureWasherFilter.checked ? true : item.offer.features.includes('washer');
    })
    .filter(function (item) {
      return !featureElevatorFilter.checked ? true : item.offer.features.includes('elevator');
    })
    .filter(function (item) {
      return !featureConditionerFilter.checked ? true : item.offer.features.includes('conditioner');
    });

    return filteredOffers;
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
    housingTypeFilter.removeEventListener('change', onHousingTypeFilterChange);
    housingPriceFilter.removeEventListener('change', onHousingPriceFilterChange);
    housingRoomsFilter.removeEventListener('change', onHousingRoomsFilterChange);
    housingGuestsFilter.removeEventListener('change', onHousingGuestsFilterChange);
    featureWifiFilter.removeEventListener('change', onFeatureWifiFilterChange);
    featureDishwasherFilter.removeEventListener('change', onFeatureDishwasherFilterChange);
    featureParkingFilter.removeEventListener('change', onFeatureParkingFilterChange);
    featureWasherFilter.removeEventListener('change', onFeatureWasherFilterChange);
    featureElevatorFilter.removeEventListener('change', onFeatureElevatorFilterChange);
    featureConditionerFilter.removeEventListener('change', onFeatureConditionerFilterChange);
  };

  var addFiltersFormEventListeners = function () {
    housingTypeFilter.addEventListener('change', onHousingTypeFilterChange);
    housingPriceFilter.addEventListener('change', onHousingPriceFilterChange);
    housingRoomsFilter.addEventListener('change', onHousingRoomsFilterChange);
    housingGuestsFilter.addEventListener('change', onHousingGuestsFilterChange);
    featureWifiFilter.addEventListener('change', onFeatureWifiFilterChange);
    featureDishwasherFilter.addEventListener('change', onFeatureDishwasherFilterChange);
    featureParkingFilter.addEventListener('change', onFeatureParkingFilterChange);
    featureWasherFilter.addEventListener('change', onFeatureWasherFilterChange);
    featureElevatorFilter.addEventListener('change', onFeatureElevatorFilterChange);
    featureConditionerFilter.addEventListener('change', onFeatureConditionerFilterChange);
  };

  var resetFiltersForm = function () {
    mapFiltersForm.reset();
  };

  var activateFiltersForm = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = false;
    }
    addFiltersFormEventListeners();
  };

  var deactivateFiltersForm = function () {
    resetFiltersForm();
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = true;
    }
    removeFiltersFormEventListeners();
  };

  var successHandler = function (data) {
    offers = data;
    window.pin.render(offers);
    activateFiltersForm();
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

  var initMap = function () {
    deactivateFiltersForm();
    window.pin.addEventListeners();
    map.classList.add('map--faded');
  };

  var activateMap = function () {
    window.pin.removeEventListeners();
    map.classList.remove('map--faded');
    window.backend.load(URL, successHandler, errorHandler);
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
