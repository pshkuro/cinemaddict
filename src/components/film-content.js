import {createElement} from "../util";

import {createFilmCardTemplate} from "./film-card";
import {createElementsTemplate} from "../util";
import {render} from "../main";

const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const SHOWING_CARDS_COUNT_ON_START = 5;
let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

// Генерация Film Content
const createFilmContentTemplate = () => {


  // Рендерит карточки по нажатию на кнопку Show More
  // createFilmContentTemplate.onTemplateRendered = () => {
  //   const showMoreButton = document.querySelector(`.films-list__show-more`);
  //   let filmCardsContainer = document.querySelector(`.films-list__container`);

  //   showMoreButton.addEventListener(`click`, () => {

  //     const prevCardsCount = showingCardsCount;
  //     showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  //     const showMoreData = data.slice(prevCardsCount, showingCardsCount);
  //     const showMoreCards = createElementsTemplate(showMoreData, SHOWING_CARDS_COUNT_BY_BUTTON, createFilmCardTemplate);

  //     render(filmCardsContainer, showMoreCards, `beforeend`);

  //     if (showingCardsCount >= data.length) {
  //       showMoreButton.remove();
  //     }
  //   });
  // };

  return (
    `<section class="films"></section>`
  );
};

export default class FilmContentComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmContentTemplate();
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
