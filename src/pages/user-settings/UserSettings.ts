import template from './user-settings.hbs';
import { DATA_INPUTS, FORM, PASSWORD_INPUTS } from './constants';
import Block from '../../services/Block';
import {
  Avatar, Button, Form, Input,
} from '../../components';
import ActionName from '../../services/Store/constant';
import runAction from '../../services/Store/runAction';
import { SomeObject } from '../../common/types';
import isEqual from '../../utils/isEqual';

class UserSettings extends Block {
  constructor(props?: SomeObject) {
    const AvatarInput = new Input({
      attr: { classes: ['input--avatar'] },
      form: FORM.avatarChange,
      label: 'Поменять аватар',
      name: 'avatar',
      type: 'file',
    });

    const DataInputs = DATA_INPUTS.map((input) => {
      const {
        invalidMessage, label, name, type, validator,
      } = input;

      const value = props ? props[name] : undefined;

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
        invalidMessage, label, name, type, validator, repeatInputName,
      } = input;

      return new Input({
        attr: { classes: ['input--right-label'] },
        form: FORM.passwordChange,
        label,
        name,
        type,
        invalidMessage,
        validator,
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
      image: props?.avatar,
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

    const LogoutBtn = new Button({
      label: 'Выйти',
      attr: {
        classes: ['user-settings__button', 'button--dark'],
        type: 'button',
      },
      events: {
        click: () => {
          runAction(ActionName.logout);
        },
      },
    });

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
      ...props,
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
      LogoutBtn,
    });
  }

  componentDidUpdate(oldProps: SomeObject, newProps: SomeObject) {
    const isRerendered = !isEqual(oldProps, newProps);
    if (isRerendered) {
      // Обновляем инпуты, если их значения обновились
      const FormData = this.children.FormData as Form;
      const FormPassword = this.children.FormPassword as Form;

      const updateInput = (InputChild: Input) => {
        const oldValue = InputChild.getProps().value;
        const newValue = newProps[InputChild.getProps().name];
        if (!isEqual(oldValue, newValue)) { InputChild.setProps({ value: newValue }); }
      };

      FormData.getChildren().inputs.forEach(updateInput);
      FormPassword.getChildren().inputs.forEach(updateInput);

      // Обновляем аватар, если он обновился
      const AvatarChild = this.children.AvatarComponent as Avatar;
      const oldAvatar = AvatarChild.getProps().image;
      const newAvatar = newProps.avatar;
      if (!isEqual(oldAvatar, newAvatar)) { AvatarChild.setProps({ image: newAvatar }); }
    }
    return isRerendered;
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
      LogoutBtn: this.children.LogoutBtn,
      first_name: this.props.first_name,
    });
  }
}

export default UserSettings;
