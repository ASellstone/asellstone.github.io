/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.className === "show") {
        x.className = "";
    } else {
        x.className = "show";
    }
}


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
    headerElement.innerHTML = "";
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


// Mobile popup
window.onload = function() {
    // Detect mobile devices using a simple screen width check
    if (window.innerWidth <= 768) {
        document.getElementById('mobile-popup').style.display = 'block';
    }
}

function closePopup() {
    document.getElementById('mobile-popup').style.display = 'none';
}

// Desktop toc popup
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


// Mobile toc popup
function toggleMobileToc() {
    var toc = document.getElementById("mobile-toc");
    if (toc.classList.contains("show")) {
        toc.classList.remove("show");
    } else {
        toc.classList.add("show");
    }
}

// Add event listeners to TOC links to close the TOC when a link is clicked
document.addEventListener("DOMContentLoaded", function() {
    var tocLinks = document.querySelectorAll("#mobile-toc a");

    tocLinks.forEach(function(link) {
        link.addEventListener("click", function() {
            // Close the TOC window after clicking a link
            toggleMobileToc();
        });
    });
});


let lastScrollTop = 0;
const navbar = document.querySelector('.topnav'); // or '.navbar' depending on the menu you want to hide

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.style.top = '-100px'; // Hide the navbar (you can adjust the value based on your navbar height)
  } else {
    // Scrolling up
    navbar.style.top = '0';
  }
  
  lastScrollTop = scrollTop;
});