import {FILMS_POSTERS, FILMS_NAMES, FILMS_DURATION} from "../const";
import {getRandomArrayItem, getRandomCountRandomArrayItem, getRandomIntegerRoundingNumber} from "../util";

const FILM_DURATION_WORDS_COUNT = `5`;

const generateCard = () => {

  return {
    poster: getRandomArrayItem(FILMS_POSTERS),
    wrap: {
      title: getRandomArrayItem(FILMS_NAMES),
      original: ``, // Пофиксить, должно быть такое же как в title
    },
    rating: getRandomIntegerRoundingNumber(1, 10, 1),
    info: {
      director: ``,
      writers: ``,
      actors: ``,
      date: ``,
      duration: ``,
      country: ``,
      genre: ``,
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
