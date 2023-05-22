import Router from './services/Router/Router';
import {
  PageAuthorization, PageError, PageRegistration, PageHome, PageUserSettings, PageDemo,
} from './pages';
import { SomeObject } from './common/types';

declare global {
  interface Window {
    spaceChatStoreAction?: (props: SomeObject) => void;
  }
}

const router = new Router('#app');
// TODO: сделать открытие чатов по id
// TODO: редиректы на 500
// TODO: Роут может быть защищённый. Тогда надо проверять куки пользака.
// Если у пользака есть доступ - то пускаем.
// Доступ зависит от роли пользака. Надо запросить актуальные данные
// authApi.getCurrentUser().then и относительно роли - редиректить на /
router
  .use('/', PageAuthorization)
  .use('/404', PageError, { code: '404', desc: 'Не туда попали' })
  .use('/500', PageError, { code: '500', desc: 'Мы уже фиксим' })
  .use('/sign-up', PageRegistration)
  .use('/messenger', PageHome, {})
  .use('/chat/', PageHome, { withId: true })
  .use('/settings', PageUserSettings)
  .use('/demo', PageDemo)
  .start();
