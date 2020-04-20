import AbstractComponent from "../abstract-component";
import FiltersMarkupComponent from "./filter-markup-template";

// Генерация блока фильтров
export default class FiltersComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
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
}
