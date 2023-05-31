import Block from '../../services/Block';
import Button from '../button';
import { Form } from '../form';
import template from './modal.hbs';

type ButtonEvent = {
  type: 'click',
  handler: (e: Event) => void
};

type ModalProps = {
  title: string,
  bodyType: 'icon' | 'desc' | 'form',
  body: string | Form,
  Buttons: Button[],
  buttonsEvents?: ButtonEvent[],
};

const defaultClasses = ['modal'];

class Modal extends Block {
  constructor(props: ModalProps) {
    const events = props.buttonsEvents;

    // Если переданы обработчики кнопкам, то добавляем их
    if (events && events?.length) {
      props.Buttons.forEach((ButtonElement, index) => {
        const event = events[index];
        ButtonElement.setProps({
          attr: {
            events: {
              [event.type]: event.handler,
            },
          },
        });
      });
    }

    const CloseButton = new Button({
      label: '',
      attr: {
        type: 'button',
        classes: ['modal__close-button'],
      },
      events: {
        click: () => {
          this.hide();
        },
      },
    });

    super('div', {
      ...props,
      attr: {
        classes: defaultClasses,
      },
      CloseButton,
    });
  }

  render() {
    return this.compile(
      template,
      {
        title: this.props.title,
        body: this.props.bodyType === 'form' ? this.children.body : this.props.body,
        buttons: this.children.Buttons,
        CloseButton: this.children.CloseButton,
        isIconBody: this.props.bodyType === 'icon',
        isDescBody: this.props.bodyType === 'desc',
        isFormBody: this.props.bodyType === 'form',
      },
    );
  }
}

export default Modal;
