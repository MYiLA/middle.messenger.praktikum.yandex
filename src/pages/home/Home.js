'use strict';
import { CHAT_BRICKS } from "./constants";

const Handlebars = require("handlebars");
const compiledNavTemplate = Handlebars.compile(`
<ul class="chat-list__list">
  {{#each .}}
    <li class="chat-list__chat-brick chat-brick">
      <div class="chat-brick__avatar" style="background-color: {{this.avatarColor}}"></div>
      <div class="chat-brick__title-wrap">
        <h3 class="chat-brick__title">{{this.title}}</h3>
        <p class="chat-brick__desc">{{this.desc}}</p>
      </div>
      <div class="chat-brick__info-wrap">
        <span class="chat-brick__time">{{this.time}}</span>
        <span class="chat-brick__count">{{this.messageCount}}</span>
      </div>
    </li>
  {{/each}}
</ul>
`
);

export const Home = {
  render: () => {
    return `
    <div class="home">
      <div class="home__chat-list chat-list">
        <a href="#" class="chat-list__link">
          Профиль
          <i class="chat-list__link-icon"></i>
        </a>
        <input class="chat-list__search" id="search" placeholder="Поиск" type="search">

      </div>
    
      <div class="home__chat chat">
        <div class="chat__cap">
          Выберите чат чтобы отправить сообщение
        </div>
        ${compiledNavTemplate(CHAT_BRICKS)}
      </div>
    </div>
    `;
  }
}
