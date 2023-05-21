import { Connect } from '../../services/Store';
import UserSettings from './UserSettings';

export default Connect(
  UserSettings,
  (state) => state.profile ?? {},
);
