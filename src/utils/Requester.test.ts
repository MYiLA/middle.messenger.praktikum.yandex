import Requester from './Requester';
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import { SomeObject } from '../common/types';

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
const checkIsSuccess = (status?: number) => status ? status >= 200 && status < 300 : false;

Object.defineProperty(globalThis, 'XMLHttpRequest', {
  value: dom.window.XMLHttpRequest
});

if (!('FormData' in globalThis)) {
  Object.defineProperty(globalThis, 'FormData', {
    value: dom.window.FormData
  });
}

describe('Тестирование класса Requester. Запросы должны работать корректно:', () => {
  let apiInstance: Requester;
  before(() => {
    apiInstance = new Requester('', 'https://jsonplaceholder.typicode.com');
  });

  it('get', async () => {
    const response = await apiInstance.get('posts/1') as SomeObject;
    const isSuccess = checkIsSuccess(response?.status);
    expect(isSuccess).true;
    if (!isSuccess) {
      return;
    }

    const data = await JSON.parse(response.responseText);
    expect(data.id)
      .to
      .equal(1);
  });

  it('post', async () => {
    const response = await apiInstance.post('posts', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        title: 'TestTitle',
        body: 'TestBody',
        userId: 1,
      })
    }) as SomeObject;
    const isSuccess = checkIsSuccess(response?.status);
    expect(isSuccess).true;
    if (!isSuccess) {
      return;
    }
    const data = await JSON.parse(response.responseText);
    expect(data.title)
      .to
      .equal('TestTitle');
  });

  it('put', async () => {
    const response = await apiInstance.put('posts/1', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        id: 1,
        title: 'TestTitle',
        body: 'TestBody',
        userId: 1,
      })
    }) as SomeObject;
    const isSuccess = checkIsSuccess(response?.status);
    expect(isSuccess).true;
    if (!isSuccess) {
      return;
    }
    const data = await JSON.parse(response.responseText);
    expect(data.title)
      .to
      .equal('TestTitle');
  });

  it('delete', async () => {
    const response = await apiInstance.delete('posts/1') as SomeObject;
    expect(response?.status)
      .to
      .equal(200);
  });
});
