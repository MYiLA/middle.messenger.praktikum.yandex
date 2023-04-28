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
  validator: (value: string) => boolean,
  value?: string,
};
