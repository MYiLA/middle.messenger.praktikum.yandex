import Router from './services/Router/Router';
import {
  PageAuthorization, PageError, PageRegistration, PageHome, PageUserSettings, PageDemo,
} from './pages';
import { SomeObject } from './common/types';
import './styles.scss';

declare global {
  interface Window {
    spaceChatStoreAction?: (props: SomeObject) => void;
  }
}

const router = new Router('#app');

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
