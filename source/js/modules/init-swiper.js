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
