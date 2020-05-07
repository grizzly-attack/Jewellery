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

'use strict';
(function () {
  var counters = Array.from(document.querySelectorAll('.adding__range'));

  if (!counters.length) {
    return;
  }

  var getNumber = function (string) {
    if (!Number(string)) {
      return 0;
    }
    return Number(string);
  };

  var getCounters = function (counter) {
    var input = counter.querySelector('.adding__range-input input');
    var minusBtn = counter.querySelector('.adding__range-minus');
    var plusBtn = counter.querySelector('.adding__range-plus');

    minusBtn.addEventListener('click', function () {
      if (getNumber(input.value) === 1) {
        input.value = 1;
      } else {
        input.value = getNumber(input.value) - 1;
      }
    });

    plusBtn.addEventListener('click', function () {
      input.value = getNumber(input.value) + 1;
    });
  };

  counters.forEach(getCounters);
})();

'use strict';
(function () {
  var items = document.querySelectorAll('.filter__title');

  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function (el) {
      el.currentTarget.classList.toggle('filter__title--open');
    });
  }
})();

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

'use strict';
(function () {
  var swiperElement = document.querySelector('.swiper-container');

  if (!swiperElement) {
    return;
  }

  var slider = new window.Swiper(swiperElement, {
    observeParents: true,
    observer: true,
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 30,
    breakpointsInverse: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,

      renderBullet: function (index, className) {
        return '<button type="button" class="' + className + '">' + (index + 1) + '</button>';
      },
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },

      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      }
    }
  });

  var blockPageActivePagination = document.querySelector('.pagination__page-active');
  var blockTotalPagePagination = document.querySelector('.pagination__page-count');

  if (!blockPageActivePagination && !blockTotalPagePagination) {
    return;
  }

  blockTotalPagePagination.innerText = Math.ceil(slider.slides.length / 2);

  function getNumberActivePage() {
    var countCardPerSlide = 4;

    if (window.matchMedia('max-width: 767px'.matches)) {
      countCardPerSlide = 2;
    }

    return (slider.activeIndex + countCardPerSlide) / countCardPerSlide;
  }

  function handleChangeSlide() {
    blockPageActivePagination.innerText = getNumberActivePage();
  }

  slider.on('slideChange', handleChangeSlide);

  slider.on('resize', function () {
    handleChangeSlide();
  });

  window.setTimeout(handleChangeSlide, 500);
})();

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

'use strict';
/*eslint-disable*/
(function () {
  //var filterTitles = document.querySelectorAll('.filter__item');
  var checkboxs = document.querySelectorAll('.filter__item input[type="checkbox"]');
  var restFilters = document.querySelector('.filter__button-clear');
  var stepsSlider = document.getElementById('steps-slider');
  var input0 = document.getElementById('input-0');
  var input1 = document.getElementById('input-1');
  var inputs = [input0, input1];

  if (!stepsSlider) {
    return;
  }

  restFilters.addEventListener('click', function (evt) {
    evt.preventDefault();
    Array.prototype.forEach.call(checkboxs, function (checkbox) {
      checkbox.checked = '';
      stepsSlider.noUiSlider.updateOptions({
        start: [0, 200]
      })
    });
  });


  noUiSlider.create(stepsSlider, {
    start: [55, 155],
    connect: true,
    step: 1,
    range: {
      'min': 0,
      'max': 200
    },
    format: wNumb({
      decimals: 0,
      thousand: ' ',
      suffix: '$'
    })
  });

  stepsSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = values[handle];
  });

  inputs.forEach(function (input, handle) {
    input.addEventListener('change', function () {
      stepsSlider.noUiSlider.setHandle(handle, this.value);
    });

    input.addEventListener('keydown', function (e) {
      var values = stepsSlider.noUiSlider.get();
      var value = Number(values[handle]);
      var steps = stepsSlider.noUiSlider.steps();
      var step = steps[handle];
      var position;

      switch (e.which) {
        case 13:
          stepsSlider.noUiSlider.setHandle(handle, this.value);
          break;
        case 38:
          position = step[1];
          if (position === false) {
            position = 1;
          }
          if (position !== null) {
            stepsSlider.noUiSlider.setHandle(handle, value + position);
          }
          break;
        case 40:
          position = step[0];
          if (position === false) {
            position = 1;
          }
          if (position !== null) {
            stepsSlider.noUiSlider.setHandle(handle, value - position);
          }
        break;
      }
    });
});
})();

'use strict';

(function () {
  window.svg4everybody();
})();
