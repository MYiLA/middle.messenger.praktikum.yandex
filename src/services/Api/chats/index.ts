import Requester from '../../../utils/Requester';

import BaseAPI from '../BaseApi';

const chatsAPIInstance = new Requester('chats');

class ChatsApi extends BaseAPI {
/** Создать чат */
  createChat(props: {
    title: string
  }): Promise<unknown> {
    return chatsAPIInstance.post('', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(props),
    }).then(this.parseServerResponse);
  }

  /** Удалить чат по id */
  deleteChat(props: {
    chatId: number,
  }): Promise<unknown> {
    return chatsAPIInstance.delete('', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(props),
    }).then(this.parseServerResponse);
  }

  /** Получить пользователей чата */
  getChatUsers(props: {
    id: number,
  }): Promise<unknown> {
    return chatsAPIInstance.get(`${props.id}/users`).then(this.parseServerResponse);
  }

  /** Получить количество новых сообщений в указанном чате */
  getNewMessageCount(id: number): Promise<unknown> {
    return chatsAPIInstance.get(`new/${id}`).then(this.parseServerResponse);
  }

  /** Добавить пользователей в чат */
  addUsersToChat(props: {
    users: number[],
    chatId: number
  }): Promise<unknown> {
    return chatsAPIInstance.put('users', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(props),
    }).then(this.parseServerResponse);
  }

  /** Удалить пользователей из чата */
  deleteUsersFromChat(props: {
    users: number[],
    chatId: number
  }): Promise<unknown> {
    return chatsAPIInstance.delete('users', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(props),
    }).then(this.parseServerResponse);
  }

  /** Получить чаты текущего пользователя */
  getChats(): Promise<unknown> {
    return chatsAPIInstance.get('').then(this.parseServerResponse);
  }

  /** Войти в real-time чат */
  getChatsToken({ chatId }: { chatId: number }): Promise<unknown> {
    return chatsAPIInstance.post(`token/${chatId}`, {
      headers: {
        accept: 'application/json',
      },
    }).then(this.parseServerResponse);
  }
}

export default ChatsApi;
