import {FILMS_POSTERS, FILMS_NAMES, FILMS_DURATION, FILM_DIRECTORS, FILM_WRITERS, FILM_ACTORS,
  FILM_COUNTRY, FILM_GENRE} from "../const";
import {getRandomArrayItem, getRandomCountRandomArrayItem, getRandomIntegerRoundingNumber,
  getRandomDate, formatTime} from "../util";

const FILM_DURATION_WORDS_COUNT = `5`;

const generateCard = () => {

  return {
    poster: getRandomArrayItem(FILMS_POSTERS),
    wrap: {
      title: getRandomArrayItem(FILMS_NAMES),
      get original() {
        return this.title;
      },
    },
    rating: getRandomIntegerRoundingNumber(1, 10, 1),
    info: {
      director: getRandomArrayItem(FILM_DIRECTORS),
      writers: getRandomCountRandomArrayItem(FILM_WRITERS),
      actors: getRandomCountRandomArrayItem(FILM_ACTORS),
      date: getRandomDate(new Date(2012, 0, 1), new Date()),
      get duration() {
        return formatTime(this.date);
      },
      country: getRandomArrayItem(FILM_COUNTRY),
      genre: getRandomCountRandomArrayItem(FILM_GENRE),
    },
    description: getRandomCountRandomArrayItem(FILMS_DURATION, FILM_DURATION_WORDS_COUNT),
    controls: {
      isWatchlist: true,
      isWatched: false,
      isFavorite: true,
    },
    comments: ``,
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};


export {generateCard, generateCards};
