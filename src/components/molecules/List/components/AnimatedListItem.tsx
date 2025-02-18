import React, { Fragment, memo } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import { useGesture } from '../hooks/useGesture';
import type { TListItem } from './types';
import { Image, SVGIcon } from '@components/atoms';
import {
  AnimatedDraggerContainer,
  AnimatedItemContainer,
  ChildrenContainer,
  DescriptionContainer,
  StyledText,
} from '../styles';

export const AnimatedListItem = ({
  item,
  id,
  isDragging,
  draggedItemId,
  currentPositions,
  itemsLength,
  itemHeight,
  children,
}: TListItem) => {
  const { animatedStyles, gesture } = useGesture({
    item,
    id,
    isDragging,
    draggedItemId,
    currentPositions,
    itemsLength,
    itemHeight,
  });

  return (
    <AnimatedItemContainer key={item.id} style={[animatedStyles]}>
      {children ? (
        <ChildrenContainer>{children}</ChildrenContainer>
      ) : (
        <Fragment>
          <Image
            source={{
              uri: item.imageSrc,
            }}
          />
          <DescriptionContainer>
            <StyledText>{item.title}</StyledText>
          </DescriptionContainer>
        </Fragment>
      )}
      <GestureDetector gesture={gesture}>
        <AnimatedDraggerContainer>
          <SVGIcon icon="menu" />
        </AnimatedDraggerContainer>
      </GestureDetector>
    </AnimatedItemContainer>
  );
};

export default memo(AnimatedListItem);
