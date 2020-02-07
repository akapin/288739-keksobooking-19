'use strict';

(function () {
  var ADDRESS_COORDINATE_MIN_NUMBER = 1;
  var ADDRESS_COORDINATE_MAX_NUMBER = 1000;
  var MIN_PRICE = 5000;
  var MAX_PRICE = 10000;
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS_MIN_NUMBER = 1;
  var ROOMS_MAX_NUMBER = 4;
  var GUESTS_MIN_NUMBER = 1;
  var GUESTS_MAX_NUMBER = 4;
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
    var numberOfNewArrayItems = getRandomNumber(minNumberOfNewArrayItems, maxNumberOfNewArrayItems);
    var newArray = array.splice(startIndex, numberOfNewArrayItems);
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

  window.data = {
    generateOffers: generateOffers
  };
})();
