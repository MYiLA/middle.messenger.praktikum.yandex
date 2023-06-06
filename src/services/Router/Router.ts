import { SomeObject } from '../../common/types';
import { BlockConstructor } from '../Block';
import Route from './Route';

/** Отвечает только за изменение URL */
class Router {
  protected routes: Route[];

  protected history: History;

  public currentRoute: Route | null;

  private _rootQuery?: string;

  static instance: Router;

  constructor(rootQuery?: string) {
    if (Router.instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.instance;
    }

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this._rootQuery = rootQuery || '#app';

    Router.instance = this;
  }

  use(path: string, component: BlockConstructor, props: SomeObject = {}) {
    const route = new Route(path, component, { ...props, rootQuery: this._rootQuery });
    this.routes.push(route);
    // Возврат this — основа паттерна "Builder" («Строитель»)
    return this;
  }

  // запустить роутер
  start() {
    // Обработка события действий в браузере
    window.onpopstate = () => {
      const location = Router.parseLocation();
      this._onRoute(location);
    };
    this._onRoute(Router.parseLocation());
  }

  _onRoute(path: string) {
    const route = this.getRoute(path);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }
    this.currentRoute = route;
    route.render();
  }

  // переход на страницу по пути
  go(path: string) {
    this.history.pushState({}, '', `/#${path}`);
    this._onRoute(path);
  }

  // переход назад по истории браузера
  back() {
    window.history.back();
  }

  // переход вперёд по истории браузера
  forward() {
    window.history.forward();
  }

  getRoute(path: string) {
    // Если путь не найден, то редирект на 404
    return this.routes.find((route) => route.match(path)) || this.routes.find((item) => item.match('/404'));
  }

  static parseLocation = () => window.location.hash.slice(1).toLowerCase() || '/';
}

export default Router;
