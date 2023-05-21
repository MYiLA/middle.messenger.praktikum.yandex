import {
  ChangePasswordForm,
  ResponseChat, SigninProps, SomeObject,
} from '../../common/types';
import { RegistrationFormData } from '../../pages/registration/type';
import AuthApi from '../Api/auth';
import { UserRequest } from '../Api/type';
import UserApi from '../Api/users';
import { Router } from '../Router';
import Store from './Store';

const store = new Store();
const authApi = new AuthApi();
const userApi = new UserApi();
const router = new Router();

/** Получение подробной информации по текущему пользователю */
const getProfile = () => {
  authApi.getCurrentUser()
    .then((response: ResponseChat) => JSON.parse(response.response))
    .then((data) => {
      store.set('profile', data);
    });
};

/** Регистрация */
const registration = (props: RegistrationFormData): void => {
  // Удаляем повтор пароля
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { password_repeat, ...registrationProps } = props;

  authApi.registration(registrationProps).then(() => {
    getProfile();
    // Если регистрация успешно прошла - редиректим в мессенджер
    router.go('/messenger');
  });
};

/** Авторизация */
const authorization = (formData: SigninProps) => {
  authApi.authorization(formData).then(() => {
    getProfile();
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
const setProfileAvatar = (props: File) => {
  console.log('Экшн аватара');
  userApi.setProfileAvatar(props)
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

/** Получить информацию по конкретному пользователю */
const getUser = (props: SomeObject) => {
  console.log('getUser', props);
};

/** Получить чаты текущего пользователя */
const getChats = (props: SomeObject) => {
  console.log('getChats', props);
};

/** Создать чат */
const createChat = (props: SomeObject) => {
  console.log('createChat', props);
};

/** Удалить чат */
const deleteChat = (props: SomeObject) => {
  console.log('deleteChat', props);
};

/** Получить пользователей чата */
const getChatUsers = (props: SomeObject) => {
  console.log('getChatUsers', props);
};

/** Получить количество новых сообщений в указанном чате */
const getMessageCount = (props: SomeObject) => {
  console.log('getMessageCount', props);
};

/** Добавить пользователя в чат */
const addUserInChat = (props: SomeObject) => {
  console.log('addUserInChat', props);
};

/** Удалить пользователя из чата */
const deleteUserFromChat = (props: SomeObject) => {
  console.log('deleteUserFromChat', props);
};

/** Отправить сообщение */
const sendMessage = (props: SomeObject) => {
  console.log('sendMessage', props);
};

/** Логировать переданные данные в консоль */
const log = (props: SomeObject) => {
  console.log('log', props);
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
  getUser,
  getChats,
  createChat,
  deleteChat,
  getChatUsers,
  getMessageCount,
  addUserInChat,
  deleteUserFromChat,
  sendMessage,
  log,
};
