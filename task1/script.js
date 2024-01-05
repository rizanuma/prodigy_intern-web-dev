document.addEventListener("DOMContentLoaded", function () {
    var navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(30, 136, 229, 0.9)'; /* Semi-transparent blue background */
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        }
    });
});
