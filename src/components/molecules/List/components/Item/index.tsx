import React, { forwardRef, memo, useCallback } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import { useTheme } from 'styled-components';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { ListItem } from '@components/molecules';
import AnimatedListItem from '../AnimatedListItem';
import SwipeableItem from '../SwipeableItem';
import { NullableNumber } from '../types';
import { ListProps } from '../..';

type SwipeDirection = 'left' | 'right';

interface Props extends Partial<ListProps> {
  item: any;
  index: number;
  onSwipeableWillOpen: (direction: SwipeDirection) => void;
  currentPositions: SharedValue<any>;
  filteredUsers: Array<Record<string, any>>;
}

const Item: React.FC<Props> = forwardRef(
  (
    {
      item,
      index,
      renderItem,
      onSwipeableWillOpen,
      swipeable = true,
      draggable = false,
      currentPositions,
      filteredUsers,
      itemHeight,
      renderRightActions,
      renderRightAction,
      renderLeftActions,
      renderLeftAction,
    },
    ref,
  ) => {
    const theme = useTheme();
    const isDragging = useSharedValue(0);
    const draggedItemId = useSharedValue<NullableNumber>(null);

    const renderedItem = renderItem ? (
      <>{renderItem({ item, index })}</>
    ) : (
      <ListItem title={item.username} subtitle={item.post_title} />
    );

    const handleSwipeableWillOpen = (direction: SwipeDirection) => {
      onSwipeableWillOpen(direction);
    };

    const rightAction = useCallback(() => {
      renderRightAction?.({ index, ...item });
    }, [item]);

    const leftAction = useCallback(() => {
      renderLeftAction?.({ index, ...item });
    }, [item]);

    return (
      <>
        {swipeable ? (
          <Swipeable
            ref={ref}
            overshootFriction={3}
            onSwipeableWillOpen={handleSwipeableWillOpen}
            renderLeftActions={
              renderLeftActions === undefined
                ? undefined
                : (progress, dragX) =>
                    renderLeftActions?.({ index, ...item }) || (
                      <SwipeableItem
                        icon="heart"
                        opposingColor
                        prog={progress}
                        drag={dragX}
                        onPress={leftAction}
                      />
                    )
            }
            renderRightActions={
              renderRightActions
                ? (progress, dragX) =>
                    renderRightActions?.({ index, ...item }) || (
                      <SwipeableItem
                        icon="remove"
                        prog={progress}
                        drag={dragX}
                        backgroundColor="danger_status"
                        onPress={rightAction}
                      />
                    )
                : undefined
            }
            containerStyle={{
              backgroundColor: theme.tokens.colors.tertiary200,
              borderRadius: 0,
            }}
          >
            {renderedItem}
          </Swipeable>
        ) : draggable ? (
          <AnimatedListItem
            item={item}
            id={index}
            key={index}
            isDragging={isDragging}
            draggedItemId={draggedItemId}
            currentPositions={currentPositions}
            itemsLength={filteredUsers.length}
            itemHeight={itemHeight}
          >
            {renderedItem}
          </AnimatedListItem>
        ) : (
          renderedItem
        )}
      </>
    );
  },
);

export default memo(Item);
