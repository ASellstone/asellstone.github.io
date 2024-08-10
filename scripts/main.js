// Typing animation
document.addEventListener("DOMContentLoaded", function() {
    const headerElement = document.getElementById("header-typing");
    const paragraphElement = document.getElementById("paragraph-typing");

    function typeText(element, text, delay, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, delay);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    // Typing effect for header
    typeText(headerElement, "Hello, I'm Andreas.", 50, () => {
        // Pause for 1 second before starting the paragraph text
        setTimeout(() => {
            // Start typing the paragraph text without adding a new line
            paragraphElement.innerHTML = "";
            typeText(paragraphElement, "Scroll down to see my work...", 50);
        }, 1000); // 1 second pause
    });
});


// Return to top
document.addEventListener("DOMContentLoaded", function() {
    const returnToTopButton = document.getElementById('return-to-top');
    let lastScrollTop = 0;
    let scrollTimeout;

    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout); // Clear the timeout if scrolling is still happening

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop < lastScrollTop) {
            // Show the button when scrolling up
            returnToTopButton.style.display = 'block';
            returnToTopButton.style.opacity = '1';
        } else {
            // Hide the button when scrolling down
            returnToTopButton.style.opacity = '0';
            setTimeout(() => {
                if (returnToTopButton.style.opacity === '0') {
                    returnToTopButton.style.display = 'none';
                }
            }, 300); // Wait for the opacity transition to finish before hiding completely
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

        // Set a timeout to hide the button after 1 second of no scrolling
        scrollTimeout = setTimeout(() => {
            returnToTopButton.style.opacity = '0';
            setTimeout(() => {
                if (returnToTopButton.style.opacity === '0') {
                    returnToTopButton.style.display = 'none';
                }
            }, 300); // Wait for the opacity transition to finish before hiding completely
        }, 1000); // 1 second delay
    });

    // Scroll to top when button is clicked
    returnToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


// Scrolling TOC
document.addEventListener("DOMContentLoaded", function () {
    const tocLinks = document.querySelectorAll(".toc a");
    const sections = document.querySelectorAll("main h1, main h2, main h3");

    function updateActiveSection() {
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < window.innerHeight / 2 && sectionTop > 0) {
                currentSection = section.getAttribute("id");
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveSection);
    updateActiveSection(); // Initialize the function on page load
});