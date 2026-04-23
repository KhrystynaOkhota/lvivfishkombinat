var _functions = {}, winWidth, shareButton;

jQuery(function ($) {
    var isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
    if (isTouchScreen)
        $('html').addClass('touch-screen');
    var winScr, winHeight, is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
        is_IE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent),
        is_Chrome = navigator.userAgent.indexOf('Chrome') >= 0 && navigator.userAgent.indexOf('Edge') < 0;
    winWidth = $(window).width();
    winHeight = $(window).height();
    if (is_Mac) {
        jQuery('html').addClass('mac');
    }
    if (is_IE) {
        jQuery('html').addClass('ie');
    }
    if (is_Chrome) {
        jQuery('html').addClass('chrome');
    }

    //popup
    let popupTop = 0;
    _functions.removeScroll = function () {
        popupTop = $(window).scrollTop();
        jQuery('html').css({
            "position": "fixed",
            "top": -$(window).scrollTop(),
            "width": "100%"
        });
    }
    _functions.addScroll = function () {

        jQuery('html').css({
            "position": "static"
        });
        window.scroll(0, popupTop);
    }

    _functions.openPopup = function (popup) {

        jQuery('.popup-content').removeClass('active');

        // $('.popup-content').removeClass('animate-away').addClass('animate-in');

        jQuery(popup + ', .popup-wrapper').addClass('active');
        _functions.removeScroll();
    };

    _functions.closePopup = function () {
        jQuery('.popup-wrapper, .popup-content').removeClass('active');
        _functions.addScroll();
    };

    $(document).on('click', '.open-popup', function (e) {
        e.preventDefault();
        _functions.openPopup('.popup-content[data-rel="' + $(this).data('rel') + '"]');
    });

    $(document).on('click', '.popup-wrapper .btn-close, .popup-wrapper .layer-close, .popup-wrapper .btn-back', function (e) {
        e.preventDefault();
        _functions.closePopup();
    });


    /* Function on page scroll */
    $(window).on('scroll', function () {
        //header-hidden _functions.scrollCall();
    });

    /*
        let prevScroll = 0;
        let ticking = false;
    
        const header = document.querySelector('header');
        const menuItems = document.querySelectorAll('.menu-item');
    
        _functions.scrollCall = () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollDiff = currentScroll - prevScroll;
    
                    // Скрол вниз — ховати хедер
                    if (scrollDiff > 10 && currentScroll > 50 && !header.classList.contains('header-hidden')) {
                        header.classList.add('header-hidden');
                        header.classList.remove('header-visible');
                        menuItems.forEach(item => item.classList.remove('active'));
                    }
    
                    // Скрол вверх — показати хедер
                    if (scrollDiff < -10 && header.classList.contains('header-hidden')) {
                        header.classList.remove('header-hidden');
                        header.classList.add('header-visible');
                    }
    
                    // Біля верху сторінки — скинути класи
                    if (currentScroll <= 10) {
                        header.classList.remove('header-hidden', 'header-visible');
                    }
    
                    prevScroll = currentScroll;
                    ticking = false;
                });
    
                ticking = true;
            }
        };
    */

    /* _functions.scrollCall = function () {
         winScr = $(window).scrollTop();
         if (winScr > 10) {
             jQuery('header').addClass('scrolled');
         } else {
             jQuery('header').removeClass('scrolled');
         }
     }*/
    /*_functions.scrollCall();*/
    // Підписка на скрол
    window.addEventListener('scroll', _functions.scrollCall, { passive: true });

    // Виклик одразу при завантаженні, щоб перевірити положення хедера
    window.addEventListener('load', () => {
        // _functions.scrollCall();
    });


    // search
    $(document).on("click", ".js-open-search", function () {


        jQuery(".h-search").addClass("active");
        jQuery("html").removeClass("open-menu open-submenu");
        jQuery(`.h-sub-menu, .h-link-subnav`).removeClass("active");
        setTimeout(() => {
            jQuery(".autocomplete-product").focus();
        }, 10);
    });

    jQuery(document).on("click", ".js-close-search", function () {
        jQuery(".h-search, .h-search-results").removeClass("active");
        jQuery(".h-search input").val("");
    });
    $(document).on("click", ".h-overlay", function () {
        jQuery("html").removeClass("overflow-menu open-menu open-submenu");
        jQuery(".h-search").removeClass("active");
        jQuery(".h-search input").val("");
    });

});

