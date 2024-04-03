var allLazyLoad = [...document.querySelectorAll('.lazyload')];

function allLozadImg() {
    allLazyLoad.forEach((el) => {
        var observer = lozad(el);
        observer.observe();
        el.addEventListener('load', () => {
            el.classList.add('is-loaded')
        })

    })
}


allLozadImg();

//counter

const counters = [...document.querySelectorAll('.some-info__cont .single-some-info span')];
const speed = 8000;

const counter = (EL) => {

    const duration = 1500 + Number(EL.dataset.delay); // Animate all counters equally for a better UX

    const start = parseInt(EL.dataset.start, 10); // Get start and end values
    const end = parseInt(EL.dataset.end, 10); // PS: Use always the radix 10!

    if (start === end) return; // If equal values, stop here.

    const range = end - start; // Get the range
    let curr = start; // Set current at start position

    const timeStart = Date.now();

    const loop = () => {
        let elaps = Date.now() - timeStart;
        if (elaps > duration) elaps = duration; // Stop the loop
        const frac = elaps / duration; // Get the time fraction
        const step = frac * range; // Calculate the value step
        curr = start + step; // Increment or Decrement current value
        EL.textContent = Math.trunc(curr); // Apply to UI as integer
        if (elaps < duration) {
            requestAnimationFrame(loop);
        } // Loop
    };

    setTimeout(() => {
        // console.log(Number(EL.dataset.delay));
        // console.log(EL);
        requestAnimationFrame(loop);
    }, Number(EL.dataset.delay));
};

//counter


//anim
//add counting number to show delay speed
var counterContainer = [...document.querySelectorAll('.counting-delay')];

function addCoutingDelay() {
    if (counterContainer.length) {
        counterContainer.forEach((cont) => {
            var anims = [...cont.querySelectorAll('.anim')];
            anims.forEach((btn, k) => {
                btn.dataset.animDelay = k * 40;
            })
        })
    }
}

addCoutingDelay();

var animStage = [...document.querySelectorAll('.anim-stage')];

function scrollAnimationsStage() {
    if (animStage.length) {
        var animItems = [...document.querySelectorAll(':scope > *')];

        var observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // console.log(entry.target);
                var eles = [...entry.target.querySelectorAll(":scope > *")];
                var len = eles.length;

                // console.log(eles);
                if (entry.isIntersecting) {
                    for (var i = 0; i < len; i++) {
                        // console.log(eles[1]);
                        eles[i].style.animationDelay = (entry.target.dataset.animDelay * i) + 'ms';
                        eles[i].style.animationDuration = entry.target.dataset.animDuration + 'ms';
                        eles[i].style.animationName = entry.target.dataset.anim;
                    }
                    observer.unobserve(entry.target);
                }

            })
        }, {threshold: .5})

        animStage.forEach((animate, k) => {
            observer.observe(animate);
        })

    }
}

scrollAnimationsStage();

//marquee
var marqueeContent1 = document.querySelector(".marquee-cont1");

function marqqueFnc1() {
    if (marqueeContent1) {
        var root = document.documentElement;
        var marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed1");

        let widthReal = 0;
        let n = 0;

        let allImg = [...marqueeContent1.querySelectorAll('div .img')];

        allImg.forEach((imgs) => {
            let wd = imgs.offsetWidth;

            widthReal += wd;
            widthReal += 1;
            n += 1;
        });

        let realWidth = (widthReal / (window.innerWidth - n)) * 100;
        console.log(widthReal + ' ' + realWidth + ' ' + window.innerWidth);
        document.documentElement.style.setProperty('--marquee-width1', `${realWidth}%`);

        root.style.setProperty("--marquee-elements1", marqueeContent1.children.length);

        for (var i = 0; i < marqueeElementsDisplayed; i++) {
            marqueeContent1.appendChild(marqueeContent1.children[i].cloneNode(true));
        }
    }
}

marqqueFnc1();


//counter

//scrolling img

let scrollingImg = [...document.querySelectorAll('.scrolled-img')];

