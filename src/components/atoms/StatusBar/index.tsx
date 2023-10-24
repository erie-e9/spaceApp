import React, { memo } from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { useTheme } from '@hooks';

export const StatusBar = () => {
  const { darkMode } = useTheme();

  return (
    <RNStatusBar
      translucent
      barStyle={darkMode ? 'light-content' : 'dark-content'}
      backgroundColor="transparent"
    />
  );
};

export default memo(StatusBar);
