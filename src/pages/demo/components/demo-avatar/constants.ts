import ItemProp from '../types';

const PROPSES: ItemProp[] = [
  {
    name: 'image',
    type: 'string',
    desc: 'Ссылка на картинку аватара',
  },
  {
    name: 'color',
    type: 'string',
    desc: 'Цвет аватара. Добавляется при регистрации, применяется если не загружена картинка аватара',
  },
  {
    name: 'size',
    type: 'number',
    desc: 'Размер аватара в px',
  },
  {
    name: 'attr: {classes: [...]}',
    type: 'string[]',
    desc: 'Атрибут: cписок классов',
  },
];

export default PROPSES;
