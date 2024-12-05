import styled, { DefaultTheme } from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Typography } from '@components/atoms';

export interface QueueContentComplete {
  isComplete?: boolean;
}

export interface QueueContent extends QueueContentComplete {
  itemHeight?: number;
}

export const SwipeButton = styled.TouchableOpacity<{
  backgroundColor?: keyof DefaultTheme['tokens']['colors'];
}>`
  height: 100%;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 0px;
  opacity: 1;
  background-color: ${({ theme, backgroundColor }) => backgroundColor ? theme.tokens.colors[backgroundColor] : 'transparent'};
`;

export const AnimatedView = styled(Animated.View)`
  flex-direction: row;
`;

export const QueueItemContainer = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.tokens.colors.tertiary50};
`;

export const QueueTagText = styled(Typography)``;

export const QueueMetaContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
`;

export const QueueTagContainer = styled.View<{
  backgroundColor?: keyof DefaultTheme['tokens']['colors'];
}>`
  height: auto;
  min-width: 50px;
  border-radius: 5px;
  border-width: 0px;
  justify-content: center;
  align-items: center;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(3)}px;
  padding: ${getNormalizedVerticalSize(1.5)}px ${getNormalizedHorizontalSize(7)}px;
  background-color: ${({ theme, backgroundColor }) => backgroundColor ? theme.tokens.colors[backgroundColor] : 'transparent'};
`;