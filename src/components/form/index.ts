import { SomeObject } from '../../common/types';
import Block from '../../utils/Block';
import template from './form.hbs';

type FormProps = {
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
      events: {
        submit: (ev: Event) => this.onSubmit(ev),
      },
    });
  }

  onSubmit = (ev: Event): void => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    if (!form) return;
    // Собираем поля из формы
    const inputs = [...form.querySelectorAll('input')];
    const inputBlocks = this.children.inputs as Block[];

    const result: SomeObject = {};
    let formIsValid = true;
    let currentIndex = 0;

    // Проверяем каждое поле по порядку. Если хотя бы одно не валидно - не пускаем дальше
    while (formIsValid && currentIndex < inputs.length) {
      const input = inputs[currentIndex];
      const inputBlockIndex = inputBlocks.findIndex(
        (inputBlock) => (inputBlock.getProps().name === input.name),
      );
      const inputBlock = inputBlocks[inputBlockIndex];
      const { validator } = inputBlock.getProps();

      if (validator) {
        formIsValid = validator(input.value);
      }

      // Если поле не прошло валидатор, то делаем его невалидным
      if (!formIsValid) {
        inputBlock.setProps({ isValid: false });
      // Если поле прошло валидатор, то делаем его валидным и записываем в результат
      } else {
        inputBlock.setProps({ isValid: true });
        result[input.name] = input.value;
      }
      currentIndex += 1;
    }

    if (formIsValid) {
      // Если все поля прошли успешно валидацию, то отправляем данные в консоль
      console.log(result);
    }
  };

  render() {
    return this.compile(template, { inputs: [{}, {}] });
  }
}

export default Form;
