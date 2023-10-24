import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/functions';

export const AnimatedBackgroundContainer = styled(Animated.View).attrs({
  ...StyleSheet.absoluteFillObject,
})`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.tokens.colors.backgroundColorDark + '80'};
`;
