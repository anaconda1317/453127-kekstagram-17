'use strict';
(function () {
  var NEW_PHOTOS_COUNT = 10;
  var sortFilters = document.querySelector('.img-filters');
  var activeSortBtn = sortFilters.querySelector('.img-filters__button--active');
  var sortBtnPopular = sortFilters.querySelector('#filter-popular');
  var sortBtnNew = sortFilters.querySelector('#filter-new');
  var sortBtnDiscussed = sortFilters.querySelector('#filter-discussed');

  // создание элемента
  var pictureTemplate = document.querySelector('#picture').
    content.
    querySelector('.picture');
  var picturesBlock = document.querySelector('.pictures');

  var renderPhoto = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.dataset.index = photo.index;

    // заполняем склонированный элемент
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  // функция удаление фото отрисованых-начало
  var callback = function (node) {
    // Метод Node.remove() удаляет узел из дерева DOM
    node.remove();
  };
  var removeFormerPhotos = function () {
    var formerPhoto = document.querySelectorAll('.picture');
    // это псевдомассив
    formerPhoto.forEach(callback);
  };
  // функция удаление фото отрисованых-конец


  // отрисовка фото в документе
  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();
    // Мы сложили в массив фотки, а цикл организован по массиву -
    //  и мы опираеcя на порядок элементов в массиве (он начся с 0)

    photos.forEach(function (photo) {
      fragment.appendChild(renderPhoto(photo));
    });
    picturesBlock.appendChild(fragment);
  };

  // сортировка ПОПУЛЯРНЫЕ
  // Мы вызываем функцию window.debounce и ей передаем в параметры  анонимную функцию,
  // которая удаляет, отрисовывает фото, после того как мы передали анонимную функцию.
  // Результат мы сохраняем в showPopularPhotos
  var showPopularPhotos = function (photos) {
    removeFormerPhotos();
    renderPhotos(photos);
  };

  // сортировка НОВЫЕ -копируем исходный массив
  var showNewPhotos = function (photos) {
    removeFormerPhotos();
    var randomPhotos = window.util.getUniqueElements(photos, NEW_PHOTOS_COUNT);

    renderPhotos(randomPhotos);
  };

  // сортировка ОБСУЖДАЕМЫЕ - копируем исходный массив
  var showDiscussedPhotos = function (photos) {
    removeFormerPhotos();
    var photosCopy = photos.slice();
    // compare функция коллбэк
    var compare = function (b, a) {
      if (a.comments.length < b.comments.length) {
        return -1;
      }
      if (a.comments.length > b.comments.length) {
        return 1;
      }
      return 0;
    };
    // Мы вызываем функцию sort у массива photosCopy  в параметрах функции передаем
    //  аргумент (compare) - функция sort использ рез-тат работы функц compare
    photosCopy.sort(compare);
    renderPhotos(photosCopy);
  };


  // сортировка  - переопределяем button--active
  var selectFilter = function (evt) {
    if (evt.target !== activeSortBtn) {
      activeSortBtn.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      activeSortBtn = evt.target;
    }
  };


  // упаковываем полученные с сервера по GET запросу массив объектов в фрагмент(импортируем функцию window.load)
  // 1. загрузили фотогафии на страницу
  window.backend.load(function (photos) {
    // в параметры .forEach передаем photo - очередной элемент массива, i – номер элемент массива
    // В .forEach передаем очередной элемент массива и индекс этого элемента.
    photos.forEach(function (photo, i) {
      // i это index. Сохраняем его как свойство index у объекта photo, который пришел с сервера. Мы в каждой фотографии сохраняем ее индекс
      photo.index = i;
      // Мы сохраняем индекс самого элемента в свойстве index у объекта photo
    });
    renderPhotos(photos);
    // 2. после этого показать блок с кнопками-фильтрами
    sortFilters.classList.remove('img-filters--inactive');

    var filterClick = window.debounce(function (evt) {
      if (evt.target === sortBtnNew) {
        showNewPhotos(photos);
      } else if (evt.target === sortBtnPopular) {
        showPopularPhotos(photos);
      } else if (evt.target === sortBtnDiscussed) {
        showDiscussedPhotos(photos);
      }
    });

    // 3. событие-клик по активной кнопке - загрузка отфильтрованых фото (какой фильтр - написано на button)
    sortBtnPopular.addEventListener('click', function (evt) {
      selectFilter(evt);
      filterClick(evt);
    });

    sortBtnNew.addEventListener('click', function (evt) {
      selectFilter(evt);
      filterClick(evt);
    });

    sortBtnDiscussed.addEventListener('click', function (evt) {
      selectFilter(evt);
      filterClick(evt);
    });

    // открытие попапа с полноразмерным фото
    var onPhotoClick = function (evt) {
      var target = evt.target;
      // Цикл while работает пока возвр tru (нажали на span - <p> родитель - это не 'picture' - вернул true-
      // цикл дальше, дальше нажали <p> родитель - 'picture' -это <a> вернул folse ), если folse, то цикл переходит на if
      // смотрим подходит ли - пока то, на чем совершили клик не содерж класс 'picture' и у него есть родитель,
      // вместо 'picture' в target запишем родительский элемент
      while (target && (target === document || !target.classList.contains('picture'))) {
        target = target.parentNode;
        // target === document, у document нет parentNode, поэтому вернет null и поэтому openPopup не сработает для кошака
        // он загрузится по старому обработчику на событие 'change'

      }

      if (target) {
        evt.preventDefault();
        window.photoPopup.openPopup(photos[target.dataset.index]);
        // функция openPopup показывает фото, у которого индекс той фото, на которой был клик
      }
    };
    picturesBlock.addEventListener('click', onPhotoClick);
    // picturesBlock это parentNode
    // сообщение об ошибке выводит, если интернет вылетел или долго грузится
  }, alert);
})();
