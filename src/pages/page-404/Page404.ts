import Block from '../../utils/Block';
import template from './page-404.hbs';

class Page404 extends Block {
  constructor() {
    super('div');
  }

  render() {
    console.log('Рендер 404');
    return this.compile(template, this);
  }
}

export default Page404;
