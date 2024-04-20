import React, { memo, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ApplicationScreenProps } from '@utils/@types/navigation';
import { useTheme } from '@hooks';
import { Lottie, LottieViewProps } from '@components/atoms';
import { BackButtonContainer, BackButtonPressable } from './styles';

interface Props {
  testID?: string;
  onPress?: () => void;
  size?: number;
}

export const BackButton: React.FC<Props> = ({ testID, onPress, size }) => {
  const animationRef = useRef<LottieViewProps>(null);
  const { Animations, darkMode } = useTheme();
  const navigation: ApplicationScreenProps = useNavigation();

  const handleOnPress = useCallback(() => {
    animationRef.current?.play();
    navigation.removeListener;
    navigation.goBack();
    if (onPress) onPress;
  }, []);

  return (
    <BackButtonPressable
      testID={testID}
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
          width={size || 40}
          height={size || 40}
          colorFilters={[
            {
              keypath: 'Layer 4',
              color: darkMode ? '#FFFFFF' : '#000000',
            },
          ]}
        />
      </BackButtonContainer>
    </BackButtonPressable>
  );
};

BackButton.defaultProps = {
  testID: 'BackButtonID',
  onPress: undefined,
  size: 40,
};

export default memo(BackButton);
