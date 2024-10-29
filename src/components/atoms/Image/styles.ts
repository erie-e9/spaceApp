import styled from 'styled-components/native';
import FastImage from '@d11/react-native-fast-image';

export interface ImageProps {
  width: number;
  height: number;
  borderRadius?: number;
}

export const PlaceholderContainer = styled.View<ImageProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  justify-content: center;
  align-items: center;
`;

export const LoaderIndicatorContainer = styled.View<ImageProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 100;
`;

export const StyledImage = styled(FastImage) <ImageProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: ${({ borderRadius }) => borderRadius || 0}px;
`;
