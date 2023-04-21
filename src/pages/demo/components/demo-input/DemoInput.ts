import Block from '../../../../utils/Block';
import PROPSES from './constants';
import template from './demo-input.hbs';

class DemoInput extends Block {
  constructor() {
    super('div', {
      name: 'Input', attr: { classes: ['demo-item__component-wrap'] },
    });
  }

  render() {
    return this.compile(template, { name: 'Input', propses: PROPSES });
  }
}

export default DemoInput;
