import { SharedValue } from 'react-native-reanimated';

export type TItem = {
  id: number;
  title: string;
  singer: string;
  imageSrc: string;
};

export type TListItem = {
  item: TItem;
  isDragging: SharedValue<number>;
  draggedItemId: SharedValue<NullableNumber>;
  currentPositions: SharedValue<TSongPositions>;
  itemsLength: number;
  itemHeight?: number;
  children?: JSX.Element | React.ReactNode;
};

export type TSongPositions = {
  [key: number]: {
    updatedIndex: number;
    updatedTop: number;
  };
};

export type NullableNumber = null | number;
