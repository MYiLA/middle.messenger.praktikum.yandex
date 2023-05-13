import { Button } from '../../../../components';
import Block from '../../../../services/Block';
import template from './demo-button.hbs';

const button = new Button({
  label: 'Я светлая кнопка',
  events: {
    click: (ev: Event) => console.log('Светлая кнопка нажата', ev),
  },
  attr: {
    type: 'submit',
    form: 'form',
    classes: ['margin-bottom-20'],
  },
});

const buttonBlack = new Button({
  label: 'Я тёмная кнопка',
  events: {
    click: (ev: Event) => console.log('Тёмная кнопка нажата', ev),
  },
  attr: {
    type: 'button',
    classes: ['button--dark', 'margin-bottom-20'],
  },
});

const buttonIconRight = new Button({
  label: '',
  attr: {
    classes: ['button--icon-right', 'margin-bottom-20'],
    type: 'button',
  },
});

class DemoButton extends Block {
  constructor() {
    super('div', {
      attr: { classes: ['demo-item__component-wrap'] },
      button,
      buttonBlack,
      buttonIconRight,
    });
  }

  render() {
    return this.compile(template, {
      button: this.props.button,
      buttonBlack: this.props.buttonBlack,
      buttonIconRight: this.props.buttonIconRight,
    });
  }
}

export default DemoButton;
