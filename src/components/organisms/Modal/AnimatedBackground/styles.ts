import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const AnimatedBackgroundContainer = styled(Animated.View).attrs({
  ...StyleSheet.absoluteFillObject,
})`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.tokens.colors.backgroundColorDark + '80'};
`;
