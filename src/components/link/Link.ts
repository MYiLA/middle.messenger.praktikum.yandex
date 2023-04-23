import { Router } from '../../common/types';
import template from './link.hbs';

const Link = {
  render: (routes: Router[]) => template(routes),
};

export default Link;
