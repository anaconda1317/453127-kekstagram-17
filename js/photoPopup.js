'use strict';


(function () {
  var COMMENTS_PER_PAGE = 5;
  var pageBody = document.querySelector('body');
  var photoPopup = pageBody.querySelector('.big-picture');
  var closeBtn = photoPopup.querySelector('.big-picture__cancel');
  var commentsList = photoPopup.querySelector('.social__comments');
  var loadMoreBtn = photoPopup.querySelector('.comments-loader');
  var socialCommentCount = photoPopup.querySelector('.social__comment-count');
  var renderedCommentsCount = 0;
  var comments;

  var openPopup = function (photo) {
    pageBody.classList.add('modal-open');
    photoPopup.classList.remove('hidden');
    // кнопка в фокусе
    closeBtn.focus();

    // элемент .big-picture заполняем данными
    // .url, .likes, .comments.length, .description - свойства объекта photo
    photoPopup.querySelector('.big-picture__img img').src = photo.url;
    photoPopup.querySelector('.likes-count').textContent = photo.likes;
    photoPopup.querySelector('.social__caption').textContent = photo.description;

    window.comments.commentDelete();

    // photo.comments  свойство объекта photo - массив - 5/..из всех и их может  быть меньше 5
    comments = photo.comments;
    onLoadMoreBtnClick();

    loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

    // закрытие btn
    document.addEventListener('keydown', onPopupUploadEscPress);
    closeBtn.addEventListener('click', closePopup);
  };

  var onLoadMoreBtnClick = function () {
    // .slice создает новый массив без удаления из первых 5 элементов
    var commentsForRender = comments.slice(renderedCommentsCount, renderedCommentsCount + COMMENTS_PER_PAGE);
    renderedCommentsCount += commentsForRender.length;

    var fragment = window.comments.renderComments(commentsForRender);
    commentsList.appendChild(fragment);

    if (renderedCommentsCount === comments.length) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
    }

    socialCommentCount.textContent = renderedCommentsCount + ' из ' + comments.length + ' комментариев';
  };

  // закрытие при нажатии Esc
  var onPopupUploadEscPress = function (evt) {
    window.util.isEscEvent(evt, function () {
      closePopup();
    });
  };

  var closePopup = function () {
    pageBody.classList.remove('modal-open');
    photoPopup.classList.add('hidden');

    loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
    renderedCommentsCount = 0;

    document.removeEventListener('keydown', onPopupUploadEscPress);
    closeBtn.removeEventListener('click', closePopup);
  };

  window.photoPopup = {
    openPopup: openPopup,
    closePopup: closePopup
  };

})();
