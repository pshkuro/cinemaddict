import {createProfileTemplate} from "./components/profile";
import {createFilterTemplate} from "./components/menu";
import {createSortTemplate} from "./components/sort";
import {createFilmContentTemplate} from "./components/film-content";
import {createFilmCountTemplate} from "./components/statistic";
import {createFilmDetailsTemplate} from "./components/film-details";
import {generateCards} from "./mock/film-card";
import {generateFilters} from "./mock/filter";

const CARD_FILM_COUNT = 12;

const headerPageElement = document.querySelector(`header`);
const mainPageElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);


// Фукнция рендеринга
export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const cards = generateCards(CARD_FILM_COUNT); // Массив объектов карточек кол-ом CARD_FILM_COUNT
const filters = generateFilters(cards);

render(headerPageElement, createProfileTemplate(), `beforeend`);
render(mainPageElement, createFilterTemplate(filters), `beforeend`);
render(mainPageElement, createSortTemplate(), `beforeend`);
render(mainPageElement, createFilmContentTemplate(cards), `beforeend`);
createFilmContentTemplate.onTemplateRendered();
render(footerStatisticsElement, createFilmCountTemplate(cards), `beforeend`);


// Рендерим Попап при нажатии на карточку фильма
document.addEventListener(`click`, function showFilmDetailsHandler(evt) {
  const filmCardElement = evt.target.closest(`.film-card`); // Клик произошел по .film-card - true/false
  if (filmCardElement) {
    const filmCardId = filmCardElement.dataset.id; // Получает DataSet атрибут карточки, см в /component/film-card
    const filmCardData = cards.find((card) => card.wrap.title === filmCardId); // Если название фильма на попапе = DataSet атрибут карточки
    render(document.body, createFilmDetailsTemplate(filmCardData), `beforeend`);

    const filmDetailsElement = document.querySelector(`.film-details`);
    const filmDetailsCloseButtonElement = filmDetailsElement.querySelector(`.film-details__close-btn`);
    filmDetailsCloseButtonElement.addEventListener(`click`, () => {
      filmDetailsElement.remove();
    });
  }
});
