'use strict';
(function () {
  var mainElement = document.querySelector('main');
  var successModalTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

  var onDocumentClick = function (evt) {
    var target = evt.target;
    while (target.parentNode && target !== document ||
      (!target.classList.contains('success')) || !target.classList.contains('error')) {
      target = target.parentNode;
    }

    if (target === document) {
      closeModal();
    }
  };

  var closeModal = function (remove) {
    mainElement.removeChild(remove);
    document.removeEventListener('keydown', window.util.isEscEvent);
    document.removeEventListener('click', onDocumentClick);
  };

  var showModalSucces = function () {
    // клонируем шаблон, пч при закрытии модалки шаблон бы удалялся совсем
    var successModal = successModalTemplate.cloneNode(true);
    mainElement.appendChild(successModal);
    // исчезать после нажатия на кнопку .success__button
    successModal.querySelector('.success__button').addEventListener('click', function () {
      closeModal(successModal);
    });
    // по клику на произвольную область экрана
    document.addEventListener('click', onDocumentClick);
    // по нажатию на клавишу Esc
    // document.addEventListener('keydown', onModalEscPress);
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, function () {
        closeModal(successModal);
      });
    });
  };

  // var onModalEscPress = function (evt) {window.util.isEscEvent(evt, closeModal)};

  var showModalError = function (text) {
    // клонируем шаблон, пч при закрытии модалки шаблон бы удалялся совсем
    var errorModal = errorModalTemplate.cloneNode(true);
    mainElement.appendChild(errorModal);
    errorModal.querySelector('.error__title').textContent = text;
    errorModal.querySelector('.error__button').addEventListener('click', function () {
      closeModal(errorModal);
    });
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, function () {
        closeModal(errorModal);
      });
    });
  };

  window.modal = {
    showModalSucces: showModalSucces,
    showModalError: showModalError
  };
})();
