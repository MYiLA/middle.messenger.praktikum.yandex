import Block from '../../utils/Block';
import {
  DemoButton, DemoInput, DemoItem, PROPS_BUTTON, PROPS_FORM, PROPS_INPUT,
} from './components';
import DemoForm from './components/demo-form';
import template from './demo.hbs';

const ButtonItem = new DemoButton();
const InputItem = new DemoInput();
const FormItem = new DemoForm();

const DemoButtonComponent = new DemoItem({ name: 'Button', itemPropses: PROPS_BUTTON, item: ButtonItem });
const DemoInputComponent = new DemoItem({ name: 'Input', itemPropses: PROPS_INPUT, item: InputItem });
const DemoFormComponent = new DemoItem({ name: 'Form', itemPropses: PROPS_FORM, item: FormItem });

class Demo extends Block {
  constructor() {
    super('section', {
      attr: { classes: ['demo'] },
      DemoButtonComponent,
      DemoInputComponent,
      DemoFormComponent,
    });
  }

  render() {
    return this.compile(template, {
      DemoButtonComponent: this.children.DemoButtonComponent,
      DemoInputComponent: this.children.DemoInputComponent,
      DemoFormComponent: this.children.DemoFormComponent,
    });
  }
}

export default Demo;
