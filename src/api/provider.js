import FilmModel from "../models/film";

const isOnline = () => {
  return window.navigator.onLine;
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
        films.forEach((film) => this._store.setItem(film.id, FilmModel.toRAW(film)));

        return films;
      });
    }

    const storeFilms = Object.values(this._store.getItems());
    return Promise.resolve(FilmModel.parseFilms(storeFilms));
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

  updateFilm(id, data) {
    if (isOnline()) {
      return this._api.updateFilm(id, data);
    }
    return Promise.reject(`offline logic is not implemented`);
  }

}
