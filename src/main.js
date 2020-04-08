import {createProfileTemplate} from "./components/profile";
import {createFilterTemplate} from "./components/menu";
import {createSortTemplate} from "./components/sort";
import {createFilmContentTemplate} from "./components/film-content";
import {createFilmStatisticsTemplate} from "./components/statistic";
import {createFilmDetailsTemplate} from "./components/film-details";
import {generateCards} from "./mock/film-card";
import {generateFilters} from "./mock/filter";

const CARD_FILM_COUNT = 5;

const headerPageElement = document.querySelector(`header`);
const mainPageElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);


// Фукнция рендеринга
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const cards = generateCards(CARD_FILM_COUNT); // Массив объектов карточек кол-ом CARD_FILM_COUNT
const filters = generateFilters();

render(headerPageElement, createProfileTemplate(), `beforeend`);
render(mainPageElement, createFilterTemplate(filters), `beforeend`);
render(mainPageElement, createSortTemplate(), `beforeend`);
render(mainPageElement, createFilmContentTemplate(cards), `beforeend`);
render(footerStatisticsElement, createFilmStatisticsTemplate(), `beforeend`);


// Рендерим Попап при нажатии на карточку фильма
document.addEventListener(`click`, function showFilmDetailsHandler(evt) {
  if (evt.target.closest(`.film-card`)) {
    render(document.body, createFilmDetailsTemplate(cards), `beforeend`);

    const filmDetailsElement = document.querySelector(`.film-details`);
    const filmDetailsCloseButtonElement = filmDetailsElement.querySelector(`.film-details__close-btn`);
    filmDetailsCloseButtonElement.addEventListener(`click`, () => {
      filmDetailsElement.remove();
    });
  }
});

