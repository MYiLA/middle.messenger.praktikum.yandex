import { MESSAGES, VALIDATOR } from '../../common/constant';
import { Button, Form, Input } from '../../components';
import Block from '../../services/Block';
import { Router } from '../../services/Router';
import ActionName from '../../services/Store/constant';
import template from './authorization.hbs';
import DEFAULT_SETTING from './constant';

const router = new Router();

const Login = new Input({
  label: 'Логин',
  name: 'login',
  type: 'text',
  form: DEFAULT_SETTING.form,
  attr: { classes: ['form__input'] },
  validator: VALIDATOR.login,
  invalidMessage: MESSAGES.invalid.login,
});

const Password = new Input({
  label: 'Пароль',
  name: 'password',
  type: 'password',
  form: DEFAULT_SETTING.form,
  attr: { classes: ['form__input'] },
  validator: VALIDATOR.password,
  invalidMessage: MESSAGES.invalid.password,
});

const FormElement = new Form({
  attr: {
    id: DEFAULT_SETTING.form,
    action: 'POST',
    classes: ['authorization__form'],
  },
  inputs: [Login, Password],
  actionName: ActionName.signin,
});

const Enter = new Button({
  label: 'Войти',
  attr: {
    type: 'submit',
    form: DEFAULT_SETTING.form,
    classes: ['authorization__button', 'button'],
  },
});

const RegisterButton = new Button({
  label: 'Нет аккаунта?',
  attr: {
    type: 'button',
    classes: ['authorization__button', 'button', 'button--link'],
  },
  events: {
    click: () => {
      router.go('/sign-up');
    },
  },
});

class Authorization extends Block {
  constructor() {
    super('div', {
      attr: {
        classes: ['cover-wrap'],
      },
      Enter,
      FormElement,
      RegisterButton,
    });
  }

  render() {
    return this.compile(template, {
      Enter: this.children.Enter,
      RegisterButton: this.children.RegisterButton,
      FormElement: this.children.FormElement,
    });
  }
}

export default Authorization;
