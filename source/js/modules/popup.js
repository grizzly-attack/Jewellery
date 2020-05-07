'use strict';
(function () {
  function initPopup(popup, form) {
    var close = popup.querySelector('.popup__close-button');
    var overlay = popup.querySelector('.popup__bg');

    close.addEventListener('click', function (evt) {
      evt.preventDefault();

      if (form) {
        form.reset();
      }
      popupClose(popup);
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        if (popup.classList.contains('popup--show')) {
          if (form) {
            form.reset();
          }
          popupClose(popup);
        }
      }
    });

    overlay.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (form) {
        form.reset();
      }
      popupClose(popup);
    });
  }

  function popupOpen(popup) {
    popup.classList.add('popup--show');
    document.body.classList.add('open-popup');
  }

  function popupClose(popup) {
    popup.classList.remove('popup--show');
    document.body.classList.remove('open-popup');
  }

  function initFilter() {
    var openButton = document.querySelector('.filter__open-button');
    var filter = document.querySelector('.filter__form-container');

    if (!filter) {
      return;
    }

    openButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupOpen(filter);
    });

    initPopup(filter);
  }

  function initAdding() {
    var openButton = document.querySelector('.card__button');
    var addCart = document.querySelector('.popup--adding');

    if (!addCart) {
      return;
    }

    openButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupOpen(addCart);
    });

    initPopup(addCart);
  }

  function initLogin() {
    var openButton = document.querySelector('.page-header__login');
    var openButtonMobile = document.querySelector('.page-header__login--tablet');
    var popup = document.querySelector('.popup--login');
    var header = document.querySelector('.page-header');

    if (!popup) {
      return;
    }

    var userEmail = popup.querySelector('.login__input--mail input');
    var form = popup.querySelector('form');

    openButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupOpen(popup);
      userEmail.focus();
    });

    openButtonMobile.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupOpen(popup);
      userEmail.focus();
      if (header.classList.contains('page-header--open')) {
        header.classList.remove('page-header--open');
        window.bodyScrollLock.enableBodyScroll(header);
      }
    });

    initPopup(popup, form);
  }

  initAdding();
  initFilter();
  initLogin();
})();
