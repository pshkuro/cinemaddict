import {createElement} from "../../util";

// Генерация Film Content
export default class FilmContentComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="films"></section>`
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
