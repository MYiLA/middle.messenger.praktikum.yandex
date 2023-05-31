import Block from '../../../../services/Block';
import { ChatStubProps } from '../../types';
import template from './chat-stub.hbs';

const defaultClasses = ['chat'];

class ChatStub extends Block {
  constructor(props: ChatStubProps) {
    super('div', {
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
    });
  }

  render() {
    return this.compile(template, {});
  }
}

export default ChatStub;
