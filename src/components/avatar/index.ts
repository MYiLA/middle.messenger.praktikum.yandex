import Block from '../../services/Block';
import template from './avatar.hbs';
import DEFAULT_SETTING from './constants';

type AvatarProps = {
  attr?: {
    classes?: string[],
  },
  /* Ссылка на картинку аватара */
  image?: string,
  /* Цвет аватара. Добавляется при регистрации, применяется если не загружена картинка аватара */
  color?: string,
  /* Размер аватара в px */
  size?: number
};

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super('div', {
      ...props,
      attr: {
        ...props.attr,
        // Замешиваем класc по-умолчанию
        classes: props.attr?.classes
          ? DEFAULT_SETTING.classes.concat(props.attr.classes)
          : DEFAULT_SETTING.classes,
        // Цвет и размер берётся извне
        style: `width: ${props.size}px; height: ${props.size}px; background-color:${props.color ? props.color : DEFAULT_SETTING.color}`,
      },
    });
  }

  render() {
    return this.compile(template, {
      image: this.props.image,
    });
  }
}

export default Avatar;
