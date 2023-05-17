import { ActionName } from '../../common/constant';
import { Button, Form, Input } from '../../components';
import Block from '../../services/Block';
import { DEFAULT_SETTING, INPUTS } from './constants';
import template from './registration.hbs';

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
  actionName: ActionName.signup,
});

const RegisterButton = new Button({
  label: 'Зарегистрироваться',
  attr: {
    type: 'submit',
    form: DEFAULT_SETTING.form,
    classes: ['registration__button'],
  },
});

class Registration extends Block {
  constructor() {
    super('div', {
      attr: { classes: ['cover-wrap'] },
      FormElement,
      RegisterButton,
    });
  }

  render() {
    return this.compile(template, {
      RegisterButton: this.children.RegisterButton,
      FormElement: this.children.FormElement,
    });
  }
}

export default Registration;
