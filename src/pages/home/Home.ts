import CHATS from './constants';
import template from './home.hbs';

const Home = {
  render: () => template({ chats: CHATS }),
};

export default Home;
