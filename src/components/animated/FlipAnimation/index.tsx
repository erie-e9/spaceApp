import React, { useEffect } from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { Typography } from '@components/atoms';
import {
  AnimatedBackFace,
  AnimatedFrontFace,
  TriggerAnimationButton,
} from './styles';

interface Props {
  frontFace?: string | React.ReactElement | React.ReactElement[];
  backFace?: string | React.ReactElement | React.ReactElement[];
  withManualTrigger?: boolean;
  flipText?: string;
}

const FlipAnimation: React.FC<Props> = ({
  frontFace,
  backFace,
  withManualTrigger,
  flipText,
}) => {
  const spin = useSharedValue<number>(0);

  const rStyle = useAnimatedStyle(() => {
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
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
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

    let interval: number;
    if (!withManualTrigger) {
      interval = setInterval(() => {
        spinTrigger();
      }, 3000);
    } else {
      cleanup();
    }
    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, [spin, withManualTrigger]);

  return (
    <>
      <AnimatedFrontFace style={[rStyle]}>
        {frontFace && typeof frontFace !== 'string' ? (
          frontFace
        ) : (
          <Typography type="Headline5" color="secondaryD1">
            {frontFace}
          </Typography>
        )}
      </AnimatedFrontFace>
      <AnimatedBackFace style={[bStyle]}>
        {backFace && typeof backFace !== 'string' ? (
          backFace
        ) : (
          <Typography type="Headline5" color="secondaryD1">
            {backFace}
          </Typography>
        )}
      </AnimatedBackFace>
      {withManualTrigger && (
        <TriggerAnimationButton onPress={spinTrigger}>
          <Typography type="Headline5" color="secondaryD1">
            {flipText || 'flip'}
          </Typography>
        </TriggerAnimationButton>
      )}
    </>
  );
};

export default FlipAnimation;

FlipAnimation.defaultProps = {
  frontFace: undefined,
  backFace: undefined,
  withManualTrigger: undefined,
  flipText: undefined,
};
