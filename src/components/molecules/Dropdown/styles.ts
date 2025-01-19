import { PixelRatio, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';
import {
  getNormalizedHorizontalSize,
  getNormalizedVerticalSize,
  responsiveFontSize,
} from '@utils/functions';
import { Typography } from '@components/atoms';

interface StyledTextProps {
  error?: boolean;
  backgroundLabel?: string;
  hasValue?: boolean;
  fontSize?: number;
}

//! se puede reusar
export const StyledText = styled(Typography) <StyledTextProps>`
  ${({ error, theme, hasValue }) => css`
    color: ${() => {
      const color = hasValue ? theme.tokens.colors.typography950 : theme.tokens.colors.typography700;
      const colorFocused = error
        ? theme.tokens.colors.danger_status
        : theme.tokens.colors.typography700;
      return error ? colorFocused : color;
    }};
  `};
  font-size: ${responsiveFontSize(13)}px;
`;

export interface StyledButtonProps {
  error?: boolean;
  focused?: boolean;
  hasValue?: boolean;
  editable?: boolean;
  styledFocus?: boolean;
  maintainFocus?: boolean;
  touched?: boolean;
  width?: string | number;
}

export const StyledButton = styled(TouchableWithoutFeedback) <StyledButtonProps>`
  height: 100%;
`;

export const StyledElementContainer = styled.View<StyledButtonProps>`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  min-height: ${PixelRatio.roundToNearestPixel(45)}px;
  width: ${({ hasValue }) => hasValue ? '100%' : '100%'};
  background-color: transparent;
`;

export const ItemText = styled(Typography) <StyledTextProps>``;

export const AnimatedDropdownContent = styled(Animated.View)`
  top: ${getNormalizedVerticalSize(50)}px;
  z-index: 1000;
  border-width: 0px;
  position: absolute;
  overflow: hidden;
  border-radius: ${getNormalizedHorizontalSize(10)}px;
  background-color: ${({ theme }) => theme.tokens.colors.secondary800};
`;

export const ListItemContainer = styled.View<{
  width?: ViewStyle['width'];
}>`
  height: auto;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
`;

export const Item = styled.TouchableOpacity`
  border-bottom-width: ${getNormalizedHorizontalSize(0.7)}px;
  padding-vertical: ${getNormalizedVerticalSize(10)}px;
  border-bottom-color: ${({ theme }) => theme.tokens.colors.secondary600};
  background-color: transparent;
`;

export const DropdownsContainer = styled.View`
  flex-direction: column;
  height: ${getNormalizedVerticalSize(60)}px;
  align-self: center;
`;

export const ItemsContainer = styled.View<{
  height?: number;
}>`
  width: 100%;
  top: ${getNormalizedHorizontalSize(-5)}px;
  height: ${({ height }) => height || getNormalizedVerticalSize(180)}px;
  position: relative;
  align-items: flex-start;
  align-self: center;
  justify-content: space-evenly;
  z-index: 200;
`;

export const SelectorContainer = styled.View`
  flex-direction: row;
  align-self: center;
  width: 100%;
  min-height: ${PixelRatio.roundToNearestPixel(45)}px; // change mutual height's here
  justify-content: flex-end;
  align-items: center;
  z-index: 100;
`;

export const ButtonContainer = styled.View`
  height: auto;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
  background-color: transparent;
`;

export const StyledTextInput = styled.TextInput``;