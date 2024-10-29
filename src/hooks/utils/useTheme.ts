import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Common, Images, Animations, themes, DefaultVariables } from '@theme';
import { type Mode } from '@slices/types/appPreferences';
import {
  type ThemeVariables,
  type Theme,
  type ThemeNavigationTheme,
  type ThemeNavigationColors,
} from '@types';
import { useAppPreferences } from '@hooks';

export const useTheme = () => {
  // Get the scheme device
  const colorScheme = useColorScheme();
  const { theme, mode } = useAppPreferences();

  const darkMode =
    mode === 'dark' || (colorScheme == 'dark' && (mode === null || mode === 'sunflower'));

  let variables = {};
  let partialTheme = {};
  let darkVariables = {};
  let partialDarkTheme = {};

  if (
    theme !== 'default' &&
    theme !== 'theme0' &&
    theme !== 'theme1' &&
    theme !== 'theme2' &&
    theme !== 'theme3' &&
    theme !== 'theme4' &&
    theme !== 'theme5' &&
    theme !== 'theme6'
  ) {
    const {
      Variables,
      // @ts-ignore to prevent multiple themes handling
      ...themeConfig
    } = themes[theme] || {};

    variables = Variables;
    partialTheme = themeConfig || {};
  }

  if (darkMode) {
    const { Variables, ...darkThemeConfig } = themes[`${theme}_dark` as keyof typeof themes] || {};

    darkVariables = Variables || {};
    partialDarkTheme = darkThemeConfig;
  }

  const themeVariables = mergeVariables(variables, darkVariables);

  const images = Images(themeVariables);
  const animations = Animations();
  const common = Common({
    Images: Images(themeVariables),
    Animations: Animations(),
    ...themeVariables,
  });

  // Build the default theme
  const baseTheme: Theme<typeof images, typeof animations, typeof common> = {
    Images: images,
    Animations: animations,
    Common: common,
    ...themeVariables,
  };

  // Merge and return the current Theme
  return buildTheme(
    mode,
    darkMode,
    baseTheme,
    formatTheme(themeVariables, partialTheme || {}),
    formatTheme(themeVariables, partialDarkTheme || {}),
  );
};

/**
 * Generate Theme with theme variables
 */
const formatTheme = <I, A, C>(variables: ThemeVariables, theme: Partial<Theme<I, A, C>>) => {
  return Object.entries(theme).reduce((acc, [name, generate]) => {
    return {
      ...acc,
      [name]: (generate as any)(variables),
    };
  }, theme);
};

/**
 * Merge all variables for building the theme
 * baseTheme <- mode <- currentDarkTheme
 */
const mergeVariables = (
  themeConfig: Partial<ThemeVariables>,
  darkThemeConfig: Partial<ThemeVariables>,
) => {
  return Object.entries(DefaultVariables).reduce((acc, [group, vars]) => {
    const theme: Record<keyof typeof DefaultVariables, typeof vars> | undefined = (
      themeConfig as any
    )[group];
    const darkTheme: Record<keyof typeof DefaultVariables, typeof vars> | undefined = (
      darkThemeConfig as any
    )[group];

    return {
      ...acc,
      [group]: {
        ...vars,
        ...(theme || {}),
        ...(darkTheme || {}),
      },
    };
  }, DefaultVariables);
};

/**
 * Provide all the theme exposed with useTheme()
 */
const buildTheme = <I, A, C>(
  theme: Mode,
  darkMode: boolean,
  baseTheme: Theme<I, A, C>,
  themeConfig: Partial<Theme<I, A, C>>,
  darkThemeConfig: Partial<Theme<I, A, C>>,
) => {
  return {
    ...mergeTheme(baseTheme, themeConfig, darkThemeConfig),
    theme,
    darkMode,
    NavigationTheme: mergeNavigationTheme(
      darkMode ? DarkTheme : DefaultTheme,
      baseTheme.NavigationColors,
    ),
  };
};

/**
 * Merge theme from baseTheme <- mode <- currentDarkTheme
 */
const mergeTheme = <I, A, C>(
  baseTheme: Theme<I, A, C>,
  theme: Partial<Theme<I, A, C>>,
  darkTheme: Partial<Theme<I, A, C>>,
) =>
  Object.entries(baseTheme).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        ...((value as any) || {}),
        ...((theme as any)[key] || {}),
        ...((darkTheme as any)[key] || {}),
      },
    }),
    baseTheme,
  ) as typeof baseTheme;

/**
 * Merge the React Navigation Theme
 *
 * @param reactNavigationTheme
 * @param overrideColors
 * @return {{colors}}
 */
const mergeNavigationTheme = (
  reactNavigationTheme: ThemeNavigationTheme,
  overrideColors: Partial<ThemeNavigationColors>,
) => ({
  ...reactNavigationTheme,
  colors: {
    ...reactNavigationTheme.colors,
    ...overrideColors,
  },
});
