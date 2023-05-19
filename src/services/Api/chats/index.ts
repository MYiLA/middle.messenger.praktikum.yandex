import Requester from '../../../utils/Requester';

import BaseAPI from '../BaseApi';

const chatsAPIInstance = new Requester('chats');

class ChatsApi extends BaseAPI {
/** Создать чат */
  createChat = (props: {
    title: string
  }): Promise<unknown> => {
    console.log('createChat', props);
    return chatsAPIInstance.post('', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(props),
    });
  };

  /** Удалить чат по id */
  deleteChat = (props: {
    chatId: number,
  }): Promise<unknown> => {
    console.log('deleteChat', props);
    return chatsAPIInstance.delete('', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(props),
    });
  };

  /** Получить пользователей чата */
  getChatUsers = (props: {
    id: number,
  }): Promise<unknown> => {
    console.log('getChatUsers', props);
    return chatsAPIInstance.get(`${props.id}/users`);
  };

  /** Получить количество новых сообщений в указанном чате */
  getNewMessageCount = (id: number): Promise<unknown> => {
    console.log('getMessageCount', id);
    return chatsAPIInstance.get(`new/${id}`);
  };

  /** Добавить пользователей в чат */
  addUsersToChat = (props: {
    users: number[],
    chatId: number
  }): Promise<unknown> => {
    console.log('addUserToChat', props);
    return chatsAPIInstance.put('users', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(props),
    });
  };

  /** Удалить пользователей из чата */
  deleteUsersFromChat = (props: {
    users: number[],
    chatId: number
  }): Promise<unknown> => {
    console.log('deleteUserFromChat', props);
    return chatsAPIInstance.delete('users', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(props),
    });
  };

  /** Получить чаты текущего пользователя */
  getChats = (id: number): Promise<unknown> => {
    console.log('getChats', id);
    return chatsAPIInstance.post(`token/${id}`);
  };
}

export default ChatsApi;
