import React, { memo, useCallback, useEffect } from 'react';
import { Circle, Group } from '@shopify/react-native-skia';
import { useSharedValue, withTiming, withSpring } from 'react-native-reanimated';
import { useTheme, useAppPreferences } from '@hooks';
import { TransformAnimation, RotateAnimation } from '@components/animated';
import { Container, Touchable, SkiaCanvas, ChildrenContainer } from './styles';
interface BlackHoleToMoonProps {
  children?: any | any[];
  blackHole?: boolean;
}

export const BlackHoleToMoon: React.FC<BlackHoleToMoonProps> = ({ children }) => {
  const { darkMode } = useTheme();
  const { switchMode } = useAppPreferences();
  const radius = useSharedValue(105);

  const handlePress = useCallback(() => {
    switchMode(darkMode ? 'light' : 'dark');
    if (radius.value <= 95) {
      radius.value = withSpring(105, { stiffness: 150, damping: 7 });
    } else {
      radius.value = withSpring(95, { stiffness: 150, damping: 7 });
    }
  }, [radius.value, darkMode]);

  useEffect(() => {
    radius.value = darkMode
      ? withTiming(105, { duration: 1500 })
      : withTiming(95, { duration: 1500 });
  }, [darkMode]);

  const craters = [
    { cx: 120, cy: 120, r: 5 },
    { cx: 100, cy: 160, r: 8 },
    { cx: 160, cy: 130, r: 6 },
    { cx: 40, cy: 90, r: 4 },
    { cx: 150, cy: 170, r: 8 },
    { cx: 60, cy: 140, r: 5 },
    { cx: 150, cy: 80, r: 6 },
    { cx: 190, cy: 110, r: 3 },
    { cx: 140, cy: 150, r: 4 },
    { cx: 100, cy: 185, r: 5 },
  ];

  return (
    <Touchable onPress={handlePress}>
      <TransformAnimation
        duration={2000}
        initialXValue={0}
        finalXValue={0}
        initialYValue={0}
        finalYValue={15}
        repeat={-1}
        reverse
      >
        <Container darkMode={darkMode}>
          <RotateAnimation duration={5000} initialValue={0} finalValue={20} repeat={-1} reverse>
            <SkiaCanvas>
              <Group>
                <Circle cx={105} cy={105} r={radius} color={darkMode ? '#ffffff' : '#000000'} />
                {darkMode &&
                  craters.map((crater, index) => (
                    <Circle
                      key={index}
                      cx={crater.cx}
                      cy={crater.cy}
                      r={crater.r}
                      color="#A9A9A9"
                    />
                  ))}
              </Group>
            </SkiaCanvas>
            <ChildrenContainer>{children && children}</ChildrenContainer>
          </RotateAnimation>
        </Container>
      </TransformAnimation>
    </Touchable>
  );
};

export default memo(BlackHoleToMoon);
