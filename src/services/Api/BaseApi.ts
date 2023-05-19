export default class BaseAPI {
  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  create() { throw new Error('Not implemented "create"'); }

  request() { throw new Error('Not implemented "request"'); }

  update() { throw new Error('Not implemented "update"'); }

  delete() { throw new Error('Not implemented "delete"'); }
}
