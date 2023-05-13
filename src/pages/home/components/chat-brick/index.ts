import { Avatar } from '../../../../components';
import Block from '../../../../services/Block';
import template from './chat-brick.hbs';

type ChatBrickProps = {
  attr?: {
    classes?: string[],
  }
  href: string,
  avatarColor?: string,
  title: string,
  lastMessageContent?: string,
  lastMessageTime?: string,
  unreadCount?: number,
  avatar?: string,
};

const DEFAULT_CLASSES = ['chat-brick'];
const TEXT_LIMIT = 50;

const cropString = (string: string, symbolLimit: number) => ((string.length > symbolLimit) ? `${string.substring(0, symbolLimit)}...` : string);

class ChatBrick extends Block {
  constructor(props: ChatBrickProps) {
    const AvatarComponent = new Avatar({
      attr: {
        classes: ['chat-brick__avatar'],
      },
      color: props.avatarColor,
      image: props.avatar,
    });

    super('li', {
      ...props,
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? DEFAULT_CLASSES.concat(props.attr.classes) : DEFAULT_CLASSES,
      },
      Avatar: AvatarComponent,
    });
  }

  render() {
    return this.compile(template, {
      href: this.props.href,
      avatarColor: this.props.avatarColor,
      title: this.props.title,
      lastMessageContent: cropString(this.props.lastMessageContent, TEXT_LIMIT),
      lastMessageTime: this.props.lastMessageTime,
      unreadCount: this.props.unreadCount > 99 ? '99+' : this.props.unreadCount,
      Avatar: this.children.Avatar,
    });
  }
}

export default ChatBrick;
