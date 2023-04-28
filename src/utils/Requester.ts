import { SomeObject } from '../common/types';

type Options = {
  timeout?: number;
  headers?: SomeObject,
  method?: METHODS,
  data?: any,
};

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

// Необязательный метод
function queryStringify(data: any) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // TODO: Пока достаточно и [object Object] для объекта, потом надо доделать
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.GET }, options.timeout)
  );

  post: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.POST }, options.timeout)
  );

  put: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
  );

  delete: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
  );

  request = (
    url: string,
    options: Options = {},
    timeout = 5000,
  ) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
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

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export default HTTPTransport;
