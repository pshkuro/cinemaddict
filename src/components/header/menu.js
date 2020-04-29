import AbstractComponent from "../abstract-component";
import FiltersMarkupComponent from "./filter-markup-template";

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

// Генерация блока фильтров
export default class FiltersComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }


  getTemplate() {
    const filterMarkup = this._filters.map((filter) =>
      new FiltersMarkupComponent(filter, filter.checked)
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

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
