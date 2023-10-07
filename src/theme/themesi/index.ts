import { Appearance } from 'react-native';
import { DefaultTheme } from 'styled-components';
import { darkTheme } from '@theme/themesi/dark';
import { lightTheme } from '@theme/themesi/light';

export * from '@theme/themesi/light';
export * from '@theme/themesi/dark';

const choseTheme = (): DefaultTheme => {
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme === 'dark') {
    return darkTheme;
  }
  return lightTheme;
};

export const theme = choseTheme();
