import Block from '../../utils/Block';
import {
  DemoAvatar,
  DemoButton,
  DemoInput,
  DemoForm,
  DemoItem,
  PROPS_BUTTON,
  PROPS_FORM,
  PROPS_INPUT,
  PROPS_AVATAR,
} from './components';
import template from './demo.hbs';

const ButtonItem = new DemoButton();
const InputItem = new DemoInput();
const FormItem = new DemoForm();
const AvatarItem = new DemoAvatar();

const DemoButtonComponent = new DemoItem({ name: 'Button', itemPropses: PROPS_BUTTON, item: ButtonItem });
const DemoInputComponent = new DemoItem({ name: 'Input', itemPropses: PROPS_INPUT, item: InputItem });
const DemoFormComponent = new DemoItem({ name: 'Form', itemPropses: PROPS_FORM, item: FormItem });
const DemoAvatarComponent = new DemoItem({ name: 'Avatar', itemPropses: PROPS_AVATAR, item: AvatarItem });

class Demo extends Block {
  constructor() {
    super('section', {
      attr: { classes: ['demo'] },
      DemoButtonComponent,
      DemoInputComponent,
      DemoFormComponent,
      DemoAvatarComponent,
    });
  }

  render() {
    return this.compile(template, {
      DemoButtonComponent: this.children.DemoButtonComponent,
      DemoInputComponent: this.children.DemoInputComponent,
      DemoFormComponent: this.children.DemoFormComponent,
      DemoAvatarComponent: this.children.DemoAvatarComponent,
    });
  }
}

export default Demo;
