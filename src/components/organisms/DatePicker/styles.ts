import styled, { css } from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';
import {
  getNormalizedHorizontalSize,
  getNormalizedVerticalSize,
  responsiveFontSize,
} from '@utils/functions';
import { Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

export interface StyledButtonProps {
  error?: boolean;
  focused?: boolean;
  hasValue?: boolean;
  editable?: boolean;
  styledFocus?: boolean;
  maintainFocus?: boolean;
  touched?: boolean;
}

interface StyledTextProps {
  error?: boolean;
  backgroundLabel?: string;
  hasValue?: boolean;
}

//! se puede reusar
export const StyledText = styled(Typography) <StyledTextProps>`
  ${({ error, theme, hasValue }) => css`
    color: ${() => {
      const color = hasValue ? theme.tokens.colors.typography900 : theme.tokens.colors.typography700;
      const colorFocused = error
        ? theme.tokens.colors.danger_status
        : theme.tokens.colors.typography700;
      return error ? colorFocused : color;
    }};
  `};
  font-size: ${responsiveFontSize(13)}px;
`;

export const StyledButton = styled(TouchableWithoutFeedback) <StyledButtonProps>`
  height: 100%;
`;

export const StyledElementContainer = styled.View<StyledButtonProps>`
  justify-content: center;
  align-items: flex-start;
  height: auto;
  width: ${({ hasValue }) => hasValue ? '70%' : '100%'};
  border-radius: ${getNormalizedVerticalSize(15)}px;
`;

export const DropdownTypeButton = styled(TouchableWithoutFeedback) <StyledButtonProps>``;

export const DateDropdownContainer = styled.View`
  flex: 1;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${getNormalizedHorizontalSize(15)}px; // update if padding screenbackground values changed
`;

export const DropdownsContainer = styled.View`
  flex-direction: row;
  height: ${getNormalizedVerticalSize(130)}px;
  width: 100%;
  align-items: flex-start;
  background-color: transparent;
  align-self: flex-start;
  justify-content: space-evenly;
`;

export const DropdownButton = styled.TouchableOpacity`
  position: absolute;
  right: ${getNormalizedHorizontalSize(-5)}px;
`;

export const DropdownButtonText = styled.Text`
  color: ${({ theme }) => theme.tokens.colors.secondary950};
  font-size: ${responsiveFontSize(12)}px;
`;

export const DropdownList = styled.FlatList`
  border: ${getNormalizedVerticalSize(0.7)}px solid
    ${({ theme }) => theme.tokens.colors.secondary300};
  border-radius: ${getNormalizedHorizontalSize(10)}px;
  max-height: ${getNormalizedVerticalSize(100)}px;
  min-width: ${getNormalizedHorizontalSize(100)}px;
  right: ${getNormalizedHorizontalSize(20)}px;
  margin-top: ${getNormalizedVerticalSize(13)}px;
  position: absolute;
  z-index: 200;
  background-color: ${({ theme }) => theme.tokens.colors.tertiary50};
`;

export const DropdownItem = styled.TouchableOpacity`
  padding: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(10)}px;
  align-items: center;
`;

export const DropdownItemText = styled.Text`
  font-size: ${responsiveFontSize(16)}px;
  color: ${({ theme }) => theme.tokens.colors.secondary950};
`;

export const ButtonContainer = styled.View`
  height: auto;
  width: 100%;
  position: absolute;
  bottom: ${getNormalizedVerticalSize(140)}px;
  justify-content: flex-end;
  justify-self: flex-end;
  justify-items: flex-end;
  align-self: center;
  z-index: 1000;
`;

export const StyledDropdownButton = styled(ActionButton) <StyledButtonProps>`
  margin: ${getNormalizedVerticalSize(3)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(3)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const CalendarContainer = styled.View`
  padding: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(10)}px;
  min-height: auto;
  width: 100%;
`;

export const Container = styled.View`
  flex-direction: row;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(3)}px;
  min-height: 100%;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;
