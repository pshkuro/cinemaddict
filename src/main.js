import ProfileComponent from './components/profile';
import FiltersComponent from "./components/menu";
import SortComponent from "./components/sort";
import FilmContentComponent from "./components/film-content";
import FilmsListComponent from "./components/films-list";
import FilmCardComponent from "./components/film-card";
import ShowMoreButtonComponent from "./components/show-more-button";
import FilmsExtraComponent from './components/films-extra';
import FilmDetailsComponent from "./components/film-details";
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

// Рендерим Попап при нажатии на карточку фильма
document.addEventListener(`click`, function showFilmDetailsHandler(evt) {

  const filmCardElement = evt.target.closest(`.film-card`); // Клик произошел по .film-card - true/false
  if (filmCardElement) {
    const filmCardId = filmCardElement.dataset.id; // Получает DataSet атрибут карточки, см в /component/film-card
    const filmCardData = cards.find((card) => card.wrap.title === filmCardId); // Если название фильма на попапе = DataSet атрибут карточки
    const filmDetailsComponent = new FilmDetailsComponent(filmCardData);
    render(document.body, filmDetailsComponent.getElement(), `beforeend`);

    const filmDetailsCloseButtonElement = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
    filmDetailsCloseButtonElement.addEventListener(`click`, () => {
      filmDetailsComponent.getElement().remove();
      filmDetailsComponent.removeElement();
    });
  }
});


const renderFilmsExtra = (filmsExtraContainer, films) => {
  const filmsExtraComponent = new FilmsExtraComponent(films);
  render(filmsExtraContainer, filmsExtraComponent.getElement(), RenderPosition.BEFOREEND);
};


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

  renderFilmsExtra(filmsContentComponent.getElement(), films);
};


const filmsContentComponent = new FilmContentComponent();
renderFilmsContent(filmsContentComponent, cards);

render(footerStatisticsElement, new FilmCountComponent(cards).getElement(), RenderPosition.BEFOREEND);

// render(headerPageElement, createProfileTemplate(), `beforeend`);
// render(mainPageElement, createFilterTemplate(filters), `beforeend`);
// render(mainPageElement, createSortTemplate(), `beforeend`);
// render(mainPageElement, createFilmContentTemplate(cards), `beforeend`);
// createFilmContentTemplate.onTemplateRendered();
// render(footerStatisticsElement, createFilmCountTemplate(cards), `beforeend`);


