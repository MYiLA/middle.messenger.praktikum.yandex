import { Avatar } from '../../../../components';
import Block from '../../../../utils/Block';
import template from './demo-avatar.hbs';
import imageHorizontalBlack from '../../pictures/horizontal-black.jpg';
import imageVerticalWhite from '../../pictures/vertical-white.jpg';

const avatar = new Avatar({
  image: imageHorizontalBlack,
  color: '#564',
  size: 130,
  attr: {
    classes: ['margin-bottom-20'],
  },
});

const avatarWhite = new Avatar({
  image: imageVerticalWhite,
  color: '#fff',
  size: 70,
  attr: {
    classes: ['margin-bottom-20'],
  },
});

const avatarDefault = new Avatar({
  size: 120,
  attr: {
    classes: ['margin-bottom-20'],
  },
});

const avatarDefaultWhite = new Avatar({
  color: '#fff',
  attr: {
    classes: ['margin-bottom-20'],
  },
});

class DemoAvatar extends Block {
  constructor() {
    super('div', {
      attr: { classes: ['demo-item__component-wrap'] },
      avatar,
      avatarWhite,
      avatarDefault,
      avatarDefaultWhite,
    });
  }

  render() {
    return this.compile(template, {
      avatar: this.children.avatar,
      avatarWhite: this.children.avatarWhite,
      avatarDefault: this.children.avatarDefault,
      avatarDefaultWhite: this.children.avatarDefaultWhite,
    });
  }
}

export default DemoAvatar;
