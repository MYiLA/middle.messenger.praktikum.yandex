import { SomeObject } from '../../common/types';
import { BlockConstructor } from '../Block';
import Route from './Route';

/** Отвечает только за изменение URL */
class Router {
  protected routes: Route[];

  protected history: History;

  private _currentRoute: Route | null;

  private _rootQuery: string;

  static instance: Router;

  constructor(rootQuery: string) {
    if (Router.instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.instance = this;
  }

  use(path: string, component: BlockConstructor, props: SomeObject = {}) {
    // Вместо трёх точек напишем отдельную сущность — об этом речь пойдёт ниже
    const route = new Route(path, component, { ...props, rootQuery: this._rootQuery });
    this.routes.push(route);
    // Возврат this — основа паттерна "Builder" («Строитель»)
    return this;
  }

  // запустить роутер
  start() {
    window.onpopstate = () => { this._onRoute(Router.parseLocation()); };
    this._onRoute(Router.parseLocation());
  }

  _onRoute(path: string) {
    const route = this.getRoute(path);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }

  // переход на страницу по пути
  go(path: string) {
    this.history.pushState({}, '', path);
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
    return this.routes.find((route) => route.match(path)) || this.routes.find((item) => item.match('/404'));
  }

  static parseLocation = () => window.location.hash.slice(1).toLowerCase() || '/';
}

export default Router;
