import AbstractComponent from "./abstract-component";

export default class LoadingComponent extends AbstractComponent {
  getTemplate() {
    return (`<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>`);
  }
}
