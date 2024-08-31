/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
    var x = document.getElementById("myLinks");
    var icon = document.querySelector(".icon i"); // Select the <i> element inside .icon

    if (x.classList.contains("show")) {
        x.classList.remove("show");
        icon.classList.remove("fa-xmark"); // Remove the "X" icon class
        icon.classList.add("fa-bars");     // Add the "bars" icon class back
    } else {
        x.classList.add("show");
        icon.classList.remove("fa-bars");  // Remove the "bars" icon class
        icon.classList.add("fa-xmark");    // Add the "X" icon class
    }
}

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
                typeText(paragraphTypingElement, paragraphCursor, "Scroll down to see my work...", 50);
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
