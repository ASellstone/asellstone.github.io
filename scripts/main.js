// Function to toggle the visibility of the mobile TOC
function toggleMobileToc() {
    var toc = document.getElementById("mobile-toc");
    var icon = document.querySelector(".mobile-toc-icon i"); // Select the <i> element inside .mobile-toc-icon

    toc.classList.toggle("show");

    // Check if the menu is shown and toggle the icon accordingly
    if (toc.classList.contains("show")) {
        icon.classList.remove("fa-list");   // Remove the "list" icon class
        icon.classList.add("fa-xmark");     // Add the "X" icon class
    } else {
        icon.classList.remove("fa-xmark");  // Remove the "X" icon class
        icon.classList.add("fa-list");      // Add the "list" icon class
    }
}


// Function to update the active link in the TOC based on scroll position
function updateActiveTocLink() {
    var sections = document.querySelectorAll('main h1, main h2, main h3');
    var tocLinks = document.querySelectorAll('#mobile-toc a');

    let currentSectionId = '';

    sections.forEach(function(section) {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            currentSectionId = section.getAttribute('id');
        }
    });

    tocLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSectionId) {
            link.classList.add('active');
        }
    });
}


// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners to TOC links to close the TOC when a link is clicked
    var tocLinks = document.querySelectorAll("#mobile-toc a");

    tocLinks.forEach(function(link) {
        link.addEventListener("click", function() {
            // Close the TOC window after clicking a link
            toggleMobileToc();

            // Scroll to the section smoothly
            var targetId = this.getAttribute('href').substring(1);
            var targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });

            // Update the active TOC link immediately
            updateActiveTocLink();
        });
    });

    // Update active TOC link on scroll
    window.addEventListener('scroll', updateActiveTocLink);

    // Initialize the active TOC link on page load
    updateActiveTocLink();
});

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the elements
    const toc = document.getElementById("toc");
    const openTocBtn = document.getElementById("openTocBtn");
    const closeTocBtn = document.getElementById("closeTocBtn");

    // Function to show the TOC
    function showToc() {
        toc.classList.remove("toc-hidden"); // Show the TOC
        openTocBtn.style.display = "none";  // Hide the open button
        closeTocBtn.style.display = "block"; // Show the close button
    }

    // Function to hide the TOC
    function hideToc() {
        toc.classList.add("toc-hidden");   // Hide the TOC
        openTocBtn.style.display = "block";  // Show the open button
        closeTocBtn.style.display = "none";  // Hide the close button
    }

    // Event listeners for the buttons
    openTocBtn.addEventListener("click", showToc);
    closeTocBtn.addEventListener("click", hideToc);

    // Initially, only show the open button
    hideToc();
});

// Typing animation
document.addEventListener("DOMContentLoaded", function() {
    const headerTypingElement = document.getElementById("header-typing");
    const paragraphTypingElement = document.getElementById("paragraph-typing");
    const headerCursor = document.getElementById("header-cursor");
    const paragraphCursor = document.getElementById("paragraph-cursor");

    function typeText(element, cursor, text, delay, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, delay);
            } else {
                // Do not hide the header cursor here, it should continue blinking
                if (callback) {
                    callback();
                }
            }
        }
        type();
    }

    // Initial setup
    headerTypingElement.innerHTML = "";
    paragraphTypingElement.innerHTML = "";
    headerCursor.style.visibility = 'visible'; // Show the header cursor from the start
    paragraphCursor.style.visibility = 'hidden'; // Hide the paragraph cursor initially

    // Start typing the header text after a 1-second delay
    setTimeout(() => {
        typeText(headerTypingElement, headerCursor, "Hello, I'm Andreas.", 50, () => {
            // Keep the header cursor blinking after the text is done
            // Wait 1 second before starting paragraph text
            setTimeout(() => {
                headerCursor.style.visibility = 'hidden'; // Hide the header cursor
                paragraphCursor.style.visibility = 'visible'; // Show the paragraph cursor
                typeText(paragraphTypingElement, paragraphCursor, "Scroll down to see my work", 50);
            }, 2000); // 1-second pause before paragraph typing starts
        });
    }, 1000); // 1-second delay before typing the header
});

// Return to top and top nav visibility on scroll
document.addEventListener("DOMContentLoaded", function() {
    const returnToTopButton = document.getElementById('return-to-top');
    const topnav = document.querySelector('.topnav');
    let lastScrollTop = 0;
    let scrollTimeout;
    let hideTimeout;

    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout); // Clear the timeout if scrolling is still happening
        clearTimeout(hideTimeout);   // Clear the hide timeout on new scroll

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Show or hide the topnav based on scroll direction
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            topnav.style.top = '-100px'; // Hide the topnav
        } else {
            // Scrolling up
            topnav.style.top = '0'; // Show the topnav
        }

        // Show the button when scrolling up
        if (scrollTop < lastScrollTop) {
            returnToTopButton.style.display = 'block';
            returnToTopButton.style.opacity = '1';
        } else {
            // Hide the button when scrolling down
            returnToTopButton.style.opacity = '0';
            scrollTimeout = setTimeout(() => {
                returnToTopButton.style.display = 'none';
            }, 500); // Delay to fade out the button
        }

        // Set a timeout to hide the button after a period of no scrolling
        hideTimeout = setTimeout(() => {
            returnToTopButton.style.opacity = '0';
            setTimeout(() => {
                returnToTopButton.style.display = 'none';
            }, 500); // Match the fade-out delay
        }, 1000); // Adjust the delay as needed (3000ms = 3 seconds)

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Ensure lastScrollTop is not negative
    });

    returnToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});


document.getElementById("openTocBtn").addEventListener("click", function() {
    document.getElementById("toc").classList.remove("toc-hidden");
    document.getElementById("openTocBtn").style.display = "none";
    document.getElementById("closeTocBtn").style.display = "block";
});

document.getElementById("closeTocBtn").addEventListener("click", function() {
    document.getElementById("toc").classList.add("toc-hidden");
    document.getElementById("closeTocBtn").style.display = "none";
    document.getElementById("openTocBtn").style.display = "block";
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