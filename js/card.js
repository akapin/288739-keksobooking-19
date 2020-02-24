'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  var generateOfferPhotoList = function (cardElement, photos) {
    var cardPhotosBlockElement = cardElement.querySelector('.popup__photos');
    var photoTemplateElement = cardPhotosBlockElement.querySelector('.popup__photo');
    photos.forEach(function (photo) {
      var photoElement = photoTemplateElement.cloneNode(true);
      photoElement.src = photo;
      cardPhotosBlockElement.appendChild(photoElement);
    });
    photoTemplateElement.parentNode.removeChild(photoTemplateElement);
  };

  var generateOfferCard = function (item) {
    var cardTemplateElement = document.querySelector('#card')
      .content
      .querySelector('.map__card');
    var cardElement = cardTemplateElement.cloneNode(true);

    var offerTypeMap = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец',
    };

    var offerInfo = item.offer;
    var offerFeatures = offerInfo.features;
    var cardFeaturesBlockElement = cardElement.querySelector('.popup__features');

    cardElement.querySelector('.popup__title').textContent = offerInfo.title;
    cardElement.querySelector('.popup__text--address').textContent = offerInfo.address;
    cardElement.querySelector('.popup__text--price').textContent = offerInfo.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = offerTypeMap[offerInfo.type];
    cardElement.querySelector('.popup__text--capacity').textContent = offerInfo.rooms + ' комнаты для ' + offerInfo.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerInfo.checkin + ', выезд до ' + offerInfo.checkout;

    cardFeaturesBlockElement.innerHTML = '';

    offerFeatures.forEach(function (feature) {
      var listElement = document.createElement('li');
      listElement.classList.add('popup__feature', 'popup__feature--' + feature);
      cardFeaturesBlockElement.appendChild(listElement);
    });

    cardElement.querySelector('.popup__description').textContent = offerInfo.description;
    generateOfferPhotoList(cardElement, offerInfo.photos);
    cardElement.querySelector('.popup__avatar').src = item.author.avatar;

    return cardElement;
  };

  var closeOpenedCard = function () {
    var openedCardElement = mapElement.querySelector('.popup');
    if (openedCardElement) {
      openedCardElement.parentNode.removeChild(openedCardElement);
    }
    window.pin.deactivate();
  };

  var onPopupCloseButtonClick = function () {
    closeOpenedCard();
  };

  var renderOfferCard = function (offerPin, offerObj) {
    var mapFiltersContainerElement = mapElement.querySelector('.map__filters-container');
    var offerCardElement = generateOfferCard(offerObj);
    var popupCloseButtonElement = offerCardElement.querySelector('.popup__close');
    closeOpenedCard();
    popupCloseButtonElement.addEventListener('click', onPopupCloseButtonClick);
    mapElement.insertBefore(offerCardElement, mapFiltersContainerElement);
    window.pin.activate(offerPin);
  };

  window.card = {
    render: renderOfferCard,
    close: closeOpenedCard,
  };
})();
