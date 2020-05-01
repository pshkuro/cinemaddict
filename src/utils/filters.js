import {FilterType} from "../const";

export const getWatchlistFilms = (films) => {
  return films.filter((film) => film.controls.isWatchlist);
};

export const getWatchedFilms = (films) => {
  return films.filter((film) => film.controls.isWatched);
};

export const getFavoriteFilms = (films) => {
  return films.filter((film) => film.controls.isFavorite);
};

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return Array.from(films);
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterType.HISTORY:
      return getWatchedFilms(films);
    case FilterType.FAVORITES:
      return getFavoriteFilms(films);
  }

  return films;
};
