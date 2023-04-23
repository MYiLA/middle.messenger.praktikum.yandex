import Block from '../../utils/Block';
import template from './avatar.hbs';
// TODO: Аватар встречается сразу в 3 местах. Форма это не аватар. аватар лишь часть формы
// Аватару нужна ссылка на аватар, размер(класс) состояние по-умолчанию когда ссылка не передана
type AvatarProps = {
  attr?: {
    classes?: string[],
  }
};

const defaultClasses = ['avatar'];

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super('div', {
      ...props,
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
      events: {
        click: (ev: Event) => this.onClick(ev),
      },
    });
  }

  onClick(ev: Event) {
    console.log('аватар загружается', this, ev);
  }

  render() {
    return this.compile(template, { label: this.props.label });
  }
}

export default Avatar;
