import Block from '../../services/Block';
import Button from '../notification';
import { Form } from '../form';
import template from './button.hbs';

type ModalProps = {
  title: string,
  bodyType: 'icon' | 'desc' | 'form',
  body: string | Form,
  Buttons: Button[],
};

const defaultClasses = ['modal'];

class Modal extends Block {
  constructor(props: ModalProps) {
    super('div', {
      ...props,
      attr: {
        classes: defaultClasses,
      },
    });
  }

  render() {
    return this.compile(
      template,
      {
        title: this.props.title,
        body: this.props.bodyType === 'form' ? this.children.body : this.props.body,
        buttons: this.children.Buttons,
        isIconBody: this.props.bodyType === 'icon',
        isDescBody: this.props.bodyType === 'desc',
        isFormBody: this.props.bodyType === 'form',
      },
    );
  }
}

export default Modal;
