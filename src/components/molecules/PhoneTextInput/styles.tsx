import styled from 'styled-components/native';
import { getNormalizedHorizontalSize } from '@utils/functions';

export const PhoneStyledTextInput = styled.TextInput<{
  isDarkMode: boolean;
}>`
  flex: 1;
  padding-horizontal: ${getNormalizedHorizontalSize(10)}px;
  color: ${({ isDarkMode, theme }) =>
    isDarkMode ? theme.tokens.colors.secondary950 : theme.tokens.colors.tertiary900};
`;
