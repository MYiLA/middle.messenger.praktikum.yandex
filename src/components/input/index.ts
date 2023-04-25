import Block from '../../utils/Block';
import template from './input.hbs';

type FormItemProps = {
  label: string,
  name: string,
  type: 'email' | 'text' | 'tel' | 'password' | 'file',
  form: string,
  value?: string,
  placeholder?: string,
  attr?: {
    classes?: string[],
  }
  invalidMessage?: string,
  isValid?: boolean,
  isDisabled?: boolean,
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
        // Замешиваем класcы по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
      events: {
        blur: (ev: Event) => this.onBlur(ev),
      },
    });
  }

  addEvents() {
    // События добавляем инпутам, а не обёртке
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

  onBlur(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const { value } = input;
    const { validator } = this.getProps();

    // Валидируем введённое значение при Blur
    if (validator) {
      this.setProps({ isValid: validator(value), value });
    } else {
      // Если валидатора нет, сохраняем введённое пользователем значение в пропсах компонента
      this.setProps({ value });
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
      isDisabled: this.props.isDisabled,
    });
  }
}

export default Input;
