export const isEmptyArray = (arg: unknown[]): boolean => {
  return Array.isArray(arg) && arg.length > 0;
};

export const isEmptyObject = (arg: unknown): boolean => {
  // const result = Object.keys(arg as Record<string, unknown>).length > 0;
  // return !result;
  if (typeof arg === 'object' && arg !== null) {
    return Object.keys(arg).length === 0;
  }
  return false;
};

export const isEmpty = (arg: unknown): boolean => {
  let isNullish = !arg;
  if (isNullish) return true;
  if (typeof arg === 'object') {
    isNullish = isEmptyObject(arg);
  }
  return isNullish;
};

export const isEmptyValue = (value?: string): boolean => {
  return value === null || value === undefined || value === '';
};
