import { MESSAGES, VALIDATOR } from '../../common/constant';

export const DEFAULT_SETTING = {
  form: 'registration',
};

type Input = {
  name: string,
  label: string,
  type: 'email' | 'text' | 'tel' | 'password',
  invalidMessage: string,
  validator: (value: string) => boolean,
};

export const INPUTS: Input[] = [
  {
    name: 'email',
    label: 'Почта',
    type: 'email',
    validator: VALIDATOR.email,
    invalidMessage: MESSAGES.invalid.email,
  },
  {
    name: 'login',
    label: 'Логин',
    type: 'text',
    validator: VALIDATOR.login,
    invalidMessage: MESSAGES.invalid.login,
  },
  {
    name: 'first_name',
    label: 'Имя',
    type: 'text',
    validator: VALIDATOR.name,
    invalidMessage: MESSAGES.invalid.name,
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
    validator: VALIDATOR.name,
    invalidMessage: MESSAGES.invalid.name,
  },
  {
    name: 'phone',
    label: 'Телефон',
    type: 'tel',
    validator: VALIDATOR.phone,
    invalidMessage: MESSAGES.invalid.phone,
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    validator: VALIDATOR.password,
    invalidMessage: MESSAGES.invalid.password,
  },
  {
    name: 'password-repeat',
    label: 'Пароль',
    type: 'password',
    validator: VALIDATOR.password,
    invalidMessage: MESSAGES.invalid.password,
  },
];
