import ProfileComponent from './components/header/profile';
import FiltersComponent from "./components/header/menu";
import SortComponent from "./components/header/sort";
import FilmContentComponent from "./components/film-content/film-content";
import FilmsListComponent from "./components/film-content/films-list";
import NoFilmsComponent from "./components/film-content/no-films";
import FilmCardComponent from "./components/film-content/film-card";
import ShowMoreButtonComponent from "./components/film-content/show-more-button";
import FilmTopRatedComponent from "./components/film-content/film-extra-rated";
import FilmMostCommentedComponent from "./components/film-content/film-extra-commented";
import FilmCountComponent from "./components/statistic";
import {generateCards} from "./mock/film-card";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition, remove} from "./utils/render";


const CARD_FILM_COUNT = 12;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const SHOWING_CARDS_COUNT_ON_START = 5;

const headerPageElement = document.querySelector(`header`);
const mainPageElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const cards = generateCards(CARD_FILM_COUNT); // Массив объектов карточек кол-ом CARD_FILM_COUNT
const filters = generateFilters(cards);

render(headerPageElement, new ProfileComponent(), RenderPosition.BEFOREEND);
render(mainPageElement, new FiltersComponent(filters), RenderPosition.BEFOREEND);
render(mainPageElement, new SortComponent(), RenderPosition.BEFOREEND);


// Логика 1 карточки фильма
const renderFilmCard = (filmCardsContainer, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  render(filmCardsContainer, filmCardComponent, RenderPosition.BEFOREEND);
};

// Логика блока FilmContent
const renderFilmsContent = (filmsContentComponent, films) => {
  render(mainPageElement, filmsContentComponent, RenderPosition.BEFOREEND);

  // Создает filmList
  const filmsListComponent = new FilmsListComponent();
  render(filmsContentComponent.getElement(), filmsListComponent, RenderPosition.BEFOREEND);

  // Если нет фильмов, выводим сообщение-заглушку
  const noFilms = films.length === 0;
  if (noFilms) {
    render(filmsListComponent.getElement(), new NoFilmsComponent(), RenderPosition.BEFOREEND);
    return; // Сразу выходим, чтобы дальше эл-ты блока не отрисовывались
  }

  // Рендерим карточки фильмов
  const filmListContainer = filmsListComponent.getElement().querySelector(`.films-list__container`);
  let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
  films.slice(0, showingCardsCount)
    .forEach((film) => {
      renderFilmCard(filmListContainer, film);
    });


  // Логика кнопки Show More
  // при нажатии продгружаем фмльмы
  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsListComponent.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);

  showMoreButtonComponent.setClickHandler(() => {
    const prevCardsCount = showingCardsCount;
    showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

    films.slice(prevCardsCount, showingCardsCount)
    .forEach((film) => {
      renderFilmCard(filmListContainer, film);
    });

    if (showingCardsCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });

  // Рендерим Rated и Commented в FilmContent
  render(filmsContentComponent.getElement(), new FilmTopRatedComponent(films), RenderPosition.BEFOREEND);
  render(filmsContentComponent.getElement(), new FilmMostCommentedComponent(films), RenderPosition.BEFOREEND);
};

// Рендерим блок FilmContent на страницу
const filmsContentComponent = new FilmContentComponent();
renderFilmsContent(filmsContentComponent, cards);

// Рендерим количество фильмов в футер
render(footerStatisticsElement, new FilmCountComponent(cards), RenderPosition.BEFOREEND);

