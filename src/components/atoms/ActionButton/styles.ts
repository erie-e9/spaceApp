import { PixelRatio } from 'react-native';
import type * as CSS from 'csstype';
import { toInteger } from 'lodash';
import styled, { DefaultTheme } from 'styled-components/native';
import { Typography } from '@components/atoms';
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
  min-width: ${({ loading, type }) =>
    loading || type === 'Icon' ? '50px' : '100%'};
  padding: 0px
    ${({ loading }) => PixelRatio.roundToNearestPixel(loading ? 10 : 20)}px;
  border-radius: ${({ loading, type }) =>
    PixelRatio.roundToNearestPixel(loading || type === 'Icon' ? 30 : 15)}px;
  elevation: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
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
export const StyledText = styled(Typography)<StyleButtonTextProps>`
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

export const IconContainer = styled.View`
  flex: 1;
  position: absolute;
  justify-content: center;
  align-items: center;
`;
