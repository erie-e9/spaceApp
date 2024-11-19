import styled, { DefaultTheme } from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';

export interface TaskContentComplete {
  isComplete?: boolean;
}

export interface TaskContent extends TaskContentComplete {
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

export const SwipeableFullContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.tokens.colors.primary500};
`;

export const TaskItemContainer = styled.View <TaskContent>`
  height: ${({ itemHeight }) => (itemHeight && `${itemHeight}px`) || 'auto'};
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  border-width: ${getNormalizedHorizontalSize(0)}px;
  border-color: #333;
`;

export const TaskItemButton = styled(Touchable)`
  height: 100%;
  padding: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(5)}px;
  background-color: ${({ theme }) => theme.tokens.colors.tertiary50};
`;

export const TaskContentContainer = styled.View<TaskContent>`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  opacity: ${({ isComplete }) => isComplete ? 0.7 : 1};
`;

export const TaskContentData = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 80%;
`;

export const TaskTitleText = styled(Typography) <TaskContentComplete>`
  text-decoration: ${({ theme, isComplete }) => isComplete ? `line-through ${theme.tokens.colors.tertiary800}` : null};
`;

export const TaskDescriptionText = styled(Typography) <TaskContentComplete>`
  text-decoration: ${({ theme, isComplete }) => isComplete ? `line-through ${theme.tokens.colors.tertiary800}` : null};
`;

export const CreatedAtContainer = styled.View`
  width: auto;
  align-items: flex-end;
`;

export const CreatedAtText = styled(Typography)`
`;

export const DueDateContainer = styled.View`
  width: auto;
  align-items: flex-end;
`;

export const DueDateText = styled(Typography)`
`;