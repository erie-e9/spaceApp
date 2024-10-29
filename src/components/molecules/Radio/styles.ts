import styled, { DefaultTheme } from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Typography } from '@components/atoms';

export const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  min-height: ${getNormalizedVerticalSize(20)}px;
  min-width: ${getNormalizedHorizontalSize(90)}px;
  background-color: transparent;
`;

export interface RadioProps {
  activated: boolean;
  size: number;
  color: keyof DefaultTheme['tokens']['colors'];
}

export const RadioItem = styled.View<RadioProps>`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: ${({ size }) => (size ? size : 30)}px;
  height: ${({ size }) => (size ? size : 30)}px;
  border-radius: ${({ size }) => (size ? size / 2 : 30 / 2)}px;
  z-index: 1000;
  border-width: 0.75px;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px;
  border-color: ${({ color, theme }) => theme.tokens.colors[color || 'secondary950']};
  background-color: ${({ activated, color, theme }) =>
    activated ? theme.tokens.colors[color || 'secondary950'] : 'transparent'};
`;

export const Touchable = styled.TouchableHighlight.attrs({
  underlayColor: 'transparent',
  hitSlop: { top: 0, bottom: 0, right: 0, left: 0 },
})`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const StyledText = styled(Typography)``;
