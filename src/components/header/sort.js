import AbstractSmartComponent from "../abstract-smart-component";
import {activateElement} from "../../utils/interactivity";

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
  COMMENTED: `commented`
};

// Генерерация Сортировки
export default class SortComponent extends AbstractSmartComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
    this._sortTypeChangeHandler = null;
  }

  getTemplate() {
    return (
      `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
    );
  }

  getSortType() {
    return this._currentSortType;
  }

  recoveryListeners() {
    this.setSortTypeHandler(this._sortTypeChangeHandler);
  }

  rerender() {
    super.rerender();
  }

  // Сбрасывает значение фильтра на дефолтное
  reset() {
    this._currentSortType = SortType.DEFAULT;
    this.rerender();
  }

  setSortTypeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      //  tag name is always in the canonical upper-case form
      if (evt.target.tagName !== `A`) {
        return;
      }


      // По какому типу сорт произошел клик
      const sortType = evt.target.dataset.sortType;
      // Атрибуты, состоящие из нескольких слов, к примеру data-order-state,
      // становятся свойствами, записанными с помощью верблюжьей нотации: dataset.orderState.
      if (this._currentSortType === sortType) {
        return;
      }

      // Активирует ссылку при клике
      activateElement(evt.target, this.getElement(), `sort__button--active`);


      this._currentSortType = sortType;
      handler(this._currentSortType);
    });

    this._sortTypeChangeHandler = handler;
  }
}
