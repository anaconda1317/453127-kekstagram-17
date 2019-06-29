'use strict';
(function () {

  // Генерация комментария (аватар, имя, сообщение)
  var getRandomComment = function () {
    var message = window.util.getRandomElement(window.data.MESSAGES);
    var message1 = window.util.getRandomElement(window.data.MESSAGES);
    var comment = {
      avatar: 'img/avatar-' + window.util.getRandomNumber(1, window.data.MAX_URL_AVATAR) + '.svg',
      message: message + message1,
      name: window.util.getRandomElement(window.data.NAMES)
    };

    return comment;
  };

  var getComments = function () {
    var countLength = window.util.getRandomNumber(1, 6);
    var comments = [];
    for (var i = 0; i < countLength; i++) {
      comments[i] = getRandomComment();
    }
    return comments;
  };

  var getRandomPhotos = function () {
    var photos = [];
    for (var i = window.data.MIN_URL; i <= window.data.MAX_URL; i++) {
      var photo = {
        url: 'photos/' + i + '.jpg',
        likes: window.util.getRandomNumber(window.data.LIKE.MIN, window.data.LIKE.MAX),
        comments: getComments()
      };
      // Добавляет объект в массив
      photos.push(photo);
    }
    return photos;
  };

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

  // упаковываем созданные с помощью renderPhoto объекты в фрагмент
  var photos = getRandomPhotos();
  var fragment = document.createDocumentFragment();
  // Мы сложили в массив фотки, а цикл организован по массиву - и мы опираеcя на порядок элементов в массиве (он начся с 0)
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }

  picturesBlock.appendChild(fragment);

})();
