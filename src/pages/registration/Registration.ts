import Block, { SomeObject } from '../../utils/Block';
import INPUTS from './constants';
import template from './registration.hbs';

type RegistrationProps = {
  attr?: SomeObject
};

class Registration extends Block {
  constructor(props: RegistrationProps) {
    super('div', props);
  }

  render() {
    console.log('Рендер авторизации');
    return this.compile(template, { inputs: INPUTS });
  }
}

export default Registration;
