import { MESSAGES as InvalidMessages, VALIDATOR } from '../../common/constant';
import { Button, Form, Input } from '../../components';
import Modal from '../../components/modal';
import Block from '../../services/Block';
import { Router } from '../../services/Router';
import ActionName from '../../services/Store/constant';
import isEqual from '../../utils/isEqual';
import Footer from './components/footer';
import Header from './components/header';
import FORM_NAME from './constants';
import template from './home.hbs';
import { HomeProps } from './types';
import { getChatBricks, getCurrentChat } from './utils';

const router = new Router();
class Home extends Block {
  constructor(props: HomeProps) {
    const chats = props.chats ?? [];
    const ChatBriks = getChatBricks(chats);
    const ChatComponent = getCurrentChat(props, props.withId);

    const HeaderComponent = new Header({ attr: { classes: ['chat__header'] } });
    const FooterComponent = new Footer({ attr: { classes: ['chat__footer'] } });

    const DemoButton = new Button({
      label: 'Компоненты',
      attr: {
        type: 'button',
        classes: ['chat-list__button', 'button', 'button--arrow-text-left'],
      },
      events: {
        click: () => {
          router.go('/demo');
        },
      },
    });

    const ProfileButton = new Button({
      label: 'Профиль',
      attr: {
        type: 'button',
        classes: ['chat-list__button', 'button', 'button--arrow-text-right'],
      },
      events: {
        click: () => {
          router.go('/settings');
        },
      },
    });

    const NameChatInput = new Input({
      form: FORM_NAME.createChat,
      label: 'Название чата',
      name: 'title',
      type: 'text',
      invalidMessage: InvalidMessages.invalid.message,
      validator: VALIDATOR.message,
    });

    const CreateChatForm = new Form({
      attr: {
        action: 'POST',
        id: FORM_NAME.createChat,
        classes: ['modal__form'],
      },
      inputs: [NameChatInput],
      actionName: ActionName.createChat,
    });

    const CreateChatFormSubmit = new Button({
      label: 'Создать чат',
      attr: {
        classes: ['modal-button'],
        type: 'submit',
        form: FORM_NAME.createChat,
      },
    });

    const ModalCreateChat = new Modal({
      title: 'Создание чата',
      body: CreateChatForm,
      bodyType: 'form',
      Buttons: [CreateChatFormSubmit],
    });

    const CreateChatButton = new Button({
      label: 'Создать новый чат',
      attr: {
        type: 'button',
        classes: ['chat-list__button', 'button', 'margin-bottom-14'],
      },
      events: {
        click: () => {
          ModalCreateChat.show();
        },
      },
    });

    ModalCreateChat.hide();

    super('div', {
      ...props,
      attr: {
        classes: ['home'],
      },
      ChatBriks,
      HeaderComponent,
      FooterComponent,
      DemoButton,
      ProfileButton,
      CreateChatButton,
      ModalCreateChat,
      ChatComponent,
    });
  }

  componentDidUpdate(oldProps: HomeProps, newProps: HomeProps) {
    const isRerendered = !isEqual(oldProps, newProps);
    if (isRerendered) {
      const oldChatsProps = oldProps.chats ?? [];
      const newChatsProps = newProps.chats ?? [];
      // Обновляем чаты, если они обновились
      if (oldChatsProps.length !== newChatsProps.length || !isEqual(oldChatsProps, newChatsProps)) {
        this.children.ChatBriks = getChatBricks(newChatsProps);
      }
    }
    return isRerendered;
  }

  render() {
    return this.compile(template, {
      selectedChatId: this.props.selectedChatId,
      ChatBriks: this.children.ChatBriks,
      HeaderComponent: this.children.HeaderComponent,
      FooterComponent: this.children.FooterComponent,
      Messages: this.children.Messages,
      DemoButton: this.children.DemoButton,
      ProfileButton: this.children.ProfileButton,
      CreateChatButton: this.children.CreateChatButton,
      ModalCreateChat: this.children.ModalCreateChat,
      withId: this.props.withId,
      ChatComponent: this.children.ChatComponent,
    });
  }
}

export default Home;
