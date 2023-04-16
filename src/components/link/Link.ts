import { Rout } from '../../common/types';

import template from './link.hbs';

const Link = {
  render: (routes: Rout[]) => template(routes),
};

export default Link;
