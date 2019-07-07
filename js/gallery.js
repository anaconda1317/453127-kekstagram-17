'use strict';
(function () {

  var sortFilters = document.querySelector('.img-filters');
  var activeSortBtn = sortFilters.querySelector('.img-filters__button--active');
  var sortBtnPopular = sortFilters.querySelector('#filter-popular');
  var sortBtnNew = sortFilters.querySelector('#filter-new');
  var sortBtnDiscussed = sortFilters.querySelector('#filter-discussed');

  var NEW_PHOTOS_COUNT = 10;

  // создание элемента
  var pictureTemplate = document.querySelector('#picture').
    content.
    querySelector('.picture');
  var picturesBlock = document.querySelector('.pictures');

  var renderPhoto = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    // ???элемента
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  // функция удаление фото отрисованых начало
  var callback = function (node) {
    // Метод Node.remove() удаляет узел из дерева DOM
    node.remove();
  };
  var removeFormerPhotos = function () {
    var formerPhoto = document.querySelectorAll('.picture');
    // это псевдомассив
    formerPhoto.forEach(callback);
  };
  // функция удаление фото отрисованых конец


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
  var showPopularPhotos = window.debounce(function (photos) {
    removeFormerPhotos();
    renderPhotos(photos);
  });

  // сортировка НОВЫЕ -копируем исходный массив
  var showNewPhotos = window.debounce(function (photos) {
    removeFormerPhotos();
    var randomPhotos = window.util.getUniqueElement(photos, NEW_PHOTOS_COUNT);

    renderPhotos(randomPhotos);
  });

  // сортировка ОБСУЖДАЕМЫЕ - копируем исходный массив
  var showDiscussedPhotos = window.debounce(function (photos) {
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

  });


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
  window.load(function (photos) {
    renderPhotos(photos);
    // 2. после этого показать блок с кнопками-фильтрами
    sortFilters.classList.remove('img-filters--inactive');

    // 3. событие-клик по активной кнопке - загрузка отфильтрованых фото (какой фильтр - написано на button)
    sortBtnPopular.addEventListener('click', function (evt) {
      selectFilter(evt);
      showPopularPhotos(photos);
    });

    sortBtnNew.addEventListener('click', function (evt) {
      selectFilter(evt);
      showNewPhotos(photos);
    });

    sortBtnDiscussed.addEventListener('click', function (evt) {
      selectFilter(evt);
      showDiscussedPhotos(photos);
    });

  });
})();
