import { JSDOM } from 'jsdom';
import Router from './Router';
import { expect } from 'chai';
import * as crypto from 'crypto';
import Block from '../Block';

const Dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', { url: 'http://localhost' });

if (!('document' in globalThis)) {
  Object.defineProperty(globalThis, 'document', {
    value: Dom.window.document
  });
}

if (!('crypto' in globalThis)) {
  Object.defineProperty(globalThis, 'crypto', {
    value: {
      getRandomValues: (arr: any[]) => crypto.randomBytes(arr.length)
    }
  });
}

if (!('window' in globalThis)) {
  Object.defineProperty(globalThis, 'window', {
    value: Dom.window
  });
}

class TestComponent extends Block {
  constructor() {
    super('div');
  }

  render() {
    return this.compile(() => 'test', {});
  }
}

class ErrorComponent extends Block {
  constructor() {
    super('div');
  }

  render() {
    return this.compile(() => 'error', {});
  }
}

describe('Тестирование Роутера', function () {
  let router: Router;
  before(() => {
    router = new Router('#root');
    router
      .use('/test', TestComponent)
      .use('/404', ErrorComponent)
      .start();
  });

  it('Корректно переходит на страницу', () => {
    router.go('/test');
    const currentRoute = router.getRoute('/test');
    expect(currentRoute).not.undefined;
    expect(currentRoute?.path)
      .to
      .equal('/test');
  });

  it('Корректно редиректит на страницу 404', () => {
    router.go('/unknown-path');
    const currenPath = router.currentRoute?.path;
    expect(currenPath)
      .to
      .equal('/404');
  });
});
