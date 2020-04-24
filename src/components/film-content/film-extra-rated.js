import {createElement} from "../../utils/render";
import {conditionalTemplate} from "../../utils/common";
import AbstractComponent from "../abstract-component";

export default class FilmTopRatedComponent extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  _isRatedFilmsShow(ratedFilmsBlockMarkup) {
    const hasRatedFilms = this._films.some((card) => card.rating);
    return conditionalTemplate(hasRatedFilms, ratedFilmsBlockMarkup); // Проверяет, есть ли фильмы с рейтингом
  }


  getTemplate() {
    return (`${this._isRatedFilmsShow(`
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
      </div>
    </section>`)}`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
