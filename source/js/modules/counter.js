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
