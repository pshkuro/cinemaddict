import {formatDate} from "../../utils/date";
import {createElement} from "../../utils/render";
import FilmsCommentsComponent from "./film-detail-comments";
import FilmsGenresComponent from "./film-detail-ganre";
import AbstractSmartComponent from "../abstract-smart-component";

// Генерация блока FilmsDetails
export default class FilmDetailsComponent extends AbstractSmartComponent {
  constructor(film) {
    super();
    const {poster, wrap, rating, info, description, controls, comments} = film;
    const {title, original} = wrap;
    const {director, writers, actors, date, duration, country, genre} = info;
    const {isWatchlist, isWatched, isFavorite} = controls;

    this._poster = poster;
    this._original = original;
    this._title = title;
    this._rating = rating;

    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._date = date;
    this._duration = duration;
    this._country = country;
    this._genre = genre;
    this._description = description;
    this._isWatchlist = isWatchlist;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
    this._comments = comments;
    this._commentEmoji = null;

    this._watchlistHandler = null;
    this._watchedHandler = null;
    this._favoriteHandler = null;
    this._handler = null;
    this._element = this.getElement();
    this._setCommentsEmoji();
  }

  _isButtonActive(isActive) {
    return isActive ? `checked` : ``;
  }


  getTemplate() {
    const formatedDate = formatDate(this._date);
    const filmGenreMarkup = this._genre.map((genreItem) => new FilmsGenresComponent(genreItem).getTemplate()).join(`\n`);
    const filmCommentsMarkup = this._comments.map((comment) =>
      new FilmsCommentsComponent(comment.emoji, comment.text, comment.author, comment.date).getTemplate()).join(`\n`);
    const commentEmojiMarkup = this._commentEmoji
      ? `<img src="./images/emoji/${this._commentEmoji}.png" width=55" height="55" alt="emoji">`
      : ``;

    return (
      `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${this._poster}" alt="">
    
              <p class="film-details__age">18+</p>
            </div>
    
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${this._title}</h3>
                  <p class="film-details__title-original">Original: ${this._original}</p>
                </div>
    
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${this._rating}</p>
                </div>
              </div>
    
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${this._director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${this._writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${this._actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatedDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${this._duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${this._country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${filmGenreMarkup}
                </tr>
              </table>
    
              <p class="film-details__film-description">
                ${this._description}
              </p>
            </div>
          </div>
    
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" ${this._isButtonActive(this._isWatchlist)} id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ">Add to watchlist</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" ${this._isButtonActive(this._isWatched)} id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" ${this._isButtonActive(this._isFavorite)} id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
    
        <div class="form-details__bottom-container">
  
        <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>
  
        <ul class="film-details__comments-list">
          ${filmCommentsMarkup}
        </ul>
  
        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">
            ${commentEmojiMarkup}
          </div>
  
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
  
          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>
  
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>
  
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>
  
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
        </div>
      </form>
    </section>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setWatchlistButtonClickHandler(this._watchlistHandler);
    this.setWatchedButtonClickHandler(this._watchedHandler);
    this.setFavoriteButtonClickHandler(this._favoriteHandler);
    this._setCommentsEmoji();
    this.setEscCloseButtonHanler(this._handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this._element.querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, handler);

    this._watchlistHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this._element.querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, handler);

    this._watchedHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this._element.querySelector(`.film-details__control-label--favorite`)
    .addEventListener(`click`, handler);

    this._favoriteHandler = handler;
  }

  setEscCloseButtonHanler(handler) {
    this._element.querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, handler);

    this._handler = handler;
  }

  _setCommentsEmoji() {
    const emojiList = this._element.querySelector(`.film-details__emoji-list`);

    emojiList.addEventListener(`click`, (evt) => {
      const emojiLabelElement = evt.target.closest(`.film-details__emoji-label`);

      if (emojiLabelElement) {
        const emojiControlElement = emojiLabelElement.control;
        const emoji = emojiControlElement.value;

        this._commentEmoji = emoji;

        this.rerender();
      }
    });
  }


}
