import template from './user-settings.hbs';
import { DATA_INPUTS, PASSWORD_INPUTS } from './constants';
import Block, { SomeObject } from '../../utils/Block';

type UserSettingsProps = {
  attr?: SomeObject
};

class UserSettings extends Block {
  constructor(props: UserSettingsProps) {
    super('div', props);
  }

  render() {
    console.log('Рендер авторизации');
    return this.compile(template, { dataInputs: DATA_INPUTS, passwordInputs: PASSWORD_INPUTS });
  }
}

export default UserSettings;
