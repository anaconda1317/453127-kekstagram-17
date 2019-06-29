'use strict';
(function () {
  // Валидация в поле комментарии
  var imgUploadForm = document.querySelector('.img-upload__form');
  var focusTextarea = imgUploadForm.querySelector('.text__description');
  var ESC_KEYCODE = 27;

  focusTextarea.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

})();

// Валидация комментариев,если фокус находится в поле ввода комментария,
//  нажатие на Esc не должно приводить к закрытию формы редактирования изображения
// событие focus происходит, когда таб переходим(tabindex="0") или мышкой в фокусе те когда элемент становится активным
// когда нажимаем esc происх событие keydoun
