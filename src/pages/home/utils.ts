import { ChatsResponse } from '../../common/types';
import ActionName from '../../services/Store/constant';
import runAction from '../../services/Store/runAction';
import Chat from './components/chat';
import ChatBrick from './components/chat-brick';
import ChatStub from './components/chat-stub';

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

export { getChatBricks, getCurrentChat };
