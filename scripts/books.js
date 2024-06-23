document.addEventListener('DOMContentLoaded', function () {
    fetch('../files/books.json')
        .then(response => response.json())
        .then(books => {
            const container = document.querySelector('.cards-container');
            books.forEach(book => {
                const card = createFlipCard(book);
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading books:', error));
});

function createFlipCard(book) {
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const flipCardInner = document.createElement('div');
    flipCardInner.classList.add('flip-card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    const cover = document.createElement('img');
    cover.src = book.cover;
    cover.alt = 'Book Cover';
    cover.classList.add('book-cover');
    const title = document.createElement('div');
    title.classList.add('book-title');
    title.textContent = book.title;
    const author = document.createElement('div');
    author.classList.add('book-author');
    author.textContent = book.author;
    const rating = document.createElement('div');
    rating.classList.add('star-rating');
    rating.textContent = book.rating;
    const finishedDate = document.createElement('div');
    finishedDate.classList.add('finished-date');
    finishedDate.textContent = `Finished on: ${book.finishedDate}`;
    cardFront.appendChild(cover);
    cardFront.appendChild(title);
    cardFront.appendChild(author);
    cardFront.appendChild(rating);
    cardFront.appendChild(finishedDate);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    const review = document.createElement('p');
    review.textContent = book.review;
    cardBack.appendChild(review);

    flipCardInner.appendChild(cardFront);
    flipCardInner.appendChild(cardBack);
    flipCard.appendChild(flipCardInner);

    flipCard.addEventListener('click', () => {
        flipCard.classList.toggle('flip');
    });

    return flipCard;
}
