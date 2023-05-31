import Block from '../../../../services/Block';
import DropdownItemType from '../../constant';
import template from './dropdown-item.hbs';

export type DropdownItemProps = {
  events?: {
    click: (ev: Event) => void,
  }
  label: string,
  type: DropdownItemType,
};

class DropdownItem extends Block {
  constructor(props: DropdownItemProps) {
    super('li', {
      ...props,
      attr: {
        classes: ['dropdown__item', `dropdown__item--${props.type}`],
      },
    });
  }

  render() {
    return this.compile(template, { label: this.props.label });
  }
}

export default DropdownItem;
