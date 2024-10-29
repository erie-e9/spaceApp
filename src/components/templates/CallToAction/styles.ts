import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

export const StyledContainer = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
})`
  flex: 1;
`;

export const BodyContainer = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${getNormalizedVerticalSize(0)}px;
  background-color: transparent;
`;

export const ButtonsContainer = styled.View`
  height: auto;
  justify-content: flex-end;
  align-items: center;
  background-color: transparent;
`;

export const StyledButton = styled(ActionButton)``;

export const LegendActionButton = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${getNormalizedVerticalSize(10)}px;
`;

export const ArrayFooterTextContainer = styled.View`
  margin: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
  align-items: center;
  align-self: center;
  width: 100%;
`;

export const ArrayFooterText = styled(Typography)`
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(15)}px;
`;
