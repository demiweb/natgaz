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


//counter


//map control
let imgMap = document.querySelector('.big-map-wrap .img img');


function ifHaveMapMap() {
    if (imgMap) {
        if (window.innerWidth > 767) {

            // 294px, -698px
            let position = {x: 294, y: -698};
            interact(imgMap)
                .draggable({
                    listeners: {
                        start(event) {
                            // console.log(event.type, event.target)
                            event.target.style.transform =
                                `translate(${position.x}px, ${position.y}px)`
                        },
                        move(event) {
                            position.x += event.dx
                            position.y += event.dy

                            event.target.style.transform =
                                `translate(${position.x}px, ${position.y}px)`
                        },
                    },
                    restrict: {
                        restriction: "parent",
                        endOnly: true,
                        elementRect: {top: 0, left: 0, bottom: 1, right: 1}
                    },
                });


            // let imgCntnrs = document.querySelector('.big-map-wrap .img');
            // let dragImgMouseStart = {};
            // let lastDiff = {x: 0, y: 0};
            // let initialPos = imgMap.getBoundingClientRect();
            // let currentPos = {x: 0, y: 0};
            // let counterWidth = imgCntnrs.offsetWidth;
            // let imgWidth = imgMap.offsetWidth;
            //
            //
            // let counterHeight = imgCntnrs.offsetHeight;
            // let imgHeight = imgMap.offsetHeight;
            //
            // let differ = imgWidth - counterWidth;
            // let differ2 = imgHeight - counterHeight;
            //
            // // console.log(counterWidth + ' contur');
            // // console.log(differ2 + ' differ2');
            //
            // function mousedownDragImg(e) {
            //     e.preventDefault();
            //     dragImgMouseStart.x = e.clientX;
            //     dragImgMouseStart.y = e.clientY;
            //     currentPos.x += lastDiff.x;
            //     currentPos.y += lastDiff.y;
            //     lastDiff = {x: 0, y: 0};
            //     window.addEventListener('mousemove', mousemoveDragImg);
            //     window.addEventListener('mouseup', mouseupDragImg);
            //
            //     window.addEventListener('touchmove', mousemoveDragImg, {passive: false});
            //     window.addEventListener('touchend', mouseupDragImg);
            // }
            //
            //
            // function mousemoveDragImg(e) {
            //     e.preventDefault();
            //
            //     lastDiff.x = e.clientX - dragImgMouseStart.x;
            //     lastDiff.y = e.clientY - dragImgMouseStart.y;
            //
            //     if (currentPos.x > differ) {
            //         currentPos.x = differ;
            //     } else {
            //         if (currentPos.x < 0) {
            //             currentPos.x = 0;
            //         }
            //     }
            //
            //     if (currentPos.y > 0) {
            //         currentPos.y = 0;
            //     } else {
            //         if (currentPos.y < -differ2) {
            //             currentPos.y = -differ2;
            //         }
            //     }
            //
            //
            //     requestAnimationFrame(function () {
            //
            //         let posiX = 0;
            //         let posiY = 0;
            //         // console.log(dragImgMouseStart.y + ' mause-start');
            //         // console.log(currentPos.y + ' mause-pos');
            //         // console.log(lastDiff.y + ' hm?0');
            //
            //         if (currentPos.x + lastDiff.x > differ) {
            //             posiX = differ;
            //         } else {
            //             if (currentPos.x + lastDiff.x < 0) {
            //                 posiX = 0;
            //             } else {
            //                 posiX = currentPos.x + lastDiff.x;
            //             }
            //         }
            //         if (currentPos.y + lastDiff.y < -differ2) {
            //             posiY = -differ2;
            //         } else {
            //             if (currentPos.y + lastDiff.y > 0) {
            //                 posiY = 0;
            //             } else {
            //                 posiY = currentPos.y + lastDiff.y;
            //             }
            //         }
            //
            //         imgMap.style.transform = "translate(" + (posiX) + "px," + (posiY) + "px)";
            //
            //
            //     });
            // }
            //
            // function mouseupDragImg(e) {
            //     e.preventDefault();
            //     window.removeEventListener('mousemove', mousemoveDragImg);
            //     window.removeEventListener('mouseup', mouseupDragImg);
            //
            //     window.removeEventListener('touchmove', mousemoveDragImg);
            //     window.removeEventListener('touchend', mouseupDragImg);
            // }
            //
            // imgMap.addEventListener('mousedown', mousedownDragImg);
            //
            // imgMap.addEventListener('touchstart', mousedownDragImg);
        } else {
            let position = {x: -620, y: -406};
            interact(imgMap)
                .draggable({
                    listeners: {
                        start(event) {
                            // console.log(event.type, event.target)
                            event.target.style.transform =
                                `translate(${position.x}px, ${position.y}px)`
                        },
                        move(event) {
                            position.x += event.dx
                            position.y += event.dy

                            event.target.style.transform =
                                `translate(${position.x}px, ${position.y}px)`
                        },
                    },
                    restrict: {
                        restriction: "parent",
                        endOnly: true,
                        elementRect: {top: 0, left: 0, bottom: 1, right: 1}
                    },
                });
        }
        // -620px, -406.25px
    }
}

