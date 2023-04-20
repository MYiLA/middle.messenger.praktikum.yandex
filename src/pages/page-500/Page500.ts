import Block, { SomeObject } from '../../utils/Block';
import template from './page-500.hbs';

type Page500Props = {
  attr?: SomeObject
};

class Page500 extends Block {
  constructor(props: Page500Props) {
    super('div', props);
  }

  render() {
    return this.compile(template, this);
  }
}

export default Page500;
