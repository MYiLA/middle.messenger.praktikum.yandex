import { Avatar } from '../../../../components';
import Block from '../../../../services/Block';
import cropString from '../../../../utils/cropString';
import template from './chat-brick.hbs';

type ChatBrickProps = {
  attr?: {
    classes?: string[],
  }
  avatarColor?: string,
  title: string,
  lastMessageContent?: string,
  lastMessageTime?: string,
  unread_count?: number,
  avatar?: string,
  events?: {
    click?: (ev: Event) => void,
  }
};

const DEFAULT_CLASSES = ['chat-brick'];
const TEXT_LIMIT = 50;
const TITLE_LIMIT = 23;

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
      avatarColor: this.props.avatarColor,
      title: cropString(this.props.title, TITLE_LIMIT),
      lastMessageContent: this.props.lastMessageContent ? cropString(this.props.lastMessageContent, TEXT_LIMIT) : '',
      lastMessageTime: this.props.lastMessageTime,
      unread_count: this.props.unread_count > 99 ? '99+' : this.props.unread_count,
      Avatar: this.children.Avatar,
    });
  }
}

export default ChatBrick;
