import { PixelRatio, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';
import {
  getNormalizedHorizontalSize,
  getNormalizedVerticalSize,
  responsiveFontSize,
} from '@utils/functions';
import { Typography } from '@components/atoms';
import { TextInput } from '@components/molecules';

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
      const color = hasValue ? theme.tokens.colors.secondary950 : theme.tokens.colors.secondary500;
      const colorFocused = error
        ? theme.tokens.colors.danger_status
        : theme.tokens.colors.tertiary950;
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

export const StyledButton = styled(TouchableWithoutFeedback) <StyledButtonProps>``;

export const StyledElementContainer = styled.View<StyledButtonProps>`
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
  padding-horizontal: ${getNormalizedHorizontalSize(15)}px;
  width: ${({ width }) => (width ? (String(width).includes('%') ? width : width + 'px') : '100%')};
`;

export const ItemText = styled(Typography) <StyledTextProps>`
  color: ${({ theme }) => theme.tokens.colors.secondary950};
`;

export const AnimatedDropdownContent = styled(Animated.View)`
  top: ${getNormalizedVerticalSize(50)}px;
  z-index: 1000;
  overflow: hidden;
  border-width: 0px;
  position: absolute;
  border-radius: ${getNormalizedHorizontalSize(10)}px;
  background-color: ${({ theme }) => theme.tokens.colors.secondary800};
`;

export const Item = styled.TouchableOpacity<{
  width?: string | number;
}>`
  border-bottom-width: ${getNormalizedHorizontalSize(0.7)}px;
  padding-vertical: ${getNormalizedVerticalSize(10)}px;
  border-bottom-color: ${({ theme }) => theme.tokens.colors.secondary600};
  background-color: transparent;
`;

export const ListItemContainer = styled.View<{
  width?: string | number;
}>`
  height: auto;
  /* padding: 15px 15px; */
  width: ${({ width }) => width || '100'}px;
`;

export const DropdownsContainer = styled.View`
  flex-direction: column;
  align-self: center;
  height: ${getNormalizedVerticalSize(60)}px;
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
  width: 100%;
  min-height: ${PixelRatio.roundToNearestPixel(45)}px; // change mutual height's here
  justify-content: space-between;
  align-items: center;
  z-index: 100;
`;
export const RightIconButton = styled(TouchableOpacity)`
  height: ${getNormalizedVerticalSize(30)}px;
  width: ${getNormalizedHorizontalSize(15)}px;
  right: ${getNormalizedHorizontalSize(15)}px;
  position: fixed;
  z-index: 1000;
  align-items: center;
  align-content: center;
  align-self: center;
  justify-content: center;
`;

export const RightIconText = styled(Typography) <StyledTextProps>`
  color: ${({ theme }) => theme.tokens.colors.secondary950};
`;

export const ButtonContainer = styled.View`
  height: auto;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
  background-color: transparent;
`;

export const StyledTextInput = styled.TextInput``;