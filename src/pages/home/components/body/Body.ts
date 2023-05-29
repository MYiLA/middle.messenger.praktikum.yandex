import Block from '../../../../services/Block';
import isEqual from '../../../../utils/isEqual';
import { BodyProps } from '../../types';
import getMessages from './utils';
import template from './body.hbs';
import isArray from '../../../../utils/isArray';

const defaultClasses = ['body'];

class Body extends Block {
  constructor(props: BodyProps) {
    const messages = props.messages ?? [];
    const Messages = getMessages(messages, props.currentUserId) ?? [];

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

  componentDidUpdate(oldProps: BodyProps, newProps: BodyProps) {
    const isRerendered = !isEqual(oldProps, newProps);
    if (isRerendered) {
      const oldMessages = oldProps.messages ?? [];
      const newMessages = newProps.messages ?? [];
      // Обновляем сообщения, если они обновились
      if (oldMessages.length !== newMessages.length || !isEqual(oldMessages, newMessages)) {
        this.children.Messages = getMessages(newMessages, newProps.currentUserId);
      }
    }
    return isRerendered;
  }

  render() {
    return this.compile(template, {
      Messages: isArray(this.children.Messages) && this.children.Messages.length ? this.children.Messages : '',
    });
  }
}

export default Body;
