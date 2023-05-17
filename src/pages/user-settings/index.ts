import template from './user-settings.hbs';
import { DATA_INPUTS, FORM, PASSWORD_INPUTS } from './constants';
import Block from '../../services/Block';
import {
  Avatar, Button, Form, Input,
} from '../../components';
import { ActionName } from '../../common/constant';

const AvatarInput = new Input({
  attr: { classes: ['input--avatar'] },
  form: FORM.avatarChange,
  label: 'Поменять аватар',
  name: 'avatar',
  type: 'file',
});

const DataInputs = DATA_INPUTS.map((input) => {
  const {
    invalidMessage, label, name, type, validator, value,
  } = input;

  return new Input({
    attr: { classes: ['input--right-label'] },
    form: FORM.dataChange,
    label,
    name,
    type,
    invalidMessage,
    validator,
    value,
    isDisabled: true,
  });
});

const PasswordInputs = PASSWORD_INPUTS.map((input) => {
  const {
    invalidMessage, label, name, type, validator, value, repeatInputName,
  } = input;

  return new Input({
    attr: { classes: ['input--right-label'] },
    form: FORM.passwordChange,
    label,
    name,
    type,
    invalidMessage,
    validator,
    value,
    repeatInputName,
  });
});

const FormPassword = new Form({
  attr: {
    classes: ['user-settings__form'],
    id: FORM.passwordChange,
    action: 'POST',
  },
  inputs: PasswordInputs,
  actionName: ActionName.setProfilePassword,
});

const FormData = new Form({
  attr: {
    classes: ['user-settings__form'],
    id: FORM.dataChange,
    action: 'POST',
  },
  inputs: DataInputs,
  actionName: ActionName.setProfileData,
});

const FormAvatar = new Form({
  attr: {
    classes: ['user-settings__avatar-form'],
    id: FORM.avatarChange,
    action: 'POST',
  },
  inputs: [AvatarInput],
  actionName: ActionName.setProfileAvatar,
});

const AvatarComponent = new Avatar({
  attr: { classes: ['user-settings__avatar'] },
  size: 130,
});

const SubmitData = new Button({
  label: 'Сохранить',
  attr: {
    classes: ['user-settings__button'],
    type: 'submit',
    form: FORM.dataChange,
  },
});

const SubmitPassword = new Button({
  label: 'Сохранить',
  attr: {
    classes: ['user-settings__button'],
    type: 'submit',
    form: FORM.passwordChange,
  },
});

const ChangePasswordBtn = new Button({
  label: 'Изменить пароль',
  attr: {
    classes: ['user-settings__button'],
    type: 'button',
  },
});

const ChangeDataBtn = new Button({
  label: 'Изменить данные',
  attr: {
    classes: ['user-settings__button'],
    type: 'button',
  },
});

class UserSettings extends Block {
  constructor() {
    SubmitPassword.hide();
    SubmitData.hide();
    FormPassword.hide();

    ChangeDataBtn.setProps({
      events: {
        click: () => {
          FormData.setProps({ isDisabled: false });
          ChangeDataBtn.hide();
          ChangePasswordBtn.hide();
          SubmitData.show();
        },
      },
    });

    ChangePasswordBtn.setProps({
      events: {
        click: () => {
          FormPassword.show();
          FormData.hide();
          ChangeDataBtn.hide();
          ChangePasswordBtn.hide();
          SubmitPassword.show();
        },
      },
    });

    super('div', {
      attr: {
        classes: ['user-settings'],
      },
      FormPassword,
      FormData,
      FormAvatar,
      AvatarComponent,
      ChangePasswordBtn,
      ChangeDataBtn,
      SubmitData,
      SubmitPassword,
    });
  }

  render() {
    return this.compile(template, {
      FormPassword: this.children.FormPassword,
      FormData: this.children.FormData,
      FormAvatar: this.children.FormAvatar,
      AvatarComponent: this.children.AvatarComponent,
      ChangePasswordBtn: this.children.ChangePasswordBtn,
      ChangeDataBtn: this.children.ChangeDataBtn,
      SubmitData: this.children.SubmitData,
      SubmitPassword: this.children.SubmitPassword,
    });
  }
}

export default UserSettings;
