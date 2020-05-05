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
    const oldFilmDetailsComponent = this._filmDetailsComponent;
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
      // replace(this._filmDetailsComponent, oldFilmDetailsComponent);
      // this._openFilmDetailPopap();
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
    this._filmDetailsComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        controls: Object.assign({}, this._film.controls, {
          isWatched: !this._film.controls.isWatched,
        })
      }));
    });

    this._filmDetailsComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        controls: Object.assign({}, this._film.controls, {
          isWatchlist: !this._film.controls.isWatchlist,
        })
      }));
    });

    this._filmDetailsComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        controls: Object.assign({}, this._film.controls, {
          isFavorite: !this._film.controls.isFavorite,
        })
      }));
    });

    // Удаление комментария
    this._filmDetailsComponent.setDeleteButtonClickHandler((evt) => {

      evt.preventDefault();

      const deleteButton = evt.target;
      const commentItem = deleteButton.closest(`.film-details__comment`);
      const removeCommentId = commentItem.id;
      const comments = this._film.comments.filter((comment) => comment.id !== removeCommentId);

      this._onDataChange(this, this._film, Object.assign(this._film, {comments}));
    });

    // Добавление комментария
    this._filmDetailsComponent.setSendCommentHandler((evt) => {
      const isCtrlAndEnter = evt.code === `Enter` && (evt.ctrlKey || evt.metaKey);
      if (isCtrlAndEnter) {
        const comment = this._filmDetailsComponent.gatherComment();
        if (!comment) {
          return;
        }
        const newComments = this._film.comments.concat(comment);
        this._onDataChange(this, this._film, Object.assign(this._film, {comments: newComments}));
      }
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
