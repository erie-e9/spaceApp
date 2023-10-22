import React, { memo, useEffect } from 'react';
import { Canvas, Circle, Group } from '@shopify/react-native-skia';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
  withDecay,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { SCREEN_WIDTH } from '@utils/functions';

interface Props {
  testID?: string;
  size?: number;
}

export const FallbackAnimation: React.FC<Props> = ({ testID, size = 170 }) => {
  const radius = useSharedValue(0);
  const c = useDerivedValue(() => size - radius.value);
  const leftBoundary = 0;
  const rightBoundary = SCREEN_WIDTH;
  const translateX = useSharedValue(55);

  const gesture = Gesture.Pan()
    .onChange(e => {
      translateX.value += e.changeX;
    })
    .onEnd(e => {
      translateX.value = withDecay({
        velocity: e.velocityX,
        clamp: [leftBoundary, rightBoundary],
      });
    });

  useEffect(() => {
    radius.value = withTiming(size * 0.33, { duration: 1700 });
  }, [radius, size]);

  return (
    <GestureDetector gesture={gesture}>
      <Canvas
        testID={testID}
        style={{
          height: size,
          width: size,
        }}
      >
        <Group blendMode="multiply">
          <Circle cx={radius} cy={radius} r={radius} color="cyan" />
          <Circle cx={c} cy={radius} r={radius} color="magenta" />
          <Circle cx={size / 2} cy={c} r={radius} color="yellow" />
        </Group>
      </Canvas>
    </GestureDetector>
  );
};

FallbackAnimation.defaultProps = {
  testID: 'CloseButtonID',
  size: 170,
};

export default memo(FallbackAnimation);
