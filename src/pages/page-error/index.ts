import { Button } from '../../components';
import Block from '../../services/Block';
import { Router } from '../../services/Router';
import template from './page-error.hbs';

const router = new Router();

const ReturnButton = new Button({
  label: 'Вернуться на предыдущую страницу',
  attr: {
    type: 'button',
    classes: ['page-error__button', 'button'],
  },
  events: {
    click: () => {
      router.back();
    },
  },
});

type PageErrorProps = {
  code: string,
  desc: string,
};

class PageError extends Block {
  constructor(props: PageErrorProps) {
    super('div', {
      ...props,
      attr: {
        classes: ['page-error'],
      },
      ReturnButton,
    });
  }

  render() {
    return this.compile(template, {
      code: this.props.code,
      desc: this.props.desc,
      ReturnButton: this.children.ReturnButton,
    });
  }
}

export default PageError;
