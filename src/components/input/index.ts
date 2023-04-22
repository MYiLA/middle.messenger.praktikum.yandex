import Block from '../../utils/Block';
import template from './input.hbs';

// TODO: форму я найду по id, к форме привязаны инпуты.
// По событию сабмита надо делать превент дефолт и запускать валидаторы
// Валидаторы мне передают извне - они забирают текущее вэлью и валидируют
// Как забрать велью из инпута? В обработчике блюра обратиться к инпуту.
// По поводу кнопки - обработать надо при сабмите валидацию.
// Как я через кнопку получу доступ к валидаторам?
// Возможно кнопка триггерит событие сабмит у каждого инпута?

type Validator = {
  validator: (value: string) => boolean,
  invalidMessage: string,
};

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
  validators?: Validator[]
};

const defaultClasses = ['input'];

class FormItem extends Block {
  constructor(props: FormItemProps) {
    super('div', {
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
    return this.compile(template, { label: this.props.label });
  }
}

export default FormItem;