ifHaveMapMap();


//map control

//control table data

let dataTable = document.querySelector('.speed-table-table');

function controlDataTable() {
    if (dataTable) {
        let tableActive = dataTable.dataset.active;
        let tableSelected = dataTable.dataset.selected;
        let months = [...dataTable.querySelectorAll('.table-speed-month ul li')];
        let infoList = dataTable.querySelector('.table-info__data ul');
        let infoEmpty = dataTable.querySelector('.table-speed-empty');
        let infoInfo = dataTable.querySelector('.table-speed-info');
        let selectSpan = dataTable.querySelector('.table-select > span');
        let selectUlLi = [...dataTable.querySelectorAll('.table-select ul li')];
        let pMobile = [...dataTable.querySelectorAll('.table-speed-control > div > p')];

        let mobYear = dataTable.querySelector('.display-year-month .year span');
        let mobMonth = dataTable.querySelector('.display-year-month .month span');


        let activeMassive = [];

        mobMonth.innerHTML = tableSelected;
        mobYear.innerHTML = tableActive;

        //set active month
        function addActiveInfo() {
            months.forEach((mon) => {

                if (Number(mon.innerHTML) === Number(tableSelected)) {
                    mon.classList.add('selected');
                } else {
                    mon.classList.remove('selected');
                }
            });
            yearMonthMassive.forEach((mas) => {
                // console.log(toString(tableActive));
                if (mas[tableActive]) {
                    activeMassive = mas[tableActive][tableSelected - 1];
                    infoList.innerHTML = '';
                    console.log();
                    if (activeMassive[tableSelected] === 'empty') {
                        infoEmpty.classList.add('show');
                        infoInfo.classList.add('hide');
                    } else {
                        infoEmpty.classList.remove('show');
                        infoInfo.classList.remove('hide');
                        activeMassive[tableSelected].forEach((info) => {
                            let txt = Object.values(info);
                            let li = document.createElement('li');
                            li.innerHTML = txt[0];
                            infoList.appendChild(li);
                        })
                    }


                }
            });
            mobMonth.innerHTML = tableSelected;
            mobYear.innerHTML = tableActive;
        }

        addActiveInfo();

        // change active
        months.forEach((btn) => {
            btn.addEventListener('click', () => {
                months.forEach((btn2) => {
                    btn2.classList.remove('selected');
                });
                btn.classList.add('selected');
                dataTable.dataset.selected = Number(btn.innerHTML);
                tableSelected = Number(btn.innerHTML);


                btn.closest('.for-mob').classList.remove('open');


                addActiveInfo();
            })
        });

        selectSpan.addEventListener('click', () => {
            selectSpan.classList.toggle('open');
        });

        selectUlLi.forEach((li) => {
            li.addEventListener('click', () => {
                selectUlLi.forEach((li2) => {
                    li2.classList.remove('selected');
                });
                li.classList.add('selected');
                selectSpan.classList.remove('open');

                dataTable.dataset.active = Number(li.innerHTML);
                dataTable.dataset.selected = 1;

                tableActive = dataTable.dataset.active;
                tableSelected = dataTable.dataset.selected;
                selectSpan.innerHTML = li.innerHTML;

                li.closest('.for-mob').classList.remove('open');
                addActiveInfo();
            })
        });

        pMobile.forEach((p) => {
            p.addEventListener('click', () => {
                p.closest('div').classList.toggle('open');
            })
        })
    }
}

