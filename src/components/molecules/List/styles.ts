import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize, screen_width } from '@utils/functions';
import { Image, Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

export const StyledList = styled(Animated.FlatList)`
  width: 100%;
`;

export const ListContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const AnimatedItemContainer = styled(Animated.View)`
  flex-direction: row;
  height: auto;
  width: auto;
  position: absolute;
  justify-content: space-between;
  align-items: center;
`;

export const StyledText = styled(Typography)``;

export const LoaderContainer = styled.View<{
  height: number;
}>`
  height: ${({ height }) => getNormalizedVerticalSize(height)}px;
  align-items: center;
  position: absolute;
  width: 100%;
`;

export const Container = styled.View`
  width: 100%;
`;

export const ChildrenContainer = styled.View`
  width: 90%;
`;

export const ItemImage = styled(Image) <{
  size: number;
}>`
  width: ${({ size }) => getNormalizedVerticalSize(size)}px;
  height: ${({ size }) => getNormalizedVerticalSize(size)}px;
  border-radius: ${({ size }) => size / 2}px;
`;

export const ScrollToTopContainer = styled(Animated.View)`
  z-index: 1000;
  position: absolute;
  right: ${screen_width / 2}px;
`;

export const ScrollToTopButtonContainer = styled.View`
  position: absolute;
  height: ${getNormalizedVerticalSize(40)}px;
  width: ${getNormalizedHorizontalSize(40)}px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  transform: rotate(90deg);
  background-color: ${({ theme }) => theme.tokens.colors.tertiary200};
`;

export const DescriptionContainer = styled.View`
  min-width: 60%;
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-horizontal: ${getNormalizedHorizontalSize(20)}px;
`;

export const AnimatedDraggerContainer = styled(Animated.View)`
  width: ${getNormalizedHorizontalSize(30)}px;
  align-items: center;
  justify-content: center;
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  right: ${getNormalizedHorizontalSize(0)}px;
  bottom: ${getNormalizedVerticalSize(10)}px;
`;

export const FloatingButton = styled(ActionButton)`
  margin-top: 10px;
  border-width: 0;
  background-color: ${({ theme }) => theme.tokens.colors.primary500};
`