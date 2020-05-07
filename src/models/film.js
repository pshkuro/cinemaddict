export default class FilmModel {
  constructor(data) {
    const {
      id,
      comments,
      film_info: {
        title,
        poster,
        director,
        writers,
        actors,
        genre,
        description,
        alternative_title: original,
        total_rating: rating,
        age_rating: ageRating,
        runtime: duration,
        release: {
          date,
          release_country: country
        }
      },
      user_details: {
        watchlist: isWatchlist,
        already_watched: isWatched,
        watching_date: watchingDate,
        favorite: isFavorite
      }
    } = data;

    // Преобразование структуры сервера в локальную структуру
    return {
      id,
      poster,
      wrap: {
        title,
        original
      },
      rating,
      info: {
        director,
        ageRating,
        writers,
        actors,
        date: new Date(date),
        duration,
        country,
        genre
      },
      description,
      controls: {
        isWatchlist,
        isWatched,
        isFavorite,
        watchingDate: new Date(watchingDate)
      },
      comments,
    };
  }

  // Преобразование локальной структуры в структуру сервера
  static toRAW(data) {
    return {
      "id": data.id,
      "comments": data.comments,
      "film_info": {
        "title": data.wrap.title,
        "alternative_title": data.wrap.original,
        "total_rating": data.rating,
        "poster": data.poster,
        "age_rating": data.info.ageRating,
        "director": data.info.director,
        "writers": data.info.writers,
        "actors": data.info.actors,
        "release": {
          "date": data.info.date,
          "release_country": data.info.country
        },
        "runtime": data.info.duration,
        "genre": data.info.genre,
        "description": data.description,
      },
      "user_details": {
        "watchlist": data.controls.isWatchlist,
        "already_watched": data.controls.isWatched,
        "watching_date": data.controls.watchingDate,
        "favorite": data.controls.isFavorite
      }
    };
  }

  static parseFilm(data) {
    return new FilmModel(data);
  }

  static parseFilms(data) {
    return data.map(FilmModel.parseFilm);
  }

  static clone(data) {
    return new FilmModel(FilmModel.toRAW(data)); // ?????????
  }
}
