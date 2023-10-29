import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { screen_height, screen_width } from '@utils/functions';

export const AnimatedBackgroundContainer = styled(Animated.View).attrs({
  ...StyleSheet.absoluteFillObject,
})`
  width: ${screen_width}px;
  height: ${screen_height}px;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: ${({ theme }) =>
    theme.tokens.colors.backgroundColorDark + '60'};
`;
