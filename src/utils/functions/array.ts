export const countOccurrences = (arr: Array<string>, val: string): number =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

export const listToObject = (list: any[]): any => {
  const values = Object.values(list);
  const object: any = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }

  return object;
};

export const clamp = (value: number, lowerBound: number, upperBound: number): number => {
  'worklet';

  return Math.max(lowerBound, Math.min(value, upperBound));
};

export const objectMove = (object: { [x: string]: unknown }, from: any, to: any): any => {
  'worklet';

  const newObject = { ...object };
  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
};

export const removeItemFromArrray = (array: any[], element: any): any[] => {
  const index = array.findIndex((item) => item === element);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
};

export const getPropertyValues = <T extends object, K extends keyof T>(
  array: T[],
  property: K,
): T[K][] => {
  return array.map((item) => item[property]);
};

interface Item {
  id: string;
  [key: string]: any;
}

export const jsonToArray = (jsonData: { [key: string]: { [key: string]: any } }): Item[] => {
  return Object.keys(jsonData).map((key) => ({
    id: key,
    ...jsonData[key],
  }));
};
