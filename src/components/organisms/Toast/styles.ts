import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { getNormalizedVerticalSize, SCREEN_WIDTH } from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';

export interface ToastTextContainer {
  hasNotch?: boolean;
}

export const StyledAnimatedContainer = styled(
  Animated.View,
)<ToastTextContainer>`
  position: absolute;
  height: ${getNormalizedVerticalSize(45)}px;
  width: 100%;
`;

export const TouchableAreaContainer = styled(Touchable)`
  min-height: ${getNormalizedVerticalSize(45)}px;
  width: 100%;
  justify-content: flex-end;
`;

export const ToastBodyContainer = styled.View`
  width: ${SCREEN_WIDTH}px;
  align-items: center;
  justify-content: center;
`;

export const ToastTextContainer = styled.View<ToastTextContainer>`
  height: ${({ hasNotch }) => getNormalizedVerticalSize(hasNotch ? 45 : 45)}px;
  min-height: ${getNormalizedVerticalSize(15)}px;
  width: 100%;
  justify-content: flex-end;
`;

export const ToastText = styled(Typography)``;
