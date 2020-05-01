import AbstractComponent from "../abstract-component";
import {ProfileRatingRules, FilterType} from "../../const";
import {getFilmsByFilter} from "../../utils/filters";

// Генерация Звания пользователя
export default class ProfileComponent extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getProfileRating() {
    const watchedFilmsCount = getFilmsByFilter(this._films, FilterType.HISTORY).length;

    const ratingRule = ProfileRatingRules.find((rule) => {
      return rule.from <= watchedFilmsCount && watchedFilmsCount <= rule.to;
    });

    return ratingRule.rating;

  }

  getTemplate() {
    return (
      `<section class="header__profile profile">
      <p class="profile__rating">${this.getProfileRating()}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
    );
  }
}
