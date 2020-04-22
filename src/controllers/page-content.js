import SortComponent, {SortType} from "../components/header/sort";
import FilmsListComponent from "../components/film-content/films-list";
import NoFilmsComponent from "../components/film-content/no-films";
import FilmCardComponent from "../components/film-content/film-card";
import ShowMoreButtonComponent from "../components/film-content/show-more-button";
import FilmTopRatedComponent from "../components/film-content/film-extra-rated";
import FilmMostCommentedComponent from "../components/film-content/film-extra-commented";
import {render, RenderPosition, remove} from "../utils/render";


const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const SHOWING_CARDS_COUNT_ON_START = 5;

// Логика 1 карточки фильма
const renderFilmCard = (filmCardsContainer, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  render(filmCardsContainer, filmCardComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (container, films) => {
  films.forEach((film) => {
    renderFilmCard(container, film);
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

    this._filmsListComponent = new FilmsListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._filmListContainer = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
  }

  // Логика кнопки Show More
  // при нажатии продгружаем фмльмы
  renderShowMoreButton(films) {
    if (this._showingCardsCount >= films.length) {
      return;
    }
    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevCardsCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevCardsCount, this._showingCardsCount);
      renderFilms(this._filmListContainer, sortedFilms);

      if (this._showingCardsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  // Сортировка фильмов
  sortFilms(films) {
    this._sortComponent.setSortTypeHandler((sortType) => {
      this._showingCardsCount = SHOWING_CARDS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(films, sortType, 0, this._showingCardsCount);
      this._filmListContainer.innerHTML = ``;

      renderFilms(this._filmListContainer, sortedFilms);

      const showMoreButton = this._container.querySelector(`.films-list__show-more`);
      if (!showMoreButton) {
        this.renderShowMoreButton(films);
      }

    });
  }

  render(films) {
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);

    // Создает filmList
    render(this._container, this._filmsListComponent, RenderPosition.BEFOREEND);

    // Если нет фильмов, выводим сообщение-заглушку
    const noFilms = films.length === 0;
    if (noFilms) {
      render(this._filmsListComponent.getElement(), this._noFilmsComponent, RenderPosition.BEFOREEND);
      return; // Сразу выходим, чтобы дальше эл-ты блока не отрисовывались
    }

    // Рендерим карточки фильмов
    renderFilms(this._filmListContainer, films.slice(0, this._showingCardsCount));

    this.renderShowMoreButton(films);

    // Сортировка
    this.sortFilms(films);

    // Рендерим Rated и Commented в FilmContent
    render(this._container, new FilmTopRatedComponent(films), RenderPosition.BEFOREEND);
    render(this._container, new FilmMostCommentedComponent(films), RenderPosition.BEFOREEND);
  }
}
