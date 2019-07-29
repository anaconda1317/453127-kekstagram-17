'use strict';
(function () {
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

  var effectsListElement = uploadElement.querySelector('.effects__list');
  var inputEffectNone = effectsListElement.querySelector('#effect-none');
  var inputEffectChrome = effectsListElement.querySelector('#effect-chrome');
  var inputEffectSepia = effectsListElement.querySelector('#effect-sepia');
  var inputEffectMarvin = effectsListElement.querySelector('#effect-marvin');
  var inputEffectPhobos = effectsListElement.querySelector('#effect-phobos');
  var inputEffectHeat = effectsListElement.querySelector('#effect-heat');
  var currentEffectName = effectsListElement.querySelector('.effects__radio:checked');
  var effectLevelScale = imgUploadOverlay.querySelector('.img-upload__effect-level');
  var submitBtn = imgUploadForm.querySelector('.img-upload__submit');

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var preview = document.querySelector('.img-upload__preview img');
  var effectsPreview = document.querySelectorAll('.effects__preview');

  // Метод forEach() выполняет указанную функцию
  // один раз для каждого элемента в массиве.
  var pasteSrc = function (src) {
    preview.src = src;
    effectsPreview.forEach(function (el) {
      el.style.backgroundImage = 'url("' + src + '")';
    });
  };

  // Показываем форму редактирования изображения событие 'change' на input type="file" id="upload-file"
  inputIdUploadFile.addEventListener('change', function () {
    var file = inputIdUploadFile.files[0];
    var fileName = file.name.toLowerCase();

    // Метод some() проверяет, удовлетворяет ли хоть какой-нибудь
    //  элемент массива условию, заданному в передаваемой функции
    // matches это совпадения - it-перебирает расширения FILE_TYPES на каждой иттерации- ищет совпадения
    // по расширениям файла
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        pasteSrc(reader.result);
        document.body.classList.add('modal-open');
        imgUploadOverlay.classList.remove('hidden');
        document.addEventListener('keydown', onPopupUploadEscPress);
      });

      reader.readAsDataURL(file);
    }
  });

  // закрытие при нажатии Esc
  var onPopupUploadEscPress = function (evt) {
    window.util.isEscEvent(evt, function () {
      closePopup();
      // очищаем форму после каждой загрузки изображения
      imgUploadForm.reset();
    });
  };

  var closePopup = function () {
    changePhotoSize(100);
    document.body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    // убираем обработчик события со всего документа
    document.removeEventListener('keydown', onPopupUploadEscPress);
  };

  // закрывает форму редактирования изображения кнопкой
  buttonImgUploadCancel.addEventListener('click', function () {
    closePopup();
  });

  var changeEffectLevel = function () {
    effectLevelPin.style.left = 100 + '%';
    effectLevelDepth.style.width = 100 + '%';
    effectLevelValue.value = 100;
  };


  // Мы ловим событие click  при нажатии на radio-button, которую находим по ее id,
  // на большой картинке с котом добавляеся  фильтр с интенсивностью 100%

  inputEffectNone.addEventListener('click', function () {
    // uploadImagePreview.style.filter = '';
    changeFilterLevel(100);
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
    changeEffectLevel();
    effectLevelScale.classList.remove('hidden');
  });

  inputEffectSepia.addEventListener('click', function () {
    uploadImagePreview.style.filter = 'sepia(1)';
    changeEffectLevel();
    effectLevelScale.classList.remove('hidden');
  });

  inputEffectMarvin.addEventListener('click', function () {
    uploadImagePreview.style.filter = 'invert(100%)';
    changeEffectLevel();
    effectLevelScale.classList.remove('hidden');
  });

  inputEffectPhobos.addEventListener('click', function () {
    uploadImagePreview.style.filter = 'blur(5px)';
    changeEffectLevel();
    effectLevelScale.classList.remove('hidden');
  });

  inputEffectHeat.addEventListener('click', function () {
    // inputEffectHeat.checked = false;
    uploadImagePreview.style.filter = 'brightness(3)';
    changeEffectLevel();
    effectLevelScale.classList.remove('hidden');
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
    // где  атрибут :checked - это id="effect-none"

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

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    submitBtn.disabled = true;

    window.backend.upload(new FormData(imgUploadForm), function () {
      submitBtn.disabled = false;
      imgUploadForm.reset();
      closePopup();
      window.modal.showModalSucces();
    }, function () {
      submitBtn.disabled = false;
      closePopup();
      window.modal.showModalError();
    });
  };

  imgUploadForm.addEventListener('submit', onFormSubmit);

  // изменение размера изображения

  var imgResize = document.querySelector('.img-upload__scale');
  var minusResizeBtn = imgResize.querySelector('.scale__control--smaller');
  var plusResizeBtn = imgResize.querySelector('.scale__control--bigger');
  var resizeControlValue = imgResize.querySelector('.scale__control--value');

  var Resize = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var changePhotoSize = function (value) {
    // знвачение отображается в % строкой, когда кликаем, а изначально приходит в %
    resizeControlValue.value = value + '%';
    // от 0 до 1 для фильтра scale, поэтому делим на 100, чб получить в %
    preview.style.transform = 'scale(' + value / 100 + ')';
  };

  var onScaleBtnClick = function (evt) {
    var currentValue = parseInt(resizeControlValue.value, 10);

    if (evt.target === minusResizeBtn) {
      currentValue -= Resize.STEP;
    } else {
      currentValue += Resize.STEP;
    }

    if (currentValue >= Resize.MIN && currentValue <= Resize.MAX) {
      changePhotoSize(currentValue);
    }
  };

  plusResizeBtn.addEventListener('click', onScaleBtnClick);
  minusResizeBtn.addEventListener('click', onScaleBtnClick);
})();
