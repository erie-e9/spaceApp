import { PixelRatio } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { type TouchableProps } from '@types';
import type * as CSS from 'csstype';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Touchable, Typography, Image } from '@components/atoms';

export interface StyleButtonTextProps {
  readonly color?: keyof DefaultTheme['tokens']['colors'];
  textTransform?: CSS.StandardProperties['textTransform'];
  fontWeight?: CSS.StandardProperties['fontWeight'];
  fontSize?: string | number;
  readonly disabledColor?: keyof DefaultTheme['colors'];
  disabled?: boolean;
  buttonType?: string;
  testID?: string;
}

export const AnimatedContainer = styled(Animated.View)`
  align-self: center;
  align-items: center;
  justify-content: center;
  z-index: 200;
  width: 100%;
`;

export interface StyledButtonProps extends Partial<TouchableProps> {
  hasBorder?: boolean;
  colorScheme: string;
}

export const StyledButton = styled(Touchable) <StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  /* max-width: ${PixelRatio.roundToNearestPixel(355)}px; */
  min-width: ${PixelRatio.roundToNearestPixel(45)}px;
  min-height: ${PixelRatio.roundToNearestPixel(45)}px; // change mutual height's here
  margin-vertical: ${getNormalizedVerticalSize(2)}px;
  border-radius: ${({ loading, type }) =>
    PixelRatio.roundToNearestPixel(loading || type === 'Icon' ? 30 : 20)}px;
  border-color: ${({ theme }) => theme.tokens.colors.primary500};
  elevation: 0;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? theme.tokens.colors[backgroundColor] : 'transparent'};
  ${({ type }) => type === 'Icon' && 'width: 43px; height: 43px;'};
  ${({ hasBorder, theme, colorScheme }) =>
    hasBorder &&
    `
  border-width: 0.4px;
  border-color: ${colorScheme === 'light' ? theme.tokens.colors.secondary950 : theme.tokens.colors.secondary950
    };
  `}
`;

export const LoadingContainer = styled.View`
  flex: 1;
`;

export const IconContainer = styled.View`
  flex: 1;
  position: absolute;
  justify-content: center;
  align-items: center;
`;
export interface StyledImageProps {
  size: number;
}

export const StyledImage = styled(Image) <StyledImageProps>`
  height: ${({ size }) => getNormalizedVerticalSize(size)}px;
  width: ${({ size }) => getNormalizedHorizontalSize(size)}px;
  border-radius: ${({ size }) => size / 2}px;
`;

export const StyledText = styled(Typography) <StyleButtonTextProps>`
  text-align: ${({ textAlign }) => textAlign || 'center'};
  justify-content: center;
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  line-height: ${getNormalizedVerticalSize(25)}px;
  color: ${({ theme, color }) => theme.tokens.colors[color || 'typography950']};
  ${({ buttonType, theme }) =>
    buttonType === 'flat' &&
    `
  color: ${theme.tokens.colors.primary500};
  `}
`;

export const LottieIconContainer = styled.View`
  flex: 1;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  align-items: center;
  z-index: 1000;
`;
