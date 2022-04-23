"use strict";

/*---------------------------------------------
Template name :  Anefty
Version       :  1.0
Author        :  ThemeLooks
Author url    :  http://themelooks.com

NOTE:
------
Please DO NOT EDIT THIS JS, you may need to use "custom.js" file for writing your custom js.
We may release future updates so it will overwrite this file. it's better and safer to use "custom.js".

[Table of Content]

    01: Main Menu
    02: Sticky Nav
    03: Submenu Responsive
    04: Background Image
    05: Check Data
    06: Swiper
    07: Changing svg color
    08: Google map
    09: Preloader
    10: Contact Form
    11: Back to top button
    12: Mobile Menu
    13: particlesJS
    14: Love React
    15: Countdown Timer
    16: Magnific Popup
    17: Nice Select
    18: Isotope
    19: Follow Button
    20: Banner Mousemove
    21: Counter Up
    22: Copy Clipboard
    23: Increase/Decrease Product Quantity
      23.1: Increase
      23.2: Decrease
    24: Contact Form
    25: currentYear
----------------------------------------------*/
(function ($) {
  "use strict";
  /*===================
  01: Main Menu
  =====================*/

  $('ul.nav li a[href="#"]').on("click", function (event) {
    event.preventDefault();
  });
  /* Menu Maker */

  $(".nav-wrapper").menumaker({
    title: "<span></span>",
    format: "multitoggle"
  });
  $($(window)).on("scroll", function () {
    if (!$("ul.nav").hasClass("open")) {
      $("#menu-button").removeClass("menu-opened");
    }
  });

  function mobileMenu() {
    if ($(window).width() < 1200) {
      $(".nav-wrapper .nav-wrap-inner").hide();
    } else {
      $(".nav-wrapper .nav-wrap-inner").show();
    }
  }

  $(window).on("resize", function () {
    mobileMenu();
  });
  mobileMenu();
  /*========================
  02: Sticky Nav
  ==========================*/

  var headeraH = $(".header").outerHeight(),
      headerM = $(".header-main.love-sticky");
  headerM.parent(".header").css({
    height: headeraH + "px"
  });
  var loveSticky = $(".love-sticky");
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();

    if (scroll < 100) {
      loveSticky.removeClass("sticky fadeInDown animated");
    } else {
      loveSticky.addClass("sticky fadeInDown animated");
    }
  });
  /*==================================
  03: Submenu Responsive
  ====================================*/

  function subMenu() {
    var $subMain = $(".nav-wrapper .nav > li > ul");
    var $subSub = $(".nav-wrapper .nav > li > ul ul");
    $subMain.each(function () {
      if ($(window).width() > 1199) {
        if ($(this).offset().left + $(this).width() > $(window).width()) {
          $(this).css({
            left: "auto",
            right: "0"
          });
        }
      }
    });
    $subSub.each(function () {
      if ($(window).width() > 1199) {
        if ($(this).offset().left + $(this).width() > $(window).width()) {
          $(this).css({
            left: "auto",
            right: "100%"
          });
        }
      }
    });
  }

  subMenu();
  $(window).resize(subMenu);
  /*========================
  04: Background Image
  ==========================*/

  var $bgImg = $("[data-bg-img]");
  $bgImg.css("background-image", function () {
    return 'url("' + $(this).data("bg-img") + '")';
  }).removeAttr("data-bg-img").addClass("bg-img");
  /*==================================
  05: Check Data
  ====================================*/

  var checkData = function checkData(data, value) {
    return typeof data === "undefined" ? value : data;
  };
  /*==================================
  06: Swiper
  ====================================*/


  var $swiper = $(".swiper");
  $swiper.each(function () {
    var $t = $(this);
    new Swiper($t[0], {
      slidesPerView: checkData($t.data("swiper-items"), 1),
      spaceBetween: checkData($t.data("swiper-margin"), 0),
      loop: checkData($t.data("swiper-loop"), true),
      autoHeight: checkData($t.data("swiper-auto-height"), false),
      autoplay: checkData($t.data("swiper-autoplay"), false),
      breakpoints: checkData($t.data("swiper-breakpoints"), {}),
      centeredSlides: checkData($t.data("swiper-center"), false),
      direction: checkData($t.data("swiper-direction"), "horizontal"),
      effect: checkData($t.data("swiper-effect"), "slide"),
      navigation: {
        nextEl: checkData($t.data("swiper-navigation-next"), ".swiper-button-next"),
        prevEl: checkData($t.data("swiper-navigation-prev"), ".swiper-button-prev")
      },
      pagination: {
        el: checkData($t.data("swiper-pagination-el"), ".swiper-pagination"),
        dynamicBullets: checkData($t.data("swiper-pagination-dynamic-bullets"), true),
        clickable: checkData($t.data("swiper-pagination-clickable"), true)
      }
    });
  });
  /*==================================
  07: Changing svg color 
  ====================================*/

  $("img.svg").each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find("svg"); // Add replaced image's ID to the new SVG

      if (typeof imgID !== "undefined") {
        $svg = $svg.attr("id", imgID);
      } // Add replaced image's classes to the new SVG


      if (typeof imgClass !== "undefined") {
        $svg = $svg.attr("class", imgClass + " replaced-svg");
      } // Remove any invalid XML tags as per http://validator.w3.org


      $svg = $svg.removeAttr("xmlns:a"); // Check if the viewport is set, else we gonna set it if we can.

      if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
        $svg.attr("viewBox", "0 0 " + $svg.attr("height") + " " + $svg.attr("width"));
      } // Replace image with new SVG


      $img.replaceWith($svg);
    }, "xml");
  });
  /*==================================
  08: Google map 
  ====================================*/

  var $map = $('[data-trigger="map"]'),
      $mapOps;

  if ($map.length) {
    // Map Options
    $mapOps = $map.data("map-options"); // Map Initialization

    window.initMap = function () {
      $map.css("min-height", "530px");
      $map.each(function () {
        var $t = $(this),
            map,
            lat,
            lng,
            zoom;
        $mapOps = $t.data("map-options");
        lat = parseFloat($mapOps.latitude, 10);
        lng = parseFloat($mapOps.longitude, 10);
        zoom = parseFloat($mapOps.zoom, 10);
        map = new google.maps.Map($t[0], {
          center: {
            lat: lat,
            lng: lng
          },
          zoom: zoom,
          scrollwheel: false,
          disableDefaultUI: true,
          zoomControl: true,
          styles: [{
            featureType: "water",
            elementType: "geometry",
            stylers: [{
              color: "#e9e9e9"
            }, {
              lightness: 17
            }]
          }, {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{
              color: "#f5f5f5"
            }, {
              lightness: 20
            }]
          }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
              color: "#ffffff"
            }, {
              lightness: 17
            }]
          }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
              color: "#ffffff"
            }, {
              lightness: 29
            }, {
              weight: 0.2
            }]
          }, {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{
              color: "#ffffff"
            }, {
              lightness: 18
            }]
          }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
              color: "#ffffff"
            }, {
              lightness: 16
            }]
          }, {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{
              color: "#f5f5f5"
            }, {
              lightness: 21
            }]
          }, {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{
              color: "#dedede"
            }, {
              lightness: 21
            }]
          }, {
            elementType: "labels.text.stroke",
            stylers: [{
              visibility: "on"
            }, {
              color: "#ffffff"
            }, {
              lightness: 16
            }]
          }, {
            elementType: "labels.text.fill",
            stylers: [{
              saturation: 36
            }, {
              color: "#333333"
            }, {
              lightness: 40
            }]
          }, {
            elementType: "labels.icon",
            stylers: [{
              visibility: "off"
            }]
          }, {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{
              color: "#f2f2f2"
            }, {
              lightness: 19
            }]
          }, {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{
              color: "#fefefe"
            }, {
              lightness: 20
            }]
          }, {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{
              color: "#fefefe"
            }, {
              lightness: 17
            }, {
              weight: 1.2
            }]
          }]
        });
        map = new google.maps.Marker({
          position: {
            lat: lat,
            lng: lng
          },
          map: map,
          animation: google.maps.Animation.DROP,
          draggable: false,
          icon: "assets/img/map-marker.png"
        });
      });
    };

    initMap();
  }
  /*==================================
  09: Preloader 
  ====================================*/


  $(window).on("load", function () {
    $(".preloader-svg").animate({
      "stroke-dasharray": 890
    }, 3000, function () {
      $(this).find("path").css("fill", "#FF0076");
      $(".preloader").fadeOut(200);
    });
  });
  /*==================================
  10: Contact Form
  ====================================*/

  $(".contact-form-wrapper").on("submit", "form", function (e) {
    e.preventDefault();
    var $el = $(this);
    $.post($el.attr("action"), $el.serialize(), function (res) {
      res = $.parseJSON(res);
      $el.parent(".contact-form-wrapper").find(".form-response").html("<span>" + res[1] + "</span>");
    });
  });
  /*============================================
  11: Back to top button
  ==============================================*/

  var $backToTopBtn = $(".back-to-top");

  if ($backToTopBtn.length) {
    var scrollTrigger = 400,
        // px
    backToTop = function backToTop() {
      var scrollTop = $(window).scrollTop();

      if (scrollTop > scrollTrigger) {
        $backToTopBtn.addClass("show");
      } else {
        $backToTopBtn.removeClass("show");
      }
    };

    backToTop();
    $(window).on("scroll", function () {
      backToTop();
    });
    $backToTopBtn.on("click", function (e) {
      e.preventDefault();
      $("html,body").animate({
        scrollTop: 0
      }, 700);
    });
  }
  /*==================================
  12: Mobile Menu
  ====================================*/


  function mobileMenu() {
    var $menu = $(".mobile-menu-panel .mobile_menu");
    $menu.find("ul li").parents(".mobile_menu ul li").addClass("has-sub-item").prepend('<span class="submenu-button"></span>'); // $menu.find(".has-sub-item");

    $menu.find(".submenu-button").on("click", function () {
      $(this).toggleClass("submenu-opened");

      if ($(this).siblings("ul").hasClass("open")) {
        $(this).siblings("ul").removeClass("open").slideUp("fast");
      } else {
        $(this).siblings("ul").addClass("open").slideDown("fast");
      }
    });
  }

  mobileMenu();
  /*==================================
  13: particlesJS
  ====================================*/

  var particles = $("#particles");
  $(window).on("load", function () {
    if (particles.length) {
      particlesJS("particles", {
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: false,
              mode: "repulse"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  });
  /*==================================
  14: Love React
  ====================================*/

  var loveReact = $(".love-react");
  loveReact.on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("is-active");
  });
  /*==================================
  15: Countdown Timer
  ====================================*/

  $(".countdown").countdown({
    date: "08/16/2022 23:59:59"
  });
  /*==================================
  16: Magnific Popup
  ====================================*/

  var $popUpVideo = $(".popup-video");

  if ($popUpVideo.length) {
    $popUpVideo.magnificPopup({
      type: "iframe"
    });
  }
  /*==================================
  17: Nice Select
  ====================================*/


  $(document).ready(function () {
    $("select").niceSelect();
  });
  /*==================================
  18: Isotope
  ====================================*/

  $(window).on("load", function () {
    $(document).ready(function () {
      var $grid = $(".grid").isotope({
        itemSelector: ".element-item",
        layoutMode: "fitRows"
      }); // bind filter button click

      $("#filters").on("click", "button", function () {
        var filterValue = $(this).attr("data-filter");
        $grid.isotope({
          filter: filterValue
        });
      }); // change is-checked class on buttons

      $("#filters").each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on("click", "button", function () {
          $buttonGroup.find(".is-checked").removeClass("is-checked");
          $(this).addClass("is-checked");
        });
      });
    });
  });
  /*============================================
  19: Follow Button
  ==============================================*/

  var followBtn = $(".btn-follow");
  followBtn.on("click", function (e) {
    var _this = this;

    e.preventDefault();
    $(this).html('<span class="spinner-border text-light"></span>');
    setTimeout(function () {
      $(_this).addClass("followed").html("Followed");
    }, 500);
  });
  /*==================================
  20: Banner Mousemove
  ====================================*/

  var object = $(".move-img");
  var layer = $(".layer");
  layer.mousemove(function (e) {
    var valueX = e.pageX * 1 / -100;
    var valueY = e.pageY * 1 / -80;
    object.css({
      transform: "translate3d(" + valueX + "px, " + valueY + "px,0)"
    });
  });
  /*==================================
  21: Counter Up
  ====================================*/

  jQuery(document).ready(function ($) {
    $(".counter").counterUp({
      delay: 10,
      time: 2000
    });
  });
  /*==================================
  22: Copy Clipboard
  ====================================*/

  $("#copy-link-btn").on("click", function (e) {
    e.preventDefault();
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($("#get-link").val()).select();
    document.execCommand("copy");
    $temp.remove();
  });
  /*==================================
  23: Increase/Decrease Product Quantity
  ====================================*/

  /* 23.1: Increase */

  $(".plus").on("click", function () {
    var $qty = $(this).parent().find("input");
    var currentVal = parseInt($qty.val());

    if (!isNaN(currentVal)) {
      $qty.val(currentVal + 1);
    }
  });
  /* 23.2: Decrease */

  $(".minus").on("click", function () {
    var $qty = $(this).parent().find("input");
    var currentVal = parseInt($qty.val());

    if (!isNaN(currentVal) && currentVal > 1) {
      $qty.val(currentVal - 1);
    }
  });
  /*==================================
  24: Contact Form
  ====================================*/

  $(".contact-form-wrap").on("submit", "form", function (e) {
    e.preventDefault();
    var $el = $(this);
    $.post($el.attr("action"), $el.serialize(), function (res) {
      res = $.parseJSON(res);
      $el.parent(".contact-form-wrap").find(".form-response").html("<span>" + res[1] + "</span>");
    });
  });
  /*==================================
  25: currentYear
  ====================================*/

  var currentYear = new Date().getFullYear();
  $(".currentYear").html(currentYear);
})(jQuery);