import {FILMS_POSTERS, FILMS_NAMES, FILMS_DESCRIPTION, FILM_DIRECTORS, FILM_WRITERS, FILM_ACTORS,
  FILM_COUNTRY, FILM_GENRE, FILM_COMMENTS_EMOJI} from "../const";
import {getRandomArrayItem, getRandomCountRandomArrayItem, getRandomIntegerRoundingNumber,
  getRandomIntegerNumber} from "../utils/common";
import {getRandomDate} from "../utils/date";

const FILM_DURATION_WORDS_COUNT = `5`;

// Генерация объекта комментария
const generateComment = () => {
  return {
    text: getRandomArrayItem(FILMS_DESCRIPTION),
    emoji: getRandomArrayItem(FILM_COMMENTS_EMOJI),
    author: getRandomArrayItem(FILM_WRITERS),
    date: getRandomDate(new Date(2020, 0, 26), new Date()),
    id: String(new Date() + Math.random()),
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
    id: String(new Date() + Math.random()),
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
      duration: getRandomIntegerNumber(50, 400),
      country: getRandomArrayItem(FILM_COUNTRY),
      genre: getRandomCountRandomArrayItem(FILM_GENRE),
    },
    description: getRandomCountRandomArrayItem(FILMS_DESCRIPTION, FILM_DURATION_WORDS_COUNT),
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
