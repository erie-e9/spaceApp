import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Canvas } from '@shopify/react-native-skia';
import { screen_height, screen_width } from '@utils/functions';

export const StyledBackgroundContainer = styled.View`
  flex: 1;
`;

export const StyledTextContainer = styled(Animated.Text)``;

export const ContentContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const SkiaCanvas = styled(Canvas)`
  flex: 1;
  position: absolute;
  width: ${screen_width}px;
  height: ${screen_height}px;
`;