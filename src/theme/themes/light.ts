import { type Themes } from '@store/slices/types/appPreferences';
import themes from '@theme/themes/themes.json';

export const lightMode = (theme: Themes) => {
  return {
    mode: 'light',
    isDarkMode: false,
    tokens: {
      colors: themes[theme].light,
    },
  };
};
