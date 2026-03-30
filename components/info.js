import AddStyle from "../js/Styles.js";
import { convertRatingToStars, parseMarkdown } from "../js/Utils.js";

import movies from "../assets/data/movies.json" with { type: "json" };
import books from "../assets/data/books.json" with {type: "json"};
import photos from "../assets/data/photos.json" with {type: "json"};
import about from "../assets/data/about.json" with {type: "json"};
import thoughts from "../assets/data/thoughts.json" with {type: "json"};
import projects from "../assets/data/projects.json" with {type: "json"};

AddStyle(/*css*/`
    .info-content{
        display: flex;
        height: calc(100vh - 200px);
        overflow: hidden;
    }

    .info-content .showing{
        width: 100%;
        border: 1px gray solid;
    }

    /******* Movies list styles *******/
    .movies-list {
        max-height: 100%;
        height: auto;
        overflow-y: auto;
        padding: 10px 0;
        /* Hide scrollbar for Chrome, Safari and Opera */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* Internet Explorer 10+ */
    }

    .movies-list::-webkit-scrollbar {
        display: none; /* WebKit browsers */
    }

    .movie-item {
        padding: 10px;
        background-color: rgba(18, 18, 18, 0.3);
        border-radius: 6px;
    }

    .movie-content {
        display: flex;
        align-items: flex-start;
        gap: 12px;
    }

    .movie-thumbnail {
        width: 60px;
        height: 90px;
        object-fit: cover;
        border-radius: 4px;
        flex-shrink: 0;
    }

    .movie-text {
        flex: 1;
        min-width: 0;
    }

    .movie-title {
        display: flex;
        justify-content: space-between;
        margin: 0 0 5px 0;
        font-weight: bold;
        color: #e0e0e0;
    }

    .movie-review {
        margin: 0;
        font-style: italic;
        color: var(--text-color);
        font-size: 0.9em;
    }
    /********               *******/

    /* Books list styles */
    .books-list {
        max-height: 100%;
        height: auto;
        overflow-y: auto;
        padding: 10px 0;
        /* Hide scrollbar for Chrome, Safari and Opera */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* Internet Explorer 10+ */
    }

    .books-list::-webkit-scrollbar {
        display: none; /* WebKit browsers */
    }
   
    .book-item {
        padding: 10px;
        background-color: rgba(18, 18, 18, 0.3);
        border-radius: 6px;
    }
    
    .book-content {
        display: flex;
        align-items: flex-start;
        gap: 12px;
    }
    
    .book-thumbnail {
        width: 60px;
        height: 90px;
        object-fit: cover;
        border-radius: 4px;
        flex-shrink: 0;
    }
    
    .book-text {
        flex: 1;
        min-width: 0;
    }
    
    .book-title {
        display: flex;
        justify-content: space-between;
        margin: 0 0 5px 0;
        font-weight: bold;
        color: #e0e0e0;
    }
    
    .book-author {
        margin: 0 0 5px 0;
        color: rgb(211, 120, 54);
        font-size: 0.9em;
    }
    
    .book-review {
        margin: 0;
        font-style: italic;
        color: var(--text-color);
        font-size: 0.9em;
    }

    /* Photo grid styles - CSS Grid masonry layout */
    .photo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-auto-rows: 200px;
        grid-gap: 10px;
        padding: 10px;
        max-height: 100%;
        height: auto;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .photo-grid::-webkit-scrollbar {
        display: none;
    }

    .photo-item {
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.3s ease;
    }

    .photo-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        display: block;
        }

        
    /* About content styles */
    .about-content {
        width: 100%;
        max-height: 100%;
        height: 0;
        min-height: 100%;
        overflow-y: auto;
        padding: 20px;
        scrollbar-width: none;
        -ms-overflow-style: none;
        background-color: rgba(18, 18, 18, 0.3);
        border-radius: 8px;
        line-height: 1.6;
        color: var(--text-color);
    }

    .about-content::-webkit-scrollbar {
        display: none;
    }

    .about-content h1,
    .about-content h2,
    .about-content h3,
    .about-content h4,
    .about-content h5,
    .about-content h6 {
        color: #e0e0e0;
        margin-top: 0;
    }

    .about-content h1 {
        font-size: 1.8em;
        margin-bottom: 20px;
        border-bottom: 1px solid rgb(211, 120, 54);
        padding-bottom: 10px;
    }

    .about-content h2 {
        font-size: 1.4em;
        margin-bottom: 15px;
        margin-top: 25px;
    }

    .about-content h3 {
        font-size: 1.2em;
        margin-bottom: 10px;
        margin-top: 20px;
    }

    .about-content p {
        margin-bottom: 15px;
    }

    .about-content ul,
    .about-content ol {
        margin-bottom: 15px;
        padding-left: 25px;
    }

    .about-content li {
        margin-bottom: 5px;
    }

    .about-content blockquote {
        border-left: 3px solid rgb(211, 120, 54);
        padding-left: 15px;
        margin: 15px 0;
        font-style: italic;
        color: #bbb;
    }

    .about-content code {
        background-color: rgba(18, 18, 18, 0.6);
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        color: rgb(211, 120, 54);
    }

    .about-content pre {
        background-color: rgba(18, 18, 18, 0.6);
        padding: 15px;
        border-radius: 6px;
        overflow-x: auto;
        margin: 15px 0;
    }

    .about-content pre code {
        background: none;
        padding: 0;
        color: var(--text-color);
    }

    .about-content strong {
        color: #e0e0e0;
    }

    .about-content em {
        color: rgb(211, 120, 54);
    }

    /* Thoughts content styles */
    .thoughts-container {
        max-height: 100%;
        height: auto;
        overflow-y: auto;
        padding: 10px 0;
        /* Hide scrollbar for Chrome, Safari and Opera */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* Internet Explorer 10+ */
    }

    .thoughts-container.showing {
        width: 100%;
        border: 1px gray solid;
    }

    .thoughts-dropdown-wrapper {
        padding: 15px 20px;
        background-color: rgba(18, 18, 18, 0.5);
        border-bottom: 1px solid rgba(211, 120, 54, 0.3);
    }

    .thoughts-dropdown {
        width: 100%;
        padding: 10px 15px;
        background-color: rgba(30, 30, 30, 0.9);
        color: #e0e0e0;
        border: 1px solid rgb(211, 120, 54);
        border-radius: 6px;
        font-size: 1em;
        cursor: pointer;
        outline: none;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23d37836' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
    }

    .thoughts-dropdown:hover {
        border-color: #e0e0e0;
    }

    .thoughts-dropdown:focus {
        border-color: #e0e0e0;
        box-shadow: 0 0 0 2px rgba(211, 120, 54, 0.2);
    }

    .thoughts-dropdown option {
        background-color: #1e1e1e;
        color: #e0e0e0;
        padding: 10px;
    }

    .thoughts-content-area {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        scrollbar-width: none;
        -ms-overflow-style: none;
        background-color: rgba(18, 18, 18, 0.3);
        line-height: 1.6;
        color: var(--text-color);
    }

    .thoughts-content-area::-webkit-scrollbar {
        display: none;
    }

    .thoughts-content-area h1,
    .thoughts-content-area h2,
    .thoughts-content-area h3,
    .thoughts-content-area h4,
    .thoughts-content-area h5,
    .thoughts-content-area h6 {
        color: #e0e0e0;
        margin-top: 0;
    }

    .thoughts-content-area h1 {
        font-size: 1.8em;
        margin-bottom: 20px;
        border-bottom: 1px solid rgb(211, 120, 54);
        padding-bottom: 10px;
    }

    .thoughts-content-area h2 {
        font-size: 1.4em;
        margin-bottom: 15px;
        margin-top: 25px;
    }

    .thoughts-content-area p {
        margin-bottom: 15px;
    }

    .thoughts-content-area ul,
    .thoughts-content-area ol {
        margin-bottom: 15px;
        padding-left: 25px;
    }

    .thoughts-content-area li {
        margin-bottom: 5px;
    }

    .thoughts-content-area blockquote {
        border-left: 3px solid rgb(211, 120, 54);
        padding-left: 15px;
        margin: 15px 0;
        font-style: italic;
        color: #bbb;
    }

    .thoughts-content-area code {
        background-color: rgba(18, 18, 18, 0.6);
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        color: rgb(211, 120, 54);
    }

    .thoughts-content-area strong {
        color: #e0e0e0;
    }

    .thoughts-content-area em {
        color: rgb(211, 120, 54);
    }
`);

