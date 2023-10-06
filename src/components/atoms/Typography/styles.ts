import { isFinite } from 'lodash';
import { Text as NativeText, Platform } from 'react-native';
import styled, { css, DefaultTheme } from 'styled-components/native';
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
    | 'Caption';
  font?: 'primary' | 'secondary';
  color?: keyof DefaultTheme['tokens']['colors'];
  weight?: number | 'bold' | 'semi-bold' | 'normal';
  paddingTop?: number;
  marginRight?: number;
  textAlign?: 'auto' | 'center' | 'justify' | 'left' | 'right';
  textTransform?: string;
  textDecorationLine?: string;
}

export const MainFont = css`
  font-family: 'Armin Grotesk';
`;

export const SecondaryFont = css`
  font-family: '${Fonts.RobotoRegular}';
`;

export const Headline1 = css`
  font-weight: 400;
  font-size: ${responsiveFontSize(60)}px;
  letter-spacing: ${getNormalizedHorizontalSize(-1.5)}px;
  line-height: ${getNormalizedVerticalSize(62.4)}px;
`;
export const Headline2 = css`
  font-weight: 400;
  font-size: ${responsiveFontSize(51)}px;
  letter-spacing: ${getNormalizedHorizontalSize(-0.5)}px;
  line-height: ${getNormalizedVerticalSize(52.8)}px;
`;
export const Headline3 = css`
  font-weight: 400;
  font-size: ${responsiveFontSize(42)}px;
  letter-spacing: ${getNormalizedHorizontalSize(0)}px;
  line-height: ${getNormalizedVerticalSize(43.2)}px;
`;

export const Headline4 = css`
  font-weight: 500;
  font-size: ${responsiveFontSize(37)}px;
  letter-spacing: ${getNormalizedHorizontalSize(-0.32)}px;
  line-height: ${getNormalizedVerticalSize(38)}px;
`;

export const Headline5 = css`
  font-weight: 400;
  font-size: ${responsiveFontSize(32)}px;
  letter-spacing: ${getNormalizedHorizontalSize(0)}px;
  line-height: ${getNormalizedVerticalSize(33)}px;
`;

export const Headline6 = css`
  font-weight: 400;
  font-size: ${responsiveFontSize(25)}px;
  letter-spacing: ${getNormalizedHorizontalSize(0)}px;
  line-height: ${getNormalizedVerticalSize(27.2)}px;
`;

export const Subtitle1 = css`
  font-size: ${responsiveFontSize(17)}px;
  letter-spacing: ${getNormalizedHorizontalSize(0.55)}px;
  line-height: ${getNormalizedVerticalSize(20)}px;
`;

export const Subtitle2 = css`
  font-size: ${responsiveFontSize(15)}px;
  letter-spacing: ${getNormalizedHorizontalSize(0.1)}px;
  line-height: ${getNormalizedVerticalSize(21)}px;
`;

export const Subtitle3 = css`
  font-weight: 600;
  font-size: ${responsiveFontSize(16)}px;
  letter-spacing: ${getNormalizedHorizontalSize(0.1)}px;
  line-height: ${getNormalizedVerticalSize(18)}px;
`;

export const Body1 = css`
  font-weight: 400;
  font-size: ${responsiveFontSize(24)}px;
  letter-spacing: ${getNormalizedHorizontalSize(0.08)}px;
  line-height: ${getNormalizedVerticalSize(33.6)}px;
  ${SecondaryFont}
`;
export const Body2 = css`
  font-weight: 300;
  font-size: ${responsiveFontSize(17)}px;
  letter-spacing: ${getNormalizedHorizontalSize(0.08)}px;
  line-height: ${getNormalizedVerticalSize(23.8)}px;
  ${SecondaryFont}
`;
export const Body3 = css`
  font-weight: 400;
  font-size: ${responsiveFontSize(16)}px;
  letter-spacing: ${getNormalizedHorizontalSize(0.08)}px;
  line-height: ${getNormalizedVerticalSize(21)}px;
  ${SecondaryFont}
`;
export const Body4 = css`
  font-weight: 500;
  font-size: ${responsiveFontSize(14)}px;
  letter-spacing: ${getNormalizedHorizontalSize(0.08)}px;
  line-height: ${getNormalizedVerticalSize(16.8)}px;
  ${SecondaryFont}
`;
export const Button = css`
  font-weight: 500;
  font-size: ${responsiveFontSize(18)}px;
  letter-spacing: ${getNormalizedHorizontalSize(1.25)}px;
  line-height: ${getNormalizedVerticalSize(20)}px;
  ${SecondaryFont}
`;
export const Caption = css`
  font-weight: 400;
  font-size: ${responsiveFontSize(12)}px;
  letter-spacing: ${getNormalizedHorizontalSize(0)}px;
  line-height: ${getNormalizedVerticalSize(14.4)}px;
  ${SecondaryFont}
`;

export const Bold = css`
  font-weight: bold;
`;

export const SemiBold = css`
  font-weight: 500;
`;

export const Normal = css`
  font-weight: normal;
`;

const Text = styled(NativeText)<TextProps>`
  padding-top: ${({ paddingTop }) =>
    getNormalizedVerticalSize(paddingTop || 0)}px;
  margin-right: ${({ marginRight }) =>
    getNormalizedHorizontalSize(marginRight || 0)}px;
  text-align: ${({ textAlign }) => textAlign || 'left'};
  text-transform: ${({ textTransform }) => textTransform || 'none'};
  text-decoration-line: ${({ textDecorationLine }) =>
    textDecorationLine || 'none'};
  color: ${({ color, theme }) => {
    return theme.tokens.colors[color || 'primaryD1'];
  }};
  ${({ font }) => {
    switch (font) {
      case 'primary':
      case 'secondary':
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
      default:
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
        return Bold;
      case 'semi-bold':
        return SemiBold;
      case 'normal':
      default:
        return Normal;
    }
  }}
`;

Text.defaultProps = { color: 'primaryD1', paddingTop: 0, weight: 'normal' };

export { Text };
