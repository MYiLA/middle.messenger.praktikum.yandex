import { PING_PERIOD } from '../../common/constant';
// TODO: надо настроить обновление сокета при смене чата.
// Запуск нового и очищение старого сокета при смене чата.
// Возможно это надо отправить в стор и через стор создавать, а в чат отправить готоавый сокет
const getSocket = (url: string): WebSocket => {
  const socket = new WebSocket(url);

  let pingStart = 0;

  // Обработчик открытия сокета
  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
    // Начинаем пинговать сервер, чтобы не терять соединение
    pingStart = setInterval(() => {
      socket.send(JSON.stringify({
        content: 'Моё первое сообщение миру!',
        type: 'ping',
      }));
    }, PING_PERIOD);
  });

  // Обработчик закрытия сокета
  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }
    // Прекращаем пинговать
    clearInterval(pingStart);
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  // Обработчик отправки сообщения
  socket.addEventListener('message', (event) => {
    console.log('Получены данные', event.data);
  });

  // Обработчик ошибок
  socket.addEventListener('error', (event: ErrorEvent) => {
    console.log('Ошибка', event.message);
  });

  return socket;
};

export default getSocket;
