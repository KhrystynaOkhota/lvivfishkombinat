jQuery(function ($) {
    // ініціалізація SumoSelect
    if ($('.orderby').length) {
        $('.orderby').each(function () {
            $(this).SumoSelect({
                floatWidth: 0,
                nativeOnDevice: [], // вимикаємо нативне меню пристрою
                forceCustomRendering: true, // змушуємо плагін малювати свій HTML на мобільних
                isFullScreen: false // вимикаємо перекриття всього екрану модалкою
            });
        });
    }
});