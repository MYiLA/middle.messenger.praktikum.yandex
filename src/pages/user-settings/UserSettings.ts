import template from './user-settings.hbs';
import { DATA_INPUTS, PASSWORD_INPUTS } from './constants';
import Block from '../../utils/Block';

type UserSettingsProps = {};

class UserSettings extends Block {
  constructor(props: UserSettingsProps) {
    super('div', { ...props, attr: { classes: ['user-settings'] } });
  }

  render() {
    return this.compile(template, { dataInputs: DATA_INPUTS, passwordInputs: PASSWORD_INPUTS });
  }
}

export default UserSettings;
