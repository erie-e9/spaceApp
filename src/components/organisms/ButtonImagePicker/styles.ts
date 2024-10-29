import styled, { css } from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';
import { getNormalizedVerticalSize, responsiveFontSize } from '@utils/functions';
import { Typography } from '@components/atoms';

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

export const StyledText = styled(Typography)<StyledTextProps>`
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

export const StyledButton = styled(TouchableWithoutFeedback)<StyledButtonProps>``;

export const StyledElementContainer = styled.View<StyledButtonProps>`
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
  border-radius: ${getNormalizedVerticalSize(15)}px;
  background-color: transparent;
`;
