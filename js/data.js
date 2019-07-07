'use strict';
// модуль, который создаёт данные;
(function () {

  var MIN_URL = 1;
  var MAX_URL = 25;

  var MAX_URL_AVATAR = 6;
  var LIKE = {
    MIN: 15,
    MAX: 200
  };
  var NAMES = [
    'Вася', 'Петя',
    'Иван',
    'Игорь',
    'Дима'];

  var MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  window.data = {
    MIN_URL: MIN_URL,
    MAX_URL: MAX_URL,
    MAX_URL_AVATAR: MAX_URL_AVATAR,
    LIKE: LIKE,
    NAMES: NAMES,
    MESSAGES: MESSAGES
  };

})();