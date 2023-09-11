import { Appearance } from 'react-native';
import { DefaultTheme } from 'styled-components';
import { darkTheme } from './dark';
import { lightTheme } from './light';

export * from './light';
export * from './dark';

const choseTheme = (): DefaultTheme => {
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme === 'dark') {
    return darkTheme;
  }
  return lightTheme;
};

export const theme = choseTheme();
