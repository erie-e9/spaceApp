import styled, { DefaultTheme } from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Typography } from '@components/atoms';

export interface StyledTouchableProps {
  disabledButton?: boolean;
  disabled?: boolean;
  minHeight?: number;
  width?: string | number;
}

export interface TappableTextProps {
  titleFontSize?: number;
  disabledColor?: keyof DefaultTheme['tokens']['colors'];
}

export const StyledTouchable = styled.Pressable<StyledTouchableProps>`
  width: ${({ width }) => (width ? (String(width).includes('%') ? width : width + 'px') : '100%')};
  opacity: ${({ disabledButton }) => (disabledButton ? 0.6 : 1)};
  justify-content: center;
  min-height: ${({ minHeight }) => getNormalizedVerticalSize(minHeight || 25)}px;
  /* max-width: ${getNormalizedHorizontalSize(350)}px; */
`;

export const TappableText = styled(Typography) <TappableTextProps>``;
