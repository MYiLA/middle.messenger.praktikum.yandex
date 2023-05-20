import { Button } from '../../components';
import Block from '../../services/Block';
import { Router } from '../../services/Router';
import ChatBrick from './components/chat-brick';
import Footer from './components/footer';
import Header from './components/header';
import MessageItem from './components/message-item';
import { CHATS, MESSAGES } from './constants';
import template from './home.hbs';

const router = new Router();

type HomeProps = {
  selectedChatId?: string
};

const ChatBriks = CHATS.map((chat) => {
  const {
    avatarColor, title, unreadCount, lastMessage,
  } = chat;
  return new ChatBrick({
    href: '#/chat/id',
    title,
    attr: {
      classes: ['chat-list__chat-brick'],
    },
    avatarColor,
    lastMessageContent: lastMessage.content,
    lastMessageTime: lastMessage.time,
    unreadCount,
  });
});

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

class Home extends Block {
  constructor(props: HomeProps) {
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
    });
  }
}

export default Home;
