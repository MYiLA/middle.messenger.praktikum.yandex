import { Rout } from './common/types';
import { StartNav } from './components';
import {
  PageAuthorization, Page404,
} from './pages';

// TODO: Временно, пока проект статичен
const ready = () => {
  const pageAuthorizationComponent = new PageAuthorization();
  const page404Component = new Page404();

  const ROUTES: Rout[] = [
    { path: '/', component: pageAuthorizationComponent, name: 'Авторизация' },
    // { path: '/registration', component: PageRegistration, name: 'Регистрация' },
    // { path: '/home', component: PageHome, name: 'Список чатов и лента переписки' },
    // { path: '/user-settings', component: PageUserSettings, name: 'Настройки пользователя' },
    { path: '/404', component: page404Component, name: 'Страница 404' },
  // { path: '/500', component: Page500, name: 'Страница 500' },
  // { path: '/demo', component: PageDemo, name: 'Компоненты' },
  ];

  // eslint-disable-next-line no-restricted-globals
  const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
  const findComponentByPath = (path: string, routes: Rout[]) => routes.find((route) => route.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

  const router = () => {
    const appElement = document.getElementById('app');
    if (!appElement) throw new Error('Не найдено элемента на странице с id "app"');

    // Находит компонент по текущему роуту
    const path = parseLocation();
    // Если роут не найден, показывает страницу 404
    const { component = page404Component } = findComponentByPath(path, ROUTES) || {};

    const temp = component.getContent();

    if (!temp) throw new Error(`Не найдено элемента на странице с id ${component.id}}`);
    // Очищаем документ
    appElement.innerHTML = '';
    // Рендерим полученный компонент в документ
    appElement.append(temp);
  };

  const startNavContainer = document.querySelector('.start-nav');
  if (!startNavContainer) throw new Error('Не найдено элемента на странице с классом "start-nav"');

  startNavContainer.innerHTML = StartNav.render(ROUTES);

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
};

document.addEventListener('DOMContentLoaded', ready);
