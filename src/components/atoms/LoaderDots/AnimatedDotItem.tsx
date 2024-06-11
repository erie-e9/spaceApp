import React, { memo, useCallback, useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedDot } from './styles';
import { DotProps } from '.';

export const AnimatedDotItem = ({
  testID = 'LoaderDotsID',
  color = 'primaryD1',
  size = 4,
  animationDuration,
  animationScale,
  animationTranslateY,
  active = false,
}: DotProps): React.JSX.Element => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
    };
  });
  const scaleDown = useCallback(() => {
    scale.value = withTiming(1, {
      duration: animationDuration,
    });
  }, [animationDuration, scale]);

  const scaleUp = useCallback(() => {
    scale.value = withTiming(animationScale, {
      duration: animationDuration,
    });
  }, [animationDuration, animationScale, scale]);

  const scaleYDown = useCallback(() => {
    translateY.value = withTiming(1, {
      duration: animationDuration,
    });
  }, [animationDuration, translateY]);

  const scaleYUp = useCallback(() => {
    translateY.value = withTiming(animationTranslateY, {
      duration: animationDuration,
    });
  }, [animationDuration, animationTranslateY, translateY]);

  useEffect(() => {
    if (!active) {
      scaleDown();
      scaleYDown();
    }
    if (active) {
      scaleUp();
      scaleYUp();
    }
  }, [active, scaleDown, scaleUp]);

  return (
    <AnimatedDot
      testID={testID + 'AnimatedDotItem'}
      style={[animatedStyles]}
      size={size}
      color={color}
    />
  );
};

export default memo(AnimatedDotItem);