function scrollParallaxImg() {
    if (scrollingImg.length) {
        scrollingImg.forEach((bg) => {
            let toTop = bg.getBoundingClientRect().top;
            let w = window.innerHeight;
            // console.log(w);
            let h = bg.offsetHeight;
            let inc = bg.dataset.inc;
            // console.log(h);

            // if (toTop < w) {

            bg.style.setProperty('--st', `${((toTop * (-1)) / w) * 100 * inc}%`);
            // } else {
            // bg.style.setProperty('--st', '0');
            // }
        })
    }
}

scrollParallaxImg();

$(window).scroll(function (e) {

    scrollParallaxImg();
});

//video control

$('body').on('mouseover', '.play-btn', function (e) {

    this.closest('.video-cont').querySelector('video').play();
});
$('body').on('mouseout', '.play-btn', function (e) {
    // console.log($(this));
    if (this.closest('.video-cont').classList.contains('play')) {

    } else {
        this.closest('.video-cont').querySelector('video').pause();
        this.closest('.video-cont').querySelector('video').currentTime = 0;
    }
});


$('body').on('click', '.play-btn', function (e) {
    if (this.closest('.video-cont').classList.contains('play')) {
        this.closest('.video-cont').classList.remove('play');
        this.closest('.video-cont').querySelector('video').pause();
        this.closest('.video-cont').querySelector('video').currentTime = 0;
        this.closest('.video-cont').querySelector('video').muted = true;
    } else {
        [...document.querySelectorAll('.play-btn')].forEach((btn) => {
            if (btn === this) {

            } else {
                btn.closest('.video-cont').classList.remove('play');
                btn.closest('.video-cont').querySelector('video').pause();
                btn.closest('.video-cont').querySelector('video').currentTime = 0;
                btn.closest('.video-cont').querySelector('video').muted = true;
            }
        });
        this.closest('.video-cont').classList.add('play');
        this.closest('.video-cont').querySelector('video').play();
        this.closest('.video-cont').querySelector('video').currentTime = 0;
        this.closest('.video-cont').querySelector('video').muted = false;
    }
});


//video control

//map control

let mapSections = [...document.querySelectorAll('.map-sec')];
let locSections = [...document.querySelectorAll('.single-location')];

function controlMapSections() {
    if (mapSections.length) {
        mapSections.forEach((sec) => {
            let dat = sec.dataset.sec;

            if (window.innerWidth > 1025) {


                sec.addEventListener('mouseover', () => {
                    document.querySelector('.locations-list').classList.add('hover');
                    document.querySelector(`.single-location[data-loc="${dat}"]`).classList.add('active');
                });
                sec.addEventListener('mouseout', () => {
                    document.querySelector('.locations-list').classList.remove('hover');
                    locSections.forEach((loc) => {
                        loc.classList.remove('active');
                    })
                });
            }
            if (window.innerWidth < 1026) {
                sec.addEventListener('click', () => {

                    if (document.querySelector(`.single-location[data-loc="${dat}"]`).classList.contains('active')) {
                        document.querySelector('.locations-list').classList.remove('hover');
                        [...document.querySelectorAll(`.single-location`)].forEach((sc) => {
                            sc.classList.remove('active');
                        });
                    } else {
                        [...document.querySelectorAll(`.single-location`)].forEach((sc) => {
                            sc.classList.remove('active');
                        });
                        document.querySelector('.locations-list').classList.add('hover');
                        document.querySelector(`.single-location[data-loc="${dat}"]`).classList.toggle('active');
                    }

                });
            }

        })
    }
}

controlMapSections();

//map control

//scrolling img


// scroll animations
var anim = document.querySelectorAll('.anim');

