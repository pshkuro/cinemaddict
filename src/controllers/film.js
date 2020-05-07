import {render, replace, remove, RenderPosition} from "../utils/render";
import FilmCardComponent from "../components/film-content/film-card";
import FilmDetailsComponent from "../components/film-detail/film-details";


export const State = {
  DEFAULT: `default`,
  DETAILS: `details`
};


export default class FilmController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._api = api;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._onFilmEscClose = this._onFilmEscClose.bind(this);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._state = State.DEFAULT;
    this._id = null;
    this._film = null;
  }

  render(film, state) {
    this._film = film;
    this._state = state;
    const oldFilmComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardComponent(film);
    this._id = film.id;


    // Открытие попапа
    this._filmCardComponent.setOpenPopapHandler((evt) => {
      this._onViewChange();
      const popupTarget = evt.target.closest(`.film-card__poster, .film-card__title, .film-card__comments`);
      if (popupTarget) {
        this._openFilmDetailPopap();
      }
    });

    // Работа с добавлением в списки - Карточка
    this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        controls: Object.assign({}, film.controls, {
          isWatched: !film.controls.isWatched,
        })
      }));
    });

    this._filmCardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        controls: Object.assign({}, film.controls, {
          isWatchlist: !film.controls.isWatchlist,
        })
      }));
    });

    this._filmCardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        controls: Object.assign({}, film.controls, {
          isFavorite: !film.controls.isFavorite,
        })
      }));
    });

    // Рендер фильмов
    if (oldFilmComponent) {
      replace(this._filmCardComponent, oldFilmComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._state !== State.DEFAULT) {
      this._onFilmDetailCloseClick();
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _renderFilmDetailsPopup() {
    this._filmDetailsComponent = new FilmDetailsComponent(this._film, this._api);
    // Работа с добавлением в спики - Попап
    this._filmDetailsComponent.watchListChanges.subscribe((isWatchlist) => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        controls: Object.assign({}, this._film.controls, {isWatchlist})
      }));
    });

    this._filmDetailsComponent.watchedChanges.subscribe((isWatched) => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        controls: Object.assign({}, this._film.controls, {isWatched})
      }));
    });

    this._filmDetailsComponent.favoritesChanges.subscribe((isFavorite) => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        controls: Object.assign({}, this._film.controls, {isFavorite})
      }));
    });

    // Удаление и добавление комментария
    this._filmDetailsComponent.commentsChanges.subscribe((comments) => {
      const film = Object.assign({}, this._film, {comments});
      this._onDataChange(this, this._film, film, true);
    });

  }

  // Открываем карточку
  _openFilmDetailPopap() {
    this._renderFilmDetailsPopup();

    document.body.appendChild(this._filmDetailsComponent.getElement());
    const onFilmDetailCloseClick = this._onFilmDetailCloseClick.bind(this);
    this._state = State.DETAILS;
    // При нажатии на кнопку, удаляется.
    this._filmDetailsComponent.setEscCloseButtonHanler(function closeFilmPopap() {
      onFilmDetailCloseClick();
    });
    // И на Esc
    document.addEventListener(`keydown`, this._onFilmEscClose);
  }

  _onFilmDetailCloseClick() {
    this._filmDetailsComponent.resetAddCommentForm();
    this._filmDetailsComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._onFilmEscClose);
  }

  _onFilmEscClose(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._onFilmDetailCloseClick();
    }
  }

}
