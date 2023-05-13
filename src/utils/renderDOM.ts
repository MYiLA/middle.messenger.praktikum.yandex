import Block from '../services/Block';

const renderDOM = (query: string, component: Block): Element | never => {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error('renderDOM: не найден элемент DOM, куда нужно рендерить компонент');
  }

  const temp = component.getContent();

  if (!temp) throw new Error(`Не найдено элемента на странице с id ${component.id}}`);

  // Очищаем темплейт
  root.innerHTML = '';

  // Рендерим полученный компонент в темплейт
  root.appendChild(temp);

  component.dispatchComponentDidMount();

  return root;
};

export default renderDOM;
