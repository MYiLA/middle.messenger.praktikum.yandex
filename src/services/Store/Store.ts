import { SomeObject } from '../../common/types';
import set from '../../utils/set';
import EventBus from '../EventBus';

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
export default class Store extends EventBus {
  static EVENT_UPDATE = '1';

  static instance: Store;

  static STORE_NAME = 'spaceСhatStore';

  _state: SomeObject = { };

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

  getState(): SomeObject {
    return this._state;
  }

  removeState() {
    this._state = {};
    this.emit(Store.EVENT_UPDATE);
  }

  /** Устанавливает значение стора по указанному пути */
  set<T>(patch: string, value: T) {
    set(this, patch, value);
    this.emit(Store.EVENT_UPDATE);
    return this;
  }
}
