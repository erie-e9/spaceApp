import React, { forwardRef, Fragment, memo, useCallback, useMemo } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { ListItem } from '@components/molecules';
import AnimatedListItem from '../AnimatedListItem';
import SwipeableItem from '../SwipeableItem';
import type { NullableNumber } from '../types';
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

    const renderedItem = useMemo(
      () =>
        renderItem ? (
          renderItem({ item, index })
        ) : (
          <ListItem title={item.username} subtitle={item.post_title} />
        ),
      [renderItem, item, index],
    );

    const handleSwipeableWillOpen = useCallback(
      (direction: SwipeDirection) => {
        onSwipeableWillOpen(direction);
      },
      [onSwipeableWillOpen],
    );

    const rightAction = useCallback(() => {
      renderRightAction?.({ index, ...item });
    }, [renderRightAction, item, index]);

    const leftAction = useCallback(() => {
      renderLeftAction?.({ index, ...item });
    }, [renderLeftAction, item, index]);

    return (
      <Fragment>
        {swipeable ? (
          <Swipeable
            ref={ref}
            key={index}
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
      </Fragment>
    );
  },
);

Item.displayName = 'Item';
export default memo(Item);
