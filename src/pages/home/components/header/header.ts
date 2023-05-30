import { MESSAGES, VALIDATOR } from '../../../../common/constant';
import {
  Button, Form, Input,
} from '../../../../components';
import DropDown from '../../../../components/dropdown';
import DropdownItemType from '../../../../components/dropdown/constant';
import Modal from '../../../../components/modal';
import Block from '../../../../services/Block';
import ActionName from '../../../../services/Store/constant';
import cropString from '../../../../utils/cropString';
import isEqual from '../../../../utils/isEqual';
import { HeaderProps } from '../../types';
import template from './header.hbs';
import { getAvatar, getModalExitChat } from './utils';

const defaultClasses = ['header'];
const FORM_NAME = {
  deleteUser: 'delete-user',
  addUser: 'add-user',
};
const TITLE_LIMIT = 50;

class Header extends Block {
  constructor(props: HeaderProps) {
    const AvatarComponent = getAvatar(props.currentChat?.avatar);

    const DeleteUserInput = new Input({
      form: FORM_NAME.deleteUser,
      label: 'Логин',
      name: 'login',
      type: 'text',
      invalidMessage: MESSAGES.invalid.login,
      validator: VALIDATOR.login,
    });

    const DeleteUserForm = new Form({
      attr: {
        action: 'POST',
        id: FORM_NAME.deleteUser,
        classes: ['modal__form'],
      },
      inputs: [DeleteUserInput],
      actionName: ActionName.deleteUserFromChat,
    });

    const DeleteUserFormSubmit = new Button({
      label: 'Удалить',
      attr: {
        classes: ['modal-button'],
        type: 'submit',
        form: FORM_NAME.deleteUser,
      },
    });

    const ModalDeleteUser = new Modal({
      title: 'Удалить пользователя',
      body: DeleteUserForm,
      bodyType: 'form',
      Buttons: [DeleteUserFormSubmit],
    });

    const AddUserInput = new Input({
      form: FORM_NAME.addUser,
      label: 'Логин',
      name: 'login',
      type: 'text',
      invalidMessage: MESSAGES.invalid.login,
      validator: VALIDATOR.login,
    });

    const AddUserForm = new Form({
      attr: {
        action: 'POST',
        id: FORM_NAME.addUser,
        classes: ['modal__form'],
      },
      inputs: [AddUserInput],
      actionName: ActionName.addUserToChat,
    });

    const AddUserFormSubmit = new Button({
      label: 'Добавить',
      attr: {
        classes: ['modal-button'],
        type: 'submit',
        form: FORM_NAME.addUser,
      },
    });

    const ModalAddUser = new Modal({
      title: 'Добавить пользователя',
      body: AddUserForm,
      bodyType: 'form',
      Buttons: [AddUserFormSubmit],
    });

    const ModalExitChat = getModalExitChat(props.currentChat?.id, props.currentChat?.title);

    const DropDownComponent = new DropDown({
      actionItems: [
        {
          label: 'Добавить пользователя',
          type: DropdownItemType.add,
          events: {
            click: () => {
              ModalAddUser.show();
            },
          },
        },
        {
          label: 'Удалить пользователя',
          type: DropdownItemType.delete,
          events: {
            click: () => {
              ModalDeleteUser.show();
            },
          },
        },
        {
          label: 'Удалить чат',
          type: DropdownItemType.exit,
          events: {
            click: () => {
              if (this.children.ModalExitChat instanceof Block) {
                this.children.ModalExitChat.show();
              }
            },
          },
        },
      ],
      attr: {
        classes: ['header__dropdown'],
      },
    });

    ModalAddUser.hide();
    ModalDeleteUser.hide();
    ModalExitChat.hide();

    super('div', {
      ...props,
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
      AvatarComponent,
      DropDownComponent,
      ModalAddUser,
      ModalDeleteUser,
      ModalExitChat,
    });
  }

  componentDidUpdate(oldProps: HeaderProps, newProps: HeaderProps) {
    const isRerendered = !isEqual(oldProps, newProps);
    if (isRerendered) {
      const oldChatsProps = oldProps.currentChat ?? {};
      const newChatsProps = newProps.currentChat ?? {};
      // Обновляем модалки, если поменялся текущий чат
      if (!isEqual(oldChatsProps, newChatsProps)) {
        // eslint-disable-next-line max-len
        this.children.ModalExitChat = getModalExitChat(newChatsProps?.id, newChatsProps?.title);
        this.children.ModalExitChat.hide();
      }

      const oldAvatarProps = oldProps?.currentChat?.avatar ?? null;
      const newAvatarProps = newProps?.currentChat?.avatar ?? null;

      // Обновляем аватар, если поменялась картинка
      if (!isEqual(oldAvatarProps, newAvatarProps)) {
        this.children.AvatarComponent = getAvatar(newAvatarProps);
      }
    }
    return isRerendered;
  }

  render() {
    return this.compile(template, {
      AvatarComponent: this.children.AvatarComponent,
      DropDownComponent: this.children.DropDownComponent,
      ModalAddUser: this.children.ModalAddUser,
      ModalDeleteUser: this.children.ModalDeleteUser,
      ModalExitChat: this.children.ModalExitChat,
      title: this.props.currentChat ? cropString(this.props.currentChat.title, TITLE_LIMIT) : '',
    });
  }
}

export default Header;
