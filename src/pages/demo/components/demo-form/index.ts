import { Button, Input } from '../../../../components';
import Form from '../../../../components/form';
import Block from '../../../../utils/Block';
import template from './demo-form.hbs';

const Submit = new Button({
  label: 'Отправить форму',
  attr: {
    type: 'submit',
    form: 'form',
  },
});

const Input1 = new Input({
  label: 'Инпут-1',
  name: 'input1',
  type: 'text',
  form: 'form',
  events: {
    submit: (ev: Event) => {
      ev.preventDefault();
      console.log('Сабмит Инпут-1!', ev);
    },
  },
});

const Input2 = new Input({
  label: 'Инпут-2',
  name: 'input2',
  type: 'text',
  form: 'form',
  events: {
    submit: (ev: Event) => {
      ev.preventDefault();
      console.log('Сабмит Инпут-2!!', ev);
    },
  },
});

const FormDemo = new Form({
  events: {
    submit: (ev) => {
      ev.preventDefault();
      console.log('Сабмит формы form', ev, FormDemo.getProps().inputs);
    },
  },
  attr: {
    id: 'form',
    action: 'POST',
  },
  inputs: [Input1, Input2],
});

class DemoForm extends Block {
  constructor() {
    super('div', {
      attr: { classes: ['demo-item__component-wrap'] },
      Input1,
      Input2,
      Submit,
      FormDemo,
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
      },
    );
  }
}

export default DemoForm;
