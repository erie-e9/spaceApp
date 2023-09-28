import styled from 'styled-components/native';
import { Tappable, Typography } from '@components/atoms';
import { getNormalizedVerticalSize, SCREEN_WIDTH } from '@utils/functions';

export const TouchableAreaContainer = styled(Tappable)`
  min-height: ${getNormalizedVerticalSize(45)}px;
  width: 100%;
  justify-content: flex-end;
`;

export const ToastBodyContainer = styled.View`
  width: ${SCREEN_WIDTH}px;
  align-items: center;
  justify-content: center;
`;

export const ToastTextContainer = styled.View<{
  hasNotch?: boolean;
}>`
  height: ${({ hasNotch }) => getNormalizedVerticalSize(hasNotch ? 50 : 50)}px;
  min-height: ${getNormalizedVerticalSize(15)}px;
  width: 100%;
  justify-content: flex-end;
`;

export const ToastText = styled(Typography)``;
