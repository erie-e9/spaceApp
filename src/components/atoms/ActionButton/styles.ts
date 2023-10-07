import { PixelRatio } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import Animated from 'react-native-reanimated';
import type * as CSS from 'csstype';
import { toInteger } from 'lodash';
import { Typography } from '@components/atoms';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import Tappable from '@components/atoms/Tappable';

export interface StyledButtonProps {
  readonly backgroundColor?: string;
  readonly disabledColor?: keyof DefaultTheme['colors'];
  grouped?: boolean;
  loading?: boolean;
  disabled?: boolean;
  hasBorder?: boolean;
  colorScheme: string;
}

export interface StyleButtonTextProps {
  readonly color?: string;
  textTransform?: CSS.StandardProperties['textTransform'];
  fontWeight?: CSS.StandardProperties['fontWeight'];
  fontSize?: string | number;
  fullWidth: boolean;
  readonly disabledColor?: keyof DefaultTheme['colors'];
  disabled?: boolean;
  buttonType?: string;
  type?: 'Button' | 'Fab' | 'Link' | 'Text' | 'Icon';
  testID?: string;
}

export const AnimatedActionButton = styled(Animated.View)`
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
`;

export const StyledButton = styled(Tappable)<StyledButtonProps>`
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
  margin-vertical: ${getNormalizedVerticalSize(2)}px;
  height: ${PixelRatio.roundToNearestPixel(50)}px;
  padding: ${getNormalizedVerticalSize(0)}px
    ${({ loading }) => getNormalizedHorizontalSize(loading ? 15 : 20)}px;
  border-radius: ${({ loading, type }) =>
    getNormalizedHorizontalSize(loading || type === 'Icon' ? 50 : 10)}px;
  elevation: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
  ${({ hasBorder, theme, colorScheme }) =>
    hasBorder &&
    `
  border-width: 1px;
  border-color: ${
    colorScheme === 'light'
      ? theme.tokens.colors.surfaceL4
      : theme.tokens.colors.switchOutline
  };
  `}
`;
export const StyledText = styled(Typography)<StyleButtonTextProps>`
  text-align: center;
  justify-content: center;
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  font-size: ${({ fontWeight }) =>
    getNormalizedHorizontalSize(toInteger(fontWeight) || 18)}px;
  line-height: ${getNormalizedVerticalSize(25)}px;
  color: ${({ color }) => color};
  ${({ buttonType, theme }) =>
    buttonType === 'flat' &&
    `
  color: ${theme.tokens.colors.buttonTextColor};
  `}
`;

export const IconContainer = styled.View`
  flex: 1;
  position: absolute;
  justify-content: center;
  align-items: center;
`;
