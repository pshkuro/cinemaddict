import {formatNumberDate, createElement} from "../../util";

// Генерация 1 комментария
export default class FilmsCommentsComponent {
  constructor(emoji, text, author, date) {
    this._element = null;

    this._emoji = emoji;
    this._text = text;
    this._author = author;
    this._date = date;
  }

  getTemplate() {
    return (`<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="${this._emoji}" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${this._text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${this._author}</span>
      <span class="film-details__comment-day">${formatNumberDate(this._date)}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`);
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
