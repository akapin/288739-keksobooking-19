'use strict';

(function () {
  var INACTIVE_PAGE_MAIN_PIN_LOCATION_X_SHIFT = 32.5;
  var INACTIVE_PAGE_MAIN_PIN_LOCATION_Y_SHIFT = 32.5;
  var ACTIVE_PAGE_MAIN_PIN_LOCATION_X_SHIFT = 32.5;
  var ACTIVE_PAGE_MAIN_PIN_LOCATION_Y_SHIFT = 87;
  var ROOM_CAPACITY_INVALID_CHOICE_TEXT = 'Выбранное количество комнат не соответствует выбранному количеству гостей';

  var map = document.querySelector('.map');
  var mapMainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
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

  var disableAdForm = function () {
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].disabled = true;
    }
  };

  var initAdForm = function () {
    roomNumberSelect.addEventListener('change', roomCapacityCustomValidation);
    capacitySelect.addEventListener('change', roomCapacityCustomValidation);
    disableAdForm();
    fillInitialAddressValue();
  };

  window.form = {
    init: initAdForm,
    fillActivePageAddressValue: fillActivePageAddressValue,
    roomCapacityCustomValidation: roomCapacityCustomValidation
  };
})();