function scrollAnimations() {
    if (anim.length) {
        var observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                var el = entry.target
                if (entry.isIntersecting) {
                    if (el.classList.contains('anim-js')) {

                    } else {
                        el.style.animationDelay = el.dataset.animDelay + 'ms';
                        el.style.animationDuration = el.dataset.animDuration + 'ms';
                        el.style.animationName = el.dataset.anim;
                    }


                    el.classList.add('done');
                    observer.unobserve(entry.target);
                    if (el.classList.contains('some-info__cont')) {
                        // console.log('zuza');
                        counters.forEach(counter);
                    }
                }

            })
        }, {threshold: .5});
        if (window.innerWidth > 991) {
            anim.forEach(animate => {
                observer.observe(animate)
            })
        } else {

            anim.forEach(animate => {

                observer.observe(animate)


            })
        }
    }
}

scrollAnimations();

//


var burger = [...document.querySelectorAll('.burger')];
var header = document.querySelector('.header');


function burgerControl() {
    if (burger.length) {
        burger.forEach((btn) => {

            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                header.classList.toggle('active');
                document.body.classList.toggle('no-scroll')

            })
        })
    }
}

burgerControl();

//menu control

let menuItem = [...document.querySelectorAll('.menu-item-has-children > a')];

function controlMenu() {
    if (menuItem.length) {
        menuItem.forEach((btn, k) => {
            btn.addEventListener('click', (e) => {
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (btn.closest('li').classList.contains('open')) {
                        btn.closest('li').classList.remove('open');
                        btn.closest('.menu').classList.remove('open');
                    } else {
                        btn.closest('li').classList.add('open');
                        if (btn.closest('.menu').classList.contains('open')) {

                        } else {
                            btn.closest('.menu').classList.add('open');
                        }
                    }


                }
            })
        })
    }
}

controlMenu();

//menu control


//footer menu control

let menuItemFooter = [...document.querySelectorAll('.footer-column > span')];

function controlMenuFooter() {
    if (menuItemFooter.length) {
        menuItemFooter.forEach((btn, k) => {
            btn.addEventListener('click', (e) => {
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (btn.classList.contains('open')) {
                        btn.classList.remove('open');
                    } else {
                        menuItemFooter.forEach((btn2) => {
                            btn2.classList.remove('open');
                        });
                        btn.classList.add('open');

                    }


                }
            })
        })
    }
}

controlMenuFooter();

//footer menu control

//btn text

let btnPlus = [...document.querySelectorAll('.btn-plus')];

function controlPlusText() {
    if (btnPlus.length) {
        btnPlus.forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.closest('.text-plus').classList.toggle('open');
            })
        })
    }
}

controlPlusText();

//btn text

//tabs


//tabs
$(".scroll-down").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    let item = this.closest('.hero').nextElementSibling;
    $([document.documentElement, document.body]).animate({
        scrollTop: $(item).offset().top
    }, 600);
});


//

//swipers

let cardsSection = [...document.querySelectorAll('.cards-slider')];

function startSitesSlider() {
    if (!cardsSection.length) {

    } else {

        cardsSection.forEach((sld) => {
            let sldCont = sld.querySelector('.swiper');
            let sldNext = sld.querySelector('.slider-btn--next');
            let sldPrev = sld.querySelector('.slider-btn--prev');
            let pagin = sld.querySelector('.dots');
            const swiper2 = new Swiper(sldCont, {
                // Optional parameters
                effect: 'cards',
                grabCursor: true,
                slidesPerView: 1,
                slidesPerGroup: 1,
                speed: 800,


                // cssMode: true,
                navigation: {
                    nextEl: sldNext,
                    prevEl: sldPrev,
                },
                autoplay: false,
                spaceBetween: 0,

                pagination: {
                    el: pagin,
                    type: 'bullets',
                    bulletActiveClass: 'active',
                    bulletClass: 'single-dot',
                    bulletElement: 'div',
                    clickable: true,
                    currentClass: 'current',
                    spaceBetween: 2,
                },


            });
        })


    }
}

startSitesSlider();


let directSection = [...document.querySelectorAll('.directors-slider')];

