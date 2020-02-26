'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapMainPinElement = mapElement.querySelector('.map__pin--main');

  mapMainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newXCoord = (mapMainPinElement.offsetLeft - shift.x) + window.pin.activePageMainLocationShift.X;
      var newYCoord = (mapMainPinElement.offsetTop - shift.y) + window.pin.activePageMainLocationShift.Y;

      if (newXCoord < window.map.constraint.LEFT) {
        newXCoord = window.map.constraint.LEFT;
      }

      if (newXCoord > window.map.constraint.RIGHT) {
        newXCoord = window.map.constraint.RIGHT;
      }

      if (newYCoord < window.map.constraint.TOP) {
        newYCoord = window.map.constraint.TOP;
      }

      if (newYCoord > window.map.constraint.BOTTOM) {
        newYCoord = window.map.constraint.BOTTOM;
      }

      mapMainPinElement.style.left = (newXCoord - window.pin.activePageMainLocationShift.X) + 'px';
      mapMainPinElement.style.top = (newYCoord - window.pin.activePageMainLocationShift.Y) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.fillActivePageAddressValue();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapMainPinElement.removeEventListener('click', onClickPreventDefault);
        };
        mapMainPinElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
