'use strict';

(function () {
  var navToggle = document.querySelector('.page-header__toggle');
  var header = document.querySelector('.page-header');

  if (!navToggle || !header) {
    return;
  }

  navToggle.addEventListener('click', function () {
    header.classList.toggle('page-header--open');

    if (header.classList.contains('page-header--open')) {
      window.bodyScrollLock.disableBodyScroll(header);
    } else {
      window.bodyScrollLock.enableBodyScroll(header);
    }
  });
})();
