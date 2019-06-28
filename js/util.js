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
    getRandomElement: function (arr) {
      // Получение случайного элемента из массива
      var randomIndex = window.util.getRandomNumber(0, arr.length);
      var randomElement = arr[randomIndex];
      return randomElement;
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

