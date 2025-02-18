import React, { memo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Container, Swipeable, TextContainer, StyledText } from './styles';

interface SwiperProps {
  onSwipe: () => void;
  text: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
}

export const Swiper: React.FC<SwiperProps> = ({
  onSwipe,
  text,
  width = 200,
  height = 50,
  backgroundColor = '#007BFF',
  textColor = '#FFFFFF',
}) => {
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > width / 2) {
        translateX.value = withSpring(width, {}, () => {
          onSwipe();
          translateX.value = withSpring(0);
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Container width={width} height={height} backgroundColor={backgroundColor}>
      <GestureDetector gesture={gesture}>
        <Swipeable style={animatedStyle} height={height}>
          <StyledText textColor={textColor}>▶</StyledText>
        </Swipeable>
      </GestureDetector>
      <TextContainer>
        <StyledText textColor={textColor}>{text}</StyledText>
      </TextContainer>
    </Container>
  );
};

export default memo(Swiper);
