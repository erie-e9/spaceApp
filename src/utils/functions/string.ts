export const firstCapitalized = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const trimValues = (values: any) => {
  const normalizedValues: any = {};
  Object.keys(values).forEach((key) => {
    if (typeof values[key] === 'string') {
      normalizedValues[key] = values[key].trim().replace(/\s+/g, ' ');
    } else {
      normalizedValues[key] = values[key];
    }
  });
  return normalizedValues;
};

export const startsWithNumber = (value: string): boolean => {
  return /^[0-9]/.test(value);
};
