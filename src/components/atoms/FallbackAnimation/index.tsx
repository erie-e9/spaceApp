import React, { memo, useEffect } from 'react';
import { Canvas, Circle, Group } from '@shopify/react-native-skia';
import { testProperties } from '@utils/functions';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

interface Props {
  testID?: string;
  size?: number;
}

export const FallbackAnimation: React.FC<Props> = ({
  testID = 'FallbackAnimationID',
  size = 100,
}) => {
  const radius = useSharedValue(0);
  const c = useDerivedValue(() => size - radius.value);

  useEffect(() => {
    radius.value = withTiming(size * 0.33, { duration: 1700 });
  }, [radius, size]);

  return (
    <Canvas
      {...testProperties(testID)}
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
  );
};

export default memo(FallbackAnimation);
