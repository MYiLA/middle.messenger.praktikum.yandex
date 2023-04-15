/**
 * Базовый тип объекта
 */
export type SomeObject = Record<PropertyKey, any>;

/**
 * Базовый компонент
 */
export type Component = {
  render: (params?:SomeObject) => string;
}

/**
 * Роут
 */
export type Rout = {
  path: string,
  component: Component,
  name: string,
}
