import { isFinite } from 'lodash';
import { Text as NativeText } from 'react-native';
import styled, { css, DefaultTheme } from 'styled-components/native';

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
  textAlign?: string;
  textTransform?: string;
  textDecorationLine?: string;
}

export const MainFont = css`
  font-family: 'Armin Grotesk';
`;

export const SecondaryFont = css`
  font-family: 'Heebo';
`;

export const Headline1 = css`
  font-weight: 400;
  font-size: 102px;
  letter-spacing: -1.5px;
  line-height: 122.4px;
`;
export const Headline2 = css`
  font-weight: 400;
  font-size: 64px;
  letter-spacing: -0.5px;
  line-height: 76.8px;
`;
export const Headline3 = css`
  font-weight: 400;
  font-size: 51px;
  letter-spacing: 0px;
  line-height: 61.2px;
`;

export const Headline4 = css`
  font-weight: 500;
  font-size: 42px;
  letter-spacing: -0.32px;
  line-height: 44px;
`;

export const Headline5 = css`
  font-weight: 400;
  font-size: 32px;
  letter-spacing: 0px;
  line-height: 30px;
`;

export const Headline6 = css`
  font-weight: 400;
  font-size: 25px;
  letter-spacing: 0px;
  line-height: 25.2px;
`;

export const Subtitle1 = css`
  font-size: 17px;
  letter-spacing: 0.15px;
  line-height: 20.4px;
`;

export const Subtitle2 = css`
  font-size: 15px;
  letter-spacing: 0.1px;
  line-height: 21px;
`;

export const Subtitle3 = css`
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.1px;
  line-height: 18px;
`;

export const Body1 = css`
  font-weight: 400;
  font-size: 24px;
  letter-spacing: 0.08px;
  line-height: 33.6px;
  ${SecondaryFont}
`;
export const Body2 = css`
  font-weight: 300;
  font-size: 17px;
  letter-spacing: 0.08px;
  line-height: 23.8px;
  ${SecondaryFont}
`;
export const Body3 = css`
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.08px;
  line-height: 21px;
  ${SecondaryFont}
`;
export const Body4 = css`
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.08px;
  line-height: 16.8px;
  ${SecondaryFont}
`;
export const Button = css`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 1.25px;
  line-height: 20px;
  ${SecondaryFont}
`;
export const Caption = css`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0px;
  line-height: 14.4px;
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
  padding-top: ${({ paddingTop }) => paddingTop || 0}px;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
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
