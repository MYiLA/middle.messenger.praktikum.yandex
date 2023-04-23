import { Router } from '../../common/types';
import template from './link.hbs';
// TODO: ссылка текст + иконка, отдельно иконка, отдельно текст, в виде белой или тёмной кнопки
// скорей всего все виды делаются стилями. Иконка добавляется, если передана ссылка на неё
// Пропсы - href(обязательно) и ссылка на иконку
const Link = {
  render: (routes: Router[]) => template(routes),
};

export default Link;
