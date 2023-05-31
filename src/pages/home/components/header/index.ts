import { Connect } from '../../../../services/Store';
import Header from './header';

export default Connect(
  Header,
  (state) => ({ currentChat: state.currentChat }) ?? {},
);
