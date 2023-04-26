import ItemProp from '../types';

const PROPSES: ItemProp[] = [
  {
    name: 'label (обязательный)',
    type: 'string',
    desc: 'Текст внутри кнопки',
  },
  {
    name: 'events',
    type: `
<pre>
{
  click: (ev: Event) => void,
}
</pre>
    `,
    desc: `
      Слушатели действий для кнопки. Схема:
      {Название действия: Функция-хендлер}
    `,
  },
  {
    name: '<h3 class="txt-yellow">attr: {...}</h3>',
    type: '<h3 class="txt-yellow">Object</h3>',
    desc: '<h3 class="txt-yellow">Атрибуты</h3>',
  },
  {
    name: 'classes',
    type: 'string[]',
    desc: `
    Атрибут: cписок классов
    <br>
    <br>
    <span class="txt-yellow">.button--dark</span>&emsp;&emsp;&emsp;&emsp;&ensp;делает кнопку тёмной
    <br>
    <span class="txt-yellow">.button--icon-right</span>&emsp;&emsp;кнопка c иконкой 'стрелка направо'
    `,
  },
  {
    name: 'form',
    type: 'string',
    desc: 'Атрибут: имя формы, к которой привязывается кнопка',
  },
  {
    name: 'type',
    type: '"button" | "submit"',
    desc: 'Атрибут: тип кнопки',
  },
];

export default PROPSES;
