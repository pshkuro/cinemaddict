import AbstractComponent from "../abstract-component";

// Генерация Контейнера списка фильмов
export default class NoFilmsComponent extends AbstractComponent {
  getTemplate() {
    return (
      `<h2 class="films-list__title">There are no movies in our database</h2>`);
  }
}
