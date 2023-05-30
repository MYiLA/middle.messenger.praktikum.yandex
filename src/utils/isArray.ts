function isArray(value: unknown): value is any[] {
  return Array.isArray(value);
}

export default isArray;
