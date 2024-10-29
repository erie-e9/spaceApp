import React from 'react';
import { AnimatedProp, Canvas, LinearGradient, Rect, SkPoint } from '@shopify/react-native-skia';
import { StyleProp, useWindowDimensions, ViewStyle } from 'react-native';

type Props = {
  enabled?: boolean;
  height: number;
  colors: string[];
  style: StyleProp<ViewStyle>;
  start: AnimatedProp<SkPoint>;
  end: AnimatedProp<SkPoint>;
};

const BlurEdge: React.FC<Props> = ({ enabled = true, height, style, ...props }: Props) => {
  const { width } = useWindowDimensions();
  if (!enabled) {
    return null;
  }

  return (
    <Canvas style={[style, { height }]}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient {...props} />
      </Rect>
    </Canvas>
  );
};

export default BlurEdge;