controlDataTable();
//control table data


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

// btn expand

let btnExpand = [...document.querySelectorAll('.btn-expand')];

function controlExpandText() {
    if (btnExpand.length) {
        btnExpand.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                btnExpand.forEach((btn2) => {
                    if (btn2 !== btn) {
                        btn2.closest('.text-expand').classList.remove('open');
                    }

                });
                btn.closest('.text-expand').classList.toggle('open');
            });
        });
    }
}

controlExpandText();

//btn expand


// btn expand

let btnShare = [...document.querySelectorAll('.btn-share')];

function controlShareText() {
    if (btnShare.length) {
        btnShare.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                btn.classList.toggle('open');
            });
        });
    }
}

controlShareText();

//btn expand

//control select

let selectOwner = [...document.querySelectorAll('.select-owner')];

function controlSelect() {
    if (selectOwner.length) {
        selectOwner.forEach((sel) => {
            let wavesSelect = [...sel.querySelectorAll('.single-waves-select')];

            let selects = [...sel.querySelectorAll('.select-control ul li')];

            let opener = sel.querySelector('.select-control > span');

            opener.addEventListener('click', () => {
                opener.closest('.select-control').classList.toggle('open');
            });

            selects.forEach((li, k) => {
                li.addEventListener('click', () => {
                    selects.forEach((btn2) => {
                        btn2.classList.remove('selected');
                    });
                    wavesSelect.forEach((btn3) => {
                        btn3.classList.remove('active');
                    });
                    li.classList.add('selected');
                    li.closest('.select-control').classList.remove('open');
                    wavesSelect[k].classList.add('active');

                })
            });

        })
    }
}

controlSelect();

//control select

//tabs


//tabs
$(".scroll-down").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    let item = this.closest('.btn-trigger').nextElementSibling;
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
                perSlideRotate: 0,
                grabCursor: true,
                slidesPerView: 1,
                slidesPerGroup: 1,
                speed: 800,
                cardsEffect: {
                    slideShadows: false,
                    rotate: false,
                    perSlideRotate: 0,
                    perSlideOffset: 9,
                },

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
                initialSlide: 2,


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


let downloadSection = [...document.querySelectorAll('.download-esg')];

function startDownloadSlider() {
    if (!downloadSection.length) {

    } else {

        downloadSection.forEach((sld) => {
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
                grid: {
                    rows: 2,
                },

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


                // cssMode: true,
                navigation: {
                    nextEl: sldNext,
                    prevEl: sldPrev,
                },
                autoplay: false,
                spaceBetween: 8,

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
                        grid: false,
                        slidesPerView: 4,
                        spaceBetween: 16,
                    }
                }


            });
        })


    }
}

