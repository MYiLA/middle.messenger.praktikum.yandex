import { Button } from '../../../../components';
import Block from '../../../../utils/Block';
import PROPSES from './constants';
import template from './demo-button.hbs';

const button = new Button({
  label: 'Я светлая кнопка',
  events: {
    click: (ev: Event) => console.log('Светлая кнопка нажата', ev),
  },
  attr: {
    type: 'submit',
    form: 'form',
  },
});

const buttonBlack = new Button({
  label: 'Я тёмная кнопка',
  events: {
    click: (ev: Event) => console.log('Тёмная кнопка нажата', ev),
  },
  attr: {
    classes: ['button--dark', 'optional-class'],
    type: 'button',
  },
});

class DemoButton extends Block {
  constructor() {
    super('div', {
      attr: { classes: ['demo-item__component-wrap'] },
      button,
      buttonBlack,
    });
  }

  render() {
    console.log('рендер бутона');
    return this.compile(template, {
      name: 'Button',
      button: this.props.button,
      buttonBlack: this.props.buttonBlack,
      propses: PROPSES,
    });
  }
}

export default DemoButton;
