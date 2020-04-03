// Ф создания нескольких карточек
export function createElementsTemplate(count, templateFn) {
  let template = ``;
  for (let i = 0; i < count; i++) {
    template = `${template} ${templateFn()}`;
  }
  return template;
}
