import Block from '../../utils/Block';
import CHATS from './constants';
import template from './home.hbs';
// TODO: Тут я получаю блок данных о чатах, сообщениях в чатах и т. д., из которого всё генерится
// Если selectedChatId есть, то рендерим ленту переписки
type HomeProps = { selectedChatId: string };
class Home extends Block {
  constructor(props: HomeProps) {
    super('div', { ...props, attr: { classes: ['home'] } });
  }

  render() {
    return this.compile(template, { chats: CHATS, selectedChatId: this.props.selectedChatId });
  }
}

export default Home;
