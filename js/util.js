'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    // функция для получения случайного числа в заданном диапазоне
    // Math.random() это API - это стандартная функция
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    // Получение случайного элемента из массива
    getRandomElement: function (arr) {
      var randomIndex = window.util.getRandomNumber(0, arr.length - 1);
      var randomElement = arr[randomIndex];
      return randomElement;
    },

    // Получение УНИКАЛЬНОГО  элемента из массива
    getUniqueElement: function (arr, quantity) {
      var uniqueElement = [];
      var buffer = arr.slice();

      for (var i = 0; i < quantity; i++) {
        var randomIndex = window.util.getRandomNumber(0, buffer.length - 1);

        if (randomIndex >= 0) {
          // В массив  uniqueElement добавляем элемент с индексом randomIndex из массива buffer.
          //  Результат этого выраж buffer[randomIndex] - элемент из массива buffer randomIndex
          uniqueElement.push(buffer[randomIndex]);
          buffer.splice(randomIndex, 1);
        }
      }
      return uniqueElement;
    },

    // нажатие ENTER
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    // закрытие при нажатии Esc
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    }
  };
})();

