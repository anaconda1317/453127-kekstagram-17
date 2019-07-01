'use strict';
(function () {

  // Генерация комментария (аватар, имя, сообщение)
  /* все что между звездочками - комментарий */

  var pictureTemplate = document.querySelector('#picture').
    content.
    querySelector('.picture');
  var picturesBlock = document.querySelector('.pictures');

  var renderPhoto = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    // создание элементов
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  // упаковываем полученные с сервера по GET запросу массив объектов в фрагмент(импортируем функцию window.load)
  window.load(function (photos) {
    var fragment = document.createDocumentFragment();
    // Мы сложили в массив фотки, а цикл организован по массиву - и мы опираеcя на порядок элементов в массиве (он начся с 0)
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }

    picturesBlock.appendChild(fragment);

  });


})();
