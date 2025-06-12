 // Scroll to content function


// Phone screen and info box interaction
const phoneContainer = document.querySelector('.phone-container');
const screens = document.querySelectorAll('.screen');
const infoBoxes = document.querySelectorAll('.info-box');
const container = document.querySelector('.container');

// Dynamically set container height based on the number of sections
const numSections = 6; // Number of sections
container.style.height = `${numSections * 100}vh`;

function updateSection() {
    const containerHeight = container.offsetHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollPercentage = scrollY / (containerHeight - windowHeight);

    const section = Math.floor(scrollPercentage * numSections); // 6 sections

    // Ensure section is within bounds
    const activeSection = Math.min(Math.max(section, 0), 5);

    // Update active screen
    screens.forEach((screen, index) => {
        screen.classList.toggle('active', index === activeSection);
    });

    // Update phone position
    const isLeft = activeSection % 2 === 0;
    phoneContainer.style.transform = `translateX(${isLeft ? '-300px' : '300px'})`;

    // Update info box positions and opacity
    infoBoxes.forEach((box, index) => {
        if (index === activeSection) {
            box.style.opacity = '1';
            box.style.transform = `translateX(${isLeft ? '300px' : '-300px'})`;
        } else {
            box.style.opacity = '0';
            box.style.transform = 'translateX(0)';
        }
    });
}

window.addEventListener('scroll', updateSection);
window.addEventListener('load', updateSection);
window.addEventListener('resize', updateSection);