import AddStyle from "../js/Styles.js";
import { convertRatingToStars, parseMarkdown } from "../js/Utils.js";

import movies from "../assets/data/movies.json" with { type: "json" };
import books from "../assets/data/books.json" with {type: "json"};
import photos from "../assets/data/photos.json" with {type: "json"};
import about from "../assets/data/about.json" with {type: "json"};

AddStyle(`
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
        cursor: pointer;
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
            
            bookElement.innerHTML = `
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
        try {
            const response = await fetch('./files/thoughts.json');
            const thoughts = await response.json();
    
            const thoughtsContent = document.querySelector('.thoughts-content');
            const thoughtsNavDropdownContainer = document.querySelector('.thoughts-nav-dropdown-container');
            const thoughtsContentArea = document.querySelector('.thoughts-content-area');
            
            if (!thoughtsContent || !thoughtsNavDropdownContainer || !thoughtsContentArea) return;
    
            // Clear existing content
            thoughtsNavDropdownContainer.innerHTML = '';
            thoughtsContentArea.innerHTML = '';
    
            // Create dropdown
            const dropdown = document.createElement('select');
            dropdown.className = 'thoughts-nav-dropdown';
            
            // Create options for dropdown
            thoughts.forEach((thought, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = thought.title;
                dropdown.appendChild(option);
            });
            
            // Add dropdown to container
            thoughtsNavDropdownContainer.appendChild(dropdown);
            
            // Add change event listener for dropdown
            dropdown.addEventListener('change', () => {
                const selectedIndex = parseInt(dropdown.value);
                const selectedThought = thoughts[selectedIndex];
                
                // Load the selected thought
                loadThoughtContent(selectedThought.file, thoughtsContentArea);
            });
    
            // Load the first thought by default
            if (thoughts.length > 0) {
                dropdown.selectedIndex = 0;
                loadThoughtContent(thoughts[0].file, thoughtsContentArea);
            }
            
        } catch (error) {
            console.error('Error loading thoughts:', error);
            const thoughtsContent = document.querySelector('.thoughts-content');
            if (thoughtsContent) {
                thoughtsContent.innerHTML = '<p>Error loading thoughts. Please try again later.</p>';
            }
        }
    };
    
    async loadThoughtContent(fileName, contentArea) {
        try {
            const response = await fetch(`./thoughts/${fileName}`);
            const markdownContent = await response.text();
            
            const htmlContent = parseMarkdown(markdownContent);
            
            contentArea.innerHTML = `<div class="thought-content">${htmlContent}</div>`;
            
        } catch (error) {
            console.error('Error loading thought content:', error);
            contentArea.innerHTML = '<p>Error loading thought content. Please try again later.</p>';
        }
    };
}
customElements.define('info-content', InfoContent);