import { MESSAGES, VALIDATOR } from '../../../../common/constant';
import {
  Avatar, Button, Form, Input,
} from '../../../../components';
import DropDown from '../../../../components/dropdown';
import DropdownItemType from '../../../../components/dropdown/constant';
import Modal from '../../../../components/modal';
import Block from '../../../../services/Block';
import { Router } from '../../../../services/Router';
import ActionName from '../../../../services/Store/constant';
import runAction from '../../../../services/Store/runAction';
import cropString from '../../../../utils/cropString';
import getResursePath from '../../../../utils/getResursePath';
import isEqual from '../../../../utils/isEqual';
import { HeaderProps } from '../../types';
import template from './header.hbs';

const router = new Router();

const defaultClasses = ['header'];
const FORM_NAME = {
  deleteUser: 'delete-user',
  addUser: 'add-user',
};
const TITLE_LIMIT = 50;

class Header extends Block {
  constructor(props: HeaderProps) {
    const AvatarComponent = new Avatar({
      attr: {
        classes: ['header__avatar'],
      },
      size: 30,
      image: (props.currentChat && props.currentChat.avatar)
        ? getResursePath(props.currentChat.avatar) : undefined,
    });

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

    const ExitChatButton = new Button({
      label: 'Выйти',
      attr: {
        classes: ['modal-button'],
        type: 'button',
      },
      events: {
        click: () => {
          if (!this.props.currentChat) {
            router.back();
          }
          runAction(ActionName.deleteChat, { chatId: this.props.currentChat.id });
        },
      },
    });

    const ModalExitChat = new Modal({
      title: 'Удалить чат',
      body: `Вы уверены, что хотите удалить всю историю сообщений и удалить чат “${props.currentChat}”?`,
      bodyType: 'desc',
      Buttons: [ExitChatButton],
    });

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
              ModalExitChat.show();
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
    console.log('ПЕРЕРЕНДЕР ХЕДЕРА', oldProps, newProps);
    if (isRerendered) {
      const oldChatsProps = oldProps.currentChat ?? {};
      const newChatsProps = newProps.currentChat ?? {};
      // Обновляем модалки, если поменялся текущий чат
      if (isEqual(oldChatsProps, newChatsProps) && this.children.ModalExitChat instanceof Block) {
        this.children.ModalExitChat.setProps(
          {
            body: `Вы уверены, что хотите удалить всю историю сообщений и удалить чат “${newChatsProps.title}”?`,
          },
        );
      }

      const oldAvatarProps = oldProps?.currentChat?.avatar ?? null;
      const newAvatarProps = newProps?.currentChat?.avatar ?? null;
      console.log('oldAvatarProps, newAvatarProps', oldAvatarProps, newAvatarProps);
      // Обновляем аватар, если поменялась картинка
      if (
        isEqual(oldAvatarProps, newAvatarProps)
        && this.children.AvatarComponent instanceof Block
      ) {
        this.children.AvatarComponent.setProps(
          {
            avatar: newAvatarProps,
          },
        );
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
