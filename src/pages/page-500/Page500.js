export const Page500 = {
  render: () => {
    return `
    <div class="page-error">
      <div class="page-error__error-wrap">
        <h1 class="page-error__title">500</h1>
        <p class="page-error__desc">Мы уже фиксим</p>
        <a class="page-error__button button" href="#">Вернуться к чатам</a>
      </div>
    </div>
    `;
  }
}