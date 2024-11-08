import React, { memo } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import { useSVG } from '@hooks';
import { useGesture } from '../hooks/useGesture';
import { TListItem } from './types';
import { Image } from '@components/atoms';
import {
  AnimatedDraggerContainer,
  AnimatedItemContainer,
  ChildrenContainer,
  DescriptionContainer,
  StyledText,
} from '../styles';

export const AnimatedListItem = ({
  item,
  isDragging,
  draggedItemId,
  currentPositions,
  itemsLength,
  itemHeight,
  children,
}: TListItem) => {
  const DraggerIcon = useSVG('menu');
  const { animatedStyles, gesture } = useGesture({
    item,
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
        <>
          <Image
            source={{
              uri: item.imageSrc,
            }}
          />
          <DescriptionContainer>
            <StyledText>{item.title}</StyledText>
          </DescriptionContainer>
        </>
      )}
      <GestureDetector gesture={gesture}>
        <AnimatedDraggerContainer>
          <DraggerIcon />
        </AnimatedDraggerContainer>
      </GestureDetector>
    </AnimatedItemContainer>
  );
};

export default memo(AnimatedListItem);
