import { ActionName, MESSAGES, VALIDATOR } from '../../../../common/constant';
import { Button, Form, Input } from '../../../../components';
import Block from '../../../../services/Block';
import template from './footer.hbs';

type FooterProps = {
  attr?: {
    classes?: string[],
  }
};

const defaultClasses = ['footer'];
const FORM_NAME = 'sendMessage';

const InputComponent = new Input({
  attr: {
    classes: ['input--message'],
  },
  form: FORM_NAME,
  label: 'Сообщение',
  name: 'message',
  type: 'text',
  placeholder: 'Сообщение',
  invalidMessage: MESSAGES.invalid.message,
  validator: VALIDATOR.message,
});

const FormComponent = new Form({
  attr: {
    classes: ['footer__form'],
    action: 'POST',
    id: FORM_NAME,
  },
  inputs: [InputComponent],
  actionName: ActionName.sendMessage,
});

const ButtonComponent = new Button({
  label: '',
  attr: {
    classes: ['footer__button', 'button--icon-right'],
    form: FORM_NAME,
    type: 'submit',
  },
});

class Footer extends Block {
  constructor(props: FooterProps) {
    super('div', {
      ...props,
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
      FormComponent,
      ButtonComponent,
    });
  }

  render() {
    return this.compile(template, {
      FormComponent: this.children.FormComponent,
      ButtonComponent: this.children.ButtonComponent,
    });
  }
}

export default Footer;
