import { Rout } from "../../common/types";

import template from "./start-nav.hbs";

export const StartNav = {
  render: (routes: Rout[]) => template(routes),
}
