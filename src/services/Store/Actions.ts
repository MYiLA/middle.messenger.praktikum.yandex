import { SigninProps, SomeObject } from '../../common/types';
import { RegistrationFormData } from '../../pages/registration/type';
import getResponseText from '../../utils/getResponseText';
import AuthApi from '../Api/auth';
import { Router } from '../Router';
// import Store from './Store';

// const store = new Store();
const authApi = new AuthApi();
const router = new Router();

interface ResponseChat extends Response {
  responseText: string
}

/** Регистрация */
const registration = (props: RegistrationFormData): void => {
  // Удаляем повтор пароля
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { password_repeat, ...registrationProps } = props;

  authApi.registration(registrationProps).then((response: ResponseChat) => {
    if (response.status >= 200 && response.status < 300) {
      router.go('/home');
      console.log('Редирект на Home');
    }
    // TODO: Заменить алерты на компонент notification
    // eslint-disable-next-line no-alert
    window.alert(getResponseText(response.responseText));
  });
};

/** Авторизация */
const signin = (formData: SigninProps) => {
  const props = authApi.authorization(formData);
  console.log('signin', formData, props);
};

/** Получение подробной информации по текущему пользователю */
const getProfile = (props: SomeObject) => {
  console.log('getProfile', props);
};

/** Выход пользователя из системы */
const logout = (props: SomeObject) => {
  console.log('logout', props);
};

/** Изменить данные текущего пользователя */
const setProfileData = (props: SomeObject) => {
  console.log('setProfileData', props);
};

/** Изменить аватар текущего пользователя */
const setProfileAvatar = (props: SomeObject) => {
  console.log('setProfileAvatar', props);
};

/** Изменить пароль текущего пользователя */
const setProfilePassword = (props: SomeObject) => {
  console.log('setProfilePassword', props);
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
  signin,
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
