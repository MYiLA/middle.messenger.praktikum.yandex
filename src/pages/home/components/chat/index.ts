import Block from '../../../../services/Block';
import getSocket from '../../../../services/webSocket/getSocket';
import { ChatProps } from '../../types';
import Body from '../body';
import Footer from '../footer';
import Header from '../header';
import template from './chat.hbs';

const defaultClasses = ['chat'];

class Chat extends Block {
  constructor(props: ChatProps) {
    const socketUrl = `wss://ya-praktikum.tech/ws/chats/${props.profileId}/${props.currentChatId}/${props.token}`;
    const socket = getSocket(socketUrl);
    console.log('socket', socket);
    console.log('CHAT props', socketUrl);

    const HeaderComponent = new Header({ attr: { classes: ['chat__header'] } });
    const FooterComponent = new Footer({ attr: { classes: ['chat__footer'] } });
    const BodyComponent = new Body({
      attr: {
        classes: ['chat__body'],
      },
    });
    super('div', {
      ...props,
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
      HeaderComponent,
      BodyComponent,
      FooterComponent,
    });
  }

  // componentDidUpdate(oldProps: ChatProps, newProps: ChatProps) {
  //   const isRerendered = !isEqual(oldProps, newProps);
  //   if (isRerendered) {
  //     console.log('ЧАТ ХОЧЕТ ОБНОВИТЬСЯ');
  //   }
  //   return isRerendered;
  // }

  render() {
    return this.compile(template, {
      HeaderComponent: this.children.HeaderComponent,
      FooterComponent: this.children.FooterComponent,
      BodyComponent: this.children.BodyComponent,
    });
  }
}

export default Chat;
