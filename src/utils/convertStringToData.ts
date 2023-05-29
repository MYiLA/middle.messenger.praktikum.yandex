import { SomeObject } from '../common/types';

const convertStringToData = (string: string): SomeObject => {
  if (string[0] === '[') {
    const stringArray = string.slice(1, -1).split('},').map((item) => `${item}}`);
    return stringArray.map((item) => convertStringToData(item));
  }
  return string
    .split('"')
    .filter((item) => (
      (item !== '{') && (item !== '}') && (item !== ',')
    )).reduce((acc, item, index, arr) => {
      if (item === ':') {
        const key = arr[index - 1];
        const value = arr[index + 1];
        acc[key] = value;
      } else if (item[0] === ':') {
        const key = arr[index - 1];
        const value = item.slice(1, -1);
        acc[key] = Number(value);
      }
      return acc;
    }, {} as SomeObject);
};

export default convertStringToData;
