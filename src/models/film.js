export default class FilmModel {
  constructor(data) {
    const {
      id,
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
      comments: []
    };

    // this.id = data.id;
    // this.poster = data.film_info.poster;

    // this.wrap = {title, original};
    // this.title = data.film_info.title;
    // this.original = data.film_info.alternative_title;

    // this.rating = data.film_info.total_rating;

    // this.info = {director, writers, actors, date, duration, country, genre};
    // this.director = data.film_info.director;
    // this.writers = data.film_info.director;
    // this.actors = data.film_info.actors;
    // this.date = new Date(data.film_info.release.date);
    // this.duration = data.film_info.runtime;
    // this.country = data.film_info.release.release_country;
    // this.genre = data.film_info.genre;

    // this.description = data.film_info.description;

    // this.controls = {isWatchlist, isWatched, isFavorite, watchingDate};
    // this.isWatchlist = data.user_details.watchlist;
    // this.isWatched = data.user_details.already_watched;
    // this.isFavorite = data.user_details.favorite;
    // this.watchingDate = new Date(data.user_details.watching_date);

    // comments: generateCommentList(),
  }
}
