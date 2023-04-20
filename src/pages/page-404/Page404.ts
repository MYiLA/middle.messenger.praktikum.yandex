import Block, { SomeObject } from '../../utils/Block';
import template from './page-404.hbs';

type Page404Props = {
  attr?: SomeObject
};

class Page404 extends Block {
  constructor(props: Page404Props) {
    super('div', props);
  }

  render() {
    return this.compile(template, this);
  }
}

export default Page404;