function startDirectSlider() {
    if (!directSection.length) {

    } else {

        directSection.forEach((sld) => {
            let sldCont = sld.querySelector('.swiper');
            let sldNext = sld.querySelector('.slider-btn--next');
            let sldPrev = sld.querySelector('.slider-btn--prev');
            let pagin = sld.querySelector('.dots');
            const swiper2 = new Swiper(sldCont, {
                // Optional parameters
                loop: false,
                grabCursor: true,
                slidesPerView: 1,
                slidesPerGroup: 1,
                speed: 300,

                crossFade: true,
                followFinger: true,
                allowTouchMove: true,
                threshold: true,
                touchMoveStopPropagation: true,
                touchStartPreventDefault: true,
                touchStartForcePreventDefault: true,
                touchReleaseOnEdges: true,

                resistance: true,
                resistanceRatio: 0.3,
                initialSlide: 1,


                // cssMode: true,
                navigation: {
                    nextEl: sldNext,
                    prevEl: sldPrev,
                },
                autoplay: false,
                spaceBetween: 20,

                pagination: {
                    el: pagin,
                    type: 'bullets',
                    bulletActiveClass: 'active',
                    bulletClass: 'single-dot',
                    bulletElement: 'div',
                    clickable: true,
                    currentClass: 'current',
                    spaceBetween: 2,
                },

                breakpoints: {
                    767: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                    }
                }


            });
        })


    }
}

startDirectSlider();


let waveSlider = [...document.querySelectorAll('.waves-slider-wrap')];

function startWaveSlider() {
    if (!waveSlider.length) {

    } else {

        let classWave = 'wave-dot';
        waveSlider.forEach((sld) => {

            let paginTexts = [...sld.querySelectorAll('.pagin-texts li')];

            let sldCont = sld.querySelector('.swiper');
            let sldNext = sld.querySelector('.slider-btn--next');
            let sldPrev = sld.querySelector('.slider-btn--prev');
            let pagin = sld.querySelector('.pagin-wave');
            const swiper2 = new Swiper(sldCont, {
                // Optional parameters
                loop: true,
                grabCursor: true,
                slidesPerView: 1,
                slidesPerGroup: 1,
                speed: 300,

                crossFade: true,
                followFinger: true,
                allowTouchMove: true,
                threshold: true,
                touchMoveStopPropagation: true,
                touchStartPreventDefault: true,
                touchStartForcePreventDefault: true,
                touchReleaseOnEdges: true,

                resistance: true,
                resistanceRatio: 0.3,
                initialSlide: 1,


                // cssMode: true,
                navigation: {
                    nextEl: sldNext,
                    prevEl: sldPrev,
                },
                autoplay: false,
                spaceBetween: 20,

                pagination: {
                    el: pagin,
                    clickable: true,
                    className: 'wave-dot',
                    renderBullet: function (index, className) {
                        return '<span class="' + classWave + '">' + paginTexts[index].innerHTML + "</span>";
                    },
                },

                breakpoints: {
                    767: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                }


            });
        })


    }
}

startWaveSlider();


//cards home mobile

let cardsSectionMob = [...document.querySelectorAll('.cards-home-slider')];

function startSitesSliderMob() {
    if (!cardsSectionMob.length) {

    } else {

        cardsSectionMob.forEach((sld) => {
            let sldCont = sld.querySelector('.swiper');
            let sldNext = sld.querySelector('.slider-btn--next');
            let sldPrev = sld.querySelector('.slider-btn--prev');
            let pagin = sld.querySelector('.dots');
            const swiper2 = new Swiper(sldCont, {
                // Optional parameters

                grabCursor: true,
                slidesPerView: 1,
                slidesPerGroup: 1,
                speed: 800,


                // cssMode: true,
                navigation: {
                    nextEl: sldNext,
                    prevEl: sldPrev,
                },
                autoplay: false,
                spaceBetween: 30,

                pagination: {
                    el: pagin,
                    type: 'bullets',
                    bulletActiveClass: 'active',
                    bulletClass: 'single-dot',
                    bulletElement: 'div',
                    clickable: true,
                    currentClass: 'current',
                    spaceBetween: 2,
                },


            });
        })


    }
}

startSitesSliderMob();


//cards home mobile

//news slider

let newsSection = [...document.querySelectorAll('.news-cont')];

