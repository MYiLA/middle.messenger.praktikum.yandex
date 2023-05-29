import { Connect } from '../../../../services/Store';
import Body from './Body';

export default Connect(
  Body,
  (state) => (
    {
      messages: state.messages,
      currentUserId: state.profile?.id,
    }
  ) ?? {},
);
