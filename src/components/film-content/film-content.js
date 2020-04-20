import AbstractComponent from "../abstract-component";

// Генерация Film Content
export default class FilmContentComponent extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="films"></section>`
    );
  }
}
