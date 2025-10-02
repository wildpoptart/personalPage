// Navigation button functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    const hiddenContents = document.querySelectorAll('.hidden-content');
    
    // Load content when page loads
    loadMovies();
    loadBooks();
    loadPhotos();
    loadAbout();
    loadThoughts();
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetClass = this.getAttribute('data-target');
            const targetContent = document.querySelector('.' + targetClass);
            
            // Hide all other content sections
            hiddenContents.forEach(content => {
                if (content !== targetContent) {
                    if (content.classList.contains('show')) {
                        content.classList.remove('show');
                    }
                }
            });
            
            // Toggle the clicked content
            if (targetContent) {
                targetContent.classList.toggle('show');
            }
        });
  });
});

// Function to convert star rating to HTML
function convertRatingToStars(rating) {
    // Handle undefined, null, or empty rating
    if (!rating || typeof rating !== 'string') {
        // Return 5 empty stars if no rating
        return '<span class="star empty">★</span>'.repeat(5);
    }
    
    const starCount = (rating.match(/★/g) || []).length;
    const halfStar = rating.includes('½');
    
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < starCount; i++) {
        starsHTML += '<span class="star">★</span>';
    }
    
    // Add half star if present
    if (halfStar) {
        starsHTML += '<span class="star half">★</span>';
    }
    
    // Add empty stars to make it 5 total
    const totalStars = starCount + (halfStar ? 1 : 0);
    const emptyStars = 5 - totalStars;
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star empty">★</span>';
    }
    
    return starsHTML;
}

// Function to load movies from JSON
async function loadMovies() {
    try {
        const response = await fetch('./files/movies.json');
        const movies = await response.json();
        
        const moviesContent = document.querySelector('.movies-content');
        if (!moviesContent) return;
        
        // Don't clear content - keep existing content
        
        // Create movies container
        const moviesContainer = document.createElement('div');
        moviesContainer.className = 'movies-list';
        
        // Add each movie
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.className = 'movie-item';
            
            movieElement.innerHTML = `
                <p class="movie-title">${movie.title} 
                    <span class="star-rating">
                        ${convertRatingToStars(movie.rating)}
                    </span>
                </p>
                ${movie.review ? `<p class="movie-review">${movie.review}</p>` : ''}
            `;
            
            moviesContainer.appendChild(movieElement);
        });
        
        moviesContent.appendChild(moviesContainer);
        
    } catch (error) {
        console.error('Error loading movies:', error);
        const moviesContent = document.querySelector('.movies-content');
        if (moviesContent) {
            moviesContent.innerHTML = '<p>Error loading movies. Please try again later.</p>';
        }
    }
}

// Function to load books from JSON
async function loadBooks() {
    try {
        const response = await fetch('./files/books.json');
        const books = await response.json();
        
        const booksContent = document.querySelector('.books-content');
        if (!booksContent) return;
        
        // Don't clear content - keep existing content
        
        // Create books container
        const booksContainer = document.createElement('div');
        booksContainer.className = 'books-list';
        
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
            
            bookElement.innerHTML = `
                <p class="book-title">${book.title || 'Untitled Book'} 
                    <span class="star-rating">
                        ${convertRatingToStars(book.rating)}
                    </span>
                </p>
                ${book.author ? `<p class="book-author">by ${book.author}</p>` : ''}
                ${book.review ? `<p class="book-review">${book.review}</p>` : ''}
            `;
            
            booksContainer.appendChild(bookElement);
        });
        
        booksContent.appendChild(booksContainer);
        
    } catch (error) {
        console.error('Error loading books:', error);
        const booksContent = document.querySelector('.books-content');
        if (booksContent) {
            booksContent.innerHTML = '<p>Error loading books. Please try again later.</p>';
        }
    }
}

async function loadPhotos() {
    try {
        const response = await fetch('./files/photos.json');
        const photos = await response.json();

        const photosContent = document.querySelector('.photos-content');
        if (!photosContent) return;

        const photosContainer = document.createElement('div');
        photosContainer.className = 'photo-grid';
        
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
        
        photosContent.appendChild(photosContainer);
        
    } catch (error) {
        console.error('Error loading photos:', error);
        const photosContent = document.querySelector('.photos-content');
        if (photosContent) {
            photosContent.innerHTML = '<p>Error loading photos. Please try again later.</p>';
        }
    }
}

async function loadAbout() {
    try {
        const response = await fetch('./files/about.json');
        const about = await response.json();

        const aboutContent = document.querySelector('.about-content');
        if (!aboutContent) return;

        // Load the first (and only) about content
        if (about.length > 0) {
            loadAboutContent(about[0].file, aboutContent);
        }
        
    } catch (error) {
        console.error('Error loading about:', error);
        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            aboutContent.innerHTML = '<p>Error loading about. Please try again later.</p>';
        }
    }
}

async function loadAboutContent(fileName, contentArea) {
    try {
        const response = await fetch(`./about/${fileName}`);
        const markdownContent = await response.text();
        
        const htmlContent = parseMarkdown(markdownContent);
        
        contentArea.innerHTML = htmlContent;
        
    } catch (error) {
        console.error('Error loading about content:', error);
        contentArea.innerHTML = '<p>Error loading about content. Please try again later.</p>';
    }
}

// Simple markdown parser for basic formatting
function parseMarkdown(markdown) {
    return markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        // Lists
        .replace(/^\* (.*$)/gim, '<li>$1</li>')
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        // Wrap consecutive list items in ul
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
        // Clean up nested ul tags
        .replace(/<\/ul>\s*<ul>/g, '')
        // Code blocks
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Blockquotes
        .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
        // Line breaks
        .replace(/\n\n/g, '</p><p>')
        // Wrap in paragraphs
        .replace(/^(?!<[h|u|b|p|d|c|s])(.*$)/gim, '<p>$1</p>')
        // Clean up empty paragraphs
        .replace(/<p><\/p>/g, '')
        // Clean up paragraphs inside other elements
        .replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/g, '$1')
        .replace(/<p>(<ul>.*<\/ul>)<\/p>/g, '$1')
        .replace(/<p>(<blockquote>.*<\/blockquote>)<\/p>/g, '$1')
        .replace(/<p>(<pre>.*<\/pre>)<\/p>/g, '$1');
}

async function loadThoughts() {
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
}

async function loadThoughtContent(fileName, contentArea) {
    try {
        const response = await fetch(`./thoughts/${fileName}`);
        const markdownContent = await response.text();
        
        const htmlContent = parseMarkdown(markdownContent);
        
        contentArea.innerHTML = `<div class="thought-content">${htmlContent}</div>`;
        
    } catch (error) {
        console.error('Error loading thought content:', error);
        contentArea.innerHTML = '<p>Error loading thought content. Please try again later.</p>';
    }
}