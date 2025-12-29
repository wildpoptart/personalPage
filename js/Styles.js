const styleNode = document.createElement('style');
document.querySelector('head').appendChild(styleNode);

const AddStyle = styleNode.styleSheet ? style => styleNode.styleSheet.cssText += style : style => styleNode.appendChild(document.createTextNode(style));
export default AddStyle;

AddStyle(`
    /* global styles */
    
    :root{
        --dropdown-svg: #D37836;
        --text-color: #969696;
        user-select: none;
    }

    body{
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #121212;
        color: var(--text-color);
        /* Hide scrollbar for Chrome, Safari and Opera */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        overflow: hidden;
    }

    .hidden{
        display: none !important;
    }

    
    .background-scene {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px; /* Increased width */
        height: 300px; /* Increased height */
        perspective: 800px; /* Adjusted perspective */
        z-index: -1;
        opacity: .2;
    }
`);