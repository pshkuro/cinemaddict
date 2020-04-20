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


// Содержит логику рендеринга блока FilmContent на странице
export default class PageController {
  constructor(container) {
    this._container = container;

    this._filmsListComponent = new FilmsListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    const container = this._container.getElement();

    // Создает filmList
    render(container, this._filmsListComponent, RenderPosition.BEFOREEND);

    // Если нет фильмов, выводим сообщение-заглушку
    const noFilms = films.length === 0;
    if (noFilms) {
      render(this._filmsListComponent.getElement(), this._noFilmsComponent, RenderPosition.BEFOREEND);
      return; // Сразу выходим, чтобы дальше эл-ты блока не отрисовывались
    }

    // Рендерим карточки фильмов
    const filmListContainer = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    films.slice(0, showingCardsCount)
    .forEach((film) => {
      renderFilmCard(filmListContainer, film);
    });


    // Логика кнопки Show More
    // при нажатии продгружаем фмльмы
    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevCardsCount = showingCardsCount;
      showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      films.slice(prevCardsCount, showingCardsCount)
    .forEach((film) => {
      renderFilmCard(filmListContainer, film);
    });

      if (showingCardsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    // Рендерим Rated и Commented в FilmContent
    render(container, new FilmTopRatedComponent(films), RenderPosition.BEFOREEND);
    render(container, new FilmMostCommentedComponent(films), RenderPosition.BEFOREEND);
  }
}

