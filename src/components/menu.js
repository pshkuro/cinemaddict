const ITEM_COUNT_SHOW_NUMBER = 5;

const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;

  const navigationActiveClass = isActive ? ` main-navigation__item--active` : ``;

  return (`
  <a href="#${name.toLowerCase()}" class="main-navigation__item${navigationActiveClass}">
  ${name } ${(isActive || count > ITEM_COUNT_SHOW_NUMBER) ? `` :
      `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

// Генерация Меню
export const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((filter, index) => createFilterMarkup(filter, index === 0)).join(`\n`);
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterMarkup}    
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};
