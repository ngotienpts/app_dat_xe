document.addEventListener("DOMContentLoaded", function () {
  var starRating = document.querySelector(".star-cb-group");

  const app = {
    // su ly cac su kien
    handleEvent: function () {
      const _this = this;
      if (starRating) {
        var stars = starRating.querySelectorAll('[type*="radio"]');
        stars.forEach((star) => {
          star.onchange = () => {
            if (star.checked) {
              console.log(star.value);
            }
          };
        });
      }
    },
    // scroll top
    scrollFunc: function () {},

    // window scroll
    windowScroll: function () {
      var _this = this;
      window.onscroll = function () {
        // scroll top
        _this.scrollFunc();
      };
    },
    // khoi tao function start
    start: function () {
      // su ly cac su kien
      this.handleEvent();
      // window scroll
      this.windowScroll();
    },
  };

  app.start();
});
