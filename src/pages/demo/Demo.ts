import { Button } from '../../components';
import Block from '../../utils/Block';
import template from './demo.hbs';

type DemoProps = {};

const button = new Button({
  label: 'Я светлая кнопка',
  events: {
    click: (ev: Event) => console.log('Светлая кнопка нажата', ev),
  },
  type: 'button',
  attr: {
    classes: ['margin-bottom-20'],
  },
});

const buttonBlack = new Button({
  label: 'Я тёмная кнопка',
  events: {
    click: (ev: Event) => console.log('Тёмная кнопка нажата', ev),
  },
  type: 'button',
  attr: {
    classes: ['margin-bottom-20', 'button--dark'],
  },
});

class Demo extends Block {
  constructor(props: DemoProps) {
    super('section', {
      ...props, attr: { classes: ['demo'] }, button, buttonBlack,
    });
  }

  render() {
    return this.compile(template, {
      button: this.props.button,
      buttonBlack: this.props.buttonBlack,
    });
  }
}

export default Demo;
