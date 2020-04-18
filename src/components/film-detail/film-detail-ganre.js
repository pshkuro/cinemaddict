import {createElement} from "../../util";


export default class FilmsGenresComponent {
  constructor(genre) {
    this._element = null;

    this._genre = genre;
  }

  getTemplate() {
    return (`<span class="film-details__genre">${this._genre}</span>`);
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

