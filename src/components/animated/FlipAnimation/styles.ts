import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

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
  margin-top: 80px;
  align-items: center;
`;
