import FilmModel from "../models/film";

const isOnline = () => {
  return window.navigator.onLine;
};

const getSyncedFilms = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.task);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
      .then((films) => {
        const items = createStoreStructure(films.map((film) => FilmModel.toRAW(film)));
        this._store.setItems(items);

        return films;
      });
    }

    const storeFilms = Object.values(this._store.getItems());
    return Promise.resolve(FilmModel.parseFilms(storeFilms));
  }

  updateFilm(id, data) {
    if (isOnline()) {
      return this._api.updateFilm(id, data)
      .then((newFilm) => {
        this._store.setItem(newFilm.id, FilmModel.toRAW(newFilm));

        return newFilm;
      });
    }
    const localFilm = FilmModel.clone(Object.assign(data, {id}));

    this._store.setItem(id, FilmModel.toRAW(localFilm));
    return Promise.resolve(localFilm);
  }

  getComments(id) {
    if (isOnline()) {
      return this._api.getComments(id);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  sendComment(filmId, data) {
    if (isOnline()) {
      return this._api.sendComment(filmId, data);
    }
    return Promise.reject(`offline logic is not implemented`);
  }

  deleteComment(id) {
    if (isOnline()) {
      return this._api.deleteComment(id);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdFilms = getSyncedFilms(response.created);
          const updatedFilms = getSyncedFilms(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdFilms, ...updatedFilms]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

}
