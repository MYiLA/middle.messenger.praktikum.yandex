import { SomeObject } from '../common/types';

/**
 * Получает из объекта значение по переданному маршруту
 * @param object - Объект, внутри которого будет происходить поиск значения
 * @param path - Путь, по которому будет найдено значение
 * @return Значение
 */
function get<T>(object: SomeObject, path: string): T {
  return path.split('.').reduce((acc, item) => acc[item], object);
}

export default get;
