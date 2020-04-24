import {render, replace, RenderPosition} from "../utils/render";
import FilmCardComponent from "../components/film-content/film-card";
import FilmDetailsComponent from "../components/film-detail/film-details";

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._onFilmEscClose = this._onFilmEscClose.bind(this);
    this._onDataChange = onDataChange;
  }

  render(film) {
    const oldFilmComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);


    this._filmCardComponent.setOpenPopapHandler((evt) => {
      const popupTarget = evt.target.closest(`.film-card__poster, .film-card__title, .film-card__comments`);
      if (popupTarget) {
        this._openFilmDetailPopap();
      }
    });

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

    this._filmDetailsComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        controls: Object.assign({}, film.controls, {
          isFavorite: !film.controls.isFavorite,
        })
      }));
    });

    this._filmDetailsComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        controls: Object.assign({}, film.controls, {
          isWatched: !film.controls.isWatched,
        })
      }));
    });

    this._filmDetailsComponent.setWatchlistButtonClickHandler((evt) => {
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

    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }


  }


  _openFilmDetailPopap() {
    document.body.appendChild(this._filmDetailsComponent.getElement());
    const popapCloseButton = this._filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
    const onFilmDetailCloseClick = this._onFilmDetailCloseClick.bind(this);

    // При нажатии на кнопку, удаляется.
    popapCloseButton.addEventListener(`click`,
        function closeFilmPopap() {
          onFilmDetailCloseClick();
          popapCloseButton.removeEventListener(`click`, closeFilmPopap);
        });

    // И на Esc
    document.addEventListener(`keydown`, this._onFilmEscClose);
  }

  _onFilmDetailCloseClick() {
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
