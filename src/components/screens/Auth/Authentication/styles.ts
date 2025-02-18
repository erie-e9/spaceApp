import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

export const BodyContainer = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  z-index: 1000;
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  width: 100%;
  background-color: transparent;
`;

export const SubFormContainer = styled.View`
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
  align-items: center;
  background-color: transparent;
`;

export const FormContainer = styled.View``;

export const FormActionTouchable = styled(Touchable)`
  z-index: 100;
  background-color: transparent;
`;

export const ForgotPasswordContainer = styled.View`
  align-self: flex-end;
  min-height: ${getNormalizedVerticalSize(25)}px;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

export const StyledText = styled(Typography)<{
  underline?: boolean;
}>`
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

interface StyledButtonProps {
  disabled?: boolean;
}

export const StyledButton = styled(ActionButton)<StyledButtonProps>`
  margin: ${getNormalizedVerticalSize(3)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(3)}px ${getNormalizedHorizontalSize(10)}px;
`;

export const AnotherAccountContainer = styled.View`
  margin: ${getNormalizedVerticalSize(30)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const FooterButtonsContainer = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: ${getNormalizedVerticalSize(80)}px;
  background-color: transparent;
  margin: ${getNormalizedVerticalSize(20)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
`;
