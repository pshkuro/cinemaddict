import {createElement} from "../util";

// Генерация Film Content
const createFilmContentTemplate = () => {

  return (
    `<section class="films"></section>`
  );
};

export default class FilmContentComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmContentTemplate();
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
