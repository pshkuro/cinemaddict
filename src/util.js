// Ф создания нескольких карточек
export function createElementsTemplate(data, templateFn) {
  let template = ``;
  for (let i = 0; i < data.length; i++) {
    template = `${template} ${templateFn(data[i])}`;
  }
  return template;
}

// Приведение времени к нужному формату - сроке
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

// Генерация случ эл массива
export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

// Shuffle Arr
export const shuffleArray = (arr) => {
  let j = 0;
  let temp = 0;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

// Генерация случ числа от мин до макс
export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// Генерация случ количества случ эл-ов массива
export const getRandomCountRandomArrayItem = (array, count) => {
  const shuffleArr = shuffleArray(array);

  const randomLength = getRandomIntegerNumber(1, count); // Обычно arr.length
  return shuffleArr.slice(0, randomLength);
};


// Генерация случайной даты (+/- 7 дней с DateNow)
export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

// Проверяет, является ли дата сег днем
export const isToday = (date) => date.getDate() === new Date().getDate();


