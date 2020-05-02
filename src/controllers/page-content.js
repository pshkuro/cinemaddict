import SortComponent, {SortType} from "../components/header/sort";
import FilmsListComponent from "../components/film-content/films-list";
import NoFilmsComponent from "../components/film-content/no-films";
import ShowMoreButtonComponent from "../components/film-content/show-more-button";
import FilmTopRatedComponent from "../components/film-content/film-extra-rated";
import FilmMostCommentedComponent from "../components/film-content/film-extra-commented";
import {render, RenderPosition, remove} from "../utils/render";
import FilmController, {State as FilmControllerState} from "./movie";


const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const SHOWING_CARDS_COUNT_ON_START = 5;
const FILM_EXTRA_COUNT = 2;

const renderFilms = (container, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const filmController = new FilmController(container, onDataChange, onViewChange);
    filmController.render(film, FilmControllerState.DEFAULT);

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
  constructor(container, filmsModel) {
    this._container = container;
    this._containerElement = container.getElement();
    this._filmsModel = filmsModel;
    this._showedFilmsControllers = []; // Фильмы, которые сейчас отображены на странице - подписчики

    this._filmsListComponent = new FilmsListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._filmListContainer = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    this._topRatedFilmsComponent = null;
    this._filmsRatedSorted = null;
    this._filmsTopCommented = null;
    this._filmsCommentedSorted = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._renderShowMoreButton = this._renderShowMoreButton.bind(this);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
    this._renderFilmsExtra = this._renderFilmsExtra.bind(this);
  }

  render() {
    const films = this._filmsModel.getFilms();
    render(this._containerElement, this._sortComponent, RenderPosition.BEFOREEND);

    // Создает filmList
    render(this._containerElement, this._filmsListComponent, RenderPosition.BEFOREEND);

    // Если нет фильмов, выводим сообщение-заглушку
    const noFilms = films.length === 0;
    if (noFilms) {
      render(this._filmsListComponent.getElement(), this._noFilmsComponent, RenderPosition.BEFOREEND);
      return; // Сразу выходим, чтобы дальше эл-ты блока не отрисовывались
    }

    // Сортировка
    this._sortFilms();

    // Рендерим карточки фильмов
    this._renderFilms(films.slice(0, this._showingCardsCount));

    this._renderShowMoreButton();

    // Рендерим Rated и Commented в FilmContent
    this._filmsRatedSorted = films.slice().sort((a, b) => b.rating - a.rating);
    this._topRatedFilmsComponent = new FilmTopRatedComponent(films);
    this._renderFilmsExtra(this._topRatedFilmsComponent, this._filmsRatedSorted);

    this._filmsCommentedSorted = films.slice().sort((a, b) => b.comments.length - a.comments.length);
    this._filmsTopCommented = new FilmMostCommentedComponent(films);
    this._renderFilmsExtra(this._filmsTopCommented, this._filmsCommentedSorted);
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmsControllers = [];
  }

  _renderFilms(films) {
    const newFilms = renderFilms(this._filmListContainer, films, this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
    this._showingCardsCount = this._showedFilmsControllers.length;
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderShowMoreButton();
    this._rerenderFilmsExtra();
  }


  // Блок EXTRA
  _renderFilmsExtra(component, filmsRatedSorted) {
    render(this._containerElement, component, RenderPosition.BEFOREEND);
    const topRatedFilmsContainer = component.getElement().querySelector(`.films-list__container`);

    const newFilms = renderFilms(topRatedFilmsContainer, filmsRatedSorted.slice(0, FILM_EXTRA_COUNT),
        this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
  }

  _rerenderFilmsExtra() {
    this._renderFilmsExtra(this._topRatedFilmsComponent, this._filmsRatedSorted);
    this._renderFilmsExtra(this._filmsTopCommented, this._filmsCommentedSorted);
  }

  // Логика кнопки Show More
  // при нажатии продгружаем фмльмы
  _renderShowMoreButton() {
    const films = this._filmsModel.getFilms();

    remove(this._showMoreButtonComponent);
    if (this._showingCardsCount >= films.length) {
      return;
    }
    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevCardsCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevCardsCount, this._showingCardsCount);
      const newFilms = renderFilms(this._filmListContainer, sortedFilms,
          this._onDataChange, this._onViewChange);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

      if (this._showingCardsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  // Сортировка фильмов
  _sortFilms() {
    this._sortComponent.setSortTypeHandler((sortType) => {
      this._showingCardsCount = SHOWING_CARDS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), sortType, 0, this._showingCardsCount);

      this._removeFilms();
      this._renderFilms(sortedFilms);
      this._rerenderFilmsExtra();

      const showMoreButton = this._containerElement.querySelector(`.films-list__show-more`);
      if (!showMoreButton) {
        this._renderShowMoreButton(this._filmsModel.getFilms());
      }

    });
  }

  _onFilterChange() {
    this._sortComponent.reset();
    this._updateFilms(SHOWING_CARDS_COUNT_ON_START);
  }

  _onDataChange(filmController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilms(oldData.id, newData);

    if (isSuccess) {
      filmController.render(newData);
    }
  }

  _onViewChange() {
    this._showedFilmsControllers.map((film) => film.setDefaultView());
  }
}
