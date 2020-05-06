import AbstractSmartComponent from "../abstract-smart-component";
import Observable from "../../observable";
import FilmsCommentsComponent from "./film-detail-comments";
import FilmsGenresComponent from "./film-detail-ganre";
import {createElement} from "../../utils/render";
import {formatDate, formatTime} from "../../utils/date";
import {shake} from "../../utils/interactivity";

// Генерация блока FilmsDetails
export default class FilmDetailsComponent extends AbstractSmartComponent {
  constructor(film, api) {
    super();
    const {id, poster, wrap, rating, info, description, controls, comments} = film;
    const {title, original} = wrap;
    const {director, ageRating, writers, actors, date, duration, country, genre} = info;
    const {isWatchlist, isWatched, isFavorite} = controls;

    this._id = id;
    this._poster = poster;
    this._original = original;
    this._title = title;
    this._rating = rating;

    this._director = director;
    this._ageRating = ageRating;
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
    this._api = api;
    this._commentText = ``;
    this._getComments();

    this._handler = null;
    this._element = this.getElement();
    this._setCommentsEmoji();
    this._commentsLoadingError = false;
    this._commentInputField = null;
    this._activeDeleteCommentButtons = null;
    this._filmDetailsComment = null;

    this.commentsChanges = new Observable();
    this.watchListChanges = new Observable();
    this.watchedChanges = new Observable();
    this.favoritesChanges = new Observable();
  }

  // Получение комментариев с сервера
  _getComments() {
    this._api
      .getComments(this._id)
      .then((comments) => {
        this._comments = comments;
        this.rerender();
      })
      .catch(() => {
        this._commentsLoadingError = true;
        this.rerender();
      });
  }

  _isButtonActive(isActive) {
    return isActive ? `checked` : ``;
  }


