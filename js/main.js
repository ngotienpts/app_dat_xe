document.addEventListener("DOMContentLoaded", function () {
  const app = {
    // su ly cac su kien
    handleEvent: function () {
      const _this = this;
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
