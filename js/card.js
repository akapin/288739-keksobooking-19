'use strict';

(function () {
  var generateOfferPhotoList = function (cardElement, photos) {
    var cardPhotosBlock = cardElement.querySelector('.popup__photos');
    var photoTemplate = cardPhotosBlock.querySelector('.popup__photo');
    for (var i = 0; i < photos.length; i++) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photos[i];
      cardPhotosBlock.appendChild(photoElement);
    }
    photoTemplate.parentNode.removeChild(photoTemplate);
  };

  var generateOfferCard = function (item) {
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
    generateOfferPhotoList(cardElement, offerInfo.photos);
    cardElement.querySelector('.popup__avatar').src = item.author.avatar;

    return cardElement;
  };

  window.card = {
    generateOfferCard: generateOfferCard
  };
})();
