import Block from '../../utils/Block';
import {
  DemoButton, DemoInput, DemoItem, PROPS_BUTTON, PROPS_INPUT,
} from './components';
import template from './demo.hbs';

const ButtonItem = new DemoButton();
const inputItem = new DemoInput();

const DemoButtonComponent = new DemoItem({ name: 'Button', itemPropses: PROPS_BUTTON, item: ButtonItem });
const DemoInputComponent = new DemoItem({ name: 'Input', itemPropses: PROPS_INPUT, item: inputItem });

class Demo extends Block {
  constructor() {
    super('section', {
      attr: { classes: ['demo'] },
      buttonItem: DemoButtonComponent,
      inputItem: DemoInputComponent,
    });
  }

  render() {
    return this.compile(template, {
      buttonItem: this.children.DemoButtonComponent,
      inputItem: this.children.DemoInputComponent,
    });
  }
}

export default Demo;
