'use strict';
(function () {
  var ESC_KEYCODE = 27;

  window.util = {
    // функция для получения случайного числа в заданном диапазоне
    // Math.random() это API - это стандартная функция
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    // Получение УНИКАЛЬНЫХ  элемента из массива
    getUniqueElements: function (arr, quantity) {
      var uniqueElements = [];
      var buffer = arr.slice();

      for (var i = 0; i < quantity; i++) {
        var randomIndex = window.util.getRandomNumber(0, buffer.length - 1);

        if (randomIndex >= 0) {
          // В массив  uniqueElement добавляем элемент с индексом randomIndex из массива buffer.
          //  Результат этого выраж buffer[randomIndex] - элемент из массива buffer randomIndex
          uniqueElements.push(buffer[randomIndex]);
          buffer.splice(randomIndex, 1);
        }
      }
      return uniqueElements;
    },

    // закрытие при нажатии Esc
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    }
  };
})();
