import moment from "moment";

const MINUTES = 60;
const MONTHS_DIFFERENT_COUNT = 2;

// Приведение времени к нужному формату
export const formatTime = (time) => {
  const hours = Math.floor(time / MINUTES);
  const minutes = time % MINUTES;

  return `${hours}h ${minutes}m`;
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

// Форматирование даты в формат гггг/мм/дд чч:мм
export const formatCommentsDate = (date) => {
  const now = moment();
  const past = moment(date);

  const monthsDiff = now.diff(past, `months`);

  return monthsDiff >= MONTHS_DIFFERENT_COUNT
    ? past.format(`YYYY/MM/DD h:mm`)
    : now.to(past);
};

