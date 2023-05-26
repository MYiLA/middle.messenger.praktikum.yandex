/**
 * Базовый тип объекта
 */
export type SomeObject = Record<PropertyKey, any>;

/**
 * Данные для отрисовки инпута
 */
export type Input = {
  name: string,
  label: string,
  type: 'email' | 'text' | 'tel' | 'password',
  invalidMessage: string,
  validator: (value: string, repeatInputValue?: string) => boolean,
  value?: string,
  repeatInputName?: string,
};

/**
 * Данные пользователя для регистрации
 */
export type RegistrationProps = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
};

/**
 * Данные пользователя для авторизации
 */
export type SigninProps = {
  login: string,
  password: string,
};

/**
 * Данные пользователя
 */
export type UserInfo = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string,
  role: string
};

export type SetProfileDataProps = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
};

export interface ResponseChat extends Response {
  responseText: string,
  response: string
}

export type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

export type LoginFormData = {
  login: string
};

export type ChatsResponse = {
  id: number;
  title: string;
  avatar: string;
  /** Количество непрочитанных сообщений в чате для текущего пользователя */
  unread_count: number;
  last_message: Message;
};

export type Message = {
  user: UserResponse;
  time: string;
  content: string;
};

/** Информация о пользователе, которая приходит с бэка */
export type UserResponse = {
  /** id */
  id: number;
  /** Имя */
  first_name: string;
  /** Фамилия */
  second_name: string;
  /** Никнейм */
  display_name: string;
  /** Уникальный логин */
  login: string;
  /** Почта */
  email: string;
  /** Телефон */
  phone: string;
  /** Аватар */
  avatar: string;
};
