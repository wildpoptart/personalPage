import AddStyle from "../js/Styles.js";

AddStyle(`

    .cube{
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        animation: spin 9s infinite linear;
    }

    .face{
        position: absolute;
        width: 300px; /* Increased width */
        height: 300px; /* Increased height */
        border: 2px solid orange;
        box-sizing: border-box;
        color: orange;
        background: none;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px; /* Adjusted font size */
        font-weight: bold;
    }
      
    .front  { transform: translateZ(150px); }
    .back   { transform: rotateY(180deg) translateZ(150px); }
    .right  { transform: rotateY(90deg) translateZ(150px); }
    .left   { transform: rotateY(-90deg) translateZ(150px); }
    .top    { transform: rotateX(90deg) translateZ(150px); }
    .bottom { transform: rotateX(-90deg) translateZ(150px); }
    
    @keyframes spin{
        from { transform: rotateX(-30deg) rotateY(-45deg) rotateZ(30deg); }
        to { transform: rotateX(-30deg) rotateY(315deg) rotateZ(300deg); }
    }
      
    @keyframes tumble{
        from { transform: rotate3d(1, 1, 1, 0deg); }
        to { transform: rotate3d(1, 1, 1, 360deg); }
    }
`);

export default class Cube extends HTMLElement {
    constructor() {
        super();

        this.classList.add('cube-background');

        this.innerHTML = `
            <div class="cube">
                <div class="face front"></div>
                <div class="face back"></div>
                <div class="face right"></div>
                <div class="face left"></div>
                <div class="face top"></div>
                <div class="face bottom"></div>
            </div>
        `;
    }
};

customElements.define('cube-background', Cube);