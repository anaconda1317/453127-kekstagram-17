'use strict';


(function () {

  var pageBody = document.querySelector('body');
  var photoPopup = pageBody.querySelector('.big-picture');
  var closeBtn = photoPopup.querySelector('.big-picture__cancel');
  var commentsList = photoPopup.querySelector('.social__comments');
  var loadMoreBtn = photoPopup.querySelector('.comments-loader');
  var socialCommentCount = photoPopup.querySelector('.social__comment-count');

  // Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loade
  loadMoreBtn.classList.add('hidden');
  socialCommentCount.classList.add('hidden');

  var openPopup = function (photo) {

    photoPopup.classList.remove('hidden');

    // элемент .big-picture заполняем данными
    // .url, .likes, .comments.length, .description - свойства объекта photo
    photoPopup.querySelector('.big-picture__img img').src = photo.url;
    photoPopup.querySelector('.likes-count').textContent = photo.likes;
    photoPopup.querySelector('.comments-count').textContent = photo.comments.length;
    photoPopup.querySelector('.social__caption').textContent = photo.description;
    window.comments.commentDelete();

    // photo.comments  свойство объекта photo - массив
    var fragment = window.comments.renderComments(photo.comments);
    commentsList.appendChild(fragment);


    // закрытие btn
    document.addEventListener('keydown', onPopupUploadEscPress);
    closeBtn.addEventListener('click', closePopup);
  };

  // закрытие при нажатии Esc
  var onPopupUploadEscPress = function (evt) {
    window.util.isEscEvent(evt, function () {
      closePopup();
    });
  };

  var closePopup = function () {
    photoPopup.classList.add('hidden');

    document.removeEventListener('keydown', onPopupUploadEscPress);
    closeBtn.removeEventListener('click', closePopup);
  };

  window.photoPopup = {
    openPopup: openPopup,
    closePopup: closePopup
  };

})();
