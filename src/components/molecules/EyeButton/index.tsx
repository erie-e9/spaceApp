import React, { memo, useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { testProperties } from '@utils/functions';
import { useTheme } from '@hooks';
import { Lottie } from '@components/atoms';
import { StyledButton } from './styles';

interface EyeButtonProps {
  visible: boolean;
  hasError?: boolean;
  testID?: string;
  onPress?: () => void;
  size?: number;
}

export const EyeButton: React.FC<EyeButtonProps> = ({
  visible = false,
  hasError,
  testID,
  onPress,
  size = 30,
}) => {
  const animationRef = useRef<LottieView>(null);
  const { Animations, darkMode } = useTheme();

  useEffect(() => {
    if (!visible) {
      animationRef.current?.play(0, 15);
    } else {
      animationRef.current?.play(15, 30);
    }
  }, [visible]);

  return (
    <StyledButton {...testProperties(testID)} error={hasError} onPress={onPress}>
      <Lottie
        ref={animationRef}
        source={Animations.eye}
        autoPlay={false}
        renderMode="AUTOMATIC"
        loop={false}
        resizeMode="contain"
        width={size || 30}
        height={size || 30}
        startFrame={!visible ? 0 : 15}
        endFrame={!visible ? 15 : 30}
        colorFilters={[
          {
            keypath: 'paupiere1',
            color: darkMode ? '#fff' : '#000',
          },
          {
            keypath: 'eyes Silhouettes',
            color: darkMode ? '#fff' : '#000',
          },
        ]}
      />
    </StyledButton>
  );
};

export default memo(EyeButton);
