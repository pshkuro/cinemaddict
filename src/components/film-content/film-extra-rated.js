import {conditionalTemplate, createElement, tFor} from "../../util";
import {FILM_EXTRA_COUNT} from "../../const";
import FilmCardComponent from "./film-card";

export default class FilmTopRatedComponent {
  constructor(films) {
    this._films = films;
    this._element = null;
    this.init();
  }

  init() {
    this._ratedFilmsData = this._films
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, FILM_EXTRA_COUNT);

    const hasRatedFilms = this._films.some((card) => card.rating !== 0);
    this._isRatedFilmsShow = (ratedFilmsBlockMarkup) =>
      conditionalTemplate(hasRatedFilms, ratedFilmsBlockMarkup); // Проверяет, есть ли фильмы с рейтингом

  }

  getTemplate() {
    return (`${this._isRatedFilmsShow(`
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
        ${tFor(this._ratedFilmsData, FilmCardComponent)}
    </div>
    </section>`)}`);
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
