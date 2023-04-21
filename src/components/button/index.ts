import Block from '../../utils/Block';
import template from './button.hbs';

type ButtonProps = {
  label: string,
  events?: {
    click: (ev: Event) => void
  }
  isLink?: boolean,
  /* button | submit */
  type: string,
  shouldRender?: boolean,
  form?: string[]
  attr?: { classes: string[] }
};

class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', {
      ...props,
      attr: {
        // Замешиваем классы по-умолчанию с атрибутами
        classes: props.attr?.classes ? ['button'].concat(props.attr.classes) : ['button'],
      },
    });
  }

  render() {
    return this.compile(template, { label: this.props.label });
  }
}

export default Button;
