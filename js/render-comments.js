'use strict';
(function () {
  var pageBody = document.querySelector('body');
  var photoPopup = pageBody.querySelector('.big-picture');
  var commentsList = photoPopup.querySelector('.social__comments');
  // просто нашли элемент '.social__comment' и склонировали его и рез-тат записали в var commentTemplate как бы шаблон
  var commentTemplate = document.querySelector('.social__comment').cloneNode(true);

  // создаем элемент из того что получаем с сервера объекты-комментарии
  var createCommentElement = function (comment) {
    // Снова клонируем commentTemplate: новый узел commentElement, который будет клоном commentTemplate
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__comment > img').src = 'img/avatar-' + window.util.getRandomNumber(window.data.MIN_URL_AVATAR, window.data.MAX_URL_AVATAR) + '.svg';
    // comment.message - это текстовые комменты, которые загрузились с сервера
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };

  // экспорт
  window.comments = {
    // удаляет комментарии по-умолчанию из разметки
    commentDelete: function () {
      var commentArray = commentsList.querySelectorAll('li');

      for (var i = 0; i < commentArray.length; i++) {
        commentArray[i].remove();
      }
    },

    // упаковывает массив объекты-комментарии в фрагмент
    renderComments: function (arrayObjectsComments) {
      //  .createDocumentFragment - это API
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < arrayObjectsComments.length; i++) {
        fragment.appendChild(createCommentElement(arrayObjectsComments[i]));
      }
      return fragment;
    }

  };
})();


