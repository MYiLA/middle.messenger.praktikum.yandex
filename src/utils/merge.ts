import { SomeObject } from '../common/types';
import isSomeObject from './isSomeObject';

// Соединяет 2 объекта в один
function merge(lhs: SomeObject, rhs: SomeObject): SomeObject {
  const result = {} as SomeObject;

  if (lhs) {
    Object.keys(lhs).forEach((key: string) => {
    // Если ключи разные сохраняем оба
      if (!rhs[key]) {
        result[key] = lhs[key];
      // Если значения - объекты, то проваливаемся вовнутрь обоих
      } else if (isSomeObject(rhs[key])) {
        result[key] = merge(lhs[key], rhs[key]);
      // Если значения не объекты, то сохраняем последнее значение
      } else {
        result[key] = rhs[key];
      }
    });
  }
  Object.keys(rhs).forEach((key: string) => {
    // Если ключи разные сохранить оба
    if (!lhs || !lhs[key]) {
      result[key] = rhs[key];
    }
  });

  return result;
}

export default merge;
