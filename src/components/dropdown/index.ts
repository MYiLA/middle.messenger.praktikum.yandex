import Block from '../../services/Block';
import DropdownItem, { DropdownItemProps } from './components/dropdown-item';
import template from './dropdown.hbs';

type DropDownProps = {
  actionItems: DropdownItemProps[];
  attr?: {
    classes?: string[],
  }
};

const defaultClasses = ['dropdown'];

class DropDown extends Block {
  constructor(props: DropDownProps) {
    const Items = props.actionItems.map((item) => new DropdownItem(item));
    super('div', {
      ...props,
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes ? defaultClasses.concat(props.attr.classes) : defaultClasses,
      },
      events: {
        click: () => {
          this.setProps({ isOpen: !this.props.isOpen });
        },
      },
      Items,
      isOpen: false,
    });
  }

  render() {
    return this.compile(
      template,
      {
        label: this.props.label,
        Items: this.children.Items,
        isOpen: this.props.isOpen,
      },
    );
  }
}

export default DropDown;
