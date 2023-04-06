'use strict';
export const Page404 = {
  render: () => {
    return `
    <div class="page-error">
      <div class="cover-wrap">
        <div class="page-error__error-wrap">
          <h1 class="page-error__title">404</h1>
          <p class="page-error__desc">Не туда попали</p>
          <a class="page-error__button button button--light" href="#">Вернуться к чатам</a>
        </div>
      </div>
    </div>
    `;
  }
}
