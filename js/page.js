'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';
  var mainBlock = document.querySelector('main');

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
    var messageTemplate = document.querySelector('#' + type)
      .content
      .querySelector('.' + type);
    var messageElement = messageTemplate.cloneNode(true);

    mainBlock.appendChild(messageElement);
    messageElement.addEventListener('click', onPageClick);
  };

  var hideMessage = function () {
    var messages = mainBlock.querySelectorAll('.success, .error');
    for (var i = 0; i < messages.length; i++) {
      mainBlock.removeChild(messages[i]);
      messages[i].removeEventListener('click', onPageClick);
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
