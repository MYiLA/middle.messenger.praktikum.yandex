'use strict';
import { PageHome, PageAuthorization, PageRegistration, PageUserSettings, Page404, Page500 } from "./pages";

const Handlebars = require("handlebars");

const ROUTES = [
  { path: '/authorization', component: PageAuthorization,  name: 'Авторизация' },
  { path: '/registration',  component: PageRegistration,   name: 'Регистрация' },
  { path: '/',              component: PageHome,           name: 'Список чатов и лента переписки' },
  { path: '/user-settings', component: PageUserSettings,   name: 'Настройки пользователя' },
  { path: '/404',           component: Page404,        name: 'Страница 404' },
  { path: '/500',           component: Page500,        name: 'Страница 500' },
];

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) => routes.find(route => route.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
  // Находит компонент по текущему роуту
  const path = parseLocation();
  // Если роут не найден, показывает страницу 404
  const { component = Page404Component } = findComponentByPath(path, ROUTES) || {};
  // Рендерит полученный компонент в документ
  document.getElementById('app').innerHTML = component.render();
};

// TODO: Временно, пока проект статичен
const ready = () => {
  const startNavContainer = document.getElementById('start-nav');
  console.log('startNavContainer', startNavContainer)
  const compiledNavTemplate = Handlebars.compile(`
    <ul>
      {{#each .}}
        <li>
          <a href="{{this.path}}">{{this.name}}</a>
        </li>
      {{/each}}
    </ul>
  `
  );

  const result = compiledNavTemplate(ROUTES);
  startNavContainer.innerHTML = result;
}

document.addEventListener("DOMContentLoaded", ready);
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
