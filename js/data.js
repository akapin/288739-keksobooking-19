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

  var generateOffer = function (offerId) {
    return {
      author: {
        avatar: 'img/avatars/user' + (offerId > 9 ? '' : '0') + offerId + '.png'
      },
      offer: {
        title: 'Offer #' + offerId,
        address: window.utils.getRandomNumber(ADDRESS_COORDINATE_MIN_NUMBER, ADDRESS_COORDINATE_MAX_NUMBER)
                  + ', ' + window.utils.getRandomNumber(ADDRESS_COORDINATE_MIN_NUMBER, ADDRESS_COORDINATE_MAX_NUMBER),
        price: window.utils.getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: window.utils.getRandomItemFromArray(OFFER_TYPES),
        rooms: window.utils.getRandomNumber(ROOMS_MIN_NUMBER, ROOMS_MAX_NUMBER),
        guests: window.utils.getRandomNumber(GUESTS_MIN_NUMBER, GUESTS_MAX_NUMBER),
        checkin: window.utils.getRandomItemFromArray(CHECKIN_CHECKOUT_TIMES),
        checkout: window.utils.getRandomItemFromArray(CHECKIN_CHECKOUT_TIMES),
        features: window.utils.getRandomArray(OFFER_FEATURES),
        description: 'Offer #' + offerId + ' description',
        photos: window.utils.getRandomArray(OFFER_PHOTOS),
      },
      location: {
        x: window.utils.getRandomNumber(LOCATION_X_MIN_NUMBER, LOCATION_X_MAX_NUMBER),
        y: window.utils.getRandomNumber(LOCATION_Y_MIN_NUMBER, LOCATION_Y_MAX_NUMBER)
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
