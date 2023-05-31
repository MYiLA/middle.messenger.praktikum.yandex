import Block from '../services/Block';

const renderDOM = (query: string, component: Block): Element | null => {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error('renderDOM: не найден элемент DOM, куда нужно рендерить компонент');
  }

  // Рендерим полученный компонент в темплейт, если он есть
  if (root) {
    const temp = component.getContent();
    if (!temp) throw new Error(`Не найдено элемента на странице с id ${component.id}}`);
    root.appendChild(temp);
  }

  component.dispatchComponentDidMount();

  return root;
};

export default renderDOM;
