'use strict';

var MESSAGES = [
  'Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var Like = {
  MIN: 15,
  MAX: 200
};

var AVATARS_COUNT = 6;

var NAMES = [
  'Вася', 'Петя',
  'Иван',
  'Игорь',
  'Дима'];


  // Math.random() это API - это стандартная функция

// функция для получения случайного числа в заданном диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Получение случайного элемента из массива
var getRandomElement = function (arr) {
  var randomIndex = getRandomNumber(0, arr.length);
  var randomElement = arr[randomIndex];

  return randomElement;
};
// Генерация комментария (аватар, имя, сообщение)
var getRandomComment = function () {
  var message = getRandomElement(MESSAGES);
  var message1 = getRandomElement(MESSAGES);
  var comment = {
    avatar: 'img/avatar-' + getRandomNumber(1, AVATARS_COUNT) + '.svg',
    message: message + message1,
    name: getRandomElement(NAMES)
  };

  return comment;
};


var getComments = function () {
  var countLength = getRandomNumber(1, 6);
  var comments = [];
  for (var i = 0; i < countLength; i++) {
    comments[i] = getRandomComment();
  }
  return comments;
};

var getRandomPhotos = function () {
  var photos = [];
  for (var i = 1; i <= 25; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(Like.MIN, Like.MAX),
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
