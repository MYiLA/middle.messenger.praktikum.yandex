import { Message } from '../../../../common/types';
import MessageItem from '../message-item';

const getMessages = (
  messages: Message[],
  currentUserId?: number,
): MessageItem[] => {
  console.log('messages.length', messages.length, messages);
  if (messages.length === 0) return [];
  return messages.map((message) => {
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
};

export default getMessages;
