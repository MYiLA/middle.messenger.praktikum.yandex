import { PING_PERIOD, SocketEvent } from '../../common/constant';
import { SomeObject } from '../../common/types';

class WebSocketService {
  protected socket: WebSocket;

  /** Переменная для записи в неё setInterval, который пингует сокет для стабильного соединения */
  protected pingStart: NodeJS.Timer;

  constructor(patch: string) {
    this.socket = new WebSocket(patch);
  }

  /** Отправка сообщения */
  send(message: string) {
    this.socket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }

  /**
   * @param content - Число, которое показывает с какого сообщения нужно отдать ещё 20
   * Если в content указать 20, ответ будет с сообщениями, начиная с ID 19
   */
  getOld(content: string) {
    this.socket.send(JSON.stringify({
      content,
      type: 'get old',
    }));
  }

  /**
   * Закрытие соединения
   * @param code - Специальный WebSocket-код закрытия (не обязателен)
   * @example
   * 1000 – По умолчанию, нормальное закрытие
   * 1006 – Указывает, что соединение было потеряно (нет фрейма закрытия)
   * 1001 – Сторона отключилась, например сервер выключен или пользователь покинул страницу
   * 1009 – Сообщение слишком большое для обработки
   * 1011 – Непредвиденная ошибка на сервере
   * Полный список находится в https://datatracker.ietf.org/doc/html/rfc6455#section-7.4.1
   * @param reason - Строка с описанием причины закрытия (не обязательна)
   */
  close(code?: number, reason?: string) {
    this.socket.close(code, reason);
  }

  /**
   * Подписка на события вебсокета
   * @param name - Имя события
   * @param subscriber - Обработчик события
   */
  subscribe(
    name: SocketEvent,
    subscriber: (payload: SomeObject) => void,
  ) {
    switch (name) {
      // Обработчик открытия сокета
      case SocketEvent.open:
        this.socket.addEventListener('open', () => {
          console.log('Соединение установлено');
          // Начинаем пинговать сервер, чтобы не терять соединение
          this.pingStart = setInterval(() => {
            this.socket.send(JSON.stringify({
              content: 'Пинг',
              type: 'ping',
            }));
            subscriber({});
          }, PING_PERIOD);
          // Когда соединение будет установлено, получаем 20 старых сообщений чата, если они есть
          this.getOld('0');
        });
        break;

      // Обработчик закрытия сокета
      case SocketEvent.close:
        this.socket.addEventListener('close', (event) => {
          subscriber(event);
          if (event.wasClean) {
            console.log('Соединение закрыто чисто');
          } else {
            console.log('Обрыв соединения');
          }
          // Прекращаем пинговать
          clearInterval(this.pingStart);
          console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
        break;

      // Обработчик полученния данных / отправки сообщения
      case SocketEvent.message:
        this.socket.addEventListener('message', (event) => {
          subscriber(event);
        });
        break;

      // Обработчик ошибок
      case SocketEvent.error:
        this.socket.addEventListener('error', (event: ErrorEvent) => {
          subscriber(event);
          console.log('Ошибка', event.message);
        });
        break;
      default:
        throw new Error(`Такого события "${name}" у сокета нет`);
    }
  }
}

export default WebSocketService;
