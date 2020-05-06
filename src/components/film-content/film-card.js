import AbstractComponent from "../abstract-component";
import {createElement} from "../../utils/render";
import {formatTime} from "../../utils/date";

const MAX_DESCRIPTION_LENGTH = 139;

// Генерация карточки фильма
export default class FilmCardComponent extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
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

  }

  _isButtonActive(isActive) {
    return isActive ? `film-card__controls-item--active` : ``;
  }

  getTemplate() {
    const releaseDate = this._date.getFullYear();
    const formatedDuaration = formatTime(this._duration);
    const filmCardGenre = this._genre.length > 0 ? this._genre[0] : ``;
    const commentsCount = this._comments.length;

    if (this._description.length > MAX_DESCRIPTION_LENGTH) {
      this._description = `${this._description.slice(0, MAX_DESCRIPTION_LENGTH)}...`;
    }

    return (
      `<article class="film-card" data-id="${this._title}"> 
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate}</span>
        <span class="film-card__duration">${formatedDuaration}</span>
        <span class="film-card__genre">${filmCardGenre}</span>
      </p>
      <img src="${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
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

  setOpenPopapHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
    .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
    .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, handler);
  }

}
