import { SomeObject } from '../../common/types';
import getStore from '../../utils/get';
import setStore from '../../utils/set';
import EventBus from '../EventBus';

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
export default class Store extends EventBus {
  static EVENT_UPDATE = '1';

  static instance: Store;

  static STORE_NAME = 'spaceСhatStore';

  _state: SomeObject = {};

  constructor() {
    // eslint-disable-next-line no-constructor-return
    if (Store.instance) return Store.instance;

    super();

    const savedState = localStorage.getItem(Store.STORE_NAME);

    this._state = savedState ? (JSON.parse(savedState) ?? {}) : {};

    Store.instance = this;

    this.attach(
      Store.EVENT_UPDATE,
      () => { localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state)); },
    );
  }

  /** Получает весь стор */
  getState(): SomeObject {
    return this._state;
  }

  /** Очищает весь стор */
  removeState() {
    this._state = {};
    this.emit(Store.EVENT_UPDATE);
  }

  /** Устанавливает значение в стор по указанному пути */
  set(patch: string, valueProp: unknown) {
    this._state = setStore(this._state, patch, valueProp);
    console.log('СТОР', this._state, patch, valueProp);
    this.emit(Store.EVENT_UPDATE);
    return this;
  }

  /** Получает значение из стора по указанному пути */
  get(patch: string): unknown {
    return getStore(this._state, patch);
  }
}
