import {createFilmCardTemplate} from "./film-card";
import {createShowMoreButtonTemplate} from "./show-more-button";
import {createElementsTemplate} from "../util";

const FILM_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

// Генерация Film Content
export const createFilmContentTemplate = () => {
  return (
    `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">
      ${createElementsTemplate(FILM_COUNT, createFilmCardTemplate)}
    </div>

    ${createShowMoreButtonTemplate()}
  </section>

  <section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container">
    ${createElementsTemplate(FILM_EXTRA_COUNT, createFilmCardTemplate)}
    </div>
  </section>

  <section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>

    <div class="films-list__container">
    ${createElementsTemplate(FILM_EXTRA_COUNT, createFilmCardTemplate)}
    </div>
  </section>
  </section>`
  );
};