function scrollAnime() {
    if (jQuery('.animation').length) {
        jQuery('.animation').not('.animated').each(function () {
            var th = jQuery(this);
            if (jQuery(window).width() < 768) {
                if (jQuery(window).scrollTop() >= th.offset().top - (jQuery(window).height() * 0.95)) {
                    th.addClass('animated');
                }
            } else {
                if (jQuery(window).scrollTop() >= th.offset().top - (jQuery(window).height() * 0.85)) {
                    th.addClass('animated');
                }
            }
        });
    }
}

scrollAnime();
jQuery(window).on('scroll', function () {
    scrollAnime();
});

// =============================
// BURGER
// =============================
jQuery(function () {



    /*jQuery(".burger__wrap").on("click", function () {
        jQuery(this).toggleClass("active"),
            jQuery(".navbar").toggleClass("is-visible")
    })
*/
    _functions.scrollWidth = function () {
        let scrWidth = jQuery(window).outerWidth() - jQuery('body').innerWidth();
        jQuery('body,  .h-menu-toggle, .h-search-wrapp').css({
            "paddingRight": `${scrWidth}px`
        });
    }
    // Open menu
    jQuery(document).on('click', '.h-burger', function () {
        _functions.scrollWidth();
        jQuery('html').toggleClass('overflow-menu');
        jQuery(this).toggleClass("active"),
            jQuery(this).closest('header').toggleClass('open-menu');



    });


});


// =============================
// ACCORDEON
// =============================

jQuery(document).on('click', '.accordion-title', function () {
    var accordeon = jQuery(this).closest('.accordeon');
    accordeon.find('.accordion-title.active').not(this).removeClass('active').next().slideUp();
    jQuery(this).toggleClass('active').next().slideToggle();
});


// =============================
// PLAY AND STOP VIDEO
// =============================

jQuery(document).on('click', '.media__btn', function () {
    let videoItem = jQuery(this).closest('.media__entry').find('video').get(0);

    if (videoItem.paused) {
        videoItem.play();
        jQuery(this).closest('.media__entry').find('video').attr('controls', '');
        jQuery(this).closest('.media__btn').addClass('hide');

        jQuery(this).parents(".media__entry").find(".heading").css({
            "display": "none"
        });


    } else {
        videoItem.pause();
        jQuery(this).closest('.video-full').find('video').removeAttr('controls');
        jQuery(this).closest('.btn-play').removeClass('hide');
    }
});
// about page
/*
jQuery('.preload__btn').on('click', function () {
    jQuery(this).parents(".preload-entry").find(".preload").css({
        'z-index': -1,
        'opacity': 0
    });
    jQuery(this).parents(".s-video").find(".heading").css({
        "display": "none"
    });

    jQuery(this).parents(".preload-entry").find("video").css({
        "display": "block"
    });

    var video = $(this).parents(".preload-entry").find("video")[0];

    console.log(video.paused);
    if (video.paused === false) {
        $(this).parents(".preload-entry").find('.--pause').removeClass("d-block").addClass("d-none");
        $(this).parents(".preload-entry").find('.--play').removeClass("d-none").addClass("d-block");
        video.pause();
    } else {
        video.play();
        $(this).parents(".preload-entry").find('.--play').removeClass("d-block").addClass("d-none");
        $(this).parents(".preload-entry").find('.--pause').removeClass("d-none").addClass("d-block");
    }
});
*/
// =============================
// FILTER
// =============================

