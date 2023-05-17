import { SomeObject } from '../../common/types';
// import Store from './Store';

// const store = new Store();

/** Регистрация */
const signup = (props: SomeObject) => {
  console.log('signup', props);
};

/** Авторизация */
const signin = (props: SomeObject) => {
  console.log('signin', props);
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

window.spaceChatStoreAction = signup;

export {
  signup,
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
