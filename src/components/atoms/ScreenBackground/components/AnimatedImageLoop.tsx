import React, { memo, useEffect } from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
  withRepeat,
} from 'react-native-reanimated';
import { testProperties } from '@utils/functions';
import { ScreenBackgroundProps } from '@types';
import { AnimatedBackgroundImage, ContentContainer, StyledBackgroundContainer } from './styles';

const AnimatedImageLoop: React.FC<Partial<ScreenBackgroundProps>> = ({
  testID,
  children,
  backgroundType,
  backgroundSource,
  dimensions,
  angleLoop = 45,
  speedLoop = 40000,
  style = { ...StyleSheet.absoluteFillObject },
}) => {
  const translateValue = useSharedValue(0);
  const OUTPUT_RANGE_START = -281;

  useEffect(() => {
    translateValue.value = withRepeat(
      withTiming(
        1,
        {
          duration: speedLoop,
          easing: Easing.linear,
        },
        (isFinished) => {
          if (isFinished) {
            runOnJS(() => (translateValue.value = 0));
          }
        },
      ),
      -1,
      true,
    );
  }, [translateValue, speedLoop]);

  const animatedStyle = useAnimatedStyle(() => {
    const translate = translateValue.value * (0 - OUTPUT_RANGE_START) + OUTPUT_RANGE_START;
    return {
      transform: [{ translateX: translate }, { translateY: translate }],
    };
  });

  return (
    <StyledBackgroundContainer
      {...testProperties(testID || 'ParallaxID')}
      style={[style, dimensions]}
    >
      <AnimatedBackgroundImage
        style={animatedStyle}
        source={
          backgroundType === 'image' && backgroundSource
            ? (backgroundSource as ImageSourcePropType)
            : undefined
        }
        resizeMode="repeat"
      />
      {children && <ContentContainer>{children}</ContentContainer>}
    </StyledBackgroundContainer>
  );
};

export default memo(AnimatedImageLoop);
