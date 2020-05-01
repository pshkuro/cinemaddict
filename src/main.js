import ProfileComponent from './components/header/profile';
import FiltersController from "./controllers/filters";
import FilmContentComponent from "./components/film-content/film-content";
import FilmCountComponent from "./components/statistic";
import {generateCards} from "./mock/film-card";
import {render, RenderPosition} from "./utils/render";
import PageController from "./controllers/page-content";
import FilmsModel from "./models/films";

const CARD_FILM_COUNT = 12;

const films = generateCards(CARD_FILM_COUNT); // Массив объектов карточек кол-ом CARD_FILM_COUNT
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);


const headerPageElement = document.querySelector(`header`);
render(headerPageElement, new ProfileComponent(filmsModel.getAllFilms()), RenderPosition.BEFOREEND);

export const mainPageElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);


const filtersController = new FiltersController(mainPageElement, filmsModel);
filtersController.render();

// Рендерим блок FilmContent на страницу
const filmsContentComponent = new FilmContentComponent();
render(mainPageElement, filmsContentComponent, RenderPosition.BEFOREEND);

// Отрисовка логики внутри этого блока
const filmContentController = new PageController(filmsContentComponent, filmsModel); // передаем контейнер, внутри которого все это происходит
filmContentController.render();


// Рендерим количество фильмов в футер
render(footerStatisticsElement, new FilmCountComponent(films), RenderPosition.BEFOREEND);

