import styled, { css } from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { InterpolateColorAnimation } from '@components/animated';
import { Typography } from '@components/atoms';
import { PixelRatio } from 'react-native';

export const TextInputContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  z-index: 100;
  margin-top: ${getNormalizedVerticalSize(5)}px;
  min-height: ${PixelRatio.roundToNearestPixel(70)}px;
  background-color: transparent;
`;

export const LabelColorAnimationContainer = styled(InterpolateColorAnimation)`
  position: absolute;
  width: auto;
  top: ${getNormalizedVerticalSize(-6)}px;
  left: ${getNormalizedHorizontalSize(20)}px;
  border-radius: 5px;
  z-index: 1000;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px;
`;

export const CounterColorAnimationContainer = styled(InterpolateColorAnimation)`
  position: absolute;
  bottom: -10px;
  width: auto;
  right: ${getNormalizedHorizontalSize(15)}px;
  border-radius: 5px;
  z-index: 1000;
  padding: ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(5)}px;
`;

export const StyledText = styled(Typography) <{
  focused?: boolean;
  error?: boolean;
  backgroundLabel?: string;
  hasValue?: boolean;
  editable?: boolean;
  touched?: boolean;
}>`
  color: ${({ error, theme, focused, hasValue, editable }) => {
    const color =
      focused || (hasValue && editable)
        ? theme.tokens.colors.secondary600
        : theme.tokens.colors.secondary600;
    const colorFocused = error
      ? theme.tokens.colors.danger_status
      : theme.tokens.colors.tertiary950;
    return error ? colorFocused : color;
  }};
  letter-spacing: 0.5px;
`;

export interface WrapperProps {
  error: boolean;
  focused?: boolean;
  hasValue?: boolean;
  editable?: boolean;
  maintainFocus?: boolean;
  touched?: boolean;
  heightExpansible?: boolean;
}

export const Wrapper = styled.View<WrapperProps>`
  flex-direction: row;
  min-width: 100%;
  align-items: center;
  justify-content: flex-end;
  min-height: ${PixelRatio.roundToNearestPixel(45)}px; // change mutual height's here
  max-height: ${({ heightExpansible }) => heightExpansible ? 'auto' : PixelRatio.roundToNearestPixel(45) + 'px'};
  background-color: transparent;
  padding: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(20)}px;
  border-radius: ${getNormalizedHorizontalSize(25)}px;
  ${({ theme, error, focused, editable, maintainFocus }) =>
    theme.mode === 'dark'
      ? css`
          border-color: ${() => {
          const color =
            (focused && editable) || maintainFocus
              ? theme.tokens.colors.primary500
              : theme.tokens.colors.secondary950;
          return error ? theme.tokens.colors.danger_status : color;
        }};
          /* background-color: ${() =>
          editable ? 'transparent' : theme.tokens.colors.secondary800}; */
        `
      : css`
          // theme mode = 'light'
          border-color: ${() => {
          const color =
            (focused && editable) || maintainFocus
              ? theme.tokens.colors.primary500
              : theme.tokens.colors.secondary950;
          return error ? theme.tokens.colors.danger_status : color;
        }};
          /* background-color: ${() =>
          editable ? 'transparent' : theme.tokens.colors.secondary700}; */
        `};
  ${({ error, focused, editable, maintainFocus }) => css`
    border-width: ${() => {
      const borderwidth = (focused && editable) || maintainFocus ? 0.4 : 0.4;
      return error ? 0.4 : borderwidth;
    }}px;
  `};
`;

export const FooterContainer = styled.View`
  bottom: ${getNormalizedVerticalSize(5)}px;
  margin-horizontal: ${getNormalizedHorizontalSize(10)}px;
  justify-content: center;
`;

export const ErrorContainer = styled.View`
  /* position: absolute; */
  /* top: -7px; */
  width: auto;
  /* right: ${getNormalizedHorizontalSize(0)}px; */
  align-items: flex-start;
  align-self: flex-start;
  border-radius: 5px;
  z-index: 1000;
  bottom: ${getNormalizedVerticalSize(-5)}px;
  left: ${getNormalizedHorizontalSize(10)}px;
`;
