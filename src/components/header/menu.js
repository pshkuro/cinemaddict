import {createElement} from "../../util";
import FiltersMarkupComponent from "./filter-markup-template";

// Генерация блока фильтров
export default class FiltersComponent {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }


  getTemplate() {
    const filterMarkup = this._filters.map((filter, index) =>
      new FiltersMarkupComponent(filter, index === 0)
      .getTemplate())
      .join(`\n`);

    return (
      `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterMarkup}    
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
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
