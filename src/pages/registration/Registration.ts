import INPUTS from './constants';
import template from './registration.hbs';

const Registration = {
  render: () => template({ inputs: INPUTS }),
};

export default Registration;
