import Block, { BlockConstructor } from '../Block';
import isEqual from '../../utils/isEqual';
import renderDOM from '../../utils/renderDOM';
import { SomeObject } from '../../common/types';
import clearDOM from '../../utils/clearDOM';

/** Хранит URL и соответствующий ему блок, умеет показывать, скрывать и создавать блоки */
class Route {
  private _path: string = '/';

  private _Component: BlockConstructor | null = null;

  private _block: Block | null = null;

  private _props: SomeObject = {
    /** Селектор обёртки, в которой будет отрендерен блок */
    rootQuery: '#app',
  };

  constructor(path: string, Component: BlockConstructor, props: SomeObject) {
    this._path = path;
    this._Component = Component;
    this._block = null;
    this._props = props;
  }

  navigate(path: string) {
    if (this.match(path)) {
      this._path = path;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      /** Что делать со страницей, когда мы уходим из неё */
      clearDOM(this._props.rootQuery);
    }
  }

  match(path: string) {
    if (this._props.withId) return path.includes(this._path);
    return isEqual(path, this._path);
  }

  render() {
    /** Если нас ещё на странице не было */
    if (!this._block) {
      if (this._Component === null) throw new Error('Route: компонент, который нужно рендерить не найден');
      // TODO: тут предлагается передавать через пропсы айдишник.
      // Но мне кажется надо делать изящнее.
      this._block = new this._Component(this._props);
    }
    /** Если мы возвращаемся на уже созданную страницу */
    renderDOM(this._props.rootQuery, this._block);
  }
}

export default Route;
