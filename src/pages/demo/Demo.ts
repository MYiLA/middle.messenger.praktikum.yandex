import Block, { SomeObject } from '../../utils/Block';
import template from './demo.hbs';

type DemoProps = {
  attr?: SomeObject
};

class Demo extends Block {
  constructor(props: DemoProps) {
    super('section', props);
  }

  render() {
    return this.compile(template, this);
  }
}

export default Demo;
