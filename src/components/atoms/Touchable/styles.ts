import styled, { DefaultTheme } from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Typography } from '@components/atoms';

export interface StyledTouchableProps {
  disabled?: boolean;
  minHeight?: number;
  width?: string | number;
}

export interface TappableTextProps {
  titleFontSize?: number;
  disabledColor?: keyof DefaultTheme['tokens']['colors'];
}

export const StyledTouchable = styled.Pressable<StyledTouchableProps>`
  width: ${({ width }) => width ? String(width).includes('%') ? width : width + 'px' : '100%'};
  opacity: ${({ disabled }) => (disabled ? 0.65 : 1)};
  min-height: ${({ minHeight }) => getNormalizedVerticalSize(minHeight || 38)}px;
  max-width: ${getNormalizedHorizontalSize(350)}px;
`;

export const TappableText = styled(Typography)<TappableTextProps>`
    font-size: ${({ titleFontSize }) => getNormalizedVerticalSize(titleFontSize || 12)}px;
`;
