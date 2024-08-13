function initGallery(galleryId) {
    let currentIndex = 0;
    const galleryElement = document.getElementById(galleryId);
    const thumbnails = galleryElement.querySelectorAll('.gallery-images a');
    const thumbnailImages = galleryElement.querySelectorAll('.thumbnail-image');
    const dotsContainer = galleryElement.querySelector('.dots-container');

    function updateThumbnail() {
        thumbnails.forEach((item, index) => {
            if (index === currentIndex) {
                item.querySelector('img').classList.add('active');
                item.querySelector('img').style.display = 'block';
            } else {
                item.querySelector('img').classList.remove('active');
                item.querySelector('img').style.display = 'none';
            }
        });

        updateDots();
    }

    function prevThumbnail() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : thumbnails.length - 1;
        updateThumbnail();
    }

    function nextThumbnail() {
        currentIndex = (currentIndex < thumbnails.length - 1) ? currentIndex + 1 : 0;
        updateThumbnail();
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function createDots() {
        thumbnails.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateThumbnail();
            });
            dotsContainer.appendChild(dot);
        });
        updateDots();
    }

    createDots();
    updateThumbnail();

    // Return functions to be accessible globally
    return {
        prevThumbnail: prevThumbnail,
        nextThumbnail: nextThumbnail
    };
}

// Initialize each gallery independently
const gallery1 = initGallery('gallery-1');
const gallery2 = initGallery('gallery-2');
const gallery3 = initGallery('gallery-3');
const gallery4 = initGallery('gallery-4');
const gallery5 = initGallery('gallery-5');

// Assign the functions to global scope so buttons can call them
window.prevThumbnail = function(galleryId) {
    if (galleryId === 'gallery-1') gallery1.prevThumbnail();
    if (galleryId === 'gallery-2') gallery2.prevThumbnail();
    if (galleryId === 'gallery-3') gallery3.prevThumbnail();
    if (galleryId === 'gallery-4') gallery4.prevThumbnail();
    if (galleryId === 'gallery-5') gallery5.prevThumbnail();
};

window.nextThumbnail = function(galleryId) {
    if (galleryId === 'gallery-1') gallery1.nextThumbnail();
    if (galleryId === 'gallery-2') gallery2.nextThumbnail();
    if (galleryId === 'gallery-3') gallery3.nextThumbnail();
    if (galleryId === 'gallery-4') gallery4.nextThumbnail();
    if (galleryId === 'gallery-5') gallery5.nextThumbnail();
};

// Fancybox configuration (can be shared for all galleries)
$("[data-fancybox]").fancybox({
    buttons: [
        "slideShow",
        "thumbs",
        "zoom",
        "fullScreen",
        "share",
        "close"
    ],
    loop: true,
    arrows: true,
    infobar: true,
    protect: true,
    transitionEffect: "fade"
});
