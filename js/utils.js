'use strict';

(function () {
  var getRandomItemFromArray = function (items) {
    return items[Math.floor(Math.random() * items.length)];
  };

  var getRandomNumber = function (minNumber, maxNumber) {
    var min = Math.ceil(minNumber);
    var max = Math.floor(maxNumber);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArray = function (array) {
    var startIndex = 0;
    var minNumberOfNewArrayItems = 1;
    var maxNumberOfNewArrayItems = array.length;
    var numberOfNewArrayItems = getRandomNumber(minNumberOfNewArrayItems, maxNumberOfNewArrayItems);
    var newArray = array.splice(startIndex, numberOfNewArrayItems);
    return newArray;
  };

  window.utils = {
    getRandomItemFromArray: getRandomItemFromArray,
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray
  };
})();
