// Генерация статистики фильмов
export const createFilmCountTemplate = (cards) => {
  return (
    `<p>${cards.length} movies inside</p>`
  );
};
