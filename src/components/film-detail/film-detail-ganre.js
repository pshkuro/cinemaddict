import AbstractComponent from "../abstract-component";


export default class FilmsGenresComponent extends AbstractComponent {
  constructor(genre) {
    super();

    this._genre = genre;
  }

  getTemplate() {
    return (`<span class="film-details__genre">${this._genre}</span>`);
  }
}

