'use strict';
export const Authorization = {
  render: () => {
    return `
    <div class="cover-wrap">
      <div class="authorization">
        <h1 class="authorization__title">Вход</h1>
        <div class="authorization__form form">
          <form action="POST" class="form__form">
            <div class="form__item">
              <div class="form__input-wrap">
                <label class="form__input" for="login">Логин</label>
                <input class="form__label" type="text" name="login" id="login"></input>
              </div>
              <div class="form__message">
                <i class="form__message-icon"></i>
                Неверный логин
              </div>
            </div>
            <div class="form__item">
              <div class="form__input-wrap">
                <label class="form__label" for="password">Пароль</label>
                <input class="form__input" type="password" name="password" id="password"></input>
              </div>
            </div>
          </form>
        </div>
        <div class="authorization__button-wrap">
          <button href="#" class="authorization__button button button--light" type="submit">Войти</button>
          <a href="#" class="authorization__link link">Нет аккаунта?</a>
        </div>
      </div>
    </div>
    `;
  }
}
