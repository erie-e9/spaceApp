import React, { memo, useCallback, useRef } from 'react';
import { ApplicationScreenProps } from '@utils/@types/navigation';
import { useTheme } from '@hooks';
import { Lottie, LottieViewProps } from '@components/atoms';
import { BackButtonContainer, BackButtonPressable } from './styles';

interface Props {
  testID?: string;
  navigation: ApplicationScreenProps;
}

export const BackButton: React.FC<Props> = ({ testID, navigation }) => {
  const animationRef = useRef<LottieViewProps>(null);
  const { Animations, darkMode } = useTheme();
  const handleOnPress = useCallback(() => {
    animationRef.current?.play();
    navigation.removeListener;
    navigation.goBack();
  }, []);

  return (
    <BackButtonPressable
      testID={testID}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
          width={40}
          height={40}
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
};

export default memo(BackButton);
