import Block from '../../services/Block';
import template from './notification.hbs';

type NotificationProps = {
  type: 'success' | 'error' | 'info',
  message: string,
  delay?: number,
  attr?: {
    classes?: string[],
  }
};
// Нотификации не привязаны к элементам, они рендерятся в body
// Их можно вызвать из экшена например. Они удаляются из Dom по delay
// Нужен ли реестр блоков нотификаций? Или они создаются-удаляются сразу?
const defaultClasses = ['notification'];
const defaultDelay = 900000;

class Notification extends Block {
  constructor(props: NotificationProps) {
    super('div', {
      delay: defaultDelay,
      ...props,
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
    });
  }

  render() {
    return this.compile(template, { label: this.props.label });
  }
}

export default Notification;
