import {FILTER_NAMES} from "../const";

const generateFilters = (cards) => {

  const allFilmCount = cards.length;
  const watchlistCount = cards.filter((card) => card.controls.isWatchlist === true);
  const watchedCount = cards.filter((card) => card.controls.isWatched === true);
  const favoriteCount = cards.filter((card) => card.controls.isFavorite === true);

  const filtersData = [allFilmCount, watchlistCount.length, watchedCount.length, favoriteCount.length];

  return FILTER_NAMES.map((filterName, index) => {
    return {
      name: filterName,
      count: filtersData[index],
    };
  });

};

export {generateFilters};
