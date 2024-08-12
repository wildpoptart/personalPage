document.addEventListener('DOMContentLoaded', function () {
  fetch('../files/movies.json')
    .then(response => response.json())
    .then(movies => {
      const container = document.querySelector('.cards-container');
      movies.forEach(movie => {
        const card = createFlipCard(movie);
        container.appendChild(card);
      });
    })
    .catch(error => console.error('Error loading movies:', error));
});

function createFlipCard(movie) {
  const flipCard = document.createElement('div');
  flipCard.classList.add('flip-card');

  const flipCardInner = document.createElement('div');
  flipCardInner.classList.add('flip-card-inner');

  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');
  const poster = document.createElement('img');
  poster.src = movie.poster;
  poster.alt = 'Movie Poster';
  poster.classList.add('movie-poster');
  const rating = document.createElement('div');
  rating.classList.add('star-rating');
  rating.textContent = movie.rating;
  const title = document.createElement('div');
  title.classList.add('title');
  title.textContent = movie.title;
  // cardFront.appendChild(poster);
  cardFront.appendChild(title);
  cardFront.appendChild(rating);

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  const review = document.createElement('p');
  review.textContent = movie.review;
  cardBack.appendChild(review);

  flipCardInner.appendChild(cardFront);
  flipCardInner.appendChild(cardBack);
  flipCard.appendChild(flipCardInner);

  flipCard.addEventListener('click', () => {
    flipCard.classList.toggle('flip');
  });

  return flipCard;
}
