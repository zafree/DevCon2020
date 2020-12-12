/**
 * DevCon2020 v1.0.0 - Developer Conference 2020
 * @link https://zafree.github.io/devcon2020
 * @copyright 2020 Zafree
 * @license MIT
 */
"use strict";

(function () {
  'use strict';

  var root = document.documentElement,
      body = document.body,
      modals = body.querySelectorAll('[data-modal]'); //   const _kErnel = document.querySelector('._kErnel');

  var modalShown = true,
      scrollPosition = 0;

  if (typeof modals != 'undefined' && modals != null && modals.length > 0) {
    Array.prototype.forEach.call(modals, function (modal) {
      modal.addEventListener('click', modalCallback);
    });
  }

  function modalCallback(e) {
    e.preventDefault(); // get target dataset

    var target = e.target,
        getId = target.dataset.modal; // close all modals

    var closeAllModals = body.querySelectorAll('.modal');
    Array.prototype.forEach.call(closeAllModals, function (closeAllModal) {
      if (closeAllModal.classList.contains("modal--open")) {
        removeModal(closeAllModal);
      }
    }); // if modal exists in DOM

    var modal = document.getElementById(getId);

    if (typeof modal != 'undefined' && modal != null) {
      // console.log(modal);
      modalStateCallback(modal);
    } else {
      console.log("undefine id: " + getId);
    }
  }

  function modalStateCallback(e) {
    if (modalShown) {
      showModal(e);
      cancelDetector(e);
    } else {
      removeModal(e);
    }

    modalShown = !modalShown;
  }

  function cancelDetector(e) {
    var dismisses = e.querySelectorAll('[data-dismiss]');

    if (typeof dismisses != 'undefined' && dismisses != null && dismisses.length > 0) {
      Array.prototype.forEach.call(dismisses, function (dismiss) {
        dismiss.addEventListener('click', dismissCallback);
      });
    } else {
      console.log("missing: data-dismiss");
    }
  }

  function dismissCallback(e) {
    var target = e.target;
    var targetDismiss = target.closest('.modal');
    removeModal(targetDismiss);
    modalShown = true;
  }

  function showModal(e) {
    e.classList.add("modal--open"); // e.classList.toggle("modal--open");
    // scrollPosition = window.pageYOffset;
    // _kErnel.style.top = -scrollPosition + 'px';
    // root.classList.add('isScrollDisabled');
  }

  function removeModal(e) {
    e.classList.remove("modal--open"); // e.classList.toggle("modal--open");
    // root.classList.remove('isScrollDisabled');
    // _kErnel.style.top = null;
    // window.scrollTo(null, scrollPosition);

    modalShown = true;
  }
})();
"use strict";

(function () {
  'use strict';

  var liveIndicator = document.getElementById("current");
  var status = true;
  setInterval(function () {
    // live date
    // var currenttime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "numeric", second: "numeric"});
    // document.getElementById('clock').innerText = currenttime;
    var eventDate = "12/13/2020";
    var timeStart = new Date(eventDate + " 05:00 AM");
    var timeEnd = new Date(eventDate + " 07:45 AM");
    var todaysDate = new Date(); // time between given range

    if (todaysDate >= timeStart && todaysDate <= timeEnd) {
      var minutesNow = todaysDate.getHours() * 3600 + todaysDate.getMinutes() * 60 + todaysDate.getSeconds();
      var minutesEventStart = timeStart.getHours() * 3600 + timeStart.getMinutes() * 60;
      var timediff = (minutesNow - minutesEventStart) / 60; // calc 5mins = 60px 

      var beforeSpace = 60;
      var px = timediff * (60 / 5) + beforeSpace;

      if (typeof liveIndicator != 'undefined' && liveIndicator != null) {
        // document.getElementById('increment').innerText = px+"px";
        liveIndicator.classList.add('active');
        liveIndicator.style.marginLeft = px + 'px';
      }

      var content = document.getElementById('content');

      if (typeof content != 'undefined' && content != null) {
        var contentWidth = content.clientWidth / 2;

        if (px > contentWidth && status) {
          var swipe = px - contentWidth;
          sideScroll(slider, 'right', 40, swipe, 20);
          status = false;
        }
      }
    } else {
      if (typeof liveIndicator != 'undefined' && liveIndicator != null) {
        liveIndicator.classList.remove('active');
        liveIndicator.style.marginLeft = '';
      }
    }
  }, 1000); // next prev

  var slider = document.getElementById('slider');
  var next = document.getElementById('next');

  if (typeof next != 'undefined' && next != null) {
    next.onclick = function () {
      sideScroll(slider, 'right', 40, 200, 20);
    };
  }

  var prev = document.getElementById('prev');

  if (typeof prev != 'undefined' && prev != null) {
    prev.onclick = function () {
      sideScroll(slider, 'left', 40, 200, 20);
    };
  }

  function sideScroll(element, direction, speed, distance, step) {
    var scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (direction == 'left') {
        // console.log("left");
        element.scrollLeft -= step;
      } else {
        // console.log("right");
        element.scrollLeft += step;
      }

      scrollAmount += step;

      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }
})();