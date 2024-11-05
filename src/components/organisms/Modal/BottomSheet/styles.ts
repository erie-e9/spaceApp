import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import {
  screen_height,
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
  screen_width,
} from '@utils/functions';
import { Touchable } from '@components/atoms';
import { List } from '@components/molecules';

export const AnimatedBottomSheet = styled(Animated.View)`
  height: ${screen_height}px;
  width: ${screen_width - 2}px;
  align-self: center;
  align-items: center;
  align-content: center;
  position: absolute;
  top: ${screen_height}px;
  z-index: 1000;
  border-radius: ${getNormalizedHorizontalSize(30)}px;
  background-color: ${({ theme }) => theme.tokens.colors.backgroundColor};
`;

export const CloseBottomSheetButton = styled(Touchable)`
  height: ${getNormalizedVerticalSize(30)}px;
`;

export const BodyContainer = styled.View<{ dropdownOptions?: any }>`
  height: ${({ dropdownOptions }) =>
    dropdownOptions.height ? getNormalizedVerticalSize(dropdownOptions.height) + 'px' : 'auto'};
  align-items: center;
  justify-content: ${({ dropdownOptions }) => dropdownOptions.justifContent};
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
  height: ${getNormalizedVerticalSize(100)}px;
  width: ${getNormalizedHorizontalSize(100)}px;
  right: ${getNormalizedHorizontalSize(-65)}px;
  top: ${getNormalizedVerticalSize(15)}px;
  position: absolute;
  z-index: 2;
`;

export const ListFooterComponentView = styled.View`
  height: ${getNormalizedVerticalSize(Platform.OS === 'ios' ? 180 : 40)}px;
`;

export const StyledList = styled(List)`
  flex: 1;
`;
