import { PixelRatio } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import Animated from 'react-native-reanimated';
import type * as CSS from 'csstype';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';

export interface StyledButtonProps {
  readonly backgroundColor?: string;
  readonly disabledColor?: keyof DefaultTheme['colors'];
  grouped?: boolean;
  loading?: boolean;
  disabled?: boolean;
  hasBorder?: boolean;
  colorScheme: string;
  type?: 'Button' | 'Fab' | 'Link' | 'Text' | 'Icon';
}

export interface StyleButtonTextProps {
  readonly color?: string;
  textTransform?: CSS.StandardProperties['textTransform'];
  fontWeight?: CSS.StandardProperties['fontWeight'];
  fontSize?: string | number;
  readonly disabledColor?: keyof DefaultTheme['colors'];
  disabled?: boolean;
  buttonType?: string;
  testID?: string;
}

export const AnimatedActionButton = styled(Animated.View)`
  align-self: center;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

export const StyledButton = styled(Touchable)<StyledButtonProps>`
  ${({ grouped }) =>
    grouped &&
    `
    flex: 1;
    margin: ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(
      2,
    )}px;
  `}
  justify-content: center;
  align-items: center;
  display: flex;
  align-content: center;
  margin-vertical: ${getNormalizedVerticalSize(2)}px;
  border-radius: ${({ loading, type }) =>
    PixelRatio.roundToNearestPixel(loading || type === 'Icon' ? 24.5 : 15)}px;
  opacity: ${({ disabled }) => disabled ? 0.65 : 1};
  elevation: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
  ${({ type }) => type === 'Icon' && 'width: 43px; height: 43px;'};
  ${({ hasBorder, theme, colorScheme }) =>
    hasBorder &&
    `
  border-width: 0.7px;
  border-color: ${colorScheme === 'light'
      ? theme.tokens.colors.opposing
      : theme.tokens.colors.switchOutline
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

export const StyledText = styled(Typography) <StyleButtonTextProps>`
  text-align: ${({ textAlign }) => textAlign || 'center'};
  justify-content: center;
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  line-height: ${getNormalizedVerticalSize(25)}px;
  color: ${({ color }) => color};
  ${({ buttonType, theme }) =>
    buttonType === 'flat' &&
    `
  color: ${theme.tokens.colors.buttonTextColor};
  `}
`;

export const LottieIconContainer = styled.View`
  flex: 1;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  align-items: center;
  z-index: 1000;
`;