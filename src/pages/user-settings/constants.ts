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
    type: 'email',
    invalidMessage: MESSAGES.invalid.email,
    validator: VALIDATOR.email,
  },
  {
    name: 'login',
    label: 'Логин',
    type: 'text',
    invalidMessage: MESSAGES.invalid.login,
    validator: VALIDATOR.login,
  },
  {
    name: 'first_name',
    label: 'Имя',
    type: 'text',
    invalidMessage: MESSAGES.invalid.name,
    validator: VALIDATOR.name,
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
    invalidMessage: MESSAGES.invalid.name,
    validator: VALIDATOR.name,
  },
  {
    name: 'display_name',
    label: 'Имя в чате',
    type: 'text',
    invalidMessage: MESSAGES.invalid.name,
    validator: VALIDATOR.name,
  },
  {
    name: 'phone',
    label: 'Телефон',
    type: 'tel',
    invalidMessage: MESSAGES.invalid.phone,
    validator: VALIDATOR.phone,
  },
];

export const PASSWORD_INPUTS: Input[] = [
  {
    name: 'oldPassword',
    label: 'Старый пароль',
    type: 'password',
    invalidMessage: MESSAGES.invalid.password,
    validator: VALIDATOR.password,
  },
  {
    name: 'newPassword',
    label: 'Новый пароль',
    type: 'password',
    invalidMessage: MESSAGES.invalid.password,
    validator: VALIDATOR.password,
  },
  {
    name: 'repeatNewPassword',
    label: 'Повторите новый пароль',
    type: 'password',
    invalidMessage: MESSAGES.invalid.repeatInputValue,
    validator: VALIDATOR.repeatInputValue,
    repeatInputName: 'newPassword',
  },
];
