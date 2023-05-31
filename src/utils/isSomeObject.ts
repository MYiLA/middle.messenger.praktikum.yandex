import { SomeObject } from '../common/types';

function isSomeObject(value: unknown): value is SomeObject {
  return typeof value === 'object'
      && value !== null
      && value.constructor === Object
      && Object.prototype.toString.call(value) === '[object Object]';
}

export default isSomeObject;
