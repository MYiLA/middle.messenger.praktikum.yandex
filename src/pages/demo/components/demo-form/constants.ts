import ItemProp from '../types';

const PROPSES: ItemProp[] = [
  {
    name: 'inputs (обязателен)',
    type: 'Input[]',
    desc: `
      Список компонентов-инпутов, привязанных к форме.
      <br> 
      Их так же необходимо привязать через пропс-атрибут "form",
      который совпадает с атрибутом формы "id"`,
  },
  {
    name: 'isDisabled',
    type: 'boolean',
    desc: 'Отключает возможность редактировать привязаные инпуты',
  },
  {
    name: '<h3 class="txt-yellow">attr: {...} (обязателен)</h3>',
    type: '<h3 class="txt-yellow">Object</h3>',
    desc: '<h3 class="txt-yellow">Атрибуты</h3>',
  },
  {
    name: 'classes',
    type: 'string[]',
    desc: 'Атрибут: cписок классов',
  },
  {
    name: 'id (обязателен)',
    type: 'string',
    desc: 'С помощью этого атрибута привязываются инпуты и кнопка типа submit',
  },
  {
    name: 'action (обязателен)',
    type: '"POST" | "PUT" | "GET" | "DELETE"',
    desc: 'Тип запроса у формы',
  },
];

export default PROPSES;
// attr: {
//   classes?: string[],
//   id: string,
//   action: 'POST' | 'PUT' | 'GET' | 'DELETE'
// }
// inputs: Input[],
// isDisabled?: boolean,
