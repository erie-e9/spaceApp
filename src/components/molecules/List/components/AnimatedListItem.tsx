import React from 'react';
import { Image, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSVG } from '@hooks';
import { useGesture } from '../hooks/useGesture';
import { TListItem } from './types';
import { AnimatedItemContainer, ChildrenContainer, StyledText, styles } from '../styles';

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
              uri: item.postimage,
            }}
            style={styles.image}
          />
          <View style={styles.descriptionContainer}>
            <StyledText>{item.username}</StyledText>
          </View>
        </>
      )}
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.draggerContainer}>
          <DraggerIcon />
        </Animated.View>
      </GestureDetector>
    </AnimatedItemContainer>
  );
};
