import {conditionalTemplate, createElement, createElements, render, RenderPosition} from "../../util";
import {FILM_EXTRA_COUNT} from "../../const";
import FilmCardComponent from "./film-card";

export default class FilmMostCommentedComponent {
  constructor(films) {
    this._element = null;

    this._films = films.slice()
    .sort((a, b) => b.comments.length - a.comments.length); // Отсортированный массив
    this._commentedFilmsData = this._films
    .slice(0, FILM_EXTRA_COUNT);

  }

  _isCommentedFilmsShow(commentedFilmsBlockMarkup) {
    const hasCommentedFilms = this._films.some((card) => card.comments.length);
    return conditionalTemplate(hasCommentedFilms, commentedFilmsBlockMarkup);
  }

  getTemplate() {
    return (`${this._isCommentedFilmsShow(`
    <section class="films-list--extra">
      <h2 class="films-list__title">Top commented</h2>
      <div class="films-list__container">
    </div>
    </section>`)}`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      const filmCards = createElements(this._commentedFilmsData, FilmCardComponent); // Создаем Dom-элементы карточек
      render(this._element.querySelector(`.films-list__container`), filmCards, RenderPosition.BEFOREEND);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

