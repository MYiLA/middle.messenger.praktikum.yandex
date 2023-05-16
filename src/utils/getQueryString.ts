import { SomeObject } from '../common/types';
import isArray from './isArray';
import isSomeObject from './isSomeObject';

const getQueryString = (data: SomeObject): string | never => {
  if (!isSomeObject(data)) {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value: unknown = data[key];
    const endLine = index < keys.length - 1 ? '&' : '';

    if (isArray(value)) {
      const arrayValue = value.reduce<SomeObject>(
        (arrResult, arrData, arrIndex) => ({
          ...arrResult,
          [`${key}[${arrIndex}]`]: arrData,
        }),
        {},
      );

      return `${result}${getQueryString(arrayValue)}${endLine}`;
    }

    if (isSomeObject(value)) {
      const objValue = Object.keys(value || {}).reduce<SomeObject>(
        (objResult, objKey) => ({
          ...objResult,
          [`${key}[${objKey}]`]: value[objKey],
        }),
        {},
      );

      return `${result}${getQueryString(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, '');
};

export default getQueryString;
