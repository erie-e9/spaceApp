import { useEffect, useState } from 'react';
import {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SkeletonProps } from '..';

export const useSkeleton = ({ animationType, direction, duration }: Partial<SkeletonProps>) => {
  const isXDirectionAnimation = direction === 'leftToRight' || direction === 'rightToLeft';
  const isYDirectionAnimation = direction === 'topToBottom' || direction === 'bottomToTop';

  const translatex = useSharedValue(0);
  const translatey = useSharedValue(0);
  const opacity = useSharedValue(1);

  const [gradientDimensions, setGradientDimensions] = useState({ height: -1, width: -1 });
  const [parentDimensions, setParentDimensions] = useState({ height: -1, width: -1 });
  const [coordinates, setCoordinates] = useState({ start: { x: 0, y: 0 }, end: { x: 1, y: 0 } });

  useEffect(() => {
    return () => {
      cancelAnimation(translatex);
      cancelAnimation(translatey);
      cancelAnimation(opacity);
    };
  }, []);

  useEffect(() => {
    switch (direction) {
      case 'leftToRight':
        setCoordinates({ start: { x: 0, y: 0 }, end: { x: 1, y: 0 } });
        break;
      case 'rightToLeft':
        setCoordinates({ start: { x: 1, y: 0 }, end: { x: 0, y: 0 } });
        break;
      case 'topToBottom':
        setCoordinates({ start: { x: 0, y: 0 }, end: { x: 0, y: 1 } });
        break;
      case 'bottomToTop':
        setCoordinates({ start: { x: 0, y: 1 }, end: { x: 0, y: 0 } });
        break;
      default:
        break;
    }
  }, [direction]);

  const animatedStyleX = useAnimatedStyle(() => ({
    transform: [{ translateX: translatex.value }],
  }));

  const animatedStyleY = useAnimatedStyle(() => ({
    transform: [{ translateY: translatey.value }],
  }));

  const animatedStyleParent = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animateAcrossXDirection = () => {
    const overflowOffset = parentDimensions.width;
    const leftMostEnd = -overflowOffset;
    const rightMostEnd = parentDimensions.width - gradientDimensions.width + overflowOffset;

    translatex.value = direction === 'leftToRight' ? leftMostEnd : rightMostEnd;
    translatex.value = withRepeat(
      withDelay(
        800,
        withTiming(direction === 'leftToRight' ? rightMostEnd : leftMostEnd, {
          duration,
          easing: Easing.linear,
        }),
      ),
      -1,
    );
  };

  const animateAcrossYDirection = () => {
    const overflowOffset = parentDimensions.height;
    const topMostEnd = -overflowOffset;
    const bottomMostEnd = parentDimensions.height - gradientDimensions.height + overflowOffset;

    translatey.value = direction === 'topToBottom' ? topMostEnd : bottomMostEnd;
    translatey.value = withRepeat(
      withDelay(
        800,
        withTiming(direction === 'topToBottom' ? bottomMostEnd : topMostEnd, {
          duration,
          easing: Easing.linear,
        }),
      ),
      -1,
    );
  };

  useEffect(() => {
    if (
      parentDimensions.height !== -1 &&
      parentDimensions.width !== -1 &&
      gradientDimensions.height !== -1 &&
      gradientDimensions.width !== -1
    ) {
      if (isXDirectionAnimation) {
        animateAcrossXDirection();
      } else {
        animateAcrossYDirection();
      }
    }
  }, [parentDimensions, gradientDimensions, direction, isXDirectionAnimation]);

  useEffect(() => {
    if (animationType === 'pulse') {
      opacity.value = withRepeat(
        withTiming(0.4, { duration: 1000, easing: Easing.linear }),
        -1,
        true,
      );
    }
  }, [animationType]);

  return {
    parentDimensions,
    setParentDimensions,
    animatedStyleParent,
    gradientDimensions,
    setGradientDimensions,
    isXDirectionAnimation,
    animatedStyleX,
    isYDirectionAnimation,
    animatedStyleY,
    coordinates,
  };
};
