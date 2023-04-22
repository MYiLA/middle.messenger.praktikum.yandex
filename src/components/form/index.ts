import Block from '../../utils/Block';
import template from './form.hbs';

type FormProps = {
  events: {
    submit: (ev: Event) => void,
  }
  attr: {
    classes?: string[],
    id: string,
    action: 'POST' | 'PUT' | 'GET' | 'DELETE'
  }
  inputs: Block[],
};

const defaultClasses = ['form__form'];

class Form extends Block {
  constructor(props: FormProps) {
    super('form', {
      ...props,
      componentName: 'FORM',
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
    });
  }

  render() {
    return this.compile(template, { inputs: [{}, {}] });
  }
}

export default Form;
