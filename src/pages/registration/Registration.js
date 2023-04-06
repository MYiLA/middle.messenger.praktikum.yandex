'use strict';
import { INPUTS } from "./constants";

const Handlebars = require("handlebars");

const compiledNavTemplate = Handlebars.compile(`
  {{#each .}}
    <div class="form__item">
      <div class="form__input-wrap">
        <label class="form__input">{{this.label}}</label>
        <input class="form__label" value="{{this.value}}" type="{{this.type}}" name="{{this.name}}"></input>
      </div>
    </div>
  {{/each}}
`
);

export const Registration = {
  render: () => {
    return `
    <div class="cover-wrap">
      <div class="registration">
        <h1 class="registration__title">Вход</h1>
        <div class="registration__form form">
          <form id="registration" action="POST" class="form__form form">
           ${compiledNavTemplate(INPUTS)}
            <div class="form__item">
              <div class="form__input-wrap">
                <label class="form__input" for="password">Пароль(ещё раз)</label>
                <input class="form__label" value="••••••••••••" type="password" name="password" id="password"></input>
              </div>
              <div class="form__message">
                <i class="form__message-icon"></i>
                Неверный логин
              </div>
            </div>
          </form>
        </div>
        <div class="registration__button-wrap">
          <button href="#" class="registration__button button button--light" type="submit" form="registration">Зарегистрироваться</button>
          <a href="#" class="registration__link link">Войти</a>
        </div>
      </div>
    </div>
    `;
  }
}
