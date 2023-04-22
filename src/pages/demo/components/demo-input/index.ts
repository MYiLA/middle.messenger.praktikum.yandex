import { Input } from '../../../../components';
import Block from '../../../../utils/Block';
import template from './demo-input.hbs';

const input = new Input({
  label: 'Инпут',
  name: 'input',
  type: 'text',
  form: 'form-demo',
  value: 'Тест value инпута',
  attr: { classes: ['margin-bottom-20'] },
});

const inputRighrLabel = new Input({
  label: 'Лейбл инпута',
  name: 'right-label',
  type: 'text',
  form: 'form-demo',
  invalidMessage: 'Инпут не валиден! ААААА',
  isValid: false,
  attr: { classes: ['input--right-label', 'margin-bottom-20'] },
});

const inputSearch = new Input({
  label: 'Лейбл инпута',
  name: 'search',
  type: 'text',
  form: 'form-demo',
  attr: { classes: ['input--search', 'margin-bottom-20'] },
  placeholder: 'Поиск',
});

const inputMessage = new Input({
  label: 'Лейбл инпута',
  name: 'message',
  type: 'text',
  form: 'form-demo',
  attr: { classes: ['input--message'] },
  placeholder: 'Инпут для сообщений',
});

class DemoInput extends Block {
  constructor() {
    super('div', {
      attr: { classes: ['demo-item__component-wrap'] },
      input,
      inputRighrLabel,
      inputSearch,
      inputMessage,
    });
  }

  render() {
    return this.compile(
      template,
      {
        input: this.children.input,
        inputRighrLabel: this.children.inputRighrLabel,
        inputSearch: this.children.inputSearch,
        inputMessage: this.children.inputMessage,
      },
    );
  }
}

export default DemoInput;
