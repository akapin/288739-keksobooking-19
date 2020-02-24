'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var ROOM_CAPACITY_INVALID_CHOICE_TEXT = 'Выбранное количество комнат не соответствует выбранному количеству гостей';
  var INITIAL_PRICE_PLACEHOLDER = 1000;

  var mapElement = document.querySelector('.map');
  var mapMainPinElement = mapElement.querySelector('.map__pin--main');
  var adFormElement = document.querySelector('.ad-form');
  var adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
  var adFormResetButtonElement = adFormElement.querySelector('.ad-form__reset');
  var adFormAddressFieldElement = adFormElement.querySelector('input[id=address]');
  var adFormRoomNumberSelectElement = adFormElement.querySelector('select[id=room_number]');
  var adFormCapacitySelectElement = adFormElement.querySelector('select[id=capacity]');
  var adFormTypeSelectElement = adFormElement.querySelector('select[id=type]');
  var adFormPriceInputElement = adFormElement.querySelector('input[id=price]');
  var adFormTimeinSelectElement = adFormElement.querySelector('select[id=timein]');
  var adFormTimeoutSelectElement = adFormElement.querySelector('select[id=timeout]');

  var fillInitialAddressValue = function () {
    var addressX = Math.round(parseInt(mapMainPinElement.style.left, 10) + window.pin.inactivePageMainLocationShift.X);
    var addressY = Math.round(parseInt(mapMainPinElement.style.top, 10) + window.pin.inactivePageMainLocationShift.Y);
    adFormAddressFieldElement.value = addressX + ', ' + addressY;
  };

  var fillActivePageAddressValue = function () {
    var addressX = Math.round(parseInt(mapMainPinElement.style.left, 10) + window.pin.activePageMainLocationShift.X);
    var addressY = Math.round(parseInt(mapMainPinElement.style.top, 10) + window.pin.activePageMainLocationShift.Y);
    adFormAddressFieldElement.value = addressX + ', ' + addressY;
  };

  var onAdFormRoomNumberSelectElementChange = roomCapacityCustomValidation;
  var onAdFormCapacitySelectElementChange = roomCapacityCustomValidation;
  var onAdFormPriceInputElementChange = priceCustomValidation;

  var roomCapacityCustomValidation = function () {
    var capacitySelectOptionElements = adFormCapacitySelectElement.querySelectorAll('option');
    var selectedNumberOfRooms = parseInt(adFormRoomNumberSelectElement.value, 10);
    var selectedRoomCapacity = parseInt(adFormCapacitySelectElement.value, 10);

    var selectMap = {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0],
    };

    for (var i = 0; i < capacitySelectOptionElements.length; i++) {
      capacitySelectOptionElements[i].disabled = false;
    }

    for (var j = 0; j < capacitySelectOptionElements.length; j++) {
      var capacityOptionValue = parseInt(capacitySelectOptionElements[j].value, 10);
      if (!selectMap[selectedNumberOfRooms].includes(capacityOptionValue)) {
        capacitySelectOptionElements[j].disabled = true;
      }
    }

    if (selectedRoomCapacity !== 0 && selectedNumberOfRooms < selectedRoomCapacity) {
      adFormRoomNumberSelectElement.setCustomValidity(ROOM_CAPACITY_INVALID_CHOICE_TEXT);
    } else if (selectedRoomCapacity === 0 && selectedNumberOfRooms !== 100) {
      adFormRoomNumberSelectElement.setCustomValidity(ROOM_CAPACITY_INVALID_CHOICE_TEXT);
    } else if (selectedNumberOfRooms === 100 && selectedRoomCapacity !== 0) {
      adFormRoomNumberSelectElement.setCustomValidity(ROOM_CAPACITY_INVALID_CHOICE_TEXT);
    } else {
      adFormRoomNumberSelectElement.setCustomValidity('');
    }
  };

  var priceCustomValidation = function () {
    var adFormPriceInputValue = parseInt(adFormPriceInputElement.value, 10);
    if (adFormTypeSelectElement.value === 'bungalo' && adFormPriceInputValue < 0) {
      adFormPriceInputElement.setCustomValidity('Цена за ночь в бунгало должна быть минимум 0 рублей');
    } else if (adFormTypeSelectElement.value === 'flat' && adFormPriceInputValue < 1000) {
      adFormPriceInputElement.setCustomValidity('Цена за ночь в квартире должна быть минимум 1000 рублей');
    } else if (adFormTypeSelectElement.value === 'house' && adFormPriceInputValue < 5000) {
      adFormPriceInputElement.setCustomValidity('Цена за ночь в доме должна быть минимум 5000 рублей');
    } else if (adFormTypeSelectElement.value === 'palace' && adFormPriceInputValue < 10000) {
      adFormPriceInputElement.setCustomValidity('Цена за ночь во дворце должна быть минимум 10000 рублей');
    } else {
      adFormPriceInputElement.setCustomValidity('');
    }
  };

  var addAdFormEventListeners = function () {
    adFormElement.addEventListener('submit', onAdFormSubmit);
    adFormResetButtonElement.addEventListener('click', onResetButtonClick);
    adFormTypeSelectElement.addEventListener('change', onAdFormTypeSelectChange);
    adFormTimeinSelectElement.addEventListener('change', onAdFormTimeinSelectChange);
    adFormTimeoutSelectElement.addEventListener('change', onAdFormTimeoutSelectChange);
    adFormRoomNumberSelectElement.addEventListener('change', onAdFormRoomNumberSelectElementChange);
    adFormCapacitySelectElement.addEventListener('change', onAdFormCapacitySelectElementChange);
    adFormPriceInputElement.addEventListener('change', onAdFormPriceInputElementChange);
  };

  var removeAdFormEventListeners = function () {
    adFormElement.removeEventListener('submit', onAdFormSubmit);
    adFormResetButtonElement.removeEventListener('click', onResetButtonClick);
    adFormTypeSelectElement.removeEventListener('change', onAdFormTypeSelectChange);
    adFormTimeinSelectElement.removeEventListener('change', onAdFormTimeinSelectChange);
    adFormTimeoutSelectElement.removeEventListener('change', onAdFormTimeoutSelectChange);
    adFormRoomNumberSelectElement.removeEventListener('change', onAdFormRoomNumberSelectElementChange);
    adFormCapacitySelectElement.removeEventListener('change', onAdFormCapacitySelectElementChange);
    adFormPriceInputElement.removeEventListener('change', onAdFormPriceInputElementChange);
  };

  var deactivateAdForm = function () {
    resetAdForm();
    removeAdFormEventListeners();
    adFormElement.classList.add('ad-form--disabled');
    for (var j = 0; j < adFormFieldsetElements.length; j++) {
      adFormFieldsetElements[j].disabled = true;
    }
  };

  var initAdForm = function () {
    deactivateAdForm();
    fillInitialAddressValue();
  };

  var activateAdForm = function () {
    fillActivePageAddressValue();
    addAdFormEventListeners();
    adFormElement.classList.remove('ad-form--disabled');
    for (var j = 0; j < adFormFieldsetElements.length; j++) {
      adFormFieldsetElements[j].disabled = false;
    }
    roomCapacityCustomValidation();
  };

  var resetAdForm = function () {
    adFormElement.reset();
    adFormPriceInputElement.placeholder = INITIAL_PRICE_PLACEHOLDER;
    document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
    document.querySelector('.ad-form__photo').innerHTML = '';
  };

  var onSuccess = function () {
    window.page.showMessage('success');
    window.page.deactivate();
  };

  var onError = function () {
    window.page.showMessage('error');
  };

  var onAdFormSubmit = function (evt) {
    var data = new FormData(adFormElement);
    evt.preventDefault();
    window.backend.save(URL, data, onSuccess, onError);
  };

  var onResetButtonClick = function () {
    window.page.deactivate();
  };

  var onAdFormTypeSelectChange = function () {
    var typeSelectMap = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000,
    };
    var minPrice = typeSelectMap[adFormTypeSelectElement.value];

    adFormPriceInputElement.min = minPrice;
    adFormPriceInputElement.placeholder = minPrice;
    priceCustomValidation();
  };

  var onAdFormTimeinSelectChange = function () {
    adFormTimeoutSelectElement.value = adFormTimeinSelectElement.value;
  };

  var onAdFormTimeoutSelectChange = function () {
    adFormTimeinSelectElement.value = adFormTimeoutSelectElement.value;
  };

  window.form = {
    init: initAdForm,
    activate: activateAdForm,
    fillActivePageAddressValue: fillActivePageAddressValue
  };
})();
