import Animated from 'react-native-reanimated';
import styled, { DefaultTheme } from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';

export const ParentView = styled(Animated.View) <{
  height: number | string;
  width: number | string;
  borderRadius?: number;
  background?: keyof DefaultTheme['tokens']['colors'];
}>`
  height: ${({ height }) => (typeof height === 'number' ? `${getNormalizedVerticalSize(height)}px` : height)};
  width: ${({ width }) => (typeof width === 'number' ? `${getNormalizedVerticalSize(width)}px` : width)};
  overflow: hidden;
  margin: ${getNormalizedHorizontalSize(2)}px 0;
  border-radius: ${({ borderRadius }) => borderRadius || 0}px;
  background-color: ${({ theme, background }) => theme.tokens.colors[background || 'tertiary300']};
`;

export const GradientView = styled(Animated.View)`
  height: 100%;
`;
