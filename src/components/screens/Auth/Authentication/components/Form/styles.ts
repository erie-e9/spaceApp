import { PixelRatio } from 'react-native';
import styled, { DefaultTheme, css } from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Touchable } from '@components/atoms';

export const FormContainer = styled.View`
  align-items: center;
  margin-top: ${getNormalizedHorizontalSize(20)}px;
`;

export const SendCodeButtonRightIconContainer = styled.View`
  position: relative;
`;

export interface SendCodeButtonProps {
  disabled?: boolean;
  disabledColor?: keyof DefaultTheme['tokens']['colors'];
}

export const SendCodeButton = styled(Touchable)<SendCodeButtonProps>`
  justify-content: center;
  align-items: center;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px;
  border-radius: ${PixelRatio.roundToNearestPixel(12)}px;
  border-width: 0px;
  ${({ theme, disabled, disabledColor }) =>
    theme.mode === 'dark'
      ? css`
          border-color: ${() =>
            disabled
              ? disabledColor || theme.tokens.colors.tertiaryL1
              : theme.tokens.colors.secondary100};
        `
      : css`
          border-color: ${() =>
            disabled
              ? disabledColor || theme.tokens.colors.tertiaryL2
              : theme.tokens.colors.primary300};
        `};
`;
