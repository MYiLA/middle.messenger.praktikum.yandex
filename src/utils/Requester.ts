import { BASE_HOST } from '../common/constant';
import { SomeObject } from '../common/types';
import getQueryString from './getQueryString';

type Options = {
  timeout?: number;
  headers?: SomeObject,
  method?: METHODS,
  body?: any,
};

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

class Requester {
  static baseUrl: string;

  constructor(baseUrl: string) {
    Requester.baseUrl = baseUrl;
  }

  get: HTTPMethod = (url, options = {}) => (
    this.request(
      Requester.getUrl(url),
      {
        ...options,
        method: METHODS.GET,
      },
      options.timeout,
    )
  );

  post: HTTPMethod = (url, options = {}) => (
    this.request(
      Requester.getUrl(url),
      {
        ...options,
        method: METHODS.POST,
      },
      options.timeout,
    )
  );

  put: HTTPMethod = (url, options = {}) => (
    this.request(
      Requester.getUrl(url),
      {
        ...options,
        method: METHODS.PUT,
      },
      options.timeout,
    )
  );

  delete: HTTPMethod = (url, options = {}) => (
    this.request(
      Requester.getUrl(url),
      {
        ...options,
        method: METHODS.DELETE,
      },
      options.timeout,
    )
  );

  request = (
    url: string,
    options: Options,
    timeout = 5000,
  ) => {
    const { headers = {}, method, body } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!body
          ? `${url}${getQueryString(body)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;

      if (isGet || !body) {
        xhr.send();
      } else {
        xhr.send(body);
      }
    });
  };

  static getUrl(url: string): string {
    if (!url) return `${BASE_HOST}/${this.baseUrl}`;
    return `${BASE_HOST}/${this.baseUrl}/${url}`;
  }
}

export default Requester;
