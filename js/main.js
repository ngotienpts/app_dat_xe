document.addEventListener("DOMContentLoaded", function () {
  // đánh sao
  var starRating = document.querySelector(".star-cb-group");

  //
  var selectDefaults = document.querySelectorAll(".js_default-option");

  //
  var showSelects = document.querySelectorAll(".js_show-select");

  const app = {
    // su ly cac su kien
    handleEvent: function () {
      const _this = this;
      // đánh sao
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
      //
      if (selectDefaults) {
        selectDefaults.forEach((selectDefault) => {
          selectDefault.onclick = function () {
            this.classList.toggle("active");
          };

          var options =
            selectDefault.parentElement.querySelectorAll(".js_select .option");
          options.forEach((option) => {
            option.onclick = function () {
              var h4 = this.querySelector(".title");
              var currentEl = selectDefault.querySelector("li");
              currentEl.innerText = h4.innerText;
              selectDefault.classList.remove("active");
            };
          });

          var optionSecondarys = selectDefault.parentElement.querySelectorAll(
            ".js_select .option-secondary"
          );
          optionSecondarys.forEach((optionSecondary) => {
            optionSecondary.onclick = function () {
              var currentEl = selectDefault.querySelector("li");
              currentEl.innerHTML = this.innerHTML;
              selectDefault.classList.remove("active");
            };
          });

          // hide cac element khi click ra ngoai
          document.addEventListener("click", function (e) {
            if (!selectDefault.querySelector("li").contains(e.target)) {
              selectDefault.classList.remove("active");
            }
          });
        });
      }

      if (showSelects) {
        showSelects.forEach((showSelect) => {
          var seeDetail = showSelect.querySelector(".see-details");
          seeDetail.onclick = function () {
            this.classList.toggle("active");
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
