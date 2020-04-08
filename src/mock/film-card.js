import {FILMS_POSTERS} from "../const";
import {getRandomArrayItem} from "../util";


const generateCard = () => {

  return {
    poster: getRandomArrayItem(FILMS_POSTERS),
    wrap: {
      title: ``,
      original: ``,
    },
    rating: ``,
    info: {
      year: ``,
      duration: ``,
      genre: ``,
    },
    description: ``,
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
