import { Router } from '../../common/types';
import template from './start-nav.hbs';

const StartNav = {
  render: (routes: Router[]) => template(routes),
};

export default StartNav;
