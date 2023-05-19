const clearDOM = (query: string): void => {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error('renderDOM: не найден элемент DOM, который нужно очистить от компонентов');
  }

  root.innerHTML = '';
};

export default clearDOM;
