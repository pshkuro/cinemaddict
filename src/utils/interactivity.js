const SHAKE_ANIMATION_TIMEOUT = 600;

// Добавляет элементу активный класс при клике
export const activateElement = (activeClickElement, container, activeClass) => {
  const activeElement = container.querySelector(`.${activeClass}`);

  if (activeElement) {
    activeElement.classList.remove(activeClass);
    activeClickElement.classList.add(activeClass);
  }
};

// Эффект `покачивание головой при неудачной отправке/удалении коммента`
export const shake = (element) => {
  element.classList.add(`shake`);

  setTimeout(() => {
    element.classList.remove(`shake`);
  }, SHAKE_ANIMATION_TIMEOUT);
};

