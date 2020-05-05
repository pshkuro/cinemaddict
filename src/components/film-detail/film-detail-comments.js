import {formatCommentsDate} from "../../utils/date";
import AbstractComponent from "../abstract-component";
import {encode} from "he";

// Генерация 1 комментария
export default class FilmsCommentsComponent extends AbstractComponent {
  constructor(emoji, text, author, date, id) {
    super();

    this._emoji = emoji;
    this._text = text;
    this._author = author;
    this._date = date;
    this._id = id;
  }

  getTemplate() {
    if (!this._text) return '';
    
    const text = encode(this._text);
    return (`<li class="film-details__comment" id="${this._id}">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${this._emoji}.png" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${this._author}</span>
      <span class="film-details__comment-day">${formatCommentsDate(this._date)}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`);
  }
}

