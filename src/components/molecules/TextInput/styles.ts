import styled, { css } from 'styled-components/native';
import {
  getNormalizedHorizontalSize,
  getNormalizedVerticalSize,
  responsiveFontSize,
} from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';

type AlignStyle = 'left' | 'center';

interface PropsStyled {
  error?: boolean;
  align?: AlignStyle;
  focused?: boolean;
}

export const StyledTextInput = styled.TextInput<{
  textAlign: string;
  error?: boolean;
  fontSize?: number;
  editable?: boolean;
  colorTextOpposing?: boolean;
  styledFocus?: boolean;
}>`
  flex: 1;
  height: auto;
  width: 100%;
  font-weight: 400;
  font-size: ${responsiveFontSize(13)}px;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.5px;
  text-align: ${({ textAlign }) => textAlign};
  ${({ theme, error, colorTextOpposing }) =>
    theme.mode === 'dark'
      ? css`
          color: ${() =>
          error && !colorTextOpposing
            ? theme.tokens.colors.danger_status
            : error && colorTextOpposing
              ? theme.tokens.colors.secondary950
              : theme.tokens.colors.secondary950};
        `
      : css`
          color: ${() =>
          error && !colorTextOpposing
            ? theme.tokens.colors.danger_status
            : error && colorTextOpposing
              ? theme.tokens.colors.secondary950
              : theme.tokens.colors.secondary950};
        `}
`;

export const StyledIconTouchable = styled(Touchable) <PropsStyled>`
  border-radius: 16px;
  border: none;
  width: ${getNormalizedHorizontalSize(45)}px;
  height: ${getNormalizedVerticalSize(45)}px;
  display: flex;
  justify-content: center;
  align-content: center;
  right: ${getNormalizedHorizontalSize(-1)}px;
  top: ${getNormalizedVerticalSize(0)}px;
  elevation: 0;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.tokens.colors.primary200 : theme.colors.white};
`;

export const LeftIcon = styled.View`
  padding-left: ${getNormalizedHorizontalSize(10)}px;
`;

export const RightIconStyled = styled.View<{
  multiline?: boolean;
}>`
  justify-self: center;
  justify-content: flex-start;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(20)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  width: ${getNormalizedHorizontalSize(20)}px;
  height: ${({ multiline }) => (multiline ? '100%' : 'auto')};
  background-color: transparent;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  position: absolute;
  align-items: center;
  justify-self: flex-end;
  right: ${getNormalizedHorizontalSize(-55)}px;
  bottom: ${getNormalizedHorizontalSize(-28)}px;
`;

export const FooterTextContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  min-width: ${getNormalizedHorizontalSize(55)}px;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const StyledText = styled(Typography)``;
