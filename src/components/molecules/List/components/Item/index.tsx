import React, { forwardRef, memo, useCallback } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import { useTheme } from 'styled-components';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { ListItem } from '@components/molecules';
import AnimatedListItem from '../AnimatedListItem';
import SwipeableItems from '../SwipeableItems';
import { NullableNumber } from '../types';
import { ListProps } from '../..';

type SwipeDirection = 'left' | 'right';

interface Props extends Partial<ListProps> {
  item: any;
  index: number;
  onSwipeableWillOpen: (direction: SwipeDirection) => void;
  currentPositions: SharedValue<any>;
  filteredUsers: Array<Record<string, any>>;
  renderRightActions?: (item: any) => JSX.Element;
  renderRightAction?: (item: any) => void;
  renderLeftActions?: (item: any) => JSX.Element;
  renderLeftAction?: (item: any) => void;
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
      renderRightAction?.(item);
    }, [item]);

    const leftAction = useCallback(() => {
      renderLeftAction?.(item);
    }, [item]);

    return (
      <>
        {swipeable ? (
          <Swipeable
            ref={ref}
            onSwipeableWillOpen={handleSwipeableWillOpen}
            renderLeftActions={(progress, dragX) =>
              renderLeftActions?.(item) || (
                <SwipeableItems
                  icon="heart"
                  opposingColor
                  prog={progress}
                  drag={dragX}
                  onPress={leftAction}
                />
              )
            }
            renderRightActions={(progress, dragX) =>
              renderRightActions?.(item) || (
                <SwipeableItems
                  icon="remove"
                  prog={progress}
                  drag={dragX}
                  backgroundColor={theme.tokens.colors.danger_status}
                  onPress={rightAction}
                />
              )
            }
            containerStyle={{
              alignItems: 'center',
              backgroundColor: theme.tokens.colors.tertiary200,
              // borderRadius: 10,
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
          />
        ) : (
          renderedItem
        )}
      </>
    );
  },
);

export default memo(Item);
