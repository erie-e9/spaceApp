import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { getNormalizedVerticalSize, screen_width } from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';

export interface ToastTextContainer {
  hasNotch?: boolean;
}

export const StyledAnimatedContainer = styled(
  Animated.View,
)<ToastTextContainer>`
  position: absolute;
  height: ${getNormalizedVerticalSize(52)}px;
  width: 100%;
`;

export const TouchableAreaContainer = styled(Touchable)`
  min-height: ${getNormalizedVerticalSize(52)}px;
  width: 100%;
  justify-content: flex-end;
`;

export const ToastBodyContainer = styled.View`
  width: ${screen_width}px;
  height: ${getNormalizedVerticalSize(52)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 1px;
`;

export const ToastTextContainer = styled.View<ToastTextContainer>`
  height: ${({ hasNotch }) => getNormalizedVerticalSize(hasNotch ? 45 : 45)}px;
  min-height: ${getNormalizedVerticalSize(15)}px;
  width: 100%;
  justify-content: flex-end;
`;

export const ToastText = styled(Typography)``;
