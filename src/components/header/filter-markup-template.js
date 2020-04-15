import {createElement} from "../../util";
const ITEM_COUNT_SHOW_NUMBER = 5;

// Генерация 1 фильтра
export default class FiltersMarkupComponent {
  constructor(filters, isActive) {
    this._filters = filters;
    this._isActive = isActive;
    this._element = null;
    this.init();
  }

  init() {
    const {name, count} = this._filters;
    this._name = name;
    this._count = count;
    this._navigationActiveClass = this._isActive ? ` main-navigation__item--active` : ``;
  }

  getTemplate() {
    return (`
    <a href="#${this._name.toLowerCase()}" class="main-navigation__item${this._navigationActiveClass}">
    ${this._name } ${(this._isActive || this._count > ITEM_COUNT_SHOW_NUMBER) ? `` :
        `<span class="main-navigation__item-count">${this._count}</span>`}</a>`
    );
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

