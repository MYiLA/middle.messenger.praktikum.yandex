export const VALIDATOR = {
  /**
   * От 3 до 20 символов, латиница, может содержать цифры но не состоять из них,
   * без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)
   */
  login: (value: string): boolean => /^([\da-zA-Z\-_]{3,20})$/.test(value) && !/^\d+$/.test(value),
  /** От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра */
  password: (value: string): boolean => /^(.{8,40})$/.test(value) && /\d+/.test(value) && /[A-Z]+|[А-Я]/.test(value),
  /**
   * Латиница или кириллица, первая буква должна быть заглавной,
   * без пробелов и без цифр, нет спецсимволов (допустим только дефис)
   */
  name: (value: string): boolean => /^[A-ZА-Я]/.test(value) && /^[A-Za-zА-Яа-я/-]{0,}$/.test(value),
  /**
   * Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@)
   * и точка после неё, но перед точкой обязательно должны быть буквы
   */
  email: (value: string): boolean => /^[\da-zA-Z\-_]{0,}@[a-zA-Z]{1,}.[a-zA-Z]{2,5}$/.test(value),
  /** От 10 до 15 символов, состоит из цифр, может начинается с плюса */
  phone: (value: string): boolean => /^\+?\d{10,15}$/.test(value),
  /** Не должно быть пустым */
  message: (value: string): boolean => !!value,
  /** Значения в инпутах должны совпадать */
  repeatInputValue:
  (value: string, repeatInputValue: string): boolean => value === repeatInputValue,
};

export const MESSAGES = {
  invalid: {
    login: 'Некорректный логин',
    password: 'Пароль слишком слабый',
    name: 'С заглавной буквы без спецсимволов',
    email: 'Некорректный емейл',
    phone: 'Некорректный телефон',
    message: 'Пожалуйста заполните поле',
    repeatInputValue: 'Пожалуйста повторите предыдущую запись',
  },
};

export const BASE_HOST = 'https://ya-praktikum.tech/api/v2';

export const PING_PERIOD = 20000;

export enum SocketEvent {
  /** Cрабатывает, когда соединение установлено */
  open = 'open',
  /** Cрабатывает, когда получены данные */
  close = 'close',
  /** Cрабатывает, когда происходит ошибка */
  error = 'error',
  /** Cрабатывает, когда соединение закрыто */
  message = 'message',
}
