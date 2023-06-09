import Block from '../../services/Block';
import template from './button.hbs';

type ButtonProps = {
  label: string,
  events?: {
    click?: (ev: Event) => void,
  }
  attr?: {
    classes?: string[],
    form?: string,
    type?: 'button' | 'submit'
  }
};

const defaultClasses = ['button'];

class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', {
      ...props,
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
    });
  }

  render() {
    return this.compile(template, { label: this.props.label });
  }
}

export default Button;
