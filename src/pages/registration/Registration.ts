import Block from '../../utils/Block';
import INPUTS from './constants';
import template from './registration.hbs';

type RegistrationProps = {};

class Registration extends Block {
  constructor(props: RegistrationProps) {
    super('div', { ...props, attr: { classes: ['cover-wrap'] } });
  }

  render() {
    return this.compile(template, { inputs: INPUTS });
  }
}

export default Registration;
