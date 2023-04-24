import Block from '../../utils/Block';
import ChatBrick from './components/chat-brick';
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

class Home extends Block {
  constructor(props: HomeProps) {
    super('div', {
      ...props,
      attr: {
        classes: ['home'],
      },
      ChatBriks,
    });
  }

  render() {
    return this.compile(template, {
      chats: CHATS,
      selectedChatId: this.props.selectedChatId,
      messages: MESSAGES,
      ChatBriks: this.children.ChatBriks,
    });
  }
}

export default Home;
