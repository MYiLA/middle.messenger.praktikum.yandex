import Block from '../utils/Block';

/**
 * Роут
 */
export type Router = {
  path: string,
  component: Block,
  name: string,
};

/**
 * Базовый тип объекта
 */
export type SomeObject = Record<PropertyKey, any>;
