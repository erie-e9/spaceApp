import React, { memo, useMemo } from 'react';
import { BackdropFilter, Blur, CircleProps, Fill } from '@shopify/react-native-skia';
import randomcolor from 'randomcolor';
import { type ScreenBackgroundProps } from '@types';
import { getRandomNumber, getRandonColorRGB, screen_height, screen_width } from '@utils/functions';
import {
  Easing,
  useDerivedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import BlurCircle from './components/BlurCircle';
import { LavaContainer, SkiaCanvas } from './styles';

const Lava: React.FC<Partial<ScreenBackgroundProps> & Partial<CircleProps>> = ({
  children,
  dimensions,
  style,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.mode === 'dark';
  const { tokens } = useTheme();
  const randomNumber = getRandomNumber(7, 10) / 10;
  const circles = useMemo(() => {
    const color = getRandonColorRGB();
    const radius = (screen_width * randomNumber) / 2;

    return Array.from({ length: 6 }).map((circle, index) => {
      return {
        index,
        circle,
        color,
        radius,
        x: Math.random() * (screen_width - radius * 2),
        y: Math.random() * (screen_height - radius * 2),
      };
    });
  }, []);
  const step = screen_height / circles.length;

  const randomRotation = Math.random() * 360;

  const rotation = useDerivedValue(() => {
    return withRepeat(
      withSequence(
        withTiming(randomRotation, { duration: 0 }),
        withTiming(randomRotation + 360, { duration: 7000, easing: Easing.linear }),
      ),
      -1,
      false,
    );
  });

  const transform = useDerivedValue(() => {
    return [{ rotate: rotation.value }];
  });

  const hue = tokens.colors.backgroundColor;
  const background = randomcolor({
    count: 1,
    hue,
    luminosity: isDarkMode ? 'dark' : 'light',
  })[0];

  return (
    <LavaContainer style={[style, dimensions]}>
      <SkiaCanvas>
        <Fill color={!isDarkMode ? tokens.colors.secondary50 : hue} />
        {circles.map((circle, index) => {
          return (
            <BlurCircle
              key={index}
              cx={index % 2 ? screen_width * randomNumber : 0}
              cy={step * index}
              r={circle.radius}
              delay={index * 1000}
              hue={
                hue === '#FFFFFF' && isDarkMode
                  ? tokens.colors.tertiary500
                  : !isDarkMode
                  ? tokens.colors.secondary500
                  : hue
              }
              length={circles.length}
              luminosity={isDarkMode ? 'dark' : 'light'}
              //   colors={['#b6bcfe', '#59ffca', '#FFF0DC', '#9090ff', '#85c6ff', '#ffff76']}
            />
          );
        })}
        {/* <BlurMask blur={100} style="normal" /> */}
        <BackdropFilter
          clip={{ x: 0, y: 0, width: screen_width, height: screen_height }}
          filter={<Blur blur={50} />}
        >
          <Fill color={isDarkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.5)'} />
        </BackdropFilter>
      </SkiaCanvas>
      {children}
    </LavaContainer>
  );
};

export default memo(Lava);
