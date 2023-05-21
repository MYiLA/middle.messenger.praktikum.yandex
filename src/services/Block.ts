import { v4 as uuid4 } from 'uuid';
import { SomeObject } from '../common/types';
import merge from '../utils/merge';
import EventBus from './EventBus';

/**
 * Тип конструктора объекта Block
 */
export type BlockConstructor = {
  new (props: SomeObject): Block;
};

/**
 * Тип пропсов объекта Block
 */
export type BlockProps = {
  [x: string | symbol | number]: any;
  attr?: {
    [x: string]: string | string[] | undefined;
    classes?: string[];
  }
};

class Block {
  static EVENTS = {
    INIT: 'init',
    CDM: 'component-did-mount',
    CDU: 'component-did-update',
    RENDER: 'render',
  };

  public id = uuid4();

  protected props: BlockProps;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  private _meta: {
    tagName: string;
    props: BlockProps;
  };

  protected children: Record<string, Block | Block[]>;

  /**
   * @param tagName
   * @param props
   *
   * @returns Void
   */
  constructor(tagName: string = 'div', propsWithChildren: BlockProps = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this._meta = {
      tagName,
      props,
    };
    this.children = children;
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  protected addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  protected removeEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.attach(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.attach(Block.EVENTS.CDM, this._componentDidMount.bind(this));
    eventBus.attach(Block.EVENTS.CDU, this._componentDidUpdate.bind(this));
    eventBus.attach(Block.EVENTS.RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _createDocumentElement(tagName: string) {
    const documentElement = document.createElement(tagName);
    const attributes = this.props.attr;
    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        const value = attributes[key];
        // Если передан атрибут c классами, вешаем их
        if (key === 'classes' && Array.isArray(value)) {
          value.forEach((item) => {
            documentElement.classList.add(item);
          });
          // Если переданы другие атрибуты - переназначаем их
        } else if (typeof value === 'string') {
          documentElement.setAttribute(key, value);
        }
      });
    }

    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return documentElement;
  }

  protected init() {
    this._createResources();

    this.eventBus().emit(Block.EVENTS.RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.CDM);
  }

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);
    if (isReRender) {
      this.eventBus().emit(Block.EVENTS.RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    return true;
  }

  setProps = (nextProps: SomeObject): void => {
    if (!nextProps) {
      return;
    }

    const oldProps = this.props;
    this.props = merge(this.props, nextProps);
    this._componentDidUpdate(oldProps, this.props);
  };

  getProps(): BlockProps {
    return this.props;
  }

  getChildren(): BlockProps {
    return this.children;
  }

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    // Очищаем события
    this.removeEvents();
    // Очищаем элемент
    this._element!.innerHTML = '';
    // Добавляем элемент
    this._element!.append(block);
    this.addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _getChildrenAndProps(childrenAndProps: BlockProps) {
    const props: BlockProps = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block || (Array.isArray(value) && value[0] instanceof Block)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };
    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        const result: string[] = [];
        component.forEach((item) => { result.push(`<div data-id="${item.id}"></div>`); });
        contextAndStubs[name] = result;
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);
    const temp: HTMLTemplateElement = document.createElement('template');
    temp.innerHTML = html;

    Object.entries(this.children).forEach(([, component]) => {
      if (Array.isArray(component)) {
        component.forEach((item) => {
          Block.renderStub(item, temp);
        });
      } else {
        Block.renderStub(component, temp);
      }
    });

    return temp.content;
  }

  static renderStub(component: Block, temp: HTMLTemplateElement) {
    const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

    if (!stub) {
      return;
    }

    stub.replaceWith(component.getContent()!);
  }

  private _makePropsProxy(props: BlockProps) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  show() {
    const content = this.getContent();

    if (content) {
      content.style.display = '';
    } else {
      throw new Error('Элемент не найден. show не отрабатывает');
    }
  }

  hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    } else {
      throw new Error('Элемент не найден. hide не отрабатывает');
    }
  }
}

export default Block;
