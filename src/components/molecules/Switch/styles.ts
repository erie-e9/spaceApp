import styled, { DefaultTheme } from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Typography } from '@components/atoms';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export interface StyledSwitchProps {
  activated?: boolean;
  size?: number;
  borderColor?: keyof DefaultTheme['tokens']['colors'];
}

export const StyledSwitch = styled.View<StyledSwitchProps>`
  flex-direction: row;
  align-items: center;
  height: ${({ size }) => (size && size) || 20}px;
  width: ${({ size }) => (size && size * 2) || 40}px;
  border-radius: ${({ size }) => (size && size / 2) || 9}px;
  border-width: 0.75px;
  border-color: ${({ borderColor, theme }) => theme.tokens.colors[borderColor || 'secondary950']};
  padding: ${getNormalizedHorizontalSize(1)}px;
  z-index: 1000;
  background-color: transparent;
`;

export interface IndicatorContainerProps {
  size?: number;
}
export const IndicatorContainer = styled.View<IndicatorContainerProps>`
  flex-direction: row;
  position: absolute;
  height: ${({ size }) => (size && size) || 18}px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${getNormalizedHorizontalSize(5)}px;
  z-index: 10;
`;

export const StyledText = styled(Typography)``;

export interface StyledAnimatedContainerProps {
  size?: number;
  color?: keyof DefaultTheme['tokens']['colors'];
}

export const StyledAnimatedContainer = styled(Animated.View)<StyledAnimatedContainerProps>`
  height: ${({ size }) => (size && size * 0.9) || 18}px;
  width: ${({ size }) => (size && size * 0.9) || 18}px;
  justify-content: center;
  align-items: center;
  z-index: 40;
  border-radius: ${({ size }) => (size && size / 2) || 18}px;
  background-color: ${({ color, theme }) => theme.tokens.colors[color || 'secondary950']};
`;

export const DescriptionContainer = styled.View`
  flex: 1;
  margin: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(8)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(8)}px;
`;
