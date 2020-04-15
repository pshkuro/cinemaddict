import {createElement} from "../util";

// Генерация статистики фильмов
export default class FilmCountComponent {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return (
      `<p>${this._films.length} movies inside</p>`
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
