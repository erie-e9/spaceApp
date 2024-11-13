import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

export const CardContainer = styled.View`
  height: ${getNormalizedVerticalSize(110)}px;
  padding: ${getNormalizedVerticalSize(15)}px ${getNormalizedHorizontalSize(15)}px;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(20)}px ${getNormalizedHorizontalSize(0)}px;
  border-radius: 15px;
  border-bottom-width: ${getNormalizedHorizontalSize(4)}px;
  border-color: ${({ theme }) => theme.tokens.colors.primary400};
  background-color: ${({ theme }) =>
    theme.tokens.colors[theme.isDarkMode ? 'secondary800' : 'secondary950']};
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ProfileDetailContainer = styled.View`
  width: auto;
  margin-bottom: ${getNormalizedVerticalSize(15)}px;
  justify-content: center;
  align-items: flex-start;
  height: auto;
  margin-left: ${getNormalizedHorizontalSize(10)}px;
`;

export const StyledText = styled(Typography)`
  color: ${({ theme }) => theme.tokens.colors.secondary50};
`;

export const ProfileDetailHorizontalContainer = styled.View`
  flex-direction: row;
  min-width: ${getNormalizedHorizontalSize(100)}px;
  justify-content: flex-start;
  align-items: center;
`;

export const ProfileDetailText = styled(Typography)``;

export const ProfileButton = styled(Touchable)`
  padding: ${getNormalizedHorizontalSize(10)}px;
  border-radius: 25px;
  height: ${getNormalizedVerticalSize(25)}px;
  width: ${getNormalizedHorizontalSize(25)}px;
  align-items: center;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(5)}px;
  background-color: ${({ theme }) => theme.tokens.colors.tertiary300};
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

export const AuthButtonContainer = styled.View`
  position: absolute;
  width: ${getNormalizedHorizontalSize(100)}px;
  height: auto;
  bottom: ${getNormalizedVerticalSize(3)}px;
  right: ${getNormalizedHorizontalSize(6)}px;
  align-self: flex-end;
  justify-content: flex-end;
`;

export const AuthButton = styled(ActionButton) <StyledButtonProps>`
  width: ${getNormalizedHorizontalSize(100)}px;
  border-color: #15173b;
`;

export const StyledTextContainer = styled.View`
  align-items: center;
`;
