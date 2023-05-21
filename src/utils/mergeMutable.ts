import { SomeObject } from '../common/types';
import isSomeObject from './isSomeObject';

// Соединяет 2 объекта в один
function mergeMutable(lhs: SomeObject, rhs: SomeObject): SomeObject {
  Object.keys(rhs).forEach((key: string) => {
    // Если в lhs нет ключа rhs, то добавляем его
    if (!lhs[key]) {
      lhs[key] = rhs[key];
    // Если значения - объекты, то проваливаемся вовнутрь обоих
    } else if (isSomeObject(lhs[key])) {
      lhs[key] = mergeMutable(lhs[key], rhs[key]);
    // Если значения не объекты, то сохраняем последнее значение
    } else {
      lhs[key] = rhs[key];
    }
  });

  return lhs;
}

export default mergeMutable;
