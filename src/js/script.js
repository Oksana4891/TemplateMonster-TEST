
window.onload = function () {

    // Slider

    function slider(sliderItemSelector, sliderSwitchSelector) {
        const slides = document.querySelectorAll(sliderItemSelector),
            sliderDotsIndicator = document.querySelector(sliderSwitchSelector);
        for (let i = 0; i <= slider.length; ++i) {

            let div = document.createElement('div');
            div.className = 'dot';
            sliderDotsIndicator.appendChild(div);
        }



        const dots = document.querySelectorAll('.dot');
        let slideIndex = 0;

        showDots(slideIndex);
        showSlides(slideIndex);


        function showSlides(index) {
            if (index < 0) {
                slideIndex = slides.length - 1;
            }
            if (index > slides.length - 1) {
                slideIndex = 0;
            }
            slides.forEach(item => {
                item.classList.remove("is-active");
            });
            slides[slideIndex].classList.add("is-active");
            showDots(slideIndex);
        }

        function showDots(index) {
            dots.forEach((dot) => dot.classList.remove("dot-active"));
            dots[slideIndex].classList.add("dot-active");
        }

        sliderDotsIndicator.addEventListener("click", handelChangeSlider);

        function handelChangeSlider(event) {
            event.preventDefault();
            if (event.currentTarget === event.target) {
                return;
            }
            if (event.target.classList.contains("dot-active")) {
                return;
            } else {
                dots.forEach((elem, i) => {
                    if (elem === event.target) {
                        slideIndex = i;
                        showSlides(slideIndex);
                    }
                });
            }
        }
    }

    function accordion(triggersSelector, selectorBlock) {
        const btns = document.querySelectorAll(triggersSelector);
        const block = document.querySelectorAll(selectorBlock);


        btns.forEach((btn, i) => {
            btn.addEventListener('click', function () {
                btns.forEach((item, i)=> {
                    if(item.classList.contains('open') && item!=btn){

                        item.classList.remove('open');
                        block[i].classList.remove('active');
                    }
                });

                btn.classList.toggle('open');
                block[i].classList.toggle('active');
            }
            );
        });
    }



    function modalVideoPlayer(triggersSelector, modalSelector, closeSelector) {
        const modalOpen = document.querySelector(triggersSelector),
            video = document.querySelector('#video'),
            modal = document.querySelector(modalSelector),
            modalClose = document.querySelector(closeSelector);

        modalOpen.onclick = function (e) {
            e.preventDefault();
            modal.classList.add('modal-visible');
            video.play();
        };
        modalClose.onclick = function () {
            handleCloseModal();
            window.addEventListener("keydown", handleCloseModalEsc);
        };

        function handleCloseModal() {
            modal.classList.remove('modal-visible');
            video.pause();
        }
    }

    // Slick slider

    $('.slider').slick({
        centerMode: true,
        slidesToShow: 3,
        autoplay: true,
        prevArrow: false,
        nextArrow: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });

    //   Parallaxs

    function parallaxes(selectorParallaxes, selectorContainer) {

        const parallaxesElement = document.querySelector(selectorParallaxes);
        const boxContainer = document.querySelector(selectorContainer);



        const centerX = parallaxesElement.offsetLeft + (parallaxesElement.offsetWidth / 2);
        const centerY = parallaxesElement.offsetTop + (parallaxesElement.offsetHeight / 2);


        function getMousePos(xRef, yRef) {
            let panelRect = boxContainer.getBoundingClientRect();
            return {
                x: Math.floor(xRef - panelRect.left) / (panelRect.right - panelRect.left) * boxContainer.offsetWidth,
                y: Math.floor(yRef - panelRect.top) / (panelRect.bottom - panelRect.top) * boxContainer.offsetHeight
            };
        }

        document.body.addEventListener("mousemove", function (e) {
            let mousePos = getMousePos(e.clientX, e.clientY),
                distX = mousePos.x - centerX,
                distY = mousePos.y - centerY;
            if (Math.abs(distX) < 500 && distY < 200) {
                parallaxesElement.style.transform = "translate(" + (-1 * distX) / 12 + "px," + (1 * distY) / 30 + "px)";
            }
        });
    }


    //   Burger menu screen <= 768

    const burger = document.querySelector('#burger');
    const burgerMenu = document.querySelector('.header_menu');

    burger.onclick = function () {
        burger.classList.toggle('burger_active');
        burgerMenu.classList.toggle('is-active');
    };
    // Add and remove upPage button

    function scrolling(upSelector) {


        const upElem = document.querySelector(upSelector);


        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
                upElem.classList.add("is-active")
            }

            else {
                upElem.classList.remove("is-active")
            }
        });
    }





    slider('.js-testimonials_slider--item', '.dots');
    accordion('.js-accordion-switch', '.js-accordion-block');
    modalVideoPlayer(".js-openModal-btn", ".js-modal-video", ".modal-close");
    parallaxes('.js-parallaxes', ".js-parallaxes-container");
    scrolling('.js-upPage');
};