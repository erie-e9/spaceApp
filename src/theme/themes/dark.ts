import { type Themes } from '@store/slices/types/appPreferences';
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
