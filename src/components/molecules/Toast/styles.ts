import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import {
  getNormalizedHorizontalSize,
  getNormalizedVerticalSize,
  screen_width,
} from '@utils/functions';
import { Touchable, Typography } from '@components/atoms';

export interface ToastTextContainer {
  hasNotch?: boolean;
  onStartShouldSetResponder?: () => void;
}

export const StyledAnimatedContainer = styled(Animated.View)<ToastTextContainer>`
  position: absolute;
  width: 100%;
  height: ${({ hasNotch }) => getNormalizedVerticalSize(hasNotch ? 66 : 52)}px;
  z-index: 999;
  border-bottom-width: ${getNormalizedHorizontalSize(2)}px;
  border-color: transparent;
`;

export const TouchableAreaContainer = styled(Touchable)<ToastTextContainer>`
  width: 100%;
  min-height: ${({ hasNotch }) => getNormalizedVerticalSize(hasNotch ? 67 : 50)}px;
  justify-content: flex-end;
  z-index: 999;
`;

export const ToastBodyContainer = styled.View<ToastTextContainer>`
  width: ${screen_width}px;
  min-height: ${({ hasNotch }) => getNormalizedVerticalSize(hasNotch ? 67 : 50)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${getNormalizedVerticalSize(1)}px;
  z-index: 999;
`;

export const ToastTextContainer = styled.View<ToastTextContainer>`
  height: ${({ hasNotch }) => getNormalizedVerticalSize(hasNotch ? 45 : 45)}px;
  min-height: ${getNormalizedVerticalSize(15)}px;
  width: 100%;
  justify-content: flex-end;
`;

export const ToastText = styled(Typography)``;
