'use strict';
(function () {
  var mainElement = document.querySelector('main');
  var successModalTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

  var activeModal;

  var onDocumentClick = function (evt) {
    var target = evt.target;
    while (
      !target.classList.contains('success__inner') &&
      !target.classList.contains('error__inner') &&
      target.parentNode !== document
    ) {
      target = target.parentNode;
    }

    if (target.parentNode === document) {
      closeModal(activeModal);
    }
  };

  var onDocumentKeydown = function (evt) {
    window.util.isEscEvent(evt, function () {
      closeModal(activeModal);
    });
  };

  var closeModal = function () {
    mainElement.removeChild(activeModal);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  var showModalSucces = function () {
    // клонируем шаблон, пч при закрытии модалки шаблон бы удалялся совсем
    // вставили не сам successModalTemplate.content, а его клон.
    // Это обычная практика, чтобы можно было использовать один шаблон много раз.
    var successModal = successModalTemplate.cloneNode(true);
    activeModal = successModal;
    mainElement.appendChild(successModal);
    // исчезать после нажатия на кнопку .success__button
    successModal.querySelector('.success__button').addEventListener('click', function () {
      closeModal();
    });
    // по клику на произвольную область экрана
    document.addEventListener('click', onDocumentClick);
    // по нажатию на клавишу Esc
    // document.addEventListener('keydown', onModalEscPress);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  // var onModalEscPress = function (evt) {window.util.isEscEvent(evt, closeModal)};

  var showModalError = function (text) {
    // клонируем шаблон, пч при закрытии модалки шаблон бы удалялся совсем
    var errorModal = errorModalTemplate.cloneNode(true);
    activeModal = errorModal;
    mainElement.appendChild(errorModal);
    errorModal.querySelector('.error__title').textContent = text;
    // вызываем closeModal() для двух кнопок
    var buttons = errorModal.querySelectorAll('.error__button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        closeModal();
      });
    }

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };


  window.modal = {
    showModalSucces: showModalSucces,
    showModalError: showModalError
  };
})();
