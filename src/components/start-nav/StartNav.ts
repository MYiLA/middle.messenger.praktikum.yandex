import { Rout } from '../../common/types';

import template from './start-nav.hbs';

const StartNav = {
  render: (routes: Rout[]) => template(routes),
};

export default StartNav;
