import Block from '../../../../services/Block';
import template from './demo-item.hbs';

type ItemProps = {
  name: string;
  type: string;
  desc: string;
};

type DemoItemProps = {
  item: Block
  itemPropses: ItemProps[],
  name: string;
};

class DemoItem extends Block {
  constructor(props: DemoItemProps) {
    super('li', {
      ...props,
      attr: { classes: ['demo__item', 'demo-item'] },
    });
  }

  render() {
    return this.compile(template, {
      name: this.props.name,
      item: this.children.item,
      itemPropses: this.props.itemPropses,
    });
  }
}

export default DemoItem;
