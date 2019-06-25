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

var MAX_URL_AVATAR = 6;

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
    avatar: 'img/avatar-' + getRandomNumber(1, MAX_URL_AVATAR) + '.svg',
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

var effectsListElement = uploadElement.querySelector('.effects__list');
var inputEffectNone = effectsListElement.querySelector('#effect-none');
var inputEffectChrome = effectsListElement.querySelector('#effect-chrome');
var inputEffectSepia = effectsListElement.querySelector('#effect-sepia');
var inputEffectMarvin = effectsListElement.querySelector('#effect-marvin');
var inputEffectPhobos = effectsListElement.querySelector('#effect-phobos');
var inputEffectHeat = effectsListElement.querySelector('#effect-heat');
var currentEffectName = effectsListElement.querySelector('.effects__radio:checked');
var effectLevelScale = imgUploadOverlay.querySelector('.img-upload__effect-level');

// Валидация комментариев, #тег
var focusTextarea = imgUploadForm.querySelector('.text__description');

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
    // очищаем форму после каждой загрузки изображения
    imgUploadForm.reset();
  }
};


var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  // убираем обработчик события со всего документа
  document.removeEventListener('keydown', onPopupUploadEscPress);
};

// закрывает форму редактирования изображения кнопкой
buttonImgUploadCancel.addEventListener('click', function () {
  closePopup();
});

// Мы ловим событие click  при нажатии на radio-button, которую находим по ее id,
// на большой картинке с котом добавляеся  фильтр с интенсивностью 100%

inputEffectNone.addEventListener('click', function () {
  uploadImagePreview.style.filter = '';
  effectLevelScale.classList.add('hidden');
});
// строгое сравнение, если checked  на input id="effect-none" стоит, то шкала скрыта
if (currentEffectName === inputEffectNone) {
  effectLevelScale.classList.add('hidden');
} else {
  effectLevelScale.classList.remove('hidden');
}


inputEffectChrome.addEventListener('click', function () {
  uploadImagePreview.style.filter = 'grayscale(1)';
  effectLevelScale.classList.remove('hidden');
});

inputEffectSepia.addEventListener('click', function () {
  uploadImagePreview.style.filter = 'sepia(1)';
  effectLevelScale.classList.remove('hidden');
});

inputEffectMarvin.addEventListener('click', function () {
  uploadImagePreview.style.filter = 'invert(100%)';
  effectLevelScale.classList.remove('hidden');
});

inputEffectPhobos.addEventListener('click', function () {
  uploadImagePreview.style.filter = 'blur(5px)';
  effectLevelScale.classList.remove('hidden');
});

inputEffectHeat.addEventListener('click', function () {
  // inputEffectHeat.checked = false;
  uploadImagePreview.style.filter = 'brightness(3)';
  effectLevelScale.classList.remove('hidden');
});


// Валидация комментариев,если фокус находится в поле ввода комментария,
//  нажатие на Esc не должно приводить к закрытию формы редактирования изображения
// событие focus происходит, когда таб переходим или мышкой в фокусе те когда элемент становится активным
// когда нажимаем esc происх событие keydoun


focusTextarea.addEventListener('keydown', function (evt) {
  // focusTextarea === evt.target;
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});


// Цикл Drag-and-drop для маркера
var effectLevelValue = document.querySelector('.effect-level__value');
// возможность перемещать пин слайдера
var effectLevelPin = document.querySelector('.effect-level__pin');
// Глубина эффекта фотографии yellow - ее длинна шкалы регулируется положением Pin
var effectLevelDepth = document.querySelector('.effect-level__depth');
// Глубина эффекта фотографии - вся шкала - yellow +opacity
var effectLevelLine = document.querySelector('.effect-level__line');


// функция перевода количества пикселей в % - ширину линии effectLevelLine.offsetWidth делим на 100% - получаем значение 1% в px,
// Pin.offset.left делим на значение 1% в px -находим колич в % Pin.offset.left
var pixelToPersent = function (offsetLeft) {
  return offsetLeft / (effectLevelLine.offsetWidth / 100);
};


// подгатавливаемся к перемещению drag and drop
effectLevelPin.addEventListener('mousedown', function (evt) {
  // evt.preventDefault();

  // начальные координаты мыши, когда мы нажмем мышью пин - mousedown
  var startCoordPin = {
    x: evt.clientX,
    y: evt.clientY
  };
  // console.log(startCoordPin);

  // дали другое название для события moveEvt - иначе перетрет evt
  var onMouseMovePin = function (moveEvt) {
    // moveEvt.preventDefault();
    // shift это смещение ( 10-начало +5 =15; 5 это смещение, а 15 новое значение для начальной точки)
    var shiftPin = {
      x: startCoordPin.x - moveEvt.clientX
    };
    // мы перезаписали новое значение для начальной точки (10+5 =15, было 10, а стало 15)
    startCoordPin = {
      x: moveEvt.clientX
    };
    var pinPositionValue = pixelToPersent(effectLevelPin.offsetLeft - shiftPin.x);

    if (pinPositionValue <= 0) {
      pinPositionValue = 0;
    } else if (pinPositionValue >= 100) {
      pinPositionValue = 100;
    }

    effectLevelPin.style.left = pinPositionValue + '%';
    effectLevelDepth.style.width = pinPositionValue + '%';
    effectLevelValue.value = pinPositionValue;
    // вызываем функцию changeFilterLevel, которя изменяет уровень насыщенности фильтра в зависимости от позиции pin
    // pinPositionValue -ее аргумент
    changeFilterLevel(pinPositionValue);
  };

  // дали другое название для события upEvt иначе перетрет evt
  var onMouseUpPin = function (upEvt) {
    onMouseMovePin(upEvt);

    // очищаем обработчики пч мы еще работаем в интерфейсе и совершаем маусапы на странице постоянно
    document.removeEventListener('mousemove', onMouseMovePin);
    document.removeEventListener('mouseup', onMouseUpPin);
  };

  document.addEventListener('mousemove', onMouseMovePin);
  document.addEventListener('mouseup', onMouseUpPin);
});


//  у uploadImagePreview изменяем уровень насыщенности фильтра в зависимости от позиции пина

var changeFilterLevel = function (pinPositionValue) {

  var pinPosition = Math.round(pinPositionValue);

  effectLevelValue.value = pinPosition;

  // var currentChecked определена внутри функции changeFilterLevel, при каждом запуске этой функции вызывается запрос и он нам
  // возвращает текущий элемент .effects__radio:checked, когда двигаем пин у нас всегда запускается функция сhangeFilterLevel
  // а если бы var currentChecked была снаружи функции, то она бы нашлась один раз по ходу загрузки скрипта в соответсвии с разметкой кода

  var currentChecked = effectsListElement.querySelector('.effects__radio:checked');
  var value = currentChecked.value;

  switch (value) {
    case 'chrome':
      uploadImagePreview.style.filter = 'grayscale(' + pinPosition * 0.01 + ')';
      break;
    case 'sepia':
      uploadImagePreview.style.filter = 'sepia(' + pinPosition * 0.01 + ')';
      break;
    case 'marvin':
      uploadImagePreview.style.filter = 'invert(' + pinPosition + '%)';
      break;
    case 'phobos':
      uploadImagePreview.style.filter = 'blur(' + pinPosition * 0.05 + 'px)';
      break;
    case 'heat':
      uploadImagePreview.style.filter = 'brightness(' + pinPosition * 0.03 + ')';
      break;
    default:
      uploadImagePreview.style.filter = '';
  }
};


