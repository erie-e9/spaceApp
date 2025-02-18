import { PixelRatio, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';

interface Props {
  error?: boolean;
  focused?: boolean;
}

export const OtpInputContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(15)}px ${getNormalizedHorizontalSize(10)}px;
`;

export const InputContainer = styled(Animated.View)`
  width: ${getNormalizedHorizontalSize(50)}px;
  height: auto;
  margin: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(5)}px
    ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(5)}px;
  justify-content: center;
  align-items: center;
`;

export const StyledTextInput = styled(TextInput)<Props>`
  z-index: 5;
  width: ${PixelRatio.roundToNearestPixel(44)}px;
  height: ${PixelRatio.roundToNearestPixel(60)}px;
  border-radius: ${PixelRatio.roundToNearestPixel(10)}px;
  font-size: ${PixelRatio.roundToNearestPixel(17)}px;
  color: ${({ theme, error }) =>
    !error ? theme.tokens.colors.secondary950 : theme.tokens.colors.danger_status};
  border-width: 1px;
  margin-right: ${PixelRatio.roundToNearestPixel(7)}px;
  text-align: center;
  ${({ focused }) =>
    css`
      border-color: ${({ theme }) =>
        focused ? theme.tokens.colors.tertiary600 : theme.tokens.colors.tertiary300};
    `}
  ${({ error }) =>
    error &&
    css`
      border-color: ${({ theme }) => theme.tokens.colors.danger_status};
    `}
`;