startDownloadSlider();


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


                // cssMode: true,
                navigation: {
                    nextEl: sldNext,
                    prevEl: sldPrev,
                },
                autoplay: false,
                spaceBetween: 20,

                pagination: {
                    el: pagin,

                    className: 'wave-dot',
                    type: 'bullets',
                    bulletActiveClass: 'active',
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + paginTexts[index].innerHTML + "</span>";
                    },
                    clickable: true,
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

            swiper2.on('slideChange', () => {
                $('.text-expand').removeClass('open');
            })
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
                if (sld.closest('.news-block-mobile-other')) {
                    const swiper2 = new Swiper(sldCont, {
                        // Optional parameters
                        grabCursor: true,
                        slidesPerView: 1,

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
                } else {
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
                }
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
let textMod = [...document.querySelectorAll('.text-mod')];
let modJobs = [...document.querySelectorAll('.mod-jobs')];
let modals = [...document.querySelectorAll('.modal-window')];
let closeModal = [...document.querySelectorAll('.modal-close')];
let clsSecModal = [...document.querySelectorAll('.modal-window .cls')];
let backplates = [...document.querySelectorAll('.backplate')];

function controlModal() {
    if (btnMod.length || textMod.length || modJobs.length) {
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

        textMod.forEach((btn) => {
            let data = btn.dataset.mod;

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                let titleBtn = btn.closest('.plus-over').querySelector('.text-plus .sub-title');
                let textBtn = btn.closest('.plus-over').querySelector('.text-plus .text');


                if (document.querySelector('.modal-window.visible')) {
                    document.querySelector('.modal-window.visible').classList.remove('visible');
                }
                modals.forEach((mod) => {
                    if (mod.dataset.modal === data) {
                        document.body.classList.add('no-scroll');

                        mod.classList.add('visible');
                        // console.log(data);
                        if (data === 'img') {
                            // console.log('gagaga');
                            let imgBtn = btn.closest('.plus-over').querySelector('.table-img img.mob');
                            let modImg = mod.querySelector('.modal-image img');
                            modImg.src = imgBtn.src;
                        } else {
                            let modTitle = mod.querySelector('.modal-text-title .sub-title');
                            let modText = mod.querySelector('.modal-text');

                            modTitle.innerHTML = titleBtn.innerHTML;
                            modText.innerHTML = textBtn.innerHTML;
                        }


                    }
                })
            })
        });
        modJobs.forEach((btn) => {
            let data = btn.dataset.mod;

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                let rightText = btn.closest('.job-mod-owner').querySelector('.text');
                let leftText = btn.closest('.job-mod-owner').querySelector('.hidden-wrap');
                let hiddenId = btn.closest('.job-mod-owner').dataset.id;


                if (document.querySelector('.modal-window.visible')) {
                    document.querySelector('.modal-window.visible').classList.remove('visible');
                }
                modals.forEach((mod) => {
                    if (mod.dataset.modal === data) {
                        document.body.classList.add('no-scroll');

                        mod.classList.add('visible');
                        // console.log(data);
                        [...document.querySelectorAll('.form')].forEach((frm) => {
                            frm.classList.remove('done')
                        });
                        let modRight = mod.querySelector('.job-content-right');
                        let modLeft = mod.querySelector('.job-content-columns');
                        let hiddenIdInput = mod.querySelector('.id-input input');

                        if (data === 'auction') {

                            let modLoad = btn.closest('.job-mod-owner').querySelector('.hidden-load');
                            let modLoadInner = mod.querySelector('.auction-modal-bot');
                            modLoadInner.innerHTML = modLoad.innerHTML;
                        }

                        modRight.innerHTML = rightText.innerHTML;
                        modLeft.innerHTML = leftText.innerHTML;
                        hiddenIdInput.value = Number(hiddenId);


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


$('.filter-select select').niceSelect();

let sortUlLi = [...document.querySelectorAll('.filter-select ul li')];

function sortSelectClick() {
    if (!sortUlLi.length) {

    } else {
        sortUlLi.forEach((btn) => {
            btn.addEventListener('click', () => {
                let optValue = btn.dataset.value;
                let event2 = new Event('change');
                let event3 = new Event('click');
                let event4 = new Event('change');
                let suggestOpt = document.querySelector(`option[value='${optValue}']`);
                // btn.closest('.sort-selector').querySelector('select option[selected]').removeAttribute('selected');

                suggestOpt.selected = 'selected';
                suggestOpt.setAttribute('selected', 'selected');
                suggestOpt.click();
                console.log(btn.closest('.filter-select').querySelector('select'));
                console.log(suggestOpt);
                // $('select.sort-select').niceSelect();
            })
        })
    }
}

sortSelectClick();


//tabs

let tabBtn = [...document.querySelectorAll('.tab-btn')];
let selectTab = [...document.querySelectorAll('.select-tab .list li')];

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
                                    // $([document.documentElement, document.body]).animate({
                                    //     scrollTop: $(btn).offset().top
                                    // }, 400);
                                }, 310);
                            }
                        } else {
                            tab.classList.remove('active');

                        }
                    });

                    if (selectTab.length) {
                        selectTab[k].click();
                    }
                }
            })
        });

        if (selectTab.length) {
            selectTab.forEach((btn, k) => {
                btn.addEventListener('click', (e) => {

                    tabBtn[k].click();
                })
            });
        }
    }
}

changeTab();


//tabs

//submit form

let formBtn = [...document.querySelectorAll('.form .btn')];

function controlFormThanks() {
    if (formBtn.length) {
        formBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.closest('.form').classList.add('done');
            })
        })
    }
}

controlFormThanks();



