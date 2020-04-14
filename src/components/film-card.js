import {createElement} from "../util";

// Генерация карточки фильма
const createFilmCardTemplate = (data) => {
  const {poster, wrap, rating, info, description, controls, comments} = data;

  const {title} = wrap;
  const {date, duration, genre} = info;
  const {isWatchlist, isWatched, isFavorite} = controls;

  const releaseDate = date.getFullYear();
  const filmCardGenre = genre[0];
  const commentsCount = comments.length;

  const isButtonActive = (isActive) => isActive ? `film-card__controls-item--active` : ``;

  // Добавляем dataset атрибут карточке по названию фильма, чтобы идентифиц ее и связать с попапом карточки
  return (
    `<article class="film-card" data-id="${title}"> 
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${filmCardGenre}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${commentsCount} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isButtonActive(isWatchlist)}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isButtonActive(isWatched)}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isButtonActive(isFavorite)}">Mark as favorite</button>
    </form>
  </article>`
  );
};

export default class FilmCardComponent {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
