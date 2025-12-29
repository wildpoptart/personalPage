import AddStyle from "../js/Styles.js";

AddStyle(`
    .menu-dropdown{
        display:flex;
        cursor: pointer;
    }

    .menu-dropdown .button{
        width: 30px;
        height: 30px; 
    }

    .menu-dropdown svg{
        fill:var(--dropdown-svg);
    }

    .menu-dropdown svg:hover{
        fill: #e0e0e0;
    }

    .menu-dropdown .menuItem:hover{
        color: #e0e0e0;
    }

    .menu-dropdown .content{
        display: flex;
        position: absolute;
        flex-direction: column;
        background-color: black;
        padding: 5px;
        gap: 5px;
        margin-top: 30px;
        z-index: 99;
    }
`);

export default class MenuDropdown extends HTMLElement{
    constructor(){
        super();

        this.classList.add('menu-dropdown');

        this.innerHTML = `
            <div class="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </div>
            <div class="content hidden"></div>
        `;

        this.menuItems = [];
        this.showing = false;
        this.shownContent;

        const button = this.querySelector('.button');
        const content = this.querySelector('.content');

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            content.classList.toggle('hidden');
            this.showing = true;
        });
    };

    addItem(item){
        const menuItem = document.createElement('div');
        menuItem.classList.add('menuItem');
        menuItem.innerText = item;

        menuItem.addEventListener('click', () => {
            this.showing = item;
            this.dispatchEvent(new CustomEvent('show', { detail: item }));
            this.querySelector('.content').classList.add('hidden');
        });

        this.querySelector('.content').appendChild(menuItem);
    };

    hide(){
        const content = this.querySelector('.content');
        content.classList.add('hidden');  
        this.showing = false;           
    };
}
customElements.define('menu-dropdown', MenuDropdown);