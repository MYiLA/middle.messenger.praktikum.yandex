import { SocketEvent } from '../../common/constant';
import {
  ChangePasswordForm,
  ChatsResponse,
  GetOldMessagesPrors,
  Message,
  ResponseChat, SigninProps, SomeObject, UserResponse,
} from '../../common/types';
import { RegistrationFormData } from '../../pages/registration/type';
import convertStringToData from '../../utils/convertStringToData';
import isArray from '../../utils/isArray';
import AuthApi from '../Api/auth';
import ChatsApi from '../Api/chats';
import { ChatDeleteRequest, CreateChatRequest, UserRequest } from '../Api/type';
import UserApi from '../Api/users';
import { Router } from '../Router';
import WebSocketService from '../webSocket';
import Store from './Store';

const store = new Store();
const authApi = new AuthApi();
const userApi = new UserApi();
const chatsApi = new ChatsApi();
const router = new Router();
let socket: WebSocketService | null = null;

/** Получение подробной информации по текущему пользователю */
const getProfile = () => {
  authApi.getCurrentUser()
    .then((response: ResponseChat) => JSON.parse(response.response))
    .then((data) => {
      store.set('profile', data);
    });
};

/** Получить чаты текущего пользователя */
const getChats = () => {
  chatsApi.getChats()
    .then((response: ResponseChat) => JSON.parse(response.response))
    .then((data) => {
      store.set('chats', data);
    });
};

/** Регистрация */
const registration = (props: RegistrationFormData): void => {
  // Удаляем повтор пароля
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { password_repeat, ...registrationProps } = props;

  authApi.registration(registrationProps).then(() => {
    getProfile();
    getChats();
    // Если регистрация успешно прошла - редиректим в мессенджер
    router.go('/messenger');
  });
};

/** Авторизация */
const authorization = (formData: SigninProps) => {
  authApi.authorization(formData).then(() => {
    getProfile();
    getChats();
    // Если авторизация успешно прошла - редиректим в мессенджер
    router.go('/messenger');
  });
};

/** Выход пользователя из системы */
const logout = () => {
  authApi.logout().then(() => {
    // Очищаем стор
    store.removeState();
    // редиректим на авторизацию
    router.go('/');
  });
};

/** Изменить данные текущего пользователя */
const setProfileData = (props: UserRequest) => {
  userApi.setProfileData(props)
    .then((response: ResponseChat) => JSON.parse(response.response))
    .then((data) => {
      store.set('profile', data);
    });
};

/** Изменить аватар текущего пользователя */
const setProfileAvatar = (props: SomeObject) => {
  userApi.setProfileAvatar(props.avatar[0])
    .then((response: ResponseChat) => JSON.parse(response.response))
    .then((data) => {
      store.set('profile', data);
    });
};

/** Изменить пароль текущего пользователя */
const setProfilePassword = (props: ChangePasswordForm) => {
  // Удаляем повтор пароля
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { repeatNewPassword, ...setPasswordProps } = props;
  userApi.setProfilePassword(setPasswordProps).then((response: ResponseChat) => {
    // Если пользователь ввёл неверный старый пароль
    if (response.status === 400) {
      // показываем алерт и остаёмся на странице
      // eslint-disable-next-line no-alert
      window.alert('Введён некорректный старый пароль');
    // Если пользователь не авторизован
    } else if (response.status === 401) {
      // редиректим на авторизацию
      router.go('/');
      // eslint-disable-next-line no-alert
      window.alert('Авторизуйтесь пожалуйста');
    // Если получили ошибку сервера
    } else if (response.status >= 500) {
      // редиректим на страницу с серверной ошибкой
      router.go('/500');
    }
    return response;
  });
};

/** Создать чат */
const createChat = (props: CreateChatRequest) => {
  chatsApi.createChat(props)
    .then(() => {
      getChats();
    });
};

/** Удалить чат */
const deleteChat = (props: ChatDeleteRequest) => {
  chatsApi.deleteChat(props)
    .then(() => {
      getChats();
      router.go('/messenger');
    });
};

/** Добавить пользователя в чат */
const addUserToChat = ({ login }: { login: string }) => {
  userApi.findUserByLogin({ login })
    .then((response: ResponseChat) => JSON.parse(response.response))
    .then((response: UserResponse[]) => {
      // Получаем список айди юзеров
      const users = response.map((user) => user.id);
      if (users.length > 0) {
        // Получаем айди чата из адресной строки
        const urlParams = window.location.href.split('/');
        const chatId = Number(urlParams[urlParams.length - 1]);
        chatsApi.addUsersToChat({
          chatId,
          users,
        });
      } else {
        window.alert('Пользователей с таким логином не найдено');
      }
    });
};

