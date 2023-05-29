import {
  ChatsResponse, Message, SomeObject, UserInfo,
} from '../../common/types';
import getStore from '../../utils/get';
import setStore from '../../utils/set';
import EventBus from '../EventBus';

type StoreStateType = {
  chats: ChatsResponse[],
  profile: UserInfo | null,
  currentChat: ChatsResponse | null,
  messages: Message[],
};

const defaultStore: StoreStateType = {
  chats: [],
  profile: null,
  currentChat: null,
  messages: [],
};

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
export default class Store extends EventBus {
  static EVENT_UPDATE = '1';

  static instance: Store;

  static STORE_NAME = 'spaceСhatStore';

  _state: SomeObject = defaultStore;

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
    this._state = defaultStore;
    this.emit(Store.EVENT_UPDATE);
  }

  /** Устанавливает значение в стор по указанному пути */
  set(patch: string, valueProp: unknown) {
    this._state = setStore(this._state, patch, valueProp);
    console.log('СТОР', this._state);
    this.emit(Store.EVENT_UPDATE);
    return this;
  }

  /** Получает значение из стора по указанному пути */
  get(patch: string): unknown {
    return getStore(this._state, patch);
  }
}
