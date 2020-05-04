import FilmModel from "./models/film";

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }


  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {
      headers,
    })
      .then((response) => response.json())
      .then((films) => films.map((film) => new FilmModel(film)));
  }

};

export default API;
