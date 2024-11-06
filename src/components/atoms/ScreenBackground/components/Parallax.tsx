import React, { memo } from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import {
  useAnimatedSensor,
  SensorType,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { ScreenBackgroundProps } from '@types';
import { testProperties } from '@utils/functions';
import {
  BackgroundImage,
  ForegroundContainer,
  ContentContainer,
  StyledBackgroundContainer,
} from './styles';

const Parallax: React.FC<Partial<ScreenBackgroundProps>> = ({
  testID,
  children,
  dimensions,
  sensitivity = 50,
  backgroundType,
  backgroundSource,
  style = { ...StyleSheet.absoluteFillObject },
}) => {
  const rotation = useAnimatedSensor(SensorType.ROTATION, {
    interval: 20,
  });

  const foregroundParallaxChildrenStyle = useAnimatedStyle(() => {
    const { pitch, roll } = rotation.sensor.value;
    return {
      transform: [
        { translateX: withSpring(-roll * 50, { damping: 200 }) },
        { translateY: withSpring(-pitch * 50, { damping: 200 }) },
      ],
    };
  });

  const backgroundParallaxChildrenStyle = useAnimatedStyle(() => {
    const { pitch, roll } = rotation.sensor.value;
    return {
      transform: [
        { translateX: withSpring(-roll * sensitivity, { damping: 200 }) },
        { translateY: withSpring(-pitch * sensitivity, { damping: 200 }) },
      ],
    };
  });

  return (
    <StyledBackgroundContainer
      {...testProperties(testID || 'ParallaxID')}
      style={[style, dimensions]}
    >
      <BackgroundImage
        style={backgroundParallaxChildrenStyle}
        source={
          backgroundType === 'image' && backgroundSource
            ? (backgroundSource as ImageSourcePropType)
            : undefined
        }
        resizeMode="stretch"
      />
      {children && (
        // <ForegroundContainer style={foregroundParallaxChildrenStyle}>
        //   {children}
        // </ForegroundContainer>
        <ContentContainer>{children}</ContentContainer>
      )}
    </StyledBackgroundContainer>
  );
};

export default memo(Parallax);
