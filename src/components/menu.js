import {createElement} from "../util";

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
const createFilterTemplate = (filters) => {
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

export default class FiltersComponent {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

}
