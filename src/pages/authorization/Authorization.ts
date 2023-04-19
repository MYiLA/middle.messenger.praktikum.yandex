import Block from '../../utils/Block';
import template from './authorization.hbs';

class Authorization extends Block {
  constructor() {
    super('div');
  }

  render() {
    console.log('Рендер авторизации');
    return this.compile(template, this);
  }
}

export default Authorization;
