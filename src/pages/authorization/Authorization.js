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
                <input class="form__input" type="text" name="login" id="login" placeholder="Логин"></input>
                <label class="form__label" for="login">Логин</label>
              </div>
              <div class="form__message">
                Неверный логин
              </div>
            </div>
            <div class="form__item">
              <div class="form__input-wrap">
                <input class="form__input" type="password" name="password" id="password" placeholder="Пароль"></input>
                <label class="form__label" for="password">Пароль</label>
              </div>
            </div>
          </form>
        </div>
        <div class="authorization__button-wrap">
          <button href="#" class="authorization__button button" type="submit">Войти</button>
          <a href="#" class="authorization__link link">Нет аккаунта?</a>
        </div>
      </div>
    </div>
    `;
  }
}