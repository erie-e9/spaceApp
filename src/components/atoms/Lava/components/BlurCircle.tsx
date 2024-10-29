import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Circle, CircleProps } from '@shopify/react-native-skia';
import {
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import randomcolor from 'randomcolor';

type Props = CircleProps & {
  hue?: string;
  delay?: number;
  length?: number;
  colors?: Array<string>;
  luminosity?: 'light' | 'dark';
};

const BlurCircle = ({
  delay = 0,
  hue = 'green',
  length = 1,
  colors,
  luminosity,
  ...props
}: Props): JSX.Element => {
  /** Randomly mixed circleColors */
  //   const circleColors = useRef([...BlurCircleColors].sort(() => Math.random() - 0.5)).current;
  const circleColors =
    colors ??
    useMemo(() => {
      return randomcolor({
        count: length,
        hue,
        luminosity,
        format: 'rgba',
        alpha: 0.7,
      });
    }, [hue, length, colors]);
  /** Time to animate all circleColors */
  const colorAnimationDuration = useRef(circleColors.length * 1500).current;
  /** Parameter responsible for color animation */
  const color = useSharedValue(0);

  /** Parameter responsible for radius animation */
  const radius = useSharedValue(props.r);

  /** Radius of the animated circle */
  const radiusAnimationSize = useRef(props.r + props.r * 0.3).current;

  const animatedColor = useDerivedValue(() =>
    interpolateColor(
      color.value,
      circleColors.map((_, index) => index / (circleColors.length - 1)),
      [...circleColors],
    ),
  );

  useEffect(() => {
    // Change radius after delay and and loop it
    radius.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(radiusAnimationSize, { duration: 2500 }),
          withTiming(props.r, { duration: 10000 }),
        ),
        -1,
      ),
    );
    // Change color after delay and and loop it
    color.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: colorAnimationDuration }),
          withTiming(0, { duration: colorAnimationDuration }),
        ),
        -1,
      ),
    );
  }, [props.r, delay]);

  return <Circle {...props} r={radius} color={animatedColor} />;
};

export default memo(BlurCircle);
