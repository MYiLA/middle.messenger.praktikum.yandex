import { SomeObject } from '../common/types';
import isSomeObject from './isSomeObject';
import merge from './merge';

/** Сохраняет в объект значение по переданному маршруту */
function set(object: SomeObject, path: string, value: unknown): SomeObject {
  if (!isSomeObject(object) || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<SomeObject>((acc, key) => ({
    [key]: acc,
  }), value as any);

  return merge(object, result);
}

export default set;
