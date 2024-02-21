document.addEventListener('DOMContentLoaded', () => {

    const lightboxContainer = document.querySelector(".lightbox-container");
    const lightboxImgContainer = document.querySelector('.lightbox-img-container');
    const closeBtn = document.querySelector(".close-btn");
    const backgroundModal = document.querySelector('.background-modal');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const bookingModal = document.querySelector('.booking__modal');
    const closeBookingModalBtns = document.querySelectorAll('.booking__close-btn');
    const dateLabels = document.querySelectorAll('.date-label');
    const bookingForm = document.querySelector('.booking-form');
    const personalForm = document.querySelector('.personal-form');
    const bookingConfirmDialog = document.querySelector('.booking-confirm');
    const navbarMenuBtn = document.querySelector('.navbar__menu-btn');
    const navbarLinksFirst = document.querySelector('.navbar__links-first');
    const navbarLinksSecond = document.querySelector('.navbar__links-second');
    const subscribeForm = document.querySelector('.subscribe-form');
    const subscribeMessage = document.querySelector('.subscribe-mesage');
    const previewPrevBtn = document.querySelector('.images-row__arrow-left');
    const previewNextBtn = document.querySelector('.images-row__arrow-right');
    const contactForm = document.querySelector('.contact-form');

    let currentImageIndex;
    let bookingData = {};
    let personlaData = {};



    const addImage = (container, src, alt) => {
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', src);
        imgElement.setAttribute('alt', alt);
        imgElement.setAttribute('loading', 'eager');

        container.append(imgElement);
    }


    const showBookingModal = (e) => {
        e.preventDefault();

        const formData = new FormData(bookingForm);
        bookingData = Object.fromEntries(formData);

        bookingModal.showModal();

        document.body.style.overflow = 'hidden';
    }

    const confirmBooking = (e) => {
        e.preventDefault();

        const formData = new FormData(personalForm);
        personlaData = Object.fromEntries(formData);

        const data = { ...bookingData, ...personlaData }

        postData(data, 'booking');

        personalForm.style.display = 'none';
        bookingConfirmDialog.style.display = 'flex';

        bookingForm.reset();
        personalForm.reset();

        bookingData = {};
        personlaData = {};

    }



    const closeBookingModal = () => {
        personalForm.removeAttribute('style');
        bookingConfirmDialog.removeAttribute('style');
        bookingModal.close();
        document.body.removeAttribute('style');
    }


    const postData = async (data = {}, type) => {
        const url = '../server.php';

        try {
            const bodyData = { ...data, type };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    postData({}, 'getImages')
        .then(data => {
            const imgContainer = document.querySelector('.image-preview');
            if (imgContainer) {
                addImage(imgContainer, data[0], 'hotel service image');
                for (let i = 1; i < data.length; i++) {
                    const container = document.querySelector('.images-row__inner');
                    const src = data[i];
                    const alt = 'hotel service image';
                    addImage(container, src, alt);
                }
                const images = document.querySelectorAll('#services img');
                images.forEach((img, index) => {
                    img.addEventListener('click', (e) => {
                        setCurrentImage(index);
                    })
                })
            }
        })
        .catch(e => console.log('Error', e))


    const setCurrentImage = (index) => {
        const images = [];
        images.push(document.querySelector('.image-preview img'));
        images.push(...document.querySelectorAll('.images-row img'));

        const min = 0;
        const max = images.length - 1;

        if (index < min) {
            index = max;
        } else if (index > max) {
            index = min;
        }

        const newImage = images[index].cloneNode(true);

        lightboxImgContainer.innerHTML = '';
        lightboxImgContainer.appendChild(newImage);

        currentImageIndex = index;

        lightboxContainer.style.display = 'flex';

        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            newImage.style.opacity = 1;
        }, 10);
    };

    const closeLightBox = () => {
        lightboxContainer.style.display = "none";
        document.body.removeAttribute('style');
        if (lightboxImgContainer.lastChild !== null) {
            lightboxImgContainer.removeChild(lightboxImgContainer.lastChild);
        }
    }

    prevBtn?.addEventListener('click', () => {
        setCurrentImage(++currentImageIndex);
    })

    nextBtn?.addEventListener('click', () => {
        setCurrentImage(--currentImageIndex);
    })

    closeBtn?.addEventListener('click', closeLightBox)

    backgroundModal?.addEventListener('click', closeLightBox)


    bookingForm?.addEventListener('submit', showBookingModal);

    personalForm?.addEventListener('submit', confirmBooking);


    closeBookingModalBtns?.forEach(btn => {
        btn.addEventListener('click', closeBookingModal);
    })


    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            document.body.removeAttribute('style');
            closeLightBox();
        }
    })

    dateLabels.forEach(el => {
        const children = Array.from(el.children);
        const input = el.querySelector('input');

        children.forEach(child => {
            child.addEventListener('click', () => {
                input.showPicker();
            })
        });
    })


    navbarMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        navbarLinksFirst.classList.toggle('show');
        navbarLinksSecond.classList.toggle('show');

        const closeMenu = (event) => {
            if (!(event.target === navbarLinksFirst || event.target === navbarLinksSecond)) {
                navbarLinksFirst.classList.remove('show');
                navbarLinksSecond.classList.remove('show');
                document.removeEventListener('click', closeMenu);
            }
        };
        document.addEventListener('click', closeMenu);
    });


    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(subscribeForm);
        const data = Object.fromEntries(formData);

        postData(data, 'subscription').then(response => {
            if (response?.message) {
                subscribeMessage.innerHTML = response.message;
            } else {
                subscribeMessage.innerHTML = 'Error';
            }
            subscribeMessage.classList.add('show-message');
        })

    })

    let currentImgRowTranslate = 0;

    const nextPreviewImage = () => {
        const imagesRowInner = document.querySelector('.images-row__inner');
        const containerWidth = document.querySelector('.images-row__container').offsetWidth;
        const imageWidth = imagesRowInner.firstElementChild.offsetWidth;

        const imgs = imagesRowInner.querySelectorAll('img');
        const totalWidth = Array.from(imgs).reduce((acc, img) => acc + img.offsetWidth + 10, 0);

        if (totalWidth > containerWidth && currentImgRowTranslate < totalWidth - containerWidth) {
            currentImgRowTranslate += containerWidth - imageWidth - 10;
            imagesRowInner.style.transform = `translateX(-${currentImgRowTranslate}px)`;
        }
    };

    const prevPreviewImage = () => {
        const imagesRowInner = document.querySelector('.images-row__inner');
        const containerWidth = document.querySelector('.images-row__container').offsetWidth;

        const imageWidth = imagesRowInner.firstElementChild.offsetWidth;

        if (currentImgRowTranslate > 0) {
            currentImgRowTranslate -= containerWidth - imageWidth - 10;
            imagesRowInner.style.transform = `translateX(-${currentImgRowTranslate}px)`;
        }
    };


    previewNextBtn?.addEventListener('click', () => {
        nextPreviewImage();
    })

    previewPrevBtn?.addEventListener('click', () => {
        prevPreviewImage();
    })

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();


        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        const feedbackMessage = document.querySelector('.feedback-message');

        postData(data, 'postFeedback').then(response => {
            if (response?.message) {
                feedbackMessage.innerHTML = response.message;
            } else {
                feedbackMessage.innerHTML = 'Error';
            }

            contactForm.reset();

            feedbackMessage.classList.add('show-message');
        })
    })


})