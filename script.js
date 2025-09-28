// Navigation button functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    const hiddenContents = document.querySelectorAll('.hidden-content');
    
    // Load content when page loads
    loadMovies();
    loadBooks();
    loadPhotos();
    loadAbout();
    
    // Show about content by default
    // const aboutContent = document.getElementById('about-content');
    // if (aboutContent) {
    //     aboutContent.classList.add('show');
    // }
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
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
        
        const moviesContent = document.getElementById('movies-content');
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
        const moviesContent = document.getElementById('movies-content');
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
        
        const booksContent = document.getElementById('books-content');
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
        const booksContent = document.getElementById('books-content');
        if (booksContent) {
            booksContent.innerHTML = '<p>Error loading books. Please try again later.</p>';
        }
    }
}

async function loadPhotos() {
    try {
        const response = await fetch('./files/photos.json');
        const photos = await response.json();

        const photosContent = document.getElementById('photos-content');
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
        const photosContent = document.getElementById('photos-content');
        if (photosContent) {
            photosContent.innerHTML = '<p>Error loading photos. Please try again later.</p>';
        }
    }
}

async function loadAbout() {
    try {
        const response = await fetch('./files/about.json');
        const about = await response.json();

        const aboutContent = document.getElementById('about-content');
        if (!aboutContent) return;

        const aboutContainer = document.createElement('div');
        aboutContainer.className = 'about-container';
        
        about.forEach(about => {
            const aboutElement = document.createElement('div');
            aboutElement.className = 'about-item';

            let aboutHtml = ``;
            for (const key in about) {
                if (key !== 'title') {
                    aboutHtml += `<p class="about-p">${about[key]}</p>`;
                }
            }
            aboutElement.innerHTML = aboutHtml;
            aboutContainer.appendChild(aboutElement);
        });

        aboutContent.appendChild(aboutContainer);

    } catch (error) {
        console.error('Error loading about:', error);
        const aboutContent = document.getElementById('about-content');
        if (aboutContent) {
            aboutContent.innerHTML = '<p>Error loading about. Please try again later.</p>';
        }
    }
}