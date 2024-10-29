import { Canvas } from '@shopify/react-native-skia';
import { screen_height, screen_width } from '@utils/functions';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const LavaContainer = styled.View.attrs({
    ...StyleSheet.absoluteFillObject
})`
    /* background-color: blue */
`;

export const SkiaCanvas = styled(Canvas)`
  flex: 1;
  position: absolute;
  width: ${screen_width}px;
  height: ${screen_height}px;
`;