'use strict';
import { INPUTS } from "./constants";

const Handlebars = require("handlebars");

const compiledNavTemplate = Handlebars.compile(`
  {{#each .}}
    <div class="form__item">
      <div class="form__input-wrap">
        <input class="form__input" value="{{this.value}}" type="{{this.type}}" name="{{this.name}}" placeholder="{{this.placeholder}}"></input>
        <label class="form__label">{{this.label}}</label>
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
                <input class="form__input" value="••••••••••••" type="password" name="password" id="password" placeholder="Пароль"></input>
                <label class="form__label" for="password">Пароль(ещё раз)</label>
              </div>
              <div class="form__message">
                Неверный логин
              </div>
            </div>
          </form>
        </div>
        <div class="registration__button-wrap">
          <button href="#" class="registration__button button" type="submit" form="registration">Зарегистрироваться</button>
          <a href="#" class="registration__link link">Войти</a>
        </div>
      </div>
    </div>
    `;
  }
}
