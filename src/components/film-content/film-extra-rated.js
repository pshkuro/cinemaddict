import {conditionalTemplate, createElement, createElements, render, RenderPosition} from "../../util";
import {FILM_EXTRA_COUNT} from "../../const";
import FilmCardComponent from "./film-card";

export default class FilmTopRatedComponent {
  constructor(films) {
    this._element = null;

    this._films = films.slice()
    .sort((a, b) => b.rating - a.rating);
    this._ratedFilmsData = this._films
    .slice(0, FILM_EXTRA_COUNT);

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
      const filmCards = createElements(this._ratedFilmsData, FilmCardComponent);
      render(this._element.querySelector(`.films-list__container`), filmCards, RenderPosition.BEFOREEND);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
