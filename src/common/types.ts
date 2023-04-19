import { Page404, PageAuthorization } from '../pages';

/**
 * Роут
 */
export type Rout = {
  path: string,
  component: PageAuthorization | Page404,
  name: string,
};
