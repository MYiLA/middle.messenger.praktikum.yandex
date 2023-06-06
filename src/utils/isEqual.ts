import isArray from './isArray';
import isArrayOrObject from './isArrayOrObject';

function isEqual(lhs: unknown, rhs: unknown): boolean {
  if (lhs === null || rhs === null) return false;

  if (!isArrayOrObject(lhs) || !isArrayOrObject(rhs)) {
    return lhs === rhs;
  }

  const lhsKeys = Object.keys(lhs);
  const rhsKeys = Object.keys(rhs);

  if (lhsKeys.length !== rhsKeys.length) {
    return false;
  }

  // Проходим по значениям, пока не найдено различий
  let result = true;
  for (let i = 0; result === true && i < lhsKeys.length; i += 1) {
    const currentLhsKey = isArray(lhs) ? Number(lhsKeys[i]) : lhsKeys[i];
    const currentRhsKey = isArray(rhs) ? Number(rhsKeys[i]) : rhsKeys[i];
    const lhsItem = lhs[currentLhsKey] as unknown;
    const rhsItem = rhs[currentRhsKey] as unknown;
    if (isArrayOrObject(lhsItem) && isArrayOrObject(rhsItem)) {
      result = isEqual(lhsItem, rhsItem);
    } else if (lhsItem !== rhsItem) {
      result = false;
    }
  }

  return result;
}

export default isEqual;
