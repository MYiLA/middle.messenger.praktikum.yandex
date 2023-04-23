import Block from '../../utils/Block';
import CHATS from './constants';
import template from './home.hbs';
// Тут я получаю блок данных о чатах, сообщениях в чатах и т. д., из которого всё генерится
type HomeProps = {};
class Home extends Block {
  constructor(props: HomeProps) {
    super('div', { ...props, attr: { classes: ['home'] } });
  }

  render() {
    return this.compile(template, { chats: CHATS });
  }
}

export default Home;
