import { MESSAGES as InvalidMessages, VALIDATOR } from '../../common/constant';
import { ChatsResponse, SomeObject } from '../../common/types';
import { Button, Form, Input } from '../../components';
import Modal from '../../components/modal';
import Block from '../../services/Block';
import { Router } from '../../services/Router';
import ActionName from '../../services/Store/constant';
import runAction from '../../services/Store/runAction';
import isEqual from '../../utils/isEqual';
import ChatBrick from './components/chat-brick';
import Footer from './components/footer';
import Header from './components/header';
import MessageItem from './components/message-item';
import { FORM_NAME, MESSAGES } from './constants';
import template from './home.hbs';

const router = new Router();

interface HomeProps extends SomeObject {
  selectedChatId?: string
}

class Home extends Block {
  constructor(props: HomeProps) {
    const chats = props.chats ?? [];
    console.log('ПРОПСЫ ЧАТЫ', chats, props);
    const ChatBriks = Home.getChatBricks(chats);

    const Messages = MESSAGES.map((message) => {
      const {
        time, text, image, user, isViewed,
      } = message;
      return new MessageItem({
        time,
        attr: { classes: ['body__message-item'] },
        image,
        isMy: user.id === 'id',
        text,
        isViewed,
      });
    });

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
      Messages,
      DemoButton,
      ProfileButton,
      CreateChatButton,
      ModalCreateChat,
    });
  }

  componentDidUpdate(oldProps: SomeObject, newProps: SomeObject) {
    const isRerendered = !isEqual(oldProps, newProps);
    if (isRerendered) {
      const oldChatsProps = oldProps.chats ?? [] as ChatsResponse[];
      const newChatsProps = newProps.chats ?? [] as ChatsResponse[];
      // Обновляем чаты, если они обновились
      if (oldChatsProps.length !== newChatsProps.length) {
        this.children.ChatBriks = Home.getChatBricks(newChatsProps);
      }
    }
    return isRerendered;
  }

  static getChatBricks(chats: ChatsResponse[]) {
    return chats.map((chat: ChatsResponse) => {
      const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        title, unread_count, last_message, id,
      } = chat;
      return new ChatBrick({
        title,
        attr: {
          classes: ['chat-list__chat-brick'],
        },
        events: {
          click: () => {
            runAction(ActionName.connectToChat, { id });
          },
        },
        lastMessageContent: last_message?.content,
        lastMessageTime: last_message?.time,
        unread_count,
      });
    });
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
    });
  }
}

export default Home;
