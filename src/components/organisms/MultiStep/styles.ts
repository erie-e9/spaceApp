import styled, { DefaultTheme } from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

export const StyledText = styled(Typography)``;

export const StepContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: transparent;
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  height: auto;
  justify-content: center;
  margin: ${getNormalizedVerticalSize(3)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(3)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

export const ButtonContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(2)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(2)}px;
`;

interface StyledButtonProps {
  disabled?: boolean;
}

export const StyledButton = styled(ActionButton)<StyledButtonProps>``;

export const PointsContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: ${getNormalizedVerticalSize(2.5)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(2.5)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

// Points

export const Container = styled.View<{ direction?: string; width: string }>`
  justify-content: center;
  align-items: center;
  min-height: ${getNormalizedVerticalSize(10)}px;
  /* min-width: 10px; */
  min-width: ${({ width }) => width};
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(4)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(4)}px;
  background-color: transparent;
`;

export const CirclePoint = styled.View<{
  size?: number;
  activated: boolean;
  isFilled: boolean;
  color?: string | keyof DefaultTheme['tokens']['colors'];
}>`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  margin-horizontal: ${getNormalizedHorizontalSize(3.5)}px;
  width: ${(props) => (props.size ? props.size : 20)}px;
  height: ${(props) => (props.size ? props.size : 20)}px;
  border-width: 0.75px;
  border-radius: ${(props) => (props.size ? props.size / 2 : 30 / 2)}px;
  border-color: ${({ color, theme, isFilled }) =>
    color && String(color).includes('#')
      ? color
      : isFilled
      ? theme.tokens.colors.secondary950
      : theme.tokens.colors[color || 'primary500']};
  background-color: ${({ theme, activated, isFilled, color }) =>
    activated && !isFilled
      ? color && String(color).includes('#')
        ? color
        : theme.tokens.colors[color || 'primary500']
      : isFilled && !activated
      ? 'transparent'
      : theme.tokens.colors.secondary950};
`;

export const TouchablePoints = styled.TouchableHighlight.attrs({
  underlayColor: 'transparent',
  hitSlop: { top: 0, bottom: 0, right: 0, left: 0 },
})`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const ProgressBarContainer = styled.View`
  width: 100%;
  padding-horizontal: ${getNormalizedHorizontalSize(5)}px;
`;

export const ProgressBarBackground = styled.View`
  height: ${getNormalizedVerticalSize(5)}px;
  background-color: ${({ theme }) => theme.tokens.colors.secondary950};
  border-radius: 10px;
  overflow: hidden;
`;

export const ProgressBarFill = styled(Animated.View)<{
  color?: string | keyof DefaultTheme['tokens']['colors'];
}>`
  height: 100%;
  border-radius: 2px;
  background-color: ${({ theme, color }) =>
    color ? theme.tokens.colors[color] : theme.tokens.colors.primary500};
`;
