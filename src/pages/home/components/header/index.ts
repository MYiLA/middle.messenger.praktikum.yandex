import { Avatar } from '../../../../components';
import DropDown from '../../../../components/dropdown';
import DropdownItemType from '../../../../components/dropdown/constant';
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

const DropDownComponent = new DropDown({
  actionItems: [
    {
      label: 'Добавить пользователя',
      type: DropdownItemType.add,
      events: {
        click: () => {
          console.log('Добавить пользователя');
        },
      },
    },
    {
      label: 'Удалить пользователя',
      type: DropdownItemType.delete,
      events: {
        click: () => {
          console.log('Удалить пользователя');
        },
      },
    },
    {
      label: 'Выйти из чата',
      type: DropdownItemType.exit,
      events: {
        click: () => {
          console.log('Выйти из чата');
        },
      },
    },
  ],
  attr: {
    classes: ['header__dropdown'],
  },
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
      DropDownComponent,
    });
  }

  render() {
    return this.compile(template, {
      AvatarComponent: this.children.AvatarComponent,
      DropDownComponent: this.children.DropDownComponent,
    });
  }
}

export default Header;
