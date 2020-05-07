export const FilterType = {
  ALL: `All Movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

const ProfileRating = {
  NO: ``,
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BAF: `Movie Buff`,
};

export const ProfileRatingRules = [
  {rating: ProfileRating.NO, from: 0, to: 0},
  {rating: ProfileRating.NOVICE, from: 1, to: 10},
  {rating: ProfileRating.FAN, from: 11, to: 20},
  {rating: ProfileRating.MOVIE_BAF, from: 21, to: Infinity}
];

