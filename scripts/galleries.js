// Function to initialize a gallery
function initGallery(galleryId) {
    const galleryElement = document.getElementById(galleryId);
    if (!galleryElement) {
        console.warn(`Gallery with ID ${galleryId} not found.`);
        return null;
    }

    const images = galleryElement.querySelectorAll('.gallery-images a');
    const dotsContainer = galleryElement.querySelector('.dots-container');

    let currentIndex = 0;

    // Create dots based on the number of images
    dotsContainer.innerHTML = ''; // Clear any existing dots
    images.forEach((image, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.onclick = function () {
            showImage(index, galleryId);
        };
        dotsContainer.appendChild(dot);
    });

    // Show the first image initially
    showImage(currentIndex, galleryId);

    return {
        prevThumbnail: function () {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex, galleryId);
        },
        nextThumbnail: function () {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex, galleryId);
        }
    };
}

// Function to show a specific image and update dots
function showImage(index, galleryId) {
    const galleryElement = document.getElementById(galleryId);
    if (!galleryElement) {
        console.warn(`Gallery with ID ${galleryId} not found.`);
        return;
    }

    const images = galleryElement.querySelectorAll('.gallery-images a');
    const dots = galleryElement.querySelectorAll('.dots-container .dot');

    images.forEach((image, i) => {
        image.style.display = i === index ? 'block' : 'none';
        dots[i].classList.toggle('active', i === index);
    });
}

// Initialize each gallery independently
const gallery1 = initGallery('gallery-1');
const gallery2 = initGallery('gallery-2');
const gallery3 = initGallery('gallery-3');
const gallery4 = initGallery('gallery-4');
const gallery5 = initGallery('gallery-5');

// Assign the functions to the global scope so buttons can call them
window.prevThumbnail = function (galleryId) {
    switch (galleryId) {
        case 'gallery-1': gallery1.prevThumbnail(); break;
        case 'gallery-2': gallery2.prevThumbnail(); break;
        case 'gallery-3': gallery3.prevThumbnail(); break;
        case 'gallery-4': gallery4.prevThumbnail(); break;
        case 'gallery-5': gallery5.prevThumbnail(); break;
        default: console.warn(`No gallery found with ID: ${galleryId}`);
    }
};

window.nextThumbnail = function (galleryId) {
    switch (galleryId) {
        case 'gallery-1': gallery1.nextThumbnail(); break;
        case 'gallery-2': gallery2.nextThumbnail(); break;
        case 'gallery-3': gallery3.nextThumbnail(); break;
        case 'gallery-4': gallery4.nextThumbnail(); break;
        case 'gallery-5': gallery5.nextThumbnail(); break;
        default: console.warn(`No gallery found with ID: ${galleryId}`);
    }
};