jQuery(document).on("click", ".fl-title", function () {
    jQuery(this).toggleClass("is-active");
    //  $(".fl-menu-item").removeClass("is-open");
    jQuery(this).closest(".fl-menu-item").toggleClass("is-open");
    jQuery(this).closest(".fl-menu-item").find(".fl-toggle").first().slideToggle(300);
});
//open filters on mobile
jQuery(document).on("click", ".btn-filter", function () {
    jQuery("body,html").toggleClass("overflow-hidden");
    jQuery(this).toggleClass("is-open");
    jQuery(".fl-menu__wrap").toggleClass("is-open");
    jQuery(".fl-menu__overlay").toggleClass("is-active");
});
jQuery(document).on("click", ".fl-menu__overlay, .fl-menu__close", function () {
    jQuery(this).hasClass("is-active")
        ? jQuery(this).removeClass("is-active")
        : jQuery(this).addClass("is-active");

    jQuery(".fl-menu__wrap").removeClass("is-open"),
        jQuery("body,html").toggleClass("overflow-hidden");

});

// =============================
// LIGHTGALLERY
// =============================
jQuery('.lightgallery').not('.animated').each(function () {
    jQuery(this).lightGallery();
});

// =============================
// TAB
// =============================
const tabs = document.querySelectorAll(".tab");

function tabify(tab) {
    const tabList = tab.querySelector(".tab__list");

    if (tabList) {
        const tabItems = [...tabList.children];
        const tabContent = tab.querySelector(".tab__content");
        const tabContentItems = [...tabContent.children];
        let tabIndex = 0;

        tabIndex = tabItems.findIndex((item, index) => {
            return [...item.classList].indexOf("is--active") > -1;
        });

        tabIndex > -1 ? (tabIndex = tabIndex) : (tabIndex = 0);

        function setTab(index) {
            tabItems.forEach((x, index) => x.classList.remove("is--active"));
            tabContentItems.forEach((x, index) => x.classList.remove("is--active"));

            tabItems[index].classList.add("is--active");
            tabContentItems[index].classList.add("is--active");
        }

        tabItems.forEach((x, index) =>
            x.addEventListener("click", () => setTab(index))
        );
        setTab(tabIndex);
        tab.querySelectorAll(".tab").forEach((tabContent) => tabify(tabContent));
    }
}

tabs.forEach(tabify);


