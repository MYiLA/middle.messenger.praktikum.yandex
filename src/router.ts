import { Router } from './common/types';
import {
  PageAuthorization, PageError, PageRegistration, PageHome, PageUserSettings, PageDemo,
} from './pages';

// TODO: Временно, пока проект статичен
const ready = () => {
  const pageAuthorizationComponent = new PageAuthorization();
  const PageRegistrationComponent = new PageRegistration();
  const PageHomeComponent = new PageHome({});
  const PageHomeChatComponent = new PageHome({ selectedChatId: 'id' });
  const PageUserSettingsComponent = new PageUserSettings({});
  const page404Component = new PageError({ code: '404', desc: 'Не туда попали' });
  const Page500Component = new PageError({ code: '500', desc: 'Мы уже фиксим' });
  const PageDemoComponent = new PageDemo();

  const ROUTES: Router[] = [
    { path: '/', component: pageAuthorizationComponent, name: 'Авторизация' },
    { path: '/registration', component: PageRegistrationComponent, name: 'Регистрация' },
    { path: '/home', component: PageHomeComponent, name: 'Список чатов и заглушка' },
    { path: '/chat/id', component: PageHomeChatComponent, name: 'Чат выбран' },
    { path: '/user-settings', component: PageUserSettingsComponent, name: 'Настройки пользователя' },
    { path: '/404', component: page404Component, name: 'Страница 404' },
    { path: '/500', component: Page500Component, name: 'Страница 500' },
    { path: '/demo', component: PageDemoComponent, name: 'Компоненты' },
  ];

  // eslint-disable-next-line no-restricted-globals
  const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
  const findComponentByPath = (path: string, routes: Router[]) => routes.find((route) => route.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

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

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
};

document.addEventListener('DOMContentLoaded', ready);
