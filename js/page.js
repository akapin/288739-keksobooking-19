'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';
  var mainBlockElement = document.querySelector('main');

  var onPageKeydown = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      hideMessage();
      window.card.close();
    }
  };

  var onPageClick = function (evt) {
    if (evt.target.tagName.toLowerCase() !== 'p') {
      hideMessage();
    }
  };

  var showMessage = function (type) {
    var messageTemplateElement = document.querySelector('#' + type)
      .content
      .querySelector('.' + type);
    var messageElement = messageTemplateElement.cloneNode(true);

    mainBlockElement.appendChild(messageElement);
    messageElement.addEventListener('click', onPageClick);
  };

  var hideMessage = function () {
    var messageElements = mainBlockElement.querySelectorAll('.success, .error');
    for (var i = 0; i < messageElements.length; i++) {
      mainBlockElement.removeChild(messageElements[i]);
      messageElements[i].removeEventListener('click', onPageClick);
    }
  };

  var initPage = function () {
    document.addEventListener('keydown', onPageKeydown);
    window.map.init();
    window.form.init();
  };

  var activatePage = function () {
    window.map.activate();
    window.form.activate();

  };

  var deactivatePage = function () {
    window.map.deactivate();
    window.form.init();
  };

  initPage();

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage,
    showMessage: showMessage,
  };
})();
