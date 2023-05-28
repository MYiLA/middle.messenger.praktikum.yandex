import Block from '../../../../services/Block';
import { BodyProps } from '../../types';
import MessageItem from '../message-item';
import template from './body.hbs';

const defaultClasses = ['body'];

class Body extends Block {
  constructor(props: BodyProps) {
    const messages = props.messages ?? [];
    const Messages = messages.map((message) => {
      const {
        time, content, user,
      } = message;
      return new MessageItem({
        time,
        attr: { classes: ['body__message-item'] },
        isMy: props.currentUserId === user.id,
        text: content,
      });
    });
    super('div', {
      ...props,
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
      Messages,
    });
  }

  render() {
    return this.compile(template, { Messages: this.children.Messages });
  }
}

export default Body;
