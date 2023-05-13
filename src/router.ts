import Block from './services/Block';
import {
  PageAuthorization, PageError, PageRegistration, PageHome, PageUserSettings, PageDemo,
} from './pages';

/**
 * Роут
 */
export type Router = {
  path: string,
  component: Block,
};

const ready = () => {
  const pageAuthorizationComponent = new PageAuthorization();
  const PageRegistrationComponent = new PageRegistration();
  const PageHomeComponent = new PageHome({});
  const PageUserSettingsComponent = new PageUserSettings();
  const page404Component = new PageError({ code: '404', desc: 'Не туда попали' });
  const Page500Component = new PageError({ code: '500', desc: 'Мы уже фиксим' });
  const PageDemoComponent = new PageDemo();

  const ROUTES: Router[] = [
    { path: '/', component: pageAuthorizationComponent },
    { path: '/registration', component: PageRegistrationComponent },
    { path: '/home', component: PageHomeComponent },
    { path: '/chat/id', component: PageHomeComponent },
    { path: '/user-settings', component: PageUserSettingsComponent },
    { path: '/404', component: page404Component },
    { path: '/500', component: Page500Component },
    { path: '/demo', component: PageDemoComponent },
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
    // TODO: сделать отдельный роут для чата. Выделить чат в отдельный компонент
    const isChat = document.location.href.includes('#/chat/id') ? 'id' : undefined;
    PageHomeComponent.setProps({ selectedChatId: isChat });
  };

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
};

document.addEventListener('DOMContentLoaded', ready);
