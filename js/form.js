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

  var deactivateAdForm = function () {
    resetAdForm();
    adForm.classList.add('ad-form--disabled');
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = true;
    }
  };

  var initAdForm = function () {
    deactivateAdForm();
    roomNumberSelect.addEventListener('change', roomCapacityCustomValidation);
    capacitySelect.addEventListener('change', roomCapacityCustomValidation);
    fillInitialAddressValue();
  };

  var activateAdForm = function () {
    fillActivePageAddressValue();
    adForm.classList.remove('ad-form--disabled');
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = false;
    }
    roomCapacityCustomValidation();
  };

  var resetAdForm = function () {
    adForm.reset();
  };

  var successHandler = function () {
    window.map.showMessage('success');
    window.map.deactivatePage();
  };

  var errorHandler = function () {
    window.map.showMessage('error');
  };

  var onAdFormSubmit = function (evt) {
    var data = new FormData(adForm);
    evt.preventDefault();
    window.backend.save(URL, data, successHandler, errorHandler);
  };

  var onResetButtonClick = function () {
    window.map.deactivatePage();
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
  };

  var onAdFormTimeinSelectChange = function () {
    adFormTimeoutSelect.value = adFormTimeinSelect.value;
  };

  var onAdFormTimeoutSelectChange = function () {
    adFormTimeinSelect.value = adFormTimeoutSelect.value;
  };

  adForm.addEventListener('submit', onAdFormSubmit);
  adFormResetButton.addEventListener('click', onResetButtonClick);
  adFormTypeSelect.addEventListener('change', onAdFormTypeSelectChange);
  adFormTimeinSelect.addEventListener('change', onAdFormTimeinSelectChange);
  adFormTimeoutSelect.addEventListener('change', onAdFormTimeoutSelectChange);

  window.form = {
    init: initAdForm,
    activate: activateAdForm,
    fillActivePageAddressValue: fillActivePageAddressValue
  };
})();
