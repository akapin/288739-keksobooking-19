'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var ROOM_CAPACITY_INVALID_CHOICE_TEXT = 'Выбранное количество комнат не соответствует выбранному количеству гостей';

  var map = document.querySelector('.map');
  var mapMainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');
  var adFormAddressField = adForm.querySelector('input[id=address]');
  var roomNumberSelect = adForm.querySelector('select[id=room_number]');
  var capacitySelect = adForm.querySelector('select[id=capacity]');
  var adFormTypeSelect = adForm.querySelector('select[id=type]');
  var adFormPriceInput = adForm.querySelector('input[id=price]');
  var adFormTimeinSelect = adForm.querySelector('select[id=timein]');
  var adFormTimeoutSelect = adForm.querySelector('select[id=timeout]');

  var fillInitialAddressValue = function () {
    var addressX = Math.round(parseInt(mapMainPin.style.left, 10) + window.pin.inactivePageMainLocationShift.X);
    var addressY = Math.round(parseInt(mapMainPin.style.top, 10) + window.pin.inactivePageMainLocationShift.Y);
    adFormAddressField.value = addressX + ', ' + addressY;
  };

  var fillActivePageAddressValue = function () {
    var addressX = Math.round(parseInt(mapMainPin.style.left, 10) + window.pin.activePageMainLocationShift.X);
    var addressY = Math.round(parseInt(mapMainPin.style.top, 10) + window.pin.activePageMainLocationShift.Y);
    adFormAddressField.value = addressX + ', ' + addressY;
  };

  var roomCapacityCustomValidation = function () {
    var capacitySelectOptions = capacitySelect.querySelectorAll('option');
    var selectedNumberOfRooms = parseInt(roomNumberSelect.value, 10);
    var selectedRoomCapacity = parseInt(capacitySelect.value, 10);

    var selectMap = {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0],
    };

    for (var i = 0; i < capacitySelectOptions.length; i++) {
      capacitySelectOptions[i].disabled = false;
    }

    for (var j = 0; j < capacitySelectOptions.length; j++) {
      var capacityOptionValue = parseInt(capacitySelectOptions[j].value, 10);
      if (!selectMap[selectedNumberOfRooms].includes(capacityOptionValue)) {
        capacitySelectOptions[j].disabled = true;
      }
    }

    if (selectedRoomCapacity !== 0 && selectedNumberOfRooms < selectedRoomCapacity) {
      roomNumberSelect.setCustomValidity(ROOM_CAPACITY_INVALID_CHOICE_TEXT);
    } else if (selectedRoomCapacity === 0 && selectedNumberOfRooms !== 100) {
      roomNumberSelect.setCustomValidity(ROOM_CAPACITY_INVALID_CHOICE_TEXT);
    } else if (selectedNumberOfRooms === 100 && selectedRoomCapacity !== 0) {
      roomNumberSelect.setCustomValidity(ROOM_CAPACITY_INVALID_CHOICE_TEXT);
    } else {
      roomNumberSelect.setCustomValidity('');
    }
  };

  var priceCustomValidation = function () {
    var adFormPriceInputValue = parseInt(adFormPriceInput.value, 10);
    if (adFormTypeSelect.value === 'bungalo' && adFormPriceInputValue < 0) {
      adFormPriceInput.setCustomValidity('Цена за ночь в бунгало должна быть минимум 0 рублей');
    } else if (adFormTypeSelect.value === 'flat' && adFormPriceInputValue < 1000) {
      adFormPriceInput.setCustomValidity('Цена за ночь в квартире должна быть минимум 1000 рублей');
    } else if (adFormTypeSelect.value === 'house' && adFormPriceInputValue < 5000) {
      adFormPriceInput.setCustomValidity('Цена за ночь в доме должна быть минимум 5000 рублей');
    } else if (adFormTypeSelect.value === 'palace' && adFormPriceInputValue < 10000) {
      adFormPriceInput.setCustomValidity('Цена за ночь во дворце должна быть минимум 10000 рублей');
    } else {
      adFormPriceInput.setCustomValidity('');
    }
  };

  var addAdFormEventListeners = function () {
    adForm.addEventListener('submit', onAdFormSubmit);
    adFormResetButton.addEventListener('click', onResetButtonClick);
    adFormTypeSelect.addEventListener('change', onAdFormTypeSelectChange);
    adFormTimeinSelect.addEventListener('change', onAdFormTimeinSelectChange);
    adFormTimeoutSelect.addEventListener('change', onAdFormTimeoutSelectChange);
    roomNumberSelect.addEventListener('change', roomCapacityCustomValidation);
    capacitySelect.addEventListener('change', roomCapacityCustomValidation);
    adFormPriceInput.addEventListener('change', priceCustomValidation);
  };

  var removeAdFormEventListeners = function () {
    adForm.removeEventListener('submit', onAdFormSubmit);
    adFormResetButton.removeEventListener('click', onResetButtonClick);
    adFormTypeSelect.removeEventListener('change', onAdFormTypeSelectChange);
    adFormTimeinSelect.removeEventListener('change', onAdFormTimeinSelectChange);
    adFormTimeoutSelect.removeEventListener('change', onAdFormTimeoutSelectChange);
    roomNumberSelect.removeEventListener('change', roomCapacityCustomValidation);
    capacitySelect.removeEventListener('change', roomCapacityCustomValidation);
    adFormPriceInput.removeEventListener('change', priceCustomValidation);
  };

  var deactivateAdForm = function () {
    resetAdForm();
    removeAdFormEventListeners();
    adForm.classList.add('ad-form--disabled');
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = true;
    }
  };

  var initAdForm = function () {
    deactivateAdForm();
    fillInitialAddressValue();
  };

  var activateAdForm = function () {
    fillActivePageAddressValue();
    addAdFormEventListeners();
    adForm.classList.remove('ad-form--disabled');
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = false;
    }
    roomCapacityCustomValidation();
  };

  var resetAdForm = function () {
    adForm.reset();
    adFormPriceInput.placeholder = 1000;
    document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
    document.querySelector('.ad-form__photo').innerHTML = '';
  };

  var successHandler = function () {
    window.page.showMessage('success');
    window.page.deactivate();
  };

  var errorHandler = function () {
    window.page.showMessage('error');
  };

  var onAdFormSubmit = function (evt) {
    var data = new FormData(adForm);
    evt.preventDefault();
    window.backend.save(URL, data, successHandler, errorHandler);
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
    var minPrice = typeSelectMap[adFormTypeSelect.value];

    adFormPriceInput.min = minPrice;
    adFormPriceInput.placeholder = minPrice;
    priceCustomValidation();
  };

  var onAdFormTimeinSelectChange = function () {
    adFormTimeoutSelect.value = adFormTimeinSelect.value;
  };

  var onAdFormTimeoutSelectChange = function () {
    adFormTimeinSelect.value = adFormTimeoutSelect.value;
  };

  window.form = {
    init: initAdForm,
    activate: activateAdForm,
    fillActivePageAddressValue: fillActivePageAddressValue
  };
})();
