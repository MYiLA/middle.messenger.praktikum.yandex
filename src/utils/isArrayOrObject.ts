import { SomeObject } from '../common/types';
import isArray from './isArray';
import isSomeObject from './isPlainObject';

function isArrayOrObject(value: unknown): value is [] | SomeObject {
  return isSomeObject(value) || isArray(value);
}

export default isArrayOrObject;
