import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { Tappable } from '@components/atoms';

export const AnimatedBottomSheet = styled(Animated.View)`
  height: ${getNormalizedVerticalSize(SCREEN_HEIGHT)}px;
  width: ${getNormalizedHorizontalSize(SCREEN_WIDTH - 20)}px;
  align-self: center;
  position: absolute;
  top: ${getNormalizedVerticalSize(SCREEN_HEIGHT)}px;
  border-radius: ${getNormalizedHorizontalSize(25)}px;
  background-color: ${({ theme }) => theme.tokens.colors.none};
  z-index: 100;
`;

export const PanGestureHandlerView = styled.View`
  height: ${getNormalizedVerticalSize(5)}px;
  width: ${getNormalizedHorizontalSize(50)}px;
  background-color: grey;
  align-self: center;
  margin: ${getNormalizedVerticalSize(15)}px ${getNormalizedHorizontalSize(0)}px;
  border-radius: ${getNormalizedHorizontalSize(2)}px;
`;

export const CloseIconContainer = styled.View`
  position: absolute;
  right: ${getNormalizedHorizontalSize(-65)}px;
  top: ${getNormalizedVerticalSize(15)}px;
  height: ${getNormalizedVerticalSize(100)}px;
  width: ${getNormalizedHorizontalSize(100)}px;
  z-index: 2;
`;

export const CloseBottomSheetButton = styled(Tappable)``;
