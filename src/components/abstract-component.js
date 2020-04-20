import {createElement} from "../util";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`); // Предотвращаем вызов абстракт класса самого по себе
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`); // Этот метод должен быть предопределен в подклассах
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
