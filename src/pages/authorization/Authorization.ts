import Block from '../../utils/Block';
import template from './authorization.hbs';

type AuthorizationProps = {};

class Authorization extends Block {
  constructor(props: AuthorizationProps) {
    super('div', { ...props, attr: { classes: ['cover-wrap'] } });
  }

  render() {
    return this.compile(template, this);
  }
}

export default Authorization;
