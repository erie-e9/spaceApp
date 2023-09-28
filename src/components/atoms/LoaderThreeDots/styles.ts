import { PixelRatio } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';

export const LoaderThreeDotsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const AnimatedDot = styled(Animated.View)<{ size: number }>`
  height: ${({ size }) => PixelRatio.roundToNearestPixel(size)}px;
  width: ${({ size }) => PixelRatio.roundToNearestPixel(size)}px;
  border-radius: ${({ size }) => PixelRatio.roundToNearestPixel(size / 2)}px;
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(4)}px;
  background-color: ${({ theme }) => theme.tokens.colors.textColor};
`;
