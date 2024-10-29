import React, { memo, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { type ApplicationScreenProps } from '@types';
import { testProperties } from '@utils/functions';
import { useTheme } from '@hooks';
import { Lottie, LottieViewProps } from '@components/atoms';
import { BackButtonContainer, BackButtonPressable } from './styles';

interface Props {
  testID?: string;
  onPress?: () => void;
  size?: number;
  children?: JSX.Element | string;
  colorRowInverted?: boolean;
}

export const BackButton: React.FC<Props> = ({
  testID = 'BackButtonID',
  onPress = undefined,
  size = 30,
  children = null,
  colorRowInverted,
}) => {
  const animationRef = useRef<LottieViewProps>(null);
  const { Animations, darkMode } = useTheme();
  const navigation: ApplicationScreenProps = useNavigation();

  const handleOnPress = useCallback(() => {
    animationRef.current?.play();
    navigation.removeListener;
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  }, []);

  return (
    <BackButtonPressable
      {...testProperties(testID)}
      hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
      onPress={handleOnPress}
    >
      <BackButtonContainer>
        <Lottie
          ref={animationRef}
          source={Animations.backButton}
          autoPlay={false}
          renderMode="SOFTWARE"
          loop={false}
          resizeMode="contain"
          width={size || 30}
          height={size || 30}
          colorFilters={[
            {
              keypath: 'Layer 4',
              color: colorRowInverted
                ? darkMode
                  ? '#181725'
                  : '#FFFFFF'
                : darkMode
                ? '#FFFFFF'
                : '#181725',
            },
          ]}
        />
        {children && children}
      </BackButtonContainer>
    </BackButtonPressable>
  );
};

export default memo(BackButton);
