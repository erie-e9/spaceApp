import React, { Fragment, memo, useEffect } from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { testProperties } from '@utils/functions';
import {
  AnimatedFrontFace,
  FlipAnimationText,
  TriggerAnimationButton,
  AnimatedBackFace,
} from './styles';

interface FlipAnimationProps {
  testID?: string;
  frontFace?: string | React.ReactElement | React.ReactElement[];
  backFace?: string | React.ReactElement | React.ReactElement[];
  withManualTrigger?: boolean;
  flipText?: string;
  easing?: typeof Easing | string | unknown;
}

export const FlipAnimation: React.FC<FlipAnimationProps> = ({
  testID = 'FlipAnimationID',
  frontFace = undefined,
  backFace = undefined,
  withManualTrigger = undefined,
  flipText = undefined,
  easing = 'linear',
}) => {
  const spin = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, [spin.value]);

  const bStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, {
            duration: 500,
            easing: easing ? Easing[easing] : Easing.inOut(Easing.quad),
          }),
        },
      ],
    };
  }, [spin.value]);

  const spinTrigger = (): void => {
    spin.value = spin.value ? 0 : 1;
  };

  useEffect(() => {
    const cleanup = () => {
      cancelAnimation(spin);
      spin.value = 0;
    };

    let interval: unknown;
    if (!withManualTrigger) {
      interval = setInterval(() => {
        spinTrigger();
      }, 3000);
    } else {
      cleanup();
    }
    return () => {
      cleanup();
      clearInterval(interval as number);
    };
  }, [spin, withManualTrigger]);

  return (
    <Fragment>
      <AnimatedFrontFace {...testProperties(testID)} style={[animatedStyle]}>
        {frontFace && typeof frontFace !== 'string' ? (
          frontFace
        ) : (
          <FlipAnimationText type="Headline5" color="typography950">
            {frontFace}
          </FlipAnimationText>
        )}
      </AnimatedFrontFace>
      <AnimatedBackFace style={[bStyle]}>
        {backFace && typeof backFace !== 'string' ? (
          backFace
        ) : (
          <FlipAnimationText type="Headline5" color="typography950">
            {backFace}
          </FlipAnimationText>
        )}
      </AnimatedBackFace>
      {withManualTrigger && (
        <TriggerAnimationButton onPress={spinTrigger}>
          <FlipAnimationText type="Headline5" color="typography950">
            {flipText || 'flip'}
          </FlipAnimationText>
        </TriggerAnimationButton>
      )}
    </Fragment>
  );
};

export default memo(FlipAnimation);
