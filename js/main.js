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


// edit image pop-up
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var imgUploadForm = document.querySelector('.img-upload__form');
var uploadElement = document.querySelector('.img-upload');
// Изначальное состояние поля для загрузки изображения
var inputIdUploadFile = imgUploadForm.querySelector('#upload-file');
// Форма редактирования изображения, которую надо показать
var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
// КНОПКА ЗАКРЫТИЯ
var buttonImgUploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
// Предварительный просмотр изображения
var uploadImagePreview = imgUploadOverlay.querySelector('.img-upload__preview');
// Превью фото без эффекта- оригинал
var originalImg = imgUploadForm.querySelector('#effect-none');
// Наложение эффекта на изображение
var imgUploadEffects = imgUploadOverlay.querySelector('.img-upload__effects');
// Изменение глубины эффекта, накладываемого на изображение
var effectLevelValue = document.querySelector('.effect-level__value');

var uploadImage = uploadImagePreview.querySelector('img');
var originalImg = document.querySelector('#effect-none');



var effectLevelScale = imgUploadOverlay.querySelector('.img-upload__effect-level');
// Кнопка изменения глубины эффекта фотографии
var effectLevelPin = document.querySelector('.effect-level__pin');
// Глубина эффекта фотографии yellow - ее длинна шкалы регулируется положением Pin
var effectLevelDepth = document.querySelector('.effect-level__depth');
// Глубина эффекта фотографии - вся шкала - yellow +opacity
var effectLevelLine = document.querySelector('.effect-level__line');

var effectsListElement = uploadElement.querySelector('.effects__list');
var currentEffectNone = effectsListElement.querySelector('#effect-none');
var currentEffectChrome = effectsListElement.querySelector('#effect-chrome');
var currentEffectSepia = effectsListElement.querySelector('#effect-sepia');
var currentEffectMarvin = effectsListElement.querySelector('#effect-marvin');
var currentEffectPhobos = effectsListElement.querySelector('#effect-phobos');
var currentEffectHeat = effectsListElement.querySelector('#effect-heat');


// ПОКАЗЫВАЕТ-ОТКРЫВАЕТ форму редактирования изображения без функции в теле
// закрывает форму редактирования изображения при нажатии esc по всему документу

inputIdUploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupUploadEscPress);
});

// закрытие при нажатии Esc
var onPopupUploadEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  // убираем обработчик события со всего документа
  document.removeEventListener('keydown', onPopupUploadEscPress);
};

// закрывает форму редактирования изображения
buttonImgUploadCancel.addEventListener('click', function () {
  closePopup();
});

// Мы ловим событие click  при нажатии на radio-button, которую находим по ее id,
// на большой картинке с котом добавляеся  фильтр с интенсивностью 100%

currentEffectNone.addEventListener('click', function () {
  uploadImagePreview.style.filter = '';
});

currentEffectChrome.addEventListener('click', function () {
  uploadImagePreview.style.filter = 'grayscale(1)';
});

currentEffectSepia.addEventListener('click', function () {
  uploadImagePreview.style.filter = 'sepia(1)';
});

currentEffectMarvin.addEventListener('click', function () {
  uploadImagePreview.style.filter = 'invert(100%)';
});

currentEffectPhobos.addEventListener('click', function () {
  uploadImagePreview.style.filter = 'blur(5px)';
});

currentEffectHeat.addEventListener('click', function () {
  uploadImagePreview.style.filter = 'brightness(3)';
});


// Нет, тут наверное делегирование должно быть на все радио-баттоны
// var radioChecked = function (evt) {
//   if (evt.target.checked) {
//     classList.add('effects__preview--' + evt.target.value);
//     uploadImage.style = '';
//       if (evt.target.value === 'effects__preview--none') {
//         effectLevelScale.classList.add('hidden');
//         // шкала убирается
//       }
// };



// uploadImagePreview.style.filter = '';


// var onMouseUpPin = function () {
// };

// document.addEventListener('mouseup', onMouseUpPin);
