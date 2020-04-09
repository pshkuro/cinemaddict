import {FILMS_POSTERS, FILMS_NAMES, FILMS_DURATION, FILM_DIRECTORS, FILM_WRITERS, FILM_ACTORS,
  FILM_COUNTRY, FILM_GENRE, FILM_COMMENTS_EMOJI} from "../const";
import {getRandomArrayItem, getRandomCountRandomArrayItem, getRandomIntegerRoundingNumber,
  getRandomDate, formatTime, getRandomIntegerNumber} from "../util";

const FILM_DURATION_WORDS_COUNT = `5`;

// Генерация объекта комментария
const generateComment = () => {
  return {
    text: getRandomArrayItem(FILMS_DURATION),
    emoji: getRandomArrayItem(FILM_COMMENTS_EMOJI),
    author: getRandomArrayItem(FILM_WRITERS),
    date: getRandomDate(new Date(2019, 0, 1), new Date()),
  };
};

// Генерация массива комментариев
const generateCommentList = () => {
  const count = getRandomIntegerNumber(1, 10);
  return new Array(count)
  .fill(``)
  .map(generateComment);
};

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
      isWatchlist: Math.random() > 0.5,
      isWatched: Math.random() > 0.5,
      isFavorite: Math.random() > 0.5,
    },
    comments: generateCommentList(),
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};


export {generateCard, generateCards};