function startNewsSlider() {
    if (!newsSection.length) {

    } else {
        if (window.innerWidth < 768) {
            newsSection.forEach((sld) => {
                let sldCont = sld.querySelector('.swiper');
                let sldNext = sld.querySelector('.slider-btn--next');
                let sldPrev = sld.querySelector('.slider-btn--prev');
                let pagin = sld.querySelector('.dots');
                const swiper2 = new Swiper(sldCont, {
                    // Optional parameters
                    grabCursor: true,
                    slidesPerView: 1,
                    grid: {
                        rows: 3,
                    },
                    speed: 800,


                    // cssMode: true,
                    navigation: false,
                    autoplay: false,
                    spaceBetween: 14,

                    pagination: {
                        el: pagin,
                        type: 'bullets',
                        bulletActiveClass: 'active',
                        bulletClass: 'single-dot',
                        bulletElement: 'div',
                        clickable: true,
                        currentClass: 'current',
                        spaceBetween: 2,
                    },


                });
            })
        }


    }
}

startNewsSlider();

//news slider


//swipers


$(window).scroll(function (e) {
    $el = $('.header');
    $el.toggleClass('header-fixed', $(this).scrollTop() > 32);

});


//modal windows

//modal window

let btnMod = [...document.querySelectorAll('.btn-mod')];
let modals = [...document.querySelectorAll('.modal-window')];
let closeModal = [...document.querySelectorAll('.modal-close')];
let clsSecModal = [...document.querySelectorAll('.modal-window .cls')];
let backplates = [...document.querySelectorAll('.backplate')];

function controlModal() {
    if (btnMod.length) {
        btnMod.forEach((btn) => {
            let data = btn.dataset.mod;

            btn.addEventListener('click', (e) => {

                e.preventDefault();
                e.stopPropagation();


                if (document.querySelector('.modal-window.visible')) {
                    document.querySelector('.modal-window.visible').classList.remove('visible');
                }
                modals.forEach((mod) => {
                    if (mod.dataset.modal === data) {
                        document.body.classList.add('no-scroll');

                        mod.classList.add('visible');

                    }
                })
            })
        });

        backplates.forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.closest('.modal-window').classList.remove('visible');
                document.body.classList.remove('no-scroll');

            })
        });

        clsSecModal.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                btn.closest('.modal-window').classList.remove('visible');
                document.body.classList.remove('no-scroll');

            })
        });

    }
}

controlModal();


//modal


//telephones
let zero = '0';
let tls = [...document.querySelectorAll(".input-tel input")];

// console.log(countryNumber);
var maskOptions = {
    mask: `{+38}(000)000-00-00`,
};


tls.forEach((tl) => {
    var mask = IMask(tl, maskOptions);
});

//faq
//faqs

let faqBtn = [...document.querySelectorAll('.faq-head')];

function changefaq() {
    if (!faqBtn.length) {

    } else {
        faqBtn.forEach((btn, k) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active');
                } else {
                    faqBtn.forEach((btn2) => {
                        btn2.classList.remove('active');
                    });
                    btn.classList.add('active');

                }
            })
        })
    }
}

changefaq();


//faq


//tabs

let tabBtn = [...document.querySelectorAll('.tab-btn')];

function changeTab() {
    if (!tabBtn.length) {

    } else {
        tabBtn.forEach((btn, k) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (btn.classList.contains('active')) {

                } else {
                    tabBtn.forEach((btn2) => {
                        btn2.classList.remove('active');
                    });
                    btn.classList.add('active');
                    [...btn.closest('.tabs-owner').querySelectorAll('.item-tab')].forEach((tab, m) => {
                        if (m === k) {
                            tab.classList.add('active');
                            if (window.innerWidth < 768) {
                                setTimeout(() => {
                                    $([document.documentElement, document.body]).animate({
                                        scrollTop: $(btn).offset().top
                                    }, 400);
                                }, 310);
                            }
                        } else {
                            tab.classList.remove('active');

                        }
                    })
                }
            })
        })
    }
}

changeTab();


//tabs

