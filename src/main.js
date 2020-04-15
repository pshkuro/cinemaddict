import ProfileComponent from './components/profile';
import FiltersComponent from "./components/menu";
import SortComponent from "./components/sort";
import FilmContentComponent from "./components/film-content";
import FilmsListComponent from "./components/films-list";
import FilmCardComponent from "./components/film-card";
import ShowMoreButtonComponent from "./components/show-more-button";
import FilmTopRatedComponent from "./components/film-extra-rated";
import FilmMostCommentedComponent from "./components/film-extra-commented";
import FilmCountComponent from "./components/statistic";
import {generateCards} from "./mock/film-card";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./util";


const CARD_FILM_COUNT = 12;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const SHOWING_CARDS_COUNT_ON_START = 5;

const headerPageElement = document.querySelector(`header`);
const mainPageElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const cards = generateCards(CARD_FILM_COUNT); // Массив объектов карточек кол-ом CARD_FILM_COUNT
const filters = generateFilters(cards);

render(headerPageElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(mainPageElement, new FiltersComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(mainPageElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);


// Логика 1 карточки фильма
const renderFilmCard = (filmCardsContainer, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  render(filmCardsContainer, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

// Логика блока FilmContent
const renderFilmsContent = (filmsContentComponent, films) => {
  render(mainPageElement, filmsContentComponent.getElement(), RenderPosition.BEFOREEND);

  // Создает filmList
  const filmsListComponent = new FilmsListComponent();
  render(filmsContentComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);

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
  render(filmsListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevCardsCount = showingCardsCount;
    showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

    films.slice(prevCardsCount, showingCardsCount)
    .forEach((film) => {
      renderFilmCard(filmListContainer, film);
    });

    if (showingCardsCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });

  // Рендерим Rated и Commented в FilmContent
  render(filmsContentComponent.getElement(), new FilmTopRatedComponent(films).getElement(), RenderPosition.BEFOREEND);
  render(filmsContentComponent.getElement(), new FilmMostCommentedComponent(films).getElement(), RenderPosition.BEFOREEND);
};

// Рендерим блок FilmContent на страницу
const filmsContentComponent = new FilmContentComponent();
renderFilmsContent(filmsContentComponent, cards);

// Рендерим количество фильмов в футер
render(footerStatisticsElement, new FilmCountComponent(cards).getElement(), RenderPosition.BEFOREEND);

