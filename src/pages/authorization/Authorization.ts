import Block, { SomeObject } from '../../utils/Block';
import template from './authorization.hbs';

type AuthorizationProps = {
  attr?: SomeObject
};

class Authorization extends Block {
  constructor(props: AuthorizationProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this);
  }
}

export default Authorization;
