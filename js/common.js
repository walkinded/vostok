(function($){

  /* Для проверки resize, т.к. на мобильном Хроме при скролле срабывает resize (без изменения ширины) */
  var screenWidth = $(window).width();

  /* Инициализация wow */
  wow = new WOW({mobile: false})
  wow.init();

  /* Нужно для IE и некоторых других браузеров, чтобы понимал svg спрайты во внешних файлах */
  svg4everybody();

  /* Инициализация красивых select'ов */
  $('.nice-select').niceSelect();

  /* полифил для object-fit */
  objectFitImages($('[data-object-fit-cover],[data-object-fit-contain]'), {watchMQ: true});

  /* инициализация fancybox */
  $(".fancybox").fancybox({
    padding: 0,
    scrolling: 'auto'
  });

  /* инициализация таймера */
  var ts = new Date(2020, 6, 1);

  $('#countdown').countdown({
    timestamp : ts,
    callback  : function(days, hours, minutes, seconds){

      var message = "";

      message += days + " day" + ( days==1 ? '':'s' ) + ", ";
      message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
      message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
      message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
    }
  });

  $('.prod-item__clock .countDays').append('<span class="countText">Дней</span>');
  $('.prod-item__clock .countHours').append('<span class="countText">Часов</span>');
  $('.prod-item__clock .countMinutes').append('<span class="countText">Минут</span>');


  /* Плавный скролл к якорю для всех ссылок с классом "inner-link" */
  $(function(){
    $('.inner-link[href^="#"]').click(function(){
      var _href = $(this).attr('href');
      $('html, body').animate({scrollTop: $(_href).offset().top - 20 +'px'});
      return false;
    });
  });

  /* Плавный скролл "вверх" */
  $('a[href^="#page_wr"]').click(function(event){
    event.preventDefault;
    var _href = $(this).attr('href');
    $('html, body').animate({scrollTop: '0px'});
    return false;
  });

  $('#header-burger').click(function() {
    $(this).toggleClass('active');
    $('.header__top').toggleClass('active');
  });

  $('#page-top-burger').click(function() {
    $('.page-top').removeClass('active');
  });

  $('.header__catalog').click(function() {
    $('.page-top').addClass('active');
  });

  $('.your-file input').change(function() {
    var fileName = $(this).val();
    fileName = fileName.replace (/\\/g, '/').split ('/').pop ();
    $(this).siblings('.sl').text(fileName);
  });

  /* Открытие / закрытие модалок (кроме карты) */
  $('a.open-modal').click(function(event){
    event.preventDefault();
    var _href = $(this).attr('href');
    if ( $(_href).length > 0 ) {
      $(_href).addClass('active');
      $(_href + ' .modal__content').addClass('visible');
    }
  });

  function closeModal() {
    var activeCount = $('.modal.active').length;
    if ( activeCount > 1 ) {
      $($('.modal.active')[activeCount - 1]).removeClass('active');
      $('.modal__callback2 .modal__content').removeClass('visible');
    } else {
      $('.modal').removeClass('active');
      $('.modal__content').removeClass('visible');
    }
  }

  $(document).mouseup(function (e) {
    var container = $(".modal .modal__content");
    if (container.has(e.target).length === 0){
      closeModal();
    }
  });

  $('.modal .close').click(function(){
    closeModal();
  });

  $(document).keydown(function(eventObject){
    if( eventObject.which == 27 ){
      closeModal();
    }
  });

  // маска поля tel
  $(".wpcf7-tel").mask("+7 (999) 999-99-99");

  // Секции по типу "Вопрос - ответ"
  function toggleHidden(xParent,hideOther) {
    $(xParent + ' .top').click(function() {
      $(this).find('.open').toggleClass('active');
      $(this).siblings().slideToggle();
      if (hideOther) {
        $(this).parent().siblings().find('.open').removeClass('active');
        $(this).parent().siblings().find('.hidden').slideUp();
      }
    });
  }

  toggleHidden('.faq',true);

  // Секция "Вакансии"
  function toggleJobs() {
    $('.jobs__top').click(function() {
      $(this).parent().toggleClass('active');
      $(this).siblings().slideToggle();
      $(this).parent().siblings().removeClass('active');
      $(this).parent().siblings().find('.jobs__hidden').slideUp();
    });
  }

  toggleJobs();
  $('.jobs__list > li:first-of-type').addClass('active');
  $('.jobs__list > li:first-of-type .jobs__hidden').show();

  // фиксированные шапка
  $(window).on("scroll", function() {
    var fromTop = $(document).scrollTop();
    $(".header").toggleClass("fixed", (fromTop > 10));

    if (!(window.matchMedia('(max-width: 767px)').matches)) {
      $(".page-top").toggleClass("fixed", (fromTop > 10));
      if (fromTop > 10) {
        setTimeout(function() {$(".page-top").addClass("fixedtr")},300);
      } else {
        setTimeout(function() {$(".page-top").removeClass("fixedtr")},300);
      }
      $(".page-top__show").toggleClass("active", (fromTop > 10));
    }

    $(".to-top").toggleClass("fixed", (fromTop > 600));
  });

  if (window.matchMedia('(max-width: 767px)').matches) {
    $(".page-top").addClass('fixed');
  }

  if (window.matchMedia('(max-width: 575px)').matches) {
    $('.jobs__right b').each(function(xi,xel) {
      var _container = $(xel).parents('.jobs__item').find('.jobs__left-top');
      $(xel).appendTo(_container);
    });
  }

  $('.page-top__show').click(function() {
    $('.page-top.fixed').toggleClass('active');
  });

  // Табы
  $('.prod-item__descr-nav a').click(function(event) {
    event.preventDefault();
    var _href = $(this).attr('href');
    $(this).parent().siblings().removeClass('current');
    $(this).parent().addClass('current');
    $('.prod-item__descr-tab').not(_href).hide();
    $(_href).fadeIn();
    if (window.matchMedia('(max-width: 767px)').matches) {
      $('html, body').animate({scrollTop: $(_href).offset().top - 70 +'px'});
    }
  });


  // "Читать полностью"
  $('.show-more__btns button').click(function() {
    $(this).parent().siblings('.show-more__content').toggleClass('opened');
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      $(this).find('span').text('Свернуть');
    } else {
      $(this).find('span').text('Развернуть');
    }
  });

  function hideMore() {
    $('.show-more__content').each(function(xi,xel) {
      if ($(xel).innerHeight() + 5 <= $(xel).css('max-height').replace('px','')) {
        $(xel).parents('.seo__wrap').find('.seo__show').hide();
      }
    })
  }

  hideMore();


  $('img').on('dragstart', function (event) {
    event.preventDefault();
  });

  /* Замена input(type="number") */
  (function quantityProducts() {
    $.each(['.quantity'],function(xi,xe) {
      $(xe).each(function(xi,xel) {
        var $quantityArrowMinus = $(xel).find(xe + "-arrow-minus");
        var $quantityArrowPlus = $(xel).find(xe + "-arrow-plus");

        $quantityArrowMinus.click(quantityMinus);
        $quantityArrowPlus.click(quantityPlus);

        function quantityMinus() {
          var $quantityNum = $(xel).find(xe + "-num");
          if ($quantityNum.val() >= 2) {
            $quantityNum.val(+$quantityNum.val() - 1);
          }
        }

        function quantityPlus() {
          var $quantityNum = $(xel).find(xe + "-num");
          $quantityNum.val(+$quantityNum.val() + 1);
        }
      });
    });
    $.each(['.show-items'],function(xi,xe) {
      $(xe).each(function(xi,xel) {
        var $quantityArrowMinus = $(xel).find(xe + "-arrow-minus");
        var $quantityArrowPlus = $(xel).find(xe + "-arrow-plus");

        $quantityArrowMinus.click(quantityMinus);
        $quantityArrowPlus.click(quantityPlus);

        function quantityMinus() {
          var $quantityNum = $(xel).find(xe + "-num");
          if ($quantityNum.val() > 4) {
            $quantityNum.val(+$quantityNum.val() - 4);
          }
        }

        function quantityPlus() {
          var $quantityNum = $(xel).find(xe + "-num");
          $quantityNum.val(+$quantityNum.val() + 4);
        }
      });
    });
  })();

  $('.footer__menu .menu > li > a .menu__open').click(function(event) {
    event.preventDefault();

    var xButton = $(this);
    var xSubMenu = $(this).parents('a').siblings('.sub-menu');
    var xWrapSubMenu = $(this).parents('a').siblings('.menu-item__wrap').find('.sub-menu');

    if (!($(this).hasClass('active'))) {
      $('.footer .menu__open').removeClass('active');
      $('.footer .sub-menu').hide();
      xButton.addClass('active');
      xSubMenu.slideDown();
      xWrapSubMenu.slideDown();
    } else {
      xButton.removeClass('active');
      xSubMenu.slideUp();
      xWrapSubMenu.slideUp();
    }

  });

  $('.footer__menu .menu > li > a').click(function(event) {
    event.preventDefault();
  });

   $('.page-top .menu > .menu-item-has-children').hover(function() {
    if (!(window.matchMedia('(max-width: 767px)').matches) && !($('.page-top').hasClass('fixed')) ) {
      $(this).find('.sub-menu').addClass('active');
    }
  }, function() {
    if (!(window.matchMedia('(max-width: 767px)').matches) && !($('.page-top').hasClass('fixed')) ) {
      $(this).find('.sub-menu').removeClass('active');
    }
  });

  $('.page-top .menu > .menu-item > a').hover(function() {
    if (!(window.matchMedia('(max-width: 767px)').matches) && !($('.page-top').hasClass('fixed')) ) {
      $(this).parents('.menu-item').siblings().find('.sub-menu').removeClass('active');
    }
  });

  $('.page-top .menu > .menu-item-has-children .arrow').click(function() {
    $(this).toggleClass('active');
    $(this).siblings('.sub-menu').toggleClass('active');
    $(this).parents('.menu-item').siblings().find('.sub-menu').removeClass('active');
    $(this).parents('.menu-item').siblings().find('.arrow').removeClass('active');
  });

  /* Перенести кнопку "в избранное" не мобильном в каталоге */
  $('.prod__list .prod__item').each(function(xi,xel) {
    var xButton = $(xel).find('.prod__btn');
    var xTitle = $(xel).find('.prod__title');
    xTitle.append(xButton);
  });

  // $('.your-file__label input').change(function() {
  //   var fileName = $(this).val();
  //   fileName = fileName.replace (/\\/g, '/').split ('/').pop ();
    // $(this).parents('label').find('.sl').text(fileName);
  // });

  /* СЛАЙДЕРЫ */
  function equalHeightSwiper(sliderID) {
    $(sliderID).find('.swiper-slide').height('auto');
    var slickTrackHeight = Math.max($(sliderID).find('.swiper-slide').outerHeight());
    $(sliderID).find('.swiper-slide').css('height', slickTrackHeight + 'px');
  }

  var brands__slider = new Swiper('#brands__slider', {
    slidesPerView: 2,
    spaceBetween: 10,
    watchSlidesProgress: true,
    loop: true,
    watchOverflow: true,
    autoplay: {
      delay: 8000,
    },
    navigation: {
      nextEl: '.brands__slider-btns .swiper-button-next',
      prevEl: '.brands__slider-btns .swiper-button-prev',
    },
    pagination: {
      el: '.brands__slider-btns .swiper-dots',
    },
    breakpoints: {
      991: {
        slidesPerView: 5,
        spaceBetween: 35,
      },
      650: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      500: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      400: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
  });

  var mags__slider = new Swiper('#mags__slider', {
    slidesPerView: 2,
    spaceBetween: 10,
    slidesPerColumn: 2,
    slidesPerColumnFill: 'row',
    watchSlidesProgress: true,
    loop: false,
    watchOverflow: true,
    autoplay: {
      delay: 8000,
    },
    navigation: {
      nextEl: '.mags__slider-btns .swiper-button-next',
      prevEl: '.mags__slider-btns .swiper-button-prev',
    },
    pagination: {
      el: '.mags__slider-btns .swiper-dots',
    },
    breakpoints: {
      991: {
        slidesPerView: 6,
        spaceBetween: 30,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      850: {
        slidesPerView: 5,
        spaceBetween: 20,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      700: {
        slidesPerView: 4,
        spaceBetween: 10,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      450: {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
    },
  });

  var contacts__teamSlider = new Swiper('#contacts__team-slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    watchSlidesProgress: true,
    loop: false,
    watchOverflow: true,
    autoplay: {
      delay: 8000,
    },
    navigation: {
      nextEl: '.contacts__team-btns .swiper-button-next',
      prevEl: '.contacts__team-btns .swiper-button-prev',
    },
    pagination: {
      el: '.contacts__team-btns .swiper-dots',
    },
    breakpoints: {
      1070: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      991: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      650: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      500: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      400: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
    },
    on: {
      init: function () {
        $(window).on("load", function () {
          equalHeightSwiper('#contacts__team-slider');
        });
      },
    },
  });

  var prod__slider = new Swiper('#prod__slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    slidesPerColumn: 2,
    slidesPerColumnFill: 'row',
    watchSlidesProgress: true,
    watchOverflow: true,
    autoplay: {
      delay: 8000,
    },
    navigation: {
      nextEl: '#prod__wrap .swiper-button-next',
      prevEl: '#prod__wrap .swiper-button-prev',
    },
    pagination: {
      el: '#prod__wrap .swiper-dots',
    },
    breakpoints: {
      1070: {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      430: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
    },
    on: {
      init: function () {
        $(window).on("load", function () {
          equalHeightSwiper('#prod__slider');
        });
      },
    },
  });

  $('.prod__slider--one-row').each(function(xi,xel) {
    var xId = '#' + $(xel).attr('id');
    var xBtns = $(xel).parents('.prod__wrap--one-row').find('.prod__slider-btns');

    var prod__slider2 = new Swiper(xId, {
      slidesPerView: 1,
      spaceBetween: 10,
      watchSlidesProgress: true,
      watchOverflow: true,
      autoplay: {
        delay: 8000,
      },
      navigation: {
        nextEl: 'xBtns .swiper-button-next',
        prevEl: 'xBtns .swiper-button-prev',
      },
      pagination: {
        el: 'xBtns .swiper-dots',
      },
      breakpoints: {
        1070: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        430: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
      },
      on: {
        init: function () {
          $(window).on("load", function () {
            equalHeightSwiper(xId);
          });
        },
      },
    });
  });

  var scr1__slider = new Swiper('#scr1__slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    watchSlidesProgress: true,
        watchOverflow: true,
    loop: true,
    autoplay: {
      delay: 8000,
    },
    pagination: {
      el: '.scr1__slider-btns .swiper-dots',
    },
    navigation: {
      nextEl: '.scr1__slider-btns .swiper-button-next',
      prevEl: '.scr1__slider-btns .swiper-button-prev',
    },
  });

  var company__certs = new Swiper('#company__certs', {
    slidesPerView: 2,
    spaceBetween: 5,
    watchSlidesProgress: true,
    watchOverflow: true,
    pagination: {
      el: '.company__certs-btns .swiper-dots',
    },
    navigation: {
      nextEl: '.company__certs-btns .swiper-button-next',
      prevEl: '.company__certs-btns .swiper-button-prev',
    },
    breakpoints: {
      1170: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      991: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      700: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
  });

  var galleryThumbs = new Swiper('#prod-item__gallery-thumbs', {
    spaceBetween: 18,
    slidesPerView: 1,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      991: {
        slidesPerView: 3,
        spaceBetween: 18,
      },
      400: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
  });
  var gallerySlider = new Swiper('#prod-item__gallery-slider', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.prod-item__gallery-btns .swiper-button-next',
      prevEl: '.prod-item__gallery-btns .swiper-button-prev',
    },
    thumbs: {
      swiper: galleryThumbs
    }
  });

  var optReviewsSlider = new Swiper('#opt-reviews__slider', {
    spaceBetween: 8,
    slidesPerView: 1,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    pagination: {
      el: '.opt-reviews__slider-btns .swiper-dots',
    },
    navigation: {
      nextEl: '.opt-reviews__slider-btns .swiper-button-next',
      prevEl: '.opt-reviews__slider-btns .swiper-button-prev',
    },
    breakpoints: {
      991: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      700: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      400: {
        slidesPerView: 2,
      },
    },
  });

  function cloneMenu() {
    if (window.matchMedia('(max-width: 767px)').matches && ($('.prod__nav').length > 0) && !($('.prod__nav .menu').length > 0)) {
      $(".page-top .menu").clone().appendTo($('.prod__nav'));
    } else {
      if (($('.prod__nav .menu').length > 0)) {
        $(".prod__nav .menu").hide();
      }
    }
  }

  cloneMenu();

  $('.prod__nav-btn').click(function() {
    $(".prod__nav .menu").slideToggle();
  });


  $(window).resize(function() {

    var currScreeWidth = $(window).width();

    if (currScreeWidth != screenWidth) {
      cloneMenu();
    }

    screenWidth = $(window).width();
  });

  /* ==================== NEW JS ==================== */ 
  var scr1__swiper_card = new Swiper('.scr1__swiper-card', {
    effect: "cards",
    grabCursor: true,
    // slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.swiper-dots',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // watchSlidesProgress: true,
    // watchOverflow: true,
    // loop: true,
    // autoplay: {
    //   delay: 8000,
    // },
    // pagination: {
    //   el: '.scr1__slider-btns .swiper-dots',
    // },
    // navigation: {
    //   nextEl: '.scr1__slider-btns .swiper-button-next',
    //   prevEl: '.scr1__slider-btns .swiper-button-prev',
    // },
  });

})(jQuery);
