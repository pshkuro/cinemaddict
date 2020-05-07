import moment from "moment";

// Приведение времени к нужному формату
export const formatTime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};

export function formatDate(date) {
  return moment(date).format(`DD MMMM YYYY`);
}

// Форматирование даты в формат гггг/мм/дд чч:мм
export function formatCommentsDate(date) {
  const now = moment();
  const past = moment(date);

  const monthsDiff = now.diff(past, `months`);

  return monthsDiff >= 2
    ? past.format(`YYYY/MM/DD h:mm`)
    : now.to(past);
}

