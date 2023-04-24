import Block from '../../utils/Block';
import MESSAGES from './components/body/constants';
import CHATS from './constants';
import template from './home.hbs';
// TODO: Тут я получаю блок данных о чатах, сообщениях в чатах и т. д., из которого всё генерится
// Если selectedChatId есть, то рендерим ленту переписки
// TODO: вынести chat-brick в отдельный компонент.
// Без этого туда нереально впихнуть кастомный аватар.
// Компонент аватара должен передаваться извне. Формироваться карточка будет через данные.
// Пример - форма
type HomeProps = { selectedChatId?: string };
class Home extends Block {
  constructor(props: HomeProps) {
    super('div', { ...props, attr: { classes: ['home'] } });
  }

  render() {
    return this.compile(template, {
      chats: CHATS,
      selectedChatId: this.props.selectedChatId,
      messages: MESSAGES,
    });
  }
}

export default Home;
