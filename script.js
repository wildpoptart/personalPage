const aboutLink = document.querySelector('.about-link');
const aboutContent = document.querySelector('.about-content');

aboutLink.addEventListener('click', () => {
    aboutContent.classList.toggle('transform-active');
    aboutContent.classList.toggle('opacity-active');
});