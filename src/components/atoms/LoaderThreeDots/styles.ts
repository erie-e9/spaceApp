import { PixelRatio } from 'react-native';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

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
  margin: ${PixelRatio.roundToNearestPixel(0)}px
    ${PixelRatio.roundToNearestPixel(3)}px;
  background-color: ${({ theme }) => theme.tokens.colors.opposing};
`;
