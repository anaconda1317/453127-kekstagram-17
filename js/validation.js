
'use strict';
(function () {
  var ESC_KEYCODE = 27;
  // Валидация в поле комментарии
  var imgUploadForm = document.querySelector('.img-upload__form');
  var focusTextarea = imgUploadForm.querySelector('.text__description');
  var tagsField = imgUploadForm.querySelector('.text__hashtags');
  var TagsConstraints = {
    QUANTITY: 5,
    HASH_SYMBOL: '#',
    MAX_LENGTH: 20
  };


  focusTextarea.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  tagsField.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });


  // хэш-тег начинается с символа # (решётка)
  // вернет tru, если решетка не в начале тега будет
  var isBadTagFormat = function (tag) {
    return tag && tag.lastIndexOf(TagsConstraints.HASH_SYMBOL) !== 0;
  };

  // максимальная длина одного хэш-тега 20 символов, включая решётку
  var isTooLongTag = function (tag) {
    return tag.length > TagsConstraints.MAX_LENGTH;
  };
  // один и тот же хэш-тег не может быть использован дважды
  var isTagsRepeat = function (arr) {

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (i !== j && arr[i] === arr[j]) {
          return true;
        }
      }
    }
    return false;
  };

  // хеш-тег не может состоять только из одной решётки
  // TagsConstraints.HASH_SYMBOL - .HASH_SYMBOL это свойство объекта TagsConstraints
  var isOneTag = function (tag) {
    return tag.charAt(0) === TagsConstraints.HASH_SYMBOL && tag.length === 1;
  };

  // метод trim() позволяет удалить пробелы с обоих концов строки
  var onTagsFieldInput = function () {
    // Хэш-теги разделяются пробелами .split(' ')
    var tags = tagsField.value.trim().toLowerCase().split(' ');
    // Метод some() проверяет, удовлетворяет ли хоть какой-нибудь элемент массива условию, заданному в передаваемой функции
    if (tags.some(isBadTagFormat)) {
      tagsField.style = 'outline: 2px solid red;';
      tagsField.setCustomValidity('Хэш-теги должны начинаться с символа # и разделяться пробелами');
    } else if (tags.some(isTooLongTag)) {
      tagsField.style = 'outline: 2px solid red;';
      tagsField.setCustomValidity('Максимальная длина одного хэш-тега ' + TagsConstraints.MAX_LENGTH + ' символов, включая решётку');
    } else if (isTagsRepeat(tags)) {
      tagsField.style = 'outline: 2px solid red;';
      tagsField.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    } else if (tags.length > TagsConstraints.QUANTITY) {
      tagsField.style = 'outline: 2px solid red;';
      tagsField.setCustomValidity('Нельзя указывать больше ' + TagsConstraints.QUANTITY + ' хэш-тегов');
    } else if (tags.some(isOneTag)) {
      tagsField.style = 'outline: 2px solid red;';
      tagsField.setCustomValidity('Хеш-тег не может состоять только из одной решётки');


    } else {
      // Метод HTMLSelectElement.setCustomValidity() устанавливает
      // специальное сообщение для  выбранного элемента.
      // Если элемент не имеет пользовательской ошибки в параметре укажите пустую строку.
      tagsField.setCustomValidity('');
      tagsField.style = '';

    }

  };

  tagsField.addEventListener('input', onTagsFieldInput);
  imgUploadForm.addEventListener('submit', onTagsFieldInput);

})();


