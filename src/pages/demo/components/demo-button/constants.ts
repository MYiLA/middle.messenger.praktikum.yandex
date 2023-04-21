import ItemProp from '../types';

const PROPSES: ItemProp[] = [
  {
    name: 'label',
    type: 'string',
    desc: 'Текст внутри кнопки',
  },
  {
    name: 'events (опционально)',
    type: `
      {
        click: (ev: Event) => void
      }
    `,
    desc: `
      Слушатели действий для кнопки. Схема:
      {Название действия: Функция-хендлер}
    `,
  },
  {
    name: 'АТРИБУТЫ (опционально)',
    type: 'attr: {...}',
    desc: '',
  },
  {
    name: 'classes',
    type: 'string[]',
    desc: 'Список классов',
  },
  {
    name: 'form',
    type: 'string',
    desc: 'Имя формы, к которой привязывается кнопка',
  },
  {
    name: 'type',
    type: '"button" | "submit"',
    desc: 'Тип кнопки',
  },
];

export default PROPSES;
