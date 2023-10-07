import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { Typography } from '@components/atoms';
import { getNormalizedVerticalSize } from '@utils/functions';

export const AnimatedFrontFace = styled(Animated.View)`
  z-index: 0;
  position: absolute;
  justify-content: center;
  backface-visibility: hidden;
`;

export const AnimatedBackFace = styled(Animated.View)`
  z-index: 0;
  position: absolute;
  justify-content: center;
  backface-visibility: hidden;
`;

export const TriggerAnimationButton = styled.Pressable`
  margin-top: ${getNormalizedVerticalSize(80)}px;
  align-items: center;
`;

export const FlipAnimationText = styled(Typography)``;
