// Load More Button Portfolio
document.getElementById("loadMore").addEventListener("click", function() {
    let hiddenItems = document.querySelectorAll(".portfolio-item.hidden");
    let itemsToShow = 6; // Number of items to show per click

    for (let i = 0; i < itemsToShow && i < hiddenItems.length; i++) {
        hiddenItems[i].classList.remove("hidden");
    }

    // Hide button if no more items left
    if (document.querySelectorAll(".portfolio-item.hidden").length === 0) {
        this.style.display = "none";
    }
});


// Go To Top
// Get the button
const goToTopBtn = document.getElementById("goToTopBtn");

// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        goToTopBtn.style.display = "block";
    } else {
        goToTopBtn.style.display = "none";
    }
};

// When the user clicks the button, scroll to the top of the document
goToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

function toggleText(service) {
    const fullText = document.getElementById(`${service}-full`);
    const readMoreLink = document.querySelector(`#${service}-text .read-more`);
    const readLessLink = document.querySelector(`#${service}-text .read-less`);

    if (fullText.style.display === 'none' || fullText.style.display === '') {
        fullText.style.display = 'inline'; // Show full text inline
        readMoreLink.style.display = 'none'; // Hide "Read More"
        readLessLink.style.display = 'inline'; // Show "Read Less"
    } else {
        fullText.style.display = 'none'; // Hide full text
        readMoreLink.style.display = 'inline'; // Show "Read More"
        readLessLink.style.display = 'none'; // Hide "Read Less"
    }
}

// Add 'loaded' class to body after page loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Intersection Observer for Sections
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null, // Use viewport
    threshold: 0.1 // Trigger when 10% of section is visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// Intersection Observer for Portfolio Items and Service Cards
const items = document.querySelectorAll('.portfolio-item, .services-section .card');
const itemObserverOptions = {
    root: null,
    threshold: 0.2 // Trigger when 20% of item is visible
};

const itemObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation with a slight delay
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); // 100ms delay per item
            observer.unobserve(entry.target);
        }
    });
}, itemObserverOptions);

items.forEach(item => itemObserver.observe(item));