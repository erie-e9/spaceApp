import React, { memo } from 'react';
import { useTheme } from '@hooks';
import { testProperties } from '@utils/functions';
import { Lottie } from '@components/atoms';

interface LoaderProps {
  testID?: string;
  animationRef?: any;
  width?: number;
  height?: number;
  progress?: number;
}

export const Loader: React.FC<LoaderProps> = ({
  testID,
  animationRef,
  width = 30,
  height = 30,
  progress,
}) => {
  const { Animations, darkMode: isDarkMode } = useTheme();

  return (
    <Lottie
      {...testProperties(testID || 'LoaderID')}
      ref={animationRef}
      source={Animations[isDarkMode ? 'loaderd' : 'loader']}
      autoPlay={true}
      renderMode="AUTOMATIC"
      loop={true}
      resizeMode="cover"
      progress={progress}
      width={width || 30}
      height={height || 30}
    />
  );
};

export default memo(Loader);
