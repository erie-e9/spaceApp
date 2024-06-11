import React, { memo, useCallback, useRef } from 'react';
import { useTheme } from '@hooks';
import { Lottie, LottieViewProps } from '@components/atoms';
import { AnimatedButtonContainer, AnimatedButtonPressable } from './styles';

interface Props {
  testID?: string;
  onPress?: () => void;
  source: 'menu' | 'reload' | 'openOnBrowser' | 'share';
  size?: number;
}

export const AnimatedButton: React.FC<Props> = ({
  testID = 'AnimatedButtonID',
  onPress,
  source = 'menu',
  size = 40,
}) => {
  const animationRef = useRef<LottieViewProps>(null);
  const { Animations, darkMode } = useTheme();

  const handleOnPress = useCallback(() => {
    animationRef.current?.play();
    onPress?.();
  }, [onPress]);

  return (
    <AnimatedButtonPressable
      testID={testID}
      hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
      onPress={handleOnPress}
    >
      <AnimatedButtonContainer>
        <Lottie
          ref={animationRef}
          source={Animations[source]}
          autoPlay={false}
          renderMode="SOFTWARE"
          loop={false}
          resizeMode="contain"
          width={size}
          height={size}
          colorFilters={[
            { keypath: '#arrow', color: darkMode ? '#FFFFFF' : '#000000' },
            { keypath: '#circle', color: darkMode ? '#FFFFFF' : '#000000' },
            { keypath: 'TOP', color: darkMode ? '#FFFFFF' : '#000000' },
            { keypath: 'DOWN', color: darkMode ? '#FFFFFF' : '#000000' },
            {
              keypath: 'Other#1 Outlines 2',
              color: darkMode ? '#FFFFFF' : '#000000',
            },
          ]}
        />
      </AnimatedButtonContainer>
    </AnimatedButtonPressable>
  );
};

export default memo(AnimatedButton);
