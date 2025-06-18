// Select elements
const hamburgerMenu = document.getElementById('hamburger_menu');
const navLinks = document.querySelector('.nav-links');

// Toggle menu on click
hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburgerMenu.classList.toggle('open');
});
