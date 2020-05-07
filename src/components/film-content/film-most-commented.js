import {createElement} from "../../utils/render";
import {conditionalTemplate} from "../../utils/common";
import AbstractComponent from "../abstract-component";

export default class FilmMostCommentedComponent extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;

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
    }

    return this._element;
  }
}

