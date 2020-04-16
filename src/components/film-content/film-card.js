import {createElement} from "../../util";
import FilmDetailsComponent from "../film-detail/film-details";

// Генерация карточки фильма
export default class FilmCardComponent {
  constructor(film) {
    this._film = film;
    this._element = null;
    const {poster, wrap, rating, info, description, controls, comments} = this._film;
    const {title} = wrap;
    const {date, duration, genre} = info;
    const {isWatchlist, isWatched, isFavorite} = controls;

    this._comments = comments;
    this._title = title;
    this._date = date;
    this._rating = rating;
    this._poster = poster;
    this._duration = duration;
    this._genre = genre;
    this._description = description;
    this._isWatchlist = isWatchlist;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;

    // Открытие FilmDetails по клику
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => this.onFilmDetailClick());
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => this.onFilmDetailClick());
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => this.onFilmDetailClick());
  }


  onFilmDetailClick() {
    const filmDetailsComponent = new FilmDetailsComponent(this._film);
    document.body.appendChild(filmDetailsComponent.getElement());
  }

  getTemplate() {
    this._releaseDate = this._date.getFullYear();
    this._filmCardGenre = this._genre[0];
    this._commentsCount = this._comments.length;
    this._isButtonActive = (isActive) => isActive ? `film-card__controls-item--active` : ``;
    return (
      `<article class="film-card" data-id="${this._title}"> 
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._releaseDate}</span>
        <span class="film-card__duration">${this._duration}</span>
        <span class="film-card__genre">${this._filmCardGenre}</span>
      </p>
      <img src="./images/posters/${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <a class="film-card__comments">${this._commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isButtonActive(this._isWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isButtonActive(this._isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isButtonActive(this._isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
    );
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
