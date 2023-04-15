import template from "./user-settings.hbs";
import { DATA_INPUTS, PASSWORD_INPUTS } from "./constants";

export const UserSettings = {
  render: () => template({dataInputs: DATA_INPUTS, passwordInputs: PASSWORD_INPUTS })
}
