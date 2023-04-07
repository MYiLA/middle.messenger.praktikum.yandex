import Handlebars from "handlebars";

import { CHAT_BRICKS } from "./constants";

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
        <span class="chat-brick__count">{{this.messagesCount}}</span>
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
        <div class="chat-list__link-wrap">
          <a href="#" class="chat-list__link">
            Профиль
          </a>
        </div>
        <input class="chat-list__search" id="search" placeholder="Поиск" type="search">
        ${compiledNavTemplate(CHAT_BRICKS)}
      </div>
    
      <div class="home__chat chat">
        <div class="chat__info">
          Выберите чат чтобы отправить сообщение
        </div>
      </div>
    </div>
    `;
  }
}
