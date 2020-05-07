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
