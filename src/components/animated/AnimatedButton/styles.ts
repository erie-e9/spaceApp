import styled from 'styled-components/native';
import { PixelRatio } from 'react-native';
import { getNormalizedVerticalSize } from '@utils/functions';
import { Touchable } from '@components/atoms';

export const AnimatedButtonContainer = styled.View`
  height: ${getNormalizedVerticalSize(40)}px;
  width: ${getNormalizedVerticalSize(40)}px;
  border-radius: ${PixelRatio.roundToNearestPixel(20)}px;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const AnimatedButtonPressable = styled(Touchable)`
  z-index: 100;
`;
