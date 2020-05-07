'use strict';
(function () {
  var items = document.querySelectorAll('.filter__title');

  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function (el) {
      el.currentTarget.classList.toggle('filter__title--open');
    });
  }
})();
