import AbstractComponent from "../abstract-component";

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

// Генерерация Сортировки
export default class SortComponent extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
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

      // Пыталась вынести, чтобы переиспользовать
      // const activateElement = (container, activeClass) => {
      //   const activeClickElement = evt.target;
      //   const activeElement = container.querySelector(`.${activeClass}`);

      //   if (activeElement) {
      //     activeElement.classList.remove(activeClass);
      //     activeClickElement.classList.add(activeClass);
      //   }
      // };

      // activateElement(this.getElement(), `sort__button--active`);

      // Активирует ссылку при клике
      const activeClickSortElement = evt.target;
      const activeSortElement = this.getElement().querySelector(`.sort__button--active`);
      if (activeSortElement) {
        activeSortElement.classList.remove(`sort__button--active`);
        activeClickSortElement.classList.add(`sort__button--active`);
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}