/*
const tabs = document.querySelectorAll(".tab");
const MOBILE_BREAKPOINT = 768;

tabs.forEach(initTabs);

function initTabs(tab) {
    const tabList = tab.querySelector(".tab__list");
    if (!tabList) return;

    const tabItems = [...tabList.children];
    const tabContent = tab.querySelector(".tab__content");
    const tabContentItems = [...tabContent.children];
    const isAccordion = tab.classList.contains("accordion");

    let currentIndex = tabItems.findIndex(item =>
        item.classList.contains("is--active")
    );
    if (currentIndex === -1) currentIndex = 0;

    function isMobile() {
        return isAccordion && window.innerWidth <= MOBILE_BREAKPOINT;
    }

    function clearTabs() {
        tabItems.forEach(i => i.classList.remove("is--active"));
        tabContentItems.forEach(c => {
            c.classList.remove("is--active");
            c.style.height = "";
            c.style.overflow = "";
            c.style.transition = "";
        });
    }

    function buildTabs() {
        tab.querySelectorAll(".accordion-title").forEach(el => el.remove());
        tabList.style.display = "";

        clearTabs();

        tabItems.forEach((item, index) => {
            item.onclick = () => {
                clearTabs();
                item.classList.add("is--active");
                tabContentItems[index].classList.add("is--active");
            };
        });

        tabItems[currentIndex]?.classList.add("is--active");
        tabContentItems[currentIndex]?.classList.add("is--active");
    }

    function closeAllAccordion() {
        tab.querySelectorAll(".accordion-title").forEach(t =>
            t.classList.remove("is--active")
        );

        tabContentItems.forEach(c => {
            c.classList.remove("is--active");
            c.style.height = "0px";
        });
    }

    function buildAccordion() {
        tabList.style.display = "none";
        clearTabs();

        tabContentItems.forEach((content, index) => {
            const existingTitle = content.previousElementSibling;
            if (existingTitle && existingTitle.classList.contains("accordion-title")) {
                return;
            }

            const title = document.createElement("div");
            title.className = "accordion-title";
            title.innerHTML = tabItems[index].innerHTML;

            content.style.height = "0px";
            content.style.overflow = "hidden";
            content.style.transition = "height 0.3s ease";

            title.onclick = () => {
                const isOpen = title.classList.contains("is--active");

                closeAllAccordion();

                if (!isOpen) {
                    title.classList.add("is--active");
                    content.classList.add("is--active");
                    content.style.height = content.scrollHeight + "px";
                }
            };

            tabContent.insertBefore(title, content);
        });
    }

    function updateMode() {
        if (isMobile()) {
            buildAccordion();
        } else {
            buildTabs();
        }
    }

    updateMode();

    window.addEventListener("resize", debounce(updateMode, 200));
}

function debounce(fn, delay) {
    let t;
    return function () {
        clearTimeout(t);
        t = setTimeout(fn, delay);
    };
}

*/
// =============================
// stats
// =============================
jQuery(function ($) {
    const obsCounter = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry) => {
            if (!entry.isIntersecting)
                return;
            entry.target.classList.add("|", "animated");
            $(entry.target).find(".stats__value--number").each(function () {
                $(this).prop("Counter", 0).animate({
                    Counter: $(this).text(),
                }, {
                    duration: 1500,
                    easing: "swing",
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    },
                });
            });
            observer.unobserve(entry.target);
        }
        );
    });

    document.querySelectorAll(".stats__grid").forEach((block) => {
        obsCounter.observe(block);
    });

});


//*=============
//*  OTHER JS  =
//*=============
// Seo block with smooth animation
document.querySelectorAll('.info-block').forEach(function (infoBlock) {
    const content = infoBlock.querySelector('.info-block__content');
    const text = content ? content.querySelector('.info-block__text') : null;
    const button = infoBlock.querySelector('.btn-more');

    if (!content || !text || !button) return;

    const fullHeight = text.scrollHeight;
    const minHeight = parseInt(window.getComputedStyle(content).minHeight) || 0;

    if (fullHeight <= minHeight) {
        button.style.display = 'none';
        return;
    }

    button.addEventListener('click', function () {
        const isActive = this.classList.toggle('is-active');
        const targetHeight = isActive ? fullHeight : minHeight;

        // Smooth animation using CSS transitions
        content.style.transition = 'height .5s ease';
        content.style.height = targetHeight + 'px';

        // Set height to auto after animation completes (if expanded)
        if (isActive) {
            setTimeout(() => {
                content.style.height = 'auto';
            }, 600);
        }
    });
});


// =============================
// PRICE
// =============================


if (jQuery('#slider').length) {
    jQuery("#slider").slider({
        range: true,
        min: 0,
        max: 7000,
        values: [8, 6666],
        slide: function (event, ui) {
            jQuery(".from").val(ui.values[0]);
            jQuery(".to").val(ui.values[1]);
        }
    });
};

// open search
$(document).on("click", ".js-open-search", function () {
    _functions.removeScroll();
    $("header").addClass("search-open");

    setTimeout(function () {
        $(".h-search").find("input").focus();
    }, 100);
});
$(document).on("click", ".js-close-search", function () {
    _functions.addScroll();
    $("header").removeClass("search-open");
    $(".h-search").find("input").val("");
    $(".cab-search").removeClass("active");
    $(".search__results-wrap").removeClass("active");
});

$(document).on("input", ".search input", function () {
    const val = $(this).val();
    const $res = $(this).closest(".search").find(".search__results-wrap");
    if (val.length) {
        $res.addClass("active");
    } else {
        $res.removeClass("active");
    }
});