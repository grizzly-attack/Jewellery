'use strict';
(function () {
  var items = document.querySelectorAll('.accordion');
  var currentItem = document.querySelector('.accordion--open');

  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function (el) {
      if (currentItem) {
        currentItem.classList.remove('accordion--open');
      }

      if (currentItem !== el.currentTarget) {
        currentItem = el.currentTarget;
        currentItem.classList.toggle('accordion--open');
      } else {
        currentItem = null;
      }
    });
  }
})();
