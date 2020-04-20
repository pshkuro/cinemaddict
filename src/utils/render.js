export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// Функция рендеринга DOM-элементов на страницу
export const render = (container, component, place) => {
  const element = component instanceof DocumentFragment
    ? component
    : component.getElement();
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Функция для создания DOM-элемента на основе шаблона разметки
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template.trim().replace(`\n`, ``);

  return newElement.firstChild;
};

// Ф создания нескольких карточек
export function createElementsTemplate(data, templateFn) {
  let template = ``;
  for (let i = 0; i < data.length; i++) {
    if (!data[i]) {
      return template;
    }
    template = `${template} ${templateFn(data[i])}`;
  }
  return template;
}

// Ф создания нескольких карточек
export function createElements(data, Component) {
  const fragment = new DocumentFragment();

  data.forEach((item) => {
    const component = new Component(item);
    const element = component.getElement();

    fragment.appendChild(element);
  });

  return fragment;
}

