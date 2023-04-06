'use strict';
import { DATA_INPUTS } from "./constants";

const Handlebars = require("handlebars");

const compiledNavTemplate = Handlebars.compile(`
  {{#each .}}
    <div class="form__item">
      <div class="form__input-wrap">
        <input class="form__input" value="{{this.value}}" type="{{this.type}}" name="{{this.name}}"></input>
        <label class="form__label">{{this.label}}</label>
      </div>
    </div>
  {{/each}}
`
);

export const UserSettings = {
  render: () => {
    return `
    <div class="user-settings">
      <div class="user-settings__left-wrap">
        <a class="user-settings__link-back" href="#" ></a>
      </div>
    
      <div class="user-settings__wrap">
        <div class="user-settings__avatar-wrap">
          <div class="user-settings__avatar avatar">
            <form class="avatar__form" action="post" >
              <input class="avatar__input" type="file" name="avatar" accept="image/png, image/jpeg"></input>
            </form>
          </div>
    
          <h1 class="user-settings__name">Иван</h1>
          <div class="user-settings__form form form--setting">
            <form id="setting-user-data" action="POST" class="form__form">
              ${compiledNavTemplate(DATA_INPUTS)}
            </form>
          </div>
    
          <div class="user-settings__button-wrap">
            <button class="user-settings__button button" type="button">Изменить пароль</button>
            <button class="user-settings__button button" type="button">Изменить данные</button>
            <a class="user-settings__button button button--dark" href="#">Выйти</a>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}
