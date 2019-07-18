'use strict';
(function () {
  var Url = {
    GET: 'https://js.dump.academy/kekstagram/data',
    POST:'https://js.dump.academy/kekstagram'
  };
  var TIMEOUT = 10000;
  //  10 милисекунд

  var load = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT; // 10s

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };


  window.backend = {
    load: load,
    upload: upload
  };
})();
