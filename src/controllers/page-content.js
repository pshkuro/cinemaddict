import SortComponent, {SortType} from "../components/header/sort";
import FilmsListComponent from "../components/film-content/films-list";
import NoFilmsComponent from "../components/film-content/no-films";
import ShowMoreButtonComponent from "../components/film-content/show-more-button";
import FilmTopRatedComponent from "../components/film-content/film-extra-rated";
import FilmMostCommentedComponent from "../components/film-content/film-extra-commented";
import {render, RenderPosition, remove} from "../utils/render";
import FilmController from "./movie";


const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const SHOWING_CARDS_COUNT_ON_START = 5;
const FILM_EXTRA_COUNT = 2;

const renderFilms = (container, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const filmController = new FilmController(container, onDataChange, onViewChange);
    filmController.render(film);

    return filmController;
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
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
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
    const newFilms = renderFilms(this._filmListContainer, this._films.slice(0, this._showingCardsCount),
        this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

    this._renderShowMoreButton();

    // Сортировка
    this._sortFilms();

    // Рендерим Rated и Commented в FilmContent
    const filmsRatedSorted = this._films.slice().sort((a, b) => b.rating - a.rating);
    const filmsTopRated = new FilmTopRatedComponent(this._films);
    this._renderFilmsExtra(filmsTopRated, filmsRatedSorted);

    const filmsCommentedSorted = this._films.slice().sort((a, b) => b.comments.length - a.comments.length);
    const filmsTopCommented = new FilmMostCommentedComponent(this._films);
    this._renderFilmsExtra(filmsTopCommented, filmsCommentedSorted);
  }

  _renderFilmsExtra(component, filmsRatedSorted) {
    render(this._container, component, RenderPosition.BEFOREEND);
    const topRatedFilmsContainer = component.getElement().querySelector(`.films-list__container`);

    const newFilms = renderFilms(topRatedFilmsContainer, filmsRatedSorted.slice(0, FILM_EXTRA_COUNT),
        this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
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
      const newFilms = renderFilms(this._filmListContainer, sortedFilms,
          this._onDataChange, this._onViewChange);
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

      const newFilms = renderFilms(this._filmListContainer, sortedFilms, this._onDataChange, this._onViewChange);
      this._showedFilmsControllers = newFilms;

      const showMoreButton = this._container.querySelector(`.films-list__show-more`);
      if (!showMoreButton) {
        this._renderShowMoreButton(this._films);
      }

    });
  }

  _onDataChange(filmController, oldFilm, newFilm) {
    const index = this._films.findIndex((film) => film === oldFilm);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));
    filmController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmsControllers.map((film) => film.setDefaultView());
  }
}
