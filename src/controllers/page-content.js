import SortComponent, {SortType} from "../components/header/sort";
import FilmsListComponent from "../components/film-content/films-list";
import NoFilmsComponent from "../components/film-content/no-films";
import ShowMoreButtonComponent from "../components/film-content/show-more-button";
import FilmTopRatedComponent from "../components/film-content/film-extra-rated";
import FilmMostCommentedComponent from "../components/film-content/film-extra-commented";
import {render, RenderPosition, remove} from "../utils/render";
import MovieController from "./movie";


const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const SHOWING_CARDS_COUNT_ON_START = 5;
const FILM_EXTRA_COUNT = 2;

const renderFilms = (container, films) => {
  return films.map((film) => {
    const movieController = new MovieController(container);
    movieController.render(film);

    return movieController;
  });
};

const getSortedFilms = (films, sortType, from, before) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.info.date - a.info.date);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;

    case SortType.COMMENTED:
      sortedFilms = showingFilms.sort((a, b) => b.comments.length - a.comments.length);
  }

  return sortedFilms.slice(from, before);
};

// Содержит логику рендеринга блока FilmContent на странице
export default class PageController {
  constructor(container) {
    this._container = container.getElement();
    this._films = []; // Все фильмы
    this._showedFilmsControllers = []; // Фильмы, которые сейчас отображены на странице - подписчики

    this._filmsListComponent = new FilmsListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._filmListContainer = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
  }

  render(films) {
    this._films = films;
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);

    // Создает filmList
    render(this._container, this._filmsListComponent, RenderPosition.BEFOREEND);

    // Если нет фильмов, выводим сообщение-заглушку
    const noFilms = this._films.length === 0;
    if (noFilms) {
      render(this._filmsListComponent.getElement(), this._noFilmsComponent, RenderPosition.BEFOREEND);
      return; // Сразу выходим, чтобы дальше эл-ты блока не отрисовывались
    }

    // Рендерим карточки фильмов
    const newFilms = renderFilms(this._filmListContainer, this._films.slice(0, this._showingCardsCount));
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

    this._renderShowMoreButton();

    // Сортировка
    this._sortFilms();

    // Рендерим Rated и Commented в FilmContent
    this._renderRatedFilms();
    this._renderCommentedFilms();
  }

  // Логика кнопки Show More
  // при нажатии продгружаем фмльмы
  _renderShowMoreButton() {
    if (this._showingCardsCount >= this._films.length) {
      return;
    }
    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevCardsCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(this._films, this._sortComponent.getSortType(), prevCardsCount, this._showingCardsCount);
      const newFilms = renderFilms(this._filmListContainer, sortedFilms);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

      if (this._showingCardsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  // Сортировка фильмов
  _sortFilms() {
    this._sortComponent.setSortTypeHandler((sortType) => {
      this._showingCardsCount = SHOWING_CARDS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(this._films, sortType, 0, this._showingCardsCount);
      this._filmListContainer.innerHTML = ``;

      const newFilms = renderFilms(this._filmListContainer, sortedFilms);
      this._showedFilmsControllers = newFilms;

      const showMoreButton = this._container.querySelector(`.films-list__show-more`);
      if (!showMoreButton) {
        this._renderShowMoreButton(this._films);
      }

    });
  }

  _renderRatedFilms() {
    const filmTopRated = new FilmTopRatedComponent(this._films);
    const ratedFilms = getSortedFilms(this._films, `rating`, 0, FILM_EXTRA_COUNT);
    render(this._container, filmTopRated, RenderPosition.BEFOREEND);
    const newFilms = renderFilms(filmTopRated.getElement().querySelector(`.films-list__container`), ratedFilms);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
  }

  _renderCommentedFilms() {
    const filmTopCommented = new FilmMostCommentedComponent(this._films);
    const commentedFilms = getSortedFilms(this._films, `commented`, 0, FILM_EXTRA_COUNT);
    render(this._container, filmTopCommented, RenderPosition.BEFOREEND);
    const newFilms = renderFilms(filmTopCommented.getElement().querySelector(`.films-list__container`), commentedFilms);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
  }
}
