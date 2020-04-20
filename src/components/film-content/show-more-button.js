import AbstractComponent from "../abstract-component";

// Генерация кнопки 'Learn More'
export default class ShowMoreButtonComponent extends AbstractComponent {
  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
