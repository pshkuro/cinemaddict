import AbstractSmartComponent from "../abstract-smart-component";
import {ProfileRatingRules} from "../../const";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";

const BAR_HEIGHT = 50;
const FILTER_ID_PREFIX = `statistic-`;

// Извлекает имя фильтра
const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const FILTERS = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const FILTER_MOMENT_UNIT_OF_TIME = {
  'today': `days`,
  'week': `weeks`,
  'month': `months`,
  'year': `years`
};

const getFilmsGenres = (filmsModel) => {
  const data = filmsModel.reduce((genreSet, film) => {
    const genres = film.info.genre;
    const hasGenres = genres.length > 0;

    if (hasGenres) {
      genreSet.add(...genres);
    }

    return genreSet;
  }, new Set());

  return Array.from(data);
};

const getCountFilmsByGenre = (films) => {
  if (!films.length) {
    return [];
  }

  const filmsGenres = getFilmsGenres(films);
  return filmsGenres.map((genre) => {
    return {
      genre,
      count: films.reduce((sum, film) => {
        if (film.info.genre[0] === genre) {
          sum++;
        }

        return sum;
      }, 0),
    };
  }).sort((a, b) => b.count - a.count);
};

const getProfileRating = (watchedFilmsCount) => {
  const ratingRule = ProfileRatingRules.find((rule) => {
    return rule.from <= watchedFilmsCount && watchedFilmsCount <= rule.to;
  });

  return ratingRule.rating;
};


export default class StatisticsComponent extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
    this._films = this._filmsModel.getFilms().filter((it) => it.controls.isWatched);
    this._filteredFilms = this._films.slice();
    this._chart = null;
    this._currentFilter = FILTERS.ALL;
    this._chartData = getCountFilmsByGenre(this._films);
    this._renderChart();
    this._getChoosedFilterType();
  }

  getTemplate() {
    const watchedFilmsCount = this._filteredFilms.length;
    const topGenre = this._filteredFilms.length ? this._chartData[0].genre : ``;
    const filmDuration = this._filteredFilms.reduce(function (sum, current) {
      return sum + current.info.duration;
    }, 0);

    const filters = Object.values(FILTERS).map((filter) => {
      const label = filter
        .replace(filter[0], filter[0].toUpperCase())
        .replace(`-`, ` `);
      const checked = filter === this._currentFilter;

      return `
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter}" value="${filter}" ${checked ? `checked` : ``}>
        <label for="statistic-${filter}" class="statistic__filters-label">${label}</label>
      `.trim();
    });

    return (`<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getProfileRating(this._films.length)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      ${filters.join(``)}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilmsCount}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${Math.floor(filmDuration / 60)}<span class="statistic__item-description">h</span>${filmDuration % 60}<span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`);
  }

  recoveryListeners() {
    this._getChoosedFilterType();
  }

  rerender() {
    this._filteredFilms = this._getFilteredFilms();
    this._chartData = getCountFilmsByGenre(this._filteredFilms);

    super.rerender();
    this._renderChart();
  }

  _getFilteredFilms() {
    const films = this._filmsModel.getFilms().filter((it) => it.controls.isWatched);
    const filter = this._currentFilter;

    if (filter === FILTERS.ALL) {
      return films;
    }
    return films.filter((film) => {
      const watchingDate = film.controls.watchingDate;
      const mWatchingDate = moment(watchingDate);
      const mNow = moment();
      const unitOfTime = FILTER_MOMENT_UNIT_OF_TIME[filter];
      const mDateDiff = mNow.diff(mWatchingDate, unitOfTime);

      return mDateDiff < 1;
    });
  }

  _getChoosedFilterType() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, (evt) => {
      const filterElement = evt.target.control;
      if (!filterElement) {
        return;
      }
      const filter = filterElement.id;
      this._currentFilter = getFilterNameById(filter);
      this.rerender();
    });
  }

  _renderChart() {
    if (!this._filteredFilms.length) {
      return;
    }
    const chartCtx = this.getElement().querySelector(`.statistic__chart`);
    chartCtx.height = BAR_HEIGHT * this._chartData.length;

    this._chart = new Chart(chartCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._chartData.map((it) => it.genre),
        datasets: [{
          data: this._chartData.map((it) => it.count),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`,
          barThickness: 24
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }
}
