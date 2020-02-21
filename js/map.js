'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var ESCAPE_KEY = 'Escape';
  var mapConstraint = {
    LEFT: 0,
    RIGHT: 1200,
    TOP: 130,
    BOTTOM: 630,
  };

  var mainBlock = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapFiltersForm = map.querySelector('.map__filters');
  var houseTypeFilter = mapFiltersForm.querySelector('#housing-type');
  var mapFilters = mapFiltersForm.children;
  var offers = [];

  var updateOffers = function () {
    var houseTypeFilterValue = houseTypeFilter.options[houseTypeFilter.selectedIndex].value;
    var filteredOffers = offers;
    if (houseTypeFilterValue !== 'any') {
      filteredOffers = offers.filter(function (item) {
        return item.offer.type === houseTypeFilterValue;
      });
    }
    window.pin.render(filteredOffers);
  };

  var onHouseTypeFilterChange = window.debounce(function () {
    window.card.close();
    updateOffers();
  });

  var onPageClick = function () {
    hideMessage();
  };

  var onPageKeydown = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      hideMessage();
      window.card.close();
    }
  };

  var showMessage = function (type) {
    var messageTemplate = document.querySelector('#' + type)
      .content
      .querySelector('.' + type);
    var messageElement = messageTemplate.cloneNode(true);

    mainBlock.appendChild(messageElement);
    document.addEventListener('click', onPageClick);
  };

  var hideMessage = function () {
    var messages = mainBlock.querySelectorAll('.success, .error');
    for (var i = 0; i < messages.length; i++) {
      mainBlock.removeChild(messages[i]);
    }

    document.removeEventListener('click', onPageClick);
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
    window.pin.addHandlers();
    houseTypeFilter.removeEventListener('change', onHouseTypeFilterChange);
    map.classList.add('map--faded');
  };

  var activateMap = function () {
    window.pin.removeHandlers();
    houseTypeFilter.addEventListener('change', onHouseTypeFilterChange);
    map.classList.remove('map--faded');
  };

  var deactivateMap = function () {
    window.pin.reset();
    window.pin.resetMainLocation();
    window.card.close();
    initMap();
  };

  var resetFiltersForm = function () {
    mapFiltersForm.reset();
  };

  var activateFiltersForm = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = false;
    }
  };

  var deactivateFiltersForm = function () {
    resetFiltersForm();
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = true;
    }
  };

  var initPage = function () {
    document.addEventListener('keydown', onPageKeydown);
    initMap();
    window.form.init();
  };

  var activatePage = function () {
    activateMap();
    window.form.activate();
    window.backend.load(URL, successHandler, errorHandler);
  };

  var deactivatePage = function () {
    deactivateMap();
    window.form.init();
  };

  initPage();

  window.map = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
    showMessage: showMessage,
    constraint: mapConstraint
  };
})();
