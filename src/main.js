import API from "./api";
import FiltersController from "./controllers/filters";
import FilmContentComponent from "./components/film-content/film-content";
import FilmCountComponent from "./components/statistic";
import FilmsModel from "./models/films";
import LoadingComponent from "./components/loading";
import PageController from "./controllers/page-content";
import ProfileComponent from './components/header/profile';
import StatisticsComponent from "./components/header/statistics";
import {render, RenderPosition, remove} from "./utils/render";

const AUTHORIZATION = `Basic kTy9gIdsz2317rD`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION); // Массив объектов карточек кол-ом CARD_FILM_COUNT
const filmsModel = new FilmsModel();

const headerPageElement = document.querySelector(`header`);
const mainPageElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const filtersController = new FiltersController(mainPageElement, filmsModel);
const loadingComponent = new LoadingComponent();
const filmsContentComponent = new FilmContentComponent();
const filmContentController = new PageController(filmsContentComponent, filmsModel, api); // передаем контейнер, внутри которого все это происходит


render(headerPageElement, new ProfileComponent(filmsModel.getAllFilms()), RenderPosition.BEFOREEND);
filtersController.render();
render(mainPageElement, loadingComponent, RenderPosition.BEFOREEND);
// Рендерим блок FilmContent на страницу
render(mainPageElement, filmsContentComponent, RenderPosition.BEFOREEND);


// Переключение полей статистика и фильмы
let statisticComponent = null;
mainPageElement.addEventListener(`click`, (evt) => {
  const button = evt.target.closest(`.main-navigation__additional, .main-navigation__item`);

  if (!button) {
    return;
  }

  if (button.classList.contains(`main-navigation__additional`)) {
    filmContentController.hide();
    if (statisticComponent) {
      remove(statisticComponent);
    }
    statisticComponent = new StatisticsComponent(filmsModel);
    render(mainPageElement, statisticComponent, RenderPosition.BEFOREEND);
  } else if (button.classList.contains(`main-navigation__item`)) {
    if (statisticComponent) {
      remove(statisticComponent);
    }
    filmContentController.show();
  }
});


api.getFilms()
  .then((films) => {
    remove(loadingComponent);
    filmsModel.setFilms(films);
    filmContentController.render();
    // Рендерим количество фильмов в футер
    render(footerStatisticsElement, new FilmCountComponent(films), RenderPosition.BEFOREEND);
  });

