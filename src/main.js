import ProfileComponent from './components/header/profile';
import FiltersComponent from "./components/header/menu";
import FilmContentComponent from "./components/film-content/film-content";
import FilmCountComponent from "./components/statistic";
import {generateCards} from "./mock/film-card";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./utils/render";
import PageController from "./controllers/page-content";
import SortComponent from "./components/header/sort";


const CARD_FILM_COUNT = 12;

const headerPageElement = document.querySelector(`header`);
export const mainPageElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const films = generateCards(CARD_FILM_COUNT); // Массив объектов карточек кол-ом CARD_FILM_COUNT
const filters = generateFilters(films);

render(headerPageElement, new ProfileComponent(), RenderPosition.BEFOREEND);
render(mainPageElement, new FiltersComponent(filters), RenderPosition.BEFOREEND);
render(mainPageElement, new SortComponent(), RenderPosition.BEFOREEND);

// Рендерим блок FilmContent на страницу
const filmsContentComponent = new FilmContentComponent();
render(mainPageElement, filmsContentComponent, RenderPosition.BEFOREEND);
// Отрисовка логики внутри этого блока
const filmContentController = new PageController(filmsContentComponent); // передаем контейнер, внутри которого все это происходит
filmContentController.render(films); // Передаем данные для отрисовки логики


// Рендерим количество фильмов в футер
render(footerStatisticsElement, new FilmCountComponent(films), RenderPosition.BEFOREEND);

