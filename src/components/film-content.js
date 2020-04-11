import {createFilmCardTemplate} from "./film-card";
import {createShowMoreButtonTemplate} from "./show-more-button";
import {createElementsTemplate, conditionalTemplate} from "../util";
import {render} from "../main";

const FILM_EXTRA_COUNT = 2;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const SHOWING_CARDS_COUNT_ON_START = 5;
let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

// Генерация Film Content
export const createFilmContentTemplate = (data) => {


  const ratedFilmsData = data.slice().sort((a, b) => b.rating - a.rating);
  const commentedFilmsData = data.slice().sort((a, b) => b.comments.length - a.comments.length);

  const hasCommentedFilms = data.some((card) => card.comments.length !== 0);
  const isCommentedFilmsShow = (commentedFilmsBlockMarkup) =>
    conditionalTemplate(hasCommentedFilms, commentedFilmsBlockMarkup); // Проверяет, есть ли фильмы с комментами

  const hasRatedFilms = data.some((card) => card.rating !== 0);
  const isRatedFilmsShow = (ratedFilmsBlockMarkup) =>
    conditionalTemplate(hasRatedFilms, ratedFilmsBlockMarkup); // Проверяет, есть ли фильмы с рейтингом


  // Рендерит карточки по нажатию на кнопку Show More
  createFilmContentTemplate.onTemplateRendered = () => {
    const showMoreButton = document.querySelector(`.films-list__show-more`);
    let filmCardsContainer = document.querySelector(`.films-list__container`);

    showMoreButton.addEventListener(`click`, () => {

      const prevCardsCount = showingCardsCount;
      showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      const showMoreData = data.slice(prevCardsCount, showingCardsCount);
      const showMoreCards = createElementsTemplate(showMoreData, SHOWING_CARDS_COUNT_BY_BUTTON, createFilmCardTemplate);

      render(filmCardsContainer, showMoreCards, `beforeend`);

      if (showingCardsCount >= data.length) {
        showMoreButton.remove();
      }
    });
  };

  return (
    `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">
      ${createElementsTemplate(data, showingCardsCount, createFilmCardTemplate)}
    </div>

    ${createShowMoreButtonTemplate()}
  </section>

  ${isRatedFilmsShow(`<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container">
    ${createElementsTemplate(ratedFilmsData, FILM_EXTRA_COUNT, createFilmCardTemplate)}
    </div>
  </section>`)}

  ${isCommentedFilmsShow(`<section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>

    <div class="films-list__container">
    ${createElementsTemplate(commentedFilmsData, FILM_EXTRA_COUNT, createFilmCardTemplate)}
    </div>
  </section>
  </section>`)}
  `
  );
};
