import { SomeObject } from '../../common/types';

class WebSocketService {
  constructor(patch: string) {
    console.log(patch);
  }

  send() {}

  subscribe(
    name: string,
    subscriber: (payload: SomeObject) => void,
  ) {
    console.log(name, subscriber);
  }
}

export default WebSocketService;
// Нужно сделать POST-запрос в «ручку» /api/v2/chats/token/:id, где <:id> — это ID чата.
