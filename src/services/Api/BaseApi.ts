import { ResponseChat } from '../../common/types';
import { Router } from '../Router';

const router = new Router();

export default class BaseAPI {
  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  create() { throw new Error('Not implemented "create"'); }

  request() { throw new Error('Not implemented "request"'); }

  update() { throw new Error('Not implemented "update"'); }

  delete() { throw new Error('Not implemented "delete"'); }

  // Обработка серверных ошибок должна быть в каждом запросе.
  parseServerResponse(response: ResponseChat): ResponseChat | void {
    if (response.status >= 200 && response.status < 300) {
      // идём далее
      return response;
    }
    // Если статус 400, то пользователь уже зарегистрирован в системе
    if (response.status === 400) {
      // редиректим на чат
      router.go('/messenger');
      return response;
      // Если статус 401, то пользователь НЕ зарегистрирован в системе
    }
    if (response.status === 401) {
      // редиректим на авторизацию
      router.go('/');
      throw new Error('Неверные куки');
    }
    if (response.status === 404) {
      // редиректим на авторизацию
      router.go('/404');
      throw new Error('В базе таких данных не найдено');
    } else {
      // редиректим на страницу с серверной ошибкой
      router.go('/500');
      throw new Error('Ошибка на сервере');
    }
  }
}
