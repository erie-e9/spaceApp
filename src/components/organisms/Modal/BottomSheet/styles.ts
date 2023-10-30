import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import {
  screen_height,
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { Touchable } from '@components/atoms';
import { List } from '@components/organisms';

export const AnimatedBottomSheet = styled(Animated.View)`
  height: ${screen_height}px;
  width: 99%;
  align-self: center;
  position: absolute;
  top: ${screen_height}px;
  border-radius: ${getNormalizedHorizontalSize(25)}px;
  background-color: ${({ theme }) => theme.tokens.colors.none};
  z-index: 100;
`;

export const CloseBottomSheetButton = styled(Touchable)`
  height: ${getNormalizedVerticalSize(30)}px;
`;

export const PanGestureHandlerView = styled.View`
  height: ${getNormalizedVerticalSize(5)}px;
  width: ${getNormalizedHorizontalSize(50)}px;
  align-self: center;
  margin: ${getNormalizedVerticalSize(15)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px;
  border-radius: ${getNormalizedHorizontalSize(7)}px;
  background-color: grey;
`;

export const CloseIconContainer = styled.View`
  position: absolute;
  right: ${getNormalizedHorizontalSize(-65)}px;
  top: ${getNormalizedVerticalSize(15)}px;
  height: ${getNormalizedVerticalSize(100)}px;
  width: ${getNormalizedHorizontalSize(100)}px;
  z-index: 2;
`;

export const ListFooterComponentView = styled.View`
  height: ${getNormalizedVerticalSize(Platform.OS === 'ios' ? 180 : 40)}px;
`;

export const StyledList = styled(List)`
  flex: 1;
`;
