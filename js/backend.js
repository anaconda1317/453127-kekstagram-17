'use strict';
(function () {
  var TIMEOUT = 10000;
  var Url = {
    GET: 'https://js.dump.academy/kekstagram/data',
    POST: 'https://js.dump.academy/kekstagram'
  };
  //  10 милисекунд

  var createXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT; // 10s

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

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };


  window.backend = {
    load: load,
    upload: upload
  };
})();
