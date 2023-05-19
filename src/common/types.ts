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
