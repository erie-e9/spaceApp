/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */

export const countOccurrences = (arr: string[], val: string): number =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

export const listToObject = (list: any[]): any => {
  const values = Object.values(list);
  const object: any = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i].favorite_user_id] = i;
  }

  return object;
};

export const clamp = (
  value: number,
  lowerBound: number,
  upperBound: number
): number => {
  'worklet';

  return Math.max(lowerBound, Math.min(value, upperBound));
};

export const objectMove = (
  object: { [x: string]: any },
  from: any,
  to: any
): any => {
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

export const removeItemFromArrray = (
  array: any[],
  element: any
): any[] => {
  const index = array.findIndex((item) => item === element);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
};
