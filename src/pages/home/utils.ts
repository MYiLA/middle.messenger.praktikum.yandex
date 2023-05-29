import { ChatsResponse, Message } from '../../common/types';
import ActionName from '../../services/Store/constant';
import runAction from '../../services/Store/runAction';
import Chat from './components/chat';
import ChatBrick from './components/chat-brick';
import ChatStub from './components/chat-stub';
import MessageItem from './components/message-item';

const getChatBricks = (chats: ChatsResponse[]) => chats.map((chat: ChatsResponse) => {
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

const getCurrentChat = (withId: boolean) => {
  // Если пропсы для текущего чата существуют, то рендерим чат
  if (withId) {
    const ChatComponent = new Chat({
      attr: {
        classes: ['home__chat'],
      },
    });
    return ChatComponent;
  }
  // Иначе рендерим заглушку
  const ChatComponent = new ChatStub({
    attr: {
      classes: ['home__chat'],
    },
  });
  return ChatComponent;
};

const getMessages = (
  messages: Message[],
  currentUserId?: number,
): MessageItem[] => messages.map((message) => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    time, content, user_id, is_read,
  } = message;
  return new MessageItem({
    time,
    attr: { classes: ['body__message-item'] },
    isMy: currentUserId ? currentUserId === user_id : false,
    text: content,
    isViewed: !!is_read,
  });
});

export { getChatBricks, getCurrentChat, getMessages };
