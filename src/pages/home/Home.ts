import Block, { SomeObject } from '../../utils/Block';
import CHATS from './constants';
import template from './home.hbs';

type HomeProps = {
  attr?: SomeObject
};

class Home extends Block {
  constructor(props: HomeProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, { chats: CHATS });
  }
}

export default Home;
