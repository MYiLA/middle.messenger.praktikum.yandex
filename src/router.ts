import { Rout } from './common/types';
import { StartNav } from './components';
import {
  PageHome, PageAuthorization, PageRegistration, PageUserSettings, Page404, Page500,
} from './pages';

const ROUTES: Rout[] = [
  { path: '/', component: PageAuthorization, name: 'Авторизация' },
  { path: '/registration', component: PageRegistration, name: 'Регистрация' },
  { path: '/home', component: PageHome, name: 'Список чатов и лента переписки' },
  { path: '/user-settings', component: PageUserSettings, name: 'Настройки пользователя' },
  { path: '/404', component: Page404, name: 'Страница 404' },
  { path: '/500', component: Page500, name: 'Страница 500' },
];

// eslint-disable-next-line no-restricted-globals
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path: string, routes: Rout[]) => routes.find((route) => route.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
  // Находит компонент по текущему роуту
  const path = parseLocation();
  // Если роут не найден, показывает страницу 404
  const { component = Page404 } = findComponentByPath(path, ROUTES) || {};

  const appElement = document.getElementById('app');

  if (!appElement) throw new Error('Не найдено элемента на странице с id "app"');

  // Рендерит полученный компонент в документ
  appElement.innerHTML = component.render();
};

// TODO: Временно, пока проект статичен
const ready = () => {
  const startNavContainer = document.querySelector('.start-nav');

  if (!startNavContainer) throw new Error('Не найдено элемента на странице с классом "start-nav"');

  startNavContainer.innerHTML = StartNav.render(ROUTES);
};

document.addEventListener('DOMContentLoaded', ready);
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
