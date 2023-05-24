enum ActionName {
  /** Регистрация */
  registration = 'registration',
  /** Авторизация */
  signin = 'signin',
  /** Получение подробной информации по текущему пользователю */
  getProfile = 'getProfile',
  /** Выход пользователя из системы */
  logout = 'logout',
  /** Изменить данные текущего пользователя */
  setProfileData = 'setProfileData',
  /** Изменить аватар текущего пользователя */
  setProfileAvatar = 'setProfileAvatar',
  /** Изменить пароль текущего пользователя */
  setProfilePassword = 'setProfilePassword',
  /** Получить информацию по конкретному пользователю */
  getUser = 'getUser',
  /** Получить чаты текущего пользователя */
  getChats = 'getChats',
  /** Создать чат */
  createChat = 'createChat',
  /** Удалить чат */
  deleteChat = 'deleteChat',
  /** Получить пользователей чата */
  getChatUsers = 'getChatUsers',
  /** Получить количество новых сообщений в указанном чате */
  getMessageCount = 'getMessageCount',
  /** Добавить пользователя в чат */
  addUserInChat = 'addUserInChat',
  /** Удалить пользователя из чата */
  deleteUserFromChat = 'deleteUserFromChat',
  /** Отправить сообщение */
  sendMessage = 'sendMessage',
  /** Логировать переданные данные в консоль */
  log = 'log',
  /** Подключение в чат по айди */
  connectToChat = 'connectToChat',
}

export default ActionName;
