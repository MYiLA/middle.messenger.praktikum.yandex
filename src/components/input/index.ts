import Block from '../../utils/Block';
import template from './input.hbs';

// TODO: форму я найду по id, к форме привязаны инпуты.
// По событию сабмита надо делать превент дефолт и запускать валидаторы
// Валидаторы мне передают извне - они забирают текущее вэлью и валидируют
// Как забрать велью из инпута? В обработчике блюра обратиться к инпуту.
// По поводу кнопки - обработать надо при сабмите валидацию.
// Как я через кнопку получу доступ к валидаторам?
// Возможно кнопка триггерит событие сабмит у каждого инпута?

type FormItemProps = {
  label: string,
  name: string,
  type: 'email' | 'text' | 'tel' | 'password',
  form: string,
  value?: string,
  placeholder?: string,
  events?: {
    click?: (ev: Event) => void,
    // TODO: При блуре и сабмите запускать валидацию автоматически
    submit?: (ev: Event) => void,
    blur?: (ev: Event) => void,
  }
  attr?: {
    classes?: string[],
  }
  invalidMessage?: string,
  isValid?: boolean,
  validator?: (value: string) => boolean,
};

const defaultClasses = ['form__input', 'input'];

class Input extends Block {
  constructor(props: FormItemProps) {
    super('div', {
      isValid: true,
      ...props,
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
    });
  }

  addEvents() {
    // события добавляем инпутам, а не обёртке
    const { events = {} } = this.props as { events: Record<string, () => void> };
    const inputElement = this.element?.querySelector('input');
    if (inputElement) {
      Object.keys(events).forEach((eventName) => {
        inputElement.addEventListener(eventName, events[eventName]);
      });
    } else {
      throw new Error('Компонент Input: Не найдено инпутов, на которые можно навесить событие');
    }
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      name: this.props.name,
      type: this.props.type,
      form: this.props.form,
      value: this.props.value,
      placeholder: this.props.placeholder,
      invalidMessage: this.props.invalidMessage,
      isValid: this.props.isValid,
    });
  }
}

export default Input;
