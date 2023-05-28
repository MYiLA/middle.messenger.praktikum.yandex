import Block from '../../../../services/Block';
import { MessageItemProps } from '../../types';
import template from './message-item.hbs';

class MessageItem extends Block {
  constructor(props: MessageItemProps) {
    const defaultClasses = ['message-item'];

    if (props.isMy) {
      defaultClasses.push('message-item--my');
    }

    super('li', {
      ...props,
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
    });
  }

  render() {
    return this.compile(template, {
      time: this.props.time,
      text: this.props.text,
      image: this.props.image,
      isViewed: this.props.isViewed,
    });
  }
}

export default MessageItem;
