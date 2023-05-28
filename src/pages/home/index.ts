import { Connect } from '../../services/Store';
import Home from './Home';

export default Connect(
  Home,
  (state) => (
    {
      chats: state.chats,
      profile: state.profile,
      currentChat: state.currentChat,
    }
  ) ?? {},
);
