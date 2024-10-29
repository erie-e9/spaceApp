import {
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { NullableNumber, TSongPositions, TItem } from '../components/types';

export const ANIMATION_DURATION = 600;
export const useGesture = ({
  item,
  isDragging,
  draggedItemId,
  currentPositions,
  itemsLength,
  itemHeight = 60,
}: {
  item: TItem;
  isDragging: SharedValue<number>;
  draggedItemId: SharedValue<NullableNumber>;
  currentPositions: SharedValue<TSongPositions>;
  itemsLength: number;
  itemHeight?: number;
}) => {
  // const itemHeight = 90
  const MAX_BOUNDRY = (itemsLength - 1) * itemHeight; // change to dynamic value
  const theme = useTheme();
  //used for swapping with currentIndex
  const newIndex = useSharedValue<NullableNumber>(null);

  //used for swapping with newIndex
  const currentIndex = useSharedValue<NullableNumber>(null);

  const currentPositionsDerived = useDerivedValue(() => {
    return currentPositions.value;
  });

  const top = useSharedValue(item.id * itemHeight);

  const isDraggingDerived = useDerivedValue(() => {
    return isDragging.value;
  });

  const draggedItemIdDerived = useDerivedValue(() => {
    return draggedItemId.value;
  });

  useAnimatedReaction(
    () => {
      return currentPositionsDerived.value[item.id].updatedIndex;
    },
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        if (draggedItemIdDerived.value !== null && item.id === draggedItemIdDerived.value) {
          top.value = withSpring(currentPositionsDerived.value[item.id].updatedIndex * itemHeight);
        } else {
          top.value = withTiming(currentPositionsDerived.value[item.id].updatedIndex * itemHeight, {
            duration: 400,
          });
        }
      }
    },
  );

  const isCurrentDraggingItem = useDerivedValue(() => {
    return isDraggingDerived.value && draggedItemIdDerived.value === item.id;
  });

  const getKeyOfValue = (value: number, obj: TSongPositions): number | undefined => {
    'worklet';
    for (const [key, val] of Object.entries(obj)) {
      if (val.updatedIndex === value) {
        return Number(key);
      }
    }
    return undefined; // Return undefined if the value is not found
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      //start dragging
      isDragging.value = withSpring(1);

      //keep track of dragged item
      draggedItemId.value = item.id;

      //store dragged item id for future swap
      currentIndex.value = currentPositionsDerived.value[item.id].updatedIndex;
    })
    .onUpdate((e) => {
      if (draggedItemIdDerived.value === null) {
        return;
      }

      const newTop =
        currentPositionsDerived.value[draggedItemIdDerived.value].updatedTop + e.translationY;

      if (currentIndex.value === null || newTop < 0 || newTop > MAX_BOUNDRY) {
        //dragging out of bound
        return;
      }
      top.value = newTop;

      //calculate the new index where drag is headed to
      newIndex.value = Math.floor((newTop + itemHeight / 2) / itemHeight);

      //swap the items present at newIndex and currentIndex
      if (newIndex.value !== currentIndex.value) {
        //find id of the item that currently resides at newIndex
        const newIndexItemKey = getKeyOfValue(newIndex.value, currentPositionsDerived.value);

        //find id of the item that currently resides at currentIndex
        const currentDragIndexItemKey = getKeyOfValue(
          currentIndex.value,
          currentPositionsDerived.value,
        );

        if (newIndexItemKey !== undefined && currentDragIndexItemKey !== undefined) {
          //we update updatedTop and updatedIndex as next time we want to do calculations from new top value and new index
          currentPositions.value = {
            ...currentPositionsDerived.value,
            [newIndexItemKey]: {
              ...currentPositionsDerived.value[newIndexItemKey],
              updatedIndex: currentIndex.value,
              updatedTop: currentIndex.value * itemHeight,
            },
            [currentDragIndexItemKey]: {
              ...currentPositionsDerived.value[currentDragIndexItemKey],
              updatedIndex: newIndex.value,
            },
          };

          //update new index as current index
          currentIndex.value = newIndex.value;
        }
      }
    })
    .onEnd(() => {
      if (currentIndex.value === null || newIndex.value === null) {
        return;
      }
      top.value = withSpring(newIndex.value * itemHeight);
      //find original id of the item that currently resides at currentIndex
      const currentDragIndexItemKey = getKeyOfValue(
        currentIndex.value,
        currentPositionsDerived.value,
      );

      if (currentDragIndexItemKey !== undefined) {
        //update the values for item whose drag we just stopped
        currentPositions.value = {
          ...currentPositionsDerived.value,
          [currentDragIndexItemKey]: {
            ...currentPositionsDerived.value[currentDragIndexItemKey],
            updatedTop: newIndex.value * itemHeight,
          },
        };
      }
      //stop dragging
      isDragging.value = withDelay(200, withSpring(0));
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: top.value,
      transform: [
        {
          scale: isCurrentDraggingItem.value
            ? interpolate(isDraggingDerived.value, [0, 1], [1, 1.05])
            : interpolate(isDraggingDerived.value, [0, 1], [1, 1]),
        },
      ],
      backgroundColor: isCurrentDraggingItem.value
        ? interpolateColor(
            isDraggingDerived.value,
            [0, 1],
            [theme.tokens.colors.tertiary50, theme.tokens.colors.tertiary50],
          )
        : 'transparent', // background by default

      shadowColor: isCurrentDraggingItem.value
        ? interpolateColor(
            isDraggingDerived.value,
            [0, 1],
            [theme.tokens.colors.secondary950, theme.tokens.colors.secondary950],
          )
        : undefined,
      shadowOffset: {
        width: 0,
        height: isCurrentDraggingItem.value
          ? interpolate(isDraggingDerived.value, [0, 1], [0, 5])
          : 0,
      },
      shadowOpacity: isCurrentDraggingItem.value
        ? interpolate(isDraggingDerived.value, [0, 1], [0, 0.15])
        : 0,
      shadowRadius: isCurrentDraggingItem.value
        ? interpolate(isDraggingDerived.value, [0, 1], [0, 5])
        : 0,
      elevation: isCurrentDraggingItem.value
        ? interpolate(isDraggingDerived.value, [0, 1], [0, 5])
        : 0,
      zIndex: isCurrentDraggingItem.value ? 1 : 0,
    };
  }, [draggedItemIdDerived.value, isDraggingDerived.value]);

  return {
    animatedStyles,
    gesture,
  };
};
