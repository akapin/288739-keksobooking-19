// Файл setup.js
'use strict';

var ADDRESS_COORDINATE_MIN_NUMBER = 1;
var ADDRESS_COORDINATE_MAX_NUMBER = 1000;
var MIN_PRICE = 5000;
var MAX_PRICE = 10000;
var ROOMS_MIN_NUMBER = 1;
var ROOMS_MAX_NUMBER = 4;
var GUESTS_MIN_NUMBER = 1;
var GUESTS_MAX_NUMBER = 4;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var LOCATION_X_MIN_NUMBER = 1;
var LOCATION_X_MAX_NUMBER = 1000;
var LOCATION_Y_MIN_NUMBER = 130;
var LOCATION_Y_MAX_NUMBER = 630;
var LOCATION_X_SHIFT = -25;
var LOCATION_Y_SHIFT = -70;

var getRandomItemFromArray = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var getRandomNumber = function (minNumber, maxNumber) {
  var min = Math.ceil(minNumber);
  var max = Math.floor(maxNumber);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (items) {
  var minNumber = 1;
  var maxNumber = items.length - 1;
  var newArray = [];

  for (var i = items.length - 1; i >= getRandomNumber(minNumber, maxNumber); i--) {
    var randomItem = items.splice(Math.floor(Math.random() * items.length), 1);
    newArray.push(randomItem);
  }
  return newArray;
};

var generateOffer = function (offerId) {
  return {
    author: {
      avatar: 'img/avatars/user0' + offerId + '.png'
    },
    offer: {
      title: 'Offer #' + offerId,
      address: getRandomNumber(ADDRESS_COORDINATE_MIN_NUMBER, ADDRESS_COORDINATE_MAX_NUMBER)
                + ', ' + getRandomNumber(ADDRESS_COORDINATE_MIN_NUMBER, ADDRESS_COORDINATE_MAX_NUMBER),
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomItemFromArray(OFFER_TYPES),
      rooms: getRandomNumber(ROOMS_MIN_NUMBER, ROOMS_MAX_NUMBER),
      guests: getRandomNumber(GUESTS_MIN_NUMBER, GUESTS_MAX_NUMBER),
      checkin: getRandomItemFromArray(CHECKIN_CHECKOUT_TIMES),
      checkout: getRandomItemFromArray(CHECKIN_CHECKOUT_TIMES),
      features: getRandomArray(OFFER_FEATURES),
      description: 'Offer #' + offerId + ' description',
      photos: getRandomArray(OFFER_PHOTOS),
    },
    location: {
      x: getRandomNumber(LOCATION_X_MIN_NUMBER, LOCATION_X_MAX_NUMBER),
      y: getRandomNumber(LOCATION_Y_MIN_NUMBER, LOCATION_Y_MAX_NUMBER)
    }
  };
};

var generateOffers = function () {
  var offers = [];

  for (var i = 1; i <= 8; i++) {
    var offer = generateOffer(i);
    offers.push(offer);
  }

  return offers;
};

var renderOffer = function (offer) {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style = 'left: ' + (offer.location.x + LOCATION_X_SHIFT) + 'px; top: ' + (offer.location.y + LOCATION_Y_SHIFT) + 'px;';
  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').alt = offer.offer.title;

  return pinElement;
};

var renderOffers = function (offers) {
  var mapPinsElement = map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderOffer(offers[i]));
  }
  mapPinsElement.appendChild(fragment);
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var offers = generateOffers();
renderOffers(offers);
