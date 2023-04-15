import { CHATS } from "./constants";
import template from "./home.hbs"

export const Home = {
  render: () => template({chats: CHATS})
}
