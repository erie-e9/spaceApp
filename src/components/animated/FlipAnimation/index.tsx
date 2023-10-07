import React, { memo, useEffect } from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import {
  AnimatedFrontFace,
  FlipAnimationText,
  TriggerAnimationButton,
  AnimatedBackFace,
} from './styles';

interface Props {
  testID?: string;
  frontFace?: string | React.ReactElement | React.ReactElement[];
  backFace?: string | React.ReactElement | React.ReactElement[];
  withManualTrigger?: boolean;
  flipText?: string;
  easing?: typeof Easing | string | unknown;
}

export const FlipAnimation: React.FC<Props> = ({
  testID,
  frontFace,
  backFace,
  withManualTrigger,
  flipText,
  easing,
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
    <>
      <AnimatedFrontFace testID={testID} style={[animatedStyle]}>
        {frontFace && typeof frontFace !== 'string' ? (
          frontFace
        ) : (
          <FlipAnimationText type="Headline5" color="secondaryD1">
            {frontFace}
          </FlipAnimationText>
        )}
      </AnimatedFrontFace>
      <AnimatedBackFace style={[bStyle]}>
        {backFace && typeof backFace !== 'string' ? (
          backFace
        ) : (
          <FlipAnimationText type="Headline5" color="secondaryD1">
            {backFace}
          </FlipAnimationText>
        )}
      </AnimatedBackFace>
      {withManualTrigger && (
        <TriggerAnimationButton onPress={spinTrigger}>
          <FlipAnimationText type="Headline5" color="secondaryD1">
            {flipText || 'flip'}
          </FlipAnimationText>
        </TriggerAnimationButton>
      )}
    </>
  );
};

FlipAnimation.defaultProps = {
  testID: 'FlipAnimationID',
  frontFace: undefined,
  backFace: undefined,
  withManualTrigger: undefined,
  flipText: undefined,
  easing: 'linear',
};

export default memo(FlipAnimation);
