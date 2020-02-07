'use strict';

(function () {
  var LOCATION_X_SHIFT = -25;
  var LOCATION_Y_SHIFT = -70;

  var generatePinElement = function (offer) {
    var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + (offer.location.x + LOCATION_X_SHIFT) + 'px; top: ' + (offer.location.y + LOCATION_Y_SHIFT) + 'px;';
    pinElement.querySelector('img').src = offer.author.avatar;
    pinElement.querySelector('img').alt = offer.offer.title;

    return pinElement;
  };

  window.pin = {
    generatePinElement: generatePinElement
  };
})();
