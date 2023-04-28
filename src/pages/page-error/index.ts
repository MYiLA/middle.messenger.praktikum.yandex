import Block from '../../utils/Block';
import template from './page-error.hbs';

type PageErrorProps = {
  code: string,
  desc: string,
};

class PageError extends Block {
  constructor(props: PageErrorProps) {
    super('div', { ...props, attr: { classes: ['page-error'] } });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default PageError;
