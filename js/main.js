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
var NUMBER_OF_OFFERS = 8;

var getRandomItemFromArray = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var getRandomNumber = function (minNumber, maxNumber) {
  var min = Math.ceil(minNumber);
  var max = Math.floor(maxNumber);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (array) {
  var startIndex = 0;
  var minNumberOfNewArrayItems = 1;
  var maxNumberOfNewArrayItems = array.length;
  var numberOfNewArrayItems = getRandomNumber(minNumberOfNewArrayItems, maxNumberOfNewArrayItems)
  var newArray = array.splice(startIndex, numberOfNewArrayItems)
  return newArray;
};

var generateOffer = function (offerId) {
  return {
    author: {
      avatar: 'img/avatars/user' + (offerId > 9 ? '' : '0') + offerId + '.png'
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

  for (var i = 1; i <= NUMBER_OF_OFFERS; i++) {
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

var renderOfferCard = function (item) {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);

  var offerTypeMap = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var offerInfo = item.offer;
  var cardFeaturesBlock = cardElement.querySelector('.popup__features');

  cardElement.querySelector('.popup__title').textContent = offerInfo.title;
  cardElement.querySelector('.popup__text--address').textContent = offerInfo.address;
  cardElement.querySelector('.popup__text--price').textContent = offerInfo.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offerTypeMap[offerInfo.type];
  cardElement.querySelector('.popup__text--capacity').textContent = offerInfo.rooms + ' комнаты для ' + offerInfo.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerInfo.checkin + ', выезд до ' + offerInfo.checkout;

  cardFeaturesBlock.innerHTML = '';
  for (var i = 0; i < offerInfo.features.length; i++) {
    var listElement = document.createElement('li');
    listElement.classList.add('popup__feature', 'popup__feature--' + offerInfo.features[i]);
    cardFeaturesBlock.appendChild(listElement);
  }

  cardElement.querySelector('.popup__description').textContent = offerInfo.description;
  renderOfferPhotoList(cardElement, offerInfo.photos);
  cardElement.querySelector('.popup__avatar').src = item.author.avatar;

  return cardElement;
};

var renderOfferPhotoList = function (cardElement, photos) {
  var cardPhotosBlock = cardElement.querySelector('.popup__photos');
  var photoTemplate = cardPhotosBlock.querySelector('.popup__photo');
  for (var i = 0; i < photos.length; i++) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.src = photos[i];
    cardPhotosBlock.appendChild(photoElement);
  }
  photoTemplate.parentNode.removeChild(photoTemplate);
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var offers = generateOffers();
renderOffers(offers);

var offerCard = renderOfferCard(offers[0]);
var mapFiltersContainer = map.querySelector('.map__filters-container');
map.insertBefore(offerCard, mapFiltersContainer);
