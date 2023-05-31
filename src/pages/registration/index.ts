import { Button, Form, Input } from '../../components';
import Block from '../../services/Block';
import { Router } from '../../services/Router';
import ActionName from '../../services/Store/constant';
import { DEFAULT_SETTING, INPUTS } from './constants';
import template from './registration.hbs';

const router = new Router();

const inputs = INPUTS.map((input) => {
  const {
    label, name, type, validator, invalidMessage, repeatInputName,
  } = input;
  return new Input({
    label,
    name,
    type,
    form: DEFAULT_SETTING.form,
    attr: { classes: ['form__input'] },
    validator,
    invalidMessage,
    repeatInputName,
  });
});

const FormElement = new Form({
  attr: {
    id: DEFAULT_SETTING.form,
    action: 'POST',
    classes: ['authorization__form'],
  },
  inputs,
  actionName: ActionName.registration,
});

const RegisterButton = new Button({
  label: 'Зарегистрироваться',
  attr: {
    type: 'submit',
    form: DEFAULT_SETTING.form,
    classes: ['registration__button'],
  },
});

const EnterButton = new Button({
  label: 'Войти',
  attr: {
    type: 'button',
    classes: ['registration__button', 'button--link', 'button'],
  },
  events: {
    click: () => {
      router.go('/');
    },
  },
});

class Registration extends Block {
  constructor() {
    super('div', {
      attr: { classes: ['cover-wrap'] },
      FormElement,
      RegisterButton,
      EnterButton,
    });
  }

  render() {
    return this.compile(template, {
      RegisterButton: this.children.RegisterButton,
      EnterButton: this.children.EnterButton,
      FormElement: this.children.FormElement,
    });
  }
}

export default Registration;
