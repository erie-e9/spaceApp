import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { List } from '@components/molecules';

export const StyledContainer = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset: Platform.OS === 'ios' ? 50 : 0,
})`
  flex: 1;
`;

export const BodyContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const StyledList = styled(List)``;

export const PointsContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: ${getNormalizedVerticalSize(2.5)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(2.5)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;
