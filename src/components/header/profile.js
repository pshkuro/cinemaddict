import AbstractSmartComponent from "../abstract-smart-component";
import {ProfileRatingRules, FilterType} from "../../const";
import {getFilmsByFilter} from "../../utils/filters";

// Генерация Звания пользователя
export default class ProfileComponent extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();
    this._films = filmsModel;
  }

  getProfileRating() {
    const films = this._films.getAllFilms();
    const watchedFilmsCount = getFilmsByFilter(films, FilterType.HISTORY).length;

    const ratingRule = ProfileRatingRules.find((rule) => {
      return rule.from <= watchedFilmsCount && watchedFilmsCount <= rule.to;
    });

    return ratingRule.rating;

  }

  recoveryListeners() {
    this.getProfileRating();
  }

  rerender() {
    super.rerender();
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
