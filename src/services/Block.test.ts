
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import Block from './Block';
import * as crypto from 'crypto';

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', { url: 'http://localhost' });

if (!('crypto' in globalThis)) {
  Object.defineProperty(globalThis, 'crypto', {
    value: {
      getRandomValues: (arr: any[]) => crypto.randomBytes(arr.length)
    }
  });
}

if (!('document' in globalThis)) {
  Object.defineProperty(globalThis, 'document', {
    value: dom.window.document
  });
}

if (!('window' in globalThis)) {
  Object.defineProperty(globalThis, 'window', {
    value: dom.window
  });
}

class TestFirstComponent extends Block {
  constructor() {
    super('div');
  }

  render() {
    return this.compile(() => '<div data-test="test-component"></div>', {});
  }
}

describe('Проверяем компонент', function () {
  let document: Document;
  let root: HTMLElement;
  let testComponent: Block;

  const getTestComponent = () => document.querySelector('[data-test="test-component"]');

  beforeEach(() => {
    document = dom.window.document;
    root = document.querySelector('#root')!;
    testComponent = new TestFirstComponent();
    const content = testComponent.getContent() as HTMLElement;
    root.appendChild(content);
  });

  afterEach(() => {
    root.innerHTML = '';
  });

  it('Компонент корректно рендерится', () => {
    const componentInDom = getTestComponent();
    expect(componentInDom).not.null;
  });

  it('Метод setProps корректно работает', () => {
    testComponent.setProps({
      attr: {
        classes: ['test-class'],
      }
    });
    const result = testComponent.getProps().attr?.classes?.[0]
    expect(result)
      .to
      .equal('test-class');
  });

  it('Компонент корректно скрывается', () => {
    testComponent.hide();
    const content = testComponent.getContent() as HTMLElement;
    expect(content).not.null;
    expect(content.style.display)
    .to
    .equal('none');
  });

  it('События корректно создаются и отрабатывают', () => {
    testComponent.setProps({
      events: {
        click: () => {
          testComponent.setProps({
            attr: {
              'data-click': 'success',
            }
          });
        }
      }
    });
    const event = new dom.window.Event('click', { bubbles: true });
    const content = testComponent.getContent() as HTMLElement;
    content
      .dispatchEvent(event);
    expect(document.querySelector('[data-click="success"]')).not.undefined;
  });
});
