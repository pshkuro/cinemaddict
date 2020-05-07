import AbstractComponent from "./abstract-component";

// Генерация статистики фильмов
export default class FilmCountComponent extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return (
      `<p>${this._films.length} movies inside</p>`
    );
  }
}
