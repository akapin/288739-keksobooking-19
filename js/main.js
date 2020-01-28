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

var getRandomArray = function (items) {
  var minNumber = 1;
  var maxNumber = items.length;
  var newArray = [];

  for (var i = maxNumber; i >= getRandomNumber(minNumber, maxNumber); i--) {
    var randomItem = items.splice(Math.floor(Math.random() * items.length), 1);
    newArray.push(randomItem[0]);
  }
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

var renderOfferCard = function (offer) {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);

  var offerType = '';

  var offerTypeMap = [
    {en: 'flat', ru: 'Квартира'},
    {en: 'bungalo', ru: 'Бунгало'},
    {en: 'house', ru: 'Дом'},
    {en: 'palace', ru: 'Дворец'},
  ];

  var offerInfo = offer.offer;

  var cardTitleBlock = cardElement.querySelector('.popup__title');
  var cardAddressBlock = cardElement.querySelector('.popup__text--address');
  var cardPriceBlock = cardElement.querySelector('.popup__text--price');
  var cardTypeBlock = cardElement.querySelector('.popup__type');
  var cardCapacityBlock = cardElement.querySelector('.popup__text--capacity');
  var cardTimeBlock = cardElement.querySelector('.popup__text--time');
  var cardFeaturesBlock = cardElement.querySelector('.popup__features');
  var cardDescriptionBlock = cardElement.querySelector('.popup__description');
  var cardPhotosBlock = cardElement.querySelector('.popup__photos');
  var cardAvatar = cardElement.querySelector('.popup__avatar');


  if (!offerInfo.title) {
    cardTitleBlock.style.display = 'none';
  } else {
    cardTitleBlock.textContent = offerInfo.title;
  }

  if (!offerInfo.address) {
    cardAddressBlock.style.display = 'none';
  } else {
    cardAddressBlock.textContent = offerInfo.address;
  }

  if (!offerInfo.price) {
    cardPriceBlock.style.display = 'none';
  } else {
    cardPriceBlock.textContent = offerInfo.price + '₽/ночь';
  }

  if (!offerInfo.type) {
    cardTypeBlock.style.display = 'none';
  } else {
    for (var i = 0; i < offerTypeMap.length; i++) {
      if (offerTypeMap[i].en === offerInfo.type) {
        offerType = offerTypeMap[i].ru;
      }
    }
    cardTypeBlock.textContent = offerType;
  }

  if (!offerInfo.rooms || !offerInfo.guests) {
    cardCapacityBlock.style.display = 'none';
  } else {
    cardCapacityBlock.textContent = offerInfo.rooms + ' комнаты для ' + offerInfo.guests + ' гостей';
  }

  if (!offerInfo.checkin || !offerInfo.checkout) {
    cardTimeBlock.style.display = 'none';
  } else {
    cardTimeBlock.textContent = 'Заезд после ' + offerInfo.checkin + ', выезд до ' + offerInfo.checkout;
  }

  if (!offerInfo.features && !offerInfo.features.length) {
    cardFeaturesBlock.style.display = 'none';
  } else {
    cardFeaturesBlock.innerHTML = '';
    for (var j = 0; j < offerInfo.features.length; j++) {
      var listElement = document.createElement('li');
      listElement.classList.add('popup__feature', 'popup__feature--' + offerInfo.features[j]);
      cardFeaturesBlock.appendChild(listElement);
    }
  }

  if (!offerInfo.description) {
    cardDescriptionBlock.style.display = 'none';
  } else {
    cardDescriptionBlock.textContent = offerInfo.description;
  }

  if (!offerInfo.photos) {
    cardPhotosBlock.style.display = 'none';
  } else {
    var photoTemplate = cardPhotosBlock.querySelector('.popup__photo');
    for (var k = 0; k < offerInfo.photos.length; k++) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.src = offerInfo.photos[k];
      cardPhotosBlock.appendChild(photoElement);
    }
    photoTemplate.parentNode.removeChild(photoTemplate);
  }

  if (!offer.author.avatar) {
    cardAvatar.style.display = 'none';
  } else {
    cardAvatar.src = offer.author.avatar;
  }

  return cardElement;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var offers = generateOffers();
renderOffers(offers);

var offerCard = renderOfferCard(offers[0]);
var mapFiltersContainer = map.querySelector('.map__filters-container');
map.insertBefore(offerCard, mapFiltersContainer);
