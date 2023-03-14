document.addEventListener("DOMContentLoaded", function () {
  // đánh sao
  var starRating = document.querySelector(".star-cb-group");

  //
  var selectDefaults = document.querySelectorAll(".js_default-option");

  //
  var showSelects = document.querySelectorAll(".js_show-select");

  // route
  var routes = document.querySelectorAll(".route");

  // tabs
  var tabs = document.querySelectorAll(".tab-item");
  var panes = document.querySelectorAll(".tab-pane");

  // setting
  var settingItems = document.querySelectorAll(".js_setting_item");

  // uploadfile
  var uploadFiles = document.querySelectorAll(".js--uploadFile");

  var editSetting = document.querySelector(".setting-avatar");

  // clipboard
  var clipboard = document.querySelector(".js--clipboard-filed");

  //
  var typeNumberAll = document.querySelectorAll('input[type="number"]');

  // destination-list
  var destinations = document.querySelectorAll(".destination-list");

  // map picker
  var mapPiker = document.querySelector(".map-picker");

  // hammner
  var clawPrimarys = document.querySelectorAll(".btn-claw-primary");
  var clawSecondary = document.querySelector(".driver-comming-wrapper");

  const app = {
    // su ly cac su kien
    handleEvent: function () {
      const _this = this;
      // number of input type with max-length
      if (typeNumberAll) {
        typeNumberAll.forEach((typeNumber) => {
          typeNumber.oninput = function () {
            if (this.value.length > this.maxLength)
              this.value = this.value.slice(0, this.maxLength);
          };
        });
      }

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
              document
                .querySelector(".option.active")
                .classList.remove("active");
              this.classList.add("active");
              var h4 = this.querySelector(".title");
              var currentEl = selectDefault.querySelector("li");
              currentEl.innerText = h4.innerText;
              selectDefault.classList.remove("active");
            };
          });

          // hide cac element khi click ra ngoai
          document.addEventListener("click", function (e) {
            if (
              !selectDefault.querySelector("li").contains(e.target) &&
              !e.target.closest(".js_select")
            ) {
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
      // tabs
      if (tabs && panes) {
        tabs.forEach((tab, index) => {
          var pane = panes[index];

          tab.onclick = function () {
            document
              .querySelector(".tab-item.active")
              .classList.remove("active");
            document
              .querySelector(".tab-pane.active")
              .classList.remove("active");

            this.classList.add("active");
            pane.classList.add("active");
          };
        });
      }
      // route
      if (routes) {
        routes.forEach((route) => {
          var firstPoint = route.querySelector(".first-point");
          var finalPoint = route.querySelector(".final-point");
          var dots = route.querySelector(".dots");
          var spaceBetween = _this.getDistanceBetweenElements(
            firstPoint,
            finalPoint
          );
          var count = Math.floor(spaceBetween / 9);
          for (var i = 0; i < count; i++) {
            dots.appendChild(document.createElement("span"));
          }
          if (count > 4) {
            dots.style.height = Math.floor(spaceBetween / 1.5) + "px";
          } else if (count > 7) {
            dots.style.height = Math.floor(spaceBetween / 1) + "px";
          } else {
            dots.style.height = Math.floor(spaceBetween / 2) + "px";
          }
        });
      }

      // setting
      if (settingItems) {
        settingItems.forEach((settingItem) => {
          var title = settingItem.querySelector(".js_setting_title");
          var name = settingItem.querySelector(".name");
          var valid = settingItem.querySelector(".name.valid");
          var input = settingItem.querySelector(".js_setting_changeText input");
          var selected = settingItem.querySelector("select");

          var btnSave = settingItem.querySelector(".btn-save");
          var invalid = settingItem.querySelector(".invalid");
          title.onclick = function () {
            this.parentElement.classList.toggle("active");
            if (input != null) {
              input.focus();
              if (input.value === "") {
                input.value = name.innerText;
              }
            }
          };

          btnSave.onclick = function () {
            if (input != null) {
              if (input.value == "" && !valid) {
                invalid.classList.add("active");
              } else {
                name.innerText = input.value;
                settingItem.classList.remove("active");
                invalid.classList.remove("active");
              }
            }

            if (selected != null) {
              name.innerText = selected.options[selected.selectedIndex].text;
              settingItem.classList.remove("active");
            }
          };
        });
      }
      // upload file avatar my car
      if (uploadFiles) {
        uploadFiles.forEach((uploadFile) => {
          let w = uploadFile.clientWidth;
          let h = Math.floor(w / 1.98);
          uploadFile.style.height = h + "px";
          let imgPreview = uploadFile.querySelector(".js--image-preview");
          let input = uploadFile.querySelector(".image-upload");
          let getImg = imgPreview.querySelector("img");

          function readURL(input) {
            if (input.files && input.files[0]) {
              let reader = new FileReader();
              reader.onload = function (e) {
                getImg.setAttribute("src", e.target.result);
              };
              reader.readAsDataURL(input.files[0]);
            }
          }

          input.onchange = function () {
            readURL(this);
          };
        });
      }
      // upload file avatar
      if (editSetting) {
        var imgPreviewAvatar = editSetting.querySelector(".img-setting");
        var inputSetting = editSetting.querySelector("#imageEdit");

        function readURL(inputSetting) {
          if (inputSetting.files && inputSetting.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
              imgPreviewAvatar.setAttribute("src", e.target.result);
            };

            reader.readAsDataURL(inputSetting.files[0]);
          }
        }

        inputSetting.onchange = function () {
          readURL(this);
        };
      }

      // clipboard
      if (clipboard) {
        var imgCopy = clipboard.querySelector(".js--clipboard-img");
        var text = clipboard.querySelector(".js--clipboard-text");
        var tooltip = clipboard.querySelector(".js--tooltip");
        imgCopy.onclick = function () {
          tooltip.classList.add("active");
          navigator.clipboard.writeText(text.innerText);
        };
      }

      // destinations
      if (destinations) {
        destinations.forEach((destination) => {
          var desList = destination.querySelectorAll(".des");
          desList.forEach((des) => {
            var map = des.nextElementSibling;
            if (map != null) {
              des.onclick = function () {
                map.classList.toggle("active");
              };
            }
            // hide cac element khi click ra ngoai
            document.addEventListener("click", function (e) {
              if (!des.contains(e.target) && !e.target.closest(".map")) {
                if (map != null) {
                  map.classList.remove("active");
                }
              }
            });
          });
        });
      }

      // map picker
      if (mapPiker) {
        var mapInput = mapPiker.querySelector(".map-picker-input");
        var mapIconSearch = mapPiker.querySelector(".map-picker-icon-search");
        var mapIconClose = mapPiker.querySelector(".map-picker-icon-close");
        var mapResult = mapPiker.querySelector(".map-picker-result");
        mapIconClose.onclick = function () {
          mapInput.value = "";
          if (mapResult.classList.contains("active")) {
            mapResult.classList.remove("active");
          }
        };
        mapInput.oninput = function (e) {
          if (e.target.value !== "") {
            mapResult.classList.add("active");
          } else {
            mapResult.classList.remove("active");
          }
        };
      }

      // hammerjs
      if (clawPrimarys) {
        clawPrimarys.forEach((clawPrimary) => {
          var clawIcon = clawPrimary.querySelector(".claw-primary__icon");
          var mc = new Hammer(clawPrimary);
          var threshold = 100;
          mc.on("panleft panright tap press", function (e) {
            var dragDistance = e.deltaX;
            if (dragDistance > threshold) {
              clawPrimary.classList.remove("hide");
              clawIcon.style.opacity = 0;
            } else if (dragDistance < -threshold) {
              clawPrimary.classList.add("hide");
              clawIcon.style.opacity = 1;
            }
          });
        });
      }

      if (clawSecondary) {
        var clawMap = clawSecondary.querySelector(".driver-comming-map");
        var clawDrag = clawSecondary.querySelector(".driver-comming-drag");
        clawDrag.onclick = function () {
          clawMap.classList.toggle("hide");
        };
      }
    },
    //
    getPositionAtCenter: function (element) {
      const { top, left, width, height } = element.getBoundingClientRect();
      return {
        x: left + width / 2,
        y: top + height / 2,
      };
    },
    getDistanceBetweenElements: function (a, b) {
      const aPosition = this.getPositionAtCenter(a);
      const bPosition = this.getPositionAtCenter(b);

      return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
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
