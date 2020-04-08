import {FILMS_POSTERS, FILMS_NAMES, FILMS_DURATION} from "../const";
import {getRandomArrayItem, getRandomCountRandomArrayItem} from "../util";

const FILM_DURATION_WORDS_COUNT = `5`;

const generateCard = () => {

  return {
    poster: getRandomArrayItem(FILMS_POSTERS),
    wrap: {
      title: getRandomArrayItem(FILMS_NAMES),
      original: '',
    },
    rating: ``,
    info: {
      year: ``,
      duration: ``,
      genre: ``,
    },
    description: getRandomCountRandomArrayItem(FILMS_DURATION, FILM_DURATION_WORDS_COUNT),
    comments: ``,
    controls: {
      isWatchlist: true,
      isWatched: false,
      isFavorite: true,
    },
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};


export {generateCard, generateCards};
