// Navigation button functionality
document.addEventListener('DOMContentLoaded', (e) => {
    const menu = e.target.querySelector('.menu-dropdown');
    const content = e.target.querySelector('info-content');
    const aboutButton = e.target.querySelector('.about');

    aboutButton.addEventListener('click', ()=> content.show('about'));

    menu.addEventListener('show', (e) => {
        menu.hide();
        console.log(content)
        content.show(e.detail);
    });

    // twitter
    const menuItems = ['thoughts', 'photos', 'movies', 'books'];
    // Load content when page loads
    menuItems.forEach(item => {
        menu.addItem(item);        
    });

    e.target.addEventListener('click', (e) => {
        if(menu.showing){
            menu.hide();
        }
    });
});