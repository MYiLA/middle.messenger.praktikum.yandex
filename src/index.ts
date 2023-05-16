import Router from './services/Router/Router';
import {
  PageAuthorization, PageError, PageRegistration, PageHome, PageUserSettings, PageDemo,
} from './pages';

declare global {
  interface Window {
    spaceChatStoreAction?: (add: string) => void;
  }
}

const router = new Router('#app');
// TODO: сделать открытие чатов по id
// TODO: редиректы на 500
router
  .use('/', PageAuthorization)
  .use('/404', PageError, { code: '404', desc: 'Не туда попали' })
  .use('/500', PageError, { code: '500', desc: 'Мы уже фиксим' })
  .use('/registration', PageRegistration)
  .use('/home', PageHome, {})
  .use('/chat/id', PageHome, {})
  .use('/user-settings', PageUserSettings)
  .use('/demo', PageDemo)
  .start();