export default class InfoContent extends HTMLElement{
    constructor(){
        super();

        this.classList.add('info-content');

        this.innerHTML = ``;

        this.showing;
    }

    show(page){
        this.innerHTML = ``;

        if(page === 'about'){ this.loadAbout(); }
        if(page === 'twitter'){ window.open('https://twitter.com/stanyslavb'); }
        if(page === 'movies'){ this.loadMovies(); }
        if(page === 'books'){ this.loadBooks(); }
        if(page === 'photos'){ this.loadPhotos(); }
        if(page === 'thoughts'){ this.loadThoughts(); }
        if(page === 'projects'){ this.loadProjects(); }
    };

    hide(){
        this.classList.toggle('showing');
        this.showing = null;
        this.innerHTML = ``;
    };

    loadMovies(){            
        const infoContent = this;
        if(this.showing === 'movies') { this.hide(); return; }

        this.showing = 'movies';
        // Create movies container
        const moviesContainer = document.createElement('div');
        moviesContainer.className = 'movies-list';
        moviesContainer.classList.toggle('showing');
        
        // Add each movie
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.className = 'movie-item';
            
            const thumbnailHTML = movie.thumbnail ? 
                `<img src="${movie.thumbnail}" alt="${movie.title}" class="movie-thumbnail" onerror="this.style.display='none'">` : 
                '';
            
            movieElement.innerHTML = `
                <div class="movie-content">
                    ${thumbnailHTML}
                    <div class="movie-text">
                        <p class="movie-title">${movie.title} 
                            <span class="star-rating">
                                ${convertRatingToStars(movie.rating)}
                            </span>
                        </p>
                        ${movie.review ? `<p class="movie-review">${movie.review}</p>` : ''}
                    </div>
                </div>
            `;
            
            moviesContainer.appendChild(movieElement);
        });
        
        infoContent.appendChild(moviesContainer);
    };

    loadBooks(){
        const infoContent = this;
        if(this.shwoing === 'books') { this.hide(); return; }

        this.showing = 'books';

        // Create books container
        const booksContainer = document.createElement('div');
        booksContainer.className = 'books-list';
        booksContainer.classList.toggle('showing');

        // Check if books array is empty
        if (!books || books.length === 0) {
            booksContainer.innerHTML = '<p>No books found. Add some books to your books.json file!</p>';
            booksContent.appendChild(booksContainer);
            return;
        }
        
        // Add each book
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book-item';
            
            const thumbnailHTML = book.thumbnail ? 
                `<img src="${book.thumbnail}" alt="${book.title || 'Untitled Book'}" class="book-thumbnail" onerror="this.style.display='none'">` : 
                '';
            
            bookElement.innerHTML = /*html*/`
                <div class="book-content">
                    ${thumbnailHTML}
                    <div class="book-text">
                        <p class="book-title">${book.title || 'Untitled Book'} 
                            <span class="star-rating">
                                ${convertRatingToStars(book.rating)}
                            </span>
                        </p>
                        ${book.author ? `<p class="book-author">by ${book.author}</p>` : ''}
                        ${book.review ? `<p class="book-review">${book.review}</p>` : ''}
                    </div>
                </div>
            `;
            
            booksContainer.appendChild(bookElement);
        });
        
        infoContent.appendChild(booksContainer);
    };

    loadPhotos(){
        const infoContent = this;
        if(this.showing === 'photos') { this.hide(); return; }

        this.showing = 'photos';

        const photosContainer = document.createElement('div');
        photosContainer.className = 'photo-grid';
        photosContainer.classList.toggle('showing');
        
        photos.forEach((photo, index) => {
            const photoElement = document.createElement('div');
            photoElement.className = 'photo-item';
            
            const img = document.createElement('img');
            img.src = photo.image;
            img.alt = photo.title;
            
            img.onload = function() {
                const aspectRatio = this.naturalWidth / this.naturalHeight;
                const isMobile = window.innerWidth <= 768;
                const isSmallMobile = window.innerWidth <= 480;
                
                // Adjust thresholds for mobile screens
                if (isSmallMobile) {
                    // Small mobile - more conservative spanning
                    if (aspectRatio > 1.8) {
                        photoElement.style.gridColumn = 'span 2';
                    } else if (aspectRatio < 0.6) {
                        photoElement.style.gridRow = 'span 2';
                    }
                } else if (isMobile) {
                    // Tablet - moderate spanning
                    if (aspectRatio > 1.6) {
                        photoElement.style.gridColumn = 'span 2';
                    } else if (aspectRatio < 0.65) {
                        photoElement.style.gridRow = 'span 2';
                    } else if (aspectRatio > 1.3) {
                        photoElement.style.gridColumn = 'span 2';
                    } else if (aspectRatio < 0.75) {
                        photoElement.style.gridRow = 'span 2';
                    }
                } else {
                    // Desktop - original logic
                    if (aspectRatio > 1.5) {
                        photoElement.style.gridColumn = 'span 2';
                    } else if (aspectRatio < 0.7) {
                        photoElement.style.gridRow = 'span 2';
                    } else if (aspectRatio > 1.2) {
                        photoElement.style.gridColumn = 'span 2';
                    } else if (aspectRatio < 0.8) {
                        photoElement.style.gridRow = 'span 2';
                    }
                }
            };
            
            photoElement.appendChild(img);
            photosContainer.appendChild(photoElement);
        });
        
        infoContent.appendChild(photosContainer);
    };

    async loadAbout(){
        const infoContent = this;
        if(this.showing === 'about') { this.hide(); return; }

        this.showing = 'about';

        const response = await fetch(`./assets/data/mds/${about[0].file}`);
        const markdownContent = await response.text();

        const htmlContent = parseMarkdown(markdownContent);
        const aboutContainer = document.createElement('div');
        aboutContainer.classList.add('about-content');
        aboutContainer.innerHTML = htmlContent;
        infoContent.appendChild(aboutContainer);
    };

    async loadThoughts() {
        const infoContent = this;
        if(this.showing === 'thoughts') { this.hide(); return; }

        this.showing = 'thoughts';

        // Create main container
        const thoughtsContainer = document.createElement('div');
        thoughtsContainer.className = 'thoughts-container';
        thoughtsContainer.classList.add('showing');

        // Create dropdown wrapper
        const dropdownWrapper = document.createElement('div');
        dropdownWrapper.className = 'thoughts-dropdown-wrapper';

        // Create dropdown
        const dropdown = document.createElement('select');
        dropdown.className = 'thoughts-dropdown';

        // Populate dropdown with options from thoughts.json
        thoughts.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = item.title;
            dropdown.appendChild(option);
        });

        dropdownWrapper.appendChild(dropdown);

        // Create content area
        const contentArea = document.createElement('div');
        contentArea.className = 'thoughts-content-area';

        thoughtsContainer.appendChild(dropdownWrapper);
        thoughtsContainer.appendChild(contentArea);
        infoContent.appendChild(thoughtsContainer);

        // Load content helper function
        const loadContent = async (fileName) => {
            try {
                const response = await fetch(`./assets/data/mds/${fileName}`);
                const markdownContent = await response.text();
                const htmlContent = parseMarkdown(markdownContent);
                contentArea.innerHTML = htmlContent;
            } catch (error) {
                console.error('Error loading thought content:', error);
                contentArea.innerHTML = '<p>Error loading content. Please try again later.</p>';
            }
        };

        // Add change event listener
        dropdown.addEventListener('change', () => {
            const selectedIndex = parseInt(dropdown.value);
            loadContent(thoughts[selectedIndex].file);
        });

        // Load the first item by default
        if (thoughts.length > 0) {
            loadContent(thoughts[0].file);
        }
    };

    async loadProjects() {
        const infoContent = this;
        if (this.showing === 'projects') {
            this.hide();
            return;
        }

        this.showing = 'projects';

        const outer = document.createElement('div');
        outer.className = 'thoughts-container';
        outer.classList.add('showing');

        const dropdownWrapper = document.createElement('div');
        dropdownWrapper.className = 'thoughts-dropdown-wrapper';

        const dropdown = document.createElement('select');
        dropdown.className = 'thoughts-dropdown';

        projects.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = item.title;
            dropdown.appendChild(option);
        });

        const contentArea = document.createElement('div');
        contentArea.className = 'thoughts-content-area';

        if (projects.length > 0) {
            dropdownWrapper.appendChild(dropdown);
            outer.appendChild(dropdownWrapper);
        }

        outer.appendChild(contentArea);
        infoContent.appendChild(outer);

        const loadContent = async (fileName) => {
            try {
                const response = await fetch(`./assets/data/projects/${fileName}`);
                const markdownContent = await response.text();
                contentArea.innerHTML = parseMarkdown(markdownContent);
            } catch (error) {
                console.error('Error loading project content:', error);
                contentArea.innerHTML =
                    '<p>Error loading content. Please try again later.</p>';
            }
        };

        if (projects.length > 0) {
            dropdown.addEventListener('change', () => {
                const selectedIndex = parseInt(dropdown.value, 10);
                loadContent(projects[selectedIndex].file);
            });
            loadContent(projects[0].file);
        }
    };
}
customElements.define('info-content', InfoContent);