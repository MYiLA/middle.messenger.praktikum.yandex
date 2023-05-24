import { MESSAGES, VALIDATOR } from '../../../../common/constant';
import { ChatsResponse } from '../../../../common/types';
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
import template from './header.hbs';

type HeaderProps = {
  attr?: {
    classes?: string[],
  },
  currentChat?: ChatsResponse
};

const router = new Router();

const defaultClasses = ['header'];
const FORM_NAME = {
  deleteUser: 'delete-user',
  addUser: 'add-user',
};

const AvatarComponent = new Avatar({
  attr: {
    classes: ['header__avatar'],
  },
  color: '#2917F4',
  size: 30,
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
  actionName: ActionName.addUserInChat,
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
// TODO: для хедера нужна информация о конкретном чате по id из адресной строки.
// Айдишник текущего чата меняем в сторе при переходе на чат.
// Там же запрашиваем данные чата и перезаписываем стор.
// Тут уже забираем готовые данные по чату из поля currentChat
class Header extends Block {
  constructor(props: HeaderProps) {
    const ExitChatButton = new Button({
      label: 'Выйти',
      attr: {
        classes: ['modal-button'],
        type: 'button',
      },
      events: {
        click: () => {
          if (!this.props.currentChat) {
            // TODO: Если был переход через адресную строку на чат,
            // то его тоже надо так же подгружать в стор
            // Процесс подгружения чата в стор часто встречается.
            // Это надо зафиначить в экшн. Экшн проверяет, есть ли доступ к чату.
            // Если доступ есть - подгружает. Если нет, то кидает на список чатов
            // TODO: Нужно нормально очищать стор
            router.back();
          }
          runAction(ActionName.deleteChat, this.props.currentChat.chatId);
        },
      },
    });
    // TODO: Кажется, что компонент упадёт, если ещё не подгрузилось название чата.
    // Надо подумать как это обыграть
    const currentChatTitle = props.currentChat ? props.currentChat.title : '';

    const ModalExitChat = new Modal({
      title: 'Выйти из чата',
      body: `Вы уверены, что хотите удалить всю историю сообщений и выйти из чата “${currentChatTitle}”?`,
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
          label: 'Выйти из чата',
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

  render() {
    return this.compile(template, {
      AvatarComponent: this.children.AvatarComponent,
      DropDownComponent: this.children.DropDownComponent,
      ModalAddUser: this.children.ModalAddUser,
      ModalDeleteUser: this.children.ModalDeleteUser,
      ModalExitChat: this.children.ModalExitChat,
    });
  }
}

export default Header;
