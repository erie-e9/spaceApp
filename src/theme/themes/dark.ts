import type { Themes } from '@slices/types';
import themes from './themes.json';

export const darkMode = (theme: Themes) => {
  return {
    mode: 'dark',
    isDarkMode: true,
    tokens: {
      colors: themes[theme].dark,
    },
  };
};
