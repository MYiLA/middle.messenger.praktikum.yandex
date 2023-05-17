import { MESSAGES, VALIDATOR } from '../../common/constant';
import { Input } from '../../common/types';

export const FORM = {
  dataChange: 'data-change',
  passwordChange: 'password-change',
  avatarChange: 'avatar-change',
};

export const DATA_INPUTS: Input[] = [
  {
    name: 'email',
    label: 'Почта',
    value: 'pochta@yandex.ru',
    type: 'email',
    invalidMessage: MESSAGES.invalid.email,
    validator: VALIDATOR.email,
  },
  {
    name: 'login',
    label: 'Логин',
    value: 'ivanivanov',
    type: 'text',
    invalidMessage: MESSAGES.invalid.login,
    validator: VALIDATOR.login,
  },
  {
    name: 'first_name',
    label: 'Имя',
    value: 'Иван',
    type: 'text',
    invalidMessage: MESSAGES.invalid.name,
    validator: VALIDATOR.name,
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    value: 'Иванов',
    type: 'text',
    invalidMessage: MESSAGES.invalid.name,
    validator: VALIDATOR.name,
  },
  {
    name: 'display_name',
    label: 'Имя в чате',
    value: 'Иван-77',
    type: 'text',
    invalidMessage: MESSAGES.invalid.name,
    validator: VALIDATOR.name,
  },
  {
    name: 'phone',
    label: 'Телефон',
    value: '+79099673030',
    type: 'tel',
    invalidMessage: MESSAGES.invalid.phone,
    validator: VALIDATOR.phone,
  },
];

export const PASSWORD_INPUTS: Input[] = [
  {
    name: 'oldPassword',
    label: 'Старый пароль',
    value: 'Пароль1234@',
    type: 'password',
    invalidMessage: MESSAGES.invalid.password,
    validator: VALIDATOR.password,
  },
  {
    name: 'newPassword',
    label: 'Новый пароль',
    value: 'Пароль123@',
    type: 'password',
    invalidMessage: MESSAGES.invalid.password,
    validator: VALIDATOR.password,
  },
  {
    name: 'repeatNewPassword',
    label: 'Повторите новый пароль',
    value: 'Пароль123@',
    type: 'password',
    invalidMessage: MESSAGES.invalid.repeatInputValue,
    validator: VALIDATOR.repeatInputValue,
    repeatInputName: 'newPassword',
  },
];
