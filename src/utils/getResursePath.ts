import { BASE_HOST } from '../common/constant';

const getResursePath = (path: string): string => `${BASE_HOST}/resources${path}`;

export default getResursePath;
