import {
  Button, Form, FormProps, Input,
} from '../../../../components';
import Block from '../../../../utils/Block';
import template from './demo-form.hbs';

const Input1 = new Input({
  label: 'Инпут-1',
  name: 'input1',
  type: 'text',
  form: 'form',
  attr: { classes: ['margin-bottom-20'] },
  validator: (value) => !!value,
  invalidMessage: 'Это поле обязательное для заполнения',
});

const Input2 = new Input({
  label: 'Инпут-2',
  name: 'input2',
  type: 'text',
  form: 'form',
  attr: { classes: ['margin-bottom-20'] },
  validator: (value) => /^([a-z0-9]{5,})$/.test(value),
  invalidMessage: 'Минимум 5 символов. Символы - цифры и буквы в нижнем регистре',
});

const FormDemo = new Form({
  attr: {
    id: 'form',
    action: 'POST',
  },
  inputs: [Input1, Input2],
});

const Submit = new Button({
  label: 'Отправить форму',
  attr: {
    type: 'submit',
    form: 'form',
    classes: ['margin-bottom-20'],
  },
});

const DisabledButton = new Button({
  label: 'Задизейблить/Раздизейблить форму',
  attr: {
    type: 'button',
  },
  events: {
    click: () => {
      const currentIsDisabled = FormDemo.getProps().isDisabled;
      const newFormProps = { isDisabled: !currentIsDisabled } as FormProps;
      FormDemo.setProps(newFormProps);
    },
  },
});

class DemoForm extends Block {
  constructor() {
    super('div', {
      attr: { classes: ['demo-item__component-wrap'] },
      Input1,
      Input2,
      Submit,
      FormDemo,
      DisabledButton,
    });
  }

  render() {
    return this.compile(
      template,
      {
        Input1: this.children.Input1,
        Input2: this.children.Input2,
        Submit: this.children.Submit,
        FormDemo: this.children.FormDemo,
        DisabledButton: this.children.DisabledButton,
      },
    );
  }
}

export default DemoForm;
