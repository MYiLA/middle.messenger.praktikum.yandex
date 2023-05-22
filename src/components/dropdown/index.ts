import Block from '../../services/Block';
import DropdownItem, { DropdownItemProps } from './components/dropdown-item';
import template from './dropdown.hbs';
// TODO: клики не проходят по итемам, надо добавить открывание по клику
// на кнопку дропдауна. клик добавляет/убирает класс. Можно сразу работать с DOM,
// так как априори дропдаун отрендерится
type DropDownProps = {
  actionItems: DropdownItemProps[];
  attr?: {
    classes?: string[],
  }
};

const defaultClasses = ['dropdown', 'dropdown--open'];

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
      Items,
    });
  }

  render() {
    return this.compile(template, { label: this.props.label, Items: this.children.Items });
  }
}

export default DropDown;
