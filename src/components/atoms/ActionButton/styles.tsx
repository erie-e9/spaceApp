import { PixelRatio } from 'react-native';
import type * as CSS from 'csstype';
import { toInteger } from 'lodash';
import styled, { DefaultTheme } from 'styled-components/native';
import { Text } from '@components/atoms';
import Tappable from '@components/atoms/Tappable';

export interface StyledButtonProps {
  readonly backgroundColor?: string;
  readonly disabledColor?: keyof DefaultTheme['colors'];
  grouped?: boolean;
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
  testID?: string;
}

export const LoadingContainer = styled.View`
  flex: 1;
`;

export const StyledButton = styled(Tappable)<StyledButtonProps>`
  ${({ grouped }) =>
    grouped &&
    `
    flex: 1;
    margin:${PixelRatio.roundToNearestPixel(2)}px;
  `}
  justify-content: center;
  align-items: center;
  height: ${PixelRatio.roundToNearestPixel(50)}px;
  min-width: 100%;
  padding: 0px 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${PixelRatio.roundToNearestPixel(10)}px;
  elevation: 0;
  ${({ hasBorder, theme, colorScheme }) =>
    hasBorder &&
    `
  border-width: 1px;
  border-color: ${
    colorScheme === 'light'
      ? theme.tokens.colors.darkBlueD1
      : theme.tokens.colors.switchOutline
  };
  `}
`;
export const StyledText = styled(Text)<StyleButtonTextProps>`
  text-align: center;
  justify-content: center;
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  font-size: ${({ fontWeight }) =>
    PixelRatio.roundToNearestPixel(toInteger(fontWeight) || 18)}px;
  line-height: ${PixelRatio.roundToNearestPixel(25)}px;
  color: ${({ color }) => color};
  ${({ buttonType, theme }) =>
    buttonType === 'flat' &&
    `
  color: ${theme.tokens.colors.darkBlueD5};
  `}
`;