  getTemplate() {
    const formatedDate = formatDate(this._date);
    const isGenresOrGenre = this._genre.length > 1 ? `Genres` : `Genre`;
    const filmGenreMarkup = this._genre.map((genreItem) => new FilmsGenresComponent(genreItem).getTemplate()).join(`\n`);
    const filmCommentsMarkup = this._comments.map((comment) =>
      new FilmsCommentsComponent(comment.emoji, comment.text, comment.author, comment.date, comment.id).getTemplate()).join(`\n`);
    const commentEmojiMarkup = this._commentEmoji
      ? `<img src="./images/emoji/${this._commentEmoji}.png" width=55" height="55" alt="emoji">`
      : ``;
    const formatedDuration = formatTime(this._duration);
    const commentsLoadingErrorMarkup = `<h2 class="films-list__title">Sorry, comments are not available.
     Please, try again.</h2>`;

    return (
      `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${this._poster}" alt="">
    
              <p class="film-details__age">${this._ageRating}+</p>
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
                  <td class="film-details__cell">${formatedDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${this._country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${isGenresOrGenre}</td>
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
          ${this._commentsLoadingError ? commentsLoadingErrorMarkup : filmCommentsMarkup}
        </ul>
  
        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">
            ${commentEmojiMarkup}
          </div>
  
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${this._commentText}</textarea>
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
    this.setWatchlistButtonClickHandler();
    this.setWatchedButtonClickHandler();
    this.setFavoriteButtonClickHandler();
    this._setCommentsEmoji();
    this.setEscCloseButtonHanler(this._handler);
    this.setDeleteButtonClickHandler();
    this.setSendCommentHandler();
  }

  // Удаление комментария
  setDeleteButtonClickHandler() {
    const deleteCommentButtons = this._element.querySelectorAll(`.film-details__comment-delete`);
    if (deleteCommentButtons) {
      Array.from(deleteCommentButtons).forEach((button) => button.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        this._activeDeleteCommentButtons = evt.target;
        this._addDeleteButtonActiveState();

        this._filmDetailsComment = this._activeDeleteCommentButtons.closest(`.film-details__comment`);
        const removeCommentId = this._filmDetailsComment.id;
        this._deleteComment(removeCommentId);
      }));
    }
  }

  // Отправка нового комментария
  setSendCommentHandler() {
    this._commentInputField = this._element.querySelector(`.film-details__comment-input`);
    this._commentInputField.addEventListener(`keydown`, (evt) => {
      this._commentText = this._commentInputField.value;
      const isCtrlAndEnter = evt.code === `Enter` && (evt.ctrlKey || evt.metaKey);
      if (isCtrlAndEnter) {
        this._commentInputField.setAttribute(`disabled`, `disabled`);
        const comment = this._gatherComment();
        if (!comment) {
          return;
        } else {
          this._sendComment(comment);
        }
      }
    });
  }

  // Добавление фильма в списки
  setWatchlistButtonClickHandler() {
    this._element.querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._toggleWatchList();
    });
  }

  setWatchedButtonClickHandler() {
    this._element.querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._toggleWatched();
    });
  }

  setFavoriteButtonClickHandler() {
    this._element.querySelector(`.film-details__control-label--favorite`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._toggleFavorites();
    });
  }

  // Закрытие попапа
  setEscCloseButtonHanler(handler) {
    this._element.querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, handler);

    this._handler = handler;
  }


  // Отчистка формы добавления нового комментария
  resetAddCommentForm() {
    const textComment = this._element.querySelector(`.film-details__comment-input`);
    textComment.value = ``;
    const emojiElement = this._element.querySelector(`.film-details__add-emoji-label`).firstElementChild;

    if (emojiElement) {
      emojiElement.remove();
    }

    this._commentEmoji = null;
  }


  // Сборка данных нового комментария
  _gatherComment() {
    const textComment = this._element.querySelector(`.film-details__comment-input`);

    const text = textComment.value;
    const emoji = this._commentEmoji;

    if (!emoji || !text) {
      return null;
    }

    const date = new Date();

    return {
      text,
      emoji,
      date,
    };
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

  _toggleWatchList() {
    this._isWatchlist = !this._isWatchlist;
    this.watchListChanges.notify(this._isWatchlist);
    this.rerender();
  }

  _toggleWatched() {
    this._isWatched = !this._isWatched;
    this.watchedChanges.notify(this._isWatched);
    this.rerender();
  }

  _toggleFavorites() {
    this._isFavorite = !this._isFavorite;
    this.favoritesChanges.notify(this._isFavorite);
    this.rerender();
  }

  _sendComment(comment) {
    const newCommentContainer = this._element.querySelector(`.film-details__new-comment`);

    this._api.sendComment(this._id, comment)
    .then((comments) => {
      this._comments = comments;
      this.commentsChanges.notify(this._comments.map((newComment) => newComment.id));
      this.rerender();
      this.resetAddCommentForm();
    })
    .catch(() => {
      shake(newCommentContainer);
      this._addRedBorderToTextField();
      this._returnsTextFieldToDefaultState();
    });
  }

  _deleteComment(commentId) {
    this._api.deleteComment(commentId)
      .then(() => {
        this._comments = this._comments.filter((comment) => comment.id !== commentId);
        this.commentsChanges.notify(this._comments.map((comment) => comment.id));
        this.rerender();
      })
      .catch(() => {
        shake(this._filmDetailsComment);
        this._returnsDeleteButtonToDefaultState();
      });
  }

  // Работа с отправкой комментариев - добавление обводки/блокировка
  _addRedBorderToTextField() {
    this._commentInputField.style.border = `1px solid red`;
  }

  _returnsTextFieldToDefaultState() {
    this._commentInputField.removeAttribute(`disabled`);
  }

  // Работа с удалением комменатрев - Изменение надписи/ блокировка
  _addDeleteButtonActiveState() {
    this._activeDeleteCommentButtons.setAttribute(`disabled`, `disabled`);
    this._activeDeleteCommentButtons.innerText = `Deleting…`;
  }

  _returnsDeleteButtonToDefaultState() {
    this._activeDeleteCommentButtons.innerText = `Delete`;
    this._activeDeleteCommentButtons.removeAttribute(`disabled`);
  }
}
