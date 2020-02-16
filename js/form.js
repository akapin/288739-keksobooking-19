'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var INACTIVE_PAGE_MAIN_PIN_LOCATION_X_SHIFT = 32.5;
  var INACTIVE_PAGE_MAIN_PIN_LOCATION_Y_SHIFT = 32.5;
  var ACTIVE_PAGE_MAIN_PIN_LOCATION_X_SHIFT = 32.5;
  var ACTIVE_PAGE_MAIN_PIN_LOCATION_Y_SHIFT = 87;
  var ROOM_CAPACITY_INVALID_CHOICE_TEXT = 'Выбранное количество комнат не соответствует выбранному количеству гостей';

  var map = document.querySelector('.map');
  var mapMainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');
  var adFormAddressField = adForm.querySelector('input[id=address]');
  var roomNumberSelect = adForm.querySelector('select[id=room_number]');
  var capacitySelect = adForm.querySelector('select[id=capacity]');

  var fillInitialAddressValue = function () {
    var addressX = Math.round(parseInt(mapMainPin.style.left, 10) + INACTIVE_PAGE_MAIN_PIN_LOCATION_X_SHIFT);
    var addressY = Math.round(parseInt(mapMainPin.style.top, 10) + INACTIVE_PAGE_MAIN_PIN_LOCATION_Y_SHIFT);
    adFormAddressField.value = addressX + ', ' + addressY;
  };

  var fillActivePageAddressValue = function () {
    var addressX = Math.round(parseInt(mapMainPin.style.left, 10) + ACTIVE_PAGE_MAIN_PIN_LOCATION_X_SHIFT);
    var addressY = Math.round(parseInt(mapMainPin.style.top, 10) + ACTIVE_PAGE_MAIN_PIN_LOCATION_Y_SHIFT);
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
    adForm.classList.add('ad-form--disabled');
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = true;
    }
  };

  var initAdForm = function () {
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
    resetAdForm();
    initAdForm();
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
    resetAdForm();
  };

  adForm.addEventListener('submit', onAdFormSubmit);
  adFormResetButton.addEventListener('click', onResetButtonClick);

  window.form = {
    init: initAdForm,
    activate: activateAdForm,
    deactivate: deactivateAdForm
  };
})();
