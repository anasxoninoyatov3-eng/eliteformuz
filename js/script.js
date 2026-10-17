document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 40,
        speed: 800, // Smooth soft transition speed
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
        },
        keyboard: {
            enabled: true,
        },
    });
});