/** Удалить пользователя из чата */
const deleteUserFromChat = ({ login }: { login: string }) => {
  const urlParams = window.location.href.split('/');
  const chatId = Number(urlParams[urlParams.length - 1]);
  chatsApi.getChatUsers({ id: chatId })
    .then((response: ResponseChat) => JSON.parse(response.response))
    .then((response: UserResponse[]) => {
      // Получаем список айди юзеров, подходящих по логину
      const users = response.filter((user) => user.login === login).map((user) => user.id);
      if (users.length > 0) {
      // Удаляем их из чата
        chatsApi.deleteUsersFromChat({
          chatId,
          users,
        })
          .then(() => {
            // Если пользователь текущий, то редиректим его на список чатов и обновляем список чатов
            if (users.includes(store.getState().profile.id)) {
              getChats();
              router.go('/messenger');
            }
          });
      } else {
        window.alert('Пользователей с таким логином не найдено');
      }
    });
};

/** Получить старые сообщения */
const getOldMessages = (props: GetOldMessagesPrors) => {
  if (!socket) throw new Error('getOldMessages: Нет активного сокета');
  socket.getOld(props.content);
};

/** Отправить сообщение */
const sendMessage = (props: SomeObject) => {
  if (!socket) throw new Error('sendMessage: Нет активного сокета');
  socket.send(props.message);
};

/** Логировать переданные данные в консоль */
const log = (props: SomeObject) => {
  console.log('log', props);
};

/** Выход из текущего чата */
const closeCurrentChat = () => {
  // Если текущий чат существует - закрываем его и очищаем стор
  if (socket) {
    socket.close();
    store.set('messages', []);
  }
};

/** Подключение к чату */
const connectToChat = ({ id }: { id: number }) => {
  // Получаем список чатов из стора
  const chats = store.get('chats') as ChatsResponse[];
  // Находим текущий чат по айди
  const currentChat = chats.find((chat) => chat.id === id);
  // Записываем текущий чат в стор
  store.set('currentChat', currentChat);
  // Получаем токен для real-time чата
  chatsApi.getChatsToken({ chatId: id })
    .then((response: ResponseChat) => JSON.parse(response.response))
    .then((response) => {
      const { token } = response;
      const profileId = store.getState().profile.id;

      // Создаём сокет и подписываемся на его обновления. Связываем со стором
      const socketUrl = `wss://ya-praktikum.tech/ws/chats/${profileId}/${id}/${token}`;
      // Закпываем старый чат
      closeCurrentChat();
      socket = new WebSocketService(socketUrl);
      socket.subscribe(SocketEvent.open, () => {});
      socket.subscribe(SocketEvent.close, () => {});
      socket.subscribe(SocketEvent.error, (payload) => {
        throw new Error(payload.message);
      });
      socket.subscribe(SocketEvent.message, (payload) => {
        // Получаем объект из строки
        const newMessage = convertStringToData(payload.data) as Message;
        // Если это сообщение просто пинг - ничего не делаем
        if (newMessage.type === 'pong') return;

        // Получаем старые сообщения из стора
        const oldMessages = store.getState().messages as Message[];
        let unsortedMessages = [];

        if (isArray(newMessage)) {
          unsortedMessages = [...oldMessages, ...newMessage];
        } else {
          oldMessages.push(newMessage);
          unsortedMessages = oldMessages;
        }

        // Сортируем сообщения по дате
        const result = unsortedMessages.sort((message1, message2) => {
          const date1 = new Date(message1.time).getTime();
          const date2 = new Date(message2.time).getTime();
          return date2 - date1;
        });

        // Записываем отсортированные сообщения в стор
        store.set('messages', result);
      });
      // и переходим в чат
      router.go(`/chat/${id}`);
    });
};

window.spaceChatStoreAction = registration;

export {
  registration,
  authorization,
  getProfile,
  logout,
  setProfileData,
  setProfileAvatar,
  setProfilePassword,
  getChats,
  createChat,
  deleteChat,
  addUserToChat,
  deleteUserFromChat,
  sendMessage,
  log,
  connectToChat,
  getOldMessages,
};
