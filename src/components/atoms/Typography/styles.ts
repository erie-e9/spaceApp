import { memo } from 'react';
import { Text as NativeText, Platform, PixelRatio } from 'react-native';
import styled, { css, DefaultTheme } from 'styled-components/native';
import isFinite from 'lodash/isFinite';
import {
  responsiveFontSize,
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';

const Fonts = {
  ...Platform.select({
    ios: {
      RobotoBlack: 'Roboto-Black',
      RobotoRegular: 'Roboto-Regular',
      RobotoMedium: 'Roboto-Medium',
    },
    android: {
      RobotoBlack: 'RobotoBlack',
      RobotoRegular: 'RobotoRegular',
      RobotoMedium: 'RobotoMedium',
    },
  }),
};

export interface TextProps {
  type?:
    | 'Headline1'
    | 'Headline2'
    | 'Headline3'
    | 'Headline4'
    | 'Headline5'
    | 'Headline6'
    | 'Subtitle1'
    | 'Subtitle2'
    | 'Subtitle3'
    | 'Body1'
    | 'Body2'
    | 'Body3'
    | 'Body4'
    | 'Button'
    | 'Caption'
    | 'Label';
  font?: 'Primary' | 'Secondary';
  color?: keyof DefaultTheme['tokens']['colors'];
  weight?: number | 'bold' | 'semi-bold' | 'normal';
  paddingTop?: number;
  marginRight?: number;
  textAlign?: 'auto' | 'center' | 'justify' | 'left' | 'right';
  textTransform?: string;
  textDecorationLine?: string;
  disabled?: boolean;
  firstCapitalized?: boolean;
}

const createFontStyle = (
  fontSize: number,
  lineHeight: number,
  letterSpacing: number,
  fontWeight: number | string,
) => css`
  font-size: ${responsiveFontSize(fontSize)}px;
  line-height: ${getNormalizedVerticalSize(lineHeight)}px;
  letter-spacing: ${PixelRatio.roundToNearestPixel(letterSpacing)}px;
  font-weight: ${fontWeight};
`;

export const MainFont = css`
  font-family: 'Arial';
`;

export const SecondaryFont = css`
  font-family: '${Fonts.RobotoRegular}';
`;

export const Headline1 = createFontStyle(32, 40, -1.25, 400);
export const Headline2 = createFontStyle(26, 34, -0.5, 400);
export const Headline3 = createFontStyle(24, 32, 0, 400);
export const Headline4 = createFontStyle(22, 28, 0.25, 500);
export const Headline5 = createFontStyle(20, 26, 0, 400);
export const Headline6 = createFontStyle(18, 24, 0.15, 400);

export const Subtitle1 = createFontStyle(16, 24, 0.15, 400);
export const Subtitle2 = createFontStyle(14, 21, 0.1, 500);
export const Subtitle3 = createFontStyle(12, 18, 0.4, 400);

export const Body1 = createFontStyle(16, 24, 0.5, 400);
export const Body2 = createFontStyle(15, 20, 0.25, 400);
export const Body3 = createFontStyle(14, 20, 0.25, 400);
export const Body4 = createFontStyle(13, 18, 0.05, 400);

export const Button = createFontStyle(14, 20, 1.25, 500);
export const Caption = createFontStyle(12, 16, 0.4, 400);
export const Label = createFontStyle(11, 16, 0.5, 400);

export const Text = styled(NativeText)<TextProps>`
  padding-top: ${({ paddingTop }) => getNormalizedVerticalSize(paddingTop || 0)}px;
  margin-right: ${({ marginRight }) => getNormalizedHorizontalSize(marginRight || 0)}px;
  text-align: ${({ textAlign }) => textAlign || 'left'};
  text-transform: ${({ textTransform }) => textTransform || 'none'};
  text-decoration-line: ${({ textDecorationLine }) => textDecorationLine || 'none'};
  color: ${({ theme, color }) => {
    return theme.tokens.colors[color || 'secondary950'];
  }};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  ${({ font }) => {
    switch (font) {
      case 'Primary':
        return MainFont;
      case 'Secondary':
        return SecondaryFont;
      default:
        return MainFont;
    }
  }}
  ${({ type }) => {
    switch (type) {
      case 'Headline1':
        return Headline1;
      case 'Headline2':
        return Headline2;
      case 'Headline3':
        return Headline3;
      case 'Headline4':
        return Headline4;
      case 'Headline5':
        return Headline5;
      case 'Headline6':
        return Headline6;
      case 'Subtitle1':
        return Subtitle1;
      case 'Subtitle2':
        return Subtitle2;
      case 'Subtitle3':
        return Subtitle3;
      case 'Body1':
        return Body1;
      case 'Body2':
        return Body2;
      case 'Body3':
        return Body3;
      case 'Body4':
        return Body4;
      case 'Button':
        return Button;
      case 'Caption':
        return Caption;
      case 'Label':
        return Label;
      default:
        return Body4;
    }
  }}
  ${({ weight }) => {
    if (isFinite(weight)) {
      return css`
        font-weight: ${weight};
      `;
    }

    switch (weight) {
      case 'bold':
        return css`
          font-weight: bold;
        `;
      case 'semi-bold':
        return css`
          font-weight: 500;
        `;
      case 'normal':
      default:
        return css`
          font-weight: normal;
        `;
    }
  }}
`;

Text.defaultProps = {
  color: 'secondary800',
  paddingTop: 0,
  weight: 'normal',
};

export default memo(Text);
