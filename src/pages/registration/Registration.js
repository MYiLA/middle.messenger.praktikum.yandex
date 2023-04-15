import { INPUTS } from "./constants";
import template from "./registration.hbs"

export const Registration = {
  render: () => template({inputs: INPUTS})
}
