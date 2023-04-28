import ItemProp from '../types';

const PROPSES: ItemProp[] = [
  {
    name: 'label (обязателен)',
    type: 'string',
    desc: 'Лейбл инпута',
  },
  {
    name: 'name (обязателен)',
    type: 'string',
    desc: 'Имя поля. Учитывается при сборе данных с форм',
  },
  {
    name: 'type (обязателен)',
    type: '"email" | "text" | "tel" | "password" | "file"',
    desc: 'Тип инпута',
  },
  {
    name: 'form (обязателен)',
    type: 'string',
    desc: 'id формы, к которой привязывается инпут',
  },
  {
    name: 'value',
    type: 'string',
    desc: 'Значение в инпуте',
  },
  {
    name: 'placeholder',
    type: 'string',
    desc: 'Подсказка внутри инпута',
  },
  {
    name: 'invalidMessage',
    type: 'string',
    desc: 'Сообщение, которое показывается когда поле не валидно',
  },
  {
    name: 'isValid',
    type: 'boolean',
    desc: 'Признак, что поле валидно',
  },
  {
    name: 'isDisabled',
    type: 'boolean',
    desc: 'Признак, что поле нельзя редактировать',
  },
  {
    name: 'validator',
    type: '(value: string) => boolean',
    desc: 'Метод, который проверяет, валидно ли значение в инпуте',
  },
  {
    name: 'attr: {classes: [...]}',
    type: 'string[]',
    desc: 'Атрибут: cписок классов',
  },
];

export default PROPSES;
