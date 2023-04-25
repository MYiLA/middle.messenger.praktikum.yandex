import Block from '../../utils/Block';
import ChatBrick from './components/chat-brick';
import Footer from './components/footer';
import Header from './components/header';
import MessageItem from './components/message-item';
import { CHATS, MESSAGES } from './constants';
import template from './home.hbs';

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
    });
  }

  render() {
    return this.compile(template, {
      selectedChatId: this.props.selectedChatId,
      ChatBriks: this.children.ChatBriks,
      HeaderComponent: this.children.HeaderComponent,
      FooterComponent: this.children.FooterComponent,
      Messages: this.children.Messages,
    });
  }
}

export default Home;
