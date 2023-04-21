import Block from '../../utils/Block';
import CHATS from './constants';
import template from './home.hbs';

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
