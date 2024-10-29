import React, { Fragment, memo, useMemo } from 'react';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components/native';
import { InterpolateColorAnimation } from '@components/animated';
import { type ScreenBackgroundProps } from '@types';
import GradientBackground from './components/GradientBackground';
import { BlurEffect, Lava } from '@components/atoms';
import { ScreenBackgroundContainer } from './style';

export const ScreenBackground: React.FC<Partial<ScreenBackgroundProps>> = ({
  type,
  colors,
  children,
  style = { ...StyleSheet.absoluteFillObject },
  ...props
}) => {
  const { width, height } = useWindowDimensions();
  const theme = useTheme();
  const dimensions = {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 65 : 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
  };

  const backgroundRender = useMemo(() => {
    switch (type) {
      case 'solid':
        return (
          <InterpolateColorAnimation isScreen dimensions={dimensions} {...props}>
            {children}
          </InterpolateColorAnimation>
        );
      case 'gradient':
        return (
          <GradientBackground
            testID="GradientBackgroundID"
            colors={colors}
            dimensions={dimensions}
            canvasDimensions={{
              width,
              height,
            }}
            {...props}
          >
            {children}
          </GradientBackground>
        );
      case 'blur':
        return (
          <BlurEffect
            testID="BlurAnimationID"
            dimensions={dimensions}
            canvasDimensions={{
              width,
              height,
            }}
            fillColor={theme.tokens.colors?.backgroundColor}
            {...props}
          >
            {children}
          </BlurEffect>
        );
      case 'lava':
        return <Lava dimensions={dimensions}>{children}</Lava>;
      default:
        return <Fragment>{children}</Fragment>;
    }
  }, [type, children]);

  return <ScreenBackgroundContainer style={style}>{backgroundRender}</ScreenBackgroundContainer>;
};

export default memo(ScreenBackground);
