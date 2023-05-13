import { Avatar } from '../../../../components';
import Block from '../../../../services/Block';
import template from './header.hbs';

type HeaderProps = {
  attr?: {
    classes?: string[],
  }
};

const defaultClasses = ['header'];

const AvatarComponent = new Avatar({
  attr: {
    classes: ['header__avatar'],
  },
  color: '#2917F4',
  size: 30,
});

class Header extends Block {
  constructor(props: HeaderProps) {
    super('div', {
      ...props,
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
      AvatarComponent,
    });
  }

  render() {
    return this.compile(template, { AvatarComponent: this.children.AvatarComponent });
  }
}

export default Header;
