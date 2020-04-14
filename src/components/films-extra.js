import {createElement} from "../util";
import {createElementsTemplate, conditionalTemplate} from "../util";
import {createFilmCardTemplate} from "./film-card";

const FILM_EXTRA_COUNT = 2;

const createFilmsExtraTemplate = (data) => {

  const ratedFilmsData = data.slice().sort((a, b) => b.rating - a.rating);
  const commentedFilmsData = data.slice().sort((a, b) => b.comments.length - a.comments.length);

  const hasCommentedFilms = data.some((card) => card.comments.length !== 0);
  const isCommentedFilmsShow = (commentedFilmsBlockMarkup) =>
    conditionalTemplate(hasCommentedFilms, commentedFilmsBlockMarkup); // Проверяет, есть ли фильмы с комментами

  const hasRatedFilms = data.some((card) => card.rating !== 0);
  const isRatedFilmsShow = (ratedFilmsBlockMarkup) =>
    conditionalTemplate(hasRatedFilms, ratedFilmsBlockMarkup); // Проверяет, есть ли фильмы с рейтингом


  return (`${isRatedFilmsShow(`
  <section class="films-list--extra">
  <h2 class="films-list__title">Top rated</h2>

  <div class="films-list__container">
  ${createElementsTemplate(ratedFilmsData, FILM_EXTRA_COUNT, createFilmCardTemplate)}
  </div>
  </section>`)}

${isCommentedFilmsShow(`
  <section class="films-list--extra">
  <h2 class="films-list__title">Most commented</h2>

  <div class="films-list__container">
  ${createElementsTemplate(commentedFilmsData, FILM_EXTRA_COUNT, createFilmCardTemplate)}
  </div>
</section>`)}
`);
};

export default class FilmsExtraComponent {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmsExtraTemplate(this._films);
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
