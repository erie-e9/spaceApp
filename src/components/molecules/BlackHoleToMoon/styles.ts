import styled from 'styled-components/native';
import { Canvas } from '@shopify/react-native-skia';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Pressable } from 'react-native';

export const Container = styled.View<{
  darkMode: boolean;
}>`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  align-self: center;
  z-index: 100;
  border-radius: 150px;
  elevation: 25;
  shadow-opacity: 0.7;
  shadow-radius: 25px;
  shadow-color: ${({ darkMode }) => (darkMode ? '#f7f7f7' : '#000000')};
`;
export const Touchable = styled(Pressable)`
  width: ${getNormalizedHorizontalSize(255)}px;
  height: ${getNormalizedVerticalSize(255)}px;
  z-index: 200;
  border-radius: 150px;
`;
export const SkiaCanvas = styled(Canvas)`
  position: absolute;
  width: ${getNormalizedHorizontalSize(280)}px;
  height: ${getNormalizedVerticalSize(280)}px;
  justify-content: center;
  align-items: center;
`;
export const ChildrenContainer = styled.View`
  /* position: absolute; */
  justify-content: center;
  align-items: center;
  align-self: center;
  z-index: 100;
`;
