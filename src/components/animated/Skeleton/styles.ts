import Animated from 'react-native-reanimated';
import styled from 'styled-components';

export const ParentView = styled(Animated.View)<{
  height: number | string;
  width: number | string;
  backgroundColor: string;
  borderRadius?: number;
}>`
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  background-color: ${({ backgroundColor }) => backgroundColor};
  overflow: hidden;
  margin: 2px 0;
  border-radius: ${({ borderRadius }) => borderRadius || 0}px;
`;

export const GradientView = styled(Animated.View)`
  height: 100%;
`;
