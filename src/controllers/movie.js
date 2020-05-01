import {render, replace, remove, RenderPosition} from "../utils/render";
import FilmCardComponent from "../components/film-content/film-card";
import FilmDetailsComponent from "../components/film-detail/film-details";

export const State = {
  DEFAULT: `default`,
  DETAILS: `details`
};


export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._onFilmEscClose = this._onFilmEscClose.bind(this);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._state = State.DEFAULT;
  }

  render(film, state) {
    this._state = state;
    const oldFilmComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);


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

    this._filmDetailsComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        controls: Object.assign({}, film.controls, {
          isFavorite: !film.controls.isFavorite,
        })
      }));
    });

    // Работа с добавлением в спики - Попап
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

    // Удаление комментария
    this._filmDetailsComponent.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();

      const deleteButton = evt.target;
      const commentItem = deleteButton.closest(`.film-details__comment`);
      const removeCommentId = commentItem.id;
      const comments = film.comments.filter((comment) => comment.id !== removeCommentId);

      this._onDataChange(this, film, Object.assign(film, {comments}));
    });

    // Добавление комментария
    this._filmDetailsComponent.setSendCommentHandler((evt) => {
      const isCtrlAndEnter = evt.code === `Enter` && (evt.ctrlKey || evt.metaKey);
      if (isCtrlAndEnter) {
        const comment = this._filmDetailsComponent.gatherComment();
        if (!comment) {
          return;
        }
        const newComments = film.comments.concat(comment);
        this._onDataChange(this, film, Object.assign(film, {comments: newComments}));
      }
    });

    // Рендер фильмов
    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
      this._openFilmDetailPopap();
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
    remove(this._filmDetailsComponent);
    remove(this._filmCardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  // Открываем карточку
  _openFilmDetailPopap() {
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
